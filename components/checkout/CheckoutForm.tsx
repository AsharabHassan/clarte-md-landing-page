'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart/use-cart';
import { OrderSummary } from './OrderSummary';

const PK_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Quetta',
  'Other',
];

export function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handlePlaceOrder(form: HTMLFormElement) {
    setErr(null);
    if (cart.items.length === 0) {
      setErr('Your cart is empty.');
      return;
    }
    setSubmitting(true);
    const fd = new FormData(form);

    // Map the cart into the API's items[] payload. Resolve bundles vs.
    // products here on the client (the server re-validates and recomputes
    // totals in /api/create-order, so this is just to populate names/prices).
    // For the v1 cart-driven flow, the server is also authoritative on names.
    const items = cart.items.map((i) => {
      if (i.type === 'bundle') {
        return { sku: i.slug, name: i.slug, qty: 1, price: 0 };
      }
      return { sku: i.sku, name: i.sku, qty: i.qty, price: 0 };
    });

    const phone = String(fd.get('phone') ?? '');

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          concern: 'storefront',
          page: 'checkout',
          contact: {
            name: fd.get('name'),
            phone,
            email: fd.get('email'),
          },
          shipping: {
            address: fd.get('address'),
            city: fd.get('city'),
            postal: fd.get('postal') || '',
            notes: fd.get('notes') || '',
          },
          payment: fd.get('pay'),
          items,
          totals: { subtotal: 0, shipping: 0, total: 0 }, // server recomputes
          bundle_in_cart: cart.items.some((i) => i.type === 'bundle'),
          used_ai_preview: false,
          ts: new Date().toISOString(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(
          data.error ||
            "We couldn't place your order (status " +
              res.status +
              '). WhatsApp us and we will take it manually.',
        );
        setSubmitting(false);
        return;
      }
      // Success: clear cart + jump to the tracking page via a hard
      // navigation. Soft routing (router.push) races against
      // /checkout's empty-cart bounce useEffect — clearing the cart
      // re-renders /checkout, which redirects back to /cart before
      // the push completes. window.location.assign starts unloading
      // immediately, beating React's reconciliation.
      const orderNumber = data.order_number as string;
      const last4 = phone.replace(/\D/g, '').slice(-4);
      clearCart();
      window.location.assign(`/order/${orderNumber}?phone=${last4}`);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Network issue. WhatsApp us.');
      setSubmitting(false);
    }
  }

  return (
    <div className="checkout-layout">
      <form
        id="checkoutForm"
        className="checkout-form"
        onSubmit={(e) => {
          e.preventDefault();
          handlePlaceOrder(e.currentTarget);
        }}
      >
        <h2 className="display">Checkout</h2>

        <fieldset className="form-group">
          <legend>Contact</legend>
          <label>
            Full name
            <input name="name" type="text" required minLength={1} maxLength={128} />
          </label>
          <label>
            Phone (PK mobile)
            <input
              name="phone"
              type="tel"
              required
              pattern="[0-9+\-\s()]{7,32}"
              placeholder="03XX XXXXXXX"
            />
          </label>
          <label>
            Email
            <input name="email" type="email" required maxLength={128} />
          </label>
        </fieldset>

        <fieldset className="form-group">
          <legend>Shipping</legend>
          <label>
            Address
            <input name="address" type="text" required minLength={3} maxLength={256} />
          </label>
          <label>
            City
            <select name="city" required defaultValue="">
              <option value="" disabled>
                Select city
              </option>
              {PK_CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Postal code (optional)
            <input name="postal" type="text" maxLength={16} />
          </label>
          <label>
            Notes (optional)
            <input name="notes" type="text" maxLength={256} />
          </label>
        </fieldset>

        <fieldset className="form-group">
          <legend>Payment</legend>
          <p className="form-sub">Pick what works. Nothing is charged until you confirm.</p>
          <label className="pay-opt">
            <input type="radio" name="pay" value="COD" defaultChecked />
            <div>
              <div className="pay-name">Cash on Delivery</div>
              <span className="pay-sub">Pay the courier on arrival</span>
            </div>
          </label>
          <div className="trust-cod">
            <span className="mono eyebrow">Pay on Delivery</span>
            <p>
              Open the parcel at your door. <em>Then</em> pay the courier. If the bottle
              looks wrong, refuse it — no charge, no questions.
            </p>
          </div>
        </fieldset>

        {err && <p className="form-error">{err}</p>}
      </form>

      <OrderSummary
        cart={cart}
        showPlaceOrderButton={true}
        submitting={submitting}
        onPlaceOrder={() => {
          const form = document.getElementById('checkoutForm') as HTMLFormElement | null;
          if (form) form.requestSubmit();
        }}
      />
    </div>
  );
}
