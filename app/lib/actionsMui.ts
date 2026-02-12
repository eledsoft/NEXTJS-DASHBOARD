'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { invoiceFormSchema } from '@/app/lib/validations';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sendInvoiceCreatedEvent, sendInvoiceUpdatedEvent, sendInvoiceDeletedEvent } from '@/lib/kafka/events';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
  data?: {
    customerId?: string;
    amount?: string;
    status?: string;
  } | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const rawData = {
    customerId: formData.get('customerId') as string,
    amount: formData.get('amount') as string,
    status: formData.get('status') as string,
  };

  // Usa lo schema condiviso per la validazione
  const validatedFields = invoiceFormSchema.safeParse({
    ...rawData,
    amount: parseFloat(rawData.amount),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
      data: rawData,
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = Math.round(amount * 100);
  const date = new Date().toISOString().split('T')[0];

  let invoiceId: string | undefined;

  try {
    // Insert data into the database and get the ID
    const result = await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      RETURNING id
    `;
    invoiceId = result[0]?.id;

    // 📨 Send Kafka event (non-blocking - failures won't stop the flow)
    if (invoiceId) {
      await sendInvoiceCreatedEvent({
        invoiceId,
        customerId,
        amount: amountInCents,
        status,
      });
    }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
      data: rawData,
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const rawData = {
    customerId: formData.get('customerId') as string,
    amount: formData.get('amount') as string,
    status: formData.get('status') as string,
  };

  // Usa lo schema condiviso per la validazione
  const validatedFields = invoiceFormSchema.safeParse({
    ...rawData,
    amount: parseFloat(rawData.amount),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
      data: rawData,
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = Math.round(amount * 100);

  try {
    // Update invoice in database
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;

    // 📨 Send Kafka event (non-blocking)
    await sendInvoiceUpdatedEvent({
      invoiceId: id,
      customerId,
      amount: amountInCents,
      status,
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Invoice.',
      data: rawData,
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    // Get invoice data before deleting (for Kafka event)
    const invoice = await sql`
      SELECT customer_id FROM invoices WHERE id = ${id}
    `;

    if (invoice.length === 0) {
      throw new Error('Invoice not found');
    }

    // Delete invoice
    await sql`DELETE FROM invoices WHERE id = ${id}`;

    // 📨 Send Kafka event (non-blocking)
    await sendInvoiceDeletedEvent({
      invoiceId: id,
      customerId: invoice[0].customer_id,
    });

    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('Failed to delete invoice:', error);
    throw new Error('Failed to Delete Invoice');
  }
}



// ...new branch?
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}