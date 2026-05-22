import { NextRequest, NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { AdminOrdersQuerySchema } from '@/lib/validators/admin-orders';
import { buildAdminOrdersWhere } from '@/lib/db/admin-queries';
import { requireAdminSession, unauthorizedResponse, UnauthorizedError } from '@/lib/auth/admin';

export async function GET(req: NextRequest) {
  try {
    await requireAdminSession();
  } catch (e) {
    if (e instanceof UnauthorizedError) return unauthorizedResponse();
    throw e;
  }

  const { searchParams } = new URL(req.url);
  const parsed = AdminOrdersQuerySchema.safeParse({
    status: searchParams.get('status') ?? undefined,
    q: searchParams.get('q') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    offset: searchParams.get('offset') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid query' }, { status: 400 });
  }
  const { status, q, limit, offset } = parsed.data;
  const where = buildAdminOrdersWhere({ status, q });

  const baseQuery = db.select().from(schema.orders);
  const orders = await (where ? baseQuery.where(where) : baseQuery)
    .orderBy(desc(schema.orders.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({ ok: true, orders });
}
