# Apostrophe

**URL:** https://www.apostrophe.com (now redirects to `app.apostrophe.com/login/` — the consumer site was shut down by Hims & Hers in **March 2025**, with the Apostrophe pharmacy folded into Hers)
**Positioning:** US online dermatology platform. Quiz + photo + board-certified dermatologist review → compounded prescription topical (up to 5 actives in one bottle) + oral options. ~$75 / 90 days. Acquired by Hims & Hers, sunset early 2025.
**Why study them:** Until shutdown, Apostrophe ran the most design-led version of the Rx-skincare funnel — they hired Character SF (one of the strongest brand agencies in the US) to systematize the visual language. The brand system is still visible across case studies and is the cleanest reference for "clinical with warmth" — exactly Clarté's brief. Studying the dead brand's *design system* is more valuable than studying the live competitor's funnel, because the system survives.

## Quick take
Apostrophe's identity was built around two ideas: **fluidity** (the brand mark, the photography, the language of "easily-applied creams, liquids, substrates") and **technical precision** (neutral grays + mint as the entire palette). Character SF's case study describes it as "fresh, clean and pure, but balanced with an element of technicality and precision" — that single sentence is closer to Clarté's brief than anything in this segment. Where Curology proves with stats, Apostrophe proved with feel: gender-neutral illustration, real-people photography, and a custom Renaissance-rooted-but-sans-serif logotype. Lift the system, ignore that it died (it died for business reasons, not design reasons — Hims absorbed it).

## Visual / branding

### Color
- **Mint** as the signature accent — "fresh feeling of clarity, transparency, and optimism" per Character SF's case study (recoverable hex: in the ~#C8E8DC family; exact value not extractable post-shutdown)
- **Neutral grays** as the foundation — "a foundation in technology" per the agency. Cool grays, not warm.
- White surfaces dominate; charcoal text
- No coral, no peach, no pastels-beyond-mint — the restraint is the point
- Note: this is the *inverse* of Clarté's navy+cobalt+off-white. Apostrophe is cool-light-mint where Clarté is deep-blue. The *structural discipline* (one accent + neutrals + white) is what's portable.

