# Protocol page — "Buy Now" + "Usage & Sequence" — Design

Date: 2026-06-11
Status: Approved (design); Usage content pending medical review before publish.

## Summary

Two additions to the per-protocol landing pages (`app/(protocols)/<slug>`,
rendered through `components/protocol/ProtocolPageShell.tsx`):

1. **Buy Now** — a per-product express-checkout button on each numbered
   product step card.
2. **Usage & Sequence** — a researched AM/PM routine section that composes the
   protocol's products into a clinically-correct daily sequence.

Both are scoped to the protocol pages only. No storefront/catalog/PDP changes.

## Context (current state)

- Step cards live in `components/protocol/ProtocolSteps.tsx` (`'use client'`).
  Each `CinematicStepCard` is **entirely** wrapped in a `<Link href="/products/{sku}">`
  and ends with a footer row: `Rs. {price}` + a "View product ↗" affordance.
- Cart API: `useCart()` (`lib/cart/use-cart.ts` / `lib/cart/provider.tsx`)
  exposes `addProduct(sku, qty?)`, `addBundle(slug)`, `cart`, `itemCount`,
  `removeItem`, `updateQty`, `clearCart`. There is **no** express-buy path and
  **no** context-exposed drawer-open today (drawer open state is local to the
  header `CartIcon`).
- Per-product usage copy already exists in `lib/products/content.ts`
  (`directions`, `important`, `bestFor`, AM/PM hints) and renders on the PDP.
  There is **no** protocol-level combined routine.
- `ProtocolPageShell` already gates optional sections with a boolean prop
  pattern (`hideEvidence`). Section layers are rendered in order
  (Hero → … → Steps → Savings → …).
- Protocol data comes from `getProtocolPageData(slug)` →
  `{ bundle, outcome, steps, savings }`. Each `step` carries
  `{ num, stage, purpose, product, image }`; `product.sku` is the join key.

### Active protocol compositions (canonical, from `lib/db/seed.ts`)

| Protocol | concern | products (SKUs) |
|---|---|---|
| Clear Skin | acne | rescue, acne, ha, spf |
| Even Tone | pigmentation | prep, vitc, light, spf |
| Renewal | anti-ageing | prep, vitc, reti, ha, spf |
| Barrier | hydration | prep, ha, spf |

Product SKUs: `prep` (PHA prep cleanser), `rescue` (salicylic + zinc wash),
`vitc` (Vitamin CE serum), `acne` (niacinamide + azelaic serum), `ha`
(hyaluronic serum), `reti` (retinol serum), `light` (tranexamic + kojic cream),
`spf` (SPF 50+). Composition is read from the DB at render time (admin-editable),
so the routine must compose dynamically rather than assume a fixed product list.

---

## Part A — Buy Now (per-product express checkout)

### Behavior

On click: `addProduct(sku)` (adds to the existing cart — no clear/replace),
then `router.push('/checkout')`. Decisions locked during brainstorming:
- Express → straight to `/checkout` (not the cart drawer, not `/cart`).
- Add to existing cart contents; never discard what's already there.

### Components

