import { AlertTriangle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/lib/anim/reveal';
import type { ProtocolStep } from '@/lib/protocols/architecture';
import {
  composeRoutine,
  CONCERN_USAGE_NOTE,
  type RoutineEntry,
} from '@/lib/protocols/usage-sequence';

/**
 * Usage & Sequence — composes the protocol's products into a Morning /
 * Evening routine. Server component (pure render off `steps`).
 */
export function ProtocolUsageSequence({
  steps,
  concern,
}: {
  steps: ProtocolStep[];
  concern: string;
}) {
  const { am, pm, unsequenced } = composeRoutine(steps);
  if (am.length === 0 && pm.length === 0) return null;

  const note = CONCERN_USAGE_NOTE[concern];

  return (
    <section className="relative bg-canvas py-20 md:py-28">
      <div className="mx-auto max-w-[75rem] px-6">
        <Reveal>
          <header className="mb-12 max-w-[42rem]">
            <Eyebrow className="mb-4 text-cobalt">— Usage &amp; sequence</Eyebrow>
            <h2 className="font-display font-light text-navy text-[clamp(28px,5vw,52px)] leading-[1.05] tracking-[-0.02em]">
              How to use it.{' '}
              <em className="italic text-cobalt">Morning and night.</em>
            </h2>
            <p className="mt-3 font-display italic text-[clamp(15px,1.6vw,20px)] leading-relaxed text-ink-mute">
              The order of application is part of the protocol. Follow each
              column top to bottom.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <RoutineColumn title="Morning" tag="AM" entries={am} />
          <RoutineColumn title="Evening" tag="PM" entries={pm} />
        </div>

        {note && (
          <Reveal>
            <p className="mt-8 flex items-start gap-2 rounded-xl border border-sand/50 bg-canvas-soft p-5 font-body text-[14px] leading-relaxed text-ink-mute">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-cobalt" aria-hidden="true" />
              <span>{note}</span>
            </p>
          </Reveal>
        )}

        {unsequenced.length > 0 && (
          <p className="mt-4 font-body text-[13px] text-ink-faint">
            Use as directed:{' '}
            {unsequenced.map((s) => s.product.name).join(', ')}.
          </p>
        )}
      </div>
    </section>
  );
}

function RoutineColumn({
  title,
  tag,
  entries,
}: {
  title: string;
  tag: string;
  entries: RoutineEntry[];
}) {
  if (entries.length === 0) return null;
  return (
    <Reveal>
      <div className="h-full rounded-2xl border border-sand/40 bg-card p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-sand/40 pb-4">
          <h3 className="font-display text-[clamp(18px,2.2vw,24px)] font-light italic text-navy">
            {title}
          </h3>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cobalt">
            {tag}
          </span>
        </div>
        <ol className="flex flex-col gap-5">
          {entries.map((e, i) => (
            <li key={e.step.product.sku} className="flex gap-4">
              <span className="font-display text-base tabular-nums text-cobalt">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <div className="flex-1">
                <p className="font-display text-[17px] font-light italic leading-snug text-navy">
                  {e.step.product.name}
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
                  {e.usage.frequency}
                </p>
                {e.usage.caution && (
                  <p className="mt-2 inline-flex items-start gap-1.5 rounded-md bg-canvas-soft px-2.5 py-1.5 font-body text-[12.5px] leading-snug text-ink-mute">
                    <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-cobalt" aria-hidden="true" />
                    {e.usage.caution}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
