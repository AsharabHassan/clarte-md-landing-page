'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronsLeftRight, Sparkles, ArrowUpRight } from 'lucide-react';
import {
  getProtocolVisualStudies,
  type ProtocolVisualStudy,
} from '@/lib/protocols/visual-studies';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/lib/anim/reveal';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

interface ProtocolVisualStudiesProps {
  bundleSlug: string;
}

/**
 * Layer between the new Tailwind composition and the legacy body. Shows
 * per-protocol AI before/after visual studies. The first case with both
 * beforeSrc + afterSrc is rendered as a draggable comparison slider; any
 * subsequent case becomes a swap-to-feature card (mobile = swipe rail,
 * desktop = grid).
 */
export function ProtocolVisualStudies({ bundleSlug }: ProtocolVisualStudiesProps) {
  const reduced = !!useReducedMotion();
  const studies = getProtocolVisualStudies(bundleSlug);

  // All slider-able cases (have both before + after).
  const sliderCases = (studies?.cases ?? []).filter(
    (c): c is ProtocolVisualStudy & { beforeSrc: string; afterSrc: string } =>
      !!c.beforeSrc && !!c.afterSrc,
  );
  const initial = sliderCases[0] ?? (studies?.cases ?? [])[0];

  const [activeId, setActiveId] = useState<string | null>(initial?.id ?? null);

  if (!studies || !initial) return null;

  // Find the active case. Falls back to the first if the id no longer exists.
  const active =
    studies.cases.find((c) => c.id === activeId) ?? initial;
  const activeIsSlider = !!active.beforeSrc && !!active.afterSrc;
  const supporting = studies.cases.filter((c) => c.id !== active.id);
  const activeIdx = Math.max(
    0,
    studies.cases.findIndex((c) => c.id === active.id),
  );

  return (
    <section
      id="reviews"
      data-content-state="ai-visual-study"
      className="relative isolate overflow-hidden bg-canvas-soft px-4 py-20 text-navy-deep sm:px-6 md:py-28"
    >
      {/* Cinematic backdrop — blueprint grid + cobalt halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#0e1f3a_1px,transparent_1px),linear-gradient(to_bottom,#0e1f3a_1px,transparent_1px)] [background-size:80px_80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-[36rem] w-[36rem] rounded-full bg-cobalt/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-[78rem]">
        {/* ─── Header ─── */}
        <Reveal>
          <div className="mb-10 grid gap-8 md:mb-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                Visual studies
              </span>
              <h2 className="max-w-[16ch] font-display font-light text-navy-deep text-[clamp(34px,6vw,72px)] leading-[0.95] tracking-[-0.025em]">
                {studies.title}
              </h2>
            </div>
            <div className="lg:ml-auto lg:max-w-[34rem]">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                {studies.eyebrow}
              </p>
              <p className="mt-4 font-body text-[clamp(15px,1.4vw,17px)] leading-relaxed text-ink-2">
                {studies.intro}
              </p>
              <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
                <span className="tabular-nums">
                  {(activeIdx + 1).toString().padStart(2, '0')}
                </span>{' '}
                / {studies.cases.length.toString().padStart(2, '0')} ·{' '}
                {studies.cases.length} cases
              </p>
            </div>
          </div>
        </Reveal>

        {/* ─── Featured slider + side rail ─── */}
        <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          {/* Featured panel */}
          <Reveal>
            <FeaturedStudy
              key={active.id}
              study={active}
              isSliderable={activeIsSlider}
              reduced={reduced}
              index={activeIdx}
              total={studies.cases.length}
            />
          </Reveal>

          {/* Supporting rail — mobile swipe, desktop column */}
          <Reveal delay={0.1}>
            <SupportingRail
              cases={supporting}
              activeId={active.id}
              onSelect={setActiveId}
              reduced={reduced}
            />
          </Reveal>
        </div>

      </div>
    </section>
  );
}

/**
 * The big interactive panel. If the study has both before + after, render a
 * draggable comparison slider with mouse + touch. Otherwise render the pair
 * image as a static editorial frame.
 */
