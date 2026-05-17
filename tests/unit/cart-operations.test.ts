import { describe, it, expect } from 'vitest';
import {
  emptyCart,
  addBundle,
  addProduct,
  removeItem,
  updateQty,
  clearCart,
  countItems,
} from '@/lib/cart/operations';

describe('cart operations', () => {
  it('emptyCart returns a cart with no items and a current timestamp', () => {
    const c = emptyCart();
    expect(c.items).toEqual([]);
    expect(c.createdAt).toBeGreaterThan(0);
  });

  it('addBundle adds a bundle line', () => {
    const c = addBundle(emptyCart(), 'clear-skin-protocol');
    expect(c.items).toEqual([{ type: 'bundle', slug: 'clear-skin-protocol', qty: 1 }]);
  });

  it('addBundle replaces an existing bundle with the same slug (qty always 1)', () => {
    let c = addBundle(emptyCart(), 'clear-skin-protocol');
    c = addBundle(c, 'clear-skin-protocol');
    expect(c.items).toHaveLength(1);
  });

  it('addBundle keeps multiple distinct bundles', () => {
    let c = addBundle(emptyCart(), 'clear-skin-protocol');
    c = addBundle(c, 'even-tone-protocol');
    expect(c.items).toHaveLength(2);
  });

  it('addProduct adds a product line with qty 1 by default', () => {
    const c = addProduct(emptyCart(), 'vitc');
    expect(c.items).toEqual([{ type: 'product', sku: 'vitc', qty: 1 }]);
  });

  it('addProduct increments existing product line', () => {
    let c = addProduct(emptyCart(), 'vitc');
    c = addProduct(c, 'vitc');
    expect(c.items).toEqual([{ type: 'product', sku: 'vitc', qty: 2 }]);
  });

  it('addProduct with explicit qty respects the argument', () => {
    const c = addProduct(emptyCart(), 'vitc', 3);
    expect(c.items[0]).toMatchObject({ qty: 3 });
  });

  it('removeItem deletes by index', () => {
    let c = addBundle(emptyCart(), 'clear-skin-protocol');
    c = addProduct(c, 'vitc');
    c = removeItem(c, 0);
    expect(c.items).toEqual([{ type: 'product', sku: 'vitc', qty: 1 }]);
  });

  it('updateQty changes a product line qty', () => {
    let c = addProduct(emptyCart(), 'vitc');
    c = updateQty(c, 0, 5);
    expect(c.items[0]).toMatchObject({ qty: 5 });
  });

  it('updateQty <= 0 removes the line', () => {
    let c = addProduct(emptyCart(), 'vitc');
    c = updateQty(c, 0, 0);
    expect(c.items).toEqual([]);
  });

  it('updateQty on a bundle is a no-op (bundles are always qty 1)', () => {
    let c = addBundle(emptyCart(), 'clear-skin-protocol');
    c = updateQty(c, 0, 5);
    expect(c.items[0]).toMatchObject({ qty: 1 });
  });

  it('clearCart resets to empty', () => {
    let c = addBundle(emptyCart(), 'clear-skin-protocol');
    c = addProduct(c, 'vitc', 3);
    c = clearCart(c);
    expect(c.items).toEqual([]);
  });

  it('countItems sums quantities', () => {
    let c = addBundle(emptyCart(), 'clear-skin-protocol');
    c = addProduct(c, 'vitc', 3);
    expect(countItems(c)).toBe(4);
  });
});
