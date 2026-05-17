import { NextRequest, NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { AdminOrdersQuerySchema } from '@/lib/validators/admin-orders';
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
    limit: searchParams.get('limit') ?? undefined,
    offset: searchParams.get('offset') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid query' }, { status: 400 });
  }
  const { status, limit, offset } = parsed.data;

  const orders = status
    ? await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.status, status))
        .orderBy(desc(schema.orders.createdAt))
        .limit(limit)
        .offset(offset)
    : await db
        .select()
        .from(schema.orders)
        .orderBy(desc(schema.orders.createdAt))
        .limit(limit)
        .offset(offset);

  return NextResponse.json({ ok: true, orders });
}