function FeaturedStudy({
  study,
  isSliderable,
  reduced,
  index,
  total,
}: {
  study: ProtocolVisualStudy;
  isSliderable: boolean;
  reduced: boolean;
  index: number;
  total: number;
}) {
  const [slider, setSlider] = useState(52);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSlider(Math.max(8, Math.min(92, raw)));
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging.current) return;
      const x = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      if (x != null) setFromClientX(x);
    }
    function onUp() {
      dragging.current = false;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [setFromClientX]);

  return (
    <article
      className={cn(
        'group/feat relative overflow-hidden rounded-2xl border border-navy-deep/12 bg-card',
        'shadow-[0_30px_70px_-30px_rgba(8,21,42,0.28)]',
      )}
    >
      <div
        ref={frameRef}
        className={cn(
          'relative aspect-[4/3] overflow-hidden bg-navy-deep/5 select-none sm:aspect-[16/10]',
          isSliderable ? 'cursor-ew-resize' : '',
        )}
        onMouseDown={(e) => {
          if (!isSliderable) return;
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          if (!isSliderable) return;
          dragging.current = true;
          const x = e.touches[0]?.clientX;
          if (x != null) setFromClientX(x);
        }}
      >
        {/* AFTER image (full bleed) */}
        {isSliderable && study.afterSrc ? (
          <Image
            src={study.afterSrc}
            alt={`${study.label} — ${study.week}`}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
            priority={false}
          />
        ) : study.pairSrc ? (
          <Image
            src={study.pairSrc}
            alt={`${study.label} — before and after`}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        ) : null}

        {/* BEFORE image clipped */}
        {isSliderable && study.beforeSrc && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
          >
            <Image
              src={study.beforeSrc}
              alt={`${study.label} — before`}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Light-sweep gleam on hover */}
        <div className="lightsweep-overlay" aria-hidden="true" />

        {/* Divider line + drag handle */}
        {isSliderable && (
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={
              reduced
                ? undefined
                : { boxShadow: '0 0 0 1px rgba(8,21,42,0.28)' }
            }
            style={{ left: `${slider}%` }}
            className="absolute inset-y-0 z-10 w-px bg-white"
          >
            <span
              className={cn(
                'absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full',
                'border border-white/80 bg-navy-deep/85 text-white shadow-[0_12px_24px_rgba(8,21,42,0.4)] backdrop-blur',
                'transition-transform duration-200',
                'group-hover/feat:scale-105 active:scale-95',
              )}
            >
              <ChevronsLeftRight className="h-5 w-5" />
            </span>
          </motion.div>
        )}

        {/* BEFORE / WEEK chips */}
        <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white">
          <span className="rounded-full bg-navy-deep/85 px-3 py-1.5 backdrop-blur">
            Before
          </span>
          <span className="rounded-full bg-navy-deep/85 px-3 py-1.5 backdrop-blur">
            {study.week}
          </span>
        </div>

        {/* Bottom: accessible range slider — keyboard + screen-reader path */}
        {isSliderable && (
          <input
            className={cn(
              'absolute inset-x-5 bottom-5 z-20 h-7 cursor-ew-resize accent-white',
              'opacity-50 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100',
            )}
            type="range"
            min="8"
            max="92"
            value={Math.round(slider)}
            aria-label="Move visual study before and after comparison"
            onChange={(event) => setSlider(Number(event.target.value))}
          />
        )}
      </div>

      {/* Editorial caption strip */}
      <div className="grid gap-4 border-t border-navy-deep/10 p-5 sm:grid-cols-[1fr_auto] sm:items-end md:p-7">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt tabular-nums">
              Study {(index + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
            </span>
            {isSliderable && (
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                Drag to compare
              </span>
            )}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={study.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mt-2 font-display text-[clamp(22px,2.6vw,30px)] font-light italic leading-tight text-navy-deep">
                {study.label}
              </h3>
              <p className="mt-1.5 max-w-[34rem] text-[14px] leading-snug text-ink-mute">
                {study.condition}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
          <span className="rounded-full border border-navy-deep/15 px-3 py-1.5">
            {study.area}
          </span>
          <span className="rounded-full border border-navy-deep/15 px-3 py-1.5">
            {study.week}
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * The supporting cases. Mobile-first 2-column grid that surfaces every
 * remaining case without any horizontal scrolling — tap to swap.
 *
 * Breakpoints:
 *  - mobile + tablet: 2-col grid, every card visible
 *  - desktop: compact vertical stack of up to 4 cards alongside the
 *    featured slider
 */
function SupportingRail({
  cases,
  activeId,
  onSelect,
  reduced,
}: {
  cases: ProtocolVisualStudy[];
  activeId: string;
  onSelect: (id: string) => void;
  reduced: boolean;
}) {
  return (
    <>
      {/* Mobile + tablet: 2-col grid surfacing every case at once */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {cases.map((c, i) => (
          <SupportingCard
            key={c.id}
            study={c}
            index={i + 2}
            isActive={c.id === activeId}
            onClick={() => onSelect(c.id)}
            reduced={reduced}
          />
        ))}
      </div>

      {/* Desktop: vertical stack */}
      <div className="hidden flex-col gap-4 lg:flex">
        {cases.slice(0, 4).map((c, i) => (
          <SupportingCard
            key={c.id}
            study={c}
            index={i + 2}
            isActive={c.id === activeId}
            onClick={() => onSelect(c.id)}
            reduced={reduced}
            compact
          />
        ))}
      </div>
    </>
  );
}

function SupportingCard({
  study,
  index,
  isActive,
  onClick,
  reduced,
  compact = false,
}: {
  study: ProtocolVisualStudy;
  /** Position in the overall study set (1-based, includes featured at 1). */
  index: number;
  isActive: boolean;
  onClick: () => void;
  reduced: boolean;
  compact?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileTap={reduced ? undefined : { scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'group/sup relative isolate flex w-full overflow-hidden rounded-xl border bg-card text-left',
        'transition-[border-color,box-shadow,transform] duration-300',
        isActive
          ? 'border-cobalt/60 shadow-[0_18px_36px_-18px_rgba(46,91,168,0.32)]'
          : 'border-navy-deep/12 hover:-translate-y-0.5 hover:border-navy-deep/35 hover:shadow-[0_18px_36px_-22px_rgba(8,21,42,0.22)]',
        compact ? 'flex-row items-stretch gap-4 p-3' : 'flex-col',
      )}
      aria-pressed={isActive}
      aria-label={`Switch to ${study.label} study`}
    >
      {/* Image — taller portrait crop on mobile grid for editorial impact */}
      <div
        className={cn(
          'relative overflow-hidden bg-navy-deep/5',
          compact
            ? 'h-24 w-32 shrink-0 rounded-lg'
            : 'aspect-[5/4] w-full sm:aspect-[4/3]',
        )}
      >
        {study.pairSrc ? (
          <Image
            src={study.pairSrc}
            alt={`${study.label} before-and-after pair`}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 44vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/sup:scale-[1.06]"
          />
        ) : study.beforeSrc && study.afterSrc ? (
          <div className="grid h-full grid-cols-2">
            <Image
              src={study.beforeSrc}
              alt={`${study.label} before`}
              width={200}
              height={200}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/sup:scale-[1.06]"
            />
            <Image
              src={study.afterSrc}
              alt={`${study.label} after`}
              width={200}
              height={200}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/sup:scale-[1.06]"
            />
          </div>
        ) : null}

        {/* Top gradient for chip legibility */}
        {!compact && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-navy-deep/55 to-transparent"
          />
        )}

        {/* Bottom gradient for case-number legibility */}
        {!compact && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/65 to-transparent"
          />
        )}

        {/* Active state cobalt overlay */}
        {isActive && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cobalt/12 mix-blend-multiply"
          />
        )}

        {!compact && (
          <>
            {/* Top-left: big italic study number — poster mark */}
            <span
              aria-hidden="true"
              className="absolute left-3 top-2 font-display font-light italic leading-none tracking-[-0.04em] text-white drop-shadow-[0_2px_12px_rgba(8,21,42,0.45)] text-[clamp(28px,5vw,42px)]"
            >
              {index.toString().padStart(2, '0')}
            </span>

            {/* Top-right: WEEK chip */}
            <span className="absolute right-3 top-3 rounded-full bg-navy-deep/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur">
              {study.week}
            </span>

            {/* Bottom-left: area pill */}
            <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/15 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.2em] text-white backdrop-blur">
              {study.area}
            </span>

            {/* Bottom-right: active indicator dot */}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-cobalt text-white shadow-[0_4px_10px_rgba(46,91,168,0.45)]"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            )}
          </>
        )}
      </div>

      {/* Body */}
      <div
        className={cn(
          'flex flex-1 flex-col gap-1',
          compact ? 'py-1' : 'gap-1.5 p-4 sm:p-5',
        )}
      >
        {compact ? (
          <>
            <div className="flex items-baseline justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              <span>{study.id.replace('case-', 'Study ')}</span>
              <span>{study.area}</span>
            </div>
            <h3 className="font-display text-[15px] font-light italic leading-tight text-navy-deep">
              {study.label}
            </h3>
            <span
              aria-hidden="true"
              className={cn(
                'mt-auto inline-flex items-center gap-1 self-end font-mono text-[9.5px] uppercase tracking-[0.18em] transition-colors',
                isActive ? 'text-cobalt' : 'text-ink-faint group-hover/sup:text-cobalt',
              )}
            >
              {isActive ? 'Viewing' : 'View'}
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </>
        ) : (
          <>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-cobalt">
              Study {index.toString().padStart(2, '0')}
            </span>
            <h3 className="font-display text-[clamp(15px,2.4vw,18px)] font-light italic leading-tight text-navy-deep">
              {study.label}
            </h3>
            <p className="text-[12px] leading-snug text-ink-mute line-clamp-2">
              {study.condition}
            </p>
            <span
              aria-hidden="true"
              className={cn(
                'mt-1 inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.18em] transition-colors',
                isActive ? 'text-cobalt' : 'text-ink-faint group-hover/sup:text-cobalt',
              )}
            >
              {isActive ? 'Viewing in slider' : 'Tap to view'}
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover/sup:translate-x-0.5 group-hover/sup:-translate-y-0.5" />
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}
