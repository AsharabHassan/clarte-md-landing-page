# COSRX — Bundle / Routine / Set Pages

**Access note:** cosrx.com is fetchable. Direct renders obtained for `/collections/set`, `/products/all-about-snail-kit-4-step`, `/products/snail-trio`, `/pages/r-t-p-routine-builder`, and `/pages/new-r-t-p-routine`. The former `/collections/glass-skin-routine` URL returned 404 — that collection appears to have been retired or renamed. The canonical "Glass Skin Routine" is now surfaced at the individual Snail 96 PDP as a cross-sell module (confirmed in prior research). All claims below are from direct fetches unless flagged.

---

## URL + page label

- `/collections/set` — "Sets" hub (23 bundles as of fetch date), labelled with "Grab Sets & Save Up To 25%"
- `/products/snail-trio` — "Snail Mucin Trio" (3-step; $58.65 was $69.00, 15% off)
- `/products/all-about-snail-kit-4-step` — "ALL ABOUT SNAIL KIT 4-step" ($25.00 trial kit, travel sizes)
- `/pages/r-t-p-routine-builder` — "R.T.P. Routine Builder — Build Your Own Routine & Save 20%"
- `/pages/new-r-t-p-routine` — "New R.T.P Routine" editorial landing (Q&A format, no transactional pricing)
- Individual PDP `GET FULL ROUTINE NOW & SAVE 20%` cross-sell (Snail 96 PDP, confirmed prior research)

COSRX uses five parallel surfaces for bundle discovery: (1) the Sets hub, (2) pre-curated set PDPs, (3) the interactive R.T.P. builder, (4) editorial routine guidance pages, and (5) the PDP-embedded cross-sell. These run concurrently — the consumer can enter via any surface.

---

## Hero composition

**Sets hub (`/collections/set`):**
- No distinct hero module. Page opens directly into the grid of 23 sets.
- Persistent nav banner: "Build Your Own Routine & Save 20%" and "Grab Sets & Save Up To 25%"
- No eyebrow above the grid headline. Page `<h1>` is simply "Sets."
- Functional, not editorial — the hub is a product grid, not a landing page.

**Individual set PDPs (Snail Mucin Trio, All-About-Snail Kit):**
- Hero follows the standard COSRX PDP template: image carousel left (4 product images showing bottles together, texture shot, lifestyle use), buy box right.
- Headline for Snail Mucin Trio verbatim: **"Snail Mucin Trio"** — eyebrow/subheading: **"Transform your skin with 3 easy steps!"**
- Headline for All-About-Snail Kit verbatim: **"ALL ABOUT SNAIL KIT 4-step"** — eyebrow: **"COSRX's Most Loved 4-step Advanced Snail Trial Kit: Skincare essentials formulated with snail mucin for repairing, moisturizing, and soothing skin."**
- CTA button copy verbatim: **"Add to Cart"** — no variant of "Add All," no multi-product trigger.

**R.T.P. Builder (`/pages/r-t-p-routine-builder`):**
- Headline: "Build Your Own Routine & Save 20%"
- The builder is interactive; structural details of the steps within it (questions asked, product selector format) were not fully rendered at fetch time. What is confirmed: the result of building is a custom bundle eligible for 20% off.

---

## Composition display

**Snail Mucin Trio — numbered step format:**
The three products are listed as an explicit numbered sequence directly in the buy box / product description:
- **Step 1:** Advanced Snail Mucin Gel Cleanser (150ml / 5.07 fl oz) — "Smoothest lather supercharged with Snail Mucin!"
- **Step 2:** Advanced Snail 96 Mucin Power Essence (100ml / 3.38 fl oz) — "Enriched with 96.3% snail secretion filtrate"
- **Step 3:** Advanced Snail 92 All In One Cream (Jar or Tube) — "Moisturizer enriched with 92% of snail mucin"

Products are NOT shown as linked individual tiles. The set is a single SKU; the numbered breakdown is descriptive, not navigational. A "View details" button appears per step (linking to the individual PDP), which is a partial hybrid — the consumer can go deeper but cannot mix and match quantities or variants.

**All-About-Snail Kit — numbered step format (travel sizes):**
Four products listed as Steps 1-4, identical numbering pattern. Same structural discipline — step number + product name + volume + one-line benefit. No individual prices shown per step.

