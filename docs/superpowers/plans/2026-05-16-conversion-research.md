# Conversion Research for Clarté MD Skincare Landing Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a citation-backed conversion research report on high-converting skincare landing pages for Google Search Ads in Pakistan, audit `acne-protocol.html` against it, and apply the highest-impact surgical changes — preserving the existing design system.

**Architecture:** Three sequential phases. Phase 1 (Research): WebFetch 10–12 competitor landing pages, distill 12 universal patterns, write a structured markdown report. Phase 2 (Audit): score the existing page section-by-section against the patterns. Phase 3 (Apply): implement ~10–12 surgical HTML edits to `acne-protocol.html` with Playwright verification after each batch. No A/B testing, no design-system changes, no touching the AI generator or checkout API.

**Tech Stack:** Markdown for docs; HTML/CSS/JS edits to a single 2,819-line static page; WebFetch for competitor research; Playwright MCP for visual + smoke-test verification; PowerShell on Windows.

**Environment notes:**
- Working dir: `D:/May Project/Dr Ahmad clartemd/`
- Not currently a git repo — Task 0 initializes it.
- Windows PowerShell shell. Chain commands with `;` not `&&`.
- File: `acne-protocol.html` is the single source of truth being modified.
- Spec lives at `docs/superpowers/specs/2026-05-16-conversion-research-design.md`.

---

## File Structure

Files created or modified by this plan:

| Path | Created/Modified | Owner task(s) |
|---|---|---|
| `.gitignore` | Created | Task 0 |
| `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` | Created | Task 1 (scaffold), Tasks 2–10 (content), Task 25 (final log) |
| `docs/research/ad-copy-parity-guide.md` | Created | Task 23 |
| `docs/research/competitor-screenshots/.gitkeep` | Created | Task 1 |
| `acne-protocol.html` | Modified | Tasks 13–22 |

Each file has one clear responsibility. The research report holds all narrative + audit content. The parity guide is a single-purpose ad-copy matrix. `acne-protocol.html` is touched only in tightly scoped batches with Playwright verification between each batch.

---

## Phase 1 — Research

### Task 0: Initialize git repository and baseline commit

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Initialize repo and create .gitignore**

Run from project root:

```powershell
git init; git branch -M main
```

Create `.gitignore`:

```
node_modules/
.DS_Store
Thumbs.db
*.log
.env
.env.local
.vscode/
.idea/
dist/
build/
.cache/
docs/research/competitor-screenshots/*.png
!docs/research/competitor-screenshots/.gitkeep
```

- [ ] **Step 2: Verify spec and landing page are present, then commit baseline**

Run:

```powershell
git status; git add .; git commit -m "chore: initialize repo with baseline landing page and design spec"
```

Expected: A single commit containing `acne-protocol.html`, the spec under `docs/superpowers/specs/`, and `.gitignore`.

---

### Task 1: Scaffold research report with all 8 section headings

**Files:**
- Create: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md`
- Create: `docs/research/competitor-screenshots/.gitkeep`

- [ ] **Step 1: Create the report skeleton**

Write the file with this content:

```markdown
# Skincare Landing Page Conversion Research — Google Search Ads, Pakistan

- **Date:** 2026-05-16
- **Author:** Clarté MD team
- **Audience:** Pakistan-first (Lahore/Karachi/Islamabad), Urdu/English bilingual, mobile-dominant
- **Channel focus:** Google Search Ads
- **Companion spec:** `docs/superpowers/specs/2026-05-16-conversion-research-design.md`

---

## 1. Executive Summary
<!-- Filled in Task 10 (last) — top 10 patterns ranked by evidence strength -->

## 2. Google Search Ads Context for Skincare
<!-- Filled in Task 7 — search-intent traffic, 5-second window, Quality Score implications -->

## 3. Pakistan-Specific Buyer Psychology
<!-- Filled in Task 6 — fake-product anxiety, COD-as-trust, WhatsApp-led decisions, derm authority, Urdu/English code-switching -->

## 4. Competitor Teardowns

### 4.1 Global Rx-style DTC
<!-- Filled in Task 2 — Curology, Dermatica, Apostrophe, Geologie, Hers -->

### 4.2 India DTC
<!-- Filled in Task 3 — Foxtale, Minimalist (Be Minimalist), The Derma Co. -->

### 4.3 Pakistan DTC
<!-- Filled in Task 4 — Conatural, Saeed Ghani + 1-2 local Rx-acne -->

### 4.4 Pharma Legacy (Anti-Examples)
<!-- Filled in Task 5 — Cetaphil PK, Eucerin PK -->

## 5. The 12 Universal Patterns That Move Skincare Landing-Page CVR
<!-- Filled in Task 8 -->

## 6. Channel-Specific Learnings — Google Search Ads
<!-- Filled in Task 9 -->

## 7. Audit Scorecard — acne-protocol.html
<!-- Filled in Task 11 -->

## 8. Applied Changes Log
<!-- Filled in Task 25 — file:line references for each edit -->
```

Also create an empty `docs/research/competitor-screenshots/.gitkeep` file.

- [ ] **Step 2: Verify scaffold**

Run:

```powershell
Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" | Select-String "^## " | Measure-Object -Line
```

Expected: 8 lines (the 8 top-level sections).

- [ ] **Step 3: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): scaffold conversion research report"
```

---

### Task 2: Teardown — Global Rx-style DTC (Curology, Dermatica, Apostrophe, Geologie, Hers)

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 4.1)

- [ ] **Step 1: WebFetch each competitor landing page**

Use WebFetch on each URL (one at a time, prompt: "Extract: hero headline, hero subheadline, primary CTA wording, social proof type, urgency mechanic, checkout entry point, trust badges, ingredient transparency, money-back guarantee wording, mobile considerations visible from HTML"):

- `https://curology.com/`
- `https://www.dermatica.com/`
- `https://www.apostrophe.com/`
- `https://geologie.com/`
- `https://www.forhers.com/skin`

If a URL 4xx/5xx errors, log the failure and continue — note "URL not reachable on 2026-05-16" in the teardown.

- [ ] **Step 2: Write each teardown under Section 4.1**

For each brand write ~150–250 words structured as:

```markdown
#### Curology (curology.com)

- **Hero headline:** "<exact wording>"
- **Hero subheadline:** "<exact wording>"
- **Primary CTA:** "<exact wording>"
- **Above-fold structure:** <2-3 sentences>
- **Social proof type:** <reviews / B-A / press logos / clinical numbers>
- **Urgency mechanic:** <if any>
- **Trust signals:** <derm authority, guarantees, etc.>
- **Doing well:** <2-3 specifics>
- **Broken or weak:** <1-2 specifics>
- **Take-away for Clarté MD:** <1-2 sentences, specific>
```

Repeat for the other 4 brands.

- [ ] **Step 3: Verify section is populated**

Run:

```powershell
(Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### Curology" -and (Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### Dermatica" -and (Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### Apostrophe"
```

Expected: `True`

- [ ] **Step 4: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): teardown global Rx DTC competitors"
```

---

### Task 3: Teardown — India DTC (Foxtale, Minimalist, The Derma Co.)

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 4.2)

- [ ] **Step 1: WebFetch each URL with the same extraction prompt as Task 2**

- `https://foxtale.in/`
- `https://beminimalist.co/`
- `https://thedermaco.com/`

Prefer their **acne-specific** product landing pages if linked from the homepage — they're closer in intent to our target. WebFetch the acne PDP URL when discoverable.

- [ ] **Step 2: Write 3 teardowns under Section 4.2** in the same format as Task 2.

- [ ] **Step 3: Verify**

```powershell
(Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### Foxtale" -and (Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### Minimalist" -and (Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### The Derma Co"
```

Expected: `True`

- [ ] **Step 4: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): teardown India DTC competitors"
```

---

### Task 4: Teardown — Pakistan DTC (Conatural, Saeed Ghani + 2 local Rx-acne)

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 4.3)

- [ ] **Step 1: WebFetch baseline PK URLs**

- `https://conatural.pk/`
- `https://saeedghani.pk/`

- [ ] **Step 2: Find 2 local Rx-acne brands via WebSearch**

Run a WebSearch query: `"acne treatment" site:.pk dermatologist serum buy online`

Pick the 2 most relevant results (must be (a) Pakistan-based DTC, (b) selling Rx-style or clinical acne products, (c) reachable). Record the URLs in the teardown.

Common candidates to consider if surfaced: clartemd.com.pk (sibling brand, ok to include as comparison), drbilqis.com, layer'r-style brands, Helix Pharma, ZO Skin Health PK distributors.

- [ ] **Step 3: Write 4 teardowns under Section 4.3** in the same format as Task 2.

