import { NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';
import { getCustomerAggregates } from '@/lib/db/customer-queries';
import { toCsv, csvHeaders } from '@/lib/admin/csv';

export async function GET() {
  const guard = await guardAdminApi(AREA_ACCESS.customers);
  if ('response' in guard) return guard.response;

  const [rows, agg] = await Promise.all([
    db.select().from(schema.customers).orderBy(asc(schema.customers.name)).limit(50_000),
    getCustomerAggregates(),
  ]);

  const csv = toCsv(
    rows.map((c) => {
      const a = agg.get(c.id);
      return {
        name: c.name,
        phone: c.phone,
        email: c.email ?? '',
        city: c.city ?? '',
        address: c.address ?? '',
        orders: a?.orders ?? 0,
        total_spent_pkr: a?.spent ?? 0,
        last_order: a?.lastOrder ? a.lastOrder.toISOString() : '',
        joined: c.createdAt.toISOString(),
      };
    }),
    [
      { key: 'name', header: 'Name' },
      { key: 'phone', header: 'Phone' },
      { key: 'email', header: 'Email' },
      { key: 'city', header: 'City' },
      { key: 'address', header: 'Address' },
      { key: 'orders', header: 'Orders' },
      { key: 'total_spent_pkr', header: 'Total spent (PKR)' },
      { key: 'last_order', header: 'Last order' },
      { key: 'joined', header: 'Joined' },
    ],
  );

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'customers.exported',
    entityType: 'customer',
    meta: { count: rows.length },
  });

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, { headers: csvHeaders(`customers-${stamp}.csv`) });
}
