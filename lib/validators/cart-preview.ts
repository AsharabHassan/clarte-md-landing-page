import { z } from 'zod';

export const CartPreviewItemSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('bundle'), slug: z.string().min(1).max(64), qty: z.literal(1) }),
  z.object({
    type: z.literal('product'),
    sku: z.string().min(1).max(64),
    qty: z.number().int().min(1).max(20),
  }),
]);

export const CartPreviewSchema = z.object({
  items: z.array(CartPreviewItemSchema).min(0).max(50),
});

export type CartPreviewInput = z.infer<typeof CartPreviewSchema>;
