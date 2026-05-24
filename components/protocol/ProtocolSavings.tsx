'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import type { Format } from '@number-flow/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { NumberTicker } from '@/lib/anim/number-ticker';
import { useReducedMotion } from '@/lib/anim/hooks';
import { useCart } from '@/lib/cart/use-cart';
import type { ProtocolStep } from '@/lib/protocols/architecture';
import { cn } from '@/lib/utils';

const PKR_PLAIN: Format = {
  maximumFractionDigits: 0,
  useGrouping: true,
};

/**
 * Layer 4 — Savings. Reframed as an editorial "prescription receipt":
 *
 *  - Header: cobalt eyebrow + italic Fraunces headline + giant % off
 *    that spring-scales in as the climax of the storytelling pattern.
 *  - Receipt block: per-item rows that stack on mobile (no table-scroll),
 *    each row showing product name + actives + price.
 *  - Climax: three big numbers in a row — Buy separately (strikethrough) →
 *    Protocol price (navy) → You save (cobalt italic, oversized). Wraps
 *    to a vertical stack on mobile.
 *  - Bottom: magnetic primary CTA wired to addBundle.
 */
export function ProtocolSavings({
  steps,
  bundleSlug,
  bundleName,
  bundlePricePkr,
  savedPkr,
  savedPct,
}: {
  steps: ProtocolStep[];
  bundleSlug?: string;
  bundleName: string;
  bundlePricePkr: number;
  savedPkr: number;
  savedPct: number;
}) {
  const reduced = !!useReducedMotion();
  const router = useRouter();
  const { addBundle } = useCart();

  const listSum = steps.reduce(
    (s, step) => s + (step.product.listPricePkr ?? step.product.pricePkr),
    0,
  );

  function handleAddBundle() {
    if (!bundleSlug) return;
    addBundle(bundleSlug);
    const legacyFn = (window as Window & { addBundleToCart?: () => void })
      .addBundleToCart;
    if (typeof legacyFn === 'function') {
      try {
        legacyFn();
      } catch {
        /* legacy DOM might be mid-mount */
      }
    }
    router.push('/cart');
  }

  return (
    <section className="relative isolate overflow-hidden border-y border-sand/40 bg-canvas-soft py-20 md:py-28">
      {/* Subtle cobalt glow corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-cobalt/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-[75rem] px-6">
        {/* ─── Header ─── */}
        <Reveal>
          <header className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-[40rem]">
              <Eyebrow className="mb-4 text-cobalt">— The arithmetic</Eyebrow>
              <h2 className="font-display font-light text-navy text-[clamp(28px,4.5vw,48px)] leading-[1.05] tracking-[-0.02em]">
                What the protocol saves you,{' '}
                <em className="italic text-cobalt">in rupees.</em>
              </h2>
            </div>
            {savedPct > 0 && (
              <motion.div
                initial={reduced ? false : { scale: 0.85, opacity: 0 }}
                whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-baseline gap-3"
              >
                <span className="font-display font-light italic text-cobalt text-[clamp(56px,10vw,108px)] leading-[0.85] tabular-nums">
                  <NumberTicker value={savedPct} suffix="%" />
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  off
                </span>
              </motion.div>
            )}
          </header>
        </Reveal>

        {/* ─── Receipt block ─── */}
        <Reveal>
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl border border-sand/60 bg-card',
              'shadow-[0_30px_60px_-30px_rgba(14,31,58,0.22)]',
            )}
          >
            {/* "receipt" stamp top-right */}
            <div className="absolute right-5 top-5 hidden flex-col items-end gap-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint md:flex">
              <span className="text-cobalt">Rx · CS-001</span>
              <span>12-week supply</span>
            </div>

            {/* Receipt header */}
            <div className="border-b border-sand/40 px-6 py-5 md:px-9 md:py-6">
              <Eyebrow className="text-ink-mute">Itemized</Eyebrow>
              <p className="mt-1 font-display italic text-[clamp(18px,2.2vw,24px)] text-navy">
                {bundleName.replace(/^The\s+/, '')} — line by line.
              </p>
            </div>

            {/* Items — stacked rows (mobile-first, no horizontal scroll) */}
            <ul className="divide-y divide-sand/40">
              {steps.map((step, i) => (
                <motion.li
                  key={step.product.sku}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-5% 0px' }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center justify-between gap-4 px-6 py-4 md:px-9 md:py-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint tabular-nums">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-display italic text-[clamp(15px,1.8vw,18px)] text-navy">
                        {step.product.name}
                      </h3>
                    </div>
                    {step.product.actives && (
                      <p className="mt-1 ml-8 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                        {step.product.actives}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 font-mono tabular-nums text-[14px] text-ink-2 md:text-[15px]">
                    Rs.{' '}
                    <NumberTicker
                      value={step.product.listPricePkr ?? step.product.pricePkr}
                      format={PKR_PLAIN}
                    />
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Sub-total */}
            <div className="flex items-baseline justify-between gap-4 border-t border-sand/40 bg-canvas-warm/30 px-6 py-4 md:px-9 md:py-5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute">
                Buy separately
              </span>
              <span className="font-mono tabular-nums text-[15px] text-ink-2 md:text-[16px]">
                Rs. <NumberTicker value={listSum} format={PKR_PLAIN} />
              </span>
            </div>
          </div>
        </Reveal>

        {/* ─── Climax — 3-column comparison (stacks on mobile) ─── */}
        <RevealGroup stagger={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-4 md:rounded-2xl md:border md:border-cobalt/30 md:bg-cobalt/5 md:p-8">
            {/* À la carte */}
            <Reveal>
              <div className="text-center md:text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                  À la carte
                </span>
                <div className="mt-2 font-display font-light tabular-nums text-ink-mute text-[clamp(28px,4vw,38px)] leading-none">
                  <span className="relative">
                    <span className="absolute inset-y-0 left-0 right-0 top-1/2 h-px bg-ink-mute" aria-hidden="true" />
                    Rs. <NumberTicker value={listSum} format={PKR_PLAIN} />
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Arrow — hidden on mobile (stacked layout uses vertical visual flow) */}
            <ArrowDivider />

            {/* Protocol price */}
            <Reveal>
              <div className="text-center md:text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt">
                  Protocol price
                </span>
                <div className="mt-2 font-display font-light italic tabular-nums text-navy text-[clamp(36px,6vw,56px)] leading-none">
                  Rs. <NumberTicker value={bundlePricePkr} format={PKR_PLAIN} />
                </div>
              </div>
            </Reveal>

            {savedPkr > 0 && (
              <>
                {/* Equals divider */}
                <EqualsDivider />

                {/* You save */}
                <Reveal>
                  <div className="text-center md:text-left">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt">
                      You save
                    </span>
                    <div className="mt-2 font-display font-light italic tabular-nums text-cobalt text-[clamp(36px,6vw,56px)] leading-none">
                      Rs. <NumberTicker value={savedPkr} format={PKR_PLAIN} />
                    </div>
                  </div>
                </Reveal>
              </>
            )}
          </div>
        </RevealGroup>

        {/* ─── Bottom — CTA + COD line ─── */}
        <Reveal>
          <div className="mt-10 flex flex-col items-start gap-6 md:mt-12 md:flex-row md:items-center md:justify-between">
            <p className="font-display italic text-[15px] leading-relaxed text-ink-mute md:max-w-[28rem]">
              Cash on delivery across Pakistan · flat Rs. 250 shipping · no
              advance payment.
            </p>
            {bundleSlug && (
              <Magnetic strength={6}>
                <button
                  type="button"
                  onClick={handleAddBundle}
                  className={cn(
                    'group/btn inline-flex h-14 items-center gap-3 rounded-md bg-navy px-7 text-white',
                    'font-mono text-[12px] font-semibold uppercase tracking-[0.18em]',
                    'shadow-[0_18px_36px_-16px_rgba(14,31,58,0.4)]',
                    'transition-colors duration-300 hover:bg-navy-2',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-soft',
                  )}
                >
                  Add the protocol — Rs.{' '}
                  {bundlePricePkr.toLocaleString('en-PK')}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </Magnetic>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArrowDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center text-ink-faint md:mx-2"
    >
      {/* Horizontal arrow on desktop, vertical chevron on mobile */}
      <ArrowRight className="hidden h-5 w-5 md:block" />
      <svg
        className="block h-4 w-4 md:hidden"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3v10M3 9l5 5 5-5" />
      </svg>
    </div>
  );
}

function EqualsDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center text-cobalt md:mx-2"
    >
      {/* "=" on desktop, vertical chevron on mobile */}
      <span className="hidden font-display font-light text-[clamp(28px,3vw,36px)] leading-none md:block">
        =
      </span>
      <svg
        className="block h-4 w-4 md:hidden"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3v10M3 9l5 5 5-5" />
      </svg>
    </div>
  );
}