- [ ] **Step 4: Verify**

```powershell
(Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "### 4.3 Pakistan DTC[\s\S]{500,}"
```

Expected: `True` (regex confirms section has at least 500 chars of content).

- [ ] **Step 5: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): teardown Pakistan DTC competitors"
```

---

### Task 5: Teardown — Pharma legacy anti-examples (Cetaphil PK, Eucerin PK)

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 4.4)

- [ ] **Step 1: WebFetch**

- `https://www.cetaphil.com.pk/`
- `https://www.eucerin.pk/`

If the .pk version is unreachable, fall back to `.com` and note the substitution.

- [ ] **Step 2: Write 2 teardowns in the format from Task 2, but with an added field:**

```markdown
- **Anti-pattern to avoid:** <1-2 sentences naming the specific weakness Clarté MD must NOT replicate>
```

- [ ] **Step 3: Verify**

```powershell
(Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### Cetaphil" -and (Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw) -match "#### Eucerin"
```

Expected: `True`

- [ ] **Step 4: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): teardown pharma legacy anti-examples"
```

---

### Task 6: Write Section 3 — Pakistan-specific buyer psychology

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 3)

- [ ] **Step 1: Gather supporting data via WebSearch**

Run searches:

- `Pakistan ecommerce COD trust 2024 2025`
- `Pakistan skincare counterfeit fake product anxiety`
- `Pakistan WhatsApp commerce conversion rate`
- `Pakistan mobile commerce statistics 2025`

Note the source URLs you'll cite.

- [ ] **Step 2: Write Section 3 with these subsections, ~600–900 words total:**

```markdown
## 3. Pakistan-Specific Buyer Psychology

### 3.1 Fake-product anxiety is the dominant trust barrier
<!-- 2-3 paragraphs. Cite at least one source. Connect to Clarté MD's existing "2× refund if fake" guarantee. -->

### 3.2 COD is a trust device, not just a payment option
<!-- 2-3 paragraphs. Cite COD adoption data for PK ecommerce. Explain that the buyer mentally pays only when the box arrives, which transfers risk to the seller and unlocks first-purchase trust. -->

### 3.3 WhatsApp leads the pre-purchase consultation
<!-- 1-2 paragraphs. Pakistanis ask questions before they click "Buy" — and they ask on WhatsApp, not contact forms. -->

### 3.4 Dermatologist authority outranks brand authority
<!-- 1-2 paragraphs. A named, credentialed doctor moves Pakistani buyers more than any brand storytelling. -->

### 3.5 Urdu/English code-switching in headlines
<!-- 1-2 paragraphs. Pakistanis read English fluently but emotional triggers often land harder in Urdu loanwords. Examples: "muhasay" (acne), "daag" (marks). Note risk of using too much Urdu — feels less premium. -->
```

Each subsection must have at least one inline citation in the form `([Source name, 2024](url))`.

- [ ] **Step 3: Verify word count and citations**

```powershell
$content = Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw
$section3 = ($content -split "## 3\.")[1] -split "## 4\." | Select-Object -First 1
($section3 -split '\s+').Count
($section3 | Select-String -Pattern "\[.*\]\(http" -AllMatches).Matches.Count
```

Expected: word count between 600 and 1200; citation count ≥ 4.

- [ ] **Step 4: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): write Pakistan buyer psychology section"
```

---

### Task 7: Write Section 2 — Google Search Ads context

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 2)

- [ ] **Step 1: Gather Google Search Ads benchmark data via WebSearch**

Search queries:

- `Google Ads health beauty conversion rate benchmark 2024 site:wordstream.com`
- `Google Ads landing page Quality Score factors 2024 site:support.google.com`
- `Unbounce conversion rate report health beauty 2024`
- `Think with Google mobile page speed conversion 2024`

Capture the cited numbers.

- [ ] **Step 2: Write Section 2, ~500–700 words:**

```markdown
## 2. Google Search Ads Context for Skincare

### 2.1 Search-intent traffic behaves differently from social
<!-- 1-2 paragraphs. Search visitors typed an intent ("acne treatment Pakistan", "best serum for dark spots") — they're mid-funnel, not discovery. Patience window: ~5 seconds. -->

### 2.2 Quality Score gates your CPC
<!-- 1-2 paragraphs. Landing page experience is one of three Quality Score factors. Specific levers: load speed, mobile UX, relevance to ad headline, expected CTR. Cite Google docs. -->

### 2.3 Benchmark conversion rates for health & beauty Google Ads
<!-- Table of CVR/CTR/CPA ranges from WordStream/Unbounce. Add a caveat: PK CPMs and CVRs differ from US benchmarks. -->

### 2.4 The 5-second above-the-fold test
<!-- 1 paragraph. A search visitor decides in 5 seconds whether they're on the right page. Above-fold must: (a) repeat the ad's promise, (b) name the problem, (c) show a clear single CTA. -->

### 2.5 Headline ↔ ad-headline parity (the "message match" rule)
<!-- 1 paragraph. The landing-page H1 must echo the Google ad's headline. Mismatch silently kills CVR even when copy is "better". -->
```

Each subsection has at least one inline citation.

- [ ] **Step 3: Verify**

```powershell
$content = Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw
$section2 = ($content -split "## 2\.")[1] -split "## 3\." | Select-Object -First 1
($section2 -split '\s+').Count
($section2 | Select-String -Pattern "\[.*\]\(http" -AllMatches).Matches.Count
```

Expected: word count between 500 and 900; citations ≥ 4.

- [ ] **Step 4: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): write Google Search Ads context section"
```

---

### Task 8: Write Section 5 — The 12 universal patterns

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 5)

- [ ] **Step 1: Distill patterns from the 4 teardown subsections (4.1–4.4)**

Re-read your own teardowns. For each pattern below, identify at least 2 competitors that exemplify it AND at least 1 that violates it.

- [ ] **Step 2: Write Section 5, one block per pattern. Total ~1,200–1,800 words:**

For each of these 12 patterns, write a block in this format:

```markdown
### 5.N — <Pattern name>

**The pattern:** <1-2 sentences>

**Why it works:** <1-2 sentences, grounded in buyer psychology>

**Exemplars:** <Brand A — what they do>, <Brand B — what they do>

**Violators:** <Brand C — what they do wrong>

**How to apply at Clarté MD:** <1 sentence, specific to acne-protocol.html>
```

The 12 patterns:

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

If your research surfaces a 13th pattern with stronger evidence than one of the above, swap it in and explain the swap in a note at the bottom of Section 5.

- [ ] **Step 3: Verify all 12 patterns present**

```powershell
$content = Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw
1..12 | ForEach-Object { if ($content -match "### 5\.$_ —") { "OK $_" } else { "MISSING $_" } }
```

Expected: 12 lines all starting with `OK`.

- [ ] **Step 4: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): write 12 universal patterns section"
```

---

### Task 9: Write Section 6 — Channel-specific learnings for Google Search Ads

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 6)

- [ ] **Step 1: Write Section 6, ~500–800 words:**

```markdown
## 6. Channel-Specific Learnings — Google Search Ads

### 6.1 Lighthouse thresholds that gate Quality Score
<!-- Specific scores: LCP < 2.5s, INP < 200ms, CLS < 0.1, mobile usability green. Cite Google's Core Web Vitals docs. -->

### 6.2 Expected CTR/CVR ranges for PK acne keyword clusters
<!-- Best-effort table. "acne treatment Pakistan", "dermatologist acne medicine online", "acne serum buy online PK" — even if exact data isn't public, give industry-ranges and flag uncertainty. -->

### 6.3 Ad headline ↔ landing hero parity rules
<!-- 3 concrete rules. e.g.: (1) the exact noun phrase from the ad must appear in the H1, (2) the price or guarantee from the ad must be visible above the fold, (3) the CTA verb should echo the ad's CTA verb. -->

### 6.4 Trust signals that move PK search-intent buyers
<!-- 3-5 bullets specific to search traffic (vs. social): GMC/PMDC credentials, COD copy, fake-product guarantee, lab certifications, WhatsApp number visible. -->

### 6.5 Mobile-first imperatives (Pakistani mobile share)
<!-- 1 paragraph. PK mobile commerce share. Sticky CTA, single-column forms, tap targets ≥ 48px. -->
```

- [ ] **Step 2: Verify**

```powershell
$content = Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw
$section6 = ($content -split "## 6\.")[1] -split "## 7\." | Select-Object -First 1
($section6 -split '\s+').Count
```

Expected: word count between 500 and 1000.

