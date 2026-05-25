import { z } from 'zod';

const optionalText = (max: number) =>
  z
    .union([z.string().trim().max(max), z.null()])
    .transform((v) => (v == null || v === '' ? null : v))
    .nullable()
    .optional();

export const UpdateCustomerSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    phone: z.string().trim().min(3).max(40).optional(),
    email: z
      .union([z.string().trim().email().max(200), z.literal(''), z.null()])
      .transform((v) => (v === '' || v == null ? null : v))
      .nullable()
      .optional(),
    address: optionalText(500),
    city: optionalText(120),
    postal: optionalText(20),
    notes: optionalText(2000),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'No fields to update' });

export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;
