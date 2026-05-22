# Drunk Elephant

**URL:** https://www.drunkelephant.com
**Positioning:** Tiffany Masterson's founder-led "biocompatible skincare" brand — $40-$72 actives sold on an ingredient-elimination story (the Suspicious 6) and a "mix your own smoothie" routine philosophy.
**Why study them:** Drunk Elephant proves a clinical claim system can coexist with a playful brand voice. They land specific actives (peptides, hyaluronic, retinol) and clinical % stats while writing copy like a friend who has opinions. Clarté wants clinical credibility without sterility — Drunk Elephant is one of the few brands that pulls this off, even if the colour-block vibe itself is wrong for Clarté.

## Quick take

Underneath the loud bottles, Drunk Elephant's actual web design is restrained: white surfaces, clean cards, one big promotional banner at a time. Their power is **copy and ingredient architecture**, not visual. They take a hard stance ("Suspicious 6™ are out") and repeat it on every page. The translatable lesson for Clarté: own a list of opinions, name them, and let them recur — design systems are easier when there's a fixed credibility ladder to lean on.

## Visual / branding

### Color
- The *site* is overwhelmingly white. The bright Memphis-style packaging is the only saturated colour on screen — pink Protini, orange C-Firma, magenta T.L.C. Framboos sit on white surfaces like specimens.
- Promotional banners borrow one of the packaging colours for backdrop ("Holy 25% off sitewide!" runs against a pink/warm accent).
- No dark mode. No surface gradients. The brand's "loudness" lives entirely in the product photography.

### Typography
- Sans-serif primary throughout. Modern, clean, no display serif.
- Tone is carried by **word choice**, not type treatment: "Please moisturize responsibly," "be a firm believer," "get-sh*t-done cream."
- All-caps used in size labels (`50 ML/1.69 FL OZ`, `Big — Best Value`) and category nav. Bold weights flag promotional copy.
- Notable: headlines sometimes repeat three times in stacked lines ("The whole shebang! / The whole shebang! / The whole shebang!") — emphasis through rhythm rather than scale.

### Photography & imagery
- Cutout product shots dominate — bottle against white, generous shadow. The bottle's own colour does the visual work.
- Texture swatch photography (cream on glass / on skin) is used heavily on PDPs to show consistency.
- Lifestyle / Instagram grid sits at the footer (27 thumbnails) — model diversity is real but the framing is "in someone's bathroom," not editorial portrait.
- Before-after appears on PDPs as a labeled `Before / After 4 weeks` pair — modest, not dramatic.
- No founder portrait floating in the navigation. Tiffany shows up as a signed Founder's Note ("From Tiffany") inside the PDP, not on a hero.

### Hero composition
- Carousel of full-bleed product / campaign slides at 1380x1380. Each slide is one product on a soft background colour, one tagline, one CTA ("SHOP NOW").
- The hero never tries to sell the brand philosophy — it sells the next product. Philosophy lives in dedicated explainer pages.

### Motion / interaction texture
- Size/refill toggles dynamically update price and SKU in the buy box without page reload.
- Before/after image appears as a static labeled pair on PDP (not an interactive slider on the Protini page we crawled — simpler than expected).
- "Smoothie" cross-sell uses an interactive carousel with `Face-Off` head-to-head comparisons between Protini, Lala Retro, and Bora Barrier.
- Decorative "squiggle border" SVG dividers segment PDP sections — the only ornamental UI element.

## UX patterns worth studying

### Navigation
- Top nav: Shop / Learn / Account / Cart. Mega-menu under Shop branches into Skincare → Moisturizers / Serums / Masks+Treatments / Cleansers / Eyes+Lips.
- "Learn" surfaces the editorial brand stories: Philosophy, Smoothie Glossary, Suspicious 6.
- Search is light; hamburger drawer expected on mobile (not crawled directly).

### Product listing / category
- Collection page returned 410 on direct fetch — couldn't grade card composition first-hand. From the homepage carousels, cards are: bright bottle cutout, product name in sans, single price, no badge clutter except "Best Value" / "Bestseller" eyebrow.

### PDP (Protini Polypeptide Cream — https://www.drunkelephant.com/products/protini-polypeptide-cream)
- Two-column above-fold. Bottle gallery left; buy box right.
- Product name carries full descriptor: "Protini™ Polypeptide Firming Refillable Moisturizer" — proprietary brand-name `+` ingredient-class `+` function. Naming is its own credibility move.
- Four size variants in a dropdown: Standard 50ml, Refill 50ml, Little 15ml, Big 100ml (`Best Value`). Refill is treated as a peer SKU, not a sustainability afterthought.
- Price: $72.00 strikethrough → $54.00 current (25% off). Afterpay surfaced as `$13.50 × 4`.
- Clinical block right under the buy area: three percentages — `96%` skin tone/radiance, `93%` texture, `90%` hydration — with footnote: `*In a clinical study with 31 people after 8 weeks.` Sample size is shown, not hidden.
- "Key Ingredients" module: three featured actives, each with a one-line mechanism explanation. Full INCI list collapsed behind a "Full ingredient list" expander.
- "Smoothie Kit" cross-sell shows three products mixed together with an `Add All to Bag` button and a single combined price ($208). Bundle UX done well.
- "Face-Off" comparison carousel pits Protini against Lala Retro and Bora Barrier with `key ingredient + ideal use case` rows — solves the "which moisturizer is for me" question inline.
- **Founder's Note from Tiffany** appears near the bottom, signed, explaining the product's origin via a fitness analogy ("I wanted a different kind of moisturizer that would do the same for my skin"). One paragraph, no portrait photo, no "About the founder" header — just signature voice.
- FAQ block addresses peptide function, vitamin C compatibility, retinol pairing, peptide sourcing — the four objections an educated buyer would raise.

