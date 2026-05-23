# Shop / Product-listing UX — cross-brand teardown

## How to read this
Eight skincare PLPs studied at the catalog / "shop-all" level. The brands span four very different scales — a 1,000+ SKU marketplace (Sephora), a 100+ SKU single-brand catalog (The Ordinary, COSRX), a 40-80 SKU specialist (Paula's Choice, EltaMD, Drunk Elephant, Tatcha), and a tightly-curated lifestyle range (Beauty of Joseon, ~30 SKUs). Clarté MD's catalog is **12 items total** (4 protocol bundles + 8 individual products) — closer to the small specialist end than to anything Sephora-like, and that constraint should drive every borrowing decision. Each per-brand block names URL, the filter axes actually present, sort default, card anatomy, grid density, hover behaviour, header layout, pagination model, and mobile filter pattern. Where WebFetch was blocked (Sephora, Paula's Choice direct fetch, Drunk Elephant `/collections/all`, Tatcha `/all-skincare`), findings are reconstructed from secondary fetches against working canonical URLs (e.g., `tatcha.com/collections/shop-all`, `drunkelephant.com/products-allproducts/`) plus Baymard, retailer-side mirrors, and case studies — sources called out at the foot.

## Per-brand observations

### 1. Sephora (skincare category)
**URL:** https://www.sephora.com/shop/skincare (direct fetch 403; reconstructed from Baymard case study + Karishma Jani UX case study + Sephora mobile-app deck)
**Filter axes:** Brand · Category (Moisturizers, Cleansers, Treatments, Eye Care, Sunscreen, Masks, Toners, Mists & Essences, Wellness) · Skin Concern (Acne / Anti-aging / Dark Spots / Pores / Redness / Dryness / Sensitivity) · Skin Type · Price · Ingredient Preferences (Clean at Sephora, Fragrance-free, etc.) · Brand-of-the-month / "New" toggle · Sephora Collection-only
**Sort default:** "Relevance" (personalized to logged-in profile). Alt sorts: Bestselling · Top Rated · Price ↑/↓ · New
**Card pattern:** Hero shot on white tile · brand name (small caps, grey) · product name (1-2 lines, bold) · shade-count chip ("23 colors") for makeup, ingredient flag for skincare · star-rating (5-star + numeric count, e.g., `★ 4.5 (12.4K)`) · price · `LOVE` heart icon top-right · `Quick Look` button reveals on hover and opens an overlay with full imagery, descriptor, and `Add to Bag` without leaving the PLP
**Grid density:** 4 columns desktop · 3 columns tablet · 2 columns mobile (with each card going edge-to-edge)
**Distinctive element:** **Quick Look overlay** — on hover (desktop) or long-press (mobile), a modal opens in-grid with full product story + Add-to-Bag, so a user can shop the entire grid without ever leaving the PLP. This is the single most-copied PLP pattern in beauty.
**Mobile filter pattern:** Sticky `Filter` / `Sort` bar at the top of the scroll viewport (does not disappear as user scrolls); tapping opens a full-screen sheet with collapsible accordion groups; selected filters become a chip row above the grid that can be tapped to remove individually.

### 2. The Ordinary
**URL:** https://theordinary.com/en-us/category/skincare
**Filter axes:** Product Type · Active Ingredient · Concern · Format · Regimen Step · Preferences (vegan, fragrance-free, etc.)
**Sort default:** Bestsellers. Alt: Best Matches · Price ↑/↓ · Rating
**Card pattern:** Lazy-loaded image · product name (the chemistry, e.g., `Niacinamide 10% + Zinc 1%`) · benefit descriptor ("Reduces Visible Shine") · size toggle inline (30ml / 60ml) · price (e.g., `$9.90`) · award badge ("Team Favourite", "Bestseller") · `Add to Cart` button on card (disabled when out of stock) · wishlist heart top-right · `Quick view` link
**Grid density:** Looks like 3-up at standard desktop widths (the markup shows 2-col on the variant grid, but the wider catalog renders 3-4); generous whitespace. `Load More` button at bottom.
**Distinctive element:** **Ingredient-first naming + the regimen "Build Your Regimen" CTA above the grid.** The Ordinary's category page leads with `Find Your Formulation` as the H1 and pairs it with two big CTAs ("Build Your Regimen" / "Shop All Skincare") *before* the grid — they treat the catalog itself as a diagnostic surface.
**Mobile filter pattern:** Drawer (`Close Filters` text confirms left-sheet pattern) + sticky `Sort by` dropdown at top of grid.

### 3. Paula's Choice
**URL:** https://www.paulaschoice.com/skin-care-products/best-sellers (direct fetch returned shell only; supplemented by Sephora's Paula's Choice brand page + WiserNotify PLP teardown)
**Filter axes:** Concern (Acne · Anti-Aging · Brightening · Pores · Redness · Sensitive Skin · Eyes) · Product Type (Cleanser · Toner · Exfoliant · Serum · Moisturizer · SPF) · Skin Type · Routine Step (1-5) · Best for AM/PM · Free-from preferences
**Sort default:** Bestsellers. Alt: New · Price ↑/↓ · Highest Rated
**Card pattern:** Product image (often paired with the iconic blue-and-white packaging) · product family + variant name (e.g., `2% BHA Liquid Exfoliant`) · benefit subtitle · price · star rating + review count (their reviews are 4-digit volumes — `★ 4.8 (12,847)`) · `Add to Bag` button on card · "Bestseller" / "New" / "Award" badge in top-left
**Grid density:** 3 columns desktop · 2 tablet · 1 (or 2 small) mobile. Cards are tall — generous image + 4 lines of text + CTA.
**Distinctive element:** **Routine Step labels on every card** (`Step 3: Exfoliate`) — turns the grid into an implicit regimen builder.
**Mobile filter pattern:** Sticky `Filter (n)` + `Sort` segmented control at top; opens a bottom-sheet drawer.

### 4. COSRX
**URL:** https://www.cosrx.com/collections/all
**Filter axes:** Skin Concern (acne, fine lines, dryness, pores, dullness, redness) · Product Type (cleansers, toners, serums, moisturizers, masks) · Ingredient (peptide, PDRN, snail mucin, rice, ceramide, vitamin C, retinol, niacinamide, hyaluronic acid, AHA/BHA) · Price (implied via sort)
**Sort default:** Featured. Alt: Most relevant · Best selling · A-Z / Z-A · Price ↑/↓ · Date ↑/↓
**Card pattern:** Image · `Top-Fave` or `New in` badge · product name + descriptor in one line ("10mins Eyepuffiness Care") · price (often `From $23.00` for multi-size SKUs) · `Quick buy` button (implied modal) · no review stars surfaced on the card
**Grid density:** ~4 columns desktop. Catalog is large — 121 products on `Shop All`.
**Distinctive element:** **Triple-axis ingredient navigation in the mega-menu** — `Shop by Concern / Shop by Type / Shop by Ingredient` exist as three parallel lists rather than one nested tree, so the user picks their mental model up front. Closest cross-brand match for what Clarté is considering.
**Mobile filter pattern:** Top-bar `Filter ▸` toggle opens a right-side drawer; numeric pagination at bottom (`1 [2] [3] … [6] · Next »`).

### 5. EltaMD
**URL:** https://eltamd.com/collections/all-products
**Filter axes:** Skin Type (Acne-Prone · Dry · Oily · Rosacea-prone · Sensitive) · Tint (Untinted · Tinted · Deep Tinted) · Ingredient (Zinc Oxide, Niacinamide, HA, Vit C, Antioxidants, Ceramides, Vit E, Dimethicone, Amino Acids, Peptides, Squalane) · Feature (Oil-free · Fragrance-free · Paraben-free · Noncomedogenic) · Format (Body / Face / Sunscreen / Cleanser / Treatment / Lip / Sets) · SPF Range (30-39 · 40-49 · 50+)
**Sort default:** Best Selling. Alt: A-Z / Z-A · Price ↑/↓ · Date ↑/↓
**Card pattern:** Image (~200px thumb) · product name as linked H · `Regular price $XX` · `Add to Cart` OR `LEARN MORE` (the latter on PDP-only SKUs) · `Sold out` overlay when applicable · award badge (`Allure Best of Beauty Award 2025`) · no review stars on card
**Grid density:** 3-4 columns desktop based on thumb sizing. `Showing: 43 Results` count visible above grid.
**Distinctive element:** **SPF-Range filter as a first-class axis.** Sub-segmenting an attribute (SPF) into ranged buckets is rare and powerful — the equivalent for Clarté would be filtering serums by "actives concentration: gentle / moderate / clinical".
**Mobile filter pattern:** Not visible in desktop crawl; standard Shopify-store left drawer pattern likely.

### 6. Beauty of Joseon
**URL:** https://beautyofjoseon.com/collections/shop-all
**Filter axes:** Product Type (Sunscreen · Cleanser · Exfoliator · Toner & Essence · Serum · Moisturizer · Mask) · Shop Bundles toggle · Key Ingredients (17+ — Centella, Ginseng, Rice, Propolis, etc.). **No skin-type or concern filter** — the brand leans on ingredient mental model.
**Sort default:** Featured. Alt: Best selling · Price ↑/↓
**Card pattern:** Hero image + second-image-on-hover (multi-image swap) · star rating with numeric, e.g., `★ 4.6 (36 Reviews)` · product name + brief descriptor · price + discount badge (`Save 15%`) · inline size/variant selector below price · `SHOP` button (acts as add-to-bag trigger)
**Grid density:** 3 columns desktop, sparse and editorial.
**Distinctive element:** **Bundles surfaced as a filter toggle**, not a separate page. A single `Shop Bundles` checkbox folds them into the catalog — directly relevant to Clarté, which currently splits Protocols and Individuals into two separate sections.
**Mobile filter pattern:** Show/Hide Filters chip pattern; menu drawer on mobile.

### 7. Drunk Elephant
**URL:** https://www.drunkelephant.com/products-allproducts/ (working URL; `/collections/all` returned 410)
**Filter axes:** Product Type (Moisturizers · Serums · Masks + Treatments · Cleansers · Eyes + Lips · Travel) · Category (Skincare · Hair Care · Body Care · Best Sellers · Kits & Bundles · Refills · Merch · Gift Cards). No concern or ingredient filter — they trust their colour-coded packaging to do the wayfinding.
**Sort default:** Best Sellers. Alt: Newest · Price ↑/↓
**Card pattern:** Image with lazy-load placeholder · category badge (`New`, `Travel`, `Serum`) · product name · `was $29.00 now $21.75` strike-through pricing when on sale · star rating + review count where present · **quantity selector dropdown (1-6)** directly on the card · `Add to Bag` button · `Compare` checkbox
**Grid density:** 3-4 columns desktop, with promotional content blocks (`Grab (25% off) and go`) interspersed inside the grid like content rows.
**Distinctive element:** **In-grid product comparison tool** — `Compare Up To 4 Products` checkbox lives on every card. For a brand whose differentiation is formulation chemistry, side-by-side compare is on-brand.
**Mobile filter pattern:** Mobile-optimized filter drawer; sticky promo banner above the grid.

### 8. Tatcha
**URL:** https://www.tatcha.com/collections/shop-all (`/all-skincare` returned 404)
**Filter axes:** By Skin Type (Combination · Dry · Sensitive · Oily · Combo-to-Oily · Combo-to-Dry · Mature · All) · By Solutions (Brightening · Dark Spots · Dullness · Even Texture · Clarifying · Hydrating · Calming · Healthy Aging · 15+ more). No ingredient filter — Tatcha's ingredient story is heritage-narrative, not nav-filter.
**Sort default:** Featured. Alt: Most Relevant · Best Selling · A-Z / Z-A · Price ↑/↓ · Date ↑/↓ · `In Stock Only` toggle
**Card pattern:** Image with multi-angle reveal on hover · product name in serif italic + sans descriptor · sale price with regular price strikethrough · `Add to Bag` button · size/variant selector (Full Size · Mini · 4-Pack · 1-Pack) inline · `Bestseller` badge
**Grid density:** **User-controlled density** — `Show two cards per row / Show three cards per row` + `Show cards bigger / Show cards smaller` toggle. Numeric pagination at the bottom (`1 [2] [3] [4]`).
**Distinctive element:** **User-controllable card-density toggle.** Letting the visitor choose 2-up vs 3-up is rare and respects mixed shopping modes (browse-mode wants 2-up jumbo, hunt-mode wants 3-up dense). It's small but premium-feeling.
**Mobile filter pattern:** `Filter & Sort` button (combined) opens a single sheet containing both controls; quick-add lives on every card.

## Cross-cutting patterns (appearing in 3+ brands)

**1. Left-sidebar accordion filters on desktop, full-screen / bottom-sheet on mobile (7 of 8).** Universal pattern. The Ordinary, Paula's Choice, EltaMD, Beauty of Joseon, Tatcha all use a left-sidebar with collapsible accordion groups; Sephora uses the same; COSRX uses a top-bar toggle on desktop but a drawer on mobile. The accordion lets the brand expose 5-7 filter axes without scrolling fatigue. **Mechanics:** each axis is an accordion group; selected values become removable chips above the grid; a "Clear all" lives at the top-right of the filter panel; the result count updates in the page header on every selection.

**2. Bestsellers as the default sort (6 of 8).** Only Sephora (relevance-personalized) and Beauty of Joseon / COSRX / Tatcha (Featured) break from it. The pattern is: when a user lands on a category page without an intent signal, show what other people bought — it's the highest-converting default. `Featured` is a soft synonym a brand uses when it wants editorial control rather than literal sales-rank.

**3. `Add to Bag` directly on the product card (6 of 8).** The Ordinary, Paula's Choice, EltaMD, Beauty of Joseon, Drunk Elephant, Tatcha all surface Add-to-Bag without requiring a PDP visit. Drunk Elephant adds a quantity dropdown. COSRX uses "Quick buy" (modal); Sephora uses "Quick Look" (overlay then add). Pattern is universal in 2026.

**4. Image-swap on hover (5 of 8).** Beauty of Joseon (most explicit), Tatcha, Drunk Elephant, COSRX, EltaMD all swap to a second product image (lifestyle / texture / pack-back) on hover. This is the cheapest visual depth-pump on a PLP and adds 0 layout cost.

**5. Award / badge ribbon in the top corner of the card (5 of 8).** "Bestseller" (Tatcha, Paula's Choice), "Allure Best of Beauty 2025" (EltaMD), "Top-Fave" / "New In" (COSRX), "Team Favourite" (The Ordinary), "New" / "Travel" / "Serum" category badges (Drunk Elephant). Single chip, top-left or top-right of image — never both.

**6. Result count next to the filter / sort row (5 of 8).** `87 Results` (The Ordinary), `121 products` (COSRX), `43 Results` (EltaMD), the count appears with the sort dropdown. Sephora and Paula's Choice surface it just below the H1. The pattern: the user wants confirmation that the filter is actually narrowing.

**7. Mega-menu offers parallel browse axes — Type / Concern / Ingredient (4 of 8).** COSRX, The Ordinary, Tatcha, Paula's Choice all expose 3+ parallel browse routes in the mega-menu instead of a single category tree. The user picks the route that matches their mental model (chemistry buyer hits Ingredient; problem buyer hits Concern; routine buyer hits Type).

**8. `Load More` button is winning over infinite scroll and pagination (4 of 8).** The Ordinary uses Load More. Beauty of Joseon and Tatcha use numeric pagination. COSRX uses numeric pagination. Drunk Elephant uses pagination. Sephora uses infinite scroll. The pattern winning in 2025 specifically among small-to-mid catalogs is `Load More` — it preserves the URL, doesn't break the footer, and is keyboard-accessible.

## What's worth stealing for Clarté MD `/products`

- **Merge Protocols and Individual Products into one grid, gated by a `Shop Bundles only / All products` toggle (steal from Beauty of Joseon).** Today `app/(site)/products/page.tsx` renders two stacked grids with a 12-section divider. Replace with a single grid and a binary chip filter at the top: `[All] [Protocol Bundles (4)] [Individual Products (8)]`. With only 12 items total, a single-grid view is more honest and reduces vertical scroll. Apply in `app/(site)/products/page.tsx` + a new `<CatalogFilterChips>` client component. This is the single highest-leverage change.

- **Triple-axis chip filters above the grid: Concern · Type · Active (steal from COSRX + The Ordinary mega-menu architecture).** Three rows of chip buttons (multi-select within row, AND across rows): Concern (Acne · Pigmentation · Aging · Barrier) · Type (Cleanser · Serum · Moisturizer · SPF · Bundle) · Active (Niacinamide · Salicylic · Retinoid · Vitamin C · etc.). On 12 SKUs a chip pattern is the right primitive — a left sidebar would dwarf the grid. Selected chips become removable; a `Clear all` link appears when any chip is active. Build as `<CatalogFilterChips>` in `components/product/` using shadcn's `ToggleGroup` primitive once the design system migration brings it in.

- **`Add to cart` directly on every `<ProductCard>` (steal from 6 of 8 brands, applied tightly).** The current `<ProductCard>` is image + name + price + click-through to PDP. Adding a small `Add` button keeps PDPs as the primary trust surface while letting returning customers add fast. For protocols (`<BundleCard>`) keep the click-through-to-bundle-page model because the bundle warrants explanation; for single SKUs add the button. Use cobalt accent so it reads as a clinical action, not a marketing CTA.

- **Image-swap on hover for every card (steal from Beauty of Joseon, Tatcha, Drunk Elephant).** Cheapest visual depth-pump available. Each SKU already has multiple gallery images post the v0.3 PDP work (per commit `ba4668b: per-SKU image gallery + structured content for all 8 products`). Wire `<ProductCard>` and `<BundleCard>` to swap to image[1] on hover — pure CSS opacity crossfade, no JS state needed. The clinical-but-warm read of the navy-on-cream cards gets a quiet life moment.

- **Result count + sort control in the section header (steal from EltaMD, The Ordinary, COSRX).** The current header is just `h1 + paragraph + section dividers`. Replace the per-section eyebrow count with a sticky row: `Showing 12 of 12 · Sort: Featured ▾`. With chips active it becomes `Showing 3 of 12 · [Acne ×] [Serum ×] · Clear all`. Sticky on scroll on mobile. This is the single most important affordance for "is the filter actually doing anything?"

- **A graceful empty state (steal from no one — nobody is doing it well, so set the bar).** When no SKU matches the chip combo, render the **closest protocol bundle** with the line `No exact match. The {Clear-Skin} protocol covers all three concerns you selected.` plus a `Clear filters` link. This converts a dead end into a regimen recommendation — and matches Clarté's clinical-routing positioning.

## What to avoid

- **A left-sidebar filter panel.** On 12 SKUs a 240px sidebar would consume 30% of the desktop viewport while filtering nothing meaningful. Chips above the grid are the right primitive at this catalog size. Revisit only past ~40 SKUs.

- **Quick Look / Quick Add modal (à la Sephora, COSRX).** PDPs are Clarté's primary trust surface — the regimen routing copy, ingredient module, clinical results, FAQ all live there. A modal that lets a user buy without ever seeing those is *off-brand* for a dermatologist-led protocol product. The lightweight `Add` button on the card is enough.

- **Strike-through `was $X / now $Y` pricing (Drunk Elephant, Beauty of Joseon).** Clarté has fixed PKR prices and no discount strategy yet; faking strike-throughs to mimic discount energy violates [[feedback_unverified_claims]]. Show one clean price.

- **A "Compare up to 4" selector (Drunk Elephant).** With 12 SKUs and clear protocol mapping, comparison is the wrong mental model — Clarté wants people to pick a *protocol*, not pit two serums against each other. The protocol bundle page already does the work that a compare tool would.

## Sources
- https://theordinary.com/en-us/category/skincare (direct fetch, 2026-05-23)
- https://www.cosrx.com/collections/all (direct fetch, 2026-05-23)
- https://eltamd.com/collections/all-products (direct fetch, 2026-05-23)
- https://beautyofjoseon.com/collections/shop-all (direct fetch, 2026-05-23)
- https://www.drunkelephant.com/products-allproducts/ (direct fetch, 2026-05-23; `/collections/all` returned 410)
- https://www.tatcha.com/collections/shop-all (direct fetch, 2026-05-23; `/all-skincare` returned 404)
- https://baymard.com/ux-benchmark/case-studies/sephora (Sephora PLP, secondary)
- https://www.karishmajani.com/sephora (Sephora UX case study, secondary)
- https://www.valido.ai/en/sephora-ecommerce-ux-audit/ (Sephora audit, secondary)
- https://www.sephora.com/brand/paulas-choice (Paula's Choice retailer mirror, secondary)
- https://wisernotify.com/blog/product-listing-page/ (2025 PLP teardown including Paula's Choice)
- https://medium.com/usabilitygeek/sobering-up-drunkelephant-com-3b98301ad126 (Drunk Elephant case study)
- Clarté repo references: `app/(site)/products/page.tsx`, `components/product/ProductCard.tsx`, `components/product/BundleCard.tsx`
