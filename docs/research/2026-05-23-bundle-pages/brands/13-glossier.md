# Glossier

**URL:** https://www.glossier.com
**Positioning:** Community-first mass-accessible skincare + makeup; "Skin First. Makeup Second." millennial DTC; $12–62 price band; US + 7 markets.
**Why study them:** Glossier invented the canonical "Add Phase to Bag" bundle-CTA pattern that most DTC brands have since copied. Their Custom Skincare Set builder (5-step wizard, 10% off, save-at-end mechanic) is the reference for sequential protocol builders at moderate discount. The Phase 1/2/3 naming is the naming ancestor of Clarté's four-protocol structure — useful to understand exactly what they did, then decide where to diverge.

---

## URL + page label

- **Custom set builder:** https://www.glossier.com/a/pages/custom-skincare-set — "Custom Skincare Set" (build-your-own, 5-step wizard)
- **Pre-curated sets listing:** https://www.glossier.com/collections/skincare-sets — "Skincare Sets"
- **All sets listing:** https://www.glossier.com/collections/sets — "All Sets"
- **Historical Phase pages** (now retired; redirected to collection pages): `/skincare/sets/phase-1-set`, `/skincare/sets/phase-2-set` — These existed 2014–2021. The Phase 1/2/3 naming was Glossier's original bundle framework; it has since been replaced by the custom-set wizard and pre-curated sets. The CTA "Add Phase to Bag" is documented extensively in third-party reviews from 2015–2021 but is no longer present on the live site.

---

## Hero composition

