import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';
import { toCsv, csvHeaders } from '@/lib/admin/csv';

export async function GET() {
  const guard = await guardAdminApi(AREA_ACCESS.subscribers);
  if ('response' in guard) return guard.response;

  const rows = await db
    .select()
    .from(schema.subscribers)
    .orderBy(desc(schema.subscribers.createdAt))
    .limit(50_000);

  const csv = toCsv(
    rows.map((s) => ({
      email: s.email,
      source_page: s.sourcePage,
      joined: s.createdAt.toISOString(),
    })),
    [
      { key: 'email', header: 'Email' },
      { key: 'source_page', header: 'Source' },
      { key: 'joined', header: 'Joined' },
    ],
  );

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'subscribers.exported',
    entityType: 'subscriber',
    meta: { count: rows.length },
  });

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, { headers: csvHeaders(`subscribers-${stamp}.csv`) });
}
