import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { UpdateOrderStatusSchema } from '@/lib/validators/admin-orders';
import { requireAdminSession, unauthorizedResponse, UnauthorizedError } from '@/lib/auth/admin';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
  } catch (e) {
    if (e instanceof UnauthorizedError) return unauthorizedResponse();
    throw e;
  }
  const { id } = await ctx.params;

  const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id)).limit(1);
  if (!order) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const items = await db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, id));

  let aiSession = null;
  if (order.aiSessionId) {
    const [s] = await db
      .select()
      .from(schema.aiSessions)
      .where(eq(schema.aiSessions.id, order.aiSessionId))
      .limit(1);
    aiSession = s ?? null;
  }

  return NextResponse.json({ ok: true, order: { ...order, items, aiSession } });
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
  } catch (e) {
    if (e instanceof UnauthorizedError) return unauthorizedResponse();
    throw e;
  }
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  const parsed = UpdateOrderStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  const updated = await db
    .update(schema.orders)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(schema.orders.id, id))
    .returning({ id: schema.orders.id, status: schema.orders.status });

  if (!updated.length) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, order: updated[0] });
}
