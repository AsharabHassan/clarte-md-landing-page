# Beauty of Joseon

**URL:** https://beautyofjoseon.com
**Positioning:** Mass-accessible "Authentic Hanbang Korean Skincare" — heritage-coded but priced at $11-$25; flagship products like Relief Sun rice-probiotic SPF and Dynasty Cream; community-led K-beauty challenger that outranked Glow Recipe + Cosrx in US Amazon SPF for two years running.
**Why study them:** Closest model in the segment to Clarté MD's *actual* price band and traffic mix. They prove you can pull *heritage credibility* into a mass-accessible price band without going luxury. Their ingredient-as-navigation system ("Find Your Perfect Hanbang Match") is the cleanest example in K-beauty of leading with ingredient story rather than product type.

## Quick take
BoJ runs a Shopify-classic structure but reskins it with a heritage-aware art direction: warm gold accents on cream, illustrated ingredient icons rather than lab photography, and a navigation system that asks you "Which ingredient?" not "Which SKU?" The site does not pretend to be a luxury brand — it carries discount badges, countdown timers, and a rewards program — but the *visual restraint* keeps it premium-feeling at $15 SPF prices. This is the exact tightrope Clarté is walking.

## Visual / branding

### Color
- **Off-white / soft cream** background (not pure white) across hero, cards, and sections.
- **Warm gold / brass** as a primary accent — visible on the wordmark, on ingredient-tile borders, and on some CTA strokes. Less yellow than Sulwhasoo's amber; closer to a desaturated honey.
- **Muted sage / herbal green** for ingredient-collection callouts (especially the Green Plum collection banner).
- **Charcoal/black** for body copy. No dark mode.
- Discount/promo badges sit in a contrasting warm gold pill — not jarring red — keeping urgency on-brand. Hex values not directly recoverable from rendered HTML.

### Typography
- Sans-serif primary across the board (specific family not exposed in markup; reads like a Pretendard / Inter / Pretendard-Std stack).
- **All-caps for top nav** ("SHOP | FLASH SALE | BEST SELLERS | BOJ REWARDS | ABOUT | TAKE SKIN QUIZ | NEED HELP?") — minimal letter-spacing, modest weight.
- **No serif display face** in the live site as fetched — surprising given the heritage positioning. They lean on imagery + ingredient illustrations to carry the historicism rather than a serif type voice. **This is a meaningful constraint for Clarté:** BoJ proves you can do "heritage" without a serif if your imagery is strong; Clarté already has Fraunces, so it can stack both signals.
- No Hangul / Hanja in primary nav or PDPs. Korean text appears only in legal/footer regions and ingredient names where transliteration is contextual ("Hanbang"). Same lesson as Sulwhasoo but lighter: native script as flavor, not body.
- No mono font detected.

### Photography & imagery
- **Product photography**: Clean white-ground hero shots paired with in-context lifestyle (hand holding tube, dropper mid-pour). Lighting is soft, even, slightly warm-tinted — consistent across the catalog. The bottle is always centered and singular.
- **Ingredient illustrations**: The ingredients page (`/pages/ingredients`) uses **illustrated icons** of ginseng root, mugwort, propolis, green plum, red bean, green tea, centella, rice — drawn in a flat, two-tone botanical style. Mobile swaps icons for lifestyle photography of each ingredient. This split is intentional: illustrations for desktop scan, photos for mobile emotional weight.
- No model portraits dominate. No before-after gallery on the storefront (might exist in user-generated reviews but not surfaced in nav).
- No doctor / dermatologist portraits anywhere. **Important:** BoJ is *not* a derm-led brand and doesn't pretend to be.

### Hero composition
- Carousel-based hero. Each slide is a full-bleed product lifestyle shot on the left with copy stack on the right:
  - Eyebrow (small all-caps): product family
  - Headline: product name ("Dayscreen Moisturizer")
  - Sub-headline: benefit ("Korean SPF Moisturizer — Hydrate & Protect in one step")
  - CTA: "SHOP NOW"
- Below hero: flash-sale strip with **live countdown timer** (DAYS / HOURS / MINUTES / SECONDS) and "Up to 35% OFF" label. Strong urgency, but visually small — runs the full width as a thin band, not a screamer hero.

### Motion / interaction texture
- Carousel arrows with text labels ("Previous / Next"). Quiet transitions.
- Ingredient tiles on the "Find Your Perfect Hanbang Match" carousel rotate horizontally with arrows; each tile is clickable to a filtered collection.
- No parallax, no scroll-jacking. Mobile-first restraint is evident — this site is built to load on weak networks.

## UX patterns worth studying

### Navigation
- **Top nav (7 entries)**: SHOP, FLASH SALE, BEST SELLERS, BOJ REWARDS, ABOUT, TAKE SKIN QUIZ, NEED HELP?. The ordering is unusual: BEST SELLERS *before* the loyalty program, and TAKE SKIN QUIZ *near the end* — implying the quiz is supportive, not the primary funnel.
- **SHOP mega-menu** has three columns:
  - "Shop All + Ingredients link" (a meta-link)
  - "By Product" (Sunscreen, Cleanser, Exfoliator, Toner & Essence, Serum, Moisturizer, Mask, Lifestyle)
  - "By Skin Concern" (Wrinkles, Acne & Breakouts, Pores & Sebum, Dullness & Uneven Tone, Sensitivity & Blemish, Dryness)
- The "**By Ingredient**" surface is broken out separately from "By Product" and "By Concern" — this third axis (ingredient) is the move Clarté should study. Most sites collapse ingredient into concern; BoJ keeps it independent so you can shop "I want centella" without first deciding "I have redness."
- Search has a "Clear" action — utilitarian.
- Mobile: hamburger drawer with collapsible sections, identical structure. Separate mobile/desktop image assets (`-_m.webp` vs `-_pc.webp`) — they ship different banner crops, not just one responsive image.

