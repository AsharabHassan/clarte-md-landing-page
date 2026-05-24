'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/lib/cart/use-cart';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { UpsellRow } from '@/components/marketing/UpsellRow';
import { TrustStrip } from '@/components/marketing/TrustStrip';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { useReducedMotion } from '@/lib/anim/hooks';
import { PRODUCT_META, BUNDLE_META } from '@/lib/products/catalog';
import { bundleCinematicPath } from '@/lib/products/content';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { cart, removeItem, updateQty } = useCart();
  const reduced = useReducedMotion();

  if (cart.items.length === 0) {
    return (
      <div className="bg-canvas">
        <RevealGroup stagger={0.12}>
          <div className="mx-auto max-w-[42rem] px-6 pt-24 pb-16 text-center md:pt-32 md:pb-24">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                <ShoppingBag className="h-3.5 w-3.5" /> Nothing here yet
              </span>
            </Reveal>
            <Reveal>
              <h1 className="mb-6 font-display font-light text-navy text-[clamp(36px,5.5vw,64px)] leading-[1.02] tracking-[-0.025em]">
                Your cart is <em className="italic">empty.</em>
              </h1>
            </Reveal>
            <Reveal>
              <p className="mb-10 font-display italic text-[clamp(16px,1.6vw,21px)] leading-relaxed text-ink-mute">
                Twelve weeks. One protocol. Pick yours.
              </p>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Magnetic strength={6}>
                  <Button asChild size="lg" className="h-14 px-8 text-[15px]">
                    <Link href="/quiz">Take the skin quiz</Link>
                  </Button>
                </Magnetic>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-[15px]">
                  <Link href="/products">Browse the catalogue →</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </RevealGroup>
        {/* Trust strip + upsell on the empty state — keep momentum even when cart is empty */}
        <div className="mx-auto max-w-[60rem] px-6 pb-16">
          <TrustStrip variant="cards" tone="light" limit={6} />
        </div>
        <UpsellRow
          title="Where most customers start."
          sub="The single product add-ons that go with any protocol."
          hideWhenEmpty={false}
        />
      </div>
    );
  }

  return (
    <div className="bg-canvas pb-24 lg:pb-16">
      {/* Header band */}
      <header className="border-b border-rule bg-canvas-soft">
        <div className="mx-auto max-w-[75rem] px-6 pt-10 pb-7 md:pt-14 md:pb-8">
          <Reveal>
            <Eyebrow className="mb-3 text-cobalt">— Your cart</Eyebrow>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h1 className="font-display font-light text-navy text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-[-0.025em]">
                Review your <em className="italic">order.</em>
              </h1>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto grid max-w-[75rem] grid-cols-1 items-start gap-6 px-6 pt-8 md:pt-12 lg:grid-cols-[1fr_24rem] lg:gap-10">
        {/* Line items */}
        <div className="flex flex-col">
          <AnimatePresence initial={true}>
            {cart.items.map((item, idx) => {
              const isBundle = item.type === 'bundle';
              const key = isBundle ? item.slug : item.sku;
              const meta = isBundle ? BUNDLE_META[key] : PRODUCT_META[key];
              const name = meta?.name ?? key;
              const thumb = isBundle
                ? bundleCinematicPath(key)
                : PRODUCT_META[key]?.imagePath ?? '/products/vitc/hero.webp';
              const subline = isBundle
                ? '12-week protocol · 4 sealed bottles'
                : PRODUCT_META[key]?.actives ?? '';

              return (
                <motion.div
                  key={`${item.type}-${key}-${idx}`}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: -32,
                          height: 0,
                          marginTop: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                        }
                  }
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex items-start gap-4 border-b border-rule py-5 first:border-t md:gap-5 md:py-6"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-rule bg-canvas-soft md:h-24 md:w-24">
                    <Image
                      src={thumb}
                      alt={name}
                      fill
                      sizes="(min-width: 768px) 96px, 80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Name + meta + qty controls */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Eyebrow className="mb-1 text-cobalt">
                          {isBundle ? 'Protocol' : 'Single product'}
                        </Eyebrow>
                        <h2 className="truncate font-display text-[16px] font-medium leading-tight text-navy md:text-[18px]">
                          {name}
                        </h2>
                        {subline && (
                          <p className="mt-1 line-clamp-1 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-mute">
                            {subline}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        aria-label="Remove"
                        className={cn(
                          'shrink-0 rounded-full p-1.5 text-ink-mute opacity-70 transition-[color,background-color,opacity]',
                          'hover:bg-rose-50 hover:text-destructive hover:opacity-100',
                        )}
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* qty row */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      {!isBundle ? (
                        <div className="inline-flex items-center gap-1 rounded-lg border border-rule bg-card p-1">
                          <QtyBtn
                            label="Decrease"
                            onClick={() => updateQty(idx, item.qty - 1)}
                          >
                            −
                          </QtyBtn>
                          <motion.span
                            key={item.qty}
                            initial={reduced ? false : { y: -4, opacity: 0 }}
                            animate={reduced ? undefined : { y: 0, opacity: 1 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="min-w-[26px] text-center font-mono text-[13px] tabular-nums text-navy"
                          >
                            {item.qty}
                          </motion.span>
                          <QtyBtn
                            label="Increase"
                            onClick={() => updateQty(idx, item.qty + 1)}
                          >
                            +
                          </QtyBtn>
                        </div>
                      ) : (
                        <span className="rounded-full bg-cobalt/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cobalt">
                          12 weeks · one shipment
                        </span>
                      )}

                      {/* Per-item price */}
                      {!isBundle && PRODUCT_META[key] && (
                        <span className="font-mono text-[13px] tabular-nums text-navy">
                          Rs. {(PRODUCT_META[key].pricePkr * item.qty).toLocaleString('en-PK')}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Continue shopping link + mobile CTA */}
          <Reveal>
            <div className="mt-6 flex items-center justify-between gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-[14px] text-ink-mute transition-colors hover:text-navy hover:underline"
              >
                ← Keep browsing
              </Link>
              {/* Desktop checkout CTA — mobile uses the sticky bottom button in OrderSummary */}
              <Magnetic strength={5}>
                <Button asChild size="lg" className="hidden h-14 px-7 text-[15px] lg:inline-flex">
                  <Link href="/checkout" className="inline-flex items-center gap-2">
                    Proceed to checkout
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Order summary — desktop sticky sidebar, mobile collapsible band */}
        <Reveal delay={0.1}>
          <OrderSummary cart={cart} showPlaceOrderButton={false} />
          {/* Mobile-only checkout CTA below the summary */}
          <div className="mt-4 lg:hidden">
            <Magnetic strength={5}>
              <Button asChild size="lg" className="h-14 w-full text-[15px]">
                <Link href="/checkout" className="inline-flex items-center justify-center gap-2">
                  Proceed to checkout
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* Upsell — recommended add-ons */}
      <div className="mt-12 md:mt-16">
        <UpsellRow
          title="Pairs well with what you have."
          sub="The 1-tap add-ons our doctors recommend most often."
        />
      </div>

      {/* Trust card grid */}
      <section className="mx-auto max-w-[75rem] px-6 pt-10 md:pt-14">
        <Reveal>
          <Eyebrow className="mb-5 text-cobalt">— Why customers trust us</Eyebrow>
        </Reveal>
        <Reveal>
          <TrustStrip variant="cards" tone="light" limit={6} />
        </Reveal>
      </section>
    </div>
  );
}

function QtyBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      whileTap={reduced ? undefined : { scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      onClick={onClick}
      aria-label={label}
      className={cn(
        'h-9 w-9 rounded-md text-base text-navy md:h-8 md:w-8',
        'transition-colors hover:bg-sky',
      )}
    >
      {children}
    </motion.button>
  );
}
