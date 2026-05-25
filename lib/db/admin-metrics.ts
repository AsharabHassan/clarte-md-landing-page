import { sql } from 'drizzle-orm';
import { db } from '@/lib/db/client';

/**
 * Dashboard aggregates. Uses raw SQL via db.execute (postgres-js returns
 * the row array directly — same pattern as the rate-limit checks). All
 * money is in PKR integers. "Net" revenue excludes cancelled/refunded/
 * returned orders — the figure that actually matters in a COD market.
 */

const DEAD_STATUSES = `('cancelled','refunded','returned')`;

async function rows<T>(query: ReturnType<typeof sql>): Promise<T[]> {
  return (await db.execute(query)) as unknown as T[];
}

export interface DashboardMetrics {
  revenue7: number;
  revenue30: number;
  orders7: number;
  orders30: number;
  aov30: number;
  ordersTotal: number;
  statusCounts: { status: string; count: number }[];
  rtoRate: number; // 0..1
  pendingCount: number;
  aiByKind: { kind: string; count: number }[];
  aiErrors30: number;
  aiUsed30: number;
  subscribers: number;
  lowStockCount: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [
    revenueRows,
    statusRows,
    aiRows,
    aiErrRows,
    aiUsedRows,
    subsRows,
    lowStockRows,
  ] = await Promise.all([
    rows<{
      revenue7: number;
      revenue30: number;
      orders7: number;
      orders30: number;
      orders_total: number;
    }>(sql`
      SELECT
        COALESCE(SUM(total_pkr) FILTER (WHERE created_at > now() - interval '7 days'  AND status NOT IN ${sql.raw(DEAD_STATUSES)}), 0)::bigint  AS revenue7,
        COALESCE(SUM(total_pkr) FILTER (WHERE created_at > now() - interval '30 days' AND status NOT IN ${sql.raw(DEAD_STATUSES)}), 0)::bigint  AS revenue30,
        COUNT(*) FILTER (WHERE created_at > now() - interval '7 days')::int  AS orders7,
        COUNT(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS orders30,
        COUNT(*)::int AS orders_total
      FROM orders
    `),
    rows<{ status: string; count: number }>(sql`
      SELECT status, COUNT(*)::int AS count FROM orders GROUP BY status
    `),
    rows<{ kind: string; count: number }>(sql`
      SELECT kind, COUNT(*)::int AS count FROM ai_sessions
      WHERE created_at > now() - interval '30 days' GROUP BY kind
    `),
    rows<{ c: number }>(sql`
      SELECT COUNT(*)::int AS c FROM ai_sessions
      WHERE created_at > now() - interval '30 days' AND error IS NOT NULL
    `),
    rows<{ c: number }>(sql`
      SELECT COUNT(*)::int AS c FROM orders
      WHERE created_at > now() - interval '30 days' AND used_ai_preview = true
    `),
    rows<{ c: number }>(sql`SELECT COUNT(*)::int AS c FROM subscribers`),
    rows<{ c: number }>(sql`
      SELECT COUNT(*)::int AS c FROM products
      WHERE active = true AND stock_qty IS NOT NULL
        AND stock_qty <= COALESCE(low_stock_threshold, 0)
    `),
  ]);

  const r = revenueRows[0] ?? {
    revenue7: 0,
    revenue30: 0,
    orders7: 0,
    orders30: 0,
    orders_total: 0,
  };

  const statusCounts = statusRows
    .map((s) => ({ status: s.status, count: Number(s.count) }))
    .sort((a, b) => b.count - a.count);
  const byStatus = (name: string) =>
    statusCounts.find((s) => s.status === name)?.count ?? 0;

  const delivered = byStatus('delivered');
  const returned = byStatus('returned');
  const rtoDenom = delivered + returned;
  const rtoRate = rtoDenom > 0 ? returned / rtoDenom : 0;

  const liveOrders30 = Math.max(
    Number(r.orders30) -
      (statusCounts
        .filter((s) => ['cancelled', 'refunded', 'returned'].includes(s.status))
        .reduce((acc, s) => acc + s.count, 0) || 0),
    0,
  );
  const aov30 = liveOrders30 > 0 ? Number(r.revenue30) / liveOrders30 : 0;

  return {
    revenue7: Number(r.revenue7),
    revenue30: Number(r.revenue30),
    orders7: Number(r.orders7),
    orders30: Number(r.orders30),
    aov30,
    ordersTotal: Number(r.orders_total),
    statusCounts,
    rtoRate,
    pendingCount: byStatus('pending'),
    aiByKind: aiRows.map((a) => ({ kind: a.kind, count: Number(a.count) })),
    aiErrors30: Number(aiErrRows[0]?.c ?? 0),
    aiUsed30: Number(aiUsedRows[0]?.c ?? 0),
    subscribers: Number(subsRows[0]?.c ?? 0),
    lowStockCount: Number(lowStockRows[0]?.c ?? 0),
  };
}
