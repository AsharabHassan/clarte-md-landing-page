import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { UpdateOrderStatusSchema } from '@/lib/validators/admin-orders';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';
import { dispatchWebhook } from '@/lib/webhooks/dispatcher';
import {
  buildOrderEventPayload,
  statusToOrderEvent,
  statusToWebhookEnvVar,
} from '@/lib/webhooks/payloads';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.orders);
  if ('response' in guard) return guard.response;
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
  const guard = await guardAdminApi(AREA_ACCESS.orders);
  if ('response' in guard) return guard.response;
  const actorEmail = guard.user.email ?? null;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  const parsed = UpdateOrderStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  // Read previous status so we can include it in the webhook payload.
  // Also gives us a no-op short-circuit if admin clicks the current
  // status button (no point firing webhooks for "confirmed → confirmed").
  const [existing] = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const previousStatus = existing.status;
  const newStatus = parsed.data.status;

  const [updated] = await db
    .update(schema.orders)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(schema.orders.id, id))
    .returning();

  if (!updated) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  if (newStatus !== previousStatus) {
    // Append to the order timeline + the cross-cutting audit log.
    await db.insert(schema.orderStatusHistory).values({
      orderId: id,
      fromStatus: previousStatus,
      toStatus: newStatus,
      note: parsed.data.note ?? null,
      actorEmail,
    });
    await recordAudit({
      actorEmail,
      action: 'order.status_changed',
      entityType: 'order',
      entityId: id,
      meta: { from: previousStatus, to: newStatus, note: parsed.data.note ?? null },
    });
  }

  // Fire status-change webhook (sub-project #3) only when status
  // actually changed and the new status has a webhook event mapped.
  if (newStatus !== previousStatus) {
    const event = statusToOrderEvent(newStatus);
    const envVar = statusToWebhookEnvVar(newStatus);
    if (event && envVar) {
      const items = await db
        .select()
        .from(schema.orderItems)
        .where(eq(schema.orderItems.orderId, id));
      await dispatchWebhook(
        process.env[envVar],
        buildOrderEventPayload({
          event,
          order: updated,
          items,
          previousStatus,
        }) as unknown as Record<string, unknown>,
        event,
      );
    }
  }

  return NextResponse.json({ ok: true, order: { id: updated.id, status: updated.status } });
}

/**
 * Hard-delete an order. Destructive → owner only. order_items and
 * order_status_history are removed via their ON DELETE CASCADE FKs.
 * (To merely cancel, set status to 'cancelled' instead.)
 */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.orders);
  if ('response' in guard) return guard.response;
  if (!canDelete(getUserRole(guard.user))) {
    return NextResponse.json({ ok: false, error: 'Only an owner can delete orders' }, { status: 403 });
  }
  const { id } = await ctx.params;

  const [existing] = await db
    .select({ id: schema.orders.id, orderNumber: schema.orders.orderNumber })
    .from(schema.orders)
    .where(eq(schema.orders.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  await db.delete(schema.orders).where(eq(schema.orders.id, id));

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'order.deleted',
    entityType: 'order',
    entityId: id,
    meta: { orderNumber: existing.orderNumber },
  });

  return NextResponse.json({ ok: true });
}
