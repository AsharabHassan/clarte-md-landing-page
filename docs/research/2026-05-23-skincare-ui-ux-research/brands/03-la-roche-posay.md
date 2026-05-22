# La Roche-Posay

**URL:** https://www.laroche-posay.us
**Positioning:** L'Oreal-owned French dermo-cosmetic brand built around the La Roche-Posay thermal spring. Pharmacy-channel heritage, $20-$45 mid-tier. "Dermatologist-recommended" is the entire positioning. Hero SKUs: Cicaplast Balm B5, Toleriane Double Repair, Effaclar Duo, Anthelios sunscreens.
**Why study them:** They run an actual, documented design system ("Hydra") with public case studies, an AI skin analysis tool that directly mirrors Clarte's planned AI before/after rendering, and a "Skin Heroes" global skin-health mission that shows how a clinical brand can do CSR without leaving its lane. Best segment example of design tokens + accessibility done right.

## Quick take
The most operationally mature brand in the segment. Hydra design system (2025) is publicly documented on Medium with named principles, atomic-design implementation, and tokenized buttons/inputs/notifications. The MyRoutine AI tool is the segment's clearest blueprint for Clarte's planned AI skin analysis hero feature. The site itself is heavily WAF-protected, so most of this research came from the Hydra case studies — which is arguably more useful than fetching pixel-pushed HTML.

## Visual / branding

### Color
- **Primary brand blue:** `#009EE2` ("Brand/500" in Hydra tokens) — used for branding/decorative elements only, NOT for primary CTAs.
- **Primary functional CTA color:** near-black dark grey. Hydra explicitly moved CTAs away from brand blue because `#009EE2` on white text fails WCAG 2.1 AA contrast — a legal-compliance move under the European Accessibility Act (effective June 2025).
- **60/30/10 palette rule:** 60% white (brightness), 30% near-black (legibility), 10% brand blue (strategic accents).
- This is the single most actionable color insight in the whole segment for Clarte: brand color = identity, dark grey = function. Source: https://medium.com/@rayelencoria/hydra-the-design-system-for-la-roche-posay-878d2f9eec5e

### Typography
- **Pre-Hydra:** "Locator" was the brand font but inconsistently applied; videos used Montserrat.
- **Post-Hydra (2025):** migrated to **Avenir** for "stable baseline and balanced x-height" — chosen specifically for icon/button alignment precision. All sans-serif.
- No display serif. La Roche-Posay's brand voice is pharmaceutical, not editorial — they never use type to add warmth, they use copy and the spring-water origin story.

