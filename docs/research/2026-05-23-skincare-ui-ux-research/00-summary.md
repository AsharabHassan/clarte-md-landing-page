# Skincare UI/UX Research — Summary

**Date:** 2026-05-23
**Brands covered:** 16 across 4 segments
**Purpose:** Ground Clarté MD's design-system overhaul (sub-project #7) in real evidence from the world's best dermatologist-led, protocol-based, and craft-driven skincare sites.

## How to read this doc

Three sections:

1. **Brand-fit ranking** — which brands are closest to Clarté's positioning and why.
2. **Cross-cutting patterns** — moves that appeared in 3+ brands; these are the "validated by evidence" patterns worth adopting.
3. **The Clarté shortlist** — patterns mapped to specific Clarté pages and components, ordered by ROI for Phase 0 (tokens) and Phase 2 (page-by-page migration).

Per-brand teardowns are in `./brands/*.md`. Read the top-3 tier-1 brands first if time-pressed: Dr. Jart+, Augustinus Bader, Tatcha.

---

## 1. Brand-fit ranking

Brands ranked by how directly their UI/UX patterns translate to Clarté MD's positioning (dermatologist-led, navy + cobalt + Fraunces + Plus Jakarta + JetBrains Mono, AI before/after, Pakistan COD-only, Rs. 4,799–7,999 protocols).

### Tier 1 — Direct system reference

These four are the closest analogues. If you only adopt patterns from these, you'll already be at the segment frontier.

