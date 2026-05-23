# The Ordinary

**URL:** https://theordinary.com/en-us/
**Positioning:** "Clinical Formulations with Integrity" — ingredient-forward, brutally transparent, $6–$32 price band; DECIEM brand; global DTC + Sephora/ULTA retail.
**Why study them:** The Ordinary's regimen pages are the canonical reference for "no-marketing clinical voice on a bundle page." Their "Add Regimen To Cart" CTA (single button loads a full 3–8 product AM+PM routine) is the exact multi-product-add pattern Clarté's protocol CTAs should emulate. Their concern-led regimen taxonomy (9 categories, Prep/Treat/Seal framework) maps directly onto Clarté's four protocol concerns.

---

## URL + page label

- **Regimen builder (personalized quiz):** https://theordinary.com/en-us/regimen-builder.html — "Skincare Regimen Builder" / "Build My Regimen"
- **Pre-made regimen guide (9 concern categories):** https://theordinary.com/en-us/skincare-guides/regimen-guide.html — "Skincare Regimens for Beginners"
- **Individual set PDP (e.g., Acne Set):** https://theordinary.com/en-us/the-acne-set-100631.html — "The Acne Set: Salicylic Acid 2% Regimen for Clear Skin"
- **Layering educational guide:** https://theordinary.com/en-us/skincare-layering-guide.html — "Your Guide to Layering The Ordinary Skincare"
- **Sets & Collections listing:** accessible from main nav (exact URL not resolved; 404 on attempted slug)

What they call it: "Regimen," "Set," "Collection." "Regimen" is the preferred term — it appears in all main navigation labels and page titles. This is a deliberate choice: "regimen" implies medical protocol, which matches their clinical positioning. "Routine" appears in blog copy; "Set" is used for the boxed product bundles.

---

## Hero composition

