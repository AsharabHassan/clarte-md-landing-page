# Apostrophe — Treatment Page Teardown

**URL:** https://apostrophe.com (redirects to `app.apostrophe.com/login/` — shut down March 2025, absorbed into Hers)
**Page label used by brand:** "Treatment" — always concern-anchored. `/treatment/acne/`, `/treatment/anti-aging/`, `/treatment/melasma/`, `/treatment/rosacea/`. Never "Protocol" or "Bundle" or "Routine." Each concern = one URL = one treatment landing that functions as the PDP.
**Why deeper than the prior teardown:** The earlier `brands/06-apostrophe.md` covered the brand system (mint palette, Character SF voice, the funnel shape) and established the "treatment-page-as-PDP" pattern. This file maps that pattern onto concrete component-level decisions: what does each section of `/treatment/acne/` contain, in what order, with what copy register, and how does it bridge to the intake funnel.

Note: all Apostrophe content is sourced from archived reviews, the Character SF agency case study (gdusa.com), and third-party walkthroughs. The live site redirects to Hers. Indirect sources flagged inline with [via {source}].

---

## URL + page label

| Surface | URL (archived) | Label |
|---|---|---|
| Acne treatment landing | `/treatment/acne/` | "Your Online Dermatologist for Acne" [via Google title tag, still indexed] |
| How it works | `/how-it-works/` | "Your Online Dermatologist" [via Google title tag] |
| Start / conversion entry | `/start-fb/` | "Customized Prescription Acne Treatment" |
| Consultation start | Account creation + condition select | "Choose your condition" |

---

## Hero composition

From the acne treatment page [via indexed title/description + zenmasterwellness.com review]:

- **Eyebrow:** "U.S. Board Certified Dermatologists" — rendered as a trust-anchor label above the headline, not a category label. The credential leads, the product follows.
- **Headline (reconstructed from indexed metadata):** "Your Online Dermatologist for Acne" — concern-specific, possessive, positions the platform as a person-type ("dermatologist"), not a product-type ("treatment cream").
- **Subline register [via Character SF case study, gdusa.com]:** "earnest and playful, and empathic to the frustrations and aspirations many customers have with their skin." The subline copy follows this: it acknowledged the frustration (acne is hard, derm appointments take months) before making the offer.
- **Hero image type:** Real people in "optimal relationship between patients and doctors" — not models, not lab coats, not before/after. The hero photograph was a patient-with-provider moment, signaling consultation rather than product purchase. [via Character SF case study]
- **Primary CTA:** "Get started" — one of the most neutral and low-friction CTAs in the segment. No dollar figure, no "take the quiz," no prescription mention. Pure low-stakes entry point.
- **Secondary trust strip directly below CTA:** Concern icons (Acne / Anti-aging / Dark spots / Rosacea) functioning as a navigation strip — clicking each icon routes to that treatment landing. This puts concern navigation inside the hero trust band, not in the top nav.

---

## Composition display

Apostrophe had no traditional PDP. The treatment landing page sold the consultation, not the bottle. The actual compound prescription was revealed only inside the logged-in dashboard after dermatologist review.

**What the `/treatment/acne/` page showed:**

**Section 1: Problem framing (above fold)**
Concern name + outcome claim in headline + brief explanation of why this concern is hard to treat OTC. Apostrophe's acne page positioned prescription access as the missing ingredient: "first customized treatment plan crafted by a board-certified dermatologist using the most effective prescription ingredients." [via gazettegal.com review]

**Section 2: "How it works" (3–4 steps)**
Illustrated step sequence [via Character SF case study — gender-neutral illustration style]:
1. Complete online consultation
2. Submit skin photos
3. Provider creates your treatment plan
4. Receive Rx, follow up anytime

Each step: icon + one-line label + one-sentence description. Steps used present-tense verbs ("Complete," "Submit," "Receive") — action-oriented, no passive constructions.

**Section 3: Ingredient examples**
Active ingredients available for this concern listed as examples: tretinoin, niacinamide, metronidazole, benzoyl peroxide in various ratio combinations. Listed as possibilities, not as fixed SKU — same structural choice as Curology. The message: "your formula will contain a subset of these."

**Section 4: Before/after social proof**
Named patients with timeframe labels. Same format as Curology: first name + duration + side-by-side imagery.

**Section 5: Dermatologist credential strip**
"Our Derm page" surfaced here: provider names, photos, medical school, American Board of Dermatology certification, states licensed in (40+ states). Named dermatologists with full credentials — the opposite of Clarté's anonymized-doctor policy. Note this as an explicit avoid.

**Section 6: Primary CTA (repeated)**
"Get started" — same copy as hero CTA. No price shown at this stage. Price reveals only after you've committed to account creation + condition selection.

**What the formula display looked like (post-login, from honestbrandreviews.com walkthrough):**

The prescription was revealed inside the patient dashboard with:
- Formula name (custom compound, not branded)
- Each active ingredient + concentration + purpose sentence
- Instructions specific to the formula
- Provider name + credentials who prescribed
- 90-day refill schedule

