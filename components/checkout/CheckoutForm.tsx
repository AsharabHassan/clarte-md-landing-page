'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Banknote, Lock, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cart/use-cart';
import { OrderSummary } from './OrderSummary';
import { CheckoutSteps } from './CheckoutSteps';
import { TrustStrip } from '@/components/marketing/TrustStrip';
import { UpsellRow } from '@/components/marketing/UpsellRow';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

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
  const reduced = useReducedMotion();

  async function handlePlaceOrder(form: HTMLFormElement) {
    setErr(null);
    if (cart.items.length === 0) {
      setErr('Your cart is empty.');
      return;
    }
    setSubmitting(true);
    const fd = new FormData(form);
    const items = cart.items.map((i) => {
      if (i.type === 'bundle') return { sku: i.slug, name: i.slug, qty: 1, price: 0 };
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
      const orderNumber = data.order_number as string;
      const last4 = phone.replace(/\D/g, '').slice(-4);
      clearCart();
      window.location.assign(`/order/${orderNumber}?phone=${last4}&placed=1`);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Network issue. WhatsApp us.');
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-canvas">
      {/* Slim header band */}
      <header className="border-b border-rule bg-canvas-soft">
        <div className="mx-auto max-w-[75rem] px-6 pt-8 pb-6 md:pt-12 md:pb-7">
          <Reveal>
            <Link
              href="/cart"
              className="mb-3 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-cobalt"
            >
              <ArrowLeft className="h-3 w-3" /> Back to cart
            </Link>
          </Reveal>
          <Reveal>
            <h1 className="font-display font-light text-navy text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-[-0.025em]">
              Place your <em className="italic">order.</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-2 max-w-[42rem] font-display italic text-[14px] leading-relaxed text-ink-mute md:text-[16px]">
              Pay the courier in cash when your parcel arrives. No card, no advance payment.
            </p>
          </Reveal>
          <div className="mt-6">
            <Reveal>
              <CheckoutSteps activeStep={3} />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Two-column layout — form left, sticky summary right; mobile collapses to single column */}
      <div className="mx-auto grid max-w-[75rem] grid-cols-1 items-start gap-8 px-6 pt-8 pb-16 lg:grid-cols-[1fr_24rem] lg:gap-10 lg:pt-12">
        <form
          id="checkoutForm"
          className="flex flex-col gap-7"
          onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder(e.currentTarget);
          }}
        >
          <RevealGroup stagger={0.08}>
            {/* COD trust hero */}
            <Reveal>
              <div
                role="region"
                aria-label="Payment method"
                className="flex items-start gap-3 rounded-2xl border border-cobalt/25 bg-canvas-soft p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cobalt/10 text-cobalt">
                  <Banknote className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <Eyebrow className="mb-1 text-cobalt">Cash on delivery</Eyebrow>
                  <p className="font-body text-[14px] leading-relaxed text-ink-2">
                    Pay the courier in cash when your parcel arrives. No advance payment, no card needed.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contact */}
            <Reveal>
              <FieldGroup legend="Contact details" hint="So we can confirm your order on WhatsApp.">
                <Field label="Full name" name="name" type="text" required minLength={1} maxLength={128} autoComplete="name" />
                <Field
                  label="Phone (PK mobile)"
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9+\-\s()]{7,32}"
                  placeholder="03XX XXXXXXX"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <Field label="Email" name="email" type="email" required maxLength={128} autoComplete="email" />
              </FieldGroup>
            </Reveal>

            {/* Shipping */}
            <Reveal>
              <FieldGroup legend="Shipping address" hint="Door-to-door courier across Pakistan.">
                <Field label="Street address" name="address" type="text" required minLength={3} maxLength={256} autoComplete="street-address" />
                <SelectField label="City" name="city" required defaultValue="">
                  <option value="" disabled>Select your city</option>
                  {PK_CITIES.map((c) => <option key={c}>{c}</option>)}
                </SelectField>
                <Field label="Postal code (optional)" name="postal" type="text" maxLength={16} autoComplete="postal-code" />
                <Field label="Delivery notes (optional)" name="notes" type="text" maxLength={256} placeholder="Landmark, gate code, etc." />
              </FieldGroup>
            </Reveal>

            {/* Payment */}
            <Reveal>
              <FieldGroup legend="Payment method" hint="Pick what works. Nothing is charged until confirmed.">
                <label
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-xl border-2 border-cobalt/40 bg-cobalt/5 p-4 transition-all',
                    'has-[:checked]:border-cobalt has-[:checked]:bg-cobalt/10',
                  )}
                >
                  <input type="radio" name="pay" value="COD" defaultChecked className="mt-1 h-4 w-4 accent-cobalt" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-[15px] font-medium text-navy">Cash on Delivery</span>
                      <span className="rounded-full bg-cobalt/15 px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-cobalt">
                        Recommended
                      </span>
                    </div>
                    <p className="mt-1 font-body text-[13px] leading-snug text-ink-mute">
                      Pay the courier in cash on arrival. WhatsApp us within 24 hours if anything&apos;s wrong.
                    </p>
                  </div>
                </label>
              </FieldGroup>
            </Reveal>

            {/* Trust strip just above place-order */}
            <Reveal>
              <TrustStrip variant="chips" tone="light" limit={5} className="mt-2" />
            </Reveal>
          </RevealGroup>

          <AnimatePresence>
            {err && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-destructive/30 bg-rose-50 p-4 text-[13.5px] leading-relaxed text-destructive"
              >
                {err}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footnote — WhatsApp escape hatch */}
          <p className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
            <MessageCircle className="h-3.5 w-3.5 text-cobalt" />
            Need help? <a href="https://wa.me/923249986822" className="font-semibold text-cobalt hover:underline">WhatsApp our team</a> — replies in ~2 hours.
          </p>
        </form>

        {/* Order summary — desktop sticky / mobile collapsible+sticky */}
        <Reveal delay={0.1}>
          <OrderSummary
            cart={cart}
            showPlaceOrderButton={true}
            submitting={submitting}
            onPlaceOrder={() => {
              const form = document.getElementById('checkoutForm') as HTMLFormElement | null;
              if (form) form.requestSubmit();
            }}
          />
        </Reveal>
      </div>

      {/* Last-mile upsell — appears below the form on desktop and after the order summary on mobile */}
      <UpsellRow
        tone="dark"
        title="Add one more thing before you go?"
        sub="Single-tap add-ons that pair with what's in your cart. Same shipment, same COD."
      />

      {/* Closing trust band */}
      <section className="bg-canvas-soft py-10 md:py-14">
        <div className="mx-auto max-w-[75rem] px-6">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cobalt" strokeWidth={1.5} />
              <Eyebrow className="text-cobalt">— Every order, every time</Eyebrow>
            </div>
          </Reveal>
          <Reveal>
            <TrustStrip variant="cards" tone="light" limit={6} />
          </Reveal>
        </div>
      </section>

      {/* Floating WhatsApp safety bar — sticks at bottom on mobile so it's always one tap away */}
      <a
        href="https://wa.me/923249986822"
        target="_blank"
        rel="noopener"
        className={cn(
          'fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_36px_-12px_rgba(5,150,105,0.5)] transition-transform hover:-translate-y-0.5',
          'lg:bottom-6 lg:right-6',
        )}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
        Stuck? WhatsApp us
      </a>
    </div>
  );
}