- [ ] **Step 3: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): write Google Search Ads channel learnings"
```

---

### Task 10: Write Section 1 — Executive summary

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 1)

- [ ] **Step 1: Re-read Sections 2–6**

Read the report end-to-end. The executive summary is written LAST so it can faithfully summarize what was researched, not what was planned.

- [ ] **Step 2: Write Section 1, ~400–600 words, in this structure:**

```markdown
## 1. Executive Summary

**Context:** <1 sentence>

**The top 10 patterns ranked by evidence strength:**

1. <Pattern name> — <1 sentence why it's #1, citing strongest evidence>
2. <Pattern name> — <1 sentence>
... (10 entries)

**The 3 patterns most underused by acne-protocol.html:**

- <Pattern> — <1 sentence on the gap>
- <Pattern> — <1 sentence on the gap>
- <Pattern> — <1 sentence on the gap>

**What this report does NOT cover:**
- A/B test design (separate sub-project)
- Google Ads campaign structure (out of scope; only landing-page parity guide is in §6 + companion doc)
- Ad creative / image asset production
```

The "3 patterns most underused" must be calibration from Section 7 (audit) — write this section AFTER you've also done Task 11.

- [ ] **Step 3: Verify executive summary exists with 10-pattern ranking**

```powershell
$content = Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw
$section1 = ($content -split "## 1\.")[1] -split "## 2\." | Select-Object -First 1
($section1 | Select-String -Pattern "^\s*\d+\.\s" -AllMatches).Matches.Count
```

Expected: at least 10 numbered items.

- [ ] **Step 4: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): write executive summary"
```

---

## Phase 2 — Audit

### Task 11: Audit `acne-protocol.html` against the 12 patterns

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 7)
- Read-only: `acne-protocol.html`

- [ ] **Step 1: Read the landing page end-to-end**

Read `acne-protocol.html` in chunks (it's 2,819 lines). Note structure:
- Topbar / nav: lines ~1889–1914
- Hero: ~1915–1956
- AI section: ~1957–2108
- Prescription section: ~2109–2217
- Timeline section: ~2218–2259
- Colophon/trust: ~2260–2292
- FAQ: ~2293–2333
- Intake/checkout: ~2334–2435
- Footer: ~2436–2474
- JS config + handlers: ~2476–end

- [ ] **Step 2: Open the page in Playwright (desktop + mobile viewports)**

Run via Playwright MCP:

1. `mcp__playwright__browser_navigate` to `file:///D:/May Project/Dr Ahmad clartemd/acne-protocol.html`
2. `mcp__playwright__browser_resize` to 1440×900 (desktop), take screenshot, save to `docs/research/competitor-screenshots/audit-desktop-baseline.png`
3. `mcp__playwright__browser_resize` to 390×844 (iPhone 14), take screenshot, save to `docs/research/competitor-screenshots/audit-mobile-baseline.png`
4. Capture console messages — note any errors.

- [ ] **Step 3: Fill in Section 7 with the scorecard**

```markdown
## 7. Audit Scorecard — acne-protocol.html

**Audited on:** 2026-05-16
**Baseline screenshots:** `competitor-screenshots/audit-desktop-baseline.png`, `audit-mobile-baseline.png`
**Console errors at load:** <list, or "none">

| # | Pattern | Present? | Strength (0–3) | Verdict | Severity |
|---|---|---|---|---|---|
| 1 | Message-match with Google ad headline | <✓/⚠/✗> | <0-3> | <1-2 sentences> | <🔴/🟡/🟢> |
| 2 | Single-purpose hero | ... | ... | ... | ... |
... (all 12 rows)
```

For each row, the verdict must reference a specific line range in `acne-protocol.html` (e.g., "Hero H1 at lines 1923–1934 says 'Clear Skin Protocol' — missing the word 'acne' for Google ad parity"). No vague verdicts.

Below the table, write a **Prioritized fix list** with severity tiers:

```markdown
### Prioritized fix list

**🔴 Must-fix (cost orders directly):**
- <fix> — Pattern N — references lines XXX–YYY

**🟡 Should-fix:**
- ...

**🟢 Nice-to-have:**
- ...
```

- [ ] **Step 4: Verify scorecard completeness**

```powershell
$content = Get-Content "docs/research/2026-05-16-skincare-landing-page-conversion-research.md" -Raw
$section7 = ($content -split "## 7\.")[1] -split "## 8\." | Select-Object -First 1
($section7 | Select-String -Pattern "^\| \d+ \|" -AllMatches).Matches.Count
```

Expected: 12 (all 12 patterns scored).

- [ ] **Step 5: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): audit acne-protocol.html against 12 patterns"
```

---

### Task 12: Lock the final applied-changes list

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (top of Section 8)

- [ ] **Step 1: Cross-reference the audit fix list (Task 11) with spec §8 items 1–15**

Look at the audit's prioritized fix list. The spec lists 15 candidate changes but says "final list emerges from Phase 2 audit." Some may be redundant after audit; some new ones may emerge.

- [ ] **Step 2: Write the locked changes plan as a preamble to Section 8:**

```markdown
## 8. Applied Changes Log

**Locked changes plan (decided 2026-05-16 post-audit):**

| Order | Change | File | Severity | Status |
|---|---|---|---|---|
| 1 | Hero sub-headline naming the pain | acne-protocol.html | 🔴 | pending |
| 2 | Add "acne" word to hero for message-match | acne-protocol.html | 🔴 | pending |
| 3 | Hero trust strip (3 badges) | acne-protocol.html | 🟡 | pending |
| 4 | Sticky mobile CTA bar | acne-protocol.html | 🔴 | pending |
| 5 | COD trust framing copy | acne-protocol.html | 🟡 | pending |
| 6 | Next-dispatch urgency line | acne-protocol.html | 🟢 | pending |
| 7 | Reviews section (scaffold w/ placeholders) | acne-protocol.html | 🔴 | pending |
| 8 | Real B/A patient grid (scaffold w/ placeholders) | acne-protocol.html | 🟡 | pending |
| 9 | Checkout form friction reduction | acne-protocol.html | 🟡 | pending |
| 10 | WhatsApp quick-buy link | acne-protocol.html | 🟢 | pending |
| 11 | FAQ purchase-objection questions | acne-protocol.html | 🟡 | pending |
| 12 | Ingredient % overlay on rx tiles | acne-protocol.html | 🟢 | pending |
| 13 | Lighthouse perf pass (defer GTM, lazy-load) | acne-protocol.html | 🟡 | pending |
| 14 | Ad-copy parity guide (sibling doc) | docs/research/ad-copy-parity-guide.md | 🟡 | pending |

<!-- Detailed change entries are appended below in Task order 13-23. Each entry: file:line refs, before/after, pattern + section citation. -->

### Change entries
```

If the audit surfaced a change not in the spec list, ADD it here and note in the entry "discovered in Task 11 audit". If a spec item became redundant after audit, REMOVE it here and explain why.

- [ ] **Step 3: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): lock applied changes list post-audit"
```

---

## Phase 3 — Applied changes

> **Critical for all Phase 3 tasks:** preserve the existing design system. The page uses Fraunces (serif, italic emphasis with cobalt accent), Plus Jakarta Sans (body), JetBrains Mono (eyebrows/labels), and a navy/cobalt/sky palette. Read CSS custom properties at `acne-protocol.html` lines 22–50 before adding any new component — reuse the existing tokens. Never introduce inline colors or fonts that bypass the design system.

> **Verification after each task:** Playwright reload, screenshot desktop + mobile, console must be clean, GTM dataLayer must contain at least one entry, the order form submit handler at line ~2747 must still construct the same payload shape (do NOT modify the JS submit handler in Phase 3 unless the task explicitly says so).

---

### Task 13: Hero changes — sub-headline + "acne" message-match + trust strip

Implements changes #1, #2, #3 from the locked list.

**Files:**
- Modify: `acne-protocol.html` (hero section, ~lines 1915–1956)

- [ ] **Step 1: Read the current hero section**

Read `acne-protocol.html` lines 1915–1956. Note the existing H1 wording, eyebrow text, and CTA button.

- [ ] **Step 2: Apply the three hero edits**

Edits (use the Edit tool, one per change):

**Edit 1 — Sub-headline.** Below the existing H1, before the existing description paragraph, insert a sub-headline line. Use the existing `<p class="hero-sub">` style if it exists, otherwise add one inline using the design system's Fraunces italic + cobalt emphasis pattern:

```html
<p class="hero-sub">For active <em>acne</em>, post-acne <em>marks</em>, and the cycle that won't break.</p>
```

If no `.hero-sub` class exists, add this CSS rule near the existing hero styles:

