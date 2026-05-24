'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { useReducedMotion } from '@/lib/anim/hooks';
import type { ProtocolStep } from '@/lib/protocols/architecture';
import { cn } from '@/lib/utils';

/**
 * Layer 3 — Steps. Mobile-first cinematic composition:
 *
 *  - **Mobile (< 640px):** horizontal scroll-snap rail. Each card takes
 *    ~84% of viewport width so the next is just hinted at the edge.
 *    Snap-mandatory. Swipe through them. A floating bottom badge updates
 *    with the visible card.
 *  - **Tablet (≥ 640px):** 2-column grid.
 *  - **Desktop (≥ 1024px):** auto-fit grid + per-card active highlight
 *    driven by scroll position.
 *
 * Every card shows a giant italic Fraunces step number overlaid on the
 * top-left of the product photo — feels like an editorial poster, not a
 * grid thumbnail. Tap (mobile) and hover (desktop) both reward attention.
 */
export function ProtocolSteps({
  steps,
  totalWeeks = 12,
}: {
  steps: ProtocolStep[];
  totalWeeks?: number;
}) {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);

  // Desktop: scroll progress across the whole section drives the progress bar.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end end'],
  });
  const fillPct = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Active card tracking — works for both the desktop vertical-grid case
  // and the mobile horizontal-rail case. IntersectionObserver picks the
  // card with the largest intersection ratio.
  useEffect(() => {
    if (reduced) return;
    const obs = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1;
        let bestRatio = 0;
        for (const e of entries) {
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIndex = Number((e.target as HTMLElement).dataset.idx ?? '-1');
          }
        }
        if (bestIndex >= 0) setActive(bestIndex);
      },
      {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: '-20% 0px -20% 0px',
      },
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [reduced, steps.length]);

  return (
    <section ref={sectionRef} className="relative bg-canvas py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[75rem] px-6">
        {/* ─── Header ─── */}
        <Reveal>
          <header className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end lg:mb-20">
            <div className="max-w-[42rem]">
              <Eyebrow className="mb-4 text-cobalt">— The protocol</Eyebrow>
              <h2 className="font-display font-light text-navy text-[clamp(28px,5vw,52px)] leading-[1.05] tracking-[-0.02em]">
                {numberWord(steps.length)} steps. {totalWeeks} weeks.{' '}
                <em className="italic text-cobalt">One regimen.</em>
              </h2>
              <p className="mt-3 font-display italic text-[clamp(15px,1.6vw,20px)] leading-relaxed text-ink-mute">
                Each step is clinically dosed and sequenced — the order matters
                as much as the active.
              </p>
            </div>
            <div className="flex w-full max-w-[16rem] flex-col items-stretch gap-2 md:items-end">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint md:text-right">
                Step{' '}
                <motion.span
                  key={active}
                  initial={reduced ? false : { y: -6, opacity: 0 }}
                  animate={reduced ? undefined : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-cobalt tabular-nums"
                >
                  {(active + 1).toString().padStart(2, '0')}
                </motion.span>{' '}
                / {steps.length.toString().padStart(2, '0')}
              </span>
              <div className="h-px w-full overflow-hidden rounded-full bg-sand/60">
                <motion.div
                  className="h-full origin-left bg-cobalt"
                  style={reduced ? { width: '100%' } : { width: fillPct }}
                />
              </div>
            </div>
          </header>
        </Reveal>

        {/* ─────────────────────────────────────────────────────────────
            MOBILE RAIL — horizontal scroll-snap, 84vw cards
            ───────────────────────────────────────────────────────────── */}
        <div
          ref={railRef}
          className={cn(
            '-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 pt-1',
            'sm:hidden',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          {steps.map((step, i) => (
            <div
              key={step.product.sku}
              className="w-[84%] flex-shrink-0 snap-start"
              ref={(el) => {
                if (el) cardRefs.current[i] = el as unknown as HTMLLIElement;
              }}
              data-idx={i}
            >
              <CinematicStepCard step={step} isActive={i === active} reduced={reduced} mobile />
            </div>
          ))}
          {/* trailing peek — gives the last card breathing room before edge */}
          <div className="w-2 flex-shrink-0" aria-hidden="true" />
        </div>

        {/* Mobile rail hint */}
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint sm:hidden">
          <span>Swipe</span>
          <span className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={cn(
                  'h-1 w-1 rounded-full transition-colors duration-500',
                  i === active ? 'bg-cobalt' : 'bg-sand',
                )}
              />
            ))}
          </span>
          <span>{(active + 1).toString().padStart(2, '0')} / {steps.length.toString().padStart(2, '0')}</span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TABLET + DESKTOP GRID — auto-fit, IntersectionObserver-driven
            active state
            ───────────────────────────────────────────────────────────── */}
        <RevealGroup stagger={0.06}>
          <ol
            className={cn(
              'hidden gap-5',
              'sm:grid sm:grid-cols-2',
              'lg:grid-cols-[repeat(auto-fit,minmax(17rem,1fr))]',
            )}
          >
            {steps.map((step, i) => (
              <Reveal key={step.product.sku}>
                <li
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-idx={i}
                  className="relative h-full"
                >
                  <CinematicStepCard
                    step={step}
                    isActive={i === active}
                    reduced={reduced}
                  />
                </li>
              </Reveal>
            ))}
          </ol>
        </RevealGroup>
      </div>

      {/* ─── Mobile floating step badge ─── */}
      <MobileStepBadge active={active} total={steps.length} sectionRef={sectionRef} reduced={reduced} />
    </section>
  );
}

