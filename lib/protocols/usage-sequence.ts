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
export const SKU_USAGE: Record<string, SkuUsage> = {};

/** Protocol-level note keyed by bundle.concern. POPULATED LATER. */
export const CONCERN_USAGE_NOTE: Record<string, string> = {};

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
