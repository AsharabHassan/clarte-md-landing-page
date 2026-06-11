# Protocol page — Buy Now + Usage & Sequence — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a per-product "Buy Now" express-checkout button to protocol step cards, and a researched AM/PM "Usage & Sequence" section to protocol pages.

**Architecture:** Buy Now is a small client button that calls the existing `addProduct(sku)` cart op then routes to `/checkout`. Usage & Sequence composes an AM/PM routine dynamically from a researched per-SKU metadata map via a pure, unit-tested `composeRoutine()` function, rendered by a new section component gated in `ProtocolPageShell` like the existing `hideEvidence` flag.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4, motion/react, vitest. Cart via `lib/cart/use-cart.ts`. Reference design: `docs/superpowers/specs/2026-06-11-protocol-buynow-usage-sequence-design.md`.

---

## File Structure

- **Create** `components/protocol/BuyNowButton.tsx` — client express-buy button (Part A).
- **Modify** `components/protocol/ProtocolSteps.tsx` — restructure `CinematicStepCard` to host the button below the PDP link (Part A).
- **Create** `lib/protocols/usage-sequence.ts` — `SkuUsage` type, `SKU_USAGE` map, `CONCERN_USAGE_NOTE`, and pure `composeRoutine()` (Part B).
- **Create** `tests/unit/compose-routine.test.ts` — unit tests for `composeRoutine()` (Part B).
- **Create** `components/protocol/ProtocolUsageSequence.tsx` — AM/PM two-column section (Part B).
- **Modify** `components/protocol/ProtocolPageShell.tsx` — add `hideUsageSequence` prop + render the section after Steps (Part B).
- **Create** `docs/superpowers/research/2026-06-11-protocol-usage-sequence.md` — research draft, **review gate** (Part B).

---

# PART A — Buy Now (ships independently)

### Task 1: BuyNowButton component

