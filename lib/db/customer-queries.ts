import { sql } from 'drizzle-orm';
import { db } from '@/lib/db/client';

export interface CustomerAgg {
  orders: number;
  spent: number; // net of cancelled/refunded/returned, in PKR
  lastOrder: Date | null;
}

/**
 * Per-customer order aggregates keyed by customer_id. "Spent" excludes
 * dead statuses so it reflects realised revenue, not gross COD placed.
 */
export async function getCustomerAggregates(): Promise<Map<string, CustomerAgg>> {
  const rows = (await db.execute(sql`
    SELECT
      customer_id,
      COUNT(*)::int AS orders,
      COALESCE(SUM(total_pkr) FILTER (WHERE status NOT IN ('cancelled','refunded','returned')), 0)::bigint AS spent,
      MAX(created_at) AS last_order
    FROM orders
    WHERE customer_id IS NOT NULL
    GROUP BY customer_id
  `)) as unknown as Array<{ customer_id: string; orders: number; spent: number; last_order: string | null }>;

  const map = new Map<string, CustomerAgg>();
  for (const r of rows) {
    map.set(r.customer_id, {
      orders: Number(r.orders),
      spent: Number(r.spent),
      lastOrder: r.last_order ? new Date(r.last_order) : null,
    });
  }
  return map;
}
