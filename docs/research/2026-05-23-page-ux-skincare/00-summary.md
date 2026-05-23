# Page-by-Page Skincare UX Research — Summary

**Date:** 2026-05-23
**Brands surveyed:** 20+ across 6 pages (some brands appear on multiple pages)
**Purpose:** Map concrete page-by-page UX patterns onto Clarté MD's already-migrated post-Phase-2 codebase so the next round of refinements lands on the highest-leverage gaps.

## How this differs from the May 2023 research

The earlier bundle (`docs/research/2026-05-23-skincare-ui-ux-research/`) was per-brand teardowns — useful for tokens, type rules, and overall positioning. **This bundle is per-page cross-brand comparison** — useful for deciding *what to ship on each surface*. Read the page-specific files for depth:

| Page | File | Brands compared |
|---|---|---|
| Homepage | [`01-homepage.md`](01-homepage.md) | Bader · Tatcha · Aesop · Glossier · La Mer · SkinCeuticals · Drunk Elephant · Charlotte Tilbury |
| Shop / catalog | [`02-shop.md`](02-shop.md) | Sephora · The Ordinary · Paula's Choice · COSRX · EltaMD · BoJ · Drunk Elephant · Tatcha |
| PDP | [`03-pdp.md`](03-pdp.md) | Bader · Tatcha · Dr. Jart+ · EltaMD · Drunk Elephant · COSRX · Glossier · Aesop |
| Cart | [`04-cart.md`](04-cart.md) | Glossier · Drunk Elephant · Tatcha · Lush · EltaMD · Bader · BoJ · Charlotte Tilbury |
| Checkout | [`05-checkout.md`](05-checkout.md) | Glossier · Apple · Allbirds · Tatcha · Sephora · Beauty Pie · EltaMD · Bader |
| Thank-you | [`06-thank-you.md`](06-thank-you.md) | Glossier · Allbirds · Tatcha · Brooklinen · Beauty Pie · EltaMD · Shopify default · Baymard 2024–25 |

---

## 1. The shortlist — top 10 moves ranked by ROI

Each item names the target file/component and which page doc backs it. The first three are the biggest gaps in the current product.

### #1 — Cart drawer via shadcn `Sheet` + opt-in sample tile
**File:** new `components/cart/CartDrawer.tsx` (composed in `SiteHeader.tsx`), plus a small additions block in `app/(site)/cart/page.tsx`. **From:** `04-cart.md`.

All 8 cart references slide a drawer on add; Clarté is the outlier (full-page only). Wire a right-side `Sheet` (400–440px desktop / full-screen mobile) triggered from `<CartIcon>`. Inside, mirror the existing `/cart` content compressed. **Below the items list, add an opt-in sample tile** (Beauty of Joseon pattern): single card, headline "*Add a complimentary sample*", 2–3 sample swatches with an explicit `Add` button on each. No auto-bundle — preserves COD trust and avoids the "what's this in my parcel" support ticket.

### #2 — Make `/order/[number]` mode-aware via `?placed=1`
**File:** `app/(site)/order/[number]/page.tsx` + the create-order client redirect. **From:** `06-thank-you.md`.

Do **not** build a separate `/thank-you/[order]` route. Shopify itself merges these two surfaces — first visit = thank-you tone, return visits = tracker tone — and 80% of the page content is identical. Add a `placed=1` query param in the create-order `window.location.assign`, and on the page render a one-time hero band above the existing status callout: Eyebrow "Order confirmed" + Fraunces "*Thank you, {first_name}.*" + sub "We've received order {order_number} and will dispatch within 24 hours. A WhatsApp confirmation is on its way." Plus an inline 3-step "what happens next" panel (we confirm → courier collects → pay on delivery — Rs. {total}). Highest-conversion confirmation pattern in the Baymard data; near-zero new infrastructure.

### #3 — CheckoutForm: 3-step indicator + COD-as-express + total-in-button
**File:** `components/checkout/CheckoutForm.tsx`. **From:** `05-checkout.md`.

Three small upgrades that compound:
- Top of the form: Sephora-style numbered, ticked, tappable breadcrumb — `1. Contact → 2. Shipping → 3. Confirm`.
- Above the form (where other brands put Apple Pay): hoist the COD reassurance hero out of the Payment fieldset to the top — `"Cash on Delivery. Pay the courier when your parcel arrives."` This is Clarté's "express checkout equivalent" — fastest reassurance path on a page where six of eight references put Apple Pay above the email field.
- Submit button: change copy to `Place Order — Rs. {total.toLocaleString('en-PK')}` (Allbirds pattern). Mobile sticky bottom. Loading: "Placing Order…". And drop the "Pay now" verb everywhere — wrong for COD.

