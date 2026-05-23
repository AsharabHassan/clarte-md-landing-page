# Curology — Bundle / Routine Page Teardown

**URL:** https://curology.com/products/custom-formula-acne/ (primary PDP); https://curology.com/why-curology/ (routine showcase + proof page); https://quiz.curology.com/quiz/routine (quiz entry)
**Page label used by brand:** "Custom FormulaRx" / "Your Rx formula" / "Your personalized routine" — always possessive, never generic.
**Why deeper than the prior teardown:** The earlier `brands/05-curology.md` covered the homepage and quiz entry. This file goes deeper on the post-quiz result surface — what the brand calls the "Treatment Plan" — and the specific composition-display and evidence-integration patterns on the routine PDP. These are the highest-leverage surfaces for Clarté's `/quiz` result page and protocol landing pages.

---

## URL + page label

| Surface | URL | Label used |
|---|---|---|
| Routine PDP | `/products/custom-formula-acne/` | "Custom FormulaRx — Daily Acne-Clearing Treatment" |
| Proof / routine showcase | `/why-curology/` | "Award-winning skincare for real results" |
| Routine builder entry | `quiz.curology.com/quiz/routine` | "What steps are in your skincare routine today?" |
| Post-quiz result (gated) | Inside logged-in dashboard | "Your Treatment Plan" |
| Routine landing variant | `/start1/` | "Simple routine, serious results" |

---

## Hero composition

**`/products/custom-formula-acne/`**

- Eyebrow: none. Opens directly on product name in bold sans.
- Headline: "Custom FormulaRx" in large display weight, positioned as a proper noun (near-brand-name status).
- Descriptor line: "Daily Acne-Clearing Treatment" in smaller regular weight — the sans-/sans- two-level hierarchy.
- Subline copy: "Personalized via consultation with a licensed dermatology provider, Custom FormulaRx is made to multitask for you." — surfaces the provider credential in the first sentence, before price.
- Hero image: large product bottle on clean white ground, no model, no skin photography. Product is the icon; the face comes in the before/after section below-fold.
- Primary CTA: **"Start your skin quiz"** — not "Add to cart". The CTA routes to the quiz subdomain, not to checkout. This is the structural decision that defines the whole funnel: you cannot buy without entering the quiz.
- Secondary CTA: "Get your formula" — same destination, different verb register.

**`/why-curology/` (the routine showcase page)**

- Eyebrow: none explicit.
- Headline: **"Award-winning skincare for real results."**
- Subline: "Personalized prescriptions. Clinically-proven ingredients. Access to real, licensed dermatology providers."
- Two preset routine bundles displayed mid-page:
  - "AM to PM: Acne Routine" — DayPrimeRx + Custom FormulaRx
  - "AM to PM: Anti-Aging Routine" — DayPrimeRx + HydroTretRx
- CTA on each bundle: "Start your skin consultation"

**`/start1/` (conversion variant)**

- Headline: **"Simple routine, serious results"**
- Subline: "Unlock an easy skincare routine that's designed to be effective for your skin."
- Primary CTA: "Get your formula"
- Testimonial placed high: Avalon (24) — "I was doing 10 different things on my face morning noon and night...Now I am simply doing 3 things and it's SOO MUCH BETTER." Note: the simplicity narrative is the hook, not the clinical narrative. Complexity anxiety is the conversion blocker being removed.

---

## Composition display

### On the public routine PDP (`/products/custom-formula-acne/`)

Curology's most important composition-display pattern: **the formula has no fixed ingredient list** — it is always shown as examples, never as a fixed SKU. The page renders three example active slots:

- **Niacinamide (4%)** — "anti-inflammatory properties to help soothe inflammation" [provider attribution: Nancy Satur, MD]
- **Azelaic acid (8%)** — positioned for post-inflammatory acne marks
- **Clindamycin (1%)** — fights acne bacteria

