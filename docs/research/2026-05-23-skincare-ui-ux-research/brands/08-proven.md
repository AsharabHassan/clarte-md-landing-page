# Proven Skincare

**URL:** https://www.provenskincare.com
**Positioning:** US AI-personalized skincare. The "Skin Genome Project" quiz (~3 min, 47 factors) generates a custom 3-product routine formulated by a Stanford lab. Subscription-default, ~$120 / 3-product routine, often discounted 40% on first subscription. **No prescription, no provider review** — pure algorithm-led personalization.
**Why study them:** This is the **closest analogue to Clarté's AI-skin-analysis positioning** — Proven leads with algorithm + MIT credibility, not derm consultation. The funnel shape (quiz-as-product-discovery, no human gate) is what Clarté's `/quiz` already implements. Their MIT-2018-award + 20,200-ingredient-database talking points are a masterclass in turning a black-box algorithm into credible storytelling. Lift the *narrative*, ignore the MIT specifics (Clarté can't claim them).

## Quick take
Proven solved one problem brilliantly: how to make "we used an algorithm" feel as credible as "a dermatologist reviewed your photo". Their answer is **specificity at scale** — "20,200 ingredients · 4,000 scientific journals · 100,000 products · 8 million testimonials · MIT 2018 AI Award · 47 factors". Those numbers do the heavy lifting that a named doctor would do for Curology. The site itself is restrained (clean white surfaces, large product photography) — the brand magic is the *story they tell about how the formula was decided*, not the UI itself. Lesson for Clarté: build a numbered, citable "how our AI decides" page that does the same work for `/quiz`'s photo-analysis claim.

## Visual / branding

### Color
- White / off-white surface dominance — large 1350×954 hero imagery on near-white background
- Soft warm-neutral accent (recoverable as cream/sand family from Sanity CDN imagery; specific hex not recoverable from markup)
- Minimal use of strong accent colors — the brand reads as "luxury skincare" not "tech startup", despite the AI underpinnings
- No dark mode; no gradients of note; restrained throughout

### Typography
- Specific font families not specified in fetched markup, but visual register is **modern serif display + clean sans body** based on press screenshots — the more "luxury" register vs Curology's pure-sans
- Large display headings for hero, smaller all-caps eyebrow labels ("SUBSCRIBE TODAY: UP TO 40% OFF") and standard sans body

### Photography & imagery
- Product imagery delivered via Sanity CDN as optimized WebP — performance-first
- Lifestyle photography is minimal on the homepage; product-and-packaging is the visual hero
- Distinct "luxury skincare" aesthetic: soft natural light, neutral surfaces, white packaging dominating frame
- No before/after grids on the homepage — outcome proof lives in testimonials + clinical study citation footer ("independent, 3rd party clinical study conducted over a period of 28 days" with 33 subjects)
- No doctor portraits, no lab imagery, no microscope theater — the credibility play is *informational* (MIT, factors, database) not *visual*

### Hero composition
- Large full-width hero image with minimal text overlay
- Promotional band at the very top: **"SUBSCRIBE TODAY: UP TO 40% OFF"** in all-caps
- Three quiz-entry tiles below the hero, each with icon + tagline + **"START QUIZ"** CTA:
  1. **3-Step Skincare Quiz** — "Personalized cleanser, day moisturizer & night cream"
  2. **Eye Cream Duo Quiz** — "Personalized day eye cream & night eye cream"
  3. **Serum Quiz** — "Personalized serum"
- Three discrete quizzes for three product systems — not one mega-quiz. This segmentation is interesting: each entry point optimizes for a different intent.

### Motion / interaction texture
- Sanity-CDN image delivery suggests strong perf discipline; SVG placeholders for progressive loading
- No documented scroll-driven storytelling or dramatic animation in fetched markup
- Restrained UI motion — the brand sells the *idea*, not the interaction

## UX patterns worth studying

### Navigation
- Top nav: **Skin Quiz · Shop · Learn** + cart/account
- "Skin Quiz" as a top-level nav item is the key tell: the quiz isn't a feature, it's the primary product
- Shop is secondary because most purchases route through quiz

### Product listing / category
- The "shop" doesn't really exist as a standard grid — the canonical entry is the quiz
- Individual products are visible but framed as "quiz-recommended" — you're nudged to take the quiz even on shop tiles

### PDP / system page — the 3-step system
- Bundle-as-PDP pattern: the "3-Step System" is a single product with three components shown together
- Above-fold: hero shot of all three bottles together, single price for the bundle, subscription option primary
- Quiz-result-locked: heavy nudging toward the quiz before purchase — the "buy this generic version" path exists but is de-emphasized vs "take the quiz to personalize"

### Cart / Checkout
- Cart drawer pattern (not deep-linkable, sourced from third-party reviews)
- Subscription as default; one-time as secondary toggle
- No free-shipping-threshold messaging in primary copy — shipping is bundled into subscription

### Quiz / diagnostic / AI tool — **THE centerpiece**
- **3-minute, 47-factor quiz** is the explicit promise
- Question categories per third-party teardowns:
  - **Heritage / genetics** — ethnicity, family skin conditions
  - **Skin concerns + type** — primary concerns + multi-select
  - **Lifestyle** — sleep, diet, stress, tech exposure, sun exposure
  - **Environment** — ZIP code triggers lookups for: water hardness, humidity, UV index, pollution
  - **Goals** — what "good skin" means to the user
- ZIP-code-as-input is the signature trick — it lets them claim "your unique environment" without asking 20 environmental questions
- Result presentation: **3 named custom products** shown as a routine card with "Add to cart" / "Subscribe" CTAs
- Bridge to cart: the result IS the cart preview — one click to subscribe to the routine
- Critically: **the AI claim ("MIT 2018 Award", "20,200 ingredients", "8M testimonials", "Stanford lab formulation") is repeated throughout the quiz steps**, not just on the marketing page. Every question reminds you why this is rigorous.

### Trust / social proof
- **Specificity-at-scale numbers** as the primary trust mechanism:
  - "20,200 ingredients" database
  - "4,000 scientific journals"
  - "100,000 products"
  - "8 million testimonials" analyzed
  - "47 factors" analyzed per user
  - "MIT 2018 Artificial Intelligence Award"
  - "Stanford lab" formulation
- 3rd-party 28-day clinical study citation in footer (33 subjects)
- Shark Tank appearance is a credibility tag in press
- No named-dermatologist trust play

### Mobile-specific patterns
- Quiz is mobile-first by design (3-minute promise = mobile-completable)
- Single-question-per-screen, large tappable radio cards
- ZIP-code input triggers a "we're checking your environment" loading moment — converts the question into a feature

## What's worth stealing for Clarté MD

- **"How our AI decides" page** as a dedicated trust surface — Proven's MIT/database storytelling works because it's *specific and citable*. Clarté should build (and link prominently from `/quiz`) a "How we analyze your skin" page that lists: how many skin markers the model checks (texture / tone / pore / line / spot / etc.), what training data it uses, what it explicitly does not do (no diagnosis, not a substitute for derm). Specificity = credibility. This applies on `/quiz`, on `/about`, and as a link from every protocol page.
- **Quiz-segmentation by routine depth** — Proven's three quizzes (3-Step / Eye Duo / Serum) suggest entry-point variants for different ambitions. Clarté could borrow this: keep one main `/quiz` but add a "Quick read" (3 questions + photo, 30s) vs "Full read" (8 questions + photo, 2 min) split. Reduces top-of-funnel drop.
- **ZIP/PIN-code-as-environment-input** on `/quiz`. Asking for city/area in PK could let Clarté claim "we adjusted for Karachi's humidity vs Lahore's dust" — a localized credibility moment. Today the quiz likely doesn't use location at all. Even if the adjustment is shallow, the *narrative* that it's adjusted is the win.
- **Quiz-result page IS the cart preview** — single CTA to add the recommended protocol bundle. Mirrors the Hers pattern but framed as personalization, not Rx. Apply on the result step of `/quiz`.
- **Specificity-at-scale stat strip** on `/about` and below the homepage hero. Replace any vague "advanced AI" copy with citable numbers: "8 skin markers · 4 protocols · X dermatologist-approved formulations · made in Lahore". Numbers > adjectives.
- **All-caps mono eyebrow on promo bands** ("SHIPPING RS. 250 · COD AVAILABLE") at the very top of the site, in JetBrains Mono. Subtle, brand-consistent, conversion-useful. Proven's "SUBSCRIBE TODAY: UP TO 40% OFF" pattern is portable to Clarté's flat-rate-shipping band.

## What to avoid

- **MIT AI Award / Stanford lab / 20,200-ingredient-database claims** — these are Proven's specific provenance and not transferable. Don't invent equivalents. Clarté's credibility play is the GMC-registered formulator + Lahore manufacturing, not borrowed academia.
- **"8 million testimonials analyzed" / 4,000 journal scale claims** — Clarté has no equivalent dataset. Vague AI claims read worse than no AI claim. Match the specificity to what Clarté can actually substantiate.
- **40%-off subscription-default pricing** is the Proven economic model and inapplicable to Clarté's COD-single-purchase + Rs. 250 flat shipping. Don't import discount-anchored hero promotions.
- **Three-product custom routine framed as "your unique formula"** — Proven actually makes custom batches per customer. Clarté ships standardized SKUs grouped into protocols. Don't claim "custom-formulated for you" — claim "matched to your skin", which is true.

## Sources
- https://www.provenskincare.com — homepage, three-quiz tile structure, "SUBSCRIBE TODAY: UP TO 40% OFF" band, clinical study footer
- https://www.provenskincare.com/quiz/ — quiz entry confirmed
- https://www.provenskincare.com/quiz/start/ — quiz start
- https://support.provenskincare.com/en-US/articles/skin-genome-quiz-96717 — official 47-factor explanation
- https://www.provenskincare.com/blog/cutting-edge-personal-skincare-uses-ai-technology — AI/database narrative
- https://thegetwell.co/sponsored/proven-skin-genome-quiz/ — third-party walk-through of the quiz
- https://www.businesswire.com/news/home/20200507005629/en/AI-Driven-Skincare-Line-PROVEN-Makes-Shark-Tank-Debut — Shark Tank context + "Skin Genome Project" framing
- https://www.mysubscriptionaddiction.com/b/proven-skincare — subscription/pricing details
- https://www.ycombinator.com/companies/proven-group — YC company page (origin/AI claims)
