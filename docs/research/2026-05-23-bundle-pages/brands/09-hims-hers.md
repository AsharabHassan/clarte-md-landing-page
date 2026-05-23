# Hims / Hers — Routine / Bundle Page Teardown

**URLs:** https://www.forhers.com/skin-care (403 to WebFetch); https://www.forhers.com/acne (403 to WebFetch); https://www.forhers.com/check/skin-care-routine-quiz (403 to WebFetch)
**Page label used by brand:** Hers uses "Routine" for OTC bundles and "Treatment" for Rx products. The quiz result surface is called "Your results are in!" — not "your routine" or "your protocol." Hims calls these "Skin" on the slide-in nav, "Treatment" on Rx PDPs.
**Why deeper than prior teardown:** The earlier `brands/07-hims-hers.md` covered the full brand system and homepage-level patterns. This file zooms in on: (a) the 5-question OTC quiz and its result page — the closest reference to Clarté's 30-second AI quiz funnel; (b) the Hers `/acne` treatment-as-PDP surface; and (c) the specific "Add routine to cart" multi-product CTA mechanic which is the single highest-leverage funnel pattern for Clarté's `/quiz` result page.

All Hers content is sourced from indexed page metadata, third-party reviews, WebSearch results, and a Whimsy Soul first-person walkthrough [via whimsysoul.com]. 403 blocks on all direct Hers fetch attempts flagged inline.

---

## URL + page label

| Surface | URL | Label |
|---|---|---|
| Skincare landing | `/skin-care` | "Prescription Skin Care Products for Women" [Google title] |
| Acne treatment PDP | `/acne` | "Acne Treatment \| Personalized Acne Medication for You" [Google title] |
| Acne Rx cream PDP | `/acne/acne-cream` | "Prescription Acne Cream: Pimple Cream w/ Tretinoin" [Google title] |
| OTC routine quiz | `/check/skin-care-routine-quiz` | "Skin Care Routine Quiz: 5 Simple Questions for a New Routine" [Google title] |
| Quiz result (gated) | After quiz completion | "Your results are in!" [via WebSearch / indexed page content] |

---

## Hero composition

**`/acne` treatment page [via forhers.com/acne Google index + whimsysoul.com review]:**

- **Eyebrow / page title label:** Not an eyebrow in the typographic sense — the concern name "Acne" functions as the IA label in the nav, but on the page itself the headline takes over.
- **Hero headline framing:** Concern + outcome construction — positions acne treatment as attainable, not pharmaceutical. [Could not verify exact verbatim — 403 blocked]
- **Hero image:** Lifestyle photography with model close-up or in-bathroom product staging — warm-neutral palette (sandy/peach tones), soft shadows, approachable rather than clinical. [via DesignRush Hers brand analysis]
- **Primary CTA:** "Start your free online consultation to connect with a licensed provider today" [via WebSearch indexed content, forhers.com/acne]. The "free" qualifier reduces the friction of the consultation gate vs. Apostrophe's $20 fee.
- **Trust strip below CTA:** Before/after images from customers "who have purchased varying products, including prescription-based products" [via WebSearch]. Note: Hers's before/after disclaimer is more explicit than Curology's — "these customers' results have not been independently verified and individual results will vary."

**`/check/skin-care-routine-quiz` [via WebSearch indexed content]:**

- **Page title:** "Skin Care Routine Quiz: 5 Simple Questions for a New Routine" — both the promise (5 questions) and the outcome (a new routine) are in the title. This is the headline.
- The quiz page is sparse: brand wordmark top-left, progress bar across top, one question per screen, warm background, radio-card answer options.

**`/start1/`-equivalent Hers landing [via forhers.com/skin-care Google description]:**

- Brand promises: "2-step" simplification is the headline hook [via innerbody.com review: "Hers simplifies the skincare process by offering only two steps — one in the AM and another at night"]. The simplification promise is even more aggressive than Curology's "3 things."

---

## Composition display

### OTC Quiz Result — "Your results are in!" [via WebSearch, indexed content, innerbody.com]

After the 5-question quiz, the result page displays:

**AM routine sequence:**
1. Cleanser
2. Toner (optional note)
3. Serum (Vitamin C for tone)
4. Moisturizer ("Tidal Wave Facial Moisturizer — hydrates without clogging pores")
5. Sunscreen

**PM routine sequence:**
1. Remove makeup
2. Cleanser
3. Exfoliants
4. Toner
5. Serum
6. Moisturizer

