import { NextRequest, NextResponse } from 'next/server';
import { inArray } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { CartPreviewSchema } from '@/lib/validators/cart-preview';
import { FLAT_SHIPPING_PKR, FREE_SHIPPING_THRESHOLD_PKR } from '@/lib/orders/compute-totals';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = CartPreviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid cart' }, { status: 400 });
  }
  const input = parsed.data;

  if (input.items.length === 0) {
    return NextResponse.json({
      ok: true,
      items: [],
      totals: { subtotal_pkr: 0, shipping_pkr: 0, total_pkr: 0 },
      free_shipping_threshold_pkr: FREE_SHIPPING_THRESHOLD_PKR,
      free_shipping_remaining_pkr: FREE_SHIPPING_THRESHOLD_PKR,
    });
  }

  const bundleSlugs = input.items
    .filter((i) => i.type === 'bundle')
    .map((i) => i.slug);
  const productSkus = input.items
    .filter((i) => i.type === 'product')
    .map((i) => i.sku);

  const bundles =
    bundleSlugs.length > 0
      ? await db
          .select()
          .from(schema.bundles)
          .where(inArray(schema.bundles.slug, bundleSlugs))
      : [];

  const products =
    productSkus.length > 0
      ? await db
          .select()
          .from(schema.products)
          .where(inArray(schema.products.sku, productSkus))
      : [];

  // Build resolved line items in the order they were sent
  const items: Array<{
    sku: string;
    name: string;
    qty: number;
    unit_price_pkr: number;
    line_total_pkr: number;
    is_bundle: boolean;
  }> = [];

  for (const i of input.items) {
    if (i.type === 'bundle') {
      const b = bundles.find((x) => x.slug === i.slug);
      if (!b) continue; // silently drop unknown SKUs — preview is best-effort
      items.push({
        sku: b.slug,
        name: b.name,
        qty: 1,
        unit_price_pkr: b.pricePkr,
        line_total_pkr: b.pricePkr,
        is_bundle: true,
      });
    } else {
      const p = products.find((x) => x.sku === i.sku);
      if (!p) continue;
      items.push({
        sku: p.sku,
        name: p.name,
        qty: i.qty,
        unit_price_pkr: p.pricePkr,
        line_total_pkr: p.pricePkr * i.qty,
        is_bundle: false,
      });
    }
  }

  const subtotal = items.reduce((s, i) => s + i.line_total_pkr, 0);
  const shipping =
    items.length === 0
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD_PKR
        ? 0
        : FLAT_SHIPPING_PKR;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_PKR - subtotal);

  return NextResponse.json({
    ok: true,
    items,
    totals: {
      subtotal_pkr: subtotal,
      shipping_pkr: shipping,
      total_pkr: total,
    },
    free_shipping_threshold_pkr: FREE_SHIPPING_THRESHOLD_PKR,
    free_shipping_remaining_pkr: remaining,
  });
}
