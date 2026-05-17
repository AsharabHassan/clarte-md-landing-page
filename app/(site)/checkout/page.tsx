'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart/use-cart';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();

  // Empty cart → bounce to /cart, which has the "browse the catalogue" CTAs.
  useEffect(() => {
    if (cart.items.length === 0) {
      router.replace('/cart');
    }
  }, [cart.items.length, router]);

  if (cart.items.length === 0) return null;

  return <CheckoutForm />;
}