This is the closest surviving description of the inside of Apostrophe's treatment plan — the structure mirrors Curology's Treatment Plan with the 4 expandable sections, but Apostrophe's version used a board-certified dermatologist (higher credential) and showed their photo and medical school.

---

## Pricing transparency

**On the public treatment landing pages:**
No price shown at all. The $20 consultation fee was not surfaced until after account creation. The treatment page's job was to sell the consultation as a frictionless entry, not to surface the cost.

**Consultation model:**
- $20 consultation fee — paid after condition selection and before questionnaire
- $20 credited toward prescription if filled
- Treatment cost revealed only after provider review: $75 for 90-day topical supply, $25–$90 for oral medications
- 90-day guarantee: full refund if 90-day treatment used in full with no progress [via honestbrandreviews.com — note: this is a claims pattern flagged in `feedback_unverified_claims` as inapplicable to Clarté]

**Subscription default:**
Auto-refill defaults ON. "Easy to cancel" described in FAQ but not shown on treatment pages. This is the standard subscription-default pattern.

---

## CTA strategy

- **Public treatment landing:** "Get started" — single, neutral, routes to account creation. No price, no product name. The lowest-stakes CTA in the segment.
- **Inside account creation:** "Choose your condition" — concern-first selection drives which treatment landing the intake is tagged to.
- **After condition selection:** Pay $20 consultation fee — the first purchase moment is not product, it's access.
- **Post-provider-review (inside dashboard):** "Fill prescription" or similar — the actual Rx CTA, revealed only after approval.
- **No "Add to cart" anywhere.** Apostrophe had no cart. The funnel was consultation → prescription → refill. The purchase moment was buried deliberately.

**The strategic insight:** Apostrophe's public CTAs were maximally uncommitted ("Get started") while the real friction (the $20 consultation fee, the 30-question form, the photo upload) was hidden until the user had already invested identity. Commitment escalation without visible sticker shock.

---

## Evidence integration

**On treatment landing pages:**
- Primary claim: "U.S. Board Certified Dermatologists" as eyebrow — credential-first, not stat-first.
- No percentage-based clinical stats visible on the public treatment pages. [Could not verify — pages gated/archived]
- Trustpilot embed in the footer of treatment pages [via zenmasterwellness.com review].
- "Our Derm page" as the primary evidence anchor: real names, real photos, real credentials of 40+ dermatologists across US states.

**Voice of evidence:**
"Real dermatologist, not algorithm" was Apostrophe's central proof claim — the same as Curology's "real dermatology care, not automated." Both brands are pre-emptively answering the "is this just an AI quiz?" skepticism, using different words.

**From the Character SF agency description [via gdusa.com]:**
The brand voice was "earnest and playful, and empathic to the frustrations and aspirations many customers have with their skin." This voice showed up in micro-copy: "snap a few selfies, upload them to your profile and you're ready to rock!" [via zenmasterwellness.com] — casual mid-medical register. Clinical processes (photo upload, medical questionnaire) described with the warmth of a friend recommending a product. This is the empathy lever that Curology's more clinical voice doesn't pull.

---

## Cross-sell / upsell

On public treatment pages, Apostrophe showed no cross-sell. The funnel was linear: concern → consultation → prescription. The upsell (supporting products like Screen SPF 43 sunscreen at $27) appeared inside the logged-in dashboard after prescription, not on treatment landing pages.

This is the opposite of Curology's approach (which cross-sells OTC products on the public PDP). Apostrophe's philosophy: don't complicate the path-to-consultation with product noise.

---

## Subscription default

Auto-refill defaulted on for 90-day supply cycles. Easy cancel described in terms of service but not featured on treatment pages. No toggle on the treatment landing — subscription was the only model; the "off" position was cancellation, not one-time purchase.

---

## Voice + visual identity

**Voice register (on treatment pages specifically):**
"Earnest and playful, and empathic" [Character SF, gdusa.com verbatim]. The treatment pages addressed the emotional reality of having a skin concern (frustration, self-consciousness, waiting lists for dermatologists) before pivoting to the solution. Acknowledgment-first, offer-second. The contrast with Curology: Curology leads with stats and proof; Apostrophe led with empathy and then credentials. Both approaches work — they're targeting different skepticism profiles (data-skeptic vs. system-skeptic).

**Visual identity on treatment pages:**
- Mint accent on CTA buttons and trust-strip icons [via Character SF palette description: "mint for transparency and optimism"]
- Neutral grays as the surface — not warm off-white, not pure white. Cool-medium-gray was the "technology" signal.
- The gender-neutral illustration system for the "How it works" steps — monoline icons, no faces, no assumed skin tone. This was a deliberate inclusivity move.
- Photography: real people, unretouched-adjacent, natural light. No dramatic studio lighting.

---

## What to lift for Clarté

