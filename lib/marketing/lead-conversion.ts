/**
 * Client-side `generate_lead` conversion push for Google Ads (via GTM).
 *
 * Mirrors the `purchase` event in `components/analytics/PurchaseConversion.tsx`:
 * it pushes a single `generate_lead` event onto the GTM dataLayer (container
 * GTM-5NP9NGPD) on a SUCCESSFUL form submission. In GTM, a Google Ads
 * Conversion Tracking tag fires on a Custom Event trigger named `generate_lead`:
 *   - Conversion action  → your "Lead — form submit" action
 *   - Enhanced conversions (User-Provided Data, manual mode):
 *       Email → {{DLV - email}}   Phone → {{DLV - phone}}
 *   - Optional segmentation reads {{DLV - lead_surface}} / {{DLV - lead_concern}}.
 *
 * email/phone are pushed UNHASHED on purpose — GTM SHA-256 hashes them in the
 * browser before they leave. Do not hash here.
 *
 * Framework-agnostic (no React) so the vanilla-DOM lead gate and the React
 * contact form can both call it. Inlining the E.164 normalizer (rather than
 * importing it from `purchase-conversion.ts`) keeps server-only `db` imports
 * out of the client bundle.
 */

export type LeadConversionSurface =
  | 'quiz'
  | 'acne'
  | 'barrier'
  | 'even-tone'
  | 'renewal'
  | 'contact';

export interface LeadConversionData {
  surface: LeadConversionSurface;
  /** Unhashed — GTM hashes for enhanced conversions. */
  email?: string;
  /** Raw user input; normalized to E.164 here, then GTM hashes it. */
  phone?: string;
  /** Optional concern/segment label for reporting. */
  concern?: string;
}

/** Normalize a Pakistani phone number to E.164 (+92…) for enhanced-conversion matching. */
function toE164PK(raw: string): string {
  const digits = (raw || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('92')) return `+${digits}`;
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`;
  if (digits.length === 10 && digits.startsWith('3')) return `+92${digits}`;
  return `+${digits}`;
}

export function pushLeadConversion(data: LeadConversionData): void {
  if (typeof window === 'undefined') return;

  const email = data.email ? data.email.trim().toLowerCase() : '';
  const phone = data.phone ? toE164PK(data.phone) : '';

  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: 'generate_lead',
    lead_surface: data.surface,
    ...(data.concern ? { lead_concern: data.concern } : {}),
    ...(email ? { email } : {}),
    ...(phone ? { phone } : {}),
  });
}
