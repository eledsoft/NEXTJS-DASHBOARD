// @/app/lib/validations.ts
// Schema di validazione condiviso tra client e server

import { z } from 'zod';

// Schema base per i campi del form invoice
export const invoiceFormSchema = z.object({
  customerId: z.string().min(1, 'Please select a customer'),
  amount: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive('Please enter an amount greater than $0'),
  status: z.enum(['pending', 'paid'], {
    errorMap: () => ({ message: 'Please select an invoice status' }),
  }),
});

// Schema completo per il database (include id e date)
export const invoiceSchema = z.object({
  id: z.string(),
  customerId: z.string().min(1, 'Please select a customer'),
  amount: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive('Please enter an amount greater than $0'),
  status: z.enum(['pending', 'paid'], {
    errorMap: () => ({ message: 'Please select an invoice status' }),
  }),
  date: z.string(),
});

// Type inference
export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;