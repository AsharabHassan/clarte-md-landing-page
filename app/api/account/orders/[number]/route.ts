import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { getPortalCustomer } from '@/lib/auth/portal';

/**
 * Live status for one of the signed-in customer's own orders. Used by
 * the order-detail page poller. Ownership is enforced by matching
 * customer_id — a customer can never read another customer's order.
 */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ number: string }> }) {
  const customer = await getPortalCustomer();
  if (!customer) return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });
  const { number } = await ctx.params;

  const [order] = await db
    .select()
    .from(schema.orders)
    .where(and(eq(schema.orders.orderNumber, number), eq(schema.orders.customerId, customer.id)))
    .limit(1);

  if (!order) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    ok: true,
    order: {
      order_number: order.orderNumber,
      status: order.status,
      payment_status: order.paymentStatus,
      courier: order.courier,
      tracking_number: order.trackingNumber,
      updated_at: order.updatedAt.toISOString(),
    },
  });
}
