# EltaMD

**URL:** https://eltamd.com
**Positioning:** US dermatologist-channel sunscreen specialist (Colgate-Palmolive owned since 2021). Single-category dominance: SPF for sensitive/acne-prone/post-procedure skin. Mid-tier ($35-$52). Tagline: "Trusted by Dermatologists, Loved by Skin / #1 Dermatologist-recommended professional sunscreen brand". Hero SKU: UV Clear SPF 46.
**Why study them:** Closest functional parallel to Clarte's *protocol-as-product* model — EltaMD wins by going deep on one job-to-be-done (sunscreen) rather than wide on SKUs. They also expose the most accessible PDP in this segment (Shopify-based, fetchable HTML), so they're the easiest brand here to grade element-by-element.

## Quick take
A single-category brand that punches above its weight by stacking dermatologist-recommendation credibility, award badges, and a tightly merchandised PDP. The site is Shopify-based and refreshingly fetchable; most of the segment is WAF-blocked. Highlights: a 17-slide PDP gallery, a seven-icon trust-badge row, an "In the Media" award wall, and a quiz that gates behind cookie consent. Best practical reference for what Clarte's PDP should *feel like* on add-to-cart day.

## Visual / branding

### Color
- White-dominant surface with a red accent used for promotional banners and CTA callouts. Exact hex not extractable from the HTML response; from cached homepage and inferred Shopify theme: a deep crimson red (estimated `#C8102E` range) for "20% off sitewide" announcement bars and a near-black for body text. Subdued enough to read clinical despite the red.
- No dark mode. No glassmorphism. Brand reads "medical office" — bright white walls, one accent.

### Typography
- All sans-serif. Couldn't extract the exact family from the WebFetch response. Standard Shopify-section heading hierarchy: large bold H1, medium H2 with weight 600, body at 16px. Conservative tracking.
- The visual identity does not rely on type — it relies on the badge/award density.

