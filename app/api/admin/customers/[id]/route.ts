import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { UpdateCustomerSchema } from '@/lib/validators/admin-customers';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.customers);
  if ('response' in guard) return guard.response;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  const parsed = UpdateCustomerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid update' },
      { status: 400 },
    );
  }

  const [existing] = await db
    .select({ id: schema.customers.id })
    .from(schema.customers)
    .where(eq(schema.customers.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const d = parsed.data;
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  for (const k of ['name', 'phone', 'email', 'address', 'city', 'postal', 'notes'] as const) {
    if (k in d && d[k] !== undefined) patch[k] = d[k];
  }

  try {
    const [updated] = await db
      .update(schema.customers)
      .set(patch)
      .where(eq(schema.customers.id, id))
      .returning();

    await recordAudit({
      actorEmail: guard.user.email ?? null,
      action: 'customer.updated',
      entityType: 'customer',
      entityId: id,
      meta: { fields: Object.keys(patch).filter((k) => k !== 'updatedAt') },
    });

    return NextResponse.json({ ok: true, customer: updated });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === '23505') {
      return NextResponse.json({ ok: false, error: 'Another customer already uses that phone' }, { status: 409 });
    }
    console.error('customer update failed', err);
    return NextResponse.json({ ok: false, error: 'Could not update customer' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  // Deleting a profile is destructive → owner only. Orders are preserved
  // (orders.customer_id is SET NULL via the FK) and keep their snapshot.
  const guard = await guardAdminApi(AREA_ACCESS.customers);
  if ('response' in guard) return guard.response;
  if (!canDelete(getUserRole(guard.user))) {
    return NextResponse.json({ ok: false, error: 'Only an owner can delete customers' }, { status: 403 });
  }
  const { id } = await ctx.params;

  const [existing] = await db
    .select()
    .from(schema.customers)
    .where(eq(schema.customers.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  await db.delete(schema.customers).where(eq(schema.customers.id, id));

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'customer.deleted',
    entityType: 'customer',
    entityId: id,
    meta: { name: existing.name, phone: existing.phone },
  });

  return NextResponse.json({ ok: true });
}