/**
 * Single step card. `mobile` flag tunes touch feedback + relative sizing
 * for the swipe rail.
 */
function CinematicStepCard({
  step,
  isActive,
  reduced,
  mobile = false,
}: {
  step: ProtocolStep;
  isActive: boolean;
  reduced: boolean;
  mobile?: boolean;
}) {
  return (
    <motion.div
      whileHover={
        reduced || mobile ? undefined : { y: -6, rotateX: 1.5, rotateY: -1.5 }
      }
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
      animate={
        reduced
          ? undefined
          : isActive
            ? {
                boxShadow:
                  '0 28px 56px -22px rgba(46, 91, 168, 0.32), 0 1px 0 rgba(46, 91, 168, 0.18)',
              }
            : {
                boxShadow:
                  '0 0px 0px 0px rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)',
              }
      }
      className="h-full"
    >
      <Link
        href={`/products/${step.product.sku}`}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card',
          'no-underline text-inherit transition-[border-color] duration-300',
          isActive ? 'border-cobalt/60' : 'border-sand/40 hover:border-navy/30',
        )}
      >
        {/* ─── Photo + cinematic number overlay ─── */}
        <div
          className={cn(
            'relative isolate flex items-center justify-center overflow-hidden bg-canvas-soft',
            mobile ? 'aspect-[4/5]' : 'aspect-[4/3]',
          )}
        >
          {step.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={step.image}
              alt={step.product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <span className="font-mono text-[11px] text-ink-faint">
              [Photo pending]
            </span>
          )}

          {/* Gradient for legibility of overlaid number/stage badge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-navy-deep/45 via-navy-deep/15 to-transparent"
          />

          {/* Light-sweep gleam */}
          <div className="lightsweep-overlay" aria-hidden="true" />

          {/* Giant italic step number — top-left poster mark */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-4 top-3 font-display font-light italic leading-none tracking-[-0.04em] text-white drop-shadow-[0_4px_24px_rgba(8,21,42,0.4)]',
              mobile ? 'text-[68px]' : 'text-[56px] md:text-[64px]',
            )}
          >
            {step.num.toString().padStart(2, '0')}
          </span>

          {/* Stage chip — top-right */}
          <span
            className={cn(
              'absolute right-4 top-4 inline-flex items-center rounded-full px-3 py-1.5',
              'bg-white/12 backdrop-blur-md',
              'font-mono text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white',
              'border border-white/20',
            )}
          >
            {step.stage}
          </span>

          {/* Active dot */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full transition-all duration-500',
              isActive ? 'scale-150 bg-cobalt-glow' : 'scale-100 bg-white/50',
            )}
          />
        </div>

        {/* ─── Body ─── */}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt">
            Step {step.num.toString().padStart(2, '0')}
          </span>

          <h3 className="font-display text-[clamp(20px,2.4vw,26px)] font-light italic leading-tight text-navy">
            {step.product.name}
          </h3>

          {step.purpose && (
            <p className="flex-1 font-body text-[14px] leading-relaxed text-ink-mute">
              {step.purpose}
            </p>
          )}

          <div className="mt-2 flex items-baseline justify-between border-t border-sand/40 pt-4">
            <span className="font-display text-base text-navy">
              Rs. {step.product.pricePkr.toLocaleString('en-PK')}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt transition-transform duration-300 group-hover:translate-x-1">
              View product
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Floating mobile pill that pins to the bottom when the user is inside
 * the steps section. Shows current step name + count.
 */
function MobileStepBadge({
  active,
  total,
  sectionRef,
  reduced,
}: {
  active: number;
  total: number;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  reduced: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.4], rootMargin: '-15% 0px -15% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionRef]);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={
        reduced
          ? { opacity: visible ? 1 : 0 }
          : { opacity: visible ? 1 : 0, y: visible ? 0 : 20 }
      }
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center px-6 sm:hidden',
        !visible && 'pointer-events-none',
      )}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3 rounded-full border border-navy/15 bg-canvas/95 px-4 py-2 shadow-[0_10px_30px_-12px_rgba(14,31,58,0.35)] backdrop-blur-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt tabular-nums">
          Step {(active + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
        </span>
        <span aria-hidden="true" className="h-3 w-px bg-sand" />
        <span className="flex items-center gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                'h-1 rounded-full transition-all duration-400',
                i === active ? 'w-4 bg-cobalt' : 'w-1 bg-sand',
              )}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

const NUMBER_WORDS: Record<number, string> = {
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
};

function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? `${n}`;
}