### Photography & imagery
- Product shots on near-white (warm-cream) backgrounds. Tube product (Cicaplast, Toleriane) is photographed straight-on, label fully readable.
- Heavy use of dermatologist portrait photography on About and on the "Skin Heroes" campaign page (https://www.laroche-posay.co.uk/en_GB/skin-heroes.html) — real named dermatologists.
- "Thermal spring water" imagery — water close-ups, French village photography — used on About/Heritage pages to differentiate from US-born clinical brands.
- Limited before/after; results are claimed in study-language ("Tested under dermatological control").

### Hero composition
- Couldn't fetch directly (403). From cached search and Hydra case-study screenshots: split-hero with product cutout on coloured background block (the brand blue), headline in white sans, single dark CTA button. Heritage-line product launches use a thermal-spring video loop as the hero background.

### Motion / interaction texture
- Conservative. Hydra defines button states (default / hover / pressed / disabled) with t-shirt sizing (XS/S/M/L) and proportional icon placement — micro-interactions are spec'd, not flashy.

## UX patterns worth studying

### Navigation
- Top nav grouped by product line and by concern. The Hydra audit identified five different blue variants across regions and 15+ grey shades on the French site vs 6-7 on Spanish — the cleanup of *that* fragmentation is the case study Clarte should read most carefully (https://medium.com/@rayelencoria/la-roche-posay-audit-and-heuristic-analysis-of-its-platforms-3605b342570c). The lesson: unify your tokens before you scale your pages.
- "Find Your Routine" surfaced in primary nav, leading to the MyRoutine AI tool.

### Product listing / category
- Couldn't fetch. Hydra docs reference a flexible 12-column grid from XS to XL, fixed at XXL+ with a centered 1312px container — Clarte's Tailwind v4 setup should mirror this 1312px max-width for desktop content.

### PDP
- Couldn't fetch. From Hydra atomic-design documentation: PDP composes from header/footer organisms + breadcrumbs molecule + product-card molecule + notification/toast atoms. Reviews are aggregated via Bazaarvoice based on the Bazaarvoice script references in cached HTML.
- The PDP audit findings (Hydra): product descriptions use inconsistent placement and ALL CAPS formatting — flagged as a usability problem. Clarte should NOT use all-caps for body copy.

### Cart
- Couldn't observe. Hydra notes that "checkout, login, and user flows" are next-priority expansions for the design system — meaning even LRP hasn't fully systemized this surface yet.

### Checkout
- Multi-step. Couldn't observe further.

### Quiz / diagnostic / AI tool — **the headline finding**
- **MyRoutine AI Skin Analysis** at https://www.laroche-posay.us/find-your-routine/myroutine-ai-analysis.html — this is the closest segment analogue to Clarte's planned AI before/after rendering:
  - **3-step flow:** complete profile (<1 min) → take a selfie → receive personalized routine.
  - **Claimed accuracy:** "95%+ accuracy", "based on 20 years of skin research", "50,000 graded photo database".
  - **6 skin concerns detected** from the photo.
  - **Result page:** recommended skincare routine targeted to primary focus, products add-to-cartable inline.
  - **Browser-based** — no app download required. Mobile-first (the photo step requires a phone camera).
  - **Required disclosures:** there's a dedicated "My Routine AI Notice" page (https://www.laroche-posay.us/customer-service-my-routine-ai.html) covering data handling, accuracy caveats, and the explicit statement that the tool is not a medical diagnosis. **Clarte must replicate this disclosure pattern.**
  - The Skin-Heroes mission integrates the same tool for skin-cancer awareness — they re-use the AI surface for CSR, which is a smart way to double-amortize the build cost.

### Trust / social proof
- "#1 dermatologist-recommended skincare brand" claim is heavily used in copy.
- Bazaarvoice-powered reviews aggregated on PDPs.
- "Skin Heroes" global mission positions LRP against skin cancer — softens the clinical voice with social proof of intent, not influencer noise.
- EWG ratings used in third-party retailer pages but not prominently surfaced on LRP's own site.

### Mobile-specific patterns
- MyRoutine AI flow is mobile-optimized — selfie capture step assumes phone-first.
- Standard hamburger nav + sticky cart icon.

## What's worth stealing for Clarte MD

- **Hydra's 60/30/10 + brand-color-isn't-CTA-color split** — apply to Clarte's design system overhaul (Phase 0 theme tokens). Define cobalt as a 10% accent/identity color and use near-black (`#0A0A0A` or similar — Clarte already uses dark navy for ink) for primary CTAs. **Run all current Clarte CTAs through a WCAG contrast checker before Phase 0 ships** — Hydra's whole reason for existing was that they failed this audit. The Tailwind v4 theme should encode `--color-cta-bg` separately from `--color-brand`.
- **MyRoutine AI 3-step flow as the model for Clarte's AI skin analysis** — when Clarte builds the AI before/after hero feature, copy this structure exactly: (1) 30-second profile, (2) selfie capture, (3) result page with regimen + add-to-cart per protocol. Lives at `/quiz` or a new `/skin-analysis` route. Include the LRP-style disclosure page (`/legal/skin-analysis-notice` or similar) — this is mandatory for Pakistan-market PII handling under the upcoming PDP Bill 2023 as well.
- **Atomic design tokens via Tailwind v4 `@theme`** — Hydra documents atoms (button, input, checkbox, breadcrumb) → molecules (dropdown, card, accordion, toast) → organisms (header, footer, modal). Clarte's design-system overhaul should mirror this exact taxonomy in the shadcn install. Components in `components/ui/` are atoms; composed components in `components/` are molecules; page-level layouts are organisms.
- **1312px content max-width** for Clarte's `<Container>` component. Use `max-w-[82rem]` in Tailwind. This is a tested derm-segment desktop width.
- **"Skin Heroes" CSR pattern, adapted to Pakistan** — Clarte could partner with a Pakistani dermatology charity (sun-safety in rural Punjab, melasma in pregnant women, etc.) and surface this on the homepage footer band + a dedicated `/mission` page. This is one of the few brand-building plays that doesn't risk unverified claims. Don't lift LRP's copy; do lift the *placement* (a thin band above the footer, not a hero-block).
- **No all-caps body copy anywhere** — the Hydra audit specifically called out all-caps body as a legibility failure. Clarte's PDPs and protocol pages currently use Fraunces italic for emphasis; keep that. Reserve JetBrains Mono ALL-CAPS only for short eyebrow labels (max 4-5 words).

## What to avoid

- **Named-dermatologist portraits and quotes** — LRP's Skin Heroes campaign features real, named board-certified dermatologists. Clarte's doctor is anonymized (`feedback_anonymize_doctor`); copy the *trust frame* (a doctor stands behind this) but never the *attribution pattern* (here is the doctor's photo and name).
- **Five different blue tokens** — the Hydra audit's cautionary tale. Before Clarte writes the Tailwind v4 theme, audit every blue currently in `app/globals.css`, `lib/utils.ts` and any `tailwind.config.*`. Define one navy, one cobalt, and stop. Anything more is debt.
- **"Tested under dermatological control" copy** — this is European pharmacy-channel language that does not parse for Pakistani buyers. Clarte should use "Formulated by our GMC-registered doctor" or "Clinically supervised formulation" instead, framed in plain English/Urdu.
- **Marketplace badging (EWG, paraben-free)** — LRP avoids these badges on their own site for a reason; Clarte should too (`feedback_unverified_claims`).

## Sources
- https://www.laroche-posay.us/
- https://www.laroche-posay.us/find-your-routine/myroutine-ai-analysis.html
- https://www.laroche-posay.us/customer-service-my-routine-ai.html
- https://www.laroche-posay.us/find-your-routine/myroutine-ai-skin-analysis
- https://www.laroche-posay.co.uk/en_GB/skin-heroes.html
- https://medium.com/@rayelencoria/hydra-the-design-system-for-la-roche-posay-878d2f9eec5e
- https://medium.com/@angela.brook/hydra-building-a-scalable-design-system-for-la-roche-posay-77f68c9a19b3
- https://medium.com/@rayelencoria/la-roche-posay-audit-and-heuristic-analysis-of-its-platforms-3605b342570c
- https://larocheposay-rs.my.canva.site/ (Style Guide)
- https://dribbble.com/shots/14704274-Website-design-concept-La-Roche-Posay
- https://www.laroche-posay.us/our-products/product-line/cicaplast
- https://www.laroche-posay.us/our-products/body/body-lotion/cicaplast-balm-b5-for-dry-skin-irritations-cicaplastbalmb5.html
- Note: laroche-posay.us root and most subpages returned 403 to WebFetch. Hydra design system Medium articles were the primary research source and proved more substantive than scraping the live site.