### Product listing / category
- Cards show: image, star rating + review count ("Rated 4.8 out of 5 stars, 2,152 Reviews"), product name + descriptor, variant chips ("1-Pack / 2-Pack / 50ml"), strikethrough + sale price ("Save 30% — $17.00 $11.90"), and "SHOP" CTA.
- Discount and "New" badges sit on the image at top-left.
- Reviews placement on the *card* (not just PDP) — a useful conversion lever; rated star count up front, full review widget deeper.

### PDP
- Couldn't directly reach the Relief Sun PDP (404 on the product handle tried), but card-derived inference matches K-beauty PDP standard: gallery left, buy box right with size chips, star rating + count, ingredient bullets, FAQ accordion, related-products carousel.
- Promo: "🎁 Revive Firming Moisturizer 1ml (100% off)" and "🎁 Calming Barrier Serum 1ml (100% off)" — sample add-ons triggered as "free gift" tiles inside cart, not auto-bundled. The customer self-selects.

### Cart
- Sticky free-gift unlocker bar: "UNLOCK FREE GIFTS 🎁" with thumbnail cards of 1ml samples and an "Add" button per gift. The gift emoji is the only emoji in the entire purchase funnel — used as a *marker*, not decoration.
- Implies a free-shipping threshold (Rewards copy mentions "free shipping" as a redemption tier).

### Checkout
- Not fully reached. Shopify-standard inferred. Newsletter signup uses hCaptcha — a privacy/security signal worth noting.

### Quiz / diagnostic
- Footer CTA: "Skin Quiz — Find your perfect routine in under a minute." The "under a minute" promise is the right framing — Clarté's AI analysis should make the same time promise prominently.

### Trust / social proof
- Star ratings inline on every product card.
- Heritage trust: "Inspired By Hanbang. Connected by Community." (homepage section header). "Time-honored ingredients … passed down for centuries from the Joseon Dynasty" on the ingredients page. They lean on *history* and *community* as trust, not on doctors.
- No "dermatologist-tested" / "clinical-trial" stamps surfaced anywhere on the site. **No science badges, no clinical certifications, no doctor credentials displayed at all.** This is *the* contrast with Clarté — BoJ leaves derm-credibility entirely on the table, which is exactly the gap Clarté can claim.

### Mobile-specific patterns
- Hamburger with section disclosure; separate mobile banner assets; full-width sliders; sticky cart icon. Sample add buttons collapse into a horizontal carousel inside the drawer.

## What's worth stealing for Clarté MD

1. **"By Ingredient" as a third nav axis.** Add ingredient pages alongside protocol and concern: e.g. `/ingredient/niacinamide`, `/ingredient/azelaic-acid`. Apply to: site header mega-menu + new ingredient landing pages. This drives long-tail SEO for "azelaic acid Pakistan" type queries, and lets Clarté lead with ingredient education in a market where ingredient literacy is rising.

2. **Illustrated botanical icons for ingredients (desktop) + photography (mobile) split.** Replicate the desktop-icon / mobile-photo pattern. Apply to: PDP ingredient story sections + the new ingredient landing pages. Hand-drawn icons signal "we know this enough to draw it" in a way stock chemistry imagery cannot.

3. **Sample-as-free-gift in cart drawer, opt-in not auto.** The "🎁 Revive Firming 1ml — 100% off [Add]" pattern is brilliant because (a) it feels like a gift, (b) the customer chooses, (c) it's operationally a sample SKU. Apply to: Clarté cart drawer once Clarté has 1-2 sample-size SKUs. Bridges from one-protocol purchase to cross-protocol awareness.

4. **Inline star rating on product cards.** Currently Clarté shows trust copy on PDP only. Adding aggregate-rating + review-count to the `<ProductCard>` raises grid CTR. Apply to: `components/ProductCard.tsx` once review volume hits 10+ per SKU.

5. **"Time-promise" on quiz CTA.** "Find your perfect routine in under a minute." Clarté's AI skin-analysis CTA should make the same time promise — "Get your protocol in 60 seconds." Apply to: homepage hero CTA + sticky mobile CTA.

6. **Discount badge in warm gold pill, not red.** Promo doesn't have to feel cheap. Clarté's eventual discount tags (Eid sale, etc.) should adopt a warm-cobalt pill, not red, to stay on-brand. Apply to: `<DiscountBadge>` component in the Phase 0 design tokens.

## What to avoid

- **No-doctor positioning** — BoJ leaves derm-credibility unclaimed; that gap is Clarté's edge, so Clarté should *not* mute its doctor-led message to chase a BoJ aesthetic.
- **Countdown timer with seconds-tick** — feels low-trust; conflicts with Clarté's clinical tone. Use date-based "Sale ends May 26" wording instead.
- **Heritage as primary positioning** — "Hanbang" works because it's culturally specific to Korea. Clarté's analog isn't "Yunani" or "Unani" — that pulls toward folk-medicine framing which actively *undermines* a derm-led brand. Stay clinical-first.
- **"BOJ Rewards / gems / referral 20% off"** — multi-tier loyalty programs add ops complexity Clarté can't yet afford and don't fit COD-only flows.

## Sources
- https://beautyofjoseon.com (homepage, full render)
- https://beautyofjoseon.com/pages/ingredients (ingredients page)
- https://beautyofjoseon.com/blogs/news/beauty-of-joseon-brand-story (brand story, via WebSearch)
- https://beautyofjoseon.com/collections/key-ingredients (ingredient collection structure)
- https://beautyofjoseon.com/pages/faq-products (FAQ structure)
