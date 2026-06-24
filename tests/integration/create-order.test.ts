import { describe, it, expect, beforeAll } from 'vitest';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { POST } from '@/app/api/create-order/route';

function mockRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/api/create-order', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '127.0.0.1', ...headers },
    body: JSON.stringify(body),
  });
}

const validPayload = () => ({
  concern: 'acne',
  page: 'acne-protocol',
  contact: { name: 'Test Patient', phone: '03001234567', email: 'test@example.com' },
  shipping: { address: 'House 1, Street 1', city: 'Lahore', postal: '', notes: '' },
  payment: 'COD' as const,
  items: [
    { sku: 'clear-skin-protocol', name: 'The Clear Skin Protocol · 4-product kit', qty: 1, price: 6499 },
  ],
  totals: { subtotal: 6499, shipping: 0, total: 6499 },
  bundle_in_cart: true,
  used_ai_preview: false,
  ts: new Date().toISOString(),
});

describe('POST /api/create-order', () => {
  beforeAll(() => {
    process.env.IP_HASH_PEPPER = process.env.IP_HASH_PEPPER || 'test-pepper';
  });

  it('creates an order with valid payload and returns order_number', async () => {
    const res = await POST(mockRequest(validPayload()) as any);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.order_number).toMatch(/^CLM-\d{4}-\d{4,}$/);

    const orders = await db.select().from(schema.orders).where(sql`order_number = ${data.order_number}`);
    expect(orders).toHaveLength(1);
    expect(orders[0].totalPkr).toBe(6499); // free shipping
  });

  it('rejects invalid payload', async () => {
    const res = await POST(mockRequest({ junk: true }) as any);
    expect(res.status).toBe(400);
  });

  it('ignores client-tampered prices — server uses DB prices', async () => {
    // Sub-project #6 Phase D Task 25 changed the security model: the route
    // now ALWAYS uses DB prices, regardless of what the client sends. So a
    // tampered payload still creates a real-priced order.
    const tampered = {
      ...validPayload(),
      items: [
        { sku: 'clear-skin-protocol', name: 'Tampered name', qty: 1, price: 1 },
      ],
      totals: { subtotal: 1, shipping: 0, total: 1 },
    };
    const res = await POST(mockRequest(tampered) as any);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);

    // Verify the order persisted at the REAL price (Rs 6499, free shipping), not Rs 1.
    const orders = await db.select().from(schema.orders).where(sql`order_number = ${data.order_number}`);
    expect(orders[0].totalPkr).toBe(6499); // free shipping
  });

  it('rejects unknown SKU', async () => {
    const bad = {
      ...validPayload(),
      items: [{ sku: 'fake-product-that-does-not-exist', name: 'x', qty: 1, price: 10 }],
    };
    const res = await POST(mockRequest(bad) as any);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toMatch(/unknown/i);
  });

  it('accepts mixed-cart (bundle + individual products)', async () => {
    // Sub-project #6 Phase D: cart-driven flow can submit a bundle + à la
    // carte products in one order. Server resolves each from DB.
    const mixed = {
      ...validPayload(),
      items: [
        // Validator requires name.min(1); the cart-driven flow sends sku
        // as the name placeholder. Server overrides with DB.name anyway.
        { sku: 'clear-skin-protocol', name: 'clear-skin-protocol', qty: 1, price: 0 },
        { sku: 'vitc', name: 'vitc', qty: 2, price: 0 },
      ],
      totals: { subtotal: 0, shipping: 0, total: 0 },
      bundle_in_cart: true,
    };
    const res = await POST(mockRequest(mixed) as any);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);

    const orders = await db.select().from(schema.orders).where(sql`order_number = ${data.order_number}`);
    // 6499 bundle + 2 * 2250 vitc = 10999 subtotal; free shipping always.
    expect(orders[0].subtotalPkr).toBe(6499 + 2 * 2250);
    expect(orders[0].totalPkr).toBe(6499 + 2 * 2250);
  });
});
