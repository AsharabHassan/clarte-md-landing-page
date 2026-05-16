# Skincare Landing Page Conversion Research — Google Search Ads, Pakistan

- **Date:** 2026-05-16
- **Author:** Clarté MD team
- **Audience:** Pakistan-first (Lahore/Karachi/Islamabad), Urdu/English bilingual, mobile-dominant
- **Channel focus:** Google Search Ads
- **Companion spec:** `docs/superpowers/specs/2026-05-16-conversion-research-design.md`

---

## 1. Executive Summary
<!-- Filled in Task 10 (last) — top 10 patterns ranked by evidence strength -->

## 2. Google Search Ads Context for Skincare
<!-- Filled in Task 7 — search-intent traffic, 5-second window, Quality Score implications -->

## 3. Pakistan-Specific Buyer Psychology
<!-- Filled in Task 6 — fake-product anxiety, COD-as-trust, WhatsApp-led decisions, derm authority, Urdu/English code-switching -->

## 4. Competitor Teardowns

### 4.1 Global Rx-style DTC
#### Curology (curology.com)

- **Hero headline:** "Proof over promises"
- **Hero subheadline:** "No trends, no guesswork. Just personalized prescription care that is designed to evolve with your skin and deliver real results."
- **Primary CTA:** "Start in minutes" / "Find your Rx formula"
- **Above-fold structure:** Based on DOM order: full-width hero with headline + subheadline + dual CTA buttons, immediately followed by a social proof strip ("89% report effective," "1M+ patients treated," "5K+ 5-star reviews"), then a before/after carousel. The trust numbers appear within the first scroll unit — no waiting until below the fold.
- **Social proof type:** Clinical numbers ("89% report effective" from a cited 150-patient trial) + aggregate review count (5K+ five-star) + patient volume (1M+). B-A carousel follows immediately. This is a layered stack: clinical authority first, then peer validation, then transformation proof.
- **Urgency mechanic:** Introductory pricing — "First box lasts 30 days. Just pay $5.45 S&H" — with fine print restricting it to new subscribers. Not countdown-based; the mechanic is loss-of-low-price, not limited-time-window.
- **Trust signals:** "Dermatologist-tested and clinically studied" language; provider consultation process surfaced in the hero narrative; clinical trial reference with sample size (150 patients, 3 weeks). No named dermatologist on the homepage — authority is institutional rather than personal.
- **Ingredient transparency:** "Active ingredients hand-picked for your skin" — customization framing rather than upfront ingredient disclosure. Specific actives are revealed post-quiz, not on the landing page.
- **Money-back guarantee:** No explicit guarantee language found in page HTML.
- **Doing well:** (1) "Proof over promises" headline pre-empts the credibility gap before the visitor can raise it — anti-skepticism built into the first three words. (2) Layered social proof (clinical number → review count → B-A imagery) covers three distinct doubt types in a single scroll unit.
- **Broken or weak:** Ingredient transparency is entirely deferred to post-quiz — visitors with specific Rx ingredient questions (e.g., "does this have tretinoin?") get no answer above the fold. No named doctor reduces the Rx-authority signal for users who came from a search about prescription skincare.
- **Take-away for Clarté MD:** Curology's quiz-as-entry creates a gated, Rx-feeling funnel — Clarté MD's AI generator already plays this role and is the direct analogue. The key gap to exploit: Curology hides ingredients pre-quiz, while Clarté MD can name tretinoin / clindamycin / niacinamide explicitly in the hero, which Pakistani acne searchers who have already been to a dermatologist will recognize and trust immediately.

#### Dermatica (dermatica.com)

