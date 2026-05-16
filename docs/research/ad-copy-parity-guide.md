# Google Search Ads → Landing Page Headline Parity Guide

> **Companion to:** `2026-05-16-skincare-landing-page-conversion-research.md`
> **Date:** 2026-05-16
> **Scope:** Acne protocol landing page (`acne-protocol.html`). Apply the same template structure to the other 3 protocols when their landing pages are built.
> **Goal:** Each Google ad in the acne campaign cluster has a matching landing-page headline + above-fold trust line. This guide is the mapping.

## How to use this

For every Google Ads "Responsive Search Ad" in the acne campaign:
- Pick 1 headline from Column A (or its derivative)
- Pick 1 description from Column B
- The landing page's hero must visibly contain the exact noun phrase from the ad headline within the first 600px of viewport

If you cannot find a row matching the ad you want to run, ADD a row to this guide and update the landing-page hero before launching the ad. The principle: the ad and the page must rehearse the same words.

## Keyword cluster: "acne treatment"

| Ad headline (Column A) | Landing-page element echoing it | Description (Column B) |
|---|---|---|
| Acne Treatment in Pakistan — Dermatologist-Led | Eyebrow line "Acne · Case Study 001"; hero-sub italicizes "acne" (visible above fold) | Niacinamide 10%, azelaic, BHA 2%. Twelve-week regimen. COD nationwide. |
| Acne Medicine That Actually Works | Hero-sub: "For active acne, post-acne marks, and the cycle that won't break." | Formulated by Dr. Tauqir Ahmad (GMC). 2× refund if fake. WhatsApp: +92 324 9986822 |
| Stop Adult Acne — Lahore Dermatologist | Hero trust strip: "Dermatologist-formulated · COD nationwide · 2× refund if fake" | 12-week protocol, AI before/after preview, free shipping over Rs. 4,000. |
| Acne Treatment That's Dermatologist-Formulated | Hero trust strip badge: "Dermatologist-formulated" | Made in Pakistan in an ISO 22716 facility. Open the box before you pay. |

## Keyword cluster: "acne marks / post-acne marks / dark spots from acne"

| Ad headline | Landing-page element echoing it | Description |
|---|---|---|
| Fade Post-Acne Marks in 12 Weeks | Hero-sub italicizes "marks": "post-acne marks" | Niacinamide + azelaic + tranexamic. Dermatologist-formulated. COD on delivery. |
| Acne Marks Treatment in Pakistan | Hero-sub: "post-acne marks" + rx-strip overlay "Niacinamide 10% · Azelaic 10%" | 12 weeks of consistent use shows visible mark fading. Free shipping over Rs. 4,000. |
| Dark Spots from Acne — Clinical Treatment | **Route to pigmentation protocol page instead** when that page is live. For now, route here only if visitor's query includes "acne" — pure "dark spots" without "acne" is a different protocol. | — |

## Keyword cluster: "acne serum"

| Ad headline | Landing-page element echoing it | Description |
|---|---|---|
| Clinical Acne Serum — Made in Pakistan | Rx-strip tile "Clarifying Acne Serum" with overlay "Niacinamide 10% · Azelaic 10%" (visible in prescription section above fold on tablet+) | ISO-certified, dermatologist-formulated, COD nationwide. |
| Niacinamide 10% Serum for Acne | Rx-strip actives overlay names "Niacinamide 10%" explicitly | Paired in a 4-product protocol for active acne + marks. Free shipping over Rs. 4,000. |

## Keyword cluster: brand defense / Clarté MD direct

| Ad headline | Landing-page element echoing it | Description |
|---|---|---|
| Clarté MD — The Clear Skin Protocol | Hero H1: "The Clear Skin Protocol — Clarté MD" (existing) | Dermatologist-formulated, 12 weeks, COD nationwide, 2× refund if fake. |
| Clarté MD Acne Treatment Official | Eyebrow "Acne · Case Study 001 · The Clear Skin Protocol" | Direct from Dr. Tauqir Ahmad. Made in Pakistan. WhatsApp support. |

## The 3 message-match rules

1. **Exact noun phrase rule.** The ad headline's primary noun phrase must appear in the landing page within the first viewport. If the ad says "acne medicine", the page must say "acne medicine" or a close synonym ("acne treatment", "acne protocol"). The CURRENT hero (post-Task 13) satisfies this for "acne treatment", "acne marks", and "acne serum" — the word "acne" is italicized in the hero-sub and present in the eyebrow.

2. **Trust-claim mirror rule.** Any guarantee or credential mentioned in the ad (e.g., "Dermatologist-formulated", "COD", "Made in Pakistan", "DRAP-approved") must appear in the hero trust strip above the fold. The current trust strip (post-Task 13) carries: "Dermatologist-formulated · COD nationwide · 2× refund if fake". For ads mentioning ISO certification, add an ISO badge to the trust strip or include it in the description text only.

3. **Price/scarcity sync rule.** If the ad references a price ("from Rs. 6,499") or a guarantee ("2× refund if fake"), the landing page hero or trust strip must surface it within the first viewport. The current page surfaces "Rs. 6,499" in the rx-section (not hero) and the sticky mobile CTA (post-Task 14). Desktop visitors should see the price within ~600px scroll; if not, either move the price into the hero trust strip or constrain price-mentioning ads to mobile-only targeting.

## Pre-flight checklist before launching an acne campaign

Before pushing an ad live, verify on `acne-protocol.html`:

- [ ] The exact noun phrase from each ad headline appears in the hero or hero-sub above the fold
- [ ] Any guarantee/credential mentioned in any ad description appears in the hero trust strip
- [ ] If price is in an ad, price is visible in the first viewport on the device(s) the ad targets
- [ ] The Quality Score landing-page experience metric is ≥ "Above average" in Google Ads UI
- [ ] Lighthouse mobile score on the landing page is ≥ 80 (perf), ≥ 95 (accessibility), ≥ 90 (best practices)

## What this guide does NOT cover

- Bid strategy, budget allocation, day-parting, geo-targeting
- Negative keyword lists (build separately based on Search Terms report)
- Ad creative (image extensions, sitelinks, callouts)
- Audience targeting layers
- Conversion tracking setup (separate sub-project — needs GTM custom events wired to checkout success)

## Maintenance

When the landing page changes (new hero copy, new trust badges, removed sections), this guide must be updated in the same commit. The contract is: every ad headline in the live campaign has a row in this guide, and that row references current copy on the landing page. If they drift, Quality Score drops silently.

When new protocol pages launch (pigmentation, anti-ageing, barrier), each gets its own parity guide following this template. The keyword clusters change per protocol — the rules don't.
