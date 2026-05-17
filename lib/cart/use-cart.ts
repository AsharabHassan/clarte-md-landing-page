'use client';

// Stub implementation — full cart context lands in Phase A Task 4.
// Returning a static empty cart lets SiteHeader/CartIcon compile and
// render correctly before the provider is wired.

export interface CartStub {
  items: Array<{ qty: number }>;
}

export function useCart(): { cart: CartStub } {
  return { cart: { items: [] } };
}
