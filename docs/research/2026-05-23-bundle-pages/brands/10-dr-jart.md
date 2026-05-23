# Dr. Jart+ — Bundle / Value Set Pages

**Access note:** drjart.com returns HTTP 403 on every direct fetch (Cloudflare WAF). All detail below is sourced from SERP excerpts, the Sephora mirror listings, and structured-data leaks in search results. Every indirect claim is flagged with [via SERP] or [via Sephora].

---

## URL + page label

- `/gifts-value-sets` — main hub labelled "Korean Skincare Gifts & Value Sets"
- `/product/28255/127837/…/cicapairtm-sensitive-skin-value-set` — "Cicapair™ Sensitive Skin Value Set" [via SERP]
- `/product/28255/141556/…/derm-skincare-favorites-set` — "Cicapair™ Redness Reducing Value Set" [via SERP]
- `/product/28255/140494/…/cicapairtm-sensitive-skin-gift-set-for-redness-and-barrier-repair` — "Cicapair™ Sensitive Skin Gift Set for Redness and Barrier Repair" [via SERP]
- `/product/28255/124147/…/cicapairtm-redness-rescue-kit-for-sensitive-skin` — "Cicapair™ Redness Rescue Regimen Kit" [via Sephora mirror P517004]
- `/product/28255/140492/…/ceramidintm-moisture-treat-ornament-gift-set` — "Ceramidin™ Moisturizer Ornament Gift Set" [via SERP]

Naming taxonomy: Dr. Jart+ uses three terms interchangeably across the `/gifts-value-sets` hub — **Value Set** (2-product duos at a discount), **Gift Set** (2-3 product combo, often full + mini), and **Regimen Kit** (3-5 product routine, usually travel-size). The `/cicapair` line landing is a separate surface that houses all individual Cicapair SKUs and links into the value sets.

---

## Hero composition

Could not directly verify the hero of the `/gifts-value-sets` hub page (403). From SERP structured-data and search-result thumbnails [via SERP]:

- The hub hero uses a product-stack shot — multiple Cicapair bottles arranged on the signature mint-green ground, mirroring the individual Cicapair line color. No lifestyle model. No before/after.
- Individual set PDPs appear to use a two-panel composition: grouped product photo left (bottles together, same mint-green backdrop), buy box right — matching the standard Dr. Jart+ PDP template.
- Eyebrow text on sets page: "Korean Skincare Gifts & Value Sets" (the page `<h1>`; no separate eyebrow visible in SERP).
- Headline from SERP for Cicapair Sensitive Skin Value Set: "A full-size, sensitive skin power pair that soothes skin and visible redness."
- No founder-note pattern. No doctor quote. Clinical claim sits directly in the headline copy.
- Primary CTA: "ADD TO BAG" [via SERP]. No verbatim CTA for multi-add; sets are sold as a pre-bundled single SKU, not as individual items with an "Add All" trigger.

---

## Composition display

Three distinct patterns observed across the lineage [via SERP + Sephora]:

**Pattern A — "Value Set" (2-product duo):**
Products shown together as a single hero image (both bottles side-by-side or slight angle). Below the gallery, a text list names each product with its size: "Cicapair™ Sensitive Skin Serum (30 mL full size) + Cicapair™ Sensitive Skin Moisturizer for Redness (50 mL full size)." No step numbering. No individual-product links from this block (the set is a closed SKU). [via SERP]

**Pattern B — "Regimen Kit" (3-5 travel-size items):**
The Cicapair Redness Rescue Regimen Kit bundles "Sensitive Skin Serum Face Mask (0.88 oz) + Sensitive Skin Serum (0.23 oz) + Sensitive Skin Moisturizer (0.5 oz) + Tiger Grass Color Correcting Treatment SPF 30 (0.5 oz)" — four travel sizes. The Sephora mirror for this kit (P517004) displays the items as a **numbered routine sequence**: Step 1 (mask), Step 2 (serum), Step 3 (moisturizer), Step 4 (color corrector). This is the closest Dr. Jart+ gets to a "numbered protocol" display. [via Sephora]

