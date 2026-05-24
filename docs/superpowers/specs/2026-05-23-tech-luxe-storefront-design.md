# Clarté MD — Tech-Luxe Storefront Redesign

**Status:** Approved 2026-05-23
**Scope:** Whole storefront (home, products list, PDP, cart, checkout, header/footer)
**Direction:** Modern tech-luxe — Apple / Hermès Beauty register

## Goal

Upgrade the existing Bader-grade editorial design with motion, depth, and cinematic
product imagery — without losing the restraint that already makes the brand feel
clinical and considered. Premium ≠ noisy. Every animation must earn its place by
either revealing structure or rewarding attention.

## Non-goals

- No rewrite of routing, data access, schema, or cart logic
- No new content strategy (copy stays as is unless adjacent to a redesigned region)
- No design-system overhaul: Fraunces + mono + navy/cream/cobalt tokens stay
- No tests beyond manual browser verification and a reduced-motion check

## Dependencies (added)

| Package | Size (gz) | Why |
|---|---|---|
| `motion` (v12+) | ~38 kB | React 19 compatible animation primitives: `whileInView`, `useScroll`, gestures, `useReducedMotion`. Successor to Framer Motion. |
| `lenis` | ~12 kB | Smooth scroll engine. Used by Linear, Apple-style sites. Respects reduced-motion. |

Both via `npm install motion lenis`. No peer-dep conflicts expected with Next 15 / React 19.

## Generated assets (Higgsfield)

12 cinematic shots, stored as `.webp`:

**Products (`/public/products/{sku}/cinematic.webp`):**
- `prep` — cleanser bottle, dark slate backdrop, soft side-light, water beads
- `rescue` — barrier balm, oat sprig prop, warm low light
- `vitc` — vitamin C serum, glass dropper, citrus zest scatter
- `acne` — niacinamide serum, willow branch (salicylic source), cool blue light
- `ha` — hyaluronic serum, water droplet hero, refractive surface
- `reti` — retinol serum, evening-sky gradient, single olive leaf
- `light` — pigmentation serum, marble backdrop, morning light
- `spf` — SPF tube, sand texture, sun-warm gradient

**Protocols (`/public/bundles/{slug}/cinematic.webp`):**
- `clear-skin-protocol` — full kit group shot, concrete texture
- `even-tone-protocol` — kit group, marble + brass
- `renewal-protocol` — kit group, aged oak + linen
- `barrier-protocol` — kit group, raw linen + chalk

All shots: 16:9 hero crop, dark-luxe lighting, no humans, product labels readable.

## Shared primitives

All live under `lib/anim/`:

### `provider.tsx` — `SmoothScrollProvider`
Wraps children with a Lenis instance. Mounted in `app/layout.tsx`. Skips Lenis init when `prefers-reduced-motion: reduce`.

### `hooks.ts`
- `useReducedMotion()` — re-export from `motion/react`, plus a `usePrefersReducedMotion()` SSR-safe variant for server components that pass props down.
- `useMagnetic(strength = 8)` — returns mouse-move handlers + transform.

### `reveal.tsx` — `<Reveal>`
```tsx
<Reveal delay={0} as="div"> ...children... </Reveal>
```
Opinionated `whileInView` fade-up: `opacity 0→1`, `y 24→0`, `duration 0.6`, `ease [0.22, 1, 0.36, 1]`, `once: true`, `margin: '-10% 0px'`. `<RevealGroup>` adds 80 ms stagger to its `<Reveal>` children.

### `magnetic.tsx` — `<Magnetic>`
Wraps a button/link. On hover, translates ±strength px following cursor with spring damping. No-op on touch + reduced-motion.

### `cursor-glow.tsx` — `<CursorGlow>`
Self-contained component. Renders a `radial-gradient` blob that follows the cursor inside its parent. Used on dark sections (navy brand block, PDP cinematic hero). Hidden on touch + reduced-motion.

