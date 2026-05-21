'use client';

import { useEffect, useState } from 'react';
import type { Cart } from '@/lib/cart/types';

interface PreviewItem {
  sku: string;
  name: string;
  qty: number;
  unit_price_pkr: number;
  line_total_pkr: number;
  is_bundle: boolean;
}

interface Preview {
  items: PreviewItem[];
  totals: { subtotal_pkr: number; shipping_pkr: number; total_pkr: number };
}

interface OrderSummaryProps {
  cart: Cart;
  showPlaceOrderButton: boolean;
  submitting?: boolean;
  onPlaceOrder?: () => void;
}

export function OrderSummary({
  cart,
  showPlaceOrderButton,
  submitting,
  onPlaceOrder,
}: OrderSummaryProps) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (cart.items.length === 0) {
      setPreview(null);
      return;
    }
    (async () => {
      try {
        const res = await fetch('/api/cart/preview', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ items: cart.items }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setErr(data.error || 'Could not load cart totals');
          return;
        }
        setPreview(data);
        setErr(null);
      } catch (e: unknown) {
        if (!cancelled)
          setErr(e instanceof Error ? e.message : 'Could not load cart totals');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cart]);

  if (cart.items.length === 0) {
    return (
      <aside className="order-summary">
        <h3 className="display">Order summary</h3>
        <p className="os-empty">Your cart is empty.</p>
      </aside>
    );
  }

  if (err) {
    return (
      <aside className="order-summary">
        <h3 className="display">Order summary</h3>
        <p className="os-error">{err}</p>
      </aside>
    );
  }

  if (!preview) {
    return (
      <aside className="order-summary">
        <h3 className="display">Order summary</h3>
        <p className="os-loading">Loading…</p>
      </aside>
    );
  }

  return (
    <aside className="order-summary">
      <h3 className="display">Order summary</h3>
      <ul className="os-items">
        {preview.items.map((i, idx) => (
          <li key={idx} className="os-item">
            <div className="os-item-name">
              {i.name}
              {i.is_bundle && <span className="os-bundle-chip">Bundle</span>}
            </div>
            <div className="os-item-qty">×{i.qty}</div>
            <div className="os-item-price">Rs. {i.line_total_pkr.toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <div className="os-totals">
        <div className="os-row">
          <span>Subtotal</span>
          <span>Rs. {preview.totals.subtotal_pkr.toLocaleString()}</span>
        </div>
        <div className="os-row">
          <span>Shipping</span>
          <span>Rs. {preview.totals.shipping_pkr.toLocaleString()}</span>
        </div>
        <div className="os-row os-grand">
          <span>Total</span>
          <span>Rs. {preview.totals.total_pkr.toLocaleString()}</span>
        </div>
      </div>
      {showPlaceOrderButton && (
        <button
          type="button"
          className="os-place-order"
          disabled={submitting}
          onClick={onPlaceOrder}
        >
          {submitting ? 'Placing order…' : 'Place order →'}
        </button>
      )}
      <p className="os-foot">By placing your order you agree to our return policy.</p>
    </aside>
  );
}
