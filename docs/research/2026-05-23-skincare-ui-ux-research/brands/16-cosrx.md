# COSRX

**URL:** https://www.cosrx.com
**Positioning:** "Ingredient-first" K-beauty cult brand; mass-accessible ($9-$25 essence band); famous for the Advanced Snail 96 Mucin Power Essence (46M+ bottles sold). Self-described as "Always Authentic," "trusted by 13 million users worldwide." TikTok-driven distribution.
**Why study them:** COSRX's *naming convention* is the textbook example of ingredient-as-hero — every product name leads with the ingredient and its percentage ("Advanced Snail 96," "Snail 92 All-In-One," "5 PDRN," "6 Peptide Skin Booster"). For Clarté MD, which is building a clinical-credibility narrative on top of named actives, COSRX's labeling system is the most directly transferable asset in the entire research set.

## Quick take
COSRX runs an unapologetically conversion-optimized storefront — discount pills, badge stacks, "Selling Fast" labels, dual "View / Learn more" CTAs on every card — but underneath that retail layer there's a remarkably clean *ingredient-data* discipline. Product names carry the percentage. PDPs ship numeric efficacy callouts (+196.17% moisture, +35% radiance, -80% redness) with the testing lab named. Every card has at least one badge that classifies the product on a non-price axis (Trending / Tiktok Viral / MD's Pick / Dermatologist-tested). The brand vocabulary is "percent + ingredient + clinical proof" — exactly the spine Clarté wants to claim, dressed in a busier retail visual layer than Clarté should adopt.

## Visual / branding

### Color
- **White backgrounds, black text** — utilitarian and high-contrast for K-beauty mobile shoppers.
- **Teal / cyan accent** appears on CTA buttons and select badges.
- **Gold / amber** badges for discounts and trust markers ("20% OFF," "Trending," "MD's Pick," "Selling Fast").
- No dark mode. No glassmorphism. Surfaces are flat with very subtle shadows.
- Hex values not extractable from rendered CSS. The visual identity is *retail-clean*, not luxurious.

### Typography
- Sans-serif system across the board (family not exposed). Looks like a Pretendard / Inter / generic-Korean-modern stack.
- **All-caps for navigation labels** ("HELP," "SHOP") and **all-caps for promotional headers** ("EXPECTING TOMORROW"). Body copy in sentence case.
- **Numerical emphasis is the typography signature**: percentages and "+/-" deltas are weighted heavy/bold within otherwise medium-weight body. Examples from the Snail 96 PDP: "+**196.17%** increase in skin moisture," "+**35%** increase in natural glow and radiance," "-**80%** reduction in visible redness." The percent is the hero of the sentence.
- Product titles include bolded numeric callouts inline: "Advanced Snail **96** Mucin Power Essence." The 96 is visually distinguished from the rest of the title.
- No serif display face. No mono font.

### Photography & imagery
- Product hero shots: clean white-ground bottle with a single soft shadow, paired with one or two alternative angles (cap-off, dropper-pull, texture swatch).
- Lifestyle photography is heavy on application gestures (dropper near cheek, hands rubbing essence). Faces appear but are non-celebrity, mostly K-beauty-coded young Asian models.
- **No before-after gallery** in the storefront I could reach — clinical claims live in numbers, not in faces.
- Ingredient/texture photography is unusually good: macro shots of essence drops on a glass surface; cross-section illustrations on the routine-builder pages. This *texture-as-content* approach is replicable.

### Hero composition
- Carousel hero with promotional copy:
  - "☀️ Sun Care: 20% off singles | 25% off sets"
  - "🚚 **Free Shipping** on **Blue Peptide X Bakuchiol Serum**"
- Emoji-prefix is used as the visual hierarchy *bullet* — small inline emoji prefix carries the meaning so the headline can stay short. **Clarté should not lift the emoji-prefix pattern** — it conflicts with the clinical voice. But the underlying technique (use a 1-character visual marker before each promo line) is sound; replace emoji with a small SVG icon.
- Below the hero, a "What's your skin concern?" set of 6 large concern buttons — concern-first entry, not type-first. This is COSRX's primary conversion funnel from anonymous traffic.

### Motion / interaction texture
- Carousel arrows ("Left / Right"). Soft transitions. Hover swap on cards. Nothing aggressive.
- Sticky cart bar at the top during scroll: "You are $30.00 away from free shipping" — copy updates dynamically. Strong conversion lever.

## UX patterns worth studying