**Files:**
- Create: `components/protocol/BuyNowButton.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart/use-cart';
import { cn } from '@/lib/utils';

/**
 * Per-product express buy. Adds the single product to the existing cart
 * (no clear/replace) then routes straight to checkout. Rendered as a
 * sibling BELOW the step card's PDP link — never nested inside the anchor.
 */
export function BuyNowButton({
  sku,
  pricePkr,
}: {
  sku: string;
  pricePkr: number;
}) {
  const { addProduct } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  function buyNow(e: React.MouseEvent) {
    // The button sits near the card's PDP <Link>; guard against any
    // bubbling that would navigate to the product page instead.
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    addProduct(sku);
    router.push('/checkout');
  }

  return (
    <button
      type="button"
      onClick={buyNow}
      disabled={busy}
      className={cn(
        'mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-5 py-3',
        'font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white',
        'transition-colors hover:bg-navy-2 disabled:opacity-70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
      )}
    >
      <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
      {busy ? 'Adding…' : `Buy now · Rs. ${pricePkr.toLocaleString('en-PK')}`}
    </button>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add components/protocol/BuyNowButton.tsx
git commit -m "feat(protocol): BuyNowButton — per-product express checkout

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Host the button in the step card

**Files:**
- Modify: `components/protocol/ProtocolSteps.tsx` (the `CinematicStepCard` function, currently ~lines 203-337)

The card is currently one `<motion.div>` wrapping a `<Link>` that contains everything. We move the card chrome (border, rounded, bg, overflow) onto the `motion.div`, make the `<Link>` an inner `flex-1` region, and add `<BuyNowButton>` as a sibling below the link.

- [ ] **Step 1: Add the import**

At the top of `components/protocol/ProtocolSteps.tsx`, below the existing `import { cn } from '@/lib/utils';` line, add:

```tsx
import { BuyNowButton } from './BuyNowButton';
```

- [ ] **Step 2: Replace the entire `CinematicStepCard` function**

Replace the whole function (from `function CinematicStepCard({` through its closing `}` before `MobileStepBadge`) with:

```tsx
function CinematicStepCard({
  step,
  isActive,
  reduced,
  mobile = false,
}: {
  step: ProtocolStep;
  isActive: boolean;
  reduced: boolean;
  mobile?: boolean;
}) {
  return (
    <motion.div
      whileHover={
        reduced || mobile ? undefined : { y: -6, rotateX: 1.5, rotateY: -1.5 }
      }
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
      animate={
        reduced
          ? undefined
          : isActive
            ? {
                boxShadow:
                  '0 28px 56px -22px rgba(46, 91, 168, 0.32), 0 1px 0 rgba(46, 91, 168, 0.18)',
              }
            : {
                boxShadow:
                  '0 0px 0px 0px rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)',
              }
      }
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl border bg-card',
        'transition-[border-color] duration-300',
        isActive ? 'border-cobalt/60' : 'border-sand/40 hover:border-navy/30',
      )}
    >
      <Link
        href={`/products/${step.product.sku}`}
        className="group relative flex flex-1 flex-col no-underline text-inherit"
      >
        {/* ─── Photo + cinematic number overlay ─── */}
        <div
          className={cn(
            'relative isolate flex items-center justify-center overflow-hidden bg-canvas-soft',
            mobile ? 'aspect-[4/5]' : 'aspect-[4/3]',
          )}
        >
          {step.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={step.image}
              alt={step.product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <span className="font-mono text-[11px] text-ink-faint">
              [Photo pending]
            </span>
          )}

          {/* Gradient for legibility of overlaid number/stage badge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-navy-deep/45 via-navy-deep/15 to-transparent"
          />

          {/* Light-sweep gleam */}
          <div className="lightsweep-overlay" aria-hidden="true" />

          {/* Giant italic step number — top-left poster mark */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-4 top-3 font-display font-light italic leading-none tracking-[-0.04em] text-white drop-shadow-[0_4px_24px_rgba(8,21,42,0.4)]',
              mobile ? 'text-[68px]' : 'text-[56px] md:text-[64px]',
            )}
          >
            {step.num.toString().padStart(2, '0')}
          </span>

          {/* Stage chip — top-right */}
          <span
            className={cn(
              'absolute right-4 top-4 inline-flex items-center rounded-full px-3 py-1.5',
              'bg-white/12 backdrop-blur-md',
              'font-mono text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white',
              'border border-white/20',
            )}
          >
            {step.stage}
          </span>

          {/* Active dot */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full transition-all duration-500',
              isActive ? 'scale-150 bg-cobalt-glow' : 'scale-100 bg-white/50',
            )}
          />
        </div>

        {/* ─── Body ─── */}
        <div className="flex flex-1 flex-col gap-3 p-6 pb-0">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt">
            Step {step.num.toString().padStart(2, '0')}
          </span>

          <h3 className="font-display text-[clamp(20px,2.4vw,26px)] font-light italic leading-tight text-navy">
            {step.product.name}
          </h3>

          {step.purpose && (
            <p className="flex-1 font-body text-[14px] leading-relaxed text-ink-mute">
              {step.purpose}
            </p>
          )}

          <div className="mt-2 flex items-baseline justify-between border-t border-sand/40 pt-4">
            <span className="font-display text-base text-navy">
              Rs. {step.product.pricePkr.toLocaleString('en-PK')}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt transition-transform duration-300 group-hover:translate-x-1">
              View product
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>

      {/* ─── Buy Now — sibling below the PDP link (not nested in <a>) ─── */}
      <div className="px-6 pb-6">
        <BuyNowButton sku={step.product.sku} pricePkr={step.product.pricePkr} />
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Lint the changed files**

Run: `npx eslint components/protocol/ProtocolSteps.tsx components/protocol/BuyNowButton.tsx`
Expected: no errors (warnings about the existing `no-img-element` line are pre-existing and suppressed inline).

- [ ] **Step 5: Commit**

```bash
git add components/protocol/ProtocolSteps.tsx
git commit -m "feat(protocol): Buy Now button on each product step card

Restructures CinematicStepCard so the express-buy button is a sibling
below the PDP link (valid HTML — no button nested in an anchor).

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Verify Buy Now live

**Files:** none (verification only)

- [ ] **Step 1: Ensure dev server is running**

Run (if not already up): `npm run dev`
Wait for: `✓ Ready`. Server at http://localhost:3000.

- [ ] **Step 2: Smoke the protocol page HTML**

Run: `curl -s http://localhost:3000/acne | grep -c "Buy now"`
Expected: a number ≥ the product count of the Clear Skin protocol (4) — i.e. ≥ 1, confirming buttons render.

- [ ] **Step 3: Drive the flow in a browser (Playwright MCP or manual)**

- Navigate to `http://localhost:3000/acne`.
- Scroll to "The protocol" step cards.
- Click a product's **Buy now** button.
- Expected: URL becomes `/checkout`; the cart contains that product (checkout shows it). Clicking the card image/name (not the button) still navigates to `/products/{sku}`.

- [ ] **Step 4: Confirm no console errors**

Check browser console / dev-server log for runtime errors on `/acne` and `/checkout`. (Note: pre-existing `client.tsx#default ... React Client Manifest` lines in turbopack dev are benign noise — ignore.)

**PART A is complete and shippable here.**

---

# PART B — Usage & Sequence (research-gated)

### Task 4: composeRoutine() + types (pure, no clinical content)