| Brand | What it gets right for Clarté | File |
|---|---|---|
| **Dr. Jart+** | "Doctor Joins Art" = clinical with warmth; protocol-anchored secondary colors (Cicapair-mint, Ceramidin-warm); consumer-agreement % trust format; doctor named on About only | [`brands/15-dr-jart.md`](brands/15-dr-jart.md) |
| **Augustinus Bader** | Single proprietary acronym (TFC8) reused everywhere; italic descriptive line + percentage stack; cream surface (~#F6F1EB); restraint as luxury without going inaccessible | [`brands/09-augustinus-bader.md`](brands/09-augustinus-bader.md) |
| **Tatcha** | Italic serif product names + clinical line two-track copy; warm cream surface; "Suggested Ritual" cross-sell as routine completion; sample-size disclosure on every claim | [`brands/11-tatcha.md`](brands/11-tatcha.md) |
| **La Roche-Posay** | Hydra design system (publicly documented); 60/30/10 + brand-color ≠ CTA-color split; MyRoutine AI 3-step flow with disclosure page — direct blueprint for Clarté's AI feature | [`brands/03-la-roche-posay.md`](brands/03-la-roche-posay.md) |

### Tier 2 — Closest business-model fit

| Brand | Why study | File |
|---|---|---|
| **Curology** | Quiz → photo → personalized routine; "Proof over promises" headline DNA; provider quote bubbles next to ingredient % | [`brands/05-curology.md`](brands/05-curology.md) |
| **Apostrophe** | Mint-as-accent discipline (translate to cobalt-as-accent); treatment-page-as-PDP; "earnest and playful, empathic" voice | [`brands/06-apostrophe.md`](brands/06-apostrophe.md) |
| **Hims/Hers** | 5-question soft-gate quiz; "Add routine to cart" single-CTA multi-product; slide-in nav drawer; timeline-bar checkout | [`brands/07-hims-hers.md`](brands/07-hims-hers.md) |

### Tier 3 — Positioning rhyme (clinical authority)

| Brand | Why study | File |
|---|---|---|
| **SkinCeuticals** | "Find a clinic" CTA in primary nav; quantified-claim hero pattern; "Skincare Advice" editorial sub-site for E-E-A-T | [`brands/01-skinceuticals.md`](brands/01-skinceuticals.md) |
| **Paula's Choice** | Top-nav "Ingredients" as first-class destination; Skin Type icon row on PDP; free-sample picker in cart drawer | [`brands/02-paulas-choice.md`](brands/02-paulas-choice.md) |
| **EltaMD** | Three-axis Shop By facets (Concern / Type / Ingredient); trust-badge icon row on PDP; "In the Media" award wall | [`brands/04-eltamd.md`](brands/04-eltamd.md) |
| **Proven** | "How our AI decides" page as trust surface; specificity-at-scale numbers; quiz segmentation by routine depth | [`brands/08-proven.md`](brands/08-proven.md) |

### Tier 4 — Selective techniques

| Brand | What to lift; what to skip | File |
|---|---|---|
| **Drunk Elephant** | Lift: named "what's out" list (Suspicious 6), bundle-as-peer-SKU, founder note as signature. Skip: Memphis color blocking, irreverent voice | [`brands/10-drunk-elephant.md`](brands/10-drunk-elephant.md) |
| **COSRX** | Lift: percentage-in-product-name ("Niacinamide 10"), credential-pill stack on PDP, "Always Authentic" verification page (huge for PK counterfeit fear). Skip: emoji-prefix promos, 5-badge clutter | [`brands/16-cosrx.md`](brands/16-cosrx.md) |
| **Beauty of Joseon** | Lift: "By Ingredient" as third nav axis, illustrated botanical icons, sample-as-opt-in-gift in cart. Skip: heritage positioning, multi-tier loyalty | [`brands/14-beauty-of-joseon.md`](brands/14-beauty-of-joseon.md) |
| **Sulwhasoo** | Lift: lineage-based nav, native-script as ornament (for future Urdu), withholding the accent. Skip: $200+ price posture, free-sample selection at scale | [`brands/13-sulwhasoo.md`](brands/13-sulwhasoo.md) |

### Tier 5 — Tone reference only

| Brand | What to lift; what to skip | File |
|---|---|---|
| **Topicals** | Lift: condition-positive language on protocol pages ("Acne isn't a failure. It's a protocol."), inclusive imagery showing the actual concern. Skip: hot-pink, Gen-Z voice, scarcity callouts, founder-on-homepage | [`brands/12-topicals.md`](brands/12-topicals.md) |

---

## 2. Cross-cutting patterns

Patterns observed in 3+ brands. The frequency is the validation — these are not opinions, they're industry-tested moves.

### 2.1 Trust & credibility

**Quantified-claim trust line** — universal. The format that recurs is:
> *X% of N agreed/showed Y after Z weeks (methodology)*

Variants:
- SkinCeuticals: "36% reduction in wrinkles, n=50, ages 40-60, 16-week study"
- Augustinus Bader: "37% / 54% / 92%" three-up percentages
- Tatcha: "100% / 88% of 36 panelists (clinical), 30 (bio-instrumentation)"
- Drunk Elephant: "96% / 93% / 90% of 31 people after 8 weeks"
- Dr. Jart+: "98% agree skin feels smooth (4 weeks)"
- COSRX: "+196.17% / +35% / -80%, Dermacosmetic Skin Science Lab Korea, 20 participants, 5/26-6/10"
- Curology: "89% effective / 5.5M+ treated / 5K+ five-star"
- Proven: "47 factors / 20,200 ingredients / 4,000 journals"

**Why this matters for Clarté:** A 30-person self-report panel in Pakistan, reported as "X% of 30 panelists noted Y after 8 weeks" is legally clean (consumer-agreement survey, not clinical trial), operationally cheap, and reads as clinical. Per `feedback_unverified_claims` — do not invent percentages, but **do** plan to run a small panel and surface the result with methodology.

**Doctor named on About only, never on PDP/hero** — Dr. Jart+, Augustinus Bader (sub-fold only), Drunk Elephant (sub-fold signed note). This is **industry-standard**, not a Clarté quirk. Validates `feedback_anonymize_doctor` at the level of "what prestige brands actually do".

**Single signature concept as the brand spine** — TFC8 (Bader), Hadasei-3™ + Tatcha Institute (Tatcha), Skin Genome (Proven), Suspicious 6 (Drunk Elephant), Hydra (LRP), Cicapair lineage (Dr. Jart+). Each brand picks one repeating named asset and reuses it on every page. Becomes a design-system anchor.

### 2.2 Typography

**Italic descriptive line + clinical mono/sans line two-track copy** — Augustinus Bader, Tatcha, Drunk Elephant, Sulwhasoo (collection names). Maps directly to Clarté's Fraunces italic + JetBrains Mono setup.

**All-caps mono/sans eyebrow above headlines** — universal. Augustinus Bader ("THE EVIDENCE IS IN"), SkinCeuticals, Tatcha, Proven, Sulwhasoo, Dr. Jart+, COSRX. Confirms JetBrains Mono eyebrow as the right direction.

**Serif = brand, sans = utility split** — Sulwhasoo's explicit rule; Tatcha and Augustinus Bader both follow it implicitly. Translates: Fraunces on lineage names, hero headlines, product names. Plus Jakarta sans for nav utilities, body copy, prices.

### 2.3 Surface & color

**Cream / warm off-white surfaces over pure white** — Augustinus Bader (~#F6F1EB), Tatcha (~#F5EFE6), Sulwhasoo (~#F8F4EC), Beauty of Joseon. Single biggest "warmth" move available in Phase 0 token work.

**Brand color ≠ CTA color** — La Roche-Posay's Hydra makes this explicit: brand color is identity, near-black is functional CTA, brand color used only on 10% of surfaces. Sulwhasoo follows the same rule (amber wordmark + black CTAs). Apostrophe (mint + neutrals). This is the single most actionable color insight in the segment.

**Protocol/lineage-anchored secondary colors** — Dr. Jart+ (Cicapair-mint, Ceramidin-warm), Sulwhasoo (lineage-led nav), Drunk Elephant (per-SKU packaging color). Cleanest brand-craft move for Clarté's four protocols.

### 2.4 Navigation & IA

**Triple-axis nav (Concern / Type / Ingredient)** — EltaMD, Paula's Choice, Beauty of Joseon, COSRX, Tatcha. The **Ingredient axis** is the consistent third leg. Clarté currently has Concern (the 4 protocols) and implicit Type (products page). Ingredient is the missing axis — drives long-tail SEO and matches rising PK ingredient literacy.

**Concern-first IA** — Apostrophe, Curology, Hims/Hers, SkinCeuticals, Sulwhasoo. The "by concern" entry beats "by SKU type" in every site studied. Clarté already does this with protocols — keep doing it.

### 2.5 Funnel

**Quiz-result → cart-preview with one multi-product CTA** — Curology, Hims/Hers, Proven, Apostrophe (partial), Paula's Choice. Result page IS the cart preview; single "Add routine to cart" button preloads 2–3 SKUs. **Highest-leverage funnel improvement available for Clarté's `/quiz`.**

**Soft-gate vs hard-gate quiz** — Hers uses 5 questions (soft gate, conversion-optimized); Curology gates harder via Rx review (trust-optimized). Clarté's AI photo upload is currently a hard gate. Worth A/B testing a soft path that defers the photo to the result step.

**Cross-funnel quiz CTA inside PDP** — EltaMD's "Not sure if this is for you?" link to the quiz on every PDP. Steals the undecided buyer instead of losing them.

### 2.6 PDP composition

**Trust-pill row directly under price** — EltaMD (7 icons), Paula's Choice (Skin Type icons), Tatcha (small-caps badges chain), COSRX (credential pills). Single horizontal row, 4–6 single-word pills, no paragraph. Universal pattern.

**Inline aggregate rating + review count on the buy box** — SkinCeuticals, Drunk Elephant, EltaMD, Beauty of Joseon (also on cards). Moves reviews from below-fold tab to buy-box altitude.

**Bundle / kit as a peer SKU** — Drunk Elephant (Smoothie Kit with `Add All to Bag`), Tatcha (Suggested Ritual 3-up), COSRX (Glass Skin Routine + 20% bundle CTA), Curology (3-product custom system). Clarté's protocol bundles already exist as peer SKUs — make the bundle card appear as a cross-sell on every individual-product PDP.

**4–8 strong images per PDP, not 17** — Augustinus Bader, Tatcha, Drunk Elephant land 4–10. EltaMD's 17 is an outlier driven by award-badge slides. Intent (bottle, texture, ingredient, before/after, in-context) matters more than count.

### 2.7 Cart & checkout

**Sample-as-free-gift in cart drawer (opt-in)** — Paula's Choice, Beauty of Joseon. Customer self-selects from 2–3 sample tiles. Operationally feasible at modest cost (one sample SKU per protocol), and gives a reason to introduce a second protocol pre-purchase.

**Payment-method trust badges visible** — COSRX surfaces Apple Pay/Google Pay/Klarna icons in cart and footer. The Clarté analog is **"Cash on Delivery — Pay courier on arrival"** treated as a *trust badge*, not as a payment-method afterthought. Per `feedback_cod_policy`, never lift "open before paying" language — but COD as a trust signal needs more visual weight than it currently has.

### 2.8 Voice

**"Earnest and playful, empathic"** — Apostrophe's published voice. Tatcha lands in the same register. Drunk Elephant is too irreverent for Clarté; Hims/Hers ("witty, quippy") is wrong; Topicals (Gen-Z meme) is wrong. Apostrophe is the closest voice reference.

**Condition-positive framing** — Topicals' opening register ("we formulate from 6 to 1," "skincare shouldn't feel like a part-time job") is the right antidote to clinical-cold protocol copy. Borrow the validation without the slang.

---

## 3. The Clarté shortlist

Patterns mapped to specific Clarté pages and components, ordered by ROI. **Phase 0** = theme tokens / cn() helpers / globals.css. **Phase 1** = themed components. **Phase 2** = page-by-page migration.

### Phase 0 (theme tokens) — do these first; they cascade to everything else

1. **Surface token → warm off-white, not pure white.** Set `--background` to a warm off-white in the range `#F6F1EB` – `#F8F4EC` (Bader / Tatcha / Sulwhasoo all land here). Single biggest "warmth" lever. → `app/globals.css`
2. **Define `--cta` separately from `--brand`.** Brand = cobalt (used only on wordmark, key trust badges, eyebrow accents — 10% of surfaces). CTA = near-black or deep navy (used on primary buttons site-wide). Pass all current cobalt CTAs through a WCAG AA contrast check before Phase 0 ships — this is exactly the audit that forced LRP's Hydra rewrite. → `app/globals.css`
3. **Audit blues.** Hydra's cautionary tale: 15+ grey shades and 5 blues in production. Before writing the Tailwind v4 `@theme`, grep every blue/navy/cobalt hex in `app/globals.css` + any inline styles. One navy, one cobalt, one accent-cobalt for hover. Stop. → `app/globals.css` + per-page CSS
4. **Add 4 protocol-accent tokens.** `--protocol-acne-accent`, `--protocol-eventone-accent`, `--protocol-renewal-accent`, `--protocol-barrier-accent`. Suggested directions: warm-clay / rose-clay / lavender-mist / sage-mist (Dr. Jart+ Cicapair-green / Ceramidin-warm pattern). Used only on that protocol's page header, the protocol badge on PDPs, and the protocol's secondary trust strip — never override navy/cobalt brand chrome. → `app/globals.css`
5. **1312px max-width container.** Per LRP Hydra spec — tested derm-segment desktop width. → wrap in a `<Container>` component with `max-w-[82rem]`
6. **Type-scale rule: serif = brand, sans = utility.** Formalize as a Tailwind plugin or CSS variable mapping. Fraunces on lineage names + hero H1s + product names (italicized); Plus Jakarta on body + nav utilities + prices; JetBrains Mono on eyebrows only (max 4–5 words, ALL-CAPS, `tracking-[0.18em]`). No all-caps body copy anywhere. → `app/globals.css` + Tailwind `@theme`

### Phase 1 (themed components)

7. **`<Eyebrow>` component** — `tracking-[0.18em] uppercase text-xs` in JetBrains Mono. Used above every hero H1 and major section header. → new `components/Eyebrow.tsx`
8. **`<TrustPills>` component** — horizontal row of 3–5 single-word pills under PDP buy box. Pills must be backable claims only (per `feedback_unverified_claims`): "Dermatologist-formulated," "Non-comedogenic," "Fragrance-free," "Sensitive-skin-safe," "Made in Pakistan." → new `components/TrustPills.tsx`
9. **`<ProductTitle>` component** — Fraunces italic for product name, Plus Jakarta sans descriptor below. Tatcha pattern. Replaces all current PDP H1s. → new `components/ProductTitle.tsx`
10. **`<ClinicalProof>` component** — 3-up percentage block with bold-weight numbers in Fraunces display sizing, JetBrains Mono attribution line below (`{N=X, Y weeks, methodology}`). Bader / Tatcha / Dr. Jart+ / COSRX all use this exact composition. Until Clarté has data, render a "Coming after first 30-customer panel — Week 8 results expected {date}" placeholder. → new `components/ClinicalProof.tsx`
11. **`<ProtocolExplainer>` component** — the Clarté equivalent of TFC8. Pick one signature concept ("The Clarté Protocol," "The 4-Pillar Protocol," etc.) and ship the same explainer module on every PDP + protocol page. → new `components/ProtocolExplainer.tsx`

### Phase 2 (page-by-page migration) — ordered by Faisal's existing plan with research-driven adjustments

12. **Header / nav** — add a third axis. Current: Shop / Quiz / About. Target: **Protocols** (4 protocol landing pages) / **Products** (by type) / **Ingredients** (new — niacinamide / azelaic / retinaldehyde / tranexamic / hyaluronic / ceramides / etc.) / **Quiz** / **About**. Triple-axis matches EltaMD/Paula's Choice/BoJ/COSRX. → `components/Header.tsx` + new `app/ingredients/` route
13. **Footer** — add a small "Stocked at" / "Clinics that recommend Clarté" block (once that's true — SkinCeuticals / EltaMD physician-locator pattern). Until then, a "Made in Lahore, formulated by our GMC-registered doctor" line in JetBrains Mono. → `components/Footer.tsx`
14. **Contact / Legal** — no research changes; standard migration.
15. **About** — restructure as a three-pillar narrative (SkinCeuticals "Prevent / Correct / Protect" model). Three columns, each one verb + one paragraph + one protocol link. Map to "Clear / Even / Renew / Strengthen" or similar verb-led naming. Founding doctor's role described as "our GMC-registered medical lead" — never named, never photographed. → `app/about/page.tsx`
16. **PDP — `app/products/[sku]/page.tsx`** — biggest single page to migrate. Order from research consensus:
    - `<ProductTitle>` (italic Fraunces name + sans descriptor)
    - Image gallery (4–8 images; reduce from current count if exceeds 8)
    - Buy box: price → variant chips (if applicable) → `<TrustPills>` row → primary CTA → secondary "Add full protocol" CTA (cross-sell to the bundle)
    - `<ClinicalProof>` 3-up (placeholder until panel data exists)
    - Key Ingredients block (each ingredient links to `/ingredients/[slug]`)
    - `<ProtocolExplainer>` (the named signature concept)
    - "How to use" with mini-troubleshooting Q&A (EltaMD pattern: "What if my skin tingles? Can I use with my existing cleanser? Pregnancy-safe?")
    - "Complete the Protocol" cross-sell card (single combined price + "Add Protocol to Cart" — Drunk Elephant Smoothie Kit pattern)
    - Reviews (server-rendered, not cookie-gated — EltaMD pitfall to avoid)
    - Press / Awards row (when applicable)
    - Signed paragraph from "the Clarté medical team" sub-fold (Drunk Elephant founder-note treatment, anonymized)
17. **Products listing — `app/products/page.tsx`** — add 4 concern tiles at top routing to protocol pages (Hims/Hers pattern), with flat SKU grid below. Add inline star rating + count to `<ProductCard>` once review volume hits 10+ per SKU (BoJ pattern). → `app/products/page.tsx` + `components/ProductCard.tsx`
18. **Cart — `app/cart/page.tsx`** — add an opt-in "free sample with your order" tile (Paula's Choice / BoJ pattern) once Clarté has 1ml sample SKUs. Promote COD as a *trust badge* with visual weight ("Pay courier on arrival — no online payment needed"). Do NOT introduce free-shipping-threshold copy. → `app/cart/page.tsx`
19. **Checkout — `app/checkout/page.tsx`** — add a 3-step timeline indicator across the top (Hims/Hers pattern): "Details · Address · Confirm". Trust copy near submit ("Your courier will collect Rs. X on delivery — no advance payment required"). → `app/checkout/page.tsx`
20. **Protocol pages — `/acne`, `/even-tone`, `/renewal`, `/barrier`** — restructure as Apostrophe-style "treatment landings" (Apostrophe pattern):
    - Hero with concern + outcome (italic Fraunces descriptive line + JetBrains Mono eyebrow)
    - 3-step "how this protocol works"
    - `<ClinicalProof>` 3-up
    - AI before/after render (when ready) with required disclosure link (LRP MyRoutine AI Notice pattern — mandatory for PK PDP-Bill compliance)
    - Ingredient examples (each links to `/ingredients/[slug]`)
    - Single primary CTA → `/quiz` (not "add to cart")
    - Each protocol page anchored to its `--protocol-*-accent` token
    - Condition-positive opening (Topicals tone, not slang)
21. **Homepage — `app/page.tsx`** — last and most ornate. Hero with quantified-claim subline (Curology "Proof over promises" DNA, but using only real numbers Clarté can substantiate). Four protocol tiles below hero. Stat-chip strip ("4 protocols · GMC-registered formulator · 30-second skin analysis · Made in Lahore"). "Skin Heroes"–style charitable / mission band above footer (LRP pattern, adapted to PK).
22. **Admin** — out of research scope; standard migration.

### New routes to create (research-driven)

- **`/ingredients`** — index of 12–20 active ingredients (niacinamide, retinaldehyde, azelaic acid, salicylic acid, hyaluronic acid, ceramides, tranexamic acid, kojic acid, vitamin C, glycolic, lactic, panthenol, centella, peptides…). Each entry one paragraph + linked products. Defends "dermatologist-led" against Sephora-style brand noise. (Paula's Choice + BoJ + COSRX consensus.)
- **`/ingredients/[slug]`** — per-ingredient detail. One illustrated icon (BoJ desktop pattern), one paragraph from "our medical team," 2-3 linked SKUs that contain it.
- **`/genuine`** — counterfeit-verification page (COSRX Always Authentic pattern). PK-specific conversion blocker; visual badge near every PDP buy box.
- **`/skin-analysis-notice`** — mandatory AI disclosure page when the AI feature ships (LRP MyRoutine AI Notice template; also covers upcoming PK PDP Bill 2023 PII requirements).
- **`/legal/skin-analysis-notice`** — alternative location under the existing legal tree, if preferred.

---

## 4. Don't-lift list (anti-patterns)

Patterns that recur across multiple brands but actively conflict with Clarté's positioning. Cross-reference with [[feedback_unverified_claims]], [[feedback_anonymize_doctor]], [[feedback_cod_policy]].

| Anti-pattern | Brands that use it | Why wrong for Clarté |
|---|---|---|
| Named-dermatologist + photo on hero | Curology, Apostrophe, Hims/Hers, Topicals, Bader, LRP Skin Heroes | Anonymized doctor policy. Industry-standard prestige brands keep the name to About only or omit entirely. |
| Free-shipping threshold messaging | Drunk Elephant, COSRX, Beauty of Joseon, Dr. Jart+, EltaMD | Clarté is flat Rs. 250 always. |
| Subscription-default pricing | Bader, Curology, Hims/Hers, Proven, Topicals, Drunk Elephant | Clarté is COD single-purchase. PK payment rails don't support recurring billing. |
| "Open before paying" / refund-guarantee copy | (various) | Per `feedback_cod_policy` — pay-on-arrival only, no parcel-opening promise. |
| ISO 22716 / GMP / 2x-refund / "clinically proven" without N or methodology | EltaMD (badges), Sulwhasoo (claims), Bader (some) | Per `feedback_unverified_claims` — none of these are backable today. Always pair "%" with N + duration + methodology. |
| Founder personality as the brand voice | Drunk Elephant (Tiffany), Topicals (Olamide), Paula's Choice (Paula), Bader (Professor) | Clarté voice is "medical team", not a single named person. |
| Heritage / folklore positioning | Tatcha (Japanese), Sulwhasoo (Korean), Beauty of Joseon (Hanbang) | PK analog would be Yunani / sub-continental herbal, which actively undermines a derm-led brand. |
| Lowercase wordmark / display | Hims, Hers, Apostrophe | Conflicts with Fraunces serif Title Case identity. |
| Emoji-prefix promo headlines | COSRX, Drunk Elephant ("Free shipping (and free good mood!)") | Drugstore aesthetic; conflicts with clinical voice. |
| Five-badge clutter per product card | COSRX | Limit to 1–2 per card. |
| Discount countdown timer with seconds-tick | Beauty of Joseon, Drunk Elephant (during sales) | Low-trust feel; use date-based "Sale ends May 26" instead. |
| Gen-Z meme voice | Topicals | Wrong register for PK derm market. |
| Hot-pink / magenta / red brand accents | Topicals, Paula's Choice, EltaMD | Conflicts with navy + cobalt + off-white identity. |
| Self-graded rating system | Paula's Choice (Beautypedia) | Reads biased. Ingredient *glossary* yes, brand-graded rating no. |
| Geographic-mythology brand spine | Tatcha (Okinawa algae), Sulwhasoo (snow-flower water) | Clarté's edge is clinical + AI + PK accessibility, not regional mythology. |
| 5-question quiz with no photo step | Hers | Soft gate, but Clarté's AI before/after is the differentiator — don't drop the photo, offer it as the *commitment* step (Curology pattern). |
| Loyalty / membership / GWP threshold | Bader, Sulwhasoo, Beauty of Joseon | Ops infeasibility on COD-only flow. |

---

## 5. Recommended next action

Pick one of:

- **A. Start Phase 0 with items 1–6 above.** Highest ROI. Cascades to every page. Two-day effort to audit hexes, write the Tailwind v4 `@theme`, and validate WCAG contrast.
- **B. Scope a single-page POC first.** Pick the PDP (item 16) — it has the most pattern density and best demonstrates whether the system holds together. One-week effort, builds 3–4 new components in the process (`<ProductTitle>`, `<TrustPills>`, `<ClinicalProof>`, `<ProtocolExplainer>`).
- **C. Read the four Tier-1 teardowns** before deciding ([Dr. Jart+](brands/15-dr-jart.md), [Augustinus Bader](brands/09-augustinus-bader.md), [Tatcha](brands/11-tatcha.md), [La Roche-Posay](brands/03-la-roche-posay.md)) — 30-minute read total. The Hydra design system article linked from the LRP teardown is the single most useful 20-minute read in the bundle.

My recommendation is **C then A**: read the four Tier-1 teardowns, then start Phase 0 items 1–6. The token work is small, reversible, and unlocks everything downstream.

---

## Provenance & caveats

- 4 research agents (one per segment) ran in parallel on 2026-05-23.
- WebFetch was blocked (403 Cloudflare/WAF) on most prestige sites: SkinCeuticals, Paula's Choice, La Roche-Posay, Dr. Jart+, Hims/Hers all required falling back to WebSearch + third-party teardowns + agency case studies + retailer mirror screenshots. Where a UI claim couldn't be directly verified, the source teardown flags it.
- Apostrophe was shut down March 2025; the brand-system reference is the Character SF agency case study, which is arguably *more* useful than a live site teardown.
- EltaMD, Drunk Elephant, Tatcha, COSRX, Beauty of Joseon were the only fully-fetchable brands — they carry the most ground-truth detail.
- The "what to copy" recommendations are filtered against Clarté's memory files: `feedback_unverified_claims`, `feedback_anonymize_doctor`, `feedback_cod_policy`. No pattern that violates these is recommended, even if the source brand uses it.
- This research informs Phase 0 (theme tokens) and Phase 2 (page migration) of sub-project #7. It does NOT replace user testing, conversion data, or Faisal's brand judgment.
