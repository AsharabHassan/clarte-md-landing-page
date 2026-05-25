import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { UpdateProductSchema } from '@/lib/validators/admin-products';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.products);
  if ('response' in guard) return guard.response;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  const parsed = UpdateProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid update' },
      { status: 400 },
    );
  }

  const [existing] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const d = parsed.data;
  // Only set keys that were actually provided so partial updates don't
  // null out untouched columns.
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  for (const k of [
    'sku',
    'name',
    'pricePkr',
    'listPricePkr',
    'actives',
    'imageUrl',
    'description',
    'stockQty',
    'lowStockThreshold',
    'active',
    'content',
  ] as const) {
    if (k in d && d[k] !== undefined) patch[k] = d[k];
  }

  try {
    const [updated] = await db
      .update(schema.products)
      .set(patch)
      .where(eq(schema.products.id, id))
      .returning();

    await recordAudit({
      actorEmail: guard.user.email ?? null,
      action: 'product.updated',
      entityType: 'product',
      entityId: id,
      meta: { fields: Object.keys(patch).filter((k) => k !== 'updatedAt') },
    });

    return NextResponse.json({ ok: true, product: updated });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === '23505') {
      return NextResponse.json({ ok: false, error: 'SKU already exists' }, { status: 409 });
    }
    console.error('product update failed', err);
    return NextResponse.json({ ok: false, error: 'Could not update product' }, { status: 500 });
  }
}

/**
 * Archive (soft-delete) — sets active=false. Products are referenced by
 * bundle_items (FK) and historically by order_items (by SKU), so we
 * never hard-delete. Reactivate via PATCH { active: true }.
 */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.products);
  if ('response' in guard) return guard.response;
  const { id } = await ctx.params;

  const [updated] = await db
    .update(schema.products)
    .set({ active: false, updatedAt: new Date() })
    .where(eq(schema.products.id, id))
    .returning();
  if (!updated) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'product.archived',
    entityType: 'product',
    entityId: id,
    meta: { sku: updated.sku },
  });

  return NextResponse.json({ ok: true, product: updated });
}
