import type { ProtocolStep } from '@/lib/protocols/architecture';

export type UsageWhen = 'AM' | 'PM' | 'AM+PM';

export interface SkuUsage {
  /** Which routine(s) the product belongs to. */
  when: UsageWhen;
  /** Layer rank within a routine — low applied first; SPF is highest. */
  order: number;
  /** e.g. 'Every morning' or '3×/week, ramp to nightly'. */
  frequency: string;
  /** Short inline caution, e.g. 'Apply SPF the next morning'. */
  caution?: string;
}

/** A composed routine row: the step plus its resolved usage metadata. */
export interface RoutineEntry {
  step: ProtocolStep;
  usage: SkuUsage;
}

export interface ComposedRoutine {
  am: RoutineEntry[];
  pm: RoutineEntry[];
  /** Steps with no usage metadata — shown under an "Use as directed" note. */
  unsequenced: ProtocolStep[];
}

/**
 * Researched per-SKU usage metadata. POPULATED LATER from the approved
 * research doc — intentionally empty until medical review is complete.
 */
export const SKU_USAGE: Record<string, SkuUsage> = {
  prep: { when: 'AM+PM', order: 0, frequency: 'Morning and evening' },
  rescue: { when: 'AM+PM', order: 0, frequency: 'Morning and evening' },
  vitc: {
    when: 'AM',
    order: 10,
    frequency: 'Every morning',
    caution: 'Always follow with SPF; do not layer with retinol in the same routine',
  },
  acne: {
    when: 'AM+PM',
    order: 20,
    frequency: 'Up to twice daily — start once daily',
    caution: 'Reduce to once daily if dryness; mild purging in weeks 2–4 is normal',
  },
  ha: {
    when: 'AM+PM',
    order: 30,
    frequency: 'Morning and evening',
    caution: 'Apply to slightly damp skin',
  },
  reti: {
    when: 'PM',
    order: 20,
    frequency: '3×/week, ramp to nightly',
    caution: 'Evening only; SPF the next morning; not with Vitamin C or AHA in the same routine; avoid in pregnancy',
  },
  light: {
    when: 'AM+PM',
    order: 40,
    frequency: 'Morning and evening',
    caution: 'Introduce gradually; daily SPF essential',
  },
  spf: {
    when: 'AM',
    order: 90,
    frequency: 'Every morning',
    caution: 'Reapply every 2 hours outdoors',
  },
};

/** Protocol-level note keyed by bundle.concern. POPULATED LATER. */
export const CONCERN_USAGE_NOTE: Record<string, string> = {
  acne: 'Begin the treatment serum once daily and build to twice daily as your skin adjusts — mild dryness or a short purge in the first 2–4 weeks is normal. Finish every morning with SPF; sun exposure deepens post-acne marks.',
  pigmentation: 'Pigment corrects slowly — give the protocol 8–12 weeks of consistent use. Daily SPF is non-negotiable; unprotected sun undoes the work. Vitamin C is a morning-only step.',
  'anti-ageing': 'Retinol is evening-only — start three nights a week and build to nightly as tolerated. Never layer retinol with vitamin C in the same routine (keep vitamin C to mornings), and always apply SPF the next morning — retinol raises sun sensitivity.',
  hydration: 'A barrier-recovery routine — keep actives minimal while the skin settles. Apply the hyaluronic serum to slightly damp skin, and seal every morning with SPF.',
};

/**
 * Splits a protocol's steps into Morning and Evening routines, each sorted
 * by layer `order`. Steps lacking metadata fall into `unsequenced` rather
 * than being silently dropped. Pure — inject `usage` in tests.
 */
export function composeRoutine(
  steps: ProtocolStep[],
  usage: Record<string, SkuUsage> = SKU_USAGE,
): ComposedRoutine {
  const am: RoutineEntry[] = [];
  const pm: RoutineEntry[] = [];
  const unsequenced: ProtocolStep[] = [];

  for (const step of steps) {
    const u = usage[step.product.sku];
    if (!u) {
      unsequenced.push(step);
      continue;
    }
    if (u.when === 'AM' || u.when === 'AM+PM') am.push({ step, usage: u });
    if (u.when === 'PM' || u.when === 'AM+PM') pm.push({ step, usage: u });
  }

  const byOrder = (a: RoutineEntry, b: RoutineEntry) => a.usage.order - b.usage.order;
  am.sort(byOrder);
  pm.sort(byOrder);

  return { am, pm, unsequenced };
}