```css
.hero-sub {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-variation-settings: 'opsz' 36;
  font-size: 19px;
  line-height: 1.4;
  color: var(--ink-2);
  max-width: 38em;
  margin: 14px 0 0;
}
.hero-sub em {
  font-variation-settings: 'opsz' 36, 'SOFT' 100, 'WONK' 1;
  color: var(--cobalt);
  font-style: italic;
}
```

**Edit 2 — H1 message-match for "acne".** If the existing H1 does not contain the word "acne", add the word. Strategy: keep the existing H1 wording but adjust the eyebrow (.eyebrow or .mono class) above it to contain "Acne · Case Study 001" so search visitors who typed "acne" see immediate parity. If the H1 itself can be tweaked to include "acne" without breaking visual rhythm, prefer that. The sub-headline from Edit 1 also contributes — keep the word "acne" italicized in the sub-headline.

**Edit 3 — Hero trust strip.** Below the existing primary CTA in the hero, before the hero closes, insert:

```html
<ul class="hero-trust">
  <li><span class="ht-dot"></span> Dermatologist-formulated</li>
  <li><span class="ht-dot"></span> COD nationwide</li>
  <li><span class="ht-dot"></span> 2× refund if fake</li>
</ul>
```

CSS to add near existing hero styles:

```css
.hero-trust {
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 18px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.hero-trust li { display: inline-flex; align-items: center; gap: 8px; }
.ht-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--cobalt);
  display: inline-block;
}
@media (max-width: 640px) {
  .hero-trust { gap: 10px 16px; font-size: 10px; }
}
```

- [ ] **Step 3: Verify via Playwright**

1. Reload `file:///D:/May Project/Dr Ahmad clartemd/acne-protocol.html`.
2. Screenshot desktop (1440×900) → save as `audit-desktop-after-task13.png`.
3. Screenshot mobile (390×844) → save as `audit-mobile-after-task13.png`.
4. Run `mcp__playwright__browser_evaluate` with script: `document.body.innerText.toLowerCase().includes('acne')` — expected `true`.
5. Run `mcp__playwright__browser_evaluate` with script: `!!document.querySelector('.hero-sub') && !!document.querySelector('.hero-trust')` — expected `true`.
6. Check console for errors.

- [ ] **Step 4: Append a change entry to the report**

Append to Section 8 "Change entries" subsection of the report:

```markdown
#### Change #1–3 — Hero (sub-headline + "acne" message-match + trust strip)

- **File:** acne-protocol.html
- **Lines:** 1915–1956 (region) and CSS additions near line ~XXX
- **Pattern citations:** §5.1 (Message-match), §5.3 (Above-fold problem statement), §5.8 (Money-back / fake-product guarantee)
- **Before screenshot:** competitor-screenshots/audit-desktop-baseline.png
- **After screenshot:** competitor-screenshots/audit-desktop-after-task13.png
- **Verdict:** Applied. Hero now repeats the search-intent noun ("acne"), names the pain in the sub-headline, and surfaces three trust badges above the fold.
```

- [ ] **Step 5: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): hero subhead, acne message-match, trust strip"
```

---

### Task 14: Sticky mobile CTA bar

Implements change #4.

**Files:**
- Modify: `acne-protocol.html`

- [ ] **Step 1: Add sticky CTA markup**

At the bottom of the `<body>` but BEFORE the closing `</body>` tag and the existing `<script>` block, insert:

```html
<aside class="sticky-cta" id="stickyCta" aria-hidden="true">
  <div class="sticky-cta-inner">
    <div class="sticky-cta-price">
      <span class="sc-label">The Clear Skin Protocol</span>
      <span class="sc-price">Rs. 6,499</span>
    </div>
    <a href="#intake" class="btn btn-primary sticky-cta-btn">Order the Protocol →</a>
  </div>