- **New** `components/protocol/BuyNowButton.tsx` (`'use client'`):
  props `{ sku: string; pricePkr: number }`. Solid cobalt button, label
  `Buy Now · Rs. {price}`. Uses `useCart()` + `useRouter()`.
  - `onClick`: `e.preventDefault(); e.stopPropagation();` (the button renders
    near/under the card's PDP `<Link>` — must not trigger navigation to the PDP),
    then `addProduct(sku)` → `router.push('/checkout')`.
  - Sets a local `busy` state on click and disables the button to prevent
    double-submits during navigation.
- **Edit** `components/protocol/ProtocolSteps.tsx` → `CinematicStepCard`:
  restructure so the card container is a `<div>` (not the `<Link>`). The
  image + body + price/"View product" row remain a `<Link href="/products/{sku}">`;
  the `<BuyNowButton>` is rendered as a **sibling below** that link, inside the
  card container. This removes the invalid `<button>`-inside-`<a>` nesting while
  preserving tap-to-view-product. Footer layout matches the approved mockup:
  price + "View product ↗" row, then a full-width Buy Now button beneath.
  - Applies to both the mobile rail and the desktop/tablet grid (same card fn).

### Edge cases / errors
- Card hover/tap animations on the wrapper must not visually swallow the button;
  button gets its own tap feedback.
- If `router.push` is slow, the disabled+busy state covers the gap.

### Analytics (optional, low priority)
- The repo has analytics tagging (commit `cb1e9d0`). If a lightweight client
  event helper is already available, fire a `buy_now_click` with `{ sku }`.
  Not a blocker; omit if it adds a new dependency or boundary.

---

## Part B — Usage & Sequence (researched)

### Architecture decision

Compose the routine **dynamically** from researched **per-SKU usage metadata**,
rather than hardcoding a full routine per protocol. One data source serves all
protocols and any admin-edited composition.

### New data — `lib/protocols/usage-sequence.ts` (code-owned)

```ts
export type UsageWhen = 'AM' | 'PM' | 'AM+PM';

export interface SkuUsage {
  when: UsageWhen;      // which routine(s) the product belongs to
  order: number;        // layer rank within a routine (low = applied first)
  frequency: string;    // e.g. 'Every morning', '3×/week, ramp to nightly'
  caution?: string;     // short inline warning, e.g. 'Apply SPF the next morning'
}

export const SKU_USAGE: Record<string, SkuUsage> = { /* researched, see below */ };

// Protocol-level note keyed by bundle.concern (optional).
export const CONCERN_USAGE_NOTE: Record<string, string> = { /* researched */ };
```

Ordering convention (layer rank): cleanser (0) → antioxidant/Vit C (10) →
treatment serums (20) → hydrator/HA (30) → moisturiser/cream (40) →
**SPF always last in AM (90)**.

### Pure composition function (testable seam)

```ts
// lib/protocols/usage-sequence.ts
// A composed routine row: the protocol step plus its resolved usage metadata.
export interface RoutineEntry { step: ProtocolStep; usage: SkuUsage }

export function composeRoutine(
  steps: ProtocolStep[],
  usage: Record<string, SkuUsage> = SKU_USAGE,
): { am: RoutineEntry[]; pm: RoutineEntry[]; unsequenced: ProtocolStep[] }
```

- AM column = steps whose `when ∈ {AM, AM+PM}`, sorted by `order`.
- PM column = steps whose `when ∈ {PM, AM+PM}`, sorted by `order`.
- A step whose SKU has no metadata goes to `unsequenced` (rendered under an
  "Use as directed" catch-all, not silently dropped).

### New component — `components/protocol/ProtocolUsageSequence.tsx`

- Props: `{ steps: ProtocolStep[]; concern: string }`.
- Renders the approved **two-column AM / PM** layout: Morning and Evening, each
  a numbered list of `name — frequency`, with a small ⚠ caution chip where
  `caution` is present. Footer shows `CONCERN_USAGE_NOTE[concern]` and any
  `unsequenced` items.
- Visual language matches existing protocol sections (Eyebrow, Fraunces
  headings, cobalt accents, Reveal animations). Mobile: AM then PM stacked.

### Wire-in — `components/protocol/ProtocolPageShell.tsx`

- New prop `hideUsageSequence?: boolean` (default `false` → shown), mirroring
  the `hideEvidence` flag.
- Rendered as a new layer **after `ProtocolSteps`, before `ProtocolSavings`**.
- Passes `steps={steps}` and `concern={bundle.concern}`.

### The research (publish gate)

Per the chosen flow: **research → draft → review → publish.**

1. Research clinically-correct AM/PM sequencing, layering order, application
   frequency, and combination cautions for all 8 actives. Sources: established
   dermatology references for active layering (Vit C AM, retinol PM + slow ramp,
   SPF always last AM, avoid Vit C + retinol same routine, niacinamide/azelaic
   flexible, acid + retinoid caution), cross-checked against the existing
   `directions`/`important` copy in `lib/products/content.ts` for consistency.
2. Write a **draft research doc** at
   `docs/superpowers/research/2026-06-11-protocol-usage-sequence.md` containing:
   the per-SKU `SKU_USAGE` table, the composed AM/PM routine for each of the 4
   active protocols, the per-concern notes, and cited sources.
3. **User / Dr. Ahmad reviews and approves.** Only after approval do we populate
   `usage-sequence.ts` and render the component live. No medical content ships
   before sign-off.

---

## Testing

- **Unit** (`tests/unit/`): `composeRoutine()` — AM/PM split correctness,
  `order` sorting, SPF-last invariant, `AM+PM` appearing in both columns,
  and missing-metadata → `unsequenced` fallback. Pure function, no DB.
- **Buy Now**: relies on the already-tested `addProduct` cart operation; verify
  add-then-navigate behavior live in the running dev app (`/checkout` reached,
  item present). No new unit test required for the navigation wrapper.
- **Regression**: existing protocol pages still render (4 active routes 200).

## Build order

1. **Part A — Buy Now.** Self-contained and shippable immediately.
2. **Part B step 1 — research doc**, then **stop for review**.
3. **Part B step 2 — after approval**: `usage-sequence.ts` data + component +
   shell wire-in + unit test.

## Out of scope (YAGNI)

- Admin-editable usage content (code-owned map first; revisit only if needed).
- Cart-drawer-open-on-add, `/cart` redirect, or isolated single-item checkout.
- Storefront/catalog/PDP changes. Per-product PDP directions already exist.
```
