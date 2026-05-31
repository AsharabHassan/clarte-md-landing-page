import { NextRequest, NextResponse } from 'next/server';
import { LeadSchema, buildLeadWebhookPayload } from '@/lib/validators/lead';
import { dispatchWebhook } from '@/lib/webhooks/dispatcher';

/**
 * Lead capture from the scan-result gate. Fires WEBHOOK_LEAD_CAPTURED to the
 * operator's GHL/LeadConnector webhook so the lead lands in the CRM, tagged
 * by which scan (`surface`) produced it.
 *
 * No DB write — mirrors /api/contact (the CRM is the source of truth). Abuse
 * is throttled upstream: this form only appears after an AI scan, and the
 * scan routes (/api/ai/analyze-skin, /api/generate-after) are IP-rate-limited.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid form' }, { status: 400 });
  }
  const lead = parsed.data;

  const sourceUrl = req.headers.get('referer') ?? null;

  const payload = buildLeadWebhookPayload(lead, {
    sourceUrl,
    timestamp: new Date().toISOString(),
  });

  await dispatchWebhook(
    process.env.WEBHOOK_LEAD_CAPTURED,
    payload as unknown as Record<string, unknown>,
    'lead.captured',
  );

  return NextResponse.json({ ok: true });
}
