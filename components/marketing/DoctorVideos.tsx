'use client';

import { motion } from 'motion/react';
import { Play, Stethoscope } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

interface DoctorVideo {
  /** Product SKU that the video is about. */
  sku: string;
  /** Display name shown under the thumbnail. */
  productName: string;
  /** Short headline answering "why use this". */
  pitch: string;
  /** Approx. duration shown in the meta line. */
  duration: string;
  /** Optional real video URL when we have it. Otherwise renders as a placeholder. */
  src?: string;
  /** Optional poster image path when we have one. */
  poster?: string;
}

const VIDEOS: DoctorVideo[] = [
  {
    sku: 'rescue',
    productName: 'Clarifying Rescue Face Wash',
    pitch: 'Why a 2% salicylic cleanser is the first step for breakouts.',
    duration: '90 sec',
    src: '/videos/doctor/rescue.mp4',
    poster: '/products/rescue/hero.webp',
  },
  {
    sku: 'acne',
    productName: 'Clarifying Acne Serum',
    pitch: 'How niacinamide 10% + azelaic clears acne without harsh peeling.',
    duration: '90 sec',
    src: '/videos/doctor/acne.mp4',
    poster: '/products/acne/hero.webp',
  },
  {
    sku: 'vitc',
    productName: 'Vitamin CE Ferrulic Serum',
    pitch: 'Why vitamin C in the morning fades marks faster than anything else.',
    duration: '90 sec',
    src: '/videos/doctor/vitc.mp4',
    poster: '/products/vitc/hero.webp',
  },
  {
    sku: 'reti',
    productName: 'Retinol Serum',
    pitch: 'How to start retinol without redness, peeling, or burning.',
    duration: '90 sec',
    src: '/videos/doctor/reti.mp4',
    poster: '/products/reti/hero.webp',
  },
];

interface DoctorVideosProps {
  /** Optional SKU to feature first or filter to a single video. */
  featuredSku?: string;
  /** When true, render only the matching SKU's video. */
  singleVideoOnly?: boolean;
  /** Section heading + sub override (per-page tone). */
  title?: string;
  sub?: string;
  /** Layout density: 'wide' (protocols, full row) or 'compact' (PDP, smaller card). */
  variant?: 'wide' | 'compact';
}

/**
 * "From the doctor" video section. Renders 4 placeholder video cards
 * (rescue / acne serum / vitamin C / retinol) explaining why to use each.
 *
 * On product pages: optionally surface a single video for the matching
 * SKU via `singleVideoOnly`. On protocol pages: render all 4.
 *
 * The placeholders are designed to be swapped to real <video> embeds —
 * give a video a `src` in the VIDEOS array above and it'll auto-render.
 */
