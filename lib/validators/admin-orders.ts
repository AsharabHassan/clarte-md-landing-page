import { z } from 'zod';

// 'returned' added in the v2 admin panel to record COD return-to-origin
// (the dominant economic event in a Pakistani COD store) distinctly from
// a customer-initiated 'cancelled' or a money-back 'refunded'.
export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'dispatched',
  'delivered',
  'cancelled',
  'refunded',
  'returned',
] as const;

const OrderStatus = z.enum(ORDER_STATUSES);

export const AdminOrdersQuerySchema = z.object({
  status: OrderStatus.optional(),
  q: z.string().trim().min(1).max(80).optional(),
  city: z.string().trim().min(1).max(80).optional(),
  ai: z.enum(['1', '0']).optional(), // used_ai_preview filter
  from: z.string().trim().min(1).max(40).optional(), // ISO date (created_at >=)
  to: z.string().trim().min(1).max(40).optional(), // ISO date (created_at <=)
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export type AdminOrdersQuery = z.infer<typeof AdminOrdersQuerySchema>;

export const UpdateOrderStatusSchema = z.object({
  status: OrderStatus,
  note: z.string().trim().max(500).optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;

// Fulfillment / ops fields edited from the order-detail page.
export const UpdateOrderFulfillmentSchema = z
  .object({
    courier: z.string().trim().max(80).nullish(),
    trackingNumber: z.string().trim().max(120).nullish(),
    internalNotes: z.string().trim().max(2000).nullish(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'No fields to update' });

export type UpdateOrderFulfillmentInput = z.infer<typeof UpdateOrderFulfillmentSchema>;