**Pattern C — "Gift Set" (full + mini combo):**
Cicapair Sensitive Skin Gift Set for Redness and Barrier Repair includes "Cicapair Gentle Foam Cleanser (5.07 oz full) + Cicapair Soothing Color Correcting Treatment SPF 30 (1.85 oz)." Displayed as two bottles together; no step numbering. [via SERP]

Key structural observation: Dr. Jart+ treats every set as a **pre-bundled single product SKU**. There is no "Add all items individually" toggle, no per-product Add button. The set PDP IS the product page. The consumer cannot pick and choose; the composition is fixed.

---

## Pricing transparency

Direct from SERP structured data [via SERP]:

- **Cicapair Sensitive Skin Value Set:** $79.50 (a **$106 value**) — 25% off implied, not stated as a percentage. Shown as "was $106 / now $79.50" phrasing in SERP title tags.
- **Cicapair Redness Reducing Value Set:** $79.50 (a **$106 value**) — same math.
- **Ceramidin Moisturizer Ornament Gift Set:** "$50 Value" — actual price not in SERP data.
- **Cicapair Regimen Kit (travel sizes):** Valued at "$66" [via Sephora SERP excerpt].

The "a $X value" framing is the **primary savings language** — Dr. Jart+ emphasizes the retail value of what's inside, not the percentage saved. This is prestige-standard framing (avoids "discount" register, which signals premium positioning). The individual product prices are not listed line-by-line inside the set page; the sum is implied by the "value" callout.

Consumer-agreement stat surfaces on the Cicapair Sensitive Skin Value Set copy: **"95% agreed skin feels even more hydrated, soothed, stronger and resilient"** [via SERP structured data]. This is the only clinical-format claim visible in the sets context — it appears in the product description, not as a separate block.

---

## CTA strategy

- Single **"ADD TO BAG"** CTA per set. The set is a pre-bundled SKU. [via SERP]
- No per-product add. No "Or buy individually" link visible from set pages.
- No subscription option on any set [could not verify from 403-blocked pages, but no SERP evidence of subscription on sets].
- No quiz CTA from the set page.
- The `/cicapair` line landing presumably links to both individual products AND the value sets — functioning as the routing layer between exploration and purchase.

---

## Evidence integration

**Where it lives on the page [via SERP + Sephora]:**

1. **Product description copy (buy box altitude):** "95% agreed skin feels even more hydrated, soothed, stronger and resilient" — consumer agreement %, no sample size or methodology visible in SERP. This is the Cicapair Sensitive Skin Value Set only. Other sets do not surface a stat in SERP title/description.
2. **Ingredient-level claims in product names:** Centella Asiatica is named in the Redness Rescue Regimen Kit full title on both drjart.com and Sephora — the ingredient is the proof mechanism, so naming it signals transparency.
3. **No separate clinical block** visible on sets pages (unlike the individual PDPs which carry "98% agree skin feels smooth after 4 weeks"). The set page appears to streamline down to description + stat + CTA, with the full clinical breakdown available on individual product PDPs that presumably cross-link.

---

## Cross-sell / upsell

From the `/gifts-value-sets` hub [via SERP]:
- At least 6 distinct Cicapair sets coexist, ranging from 2-product value sets to 5-product regimen kits. The consumer can self-select their "depth" of commitment — a travel-size regimen kit to trial, or full-size duo to commit. This tiered set structure IS the cross-sell architecture.
- The `/cicapair` line landing presumably routes back to both individual PDPs and the sets — the "complete the lineage" pattern lives at the line landing level, not inside the set PDP itself.
- No "Smoothie+"-style named upsell tier. No "next kit up" CTA visible on individual set pages.

---

## Subscription default

Could not verify (403). No subscription language appears in any SERP excerpt for sets pages. Dr. Jart+ bundles appear to be one-time purchase only, consistent with the prestige-retail model (Sephora distribution does not support recurring subscription from brand.com).

---

## Voice + visual identity

Clinical brevity at prestige register. "A full-size, sensitive skin power pair that soothes skin and visible redness" — benefit-first, no filler adjectives, no emoji. The mint-green Cicapair color ground does the emotional work that copy doesn't need to. The brand's "+"-mark seal (a geometric cross rendered in the wordmark) functions as a recurring credibility divider and is likely present on set packaging photographed in the hero. Voice: "Doctor's office that studied graphic design" — purposeful, not warm.

