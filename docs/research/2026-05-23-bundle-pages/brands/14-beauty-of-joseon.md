# Beauty of Joseon — Bundle / Set Pages

**URL:** https://beautyofjoseon.com
**Positioning:** Mass-accessible "Authentic Hanbang Korean Skincare" — heritage-coded, $11–$25 price band; US-primary DTC via Shopify; top-5 US Amazon SPF brand 2023–2024.
**Why study them:** The opt-in sample tile in their cart is the single highest-priority implementation target for Clarté MD's `CartDrawer.tsx SAMPLE_TILE_SLOT`. BoJ is the only brand in this research that ships the opt-in (not auto-add) sample pattern with an explicit per-tile `Add` button AND inventory-limit gating — two features Clarté needs to replicate exactly.

---

## URL + page label

- **Bundles listing:** https://beautyofjoseon.com/collections/bundles-sets — "Bundles & Sets"
- **Secondary set collections (curated routines):** https://beautyofjoseon.com/collections/set-1 — "Set-Skincare Collection"
- **Routine collection (editorial):** https://beautyofjoseon.com/collections/cozy-glow-night-routine — "Cozy Glow Night Routine"
- **Cart (sample tile is here):** https://beautyofjoseon.com/cart — "Cart" / "Check Out"
- What they call it: "Duo," "Set," "Kit," "Palette," "Edition Gift Set," "Routine Set." No single naming convention — naming reflects the product contents, not a brand-system concept.

---

## Hero composition

