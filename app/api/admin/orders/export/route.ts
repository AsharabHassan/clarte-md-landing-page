import { NextRequest, NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { AdminOrdersQuerySchema } from '@/lib/validators/admin-orders';
import { buildAdminOrdersWhere } from '@/lib/db/admin-queries';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';
import { toCsv, csvHeaders } from '@/lib/admin/csv';

const EXPORT_CAP = 5000;

export async function GET(req: NextRequest) {
  const guard = await guardAdminApi(AREA_ACCESS.orders);
  if ('response' in guard) return guard.response;

  const { searchParams } = new URL(req.url);
  const parsed = AdminOrdersQuerySchema.safeParse({
    status: searchParams.get('status') ?? undefined,
    q: searchParams.get('q') ?? undefined,
    city: searchParams.get('city') ?? undefined,
    ai: searchParams.get('ai') ?? undefined,
    from: searchParams.get('from') ?? undefined,
    to: searchParams.get('to') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid query' }, { status: 400 });
  }
  const { status, q, city, ai, from, to } = parsed.data;
  const where = buildAdminOrdersWhere({ status, q, city, ai, from, to });

  const base = db.select().from(schema.orders);
  const rows = await (where ? base.where(where) : base)
    .orderBy(desc(schema.orders.createdAt))
    .limit(EXPORT_CAP);

  const csv = toCsv(
    rows.map((o) => ({
      order_number: o.orderNumber,
      created_at: o.createdAt.toISOString(),
      status: o.status,
      customer_name: o.customerName,
      customer_phone: o.customerPhone,
      customer_email: o.customerEmail,
      address: o.shippingAddress,
      city: o.shippingCity,
      postal: o.shippingPostal ?? '',
      payment_method: o.paymentMethod,
      payment_status: o.paymentStatus,
      subtotal_pkr: o.subtotalPkr,
      shipping_pkr: o.shippingPkr,
      total_pkr: o.totalPkr,
      courier: o.courier ?? '',
      tracking_number: o.trackingNumber ?? '',
      used_ai_preview: o.usedAiPreview ? 'yes' : 'no',
    })),
    [
      { key: 'order_number', header: 'Order #' },
      { key: 'created_at', header: 'Created' },
      { key: 'status', header: 'Status' },
      { key: 'customer_name', header: 'Customer' },
      { key: 'customer_phone', header: 'Phone' },
      { key: 'customer_email', header: 'Email' },
      { key: 'address', header: 'Address' },
      { key: 'city', header: 'City' },
      { key: 'postal', header: 'Postal' },
      { key: 'payment_method', header: 'Payment' },
      { key: 'payment_status', header: 'Payment status' },
      { key: 'subtotal_pkr', header: 'Subtotal (PKR)' },
      { key: 'shipping_pkr', header: 'Shipping (PKR)' },
      { key: 'total_pkr', header: 'Total (PKR)' },
      { key: 'courier', header: 'Courier' },
      { key: 'tracking_number', header: 'Tracking #' },
      { key: 'used_ai_preview', header: 'Used AI' },
    ],
  );

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'orders.exported',
    entityType: 'order',
    meta: { count: rows.length, filters: { status, q, city, ai, from, to } },
  });

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, { headers: csvHeaders(`orders-${stamp}.csv`) });
}