This is not a product spec; it is a "your formula could contain up to 3 of these" preview. The format is:
```
Ingredient Name (concentration%) — one-sentence benefit claim
[Provider name, credential] in a smaller italic attribution line
```
The inactive ingredients ARE listed in full — this creates the paradox that the inactive list is more complete than the active list, which is deliberate: it signals "we're transparent where we can be" while protecting the Rx personalization mystique.

### On the post-quiz Treatment Plan page (behind auth — sourced via UX designer case study [via twong.me/curology/treatmentplan])

The logged-in Treatment Plan uses **4 expandable sections**, each with an "unread" tag that clears on tap:

1. **"What I've Prescribed"** — provider-authored narrative explaining the formula, ingredient rationale, and concentrations. Key: a "See what I prescribed" bottom sheet reveals the actual formula details (ingredient, concentration, why chosen). This is the personalized reveal moment — the data shows up in a drawer, not inline.
2. **"What You Can Expect"** — timeline copy: week-by-week improvement expectation. Framing shifts responsibility: "We'll check in before shipments" positions the provider, not the algorithm, as the continuity mechanism.
3. **"Recommended Routine"** — step-by-step instructions specific to the prescribed formula. Not generic "AM/PM routine" — it tells you exactly when NOT to use certain steps (e.g., "don't wash off formula after applying").
4. **Provider bio** — name, credential (NP-C / MD), photo, and a tap-to-learn ingredient glossary.

The logged-in reveal is the payoff for the quiz gate: the treatment plan IS the personalized routine page, not a separate surface.

### On `/why-curology/` — preset bundle display

The two AM-to-PM bundles are shown as linked product cards in a horizontal pair:
- Each card: product bottle image + product name + one-line descriptor
- Bundle pricing: "$30 off each box after" shown as a subscription benefit, not a one-time discount
- No single "Add bundle to cart" — each card routes to its own quiz-entry CTA. The bundle is illustrative, not directly purchasable as a unit.

---

## Pricing transparency

| Surface | Pricing shown |
|---|---|
| `/products/custom-formula-acne/` | **$34.95 one-time / $29.95/month subscribe** — dual-display, subscribe given visual precedence |
| Trial framing | "Get your first month FREE — just cover $5.45 shipping and handling!" — the trial price dominates the buy box |
| Post-quiz box reveal | Small: $20/month / Large: $40 every 60 days |
| Bundle (DayPrimeRx + Custom) | Shown as "$59.90/box" after trial; "$30 off each box after" subscription benefit |

Subscribe pricing is always displayed first and larger. One-time price is smaller type to the right. The $5.45 trial is the real headline — $34.95 is the "if you cancel" anchor.

There is no per-ingredient pricing — because there can't be. The formula is custom-compounded: you cannot price azelaic acid at 8% separately from clindamycin at 1%. This bundling-by-nature is a structural advantage that eliminates price comparison. Clarté's protocol bundles share this property: the 12-week protocol price has no obvious individual-product decomposition.

---

## CTA strategy

- **Primary:** "Start your skin quiz" — on every public-facing surface, always routes to quiz subdomain. Never "Add to cart" on Rx products.
- **Secondary:** "Get your formula" — same destination, more possessive/personal register.
- **Tertiary cross-sell:** "Check out HydroTretRx" — routes to a sibling Rx product PDP.
- **Post-quiz (locked):** "START TRIAL" — appears after provider review and formula assignment. The first purchasable CTA only arrives after the gate clears.
- **On routine bundles:** "Start your skin consultation" — even when showing a preset AM/PM bundle, the CTA is still consultation-first, never "add bundle to cart."

Pattern: **every CTA points to the quiz until the user is logged in with an approved formula**. The cart/purchase surface is invisible to anonymous users. This is the most aggressive form of quiz-gating in the segment.

---

## Evidence integration

**Stat format on PDP:**
> "90.5% of patients saw an improvement in their acne at 3 weeks"
> Attribution: "In a clinical trial of 150 Curology patients after 3 weeks. Self-reported."
> Disclaimer: "Results may vary"

