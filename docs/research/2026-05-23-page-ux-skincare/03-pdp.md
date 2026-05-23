# PDP UX — cross-brand teardown

**Research date:** 2026-05-23
**For:** Clarté MD design-system overhaul (Phase 2 PDP migration)
**Scope:** Single product detail page, hero SKU per brand, 8 brands

## How to read this

This file dissects ONE page type — the product detail page — across 8 reference brands. For each brand I captured the same 12 dimensions so they can be compared apples-to-apples: above-fold composition, buy-box sequence, name typography, price treatment, add-to-cart button, trust microcopy, trust pills, how-to-use UX, ingredient block UX, clinical-claim format, FAQ pattern, cross-sell pattern, plus one distinctive PDP element worth lifting.

Where the brand's own PDP was blocked (Augustinus Bader, Aesop, Dr. Jart+ all sit behind Cloudflare or aggressive bot protection on certain endpoints), I fell back to a retailer mirror — Nordstrom, Space NK, or earlier WebSearch summaries — and noted the source. None of the patterns reported below are invented; if I couldn't verify a dimension, I say so.

The "cross-cutting patterns" section at the end is where the value is — that's where 8 data points collapse into design rules. The "worth stealing" list names which Clarté file or component to touch.

Reference for the current Clarté PDP shape: `components/product/ProductDetailPage.tsx` — uses `<ProductTitle>` (italic Fraunces), `<TrustPills>`, shadcn Accordion FAQ, numbered "how to use" steps, sample-size ingredient cards. The migration is fresh enough that any pattern below can still be folded in.

## Per-brand observations

### 1. Augustinus Bader — The Rich Cream

**URL:** https://augustinusbader.com/us/en/the-rich-cream (fetched, but light coverage — supplemented with WebFetch summary)
**Above-fold composition:** Gallery on the LEFT, portrait orientation, single hero image with chevron-left / chevron-right carousel — NO thumbnail strip exposed by default. Buy box right.
**Buy box sequence:** Product name ("The Rich Cream") → price ("$99.00") → size implied via image alt (50 ml) → auto-replenish variant toggle (with strikethrough showing 20% off) → primary CTA "Add to Bag" + secondary "Set Up Replenish" → loyalty-points line → three checkmark trust lines.
**Product name typography:** Sentence case, sans-serif. NOT italic, NOT serif. Bader trades on monolithic neutrality, not literary type.
**Price treatment:** Single `$99.00` for one-time. Auto-replenish shows `$156.00` strikethrough → discounted price with `Auto-replenish (-20%)`, plus disclosure: "Min. commitment of 3 delivery cycles." Subscribe is treated as a serious variant, not a bolt-on radio.
**Add-to-cart button:** Copy "Add to Bag", full-width. Color not recovered from HTML, but visually black in Bader's design language. Secondary "Set Up Replenish" button paired beside or beneath.
**Trust microcopy near CTA:** Three checkmark lines — "FREE shipping options available", "FREE standard delivery on all auto-replenish orders", "30 day returns".
**Trust-pill row above fold:** Award-winning eyebrow plus deluxe-sample promise ("Deluxe Sample(s) with every purchase over $200") — no fragrance-free / non-comedogenic chip row. Bader does NOT use the SkinCeuticals-style attribute pill row.
**How-to-use UX:** Numbered list (1-3), each step with a duration timer ("45s"). The timer is unusual.
**Ingredient block UX:** Five hero-ingredient cards with image + benefit copy → expandable "SEE ALL INGREDIENTS" → "FREE FROM LIST" collapsible ("100% vegan. Formulated without irritants, gluten, GMOs, parabens, synthetic fragrance, sulfates (SLS & SLES), silicones, DEA, heavy metals, talc, and petrolatum/paraffin/mineral oil.") — no percentages disclosed for hero ingredients (the famous TFC8 complex stays opaque).
**Clinical-claim format:** Tight `% / descriptor / N / duration` cards. 4-week trial N=30: 37% reduction in forehead wrinkles, 54% reduction in crow's feet, 92% firmness improvement. 12-week study N=107: "99% said…" perception statements. Methodology surfaced as a section, not a footnote asterisk.
**FAQ pattern:** Accordion (expand/collapse) — sensitive-skin, certifications, allergens (gluten, nuts), pregnancy/nursing, bottle longevity, routine integration, "vs. The Cream." ~7 questions.
**Cross-sell:** "Find your moisturizer" section — four cards (The Light Cream, The Cream, The Rich Cream highlighted, The Ultimate Soothing Cream), each showing texture + ideal use case + closing "FIND YOUR FORMULA" link. Same family, different fit — not random "you may also like."
**Distinctive PDP element worth stealing:** The **45-second timer on each how-to-use step**. It converts a vague "massage upward" instruction into a concrete dose and elevates the ritual.

