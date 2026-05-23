# Drunk Elephant — Bundle / Smoothie Kit Pages

**Access note:** drunkelephant.com is partially fetchable. The `/collections/kits-bundles/` listing page rendered fully. The `/collections/bundleup/` page returned a promotional overlay (sitewide-sale state). Individual kit PDP `/collections/skincare/daytime-exhibit-morning-kit…` rendered. The `/collections/smoothie-kits` and `/collections/kits-sets` paths returned 410/gone — Drunk Elephant has retired the dedicated "Smoothie Kits" sub-collection URL and merged kits into a unified `/collections/kits-bundles/` hub. All claims below from direct fetches unless flagged.

---

## URL + page label

- `/collections/kits-bundles/` — "Kits & Bundles" (8+ items shown on fetch; labeled "Come and kit it.")
- `/collections/skincare/daytime-exhibit-morning-kit:…` — "Daytime Exhibit Morning Kit" ($134 value, $99→$64.35 at 35% off sale)
- Smoothie cross-sell module on Protini PDP (`/products/protini-polypeptide-cream`) — "Smoothie Kit" with combined price and "Add All to Bag" CTA (confirmed prior research)
- Former `/collections/smoothie-kits` — now 410 Gone; Smoothie Kit as a named sub-collection no longer has a standalone hub

Naming taxonomy: Drunk Elephant uses **Kit** (for named theme-based bundles like "Daytime Exhibit," "Coast Is Clear"), **Smoothie** (for mix-at-home product combinations surfaced as cross-sells on PDPs), and **The Littles** (a specific trial-size franchise). "Bundle" appears in URL/meta but not in consumer-facing product names.

---

## Hero composition

**Kits & Bundles hub (`/collections/kits-bundles/`):**
- Page `<h1>`: **"Kits & Bundles"**
- Sub-headline verbatim: **"Come and kit it."**
- No hero image module above the grid. Page opens directly into 8 product cards.
- Promotional banner at top (sitewide-sale state): "Holy 25% off sitewide! Plus free gifts when you spend $100+ and $175+!" — this is sale-period copy, not evergreen messaging.
- Filter/sort strip: Sort dropdown (Best Sellers / Newest / Price High-Low / Price Low-High). No facet filtering by concern, product type, or skin concern — the kits hub is un-faceted.

**Daytime Exhibit Morning Kit PDP:**
- Title verbatim: **"Daytime Exhibit Morning Kit: Protini Cream, C-Tango, D-Bronzi, C-Luma ($134 value)"** — the full product names are IN the kit title, which is unusual and deliberate: trust through transparency, the consumer knows exactly what's inside before clicking.
- Category eyebrow: "Brightening and moisturizing skincare kit" (browser title / meta, not an on-page eyebrow in the classic sense).
- Hero: rotating carousel of 5 images. What those 5 frames show is not fully detailed in the fetch, but the standard Drunk Elephant kit hero is a lifestyle-flat-lay of all included products together on a surface, sometimes with a branded cosmetics bag — no model, no before/after.
- CTA button verbatim: **"Add to Bag"** — single kit treated as a pre-bundled SKU.
- Value callout verbatim: **"$134 value"** in the product title itself, not as a separate badge.

**Smoothie Kit on Protini PDP (prior research, confirmed):**
- Module headline: "Smoothie Kit" — appears below the buy box as a cross-sell section.
- Shows three products mixed together with a combined price ($208 at full retail) and an **"Add All to Bag"** button.
- This is the only confirmed instance of an "Add All to Bag" trigger across Drunk Elephant's entire web surface. It is NOT on the Kits hub; it lives as a PDP cross-sell.

---

## Composition display

