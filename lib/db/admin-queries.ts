import { and, eq, gte, ilike, lte, or, type SQL } from 'drizzle-orm';
import { schema } from '@/lib/db/client';

export interface AdminOrdersFilter {
  status?: string;
  q?: string;
  city?: string;
  ai?: '1' | '0';
  from?: string; // ISO date
  to?: string; // ISO date
}

/**
 * Where-clause for the admin orders list, shared by /admin/orders
 * (the page) and GET /api/admin/orders (the JSON API) so the two
 * surfaces always agree on which columns the filters hit.
 */
export function buildAdminOrdersWhere(input: AdminOrdersFilter): SQL | undefined {
  const clauses: SQL[] = [];
  if (input.status) clauses.push(eq(schema.orders.status, input.status));
  if (input.city) clauses.push(ilike(schema.orders.shippingCity, `%${input.city}%`));
  if (input.ai === '1') clauses.push(eq(schema.orders.usedAiPreview, true));
  if (input.ai === '0') clauses.push(eq(schema.orders.usedAiPreview, false));

  if (input.from) {
    const d = new Date(input.from);
    if (!Number.isNaN(d.getTime())) clauses.push(gte(schema.orders.createdAt, d));
  }
  if (input.to) {
    const d = new Date(input.to);
    if (!Number.isNaN(d.getTime())) {
      // Treat `to` as inclusive end-of-day.
      d.setHours(23, 59, 59, 999);
      clauses.push(lte(schema.orders.createdAt, d));
    }
  }

  if (input.q) {
    const needle = `%${input.q}%`;
    const orClause = or(
      ilike(schema.orders.orderNumber, needle),
      ilike(schema.orders.customerName, needle),
      ilike(schema.orders.customerPhone, needle),
      ilike(schema.orders.customerEmail, needle),
      ilike(schema.orders.shippingCity, needle),
    );
    if (orClause) clauses.push(orClause);
  }

  if (clauses.length === 0) return undefined;
  if (clauses.length === 1) return clauses[0];
  return and(...clauses);
}