**Bundles listing page (https://beautyofjoseon.com/collections/bundles-sets):**
- No distinct hero above the grid. A flash-sale banner runs site-wide: "Flash Sale ⚡ Up to 35% OFF" with live countdown timer (DAYS / HRS / MINS / SECS) and "Add Flash Sale Item, Get Free Shipping."
- Free-gift threshold tiles appear directly below the flash banner: "UNLOCK FREE GIFTS 🎁 — 1 gift with $70 / 2 gifts with $90 / 3 gifts with $120 — first-come, first-served."
- The grid opens immediately: 15+ set cards in a masonry/grid layout, no editorial copywriting above.

**Individual set PDP (e.g., "Perfect Hanbang Palette"):** Could not fetch — 404. Description inferred from listing card data.

**"Cozy Glow Night Routine" collection (editorial):**
- Headline: "Cozy Glow Night Routine" (page title only; no sub-headline, no eyebrow)
- Product grid below with flash-sale overlays per card

---

## Composition display

**Listing card format** (direct observation from https://beautyofjoseon.com/collections/bundles-sets):

Each card shows:
- Product image (carousel with ~3 photos per card — swipe/arrow to see product-stack, model-in-use, and ingredient hero)
- Star rating inline on card: e.g., "Rated 4.8 out of 5 stars"
- Review count inline on card: e.g., "(2,731)"
- Bundle name: e.g., "Glass Skin Duo"
- Descriptor subtitle: e.g., "Glass Skin Essentials Set"
- Savings label + original + sale price: e.g., "Save 30% $41.00 $28.70" (strikethrough on original, bold on sale price)
- CTA button: "SHOP" (all-caps, primary button, links to set PDP)

Products inside each set are NOT expanded on the listing card. The customer must click "SHOP" to reach the set PDP where the individual items are listed. This is standard Shopify-grid behavior; BoJ has not built a hover-expand or quick-add-set mechanism.

**Individual set PDP (inferred from listing card data + prior BoJ brand research):**
- Individual products within the set shown with thumbnail image, linked product name, size (e.g., "30ml"), and a brief benefit line.
- No per-item price shown — bundle price only.
- No AM/PM split labeling.
- Reviews tab is present (star aggregate + review excerpts from Shopify Reviews or Judge.me).

**"Glow Charging Rice Duo" — product composition example:**
The naming convention "Duo" signals exactly two products. "Perfect Hanbang Palette" signals a multi-product curated collection. "Essential Kit" signals a travel-sized version. Each name carries its own composition signal, so no explanatory "Includes X products" copy is needed. This is a clean IA move: the name IS the descriptor.

---

## Pricing transparency

All pricing on the bundles listing is explicit and public:

| Bundle | Original | Sale | Savings |
|---|---|---|---|
| Glass Skin Duo | $41.00 | $28.70 | Save 30% |
| Deep Double Cleansing Duo | $33.00 | $21.45 | Save 35% |
| Refining Pore Care Duo | $38.00 | $24.70 | Save 35% |
| Glow Charging Rice Duo | $36.00 | $23.40 | Save 35% |
| Bright & Firming Duo | $34.00 | $22.10 | Save 35% |
| Ginseng Ritual Edition Gift Set | $50.00 | $25.00 | Save 50% |
| Essential Kit | $35.00 | $22.75 | Save 35% |
| Perfect Hanbang Palette | $68.00 | $44.20 | Save 35% |
| Revive Essentials Set | $61.00 | $39.65 | Save 35% |
| Refreshing Green Routine Set | $55.00 | — | No discount shown |

Format: "Save X% $ORIGINAL $DISCOUNTED" — strikethrough on original, bold on sale. Savings % is shown before the dollar amounts. This is more prominent than the dollar savings, which reduces the "is $6 savings worth it" anchoring that can happen with only a dollar figure.

No sum-of-individual pricing is shown (i.e., they don't show "Buy separately: $41 / Buy as Duo: $28.70"). The "original price" is effectively the sum of the individual products.

No payment plan. No BNPL. No subscription.

---

## CTA strategy

**Listing page:** Single "SHOP" button per card. All-caps, no brand-language. Functional, not emotive. This is BoJ's trade-off: the brand warmth lives in the imagery and product naming, not in the CTA copy.

**Set PDP (inferred):** Single "Add to Cart" for the full bundle. No per-product Add buttons within the set PDP. No quiz CTA on set pages.

**Cart — the sample opt-in tile (the highest-priority pattern):**

This is where BoJ does its most distinctive work. From direct observation of https://beautyofjoseon.com/cart:

```
UNLOCK FREE GIFTS 🎁
────────────────────────────────────
[img] Revive Firming Moisturizer 1ml     100% off    [Add]
[img] Calming Barrier Serum 1ml          100% off    [Add]
────────────────────────────────────
1 gift will be included with $70 orders
2 gifts with $90 orders
3 gifts with $120 orders
First-come, first-served only while supplies last.
```

Key mechanics of the BoJ sample tile pattern:
1. **Two tiles, each with its own `Add` button.** The customer opts in to each individually. Neither is pre-selected or auto-added.
2. **Price shown as "100% off"** — not "FREE." The "100% off" language feels like a discount mechanic (which it is), not a giveaway. It's honest and on-brand.
3. **Inventory gating:** When a sample SKU runs out, the Add button is replaced by "Quantity Limit for This Product has Exceeded." No hiding the exhausted state — the customer sees exactly what happened.
4. **Threshold-tiered:** The number of samples you can add is gated by order total ($70 = 1, $90 = 2, $120 = 3). But the tiles are visible even if you haven't hit the threshold yet — the tiles act as a spend motivator before you qualify.
5. **Scarcity language without countdown:** "First-come, first-served only while supplies last" — date-free scarcity that doesn't expire (no ticking clock). Clinical-compatible framing.
6. **The gift emoji (🎁) appears exactly once** — at the section header. Not on each tile. Not decorative noise; a single wayfinding cue.
7. **The free-shipping hook is a separate cart strip**, not part of the sample tile section: "Add Flash Sale Item, Get Free Shipping." The two mechanics (samples + shipping) are visually and functionally decoupled.

This is the exact implementation Clarté's `CartDrawer.tsx SAMPLE_TILE_SLOT` should model. The two critical differences between BoJ's pattern and the auto-add patterns (Glossier, Augustinus Bader) are: (a) explicit per-tile `Add` button with no pre-selection, and (b) inventory-limit error state handled in the UI.

---

## Evidence integration

BoJ does not use clinical or dermatologist evidence. Their trust framework is:
- **Heritage:** "Inspired by Hanbang. Connected by Community."
- **Community:** Star ratings (4.8–4.9) + review counts (44–2,731) on every card
- **Ingredient identity:** Illustrated botanical icons (ginseng, mugwort, rice, green plum) serve as trust cues — "we know this plant deeply enough to draw it"

No before/after photos on set pages. No clinical trial data. No dermatologist credentials. This is the negative space Clarté can own.

---

## Cross-sell / upsell

- **"PAIRS WELL WITH 🛍️"** section appears in the cart — complementary product tiles below the items list. Shopify-native "also bought" carousel repurposed as a cart cross-sell with branded copy.
- No "other routines" cross-sell from the bundle PDP — you either buy this set or go back to browsing.
- Free-gift tiles in the cart serve a cross-protocol awareness function: the Revive Firming Moisturizer 1ml sample introduces the customer to a product they didn't buy, potentially seeding the next order.

---

## Subscription default

None. Single purchase only on all set pages. The BoJ referral/rewards program ("BOJ Rewards — Gift 20% Off & Get 150 Gems") is separate from the bundle pages; it's footer-only and not surfaced in the purchase flow.

---

## Voice + visual identity

"Korean apothecary / botanical poetry." The set listing uses warm gold accent colors on a soft cream background, illustrated botanical icons per ingredient family, and product photography that emphasizes the bottle's ceramic-pot or apothecary-vessel aesthetic. Copy is minimal — set names do the descriptive work. The brand's warmth comes from imagery and heritage signals, not from conversational copy. CTA copy ("SHOP") is neutral to the point of functional anonymity.

The contrast with Clarté: BoJ's warmth is visual and heritage-coded; Clarté's warmth must be voice-coded (Fraunces italic descriptive lines) and clinically grounded. BoJ proves that a warm-cream color palette works at the $20–$60 bundle price point.

---

## What to lift for Clarté

1. **Opt-in sample tile in cart drawer — maximum-priority.** Model `CartDrawer.tsx SAMPLE_TILE_SLOT` exactly on the BoJ cart implementation: two tiles (one per protocol the user HASN'T bought), each with an individual `Add` button, "100% off" label, and inventory-gating error state ("Sample unavailable — limited stock"). No auto-add. No threshold requirement (Clarté has flat Rs. 250 shipping and no spend tiers). Display the tile from order 1, not gated by cart total. Apply to: `CartDrawer.tsx` + `app/(site)/cart/page.tsx`.

2. **"Save X% $ORIGINAL $DISCOUNTED" format on protocol landing pages.** The percent-first, strikethrough-second format (not dollar-first) makes the value feel proportional rather than trivial. Apply to: the buy-box pricing line on `/acne`, `/even-tone`, `/renewal`, `/barrier`. E.g., "Save 18% Rs. 8,799 Rs. 7,199" where Rs. 8,799 is the sum-of-individual prices.

3. **Star rating + review count directly on protocol/bundle cards.** BoJ puts aggregate rating on every listing card (not just PDP). Apply to: protocol cards on the homepage + `/products` listing. Drives click-through before the customer commits to a PDP.

4. **Inventory-gated sample tile error state.** "Quantity Limit for This Product has Exceeded" is clear, neutral, and doesn't apologize. Apply this exact error-handling pattern to Clarté's sample tile component: when sample SKU stock hits 0, replace `[Add]` with `[Unavailable — sold out]` (or equivalent). Prevents empty-cart confusion on COD orders where customers might expect a sample that isn't there.

5. **Decoupled free-gift section from promo/discount strips.** BoJ keeps the free-gift threshold strip and the sample-opt-in section visually separate. Apply to: Clarté cart drawer — if a promotional banner (e.g., Eid discount) is running, keep it in a top-of-drawer strip; keep the sample tile section below items, before the order summary. Never merge the two.

6. **Botanical illustration as ingredient cue.** On `/ingredients/[slug]` pages (a new route recommended in the broader research), use illustrated icons per ingredient (niacinamide, azelaic acid, retinaldehyde, etc.) in the same flat two-tone botanical style BoJ uses on desktop. Signals depth of formulation knowledge. Apply to: new `/ingredients` index page.

---

## What to skip

- **Heritage / Hanbang positioning.** BoJ's credibility rests on "centuries-old Korean apothecary tradition." Clarté's analog is clinical formulation in Pakistan — not Yunani, not subcontinental herbal. Heritage framing undermines derm-led credibility.
- **Flash-sale countdown timer with seconds-tick** (on the BoJ site-wide banner). BoJ runs a persistent "Flash Sale ⚡ Up to 35% OFF [DD:HH:MM:SS]" ticker. This conflicts with Clarté's clinical tone. For any time-limited promotions, use date-based copy: "Eid offer ends [date]."
- **BOJ Rewards / referral (Gift 20% Off + 150 Gems).** Multi-tier loyalty programs require ops infrastructure (email triggers, balance ledgers, redemption rails) that aren't feasible on Clarté's COD-only flow.
- **Free-shipping threshold in the cart.** BoJ's "$70 for free shipping" strip. Clarté is flat Rs. 250, no threshold. Do not add a spend-to-unlock shipping message.
- **"SHOP" as CTA copy.** Functionally neutral; Clarté should use "Add to Cart" or "Add Protocol to Cart" to reinforce the protocol framing.

---

## Sources

- https://beautyofjoseon.com/ (direct fetch — homepage, flash-sale bar, sample tile structure)
- https://beautyofjoseon.com/collections/bundles-sets (direct fetch — full listing, pricing table, CTA copy)
- https://beautyofjoseon.com/collections/cozy-glow-night-routine (direct fetch — editorial collection, product grid format)
- https://beautyofjoseon.com/cart (direct fetch — sample opt-in tile mechanics, per prior research `docs/research/2026-05-23-page-ux-skincare/04-cart.md`)
- https://beautyofjoseon.com/pages/ingredients (direct fetch — botanical illustration system, prior BoJ brand research)
- `docs/research/2026-05-23-skincare-ui-ux-research/brands/14-beauty-of-joseon.md` (prior brand teardown — full brand context, not repeated here)
- `docs/research/2026-05-23-page-ux-skincare/04-cart.md` (cart teardown — BoJ cart mechanics, sample tile confirmed via direct fetch of /cart)
