import { z } from 'zod';

/**
 * Bundle slugs must end with "-protocol": the cart/order pipeline
 * distinguishes a bundle from a product by `sku.endsWith('-protocol')`
 * (see /api/create-order), so this suffix is load-bearing, not cosmetic.
 */
export const CreateBundleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9-]*-protocol$/, 'Lowercase, dashes, ending in "-protocol"'),
  name: z.string().trim().min(1).max(200),
  concern: z.string().trim().min(1).max(80),
  pricePkr: z.coerce.number().int().min(0).max(100_000_000),
});

export type CreateBundleInput = z.infer<typeof CreateBundleSchema>;

export const UpdateBundleSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    concern: z.string().trim().min(1).max(80).optional(),
    pricePkr: z.coerce.number().int().min(0).max(100_000_000).optional(),
    active: z.boolean().optional(),
    // Ordered list of product ids — replaces the whole composition.
    items: z.array(z.string().uuid()).max(20).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'No fields to update' });

export type UpdateBundleInput = z.infer<typeof UpdateBundleSchema>;
