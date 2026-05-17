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
  payment: 'cod' as const,
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
    expect(orders[0].totalPkr).toBe(6499);
  });

  it('rejects invalid payload', async () => {
    const res = await POST(mockRequest({ junk: true }) as any);
    expect(res.status).toBe(400);
  });

  it('rejects price-tampered total', async () => {
    const tampered = { ...validPayload(), totals: { subtotal: 6499, shipping: 0, total: 1 } };
    const res = await POST(mockRequest(tampered) as any);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toMatch(/total/i);
  });
});
