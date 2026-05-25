import { z } from 'zod';

// Optional integer that accepts '' / null from form inputs and coerces
// to a non-negative integer or null.
const optionalInt = z
  .union([z.coerce.number().int().min(0).max(100_000_000), z.literal(''), z.null()])
  .transform((v) => (v === '' || v === null ? null : v))
  .nullable()
  .optional();

const optionalText = z
  .union([z.string().trim().max(2000), z.null()])
  .transform((v) => (v == null || v === '' ? null : v))
  .nullable()
  .optional();

export const CreateProductSchema = z.object({
  sku: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9-]*$/, 'Lowercase letters, numbers and dashes only'),
  name: z.string().trim().min(1).max(200),
  pricePkr: z.coerce.number().int().min(0).max(100_000_000),
  listPricePkr: optionalInt,
  actives: optionalText,
  imageUrl: z
    .union([z.string().trim().url().max(1000), z.literal(''), z.null()])
    .transform((v) => (v === '' || v == null ? null : v))
    .nullable()
    .optional(),
  description: optionalText,
  stockQty: optionalInt,
  lowStockThreshold: optionalInt,
  active: z.coerce.boolean().default(true),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

// ── Rich storefront/PDP content (products.content jsonb) ──────────────
const ProductIngredientSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(400),
});

export const ProductContentSchema = z.object({
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  badges: z.array(z.string().trim().min(1).max(60)).max(12).default([]),
  formulation: z.string().trim().max(200).default(''),
  bestFor: z.string().trim().max(300).optional(),
  benefits: z.array(z.string().trim().min(1).max(600)).max(20).default([]),
  ingredients: z.array(ProductIngredientSchema).max(40).default([]),
  directions: z.array(z.string().trim().min(1).max(600)).max(30).default([]),
  directionDurations: z.array(z.string().trim().max(40)).max(30).optional(),
  important: z.array(z.string().trim().min(1).max(600)).max(30).default([]),
});

export type ProductContentInput = z.infer<typeof ProductContentSchema>;

// Update = every commerce field optional, plus the optional content blob.
export const UpdateProductSchema = CreateProductSchema.partial()
  .extend({ content: ProductContentSchema.optional() })
  .refine((v) => Object.keys(v).length > 0, { message: 'No fields to update' });

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
