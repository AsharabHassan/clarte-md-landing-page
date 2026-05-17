import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

const RETENTION_DAYS = 90;

export async function POST(req: NextRequest) {
  // Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` automatically
  // when CRON_SECRET is set in the project's env vars.
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supa = createSupabaseAdminClient();
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();

  let deleted = 0;
  for (const bucket of ['ai-inputs', 'ai-outputs']) {
    const { data: files, error } = await supa.storage.from(bucket).list('', { limit: 10000 });
    if (error) {
      console.error(`list ${bucket} failed`, error);
      continue;
    }
    if (!files) continue;
    const old = files.filter((f) => f.created_at && f.created_at < cutoff).map((f) => f.name);
    if (old.length) {
      const { error: delErr } = await supa.storage.from(bucket).remove(old);
      if (!delErr) deleted += old.length;
    }
  }
  return NextResponse.json({ ok: true, deleted });
}
