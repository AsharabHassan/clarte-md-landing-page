# Homepage UX — cross-brand teardown

## How to read this

This is a page-specific teardown of how 8 leading skincare brands compose just their homepage — not the brand at large. Where the live site was reachable I observed the rendered page directly via WebFetch; where Cloudflare or geo-walls blocked the fetch (Aesop, La Mer, SkinCeuticals on this pass) I fell back to WebSearch snippets, Work & Co's case study, Fonts In Use, and existing teardowns in `docs/research/2026-05-23-skincare-ui-ux-research/brands/`. Every fallback is flagged inline. The goal is to surface concrete homepage patterns Clarté MD can lift onto its already-migrated `app/(site)/page.tsx` (hero / 4-protocol grid / products strip / brand-story / trust-strip).

## Per-brand observations

### 1. Augustinus Bader

**URL:** https://augustinusbader.com
**Hero:** Full-bleed product image with white centered typography. Headline reads "Award-Winning Skincare." Italic subhead: "Discover multi-award-winning skincare powered by our proprietary TFC8® technology and backed by over 30 years of groundbreaking research." Single dark CTA, "Shop Now" (2 words). No carousel arrows competing with the hero.
**Trust signals above fold:** Sticky promo "Enjoy FREE Delivery on Qualifying Orders." Directly after the hero scrolls in "200+ INDUSTRY AWARDS" with a press-logo wall (Marie Claire Prix d'Excellence, Vogue, Esquire, InStyle, Harper's Bazaar, Allure, Glamour) and the founder credential "Professor Augustinus Bader, MD, PhD" surfaces as inline copy, never a separate "about the doctor" block.
**Section sequence (top to bottom):** 1. Sticky promo + nav · 2. Hero · 3. New product spotlight (Geranium Rose Body Cream) · 4. Trending products carousel (Latest Innovations / Bestsellers / On-the-go) · 5. Founder bio · 6. 200+ awards carousel · 7. Customer testimonials · 8. Clinical/user-trial evidence carousel · 9. TFC8® tabbed technology explainer · 10. Club rewards promo · 11. Auto-replenishment block · 12. Editorial (Bader Journal) · 13. Footer.
**Distinctive element:** Tabbed clinical-evidence carousel beneath each trending product showing single percentages (e.g. "Forehead wrinkles visibly reduced by 37% in only 4 weeks"). One number per claim, "Read more" hides methodology — the percentage is the visual.
**Mobile note:** Hamburger menu, the same stacked module system collapses cleanly to single column. Logo swaps to `logo-mob.svg`. TFC8 tabs collapse to accordion. Cream surfaces (~`#F6F1EB` per existing teardown) carry through.

### 2. Tatcha

**URL:** https://www.tatcha.com
**Hero:** Full-bleed lifestyle photograph with centered text overlay. Headline: "Friends & Family | 20% Off Sitewide Ends Soon." Subhead: "Our best offer of the season ends 5/25. Use code FRIEND26 for 20% off sitewide*." CTA: "Shop Now" (2 words). Important to note: Tatcha currently sacrifices its evergreen hero for a promotional cycle — the brand pillar copy ("Our friends and family deserve the most") sits one section down.
**Trust signals above fold:** None in the hero itself — no press logos, no review counts, no doctor attribution. Tatcha leans entirely on brand recognition and the "Tatcha Institute" framing that appears later. Sticky promo bar at the top duplicates the hero offer.
**Section sequence:** 1. Sticky promo bar · 2. Nav · 3. Hero (Friends & Family) · 4. "For You" personalization module with email capture and a bestseller callout · 5. Bestsellers carousel · 6. New products carousel · 7. Jumbo value-size promo · 8. Shop-by-skin-type 4-column grid · 9. Customer testimonial carousel · 10. Product-education sections (ingredients, collections) · 11. Ritual Finder CTA · 12. Brand story/values · 13. Footer.
**Distinctive element:** Numbered carousel paging ("01 / 03," "Previous / Next") rather than dots — feels editorial, like a magazine spread, not a slideshow. Pairs with serif italic product names ("*The Dewy Skin Cream*") rendered in the carousel cards.
**Mobile note:** Hamburger collapse. Cream surface (~`#F5EFE6` per existing teardown). Carousels become horizontal swipe.

