import { z } from 'zod';

export const GenerateAfterSchema = z.object({
  image_base64: z.string().min(100),
  mime_type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  concern: z.string().min(1).max(64),
  prompt: z.string().min(10).max(4000),
});

export type GenerateAfterInput = z.infer<typeof GenerateAfterSchema>;
