import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { GenerateAfterSchema } from '@/lib/validators/generate-after';
import { extractClientIp, hashIp, RATE_LIMIT_AI_PER_HOUR } from '@/lib/ai/rate-limit';
import { generateAfter } from '@/lib/ai/generate-after';
import { ACNE_BA_PROMPT } from '@/lib/ai/prompts';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Validate
  const body = await req.json().catch(() => null);
  const parsed = GenerateAfterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const input = parsed.data;

  // Size check (base64 → ~1.33x bytes; 8 MB raw ~= 10.7 MB base64)
  if (input.image_base64.length > 11_000_000) {
    return NextResponse.json({ ok: false, error: 'Image too large (max 8 MB)' }, { status: 413 });
  }

  // Rate limit. postgres-js .execute() returns the row array directly,
  // not { rows: [...] } — see [[project_runtime_quirks]] §5.
  const ipHash = hashIp(extractClientIp(req.headers));
  const recent = (await db.execute(sql`
    SELECT count(*)::int AS c FROM ai_sessions
    WHERE client_ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'
  `)) as unknown as Array<{ c: number }>;
  const count = Number(recent[0]?.c ?? 0);
  if (count >= RATE_LIMIT_AI_PER_HOUR) {
    return NextResponse.json(
      { ok: false, error: 'Too many generations from your address. Try again in an hour or message us on WhatsApp.' },
      { status: 429 },
    );
  }

  // Upload input to Storage
  const supa = createSupabaseAdminClient();
  const sha = createHash('sha256').update(Buffer.from(input.image_base64, 'base64')).digest('hex');
  const yyyy = new Date().getFullYear();
  const mm = String(new Date().getMonth() + 1).padStart(2, '0');
  const inputPath = `${yyyy}/${mm}/${sha}.bin`;

  const { error: uploadErr } = await supa.storage
    .from('ai-inputs')
    .upload(inputPath, Buffer.from(input.image_base64, 'base64'), {
      contentType: input.mime_type,
      upsert: true,
    });
  if (uploadErr) {
    console.error('Storage upload (input) failed', uploadErr);
    // Continue — Storage is observability-grade, not request-critical
  }

  // Call Gemini
  let result;
  try {
    result = await generateAfter({
      inputBase64: input.image_base64,
      inputMimeType: input.mime_type,
      prompt: input.prompt || ACNE_BA_PROMPT,
    });
  } catch (err: unknown) {
    console.error('Gemini generate-after failed', err);
    const errMsg = err instanceof Error ? err.message : String(err);

    // Persist the failure for debugging
    await db.insert(schema.aiSessions).values({
      kind: 'before_after',
      concern: input.concern,
      inputImagePath: inputPath,
      inputImageSha256: sha,
      modelVersion: 'gemini-2.5-flash-image',
      consentGiven: true, // implicit via consent flow on client
      clientIpHash: ipHash,
      clientUa: req.headers.get('user-agent') ?? null,
      error: errMsg.slice(0, 1000),
    });

    return NextResponse.json(
      { ok: false, error: "We couldn't generate your preview. Please submit a clearer, front-facing photograph in even light." },
      { status: 504 },
    );
  }

  // Upload output to Storage
  const outputPath = `${yyyy}/${mm}/${sha}_out.bin`;
  const outputBuf = Buffer.from(result.outputBase64, 'base64');
  await supa.storage.from('ai-outputs').upload(outputPath, outputBuf, {
    contentType: result.mimeType,
    upsert: true,
  });

  // Persist session
  const [sessionRow] = await db
    .insert(schema.aiSessions)
    .values({
      kind: 'before_after',
      concern: input.concern,
      inputImagePath: inputPath,
      inputImageSha256: sha,
      outputImagePath: outputPath,
      modelVersion: result.modelVersion,
      latencyMs: result.latencyMs,
      consentGiven: true,
      clientIpHash: ipHash,
      clientUa: req.headers.get('user-agent') ?? null,
    })
    .returning({ id: schema.aiSessions.id });

  // Respond with data URI + session id (client expects { image, ai_session_id })
  return NextResponse.json({
    image: `data:${result.mimeType};base64,${result.outputBase64}`,
    ai_session_id: sessionRow.id,
  });
}
