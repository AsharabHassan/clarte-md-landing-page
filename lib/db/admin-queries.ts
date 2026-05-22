import { and, eq, ilike, or, type SQL } from 'drizzle-orm';
import { schema } from '@/lib/db/client';

export interface AdminOrdersFilter {
  status?: string;
  q?: string;
}

/**
 * Where-clause for the admin orders list, shared by /admin/orders
 * (the page) and GET /api/admin/orders (the JSON API) so the two
 * surfaces always agree on which columns the free-text search hits.
 */
export function buildAdminOrdersWhere(input: AdminOrdersFilter): SQL | undefined {
  const clauses: SQL[] = [];
  if (input.status) clauses.push(eq(schema.orders.status, input.status));
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
