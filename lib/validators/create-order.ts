import { z } from 'zod';

export const CreateOrderSchema = z.object({
  concern: z.string().min(1).max(64),
  page: z.string().min(1).max(64),
  contact: z.object({
    name: z.string().min(1).max(128),
    phone: z.string().min(7).max(32),
    email: z.string().email().max(128),
  }),
  shipping: z.object({
    address: z.string().min(3).max(256),
    city: z.string().min(1).max(64),
    postal: z.string().max(16).optional().or(z.literal('')),
    notes: z.string().max(256).optional().or(z.literal('')),
  }),
  payment: z.enum(['cod']),
  items: z
    .array(
      z.object({
        sku: z.string().min(1).max(64),
        name: z.string().min(1).max(128),
        qty: z.number().int().min(1).max(20),
        price: z.number().int().min(0),
      }),
    )
    .min(1)
    .max(20),
  totals: z.object({
    subtotal: z.number().int().min(0),
    shipping: z.number().int().min(0),
    total: z.number().int().min(0),
  }),
  bundle_in_cart: z.boolean(),
  used_ai_preview: z.boolean(),
  ts: z.string().datetime(),
  ai_session_id: z.string().uuid().optional(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