### 3. Aesop

**URL:** https://www.aesop.com (redirects to shop.aesop.com; both returned 403 on every fetch attempt — observations below sourced from Work & Co's case study, Fonts In Use, NN/G's design analysis, and the existing teardown corpus. Flagged as indirect.)
**Hero:** Centered, restrained, near-still. Not a marketing slogan but the next product or editorial moment, set against a muted cream/yellow background with dark-charcoal type. Aesop's hero is the closest thing in the segment to "no hero" — the page opens like the inside of one of their stores. NN/G notes the monochromatic palette uses "muted yellows for the background with slight variations that differentiate among the navigation and title area, the product area, and the hover state."
**Trust signals above fold:** Essentially none in the conventional sense — no badges, no logos, no star ratings, no percentages. Credibility is carried by the typography itself (Optima for the logo, Suisse Int'l for body, Zapf Humanist for editorial) and by the in-nav literary content (The Fabulist, Aesop's online magazine).
**Section sequence (per Work & Co case study):** 1. Top nav with shoppable navigation · 2. Hero / featured product or editorial moment · 3. Product bundles organized by skin type · 4. How-to videos in the voice of an Aesop skincare expert · 5. Curated gift guide (seasonally toggled) by occasion and price · 6. The Fabulist literary magazine entry point · 7. Footer.
**Distinctive element:** "Elegant motion to expose products directly from the navigation" (Work & Co). Hovering a nav item reveals products inline rather than dropping a mega-menu — feels like opening a drawer in the physical store. Aesop has also been cited (Lexington Themes 2026) for "cinematic motion so restrained it almost reads as still."
**Mobile note:** Not crawled. Case study describes a "scalable componentized system" working across pages; the cream-on-cream palette and centered symmetry collapse cleanly to one column.

### 4. Glossier

**URL:** https://www.glossier.com
**Hero:** Full-bleed image carousel with responsive desktop/tablet/mobile variants, centered text overlay. Current headline: "you smell good." (lowercase, period included — typographic personality). Subhead: "Get lost in our soft, warm and familiar fragrance." Two-button CTA: "Glossier You" and "Shop Fragrance" — unusual in the set for using two primaries side by side rather than one CTA plus secondary text link.
**Trust signals above fold:** Customer testimonials slot in immediately after the hero — 5-star reviews quoted as text ("You smell familiar," "you smell really good") in a rotating carousel with `01 / 03` indicator. No press logos, no quantitative stats, no doctor or lab attribution at all — the social-proof signal is "people like me already use this."
**Section sequence:** 1. Sticky promo bar with rotating geolocation-specific messaging · 2. Nav (logo, search, location selector) · 3. Full-bleed hero carousel · 4. Customer testimonial carousel · 5. Fragrance section (7+ products) · 6. Balms section (12 color variants) · 7. "GET THE LOOK" editorial · 8. Footer with alphabetical product index.
**Distinctive element:** Geolocation-aware sticky promo. The top bar rotates between "It's Memorial Day Weekend, celebrate with up to 50% off," shipping qualification thresholds keyed to the visitor's region ($40 US, $60 CAD, €65 EU), and a gift offer ("Cool off with a free gift! Get Lip Glaze on us"). Cards carry dynamic pricing labels like "30% off in cart," "Coming soon," "Notify me" — pricing logic lives inside the card surface.
**Mobile note:** Responsive image stack swaps three different hero crops by breakpoint, not one image scaled. Hamburger nav.

### 5. La Mer (Crème de la Mer)