This is the gold-standard format for this segment: **percentage + N + duration + methodology (self-reported) + disclaimer**. The "self-reported" disclosure is key — it's a consumer-agreement survey, not a randomized controlled trial, but it's presented with enough scaffold to read as clinical.

**Stat chip strip (homepage, repeated on `/why-curology/`):**
- "89% report effective" — attribution in fine print: "among 856 customers subscribed 3+ months"
- "1M+ patients treated"
- "5K+ 5-star reviews" — dated: "as of 12/03/2021"

The dated review count is unusual — most brands don't timestamp their review count. It signals accuracy-over-inflation.

**Before/after format (on `/why-curology/`):**
Five named cases: Lauren, Vivian, Mark, Annie, Mista. Each:
- First name + approximate age implied by photos
- Timeframe label: "3 months" / "6 months" / "1+ year"
- Short quote from the patient
- Side-by-side before/after photography, no heavy retouching
- Disclaimer: "Results may vary"

No lab imagery. No microscope photos. The proof is faces, names, and timeframes — not equipment.

**Provider quote on PDP:**
> [Quote from Nancy Satur, MD about niacinamide's anti-inflammatory properties]
> "Nancy Satur, MD — Curology provider"

Format: short quote (under 100 characters), full name, credential (MD), affiliation. Provider photo appears in the post-quiz Treatment Plan, not on the public PDP.

**Anti-algorithm copy:**
> "Is Curology actual dermatology care, or just an automated quiz?"
FAQ answer explicitly claims "This is real dermatology care, not automated" — a pre-emptive answer to the exact objection Clarté's AI quiz will face.

---

## Cross-sell / upsell

**On the Custom FormulaRx PDP:**
Below the buy box, a horizontal scroll of related products:
- DayPrimeRx ($59.90)
- Body CleanseRx ($28.00)
- HydroTretRx ($34.95–$59.90)
- Gentle Cleanser ($12)
- Gel Moisturizer ($16)
- Cream Moisturizer ($17)

The Rx products appear first. OTC support products (cleanser, moisturizer) appear as the "complete your routine" logic — they're the surrounding ecosystem, not the core.

No sticky bar on scroll for cross-sell. No "frequently bought together" bundle add. The cross-sell is passive (scroll cards), not active (modal or inline add).

---

## Subscription default

Subscribe-first throughout. On the public PDP:
- Subscription price ($29.95/month) shown first and in larger type
- One-time ($34.95) shown second, smaller
- Trial ($5.45) shown as the most-prominent option — visually overrides both

Subscription default toggle is pre-selected on "Subscribe." One-time requires an explicit click to switch. Cancellation messaging: "easy to cancel" appears in FAQ, not inline on the buy box.

---

## Voice + visual identity

On the routine page specifically, Curology's voice is "sober-but-possessive": everything uses "your" (your formula, your routine, your skin), but the claims are hedged ("results may vary," "self-reported," "subject to medical consultation"). The warmth comes from possessive framing and from real patient names, not from adjective-heavy copy. There are no exclamation marks in the trust section. The copy never promises — it reports ("90.5% of patients saw improvement") and lets the user draw the conclusion.

Visual: sans-serif-only, white surfaces, coral/salmon accent used only on active chips and primary CTA buttons. The bottle is the SKU icon; faces are the proof icons. Clinical without being cold — achieved through real photography, not lab theater.

---

## What to lift for Clarté

**1. Quiz-gate CTA strategy applied to the protocol result step.**
Clarté's `/quiz` result should mirror Curology's logic: before the user adds to cart, route them through a result reveal that shows the protocol as a composed unit. The CTA copy should be "See your protocol" (not "Add to cart") until the result is confirmed. Then a single "Add protocol to cart" button preloads all 3–5 SKUs. Apply at: `app/(site)/quiz/result/page.tsx` (new route) or the result section of the existing quiz component.

**2. Ingredient slot display: "[Active] ([concentration%]) — [one-sentence benefit]" format.**
On every protocol PDP (e.g., `/acne`, `/products/[sku]`), replace bare "Niacinamide 10%" labels with the three-part format: name + concentration in parentheses + one sentence from "our GMC-registered doctor" explaining why this concentration for this concern. This is JetBrains Mono for the name+%, Plus Jakarta for the benefit line, italic Fraunces for any direct quote attribution.

**3. "Self-reported, N=X, Y weeks" evidence format on protocol pages.**
Curology's "90.5% of patients saw improvement in their acne at 3 weeks — in a clinical trial of 150 Curology patients after 3 weeks. Self-reported." is the exact format Clarté needs when first-customer data exists. Until then, use the `<ClinicalProof>` placeholder. Never invent percentages per `feedback_unverified_claims`.

**4. Complexity-reduction as the headline hook on `/start1/`-equivalent pages.**
"Simple routine, serious results" + Avalon's "I was doing 10 different things... now I'm doing 3" is the conversion argument Clarté's protocol pages should make. PK customers often use 6–8 step routines sourced from TikTok; a 3-product 12-week protocol is the simplification. Frame it that way. Apply at: each of the four protocol landing pages.

**5. Preset AM/PM bundle cards on the homepage and `/products` page.**
The `/why-curology/` two-bundle display (Acne Routine / Anti-Aging Routine) is the exact pattern for Clarté's homepage protocol tiles. Each tile should show: protocol name + 2–3 included SKU thumbnails + a single "Start quiz" CTA. Not "Add to cart" — "Start quiz" until the quiz is completed.

**6. Named before/after with timeframe label below fold on protocol pages.**
"Lauren · 3 months" format. Apply to every `/acne`, `/even-tone`, `/renewal`, `/barrier` page once real customer photos exist. Until then: AI-rendered before/after with an explicit "AI-rendered simulation" disclosure label (per LRP AI notice pattern). Never hide the AI-render status.

---

## What to skip

- **Named provider with photo on public PDPs.** Curology puts "Nancy Satur, MD — Curology provider" with photo on every PDP. Clarté anonymizes. Use "our GMC-registered doctor" with no name, no photo.
- **$5.45 trial + subscription-default pricing.** Clarté has no subscription infrastructure. COD is single-purchase. Don't import any "first month free" or "subscribe and save" UI into the buy box — it would be a broken promise.
- **Quiz-gate that blocks purchase entirely.** Curology hides the cart from anonymous users — high-trust, high-friction. Clarté's market will bounce. Keep the quiz as a recommended entry, not a mandatory gate: "Take the quiz to find your protocol" with a secondary "Browse all protocols" escape hatch on every page.
- **"Subject to medical consultation" gating language.** US Rx-regulation artifact; Clarté is OTC cosmeceutical in PK.

---

## Sources
- https://curology.com/products/custom-formula-acne/ — PDP: headline, formula display, pricing, CTA, evidence stats, provider quote format, cross-sell
- https://curology.com/why-curology/ — proof page: preset bundle display, before/after format, stat chips, provider credential types, anti-algorithm FAQ copy
- https://curology.com/start1/ — conversion variant: "Simple routine, serious results" headline, Avalon testimonial, routine simplification hook
- https://curology.com — homepage: hero headline "Proof over promises", stat strip, process steps
- https://www.twong.me/curology/treatmentplan — UX case study: logged-in Treatment Plan 4-section layout, "See what I prescribed" bottom sheet, routine instruction specifics
- https://www.honestbrandreviews.com/reviews/curology-review/ — post-quiz result: "customized free trial box" reveal, Small/Large formula pricing, box lineup
- https://wwd.com/shop/shop-beauty/curology-review-1235460418/ — UX walk-through: photo upload, formula reveal, add-on products, timeline
