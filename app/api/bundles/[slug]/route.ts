import { NextResponse } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';

/**
 * GET /api/bundles/[slug]
 * Returns one bundle (e.g. clear-skin-protocol) with its product list
 * ordered by display position. 404 if the slug doesn't exist.
 *
 * Public endpoint — no auth, no rate-limit. Used by the storefront
 * product-detail page and the landing-page Rx section.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  try {
    const bundle = await db
      .select()
      .from(schema.bundles)
      .where(eq(schema.bundles.slug, slug))
      .limit(1);

    if (!bundle.length) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    const items = await db
      .select({
        position: schema.bundleItems.position,
        product: schema.products,
      })
      .from(schema.bundleItems)
      .leftJoin(schema.products, eq(schema.bundleItems.productId, schema.products.id))
      .where(eq(schema.bundleItems.bundleId, bundle[0].id))
      .orderBy(asc(schema.bundleItems.position));

    return NextResponse.json({
      ok: true,
      bundle: { ...bundle[0], items: items.map((i) => i.product) },
    });
  } catch (err) {
    console.error('/api/bundles/[slug] error', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to load bundle' },
      { status: 500 },
    );
  }
}