</aside>
```

- [ ] **Step 2: Add CSS for the sticky CTA**

Add near the end of the existing `<style>` block:

```css
.sticky-cta {
  display: none;
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 60;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid var(--rule);
  box-shadow: 0 -8px 24px -12px rgba(14,31,58,0.18);
  transform: translateY(100%);
  transition: transform 0.28s ease-out;
}
.sticky-cta.show { transform: translateY(0); }
.sticky-cta-inner {
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
  padding: 10px 16px;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  max-width: var(--max-w);
  margin: 0 auto;
}
.sticky-cta-price { display: flex; flex-direction: column; line-height: 1.15; }
.sc-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.sc-price {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 17px;
  color: var(--ink);
  font-variation-settings: 'opsz' 36, 'SOFT' 100, 'WONK' 1;
}
.sticky-cta-btn { padding: 12px 18px; min-height: 44px; font-size: 13.5px; }
@media (max-width: 768px) { .sticky-cta { display: block; } }
```

- [ ] **Step 3: Add show/hide JS**

Add to the existing `<script>` block, near the bottom but before the final `renderRxStrip()` etc. calls:

```javascript
(function initStickyCta() {
  const el = document.getElementById('stickyCta');
  const intake = document.getElementById('intake');
  if (!el || !intake) return;
  const hero = document.querySelector('.hero');
  function update() {
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const intakeTop = intake.getBoundingClientRect().top;
    const past = heroBottom < 80;
    const beforeIntake = intakeTop > window.innerHeight * 0.5;
    if (past && beforeIntake) el.classList.add('show');
    else el.classList.remove('show');
    el.setAttribute('aria-hidden', el.classList.contains('show') ? 'false' : 'true');
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
```

- [ ] **Step 4: Verify via Playwright**

1. Reload page, resize to 390×844 (mobile).
2. `mcp__playwright__browser_evaluate`: `document.getElementById('stickyCta') !== null` — expected `true`.
3. Scroll past hero: `mcp__playwright__browser_evaluate` with `window.scrollTo(0, 1200); new Promise(r=>setTimeout(r,500)).then(()=>document.getElementById('stickyCta').classList.contains('show'))` — expected `true`.
4. Screenshot mobile mid-scroll → save as `audit-mobile-after-task14.png`.
5. Resize to desktop (1440×900), confirm sticky CTA is `display: none` (not visible). Screenshot → save as `audit-desktop-after-task14.png`.

- [ ] **Step 5: Append change entry to Section 8 of report.**

```markdown
#### Change #4 — Sticky mobile CTA bar

- **File:** acne-protocol.html
- **Pattern citation:** §5.11 (Sticky mobile CTA)
- **Behavior:** Shows on viewports ≤ 768px, after user scrolls past the hero, until intake section enters viewport.
- **Verdict:** Applied.
```

- [ ] **Step 6: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): sticky mobile CTA bar"
```

---

### Task 15: COD trust framing + next-dispatch urgency

Implements changes #5 and #6.

**Files:**
- Modify: `acne-protocol.html`

- [ ] **Step 1: Locate the existing COD mention in the colophon/trust section**

Read lines ~2260–2292. Find the row that lists payment options including COD.

- [ ] **Step 2: Edit COD copy**

Replace the bare "COD" mention with a fuller trust framing. Where the current page has "COD" in the colophon row, change to a labeled card or line:

```html
<div class="trust-cod">
  <span class="mono eyebrow">Pay on Delivery</span>
  <p>Open the parcel at your door. <em>Then</em> pay the courier. If the bottle looks wrong, refuse it — no charge, no questions.</p>
</div>
```

Add CSS:

```css
.trust-cod {
  padding: 18px 20px;
  border: 1px solid var(--rule);
  border-radius: 14px;
  background: var(--canvas);
  max-width: 520px;
  margin: 18px 0 0;
}
.trust-cod p {
  margin: 6px 0 0;
  font-family: 'Fraunces', serif;
  font-size: 17px;
  line-height: 1.4;
  color: var(--ink-2);
}
.trust-cod em {
  font-style: italic;
  color: var(--cobalt);
  font-variation-settings: 'opsz' 36, 'SOFT' 100, 'WONK' 1;
}
```

- [ ] **Step 3: Add next-dispatch urgency line above the intake CTA**

In the intake section (~line 2429, just above `<button type="submit" ... id="submitBtn">`), insert:

```html
<p class="next-dispatch mono" id="nextDispatch"></p>
```

Add CSS:

```css
.next-dispatch {
  margin: 10px 0 14px;
  text-align: center;
  color: var(--cobalt);
  font-size: 10.5px;
  letter-spacing: 0.14em;
}
.next-dispatch strong { color: var(--cobalt-2); font-weight: 600; }
```

Add JS in the existing `<script>` block, near other render functions:

```javascript
(function renderNextDispatch() {
  const el = document.getElementById('nextDispatch');
  if (!el) return;
  const now = new Date();
  const lahoreNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
  const cutoffHour = 22;
  const dispatch = new Date(lahoreNow);
  if (lahoreNow.getHours() >= cutoffHour) {
    dispatch.setDate(dispatch.getDate() + 2);
  } else {
    dispatch.setDate(dispatch.getDate() + 1);
  }
  const day = dispatch.toLocaleDateString('en-PK', { weekday: 'long', month: 'short', day: 'numeric' });
  el.innerHTML = `Next dispatch · <strong>${day}, 11am · Lahore</strong> — order by 10pm tonight to make it.`;
})();
```

- [ ] **Step 4: Verify via Playwright**

1. Reload.
2. `mcp__playwright__browser_evaluate`: `document.getElementById('nextDispatch').textContent.length > 30` — expected `true`.
3. `mcp__playwright__browser_evaluate`: `!!document.querySelector('.trust-cod')` — expected `true`.
4. Screenshot intake area + colophon area.

- [ ] **Step 5: Append change entries to Section 8.**

- [ ] **Step 6: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): COD trust framing and next-dispatch urgency"
```

---

### Task 16: Reviews section with clearly-marked placeholder content

Implements change #7. **Critical:** content is fabricated placeholder — must be obvious to future editors.

**Files:**
- Modify: `acne-protocol.html`

- [ ] **Step 1: Choose insertion point**

Insert between the AI section (ends ~line 2108) and the prescription section (starts ~line 2109). The new `<section>` opens after `</section>` of the AI block.

- [ ] **Step 2: Add HTML with prominent placeholder warning**

```html
<!--
  ════════════════════════════════════════════════════════════════════════════
  ⚠ PLACEHOLDER CONTENT — DO NOT SHIP PUBLICLY UNTIL REPLACED
  ════════════════════════════════════════════════════════════════════════════
  The reviews below are fabricated for layout/CRO scaffolding purposes.
  Replace with real verified patient reviews + consent records before launch.
  Fabricated testimonials are illegal in most jurisdictions including PK
  (PEMRA / consumer protection law) and brand-damaging if discovered.
  Schema fields required when real: name, age, city, weeks_of_use, concern,
  before_photo_url, after_photo_url, quote, consent_doc_ref, date_collected.
  ════════════════════════════════════════════════════════════════════════════
-->
<section class="reviews-section" id="reviews" data-content-state="placeholder">
  <div class="container">
    <div class="folio">
      <span class="folio-page">— 06 —</span>
      <span class="folio-title">Patient voices</span>
      <span class="mono">Reviews</span>
    </div>
    <h2>What patients said <em>after twelve weeks</em></h2>
    <p class="lede">Verified buyers of the Clear Skin Protocol, three to six months post-purchase. Photos shown with written consent.</p>

    <div class="review-grid">
      <article class="review-card">
        <div class="review-photo"><span class="photo-placeholder">[REAL PATIENT PHOTO]</span></div>
        <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>"By week 5 my forehead was clear. The marks took longer — those needed the full twelve weeks — but my skin doesn't hurt anymore. I stopped covering it on calls."</blockquote>
        <footer class="review-meta">
          <strong>Ayesha K.</strong> · 24 · Lahore · 12 weeks on protocol
        </footer>
      </article>

      <article class="review-card">
        <div class="review-photo"><span class="photo-placeholder">[REAL PATIENT PHOTO]</span></div>
        <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>"I'd tried everything from Daraz before this. The difference here is the doctor. Dr. Tauqir's WhatsApp number actually answers — by a person, not a bot."</blockquote>
        <footer class="review-meta">
          <strong>Sara M.</strong> · 29 · Karachi · 16 weeks on protocol
        </footer>
      </article>

      <article class="review-card">
        <div class="review-photo"><span class="photo-placeholder">[REAL PATIENT PHOTO]</span></div>
        <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>"The COD thing made me try it. I opened the box at the door, saw it was sealed and labelled like the website, paid the courier. Eight weeks later my chin is clear for the first time in two years."</blockquote>
        <footer class="review-meta">
          <strong>Hira A.</strong> · 26 · Islamabad · 10 weeks on protocol
        </footer>
      </article>

      <article class="review-card">
        <div class="review-photo"><span class="photo-placeholder">[REAL PATIENT PHOTO]</span></div>
        <div class="review-stars" aria-label="4 out of 5 stars">★★★★☆</div>
        <blockquote>"Week 2 I had purging — I almost stopped. The WhatsApp consult told me to expect it and it passed. By week 8 the breakouts were down 80%. Marks still fading. Patience required."</blockquote>
        <footer class="review-meta">
          <strong>Maham R.</strong> · 22 · Lahore · 12 weeks on protocol
        </footer>
      </article>
    </div>

    <p class="review-disclaimer mono">
      ⚠ Placeholder content. Verified reviews replacing this section before public launch.
    </p>
  </div>
</section>
```

- [ ] **Step 3: Add CSS**

```css
.reviews-section {
  padding: 96px 0 64px;
  background: var(--white);
  border-top: 1px solid var(--rule);
}
.reviews-section .lede {
  max-width: 56ch;
  font-size: 17px;
  color: var(--ink-mute);
  margin: 14px 0 36px;
}
.review-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}
@media (max-width: 768px) {
  .review-grid { grid-template-columns: 1fr; }
}
.review-card {
  background: var(--sky);
  border-radius: 18px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.review-photo {
  width: 72px; height: 72px;
  background: var(--sky-2);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 1px dashed var(--rule-strong);
}
.photo-placeholder {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
  text-align: center;
  padding: 0 6px;
  line-height: 1.2;
}
.review-stars { color: var(--cobalt); letter-spacing: 0.1em; font-size: 17px; }
.review-card blockquote {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: 18px;
  line-height: 1.45;
  color: var(--ink);
  font-style: italic;
  font-variation-settings: 'opsz' 36;
}
.review-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.review-meta strong { color: var(--ink-2); }
.review-disclaimer {
  margin-top: 24px;
  padding: 12px 16px;
  background: #fff7ed;
  border: 1px dashed #d97757;
  color: #92400e;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
}
```

- [ ] **Step 4: Verify via Playwright**

1. Reload, scroll to the new section.
2. `mcp__playwright__browser_evaluate`: `document.querySelectorAll('.review-card').length === 4` — expected `true`.
3. `mcp__playwright__browser_evaluate`: `document.querySelector('#reviews').getAttribute('data-content-state') === 'placeholder'` — expected `true`.
4. Screenshot desktop + mobile.

- [ ] **Step 5: Append change entry to Section 8.**

- [ ] **Step 6: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): reviews section scaffold with placeholder content"
```

---

### Task 17: Real B/A patient grid in timeline section

Implements change #8. Same placeholder rules as Task 16.

**Files:**
- Modify: `acne-protocol.html` (timeline section, ~lines 2218–2259)

- [ ] **Step 1: Insert B/A grid block at the top of the timeline section**

Just inside `<section class="tl-section">`, before existing content, add:

```html
<!--
  ⚠ PLACEHOLDER B/A PHOTOS — replace with real consented patient photos before launch.
  Required schema per patient: before_url, after_url, weeks_elapsed, age, city, concern.
-->
<div class="ba-grid" data-content-state="placeholder">
  <article class="ba-pair">
    <div class="ba-imgs">
      <div class="ba-img ba-before"><span class="photo-placeholder">[BEFORE]</span></div>
      <div class="ba-img ba-after"><span class="photo-placeholder">[AFTER · WK 12]</span></div>
    </div>
    <footer class="ba-meta"><strong>Patient A</strong> · 23 · Lahore · 12 weeks</footer>
  </article>
  <article class="ba-pair">
    <div class="ba-imgs">
      <div class="ba-img ba-before"><span class="photo-placeholder">[BEFORE]</span></div>
      <div class="ba-img ba-after"><span class="photo-placeholder">[AFTER · WK 10]</span></div>
    </div>
    <footer class="ba-meta"><strong>Patient B</strong> · 28 · Karachi · 10 weeks</footer>
  </article>
  <article class="ba-pair">
    <div class="ba-imgs">
      <div class="ba-img ba-before"><span class="photo-placeholder">[BEFORE]</span></div>
      <div class="ba-img ba-after"><span class="photo-placeholder">[AFTER · WK 14]</span></div>
    </div>
    <footer class="ba-meta"><strong>Patient C</strong> · 31 · Islamabad · 14 weeks</footer>
  </article>
</div>
```

- [ ] **Step 2: Add CSS**

```css
.ba-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin: 28px 0 44px;
}
@media (max-width: 768px) {
  .ba-grid { grid-template-columns: 1fr; }
}
.ba-pair { display: flex; flex-direction: column; gap: 10px; }
.ba-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 14px; overflow: hidden; }
.ba-img {
  aspect-ratio: 3 / 4;
  background: var(--sky-2);
  display: flex; align-items: center; justify-content: center;
  border: 1px dashed var(--rule-strong);
}
.ba-after { background: var(--sky); }
.ba-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.ba-meta strong { color: var(--ink-2); }
```

- [ ] **Step 3: Verify via Playwright**

1. Reload, scroll to timeline.
2. `mcp__playwright__browser_evaluate`: `document.querySelectorAll('.ba-pair').length === 3` — expected `true`.
3. Screenshot desktop + mobile.

- [ ] **Step 4: Append change entry to Section 8.**

- [ ] **Step 5: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): real B/A patient grid scaffold with placeholder photos"
```

---

### Task 18: Checkout form friction reduction

Implements change #9.

**Files:**
- Modify: `acne-protocol.html` (intake form, ~lines 2356–2402)

- [ ] **Step 1: Read the existing form**

Read lines 2356–2402. Identify which fields are marked `required`: name, phone, email, address, city. Postal and notes are optional in the markup but visually prominent.

- [ ] **Step 2: Make postal + notes collapsed/optional**

Wrap the postal code and notes fields in a `<details>` element so they're collapsed by default:

```html
<details class="form-optional">
  <summary><span class="mono">+ Add postal code or delivery notes (optional)</span></summary>
  <div class="form-row">
    <div class="field">
      <label for="fPost">Postal code <span class="opt">optional</span></label>
      <input id="fPost" name="postal" placeholder="54000" />
    </div>
  </div>
  <div class="form-row">
    <div class="field">
      <label for="fNotes">Delivery notes <span class="opt">optional</span></label>
      <input id="fNotes" name="notes" placeholder="Apartment buzzer, landmark, etc." />
    </div>
  </div>
</details>
```

Replace the existing postal + notes blocks with this single `<details>` wrapper. Preserve the existing `id="fPost"` and `id="fNotes"` so the submit handler at line ~2747 keeps working (do NOT modify the JS handler).

- [ ] **Step 3: Add CSS for the disclosure**

```css
.form-optional {
  margin: 8px 0 20px;
  border-top: 1px dashed var(--rule);
  padding-top: 14px;
}
.form-optional summary {
  cursor: pointer;
  color: var(--cobalt);
  font-size: 11px;
  letter-spacing: 0.14em;
  list-style: none;
  padding: 6px 0;
  user-select: none;
}
.form-optional summary::-webkit-details-marker { display: none; }
.form-optional[open] summary { color: var(--ink-mute); }
.opt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  color: var(--ink-faint);
  margin-left: 6px;
}
```

- [ ] **Step 4: Verify via Playwright**

1. Reload.
2. `mcp__playwright__browser_evaluate`: `document.querySelector('.form-optional details, details.form-optional') !== null && document.getElementById('fPost') !== null` — expected `true`.
3. Submit a test order with required fields only (no postal, no notes). The order submit handler should still execute without errors. Use `mcp__playwright__browser_fill_form` to fill required fields, then check the `orderForm` payload by intercepting the fetch — or simpler, evaluate that the form is valid: `document.getElementById('orderForm').checkValidity()` returns `true` after filling required fields.
4. Screenshot.

- [ ] **Step 5: Append change entry to Section 8.**

- [ ] **Step 6: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): collapse optional postal and notes fields to reduce form friction"
```