### 2. Tatcha — The Dewy Skin Cream

**URL:** https://www.tatcha.com/products/the-dewy-skin-cream
**Above-fold composition:** Gallery LEFT, square 1:1 aspect. **Twenty** numbered carousel images ("Go to item 1" through "Go to item 20") — Tatcha is the highest image count of any brand here. Mix: full size, cap off, mini, texture macro, model application, refill pods.
**Buy box sequence:** Eyebrow "Bestseller Special Value" → product name "The Dewy Skin Cream" → descriptor "Rich Line-Plumping Moisturizer" → price "$74" → size selector with variant tabs (Full Size | Gratitude | Refill | Mini) → CTA "Add to Bag" → quantity controls → trust line ("Free shipping and returns on U.S. orders") → divider → attribute list below.
**Product name typography:** Title case sans, no italic, no serif on the H1. The Japanese-romantic positioning is carried by photography and copy, not type.
**Price treatment:** Single price `$74` (sale price emphasized). No strikethrough above fold. No subscribe option exposed above fold (it appears in cart/checkout flow). Variant tabs change the SKU and the price implicitly.
**Add-to-cart button:** Copy "Add to Bag", full-width, dark/neutral button. Button repeats — main CTA plus another inside the "Suggested Ritual" carousel.
**Trust microcopy near CTA:** "Free shipping and returns on U.S. orders."
**Trust-pill row above fold:** "Bestseller" + "Special Value" labels at the top. Below the fold: "Dermatologist Tested, Non-Comedogenic, Cruelty-free" + a "Formulated without" inverse list (mineral oil, synthetic fragrances, sulfate detergents, parabens, urea, DEA, TEA, phthalates).
**How-to-use UX:** Narrative paragraph with a hero image — "Scoop desired amount of cream with the gold spoon. Massage onto face, neck and décolletage in upward strokes. Use daily, morning and night." No numbered list, no icons. Tatcha leans on ritual prose.
**Ingredient block UX:** Three hero ingredient callouts with icons (Hyaluronic Acid + Red Algae + Hadasei-3 / Biomimetic Squalane / Japanese Purple Rice) → expandable "See Full Ingredients" for the INCI dump. No percentages on hero ingredients — Hadasei-3 stays a proprietary complex.
**Clinical-claim format:** `% / claim / N=` with asterisked methodology. "100% showed immediate improvement in skin plumpness, suppleness, and radiance.*" / "*Based on a clinical study of 36 panelists." "88% showed an improvement in the look of dry fine lines" (2 weeks). "100% showed an all-day improvement in skin barrier after 1 use." Bio-instrumentation N=30 vs perception N=36 disclosed separately.
**FAQ pattern:** Below fold, accordion-style. Suggested-ritual carousel sits between description and FAQ.
**Cross-sell:** "Suggested Ritual" carousel — Rice Wash (cleanser) → Essence → Dewy Serum → Dewy Skin Cream (repeat). Each card shows variants, price, "Add to Bag," with prev/next nav. **Routine-shaped**, not random.
**Distinctive PDP element worth stealing:** The **routine carousel positioned as "the ritual this product belongs to"** — adds basket size without feeling like a recommender, and reinforces that the product isn't standalone.

### 3. Dr. Jart+ — Cicapair Tiger Grass Color Correcting Treatment