**URL:** https://www.cremedelamer.com (returned 403; observations below from WebSearch result snippets, Elemis-of-luxury teardowns, and the cremedelamer.ca styleguide. Flagged as indirect.)
**Hero:** Per snippets and the page's own meta-title ("La Mer™ Official Site | Free Travel Gift with Order*"), the current homepage is led by a campaign — "Get away with La Mer" — built around a free travel gift with order. The structural pattern across La Mer captures cited elsewhere is a full-bleed photographic hero (typically water / Miracle Broth abstract / hand-applied texture) with serif headline and a small, restrained dark CTA. Typography uses "La Mer Headline Black" for display and "Neue Haas Unica Pro" for body per their style guide.
**Trust signals above fold:** Three benefit microcopy items appear: free standard shipping with 2 samples on every order, carbon-offset shipping emissions, and complimentary gift wrap. No press logos in the hero, no clinical percentages. Heritage / Max Huber attribution lives on a dedicated `/brand-story` page rather than on the homepage.
**Section sequence (inferred from sitemap and snippets):** 1. Promo banner · 2. Nav · 3. Hero (current: "Get away" campaign) · 4. Bestsellers entry point · 5. Miracle Broth™ ingredient story · 6. Genaissance de la Mer collection · 7. "Our Craft" / heritage block · 8. Skincare services / spa / in-store · 9. Footer.
**Distinctive element:** The Miracle Broth™ ingredient is treated as a proper noun protagonist with its own URL (`/miracle-broth`) and its own homepage section — the ingredient is more brand-recognizable than any single SKU. La Mer also runs a separate "Night With La Mer" editorial moment that swaps the homepage's tone after dark / for evening routines.
**Mobile note:** Not directly observed. La Mer's published style guide implies condensed La Mer Headline Black scales down to a still-condensed weight on mobile — the typographic signature carries through.

### 6. SkinCeuticals

**URL:** https://www.skinceuticals.com (returned 403; observations from prior teardown `brands/01-skinceuticals.md`, Lovely Skin blog citations, and Moodie Davitt Report writeups. Flagged as indirect.)
**Hero:** Wide-bleed product/lifestyle hero with overlay copy. The headline is typically a single quantified product claim ("36% reduction in wrinkles," "Visibly reverses up to 10 years of aging signs," or — for the CE Ferulic anchor — "clinically proven to reduce combined oxidative damage by up to 41%"). Subhead names the study design (sample size, weeks). CTA is small, dark, secondary-button styled — credibility builds from copy density, not button size.
**Trust signals above fold:** "#1 Medical Skincare Brand" wordmark beside the logo. Concern-led nav exposes "Find a Professional" as a peer-level link to "Shop" — the locator is itself the trust signal. Press / award badges are absent on the homepage; clinical study citations replace them.
**Section sequence:** 1. Light promo bar (when running) · 2. Nav with Skincare / Skin Concerns / Find a Professional / Skincare Advice / Custom D.O.S.E. · 3. Hero with quantified claim · 4. Concern-led product entry points (Fine Lines / Discoloration / Adult Acne / Uneven Texture / Laxity / Redness) · 5. CE Ferulic / hero SKU spotlight · 6. Find-a-Professional / clinic locator block · 7. Skincare Advice editorial entry · 8. Footer.
**Distinctive element:** The professional locator sitting in the top nav — converts geography into trust. The whole homepage architecture is "navigate by concern, then resolve by professional." Carousels auto-advance slowly; product cards lift on hover. No before/after photo pairs on the storefront, only percentages.
**Mobile note:** Standard hamburger drawer, sticky cart icon top-right per third-party reviews. No observed sticky Add-to-Bag on the homepage.

### 7. Drunk Elephant

