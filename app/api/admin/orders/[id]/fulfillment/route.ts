import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { UpdateOrderFulfillmentSchema } from '@/lib/validators/admin-orders';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.orders);
  if ('response' in guard) return guard.response;
  const actorEmail = guard.user.email ?? null;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  const parsed = UpdateOrderFulfillmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  const [existing] = await db
    .select({ id: schema.orders.id })
    .from(schema.orders)
    .where(eq(schema.orders.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  // Normalise empty strings to null so cleared fields are stored as NULL.
  const norm = (v: string | null | undefined) => {
    if (v === undefined) return undefined;
    const t = (v ?? '').trim();
    return t === '' ? null : t;
  };
  const patch: Record<string, string | null> = {};
  if ('courier' in parsed.data) patch.courier = norm(parsed.data.courier) ?? null;
  if ('trackingNumber' in parsed.data) patch.trackingNumber = norm(parsed.data.trackingNumber) ?? null;
  if ('internalNotes' in parsed.data) patch.internalNotes = norm(parsed.data.internalNotes) ?? null;

  await db
    .update(schema.orders)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(schema.orders.id, id));

  await recordAudit({
    actorEmail,
    action: 'order.fulfillment_updated',
    entityType: 'order',
    entityId: id,
    meta: {
      courier: patch.courier ?? null,
      trackingNumber: patch.trackingNumber ?? null,
      notesUpdated: 'internalNotes' in patch,
    },
  });

  return NextResponse.json({ ok: true });
}