### `cinematic-photo.tsx` — `<CinematicPhoto>`
Image wrapper supporting:
- `parallax={0.0–0.3}` — scale + translate driven by `useScroll` progress through the element's viewport range
- `lightSweep` — on hover, a diagonal white-15% gradient sweeps across (CSS-only)
- `kenBurns` — slow 20 s scale 1.0 ↔ 1.05 loop (CSS keyframe)
- `aspect` — defaults to `4/5`, configurable
Built on `next/image` for optimization + LCP correctness.

## CSS additions (`app/globals.css`)

```css
@theme {
  --ease-luxe: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 200ms;
  --dur-base: 400ms;
  --dur-slow: 800ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

@keyframes kenburns {
  0%, 100% { transform: scale(1.0); }
  50%      { transform: scale(1.05); }
}
```

## Per-page treatment

### Home `/`

| Section | Treatment |
|---|---|
| Hero | Two-column layout: copy left (current Fraunces hero), sticky `<CinematicPhoto>` right showing protocol bundle group shot with `parallax={0.15}`. Headline reveals line-by-line (60 ms stagger). Primary CTA wrapped in `<Magnetic strength={6}>`. |
| Receipt band | `<Reveal>` group; if/when real numbers ship, they animate-count from 0. |
| Protocols grid | Featured card: `kenBurns` on bundle cinematic shot, accent bar grows from top on hover (CSS scale-y). Supporting cards: hover = `rotateX 2deg rotateY 3deg` 3D tilt via Motion `whileHover`, accent bar grows. |
| How-it-works | `<RevealGroup>` stagger on three steps + horizontal dotted line that draws between them on scroll via SVG `stroke-dashoffset`. |
| Product strip | Each `<ProductCard>` gets hover tilt (~3 deg) + cinematic crossfade (existing hover-swap stays, just smoother). |
| Navy brand block | `<CursorGlow>` overlay. Copy reveals line-by-line. Right-side cinematic doctor/clinic still replaces placeholder gradient. |
| Final CTA | Magnetic button. Background hint of cursor parallax (very subtle, ~4 px). |

### Products list `/products`

- Hero strip with cinematic banner image (one of the protocol shots)
- Filter chips: pill micro-animations (scale 1.0 → 0.96 on press)
- Grid: `<RevealGroup>` stagger; cards get the home treatment

### PDP `/products/[sku]`

- Cinematic hero band (full-width, dark gradient) with the product's `cinematic.webp` and `<CursorGlow>` overlay. Image scrolls 1.0 → 1.08 via `useScroll`.
- Gallery: hero + 3 views, crossfade with Motion `AnimatePresence`. Hover-zoom lens on the main image (CSS `background-position` follows cursor).
- Sticky add-to-cart bar slides up from bottom when the primary CTA scrolls off (Motion `useScroll` threshold).
- Ingredient/why-it-works: accordion using Motion `layout` for smooth height.
- Related products: same card treatment.

### Cart `/cart`

