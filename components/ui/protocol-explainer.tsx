import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';

/**
 * ProtocolExplainer — the Clarté equivalent of Bader's TFC8, Tatcha's
 * Hadasei-3™, Proven's Skin Genome, Drunk Elephant's Suspicious 6. A
 * single signature concept that recurs on every PDP and protocol page,
 * giving the brand a repeating credibility anchor (research §2.1).
 *
 * This is a presentation component only — the *content* (which concept
 * Clarté commits to, what the pillars actually say) is a brand decision
 * that lives in copy, not in the component. Pass a title + 3-4 pillars.
 *
 * Composes well with ClinicalProof: explainer first ("here's how the
 * protocol thinks about your skin"), then ClinicalProof ("here's what
 * it does").
 */
export interface ProtocolPillar {
  /** Short pillar name in Fraunces italic, e.g. "Diagnose". */
  name: string;
  /** One-sentence explanation in Plus Jakarta sans. */
  description: string;
}

export interface ProtocolExplainerProps {
  /** Section eyebrow. Defaults to "The protocol". */
  eyebrow?: string;
  /** The signature concept title, e.g. "The Clarté Protocol". Fraunces display. */
  title: string;
  /** Optional 1-2 sentence lead under the title. */
  lead?: string;
  /** 3-4 pillars. */
  pillars: ProtocolPillar[];
  /** Optional CTA slot rendered below the pillars. */
  cta?: ReactNode;
  className?: string;
}

export function ProtocolExplainer({
  eyebrow = 'The protocol',
  title,
  lead,
  pillars,
  cta,
  className,
}: ProtocolExplainerProps) {
  const colCount = Math.min(Math.max(pillars.length, 1), 4);
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[colCount];

  return (
    <section
      className={cn('py-12 md:py-16', className)}
      aria-labelledby="protocol-explainer-title"
    >
      <div className="max-w-[42rem]">
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2
          id="protocol-explainer-title"
          className="font-display text-3xl md:text-4xl text-navy leading-[1.1]"
        >
          {title}
        </h2>
        {lead && (
          <p className="mt-4 font-body text-base md:text-lg text-ink-mute leading-relaxed">
            {lead}
          </p>
        )}
      </div>
      <ol className={cn('mt-10 grid grid-cols-1 gap-8', gridCols)}>
        {pillars.map((pillar, i) => (
          <li key={`${pillar.name}-${i}`} className="flex flex-col gap-2">
            <span
              aria-hidden="true"
              className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display italic text-xl md:text-2xl text-navy">{pillar.name}</h3>
            <p className="font-body text-sm md:text-base text-ink-mute leading-relaxed">
              {pillar.description}
            </p>
          </li>
        ))}
      </ol>
      {cta && <div className="mt-10">{cta}</div>}
    </section>
  );
}
