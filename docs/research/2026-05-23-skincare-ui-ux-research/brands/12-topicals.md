# Topicals

**URL:** https://mytopicals.com (note: `topicals.com` is a placeholder; the live storefront is `mytopicals.com`)
**Positioning:** Founder Olamide Olowe's Gen-Z, condition-positive skincare brand for chronic skin concerns (hyperpigmentation, eczema, ingrowns). $28-$56 SKUs. Designed *from* the deepest Fitzpatrick skin tones first ("we formulate from 6 to 1"). Community-led, meme-fluent, mental-health-aware.
**Why study them:** Topicals shows how to make condition-driven skincare feel celebratory rather than clinical-cold. They turn flare-ups, hyperpigmentation, and chronic conditions into an identity-positive narrative without losing the science. The relevance for Clarté is *narrow but real*: Clarté also sells condition-driven protocols (acne / even-tone / renewal / barrier), and Topicals offers a model for **how to write the protocol page when the visitor has a condition they're embarrassed about**. The visual loudness, however, is wrong for Clarté.

## Quick take

Topicals' homepage is a deliberate counter-positioning to clinical skincare: hot-pink hero, italic editorial pull-quotes, diverse skin shown with hyperpigmentation visible (not retouched out). The brand voice is the design system — "Why so serious? Let's make flare-ups *fun instead*" is on the homepage in italic emphasis. The translatable lesson for Clarté is **condition-positive language and inclusive imagery**, not the colour palette. Clarté's protocol pages can borrow the *tone of acceptance* without the meme aesthetic.

## Visual / branding

### Color
- Hot pink / magenta dominates as the primary brand colour (Faded packaging, CTAs, hero backgrounds).
- Secondary palette pulls in soft lavender, peachy tones, warm yellow/orange (Like Butter), and light blue (High Roller).
- White and neutral product-shot backgrounds prevent the saturated colour from overwhelming.
- Effect is closer to **editorial zine** than **packaging-aisle chaos** — the colour blocks are large, confident, and serve as full-bleed backgrounds rather than confetti.

### Typography
- Modern sans-serif primary, with **italic emphasis used as voice** — not for product names (like Tatcha) but for *attitudinal phrases*: "*look good*," "*fun instead*," "*beyond the bathroom*."
- Big stacked headlines, often broken across multiple lines for rhythm.
- All-caps for product packaging ("FADED") at oversized scale — packaging itself functions as a display typography object.
- No mono / specimen-label typography.

### Photography & imagery
- **Inclusive skin imagery is the brand's defining visual asset.** Models with visible hyperpigmentation, eczema, acne — not retouched. Diverse Fitzpatrick range, intentionally weighted toward deeper tones.
- Lifestyle staging: products with handbags, sunglasses, casual flat-lay — positions skincare as part of a Gen-Z lifestyle, not a bathroom-cabinet utility.
- Product shots clean and clinical-feeling on white, but the surrounding context (hero, model imagery) is editorial / community.
- Limited-edition restock callouts ("ONLY AT TOPICALS," "LIMITED RESTOCK") drive urgency through scarcity, not discounts.

### Hero composition
- Promotional banner pinned top: "FREE Jumbo Faded on $60+" with a "Shop Now" CTA.
- Hero is a lifestyle still-life (handbag + sunglasses + products on a white surface) rather than a model portrait or single-product cutout.
- Italic editorial taglines layered over imagery: "*You make skin look good*."

### Motion / interaction texture
- Auto-playing video thumbnails with `Unmute` overlays — TikTok-native pattern brought onto the storefront.
- "Get notified when restocked" buttons act as a community participation loop — surface a re-engagement hook even when inventory's out.
- Subscription frequency selector (3 / 4 / 6 weeks) inside the buy box.

## UX patterns worth studying

### Navigation
- Top nav is radical in its simplicity: **Shop / Learn / Watch** + USD toggle + search + sign-in + cart.
- "Watch" is the standout — surfaces video content (likely TikTok-style explainers) at the top level, treating video as a primary content type, not a blog appendix.
- "Learn" carries the educational / condition-explainer content.
- Footer mega-menu carries Help / About / Socials (Instagram, TikTok, YouTube, X). Accessibility link surfaces commitment.

### PDP (Faded Brightening Serum — https://mytopicals.com/products/faded)
- Hot-pink ambient background contextualizes the bottle.
- Above-fold: multi-slide carousel mixing product shots, texture swatches, and customer-results imagery (diverse skin with visible hyperpigmentation improvement).
- Buy box: Size = 30ml/1 fl oz. Price `$28` (standard) / `$25.20` with subscription. Variants: Jumbo, Full, Mini. CTAs: `Add to bag` + subscribe frequency selector (3/4/6 weeks). "Get notified when restocked" surfaces if out of stock.
- Afterpay-style installment: `4 interest-free payments of $7`.
- Rating: `4.9 stars` exposed.
- Clinical claim: `92.31% of users reported an improvement in overall skin appearance` — precise to two decimals, deliberately reads research-y.
- Trust copy: "*Dermatologist-tested and science-backed ingredients suitable for all skin types and shades*" — "*all shades*" baked into the trust statement.
- Featured ingredients: Tranexamic Acid, Niacinamide, Azelaic Acid, Kojic Acid, Melatonin — each with a one-line mechanism. **Tranexamic acid** is treated as the hero active and gets its own callout.
- Brand voice tag: "*Still Faded, no funk*" (referencing the reformulation that removed the sulfur smell). Acknowledges product reality with humour.
- How-to-use: simple instructions (1-2x daily post-cleanse, follow with SPF).
- FAQ block addresses routine compatibility, under-eye use, layering with other actives.
- Related cross-sell: Faded Mini, Starter Kit, Cleansing Bar, High Roller Ingrown Tonic, Slick Salve Lip Balm.