**URL:** https://www.drjart.com/product/29717/138113/… (403 Cloudflare). Sephora and Ulta mirrors also blocked. Sourced from brand-site WebSearch summary + review-blog corroboration.
**Above-fold composition:** Could not directly verify. Brand site is image-heavy with green-to-beige product hero showing the colour-correcting visual.
**Buy box sequence:** Could not verify the order. Brand site shows name → descriptor (color corrector + SPF 30) → size → CTA, but I cannot confirm sub-elements.
**Product name typography:** Brand uses the "+" suffix in mark; type is sans, no italic.
**Price treatment:** ~$52 retail, single price, no subscribe model surfaced by Dr. Jart+ on this SKU.
**Add-to-cart button:** Copy "Add to Bag" on brand site (verified via Cicapair landing page meta). Sephora mirror would say "Add to Basket."
**Trust microcopy near CTA:** Standard ship/return.
**Trust-pill row above fold:** Brand positions this as a derm-adjacent "treatment" — claims "instant" colour correction + barrier repair + SPF 30. Tiger Grass (Centella) is the hero claim.
**How-to-use UX:** Verified via reviews: position is as primer / base / colour corrector / sunscreen layer. Brand site likely uses a numbered or pictogram-led sequence given the product's "apply, blend, watch it change colour" UX hook.
**Ingredient block UX:** Hero ingredient is Centella Asiatica (Tiger Grass / Cica) plus mineral SPF (Zinc Oxide + Titanium Dioxide). Brand emphasises the "Cicabond" complex as proprietary.
**Clinical-claim format:** **The strongest format of any brand here.** N=32 women, 4 hours after one use: "96% said it instantly corrects visible redness, 91% said it conceals the look of blemishes, 97% showed skin barrier repair, 97% showed improved moisture levels with 12-hour coverage." Four discrete claims, all with same N and same single-use timeframe — extremely clean reporting.
**FAQ pattern:** Not verified.
**Cross-sell:** Brand pushes Cicapair "best-sellers" range — Camo Drops Tinted Serum, Sleepair Mask, related Cicabond products.
**Distinctive PDP element worth stealing:** **The unified 4-claim block with a single N and a single timeframe** ("32 women, 4 hours") — far more credible than mixing N=30 across 4 weeks with N=107 over 12 weeks the way Bader does. One trial, one cohort, one timeline, four numbers.

### 4. EltaMD — UV Clear Broad-Spectrum SPF 46

**URL:** https://eltamd.com/products/uv-clear-broad-spectrum-spf-46
**Above-fold composition:** Gallery left with main image ~1:1, plus a vertical thumbnail strip with **17 thumbnails** — product, ingredient close-up, lifestyle, before/after, and a comparison shot. Generous visual coverage.
**Buy box sequence:** Product name "EltaMD UV Clear Broad-Spectrum SPF 46" → stock status ("In Stock") → SKU indicator → price "$45.00" → size selector (1.7 oz / 3.7 oz dropdown) → primary CTA "Add to Cart & Save 20%" → secondary "Add to cart" → microcopy ("Works best on fair, light, medium light or medium skin tones.").
**Product name typography:** Sentence case sans, no italic. Clinical and functional — no luxury cues.
**Price treatment:** Single price `$45.00`. No subscribe. The 20% promotional is folded INTO the primary button copy rather than living as a separate radio.
**Add-to-cart button:** Copy "Add to Cart & Save 20%" (promotional) + "Add to cart" (standard) — two buttons stacked. Full-width.
**Trust microcopy near CTA:** **Tone-matching guidance** — "Works best on fair, light, medium light or medium skin tones." Unusual: most brands hide skin-tone fit deep in FAQ.
**Trust-pill row above fold:** Seven attribute chips — Hypoallergenic, Dye-free, Fragrance-free, Paraben-free, Non-comedogenic, Dermatologically tested, Oil-free. The densest pill row of any brand here.
**How-to-use UX:** Numbered bullets — "Apply liberally 15 minutes before sun exposure" / "Use water-resistant formulation if swimming" / "Reapply every 2 hours" / sun-safety guidance (limit 10am-2pm, protective clothing) / age restriction ("Before use on children under 6 months: Ask a physician"). Plus a separate troubleshooting subsection numbered 1-4 for "airless pump priming." Reads like medical-device instructions.
**Ingredient block UX:** Two-section structure: **Active Ingredients with %** ("Octinoxate 7.5%, Zinc Oxide 9.0%") → Hero ingredient cards (5% Niacinamide, Sodium Hyaluronate, Tocopheryl Acetate) with brief benefit copy → Full INCI under "Inactive Ingredients" with disclaimer "Ingredients may change, due to regulatory labeling requirements." Not expandable — all visible. SPF actives shown at exact %.
**Clinical-claim format:** Minimal on-page. References "clinical results" in image alt + a before/after at 12 weeks in the gallery, but no on-page %/N/duration table. EltaMD relies on "#1 Dermatologist-recommended professional sunscreen brand" rather than per-product trials.
**FAQ pattern:** None above fold — link to "EltaMD FAQs" sits in footer only. The product page is one-shot, no Q&A unit.
**Cross-sell:** "LET US HELP YOU FIND THE RIGHT PRODUCT FOR YOUR SKIN / TAKE THE QUIZ" — quiz pivot rather than direct cross-sell. Plus social-share tag prompt.
**Distinctive PDP element worth stealing:** **The skin-tone fit microcopy directly below the CTA** ("Works best on fair, light, medium light or medium skin tones."). Sets expectation BEFORE purchase — would save Clarté returns on the brightening serum.