### Typography
- Custom **sans-serif logotype** "built from typefaces of the Renaissance but with a twist of modernism" (Character SF case study)
- Lowercase logotype — gentle, not corporate
- Body and UI in a single modern sans family (the case study doesn't specify — appears Söhne / GT America class)
- No serif anywhere — deliberately. Apostrophe rejected the "old apothecary" cue and went modernist-medical.
- **Lesson for Clarté:** the Fraunces-italic serif is Clarté's differentiator vs Apostrophe. Don't drop it — but study how Apostrophe achieved warmth with sans-only.

### Photography & imagery
- "Real people grounded in the optimal relationship between patients and doctors" — actual clinical photography, not stock
- Gender-neutral illustration style as a secondary system (icons, process diagrams)
- Product packaging photography: clean, neutral surface, soft natural light, no dramatic shadow
- No microscope shots, no chemistry-set imagery — credibility was built through human portraits, not lab theater

### Hero composition (from archive + case study)
- Centered headline + supporting copy + single primary CTA pattern
- Hero copy framed around outcomes: "Custom prescriptions for clear skin" type framing
- Primary CTA: "Get started" / "Take the consultation"
- Trust strip below: "U.S. Board Certified Dermatologists" + treatment areas (acne / anti-aging / dark spots)

### Motion / interaction texture
- Restrained — the case study emphasizes "earnest and playful, and empathic" voice, not motion theatrics
- Illustration animations on the onboarding flow (per Character SF write-up)

## UX patterns worth studying

### Navigation
- Simple top nav: Logo · How it works · Treatments · Reviews · Log in
- "Treatments" dropdown listed concern-by-concern (acne, anti-aging, dark spots, melasma) — concern-first IA, not product-first

### Product / treatment listing
- Each treatment got its own landing page (`/treatment/acne/`, `/treatment/anti-aging/`)
- Treatment page pattern: hero with concern + outcome → "how it works" 3–4 steps → ingredient examples → before/after → dermatologist credential strip → CTA to consultation

### PDP — there isn't one in the traditional sense
- This is the key insight: Apostrophe had **no PDP**. You don't buy a product; you start a consultation. The "PDP" is the treatment landing page (e.g. `/treatment/acne/`) and its job is to sell the *consultation* ($20), not the bottle.
- The actual prescription product is shown only inside the logged-in dashboard after dermatologist review.
- This is a radically different funnel shape than e-commerce. The "buy box" is "Start your consultation — $20 (credited toward Rx)".

### Cart / Checkout
- Single-page consultation checkout: account → condition select → derm match → $20 fee + medical-history form → photo upload
- ~30 yes/no medical questions with optional comment field per question
- Photo upload: "snap a few selfies, upload them to your profile and you're ready to rock!" — voice is intentionally casual mid-medical
- Free shipping standard; no threshold

### Quiz / diagnostic / intake flow
**The 5-step intake (from third-party reviews):**
1. Account setup + condition select
2. Dermatologist auto-match by state
3. Pay $20 consultation fee
4. ~30 yes/no medical-history questions with comment options
5. Photo upload (selfies to profile)

- Dermatologist reviews in 24 hours (often within 2 hours per reviewer)
- Result delivered inside the dashboard as a prescription recommendation, not a public-facing page
- The funnel is intentionally slower than Curology's because Apostrophe leaned into "real derm, real review" as the brand promise

### Trust / social proof
- "U.S. Board Certified Dermatologists" repeated as the headline credential
- Named dermatologists with photo, medical school, and credentials shown in the matching step
- Trustpilot embed for reviews
- "How it works" 3-step illustration on the homepage

### Mobile-specific patterns
- Photo upload optimized for mobile camera (selfie-first)
- Single-column intake forms throughout
- Sticky "Continue" CTA on long medical-history pages

## What's worth stealing for Clarté MD

- **Mint-as-accent discipline → translate to Clarté's cobalt-as-accent.** Apostrophe proves you can build a full clinical-but-warm system on **one accent + neutrals + white**. Clarté should audit current usage and enforce: cobalt for primary action only, navy for body/typography, off-white surfaces, no secondary accent creep. Apply on Phase 0 theme tokens.
- **Custom logotype rooted in Renaissance but modernized** is exactly the Fraunces-italic + Plus Jakarta combo Clarté already has. Validate this direction — Apostrophe's agency case study confirms the play. Don't drop the serif when redesigning.
- **Treatment-page-as-PDP pattern** for the four protocol pages (`/acne`, `/even-tone`, `/renewal`, `/barrier`). Today these are content pages with product cards bolted on. Restructure them as Apostrophe-style "treatment landings": concern → outcome → 3-step how-it-works → ingredient examples → AI before/after → single primary CTA to `/quiz`. The protocol page should sell *the protocol*, not a SKU list.
- **Gender-neutral illustration system** for the "How it works" / process diagrams on the home page and on `/about`. Clarté currently has no illustration system — adding one would let visuals carry copy on mobile where text gets compressed. Mint-style monoline icons in cobalt.
- **"Earnest and playful, empathic" voice** as the copy reference. Clarté's copy can drift toward over-clinical. Apostrophe shows the warmth lever: micro-copy like "snap a few selfies… you're ready to rock!" mid-medical-form. Apply to `/quiz` step labels and to checkout micro-copy on `/cart` and `/checkout`.
- **Concern-first IA in the top nav dropdown** instead of product-first. Clarté already organizes around protocols — make the nav dropdown lead with the four concerns ("Acne / Uneven tone / Renewal / Barrier") with the product list secondary.

## What to avoid

- **The consultation-fee gate ($20 paid intake)** is a US-Rx funnel mechanic, not a PK COD play. Clarté has nothing to charge for upfront and shouldn't fake a "consultation fee" to mimic seriousness.
- **Named board-certified dermatologist with photo and medical school** is fundamental to Apostrophe's trust play but violates Clarté's anonymized-doctor stance. Use "our GMC-registered doctor" — don't borrow the named-credential card pattern.
- **"Compounded Rx with 5 actives in one bottle"** is a regulatory artifact of the US compounding-pharmacy framework. Clarté's products are OTC formulations — don't claim compounding, don't claim Rx, don't claim "prescription strength".

## Sources
- https://www.apostrophe.com (redirects post-shutdown; archive-based)
- https://miiskin.com/dermatology/apostrophe-skincare-shuts-down/ — shutdown context, March 2025
- https://www.zenmasterwellness.com/apostrophe-reviews-online-skincare/ — 5-step intake walkthrough
- https://www.underconsideration.com/brandnew/archives/new_name_logo_and_identity_for_apostrophe_by_character.php — Character SF rebrand documentation
- https://gdusa.com/news/fresh/character-designs-fluidity-and-empathy-into-apostrophe-brand — design rationale
- http://charactersf.com/projects/apostrophe — agency case study (palette, typography rationale)
- https://cozy-pixels.com/2025/06/13/apostrophe-skincare-a-comprehensive-review-of-personalized-dermatology-in-2025/ — 2025 review covering closure + pre-closure UX
