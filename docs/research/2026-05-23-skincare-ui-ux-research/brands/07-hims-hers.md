# Hims & Hers (skincare vertical)

**URLs:** https://www.hims.com/skincare and https://www.forhers.com/skincare (both blocked WebFetch directly; sourced from DesignRush brand-design analysis, ConvertFlow funnel teardowns, and Hers's published quiz at `/check/skin-care-routine-quiz`)
**Positioning:** US telehealth platform spanning hair, sexual health, weight, mental health, and skin. Skincare is a sub-vertical: OTC products + Rx tretinoin/melasma/anti-aging formulas via dermatology provider review. Subscription-default, often $0 consult, ~$20–$50/mo per product.
**Why study them:** Hims & Hers are the volume leaders in the segment Clarté operates in — they've A/B-tested the funnel at scale and absorbed Apostrophe in 2025. The skincare sub-page sits inside a much larger health platform, so the design problem is closer to Clarté's: how do you make *one concern* (skin) feel deep and credible inside a wider brand?

## Quick take
Hims (masculine) and Hers (feminine) share a chassis but split the visual register down brand lines. Hims is lowercase typography, bold black CTAs, lifestyle-photography-with-negative-space, and "clever, quippy" voice. Hers is softer — coral and warm-neutral palette, more product-and-routine photography, more lifestyle. Both rely on the same operational pattern: short intake quiz → "see if you're a good fit" → provider review → product on subscription. The skincare landing page in particular shows how a multi-product platform sells skincare-as-routine without becoming a derm clinic. Clarté can borrow the "slide-in checkout / slide-in nav" pattern and the timeline-bar onboarding indicator wholesale.

## Visual / branding