**URL:** https://www.drunkelephant.com
**Hero:** Full-bleed carousel with centered text overlay; three rotating slides at ~1380x1380. Current headline: "The whole shebang! The whole shebang! The whole shebang!" (literally repeated three times in stacked lines — emphasis through rhythm, not scale). Subhead: "Everything on the site is 25% off! As if that weren't sweet enough, we're gifting a Hydra and the Bright kit with orders $100+ plus a free full-size F-Balm mask with orders $175+." CTA: "SHOP NOW" (2 words).
**Trust signals above fold:** Casual, confident language — no badges, no doctor, no clinical percentages in the hero. The implicit trust signal is the loud, opinionated brand voice itself ("Holy 25% off sitewide!"). No press logos.
**Section sequence:** 1. Sticky promo bar ("Holy 25% off sitewide!") · 2. Header nav · 3. Hero carousel (3 slides) · 4. Bestsellers grid (6 products with tiered pricing) · 5. "The Drunk Difference" philosophy text block · 6. Secondary hero — featured-product showcase · 7. Instagram feed (27 thumbnails) · 8. Newsletter signup · 9. Footer.
**Distinctive element:** The literal text repetition in the hero headline. It's a copy device, not a design device, but it carries the entire visual personality. Note: white surfaces dominate — the colorful Memphis-style packaging is the only saturated color on screen, so the brand "loudness" lives in product photography and copy, never in chrome.
**Mobile note:** Responsive image sets; navigation collapses to hamburger. Carousel becomes horizontal swipe. No sticky bottom CTA observed.

### 8. Charlotte Tilbury

**URL:** https://www.charlottetilbury.com/uk (`.com` root geo-redirects non-shipping locations to a "Sorry darling…" notice — observations sourced from the UK regional homepage)
**Hero:** Full-width banner image with centered overlay text. Current headline: "20% Off Everything!*" rendered in large display type, with the asterisk implying T&Cs. Single shop CTA linking to `/uk/products/shop-all`. Lifestyle product image carries pink/peach brand tones.
**Trust signals above fold:** Loyalty program link prominent in nav. Sticky promo bar above the hero compounds the offer: "Loyalty-Exclusive Gift! Unlock A Free Collagen Lip Bath in Pillow Talk Fair When You Spend £85." No celebrity testimonials or press logos in the immediate viewport — Charlotte's celebrity-makeup-artist credibility is implicit in the brand name, not surfaced in the hero.
**Section sequence:** 1. Sticky promo bar (20% off, fixed at very top) · 2. Nav + search · 3. Hero banner with CTA · 4. "Shop By Category" 4-box grid (Makeup, Skincare, Foundation, New In) · 5. Best Sellers carousel (Airbrush Setting Spray, Magic Cream, Mini Pillow Talk Kit, etc.) · 6. Expandable category menus with detailed product listings · 7. Footer.
**Distinctive element:** Wishlist heart icons on every product tile that toggle between outlined and filled SVG states. Persists across nav and is paired with the loyalty program as the brand's retention layer baked into the homepage.
**Mobile note:** Responsive; navigation collapses to hamburger. Sticky promo bar persists. Hero crop swaps for mobile.

## Cross-cutting patterns (appearing in 3+ brands)

1. **Sticky promo bar above the nav.** Augustinus Bader (free delivery), Tatcha (FRIEND26 20% off), Glossier (rotating, geolocated), Drunk Elephant (25% off + gift thresholds), Charlotte Tilbury (20% off + loyalty gift) — five of eight. The pattern works because it answers "is there an offer right now?" without sacrificing hero real estate. Glossier is the only one rotating multiple lines; everyone else holds a single message.

2. **Hero is one image + one short headline + one CTA (no carousel arrows).** Augustinus Bader, Tatcha, Aesop, La Mer, SkinCeuticals all run a still hero or a slow-auto-advancing one without prominent arrows or dots. Drunk Elephant and Glossier carousel, but slowly. Charlotte Tilbury runs still. The takeaway: the hero earns its calm because the next scroll is where credibility builds. None of the eight uses a busy hero.

3. **Section 2 is the "trust receipt."** Once past the hero, three brands surface an explicit trust block before any product grid: Augustinus Bader's 200+ awards + press wall, Glossier's customer testimonial carousel, SkinCeuticals' concern-led nav doubling as a "find your problem" entry. Tatcha and Drunk Elephant defer this — they go straight to bestsellers — which makes their PDP and below-fold work harder.

4. **Carousels paged with numbers, not dots.** Tatcha ("01 / 03," "Previous / Next"), Glossier ("01 / 03"), Augustinus Bader (numbered position labels). The numbered pager reads as editorial — like a magazine spread — and signals "this is curated content, not a slideshow ad." Dots feel like banner ads; numbers feel like content.

