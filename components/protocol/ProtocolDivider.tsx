'use client';

import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';

/**
 * Visual transition between the new Tailwind layers and the legacy
 * deep-dive body. Now reveals on view with a stagger to read as a
 * gentle "pause" rather than a hard cut.
 */
export function ProtocolDivider() {
  return (
    <section className="border-y border-sand/40 bg-canvas py-14 text-center">
      <RevealGroup stagger={0.1}>
        <div className="mx-auto max-w-[42rem] px-6">
          <Reveal>
            <Eyebrow className="mb-4 text-cobalt">— Deep dive</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mb-3 font-display font-light text-navy text-[clamp(24px,3vw,34px)] leading-[1.1] tracking-[-0.02em]">
              <em className="italic">The complete case study, below.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="font-display italic text-[clamp(15px,1.4vw,18px)] leading-relaxed text-ink-mute">
              Twelve-week projection, ingredient-level breakdown, dosing schedule, and the order
              form — every detail the protocol depends on.
            </p>
          </Reveal>
        </div>
      </RevealGroup>
    </section>
  );
}