### Navigation
- **Multi-axis discovery system** built into the top nav:
  - "What's your skin concern?" (6 concern buttons surfaced at the top of the page itself, not buried in menu)
  - "Start Here" dropdown (newcomer funnel)
  - "New" (recency)
  - "Value Sets" + "Skin Care" + "Hair & Body" (type-based)
  - Sub-navigation tabs inside each menu: **By Concern / By Product Type / By Ingredient**
- The triple axis (Concern / Type / Ingredient) matches Beauty of Joseon and is the *strongest* implementation in the segment. Ingredient sub-menu lists: "Peptide, PDRN, Snail Mucin, Rice, Ceramide, Vitamin C, Retinol, Niacinamide, Hyaluronic Acid, AHA/BHA, Explore More."
- Skin-concern sub-menu: "Acne, Fine Lines, Dryness, Pores, Dullness, Redness." Note "Dullness" + "Redness" as concerns — Clarté can map these to Even-Tone and Barrier protocols.

### Product listing / category
- Card layout: product image (hero + alternate angle thumbnail visible on hover), badge overlay top-left ("20% OFF," "Trending," "New Arrival," "Tiktok Viral," "MD's Pick"), product title, "From $X.00" price (price-range format because of multiple sizes), dual CTAs ("View" primary, "Learn more" secondary).
- **No star ratings on cards** — surprising given the size of the review corpus. Reviews live on a separate `/pages/reviews` index page and on PDPs. Decision is presumably aesthetic (keeps cards clean) and conversion-optimized (drives PDP click).
- Badges classify products on at least 5 dimensions: price status (20% OFF), velocity (Trending, Selling Fast), social proof (Tiktok Viral, MD's Pick), recency (New Arrival), credential (Dermatologist-tested, Non-comedogenic, Fragrance-free, Hypoallergenic). **Stack of 1-2 badges max per card** — disciplined despite the depth of the system.

### PDP (Advanced Snail 96 Mucin Power Essence as exemplar)
- Above fold: hero image gallery (10+ images including lifestyle, application, texture macro), product name + tagline ("K-Beauty Favorite Essence for Glass Skin"), New York Post 2024 "Most Wanted" award badge, 96% snail mucin descriptor.
- Buy box: price ($25.00), size options ("3.38 fl.oz / 100mL" and "1.01 fl.oz / 30mL"), stock status ("backordered" surfaced inline — useful honesty), payment-method icons (Apple Pay, Google Pay, Klarna), quantity selector, Add to Cart.
- Below fold structured as:
  1. **Clinical metrics block**: 3 numeric callouts (+196.17% / +35% / -80%) with attribution "All clinical studies were conducted by Dermacosmetic Skin Science Laboratory (Korea)." This is *the* pattern: percent + attribution.
  2. **Ingredient story**: "96% Snail Secretion Filtrate — Boosts skin radiance and visibly enhances skin clarity" + supporting ingredient bullets (Allantoin & Panthenol → soothes irritated skin; Hyaluronic Acid & Betaine → long-lasting deep hydration).
  3. **Concerns & Benefits table**: 5 skin issues × key ingredients × results. Includes testing date ("May 26 to June 10, 2025, on 20 adult participants") and methodology ("Visioscan/Glossymeter"). Bringing methodology into the buy decision is unusually rigorous.
  4. **FAQ accordion** (7 questions covering uniqueness vs competitors, mechanism, makeup compatibility, skin-type fit, results timeline, vegan status).
  5. **Ingredient list** (INCI-style, comma-separated).
  6. **"Your Glass Skin Routine Guide"** — 4-step bundle (Cleanser → Essence → Cream → Mask) with a "GET FULL ROUTINE NOW & SAVE 20%" CTA. **This is the protocol-bundle pattern Clarté already uses**, validated by COSRX at scale.

### Cart
- "You are $30.00 away from free shipping" sticky bar (do not copy — Clarté has flat shipping).
- Dynamic free-gift mechanic ("Free gift with purchase in cart app") — not lifting per brand memory.

### Checkout
- Surfaces Apple Pay, Google Pay, Klarna, Amex, JCB, Mastercard, Visa icons in the footer + cart — clear payment-trust pattern. Clarté's COD-only world needs the analog: surface "Cash on Delivery — Pay courier on arrival" as a *trust badge*, not as a payment-method afterthought. Apply on cart and checkout.

### Quiz / diagnostic
- "Your Skin, Your Answer" (`/pages/take-the-quiz`) and "R.T.P Routine" routine builder (`/pages/r-t-p-routine-builder`) both surfaced from the homepage. Two parallel funnels: a quiz for users who want to be guided, a routine-builder for users who want to assemble themselves. Worth considering for Clarté once the AI skin analysis is live: keep the AI-quiz as one path, and add a "build my protocol manually" path for users who already know what they want.

### Trust / social proof
- **Quantitative trust** is the brand voice: "over 46M bottles sold" (Snail Mucin), "trusted by 13 million users worldwide," "100% user agreement," "Clinically tested for 68 days on 87 participants." The format is "[big number] [users / bottles / participants]."
- **Award badges**: "2024 New York Post 'Most Wanted' Beauty Award," "2025 Shape Awards." Surfaced inline on PDP near the buy box.
- **Credential badges** surfaced as small pills under product hero on PDP: "Dermatologist-tested," "Non-comedogenic," "Fragrance-free," "Hypoallergenic." Each is a single word/phrase, not a paragraph.
- "Always Authentic" tagline with a verification link (`/pages/authentic`) — addresses the K-beauty counterfeit problem head-on. **Clarté should do the analog** for the Pakistan market where counterfeit fear is real: "Genuine Clarté MD — Verify your order" trust line.

### Mobile-specific patterns
- Hamburger toggle with text labels ("Toggle menu"). Sticky cart with free-shipping progress. Sticky header with search/account/cart.
- Payment-method icons displayed prominently in the mobile footer.
- Mobile-specific image asset variants implied by the asset URL patterns.

## What's worth stealing for Clarté MD

1. **Percentage-in-product-name convention.** Adopt "[Active] [%]" naming for the actives where Clarté can substantiate: e.g. "Niacinamide 10," "Azelaic 15," "Salicylic 2." This is the strongest ingredient-literacy signal in K-beauty and works in PK because educated buyers are searching for percentages directly. Apply to: PDP titles (`app/products/[sku]/page.tsx`), product cards (`components/ProductCard.tsx`), and the product seed data in `scripts/seed.ts`.

2. **Clinical metrics block on PDP (% + attribution).** Adopt the COSRX 3-number-stack pattern under the hero on PDP: e.g. "+82% reported smoother skin / +64% reduction in visible spots / -71% breakout frequency (panel of 30, 8-week use)." The attribution line is the make-or-break — Clarté can run a 30-user PK panel cheaply and have legally clean numbers. Apply to: PDP buy-box-adjacent strip + protocol page hero subline.

3. **Concerns & Benefits table with methodology.** The "Visioscan/Glossymeter" reference on COSRX is overkill for $25 essence — but for Clarté at Rs. 4799+ protocol prices, citing the *measurement instrument or methodology* lifts perceived rigor sharply. Apply to: PDP "How we tested" expandable below the clinical-metrics block.

4. **Credential-pill stack.** Replace any free-form trust copy on PDP with a horizontal row of 3-4 single-word pills: "Dermatologist-formulated," "Non-comedogenic," "Fragrance-free," "PK-formulated." Sits under the product hero, above the buy box. Apply to: `<TrustPills>` new component on PDP.

5. **Triple-axis nav (Concern + Type + Ingredient).** Match COSRX/BoJ — add an "Ingredient" axis to Clarté's nav. Apply to: site header mega-menu in the Phase 2 Header migration.

6. **"Always Authentic" → "Genuine Clarté MD"**: counterfeit fear is a real PK conversion blocker. A verification page + a small "Genuine — verify your order" badge near the buy box would address it. Apply to: PDP buy box + new `/genuine` verification landing page.

7. **Dual funnel (AI-quiz + manual routine-builder).** Once the AI skin-analysis ships, expose a parallel "Build my protocol" flow for users who already know what they want. Apply to: protocol pages + new routine-builder route.

## What to avoid

- **Emoji-prefix in promo headlines** ("☀️ Sun Care," "🚚 Free Shipping"). Clarté's clinical voice should use small SVG icons or no prefix; emoji reads as drugstore, not derm.
- **Five-badge stack per card** would visually shout for Clarté. Limit to one badge max per card (recency or social-proof) on Clarté's grid.
- **Free-shipping threshold copy** ("You are $30 away from free shipping") — Clarté is flat-fee Rs. 250 per brand memory; do not lift.
- **Free-gift-in-cart-app** mechanics — same.
- **"Clinically tested" without methodology** — COSRX pairs every clinical claim with methodology and panel size; if Clarté lifts the language without the data behind it, that's the GMP/ISO trap from brand memory.

## Sources
- https://www.cosrx.com (homepage, full render)
- https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence (Snail 96 PDP, full render)
- https://www.cosrx.com/pages/take-the-quiz (quiz entry)
- https://www.cosrx.com/pages/r-t-p-routine-builder (routine-builder entry)
- https://www.cosrx.com/pages/authentic (authenticity verification page)
- https://www.cosrx.com/pages/reward (rewards / reviews entry)