/* ─────────────── form primitives ─────────────── */

function FieldGroup({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-rule bg-card p-5 md:p-6">
      <legend className="px-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-cobalt">
        {legend}
      </legend>
      {hint && (
        <p className="mb-4 font-body text-[12.5px] leading-snug text-ink-mute">{hint}</p>
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  required,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
        {label}
        {required && <span aria-hidden="true" className="ml-1 text-cobalt">*</span>}
      </span>
      <input
        name={name}
        required={required}
        {...rest}
        className={cn(
          'block h-12 w-full rounded-lg border border-rule bg-card px-4 font-body text-[15px] text-navy',
          'transition-[border-color,box-shadow,transform] duration-200',
          'hover:border-navy/40',
          'focus:-translate-y-px focus:border-cobalt focus:shadow-[0_0_0_4px_rgba(46,91,168,0.14),0_10px_24px_-14px_rgba(14,31,58,0.2)] focus:outline-none',
        )}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  required,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
        {label}
        {required && <span aria-hidden="true" className="ml-1 text-cobalt">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className={cn(
          'block h-12 w-full rounded-lg border border-rule bg-card px-4 font-body text-[15px] text-navy',
          'transition-[border-color,box-shadow] duration-200',
          'hover:border-navy/40',
          'focus:border-cobalt focus:shadow-[0_0_0_4px_rgba(46,91,168,0.14)] focus:outline-none',
        )}
      >
        {children}
      </select>
    </label>
  );
}
