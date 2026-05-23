# Sub-project #7 — Design System Overhaul — Phase 0–2 Acceptance

**Date:** 2026-05-23
**Stack installed:** Tailwind v4 + shadcn (new-york style, neutral base)
**Branch:** `main`
**Commits:** 9 (Phase 0 → 2.7) — `289f692` through `de30a0e`

## What shipped

### Phase 0 — Theme tokens (`289f692`)
Unified the navy + cobalt drift that had accumulated across legacy pages (`#0057ff` and 5 different navy variants) onto one navy (`#0e1f3a`) and one cobalt (`#2e5ba8`). La Roche-Posay Hydra rule applied:
- `--primary` = navy → functional CTA
- `--secondary` = cobalt → brand identity, ~10% of surfaces
- WCAG 2.1 audit script (`scripts/check-contrast.mjs`) — all 14 checks pass at AA or above (body text 15.90:1 AAA, primary CTA 16.46:1 AAA, focus ring 6.38:1 AA UI).

Tokens exposed as Tailwind v4 `@theme` utilities: `bg-navy`, `text-cobalt`, `border-rule`, `bg-canvas`, plus shadcn semantic tokens (`bg-primary`, `text-foreground`, etc.). 4 protocol-accent tokens defined for future protocol-page work (warm clay, rose clay, lavender mist, sage mist).

### Phase 1a — Clarté UI primitives (`8dfdcda`)
Five new components at `components/ui/`:
- `<Eyebrow>` — universal mono+caps section label
- `<TrustPills>` — single-word credential row (EltaMD/Tatcha/COSRX consensus pattern)
- `<ProductTitle>` — italic Fraunces name + sans descriptor (Tatcha pattern)
- `<ClinicalProof>` — 3-up % stat block with mandatory methodology attribution. Ships with `variant="placeholder"` for honest "data pending" frame.
- `<ProtocolExplainer>` — Clarté equivalent of Bader's TFC8 / Tatcha's Hadasei-3™ slot

### Phase 2 — Page-by-page migration

| Page | Phase | Commit | What changed |
|---|---|---|---|
| Site Footer | 2.1 | `1d2c68b` | shadcn Button/Input installed; first dark-surface migration |
| Site Header + `/ingredients` | 2.2 | `710442f` | DropdownMenu + Sheet primitives; third nav axis added |
| Contact + Legal | 2.3 | `4056be1` | Textarea installed; legal MDX prose via descendant selectors |
| About | 2.4 | `b6a8883` | Brand-story page; no new primitives |
| PDP + Products listing + cards | 2.5 | `0cb6f08` | Accordion installed; PDP first composes all 5 Phase 1a primitives |
| Cart + Order tracking | 2.6 | `cafeb95` | Both migrations in one commit (small) |
| Homepage | 2.7 | `de30a0e` | Largest single migration; entire `/` rebuilt |

### Per-route CSS files deleted (8 files)
- `components/site/site.css`
- `app/(site)/contact/contact.css`
- `app/(site)/legal/[slug]/legal.css`
- `app/(site)/about/about.css`
- `components/product/product.css`
- `app/(site)/cart/cart.css`
- `app/(site)/order/[number]/order.css`
- `app/(site)/home.css`

### shadcn primitives installed (7)
- `Button`, `Input` (Phase 2.1)
- `Sheet`, `DropdownMenu` (Phase 2.2)
- `Textarea` (Phase 2.3)
- `Accordion` (Phase 2.5)

## Deliberately deferred

### Protocol pages (`/acne`, `/even-tone`, `/renewal`, `/barrier`)
Not migrated. The four protocol pages live as ~2000-line CSS files paired with raw HTML strings injected via `dangerouslySetInnerHTML` (see `feedback_html_migration` in memory — they were byte-faithfully ported from static HTML, not converted to JSX, deliberately). Three reasons to keep them as-is:

1. **They are already on-brand.** Their per-route CSS already uses the canonical navy (`#0e1f3a`) and cobalt (`#2e5ba8`) values — no drift to fix. They never had the `#0057ff` legacy blue problem the (site) pages did.
2. **Migration cost is ~8000 lines of high-converting customer-facing markup.** The protocol pages are the brand's main conversion funnel. Touching them risks breaking what works.
3. **"Polish, not redesign" + "do not blow up the brand identity"** ([[project_design_system]]) both argue against touching pages that already work.

If a future Phase 3 wants to fold these into the Tailwind/shadcn system, the right approach is: build a `<ProtocolPage>` component composing the new primitives, port one protocol (say `/barrier`, the shortest), validate conversion parity for 4-6 weeks of real traffic, then port the other three. Out of scope here.

### Admin pages (`/admin/login`, `/admin/orders`, `/admin/orders/[id]`)
Not migrated. Admin pages use inline `style={{}}` props with `fontFamily: 'system-ui'` and neutral gray borders (`#ccc`). They contain zero brand-color references — no drift exists to fix. They are functional internal-only tooling. Migrating them would be pure busywork without user value.

