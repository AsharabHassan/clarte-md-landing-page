import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(1).max(128),
  email: z.string().email().max(128),
  phone: z.string().min(7).max(32),
  message: z.string().min(5).max(2000),
  subscribe: z.boolean().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
