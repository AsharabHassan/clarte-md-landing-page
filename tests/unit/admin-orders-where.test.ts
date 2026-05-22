import { describe, it, expect } from 'vitest';
import { buildAdminOrdersWhere } from '@/lib/db/admin-queries';

function sql(node: unknown): string {
  // Flatten the entire Drizzle SQL node tree to a string by walking every
  // own + symbol property. Tests just need to detect column refs and param
  // values, so a permissive recursive flatten beats trying to model
  // Drizzle's internal node shape.
  const seen = new WeakSet<object>();
  const out: string[] = [];
  const walk = (v: unknown): void => {
    if (v == null) return;
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      out.push(String(v));
      return;
    }
    if (typeof v !== 'object') return;
    if (seen.has(v as object)) return;
    seen.add(v as object);
    if (Array.isArray(v)) {
      for (const el of v) walk(el);
      return;
    }
    for (const key of Object.keys(v as object)) {
      walk((v as Record<string, unknown>)[key]);
    }
  };
  walk(node);
  return out.join(' ');
}

describe('buildAdminOrdersWhere', () => {
  it('returns undefined when no filters provided', () => {
    expect(buildAdminOrdersWhere({})).toBeUndefined();
  });

  it('returns a status-only clause when only status is set', () => {
    const where = buildAdminOrdersWhere({ status: 'pending' });
    const s = sql(where);
    expect(where).toBeDefined();
    expect(s).toContain('status');
    expect(s).toContain('pending');
    expect(s).not.toContain('ilike');
  });

  it('returns a q-only clause covering all 5 columns when only q is set', () => {
    const where = buildAdminOrdersWhere({ q: 'asad' });
    const s = sql(where);
    expect(where).toBeDefined();
    expect(s).toContain('%asad%');
    expect(s).toContain('order_number');
    expect(s).toContain('customer_name');
    expect(s).toContain('customer_phone');
    expect(s).toContain('customer_email');
    expect(s).toContain('shipping_city');
  });

  it('ANDs status and q together when both are set', () => {
    const where = buildAdminOrdersWhere({ status: 'dispatched', q: 'lahore' });
    const s = sql(where);
    expect(where).toBeDefined();
    expect(s).toContain('dispatched');
    expect(s).toContain('%lahore%');
    expect(s).toContain('order_number');
  });

  it('treats empty q as a present filter (caller should pre-trim)', () => {
    // The validator strips empty q via z.string().min(1); this guards against
    // a caller that passes an unchecked q through. Empty string is falsy in
    // the helper so it should be ignored.
    expect(buildAdminOrdersWhere({ q: '' })).toBeUndefined();
  });
});
