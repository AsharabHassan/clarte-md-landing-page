'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Star, BadgeCheck, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Reveal } from '@/lib/anim/reveal';
import { useReducedMotion } from '@/lib/anim/hooks';
import {
  REVIEWS,
  reviewStats,
  type Review,
  type ReviewPhoto,
  type StarBucket,
} from '@/lib/marketing/reviews';
import { cn } from '@/lib/utils';

/* ── Star rating — 5 slots, fractional fill via clipped overlay ──────── */
function StarRating({
  rating,
  size = 14,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('inline-flex items-center gap-0.5', className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i)); // 0, .5, 1 per slot
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              className="absolute inset-0 text-sand"
              style={{ width: size, height: size }}
              strokeWidth={1.5}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
              aria-hidden="true"
            >
              <Star
                className="fill-rust text-rust"
                style={{ width: size, height: size }}
                strokeWidth={1.5}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function monthYear(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/* ── Filter + sort types ─────────────────────────────────────────────── */
type Filter = 'all' | 'photos' | 'no-photos' | StarBucket;
type Sort = 'recent' | 'highest' | 'lowest';

/* ── Rating breakdown — clickable distribution bars (AliExpress style) ── */
function RatingBreakdown({
  stats,
  active,
  onSelectStar,
}: {
  stats: ReturnType<typeof reviewStats>;
  active: Filter;
  onSelectStar: (star: StarBucket) => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-1.5">
      {([5, 4, 3, 2, 1] as StarBucket[]).map((star) => {
        const n = stats.distribution[star];
        const pct = stats.count > 0 ? (n / stats.count) * 100 : 0;
        const isActive = active === star;
        return (
          <button
            key={star}
            type="button"
            disabled={n === 0}
            onClick={() => onSelectStar(star)}
            aria-pressed={isActive}
            aria-label={`Filter by ${star} star${star === 1 ? '' : 's'} (${n} review${n === 1 ? '' : 's'})`}
            className={cn(
              'group flex w-full items-center gap-3 rounded-md px-1.5 py-0.5 text-left transition-colors',
              n === 0 ? 'cursor-default opacity-45' : 'hover:bg-rust/5',
              isActive && 'bg-rust/10',
            )}
          >
            <span className="flex w-9 shrink-0 items-center gap-0.5 font-mono text-[11px] text-ink-mute">
              {star}
              <Star className="h-3 w-3 fill-rust text-rust" strokeWidth={1.5} />
            </span>
            <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-sand/40">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-rust transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="w-6 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-mute">
              {n}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── A single review card ────────────────────────────────────────────── */
function ReviewCard({
  review,
  onOpenPhoto,
}: {
  review: Review;
  onOpenPhoto: (photos: ReviewPhoto[], index: number) => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-sand/40 bg-card p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_18px_36px_-22px_rgba(14,31,58,0.22)] md:p-7">
      {/* Header: avatar + name + verified */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cobalt/10 font-display text-sm text-cobalt"
        >
          {initials(review.name)}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-body text-sm font-semibold text-navy">
            <span className="truncate">{review.name}</span>
            {review.verified && (
              <span className="inline-flex items-center gap-1 text-success" title="Verified buyer">
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                <span className="sr-only">Verified buyer</span>
              </span>
            )}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {review.location} · {monthYear(review.date)}
          </p>
        </div>
      </div>

      {/* Rating + protocol tag */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <StarRating rating={review.rating} />
        {review.protocol && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cobalt">
            {review.protocol}
          </span>
        )}
      </div>

      {/* Body */}
      <p className="mt-4 font-body text-[14.5px] leading-[1.65] text-ink-2">{review.body}</p>

      {/* Attached photos */}
      {review.photos && review.photos.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {review.photos.map((photo, i) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => onOpenPhoto(review.photos!, i)}
                className="group relative block h-16 w-16 overflow-hidden rounded-lg border border-sand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2"
                aria-label={`View photo: ${photo.caption ?? photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {photo.caption && (
                  <span className="absolute inset-x-0 bottom-0 truncate bg-navy-deep/70 px-1.5 py-0.5 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-white">
                    {photo.caption}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: ReviewPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const photo = photos[index];
  const multi = photos.length > 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (multi && e.key === 'ArrowRight') onNavigate((index + 1) % photos.length);
      if (multi && e.key === 'ArrowLeft') onNavigate((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, multi, photos.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-navy-deep/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Review photo viewer"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cobalt-glow">
          {photo.caption ?? 'Customer photo'}
          {multi && <span className="ml-2 text-white/50">{index + 1} / {photos.length}</span>}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/16 bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {multi && (
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
            aria-label="Previous photo"
            className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div className="relative h-full max-h-[78vh] w-full max-w-[min(92vw,820px)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 92vw, 820px"
            className="rounded-xl object-contain"
            priority
          />
        </div>

        {multi && (
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % photos.length)}
            aria-label="Next photo"
            className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
interface ReviewsProps {
  reviews?: Review[];
  className?: string;
}

export function Reviews({ reviews = REVIEWS, className }: ReviewsProps) {
  const stats = useMemo(() => reviewStats(reviews), [reviews]);
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('recent');
  const [lightbox, setLightbox] = useState<{ photos: ReviewPhoto[]; index: number } | null>(null);
  const reduced = useReducedMotion();

  const openPhoto = useCallback((photos: ReviewPhoto[], index: number) => {
    setLightbox({ photos, index });
  }, []);

  const visible = useMemo(() => {
    let list = reviews;
    if (filter === 'photos') list = list.filter((r) => r.photos && r.photos.length > 0);
    else if (filter === 'no-photos') list = list.filter((r) => !r.photos || r.photos.length === 0);
    else if (filter !== 'all') list = list.filter((r) => Math.round(r.rating) === filter);

    const sorted = [...list];
    if (sort === 'recent') sorted.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === 'highest') sorted.sort((a, b) => b.rating - a.rating || b.date.localeCompare(a.date));
    else if (sort === 'lowest') sorted.sort((a, b) => a.rating - b.rating || b.date.localeCompare(a.date));
    return sorted;
  }, [reviews, filter, sort]);

  if (stats.count === 0) return null;

  const noPhotos = stats.count - stats.withPhotos;

  return (
    <section className={cn('bg-canvas-soft py-24 md:py-32', className)}>
      <div className="mx-auto max-w-[75rem] px-6">
        {/* Header */}
        <Reveal>
          <header className="mb-10 max-w-[44rem] md:mb-12">
            <Eyebrow className="mb-4 text-cobalt">— What patients say</Eyebrow>
            <h2 className="mb-4 font-display font-light text-navy text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em]">
              Real skin, <em className="italic">real twelve-week results.</em>
            </h2>
            <p className="font-display italic text-[clamp(16px,1.6vw,20px)] leading-relaxed text-ink-mute">
              Verified reviews from patients across Pakistan — many with their own before-and-after
              photographs.
            </p>
          </header>
        </Reveal>

        {/* Summary panel: average + distribution breakdown */}
        <Reveal>
          <div className="mb-8 grid grid-cols-1 items-stretch gap-6 rounded-2xl border border-sand/50 bg-card p-6 sm:grid-cols-[auto_1fr] sm:gap-10 md:p-8">
            {/* Average block */}
            <div className="flex flex-col items-center justify-center gap-1.5 border-b border-sand/40 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-10">
              <span className="font-display text-[clamp(48px,7vw,72px)] font-light leading-none text-navy">
                {stats.average.toFixed(1)}
              </span>
              <StarRating rating={stats.average} size={18} />
              <span className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
                {stats.count} verified review{stats.count === 1 ? '' : 's'}
              </span>
            </div>
            {/* Distribution bars */}
            <RatingBreakdown
              stats={stats}
              active={filter}
              onSelectStar={(star) => setFilter((f) => (f === star ? 'all' : star))}
            />
          </div>
        </Reveal>

        {/* Filter + sort controls */}
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 border-b border-rule pb-6">
            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow className="text-ink-mute">Filter</Eyebrow>
              <ToggleGroup
                type="single"
                value={String(filter)}
                onValueChange={(v) => setFilter((v ? (isNaN(Number(v)) ? v : Number(v)) : 'all') as Filter)}
                variant="outline"
                size="sm"
                spacing={2}
                className="flex-wrap"
                aria-label="Filter reviews"
              >
                <ToggleGroupItem value="all">All ({stats.count})</ToggleGroupItem>
                <ToggleGroupItem value="photos" disabled={stats.withPhotos === 0}>
                  <Camera className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                  With photos ({stats.withPhotos})
                </ToggleGroupItem>
                <ToggleGroupItem value="no-photos" disabled={noPhotos === 0}>
                  Without photos ({noPhotos})
                </ToggleGroupItem>
                {([5, 4, 3, 2, 1] as StarBucket[]).map((star) => (
                  <ToggleGroupItem
                    key={star}
                    value={String(star)}
                    disabled={stats.distribution[star] === 0}
                  >
                    {star}
                    <Star className="mx-0.5 h-3 w-3 fill-rust text-rust" strokeWidth={1.5} aria-hidden="true" />
                    ({stats.distribution[star]})
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              {filter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow className="text-ink-mute">Sort</Eyebrow>
              <ToggleGroup
                type="single"
                value={sort}
                onValueChange={(v) => v && setSort(v as Sort)}
                variant="outline"
                size="sm"
                spacing={2}
                className="flex-wrap"
                aria-label="Sort reviews"
              >
                <ToggleGroupItem value="recent">Most recent</ToggleGroupItem>
                <ToggleGroupItem value="highest">Highest rated</ToggleGroupItem>
                <ToggleGroupItem value="lowest">Lowest rated</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Reveal>

        {/* Result count */}
        <p className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
          Showing {visible.length} of {stats.count}
        </p>

        {/* Grid — animates on filter/sort change */}
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-sand/50 bg-card px-7 py-12 text-center">
            <p className="font-display text-[clamp(18px,2.2vw,24px)] italic text-navy">
              No reviews match this filter yet.
            </p>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt hover:underline"
            >
              Show all reviews
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((review, i) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ReviewCard review={review} onOpenPhoto={openPhoto} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(next) => setLightbox((s) => (s ? { ...s, index: next } : s))}
        />
      )}
    </section>
  );
}