### #4 — Triple-axis chip filters + merge Protocols/Individuals into one grid on `/products`
**File:** `app/(site)/products/page.tsx` + new `components/product/CatalogFilterChips.tsx`. **From:** `02-shop.md`.

With 12 SKUs total, the current two-stacked-grids layout is honest but wasteful. Replace with **one grid** above a row of chip filters: `[All] [Protocol Bundles (4)] [Individual Products (8)]` toggle (BoJ pattern), plus three multi-select chip rows for **Concern · Type · Active** (COSRX + The Ordinary parallel-axis pattern). On 12 items a left sidebar would dwarf the grid; chips are right. Selected chips become removable; `Clear all` link appears when any chip is active. Use shadcn `ToggleGroup` (next primitive to install).

Bonus: graceful empty state when no SKU matches — render the closest **protocol bundle** with copy "*No exact match. The Clear-Skin protocol covers all three concerns you selected.*" + `Clear filters` link. Converts a dead end into a regimen recommendation.

### #5 — Homepage trust-receipt band between hero and protocols
**File:** `app/(site)/page.tsx`. **From:** `01-homepage.md`.

The hero hands off directly to the 4-protocol grid right now. Insert one thin section in between (Bader + SkinCeuticals composite, mapped to Clarté typography): one Fraunces-italic clinical stat (`"Up to {N}% of patients report visible improvement at week 8"`) + one JetBrains Mono sample-size eyebrow (`"12-WEEK CLINIC PANEL · N={N}"`). **Only ship after a real panel exists** — per `feedback_unverified_claims`, don't invent. Until then, leave the slot empty or use a placeholder variant of `<ClinicalProof>` (the Phase 1a component already supports this).

### #6 — PDP: per-step duration + protocol-shaped cross-sell + price-in-CTA + "best for" microcopy
**File:** `components/product/ProductDetailPage.tsx`. **From:** `03-pdp.md`.

Four small PDP upgrades, each from a different brand pattern:
- **Per-step duration** on the "How to use" numbered list — Bader pattern (`"45s"`, `"1 min"`, `"until absorbed"`). Renders in `font-mono` next to the step.
- **Protocol-shaped cross-sell** — replace `related` random other products with the 2–3 SKUs in the same protocol bundle. Tatcha "Suggested Ritual" + COSRX "Glass Skin Routine" pattern. Query by `protocol_slug`.
- **Price baked into the CTA copy** — change `Add to bag` → `Add to bag — Rs. {price.toLocaleString('en-PK')}` (Glossier pattern). High value on COD where price confirmation reduces order-cancellation calls.
- **"Best for" microcopy under CTA** — EltaMD pattern. New `bestFor` string in `PRODUCT_CONTENT` per SKU: "*Best for combination + oily skin types prone to congestion*" or "*Best for melanin-rich skin showing post-acne marks*". Sets expectation pre-purchase.

### #7 — Sticky promo bar (anchored to real Clarté policy, never a discount)
**File:** `components/site/SiteHeader.tsx` — new top band above the existing header. **From:** `01-homepage.md` + `04-cart.md`.

5 of 8 homepage references run a sticky promo above the nav. Clarté is leaving the slot empty. Use it for the *flat Rs. 250 shipping* + *cash on delivery* fact, not a discount: single line, no rotation, cobalt-on-navy or off-white-on-navy mono type. This converts the most-visible piece of real estate into a trust signal that's also a fact. Hard guard: per `feedback_unverified_claims` and `feedback_cod_policy`, never frame as a discount or promise open-the-parcel-before-paying.

### #8 — `<ProductCard>` upgrades: image-swap on hover + inline Add + image gallery
**File:** `components/product/ProductCard.tsx`. **From:** `02-shop.md`.

