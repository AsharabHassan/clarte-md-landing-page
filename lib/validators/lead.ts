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

/**
 * The AI scan's detected-issues object (the on-screen "skin map") as forwarded
 * by the lead gate. Every field is optional and tolerant: it's best-effort
 * client context, and a slightly different shape must never reject the lead.
 * Flattened into the webhook payload below so each issue maps onto a GHL field.
 */
const concernList = z.array(z.string().trim().max(120)).max(12);
export const LeadSkinMapSchema = z
  .object({
    primary_concerns: concernList,
    secondary_concerns: concernList,
    recommended_actives: concernList,
    warnings: concernList,
    skin_type: z.string().trim().max(64),
    severity: z.string().trim().max(32),
    confidence: z.number().min(0).max(1),
    expected_timeline_weeks: z.number().int().min(0).max(104),
    observation: z.string().trim().max(600),
  })
  .partial();

export type LeadSkinMap = z.infer<typeof LeadSkinMapSchema>;

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
  // Detected issues from the AI scan (absent for the quiz surface).
  skin_map: LeadSkinMapSchema.optional(),
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

/**
 * Per-concern lead webhook routing. The four AI-scan surfaces each post to
 * their own webhook so GHL can drop the lead straight into the matching
 * nurture track with no branching. The quiz (its concern is dynamic) stays on
 * the generic WEBHOOK_LEAD_CAPTURED; anything unmapped falls back to it too.
 */
export const LEAD_WEBHOOK_ENV: Record<z.infer<typeof LeadSurface>, string> = {
  acne: 'WEBHOOK_LEAD_ACNE',
  'even-tone': 'WEBHOOK_LEAD_PIGMENTATION',
  renewal: 'WEBHOOK_LEAD_AGEING',
  barrier: 'WEBHOOK_LEAD_BARRIER',
  quiz: 'WEBHOOK_LEAD_CAPTURED',
};

/** Env-var NAME of the webhook a given surface should post to. */
export function leadWebhookEnvName(surface: z.infer<typeof LeadSurface>): string {
  return LEAD_WEBHOOK_ENV[surface] ?? 'WEBHOOK_LEAD_CAPTURED';
}

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
    // ── Detected issues from the AI scan, flattened one-per-field so each maps
    //    directly onto a GHL custom field. All null for the quiz (no scan map).
    /** Skin type observation, e.g. "combination". */
    skin_type: string | null;
    /** Cosmetic-concern severity: "mild" | "moderate" | "severe". */
    severity: string | null;
    /** Model confidence as a whole-number percentage, e.g. 78. */
    confidence_pct: number | null;
    /** Realistic weeks to meaningful change with the protocol. */
    expected_timeline_weeks: number | null;
    /** Dominant issues, comma-joined: "Inflammatory acne, Comedones". */
    primary_concerns: string | null;
    /** Minor co-occurring issues, comma-joined. */
    secondary_concerns: string | null;
    /** Every detected issue (primary + secondary), comma-joined — one catch-all field. */
    detected_issues: string | null;
    /** Recommended actives, comma-joined: "Azelaic acid 10%, Niacinamide 5%". */
    recommended_actives: string | null;
    /** Any warnings, comma-joined (e.g. "Possible cystic acne — see a doctor"). */
    warnings: string | null;
    /** One- to two-sentence editorial caption describing the visible skin state. */
    observation: string | null;
  };
}

/** Comma-joins a string list for a single GHL text field; null when empty. */
function joinList(arr?: string[]): string | null {
  if (!arr) return null;
  const cleaned = arr.map((s) => s.trim()).filter(Boolean);
  return cleaned.length ? cleaned.join(', ') : null;
}

/** Builds the GHL webhook payload. Pure (timestamp injected) so it's testable. */
export function buildLeadWebhookPayload(
  lead: LeadInput,
  opts: { sourceUrl: string | null; timestamp: string },
): LeadWebhookPayload {
  const map = lead.skin_map;
  const allConcerns = [...(map?.primary_concerns ?? []), ...(map?.secondary_concerns ?? [])];
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
      skin_type: map?.skin_type ?? null,
      severity: map?.severity ?? null,
      confidence_pct: typeof map?.confidence === 'number' ? Math.round(map.confidence * 100) : null,
      expected_timeline_weeks: map?.expected_timeline_weeks ?? null,
      primary_concerns: joinList(map?.primary_concerns),
      secondary_concerns: joinList(map?.secondary_concerns),
      detected_issues: joinList(allConcerns),
      recommended_actives: joinList(map?.recommended_actives),
      warnings: joinList(map?.warnings),
      observation: map?.observation ?? null,
    },
  };
}
