import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { CreateOrderSchema } from '@/lib/validators/create-order';
import { computeTotals } from '@/lib/orders/compute-totals';
import { nextOrderNumber } from '@/lib/orders/order-number';
import { extractClientIp, hashIp, RATE_LIMIT_ORDERS_PER_HOUR } from '@/lib/ai/rate-limit';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = CreateOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const input = parsed.data;

  const ipHash = hashIp(extractClientIp(req.headers));

  // postgres-js .execute() returns the row array directly — see [[project_runtime_quirks]] §5
  const recent = (await db.execute(sql`
    SELECT count(*)::int AS c FROM orders
    WHERE client_ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'
  `)) as unknown as Array<{ c: number }>;
  const count = Number(recent[0]?.c ?? 0);
  if (count >= RATE_LIMIT_ORDERS_PER_HOUR) {
    return NextResponse.json(
      { ok: false, error: 'Too many orders from your address. WhatsApp us to place this manually.' },
      { status: 429 },
    );
  }

  // Re-compute server totals (cart-tampering defense). Bundle SKUs end with `-protocol`.
  const items = input.items.map((i) => ({
    sku: i.sku,
    name: i.name,
    qty: i.qty,
    unitPricePkr: i.price,
    isBundle: i.sku.endsWith('-protocol'),
  }));
  const totals = computeTotals(items);
  if (
    totals.total !== input.totals.total ||
    totals.subtotal !== input.totals.subtotal ||
    totals.shipping !== input.totals.shipping
  ) {
    return NextResponse.json(
      { ok: false, error: 'Order total mismatch — please refresh the page and try again.' },
      { status: 400 },
    );
  }

  const orderNumber = await nextOrderNumber(db);

  // Validate ai_session_id if present (drop silently if unknown)
  let aiSessionUuid: string | null = null;
  if (input.ai_session_id) {
    const found = await db
      .select()
      .from(schema.aiSessions)
      .where(sql`id = ${input.ai_session_id}`)
      .limit(1);
    if (found.length) aiSessionUuid = found[0].id;
  }

  try {
    const [order] = await db
      .insert(schema.orders)
      .values({
        orderNumber,
        status: 'pending',
        concern: input.concern,
        sourcePage: input.page,
        customerName: input.contact.name,
        customerPhone: input.contact.phone,
        customerEmail: input.contact.email,
        shippingAddress: input.shipping.address,
        shippingCity: input.shipping.city,
        shippingPostal: input.shipping.postal || null,
        shippingNotes: input.shipping.notes || null,
        paymentMethod: input.payment,
        paymentStatus: 'pending',
        subtotalPkr: totals.subtotal,
        shippingPkr: totals.shipping,
        totalPkr: totals.total,
        bundleInCart: input.bundle_in_cart,
        usedAiPreview: input.used_ai_preview,
        aiSessionId: aiSessionUuid,
        clientIpHash: ipHash,
      })
      .returning({ id: schema.orders.id });

    if (items.length > 0) {
      await db.insert(schema.orderItems).values(
        items.map((i) => ({
          orderId: order.id,
          sku: i.sku,
          name: i.name,
          qty: i.qty,
          unitPricePkr: i.unitPricePkr,
          isBundle: i.isBundle,
        })),
      );
    }

    return NextResponse.json({ ok: true, order_number: orderNumber });
  } catch (err) {
    console.error('Order insert failed', err);
    return NextResponse.json(
      { ok: false, error: "We couldn't place your order. Please WhatsApp us and we'll take it manually." },
      { status: 500 },
    );
  }
}