**Sets hub listing cards:**
Cards show a single hero product image (the set's packaging or bottle stack), product name, "was / now" pricing, and a percentage-off badge ("15% off," "25% off"). A **"Quick buy"** button sits on each card — direct add-to-cart without visiting the set PDP. This is the one surface where COSRX enables a one-click purchase that bypasses the PDP, trading trust-building for conversion speed.

**Contrast with the PDP cross-sell (Snail 96 PDP):**
At the bottom of the individual Snail 96 PDP, the "Your Glass Skin Routine Guide" module shows a 4-step bundle (Cleanser → Essence → Cream → Mask) with product thumbnails and a single **"GET FULL ROUTINE NOW & SAVE 20%"** CTA. This is the closest COSRX gets to an "Add All to Bag" trigger — confirmed from prior research fetch on `/products/advanced-snail-96-mucin-power-essence`.

---

## Pricing transparency

**Snail Mucin Trio:**
- Bundle price: $58.65
- "Was" price: $69.00
- Savings badge: **"15% off"** (explicit percentage, surfaced on both the card and the PDP)
- Individual product prices: **not listed line-by-line** on the set PDP. The consumer knows the aggregate savings but cannot see the per-item math on the set page itself.
- Variant option: Jar vs. Tube for the Step 3 cream — toggle present on PDP.

**All-About-Snail Kit:**
- Bundle price: $25.00
- Individual prices: not displayed. Savings not stated (likely implied by travel-size format).
- No "was / now" strikethrough on the kit PDP (possibly because it's a trial-size composite with no direct equivalent sum).

**Sets hub:**
- 23 bundles; discount range 10%-25% off. Full table:
  - 10% off: Peptide & PDRN Eye Patch Duo, PDRN Hair Bonding Mini Kit, 24-HR Synergy Duo
  - 15% off: the majority (Snail Trio, PDRN Duos, Slow-Aging Kit, Radiant Glow Kit, etc.)
  - 25% off: All-Day Sun Protection Duo, Peptide-132 Hair Bonding Kit
- Two anomalous high-price entries — "Your Bare-Skin Glow Routine" at $1,134.00 and "Makeup-Ready Glow Routine" at $486.00 — appear to be editorial/editorial-bundle pages at a prestige price point without a savings badge. These are outliers; all other sets are explicitly discounted.

**R.T.P. Builder savings:**
- "Build Your Own Routine & Save 20%" — the discount applies to the custom bundle, not individual items. The 20% is the incentive to bundle through the builder rather than add items individually. [via page fetch]

---

## CTA strategy

| Surface | CTA copy | Mode |
|---|---|---|
| Sets hub listing card | "Quick buy" | One-click add-to-cart, bypasses PDP |
| Set PDP (Snail Trio, Snail Kit) | "Add to Cart" | Single pre-bundled SKU |
| Snail 96 individual PDP cross-sell | "GET FULL ROUTINE NOW & SAVE 20%" | Adds the full routine bundle (multi-SKU add) |
| R.T.P. Builder result | "Save 20%" (implied; builder CTA not fully rendered) | Custom multi-product bundle |

The most powerful CTA — "GET FULL ROUTINE NOW & SAVE 20%" — lives on an individual product PDP as a cross-sell, not on the Sets hub. This is deliberate: the consumer starts at a single product they trust (Snail 96, the cult hero SKU), discovers the routine, and upgrades. The bundle is the upsell destination, not the acquisition entry.

No subscription toggle on any set PDP confirmed. Subscribe & Save is only available via Amazon storefront, not cosrx.com. [via search results confirming Amazon S&S but no evidence of cosrx.com subscription rails]

---

## Evidence integration

**On set PDPs:**
- The All-About-Snail Kit carries the "Always Authentic" verification link in the footer/trust band — the anti-counterfeit signal lives on set pages the same as individual PDPs.
- Clinical % data does NOT appear on the bundle/set PDPs. The "clinical metrics block" (+196.17% moisture, +35% radiance, -80% redness with methodology "Dermacosmetic Skin Science Lab Korea, 20 participants, 5/26-6/10") is on the individual Snail 96 PDP, not on the trio/kit page. The set page relies on ingredient-level claims and the product name (96%, 92%) to signal rigor.
- Benefit copy on set PDPs is shorter and more generic than on individual PDPs: "repairing, moisturizing, and soothing skin" on the All-About-Snail Kit eyebrow vs. "+196.17% moisture" on the Snail 96 PDP.

**What this means structurally:** COSRX runs a two-tier evidence model. Individual PDPs carry the full clinical block; bundle pages carry simplified benefit copy + the ingredient heritage of the brand. The bundle page assumes the consumer has already trusted the hero SKU.

---

## Cross-sell / upsell

- **"View details" per step** on set PDPs links to individual SKU PDPs — partial transparency, not a full per-product price breakdown.
- The Sets hub runs 23 sets concurrently; there is no "next tier up" explicit naming (no "Snail Trio+" premium version). The consumer self-selects depth: the $25 4-step trial kit vs. the $58.65 full-size trio.
- From the Snail 96 individual PDP, the "Your Glass Skin Routine Guide" cross-sell runs the reverse: start from a single product, discover the bundle. This bidirectional routing (hub → set PDP, and individual PDP → set as cross-sell) is the architecture.
- **No "Or buy individually" link from the set PDP.** Once on a set PDP, the consumer is committed to the bundle format or must navigate back manually.

---

## Subscription default

One-time purchase only on cosrx.com bundle pages. Subscribe & Save exists exclusively on Amazon. No subscription toggle visible on any fetched set PDP.

---

## Voice + visual identity

"Minimalist functional" with a retail efficiency overlay. The Snail Mucin Trio headline "Transform your skin with 3 easy steps!" is aspirational and accessible — not clinical, not irreverent. The All-About-Snail Kit eyebrow copy ("COSRX's Most Loved 4-step Advanced Snail Trial Kit") is product-fact-first. No emoji on set pages (emoji appear on the homepage promo carousel but are absent from set PDPs). Sets are utility-forward: the product names carry the scientific signaling (96%, 92%), the surrounding copy is conversational.

---

## What to lift for Clarté

1. **Numbered-step composition display as the canonical bundle format.** The "Step 1 / Step 2 / Step 3" with product name + volume + one-line benefit per step is the right model for Clarté's protocol pages. Each of Clarté's 3-5 protocol products maps cleanly to a numbered morning/evening step. Apply to: the product section on `/acne`, `/barrier`, `/even-tone`, `/renewal` protocol pages. Use `font-mono` for the "STEP 01" label (JetBrains Mono, 4-character max, uppercase) and Fraunces italic for the product name below. See section **Composition display** above for the exact structure.

2. **"Build Your Own + Save 20%" builder as a secondary path alongside pre-curated bundles.** COSRX runs both surfaces concurrently. Clarté's four fixed protocols are the primary path; a "Mix your own" builder (pick 3 products, get 15% off) could serve the advanced buyer who already knows what actives they want. Hold for post-launch once individual SKU volume justifies it. Apply to: new `/build-routine` route, Phase 3.

3. **PDP cross-sell as the bundle's primary acquisition surface.** The most powerful COSRX bundle CTA is not on the Sets hub — it's the "GET FULL ROUTINE NOW & SAVE 20%" cross-sell on the individual Snail 96 PDP. For Clarté: every individual SKU PDP should carry a "Complete the Clear-Skin Protocol — 12-week bundle" card below the buy box, with the protocol price and a single "Add Protocol to Cart" CTA. This is the most-leveraged bundle entry point because the consumer has already committed trust to the individual product. Apply to: `components/product/ProductDetailPage.tsx`, the "Complete the Protocol" cross-sell block.

4. **"Quick buy" on the Sets hub listing card — with a guard.** COSRX's hub lets a consumer add any set without visiting the PDP. For Clarté's COD model, a fast-add from the `/products` listing is operationally identical — the COD mechanic means no payment is taken at the add-to-cart step, so there is no fraud risk. Add a single "Add Protocol" button directly on the protocol bundle card on `/products`. Apply to: `components/product/ProductCard.tsx` for bundle-type SKUs.

5. **Discount percentage expressed explicitly as a badge ("15% off," "25% off"), not as "a $X value."** This is the inverse of Dr. Jart+'s "value" framing. Both exist; COSRX's percentage is more conversion-direct for the PK audience (where Rs. savings in absolute terms may resonate more than a hypothetical USD-equivalent value). Clarté can run both: "Save Rs. 1,200 (20% off)" reads both ways. Apply to: bundle card badge and buy box savings line.

---

## What to skip

- **"Quick buy" on listing cards bypassing the PDP entirely.** COSRX can afford this because the brand-trust and clinical data live in the brand reputation (46M bottles sold). Clarté's 12-week protocol purchase at Rs. 4,799 is a larger commitment that benefits from the PDP's trust infrastructure. Do not skip the PDP for protocol bundles.
- **Sets hub as a standalone destination.** COSRX's 23-set `/collections/set` hub is useful at scale; with Clarté's current 4 protocols it would be a redundant page. The `/products` page with a "Protocol Bundles" filter chip is enough. Ship the hub when bundle SKU count exceeds 8.
- **No per-product clinical data on bundle pages.** COSRX simplifies clinical claims on set pages and relies on individual PDPs for depth. Clarté should NOT follow this pattern. Protocol bundles are the primary purchase for Clarté (not an upsell from a hero SKU), so the bundle buy box should carry at minimum the three-number clinical proof block. Each step also benefits from the "why this product in the sequence" one-liner derived from clinical data.
- **Backordered / out-of-stock surfacing without a timeline.** Both the All-About-Snail Kit and Snail Mucin Trio Jar were flagged as backordered on fetch. The messaging is "backordered and will ship as soon as it is back in stock" — no date. For Clarté's COD model (where the customer pays on arrival, not now), an unspecified restock window could deter an order. If a protocol is out of stock, show the expected restock week, not just "backordered."

---

## Sources

- https://www.cosrx.com/collections/set (Sets hub — direct fetch)
- https://www.cosrx.com/products/snail-trio (Snail Mucin Trio PDP — direct fetch)
- https://www.cosrx.com/products/all-about-snail-kit-4-step (All-About-Snail Kit PDP — direct fetch)
- https://www.cosrx.com/pages/r-t-p-routine-builder (R.T.P. Builder entry — direct fetch)
- https://www.cosrx.com/pages/new-r-t-p-routine (R.T.P. editorial landing — direct fetch)
- https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence (Snail 96 PDP cross-sell — prior research, confirmed)
- https://www.cosrx.com/pages/authentic (Always Authentic — prior research)