This is a **step-ordered routine display**, not a product-card grid. Each step shows: step number + step label + recommended product name + one-line product description. The routine is presented as a sequence, not as a bundle of individual products to compare.

Key structural observation: **the result page bridges to "Talk to a provider" CTA for Rx-eligible concerns**, and to an "Add routine to cart" single-button CTA for OTC product sets. The quiz result IS the cart preview — the user sees the full AM/PM routine and can add all recommended products with one action.

Specific products mentioned in indexed result content: Deep Sea Facial Cleanser (acne-prone skin), Vitamin C Serum (tone improvement), Tidal Wave Facial Moisturizer (non-comedogenic).

### Hers OTC "Essentials" bundle structure [via innerbody.com, medicalnewstoday.com]:

The OTC product line is branded as "Essentials." It consists of:
- Clear Waters Cleanser ($15 one-time / $13.50 subscribe)
- Hydrobounce Moisturizer ($24)
- Multi-Screen Mineral Sunscreen SPF 50+
- Effortless Glow Face Oil
- Fast Fader Dark Spot Corrector

These are sold individually but surfaced as a step-ordered routine on the quiz result page — the same SKUs, different presentation mode.

### Rx Treatment display — `/acne/acne-cream` [via innerbody.com + medicalnewstoday.com]:

The acne Rx cream is a single compound product containing: tretinoin (concentration customized per patient), niacinamide, clindamycin phosphate, zinc pyrithione, azelaic acid.

The PDP for the Rx cream shows the formula as a multi-active single product — no individual ingredient pricing because it's a compounded formulation (same structural advantage as Curology's Custom Formula). The "composition display" for the Rx is: "Tailored ingredient mix and strength designed for your specific needs" with the active list below.

---

## Pricing transparency

**OTC Essentials [via innerbody.com]:**
- Individual: $15–$24 per product, one-time or subscribe ($13.50/month for cleanser example)
- Bundle price: Not explicitly documented — the quiz result may show individual product prices rather than a bundle total [could not verify — 403 blocked]

