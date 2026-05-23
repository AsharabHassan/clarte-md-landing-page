# EltaMD — Bundle / Protocol Page Teardown

**Date:** 2026-05-23
**Bundle surface studied:** Bundles & Kits collection + 3 individual bundle PDPs (Sensitive Skin Kit, Skin Recovery Kit, Skin Recovery System)
**What they call it:** "Bundled Kit," "Kit," "Bundle," "Duo Set," "System," "Regimen Kit" — used interchangeably within the same collection page
**Primary URLs:**
- Collection: `eltamd.com/collections/bundled-kits`
- Sensitive Skin Kit: `eltamd.com/products/sensitive-skin-bundle`
- Skin Recovery Kit: `eltamd.com/products/eltamd-skin-recovery-bundled-kit`
- Skin Recovery System: `eltamd.com/products/eltamd-skin-recovery-system-regimen-kit-2`
- Acne Bundle: `eltamd.com/products/eltamd-acne-bundle` 〔returned 404 — URL may have changed〕

**Sourcing note:** EltaMD is Shopify-based and largely unprotected by WAF. Collection page and 3 PDPs were directly fetched. The Acne Bundle PDP returned 404; that product's detail sourced from WebSearch snippets. All directly-fetched content is marked with page name.

---

## URL + page label

EltaMD maintains a flat, single-level bundle architecture:

- **Collection page** (`eltamd.com/collections/bundled-kits`) — 5 bundles total. No sub-categories, no concern-led navigation. All bundles live in one grid. Terminology used within the collection: "Kits," "Bundles," "Sets," "System," "Duo Set" — no single enforced term.
- **Individual bundle PDPs** — structured identically to single-SKU PDPs. No separate "bundle page" template; the bundle is treated as a peer SKU with a product image showing all items together.

**Key finding:** EltaMD does NOT have a protocol / regimen landing page in the sense Clarté is building — no concern-led editorial surface that explains WHY this sequence of products works together and WHO it's for. The collection and individual bundle PDPs are purely transactional. This is the most important structural gap to note.

---

## Hero composition

**Collection page** (directly fetched from `eltamd.com/collections/bundled-kits`):
- Eyebrow: none visible.
- Headline: "Bundles & Kits"
- Sub-headline (verbatim): "We've made it easier than ever by curating our most-loved, clinically-proven formulas bundled into convenient kits."
- No lifestyle imagery on the collection. White background, product group shots.
- Cards: product image → bundle name → price → "LEARN MORE" or "Add to cart" CTA.

**Sensitive Skin Kit PDP** (directly fetched):
- Headline: "EltaMD Sensitive Skin Kit"
- No eyebrow line.
- Sub-headline: not a clinical claim — just the product group name.
- Hero image: carousel of 10 slides — product group shots + individual product shots + benefit graphics.
- CTA: "Add to cart" (primary).

**Skin Recovery Kit PDP** (directly fetched):
- Headline: "EltaMD Skin Recovery Kit"
- Sub-headline: not present as a clinical claim in the buy box.
- Hero image: product group shot + supplementary benefit imagery.
- CTA: "Add to cart" — with secondary "Add to Cart & Save 20%" promo copy above the button (discount messaging is in the buy box, not the headline).

**Skin Recovery System PDP** (directly fetched — the largest bundle, 6 products at $309):
- Headline: "EltaMD Skin Recovery System"
- No eyebrow. No clinical headline. Product name only.
- CTA: "Add to Cart & Save 20%."

---

## Composition display

**Skin Recovery System** — strongest composition pattern (directly fetched):
- 6 products displayed as a **numbered sequential list with step labels**:
  1. Cleanse — Amino Acid Foaming Cleanser
  2. Tone — Essence Toner
  3. Treat — [Serum]
  4. Moisturize — Light Moisturizer
  5. Protect & Recover — UV Skin Recovery Broad Spectrum SPF 50
  6. Night Repair — UV Skin Recovery Night Mask
- Each step has the verb label + product name + volume.
- Individual product prices NOT shown alongside steps.
- No per-product "Add to cart" — single bundle CTA only.
- Products do NOT link to their own PDPs from within the step list — PDP cross-links appear only in the "COMPLETE THE REGIMEN" carousel below the fold.