This builds and tests the composition logic. Clinical content is added later (Task 6) after review — the test injects its own usage map, so this task is content-free.

**Files:**
- Create: `lib/protocols/usage-sequence.ts`
- Test: `tests/unit/compose-routine.test.ts`

- [ ] **Step 1: Create `lib/protocols/usage-sequence.ts` with types + empty maps + composeRoutine**

```ts
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
 * Researched per-SKU usage metadata. POPULATED IN TASK 6 from the approved
 * research doc — intentionally empty until medical review is complete.
 */
export const SKU_USAGE: Record<string, SkuUsage> = {};

/** Protocol-level note keyed by bundle.concern. POPULATED IN TASK 6. */
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
```

- [ ] **Step 2: Write the failing test**

Create `tests/unit/compose-routine.test.ts`:

```ts
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
```

- [ ] **Step 3: Run the test — verify it PASSES**

Run: `npx vitest run tests/unit/compose-routine.test.ts`
Expected: 4 passing. (The implementation was written in Step 1, so this confirms correctness. If any fail, fix `composeRoutine` before continuing.)

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add lib/protocols/usage-sequence.ts tests/unit/compose-routine.test.ts
git commit -m "feat(protocol): composeRoutine + usage-sequence types (content TBD post-review)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Research draft — REVIEW GATE (stop here)

**Files:**
- Create: `docs/superpowers/research/2026-06-11-protocol-usage-sequence.md`

- [ ] **Step 1: Research clinical sequencing**

Research correct AM/PM placement, layer order, application frequency, and combination cautions for the 8 actives, cross-checked against the existing `directions`/`important` copy in `lib/products/content.ts`:

| SKU | Product | Active(s) | Established rule of thumb |
|---|---|---|---|
| prep | Radiance Prep Cleanser | PHA | Cleanse first, AM+PM |
| rescue | Clarifying Rescue Wash | Salicylic + zinc | Cleanse first, AM+PM (acne) |
| vitc | Vitamin CE Ferulic Serum | Vit C | AM only; SPF after |
| acne | Clarifying Acne Serum | Niacinamide + azelaic | Flexible; commonly PM with retinoid-free routines |
| ha | Hyaluronic Acid Serum | HA | Hydrate after actives, AM+PM |
| reti | Retinol Serum | Retinol | PM only; ramp 3×/wk → nightly; SPF next AM; avoid with Vit C/AHA same routine |
| light | Radiance Lightening Cream | Tranexamic + kojic | AM and/or PM per tolerance |
| spf | Barrier Restore SPF 50+ | SPF 50+ | Always last step AM; reapply 2h |

- [ ] **Step 2: Write the research doc**

The doc must contain, with sources cited:
1. The proposed `SKU_USAGE` table (every SKU: `when`, `order`, `frequency`, optional `caution`).
2. The composed AM/PM routine for each of the 4 active protocols (Clear Skin, Even Tone, Renewal, Barrier) using their actual compositions.
3. The `CONCERN_USAGE_NOTE` text per concern (acne, pigmentation, anti-ageing, hydration).
4. Sources / references list.

- [ ] **Step 3: Commit the research draft**

```bash
git add docs/superpowers/research/2026-06-11-protocol-usage-sequence.md
git commit -m "docs(research): protocol usage & sequence draft for medical review

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 4: STOP — request review**

Present the research doc to the user / Dr. Ahmad. **Do not proceed to Task 6 until they approve.** Apply any requested corrections to the doc and re-request approval.

---

### Task 6: Populate the approved usage data

**Files:**
- Modify: `lib/protocols/usage-sequence.ts` (`SKU_USAGE` and `CONCERN_USAGE_NOTE`)

- [ ] **Step 1: Fill `SKU_USAGE` and `CONCERN_USAGE_NOTE`**

Transcribe the **approved** values from the research doc into the two maps in `lib/protocols/usage-sequence.ts`. Every SKU present in any active protocol must have an entry. Example shape (use approved values, not these):

```ts
export const SKU_USAGE: Record<string, SkuUsage> = {
  prep:   { when: 'AM+PM', order: 0,  frequency: 'Morning and evening' },
  rescue: { when: 'AM+PM', order: 0,  frequency: 'Morning and evening' },
  vitc:   { when: 'AM',    order: 10, frequency: 'Every morning', caution: 'Always follow with SPF' },
  acne:   { when: 'PM',    order: 20, frequency: 'Nightly as tolerated' },
  ha:     { when: 'AM+PM', order: 30, frequency: 'Morning and evening' },
  reti:   { when: 'PM',    order: 20, frequency: '3×/week, ramp to nightly', caution: 'SPF next morning; not with Vit C same routine' },
  light:  { when: 'PM',    order: 40, frequency: 'Evening (or as directed)' },
  spf:    { when: 'AM',    order: 90, frequency: 'Every morning', caution: 'Reapply every 2 hours outdoors' },
};

