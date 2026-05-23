import { Eyebrow } from '@/components/ui/eyebrow';

/**
 * Visual transition between the new Tailwind layers (hero / evidence /
 * steps / savings) and the legacy dangerouslySetInnerHTML body. Without
 * this divider, the customer hits the legacy topbar/nav/hero with no
 * warning that they're entering the "deep dive" section.
 *
 * The divider sets expectation: "Above was the summary. Below is the
 * full case study, the AI projection, the ingredient detail, the order
 * form." Same warm-cream surface as the rest of the new layers so the
 * visual rhythm doesn't break.
 */
export function ProtocolDivider() {
  return (
    <section className="border-y border-sand/40 bg-canvas py-14 text-center">
      <div className="mx-auto max-w-[42rem] px-6">
        <Eyebrow className="mb-4 text-cobalt">— Deep dive</Eyebrow>
        <h2 className="mb-3 font-display font-light text-navy text-[clamp(24px,3vw,34px)] leading-[1.1] tracking-[-0.02em]">
          <em className="italic">The complete case study, below.</em>
        </h2>
        <p className="font-display italic text-[clamp(15px,1.4vw,18px)] leading-relaxed text-ink-mute">
          Twelve-week projection, ingredient-level breakdown, dosing schedule, and the order
          form — every detail the protocol depends on.
        </p>
      </div>
    </section>
  );
}
