import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';

/**
 * ClinicalProof — the 3-up stat block that the entire dermatologist-led
 * + K-beauty + indie-clinical segment converges on: Bader (37%/54%/92%),
 * Tatcha (100%/88%), Drunk Elephant (96%/93%/90%), Dr.Jart+ (98%/96%),
 * COSRX (+196.17%/+35%/-80%).
 *
 * Format the segment validates: %/Δ value in Fraunces display + short
 * label + JetBrains Mono attribution line with N + duration + methodology.
 * Per feedback_unverified_claims, the attribution line is non-optional
 * if any percentage is shown — surface methodology, never claim trial
 * results without disclosing the panel.
 *
 * variant="placeholder" lets us ship the component now and render an
 * honest "data pending" frame until a panel exists.
 */
export interface ClinicalStat {
  /** The headline number, e.g. "92%", "+35%", "-80%". Bold Fraunces display. */
  value: string;
  /** Short label under the value, max ~6 words. */
  label: string;
}

export interface ClinicalProofProps {
  /** 2-4 stats. 3 is the segment norm. */
  stats: ClinicalStat[];
  /** REQUIRED unless variant is placeholder. Sample size + duration + methodology. */
  attribution?: string;
  /** Section eyebrow. Defaults to "The evidence". */
  eyebrow?: string;
  /** Render a "data pending" frame instead of stats. Use until a real panel exists. */
  variant?: 'data' | 'placeholder';
  /** Placeholder message shown in placeholder variant. */
  placeholderMessage?: string;
  className?: string;
}

export function ClinicalProof({
  stats,
  attribution,
  eyebrow = 'The evidence',
  variant = 'data',
  placeholderMessage = 'Outcome data publishing after the first 30-customer panel.',
  className,
}: ClinicalProofProps) {
  if (variant === 'placeholder') {
    return (
      <section className={cn('py-8', className)} aria-labelledby="clinical-proof-eyebrow">
        <Eyebrow id="clinical-proof-eyebrow" className="mb-4">
          {eyebrow}
        </Eyebrow>
        <div className="rounded-md border border-dashed border-rule bg-card px-6 py-8 text-center">
          <p className="font-body text-sm text-ink-mute">{placeholderMessage}</p>
        </div>
      </section>
    );
  }

  if (!attribution) {
    // Type-system gate: if you reach this in dev, you skipped the attribution.
    // Per the research segment-wide pattern, raw % without N is the GMP/ISO trap.
    throw new Error(
      'ClinicalProof: attribution is required when variant="data". Pass N + duration + methodology.',
    );
  }

  const colCount = Math.min(Math.max(stats.length, 1), 4);
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[colCount];

  return (
    <section className={cn('py-8', className)} aria-labelledby="clinical-proof-eyebrow">
      <Eyebrow id="clinical-proof-eyebrow" className="mb-6">
        {eyebrow}
      </Eyebrow>
      <dl className={cn('grid grid-cols-1 gap-6', gridCols)}>
        {stats.map((stat, i) => (
          <div key={`${stat.value}-${i}`} className="border-l-2 border-cobalt pl-4">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-4xl md:text-5xl font-medium text-navy leading-none">
              {stat.value}
            </dd>
            <p className="mt-2 font-body text-sm text-ink-mute leading-snug">{stat.label}</p>
          </div>
        ))}
      </dl>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
        {attribution}
      </p>
    </section>
  );
}