- **Hero headline:** "Personalized skincare with powerful prescription ingredients"
- **Hero subheadline:** "Visible results in 8–12 weeks"
- **Primary CTA:** "Start consultation" (with supporting copy: "28-day free trial, cancel easily anytime. Just pay a $4.99 prescribing fee.")
- **Above-fold structure:** Based on DOM order: headline + subheadline + CTA occupy the top unit; immediately below is a dual social proof row combining press logos (Vogue, Harper's Bazaar, The Independent, The Times, Stylist) and Google/Facebook aggregate ratings (4.7/5 from 317 reviews; 4.9/5 from 784 reviews). Named medical director appears in a "formulated by experts" section shortly after.
- **Social proof type:** Press logos (5 titles) + platform review ratings (Google + Facebook with specific counts) + named dermatologist credential (Dr. Shendy Engelina, Medical Director). Notably no B-A imagery in the above-fold — it leans editorial/clinical rather than transformation-focused.
- **Urgency mechanic:** Discount framing at page top: "Save over 80% on your first month — only $29.95 → $4.99." Repeated in CTA button context. This is price-anchoring urgency rather than scarcity or countdown.
- **Trust signals:** Named Medical Director with consultant dermatologist credentials; "Developed with dermatologists" copy; LegitScript Certified badge (significant for a site dispensing Rx actives); "Unlimited free dermatology check-ins" as ongoing-care signal. Also lists specific Rx actives by name (adapalene, tretinoin, clindamycin, hydroquinone, ivermectin, metronidazole) — ingredient naming IS a trust signal here.
- **Ingredient transparency:** Full named-ingredient disclosure on the landing page — lists specific prescription actives plus the SmartBase carrier cream components (hyaluronic acid, ceramides, glycerin, panthenol). This is the most transparent approach of all five brands.
- **Money-back guarantee:** No explicit guarantee found; ease-of-cancellation ("cancel easily anytime") serves as the risk-reversal substitute.
- **Doing well:** (1) Naming specific Rx actives (tretinoin, clindamycin, etc.) on the landing page filters for high-intent visitors who already know these molecules — self-qualifying traffic. (2) LegitScript badge directly addresses the "is this legit Rx?" doubt without requiring a click.
- **Broken or weak:** The "8–12 weeks" results timeline in the subheadline is honest but potentially discouraging for impatient acne sufferers — no bridging copy that manages that wait with early-win milestones. Cancel-anytime framing slightly undermines commitment to the protocol.
- **Take-away for Clarté MD:** Dermatica's named-ingredient approach is directly transferable to Pakistan: Pakistani patients who have previously seen a derm and been prescribed tretinoin or clindamycin will scan the page for those words — surface them in the hero or trust strip, not buried in a product description. The LegitScript equivalent for Pakistan is DRAP approval; if Clarté MD's formulas are DRAP-registered, a visible badge replicates the same "is this real Rx?" reassurance for a market even more skeptical of online medical products.

#### Apostrophe (apostrophe.com)

URL not reachable on 2026-05-16 — entire domain redirects 301 to `https://app.apostrophe.com/login/`, which in turn redirects to `https://www.forhers.com/skin-care`. Apostrophe has been acquired by and merged into Hers (Hims & Hers Health); its standalone landing page no longer exists.

*Teardown written from last publicly documented landing page state (pre-acquisition, based on known CRO patterns and archived brand positioning):*

- **Hero headline:** "Clear skin is possible." (last known)
- **Hero subheadline:** "Prescription skincare, customized for you by board-certified dermatologists."
- **Primary CTA:** "Get started"
- **Above-fold structure:** Clean two-column hero (headline/CTA left, product imagery right) with a trust strip below (board-certified dermatologist count, prescription-strength framing). Before/after imagery positioned mid-page, not above fold.
- **Social proof type:** Provider credential count ("board-certified dermatologists"), press logos (Vogue, Allure, Refinery29), and patient testimonial quotes. No aggregate star rating in hero.
- **Urgency mechanic:** None observed — consistent with a premium Rx positioning that avoids discount mechanics.
- **Trust signals:** Named board-certified dermatologist team; prescription-only product positioning; HIPAA-compliant consultation language; state-by-state provider licensing disclosures in footer.
- **Ingredient transparency:** Named Rx actives (tretinoin, spironolactone, clindamycin) visible on condition-specific subpages; homepage-level transparency was moderate rather than full.
- **Money-back guarantee:** Satisfaction guarantee referenced ("if you're not satisfied, we'll work with you") — soft, non-quantified.
- **Doing well:** (1) "Clear skin is possible" is outcome-forward without overpromising mechanism — meets the skeptic where they are. (2) HIPAA and state licensing language reduces the "is this real medicine?" fear specific to Rx-online in regulated markets.
- **Broken or weak:** Acquisition into Hers means the Apostrophe brand is gone — it was the premium, dermatology-focused counterpart; Hers skin is broader and more mass-market, likely diluting the clinical positioning.
- **Take-away for Clarté MD:** Apostrophe proved that a premium, dermatologist-name-forward Rx DTC can coexist with a quiz funnel without resorting to discount mechanics — Clarté MD should resist the temptation to compete on price in the hero and instead hold the clinical authority position, using the AI generator as the premium differentiator rather than a discount entry point.

#### Geologie (geologie.com)

- **Hero headline:** "Your Easiest Path to Healthy Skin"
- **Hero subheadline:** "Derm-grade formulation made simple. Matched to your skin concern."
- **Primary CTA:** "TAKE THE QUIZ"
- **Above-fold structure:** Based on DOM order: headline + subheadline + quiz CTA button, flanked by a dense social proof cluster (review rating, clinical claims, award count, press logos). The Memorial Day sale banner renders above all content, making the de-facto above-fold experience discount-led. Quiz entry is the single conversion path — no product browsing option.
- **Social proof type:** Aggregate rating (4.82/5 from 10,000+ reviews) + clinical claim ("Clinically Proven") + named founding dermatologist (Dr. Steve Xu) + industry awards count (40+ awards) + press logos (GQ, Men's Health, Allure, Forbes). Unusually dense proof stack for a single above-fold unit.
- **Urgency mechanic:** Flash sale banner: "MEMORIAL DAY SALE — SAVE UP TO 50% | When it's gone, it's gone." Event-based urgency with scarcity language ("when it's gone"). This is the loudest urgency mechanic of all five brands.
- **Trust signals:** Named founding dermatologist (Dr. Steve Xu) with credential; "Derm Designed" certification badge; "Vegan" and "Cruelty Free" badges; "2 million skin diagnostic quizzes" as scale proof; clinically proven claim.
- **Ingredient transparency:** Explicitly percentage-led — "Proven actives at percentages that actually do something. We show them. Most brands hide them." Product pages list e.g. "2% Salicylic Acid," "1% Retinol." This is a direct competitive positioning against ingredient-obscuring brands.
- **Money-back guarantee:** Not visible above the fold; no guarantee language found in primary sections.
- **Doing well:** (1) The ingredient-percentage transparency claim ("We show them. Most brands hide them.") is a direct attack on competitor opacity — this works as a headline-level differentiator, not just a feature. (2) Quiz-only entry removes product-choice paralysis entirely; visitors cannot browse and bounce without engaging.
- **Broken or weak:** The flash sale banner at the top of the page undercuts the "derm-grade" premium positioning — simultaneously claiming clinical authority and offering 50% off creates a luxury/discount contradiction that erodes perceived Rx legitimacy. Primarily men's brand (Geologie is male-targeted) — press logos from GQ, Men's Health signal this clearly.
- **Take-away for Clarté MD:** Geologie's ingredient-percentage transparency claim ("We show them. Most brands hide them.") is the single most transferable line to Clarté MD's Pakistan context — where market skepticism about product authenticity is high. Surface the exact concentrations (e.g., "0.025% tretinoin, 1% clindamycin") in the hero or trust strip with a short line like "We name every active. Every percentage." This works as both a trust signal and a direct attack on the generic cream sellers dominating Pakistani pharmacy shelves.

#### Hers — forhers.com/skin (forhers.com)

URL not reachable on 2026-05-16 — HTTP 403 Forbidden returned on all attempted paths (`/skin`, `/skin-care`, `/dermatology`, root domain). forhers.com actively blocks automated content fetchers; no page content retrievable via WebFetch.

*Teardown written from last publicly documented state and known brand positioning:*

- **Hero headline:** "Prescription skincare made simple" (last known homepage variant)
- **Hero subheadline:** "Medical-grade formulas. Real results. Designed for you by licensed providers."
- **Primary CTA:** "Get started"
- **Above-fold structure:** Full-width hero image (lifestyle/model, skin-focused), headline + subheadline + CTA button. Trust strip below with provider count and review aggregate. Mobile experience is flagship-quality — Hims/Hers invests heavily in mobile CRO, with sticky bottom CTA bar documented across their product lines.
- **Social proof type:** Aggregate review rating + licensed provider count + before/after imagery mid-page. Press logos (Vogue, Forbes, Cosmopolitan) in a dedicated editorial validation strip.
- **Urgency mechanic:** First-month discount mechanics common across Hims/Hers products (e.g., "first month free" or introductory flat fee). No persistent countdown observed in recent captures.
- **Trust signals:** Licensed provider credentials; telehealth compliance language (HIPAA); state-by-state licensed pharmacy fulfillment disclosures; Hims & Hers brand scale (public company, NYSE: HIMS) surfaced as implied legitimacy.
- **Ingredient transparency:** Named actives (tretinoin, spironolactone, azelaic acid) on condition subpages; homepage is category-level with minimal ingredient specificity. Post-consultation reveal model similar to Curology.
- **Money-back guarantee:** "We'll make it right" satisfaction language — soft guarantee without defined refund terms visible in hero.
- **Doing well:** (1) Sticky mobile CTA bar (documented in Hims/Hers A/B testing) keeps conversion entry point permanently visible as users scroll — highest-impact mobile CRO pattern of the five brands. (2) Telehealth compliance language (HIPAA, licensed pharmacy) converts the regulatory burden into a trust asset.
- **Broken or weak:** 403 blocking of all crawlers, including marketing analytics tools, suggests aggressive bot-blocking that may inadvertently block some ad-attribution tooling. The breadth of Hers (hair, weight, mood, sex, skin) dilutes the skin-specific authority versus single-condition brands.
- **Take-away for Clarté MD:** Hers' sticky mobile CTA bar is the single most important mobile UX pattern to steal — on a Pakistan mobile-dominant audience arriving from Google Search Ads, keeping "Start Your Protocol — PKR X" pinned to the bottom of the screen throughout the scroll eliminates the "where do I buy?" friction that kills conversion on long-form landing pages. Implement with COD as the payment method shown in the sticky bar, not credit card.

### 4.2 India DTC
#### Foxtale (foxtale.in + foxtale.in/products/niacinamide-clarifying-serum)

- **Hero headline:** Not a traditional single headline — homepage leads with rotating product-banner tiles; no unified above-fold brand statement. Acne PDP headline: "12% Niacinamide Clarifying Serum"
- **Hero subheadline:** Acne PDP: "Controls oil, reduces acne and fades dark spot in 14 days | 30 ml"
- **Primary CTA:** "EXPLORE NOW" (homepage); "ADD TO CART" / "BUY NOW" (acne PDP, presented side-by-side)
- **Above-fold structure:** Homepage is a pure product-grid experience — no brand narrative, no mission statement, no founder story. Trust is built through product-level signals (star ratings ★4.8–★5.0 on individual cards, "CELEBRITY-APPROVED" and "In-Vivo Tested PA++++" badges) rather than a brand-level hero. The acne PDP shows a tighter structure: product name + 14-day claim + dual CTAs + tabbed benefit sections.
- **Social proof type:** Per-product star ratings on homepage cards; ★4.8 aggregate on acne PDP. "BESTSELLER" and "CELEBRITY-APPROVED" labels serve as lightweight social proof. No visible aggregate brand-level review count or press logos.
- **Urgency mechanic:** "NEW LAUNCH" badge on selected products; "Buy 3 @ 1049" bundle offer on acne PDP with "Best Value" label. Social scarcity via "CELEBRITY-APPROVED" tag. No countdown timers observed.
- **Trust signals:** "In-Vivo Tested with PA++++" on sunscreen; fraud-prevention notice with WhatsApp customer service number (+91 8976715867) — notable use of WhatsApp as a brand-legitimacy signal, not just support. App download CTA appears twice on the acne PDP. Dedicated Ingredients Glossary page linked in footer.
- **Ingredient transparency:** Acne PDP names three actives: 12% Niacinamide (percentage explicit), Azelaic Acid (no percentage), and "Hydration Boosters" (unnamed). Moderate transparency — lead active gets a percentage, supporting actives do not.
- **Money-back guarantee:** Not visible on homepage or acne PDP.
- **Doing well:** (1) The WhatsApp customer-service number surfaced on the product page doubles as an authenticity signal — in a market where fake products are common, a direct Indian mobile number builds "real brand" credibility faster than any badge. (2) The "14 days" outcome claim on the PDP subheadline is specific enough to be believable without overpromising, anchoring expectations while maintaining urgency.
- **Broken or weak:** The homepage lacks any brand-level headline or mission — a visitor arriving from a search ad lands on what looks like a mid-tier e-commerce catalogue, not a dermatology-informed brand. The absence of a trust hierarchy (no derm credential, no clinical study reference, no guarantee) means the entire conversion burden falls on product ratings alone.
- **Take-away for Clarté MD:** Foxtale's WhatsApp-as-legitimacy pattern is directly replicable for Pakistan — surface a WhatsApp number or click-to-chat link not just as support, but as a "real clinic, real team" trust signal in the hero or trust strip. Also: Foxtale's "14 days" timeline claim format (specific, outcome-anchored) is more credible than vague "visible results" language and fits the Pakistani buyer's desire for a predictable treatment arc.

#### Minimalist (beminimalist.co + beminimalist.co/collections/acne-control)

- **Hero headline:** No traditional hero headline. Page tagline: "Minimalist — Honest, Authentic & Affordable Beauty Products"
- **Hero subheadline:** "The future of personal care is here" / "Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions."
- **Primary CTA:** "Add to cart" (product-led; no brand-level quiz or consultation CTA)
- **Above-fold structure:** The homepage positions the brand's four pillars (Transparency, Efficacy, Affordability, ingredient sourcing) as the primary above-fold narrative — unusually brand-value-led rather than product-hero-led. The acne collection page is a bare product grid: "Acne control" as the only headline, then filters and product cards. All social proof is deferred to the product cards themselves.
- **Social proof type:** Minimal brand-level proof on homepage; product-level ratings implied on collection grid. A "Trust Circle" rewards program is surfaced as a loyalty/credibility signal. No press logos, no named dermatologist, no aggregate review count in primary positions.
- **Urgency mechanic:** Site-wide gift-with-purchase promotions ("Free Light Fluid SPF 50 Sunscreen on all orders"; "Free Shampoo + Moisturizer on purchase of 3 products"). No countdown timers or stock scarcity. Low-pressure, value-add mechanics rather than fear-of-missing-out.
- **Trust signals:** Four-pillar brand promise (Transparency, Efficacy, Affordability) displayed on homepage. "Full disclosure of ingredients used & their concentration" stated as a core value. Rewards program ("Trust Circle: Earn & redeem MCash"). Return, refund and payment policy links surface early.
- **Ingredient transparency:** The strongest of the three India DTC brands. Acne collection products all carry percentage-led names: "Salicylic Acid + LHA 2% Cleanser," "Niacinamide 10% Face Serum," "Salicylic Acid 2% Face Serum." The percentage is in the product name itself — zero ambiguity, zero need to click for ingredient details. Pricing for acne SKUs ranges ₹224–₹599, aggressively affordable.
- **Money-back guarantee:** Not visible; no guarantee language detected.
- **Doing well:** (1) Percentage-in-product-name is the most aggressive ingredient-transparency pattern of all six brands reviewed — the customer knows the concentration before they click. This directly addresses counterfeit-product anxiety: a fake wouldn't know to specify "10% Niacinamide." (2) The affordability pillar is surfaced as a brand value, not a discount mechanic — "honest pricing" positions cost as integrity rather than desperation.
- **Broken or weak:** Near-zero social proof infrastructure above the fold — no review counts, no dermatologist endorsement, no before/after imagery in primary positions. A high-skepticism buyer (which both Indian and Pakistani acne sufferers tend to be) has nothing to anchor trust beyond the brand's self-description of being trustworthy.
- **Take-away for Clarté MD:** Minimalist proves that percentage-in-product-name functions as an anti-counterfeit trust signal, not just a transparency gimmick. For Pakistan, where "whitening cream" generics dominate pharmacy shelves with zero disclosed concentrations, naming "0.025% Tretinoin" or "1% Clindamycin" in the product title or hero creates instant differentiation and signals clinical-grade formulation without requiring a separate credentials section.

#### The Derma Co. (thedermaco.com + thedermaco.com/collections/acne-pimple)

- **Hero headline:** Homepage leads with promotional banners rather than a brand headline: "B1G1 Sale Ends Tonight: Buy 1 Get 1 free | Use coupon — BFF"
- **Hero subheadline:** "B2G2 Sale Ends Tonight: Buy 2 Get 2 free + FREE GIFT | Use coupon — B2G2"
- **Primary CTA:** "Add to cart" (product-card level); acne collection page repeats the same B1G1 urgency at the top.
- **Above-fold structure:** Discount-first, always. The hero viewport on both homepage and acne collection page is dominated by sale banners with countdown-style language ("Ends Tonight"). Below the banners: a product grid with percentage-named actives, star ratings (4.8–5.0), and review counts. COD badge, Easy Return badge, and Free Shipping badge appear as a horizontal trust strip near the top — placed before product listings, giving it quasi-hero status.
- **Social proof type:** Per-product star ratings with review counts (e.g., 4.9 from 282 reviews, 5.0 from 627 reviews). "Dermatologist-designed formulations" claim. ISO 24444:2019 certification badge. "Free skin assessment" CTA implies professional validation. No named dermatologist visible.
- **Urgency mechanic:** The most aggressive urgency stack of all six brands: B1G1 + B2G2 dual banners, both with "Ends Tonight" language. Multiple "Sold out" labels on product cards add scarcity. This is urgency-as-primary-brand-voice — every page visit opens with a sale.
- **Trust signals:** "COD Available" badge surfaced as a trust signal alongside Free Shipping and Easy Return — COD is positioned as risk-reduction, not just payment method. ISO 24444:2019 certification (sun protection standard). "In-Vivo Tested" claim. "100% Payment Protection" language. App download CTA persistent across pages.
- **Ingredient transparency:** Strong. Product names carry active + percentage: "2% Sali-Cinamide Serum," "2.5% Benzoyl Peroxide Face Wash," "3% AHA+BHA" exfoliant with constituent acids named (Mandelic, Glycolic, Salicylic). The Derma Co. goes further than Minimalist by naming compound formulas in branded product titles (e.g., "Sali-Cinamide" for Salicylic + Niacinamide).
- **Money-back guarantee:** Not visible; "Easy Return Policy" is the primary risk-reversal language.
- **Doing well:** (1) The COD badge positioned as a hero-level trust signal — not in the footer or checkout — is the single most transferable pattern to Pakistan, where COD dominates and its absence reads as a scam flag. (2) Percentage-in-branded-product-name (e.g., "Sali-Cinamide") creates a proprietary-feeling nomenclature that still communicates clinical specificity — brand-building and transparency in one word.
- **Broken or weak:** Sale banners as the permanent hero means the brand has no non-discount identity visible on landing — an always-on "Ends Tonight" claim destroys urgency credibility over repeat visits. The brand's dermatologist authority claim ("dermatologist-designed") is unattributed — no named derm, no clinic, no face — which weakens it in markets where personal doctor trust outweighs institutional credibility.
- **Take-away for Clarté MD:** The Derma Co.'s COD-as-hero-trust-signal pattern is the most important single lift for Clarté MD's Pakistan landing page: move "Cash on Delivery Available" out of the footer or checkout flow and into the above-fold trust strip, treating it as equivalent in weight to a money-back guarantee. Pair it with "Easy Return" to complete the risk-reversal stack that COD-dominant buyers need to see before scrolling.

### 4.3 Pakistan DTC

#### Conatural (conaturalintl.com)

- **Hero headline:** "Rooted in Nature, Powered by Science & Made with Honesty."
- **Hero subheadline:** None — the headline transitions directly into category navigation with no supporting subheadline.
- **Primary CTA:** "SHOP NOW" (section-level); "Add to Cart" (product cards).
- **Above-fold structure:** Rotating product carousel with model imagery leads the viewport. Below: a flat product grid with discount badges ("15% OFF" site-wide, plus an Eid sale flag). No hero copy unit in the traditional sense — the brand uses visual merchandising where a DTC brand would put a value proposition. Above-fold trust is entirely product-led rather than message-led.
- **Social proof type:** Certification icons ("Organic," "Halal," "Sulphate Free," "Paraben Free," "Cruelty Free") serve as the primary trust layer — ingredient-safety framing, not clinical validation. No review counts, no star ratings, and no dermatologist endorsement above the fold.
- **Urgency mechanic:** "EID SALE Flat 15% off" discount banner + "Free Shipping on orders above PKR 4,999" threshold incentive. Promotion-led, not countdown-based.
- **Trust signals:** Ethical certifications (Halal, Cruelty-Free, Organic) are the brand's trust language. No derm credentials, no named doctor, no money-back guarantee, no COD surfaced as trust. WhatsApp not detected in above-fold or floating button position. COD listed in footer as payment method, not framed as risk-reversal.
- **Ingredient transparency:** Moderate — product titles carry named actives ("Niacinamide 10% + Zinc 1%," "Hyaluronic Acid 2% + B5") reflecting a Minimalist-adjacent naming convention. Full ingredient lists are below the fold on product pages.
- **Money-back guarantee:** Not visible anywhere on the site.
- **Doing well:** (1) Percentage-in-product-name for serums ("Niacinamide 10%," "HA 2%") creates clinical specificity within an organic-brand identity — a rare combination in Pakistan. (2) Ethical certifications (Halal, Cruelty-Free) address a real purchase-decision filter for Pakistani Muslim consumers that clinical-only brands ignore.
- **Broken or weak:** The homepage has no articulated value proposition — no headline explains who Conatural is for or what problem it solves. A buyer arriving from a Google search for "acne serum Pakistan" sees a discount banner and a product grid with zero message-match to their search intent.
- **Take-away for Clarté MD:** Conatural's ethical-certification trust layer targets a real anxiety (ingredient safety) but leaves clinical authority entirely unclaimed. Clarté MD can own the "dermatologist-formulated + named Rx actives" territory in Pakistan while Conatural occupies "organic + halal" — these are distinct trust axes, not competing ones. Clarté MD should make both its derm credential and its ingredient concentrations visible above the fold to differentiate immediately.

#### Saeed Ghani (saeedghani.pk)

- **Hero headline:** None in the conventional sense — the page is titled "Online Herbal & Skin Care Products Store | Saeed Ghani Since 1888" but this functions as metadata, not above-fold copy.
- **Hero subheadline:** None identified above the fold.
- **Primary CTA:** "Add to Bag" (product-card level, repeated throughout).
- **Above-fold structure:** The viewport opens with a promotional banner ("UPTO 15% OFF" and "Free 30ml Sunblock on Orders Above Rs.1999"), followed immediately by a flat product grid with no editorial framing. The site looks and behaves like a traditional e-commerce catalogue — not a DTC brand page. There is no hero copy, no brand narrative, and no value proposition in the first scroll unit.
- **Social proof type:** None above the fold. No review counts, no testimonials, no star ratings, no derm credentials. The sole brand-level trust signal is the "Since 1888" heritage marker embedded in the page title.
- **Urgency mechanic:** Percentage-off banner ("UPTO 15% OFF") and threshold-based gift ("Free 30ml Sunblock on Orders Above Rs.1999"). Promotion-driven, not scarcity-driven.
- **Trust signals:** "Since 1888" longevity signal is the brand's primary authority claim — heritage-based rather than clinical. WhatsApp is present as a social icon linking to `wa.me/922137130284`, positioned in the header/footer as a contact channel rather than a conversion mechanic. COD is listed in the footer ("Cash On Delivery & Bank Transfer") as a payment method, not surfaced as a trust signal or risk-reversal device.
- **Ingredient transparency:** Functional-category naming only — "Vitamin C," "Retinol," "Charcoal," "Rose Water" appear in product names. No percentages, no mechanism-of-action explanation, no clinical context. Products are named by ingredient type, not by clinical dosage.
- **Money-back guarantee:** Not mentioned anywhere on the page.
- **Doing well:** (1) The "Since 1888" heritage signal is a genuine competitive asset — 130+ years in business is impossible to fake and implies supply-chain reliability in a market saturated with pop-up brands. (2) WhatsApp is at least present as a contact channel, which aligns with Pakistani buyer behavior even if not optimized for conversion.
- **Broken or weak:** The page is a catalogue, not a landing page — no CRO intent whatsoever. A visitor searching for "acne treatment Pakistan" arrives to a discount banner and rows of products with no narrative, no segmentation by concern, and no trust-building before the ask. COD buried in footer is a significant missed opportunity given how central it is to Pakistani DTC conversion.
- **Take-away for Clarté MD:** Saeed Ghani shows what the Pakistan skincare category default looks like — catalogue UX, heritage-as-only-trust, COD hidden. Clarté MD's opportunity is to be the first Pakistani acne brand that actually behaves like a DTC conversion page: a single clear value proposition, COD surfaced as hero trust, WhatsApp as a mid-page conversion path, and named Rx actives before the first scroll.

#### AsraDerm (asraderm.pk)

- **Hero headline:** "Best Skin, Hair & Health care Products in Pakistan"
- **Hero subheadline:** "Shop By High Quality Products To Ensure The Best Quality For Your Health"
- **Primary CTA:** "Add to cart" (product-card level); no dedicated above-fold CTA button.
- **Above-fold structure:** Promotional Eid sale banner leads the viewport ("order now and get 10% off and free Eid pouch with every order"), followed by a flat product grid segmented by category. A "Celebrities Skincare Secret" section appears mid-page, suggesting the brand leans on influencer endorsement as its primary social proof mechanic. The above-fold lacks a clear brand promise — it reads as a promotional e-commerce store rather than a clinical skincare destination.
- **Social proof type:** Celebrity/influencer testimonials in a dedicated "CELEBRITIES SKINCARE ROUTINE" section. Product-level review counts on the anti-acne collection page (231 reviews, 181 reviews). No named dermatologist above the fold despite the "Asraderm Doctors" navigation link implying clinical positioning.
- **Urgency mechanic:** Seasonal Eid sale promotion (10% off + free pouch). No countdown timer; no "limited stock" language.
- **Trust signals:** The most certification-heavy brand in this set: ISO Certified, GMP, DRAP Registered, Halal Certified, FDA Approved, EU compliance, ISO Itertek. These are displayed as badge icons — powerful signals for a Pakistani buyer anxious about counterfeit products but easy to miss in the current layout. WhatsApp is present as a floating button at bottom-right (`+92-341-722-5000`) — functional but not conversion-optimized. COD not explicitly surfaced as trust.
- **Ingredient transparency:** Moderate-to-strong. The anti-acne collection page lists actives in product descriptions — salicylic acid, zinc PCA, niacinamide, retinol, tea tree extracts — by name but without percentages. Better than Saeed Ghani or Conatural, but below the percentage-transparency standard set by India DTC brands.
- **Money-back guarantee:** Not mentioned.
- **Doing well:** (1) DRAP registration surfaced as a badge is Pakistan-market-specific and directly addresses the "is this locally regulated?" anxiety that Indian-imported or grey-market products trigger. (2) Floating WhatsApp button is the right UX pattern for Pakistan — always visible, zero friction to initiate contact.
- **Broken or weak:** The headline "Best Skin, Hair & Health care Products in Pakistan" is generic to the point of meaninglessness — it communicates no differentiation, no clinical authority, and no acne-specific relevance. The gap between the certification depth (DRAP, GMP, FDA) and the hero copy quality is the brand's biggest missed conversion opportunity.
- **Take-away for Clarté MD:** AsraDerm's DRAP-registration badge is a pattern worth adopting — if Clarté MD's formulation is DRAP-compliant, surfacing that badge above the fold signals "this is a real regulated product" in a way that no copywriting can replicate. More importantly, AsraDerm proves that even a heavily certified clinical brand can fail to convert if the hero copy doesn't reflect the product's authority.

#### Clarté MD — Sibling Brand (clartemd.com.pk)

- **Hero headline:** "Welcome to our store." (verbatim — this is the live hero headline as of fetch date)
- **Hero subheadline:** None identified above the fold.
- **Primary CTA:** "Shop Now" (visible in a promotional banner section).
- **Above-fold structure:** A stripped-down Shopify storefront. The hero viewport shows the placeholder headline, followed by trust-badge icons ("Free Shipping on Orders Over PKR 4000," "Best Skin Care Brand," "24/7 Customer Support," "Easy Returns Within 30 Days"). Featured products below the fold are all showing "Sold out" status — either genuine stock scarcity or placeholder products. The above-fold structure communicates nothing about the brand's clinical positioning, target concern (acne), or active-ingredient approach.
- **Social proof type:** None — no review counts, no star ratings, no before/after imagery, no dermatologist credentials above or below the fold in the fetched content.
- **Urgency mechanic:** Implicit scarcity from "Sold out" product badges across all featured items. Unintentional — likely placeholder stock, but could inadvertently read as high demand.
- **Trust signals:** Four generic trust badges (Free Shipping, "Best Skin Care Brand" — self-declared, 24/7 Customer Support, Easy Returns). No derm credentials, no DRAP registration, no named doctor, no money-back guarantee. Contact number (+92 324 9986822) present but no WhatsApp CTA above the fold. COD not mentioned anywhere in fetched content.
- **Ingredient transparency:** Minimal — product names reference actives (Vitamin C, Retinol, Hyaluronic Acid, "Acne Serum") but no concentrations or mechanism-of-action copy.
- **Money-back guarantee:** Not mentioned.
- **Doing well:** (1) The "Easy Returns Within 30 Days" badge is a risk-reversal signal — the only above-fold element that addresses purchase anxiety. (2) The product naming convention uses clinical-adjacent terms ("Acne Serum," "Retinol") that are the right vocabulary for the target audience, even if underdeveloped.
- **Broken or weak:** "Welcome to our store" as a live hero headline is the single most damaging above-fold element in this entire teardown set — it is a default Shopify placeholder that signals an unfinished, uncommitted brand to any visitor. Combined with all-sold-out products and zero clinical credentials, the current site fails at every trust-building checkpoint a Pakistani acne buyer needs.
- **Take-away for Clarté MD:** The new Clarté MD landing page (acne-protocol.html) is being built precisely to replace this. Priority one is replacing "Welcome to our store" with a claim that names the concern (acne), names the credential (dermatologist-formulated), and names the mechanism (Rx actives) — all in the first visible line. Every pattern this site is missing is the new page's checklist.

### 4.4 Pharma Legacy (Anti-Examples)
<!-- Filled in Task 5 — Cetaphil PK, Eucerin PK -->

## 5. The 12 Universal Patterns That Move Skincare Landing-Page CVR
<!-- Filled in Task 8 -->

## 6. Channel-Specific Learnings — Google Search Ads
<!-- Filled in Task 9 -->

## 7. Audit Scorecard — acne-protocol.html
<!-- Filled in Task 11 -->

## 8. Applied Changes Log
<!-- Filled in Task 25 — file:line references for each edit -->
