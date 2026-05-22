# Sulwhasoo

**URL:** https://us.sulwhasoo.com/ (international: https://int.sulwhasoo.com/)
**Positioning:** Amorepacific's flagship luxury Korean skincare house; ginseng-led "Asian beauty wisdom"; US prestige tier roughly $60-$400 (e.g. The Ultimate S Cream at $208, reduced from $260).
**Why study them:** They are the canonical example of building credibility through *heritage* rather than clinical-trial data. For Clarté MD — which leans clinical but wants warmth — Sulwhasoo's typography rituals (serif logo + amber accents + hangul/hanja flourishes) show how to add cultural depth without going chibi or kitsch.

## Quick take
Sulwhasoo treats the site like a museum vitrine: white/cream voids, generous spacing around hero products, an amber-gold accent that is used almost only on the wordmark and one or two ritual moments. The site refuses the K-beauty "10-step routine + emojis + countdown timer" reflex; instead it organizes products by *collection lineages* (First Care, Concentrated Ginseng, The Ultimate S, Timetreasure) so the customer journey is "which lineage do you belong to," not "what does your shopping basket need."

## Visual / branding

### Color
- **Cream / ivory** (`#F8F4EC`-ish, not extractable from compressed CSS) is the dominant ground tone, sitting under both nav and hero. White is reserved for product cards and modal surfaces; cream is the "luxury matte" backdrop.
- **Amber/gold** is the brand accent. It is used on the serif wordmark and on a small set of ritual flourishes (gift-wrap promo "Jihambo," seasonal banners). It is NOT used on CTAs — buttons stay black-on-white. This is unusual: most luxury sites would over-apply gold; Sulwhasoo lets the gold be precious by withholding it.
- Black for typography. No dark mode. No glassmorphism. Surfaces are flat, with very subtle drop shadows on product cards.

### Typography
- The wordmark itself is a custom serif rendered in amber. The header replicates that serif tone in menu labels for collection lineages (FIRST CARE, CONCENTRATED GINSENG, THE ULTIMATE S, TIMETREASURE) — these collection names are set in **all-caps serif with wide tracking**, while utility nav (CART, ACCOUNT, ROUTINE FINDER) is sans-serif. That serif/sans split is the entire system: serif = brand, sans = utility.
- Hangul + hanja appear *as ornament*, not as primary text. The "Jihambo" gift-wrap callout is shown with a Korean character mark alongside the romanization (`us.sulwhasoo.com/`). The hanja character "雪" (snow, from "Sul-wha-soo" = "snow flower water") appears as a heritage glyph on the int.sulwhasoo.com homepage as part of brand-mark moments. **This is the move Clarté should study most:** native script used as a *seal* or *crest* on a hero, not as body copy.
- All-caps used heavily for collection names and promotional bands ("20% OFF SITEWIDE"). Body copy is sentence-case sans for legibility.
- No mono font detected — the brand reads as serif-led, sans-supported.

### Photography & imagery
- Product shots are silhouette-style: jar or bottle dead-center on a cream or marbled surface, lit from one side so the bottle has *one* highlight. No flat-lay clutter. No model-with-product. The product is treated like a piece of jewelry.
- Lifestyle imagery (when present) leans into ritual: hands holding the jar, a wooden spoon scooping cream, no faces, no expressions. The customer projects herself in.
- Ingredient imagery: cross-section illustrations of ginseng root, lotus root — botanical-textbook style, drawn rather than photographed. This sells the herbal-medicine heritage without sourcing literal lab imagery.

### Hero composition
- Centered, full-bleed cream backdrop, product-as-hero in the middle, a single line of serif headline above, a single sans-serif sub-line below, one black CTA underneath. Example carousel copy: "Visibly healthy, youthful-looking skin now and over time" / "Resilient and rejuvenated every hour, every moment" / "Revitalize your skin for a healthy, youthful complexion." All run-on but rhythmic.
- The seasonal promo band (`#1` carousel slide) is the *only* place urgency lives: "20% OFF SITEWIDE — Save on warm weather rituals. Promotion ends 5/26/26 11:59 PM ET or while supplies last." Note "rituals," not "deals."

### Motion / interaction texture
- Hero is a soft fade-carousel (no aggressive slide). Hovering a product card produces a quiet image swap to a second angle, no zoom or lift.
- Mega-menu opens with a delayed fade, not a snap. The pace of the whole site is slower than COSRX/Beauty of Joseon by design — to feel "spa, not shop."

## UX patterns worth studying

### Navigation
- Top nav uses *lineage names* as the primary spine: First Care → Concentrated Ginseng → The Ultimate S → Timetreasure → UV → Men's. This is wildly different from the typical "Cleanser / Toner / Serum / Moisturizer" type-based nav (which is also present, one level deeper).
- Secondary spine: by Concern — "Dirt & Impurities," "Dryness," "Dullness," "Fine Lines & Wrinkles," "First Signs of Aging," "Advanced Signs of Aging," "Uneven Texture," "Sun Protection." Note the doubled wrinkle entries: "First Signs" vs "Advanced Signs" — finer-grained than most sites.
- Mobile collapses the mega-menu into a hamburger with section disclosure. The lineage spine stays primary.

### Product listing
- Collection grid uses 1080x1080 product images on cream cards, with the lineage name as a header strip above. Cards show product name, benefit descriptor ("Visibly Firm & Lift"), original + sale price (when promo active), and a small "Quick Add" — but the dominant CTA is the image itself, which routes to the PDP.