### Cart
- Free shipping threshold messaging dominates: "Free shipping (and free good mood!) with orders $40+." Threshold is real and surfaced in the cart drawer.
- Refill SKU surfaces as a default upsell once a Standard size is in the bag.

### Checkout
- Couldn't reach checkout without an order. Afterpay surfaced on PDP suggests checkout exposes BNPL alongside card.

### Trust / social proof
- Star ratings appear on PDP cards but the volume isn't loud — the brand voice does more lifting than reviews.
- Clinical study footnotes are short and specific (sample size, duration).
- The Suspicious 6™ is the brand-level trust spine and gets repeated on Philosophy and FAQ.
- `#barewithus` hashtag at the footer Instagram grid reinforces the "healthy skin = less makeup" thesis.

### Brand story / philosophy
- The Philosophy page lists the Suspicious 6™ with one sentence per excluded category (essential oils, drying alcohols, silicones, chemical sunscreens, fragrances/dyes, SLS). Each entry explains the *why* mechanically — never just "bad."
- "Listen to Your Skin" and "Drunk Break™" are named concepts that recur across content — they become memorable hooks even though they're conceptually simple.

### Mobile-specific
- Didn't crawl mobile build directly. The PDP structure (single hero image → buy box → clinical % → ingredients → FAQ → cross-sell → founder note) collapses to a clean vertical scroll on mobile based on the structure.

## What's worth stealing for Clarté MD

- **A named, repeatable "what's out" list.** The Suspicious 6™ is doing enormous work — it's a fixed object that recurs on every PDP and explainer page. Clarté should commit to a parallel: a "What's Out" list (e.g., no alcohol denat, no formaldehyde releasers, no synthetic fragrance — whatever the actual formulation reality is) and render it identically on every PDP and protocol page. This is honest, defensible, and gives the design system a recurring block to design around.
- **Specific clinical % stats with sample size shown.** `96% of 31 people after 8 weeks` is more trustworthy than `96% of users.` When Clarté has even small self-report data, surface the sample size — it reads more credible, not less.
- **One-paragraph signed Founder's Note inside the PDP.** Drunk Elephant lands warmth via a single sub-fold paragraph signed by Tiffany. Clarté's equivalent should be a signed note from "the Clarté medical team" (per anonymization rule) explaining *why this protocol was built* — placed below the trust block on `app/(site)/products/[sku]/page.tsx`.
- **Bundle / kit as a peer SKU, not an afterthought.** The "Smoothie Kit" sits on PDPs with its own `Add All to Bag` button and combined price. Clarté's protocols *are* bundles — make the bundle card a peer of the individual product, with a single combined price and `Add Protocol` CTA on every individual-product PDP.
- **Refill / mini sizes as peer variants in a dropdown.** Four size tiers in one selector. Even though Clarté may only ever ship one size, the dropdown pattern is the cleanest "variant selector" available and worth lifting for sample/full-size if that ever exists.
- **Compare module on PDP.** The `Face-Off` 3-up answers "which one of yours is for me" without leaving the PDP. Clarté can adapt this to "which protocol is right for me" — a 4-up across acne / even-tone / renewal / barrier with one skin-concern qualifier each, embedded on every PDP.

## What to avoid

- **The packaging-as-personality strategy.** Drunk Elephant's loud Memphis-style colour blocking only works because the packaging actually is that colourful in real life. Clarté's brand is navy + cobalt on off-white — lifting the colour-blocked product hero approach would dilute the clinical-with-warmth positioning to "candy aisle." Keep the saturated colour confined to the product itself, not the page chrome.
- **Cute proprietary names for actives.** "Protini," "Lala," "Bora," "Framboos," "B-Hydra." These work for Drunk Elephant because the brand voice is irreverent end-to-end. Clarté's voice is professional/doctor's-office — naming a serum "Cobalti" would read as forced. Stick with descriptive product names.
- **Free-shipping threshold messaging.** "Free shipping with $40+" is a US convention that does not match Clarté's flat Rs. 250 shipping reality (see [[feedback_unverified_claims]]). Do not introduce threshold language anywhere — show the flat Rs. 250 plainly.
- **Founder voice as the headline.** Tiffany's "From Tiffany" works because Drunk Elephant is consumer-facing personality. Clarté's medical-team voice should land as the *signature*, not as the brand voice itself — keep the headline copy clinical and professional.

## Sources

- https://www.drunkelephant.com (homepage)
- https://www.drunkelephant.com/products/protini-polypeptide-cream (PDP)
- https://www.drunkelephant.com/pages/philosophy
