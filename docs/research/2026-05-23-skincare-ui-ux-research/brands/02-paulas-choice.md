# Paula's Choice

**URL:** https://www.paulaschoice.com
**Positioning:** Research-first US DTC skincare founded by author Paula Begoun. Mid-tier pricing ($15-$60). Built around the "Beautypedia" ingredient research engine and a famously transparent ingredient-rating ethos. Hero SKU: SKIN PERFECTING 2% BHA Liquid Exfoliant.
**Why study them:** Paula's Choice has spent two decades teaching consumers to read ingredient lists. Their Ingredient Dictionary, Beautypedia Checker, and Skin Type Quiz are best-in-class educational funnels — exactly the surface Clarte needs to build to make a dermatologist-led brand defensible against Sephora-style brand noise.

## Quick take
A research-credibility brand whose homepage and PDP do less than competitors *because the education tools are doing the heavy lifting elsewhere*. The actual storefront is utilitarian Salesforce Commerce Cloud; the moat is the Ingredient Dictionary, Beautypedia Checker, and the skin quiz. If Clarte wants to defend "dermatologist-led" against budget competitors, this is the content-as-product playbook.

## Visual / branding

### Color
- Couldn't extract from a direct fetch — the homepage HTML returned to WebFetch contained only the logo SVG; deeper pages 404'd or were JS-hydrated. From third-party screenshots and Trustpilot review thumbnails: a near-white base with a single magenta/pink accent (the "Paula's Choice" logo and primary CTA color), plus a navy used for body copy and secondary buttons. Heavy use of warm-grey banners on category pages.
- No dark mode. The aesthetic is editorial-magazine, not pharmacy.

### Typography
- A geometric sans for headings and body. Couldn't confirm the family. Treatment is neutral — Paula's Choice does not flex typographically; the brand voice is in the writing density and the rating UI.
- Body copy runs longer than the segment average — full paragraphs on category landing pages where competitors use icon grids.