export function DoctorVideos({
  featuredSku,
  singleVideoOnly = false,
  title = 'From the doctor.',
  sub = 'Short, plain-English notes on what each active does and how to use it.',
  variant = 'wide',
}: DoctorVideosProps) {
  // Pick the right slice of videos.
  let videos = VIDEOS;
  if (singleVideoOnly && featuredSku) {
    videos = VIDEOS.filter((v) => v.sku === featuredSku);
    if (videos.length === 0) return null; // SKU isn't one of the 4 — render nothing
  } else if (featuredSku) {
    // Put featured first, rest after.
    const idx = VIDEOS.findIndex((v) => v.sku === featuredSku);
    if (idx >= 0) {
      videos = [VIDEOS[idx], ...VIDEOS.filter((_, i) => i !== idx)];
    }
  }

  return (
    <section className="relative isolate overflow-hidden border-y border-sand/40 bg-canvas-soft py-20 md:py-28">
      {/* Blueprint grid + cobalt halo (matches the system) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#0e1f3a_1px,transparent_1px),linear-gradient(to_bottom,#0e1f3a_1px,transparent_1px)] [background-size:80px_80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[36rem] w-[36rem] rounded-full bg-cobalt/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-[75rem] px-6">
        {/* Header */}
        <Reveal>
          <header className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-[44rem]">
              <Eyebrow className="mb-4 inline-flex items-center gap-2 text-cobalt">
                <Stethoscope className="h-3.5 w-3.5" />
                From the doctor
              </Eyebrow>
              <h2 className="font-display font-light text-navy text-[clamp(28px,4.5vw,48px)] leading-[1.05] tracking-[-0.02em]">
                {title.includes('.') ? (
                  <>
                    {title.split('.')[0]}
                    <em className="italic text-cobalt">.</em>
                  </>
                ) : (
                  title
                )}
              </h2>
              <p className="mt-3 font-display italic text-[clamp(15px,1.5vw,18px)] leading-relaxed text-ink-mute">
                {sub}
              </p>
            </div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
              {videos.length === 1
                ? '01 video · plain English'
                : `0${videos.length} videos · plain English`}
            </span>
          </header>
        </Reveal>

        {/* Grid — 9:16 vertical cards (Reels/TikTok format). Single-video
            mode caps the width so a lone card doesn't render absurdly tall. */}
        <RevealGroup stagger={0.08}>
          <div
            className={cn(
              'grid gap-5',
              videos.length === 1
                ? 'mx-auto max-w-xs grid-cols-1 sm:max-w-sm'
                : 'grid-cols-2 sm:gap-6 lg:grid-cols-4',
            )}
          >
            {videos.map((v) => (
              <Reveal key={v.sku}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: DoctorVideo }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl border border-sand/60 bg-card',
        'shadow-[0_18px_36px_-22px_rgba(14,31,58,0.18)]',
        'transition-[border-color,box-shadow] duration-300 hover:border-navy/30 hover:shadow-[0_28px_56px_-22px_rgba(14,31,58,0.28)]',
      )}
    >
      {/* Video / placeholder area — 9:16 vertical (Reels/TikTok format) */}
      <div className="relative isolate overflow-hidden bg-navy-deep aspect-[9/16]">
        {video.src ? (
          // Real video — when ops uploads a real URL, this branch lights up
          <video
            src={video.src}
            poster={video.poster}
            controls
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            {/* Soft gradient backdrop for the placeholder */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-2 to-[#1c2b4a]"
            />
            {/* Subtle blueprint grid inside */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:48px_48px]"
            />
            {/* Pulsing cobalt halo behind the play button */}
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0.85, opacity: 0.4 }}
              animate={
                reduced
                  ? undefined
                  : { scale: [0.85, 1.06, 0.85], opacity: [0.3, 0.55, 0.3] }
              }
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt-glow/30 blur-2xl"
            />
            {/* Corner markers */}
            <span aria-hidden="true" className="absolute left-4 top-4 h-5 w-5 border-l border-t border-cobalt-glow/60" />
            <span aria-hidden="true" className="absolute right-4 top-4 h-5 w-5 border-r border-t border-cobalt-glow/60" />
            <span aria-hidden="true" className="absolute left-4 bottom-4 h-5 w-5 border-l border-b border-cobalt-glow/60" />
            <span aria-hidden="true" className="absolute right-4 bottom-4 h-5 w-5 border-r border-b border-cobalt-glow/60" />

            {/* Play button + meta */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <button
                type="button"
                aria-label={`Play doctor video for ${video.productName}`}
                className={cn(
                  'group/play grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md',
                  'transition-[background-color,transform] duration-300 hover:bg-cobalt-glow hover:text-navy-deep group-hover:scale-110',
                )}
              >
                <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
              </button>
              <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt-glow">
                Doctor&apos;s note · {video.duration}
              </span>
              <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/45">
                Video pending
              </span>
            </div>

            {/* Top-right product tag */}
            <span className="absolute right-4 top-4 rounded-full bg-navy-deep/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cobalt-glow backdrop-blur">
              {video.sku.toUpperCase()}
            </span>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 md:p-5">
        <h3 className="font-display text-[clamp(15px,1.4vw,17px)] font-light italic leading-snug text-navy">
          {video.productName}
        </h3>
        <p className="mt-1.5 font-body text-[12px] leading-snug text-ink-mute line-clamp-3">
          {video.pitch}
        </p>
      </div>
    </motion.article>
  );
}