**Custom set builder (https://www.glossier.com/a/pages/custom-skincare-set):**
- Eyebrow: none (no mono eyebrow)
- Headline: "Create a Custom Skincare Set and save 10%"
- Sub-headline: "Your skin is unique and no one knows its needs better than you."
- CTA: No single hero CTA — the wizard starts immediately below the headline; first step is labeled "Cleanse" with a "Select one or more" prompt.
- No lifestyle photography at the top of the builder itself; product cards within each step carry individual product imagery.

**Pre-curated sets listing (https://www.glossier.com/collections/skincare-sets):**
- Seasonal framing: "Cool off" / "Swoon" (spring/summer language at time of fetch)
- Each set appears as a product card with a lifestyle or product-stack image, set name, strikethrough price, and sale price.
- No hero headline above the grid — the page opens directly into the product card grid.

---

## Composition display

**Custom set builder — 5 steps:**

| Step | Label | Required? | Products selectable |
|---|---|---|---|
| 1 | Cleanse | Required | Milky Jelly Cleanser |
| 2 | Treat | Required | Serums (Super Bounce, Super Pure, Super Glow) |
| 3 | Moisturize | Required | Priming Moisturizer, Futuredew, etc. |
| 4 | Sunscreen | Optional | Invisible Shield SPF 35 |
| 5 | Add-ons | Optional | Masks, serums, oil-serum hybrids |

Each step expands a product selector; products are shown with: thumbnail image, product name, short benefit description, and price. Each product card has a select/deselect toggle. Navigation: "Skip / Next step" arrows. The wizard enforces minimum 3 products (all Required steps selected) before the final CTA activates. The discount copy "Save 10% when you create a Custom Skincare Set" and "Final discounts are applied at the end" appears as a persistent line below the wizard header.

**Pre-curated sets — card format:**
Set card shows: lifestyle or product-stack image, set name (e.g., "Spring Favorites"), brief product list as copy (e.g., "Boy Brow + Futuredew + Lash Slick"), strikethrough original price, sale price. Products within the set are NOT individually linked from the card — you click into the set PDP to see individual items. No per-product thumbnails on the listing card; only a combined image.

**Set PDP (individual set page — e.g., "Spring Favorites"):**
At the PDP level, each included product is listed with: thumbnail, linked product name, and sometimes a variant selector (shade for makeup). No per-item price is shown on the bundle PDP — only the bundle total. This is an intentional friction-reduction tactic: hiding the sum-of-individuals makes the savings feel abstract but removes the "is this worth it?" math from the buy decision.

Each product name IS a link out to its own individual PDP, so products within the set are read-write (you can navigate to each PDP), but from the set PDP itself there is no per-product Add button — only the single bundle CTA.

---

## Pricing transparency

**Custom set:** "Save 10% when you create a Custom Skincare Set." The 10% is applied at checkout. No sum-of-individuals is shown during the builder. No strikethrough in the wizard — discount materializes only at the checkout summary. Example from the sets listing: "Spring Favorites: ~~$72~~ $61" (savings = $11, 15.3%). "Spring Pinks: ~~$48~~ $42" (12.5%). "The Dewy Look: ~~$54~~ $43" (20.4%). The pre-curated sets do show strikethrough on the card, so savings ARE visible at browse level for those. The custom builder withholds it until checkout. No payment plan. No subscription. No BNPL surfaced anywhere on the bundle page.

---

## CTA strategy

**Custom set builder:** Single progressive CTA — "Next step" per step, then a final "Add Custom Set to Bag" at step 5 (inferred from flow; the wizard resolves to a single-bundle add, not per-product adds). The wizard generates a single cart line-item for the bundle.

**Pre-curated sets (listing):** "Choose set" for variant-selectable sets (e.g., choose your three Balm Dotcom scents), "Add to bag" for fixed-composition sets.

**Historical "Add Phase to Bag" CTA** (no longer live): Per third-party reviews from 2015–2021, the Phase 1, 2, and 3 set PDPs each had a single "Add Phase to Bag" button. This was a literal phrase — one tap, three products enter the cart as a pre-priced set. This pattern is now replaced by the wizard, which is more flexible but requires 5-step commitment.

No per-product "Add to bag" within any bundle page. Quiz CTA is absent from the bundle pages; it appears in the header nav only.

---

## Evidence integration

Minimal on the bundle pages. The custom set builder opens with "Your skin is unique and no one knows its needs better than you" — community-empowerment framing, not clinical evidence. No percentages, no before/after, no dermatologist credential, no clinical trial references. The pre-curated sets listing shows customer review stars on each card. The sets PDP inherits the product's aggregate rating but does not surface a distinct "set" review count. Evidence sits in the individual product PDPs, not the bundle pages.

This is the most significant contrast with Clarté MD's positioning: Glossier bundles purely on lifestyle + community; Clarté should bundle on clinical evidence + protocol efficacy.

---

## Cross-sell / upsell

- "Create a Custom Skincare Set" is surfaced as a cross-sell tile on the sets listing page.
- "Free gift with qualifying orders" ($75 / £55 / €75) — Glossier surfaces this in the cart, not on the bundle page. At time of fetch: "Free Lip Glaze on us with any qualifying order." Auto-added at threshold; no opt-in. This is the anti-pattern for Clarté.
- No samples picker. No per-protocol alternatives visible from the bundle page.

---

## Subscription default

None. One-time purchase only. No subscribe-and-save on any bundle or set. This is a rare Glossier constraint that actually aligns with Clarté's COD reality.

---

## Voice + visual identity

"Skin First. Makeup Second." The bundle pages carry the same warm, conversational register as the rest of the site: "Your skin is unique and no one knows its needs better than you." No clinical language, no ingredient percentages, no methodology disclosures. The visual identity is muted millennial pink (Glossier pink ~#F4B9B2 appears on imagery, packaging, and accent elements), soft-white backgrounds, sans-serif body. The set imagery uses lifestyle shots (hands, faces, soft light, not lab or clinical settings). The CTA buttons are black on white — brand pink is reserved for imagery, not CTAs.

---

## What to lift for Clarté

1. **5-step wizard as a "Build Your Protocol" surface.** Clarté has four 12-week protocols, each with 3–5 products. A wizard modeled on the custom set builder — Cleanse / Active Serum / Treatment Serum / Moisturizer / Booster — maps naturally. Apply to: a new `/build-your-protocol` route. The wizard resolves to a single "Add Protocol to Cart" CTA that preloads 3–5 SKUs. Discount on the bundle incentivizes completion (Clarté would use a flat-price bundle rather than a dynamic 10% off, given COD logistics, but the UX pattern holds). This is the correct alternative to the current approach of presenting bundles as static product cards.

2. **Strikethrough + savings % on set cards at browse level.** The pre-curated sets listing shows `~~$72~~ $61` on the card. This surfaces the value at zero clicks. Apply to: the protocol cards on `/products` and the four protocol landing pages. Shows bundle saving vs buying all products individually. Absent from Clarté today.

3. **"Skip / Next step" navigation in the builder.** Optional steps are flaggable as skippable, which respects the user's existing routine. If Clarté has a protocol where one product is optional (e.g., booster serum), the wizard can offer "Skip this step — I already have a serum." Apply to: the `/build-your-protocol` wizard route.

4. **Single-bundle CTA ("Add Protocol to Cart") rather than per-product adds.** The Glossier set PDP shows one button that loads all products. No per-product Add buttons compete for attention. Apply to: all four protocol landing pages (`/acne`, `/even-tone`, `/renewal`, `/barrier`). Current Clarté state is unknown (check `app/acne/page.tsx`) — but any per-product Add button row should be replaced or subordinated.

---

## What to skip

- **"Your skin is unique and no one knows its needs better than you."** This democratized, community-empowerment framing actively undermines a derm-led clinical brand. Clarté's opening line should instead be: "Formulated by our GMC-registered doctor for your specific skin concern."
- **No evidence on bundle pages.** Glossier's bundle pages carry zero clinical or ingredient data. This is the gap Clarté must fill: place the `<ClinicalProof>` 3-up block on every protocol page.
- **Auto-add free gift at threshold.** Glossier auto-adds a gift SKU. For COD, auto-additions that the customer didn't choose create "what is this?" moments at the door. Use BoJ's opt-in tile instead.
- **Glossier pink accents.** The entire brand palette is disqualifying — millennial pink is wrong for Clarté. Navy + cobalt + warm cream only.
- **Phase 1/2/3 naming cadence.** The sequential phase numbers worked for Glossier because it mapped to a simple Cleanse/Treat/Finish arc. Clarté's four protocols are parallel (by concern), not sequential. Use concern-name labels — "Clear-Skin Protocol," "Even-Tone Protocol" — not Phase numbers.

---

## Sources

- https://www.glossier.com/ (direct fetch — homepage, bundle CTA structure)
- https://www.glossier.com/collections/skincare-sets (direct fetch — sets listing, card format, pricing)
- https://www.glossier.com/a/pages/custom-skincare-set (direct fetch — wizard steps, CTA copy, discount mechanics)
- https://www.glossier.com/pages/skincare-sets-terms-conditions (direct fetch — discount rules: 10% on 3–5 products, auto-applied at checkout)
- https://www.thebeauticiansdaughter.com/review-glossier-phase-1-set/ (via WebSearch — historical "Add Phase to Bag" CTA documentation)
- https://www.bustle.com/p/the-glossier-phase-1-set-has-a-lower-price-tag-but-theres-a-small-catch-52288 (via WebSearch — Phase 1 set composition, pricing history)
- https://medium.com/@saradelinaa/the-skinny-on-glossier-phase-1-2-sets-b00dfb0c78bc (via WebSearch — Phase 1/2 set UX documentation)