### 5. Drunk Elephant — Protini Polypeptide Cream

**URL:** https://www.drunkelephant.com/products/protini-polypeptide-cream
**Above-fold composition:** Gallery LEFT, large 1408×1408 hero, thumbnails as sequential carousel below.
**Buy box sequence:** Product name "Protini™ Polypeptide Firming Refillable Moisturizer" → eyebrow "be a firm believer" → long descriptor → size selector dropdown (Standard 50ML, Refill 50ML, Little 15ML, Big 100ML) → price (strikethrough `$72.00` → `$54.00`, 25% off sitewide) → BNPL line "Or four payment installments of $13.50 by Afterpay" → CTA "Add to Bag" → promo line "Friends and Family: 25% off sitewide!"
**Product name typography:** Sentence case with trademark symbol, sans-serif, non-italic. Drunk Elephant's brand is Pantone color + chunky lowercase headlines, not serif.
**Price treatment:** Strikethrough old + discounted current emphasised. **Afterpay BNPL** line directly below price — first brand here to surface a payment-plan above the fold. No subscribe.
**Add-to-cart button:** Copy "Add to Bag", full-width below size selector and quantity.
**Trust microcopy near CTA:** Sitewide 25% callout, "Free shipping on $40+", "Free gift with $100+ spend", Afterpay badge.
**Trust-pill row above fold:** Promotional / commercial pills rather than formulation pills (sitewide %, threshold gifts, BNPL). Drunk Elephant's formulation claims live in the descriptor and the dedicated "Suspicious 6" filter elsewhere on the site.
**How-to-use UX:** Prose, non-numbered — "Apply morning and night to a clean, dry face. Use daily or in rotation with other Drunk Elephant moisturizers. May be mixed with any Drunk Elephant serum, treatment, or cream." The "smoothie" framing (mixing products) is the brand's signature instructional language.
**Ingredient block UX:** Three hero cards (Signal peptide complex, Pygmy waterlily stem cell extract, Soybean folic acid ferment extract) with icon images → expandable full INCI. No percentages.
**Clinical-claim format:** Three percentage stat cards: 96% / 93% / 90% — "96% showed improvement in skin's tone, radiance, and luminosity* / *In a clinical study with 31 people after 8 weeks." Tight format, N=31 disclosed, 8-week timeframe.
**FAQ pattern:** Q&A format — peptide function, vitamin C compatibility, retinol safety, peptide sourcing. ~4-6 questions.
**Cross-sell:** **"Make your smoothie"** section — bundles Protini with serum (Protini serum) + B-Hydra. Bundle price `$208 — ADD ALL TO BAG`. Plus a "face-off" comparison grid against alternative moisturizers (Lala Retro, Bora Barrier).
**Distinctive PDP element worth stealing:** The **comparison grid against the brand's own alternatives** — Protini vs Lala Retro vs Bora Barrier on the same row. Solves "which one of yours is for me?" without dumping the customer back to the listing page.

### 6. COSRX — Advanced Snail 96 Mucin Power Essence