5. **Ingredient or technology gets its own homepage section, treated as a character.** Augustinus Bader's TFC8® tabbed explainer, Tatcha's Hadasei-3™ / Tatcha Institute block, La Mer's Miracle Broth™ section, SkinCeuticals' implicit "concern → ingredient → study" architecture. A proprietary acronym with a ™ and its own scroll-stop is the most consistent move in the segment. Even Drunk Elephant — the brand with the loudest packaging — gives "The Drunk Difference" its own text block.

6. **Editorial / magazine entry on the homepage, not just in the footer.** Augustinus Bader's "Bader Journal," Aesop's "The Fabulist" exposed in nav, SkinCeuticals' "Skincare Advice" peer-level link, Tatcha's brand-story section, Glossier's "GET THE LOOK" editorial. The pattern says: this brand has something to teach you, not just to sell.

7. **Bestsellers as the first product surface, never new arrivals.** Tatcha, Drunk Elephant, Charlotte Tilbury, Glossier all open product browsing with a bestsellers carousel or grid. New arrivals come later. Bestsellers act as social proof by selection — "these are the ones other people picked" — without needing a star rating in view.

8. **Top-of-page promo is keyed to a gift threshold, not just a percent.** Augustinus Bader (free delivery on qualifying orders), Charlotte Tilbury (free Collagen Lip Bath at £85), Drunk Elephant (free Hydra+Bright kit at $100, free F-Balm at $175), Glossier (free Lip Glaze gift). The "spend $X get Y free" frame outperforms a flat percent because it sets a basket-size target.

## What's worth stealing for Clarté MD homepage

- **Section 2: trust receipt with one quantified claim, not a badge wall.** Apply on the existing hero-to-protocol-grid handoff. After the gradient sky→white hero, before the 4-protocol cards, insert a thin band with one Fraunces italic stat ("*Up to {N}% of patients report visible improvement at week 8*") and one JetBrains Mono sample-size eyebrow ("`12-WEEK CLINIC PANEL · n={N}`"). Only ship numbers Clarté actually has data for — per `feedback_unverified_claims`, never invent. The pattern is Augustinus Bader + SkinCeuticals; the typography is Clarté's own.

- **Treat one Clarté concept as the ™ protagonist on the homepage.** Apply on the brand-story preview section (the dark navy block). Augustinus Bader has TFC8®, Tatcha has Hadasei-3™, La Mer has Miracle Broth™. Clarté has "the protocol" itself — name it. A single phrase like "*The Clarté Protocol*" rendered in Fraunces italic with a one-paragraph explainer makes the brand-story preview do credibility work, not just narrative work. Pairs naturally with the clinical-with-warmth direction because it borrows the luxury cadence without claiming luxury price.

- **Numbered pager, not dots, on the individual-products strip.** Apply on the existing products strip section. Replace any dots/arrows with `01 / 08` (or however many SKUs) and a "Previous / Next" pair in Plus Jakarta. Editorial cadence, no cost to build, immediately reads as more considered. Tatcha and Glossier prove it; Charlotte Tilbury proves dots feel like ads.

- **Sticky promo bar above the nav — but anchored to a real Clarté policy, not a fake percent.** Apply at the top of every page (via Header). Use it for the *flat Rs. 250 shipping* note + *cash on delivery* line, not a discount. Single line, no rotation, cobalt-on-navy or off-white-on-navy. Five of eight brands run a sticky promo; none of those messages would fit Clarté, but the *slot* is the highest-ROI piece of homepage real estate and Clarté is currently leaving it empty. (Hard guard: per `feedback_unverified_claims` and `feedback_cod_policy`, do not phrase as a discount and do not promise open-the-parcel-before-paying.)

- **Bestsellers-by-protocol as the products strip, not "all 8 products."** Apply on the individual-products strip. Right now the strip is a flat list. Reframe the strip as "Most-prescribed in each protocol" — one hero product per protocol, four cards, mirroring the 4-protocol grid above. Tatcha-style bestsellers carry social proof without a star rating; the protocol framing keeps Clarté's IA consistent above and below the fold.

