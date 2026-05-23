import { z } from 'zod';

/**
 * Two valid shapes:
 *
 *   1. Full contact form (from /contact) — name + email + phone + message
 *      required, subscribe optional.
 *   2. Newsletter-only (from footer + future inline opt-ins) — email +
 *      subscribe=true required, everything else omitted.
 *
 * The .superRefine guards the shape mismatch: a half-filled contact form
 * (name without phone, etc.) is rejected with a precise error.
 */
export const ContactSchema = z
  .object({
    name: z.string().min(1).max(128).optional(),
    email: z.string().email().max(128),
    phone: z.string().min(7).max(32).optional(),
    message: z.string().min(5).max(2000).optional(),
    subscribe: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const isNewsletterOnly =
      data.subscribe === true && !data.name && !data.phone && !data.message;
    if (isNewsletterOnly) return;
    // Otherwise contact-form mode — all three are required.
    if (!data.name) {
      ctx.addIssue({ code: 'custom', path: ['name'], message: 'Name is required.' });
    }
    if (!data.phone) {
      ctx.addIssue({ code: 'custom', path: ['phone'], message: 'Phone is required.' });
    }
    if (!data.message) {
      ctx.addIssue({ code: 'custom', path: ['message'], message: 'Message is required.' });
    }
  });

export type ContactInput = z.infer<typeof ContactSchema>;

/** True when the payload is a newsletter-only opt-in (no contact details). */
export function isNewsletterOnly(input: ContactInput): boolean {
  return input.subscribe === true && !input.name && !input.phone && !input.message;
}
