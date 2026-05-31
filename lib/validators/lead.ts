import { z } from 'zod';

/**
 * Lead captured by the scan-result gate (sub-project: pre-results lead form).
 *
 * The form sits in front of every AI scan result (quiz + the four protocol
 * projection generators). All three contact fields are required — the gate
 * is a hard gate, so there is no partial/newsletter-only shape to allow for.
 *
 * `surface` records WHICH scan produced the lead so the operator can tag in
 * GHL by entry point; `concern` and `ai_session_id` are best-effort context.
 */
export const LeadSurface = z.enum(['quiz', 'acne', 'barrier', 'even-tone', 'renewal']);

export const LeadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(128),
  email: z.string().trim().email('Enter a valid email.').max(128),
  // Permissive on shape (international + local PK formats) but bounded.
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number.')
    .max(32)
    .regex(/^[\d\s()+\-]+$/, 'Enter a valid phone number.'),
  surface: LeadSurface,
  concern: z.string().trim().max(64).optional(),
  ai_session_id: z.string().trim().max(128).optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

/**
 * Human-readable scan title per surface — sent in every lead webhook so the
 * operator can see (and tag on) exactly which scan produced the lead, without
 * decoding the `surface` slug. Derived server-side so it is always present.
 */
export const SCAN_TITLES: Record<z.infer<typeof LeadSurface>, string> = {
  quiz: 'AI Skin Analysis Quiz',
  acne: 'The Clear Skin Protocol — 12-week AI scan',
  barrier: 'The Barrier Protocol — 12-week AI scan',
  'even-tone': 'The Even Tone Protocol — 12-week AI scan',
  renewal: 'The Renewal Protocol — 12-week AI scan',
};

export interface LeadWebhookPayload {
  event: 'lead.captured';
  timestamp: string;
  lead: {
    name: string;
    email: string;
    phone: string;
    surface: z.infer<typeof LeadSurface>;
    /** Human-readable scan title, e.g. "The Clear Skin Protocol — 12-week AI scan". */
    scan_title: string;
    concern: string | null;
    ai_session_id: string | null;
    source_url: string | null;
  };
}

/** Builds the GHL webhook payload. Pure (timestamp injected) so it's testable. */
export function buildLeadWebhookPayload(
  lead: LeadInput,
  opts: { sourceUrl: string | null; timestamp: string },
): LeadWebhookPayload {
  return {
    event: 'lead.captured',
    timestamp: opts.timestamp,
    lead: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      surface: lead.surface,
      scan_title: SCAN_TITLES[lead.surface],
      concern: lead.concern ?? null,
      ai_session_id: lead.ai_session_id ?? null,
      source_url: opts.sourceUrl,
    },
  };
}
