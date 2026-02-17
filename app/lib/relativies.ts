'use server';

import { sql } from '@/app/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Relative } from '@/app/lib/definitions';

const relativeFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastname: z.string().min(1, 'Lastname is required'),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be an integer')
    .positive('Age must be positive'),
  relationship: z.string().min(1, 'Relationship is required'),
});

export type RelativeState = {
  errors?: {
    name?: string[];
    lastname?: string[];
    age?: string[];
    relationship?: string[];
  };
  message?: string | null;
};

export async function addRelative(prevState: RelativeState, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Non autenticato');
  }

  const validatedFields = relativeFormSchema.safeParse({
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    age: parseInt(formData.get('age') as string),
    relationship: formData.get('relationship'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add Relative.',
    };
  }

  const { name, lastname, age, relationship } = validatedFields.data;

  try {
    await sql`
      INSERT INTO relatives (name, lastname, age, relationship, related_to)
      VALUES (${name}, ${lastname}, ${age}, ${relationship}, ${session.user.id})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Add Relative.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/family');
  redirect('/family');
}

export async function deleteRelative(relativeId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Non autenticato');
  }

  try {
    await sql`
      DELETE FROM relatives
      WHERE id = ${relativeId}
      AND related_to = ${session.user.id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to Delete Relative.');
  }

  revalidatePath('/dashboard');
  revalidatePath('/family');
}

export async function updateRelative(relativeId: string, prevState: RelativeState, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Non autenticato');
  }

  const validatedFields = relativeFormSchema.safeParse({
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    age: parseInt(formData.get('age') as string),
    relationship: formData.get('relationship'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Relative.',
    };
  }

  const { name, lastname, age, relationship } = validatedFields.data;

  try {
    await sql`
      UPDATE relatives
      SET
        name = ${name},
        lastname = ${lastname},
        age = ${age},
        relationship = ${relationship}
      WHERE id = ${relativeId}
      AND related_to = ${session.user.id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Update Relative.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/family');
}

export async function getRelativesAction(): Promise<Relative[]> {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  try {
    const data = await sql<Relative[]>`
      SELECT * FROM relatives WHERE related_to = ${session.user.id}
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch relatives.');
  }
}