- **Editorial entry point on the homepage, not just a footer link.** Apply between brand-story preview and trust-strip. SkinCeuticals' Skincare Advice and Aesop's The Fabulist both surface in the nav; Augustinus Bader's Journal surfaces in section 12 of the homepage. Clarté should expose 2-3 "Skincare Advice" article cards (climate-specific acne, retinoid ramp-up, sunscreen for South Asian skin tones — all authored by "our GMC-registered doctor," never by name) as a homepage section. This is the brand's E-E-A-T engine and the cheapest place to surface it.

## What to avoid

- **Hero as a loud promotional banner with a percent.** Tatcha, Drunk Elephant, and Charlotte Tilbury all currently turn their hero into a 20-25% discount screamer. This is a margin-and-luxury tradeoff those brands choose deliberately. For Clarté — a Pakistan-first dermatologist-led brand with no discount mechanic in the funnel and COD-only — leading with a percent would undercut the clinical voice and contradict the "no scarcity" posture. Keep the hero clinical, lead with the protocol promise.

- **Two side-by-side primary CTAs in the hero (Glossier pattern).** "Glossier You" + "Shop Fragrance" works for a brand whose mental model is "two products you both want." Clarté has four protocols; offering two CTAs in the hero would force the user to choose before being educated. Stick with one primary "Find your protocol" CTA in the hero and let the 4-protocol grid below resolve the choice.

- **Named founder/doctor on the hero or in the brand-story preview.** Augustinus Bader can put "Professor Augustinus Bader, MD, PhD" inline because he's a publicly-cited researcher. Tatcha can lean on a founder story because Vicky Tsai is the brand. Clarté's prescribing doctor is anonymized per `feedback_anonymize_doctor`. Borrow the SkinCeuticals model — science attribution without person attribution.

- **Press / awards / certification wall as section 2.** Augustinus Bader's "200+ industry awards" works because they have 200 industry awards. Per `feedback_unverified_claims`, Clarté must not stack ISO 22716, GMP, "2× refund if fake," or any badge it can't back with a document. If the receipt section runs without real awards, do it with a quantified clinical claim and sample size instead — that's defensible.

## Sources

- https://augustinusbader.com (live fetch)
- https://www.tatcha.com (live fetch)
- https://www.glossier.com (live fetch)
- https://www.drunkelephant.com (live fetch)
- https://www.charlottetilbury.com/uk (live fetch; `.com` root geo-redirects)
- https://www.aesop.com (403; indirect via Work & Co case study + Fonts In Use + NN/G)
- https://www.cremedelamer.com (403; indirect via WebSearch snippets + cremedelamer.ca styleguide)
- https://www.skinceuticals.com (403; indirect via existing teardown + Moodie Davitt + Lovely Skin)
- https://work.co/clients/aesop/
- https://www.nngroup.com/articles/why-does-a-design-look-good-part2/
- https://fontsinuse.com/uses/20234/aesop-logo-website-and-packaging
- https://www.siteinspire.com/websites/7284-aesop
- https://lexingtonthemes.com/blog/stunning-hero-sections-2026
- C:\Users\786\Downloads\Dr Ahmad clartemd\Dr Ahmad clartemd\docs\research\2026-05-23-skincare-ui-ux-research\brands\01-skinceuticals.md
- C:\Users\786\Downloads\Dr Ahmad clartemd\Dr Ahmad clartemd\docs\research\2026-05-23-skincare-ui-ux-research\brands\09-augustinus-bader.md
- C:\Users\786\Downloads\Dr Ahmad clartemd\Dr Ahmad clartemd\docs\research\2026-05-23-skincare-ui-ux-research\brands\10-drunk-elephant.md
- C:\Users\786\Downloads\Dr Ahmad clartemd\Dr Ahmad clartemd\docs\research\2026-05-23-skincare-ui-ux-research\brands\11-tatcha.md