**1. Concern-as-hero headline on each protocol page.**
"Your Online Dermatologist for Acne" as a structural template: `[Credential] + [concern]`. Clarté's analog: "Dermatologist-formulated for acne-prone skin" as the H1 on `/acne`. JetBrains Mono credential eyebrow above Fraunces-italic headline. Apply at: `app/(site)/acne/page.tsx`, `app/(site)/even-tone/page.tsx`, `app/(site)/renewal/page.tsx`, `app/(site)/barrier/page.tsx`.

**2. "How it works" 3-step illustrated strip on protocol pages.**
Apostrophe's 3-step illustrated process (Concern → Consultation → Prescription) maps directly to Clarté's protocol pages: "Take the 30-second quiz → Get your protocol → Follow the 12-week plan." Three cobalt-outlined monoline icons (no faces, no skin-tone assumptions) + label + one-sentence description. Apply at: mid-section of each protocol landing page.

**3. Acknowledgment-first copy register on protocol page sublines.**
Before stating the solution, name the problem the customer knows they have. On `/acne`: "Acne doesn't respond to generic routines. It responds to the right actives in the right concentrations, consistently." Then the offer. This is the empathic-before-clinical register Apostrophe ran. Curology runs the inverse (proof-first). Clarté's PK audience, who has already tried OTC products that failed, will respond to acknowledgment-first.

**4. Low-commitment entry CTA on protocol pages.**
Apostrophe's "Get started" — a two-word neutral verb phrase — beat "Start your consultation" (higher friction) and "Buy now" (wrong frame for a health product). Clarté's equivalent: "Find my protocol" or "Take the quiz" on protocol pages. Single verb phrase, no price, no obligation language. Apply at: primary CTA on every protocol landing page.

**5. Gender-neutral monoline icon system for "How it works" diagrams.**
No faces, no assumed skin types, no gender cues. This is especially relevant for Clarté's /renewal and /barrier protocols where gender-neutral positioning matters. Cobalt stroke on off-white fill, consistent 2px weight. Apply at: all four protocol pages + homepage "How it works" strip.

**6. "Acknowledgment → credentials → outcome → CTA" page structure.**
This is the four-beat structure of every Apostrophe treatment page. Map it to Clarté's protocol pages: beat 1 — acknowledge the frustration (empathic subline); beat 2 — credential statement (JetBrains Mono eyebrow: "GMC-REGISTERED FORMULATOR · MADE IN LAHORE"); beat 3 — outcome (clinical proof placeholder or real stat); beat 4 — CTA ("Find my protocol"). This is a structural template, not a copywriting style.

---

## What to skip

- **Named board-certified dermatologist with photo + medical school on treatment pages.** Apostrophe's "Our Derm page" with individual photos and credentials is fundamental to their trust play. Clarté anonymizes — "our GMC-registered doctor" with no name, no face. This is correct per industry standard (Augustinus Bader, Tatcha, Dr. Jart+ all keep named doctors off public treatment pages).
- **$20 consultation fee gate.** US compounding-pharmacy regulatory mechanic. Clarté is OTC PK — no consultation fee, no prescription Rx framing, no "fill prescription" CTA.
- **Auto-refill subscription default.** Clarté is COD single-purchase. No subscription infrastructure exists and PK payment rails don't support it.
- **"90-day full refund if no progress" guarantee.** This is the specific claim pattern flagged in `feedback_unverified_claims` under "2× refund if fake." No unconditional satisfaction guarantee should appear on Clarté pages without legal review of what's operationally deliverable.
- **Trustpilot embed as primary review surface.** Trustpilot is largely unknown in PK. Use a native review component or WhatsApp screenshot testimonials surfaced as social proof.

---

## Sources
- https://www.gdusa.com/character-designs-fluidity-and-empathy-into-apostrophe-brand/ — Character SF case study: palette, typography rationale, voice description verbatim, photography direction, illustration style
- https://www.zenmasterwellness.com/apostrophe-reviews-online-skincare/ — 5-step intake walkthrough, "snap a few selfies" micro-copy verbatim, dermatologist response time, auto-refill default
- https://www.honestbrandreviews.com/reviews/apostrophe-skincare-review/ — 7-step onboarding, "Our Derms page" detail, pricing structure, 90-day guarantee detail
- https://www.gazettegal.com/posts/apostrophe-skincare-acne-treatment-by-dermatologists-delivered-to-you — acne treatment page headline reconstruction, CTA copy, ingredient possibilities listed
- https://miiskin.com/dermatology/apostrophe-skincare-shuts-down/ — closure context (March 2025), Hims acquisition
- https://apostrophe.com/treatment/acne/ — Google index title/description still live: "Your Online Dermatologist for Acne | U.S. Board Certified Dermatologists | YoDerm"
- https://apostrophe.com/how-it-works/ — Google index: "Your Online Dermatologist | U.S. Board Certified Dermatologists | YoDerm"
- https://thedermreview.com/apostrophe-skincare-review/ — UX flow: intake steps, pricing ($75 topical, $20 consultation), 3-month provider review cadence