### Photography & imagery
- Product shots dominate: white-bg bottles with the iconic minimal label (white bottle, black product code, magenta accent). The label *is* the brand asset — they protect it by never overlaying lifestyle photography on the homepage carousel.
- No before/after photography. The brand explicitly leans away from "results photos" toward research citations (consistent with founder Paula Begoun's editorial heritage).
- Limited use of model photography. When used, models are diverse and minimally retouched.

### Hero composition
- The homepage hero rotates between product launches and editorial concept tiles ("Skincare Routine Builder", "Take the Skin Type Quiz", "New: [SKU]"). Each tile uses a flat color background, the product cutout right-aligned, and a single H1 + short paragraph + dark CTA button left-aligned. Couldn't recover exact dimensions.

### Motion / interaction texture
- Conservative. Standard Salesforce Commerce defaults — fade-in on scroll, hover-state image swap on PDP gallery thumbnails. No signature interaction.

## UX patterns worth studying

### Navigation
- Top-nav grouping: **Shop** (by category and concern), **Routine Finder**, **Ingredients** (this is the unusual move — ingredients is a top-level nav item), **Best Sellers**, **About**. The Ingredients dropdown surfaces the Ingredient Dictionary and the Beautypedia Checker as first-class destinations, not buried in a help center.
- Couldn't fetch the mega menu HTML. From cached pages: a wide flyout with three columns and inline product images.

### Product listing / category
- Couldn't directly fetch a category page. From the Best Sellers URL (https://www.paulaschoice.com/skin-care-products/best-sellers) and search snippets: products grouped by use case ("Award Winning Favorites"), each card showing image, product name, short benefit line, star rating, price, and an inline "Add to Bag" button. Sort by best-sellers default.

### PDP
- Couldn't fetch directly (404 on canonical patterns I tried; site uses dynamic SCC URL hashing). From third-party retailer screenshots and the Trustpilot reviewer captures:
  - Above-fold uses left gallery / right buy box. Gallery includes the bottle, the texture shot, an ingredient-overlay image, and an infographic of "Star Ingredients".
  - Buy box order: product name → benefit subline → star rating + review count link → price → size selector (multiple sizes/Trial sizes/Refill pouches) → quantity → Subscribe toggle (15% off + free shipping) → Add to Bag (dark/black button, all-caps).
  - **Skin Type icons** appear as a row of small badges directly under the price ("Normal / Dry / Combination / Oily"). This is the segment's best version of "made for you" without requiring a quiz.
  - Below-fold tabs/accordions: "Why You'll Love It", "Key Ingredients" (with a *separate* line item linking each to the Ingredient Dictionary), "How To Use", "Full Ingredient List", "Reviews" (powered by their own review system, not Yotpo/PowerReviews based on URL patterns).
  - **Beautypedia rating badge** appears on the PDP — a "Best" rating crest from the in-house research team. This is the killer signature trust signal because it links back to their own ingredient research authority loop.

### Cart
- Couldn't reach. From CQL case study (https://www.cqlcorp.com/work/paulas-choice/): the cart is a slide-out drawer with line items, qty editor, subscribe toggle, and a free-sample picker — the sample picker is the standout pattern (choose 2 of 4 samples by deluxe-size image).

### Checkout
- Standard Salesforce Commerce single-page checkout. Guest checkout supported. Couldn't observe payment options. Free shipping threshold at $49 per checkout reviews; PayPal/Mastercard/Visa surfaced; offers "money-back guarantee" copy near the submit.

### Quiz / diagnostic
- **Skin Type Quiz** (https://www.paulaschoice.com/skin-type-quiz) — couldn't fetch the active flow but per Salesforce case study and customer reviews: 8-10 questions, single-choice card UI, progress dots at the top, results page recommends a 3-step routine with each product fully add-to-cartable inline. The result screen *also* offers "Save this routine" to the user's account.
- **Routine Finder** (UK equivalent at https://www.paulaschoice.co.uk/routine-finder) acts as a longer-form regimen builder.

### Trust / social proof
- **Beautypedia** (https://www.paulaschoice.com/beautypedia) is the trust engine. Every product links into the ingredient dictionary and every dictionary entry links back to relevant products — a closed editorial loop. The Beautypedia Ingredient Checker (https://www.paulaschoice.com/beautypedia-ingredient-checker) lets users paste any product's ingredient list and get a Best→Worst rating in seconds. This *is* the brand's defense against being commoditized.
- 376 Trustpilot reviews (4-star) with named founder editorial voice across the site.
- Caveat: third-party criticism notes that Paula's Choice products almost always rate 4-5 stars in Beautypedia while competitors fare worse — clean rating-system optics but a known bias risk that Clarte should NOT replicate.

### Mobile-specific patterns
- Sticky top header with cart icon. Couldn't observe a sticky add-to-bag. Quiz is mobile-first (the brand promotes it heavily on Instagram and TikTok).

## What's worth stealing for Clarte MD

- **Top-nav "Ingredients" as a first-class destination** — Add to Clarte's header (next to "Products" and "Quiz"): a single nav item that opens to a lightweight ingredient glossary page. Even 12-20 entries (niacinamide, retinaldehyde, azelaic acid, salicylic acid, hyaluronic acid, ceramides, tranexamic acid, etc.) with one paragraph each defends "dermatologist-led" hard. Lives at `/ingredients` and links from every PDP's "Key Ingredients" section.
- **Skin Type icon row in PDP buy box** (`app/(site)/products/[sku]/page.tsx`) — Currently Clarte's PDP doesn't surface "who is this for" at the buy box altitude. Add a row of 4 small monoline icons under the price: "Oily / Combo / Sensitive / Dry" with the relevant ones active (filled) and the rest greyed. JetBrains Mono "FORMULATED FOR" eyebrow above. Reads as clinical-but-warm.
- **Beautypedia-style "Best Ingredient" badge on PDP** — Clarte's protocol pages already list active ingredients; promote each one to a small Fraunces italic card with a single sentence ("*Niacinamide 4% — calms redness, regulates oil*") and a tiny "Why we picked this" toggle that opens a paragraph of derm reasoning. This is the highest-ROI pattern in the segment — it converts "another skincare brand" into "the one that explains itself".
- **Quiz result → saved routine** (`app/(site)/quiz/page.tsx`) — Paula's "save your routine" persistence is achievable in Clarte's Next.js + Supabase stack. After the quiz, save the recommended protocol to the user's session or (if logged in via WhatsApp/phone later) to a Supabase row. Even a "Email yourself this protocol" capture beats the current zero-persistence quiz result. Doubles as a lead-capture mechanism for Faisal's COD-only funnel.
- **Free-sample picker in cart** — Clarte's cart (`app/(site)/cart/page.tsx`) is COD-only with flat Rs. 250 shipping. Add a "Pick one free sample" widget above checkout — three small sachet-mockup tiles, choose one, ride-along free. Costs minimal margin, lifts AOV and gives an excuse to introduce a second protocol. Do NOT phrase it as a free-shipping incentive (per `feedback_unverified_claims`).
- **Ingredient list with click-through education** — On the PDP "Full Ingredients" accordion, make each active ingredient a link to the `/ingredients/[slug]` page. Implementation cost is low (JSON-LD + slug routes) and the SEO + trust dividend is high.

## What to avoid

- **Self-graded rating system** — Beautypedia rating bias is publicly criticized. Clarte should NOT build a "we rate our own products" badge. The ingredient glossary is the safe pattern; the brand-graded rating is not.
- **Long-paragraph homepage hero** — Paula's Choice gets away with editorial-density copy because Begoun was a beauty author with 30+ years of readership. Clarte does not have that earned attention; keep the hero copy short.
- **Magenta-pink accent** — Paula's primary accent reads consumer-mass-market. Clarte's navy+cobalt is the right move; do not import the pink to feel "friendlier".

## Sources
- https://www.paulaschoice.com/
- https://www.paulaschoice.com/beautypedia
- https://www.paulaschoice.com/about-beautypedia
- https://www.paulaschoice.com/beautypedia-ingredient-checker
- https://www.paulaschoice.com/ingredient-dictionary
- https://www.paulaschoice.com/skin-type-quiz
- https://www.paulaschoice.com/skin-care-products/best-sellers
- https://www.paulaschoice.com/top-rated
- https://www.paulaschoice.co.uk/routine-finder
- https://www.cqlcorp.com/work/paulas-choice/ (Salesforce Commerce Cloud case study)
- https://www.trustpilot.com/review/www.paulaschoice.com
- https://www.prnewswire.com/news-releases/paulas-choice-launches-new-beautypedia-skin-care-ingredient-checker-setting-a-new-industry-standard-in-ingredient-transparency-in-skincare-301809240.html
- Note: paulaschoice.com root returned near-empty HTML to WebFetch (logo only — heavy JS hydration); deeper PDP/category URLs 404'd via guessed canonical patterns. Primary research was via cached snippets, Trustpilot reviewer screenshots, and the CQL case study.