**Regimen guide (https://theordinary.com/en-us/skincare-guides/regimen-guide.html):**
- Eyebrow: none (no mono eyebrow at the top of the page)
- Headline (verbatim): "A Simple Guide to Skincare Regimens"
- Sub-headline (verbatim): "Choosing the right skincare is a science. Luckily, our skin scientists developed these easy regimens..."
- Hero image: none — the page is purely typographic + product grid. No lifestyle photography, no model imagery, no lab photography. The "hero" is the headline + the first regimen grid.
- CTA: "Add Regimen To Cart" button appears above Step 1 of each concern's regimen.

**Regimen builder (https://theordinary.com/en-us/regimen-builder.html):**
- Headline (verbatim from builder header): "Science meets customization"
- Sub-headline: "Design your regimen based on your unique skin profile"
- Hero image: none — the first question appears immediately below the headline.
- Primary CTA: not at the top; the builder resolves to a results page (not captured due to JS-gating).

**Acne Set PDP (https://theordinary.com/en-us/the-acne-set-100631.html):**
- Headline (verbatim): "The Acne Set: Salicylic Acid 2% Regimen for Clear Skin"
- Eyebrow copy: "Targets Acne" / "Suited to Acne-Prone Skin" (appears as pill tags above the title)
- Hero image: product stack shot — three bottles on white, no model, no lifestyle
- Primary CTA (verbatim): "Add to Cart"

---

## Composition display

**Regimen guide — concern regimen pages (the most important surface):**

Each of the nine concern regimens (e.g., Acne-Prone Skin) is displayed on the regimen guide as an AM / PM tabbed section. Structure per regimen:

```
[Concern heading: "Acne-Prone Skin"]
[AM tab] [PM tab]

Step 1: Prep
  [Product thumbnail] [Product name — linked to PDP]
  Benefit tag: e.g., "Oil Control, Brightens, Smooths"
  Size options: 30ml / 60ml (dropdown or inline chips)
  Price: $7.90 (individual price, shown per product)
  [Add to Cart] [Wishlist icon]
  Award badges: Allure / National Eczema Association / etc.

Step 2: Treat
  [Same format — thumbnail + name + benefit + size + price + Add to Cart]
  [Multiple products — 2–4 serums for a concern like Acne]

Step 3: Seal
  [Moisturizer + Sunscreen (AM) or Moisturizer only (PM)]
  [Same format]

[Add Regimen To Cart] ← button appears ABOVE Step 1, spanning all steps
```

Key design decisions in this layout:
- Every product has its own price shown. There is no hiding the math — the customer can see $7.90 + $12.50 + $9.80 = $30.20 and then verify the "Add Regimen To Cart" loads the same sum.
- No bundle discount is applied. The "Add Regimen To Cart" at the top of each concern section adds all products in the regimen to the cart at individual prices. No savings incentive. The value prop is purely: "we've done the selection work for you."
- The AM/PM tabs split the regimen into morning and evening views. AM emphasizes SPF (UV Filters SPF 45 appears in most AM regimens). PM emphasizes retinoids and acids.
- Products are NOT text-list-only. This is a common misconception about The Ordinary. Each product shows a thumbnail image, a linked name, a benefit description, size options, price, and individual Add to Cart. The "text-list + small thumbs" description (referenced in the research brief) is accurate — thumbs are small relative to a PDP gallery — but each line is a complete card, not a bare text entry.
- Products link out to their own PDPs (read-write, not read-only).

**Acne Set PDP product listing:**
Three products listed with thumbnail + linked name + size. Bundle price $16.70; individual prices NOT shown on the PDP (prices only visible at individual PDP level). No savings copy ("Save X%"). No strikethrough. The Ordinary does not show savings math on the boxed set PDP — which is the opposite of their regimen guide where every price is visible. This inconsistency is notable: the boxed set hides the value; the regimen guide shows it.

**Regimen builder — 13-question flow:**
1. Name (text input)
2. Email (required — hard gate, unlike Glossier's no-gate wizard)
3. Age range (multiple choice: 19–29 / 30–39 / 40–49 / 50+ / Prefer not to say)
4. Skin type (single: Balanced / Dry / Oily / Combination)
5. Top 3 concerns (tile selection from 10 options, with condition imagery on each tile)
6. Concern ranking (drag-to-reorder)
7. Eye area concerns (multi-select)
8. Pregnancy status
9. Regimen complexity (Simple: 3 / Essentials: 4–5 / Advanced: 6+)
10. Current product categories (checklist)
11. Ingredient experience level (Beginner / Intermediate / Advanced)
12. Cleanser texture preference (visual options: Gel-like / Balm-Oil / Cream)
13. Moisturizer type (visual: Gel / Ultra Light Cream / Light Cream / Rich Cream)
Results: not captured (requires JS execution + email submission). Inferred from MyBeautyClan review: results show a named AM routine + PM routine with product thumbnails, each with individual Add to Cart and a bulk "Add All to Cart" option.

---

## Pricing transparency

**Regimen guide:** Fully transparent. Every product shows its individual USD price ($6.00–$32.00). No bundle discount applied when using "Add Regimen To Cart." Savings = zero. The value proposition is curation, not price.

**Boxed sets (Acne Set, etc.):** Bundle price only ($16.70 for the Acne Set). Individual prices hidden on the set PDP. No "Save X%" copy. No strikethrough. This is the least transparent surface on the entire site and contrasts starkly with the regimen guide.

**Builder results:** Individual prices expected to be shown per product (consistent with site-wide transparency philosophy). Estimated total visible before submission. No subscription rail. No BNPL. Free shipping on $25+ US orders.

---

## CTA strategy

**Regimen guide — primary CTA (verbatim): "Add Regimen To Cart"**
This button appears once above each concern's three-step regimen. It is a bulk-add button: one tap adds all products in the AM or PM regimen (whichever tab is active) to the cart as individual SKUs, not as a bundle line item. This is a critical distinction from Glossier's set (which adds a single bundle SKU): The Ordinary adds each product separately, so the customer can remove individual items from the cart without losing the others.

Secondary CTA per product: individual "Add to Cart" buttons on each product card within the regimen. Both the bulk and individual buttons coexist.

**Boxed set PDP:** "Add to Cart" (single, generic). No "Add Regimen To Cart" language on the boxed set — that phrase is reserved for the regimen guide pages. Inconsistency that reduces brand cohesion.

**Regimen builder results (inferred):** "Add All to Cart" or "Add Regimen to Cart" — consistent with the guide pattern.

---

## Evidence integration

The Ordinary's evidence sits at the ingredient level, not the bundle level. On the regimen guide pages:
- No before/after photography
- No clinical trial data
- No "% of users saw improvement"
- No dermatologist credentials

What exists instead:
- **Award badges per product card** (Allure Best of Beauty, National Eczema Association Seal, Women's Health Award, SheerLuxe Award) — third-party recognition as proxy for clinical trust
- **Benefit tags per product** (e.g., "Oil Control, Brightens, Smooths") — functional descriptors not clinical claims
- **Ingredient name as the product name** — "Salicylic Acid 2% Solution" conveys active concentration, which is the evidence

The homepage carries "Clinical Formulations with Integrity" + "Grounded in Science. Driven by Purpose" + "Look Inside Our Lab" — but none of this language cascades to the regimen or set pages. Evidence is brand-level, not bundle-level.

---

## Cross-sell / upsell

On the regimen guide pages:
- **"Build My Regimen"** link drives from the guide to the personalized builder — cross-sell between pre-made and personalized surfaces
- **Ingredient glossary link** ("shop by ingredient") from regimen pages
- **Layering guide link** — educational cross-sell to the layering guide page
- No related-products carousel on the regimen guide pages
- No "other concerns you might have" cross-sell from regimen pages
- Gift-with-purchase promotions surfaced in nav (not on the regimen pages themselves)

On the Acne Set PDP: no cross-sell tiles visible in primary content. Newsletter + "Related Products" carousel likely below fold (not captured).

---

## Subscription default

None on any bundle or regimen page. The Ordinary does not offer subscribe-and-save in the US market as of mid-2026. Single purchase only.

---

## Voice + visual identity

"Spec-sheet clinical." The Ordinary's bundle pages strip all lifestyle language. The regimen guide opens with "Choosing the right skincare is a science" and then proceeds to list products by function and ingredient concentration. The visual identity is matte white backgrounds, small product photography, no models, no lifestyle, no editorial narrative. CTA buttons are black on white. The brand's warmth — to the extent it exists — lives in the "Why We Ask" microcopy in the regimen builder (explaining data collection questions), not in the product pages.

The homepage carries slightly warmer copy ("Grounded in Science. Driven by Purpose") but this tone does not reach the regimen pages.

For Clarté: The Ordinary's clinical voice goes too far toward cold-spec. The "clinical with warmth" register Clarté targets lives between The Ordinary's register and Glossier's register. The Ordinary's structural choices (AM/PM split, Prep/Treat/Seal steps, "Add Regimen To Cart") are worth lifting wholesale; its flat, no-warmth voice is not.

---

## What to lift for Clarté

1. **"Add Regimen To Cart" as the primary bundle CTA copy.** This exact phrase should be the CTA on Clarté's four protocol pages. Change "Add to Cart" on `/acne`, `/even-tone`, `/renewal`, `/barrier` to "Add Protocol to Cart" — same pattern, Clarté-branded. One tap preloads all 3–5 protocol SKUs. Apply to: all four protocol landing pages as the primary hero CTA.

2. **AM / PM tab split inside the protocol layout.** The Ordinary's AM/PM tabs on regimen pages let the user see their morning products (cleanser + vitamin C serum + SPF if applicable) separately from PM products (cleanser + actives + moisturizer). Clarté's protocols include products used AM only (SPF serum if applicable), PM only (retinoid / acid treatment), and both (cleanser, moisturizer). Apply AM/PM tab structure to: the "How to use your protocol" section on each of the four protocol pages. Label tabs "Morning" and "Night" rather than "AM/PM" for warmth.

3. **Prep / Treat / Seal step labeling within the routine.** The Ordinary's three-step labels (Prep, Treat, Seal) are the most broadly understood routine architecture in English-language skincare. Clarté's four-protocol structure maps cleanly onto it: Step 1 Prep (cleanser), Step 2 Treat (active serums), Step 3 Seal (moisturizer). Apply to: the protocol product listing within each protocol landing page. Each product card shows its step number + label.

4. **Individual product price transparency within the bundle.** Show each product's individual price inside the bundle layout, then show the bundle total with savings. "Buy separately: Rs. X / Bundle price: Rs. Y / You save: Rs. Z." This is more honest than BoJ's "Save 35%" where the individual prices are hidden. It also validates the bundle value. Apply to: the buy-box on all four protocol pages.

5. **Concern-tile imagery in the regimen builder.** The Ordinary's builder uses illustrated condition tiles (acne, dark spots, oily skin, etc.) for the concern-selection step. Not lifestyle photography — simplified illustrations that show the concern itself without being clinical-photo disturbing. Apply to: Clarté's skin quiz concern-selection step.

6. **"Why We Ask" contextual explanation microcopy in the quiz.** On each question in the regimen builder, a "Why We Ask" disclosure paragraph explains the data purpose. This reduces form abandonment on the email and pregnancy questions. Apply to: Clarté's AI skin analysis flow — each data-collection step should carry a one-sentence "Why we ask" line under the question. Especially critical for the photo upload step (PII collection).

7. **Award badge per product in the regimen listing.** National Eczema Association Seal, Allure Best of Beauty, etc. appear on individual product cards within the regimen. Clarté's equivalent would be: once the brand earns recognition (e.g., recommended by a named clinic, covered by a publication), a small badge on the relevant product card in the protocol listing. Even a "Dermatologist-formulated" pill in JetBrains Mono serves this function at launch.

---

## What to skip

- **No bundle discount on "Add Regimen To Cart."** The Ordinary adds products at full price with zero bundle discount. This is feasible for a brand at $7–$32 per item where a Rs.-equivalent bundle is already accessible. Clarté's protocols are priced at Rs. 4,799–7,999 as a complete bundle — the bundle IS the discount vs buying individually. The bundle discount must be shown explicitly (BoJ format, not The Ordinary format).
- **Email hard-gate on the regimen builder.** The builder requires an email address at step 2. This is a significant abandonment risk for a Pakistan market where email address provision is lower-trust than WhatsApp. If Clarté builds a skin quiz, soft-gate email: collect name + concern only in the quiz; offer email optionally on the results page.
- **Boxed set PDP hiding individual prices.** The Ordinary's boxed set PDPs (e.g., Acne Set) omit individual prices — inconsistent with their regimen guide's full transparency. Do not replicate this inconsistency. Show individual prices always.
- **Pure spec-sheet voice with no warmth.** "Glucoside Foaming Cleanser — 50ml" as a line item is honest but generates zero emotional connection. Clarté needs the structure of The Ordinary's regimen layout but the voice of Apostrophe — "earnest and empathic." Each product in the protocol listing should carry a one-line Fraunces italic descriptor ("the cleanser that never strips") in addition to the functional name.
- **"Solutions for [Ingredient]" framing.** The Ordinary's homepage and nav organize products by ingredient (Retinoids, Vitamin C, Niacinamide sections). At Clarté's current catalog size (3–5 products per protocol), ingredient-primary IA is premature. Lead with concern/protocol. Add an ingredient axis in the header nav only after reaching 20+ SKUs.

---

## Sources

- https://theordinary.com/en-us/ (direct fetch — homepage, nav structure, "Clinical Formulations with Integrity" tagline)
- https://theordinary.com/en-us/skincare-guides/regimen-guide.html (direct fetch — nine concern categories, AM/PM structure, Prep/Treat/Seal, "Add Regimen To Cart" CTA)
- https://theordinary.com/en-us/regimen-builder.html (direct fetch — 13-question flow, progressive disclosure, email gate, "Science meets customization" headline)
- https://theordinary.com/en-us/the-acne-set-100631.html (direct fetch — "The Acne Set" PDP, bundle price $16.70, "Add to Cart" CTA, no individual prices shown, no savings copy)
- https://theordinary.com/en-us/skincare-layering-guide.html (direct fetch — product carousel format, individual prices, no "Add Regimen" on this page)
- https://theordinary.com/en-us/blog/mastering-skincare-routine-guide.html (direct fetch — Prep/Treat/Seal framing, AM/PM conflict management)
- https://mybeautyclan.com/the-ordinary-regimen-builder-guide-routines-all-skin-types-concerns/ (via WebSearch — regimen builder results page, inferred "Add All to Cart" on results)
- https://www.dealmoon.com/en/product/the-ordinary-simplistic-regimen-am-and-pm-bundle/5029833 (via WebSearch — AM/PM bundle product composition confirmation)