### Photography & imagery
- Product photography is the hero — bottles photographed on flat white with crisp shadows. The 17-slide UV Clear gallery (https://eltamd.com/products/uv-clear-broad-spectrum-spf-46) intersperses bottle photography with application-demo shots (a finger swatching the product), before/after-style ingredient close-ups, and award-badge slides.
- Doctor stock photography on the homepage (white-coat shots) supports the "dermatologist-recommended" claim without naming individuals.
- Limited model photography. When used, models are diverse and the focus is the skin, not the face.

### Hero composition
- Homepage hero: a wide bleed with the headline "EltaMD® - Trusted by Dermatologists, Loved by Skin" plus the subhead "#1 Dermatologist-recommended professional sunscreen brand", a "Free Shipping on all orders" announcement strip, and a rotating promo banner ("Enjoy 20% off sitewide plus A FREE Deluxe Mini UV Restore Tinted when you spend $50+").
- The credibility claim is *the* design element — they don't decorate around it.

### Motion / interaction texture
- Conservative Shopify defaults. Carousel auto-advance, no parallax. The 17-image PDP gallery uses a thumbnail strip + arrow keys for navigation.

## UX patterns worth studying

### Navigation
- Top nav: All Products / Sun Care (with 7 subcategories: Face Sunscreen, UV Clear Collection, Full Body Sunscreen, UV Daily Collection, Tinted Sunscreen, UV Skin Recovery Collection, Bundles & Kits) / Skin Care (Cleansers, Face Moisturizers, Body Moisturizers, Treatments & Serums, Post-procedure) / Best Sellers / Shop By / Discover More / Find Your SPF Quiz.
- **"Shop By"** is the standout pattern — three faceted entry points: **Skin Type** (Combination, Dry, Oily, Sensitive), **Skin Concern** (Acne-prone, Aging Skin, Dryness, Eczema-prone, Hyperpigmentation, Irritated skin, Redness, Rosacea-prone), and **Ingredients** (100% Mineral Active, Amino Acids, Antioxidants, Ceramides, Hyaluronic Acid). This three-axis filter is exactly the model Clarte's `/products` page should adopt.
- Physician Locator (https://eltamd.com/pages/physician-locator) in secondary nav — same "find a derm" pattern as SkinCeuticals.

### Product listing / category
- Couldn't observe a full PLP HTML response — collection pages return Shopify default rendering. From the All Products page reference (https://eltamd.com/collections/all-products): standard 3-4 column grid, product card with image, name, price, "Add to cart" inline. Limited filter chrome.

### PDP — UV Clear SPF 46 (https://eltamd.com/products/uv-clear-broad-spectrum-spf-46)
This was the only fully-fetchable PDP in the segment. Worth a detailed teardown:
- **Above-fold layout:** left gallery (17 slides), right buy box.
- **Gallery:** 17 thumbnails in a vertical strip. Mix of product shots, application demos, before/after-style ingredient close-ups, and award badges. No video.
- **Buy box order:** product name → benefit/subline → size dropdown (1.7 oz / 3.7 oz) → "Add to cart" CTA with "In Stock" indicator → "Add to Cart & Save 20%" promo line above the button.
- **Trust-badge row (7 icons):** Hypoallergenic / Dye-free / Fragrance-free / Paraben-free / Non-comedogenic / Dermatologically tested / Oil-free. Displayed as a horizontal icon strip directly under the buy box. This is the segment's clearest "what's NOT in here" pattern.
- **Below-fold sections in order:** Features & Benefits → Ingredients (with active percentages listed: Octinoxate 7.5%, Zinc Oxide 9.0%) → How to Use (with troubleshooting for the pump mechanism — a nice service-design touch) → In the Media → Quiz CTA → Reviews.
- **"In the Media" award wall:** 12+ award badges from InStyle, Women's Health, New Beauty, etc., dated 2019-2026. This is the trust signal that distinguishes EltaMD's PDP from peers — they front-load *third-party validation* below the buy box rather than self-claims.
- **Quiz CTA on PDP:** "Let us help you find the right product for your skin" with link to the diagnostic tool. Smart cross-funnel placement — if the buyer is unsure, redirect to the quiz rather than lose them.
- **Reviews:** section header present but content gated behind functional-cookie consent (couldn't observe count or layout). Amazon shows 27,000+ reviews at 4.7 stars for the same SKU — likely Shopify Yotpo or Stamped integration.
- **Sticky header** but no observed sticky Add-to-Cart on the response.

### Cart
- Empty-state observed: "You don't have any items in your cart" + "Continue shopping" CTA. Subscribe & Save modal explains subscription terms with explicit acknowledgement before checkout. "Free Shipping on all orders" persistent in header throughout.
- Couldn't reach a populated cart state — checkout page requires Shopify session.

### Checkout
- Standard Shopify Checkout. Couldn't proceed without items.

### Quiz / diagnostic
- "Find Your SPF" / Skincare Finder (https://eltamd.com/pages/eltamd-skincare-quiz) — the actual quiz is gated behind functional-cookie consent. From metadata: a diagnostic that maps the user to one of the UV Clear / UV Daily / UV Restore / UV Sport / UV Elements / UV Lotion variants. Cross-linked from the PDP as a fallback CTA.

### Trust / social proof
- "#1 Dermatologist-recommended professional sunscreen brand" claim — repeated in header, hero, PDP, footer.
- Award wall on PDPs (Allure Best of Beauty 2025 for UV Skin Recovery; InStyle Readers' Choice; WhoWhatWear 100 Beauty Awards; WWD Beauty Inc "Greatest Beauty Products of All Time" 2026 listing UV Clear alongside Crème de la Mer).
- Physician Locator on PDP and in nav — geographic trust.
- Trust-badge icon row on every PDP.

### Mobile-specific patterns
- Sticky header. Cookie consent banner is intrusive (gates the quiz and review content entirely). Hamburger nav drawer with the same Shop By facets exposed.
- Subscribe & Save promoted via a persistent banner.

## What's worth stealing for Clarte MD

- **Three-axis Shop By facets in primary nav** — Clarte's `/products` page currently lists 8 SKUs flat. Add a Shop By dropdown to the header with three axes: **Skin Concern** (Acne / Hyperpigmentation / Aging / Sensitivity), **Skin Type** (Oily / Combo / Dry / Sensitive), **Ingredient** (Niacinamide / Retinaldehyde / Azelaic Acid / Tranexamic Acid). Each leads to a pre-filtered `/products?concern=X` URL. This is the single most actionable nav pattern in the segment for Clarte's catalog size.
- **Trust-badge icon row in PDP buy box** (`app/(site)/products/[sku]/page.tsx`) — Add a 5-icon row directly under the price: Fragrance-Free / Non-Comedogenic / Sensitive-Skin-Safe / Dermatologist-Formulated / PK-Made (or similar). **Critical: only include badges Clarte can actually back.** Per `feedback_unverified_claims`: no ISO, no GMP, no 2x-refund. Stick to ingredient/sensory claims that are factually true of each SKU.
- **"In the Media" award wall on PDP** — when Clarte gets press coverage (local: HUM Pakistan, Diva Magazine, Dawn lifestyle section; international: Vogue India, Tatler Asia), build a horizontal scrolling row of publication logos below the buy box. Even 3-4 logos is enough. Lives in the PDP component below the ingredients accordion.
- **17-slide PDP gallery, but smarter** — Clarte's current per-SKU gallery (recent commit `ba4668b feat(pdp): per-SKU image gallery + structured content for all 8 products`) is the right direction. Mirror EltaMD's gallery composition: 4 bottle shots, 3 texture/application shots, 2 ingredient close-ups, 1 before/after AI render (when ready), 2 dermatologist-context shots (clinic background, doctor's hands without the face), 1 packaging-on-Pakistani-bathroom-shelf lifestyle. Don't ship 17 — ship 8-10 with the same intent.
- **Cross-funnel quiz CTA inside the PDP** — Below the buy box on every PDP, add "Not sure if this is for you? Take the 60-second protocol quiz" linking to `/quiz`. Steals the EltaMD pattern of catching the undecided buyer instead of losing them.
- **Physician Locator → Pakistan equivalent** — same as the SkinCeuticals teardown's recommendation: list 3-5 Lahore/Karachi/Islamabad dermatology clinics that stock Clarte (when that's true) at `/clinics`. EltaMD makes the locator a primary nav item; Clarte should at minimum make it a footer block.
- **Service-design "how to use" with troubleshooting** — EltaMD's UV Clear "How to Use" section includes pump-mechanism troubleshooting. Clarte's "How to Use" accordions should similarly include "What if my skin tingles?" / "What if I have a flare-up?" / "Can I use this with my existing routine?" — three small Q&As under the standard usage instructions. This is the warmth half of "clinical with warmth".

## What to avoid

- **Red as the primary brand accent** — EltaMD's red works for them because their visual identity is otherwise so neutral. Clarte's navy+cobalt is the right call; do not import red urgency banners ("20% off sitewide") that read as Shopify-mass-market.
- **Cookie-gated reviews** — EltaMD's PDP shows "You cannot see Ratings and Reviews because you have declined functional cookies." That is an active conversion-blocker. Clarte should ensure reviews are server-rendered (Next.js RSC) and don't depend on third-party consent banners.
- **Subscribe-and-save modal that interrupts checkout** — EltaMD's subscription acknowledgement modal is an extra step that COD-only Clarte does not need. Subscriptions don't fit Clarte's COD model at all; skip this entire pattern.
- **Heavy promotional banner stacking** — the EltaMD homepage stacks "Free Shipping" + "20% off sitewide" + "Spend $50+ FREE Mini" in close proximity. Clarte's flat-Rs.-250-shipping policy means one persistent line is enough; do not stack offers.

## Sources
- https://eltamd.com/
- https://eltamd.com/products/uv-clear-broad-spectrum-spf-46
- https://eltamd.com/products/eltamd-uv-clear-tinted-broad-spectrum-spf-46
- https://eltamd.com/collections/sun-care
- https://eltamd.com/collections/all-products
- https://eltamd.com/collections/skin-care
- https://eltamd.com/collections/uv-clear-collection
- https://eltamd.com/pages/physician-locator
- https://eltamd.com/pages/eltamd-skincare-quiz
- https://eltamd.com/pages/authorized-reseller
- https://eltamd.com/cart
- https://everything-pr.com/eltamd-1-dermatologist-recommended-sunscreen-brand/
- https://www.consumerreports.org/health/sunscreens/eltamd-uv-clear-spf-46-face-sunscreen/m415083/
- https://incidecoder.com/products/eltamd-uv-clear-broad-spectrum-spf-46
- https://www.trustpilot.com/review/eltamd.com
- Note: EltaMD was the only brand in this segment whose homepage, PDP, and cart all returned usable HTML to WebFetch. The Skincare Finder quiz and Reviews module are functional-cookie-gated and were not observable.
