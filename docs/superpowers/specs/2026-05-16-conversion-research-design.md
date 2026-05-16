# Conversion Research for Clarté MD Skincare Landing Pages — Design Spec

- **Date:** 2026-05-16
- **Status:** Approved (pending user review of this written spec)
- **Owner:** Faisal Chaudhry
- **Scope:** Sub-project #1 of the Clarté MD webstore initiative
- **Next sub-projects (out of scope here):** Backend + DB, GHL automation, real AI features, 3 additional protocol landing pages, storefront shell

---

## 1. Problem statement

Clarté MD is a dermatologist-led skincare brand (Dr. Tauqir Ahmad, GMC-registered, Lahore) selling clinical-grade protocols. The current asset is a single high-craft landing page at `acne-protocol.html` (2,819 lines, editorial design, AI before/after generator, PKR pricing, COD + JazzCash/Easypaisa, GTM wired).

We need to send Google Search Ads traffic to this and the three sibling protocol pages (pigmentation, anti-ageing, barrier). The current page was designed for craft, not for paid search conversion. Before we clone it 3× we need to know:

1. What patterns separate the highest-converting skincare landing pages from average ones — specifically for **Google Search Ads** traffic in **Pakistan**.
2. Where `acne-protocol.html` is strong, where it has gaps, and which gaps cost the most orders.
3. A reusable scorecard so the same audit applies to the next three protocol pages.

## 2. Goals

- Produce a defensible, citation-backed research report on high-converting skincare landing pages.
- Audit `acne-protocol.html` against the patterns surfaced in the report.
- Apply the highest-impact, lowest-risk changes directly to `acne-protocol.html` without breaking its visual design system.
- Leave the audit framework + change log reusable for the three follow-on protocol pages.

## 3. Non-goals

- No A/B testing (needs traffic + testing tool not yet set up).
- No changes to the AI generator section, prescription bundle layout, or checkout API.
- No changes to typography, color palette, section *order*, or footer structure.
- No production of Google Ads campaign structure or bidding strategy — only the landing-page-side ad-headline parity guide.
- No real patient photos or review content. Reviews/B-A section ships scaffolded with clearly-marked placeholder copy that MUST be swapped before public launch.

## 4. Audience & market focus

**Primary buyer:** Pakistan-first (Lahore, Karachi, Islamabad), Urdu/English bilingual, 18–35, mobile-dominant, COD-trusting, WhatsApp-led purchase decisions, deeply skeptical of counterfeit skincare.

Research lens biases toward:
- PKR pricing and COD trust signals.
- WhatsApp-based pre-purchase consultation.
- South Asian skin concerns (post-inflammatory hyperpigmentation, melasma, oily-acne combination).
- Pakistani DTC skincare brand benchmarks (Conatural, Saeed Ghani) and Indian DTC analogs (Foxtale, Minimalist, The Derma Co.).
- Dermatologist authority as the dominant trust vector.

## 5. Approach — sequential research-first

Three phases, executed in order. Each phase produces an artifact that the next phase consumes.

**Phase 1 — Research (single pass).** WebFetch 8–12 live competitor landing pages, extract patterns, cross-reference with documented Google Ads / health-and-beauty CRO benchmarks (Unbounce, WordStream, ThinkWithGoogle). Write the report.

**Phase 2 — Audit.** Score `acne-protocol.html` section-by-section against the 12 patterns from Phase 1. Output a prioritized fix list with severity tiers.

**Phase 3 — Apply.** Implement the top surgical changes in `acne-protocol.html`. Each change cites a pattern + a competitor + a benchmark.

Alternatives considered:
- **Iterative fix-as-I-find** — rejected; produces inconsistent recommendations and rework.
- **Parallel subagent research + audit** — rejected; subagent reads excerpts, which conflicts with the "deep dive" requirement.

## 6. Deliverables

### 6.1 Files created or modified

```
D:/May Project/Dr Ahmad clartemd/
├── acne-protocol.html                                                 (modified — surgical edits)
├── docs/
│   ├── research/
│   │   ├── 2026-05-16-skincare-landing-page-conversion-research.md    (the main report)
│   │   ├── ad-copy-parity-guide.md                                    (Google Ads headline ↔ landing hero matrix)
│   │   └── competitor-screenshots/                                    (reference screenshots if WebFetch returns them)
│   └── superpowers/specs/
│       └── 2026-05-16-conversion-research-design.md                   (this spec)
```

### 6.2 Research report structure

1. Executive summary — top 10 patterns ranked by evidence strength (~1 page).
2. Google Search Ads context for skincare — search-intent traffic, ~5-second patience window.
3. Pakistan-specific buyer psychology — fake-product anxiety, COD-as-trust, WhatsApp-led decisions, dermatologist authority, Urdu/English code-switching.
4. Competitor teardowns (8–12 brands, ~1 page each).
5. The 12 universal patterns that move skincare landing-page CVR.
6. Channel-specific learnings — Google Search Ads (Quality Score, headline ↔ ad-headline parity, expected CTR/CVR benchmarks for PK acne keyword clusters, Lighthouse thresholds).
7. Audit scorecard for `acne-protocol.html`.
8. Applied changes log with file:line references.

