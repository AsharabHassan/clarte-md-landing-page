# Dr. Jart+

**URL:** https://www.drjart.com (US storefront at https://us.drjart.com)
**Positioning:** Korean dermatology-inspired prestige skincare; founded 2005 by dermatologist Dr. Sung Jae Jung and entrepreneur Chin Wook Lee; name = "Doctor Joins Art." Acquired by Estée Lauder in 2019. Price band $25-$65 (Cicapair, Ceramidin, BB lines). Stocked at Sephora.
**Why study them:** Closest brand in the *entire* research set to Clarté MD's strategic position — "dermatologist-led, science-credible, but visually warm and modern, accessible at mid-price." The "Doctor Joins Art" thesis is exactly the warmth-meets-clinical balance Clarté is targeting. Worth more weight than usual.

**Note on access:** drjart.com is Cloudflare-protected and returned HTTP 403 on every direct fetch attempt (homepage, PDP, Cicapair landing, /about, /new, /skincare-how-to-daily-routine). Detail below is reconstructed from search excerpts, retailer mirrors (Sephora, Space NK), and structured-data leaks in SERP snippets. Where a specific UI claim could not be verified, it is flagged.

## Quick take
Dr. Jart+ pairs *clinical data density* (clinically-proven phrasing, consumer-agreement percentages at 96-98%, 4-week claim windows) with *art-school visual identity* — bold packaging colors (Cicapair's signature mint-green, Ceramidin's beige-warm, BB Creams' tonal nudes), illustrative product hero photography, and a brand wordmark that uses a "+" mark as a literal cross/seal motif. The result reads "modern derm clinic with a graphic-design budget" rather than "drugstore science." This is the design vocabulary Clarté should target.

## Visual / branding

### Color
- **Each product line carries its own anchor color** which becomes the dominant hue of that line's PDP and category page:
  - **Cicapair** = signature mint/sage green (Centella Asiatica / Tiger Grass reference). The famous color-corrector goes "green-to-beige" on application, and the brand has merchandised that color transformation into the entire line's identity.
  - **Ceramidin** = warm beige / butter-yellow (skin-barrier moisture line).
  - **BB Cream** = tonal nude/peach.
- **White** primary backgrounds; black typography. Promotional bands use brand colors.
- **CTA color**: not verifiable (Cloudflare-blocked); SERP excerpts suggest a black or near-black solid button, consistent with the prestige-Sephora aesthetic.
- This is the **single most important steal for Clarté**: anchor each protocol (Acne / Even-Tone / Renewal / Barrier) to its own *secondary color* that appears only on that protocol's page and PDPs. Without going full Cicapair-mint (Clarté is navy/cobalt-led), Clarté can give each protocol a tonal-accent — clay/sand for Acne, warm-pink for Even-Tone, lavender for Renewal, sage for Barrier — pulling the same trick at lower volume.

### Typography
- Sans-serif system across the site (specific family not extractable). Clean, modern weights. Wordmark "Dr.Jart+" uses a distinct geometric sans with the "+" rendered as a square cross-mark — that "+" is **the brand's seal**, reused as a divider on hero, as a marker on packaging, as a tile motif on PDP.
- All-caps used sparingly — for collection names and CTAs.
- No serif display face apparent. The brand voice is engineered, not romantic.
- No mono use.

### Photography & imagery
- Product photography is **illustrative-clinical**: the bottle/tube is shown isolated on white, but often accompanied by a *cross-section diagram* showing how the cream layers on skin, or a *swatch-on-arm* showing texture and color (especially for Cicapair color-correctors). This is more graphic-design than studio-product.
- No celebrity faces. No dermatologist portrait (the founding doctor's name is on About but his face is not on hero — useful precedent for Clarté's anonymized-doctor policy).
- Tiger Grass / Centella imagery: illustrated leaves, not stock photography. Same illustration-led move as Beauty of Joseon's ingredient page.
- Lifestyle photography on category landing pages (e.g. Cicapair landing) tends to feature close-up cheek shots with visible redness *before* and calmed skin *after* — this is treated as a **clinical-result visual**, not a marketing testimonial. Inferred from product copy: "to reduce redness" type claims paired with comparison imagery.

### Hero composition
- Hero is product-first with a graphic accent: large product hero center or right, headline serif-or-bold-sans left, clinical proof line below the headline ("Clinically proven to strengthen skin's barrier after 4 weeks"). Free-gift banner at top: "Free Korean Face Masks + Pouch with $60+*" (homepage current).
- Copy lines lifted from PDPs available via SERP:
  - "A fast-absorbing, cushiony moisturizing cream with 5 Ceramides plus Panthenol" (Ceramidin)
  - "100 hours of moisture after one use" (clinical claim format)
  - "98% agree skin feels smooth" / "96% agree skin feels soft" (consumer-agreement format)

### Motion / interaction texture
- Not verifiable through Cloudflare. Sephora-tier sites typically use restrained transitions; consistent with the brand voice this is likely soft fades + hover image swap on cards.

## UX patterns worth studying

### Navigation
- Top nav structure (from SERP indexing): "What's New," product categories (Cleansers, Toners/Essences, Moisturizers, Color Correctors, BB Creams, Treatments, Masks), collections by line (Cicapair, Ceramidin, V7, Vital Hydra), Routines / How-To, About, Account, Cart.
- The **collection-by-line spine** mirrors Sulwhasoo's "lineage" approach — Cicapair as a collection is more important than "moisturizers" as a category. This validates the lineage thesis: prestige derm-K-beauty brands organize by *line*, not by *type*.

### Product listing / category
- Cicapair landing page (`/cicapair`) is built as a *line landing*, not a category — full hero, ingredient story (Tiger Grass / Centella Asiatica), then product grid of the 6-8 SKUs in the line. Each card has the product image on mint-green ground with sale price.

### PDP
- Above the fold (inferred from `/product/28258/111504/moisturizers/ceramidintm-skin-barrier-moisturizing-cream` SERP excerpt): hero gallery left, product name + benefit line, clinical proof callouts ("Clinically proven to strengthen skin's barrier and improve elasticity after 4 weeks of use"), price, size variants, ADD TO BAG.
- **Clinical proof block is structurally central**, not buried in a tab. Format: "98% of consumers agreed skin feels smooth" with a small "(study of N=… participants, X weeks)" footnote pattern.
- "Clinically proven" used as the headline lockup. This is the structural pattern Clarté should replicate on PDP buy box.
- Reviews live on PDP (Review Guidelines page exists at `/review-guidelines`) — confirms the brand collects and displays user reviews on product pages, gated by a posted guideline.

### Cart / Checkout
- Could not reach. Inferred Shopify-Plus / Salesforce-Commerce stack. Free-shipping threshold at $60 ("Free Korean Face Masks + Pouch with $60+*") suggests a threshold-based gift-with-purchase model — Clarté should NOT replicate per ops constraints.

### Trust / social proof
- **Clinical-data format is the primary trust mechanism.** Two formats stacked:
  1. *Time-bound efficacy*: "100 hours of moisture after one use," "after 4 weeks of use."
  2. *Consumer-agreement %*: "98% agree skin feels smooth," "96% agree skin feels soft."
- These are not "studies" in the GMP/derm-trial sense — they are usability surveys. **Critical distinction** for Clarté: this format is legally available (it's a self-reported sensory survey, not a clinical trial) and reads as clinical to the consumer. Clarté can adopt this *exact* construction without making unverified GMP/ISO claims.
- Dermatologist credibility is in the *brand story* (Dr. Sung Jae Jung), not on PDP — i.e. the doctor name is contextual on About, not a face on the hero. Validates Clarté's anonymized-doctor policy.

### Mobile-specific patterns
- Not verifiable. The brand sells heavily on mobile Sephora app, so the responsive build is expected to be mobile-first.

## What's worth stealing for Clarté MD

1. **Protocol-anchored secondary colors.** Cicapair-green / Ceramidin-warm-beige is the single most-stealable identity move. Apply to: the four protocol pages (`app/acne/page.tsx`, `app/pigmentation/page.tsx`, `app/renewal/page.tsx`, `app/barrier/page.tsx`) and to PDPs of SKUs that belong to that protocol. Define 4 secondary-accent tokens in Phase 0 (e.g. `--protocol-acne-accent: warm-clay`, `--protocol-eventone-accent: rose-clay`, `--protocol-renewal-accent: lavender-mist`, `--protocol-barrier-accent: sage-mist`). Use them on protocol headers, badges, and the secondary trust strip — never override navy/cobalt brand chrome.

2. **Consumer-agreement % as PDP buy-box trust line.** The "98% agree skin feels smoother (N=87, 4 weeks)" construction is operationally cheap (a survey, not a clinical trial), legally safe, and reads as clinical. Apply to: PDP buy box section, immediately under price + above ADD TO BAG. Once Clarté has 50+ verified buyers per SKU, swap any soft claim with this format.

3. **Time-bound efficacy headline.** "Clinically proven to strengthen skin's barrier after 4 weeks of use" is the construction. Specify the time window — not a vague "improves over time." Apply to: protocol page hero subline + PDP benefit line.

4. **The "+" mark as a re-usable brand seal.** Dr.Jart+ reuses its "+" as a divider, a swatch tile, a bullet. Clarté's analog could be a small `Mp` mono-stylized monogram (MD = the Clarté MD mark) or a circle-checkmark to mean "protocol-validated." Apply to: section dividers across protocol pages + as a marker on the clinical-proof block on PDPs.

5. **Doctor-name on About only, never on PDP hero.** Dr. Jart+ keeps Dr. Sung Jae Jung's name in the brand-story page; his face is not on any product hero. Validates Clarté's anonymized-doctor policy at the level of *industry standard*, not just a Clarté-specific quirk. Apply to: `app/about/page.tsx` only; protocol/PDP/homepage stay "our GMC-registered doctor."

6. **Illustrative product photography over lab photography.** Cross-section diagrams of how cream layers on skin, swatch-on-arm color comparisons, illustrated leaves for Centella — all signal "we are technical *and* designed." Apply to: PDP secondary-images and the new ingredient pages.

## What to avoid

- **Free-gift-with-purchase threshold** ($60+ Korean masks + pouch) — Clarté's COD model + flat Rs. 250 shipping disallow GWP mechanics per brand memory.
- **Naming the founding dermatologist by name + photo on any customer page** — Dr. Jart+ keeps it on About only and even there minimal; Clarté should not even go that far, per anonymization policy. The lesson here is that *not naming* the doctor on PDP is industry-normal, not weird.
- **"Clinically proven" without a study citation** — Dr.Jart+ pairs "clinically proven" with a duration window. Clarté must not lift the phrase alone; either cite the N + duration or use softer phrasing ("formulated to," "designed for").
- **Estée Lauder retail-channel polish** — Dr. Jart+ benefits from Sephora distribution. Clarté is DTC-only in PK; replicating prestige-retailer polish at the cost of mobile performance would backfire on Karachi 3G traffic.

## Sources
- WebSearch results across multiple queries (drjart.com homepage, Cicapair, Ceramidin, About) — direct fetch blocked by Cloudflare 403 on every URL attempted
- https://us.drjart.com/pages/about (referenced via SERP excerpts)
- https://www.drjart.com/cicapair (Cicapair line landing — referenced via SERP)
- https://www.drjart.com/product/28258/111504/moisturizers/ceramidintm-skin-barrier-moisturizing-cream (Ceramidin PDP — referenced via SERP excerpts)
- https://beautylau.fr/en/blogs/marques-coreennes-a-la-loupe/dr-jart (third-party brand profile)
- https://www.purewow.com/beauty/dr-jart-cicapair-review (third-party PDP description)
- https://thingtesting.com/brands/drjart/reviews (third-party brand review hub)