### Color
- **Hims**: subdued cool pastels — light blues, grays, whites with coral/orange and muted blue as accents per DesignRush analysis. Bold black CTA blocks "overlaid onto images that pop"
- **Hers**: warmer — sandy neutrals, peach/coral, sage notes (recoverable family ~#E8D9CB warm sand, ~#A8B5A0 sage-leaning; hex not confirmable post-fetch-block)
- Both reject pure clinical-white in favor of warmer surfaces — the design choice that destigmatizes the medical-platform feel

### Typography
- **Hims**: signature lowercase sans-serif throughout — even the wordmark is `hims` lowercase. "Simple, lowercase typography" per DesignRush
- **Hers**: lowercase sans-serif wordmark, mixed-case display. Both lean on a single sans-serif family, no serif emphasis
- No mono, no italic emphasis as a system — the warmth comes from photography and color, not typographic ornament
- **Lesson:** Clarté's serif + mono system is *more* differentiated than what Hims/Hers ship. Don't flatten to sans-only when borrowing.

### Photography & imagery
- **Hims** uses lifestyle photography with men "in action" — moving GIFs, negative-space-heavy compositions
- **Hers** uses softer in-bathroom / in-hand product photography, mixed with model close-ups
- Product shots: white-bg + soft-shadow style, packaging dominates frame
- Notably, **no before/after grids on the skincare landing page** — Hims/Hers don't lead with proof photography the way Curology does. They lead with lifestyle and "trusted by 2M+" claims.

### Hero composition
- Hims: bold image left, headline + CTA stacked right, single primary CTA in bold black box
- Hers skincare page: warm-toned hero with model holding product, headline framed around the *outcome* of a routine, not the product
- Hero copy typically frames around "your" — possessive, personalized framing throughout

### Motion / interaction texture
- Sliding side-drawer menu on click ("handy slide-in menu" per DesignRush)
- Checkout slides in from the right edge — does not navigate away from the page
- Rollover effects + animated GIFs on hover
- "Playfulness" via interactive micro-moments rather than scroll-jacked storytelling

## UX patterns worth studying

### Navigation
- Minimal top nav: **"Shop" + "Learn"** left, **"Cart" + "Login"** right — four items, no mega-menu
- Click "Shop" → slide-in drawer from left listing categories with single-word labels (Skin, Hair, Sex, Weight, Mental, etc.)
- This radical IA compression is the trick — they hide complexity behind a drawer instead of exposing it via a mega-menu

### Product listing / category — /skincare landing page
- Category grid of skincare products with single tile per concern (acne / anti-aging / dark spots / dryness)
- Each tile: lifestyle product image + concern label + "Get started" CTA
- No filters, no sort — the implicit filter is "take the quiz and we'll tell you"
- Below: subscription benefit strip, dermatology-provider strip, FAQ accordion

### PDP
- Single-page scroll with image stack on left, sticky buy-box on right
- Subscription price displayed primary; one-time secondary or absent
- "How it works" 4-step strip near top: take quiz → provider review → get shipped → adjust over time
- Reviews and FAQ below-fold
- No ingredient-percentage detail visible publicly for Rx — that's gated behind provider consult

### Cart
- Slide-in cart drawer from right
- Subscription default with bundle suggestions
- Free shipping always (no threshold messaging because there's no threshold)

### Checkout
- Multi-step but rendered as continuous flow with a **timeline bar showing how many steps remain** (per DesignRush)
- Account → condition confirm → medical questions → identity verification (for Rx) → payment
- Trust copy near submit: "Your provider will review your information before any prescription is sent"

### Quiz / diagnostic — Hers `/check/skin-care-routine-quiz`
- Marketed as **"5 Simple Questions for a New Routine"** — explicitly short
- Question categories per ConvertFlow teardown: skin type (oily/dry/combo/balanced/sensitive) → top concern → routine ambition (simple / expand / target) → age band → goals
- Visual style: single question per screen, large radio cards, soft warm background, brand wordmark top-left
- Result presentation: named regimen ("Your routine: [product list]") with the products shown as a 3-card row + "Talk to a provider" CTA if Rx-eligible
- Bridge to cart: "Add routine to cart" single CTA — preloads all recommended products into the cart at once
- **The key trick:** Hers's quiz keeps it short (5 questions) because the *real* medical intake happens *after* the user has committed by adding to cart. Conversion-engineered. Curology gates harder, Hers gates softer.

### Trust / social proof
- "Trusted by millions" / count-based claims
- Medical advisory board page lists board-certified dermatologists with photos and credentials
- Provider review is the central trust mechanism
- Trustpilot / customer review embeds on PDPs

### Mobile-specific patterns
- Slide-in everything (nav, cart, checkout) reads naturally on mobile
- Sticky bottom CTA on long pages
- Photo upload via native camera in intake
- Timeline progress bar across the top of intake flows is fully mobile-optimized

## What's worth stealing for Clarté MD

- **5-question quiz as the "soft gate" pattern** for `/quiz`. Today Clarté leads with photo upload, which is a hard gate (commitment-heavy). Consider a Hers-style soft entry: 5 quick concern/type questions → result preview → *then* offer photo upload as "want a more precise read?" optional upgrade. Reduces drop-off, keeps the AI-photo as the upsell, not the requirement.
- **"Add routine to cart" multi-product CTA** at the end of quiz result. Clarté's quiz currently recommends a protocol but the user has to add SKUs individually on the protocol page. Borrow the Hers single-button-adds-three pattern: result page shows the 2–3 SKUs in the recommended protocol with one "Add protocol to cart" button.
- **Slide-in nav drawer** for mobile on the site shell. Current Clarté nav is fine but a slide-in drawer with single-word labels (Acne / Even-tone / Renewal / Barrier / Quiz / Cart) would compress the mobile experience and match the "clinical with warmth" register.
- **Timeline bar across checkout** on `/checkout`. Clarté's COD checkout is short (name, address, phone, confirm) but adding a 3-step indicator ("Details · Address · Confirm") reduces the cognitive load and reads as more professional.
- **Concern-tile category page** on `/products`. Today `/products` likely shows SKUs flat. Add a top strip of four concern tiles (Acne / Uneven tone / Renewal / Barrier) that route to the protocol pages, with the flat SKU grid below. Concern-first, SKU-second, mirrors Hims/Hers IA.
- **Warmer accent for trust strips** without abandoning the navy. Hers proves that a warm-neutral surface band (sandy/peach) inside an otherwise clinical layout creates the "warmth" half of "clinical with warmth". Clarté could introduce a single warm-cream surface treatment for the testimonials / reviews band on the homepage and PDP without touching the cobalt/navy/off-white core.

## What to avoid

- **"Trusted by millions" / round-million stat claims** — Clarté has no scale to substantiate this. Don't borrow Hims's "2M+" framing.
- **Subscribe-and-save default pricing** is the entire Hims/Hers economic model and inapplicable to COD-only PK. Don't import subscription-default UI patterns into `/products/[sku]` buy boxes — keep one-time purchase as the default.
- **"Witty, quippy" copy register** is Hims's voice and is not Clarté's. Clarté's voice should stay closer to Apostrophe ("earnest and playful, empathic") — don't drift toward jokes. The medical seriousness matters in PK market.
- **Lowercase wordmark / lowercase display type** is a Hims/Hers signature that conflicts with Clarté's Fraunces serif Title Case identity. Don't lowercase the brand to mimic.

## Sources
- https://www.hims.com/skincare (403-blocked to WebFetch; sourced via design analysis)
- https://www.forhers.com/skincare (403-blocked)
- https://www.forhers.com/check/skin-care-routine-quiz (Hers skincare quiz — confirmed 5-question pattern via ConvertFlow + Hers content)
- https://www.designrush.com/best-designs/websites/hims-website — Hims UI breakdown (lowercase typography, bold black CTAs, slide-in menu, timeline bar in checkout)
- https://www.convertflow.com/quizzes/skincare — Hers quiz funnel teardown
- https://nation.steveharveyfm.com/free-minds/hims-and-hers-logo-a-deep-dive-into-the-brands-visual-identity-1764798084 — Hims/Hers brand identity analysis
- https://mouthwash.studio/project/hims-and-hers/ — MOUTHWASH design studio's Hims & Hers app project case study
- https://www.cosmeticsdesign.com/Article/2022/04/20/hims-hers-launch-expands-skin-care-collection/ — skincare vertical launch context