---

### Task 19: WhatsApp quick-buy link mid-page

Implements change #10.

**Files:**
- Modify: `acne-protocol.html`

- [ ] **Step 1: Insert mid-page WhatsApp link**

Between the prescription section (ends ~line 2217) and the timeline section (starts ~line 2218), insert:

```html
<aside class="wa-quickbuy">
  <div class="container">
    <p class="mono">Prefer to ask first?</p>
    <a href="https://wa.me/923249986822?text=Assalam-o-alaikum%2C%20I'd%20like%20to%20order%20the%20Clear%20Skin%20Protocol." class="wa-link" target="_blank" rel="noopener">
      <svg class="wa-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 3.6 17.3L2 22l4.8-1.5A11 11 0 0 0 20.5 3.5Zm-8.4 16.8a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.9.9-2.8-.2-.3a9 9 0 1 1 7.1 3.7Zm5.2-6.7c-.3-.2-1.7-.8-2-.9-.3-.1-.4-.2-.6.1l-.9 1.1c-.2.2-.3.2-.6 0a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.3 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7l1.6 2.3a8 8 0 0 0 4.7 3c.7.3 1.2.4 1.6.5a3.8 3.8 0 0 0 1.7-.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.4Z"/></svg>
      <span class="wa-text">Chat with Dr. Tauqir's team on <strong>WhatsApp</strong> — we'll take your order over chat</span>
    </a>
  </div>
</aside>
```

- [ ] **Step 2: Add CSS**

```css
.wa-quickbuy {
  padding: 36px 0;
  background: var(--canvas);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.wa-quickbuy .container { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; }
.wa-quickbuy .mono { color: var(--ink-mute); margin: 0; }
.wa-link {
  display: inline-flex; align-items: center; gap: 12px;
  text-decoration: none;
  color: var(--ink);
  padding: 12px 18px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  background: var(--white);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.wa-link:hover { background: var(--sky); border-color: var(--cobalt); transform: translateY(-1px); }
.wa-icon { color: #25D366; flex-shrink: 0; }
.wa-text { font-size: 14.5px; line-height: 1.4; }
.wa-text strong { color: var(--cobalt); font-weight: 600; }
@media (max-width: 640px) {
  .wa-quickbuy .container { flex-direction: column; gap: 12px; }
  .wa-text { font-size: 13.5px; text-align: center; }
}
```

- [ ] **Step 3: Verify via Playwright**

1. Reload.
2. `mcp__playwright__browser_evaluate`: `document.querySelector('.wa-link').href.includes('wa.me/923249986822')` — expected `true`.
3. Screenshot desktop + mobile.

- [ ] **Step 4: Append change entry to Section 8.**

- [ ] **Step 5: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): mid-page WhatsApp quick-buy link"
```

---

### Task 20: FAQ — add three purchase-objection questions

Implements change #11.

**Files:**
- Modify: `acne-protocol.html` (FAQ section, ~lines 2293–2333)

- [ ] **Step 1: Read existing FAQ structure**

Identify the existing FAQ item DOM pattern (likely `<details>` or `<div class="faq-item">`). Mirror it exactly so the new 3 entries inherit styling.

- [ ] **Step 2: Append three FAQ entries**

After the last existing FAQ item, append (adapt structure to match the existing items — example below assumes `<details class="faq-item">`):

```html
<details class="faq-item">
  <summary>Is it safe for sensitive skin?</summary>
  <p>The protocol is built around niacinamide 10%, azelaic acid, and a low 2% BHA — three ingredients with strong tolerability profiles. If your barrier is compromised (red, stinging, peeling), start with the cleanser + SPF only for the first 5–7 days and message Dr. Tauqir's team on WhatsApp before adding the actives.</p>
</details>
<details class="faq-item">
  <summary>What if it doesn't work for me?</summary>
  <p>Active acne should visibly reduce by week 4–6 in most patients on consistent use. If you've completed eight full weeks of the protocol exactly as directed and seen no change, message us — we either adjust the regimen (some skins need a different acid combination) or refund the unused portion. The full guarantee terms are on the shipping &amp; returns page.</p>
</details>
<details class="faq-item">
  <summary>How long until I see results?</summary>
  <p>Three honest milestones: <strong>Week 2</strong> — possible mild purging as cellular turnover speeds up; this is expected and passes. <strong>Week 4–6</strong> — active breakouts visibly down 50–70% in most patients. <strong>Week 10–12</strong> — post-acne marks fading; skin texture smoother. Marks fade slower than active acne — patience here is the protocol's hardest ask.</p>
</details>
```

- [ ] **Step 3: Verify via Playwright**

1. Reload.
2. `mcp__playwright__browser_evaluate`: `document.querySelectorAll('.faq-item').length >= 3` — confirm count went up by 3 from baseline (note original count before this task — read the baseline in Step 1).
3. Click each new FAQ summary, confirm it expands.
4. Screenshot.

- [ ] **Step 4: Append change entry to Section 8.**

- [ ] **Step 5: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): FAQ purchase-objection questions"
```

---

### Task 21: Ingredient % overlay on prescription product tiles

Implements change #12.

**Files:**
- Modify: `acne-protocol.html` (PRODUCTS config + rx strip rendering, ~lines 2488–2497, 2803–2811)

- [ ] **Step 1: Extend PRODUCTS config with an `actives` field**

In the PRODUCTS object (line ~2488–2497), add an `actives` field per product. Example:

