import { z } from 'zod';

const OrderStatus = z.enum([
  'pending',
  'confirmed',
  'dispatched',
  'delivered',
  'cancelled',
  'refunded',
]);

export const AdminOrdersQuerySchema = z.object({
  status: OrderStatus.optional(),
  q: z.string().trim().min(1).max(80).optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export type AdminOrdersQuery = z.infer<typeof AdminOrdersQuerySchema>;

export const UpdateOrderStatusSchema = z.object({
  status: OrderStatus,
});

export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;
