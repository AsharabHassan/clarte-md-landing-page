import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { ContactSchema, isNewsletterOnly } from '@/lib/validators/contact';
import { extractClientIp, hashIp, RATE_LIMIT_AI_PER_HOUR } from '@/lib/ai/rate-limit';
import { dispatchWebhook } from '@/lib/webhooks/dispatcher';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid form' }, { status: 400 });
  }
  const input = parsed.data;

  // Rate-limit (reuse AI rate limit pattern — 5/hr/IP)
  const ipHash = hashIp(extractClientIp(req.headers));
  const recent = (await db.execute(sql`
    SELECT count(*)::int AS c FROM ai_sessions
    WHERE client_ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'
  `)) as unknown as Array<{ c: number }>;
  const count = Number(recent[0]?.c ?? 0);
  if (count >= RATE_LIMIT_AI_PER_HOUR) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Try again in an hour.' },
      { status: 429 },
    );
  }

  // Newsletter subscribe — dedupe via unique email constraint.
  if (input.subscribe) {
    await db
      .insert(schema.subscribers)
      .values({
        email: input.email,
        sourcePage: 'contact-form',
        ipHash,
      })
      .onConflictDoNothing();
  }

  // Newsletter-only submissions skip the contact webhook — there's no
  // contact payload to send. The subscribers insert above is the entire
  // operational write for this path.
  if (!isNewsletterOnly(input)) {
    // Fire webhook for ops (sub-project #3 pattern). No persistent storage
    // of contact submissions in DB by design — operator's CRM is the
    // source of truth (spec §12 decision).
    await dispatchWebhook(
      process.env.WEBHOOK_CONTACT_SUBMITTED,
      {
        event: 'contact.submitted',
        timestamp: new Date().toISOString(),
        contact: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
          subscribed_to_newsletter: !!input.subscribe,
        },
      },
      'contact.submitted',
    );
  }

  return NextResponse.json({ ok: true });
}