### 6.3 Competitor set (8–12 brands)

| Tier | Brands | Why included |
|---|---|---|
| Global Rx-style DTC | Curology, Dermatica, Apostrophe, Geologie, Hers | Highest-craft conversion thinking for Rx-style skincare |
| India DTC | Foxtale, Minimalist (Be Minimalist), The Derma Co. | Closest cultural analog to PK market |
| Pakistan DTC | Conatural, Saeed Ghani, + 1–2 local Rx-acne brands found via WebFetch | Direct competition |
| Pharma legacy (anti-example) | Cetaphil PK, Eucerin PK | Document what NOT to do |

### 6.4 The 12 universal patterns (working list — may shift after research)

1. Message-match with the Google ad headline
2. Single-purpose hero (one CTA, no nav distractions)
3. Above-fold problem statement
4. Dermatologist / medical authority signal
5. Real before/after evidence (not stock)
6. Reviews with photos and specific outcomes
7. Ingredient transparency with percentages
8. Money-back / fake-product guarantee positioning
9. COD-as-trust framing
10. Mobile form friction reduction
11. Sticky mobile CTA
12. Urgency mechanic (dispatch window, batch language)

## 7. Audit framework

12 rows (one per pattern) × 4 columns: pattern · present? · strength (0–3) · verdict.

Severity tags applied to each gap:
- 🔴 **Must-fix** — directly costs orders.
- 🟡 **Should-fix** — measurable lift, not catastrophic.
- 🟢 **Nice-to-have** — small polish.

The audit happens in Phase 2 against the real page; the scorecard in this spec is a format calibration only, not the actual scoring.

## 8. Applied changes plan

In-scope categories (sized but not all guaranteed to ship — final list emerges from Phase 2 audit):

1. Hero sub-headline naming the pain.
2. Add "acne" to H1 for message-match with Google ads.
3. New patient reviews section (scaffolded with clearly-marked placeholder content).
4. Real B/A patient grid in timeline section (scaffolded with `[REAL PHOTO]` placeholders).
5. Sticky mobile CTA bar.
6. Hero trust strip: "Dermatologist-formulated · COD nationwide · 2× refund if fake".
7. COD trust framing copy.
8. Checkout form friction reduction (postal + notes become optional).
9. "Next dispatch" urgency line (dynamic via JS).
10. Mid-page WhatsApp quick-buy link.
11. FAQ — 3 added purchase-objection questions.
12. Ad-copy parity guide (sibling doc, not a page change).
13. Ingredient % overlay on bottle imagery.
14. Specific-outcome testimonials (in #3 above).
15. Lighthouse perf pass — defer GTM, lazy-load below-fold imagery, ensure CLS = 0.

**Out of scope:** typography, palette, AI generator section, prescription bundle layout, section order, footer.

**Placeholder content policy:** Items #3 and #4 ship with realistic Pakistan-context placeholder copy and `[REAL PHOTO]` boxes. A loud HTML comment at the top of each placeholder section warns the maintainer that the content is fabricated and MUST be swapped before public launch.

## 9. Verification

After each batch of applied changes:
1. Open `acne-protocol.html` in Playwright (desktop + mobile viewports).
2. Screenshot before/after each batch and compare visual continuity.
3. Confirm no console errors.
4. Confirm GTM tag fires on page load.
5. Confirm the order form `submit` handler still constructs the same POST payload shape.
6. Confirm the AI generator section is byte-identical to the original.

## 10. Success criteria

1. Research doc cites real competitor URLs and at least one external benchmark source per major claim. No unsourced assertions.
2. Audit scorecard rates all 12 patterns and tags each gap with a severity tier.
3. Applied changes preserve visual continuity (desktop + mobile screenshots match the original aesthetic).
4. Every applied change cites the pattern + report section that motivated it.
5. Page still loads without console errors; GTM fires; order POST shape unchanged; AI generator untouched.
6. Audit framework and pattern library are reusable for the pigmentation, anti-ageing, and barrier protocols.

## 11. Estimated effort

- Research + report writing: 2–3 hours
- Audit pass: ~30 minutes
- Applied changes batch: 1.5–2 hours
- Verification: ~20 minutes
- **Total:** ~4–6 hours of focused agent work

## 12. Open questions

None blocking. Items to revisit in follow-on sub-projects:

- Real patient photo/review collection workflow (blocks promoting placeholder section to production).
- A/B testing infrastructure decision (Google Optimize sunset; alternatives: VWO, Convert, GrowthBook self-hosted).
- Whether the parity guide also drives ad campaign structure or stays landing-page-side only.

## 13. Repository status note

This directory is not currently a git repository. The brainstorming skill normally requires committing the spec to git. Since there is no repo, the spec is saved to disk only. Initializing a git repo for the project is recommended before the implementation phase but is not blocking.