**URL:** https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence
**Above-fold composition:** Gallery LEFT, portrait orientation, large hero with **horizontal scrollable thumbnail carousel** (~10+ images) — product angles, ingredient close-ups, lifestyle application.
**Buy box sequence:** Product name "Advanced Snail 96 Mucin Power Essence" → eyebrow "K-Beauty Favorite Essence for Glass Skin" → descriptor ("The New York Post Most Wanted 2024 Award winning…") → size selector dropdown (3.38 fl.oz / 100mL and 1.01 fl.oz / 30mL) → price `$25.00` → quantity ±  → CTA "Add to Cart" (NOT full-width per source) → stock note (backordered) → trust pills (Apple Pay, Klarna, Google Pay logos) with "Shop easier with" preamble.
**Product name typography:** Sentence case sans, no italic. K-beauty type conventions don't lean on serif.
**Price treatment:** Single tier `$25.00` consistent across sizes per source (likely the dropdown updates price, but only $25 was extracted). No strikethrough, no subscribe.
**Add-to-cart button:** Copy "Add to Cart", **appears non-full-width** per source — sits beside the quantity selector. Lower commitment visual weight than the Western brands here.
**Trust microcopy near CTA:** Payment-option logos (Apple Pay / Klarna / Google Pay) — BNPL surfaced via logo not copy.
**Trust-pill row above fold:** New York Post Most Wanted 2024 award badge, hypoallergenic tested, clinically proven. Award badge does most of the lifting.
**How-to-use UX:** Numbered list (4 steps) — text only, no icons / video. "After cleansing and toning, apply a small amount to the entire face." / "Gently pat with fingertips to aid absorption." / "Follow with a moisturizer." / "Continue with your makeup routine during the day or follow with a mask at night."
**Ingredient block UX:** Two-tier — hero cards with percentages ("96% Snail Secretion Filtrate" / "Allantoin & Panthenol" / "Hyaluronic Acid & Betaine — 1,000 ppm sodium hyaluronate") → full INCI list visible. **Percentages on hero ingredients** — rare among the 8.
**Clinical-claim format:** **Most rigorous of all 8.** "+196.17% increase in skin moisture / +35% increase in natural glow and radiance / -80% reduction in visible redness." Methodology footnote: "All clinical studies were conducted by Dermacosmetic Skin Science Laboratory (Korea) from May 26 to June 10, 2025, on 20 adult participants." N=20, 15 days, named lab, exact date range. K-beauty PIH compliance shows.
**FAQ pattern:** Collapsible Q&A — 7 questions: differentiation vs. competitors, snail mucin hydration, makeup/sunscreen compatibility, skin-type suitability, trend positioning, results timeline, vegan status / ethical sourcing.
**Cross-sell:** "Your Glass Skin Routine Guide" — 4-step bundle (Snail Mucin Gel Cleanser → this Essence → Snail 92 Cream → Snail Glass Glow Hydrogel Mask) with "GET FULL ROUTINE NOW & SAVE 20%" linked card grid.
**Distinctive PDP element worth stealing:** The **named-lab + exact-date-range clinical footnote** ("Dermacosmetic Skin Science Laboratory (Korea), May 26 – June 10, 2025, N=20"). Specificity of methodology is the single biggest credibility upgrade Clarté could add — and it costs nothing if a study has actually been run.

### 7. Glossier — Milky Jelly Cleanser

**URL:** https://www.glossier.com/products/milky-jelly-cleanser
**Above-fold composition:** Gallery LEFT, portrait-oriented imagery, carousel with chevron nav + play/pause slideshow controls + modal expansion.
**Buy box sequence:** Product name "Milky Jelly Cleanser" → eyebrow "Conditioning face wash" → "Coming soon" descriptor badge → size selector toggle (177 mL / 60 mL) → **purchase-mode radio** (One-time vs Subscribe & save 10%) → subscription frequency dropdown (monthly through 5-month) → price "$24" → full-width CTA "Add to bag $24" → quantity selector with "Limited to 20 per customer" → secondary "Notify me $24" when out of stock.
**Product name typography:** Sentence case sans, no italic. Glossier's brand is the wordmark + millennial-pink, not type drama.
**Price treatment:** Single `$24` with **10% subscription discount surfaced via radio**. No strikethrough. Subscription is paired with a frequency dropdown — fully exposed above fold.
**Add-to-cart button:** Copy **"Add to bag $24"** — price baked INTO the button. Full-width. Secondary state is "Notify me $24" when 177 mL is OOS — keeps the price visible even when buying is blocked.
**Trust microcopy near CTA:** **Long single-line attribute string** — "Dermatologist-tested, vegan, non-comedogenic, formulated without fragrance, ophthalmologist tested, suitable for sensitive eyes and contacts lens wearers." Plus subscription reassurance: "Never run out of your favorite essentials / Reschedule, skip or cancel anytime!"
**Trust-pill row above fold:** "Coming soon" + "Out of stock 177 mL" + subscription benefits with "Learn more" link. Glossier uses chip slots for inventory/availability state, not formulation claims.
**How-to-use UX:** Numbered list with **AM / PM split** — AM: "Massage 1-2 pumps onto wet skin and rinse" / PM: "Apply 2-3 pumps to dry skin and gently massage away makeup (it's eye area safe!)" Plus accompanying demo images with captions ("Nancy cleanses with Milky Jelly Cleanser…").
**Ingredient block UX:** Expandable "Full ingredients list" → five hero ingredients with descriptive copy (Rose Water, Comfrey Root Extract, Xylitol, Pro-Vitamin B5…) → INCI dump below. No percentages.
**Clinical-claim format:** **None.** No %, no N, no duration. Glossier uses benefit-driven descriptors ("Nourishing," "Soothing") only. This is the inverse of COSRX / Bader / Tatcha and consistent with Glossier's "for skin, not for charts" positioning.
**FAQ pattern:** Not surfaced in the extracted source — likely below fold.
**Cross-sell:** "YOU MAY ALSO LIKE" — 16+ product grid mixing categories (cleansers, treatments, sunscreen, serums, lip products). Card has thumbnail, name, descriptor, price, "Add to bag" or "Notify me," "See details" link, promo badges ("Coming soon," "Top-rated," "Best Seller," "30% off in cart," "Extra 30% off").
**Distinctive PDP element worth stealing:** The **AM/PM split in the how-to-use block** and the **price inside the CTA copy** ("Add to bag $24"). Both are tiny, but the second one is genuinely smart for COD markets — customer never has to scroll back to confirm what they're committing to before the tap.

