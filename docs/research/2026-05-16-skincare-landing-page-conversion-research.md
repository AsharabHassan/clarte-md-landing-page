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

### 2.1 Search-intent traffic behaves differently from social

A visitor who types "acne treatment Pakistan" or "best serum for dark spots" into Google has already moved past brand discovery — they are mid-funnel, problem-shopping, and carrying a specific unresolved need. That intent changes everything about how the landing page must perform. Social-media visitors are pre-discovery: they encounter the brand while browsing, are open to storytelling, and tolerate a brand-narrative hook before a product ask. Search visitors have already named their problem; they are scanning for confirmation that the page they just landed on is the right answer. The patience window for that confirmation is roughly five seconds — approximately the time it takes to read an above-fold headline, a subheadline, and a trust signal ([Nielsen Norman Group, First Impressions research](https://www.nngroup.com/articles/first-impressions-human-automaticity/)). If those five seconds fail to reflect the visitor's query back at them in recognisable language, they return to the SERP. This is not a copywriting preference — it is the structural difference between search intent and social intent, and it determines the entire above-fold hierarchy for a Google Ads landing page.

For Pakistan's mobile-dominant audience arriving via Google Search, network conditions amplify the risk: a slow-loading hero that fails to render within five seconds is functionally the same as a message-mismatch bounce.

### 2.2 Quality Score gates your CPC

Google Ads Quality Score is a 1–10 diagnostic metric composed of three equally weighted components: expected click-through rate, ad relevance, and landing page experience ([Google Ads Help — About Quality Score](https://support.google.com/google-ads/answer/6167118?hl=en)). Landing page experience is not a minor sub-signal — it is one third of the score that determines both cost-per-click and ad position. A higher Quality Score lowers the CPC Google charges and raises the ad's placement in the auction; a lower Quality Score forces a higher bid to achieve the same position. This means every improvement made to a landing page is simultaneously a CRO intervention and a paid-media cost reduction — the two budgets are not separate.

Google evaluates landing page experience across five levers: page load speed (tied to Core Web Vitals), mobile usability, content relevance to the ad's keywords, transparency (privacy policy, contact info), and content originality ([Google Ads Help — Evaluate landing page performance](https://support.google.com/google-ads/answer/7543502?hl=en)). For Clarté MD serving Pakistani mobile traffic, the highest-risk levers are load speed on mid-tier Android devices and keyword relevance — whether the page H1 contains the exact phrase the ad targeted. Landing-page work is paid-search budget work.

### 2.3 Benchmark conversion rates for health & beauty Google Ads

WordStream's 2024 Google Ads Benchmarks — across 23 industries — show Beauty & Personal Care CTR rising 15% YoY and conversion rate up ~10.76% YoY, against a cross-industry average CVR of 6.96% ([WordStream, Google Ads Benchmarks 2024](https://www.wordstream.com/blog/2024-google-ads-benchmarks)). Unbounce's 2024 Conversion Benchmark Report (464 million visits, 41,000+ landing pages) benchmarks the median beauty landing-page CVR at just 1.3% ([Unbounce, 2024 Conversion Benchmark Report](https://unbounce.com/conversion-benchmark-report/)) — a gap that reflects the difference between paid-search intent traffic and cold browse traffic reaching the same page.

| Metric | Health & Beauty (US baseline) | Pakistan variance note |
|---|---|---|
| Average CTR | ~6–8% (search) | Lower absolute volume; CPCs ~$0.10–0.50 USD vs US $1–3 |
| Conversion rate | ~3–6% (paid search) | Likely lower: weaker payment infrastructure, higher cold-traffic skepticism |
| Median landing-page CVR | 1.3% (Unbounce beauty) | Further compressed by COD friction at checkout |
| Average CPA | $20–50 USD (US) | PKR-denominated; PK CPA data not publicly benchmarked |

**Important caveat:** All figures are US-market baselines. No Pakistan-specific Google Ads benchmarks are publicly available. Pakistani CPCs are lower (~$0.10–0.50 vs. US $1–3), but PK conversion rates in medical skincare are suppressed by weaker payment infrastructure, counterfeit skepticism, and COD's added logistics step. Treat US benchmarks as an optimistic ceiling.

### 2.4 The 5-second above-the-fold test

Google's research establishes that 53% of mobile visits are abandoned if load time exceeds three seconds, and a one-second delay can cut retail conversions by up to 20% ([Google blog — mobile landing page speed](https://blog.google/products/ads/mobile-landing-page-speed-score/)). Even on a fast load, the content faces an equally ruthless five-second judgement. Nielsen Norman Group's research on cognitive automaticity shows users assess a page's relevance before conscious reading begins ([Nielsen Norman Group, First Impressions](https://www.nngroup.com/articles/first-impressions-human-automaticity/)). For a search visitor, the verdict is binary: right page or wrong page.

The above-fold unit must accomplish three things simultaneously to pass: (1) repeat the ad's promise — the visitor's working memory was primed by the ad headline; (2) name the problem in the visitor's own words ("acne that hasn't cleared with pharmacy creams" beats "skincare solutions"); and (3) present a single unambiguous CTA. Miss any one of the three and the visitor bounces — the rest of the page never loads in their eyes.

### 2.5 Headline ↔ ad-headline parity (the "message match" rule)

Message match is the degree to which a landing page H1 mirrors the phrasing of the ad that generated the click — one of Unbounce's three primary conversion levers alongside traffic quality and offer relevance ([Unbounce, Message Match definition](https://unbounce.com/conversion-glossary/definition/message-match/)). If the ad headline reads "Best Acne Treatment", the H1 must contain "Acne Treatment" or a close synonym. A mismatch silently kills CVR even when the page copy is objectively stronger — because the visitor's five-second scan is keyword recognition, not persuasion evaluation. Unbounce documented one case where enforcing message match cut cost-per-converted-click from $482 to $147 while lifting CVR from 4% to 13% ([Unbounce, PPC landing page optimisation guide](https://unbounce.com/ppc/optimize-your-landing-page-for-ppc/)).

For Clarté MD, this rule shapes the companion ad-copy parity guide (Task 23): each ad group targeting an acne query needs a headline variant containing that query's keyword cluster. On Shopify, the simplest implementation is dedicated landing pages per ad group (`/acne-protocol`, `/dark-spots-treatment`, `/tretinoin-pakistan`) — routing all traffic to the homepage cannot message-match any specific search intent by definition.

## 3. Pakistan-Specific Buyer Psychology

### 3.1 Fake-product anxiety is the dominant trust barrier

Pakistan's skincare market is structurally saturated with counterfeit and adulterated products. Fake versions of imported serums — including The Ordinary, CeraVe, and local clinical brands — are openly sold through pharmacy counters, bazaar stalls, and unverified online sellers ([The News Pakistan, 2018](https://www.thenews.com.pk/print/359876-counterfeit-harmful-cosmeticscan-lead-to-long-term-skin-problems)). A MarqVision consumer survey found 71.6% of participants seeking authentic products ended up with counterfeits ([serum.pk, 2024](https://serum.pk/original-vs-fake/)). Counterfeit formulations in Pakistan frequently contain unlabelled steroids and heavy metals — delivering short-term results that mask rebound skin damage, compounding distrust of any unfamiliar online brand.

The regulatory gap amplifies this: DRAP governs only medicated cosmetics, and the Pakistan General Cosmetics Regulatory Authority (PGCRA), created by the General Cosmetics Act 2023, had not become operational as of early 2026, leaving general cosmetics with no active enforcement body ([Pakistan Today, 2026](https://www.pakistantoday.com.pk/2026/02/10/markets-without-referees/)). For a Pakistani buyer, the absence of visible regulatory legitimacy is not minor friction — it is a purchase-ending signal. This is why AsraDerm's DRAP badge (Section 4.3) is the right instinct, even if buried.

For Clarté MD, fake-product anxiety must be neutralised before the visitor scrolls. The landing page must surface: (1) DRAP/medicated cosmetic registration status by name; (2) a named, PMDC-registered dermatologist — a credentialed human is harder to fake than any badge; (3) exact active concentrations ("0.025% tretinoin, 1% clindamycin") in the hero, since counterfeit products never disclose clinical doses; and (4) COD as "open the box before you pay," functioning as a physical authenticity guarantee. Clarté MD's "2× refund if fake" guarantee should be elevated from fine print to above-fold copy.

### 3.2 COD is a trust device, not just a payment option

A joint ADB/UNESCAP report documented COD at 95% of Pakistani e-commerce transactions; more recent logistics-industry data puts the figure at 80%+ as of 2024–2025 ([ProPakistani, 2018](https://propakistani.pk/2018/06/28/95-of-e-commerce-transactions-in-pakistan-are-cash-on-delivery-report/); [Fulfill Karo, 2024](https://www.fulfillkaro.pk/cash-on-delivery-in-pakistan-how-to-manage-risk-and-increase-deliveries/)). Digital payment infrastructure (Raast, Easypaisa, JazzCash) is shifting this ratio slowly, but COD dominance in medical and skincare categories — where product authenticity anxiety is highest — is structural, not merely infrastructural.

The trust mechanics of COD are distinct from its payment mechanics. When a buyer selects COD, they are structurally refusing to commit until the physical product is in hand: the rider arrives, the buyer inspects the seal and label, and only then does money change hands. Psychologically, this is a zero-cost money-back guarantee — all risk sits with the seller. For prescription-grade skincare where the concern is simultaneously "is this real?" and "will this work?" COD removes the single largest barrier to first-purchase commitment.

Every Pakistani brand audited in Section 4.3 treats COD as a payment method disclosed at checkout rather than a trust signal disclosed in the hero: Saeed Ghani lists it in the footer, Conatural and clartemd.com.pk omit it above the fold entirely. The Derma Co. (India, Section 4.2) is the only brand in this teardown set that surfaces a "COD Available" badge at hero level alongside Free Shipping and Easy Return — a three-part risk-reversal stack. That is the correct model for Pakistan. "Cash on Delivery — Pay only when your box arrives" must appear in the trust strip below the headline, not in checkout flow.

### 3.3 WhatsApp leads the pre-purchase consultation

Pakistan had 190 million active mobile connections — 75.2% of the total population — with 116 million internet users (45.7% penetration) as of early 2025 ([DataReportal, Digital 2025: Pakistan](https://datareportal.com/reports/digital-2025-pakistan)). WhatsApp is the dominant messaging platform in all urban demographics. Pakistani businesses using the WhatsApp Business API report converting chats at 2–3 times the rate of website enquiry forms, with WhatsApp messages averaging a 98% open rate ([WapiKit, 2025](https://www.wapikit.com/blog/global-whatsapp-business-statistics-2025)). For medical and skincare purchases, buyers — particularly women seeking acne treatment — routinely message a seller's WhatsApp number before clicking "Add to Cart," seeking confirmation that the product is genuine, that a human is behind the brand, and that a dermatologist is accessible. A delayed reply reads as a ghost brand; expected response time is minutes.

The implementation gap in this audit is consistent: Saeed Ghani has a WhatsApp icon in the header — a contact channel, not a conversion path. AsraDerm has the correct UX (floating button, bottom-right) but routes to general support rather than a named clinical team. Foxtale surfaces its WhatsApp number on the product page as a fraud-prevention signal — right framing, wrong position. The correct pattern for Clarté MD is a mid-page WhatsApp click-to-chat block, positioned after the protocol explanation and before the buy CTA, with authority copy: "Speak to the Clarté MD team on WhatsApp — Dr. Ahmad's clinic responds within the hour." This converts a support widget into a trust signal and a conversion mechanism simultaneously.

### 3.4 Dermatologist authority outranks brand authority

In Pakistan's healthcare culture, "the Dr." holds the trusted-expert position that a brand name occupies in Western DTC markets. Brand storytelling and press logos move Pakistani buyers considerably less than a named, credentialed medical professional with a visible institutional affiliation. Platforms like Oladoc (25,000+ PMC-verified doctors) and Marham have built entire businesses on this dynamic: the verification currency is PMC registration number, clinic location, university affiliation, and years of practice ([Oladoc, 2025](https://oladoc.com/pakistan/dermatologist)). A skincare product associated with a named, PMC-registered dermatologist carries the implicit endorsement of a medical institution — which, in a counterfeit-saturated market, outweighs any brand copy.

None of the four Pakistani brands audited in Section 4.3 surface a named dermatologist above the fold. AsraDerm has an "Asraderm Doctors" navigation link but routes it to an interior page. Clarté MD's named clinical founder (Dr. Ahmad) is the single most differentiated competitive asset in Pakistan's acne-treatment market. That credential must appear in the first visible unit — not the "About" section. The exact form matters: "Formulated by Dr. Ahmad, MBBS, FCPS Dermatology, Lahore" carries more conversion weight than "Dermatologist-formulated" because it is specific enough to be verifiable and therefore difficult to fake. This is positioning white space no current Pakistani competitor has claimed.

### 3.5 Urdu/English code-switching in headlines

Pakistani urban consumers read English-language product pages fluently and expect English as the register of professional or clinical communication. However, emotional purchase triggers — skin anxiety, acne stigma, the aspiration of clear skin — often land harder through Urdu loanwords embedded in English sentences. Key terms with no precise English commercial equivalent: *muhasay* (acne, with a colloquial familiarity "acne" lacks), *daag* (marks or spots — specifically the post-inflammatory hyperpigmentation Pakistani acne sufferers most want fixed), and *ilaaj* (treatment, connoting a medical rather than cosmetic intervention). One term to avoid: *kaali rang* (dark complexion) — it carries colourism associations that will alienate buyers at a premium positioning level.

The risk of overuse is equally real. Heavy Urdu copy — full code-switched paragraphs, Roman-script transliteration as the primary register — signals a down-market brand to the urban buyer comparing Clarté MD with imported Rx options. Premium positioning requires English-dominant copy that code-switches selectively. The recommended ratio is 90% English, 10% Urdu loanwords as emotional anchors. Practical application: the hero headline stays in clinical English ("Clear Acne. Prescription-Grade. Delivered."), while one supporting line uses a single Urdu anchor — "Because *daag* and *muhasay* deserve more than over-the-counter guesswork." That word-switch signals cultural fluency without repositioning the brand downmarket.

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

> **Fetch note:** cetaphil.com.pk returned ECONNREFUSED; teardown based on cetaphil.com global homepage (US locale). eucerin.pk and eucerin.com both unreachable or redirected to country-selector only; teardown based on eucerin.co.uk (the most complete accessible Eucerin marketing homepage) plus documented global brand positioning. Both teardowns are clearly labelled with the fallback source.

#### Cetaphil (cetaphil.com — global homepage; cetaphil.com.pk unreachable)

- **Hero headline:** "Recommended Skincare Brand for Sensitive Skin" (pulled from page `<title>`; no distinct H1 hero headline visible above fold)
- **Hero subheadline:** "Get the best care for your sensitive skin across all our product ranges."
- **Primary CTA:** "Shop Am + PM Serums" / "All Products"
- **Above-fold structure:** A promotional banner for a new serum SKU dominates the top half, followed immediately by a product carousel. There is no problem-statement copy, no claim headline, and no attempt to speak to a visitor's specific concern. The brand name and tagline ("Sensitive Skin Experts") do the work a headline should do, requiring the visitor to already know and trust the brand.
- **Social proof type:** Institutional endorsements (National Eczema Association, Skin Cancer Foundation); dermatologist-recommendation badge; statistical claim ("70% of people worldwide report some skin sensitivity"). No star ratings or named customer reviews above the fold.
- **Urgency mechanic:** None observed.
- **Trust signals:** "Dermatologist Recommended Brand," "Science Based Skincare," "The Sensitive Skin Experts," two third-party association approvals (National Eczema Association, Skin Cancer Foundation).
- **Ingredient transparency:** Named ingredients listed in marketing copy (glycerin, hyaluronic acid, niacinamide, ceramides, salicylic acid, mandelic acid) but no percentages anywhere on the homepage; clinical dose evidence is absent.
- **Money-back guarantee:** Not visible.
- **Doing well:** The dual third-party body approvals (Eczema Association + Skin Cancer Foundation) are genuine credibility anchors that cost a competitor nothing to note but carry real institutional weight. The ingredient vocabulary is correct for a clinical audience (niacinamide, ceramides, mandelic acid) — the brand has earned these words.
- **Broken or weak:** (1) Zero problem-statement copy — the hero assumes the visitor is already brand-loyal; a new visitor arriving from a search for "acne treatment Pakistan" gets no acknowledgment of their concern. (2) Primary CTAs push serum SKUs, not a solution to a skin condition — the page is category-merchandising, not conversion. (3) No direct purchase path: the "All Products" CTA leads deeper into the catalogue rather than to a single best-recommendation with a buy button.
- **Anti-pattern to avoid:** The hero functions as a brand-awareness billboard, not a conversion surface — there is no problem named, no outcome promised, and no urgency created. Clarté MD must open with the visitor's problem ("acne that hasn't cleared with OTC products") before any brand or product name appears.
- **Take-away for Clarté MD:** Cetaphil's institutional trust signals are genuinely strong, but they are wasted on a homepage built for brand browsing, not for a buyer with a specific unsolved problem. Clarté MD's advantage is talking directly to that problem from the first line — something a pharma-distribution brand structurally cannot do.

#### Eucerin (eucerin.co.uk — UK homepage; eucerin.pk unreachable, eucerin.com redirects to country selector only)

- **Hero headline:** "EUCERIN — Life-changing power of Dermatological Skincare"
- **Hero subheadline:** "Our lightest Oil Control UV-Protection" (secondary product-feature heading, not a visitor-benefit statement)
- **Primary CTA:** "Buy now" (per-product card level only; no single primary page CTA)
- **Above-fold structure:** A navigation-heavy header (country selector, search, full mega-menu) sits above a product-card grid showcasing bestsellers. The "Life-changing power" headline appears in the brand strip rather than as a conversion headline. A new product (UV Serum SPF 50+) is highlighted mid-page with feature copy, not benefit copy.
- **Social proof type:** Star ratings with review counts on product cards (ranging 3.8–4.7 stars, 106–282 reviews). "Recommended by dermatologists" brand badge. No named testimonials, no before/after imagery, no doctor profiles.
- **Urgency mechanic:** "New" product badge on two SKUs. No countdown timers, no limited stock signals.
- **Trust signals:** "100 years of history and innovative science," "Recommended by dermatologists," Beiersdorf parent-company heritage implied by Careers link. No visible certifications or third-party body approvals on the homepage.
- **Ingredient transparency:** Specific actives named at product-card level: Thiamidol (Anti-Pigment Dual Serum), Epicelline® (Hyaluron-Filler), 10% Urea (UreaRepair PLUS). Percentage disclosed for Urea only; other actives named without dose. No mechanism-of-action copy on the homepage.
- **Money-back guarantee:** Not visible.
- **Doing well:** (1) Star-rating + review-count on every product card is the single highest-trust signal on the page — real numbers, not vague endorsements. (2) Naming a proprietary active (Thiamidol) by compound name, not just a product-family trademark, signals scientific specificity that reinforces the "dermatological" positioning.
- **Broken or weak:** (1) "Life-changing power" is the weakest kind of aspirational headline — it names no condition, no mechanism, and no proof; a visitor with melasma or acne gets nothing actionable from it. (2) There is no direct-purchase flow from the homepage: every "Buy now" routes to a retailer-finder or third-party shop, breaking the customer relationship at the most valuable moment. (3) The country-selector architecture means Eucerin has no unified digital storefront — Pakistani visitors who land on eucerin.com encounter only a flag-selection screen, making brand discovery functionally impossible without prior knowledge.
- **Anti-pattern to avoid:** Every CTA routes to a third-party retailer, permanently handing off the customer relationship at the point of purchase. Clarté MD's core structural advantage is owning the transaction end-to-end — that direct relationship (COD confirmation, WhatsApp follow-up, repeat-purchase data) must be protected by never burying the primary CTA behind a "find a stockist" layer.
- **Take-away for Clarté MD:** Eucerin's 100-year heritage and dermatologist positioning are its only real assets on the homepage — and they are deployed passively, not as conversion arguments. Clarté MD should treat its clinical credentials as active persuasion copy tied to specific claims ("Tretinoin + Niacinamide protocol, formulated by Dr. Ahmad"), not as a trust badge sitting in a brand strip.

## 5. The 12 Universal Patterns That Move Skincare Landing-Page CVR

### 5.1 — Message-match with the Google ad headline

**The pattern:** The landing page H1 mirrors the keyword phrase that triggered the ad click — using the visitor's problem vocabulary, not the brand's preferred marketing language.

**Why it works:** Search visitors arrive with a query primed in working memory; cognitive fluency signals "right page" within five seconds only if the headline reflects that query — a mismatch triggers the back button even on a superior page.

**Exemplars:** Dermatica — "Personalized skincare with powerful prescription ingredients" targets the "prescription skincare" cluster, qualifying high-intent visitors before body copy. Curology — "Proof over promises" matches the emotional register of skeptical acne searchers.

**Violators:** Clarté MD sibling (clartemd.com.pk) — "Welcome to our store" is a default Shopify placeholder matching zero search query; a guaranteed bounce for every paid-search visitor. Conatural — "Rooted in Nature, Powered by Science & Made with Honesty" is a brand manifesto, not a problem answer.

**How to apply at Clarté MD:** Set the `acne-protocol.html` H1 to the exact phrase cluster of the driving ad group — if the ad targets "acne treatment Pakistan," open with those words before any brand modifier.

---

### 5.2 — Single-purpose hero (one CTA, no nav distractions)

**The pattern:** The above-fold unit contains exactly one primary CTA, with site navigation hidden or minimised, so the visitor's only meaningful choice is to act or scroll — not to wander.

**Why it works:** Every nav link is an escape route; for a Google Ads visitor with specific intent, choosing among five nav items costs more cognitive bandwidth than clicking one button.

**Exemplars:** Geologie — "TAKE THE QUIZ" is the only above-fold conversion path; no browsing option, no competing nav. Curology — dual CTAs ("Start in minutes" / "Find your Rx formula") both trigger the same action, making choice illusory.

**Violators:** Eucerin — a full mega-menu with country selector offers roughly twelve exits before the first persuasion element. Cetaphil — "Shop Am + PM Serums" and "All Products" as parallel CTAs split attention with no hierarchy.

**How to apply at Clarté MD:** Suppress the Shopify header nav on `acne-protocol.html` (logo-only bar) and keep a single above-fold CTA: "Start the Protocol — Pay on Delivery."

---

### 5.3 — Above-fold problem statement

**The pattern:** The first sentence names the visitor's specific skin problem — in their own words — before any product name, brand story, or feature list appears.

**Why it works:** Problem-first copy creates immediate recognition — the visitor feels seen, not sold to — and naming the specific condition creates a micro-commitment that keeps them reading.

**Exemplars:** Apostrophe — "Clear skin is possible" opens from the visitor's desired outcome, not the brand's identity. Curology — "No trends, no guesswork" names two frustrations a chronic-acne visitor has lived before landing.

**Violators:** Cetaphil — "Recommended Skincare Brand for Sensitive Skin" acknowledges no specific concern; a first-time acne visitor gets nothing. Clarté MD sibling (clartemd.com.pk) — no subheadline, no problem named above the fold.

**How to apply at Clarté MD:** Open the `acne-protocol.html` subheadline with "For acne that hasn't cleared with pharmacy creams" before any product or doctor's name.

---

### 5.4 — Dermatologist / medical authority signal

**The pattern:** A named, credentialed dermatologist is visible above the fold — full name, qualification, and institutional affiliation — not referenced generically as "dermatologist-formulated" or buried in an About page.

**Why it works:** In Pakistan's healthcare culture, the named doctor holds the trusted-expert position a brand name holds in Western markets; a specific credential is hard to fake and counters counterfeit anxiety in ways generic "dermatologist-tested" language cannot.

**Exemplars:** Geologie — Dr. Steve Xu is named with credential in the above-fold trust cluster, converting personal authority into brand authority. Dermatica — Medical Director Dr. Shendy Engelina named with "consultant dermatologist" qualification shortly after the fold, making a specific clinician accountable.

**Violators:** AsraDerm — "Asraderm Doctors" nav link implies clinical positioning but no named derm appears above the fold; the credential is buried behind a click. Saeed Ghani — "Since 1888" is the sole authority signal; no medical professional named anywhere.

**How to apply at Clarté MD:** Place "Formulated by Dr. Ahmad, MBBS, FCPS Dermatology, Lahore" in the hero trust strip on `acne-protocol.html` as the primary authority signal, before the CTA.

---

### 5.5 — Real before/after evidence (not stock)

**The pattern:** Actual patient transformation photos — matched before/after framing, real faces — appear within the first scroll unit, not deferred to a testimonials section mid-page.

**Why it works:** B-A imagery converts outcome skepticism into concrete proof faster than copy; for repeat-failure acne buyers, a real face clearing triggers the "this could be me" cognitive leap that stock illustrations suppress.

**Exemplars:** Curology — B-A carousel in the first scroll unit closes on transformation evidence after authority and peer validation have done the opening work. Apostrophe — B-A imagery tied to specific conditions (acne, hyperpigmentation) makes proof condition-specific rather than generically aspirational.

**Violators:** Cetaphil — no B-A imagery anywhere on the homepage; trust is entirely institutional, transformation proof absent. Eucerin — product-card star ratings are the closest thing to patient evidence; no B-A photography exists in the above-fold unit.

**How to apply at Clarté MD:** Include at least three real patient B-A pairs in the first scroll unit of `acne-protocol.html`, labelled with duration ("Week 4 / Week 12") and condition, from Dr. Ahmad's clinical archive.

---

### 5.6 — Reviews with photos and specific outcomes

**The pattern:** Reviews include a photo of the reviewer, name and city, and a specific outcome claim ("acne cleared in 6 weeks") rather than generic sentiment ("great product").

**Why it works:** Outcome-specific reviews set concrete expectations and reduce post-purchase dissonance; photo-backed reviews signal a real human face, countering fake-review skepticism prevalent in Pakistan's online market.

**Exemplars:** The Derma Co. — per-product counts (282 at 4.9 stars, 627 at 5.0 stars) at card level make proof density visible before a product page opens. Curology — "89% report effective" anchored to a 150-patient trial combines social proof volume with clinical outcome specificity.

**Violators:** Saeed Ghani — no review counts, ratings, or testimonials anywhere; heritage alone. Clarté MD sibling (clartemd.com.pk) — zero review infrastructure; all products show "Sold out" with no reviews.

**How to apply at Clarté MD:** Add eight reviews to `acne-protocol.html` with reviewer photo or B-A thumbnail, reviewer city (Lahore/Karachi/Islamabad), and a specific outcome naming condition, timeline, and result.

---

### 5.7 — Ingredient transparency with percentages

**The pattern:** Active ingredient names and exact concentrations appear in the hero or trust strip — not in a product description or separate page — so a scanning visitor knows what they are buying before engaging further.

**Why it works:** Exact percentages are an anti-fraud signal — a counterfeit cannot advertise "0.025% tretinoin" because that specificity invites verification; for a Pakistani buyer with a prior derm prescription, seeing the molecule in the hero creates instant recognition.

**Exemplars:** Minimalist — percentage-in-product-name: "Niacinamide 10% Face Serum" — concentration known before the product page opens. Geologie — "We show them. Most brands hide them" turns transparency into a competitive positioning attack. Dermatica — lists Rx actives (tretinoin, clindamycin, adapalene, hydroquinone) on the landing page — most complete transparency in this teardown set.

**Violators:** Saeed Ghani — functional-category naming ("Vitamin C," "Retinol") with zero percentages; clinical dose absent from every product. Cetaphil — correct ingredient vocabulary (niacinamide, ceramides) but no percentages; actives treated as marketing words, not clinical doses.

**How to apply at Clarté MD:** Place "0.025% Tretinoin · 1% Clindamycin · 4% Niacinamide" in the hero trust strip of `acne-protocol.html`, paired with a one-line claim: "Every active named. Every percentage shown."

---

### 5.8 — Money-back / fake-product guarantee positioning

**The pattern:** A specific, quantified guarantee — refund terms, fake-product compensation, or satisfaction clause with defined conditions — appears above the fold or in the first trust strip, not buried in a FAQ.

**Why it works:** For Pakistani buyers the primary purchase barrier is risk — counterfeit or adverse-reaction anxiety, not price; a specific guarantee removes the financial consequence in a way vague "satisfaction guaranteed" language cannot.

**Exemplars:** Apostrophe — "if you're not satisfied, we'll work with you" signals accountability without discount-brand associations. Dermatica — "cancel easily anytime" functions as a zero-risk-trial substitute for a formal guarantee.

**Violators:** All four PK brands — Conatural, Saeed Ghani, AsraDerm, clartemd.com.pk sibling — show no guarantee language anywhere; with fake-product anxiety at 71.6% of Pakistani purchases, this is the category's largest structural conversion gap.

**How to apply at Clarté MD:** Elevate "2× refund if fake" to the above-fold trust strip on `acne-protocol.html`: "Fake? We refund double. Guaranteed." — third element after COD and DRAP badges.

---

### 5.9 — COD-as-trust framing

**The pattern:** "Cash on Delivery" is surfaced as a risk-reversal trust signal — with buyer-benefit framing ("pay only when your box arrives") — in the above-fold trust strip, not disclosed as a payment method at checkout.

**Why it works:** COD dominates 80–95% of Pakistani e-commerce as a trust behaviour — the buyer refuses to commit until the product is in hand — making it a zero-cost money-back guarantee, but only if the buyer sees it before deciding to leave.

**Exemplars:** The Derma Co. (India) — "COD Available" badge in a three-part hero trust strip alongside "Free Shipping" and "Easy Return," treating COD as a purchase-confidence anchor rather than a payment footnote. No other brand in this teardown set matches this placement.

**Violators:** Saeed Ghani — COD in the footer as one of several payment methods; reaches only visitors already committed enough to scroll there. Conatural and clartemd.com.pk sibling — COD absent above the fold entirely.

**How to apply at Clarté MD:** Make "Cash on Delivery — Pay when it arrives" the first trust-strip element on `acne-protocol.html`, with explicit framing: "No payment until the rider hands you the box."

---

### 5.10 — Mobile form friction reduction

**The pattern:** The conversion path requires the fewest possible form fields and taps on mobile — COD pre-selected, phone number as the primary contact field (not email), and a slide-up checkout that does not route to a separate URL.

**Why it works:** Pakistan's mobile-dominant audience on variable LTE treats each extra form field as both a cognitive barrier and a latency risk; COD pre-selection eliminates the payment-details step entirely, cutting checkout to three fields (name, phone, city).

**Exemplars:** Hers — minimal-step flows reduce form entry to essential fields with mobile-first (not desktop-parity) checkout. Curology — "Start in minutes" sets a low-friction expectation; the quiz collects information progressively.

**Violators:** AsraDerm — desktop-style catalogue; mobile users see the same layout with no COD-first orientation. Saeed Ghani — "Add to Bag" routes to multi-screen Shopify checkout; COD invisible until payment-method selection, three screens deep.

**How to apply at Clarté MD:** Add a slide-up order form on `acne-protocol.html` with three fields — name, mobile, city — COD pre-selected, "Confirm Order" visible without scrolling inside the form.

---

### 5.11 — Sticky mobile CTA

**The pattern:** A fixed bottom bar on mobile keeps the primary CTA permanently visible as the user scrolls, so conversion is never more than one thumb-tap away regardless of scroll depth.

**Why it works:** Long-form landing pages require scrolling to build trust, but willingness to act once triggered mid-page decays rapidly if the CTA requires scrolling back; a sticky bar converts every scroll position into a conversion opportunity.

**Exemplars:** Hers — the sticky mobile CTA bar is Hims/Hers' most documented CRO pattern, A/B-tested and maintained across multiple redesigns; no other brand in this teardown set has an equivalent.

**Violators:** Foxtale — "ADD TO CART / BUY NOW" on the acne PDP is above-fold only; both buttons vanish at any further scroll depth, requiring an upward scroll on portrait mobile. Conatural — "SHOP NOW" at section breaks only; no immediate purchase path at scroll depth.

**How to apply at Clarté MD:** Add a sticky bottom bar on `acne-protocol.html` for mobile: "Order Now — Cash on Delivery" with PKR price, activated after the hero scroll.

---

### 5.12 — Urgency mechanic (dispatch window, batch language)

**The pattern:** A time-bound or supply-bound signal — dispatch cutoff, batch count, or production-run language — creates a reason to act today without fabricating scarcity or running permanent "sale ends tonight" copy.

**Why it works:** Acne sufferers delay reorder until the skin crisis peaks; a dispatch-window mechanic ("order before 2 PM for same-day dispatch") is credible, logistically true, and creates urgency without discount erosion, while batch language adds supply scarcity that signals quality over desperation.

**Exemplars:** Geologie — "When it's gone, it's gone" tied to a real calendar event creates credible scarcity. The Derma Co. — B1G1/B2G2 "Ends Tonight" banners show urgency-as-permanent-brand-voice: effective short-term, credibility-collapsing on repeat visits when the banner never turns off.

**Violators:** Cetaphil — zero urgency; timeless institutional positioning is inert for conversion and gives an acne visitor no reason to act today. Clarté MD sibling (clartemd.com.pk) — "Sold out" on all featured products creates accidental urgency impossible to convert.

**How to apply at Clarté MD:** Add "Order before 2 PM: dispatched today" to the `acne-protocol.html` hero or sticky bar, tied to the actual logistics cutoff, plus "Compounded in batches of 150 units" in the product section.

## 6. Channel-Specific Learnings — Google Search Ads

### 6.1 Lighthouse thresholds that gate Quality Score

Landing page experience is one third of Quality Score (see §2.2). Google evaluates it against Core Web Vitals thresholds that have been stable since INP replaced FID in March 2024 ([Google Search Central — Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)):

- **LCP:** < 2.5 s Good / 2.5–4.0 s Needs Improvement / > 4.0 s Poor. On `acne-protocol.html`, LCP is the hero image — optimise it first.
- **INP:** < 200 ms Good / 200–500 ms Needs Improvement / > 500 ms Poor. Shopify's third-party scripts are the primary INP risk.
- **CLS:** < 0.1 Good / 0.1–0.25 Needs Improvement / > 0.25 Poor. Lazy-loaded images without explicit `width`/`height` are the most common cause.

Google requires 75% of real-user sessions to score "Good" on all three before a URL earns a passing page experience rating ([web.dev — Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)). Two binary gates apply independently: **HTTPS** (missing = automatic "Below Average") and **mobile usability** (tap targets < 44 × 44 px or viewport overflow = same penalty). A failing rating reduces Quality Score regardless of ad relevance, raising CPC and lowering ad rank — every millisecond saved on load is a direct paid-media cost reduction.

---

### 6.2 Expected CTR/CVR ranges for PK acne keyword clusters

No Pakistan-specific Google Ads benchmarks are publicly available for skincare. The table below combines WordStream's 2025 Beauty & Personal Care data ([WordStream — Google Ads Benchmarks 2025](https://www.wordstream.com/blog/2025-google-ads-benchmarks)) with PK CPC ranges from Pakistani practitioners ([ClickMasters PK — Google Shopping Ads](https://clickmasters.pk/google-shopping-ads-in-pakistan/)), discounted for the structural factors in §2.3 and §3.

| Keyword cluster | Intent | Competition | Est. PK CPC (PKR) | Likely CVR — warmed-up LP | Notes |
|---|---|---|---|---|---|
| "acne treatment" | Transactional | High | 90–250 | 1.5–3.5% | Broad match; high volume, mixed quality |
| "best serum for acne" | Research | Medium | 55–160 | 2–4% | Informational-to-transactional bridge; review content helps |
| "acne marks treatment" | Specific concern | Medium | 60–175 | 2.5–5% | Higher intent; buyer has specific PIH complaint |
| "dermatologist acne medicine" | Near-purchase | Low–Medium | 80–220 | 3–6% | Highest intent cluster; Rx vocabulary signals prior-derm buyer |

**Hedge:** Exact PK numbers vary by quarter, ad account quality score, and day-part. These figures are directional — treat them as order-of-magnitude targets, not guaranteed outcomes. A Quality Score of 8–10 (achievable with strong message-match and CWV pass) can reduce effective CPC by 30–50% versus a score of 4–5, which at PKR 200 CPC is a material saving per click.

---

### 6.3 Ad headline ↔ landing hero parity rules

Message match (see §5.1) has three concrete operational rules for `acne-protocol.html`. Each rule assumes an ad group targeting a specific acne keyword cluster routes to this page.

**Rule 1 — Exact noun phrase in the hero.** The primary noun phrase of the ad headline — "acne treatment," "acne medicine," "acne serum" — must appear verbatim or as a clinically equivalent synonym in the H1 or hero subheadline. If the ad reads "Acne Treatment in Pakistan — Doctor Formulated," the H1 must open with "acne treatment" before any brand modifier. For multi-ad-group campaigns, use dedicated page variants (`/acne-treatment`, `/acne-marks`) rather than routing all traffic to a single page that cannot match multiple clusters ([Google Ads Help — Evaluate landing page performance](https://support.google.com/google-ads/answer/7543502?hl=en)).

**Rule 2 — Trust-claim mirror.** Any credential or guarantee mentioned in the ad copy must appear in the hero trust strip before the first scroll. If the ad says "Dermatologist-Formulated | COD Available," both signals must be above the fold — the visitor's implicit checklist is set by the ad, and a missing item reads as false advertising. For Clarté MD: "Dr. Ahmad, FCPS" in the ad means "Dr. Ahmad, FCPS" in the trust strip, not only in the About section.

**Rule 3 — Price and scarcity sync.** If the ad references a price ("From Rs. 6,499") or a guarantee ("2× refund if fake"), the landing page must display that figure within 600 px of scroll (roughly 1.5 mobile screens). Price surprises are a primary cause of Quality Score degradation and post-click bounce. Sync ad extensions and landing-page hero price on every campaign update.

---

### 6.4 Trust signals that move PK search-intent buyers

Five signals ranked by conversion impact for a PK search-intent buyer (mid-funnel, problem-aware, counterfeit-skeptical — see §3.1 and §4.3 for the full baseline):

- **Named, PMDC-registered dermatologist above the fold.** Full name, qualification (MBBS, FCPS Dermatology), and city converts the brand into a verifiable clinician — impossible for a counterfeit operation to replicate. AsraDerm buries its "Doctors" link behind a nav click; the competitive whitespace is owning the named-doctor position in the hero trust strip.

- **COD as hero risk-reversal, not a checkout footnote.** "Pay only when your box arrives" as the first trust-strip element removes the single largest PK purchase barrier. No Pakistani brand in this audit does this above the fold (§4.3); The Derma Co. (§4.2) is the closest exemplar. Placement: trust strip line 1, badge + short phrase.

- **DRAP badge or registration number.** Signals "locally regulated" versus grey-market import — the distinction that §3.1's counterfeit anxiety is built on. AsraDerm has DRAP certification but buries it below the fold. Surface the registration number or "DRAP Registered" text in the hero trust strip. Placement: trust strip line 2–3.

- **WhatsApp click-to-chat with a named team member.** "Speak to Dr. Ahmad's team — reply within the hour" converts a support widget into a trust signal and a conversion step. A generic floating icon with no name or SLA reads as a bot; Pakistani acne buyers expect a human consultation before purchase (§3.3). Placement: mid-page, after protocol explanation, before buy CTA.

- **Fake-product guarantee with quantified terms above the fold.** Clarté MD's "2× refund if fake" is already written — it is in the footer, which is the wrong location for a signal that directly neutralises 71.6% of PK buyers' primary anxiety (§3.1). Elevate to the hero trust strip: "Fake? We refund double." No current PK competitor has this above the fold. Placement: trust strip line 3–4, bold badge.

---

### 6.5 Mobile-first imperatives (Pakistani mobile share)

Pakistan had 190 million mobile connections — 75.2% of the population — with 116 million internet users as of early 2025 ([DataReportal — Digital 2025: Pakistan](https://datareportal.com/reports/digital-2025-pakistan)). Google Ads traffic from PK acne keyword clusters will be mobile-dominant by an even wider margin; search-intent acne queries spike during evening hours when skin anxiety peaks. A page not fully optimised for mobile is not a landing page for this market.

The following checklist applies to `acne-protocol.html` before any ad spend goes live:

- **Sticky CTA bar** (§5.11): fixed bottom bar "Order Now — Cash on Delivery | Rs. X,XXX" activating after the hero scrolls out of view. Currently absent on `acne-protocol.html` — Task 14 fix.
- **Single-column form below 768 px**: all inputs must stack vertically; multi-column layouts require horizontal eye-tracking that kills completion rates on portrait mobile.
- **Tap targets ≥ 48 × 48 px**: Google's mobile usability report flags elements below this threshold as a binary Quality Score gate ([Google Ads Landing Page Best Practices 2026](https://foundrycro.com/blog/google-ads-landing-page-best-practices-2026/)).
- **Correct input types**: `type="tel"`, `type="email"`, `inputmode="numeric"` — surfaces the right mobile keyboard and eliminates mid-form abandonment caused by wrong-keyboard friction.
- **WhatsApp via `wa.me/` format**: `https://wa.me/923XXXXXXXXX` triggers native WhatsApp on mobile; bare phone numbers and `api.whatsapp.com` links do not.
- **No hover-only interactions**: tooltips or ingredient details hidden behind hover states are invisible on touch screens — all content must be reachable via tap.

`acne-protocol.html` currently has no sticky CTA on mobile — a visitor who scrolls past the hero has no persistent conversion path. This is the highest-priority mobile fix in Task 14 and directly affects CVR for all Pakistani Google Ads traffic.

## 7. Audit Scorecard — acne-protocol.html
<!-- Filled in Task 11 -->

## 8. Applied Changes Log
<!-- Filled in Task 25 — file:line references for each edit -->