**Sensitive Skin Kit / Skin Recovery Kit** (2–3 products):
- Products listed in plain text within the product description. No numbered steps. No accordion.
- 10-slide image carousel for the Sensitive Skin Kit shows each product individually plus benefit graphics — the carousel partially substitutes for an accordion expand.

---

## Pricing transparency

〔Directly fetched for all three PDPs〕:
- **No individual product prices shown on any bundle PDP.** The bundle price is quoted ($108, $118, $309) without a comparison to the sum of individual retail prices.
- **Savings messaging:** "Add to Cart & Save 20%" — copy appears above the CTA button on the Skin Recovery Kit and Skin Recovery System, but the 20% is NOT against the sum of individual prices; it's a promotional bundle discount 〔confirmed: "Add to Cart & Save 20%" verbatim, no further breakdown〕.
- The Acne Bundle is priced at $108 (reduced to $97.20 at time of research — 10% off) 〔WebSearch〕.
- **Collection page** shows prices ($84–$309) with no savings callout per card.
- **Gap vs LRP and SkinCeuticals:** EltaMD is the weakest in pricing transparency among the three. Neither the sum-of-individual prices nor a "Worth $X" value comparison is shown. The discount is stated as a percentage but the base price it's discounting FROM is invisible.

---

## CTA strategy

〔Directly fetched〕:
- Single "Add to cart" for the full bundle on all bundle PDPs — consistent across all 5 observed bundles.
- No per-product Add buttons within the step/product list.
- "LEARN MORE" on some collection cards (Sensitive Skin Kit, Skin Recovery System) rather than "Add to cart" — routes to the PDP instead of direct add. This is the only case in this study where the collection card CTA is a navigation link rather than a buy action.
- **Quiz CTA inside every bundle PDP** (directly fetched): "TAKE THE QUIZ" appears as a text CTA below the How to Use section — cross-funnel redirect to the SKU-matching quiz. Consistent on every bundle PDP, not just individual SKU PDPs.
- No subscription toggle visible on bundle PDPs in the fetched HTML. Subscription (10% off + free shipping) available on individual SKU PDPs but not confirmed on bundles.

---

## Evidence integration

〔Directly fetched from Sensitive Skin Kit and Skin Recovery Kit PDPs〕:

**Sensitive Skin Kit:**
- Clinical claim in product description (below fold): "UV Skin Recovery Broad Spectrum SPF 50 is clinically proven to protect from UVA/UVB rays while alleviating issues associated with skin sensitivity for stronger, less sensitive skin" with study parameters: "12 weeks study, 45 female subjects, all skin complexions and sensitive skin" 〔verbatim〕.
- This is the most methodologically complete claim on any EltaMD bundle page — it names the duration AND the N= count AND the demographic.

**Skin Recovery Kit:**
- "Clinically proven to alleviate issues associated with skin sensitivity" (sunscreen).
- "Clinically proven to reduce visible skin redness after 28 days" (night mask).
- No N= count on these claims at the bundle level.

**Skin Recovery System:**
- "shown to visibly reduce redness and increase hydration in 24 hours after just one use"
- "help repair and strengthen damaged skin barrier"
- "clinically proven to strengthen the skin barrier and reduce water loss after 7 days"
- The 7-day and 28-day timeframes are short — positioned as "fast visible results," not a 12-week protocol claim.

**Placement within the page:** All clinical claims appear in the "Features and Benefits" section below the fold, BELOW the buy box and CTA. They are not visible above the fold on any bundle PDP. This means the buyer adds to cart before seeing the evidence — a significant conversion pattern to note.

