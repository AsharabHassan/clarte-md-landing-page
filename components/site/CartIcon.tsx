'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';

export function CartIcon() {
  const { cart } = useCart();
  const count = cart.items.reduce((n, i) => n + i.qty, 0);

  return (
    <Link href="/cart" aria-label="Cart" className="site-cart-icon">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M3 4h2l2 12h12l2-8H6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="17" cy="20" r="1.5" fill="currentColor" />
      </svg>
      {count > 0 && <span className="site-cart-badge">{count}</span>}
    </Link>
  );
}
