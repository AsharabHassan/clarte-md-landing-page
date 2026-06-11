import { describe, it, expect } from 'vitest';
import { composeRoutine, type SkuUsage } from '@/lib/protocols/usage-sequence';
import type { ProtocolStep } from '@/lib/protocols/architecture';

// Minimal ProtocolStep factory — only the fields composeRoutine reads.
const step = (sku: string, num = 1): ProtocolStep =>
  ({
    num,
    stage: 'Apply',
    purpose: '',
    image: null,
    product: { sku, name: sku, pricePkr: 1000 },
  }) as unknown as ProtocolStep;

const USAGE: Record<string, SkuUsage> = {
  rescue: { when: 'AM+PM', order: 0, frequency: 'Twice daily' },
  vitc: { when: 'AM', order: 10, frequency: 'Every morning' },
  acne: { when: 'PM', order: 20, frequency: 'Nightly' },
  spf: { when: 'AM', order: 90, frequency: 'Every morning', caution: 'Reapply every 2h' },
};

describe('composeRoutine', () => {
  it('splits steps into AM and PM, AM+PM appears in both', () => {
    const r = composeRoutine([step('rescue'), step('vitc'), step('acne'), step('spf')], USAGE);
    expect(r.am.map((e) => e.step.product.sku)).toEqual(['rescue', 'vitc', 'spf']);
    expect(r.pm.map((e) => e.step.product.sku)).toEqual(['rescue', 'acne']);
  });

  it('sorts each column by usage.order (SPF last in AM)', () => {
    const r = composeRoutine([step('spf'), step('vitc'), step('rescue')], USAGE);
    expect(r.am.map((e) => e.step.product.sku)).toEqual(['rescue', 'vitc', 'spf']);
  });

  it('routes SKUs without metadata to unsequenced', () => {
    const r = composeRoutine([step('vitc'), step('mystery')], USAGE);
    expect(r.unsequenced.map((s) => s.product.sku)).toEqual(['mystery']);
    expect(r.am.map((e) => e.step.product.sku)).toEqual(['vitc']);
  });

  it('returns empty columns for empty input', () => {
    const r = composeRoutine([], USAGE);
    expect(r).toEqual({ am: [], pm: [], unsequenced: [] });
  });
});