```javascript
const PRODUCTS = {
  prep:   { name: 'Radiance Prep Cleanser',       price: 1799, list: 2000, actives: 'PHA 4% · Aloe', image: '...' },
  rescue: { name: 'Clarifying Rescue Face Wash',  price: 1799, list: 2000, actives: 'Salicylic 2% · Zinc', image: '...' },
  vitc:   { name: 'Vitamin CE Ferrulic Serum',    price: 2250, list: 2950, actives: 'Vit C 15% · Vit E · Ferulic', image: '...' },
  acne:   { name: 'Clarifying Acne Serum',        price: 2100, list: 3000, actives: 'Niacinamide 10% · Azelaic 10%', image: '...' },
  ha:     { name: 'Hyaluronic Acid Serum',        price: 2000, list: 2500, actives: 'HA · Panthenol', image: '...' },
  reti:   { name: 'Retinol Serum',                price: 2000, list: 2500, actives: 'Retinol 0.5%', image: '...' },
  light:  { name: 'Radiance Lightening Cream',    price: 2500, list: 4500, actives: 'Tranexamic 3% · Kojic · Arbutin', image: '...' },
  spf:    { name: 'Barrier Restore SPF 50+',      price: 1900, list: 2500, actives: 'SPF 50+ PA++++ · Centella', image: '...' },
};
```

(Keep image URLs intact — only add the `actives` field. If the actual product formulation differs, write a brief note in the change entry but use the doctor's actual percentages where known. These are the percentages currently referenced in the AI prompt at line 2504 and the regimen language elsewhere.)

- [ ] **Step 2: Update the `renderRxStrip` function to render the actives overlay**

Find `renderRxStrip` at lines ~2803–2811. Replace its body:

```javascript
function renderRxStrip() {
  const strip = document.getElementById('rxStrip');
  if (!strip) return;
  strip.innerHTML = BUNDLE.items.map(sku => {
    const p = PRODUCTS[sku];
    if (!p || !p.image) return `<div class="rx-strip-tile empty" aria-hidden="true"></div>`;
    return `
      <div class="rx-strip-tile">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.actives ? `<span class="rx-actives mono">${p.actives}</span>` : ''}
      </div>
    `;
  }).join('');
}
```

- [ ] **Step 3: Add CSS for the actives overlay**

```css
.rx-strip-tile { position: relative; }
.rx-actives {
  position: absolute;
  left: 8px; right: 8px; bottom: 8px;
  background: rgba(14,31,58,0.85);
  color: #fff;
  font-size: 9px;
  letter-spacing: 0.10em;
  padding: 5px 8px;
  border-radius: 6px;
  text-align: center;
  line-height: 1.2;
  pointer-events: none;
}
```

- [ ] **Step 4: Verify via Playwright**

1. Reload, scroll to rx strip.
2. `mcp__playwright__browser_evaluate`: `document.querySelectorAll('.rx-actives').length >= 3` — expected `true`.
3. Screenshot.

- [ ] **Step 5: Append change entry to Section 8.**

- [ ] **Step 6: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "feat(landing): ingredient % overlays on prescription product tiles"
```

---

### Task 22: Lighthouse-friendly perf pass — defer GTM, lazy-load below-fold

Implements change #13.

**Files:**
- Modify: `acne-protocol.html`

- [ ] **Step 1: Defer GTM**

The GTM block at lines 7–13 currently loads inline at parse time. Change `j.async=true` is already there, but the snippet still blocks the head. Move the GTM `<script>` block from the `<head>` to just before the closing `</body>` so it doesn't compete with critical resources, OR add `defer` semantics by wrapping the snippet:

```html
<script>
  // Defer GTM until after first paint to protect LCP
  window.addEventListener('load', function () {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P8VD7TBS');
  });
</script>
```

Note: the GTM `<noscript>` block at lines 1884–1887 stays untouched.

- [ ] **Step 2: Lazy-load below-fold images**

For every `<img>` tag in the page that is NOT in the hero section, ensure `loading="lazy"` is set. Most `renderRxStrip` and `renderCrossSell` outputs already have it. Check the static `<img>` tags in the timeline, colophon, FAQ, and footer areas — add `loading="lazy"` where missing.

Use Grep to find all `<img` tags:

```
Grep pattern: '<img\b' in acne-protocol.html, output_mode: content, -n: true
```

For each match, if it's below line ~1956 (hero ends) AND lacks `loading="lazy"`, add it.

- [ ] **Step 3: Add decoding="async" to non-critical imgs (same pass)**

For the same set of below-fold `<img>` tags, also add `decoding="async"`.

- [ ] **Step 4: Verify**

1. Reload page in Playwright.
2. `mcp__playwright__browser_evaluate`: `window.dataLayer && Array.isArray(window.dataLayer)` — after `window.load`, `window.dataLayer.length > 0` should eventually be true. Wait 1 second after load, then check.
3. `mcp__playwright__browser_evaluate`: `Array.from(document.querySelectorAll('img')).filter(img => !img.loading || img.loading === 'eager').length` — expected small number (only hero imgs, if any).
4. Console clean.

- [ ] **Step 5: Append change entry to Section 8.**

Note this in the entry: a full Lighthouse run is NOT executed in this task (would require Lighthouse CLI). Performance verification is limited to (a) GTM deferred to `load`, (b) below-fold imgs lazy-loaded. Full Lighthouse measurement is a follow-up sub-project.

- [ ] **Step 6: Commit**

```powershell
git add acne-protocol.html docs/research/; git commit -m "perf(landing): defer GTM and lazy-load below-fold images"
```

---

### Task 23: Write ad-copy parity guide

Implements change #14.

**Files:**
- Create: `docs/research/ad-copy-parity-guide.md`

- [ ] **Step 1: Write the parity guide**

```markdown
# Google Search Ads → Landing Page Headline Parity Guide

> **Companion to:** `2026-05-16-skincare-landing-page-conversion-research.md`
> **Goal:** Each Google ad in the acne campaign cluster has a matching landing-page headline + above-fold trust line. This guide is the mapping.

## How to use this

For every Google Ads "Responsive Search Ad" in the acne campaign, pick:
- 1 headline from Column A (or its derivative)
- 1 description from Column B

The landing page's hero MUST visibly contain the exact noun phrase from the ad headline within the first 600px of viewport.

## Keyword cluster: "acne treatment"

| Ad headline (Column A) | Landing page H1 / sub-hero element echoing it | Description (Column B) |
|---|---|---|
| Acne Treatment in Pakistan — Dermatologist-Led | "The Clear Skin Protocol — for active acne" (H1 already says protocol; hero sub adds "acne") | Niacinamide 10%, azelaic, BHA 2%. Twelve-week regimen. COD nationwide. |
| Acne Medicine That Actually Works | "For active acne, post-acne marks, and the cycle that won't break." | Formulated by Dr. Tauqir Ahmad (GMC). 2× refund if fake. WhatsApp: 0324 9986822 |
| Stop Adult Acne — Lahore Dermatologist | Hero trust strip: "Dermatologist-formulated · Lahore" | 12-week protocol, real patient before/afters, free shipping over Rs. 4,000. |

## Keyword cluster: "acne marks / post-acne marks"

| Ad headline | Landing page echo | Description |
|---|---|---|
| Fade Post-Acne Marks in 12 Weeks | Sub-hero: "post-acne marks" italicized | Niacinamide + azelaic, dermatologist-formulated. COD on delivery. |
| Dark Spots from Acne — Treatment | (NOTE: this is closer to pigmentation protocol; route to that page instead) | — |

## Keyword cluster: "acne serum"

| Ad headline | Landing page echo | Description |
|---|---|---|
| Clinical Acne Serum — Made in Pakistan | rx-strip "Clarifying Acne Serum" tile visible above fold OR mention in hero sub | ISO-certified, dermatologist-led, COD. |

## The 3 message-match rules

1. **Exact noun phrase rule.** The ad headline's primary noun phrase must appear in the landing page within the first viewport. If the ad says "acne medicine", the page must say "acne medicine" or "acne treatment" — NOT just "Clear Skin Protocol".
2. **Trust-claim rule.** Any guarantee or credential mentioned in the ad (e.g., "Dermatologist-formulated", "COD", "Made in Pakistan") must appear in the hero trust strip above the fold.
3. **Price/scarcity rule.** If the ad references a price or guarantee ("from Rs. 6,499", "2× refund"), the landing page hero must show it within 600px of scroll.

## What this guide does NOT cover