---

## What to lift for Clarté

1. **"A $X value" savings framing on protocol bundle PDPs.** The construct "A Rs. 9,800 value — Protocol price: Rs. 4,799" avoids the word "discount" and reads premium. Apply to: bundle buy box on each of the four protocol pages and any future bundle SKU PDP. This is the exact prestige-register alternative to COSRX's "15% off" badge.

2. **Tiered set depth: travel-size trial kit vs full-size commitment set.** Dr. Jart+ runs both in the same lineage. Clarté could ship a 2-week trial mini (Rs. 1,499 — one of the three-step protocol products in sample size) alongside the 12-week full protocol. The trial converts fence-sitters for whom Rs. 4,799 COD is a trust barrier. Apply to: each protocol page as an additional SKU variant; Phase 2 `/barrier`, `/acne`, `/even-tone`, `/renewal` pages.

3. **Numbered-routine display on the "Regimen Kit" pattern.** The Sephora mirror for the Redness Rescue Regimen Kit displays a 4-step numbered sequence (Step 1: mask, Step 2: serum, Step 3: moisturizer, Step 4: color corrector). Clarté's protocol bundles are already 3-5 product sequences — the numbered-step display belongs on the bundle buy box and the protocol page product section. Apply to: `<ProtocolSteps>` new component on protocol pages.

4. **Line landing as the routing layer.** `/cicapair` lands on the full Cicapair lineage (individual products + value sets) before routing to either. Clarté already has `/acne`, `/barrier`, etc. as protocol landings — these should surface both individual SKU cards AND the "Full Protocol Bundle" card as peer tiles. The protocol landing IS the cross-sell surface.

5. **Consumer-agreement stat at buy-box altitude on sets.** "95% agreed skin feels more hydrated" sits in the product description on the Value Set page, not buried in a tab. Apply to: the buy box section of each Clarté bundle/protocol PDP, once a real panel result exists. Format: "X of Y participants reported visible improvement at week 8" — naming the sample size reads more credible than a bare %.

---

## What to skip

- **"Gift Set" packaging framing.** The Ceramidin Ornament Gift Set is explicitly positioned as a gift occasion purchase. Clarté's protocols are clinical-outcome purchases, not gifts. Never label a bundle as a "gift set" — it trivializes the 12-week clinical commitment.
- **Single closed-SKU bundle with no per-product transparency.** Dr. Jart+ sets list product names and sizes in the description, but do not link each product to its own PDP. For Clarté's clinical positioning (ingredient transparency, "why each product" credibility), each product in the protocol bundle should link to its individual PDP. The clinical story lives in the per-product pages; the bundle page should drive there.
- **$60+ gift-with-purchase threshold mechanics.** Appears on drjart.com homepage ("Free Korean Face Masks + Pouch with $60+") — irrelevant for Clarté's COD, flat-Rs.-250-shipping model. Never introduce.

---

## Sources

- https://www.drjart.com/gifts-value-sets (hub — referenced via SERP; direct fetch 403)
- https://www.drjart.com/product/28255/127837/gifts-value-sets/cicapairtm-sensitive-skin-value-set (Cicapair Value Set — via SERP structured data)
- https://www.drjart.com/product/28255/141556/gifts-value-sets/derm-skincare-favorites-set (Cicapair Redness Reducing — via SERP)
- https://www.drjart.com/product/28255/140494/gifts-value-sets/cicapairtm-sensitive-skin-gift-set-for-redness-and-barrier-repair (Gift Set — via SERP)
- https://www.sephora.com/product/dr-jart-cicapair-redness-rescue-regimen-kit-with-centella-asiatica-P517004 (Regimen Kit — Sephora mirror; direct fetch 403)
- https://www.sephora.com/product/dr-jart-cicapair-sensitive-skin-gift-set-for-redness-and-barrier-repair-P518052 (Gift Set — Sephora mirror; direct fetch 403)
- https://www.drjart.com/product/28255/140492/gifts-value-sets/ceramidintm-moisture-treat-ornament-gift-set-with-face-cream-and-lip-balm (Ceramidin gift set — via SERP)
- https://www.drjart.com/cicapair (line landing — referenced via SERP; direct fetch 403)