Three small card upgrades:
- Image-swap on hover (5 of 8 PLPs do it) — pure CSS opacity crossfade to image[1] from `PRODUCT_CONTENT[sku].views[0]`. No JS.
- Inline `Add` button (6 of 8 PLPs do it) — already in the migrated card, keep it. Use cobalt accent so it reads clinical, not retail-loud.
- Aggregate-rating row on the card once review volume hits 10+ per SKU (Beauty of Joseon, Paula's Choice, EltaMD pattern). Defer until volume exists.

### #9 — WhatsApp concierge surface on cart + thank-you
**File:** `components/cart/CartDrawer.tsx` (when built) + `app/(site)/order/[number]/page.tsx`. **From:** `04-cart.md` + `06-thank-you.md`.

Augustinus Bader's empty-bag has a WhatsApp link; Clarté's market is **WhatsApp-first**. Add `"Questions before you order? Message us on WhatsApp →"` to the cart drawer footer and `"Need to change something? WhatsApp us →"` to the thank-you mode-aware band. Both deeplink to `wa.me/{NUMBER}`. Trust function BNPL does for Western carts.

### #10 — Numbered carousel paging (not dots) on the products strip
**File:** `app/(site)/page.tsx` products section. **From:** `01-homepage.md`.

Replace dots/arrows with `01 / 08` + "Previous / Next" pair in Plus Jakarta sans. Editorial cadence, zero cost to build, immediately reads as more considered (Tatcha + Glossier prove it; Charlotte Tilbury proves dots feel like ads).

---

## 2. Cross-page patterns (recurring across 3+ docs)

These are the moves the research shows up consistently across multiple page types — universal grammar of the segment.

| Pattern | Pages observed | Clarté hook |
|---|---|---|
| **Quantified clinical claim format: % + N + duration + methodology + named lab** | Homepage, PDP, Thank-you (delivery-date precision) | Pattern is universal; format the `<ClinicalProof>` component already supports. Don't ship until panel data exists. |
| **Italic Fraunces serif for the brand-mark moment + Mono eyebrow above it** | Homepage hero, PDP title, Section heads, Brand-story preview | Already a Phase 0 token rule; reinforced as cross-page best practice. Don't drift. |
| **Order summary sticky right on desktop, collapsible-top with total always visible on mobile** | Cart, Checkout, Thank-you | Existing `OrderSummary` component pattern is correct. Verify mobile collapse leaves the total exposed. |
| **Guest-first with post-purchase account-creation upsell** | Checkout, Thank-you | Clarté is guest-only and stays that way. Account creation isn't yet wired; when it is, the upsell goes on the thank-you band, not in checkout. |
| **Brand-themed checkout (typography + color), not Shopify-default chrome** | Checkout (Tatcha), Cart, PDP | CheckoutForm migration should fully use the Phase 0 tokens (navy, cobalt, Fraunces). Don't ship vanilla shadcn for the most trust-sensitive surface. |
| **Hero is one image + one short headline + one CTA (no carousel arrows)** | Homepage (8 of 8), PDP hero | Current Clarté hero matches; protect the calm. |
| **Bestsellers first; new arrivals later** | Homepage products strip, Shop default sort | Default sort to be added to `/products` (Featured / Bestseller equivalent). |
| **Multi-axis browse (Concern + Type + Ingredient)** | Shop, Header mega-menu, PDP cross-sell | Header axis = Ingredients (live as placeholder); add Concern + Type to `/products` chips. |
| **Eyebrow + Heading + Lede triplet on section heads** | Homepage, About, Cart, Order tracker | Already a recurring pattern in the migrated codebase; consolidate into a shared `<SectionHead>` helper. |
| **No confetti / Lottie / animation for "celebration" moments** | Thank-you (all 8), Cart (8 of 8) | Confirms Clarté shouldn't add it. Calm reassurance only. |

---

## 3. The do-not-lift list (cross-page anti-patterns)

These are patterns that appear in 3+ docs and would actively harm Clarté if copied. Cross-referenced against memory:

| Anti-pattern | Where it appears | Why wrong for Clarté |
|---|---|---|
| **"$X away from free shipping" progress bar** | Cart (6 of 8 brands), Checkout, Thank-you | Per `feedback_unverified_claims`: flat Rs. 250, no threshold. The single most-resisted pattern. |
| **BNPL noise (Klarna · Afterpay · Shop Pay Installments · Zip · Affirm)** | Cart, Checkout, PDP | None of these payment rails exist in PK. Even disabled "coming soon" placeholders fragment the COD message. |
| **Subscribe & Save default-on toggle / auto-replenish radio** | PDP (Bader · Glossier), Cart | Clarté has no subscription infrastructure and protocols are 12-week courses, not continuous. Don't show. |
| **"Pay now" submit-button copy** | Checkout (Shopify default everywhere) | Wrong verb for COD. Use "Place Order — Rs. {total}". |
| **"Card is encrypted" / SSL trust badges** | Checkout (Glossier · Allbirds · Sephora) | Nothing is being charged. The COD reassurance copy IS the trust signal. Don't dilute. |
| **Forced account creation / aggressive sign-in push (Apple antipattern)** | Checkout, Thank-you | 54% of sites get this wrong per Baymard. Clarté is guest-only — keep. |
| **Confetti / Lottie celebrations on thank-you / cart unlock** | Thank-you | None of the premium-skincare references use them. Juvenile against the clinical voice. |
| **Scarcity countdown timers / "only 2 left"** | Cart, Homepage promo | Conflicts with clinical credibility. Date-based "Sale ends May 26" only, no seconds-tick. |
| **Strike-through `was $X / now $Y` pricing on cards** | Shop, PDP | Clarté has fixed PKR prices and no discount strategy. Faking strike-throughs violates `feedback_unverified_claims`. |
| **Quick Look / Quick Add modal on PLP** | Shop (Sephora · COSRX) | Skips the PDP, which is Clarté's primary trust surface. The lightweight `Add` button on the card is enough. |
| **"Compare up to 4 products" selector** | Shop (Drunk Elephant) | Pull-the-customer-toward-comparison mental model. Wrong for protocol-led routing — Clarté wants people picking *a protocol*, not pitting two serums against each other. |
| **Founder-as-face / named-doctor headshot** | Homepage (Bader · Tatcha · Topicals), PDP (Drunk Elephant founder-note signed by name), Thank-you (named welcome) | Per `feedback_anonymize_doctor` — never name Dr. Tauqir Ahmad. Use "our GMC-registered doctor" or "the Clarté medical team". |
| **Free-text "notes" field at cart (Lush pattern)** | Cart | Conversion-positive but operationally fuzzy for a COD market. Don't lift. |
| **Multi-currency selector at checkout** | Checkout (Bader · Sephora · Tatcha global) | Pakistan-first means PKR-only display. Cognitive cost of "is this PKR or USD?" is real. |
| **Auto-add free gift at threshold (luxury pattern)** | Cart (Bader · Glossier) | For COD-on-arrival, an unrequested gift at the door looks like a scam. Use opt-in `Add` tile (BoJ pattern) instead. |
| **Premature on-page cross-sell at thank-you** | Thank-you (Baymard #1 best practice but also flagged in our context) | Pushing a fourth product right after a 3-product protocol purchase undermines the clinical positioning. Defer cross-sell to WhatsApp follow-up or post-delivery email. |
| **Referral discount programs ("give $10, get $10")** | Thank-you (Brooklinen), Cart | Operationally not ready (no points/credit infrastructure) and the COD-only constraint makes "give a friend Rs. X off" risky against fraud. Revisit when prepaid payments come online. |
| **Hot-pink / magenta / red brand accents lifted from references** | Homepage (Glossier · Charlotte Tilbury), Cart | Conflicts with navy + cobalt + off-white identity. |

---

## 4. Quick scope: how much of this is shippable?

Rough effort estimate. None of this requires backend changes except item #2.

| Move | Effort | Blockers |
|---|---|---|
| #1 Cart drawer + opt-in sample tile | ~3h | Need 1–2 sample SKUs operationally |
| #2 `/order` mode-aware thank-you band | ~1h | Tiny payload extension (`est_delivery_window` field nice-to-have but optional) |
| #3 CheckoutForm 3-step + COD-as-express + price-in-button | ~1.5h | None |
| #4 Triple-axis chip filter + merge `/products` grids | ~2h | Need shadcn `ToggleGroup` install |
| #5 Homepage trust-receipt band | ~30 min once panel data exists | **Blocked on real n=30 panel** |
| #6 PDP step-duration + protocol cross-sell + price-in-CTA + "Best for" | ~2h | Need `bestFor` strings written into `PRODUCT_CONTENT` |
| #7 Sticky promo bar | ~30 min | None |
| #8 ProductCard image-swap + Add inline (Add inline already shipped) | ~30 min | None |
| #9 WhatsApp concierge on cart + thank-you | ~15 min | None |
| #10 Numbered carousel paging on products strip | ~30 min | None |

**Total ~12 hours of build work**, give or take, for the entire shortlist. The cart drawer (#1) and the chip filters (#4) are the two biggest items; everything else is sub-2-hour polish.

---

## 5. Provenance + caveats

- 6 agents ran in parallel on 2026-05-23, each focused on one page type across 8 brands.
- **Cart, checkout, thank-you have the lowest source fidelity** — they require add-to-cart or completed-purchase to reach, so sourcing leans heavily on Baymard reports, Shopify Plus case studies, agency teardowns. Per-page docs flag every indirect source.
- **PDP and Homepage have the highest source fidelity** — most homepages and PDPs are directly fetchable.
- **The shortlist is filtered against memory:** every recommendation respects `feedback_unverified_claims`, `feedback_anonymize_doctor`, `feedback_cod_policy`. No pattern that violates these is recommended.
- **The 2026-05-23 sub-project #7 acceptance report** (`docs/runbooks/2026-05-23-design-system-phase2-acceptance.md`) listed several deferred items; this research informs and prioritizes the same backlog. Where the two docs agree, this one is the more concrete actionable.

Read order recommendation: skim this summary → read `04-cart.md` and `06-thank-you.md` first (they're the biggest gaps in current product) → then `03-pdp.md` and `02-shop.md` for the next chunk of work.