- Bid strategy, budget allocation, campaign structure (out of scope for landing-page work).
- Ad creative production (image extensions, sitelinks).
- Negative keyword lists.
```

- [ ] **Step 2: Verify**

```powershell
Test-Path "docs/research/ad-copy-parity-guide.md"
(Get-Content "docs/research/ad-copy-parity-guide.md" -Raw).Length -gt 1500
```

Expected: `True`, `True`.

- [ ] **Step 3: Commit**

```powershell
git add docs/research/ad-copy-parity-guide.md; git commit -m "docs(research): Google Ads ↔ landing page headline parity guide"
```

---

### Task 24: Final smoke verification — Playwright end-to-end

**Files:**
- Read-only: `acne-protocol.html`

- [ ] **Step 1: Run a full smoke test in Playwright**

1. Navigate to `file:///D:/May Project/Dr Ahmad clartemd/acne-protocol.html`.
2. `mcp__playwright__browser_console_messages` — capture all console messages from load. **Expected:** no errors.
3. Screenshots:
   - Desktop 1440×900 full-page → `audit-desktop-final.png`
   - Mobile 390×844 full-page → `audit-mobile-final.png`
4. `mcp__playwright__browser_evaluate` with:
   ```javascript
   ({
     dataLayer_present: Array.isArray(window.dataLayer),
     dataLayer_size: window.dataLayer ? window.dataLayer.length : 0,
     review_cards: document.querySelectorAll('.review-card').length,
     ba_pairs: document.querySelectorAll('.ba-pair').length,
     sticky_cta: !!document.getElementById('stickyCta'),
     hero_sub: !!document.querySelector('.hero-sub'),
     hero_trust: !!document.querySelector('.hero-trust'),
     wa_quickbuy: !!document.querySelector('.wa-link'),
     rx_actives: document.querySelectorAll('.rx-actives').length,
     next_dispatch: document.getElementById('nextDispatch')?.textContent?.length || 0,
     trust_cod: !!document.querySelector('.trust-cod'),
     form_optional: !!document.querySelector('.form-optional'),
     ai_section_present: !!document.getElementById('ai-generator'),
     order_form_present: !!document.getElementById('orderForm'),
   })
   ```
5. Expected values:
   - `dataLayer_present: true` (may be `dataLayer_size: 0` if load event hasn't fired yet — wait 2s and re-check)
   - `review_cards: 4`
   - `ba_pairs: 3`
   - `sticky_cta: true`
   - `hero_sub: true`
   - `hero_trust: true`
   - `wa_quickbuy: true`
   - `rx_actives: 4` (one per bundle item)
   - `next_dispatch: > 30`
   - `trust_cod: true`
   - `form_optional: true`
   - `ai_section_present: true` (UNCHANGED — critical)
   - `order_form_present: true` (UNCHANGED — critical)

- [ ] **Step 2: Verify the AI section and order POST shape are unchanged**

Read `acne-protocol.html` lines 1957–2108 (AI section). Compare against the original via git:

```powershell
git diff HEAD~22 HEAD -- acne-protocol.html | Select-String -Pattern "^-" | Select-String -Pattern "<section class=.ai-section|id=.ai-generator|id=.dropzone|id=.compare|id=.handle"
```

Expected: zero matches (no lines removed in the AI section).

Also verify the order form POST payload shape is identical by reading the submit handler at lines ~2747–2801. The `payload` object should still have the same field names: `concern`, `page`, `contact`, `shipping`, `payment`, `items`, `totals`, `bundle_in_cart`, `used_ai_preview`, `ts`.

- [ ] **Step 3: Run a form-submit dry-run**

In Playwright:

1. Fill required form fields: name "Test Patient", phone "0301-1234567", email "test@example.com", address "House 1, Test St", city "Lahore" (or whatever the city select default is).
2. Add bundle to cart by clicking the existing rx-section CTA.
3. Intercept the fetch to `/api/create-order` and inspect the payload before it sends. Confirm the payload has all expected fields. (Don't actually submit to a real endpoint.)

If form-submit dry-run is too fiddly, instead just `mcp__playwright__browser_evaluate` the form submit handler's first 200 chars via `document.getElementById('orderForm').onsubmit?.toString().slice(0,200)` and confirm "concern" + "page" + "contact" appear (proving the handler wasn't accidentally rebound).

- [ ] **Step 4: If any check fails, fix the regression now**

Open the failing item, re-edit the relevant task's changes, re-verify. Do not proceed until smoke is green.

- [ ] **Step 5: Commit (no code changes — verification only)**

If everything passes, no code commit. Append to Section 8 of the report:

```markdown
### Final smoke verification — 2026-05-16

- All 11 applied changes verified present.
- AI section line range 1957–2108: unchanged.
- Order form payload shape: unchanged.
- Console: clean.
- Mobile sticky CTA: shows after hero, hides on intake.
- GTM dataLayer: populated after window.load.
- Screenshots saved: audit-desktop-final.png, audit-mobile-final.png.
```

```powershell
git add docs/research/; git commit -m "docs(research): final smoke verification log"
```

---

### Task 25: Write the change-log section (Section 8) summary

**Files:**
- Modify: `docs/research/2026-05-16-skincare-landing-page-conversion-research.md` (Section 8 summary at top)

- [ ] **Step 1: Update the Section 8 "Locked changes plan" table**

Open the table from Task 12 and update each row's `Status` column from `pending` to `done` (or `skipped` with a 1-line reason if a change was dropped during execution).

- [ ] **Step 2: Add a "How to apply to the other 3 protocols" appendix at the end of Section 8**

```markdown
### Appendix — Applying this pattern to the other 3 protocols

The pattern library, audit framework, and applied-changes log here are reusable for pigmentation, anti-ageing, and barrier protocols. To clone:

1. Duplicate `acne-protocol.html` → `even-tone-protocol.html` (etc.).
2. Re-run the audit (Task 11) against the duplicated page. Most patterns score the same since the design system is shared, but `message-match` (Pattern 1) and `above-fold problem statement` (Pattern 3) MUST be re-evaluated per protocol because the search keyword cluster is different ("melasma treatment" vs. "acne treatment").
3. Apply the changes that differ by protocol:
   - Sub-headline pain naming (new copy per concern)
   - H1 message-match noun phrase ("melasma", "fine lines", "barrier repair")
   - Rx-strip actives overlay strings (different formulations)
   - FAQ purchase-objection answers (different concerns)
4. Keep changes that are page-agnostic identical: sticky CTA, hero trust strip, COD framing, WhatsApp link, form friction, GTM defer, lazy-load.
5. Update the ad-copy parity guide with a new cluster per protocol.

Expected work per additional protocol: ~1.5–2 hours.
```

- [ ] **Step 3: Commit**

```powershell
git add docs/research/; git commit -m "docs(research): finalize change log and reusable-pattern appendix"
```

---

## Self-review (completed during plan writing)

**Spec coverage check (against `docs/superpowers/specs/2026-05-16-conversion-research-design.md`):**

- §2 Goals — Phase 1 (Tasks 1–10), Phase 2 (Tasks 11–12), Phase 3 (Tasks 13–25). ✅
- §3 Non-goals — explicit out-of-scope notes in Phase 3 header. ✅
- §4 Audience — Pakistan-first bias built into Tasks 4, 6, 9, 23. ✅
- §5 Three-phase approach — directly mirrored. ✅
- §6.1 File structure — explicit table at top of plan. ✅
- §6.2 Report section structure — Task 1 scaffolds, Tasks 2–11 fill, Task 25 finalizes. ✅
- §6.3 Competitor set — Tasks 2–5 cover all four tiers. ✅
- §6.4 12 patterns — Task 8 writes them; with explicit allowance for one swap. ✅
- §7 Audit framework — Task 11 implements full scorecard. ✅
- §8 Applied changes — 14 of the 15 spec items mapped to Tasks 13–23 (item #14 "specific-outcome testimonials" is embedded in Task 16's review copy rather than a separate task). ✅
- §9 Verification — Playwright checks after each Phase 3 task + Task 24 final smoke. ✅
- §10 Success criteria — all 6 mapped to verification steps. ✅
- §13 Repo status note — Task 0 resolves by initializing git. ✅

**Placeholder scan:** No TBDs, no "implement later", no vague error handling, no "similar to Task N" without code. ✅

**Type/identifier consistency:**
- `#stickyCta` used in Tasks 14 and 24. ✅
- `.review-card` used in Tasks 16 and 24. ✅
- `.ba-pair` used in Tasks 17 and 24. ✅
- `.hero-sub`, `.hero-trust` used in Tasks 13 and 24. ✅
- `.rx-actives` used in Tasks 21 and 24. ✅
- `data-content-state="placeholder"` used consistently in Tasks 16 and 17. ✅
- `id="nextDispatch"` used in Tasks 15 and 24. ✅

No inconsistencies found.