If a future polish pass wants admin styling, the move is to wrap admin pages in a separate layout that loads shadcn primitives + a minimal admin-themed token block — not to migrate the existing tools page-by-page.

### Newsletter wiring on Footer
The footer newsletter form is a controlled-stub `onSubmit={preventDefault}`. The `/api/contact` endpoint already supports a `subscribe` flag and writes to the `subscribers` table (from sub-project #6). Wiring the footer form to that endpoint is a 30-min follow-up not bundled with the visual migration.

### Checkout migration
`/checkout` itself is a 22-line guard wrapper that bounces empty carts to `/cart` and renders `<CheckoutForm />`. The form component lives at `components/checkout/CheckoutForm.tsx` and has its own `checkout.css` imported in `app/(site)/layout.tsx`. Migrating CheckoutForm is its own ~1-hour exercise — not bundled here because the form is functionally complete and the cobalt drift is contained.

### Research-recommended Phase 2 additions
The 00-summary.md doc identified several enhancements that are deferred to follow-up work:
- **Triple-axis nav (Concern / Type / Ingredient)** — only the *Ingredients* axis was added (as a placeholder route). Concern + Type filters on `/products` are deferred.
- **Quiz-result → cart-preview multi-product CTA** — the `/quiz` flow's result page improvement is the highest-leverage funnel change, but `/quiz` migration was not in this phase's scope.
- **3-step checkout timeline indicator** — Hims/Hers pattern, deferred with the rest of CheckoutForm.
- **"Complete the Protocol" cross-sell on PDP** — Drunk Elephant Smoothie-Kit-as-peer-SKU pattern; PDP shipped without it but the component slot exists.
- **`/genuine` counterfeit verification page** — COSRX Always-Authentic pattern; PK-relevant, deferred.
- **`<ClinicalProof>` real data** — component ships in placeholder variant on PDP. Real numbers go in after first 30-customer panel.
- **`<ProtocolExplainer>` real content** — component ships unused; Clarté's signature concept ("The Clarté Protocol") is a brand-copy decision deferred to the operator.

## Verification

- **All 19 production routes return 200** under the migrated chrome: `/`, `/about`, `/contact`, 4× `/legal/*`, `/ingredients`, `/products`, 3× PDP sample, `/cart`, `/checkout`, `/order/[number]`, 4× protocol.
- **`npx tsc --noEmit`** clean across the entire migration.
- **`npx eslint`** clean across all migrated files.
- **WCAG 2.1 audit** (`scripts/check-contrast.mjs`) — 14/14 PASS.
- **Vercel auto-deploy** triggered on push of each commit; live at `lp.clartemd.com.pk`.

## Reversibility

Each page migration is its own commit. To revert any page back to its per-route CSS, `git revert <commit>` for that page restores both the page TSX and the CSS file. No migration commit modifies more than one logical page, except Phase 2.5 (PDP + Products + cards share `product.css` so they had to migrate together) and Phase 2.6 (Cart + Order batched for size).

## Token system reference

The complete token spec lives in `app/globals.css`. Key entries:
- Surface: `--background = --clarte-canvas (#fafbfd)` — cool off-white (Faisal's choice 2026-05-23)
- Ink: `--foreground = --clarte-ink (#0e1f3a)` navy
- CTA: `--primary` = navy (functional buttons)
- Brand accent: `--secondary` = cobalt `#2e5ba8` (10% use)
- Focus ring: `--ring` = cobalt
- Container: `--container-content = 82rem` (1312px — LRP Hydra spec)
- Type: Fraunces (display) + Plus Jakarta (body) + JetBrains Mono (eyebrow only, ALL-CAPS, max 4-5 words)

## Open work for follow-up sessions

In priority order:

1. **Wire the Footer newsletter** to `/api/contact` (~30 min)
2. **Migrate CheckoutForm + checkout.css** (~1 hour)
3. **Build out `/ingredients` content** — 12 ingredient entries (~2-3 hours of copy + component composition)
4. **Build `/genuine` verification page** + add small badge to PDP buy box (~30 min once copy exists)
5. **Add triple-axis filtering to `/products`** (concern + type filter chips) (~1 hour)
6. **Wire `<ClinicalProof>` with real panel data** when n=30 panel completes
7. **Quiz-result page improvement** — single "Add protocol to cart" CTA (out of scope here; needs `/quiz` migration first)
8. **Phase 3 protocol-page migration** — only if conversion needs it; current pages are on-brand and working

## Acceptance

Sub-project #7 Phase 0 + Phase 1a + Phase 2 (excluding protocol pages and admin per documented decisions) is **complete**. The brand chrome (Header, Footer), all destination pages (Homepage, Products listing, PDP, About, Contact, Legal), and all utility pages (Cart, Order tracking, `/ingredients` placeholder) now run on the unified Tailwind v4 + shadcn token system. The 5 custom Clarté primitives are ready for use on the deferred items above.