### Trust / social proof
- `1 million units sold` social proof line for hero products (e.g., eye masks).
- "Best Seller" badges on category cards.
- "Science-backed formulas & quality active ingredients" + vegan/cruelty-free chain in the trust strip.
- "Safe for all ethnicities and skin shades" — inclusivity stated as a trust signal, not just a values statement.
- Founder Olamide Olowe story is one click away (About page) — she's named, but the founder portrait does not headline the homepage.

### Brand voice / philosophy
- Mission framing: "*Skincare shouldn't feel like a part-time job, especially when dealing with chronic skin conditions*" — direct, conversational, validating.
- Pricing positioning: "*clinical-grade solutions at accessible prices because healthy skin shouldn't be a luxury*" — explicitly anti-luxury, anti-aspiration.
- Four core principles (on About): `Fewer steps, better results / Science-backed, no fluff / Sustainable where it counts / Dermatology for the people`.
- Inversion of standard formulation practice: "*we formulate from 6 to 1, ensuring that our products are tested and proven to work on the deepest skin tones first.*" Uses the Fitzpatrick scale as visual / structural anchor.

### Mobile-specific
- Not crawled directly; the brand's TikTok-native motion (auto-play video, unmute overlay) implies a mobile-first build.

## What's worth stealing for Clarté MD

- **Condition-positive language on protocol pages.** Topicals doesn't apologize for hyperpigmentation, eczema, or flare-ups — it validates them. Clarté's protocol pages (`app/(protocols)/acne/page.tsx`, `even-tone`, `renewal`, `barrier`) should adopt the validating, non-clinical-cold opening register: "Acne isn't a failure. It's a protocol." rather than scolding the visitor about cleanliness/diet. This is the single highest-leverage borrow from this brand for Clarté.
- **Inclusive imagery showing the actual concern.** Topicals' models have visible hyperpigmentation; the brand earns trust by not pretending the problem is invisible. When Clarté's patient photography lands (per [[project_long_lead_blockers]]), do *not* retouch hyperpigmentation, acne marks, or melasma out of the "before" — Topicals' approach is the right ethical and commercial template.
- **Sample-size precision in claims.** `92.31% of users reported an improvement` reads more research-y than `92%` because the precision implies a real study. Once Clarté has internal data, surface honest precision (e.g., `87.4% of 84 self-reports at week 8`) rather than rounded marketing numbers.
- **"Get notified when restocked" as an engagement hook.** For Clarté, this could translate to "Get notified when your protocol ships" — a way to keep returning visitors warm without an aggressive newsletter ask. Lives in the buy box, not the footer.
- **Hyper-specific FAQ block addressing layering / compatibility.** Topicals' FAQ on Faded answers the actual objections (under-eye safety, layering with other actives) rather than generic shipping FAQ. Clarté's protocol pages should answer the protocol-specific objections: "Can I use this with my current cleanser? Can I use it while pregnant? Will it bleach my pillowcase?" — these are the questions that block COD checkout.
- **"Watch" as a top-level nav item.** When Clarté has video content (doctor explainers, protocol walk-throughs), make it a peer of `Shop` in the header, not a buried subfolder. Treats education as a primary product.

## What to avoid

- **The Gen-Z / meme-fluent voice.** "*Why so serious?*," "*Still Faded, no funk*," "*Take skincare beyond the bathroom*" — this is Topicals' entire surface texture. Clarté's tone is professional doctor's-office. Italic punchlines and slang would break the trust register Clarté needs to charge for a protocol via COD.
- **Hot-pink / magenta dominance.** Topicals' magenta works because the brand is condition-positive Gen-Z. Clarté's navy + cobalt + off-white is intentionally calm and clinical. Importing any saturated pink/magenta hero treatment would actively damage the brand's positioning.
- **Founder named on the homepage / nav.** Topicals names Olamide Olowe. Per [[feedback_anonymize_doctor]] Clarté anonymizes the prescribing doctor — do not name the founder or doctor on customer-facing pages. The "medical team" framing is the constraint.
- **Anti-luxury price positioning copy.** "*Healthy skin shouldn't be a luxury*" is a direct positioning shot at premium competitors. Clarté is mid-tier accessible but should not weaponize price language — it reads cheap and undercuts the dermatologist-led credibility.
- **Limited drops / scarcity callouts.** "ONLY AT TOPICALS," "LIMITED RESTOCK" suit a community-led DTC brand with a small SKU range. Clarté's protocol bundles need steady availability for a COD market — scarcity messaging would erode trust at the moment a buyer is about to commit to a multi-week routine.

## Sources

- https://mytopicals.com (homepage)
- https://mytopicals.com/products/faded (PDP)
- https://mytopicals.com/pages/about
- https://goodbrooke.com/topicals-branding-identity
- https://www.purewow.com/beauty/topicals-faded-serum-review
- https://www.lindsaysilberman.com/topicals-skincare-review-like-butter-faded/