### 8. Aesop — Parsley Seed Antioxidant Intense Serum

**URL:** https://www.aesop.com/… (Cloudflare 403). Sourced from Nordstrom + Space NK mirrors.
**Above-fold composition:** Gallery LEFT, ~582×582 square (Space NK) or 780×1196 portrait (Nordstrom). Aesop's own site is famously minimal — single hero plus a screw-cap refill thumbnail option.
**Buy box sequence (Nordstrom mirror):** Product name "Parsley Seed Antioxidant Intense Serum" → eyebrow "Aesop" brand link → descriptor "A potent antioxidant serum" → size "2 oz" → price "$93.00" → CTA "Add to Bag" → wishlist link → trust lines ("Free returns anytime" / "Sold by Nordstrom" / rating + members shipping callout).
**Buy box sequence (Space NK mirror):** Brand+name combined → SKU eyebrow → price `£75.00` → size `60ML` → "Choose 2 free samples at checkout" → black full-width "Add to Bag" → "Notify Me" / "Buy in app" / "Find in Store" alternates.
**Product name typography:** Per the Nordstrom mirror, the name is rendered "in large serif font" — this is the one brand where the H1 itself is serif (and matches Aesop's wordmark). On Aesop's own site (per public screenshots) the type is the brand's signature serif throughout. **No italic** noted.
**Price treatment:** Single price, no strikethrough, no subscribe. Aesop deliberately doesn't run promotions — the brand's positioning rejects discount language.
**Add-to-cart button:** "Add to Bag," black, full-width (Space NK). On Aesop's own site historically the button is full-width black with white type.
**Trust microcopy near CTA:** "Choose 2 free samples at checkout" + free returns. Subtle. No fragrance-free claims because Aesop's products are aggressively fragranced — different category positioning.
**Trust-pill row above fold:** Sparse — rating ("3.9 stars (7)"), loyalty/NDULGE benefits, shipping callout. **No formulation-attribute pill row** at all. Aesop is the most pill-free PDP of the 8.
**How-to-use UX:** Prose, single sentence — "Morning and evening, dispense into the hands, and massage into freshly cleansed and toned skin." No numbered steps, no icons, no video. The shortest how-to-use of any brand here.
**Ingredient block UX:** Full INCI list in an expandable section — "WATER (AQUA), GLYCERIN, NIACINAMIDE…" — no hero cards, no percentages, no callouts. Aesop trusts the customer to read.
**Clinical-claim format:** **None.** No %, no N. Benefits stated as plain bullets: "Antioxidant-rich formula" / "Protects against airborne pollutants." Aesop is positioning-led, not data-led.
**FAQ pattern:** Not surfaced. Aesop pushes detail to the dedicated Library content (long-form articles) rather than embedding Q&A on the PDP.
**Cross-sell:** Space NK shows "Perfect pairing" — Aesop Sublime Replenishing Night Masque + total + "Add Both to Bag." On Aesop's own site, cross-sell is usually a recommended ritual of 2-3 products.
**Distinctive PDP element worth stealing:** The **absence**. The willingness to skip the pill row, skip the clinical-claim block, skip numbered steps. Aesop proves the PDP doesn't HAVE to be a wall of badges — when the brand promise is strong, a single sentence and a clean INCI is enough. Clarté should not copy this wholesale (different market, different proof bar), but should remember: more chrome ≠ more conversion.

## Cross-cutting patterns

Patterns extracted from comparing all 8 PDPs:

1. **Gallery sits on the LEFT in 7 of 8 brands.** Only Aesop's own site (per public reference) places it differently in some viewports. Buy box right. This is the default for a reason — eye-tracking research on Western e-comm has been consistent on this for years. Clarté's current `grid-cols-1 lg:grid-cols-2` with gallery first matches. Don't experiment here.

2. **Square 1:1 aspect dominates for the main image.** Tatcha is explicit 1:1, COSRX / EltaMD / DE / COSRX / Glossier read as roughly square or portrait. Bader and Aesop go portrait. **Avoid landscape** — it crops weirdly on mobile and lies about product size.

3. **Buy box sequence — the consensus order:** `eyebrow → name → descriptor → size selector → price → CTA → trust microcopy`. Exceptions: Bader inverts price-before-size, EltaMD merges promo into the CTA. **Glossier and DE put the variant/subscribe radio ABOVE the price** because price changes with the variant. Clarté's PDP currently has eyebrow + ProductTitle italic + descriptor in the right order, but verify size/variant selector position if SKUs ever ship multi-size.

4. **"Add to Bag" beats "Add to Cart" 6-2.** Tatcha, Bader, DE, Glossier, COSRX (Aesop on own site), Aesop on Space NK all use "Add to Bag." EltaMD uses "Add to Cart" (with a promo "& Save 20%"). COSRX uses "Add to Cart." For Clarté: "bag" feels more retail-fashion, "cart" feels more functional — given the dermatologist-led positioning, "Add to bag" reads slightly more elevated. Either works; pick one and use it everywhere (the inconsistency between header drawer label, button, and confirmation copy is what causes confusion).

5. **Full-width CTA wins in 6 of 8.** Only COSRX and possibly Aesop's own site break this. On mobile, full-width is non-negotiable — thumb reach.

6. **Clinical claims use the `% + descriptor / N=X / duration / methodology` four-part format** in every brand that runs them (Bader, Tatcha, DE, COSRX, Dr.Jart+). The strongest implementations (COSRX, Dr.Jart+) use **one trial, one cohort, one timeframe, multiple claims** — not mixed cohorts. Avoid Bader's "N=30 over 4 weeks for one claim, N=107 over 12 weeks for another, perception study mixed in" — it scans as unfocused.

7. **Hero-ingredient cards beat full-INCI walls.** Every brand uses 3-5 hero ingredient cards above the full INCI dump. EltaMD and COSRX add **percentages** to the hero card — this is the credibility upgrade. Most don't disclose %. Clarté already does sample-size ingredient cards — keep, and add % where actives are dosed at meaningful concentrations.

8. **"How to use" splits cleanly into two camps:** numbered list (Bader, EltaMD, COSRX, Glossier) vs prose (Tatcha, DE, Aesop). Numbered is more conversion-friendly because it visually commits to a small task; prose is more brand-led. Bader adds a duration timer per step (45s) and Glossier splits AM/PM — both are upgrades on the baseline.

9. **Cross-sell is "your routine" not "you may also like" in the strongest examples.** Tatcha's "Suggested Ritual," COSRX's "Glass Skin Routine Guide," DE's "Make your smoothie" all frame the cross-sell as *the routine this product belongs to*. Glossier and Aesop fall back on generic "you may also like" grids. Routine-shaped cross-sell drives higher AOV.

10. **Subscription is increasingly surfaced ABOVE the fold, with frequency exposed.** Bader (auto-replenish with 20% off + 3-cycle minimum disclosed), Glossier (radio + frequency dropdown), DE (BNPL only). For Clarté (Pakistan, COD only), subscribe is moot — but the **purchase-mode radio pattern** could be repurposed for "single product vs full protocol bundle" decisions, which is a Clarté-specific opportunity.

11. **Trust-pill density varies wildly.** EltaMD has 7 pills, Tatcha has 3-4, Aesop has zero, Glossier folds them into a single prose line. The pattern: **clinical/dermatologist-led brands use pills heavily, lifestyle/luxury brands minimize them.** Clarté should sit closer to EltaMD's pill density given the dermatologist-led positioning — but keep the pills BRAND-RELEVANT (dermatologist-formulated, fragrance-free if true, non-comedogenic) and not generic "vegan/cruelty-free" filler.

12. **FAQ is universally an accordion** when present (Bader, Tatcha, COSRX, DE). Clarté's shadcn Accordion is the right primitive. ~6-8 questions is the sweet spot.

## What's worth stealing for Clarté MD PDP

Each bullet names the file or component to touch.

1. **Add a per-step duration to the how-to-use list** in `components/product/ProductDetailPage.tsx` — extend the numbered steps with a small mono-tagged duration ("30s" / "1 min" / "until absorbed"). Bader's 45-second timer is the move. Pairs with the existing JetBrains Mono eyebrow treatment. Tiny code change, high perceived effort.

2. **Reshape the cross-sell from "You may also like" into "Your full protocol"** — instead of `related` products from the same category, surface the 3-4 products of the protocol bundle this SKU belongs to (cleanser → treatment → moisturizer → SPF). Pattern from Tatcha "Suggested Ritual" + COSRX "Glass Skin Routine Guide." Edit `ProductDetailPage.tsx` "related" section to query by protocol_slug, not by category.

3. **Add clinical-claim methodology footnote — but only after a real study runs.** Pattern from COSRX: name the lab, name the date range, name N. Until Clarté has a real trial, KEEP the claim block empty rather than backfilling with weak language. The memory note on unverified claims is load-bearing — better silence than fake numbers. When a trial does happen, the design slot is the format: "N=20, [Lab Name], Karachi, [date range]."

4. **Bake the price into the CTA copy.** Glossier's "Add to bag $24" pattern. In `ProductDetailPage.tsx`, change the Button child from "Add to bag" to `Add to bag — Rs. {price.toLocaleString('en-PK')}`. Especially valuable on COD where price re-confirmation reduces order-cancellation rate. Two-line wrap on mobile is fine.

5. **Add a "fit" microcopy line below the CTA.** EltaMD's "Works best on fair, light, medium light or medium skin tones." Clarté equivalent: "Best for combination + oily skin types prone to congestion" or "Best for melanin-rich skin showing post-acne marks." Sets expectation before purchase. Lives in `PRODUCT_CONTENT` as a new `bestFor` string.

6. **Add a hero-ingredient PERCENTAGE chip on cards where the active is dosed.** Pattern from COSRX (96% snail filtrate, 1,000 ppm sodium hyaluronate) and EltaMD (5% Niacinamide). Clarté already has hero ingredient cards — adding a mono-tagged `%` to clinically-dosed actives (5% Niacinamide, 10% Azelaic Acid, 2% Salicylic Acid, etc.) elevates them from "marketing card" to "spec sheet." Edit the ingredient-card component to accept an optional `concentration` prop.

## What to avoid

1. **Don't mix N values across claims.** Bader's "N=30 for one claim, N=107 for another" reads as cherry-picking. If Clarté ever surfaces clinical, use ONE trial, ONE cohort, multiple claim rows (COSRX / Dr.Jart+ format).

2. **Don't copy Glossier's million-tile "You may also like" grid.** With Clarté's catalog of 8 SKUs, a 16+ tile cross-sell grid would expose the catalog's smallness. Stay with the 3-4 protocol-shaped cross-sell pattern.

3. **Don't lift "deluxe sample with every order over $X" or "free shipping over $Y" copy** — Clarté is flat Rs. 250 shipping by deliberate policy (memory: feedback_unverified_claims). Bader, Tatcha, and DE all use threshold-shipping language; do not port it.

4. **Don't put fragranced / synthetic-fragrance-free as a pill if any product contains fragrance.** EltaMD can run "fragrance-free" because UV Clear genuinely is. Tatcha runs "formulated without synthetic fragrance" carefully because it uses natural fragrance. Pill copy must be claim-by-SKU true, not template-pasted.

## Sources

- https://augustinusbader.com/us/en/the-rich-cream — Bader Rich Cream PDP (direct fetch)
- https://www.tatcha.com/products/the-dewy-skin-cream — Tatcha Dewy Skin Cream PDP (direct fetch)
- https://eltamd.com/products/uv-clear-broad-spectrum-spf-46 — EltaMD UV Clear PDP (direct fetch)
- https://www.drunkelephant.com/products/protini-polypeptide-cream — Drunk Elephant Protini PDP (direct fetch)
- https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence — COSRX Snail 96 PDP (direct fetch)
- https://www.glossier.com/products/milky-jelly-cleanser — Glossier Milky Jelly Cleanser PDP (direct fetch)
- https://www.drjart.com/cicapair — Dr. Jart+ Cicapair range (WebSearch summary, direct fetch 403)
- https://shop.aesop.com/us/p/skin/serums/parsley-seed-anti-oxidant-serum/ — Aesop own site (403 Cloudflare)
- https://www.nordstrom.com/s/parsley-seed-antioxidant-intense-serum/6432446 — Aesop via Nordstrom mirror
- https://www.spacenk.com/us/skincare/treatment/serums/parsley-seed-intense-serum-MUK200039171.html — Aesop via Space NK mirror
- https://www.waywardblog.com/skincare-review-dr-jart-cicapair-tiger-grass-color-correcting-treatment/ — Dr. Jart+ review corroboration
- C:\Users\786\Downloads\Dr Ahmad clartemd\Dr Ahmad clartemd\components\product\ProductDetailPage.tsx — current Clarté PDP baseline
- C:\Users\786\Downloads\Dr Ahmad clartemd\Dr Ahmad clartemd\.claude\agents\skincare-ux-researcher.md — quality bar