- Line items: slide-in stagger on mount (`layoutId` keyed to product sku → enables shared-element from PDP add-to-cart later if we wire it up)
- Qty changes: scale punch (Motion spring)
- Total: number flip on change (split digits, animate the changed digit's y)
- Empty state: big editorial moment — Fraunces italic "Your cart is empty —" + magnetic CTA back to /quiz

### Checkout

- Field focus: border-draw animation (CSS `clip-path` or SVG stroke trick)
- Step transitions: shared layout container; review/payment cross-fade via Motion `AnimatePresence`
- Order success: gentle confetti (Motion-only, no extra dep — ~8 colored dots with physics) + cinematic reveal of order number

### Header

- Default: transparent over hero, white over content
- On scroll past 80 px: shrinks padding (16 → 8 px), adds backdrop blur, drop-shadow
- Cart icon: bounce on item-add (Motion spring `scale 1 → 1.2 → 1`), count number flips

### Footer

- `<RevealGroup>` stagger across columns on first view

## Reduced-motion contract

Every animation in this spec MUST be a no-op when `prefers-reduced-motion: reduce`:

1. Lenis isn't initialized at all (browser native scroll)
2. Motion's `useReducedMotion()` gates `whileInView`, `whileHover`, `useScroll`
3. CSS keyframes (`kenburns`, `lightSweep`) are nuked via the global override above
4. `<CursorGlow>` and `<Magnetic>` early-return null/identity on touch + reduced-motion

A user with reduced motion sees the layout fully populated at first paint, with no motion, ever.

## Performance budget

- Bundle delta: ≤ 60 kB gzipped (motion + lenis)
- LCP must not regress: hero `<CinematicPhoto>` uses `next/image` priority, eager loading
- CLS budget unchanged (image dimensions explicit)
- No animation > 1 s; no infinite animations except `kenBurns` (paused off-screen via `content-visibility: auto`)

## File map

**New:**
```
lib/anim/provider.tsx
lib/anim/hooks.ts
lib/anim/reveal.tsx
lib/anim/magnetic.tsx
lib/anim/cursor-glow.tsx
lib/anim/cinematic-photo.tsx
scripts/generate-cinematic-photos.ts        # Higgsfield generation helper
components/product/StickyAddBar.tsx          # PDP scroll-aware bar
components/product/CinematicHero.tsx         # PDP cinematic band
```

**Modified:**
```
app/layout.tsx                               # mount SmoothScrollProvider
app/globals.css                              # animation tokens, keyframes, RM override
app/(site)/page.tsx                          # home redesign
app/(site)/products/page.tsx                 # catalog hero + reveal grid
app/(site)/products/[sku]/page.tsx           # delegate to redesigned PDP
app/(site)/cart/page.tsx                     # cart anims
app/(site)/checkout/**/page.tsx              # checkout anims
components/product/ProductCard.tsx           # tilt + cinematic crossfade
components/product/ProductDetailPage.tsx     # cinematic hero, gallery, sticky bar, accordion
components/site/SiteHeader.tsx               # scroll-shrink, cart bounce
components/site/SiteFooter.tsx               # column stagger
components/cart/*                            # line item anims, qty punch, total flip
components/checkout/*                        # field focus, step morph, success reveal
package.json                                 # add motion, lenis
```

Approx 30 files total.

## Phasing (build order)

1. **Foundation:** deps + animation primitives + globals.css tokens (no visible change yet)
2. **Assets:** generate 12 cinematic shots
3. **Home:** apply primitives + cinematic shots
4. **Products + PDP:** the highest-value cinematic moment
5. **Cart + Checkout:** quieter polish
6. **Header + Footer:** chrome
7. **Verify:** dev server, walk every page, reduced-motion check

Each phase ends with a working app — order is safe for partial commits.

## Risks + mitigations

- **Lenis + sticky elements** can conflict. Mitigation: PDP cinematic hero uses `useScroll` on a non-sticky wrapper; header scroll-shrink uses Lenis's `scroll` event instead of `window.scroll`.
- **`motion` SSR**: All motion components are client-only. Mark with `'use client'` and import from `motion/react`.
- **Bundle bloat**: Tree-shake by importing only used Motion exports (`motion`, `useScroll`, `useReducedMotion`, `AnimatePresence`).
- **Higgsfield quota**: If credits short, ship Phase 3 (home) with just 4 protocol shots first, generate product cinematics later. Falls back gracefully if files absent (component checks `fs.existsSync` at build / shows current photo).

## Out of scope (deferred)

- Page-to-page route transitions (Next 15 view transitions API would be a separate spec)
- Shared-element from PDP add-to-cart to header cart icon (nice-to-have, not now)
- Dark-mode site-wide (PDP cinematic band is dark; site stays cream)
- Video product assets