**Rx Acne Cream [via medicalnewstoday.com, innerbody.com]:**
- $45 for the prescription cream — consistent across both Rx products (acne cream + anti-aging cream both $45)
- Shipping: free always, no threshold
- Consultation: $0 (vs Apostrophe's $20) — "Start your free online consultation" is the headline claim

**Pricing posture:**
Subscribe pricing is the default. One-time available but secondary. The OTC products have explicit per-month subscribe prices shown alongside one-time. The Rx products are subscription by nature (prescription refills).

---

## CTA strategy

**5-question quiz CTA architecture [via WebSearch indexed content]:**

The quiz CTA strategy is the key structural lesson:
- **Pre-quiz:** "Take the Quiz" or "5 Simple Questions for a New Routine" — low-commitment entry, time-scoped promise (5 questions, not "take a consultation")
- **During quiz:** Single "Continue" per screen, auto-advance on single-select radio choices
- **Quiz result OTC path:** **"Add routine to cart"** — single button, adds all recommended OTC products simultaneously. This is the single-CTA multi-product cart-add pattern.
- **Quiz result Rx-eligible path:** "Talk to a provider" — escalates to the Rx intake funnel (longer, medical-history questions)

The bifurcated CTA at the result stage is the smartest pattern in the segment: OTC users get an immediate "Add routine to cart" without any provider gate; Rx-eligible users are routed to the medical intake. Two paths from one result surface, based on concern severity detected in quiz answers.

**On treatment landing pages:**
- "Start your free online consultation" — the Rx path entry
- Repeated at hero + mid-page + end of page

**On OTC product PDPs:**
- "Add to bag" for individual products
- "Subscribe & Save" toggle (not applicable to Clarté)

---

## Evidence integration

**On `/acne` treatment page [via WebSearch, forhers.com/acne indexed content]:**
- Before/after customer photos with explicit disclaimer: "these customers' results have not been independently verified and individual results will vary" — more cautious than Curology's "Results may vary"
- Timeline copy: "typically at least a month to start seeing results" / "antibiotic medications showing improvement after a couple weeks" / "full effects visible in approximately three months"
- "The Purge" (tretinoin adjustment period) described proactively — pre-emptive objection handling. This is a trust move: acknowledging the initial worsening phase prevents churn from alarmed customers.

**On `/skin-care` landing [via innerbody.com]:**
- "Trusted by millions" or similar scale claim [via DesignRush analysis — exact number not recoverable]
- No N= / methodology format visible on public landing pages — evidence is testimonials + provider review, not clinical-trial stats

**Medical advisory board:**
Hers maintains a "Board of Advisors" / medical advisory board listing with named, credentialed dermatologists [via medicalnewstoday.com]. This is surfaced on an About-adjacent page, not on treatment landing pages — same doctor-to-About-only placement that Clarté uses.

**Key evidence copy pattern [via whimsysoul.com walkthrough]:**
The welcome email and dashboard messaging use first-person provider voice — the assigned provider writes directly to the patient. This creates a perceived 1:1 relationship with one doctor, not an algorithm. Hers achieves this with asynchronous review within 1 hour typically.

---

## Cross-sell / upsell

**On quiz result page:**
- OTC routine shown as full step-ordered sequence — implicit upsell of 4–6 products simultaneously
- Prescription option surfaced as an upgrade CTA ("Talk to a provider") for users with acne concern
- No explicit add-on tiles or "frequently bought together" — the routine itself is the upsell

**On `/acne` treatment page [via WebSearch]:**
- Educational content about tretinoin side effects + timeline — builds anticipation management, not upsell
- No side-product carousel documented on the treatment page (vs. Curology which cross-sells OTC products on Rx PDP)

**Inside account dashboard (post-subscription):**
Supporting products (cleansers, moisturizers) surfaced as routine completers — same pattern as Curology's ecosystem products. Not accessible without sign-up.

---

## Subscription default

Subscription-first throughout. For OTC Essentials: subscribe price shown first and in larger type, one-time smaller/secondary. For Rx: refill subscription is the only model — prescriptions require ongoing provider relationships.

Cancellation: "easy to cancel" described in reviews but not as a CTA on treatment pages. No "no commitment" or "cancel anytime" prominent callout on the quiz result page [could not verify — 403 blocked].

---

## Voice + visual identity

**Voice register (on routine/treatment pages specifically):**
"Witty, quippy" is the official Hims voice; Hers runs a softer version of the same — more earnest, less edgy. On treatment pages specifically, the voice becomes more direct and educational: the "The Purge" explanation for tretinoin is factual, not witty. The quiz questions use warm, non-clinical language ("How would you describe your skin?" not "What is your Fitzpatrick skin type?").

The quiz is where the Hers voice is most legible: the 5-question format is consciously casual — "5 Simple Questions for a New Routine" as the page title is the voice in action. The answers are colloquial ("my skin feels tight" vs "dry skin type"). This reduces the medicalization of the intake, making the quiz feel like a friend's recommendation, not a clinical screening.

**Visual identity on treatment pages [via DesignRush + whimsysoul.com]:**
- Warm sandy neutrals, peach/coral accents — not clinical white, not navy. Warm surfaces destigmatize the medical frame.
- Product photography: in-bathroom, in-hand, soft natural light. No dramatic studio setup.
- Lowercase wordmark throughout — a consistent brand-voice signal in the typography.
- No JetBrains Mono-equivalent. No serif. Single sans-serif family everywhere.

---

## What to lift for Clarté

**1. "5 Simple Questions for a [Protocol]" quiz entry page title as the hero.**
The time-scoped + outcome-scoped promise ("5 questions" + "a new routine") is the highest-leverage copy pattern for Clarté's quiz entry. Clarté's analog: "30-second skin analysis. Your 12-week protocol, ready instantly." Apply at: `/quiz` page hero. JetBrains Mono eyebrow: "30 SECONDS · 4 PROTOCOLS · INSTANT RESULT". Fraunces-italic headline: "Find your protocol."

**2. Step-ordered routine display on the quiz result page.**
Hers's result page shows AM/PM steps with product assigned to each step — not a product grid, but a routine flow. This is a radically different mental model: the user sees their routine, not a product list. Clarté's result page should show the 3–5 protocol products as morning/evening steps:
- AM Step 1: [Cleanser name] — "Apply to damp skin, massage for 30 seconds"
- AM Step 2: [Serum name] — "Apply 2–3 drops to clean skin"
- PM Step 1: [Treatment name] — "Apply thin layer to entire face"
Each step: product name in Fraunces italic + step instruction in Plus Jakarta body. The protocol is revealed as a journey, not a shopping cart. Apply at: the quiz result page component.

**3. "Add protocol to cart" — single multi-product CTA on quiz result page.**
This is the single highest-leverage funnel improvement for Clarté. Current state: quiz recommends a protocol but user must navigate to the protocol page and add SKUs individually. Hers's state: one button adds the entire routine to cart at once. Apply at: the bottom of the quiz result's step-ordered routine display. Button copy: "Add protocol to cart — Rs. {bundle_price}" (include price per the Glossier pattern cross-referenced in `03-pdp.md`). COD framing immediately below: "Pay the courier on delivery · Rs. 250 flat shipping."

**4. Bifurcated CTA at result stage (OTC path vs. upgraded path).**
Hers routes OTC users to "Add routine to cart" and Rx-eligible users to "Talk to a provider." Clarté's equivalent: route standard-concern users to "Add protocol to cart" and users flagging complex concerns (severe cystic acne, melasma with medications, pregnancy) to "Consult our team on WhatsApp." Two paths from one result page, based on quiz answer flags. The WhatsApp escalation is Clarté's provider-chat equivalent. Apply at: quiz result page component logic.

**5. Pre-emptive objection handling copy on protocol pages.**
Hers's "The Purge" explanation for tretinoin's initial worsening — framing the side effect proactively to prevent customer panic — is the pattern. Clarté's analog on each protocol page: "In weeks 1–3, your skin may appear more congested as the protocol begins clearing deeply-lodged impurities. This is expected and a sign the treatment is working." This is clinical warmth: clinical accuracy (the mechanism is real) + emotional warmth (anticipation management). Apply at: `/acne` protocol page, after the how-it-works strip.

**6. Warm-neutral surface band for testimonials / social-proof section.**
Hers uses sandy/warm-neutral surface backgrounds to destigmatize the medical feel on treatment pages. Clarté's cobalt/navy brand is distinctly cooler. One warm-cream surface section (the testimonials band or the before/after strip) provides the warmth contrast without abandoning the navy/cobalt identity. Match to the `--background` warm off-white token from Phase 0 on the testimonials component specifically. Apply at: the social-proof strip on each protocol page and on the homepage.

---

## What to skip

- **"Trusted by millions" scale claim.** Clarté has no comparable volume. Don't import this; it reads false at Pakistan launch scale.
- **Subscribe & Save default-on toggle.** Hers's entire economic model depends on subscription. Clarté is COD-only, single-purchase. No subscription infrastructure. Don't show the toggle at all, even disabled.
- **"Witty, quippy" voice register.** Hims's voice is wrong for Clarté. Even Hers's softer version is lighter than the "clinical with warmth" brief. The "earnest and empathic" frame (Apostrophe's voice) is the right register, not witty.
- **Lowercase wordmark / display type.** Hims/Hers brand signature; conflicts directly with Clarté's Fraunces Title Case identity.
- **Free shipping always (no threshold, no messaging).** Hers offers free shipping as a baseline expectation. Clarté charges flat Rs. 250 — don't bury this, surface it prominently as a COD trust signal (not a friction point).
- **"Start your free online consultation" Rx-gate copy.** Clarté is OTC — no consultation gate, no Rx framing, no "provider will review" delay promise.

---

## Sources
- https://www.forhers.com/check/skin-care-routine-quiz — Google title/description: "Skin Care Routine Quiz: 5 Simple Questions for a New Routine"; quiz result content: "Your results are in!", AM/PM step sequence, product names [via WebSearch indexed content; direct fetch 403]
- https://www.forhers.com/acne — Google title/description: "Acne Treatment | Personalized Acne Medication for You"; CTA: "Start your free online consultation"; before/after disclaimer; timeline copy [via WebSearch indexed content; direct fetch 403]
- https://whimsysoul.com/how-for-hers-acne-treatment-with-tretinoin-saved-my-skin/ — First-person walkthrough: onboarding survey, provider match timing (~1 hour), prescription contents, usage instructions
- https://www.innerbody.com/hers-review — OTC Essentials product list + prices; Rx products ($45 each); "2-step simplification" framing; subscription pricing for cleanser ($13.50/month)
- https://www.medicalnewstoday.com/articles/hers-review — Skincare product inventory; Rx formula ingredients (tretinoin + niacinamide + clindamycin); consultation process description
- https://www.designrush.com/best-designs/websites/hims-website — Hims UI analysis: lowercase typography, bold black CTAs, slide-in menu, timeline bar in checkout, warm palette on Hers
- https://www.convertflow.com/quizzes/skincare — Quiz best-practices context; 3–5 question recommendation for conversion-optimized funnels
- https://finvsfin.com/proactiv-vs-curology-vs-hers-vs-apostrophe/ — Multi-brand comparison: Hers "AM & PM solutions individually formulated", 2-step system, product comparison
