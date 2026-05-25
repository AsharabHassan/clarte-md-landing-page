import { NextRequest, NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { CreateProductSchema } from '@/lib/validators/admin-products';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';

export async function GET() {
  const guard = await guardAdminApi(AREA_ACCESS.products);
  if ('response' in guard) return guard.response;
  const products = await db.select().from(schema.products).orderBy(asc(schema.products.name));
  return NextResponse.json({ ok: true, products });
}

export async function POST(req: NextRequest) {
  const guard = await guardAdminApi(AREA_ACCESS.products);
  if ('response' in guard) return guard.response;

  const body = await req.json().catch(() => null);
  const parsed = CreateProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid product' },
      { status: 400 },
    );
  }
  const p = parsed.data;

  try {
    const [created] = await db
      .insert(schema.products)
      .values({
        sku: p.sku,
        name: p.name,
        pricePkr: p.pricePkr,
        listPricePkr: p.listPricePkr ?? null,
        actives: p.actives ?? null,
        imageUrl: p.imageUrl ?? null,
        description: p.description ?? null,
        stockQty: p.stockQty ?? null,
        lowStockThreshold: p.lowStockThreshold ?? null,
        active: p.active,
      })
      .returning();

    await recordAudit({
      actorEmail: guard.user.email ?? null,
      action: 'product.created',
      entityType: 'product',
      entityId: created.id,
      meta: { sku: created.sku, name: created.name },
    });

    return NextResponse.json({ ok: true, product: created }, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === '23505') {
      return NextResponse.json({ ok: false, error: `SKU "${p.sku}" already exists` }, { status: 409 });
    }
    console.error('product create failed', err);
    return NextResponse.json({ ok: false, error: 'Could not create product' }, { status: 500 });
  }
}