export const CONCERN_USAGE_NOTE: Record<string, string> = {
  acne: '…approved copy…',
  pigmentation: '…approved copy…',
  'anti-ageing': '…approved copy…',
  hydration: '…approved copy…',
};
```

- [ ] **Step 2: Re-run the unit test (uses injected map — must still pass)**

Run: `npx vitest run tests/unit/compose-routine.test.ts`
Expected: 4 passing.

- [ ] **Step 3: Commit**

```bash
git add lib/protocols/usage-sequence.ts
git commit -m "feat(protocol): populate approved usage & sequence data

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: ProtocolUsageSequence component

**Files:**
- Create: `components/protocol/ProtocolUsageSequence.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0. (If `Eyebrow` or `Reveal` import paths differ, confirm against `components/protocol/ProtocolSteps.tsx` lines 7-8 which import the same symbols.)

- [ ] **Step 3: Commit**

```bash
git add components/protocol/ProtocolUsageSequence.tsx
git commit -m "feat(protocol): ProtocolUsageSequence AM/PM routine section

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Wire the section into the shell

**Files:**
- Modify: `components/protocol/ProtocolPageShell.tsx`

- [ ] **Step 1: Add the import**

Near the other protocol-component imports (around line 13, next to `import { ProtocolSteps } from './ProtocolSteps';`), add:

```tsx
import { ProtocolUsageSequence } from './ProtocolUsageSequence';
```

- [ ] **Step 2: Add the `hideUsageSequence` prop**

In the `ProtocolPageShellProps` type and the destructured params (where `hideEvidence = false` is declared, ~line 127), add an analogous flag. In the params destructure add:

```tsx
  hideUsageSequence = false,
```

And in the props interface (find `hideEvidence?: boolean;`) add directly below it:

```tsx
  hideUsageSequence?: boolean;
```

- [ ] **Step 3: Render the section after Steps**

Immediately after the `<ProtocolSteps steps={steps} totalWeeks={12} />` line (~line 176), insert:

```tsx
      {/* ─── Usage & Sequence — AM/PM routine ───────────────── */}
      {!hideUsageSequence && (
        <ProtocolUsageSequence steps={steps} concern={bundle.concern} />
      )}
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add components/protocol/ProtocolPageShell.tsx
git commit -m "feat(protocol): render Usage & Sequence after Steps (hideUsageSequence flag)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Verify Usage & Sequence live

**Files:** none (verification only)

- [ ] **Step 1: Smoke the section renders**

Run: `curl -s http://localhost:3000/acne | grep -c "Usage"`
Expected: ≥ 1 (the eyebrow "Usage & sequence" renders).

- [ ] **Step 2: Browser check across protocols**

For `/acne`, `/even-tone`, `/renewal`, `/barrier`: confirm a Morning and Evening column render with the right products in order, frequencies show, cautions appear where defined, and the concern note shows at the bottom. SPF appears last in Morning. No `unsequenced` catch-all should appear for the 4 active protocols (all their SKUs have metadata).

- [ ] **Step 3: Full test + typecheck pass**

Run: `npx vitest run` then `npx tsc --noEmit`
Expected: all tests pass; tsc exit 0.

- [ ] **Step 4: Final regression — protocol routes still 200**

Run: `for p in /acne /even-tone /renewal /barrier; do curl -s -o /dev/null -w "$p %{http_code}\n" http://localhost:3000$p; done`
Expected: all 200.

---

## Self-Review notes (author)

- **Spec coverage:** Buy Now behavior + placement (Tasks 1-2), express-to-checkout add-to-existing-cart (Task 1), card restructure to avoid nested anchor (Task 2), per-SKU dynamic composition (Task 4), `composeRoutine` testable seam (Task 4), research→review gate (Task 5), code-owned data map (Tasks 4/6), AM/PM section after Steps with `hideUsageSequence` flag (Tasks 7-8), unit test + live verification (Tasks 4/9). All spec sections mapped.
- **Type consistency:** `SkuUsage`, `RoutineEntry`, `ComposedRoutine`, `composeRoutine`, `SKU_USAGE`, `CONCERN_USAGE_NOTE` names match across Tasks 4/6/7. `BuyNowButton` prop names (`sku`, `pricePkr`) match call site in Task 2.
- **Placeholders:** the empty `SKU_USAGE`/`CONCERN_USAGE_NOTE` maps in Task 4 are intentional and explicitly filled in Task 6 after the review gate — not a plan placeholder.
```
