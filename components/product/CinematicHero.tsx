'use client';

import { CinematicPhoto } from '@/lib/anim/cinematic-photo';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { Reveal } from '@/lib/anim/reveal';
import { cn } from '@/lib/utils';

export function CinematicHero({
  cinematicSrc,
  productName,
  eyebrow,
}: {
  cinematicSrc: string;
  productName: string;
  eyebrow?: string;
}) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-navy-deep text-white',
        'min-h-[60vh] md:min-h-[70vh]',
      )}
    >
      <CinematicPhoto
        src={cinematicSrc}
        alt={`${productName} cinematic still`}
        width={2400}
        height={1600}
        priority
        parallax={0.18}
        aspectClass="absolute inset-0 h-full w-full"
        wrapperClassName="absolute inset-0"
        className="object-cover opacity-70"
        sizes="100vw"
      />
      {/* Vertical gradient — darker top + bottom to lift the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/55 to-navy-deep/95"
      />
      {/* Left-column wash — extra darkness behind the eyebrow + headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 from-0% via-navy-deep/55 via-45% to-transparent to-75%"
      />
      <CursorGlow color="rgba(138, 176, 224, 0.22)" size={560} />
      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[75rem] flex-col justify-end px-6 pb-16 pt-32 md:min-h-[70vh] md:pb-20 md:pt-40 [text-shadow:0_2px_18px_rgba(8,21,42,0.55)]">
        {eyebrow && (
          <Reveal>
            <span
              style={{ color: '#a8c5ec' }}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em]"
            >
              — {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <h1
            style={{ color: '#ffffff' }}
            className="max-w-[44rem] font-display font-light text-[clamp(40px,7vw,84px)] leading-[0.95] tracking-[-0.025em]"
          >
            {productName}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
