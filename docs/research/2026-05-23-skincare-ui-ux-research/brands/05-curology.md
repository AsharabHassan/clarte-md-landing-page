# Curology

**URL:** https://curology.com
**Positioning:** US telehealth-derm prescription skincare. Quiz + photo + licensed provider review → custom Rx formula shipped on subscription. ~$30–$35/month after first-month-free trial ($5.45 S&H).
**Why study them:** This is the closest direct analogue to Clarté's business model on the planet — quiz/photo → personalized regimen → recurring delivery. The exact funnel Clarté is building. Their copy framing ("Proof over promises") and provider-not-algorithm credibility play are gold.

## Quick take
Curology runs the most polished, proof-led version of the "diagnostic funnel → personalized formula" pattern in DTC skincare. The home page is a stat-and-receipt machine — every visible component (89% effective, 5.5M+ treated, before/after grids with patient-named timelines) exists to convert skepticism. The brand is clean, sans-serif, restrained coral/peach accents, and leans hard on real-patient before/after photography. The lesson for Clarté: stop talking about how it works, show whose face changed.

## Visual / branding

### Color
- White / near-white surfaces dominate; charcoal text (~#1a1a1a) for body
- Soft coral / peachy accent (recoverable as ~salmon family) used sparingly on CTAs, badges, and highlight callouts
- Light grays for section dividers and trust-stat callout cards
- No dark mode; no glassmorphism; no gradients of note — restraint reads as clinical

### Typography
- Sans-serif throughout (modern geometric, in the Inter / GT America family — not recoverable from markup but consistent across hero, nav, body)
- Hierarchy: very large bold display (48px+) for hero headline, medium for section heads, regular 16px body
- No serif, no mono, no italic emphasis — this is a deliberate sans-only system that signals "modern + medical" without slipping into Glossier-pastel territory

### Photography & imagery
- Real-patient close-ups with names and timeframes ("Lauren — 3 months", "Mark — 1 year+") drive the bottom 60% of the homepage
- Diverse skin tones; deliberately not retouched into oblivion
- Product shots are clean, white-bg, minimal staging — the bottle is not the hero; the result is
- Before/after grids are the signature element, presented as side-by-side with date stamps
- No lab-coat doctor portraits, no microscope imagery; credibility comes from outcomes, not theater

### Hero composition
- Full-width banner with split before/after on desktop, stacked on mobile
- Headline: **"Proof over promises. No trends, no guesswork. Just personalized prescription care"**
- Primary CTA: **"Find your Rx formula"** — verb-led, possessive ("your")
- Three stat chips immediately below: 89% effective / 1M+ treated / 5K+ five-star reviews
- First-month offer in small print: "$5.45 S&H. First box lasts 30 days. Subject to medical consultation." — the trial framing is the conversion lever

### Motion / interaction texture
- Sticky top nav for persistent quiz-entry access
- Product carousel loops continuously
- SVG placeholder + progressive image loading suggests strong LCP discipline
- No flashy hover animations; the design intentionally feels like a medical product, not a brand experience

## UX patterns worth studying

### Navigation
- Logo left / "Shop · Why Curology · Reviews" center / "Log In" right
- Mega-menu drops with Rx vs Non-Rx columns + "Shop by concern" (Acne, Hydration, Dark spots) — this concern-first IA is what Clarté already does with protocols
- Mobile: hamburger drawer, no bottom nav

### Product listing / category
- Five Rx formula carousel cards (Hair, Custom, DayPrime, HydroTret, Body Cleanse) at top
- Below: "Daily essentials" non-Rx grid of 8–10 items at $12–$28 (the after-quiz upsell pool)
- Each card: clean white bg, product name + tagline, price, "Add to routine" or "Start your skin quiz" CTA

### PDP (product detail page) — /products/custom-formula-acne/
- Above-fold: large square product image left, buy-box right with the product name "Custom FormulaRx — Daily Acne-Clearing Treatment"
- Dual price display: **"$34.95" one-time vs "$29.95/mo" subscription** with "Get your first month FREE—just cover $5.45 shipping and handling!"
- Primary CTA is **"Start your skin quiz"** — not "Add to cart". You cannot buy without consulting first. This is the funnel discipline.
- Below-fold: example ingredient combo block (Niacinamide 4%, Azelaic Acid 8%, Clindamycin 1%) with provider quote bubbles under 125 chars each
- Provider trust block: named provider photo + credential ("Jennifer Kolinski, NP-C · Curology provider")
- Before/after testimonials with direct quotes

### Cart
- Cart drawer slides from right
- Subscription default with toggle to one-time
- Free shipping framed as part of subscription, not as a threshold

### Checkout
- Multi-step but visually a single scrolling page with progress dots
- Identity → address → photo upload → medical-history Q's → payment
- Trust copy near submit: "Subject to medical consultation" — sets expectation that this is not e-commerce, it's care

### Quiz / diagnostic / AI tool
- Lives at `quiz.curology.com/quiz/routine` — subdomain'd, fully owned funnel
- Step pattern: one question per screen, auto-advance on radio select for binary choices
- Asks in order: skin concerns (multi-select: acne, dark spots, wrinkles, clogged pores, redness/rosacea, texture, firmness) → skin type → medical conditions → allergies → medications
- Photo upload step requires **three photos: front / left / right** with makeup-off and filter-off instructions
- Progress bar across top, single primary CTA per step ("Continue"), back arrow top-left
- Result is not shown instantly — explicitly "a licensed provider will review your photos and history" → account creation + email when formula is prescribed (24–48 hr gate)
- **The lesson:** Curology never lets the user see a price-locked recommendation in the funnel itself. The gate ("a provider will review") is the trust mechanism. Compare to AI-instant brands — Curology converts higher because the wait *is* the credibility signal.

### Trust / social proof
- Stat chips top-of-page (89%, 1M+, 5K+ reviews)
- Named patient testimonials with date-stamped before/after pairs ("Lauren · 3 months", "Vivian · 6 months", "Mark · 1+ year")
- Provider credential cards: full name + NP-C/MD designation + "Curology provider" badge
- Explicit anti-algorithm copy: **"This is real dermatology care, not automated"**
- Repeats: "5.5M+ treated", "Dermatologist-developed", "Award-winning"
- No press logos, no certification badges, no "ISO 22716" — they don't need them because the stats and faces do the work

### Mobile-specific patterns
- Sticky bottom CTA ("Find your Rx formula") on long pages
- Stacked before/after on mobile (no carousel — vertical scroll wins)
- Photo upload in the quiz uses native camera API, not a generic file picker

## What's worth stealing for Clarté MD

- **Quiz architecture: one-question-per-screen + photo-upload-late** on `/quiz`. Clarté's current QuizFlow can adopt: 4–6 concern questions → 1 type question → 1 lifestyle question → photo upload at the end (currently photo is the hook). Auto-advance on single-select. Keep the progress bar. The selfie should be the *commitment* step, not the *entry* step — entry is intent, selfie is conversion.
- **"Proof over promises" as headline DNA** on the homepage hero and on each protocol page (`/acne`, `/even-tone`, `/renewal`, `/barrier`). Replace any "transform your skin" copy with a sober proof claim + a real Clarté-customer-result photo once Faisal has 10+ patient photos. The Fraunces serif italic + Curology's discipline pairs well.
- **Result-gate framing on the buy box** for `/products/[sku]`. Today every PDP shows "Add to bag" instantly. Borrow Curology's pattern: protocol-level products keep "Add to bag", but the *personalized routine* CTA on `/quiz` result should say **"See your protocol"** (not "Buy now"), then bridge to a routine page with the cart preloaded. Friction reads as care.
- **Stat-chip strip directly under the hero** on the homepage — "X protocols · GMC-registered formulator · 30-second skin analysis · Lahore-manufactured". Three to four chips, mono eyebrow style (JetBrains Mono), Pakistan-credible numbers only. Skip percentages until real outcome data exists.
- **Provider quote bubbles next to ingredient percentages** on PDP. Today Clarté lists actives like "Azelaic 10%". Add a 60–100-char quote from "our GMC-registered doctor" explaining *why this concentration*, not who said it. This converts the ingredient list from spec sheet to clinical reasoning.
- **Named-patient before/after with timeframe label** below-fold on every protocol page. Format: face + first name + "8 weeks on Clear-Skin protocol". Use AI-rendered B/A only until real photos exist, and label them as such (don't hide it).

## What to avoid

- **Curology names real providers with full credential photos.** Clarté anonymizes — never lift "Jennifer Kolinski, NP-C" formatting. Use "our GMC-registered doctor" pattern.
- **"Subject to medical consultation" gating** is a US Rx-regulation artifact. Clarté is OTC cosmeceutical in PK — no provider gate, no Rx delay. Don't invent a fake consultation step to mimic the credibility theater.
- **First-month-free + subscription default.** Clarté is COD-only, single-purchase. No subscription model fits PK payment rails today. Don't import "$5.45 trial" framing — there's no equivalent trial mechanism.

## Sources
- https://curology.com — homepage, hero, stat strip, before/after grid
- https://curology.com/products/custom-formula-acne/ — PDP buy-box, dual-price subscription pattern, provider trust block
- https://curology.com/why-curology/ — credibility narrative, "real dermatology care, not automated" copy
- https://quiz.curology.com/quiz/routine — quiz subdomain entry
- https://support.curology.com/uploading-photos-B1pwm2d2d — three-photo upload spec
- https://wwd.com/shop/shop-beauty/curology-review-1235460418/ — third-party UX walk-through
- https://www.thebossysauce.com/thebs/what-its-like-to-use-curology-customized-skincare-solutions-for-acne-prone-skin — funnel walk-through screenshots