### PDP
- Above the fold: full-width gallery (cream backdrop, large product hero), then a right rail with: product name in serif, the lineage badge (e.g. "Concentrated Ginseng"), benefit copy, size variant chips (50ml / 30ml), price (with strikethrough when on promo), black "ADD TO BAG" CTA.
- Below the fold: a structured ritual narrative — Ingredient Story (Ginsenomics™, Ginseng Peptide™) → Clinical proof ("96% agreed skin feels smoother" and "93% agreed skin feels more elastic and resilient" after 6 weeks daily use) → 4-step routine recommendation with companion products → FAQ → reviews.
- The trust line "#1 anti-aging cream for 10 consecutive years in Korea" (cumulative sales 2015-2024) sits between hero and ingredient story. It is a *sales-data* trust line, not a clinical claim — interesting for Clarté: third-party validation that doesn't require a study.

### Cart / Checkout
- Could not fully reach checkout. Cart drawer model. "Free Shipping Over $35 & Free Samples On All Orders!" sits at the top of the drawer. Free-sample selection happens *inside* the drawer as a curated 2-3 sample picker — a great trust moment but operationally heavy.

### Quiz
- Routine Finder is gated to a JS-rendered widget (not server HTML), so couldn't reach interior steps. The entry CTA is "Find your perfect routine" — discreet, not aggressive.

### Trust / social proof
- Heritage > clinical. "Inspired by Korean herbal heritage." Sales-rank trust ("#1 for 10 years"). Percent-agree consumer surveys at 96/93/89%. No dermatologist name. No press-logo wall.
- No before/after gallery — the brand stays away from that aesthetic because it'd feel clinical-not-luxury.

### Mobile-specific patterns
- Sticky bottom "ADD TO BAG" on PDP. Hamburger nav. Carousel becomes single-card swipe with thin dots.
- Image lazy-load, no skeleton — the cream backdrop hides loading state naturally. **Clever pattern for slower PK networks.**

## What's worth stealing for Clarté MD

1. **Lineage-based nav** for the protocol pages. Instead of Clarté's current "Acne / Pigmentation / Renewal / Barrier" flat list, treat each as a *lineage* with its own collection landing page styled to its protocol. Apply to: `app/(site)/page.tsx` mid-section + the four protocol pages (`app/acne/page.tsx` et al.). It reinforces the "protocol-led brand" position without needing more SKUs.

2. **Native-script mark as a seal, not body copy.** If/when Clarté adds Urdu, use a single Urdu mark (e.g. "صفائی" / clarity) as an *ornament* on hero or section dividers — the way Sulwhasoo uses 雪. Never set body copy in Urdu unless fully translated. Apply to: hero of homepage + protocol page section dividers.

3. **Withhold the accent.** Right now Clarté's cobalt is on every CTA. Sulwhasoo proves restraint is more premium: keep cobalt for the *brand* moments (wordmark, key trust badges, the "Dermatologist-led" eyebrow), but let CTAs be navy-on-cream or solid-black. Apply to: design-system overhaul Phase 0 (theme tokens) — define `accent-restrained` and `cta-default` separately.

4. **Sales-rank trust line, not clinical claim.** Sulwhasoo's "#1 cream for 10 consecutive years in Korea" sidesteps GMP/ISO claims and still lands. For Clarté: once protocol-bundle sell-through data exists, swap any unverifiable claim for a real sales-rank or "X customers in 6 months" line. Apply to: PDP buy box + homepage hero subline.

5. **Serif = brand, sans = utility split.** Clarté already has Fraunces + Plus Jakarta — formalize this as a rule: serif on lineage names, hero headlines, and brand-mark moments; sans for nav utilities, body, prices. Apply to: Phase 0 type-scale audit.

6. **Cream not white.** Sulwhasoo's cream ground reads warm-luxurious where pure white reads sterile. Clarté already has "off-white" in brand tokens — push it 5-10% warmer toward `#F8F4EC` on protocol page surfaces. Apply to: Phase 0 surface tokens.

## What to avoid

- **The price ceiling.** Sulwhasoo's $200+ creams justify the cream-and-gold treatment. Clarté at Rs. 4799-7999 cannot afford to feel "too precious to touch" — it would tip from clinical-with-warmth to inaccessible. Use Sulwhasoo's *restraint*, not its *opulence*.
- **Free-sample selection in cart.** Operationally infeasible for COD-fulfilled PK shipping.
- **Lineage names that require explanation.** "First Care," "Timetreasure" only work because Sulwhasoo has 50+ years of brand equity. Clarté should keep protocol names plain English (Acne, Even-Tone, Renewal, Barrier) and add visual lineage *treatment*, not lineage *vocabulary*.
- **Gift-with-purchase thresholds** ($300 = travel ritual set, $400 = full-sized mask) — Clarté has flat Rs. 250 shipping and no threshold per brand memory; do not lift this pattern.

## Sources
- https://us.sulwhasoo.com/ (homepage, partial render)
- https://us.sulwhasoo.com/collections/all (collection structure)
- https://int.sulwhasoo.com/ (international site, hero copy)
- https://www.apgroup.com/int/en/brands/sulwhasoo.html (Amorepacific brand page)
- WebSearch context for typography + heritage positioning (Awwwards trends, Amorepacific brand notes)
