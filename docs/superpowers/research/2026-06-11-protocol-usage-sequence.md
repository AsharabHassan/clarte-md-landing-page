# Protocol Usage & Sequence — Research Draft (FOR MEDICAL REVIEW)

Date: 2026-06-11
Status: **DRAFT — awaiting Dr. Ahmad's review before publishing.** No clinical
content from this doc is live on the site yet.

Purpose: define the clinically-correct AM/PM application sequence, frequency, and
cautions for the products in each protocol, so the `Usage & Sequence` section can
render an accurate routine. This is the data that will populate `SKU_USAGE` and
`CONCERN_USAGE_NOTE` in `lib/protocols/usage-sequence.ts` (plan Task 6) — only
after sign-off.

---

## Method

1. Layering principles taken from established dermatology guidance (sources at the
   bottom): cleanse → treat (thinnest/most-active first) → hydrate → **sunscreen
   always last in the morning**; **vitamin C in the morning** (antioxidant /
   photoprotective synergy); **retinol at night only**, ramp up slowly, sunscreen
   the next day; **do not layer vitamin C and retinol in the same routine.**
2. Cross-checked against the existing per-product copy already shipped on the PDP
   (`lib/products/content.ts` → `directions` / `important`) so the protocol-level
   routine never contradicts the single-product instructions. (E.g. `reti`
   directions already say "evening routine only"; `spf` says "final step of your
   morning routine"; `vitc` says "morning use… always apply SPF after".)

---

## Proposed per-SKU usage metadata (`SKU_USAGE`)

`order` = layer rank within a routine (low applied first; SPF highest so it lands
last in the morning).

| sku | Product | Actives | when | order | frequency | caution |
|---|---|---|---|---|---|---|
| `prep` | Radiance Prep Cleanser | PHA | `AM+PM` | 0 | Morning and evening | — |
| `rescue` | Clarifying Rescue Face Wash | Salicylic acid + zinc | `AM+PM` | 0 | Morning and evening | — |
| `vitc` | Vitamin CE Ferulic Serum | Vitamin C + E + ferulic | `AM` | 10 | Every morning | Always follow with SPF; don't layer with retinol in the same routine |
| `acne` | Clarifying Acne Serum | Niacinamide + azelaic acid | `AM+PM` | 20 | Up to twice daily — start once daily | Reduce to once daily if dryness; mild purging in weeks 2–4 is normal |
| `ha` | Hyaluronic Acid Serum | Hyaluronic acid | `AM+PM` | 30 | Morning and evening | Apply to slightly damp skin |
| `reti` | Retinol Serum | Retinol | `PM` | 20 | 3×/week, ramp to nightly | Evening only; SPF the next morning; not with Vitamin C/AHA same routine; avoid in pregnancy |
| `light` | Radiance Lightening Cream | Tranexamic acid + kojic acid | `AM+PM` | 40 | Morning and evening | Introduce gradually; daily SPF essential |
| `spf` | Barrier Restore SPF 50+ | SPF 50+ PA++++ + Centella | `AM` | 90 | Every morning | Reapply every 2 hours outdoors |

### ⚠ Decision points needing your confirmation

1. **`acne` (niacinamide + azelaic): AM+PM or PM-only?** Azelaic acid is generally
   well tolerated twice daily and the evidence base uses BID dosing, so I've
   proposed **AM+PM, starting once daily**. If you prefer it as an evening-only
   treatment, switch `when` to `PM`.
2. **`light` (tranexamic + kojic): AM+PM or PM-only?** Tranexamic acid is fine
   morning and night; kojic acid can be sensitising and oxidises in light, so some
   clinicians keep it **PM-only**. I've proposed **AM+PM with daily SPF**; switch to
   `PM` if you'd rather keep it nighttime.
3. **Retinol ramp:** proposed "3×/week, ramp to nightly" — confirm the starting
   cadence you want patients to see.

---

## Resulting routine per active protocol

(These are what `composeRoutine()` produces from the table above — shown here so you
can sanity-check the real output.)

### Clear Skin Protocol — acne (`rescue, acne, ha, spf`)
- **Morning:** 1 Clarifying Rescue Face Wash → 2 Clarifying Acne Serum → 3 Hyaluronic Acid Serum → 4 Barrier Restore SPF 50+
- **Evening:** 1 Clarifying Rescue Face Wash → 2 Clarifying Acne Serum → 3 Hyaluronic Acid Serum

### Even Tone Protocol — pigmentation (`prep, vitc, light, spf`)
- **Morning:** 1 Radiance Prep Cleanser → 2 Vitamin CE Ferulic Serum → 3 Radiance Lightening Cream → 4 Barrier Restore SPF 50+
- **Evening:** 1 Radiance Prep Cleanser → 2 Radiance Lightening Cream

### Renewal Protocol — anti-ageing (`prep, vitc, reti, ha, spf`)
- **Morning:** 1 Radiance Prep Cleanser → 2 Vitamin CE Ferulic Serum → 3 Hyaluronic Acid Serum → 4 Barrier Restore SPF 50+
- **Evening:** 1 Radiance Prep Cleanser → 2 Retinol Serum → 3 Hyaluronic Acid Serum

*(Note the textbook split: vitamin C in the AM, retinol in the PM — never together.)*

### Barrier Protocol — hydration (`prep, ha, spf`)
- **Morning:** 1 Radiance Prep Cleanser → 2 Hyaluronic Acid Serum → 3 Barrier Restore SPF 50+
- **Evening:** 1 Radiance Prep Cleanser → 2 Hyaluronic Acid Serum

---

## Proposed protocol-level notes (`CONCERN_USAGE_NOTE`, keyed by `bundle.concern`)

- **acne:** "Begin the treatment serum once daily and build to twice daily as your
  skin adjusts — mild dryness or a short purge in the first 2–4 weeks is normal.
  Finish every morning with SPF; sun exposure deepens post-acne marks."
- **pigmentation:** "Pigment corrects slowly — give the protocol 8–12 weeks of
  consistent use. Daily SPF is non-negotiable; unprotected sun undoes the work.
  Vitamin C is a morning-only step."
- **anti-ageing:** "Retinol is evening-only — start three nights a week and build to
  nightly as tolerated. Never layer retinol with vitamin C in the same routine
  (keep vitamin C to mornings), and always apply SPF the next morning — retinol
  raises sun sensitivity."
- **hydration:** "A barrier-recovery routine — keep actives minimal while the skin
  settles. Apply the hyaluronic serum to slightly damp skin, and seal every morning
  with SPF."

---

## Sources

- American Academy of Dermatology — *Should I apply my skin care products in a certain order?* (cleanse → treat → moisturise → **sunscreen last**): https://www.aad.org/public/everyday-care/skin-care-basics/care/apply-skin-care-certain-order
- American Academy of Dermatology — *Basic skin care*: https://www.aad.org/public/everyday-care/skin-care-basics/care
- American Academy of Dermatology — *Retinoid or retinol?* (nighttime use): https://www.aad.org/public/everyday-care/skin-care-secrets/anti-aging/retinoid-retinol
- Cleveland Clinic — *The Correct Order To Apply Your Skin Care Products*: https://health.clevelandclinic.org/proper-skin-care-product-order
- DermNet NZ — *Topical retinoids* (night use, photosensitivity, daytime sun protection): https://dermnetnz.org/topics/topical-retinoids
- Vitamin C in dermatology (antioxidant, AM use, synergy with vitamin E), PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC3673383/
- Azelaic acid — pharmacology, clinical applications, tolerability (review), PMC: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12472904/
- Topical treatments for mild-to-moderate acne (azelaic acid, niacinamide), systematic review, PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC11081083/
- Internal cross-check: existing per-product directions in `lib/products/content.ts` (PDP copy).

> These are general dermatology references for active sequencing and tolerability,
> not a substitute for Dr. Ahmad's clinical judgment on Clarté MD's specific
> formulations. Please confirm or amend the table above (especially the two ⚠
> decision points) before this is published.
