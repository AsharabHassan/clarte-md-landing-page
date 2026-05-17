import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ sku: string }> },
) {
  const { sku } = await ctx.params;

  const [product] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.sku, sku))
    .limit(1);

  if (!product || !product.active) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(
    { ok: true, product },
    {
      headers: {
        'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=60',
      },
    },
  );
}
