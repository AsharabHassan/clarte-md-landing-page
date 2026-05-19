'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import './cart.css';

export default function CartPage() {
  const { cart, removeItem, updateQty } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty.</h1>
        <p>Browse our protocols or individual products to get started.</p>
        <div className="cart-empty-actions">
          <Link href="/products" className="btn btn-primary">
            Browse the catalogue →
          </Link>
          <Link href="/quiz" className="btn btn-secondary">
            Take the skin quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Your cart</h1>
        <p>{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}</p>
      </header>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map((item, idx) => (
            <div key={`${item.type}-${idx}`} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-type mono">
                  {item.type === 'bundle' ? 'Bundle' : 'Product'}
                </div>
                <div className="cart-item-name">
                  {item.type === 'bundle' ? item.slug : item.sku}
                </div>
              </div>
              <div className="cart-item-controls">
                {item.type === 'product' ? (
                  <div className="cart-qty-control">
                    <button
                      type="button"
                      onClick={() => updateQty(idx, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(idx, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="cart-qty-fixed">×1</span>
                )}
                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => removeItem(idx)}
                  aria-label="Remove"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-checkout-cta">
            <Link href="/checkout" className="btn btn-primary">
              Proceed to checkout →
            </Link>
            <Link href="/products" className="cart-keep-shopping">
              ← Keep browsing
            </Link>
          </div>
        </div>
        <OrderSummary cart={cart} showPlaceOrderButton={false} />
      </div>
    </div>
  );
}
