import { NextRequest, NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { AdminOrdersQuerySchema } from '@/lib/validators/admin-orders';
import { buildAdminOrdersWhere } from '@/lib/db/admin-queries';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';

export async function GET(req: NextRequest) {
  const guard = await guardAdminApi(AREA_ACCESS.orders);
  if ('response' in guard) return guard.response;

  const { searchParams } = new URL(req.url);
  const parsed = AdminOrdersQuerySchema.safeParse({
    status: searchParams.get('status') ?? undefined,
    q: searchParams.get('q') ?? undefined,
    city: searchParams.get('city') ?? undefined,
    ai: searchParams.get('ai') ?? undefined,
    from: searchParams.get('from') ?? undefined,
    to: searchParams.get('to') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    offset: searchParams.get('offset') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid query' }, { status: 400 });
  }
  const { status, q, city, ai, from, to, limit, offset } = parsed.data;
  const where = buildAdminOrdersWhere({ status, q, city, ai, from, to });

  const baseQuery = db.select().from(schema.orders);
  const orders = await (where ? baseQuery.where(where) : baseQuery)
    .orderBy(desc(schema.orders.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({ ok: true, orders });
}