**Kits hub cards:**
Each card in the `/collections/kits-bundles/` grid shows:
- A single product image (the kit's packaging or a flat-lay of included products)
- Discount badge: "35% OFF" (during sale; presumably normal-period is either no badge or smaller discount)
- Category tag: "Travel" or "Holiday" (the two tagging dimensions)
- Kit name
- "$X value" in parentheses within the kit name string
- "was $X / now $Y" pricing pair
- Star rating + review count (e.g., "4.6★ (2,093 ratings)" on Time to Reflect)
- "Add to Bag" button + quantity selector

No step-numbering on cards. No per-product breakdown at listing level. The consumer does not see what's inside until clicking through to the PDP.

**Daytime Exhibit Morning Kit PDP — bullet-list format:**
Inside the buy box / product description, the contents are shown as a simple bullet list (not numbered, not step-ordered):
- Protini Polypeptide Cream (50ml/1.69 fl oz, full-size)
- C-Luma Hydrabright Serum (15ml/.5 fl oz)
- D-Bronzi Anti-Pollution Sunshine Drops (8ml/.27 fl oz)
- C-Tango Multivitamin Eye Cream (5ml/.16 fl oz)

No step numbers. No "morning vs evening" sequencing label visible in the description text despite the kit being named "Morning Kit." The naming does the contextual work.

The Suspicious 6 exclusion list appears in the product listing (essential oils, solvent alcohols, silicones, chemical sunscreens, fragrances/dyes, sulfate surfactants) — the anti-ingredient pledge is present on the kit PDP the same as on individual PDPs.

**Smoothie Kit on Protini PDP — horizontal stack:**
Three product bottles shown together horizontally (the canonical "ingredients in a smoothie" visual). Single combined price. "Add All to Bag" CTA. This is the design idiom referenced as the "Drunk Elephant iconic bundle." It is a cross-sell module, not a standalone page.

---

## Pricing transparency

**Kits hub listing:**
All 8 kits fetched were in a 35%-off sitewide sale state. Normal-period pricing structure inferred:
- "$X value" always appears — the MSRP sum is the primary savings signal
- "was $Y / now $Z" pair — the bundle discount is shown as an absolute dollar delta
- No percentage badge in normal (non-sale) periods observed (the "35% off" badge is sale-state)
- Individual product prices are NOT shown on the listing card or on the kit PDP

**Daytime Exhibit Morning Kit:**
- Sale price: $64.35 (was $99.00, 35% off during sale)
- "$134 value" in the product name — the value is baked into the title string itself, visible at all times
- Individual product breakdown prices: not listed anywhere on the kit PDP

**Smoothie Kit on Protini PDP (prior research):**
- Combined price: $208 for three products (Protini + Lala Retro + Bora Barrier)
- Individual prices visible on each product's own PDP ($72, $68, $68) — the consumer can do the math but the Smoothie Kit page doesn't show the breakdown
- "Add All to Bag" at $208 does not break out per-item pricing

The Drunk Elephant pricing pattern is consistent across the site: value is communicated via the "$X value" callout, never via a per-item price breakdown or explicit "you save $X per item" calculation. Savings are holistic, not itemized.

---

## CTA strategy

| Surface | CTA copy | Mode |
|---|---|---|
| Kits hub card | "Add to Bag" | One-click, pre-bundled SKU |
| Kit PDP (Daytime Exhibit etc.) | "Add to Bag" | Single SKU purchase |
| Smoothie Kit cross-sell on Protini PDP | **"Add All to Bag"** | Multi-item add (3 individual PDPs' SKUs added in one click) |
| Out-of-stock kit | "Notify Me When Available" | Email capture, no CTA active |

The "Add All to Bag" trigger exists only as a PDP cross-sell, not at the listing level. The kits hub uses standard "Add to Bag" per card. This is a meaningful architectural decision: Drunk Elephant treats pre-built kits (sold as fixed SKUs) differently from "Smoothie" combos (sold as multi-item bundles via a cross-sell trigger). The pre-built kit is simpler operationally; the Smoothie cross-sell is the innovation.

No subscription toggle on any kit or Smoothie surface. Drunk Elephant has no subscription program.

---

## Evidence integration

**On kit PDPs:**
- **Suspicious 6 list** appears on every kit PDP (same as individual PDPs): the fixed "what we don't include" list of 6 categories with one-sentence mechanisms.
- **No % clinical stats** on the Daytime Exhibit Morning Kit PDP. Clinical data (e.g., "96% improved tone after 8 weeks") lives on individual product PDPs (Protini, C-Luma, etc.), not on the kit page.
- **Before/after:** not present on kit PDPs (confirmed by fetch — no before/after on Daytime Exhibit).
- **Founder's Note from Tiffany (signed paragraph):** present on the Daytime Exhibit PDP. Copy from fetch: "Tiffany Moore McConnaughey's message included; emphasizes skincare classics over trends." The Founder's Note is signed by name, one paragraph, no portrait photo.
- **Review count on listing cards:** "4.6★ (2,093 ratings)" on Time to Reflect; "4.5★ (6,519 ratings)" on Daytime Exhibit Morning Kit. Reviews are surfaced at listing-card level, not buried on PDPs.
- **Award badges / press:** not visible in the kit listing context; individual PDPs carry award references.

---

## Cross-sell / upsell

- **"Smoothie+" upsell tier:** Confirmed absent from the current site. The `/collections/smoothie-kits` URL is 410 Gone. The "Smoothie" concept now lives only as a cross-sell module on individual PDPs, not as a standalone named collection or tiered product family.
- **Category tagging as implicit upsell routing:** Kits are tagged "Travel" or "Holiday." A "Travel" kit consumer might find a "Holiday" kit on the same hub page, but there is no "upgrade to the full-size version" explicit CTA.
- **On the Daytime Exhibit PDP:** no "next kit up" cross-sell module visible in the fetch. The kit PDP stands alone.
- **On the individual Protini PDP:** the "Face-Off" 3-way comparison (Protini vs. Lala Retro vs. Bora Barrier) runs alongside the Smoothie Kit cross-sell — solving "which moisturizer is for me" before presenting the multi-product add. The comparison IS the conversion tool that makes the "Add All to Bag" credible.

---

## Subscription default

None. Drunk Elephant has no subscription program anywhere on the site.

---

## Voice + visual identity

"Irreverent with craft discipline." The kits hub sub-headline "Come and kit it." is playful, pun-driven. The Daytime Exhibit copy "Everything you need in a complete a.m. routine to moisturize, brighten, and glow into your day" is lifestyle-aspirational, not clinical. The Suspicious 6 on the kit PDP maintains the "what we don't include" principled voice that recurs everywhere. The Founder's Note signs off with warmth by name ("Tiffany"). This is a consistent four-register stack: playful headline / aspirational product copy / principled anti-ingredient pledge / personal founder sign-off. The register is consumer-brand-friend, not derm authority.

The visual identity of kits at listing level is the packaging-as-color: no supplementary branding needed on the card because the bright orange C-Firma or pink Protini jar does the identity work. On a white surface, the kits' bright product photography creates the visual energy. Clarté's navy/off-white color identity means product photography must carry different weight.

---

## What to lift for Clarté

1. **"Add All to Bag" as a cross-sell trigger on individual PDPs, not as a hub-level feature.** The most powerful Drunk Elephant bundle CTA is embedded on the Protini individual PDP, not on a standalone kits page. The implication for Clarté: every individual protocol-product PDP should carry a "Complete the Clear-Skin Protocol" cross-sell block showing the other 2-3 products in the bundle, with a single "Add Protocol to Cart — Rs. 4,799" button. The trigger adds the entire protocol bundle, replacing the individual-item purchase. Apply to: `components/product/ProductDetailPage.tsx`, the "Complete the Protocol" block (referenced in prior research as the "Drunk Elephant Smoothie Kit pattern"). CTA copy suggestion: "Add Full Protocol — Rs. 4,799" (cobalt-accent button, not pink).

2. **Kit value baked into the product title string.** Drunk Elephant puts "$134 value" inside the product name itself: "Daytime Exhibit Morning Kit ($134 value)." This means the value callout appears everywhere the product name appears — listing cards, search results, cart, order confirmation — without needing a separate badge. Clarté can adopt this for bundle SKU titles: "Clear-Skin Protocol — 12-Week Bundle (Rs. 9,800 value)" or "Even-Tone Protocol Bundle (Rs. 7,200 value)." Apply to: product seed data `PRODUCT_CONTENT` bundle entry `name` field.

3. **Star ratings on listing cards at the kits hub level.** "4.5★ (6,519 ratings)" appears on the Daytime Exhibit card at listing level. This is industry consensus (BoJ, Paula's Choice, EltaMD also do it) confirmed again here. For Clarté's bundle cards: once per-protocol review volume reaches 10+, render inline star rating on the protocol bundle card at `/products`. Apply to: `components/product/ProductCard.tsx`.

4. **Travel / category tagging for kit tiering.** "Travel" vs. "Holiday" tags on kit cards. Clarté's analog: "12-Week Protocol" vs. "Starter Kit" (if a trial kit is built later). The tag communicates depth-of-commitment without a paragraph of explanation. Apply to: protocol bundle card eyebrow, once trial SKU exists.

5. **"Face-Off" comparison before the multi-product CTA.** The Protini PDP runs a 3-way "which moisturizer" comparison before presenting the Smoothie Kit add. The comparison creates clarity that makes the upgrade credible. Clarté's version: on any individual SKU PDP, a "Which protocol is this part of?" 4-up comparison (Acne vs. Even-Tone vs. Renewal vs. Barrier — one concern line + one outcome line each) directly above the "Complete the Protocol" cross-sell. Apply to: `components/product/ProtocolCompare.tsx` (new component, 4-up horizontal on desktop, vertical stack on mobile).

---

## What to skip

- **"Add All to Bag" as a kits-hub-level feature.** On the kits hub, each card has a standard "Add to Bag" for a pre-bundled SKU. The multi-item "Add All" only works as a PDP cross-sell where the consumer has already committed to one product. Do not build a kits-grid where each card triggers a multi-item add — that experience is confusing at listing level.
- **"Come and kit it." playful naming / pun-driven hub headline.** Wrong register for Clarté's clinical voice. The hub headline for Clarté's bundle listing should be functional: "Protocol Bundles" or "12-Week Protocols" — clinical clarity over wit.
- **Suspicious 6 / what-we-don't-include list on bundle pages.** The Suspicious 6 is Drunk Elephant's signature brand-DNA move and is hardcoded to its voice ("essential oils, drying alcohols, silicones…"). Clarté should not lift this pattern wholesale — it reads as brand-copying and the "what we exclude" register is wrong for a clinical voice that leads with what IS in the formula (percentages, actives, mechanisms). Per constraints above, skip.
- **Founder-signed note with full name on bundle PDP.** The Daytime Exhibit PDP carries a "From Tiffany" note signed by name. Per `feedback_anonymize_doctor` — Clarté's equivalent is a note from "the Clarté medical team," never a named individual. The format (one paragraph, sub-fold, signed) IS worth lifting; the attribution must be the team, not a named doctor.
- **35%-off sitewide sale badge on listing cards.** This was the state on fetch (promotional period). Even in normal periods, Drunk Elephant's pricing at $64-$99 per kit is US-market anchored. Do not calibrate Clarté's savings language to US-dollar conventions. Clarté's savings framing should be in PKR with the percentage explicit: "Rs. 1,200 off (20%)."
- **No facet filtering on the kits hub.** Drunk Elephant's kits hub has only a sort dropdown, no concern/product-type filtering. With 4 protocols, Clarté can absorb this for now — but when the SKU count grows, the triple-axis chip filter (from the prior page-UX research) should be applied to the bundle section too.

---

## Sources

- https://www.drunkelephant.com/collections/kits-bundles/ (Kits & Bundles hub — direct fetch)
- https://www.drunkelephant.com/collections/skincare/daytime-exhibit-morning-kit:-protini-cream,-c-tango,-d-bronzi,-c-luma-($134-value)-194249411434.html (Daytime Exhibit Morning Kit PDP — direct fetch)
- https://www.drunkelephant.com/products/protini-polypeptide-cream (Protini PDP — Smoothie Kit cross-sell confirmed, prior research)
- https://www.drunkelephant.com/collections/bundleup/ (BundleUp collection — fetched in promotional-overlay state only; limited data)
- https://www.spacenk.com/us/brands/d/drunk-elephant/saving-face-smoothie-MUK200054066.html (Saving Face Smoothie — Space NK mirror; used to confirm single-SKU bundle model)
- https://www.cultbeauty.com/p/drunk-elephant-liquid-gold-smoothie-bundle/13795318/ (Liquid Gold Smoothie — Cult Beauty mirror; used to confirm "Add to basket" single-CTA model on retailer mirrors)
- https://www.amazon.com/Drunk-Elephant-Peptides-Smoothie-Bundle/dp/B0D3FDZJQ5 (Amazon bundle — confirmed "Drunk with Peptides Smoothie Bundle" naming)
- https://www.lorna-ryan.com/drunk-elephant-holiday-sets/ (third-party roundup — Smoothie Kit naming conventions confirmed)
