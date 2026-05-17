import { describe, it, expect } from 'vitest';
import {
  computeTotals,
  FREE_SHIPPING_THRESHOLD_PKR,
  FLAT_SHIPPING_PKR,
} from '@/lib/orders/compute-totals';

describe('computeTotals', () => {
  const sampleItems = (
    overrides: Partial<{ sku: string; price: number; qty: number; isBundle: boolean }>[] = [],
  ) =>
    overrides.map((o) => ({
      sku: o.sku ?? 'acne',
      name: 'X',
      qty: o.qty ?? 1,
      unitPricePkr: o.price ?? 2100,
      isBundle: o.isBundle ?? false,
    }));

  it('returns subtotal + shipping + total for items below free-ship threshold', () => {
    const items = sampleItems([{ price: 2100 }]);
    const r = computeTotals(items);
    expect(r.subtotal).toBe(2100);
    expect(r.shipping).toBe(FLAT_SHIPPING_PKR);
    expect(r.total).toBe(2100 + FLAT_SHIPPING_PKR);
  });

  it('zeros shipping when subtotal meets free-ship threshold', () => {
    const items = sampleItems([{ price: FREE_SHIPPING_THRESHOLD_PKR }]);
    const r = computeTotals(items);
    expect(r.subtotal).toBe(FREE_SHIPPING_THRESHOLD_PKR);
    expect(r.shipping).toBe(0);
    expect(r.total).toBe(FREE_SHIPPING_THRESHOLD_PKR);
  });

  it('handles multiple items with quantities', () => {
    const items = sampleItems([
      { price: 1000, qty: 2 },
      { price: 500, qty: 3 },
    ]);
    const r = computeTotals(items);
    expect(r.subtotal).toBe(1000 * 2 + 500 * 3);
  });

  it('returns 0 shipping when items array is empty (degenerate case)', () => {
    const r = computeTotals([]);
    expect(r.subtotal).toBe(0);
    expect(r.shipping).toBe(0);
    expect(r.total).toBe(0);
  });
});
