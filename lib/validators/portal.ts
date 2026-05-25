import { z } from 'zod';

export const PortalLoginSchema = z.object({
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(200),
});

export type PortalLoginInput = z.infer<typeof PortalLoginSchema>;

// Self-service profile edit. Deliberately EXCLUDES phone (the login
// identity) and notes (staff-only) — a customer may only change their
// contact name, email, and shipping details.
const optionalText = (max: number) =>
  z
    .union([z.string().trim().max(max), z.null()])
    .transform((v) => (v == null || v === '' ? null : v))
    .nullable()
    .optional();

export const PortalProfileSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    email: z
      .union([z.string().trim().email().max(200), z.literal(''), z.null()])
      .transform((v) => (v === '' || v == null ? null : v))
      .nullable()
      .optional(),
    address: optionalText(500),
    city: optionalText(120),
    postal: optionalText(20),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'No fields to update' });

export type PortalProfileInput = z.infer<typeof PortalProfileSchema>;

// Customer-submitted review (from the portal). Always lands as 'pending'.
export const PortalReviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().trim().min(20).max(2000),
  protocol: z
    .union([z.string().trim().max(80), z.literal(''), z.null()])
    .transform((v) => (v === '' || v == null ? null : v))
    .nullable()
    .optional(),
});

export type PortalReviewInput = z.infer<typeof PortalReviewSchema>;