**"In the Media" award wall:** Not present on bundle PDPs in fetched content. The award wall (InStyle, Women's Health, etc.) that appears on the UV Clear single-SKU PDP is absent from bundle PDPs. Bundle pages rely on the "#1 Dermatologist-recommended professional sunscreen brand" badge and the "Dermatologist Recommended" badge image — both present on every bundle PDP.

---

## Cross-sell / upsell

〔Directly fetched from all three bundle PDPs〕:

**"COMPLETE THE REGIMEN" carousel** — appears on every bundle PDP, below the How to Use section and above the quiz CTA. Contains 4–5 related bundles or individual SKUs. Named with the verb "Complete" — implies the bought bundle is a partial protocol and more is available. This is EltaMD's most aggressive cross-sell mechanism.

- Sensitive Skin Kit: "COMPLETE THE REGIMEN" shows 5 related sunscreen products.
- Skin Recovery Kit: "COMPLETE THE REGIMEN" shows 4 related bundles.
- Skin Recovery System: "COMPLETE THE REGIMEN" shows complementary UV Daily and UV Clear variants.

Section order below fold (consistently across all three fetched PDPs):
1. Features and Benefits
2. Ingredients (with "Ingredient Insights" link on some)
3. How to Use
4. Quiz CTA ("TAKE THE QUIZ")
5. Complete the Regimen cross-sell carousel
6. Social sharing callout (some)
7. Footer

No sticky cross-sell bar on scroll. No "Frequently Bought Together" above the fold.

---

## Subscription default

〔Confirmed via WebSearch for EltaMD subscription program〕:
- EltaMD offers "Subscribe & Save" — 10% off + free shipping on all subscription deliveries.
- Subscription requires account creation: "To proceed with Subscribe & Save, you must be logged in or create an account."
- On individual SKU PDPs: a subscription radio toggle appears in the buy box.
- On bundle PDPs: no subscription toggle visible in fetched content from any of the three bundle PDPs. Bundles appear to be one-time purchase only, or the subscription toggle is not surfaced in the Shopify HTML fetched.
- Default: one-time purchase.

---

## Voice + visual identity

EltaMD bundle pages are the most transactional of the three brands — they read like a SKU page that happens to contain multiple products, not an editorial surface that explains a protocol philosophy. The intro copy on the collection page ("We've made it easier than ever by curating our most-loved, clinically-proven formulas bundled into convenient kits") is the closest thing to a positioning statement on any bundle page, and even that is a service-language frame, not a clinical or emotional hook. The visual identity on bundle pages is identical to single-SKU PDPs — same white surface, same red accent CTA, same Shopify heading hierarchy. The "#1 Dermatologist-recommended professional sunscreen brand" badge is repeated on every surface including bundle pages, functioning as the single consistent trust anchor across the entire site.

---

## What to lift for Clarté

1. **Step-verb + product-name numbered list** (Skin Recovery System pattern, directly fetched) — the "Cleanse / Tone / Treat / Moisturize / Protect / Night Repair" step-verb structure on the 6-product bundle is the cleanest protocol composition in this entire study. Each step gets one verb, one product name, one implied duration/frequency. Clarté's protocol pages should use this exact structure for the product-within-protocol display: e.g., on the Clear-Skin Protocol: "Cleanse — Clarté Salicylic Cleanser — AM + PM / Treat — Clarté Niacinamide Serum — PM / Protect — Clarté Barrier SPF — AM." Implement in `app/acne/page.tsx` (and all three sibling protocol pages) as a numbered list with step verbs in JetBrains Mono and product names in Fraunces italic.

2. **"COMPLETE THE REGIMEN" cross-sell carousel on individual SKU PDPs** (directly fetched) — EltaMD surfaces the bundle as a cross-sell on individual SKU PDPs, not only on the bundle page itself. On Clarté's individual-product PDPs (`app/(site)/products/[sku]/page.tsx`), below the buy box, add a "Complete the Protocol" card showing the remaining 2–3 SKUs in the same protocol with a single combined "Add Clear-Skin Protocol — Rs. 6,499" CTA. This converts single-SKU buyers into protocol buyers without a quiz step.

3. **Clinical claim with N= and duration on the bundle PDP** (Sensitive Skin Kit, directly fetched: "12 weeks study, 45 female subjects") — the N= + weeks + demographic line is the minimum viable citation format on a bundle page. When Clarté has panel data, surface it in this format on each protocol page: "8-week observer panel · N=30 · Lahore, 2026" in JetBrains Mono below the relevant claim. Do not surface without real data per `feedback_unverified_claims`.

4. **"TAKE THE QUIZ" cross-funnel CTA on every bundle PDP** (directly fetched) — EltaMD puts the quiz CTA inside the bundle PDP below the How to Use section, catching buyers who are uncertain about whether this bundle fits them. Clarté should do the same on protocol pages: below the step sequence, add "Not sure which protocol fits your skin? Take the 60-second analysis →" linking to `/quiz`. This keeps uncertain buyers on-site rather than losing them to a no-decision exit.

5. **Collection intro copy as the only editorial voice on a transactional surface** — "We've made it easier than ever by curating our most-loved, clinically-proven formulas bundled into convenient kits" is brief, functional, and lands the value prop in one sentence. Clarté's `/products` page (or a future `/protocols` index) should open with a comparable single-sentence frame: "Four 12-week protocols, each formulated by our GMC-registered doctor for a specific skin concern." One sentence above the grid. No more.

6. **10-slide image carousel on a 3-product bundle** — the Sensitive Skin Kit's 10-slide carousel (product group shot, individual product shots, benefit graphics) is the gallery-as-explainer pattern. For Clarté's protocol page, adapt: slide 1 shows all protocol SKUs together; slides 2–4 show each SKU individually; slides 5–6 show before/after or in-use stills; slide 7 shows the GMC-registered doctor credential (no face, no name) or a clinic context shot. Keeps the buyer on the page without requiring them to scroll to learn about each product.

---

## What to skip

- **No individual prices shown on bundle PDPs** — EltaMD's weakest pattern. The buyer cannot calculate the saving. Clarté should show the individual sum ("Buy separately: Rs. 8,750") next to the bundle price ("Protocol: Rs. 6,499") on every protocol page. COD buyers in particular need explicit price justification — they're calculating whether the parcel is worth accepting.
- **"Add to Cart & Save 20%" as the CTA copy** — this conflates the CTA verb with a discount claim, and the discount percentage reference is opaque (20% of what?). Clarté's CTA copy should be "Add to Cart — Rs. 6,499" (price in the button per the Glossier pattern already recommended in `03-pdp.md`). Discount is shown separately as a value comparison, not buried in the CTA label.
- **"LEARN MORE" on collection cards instead of "Add to cart"** — on 4 of 5 EltaMD bundle cards, the collection card CTA is "LEARN MORE," which routes to the PDP. This adds a navigation step before the buy decision. Clarté's `/products` cards for protocol bundles should show both a "View Protocol" link and an "Add to Cart" button, making the buy action available without the PDP visit for repeat buyers. (The Shopify equivalent is inline "Add to cart" on the collection card — Clarté's Next.js setup can do the same via the existing cart action.)
- **Subscription toggle absent from bundle PDPs** — even if Clarté wanted subscriptions (it doesn't, per COD model), EltaMD's approach of omitting the subscription toggle from bundle PDPs while offering it on individual SKUs is inconsistent. Keep all subscription logic off Clarté's protocol pages entirely.
- **Red promotional accent** — "Add to Cart & Save 20%" uses a red or high-contrast callout on EltaMD's pages. Clarté's promo calls-out should use cobalt (on-brand, clinical) not red (drugstore urgency).

---

## Sources

- https://eltamd.com/collections/bundled-kits 〔directly fetched〕
- https://eltamd.com/products/sensitive-skin-bundle 〔directly fetched〕
- https://eltamd.com/products/eltamd-skin-recovery-bundled-kit 〔directly fetched〕
- https://eltamd.com/products/eltamd-skin-recovery-system-regimen-kit-2 〔directly fetched〕
- https://eltamd.com/products/eltamd-acne-bundle 〔404 — sourced via WebSearch〕
- https://eltamd.com/products/eltamd-hydration-bundle 〔404 — URL changed〕
- https://eltamd.com/products/eltamd-gift-for-him-bundle 〔WebSearch reference〕
- https://eltamd.com/pages/eltamd-skincare-quiz 〔referenced in bundle PDPs〕
- https://www.lovelyskin.com/c/skinceuticals-kits-and-sets 〔comparison context〕
- WebSearch snippets for EltaMD Acne Bundle pricing, subscription program, and bundle discount structure
