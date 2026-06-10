import { NextRequest, NextResponse } from 'next/server';
import { eq, inArray } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { UpdateBundleSchema } from '@/lib/validators/admin-protocols';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.protocols);
  if ('response' in guard) return guard.response;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  const parsed = UpdateBundleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid update' },
      { status: 400 },
    );
  }

  const [existing] = await db.select().from(schema.bundles).where(eq(schema.bundles.id, id)).limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const d = parsed.data;

  // Validate composition (if provided): every id must be a real product.
  if (d.items) {
    if (d.items.length > 0) {
      const found = await db
        .select({ id: schema.products.id })
        .from(schema.products)
        .where(inArray(schema.products.id, d.items));
      if (found.length !== new Set(d.items).size) {
        return NextResponse.json({ ok: false, error: 'One or more products were not found' }, { status: 400 });
      }
    }
  }

  // Field updates.
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  for (const k of ['name', 'concern', 'pricePkr', 'active'] as const) {
    if (k in d && d[k] !== undefined) patch[k] = d[k];
  }

  // Apply fields + (optional) composition replacement in one transaction.
  await db.transaction(async (tx) => {
    if (Object.keys(patch).length > 1) {
      await tx.update(schema.bundles).set(patch).where(eq(schema.bundles.id, id));
    }
    if (d.items) {
      await tx.delete(schema.bundleItems).where(eq(schema.bundleItems.bundleId, id));
      if (d.items.length > 0) {
        await tx.insert(schema.bundleItems).values(
          d.items.map((productId, idx) => ({ bundleId: id, productId, position: idx })),
        );
      }
    }
  });

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'protocol.updated',
    entityType: 'bundle',
    entityId: id,
    meta: {
      fields: Object.keys(patch).filter((k) => k !== 'updatedAt'),
      ...(d.items ? { itemCount: d.items.length } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}

/** Delete a protocol (owner only). bundle_items cascade via FK. */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.protocols);
  if ('response' in guard) return guard.response;
  if (!canDelete(getUserRole(guard.user))) {
    return NextResponse.json({ ok: false, error: 'Only an owner can delete protocols' }, { status: 403 });
  }
  const { id } = await ctx.params;

  const [existing] = await db.select().from(schema.bundles).where(eq(schema.bundles.id, id)).limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  await db.delete(schema.bundles).where(eq(schema.bundles.id, id));

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'protocol.deleted',
    entityType: 'bundle',
    entityId: id,
    meta: { slug: existing.slug, name: existing.name },
  });

  return NextResponse.json({ ok: true });
}
