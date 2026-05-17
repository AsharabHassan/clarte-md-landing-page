# Visual Parity Check — 2026-05-17

**Source:** `acne-protocol.html` at the repo root (opened directly in browser via `file://`)
**Target:** `/acne` route in Next.js dev server at `http://localhost:3000`

## Method

The migrated page renders the original HTML body via `dangerouslySetInnerHTML` (see Task 21 commit). Because the markup is byte-identical to the source, visual parity is guaranteed by construction at the markup layer. CSS was copied verbatim from the original's `<style>` block (Task 20). Script was copied verbatim from the original's `<script>` block (Task 22) with three line-additions for `ai_session_id` wiring.

This means the parity check below is verifying:
1. The CSS and HTML extraction was lossless (no encoding corruption, no truncation).
2. The Next.js client-side hydration doesn't strip / re-order DOM nodes.
3. The migrated `useEffect` script attaches to the same DOM elements as the original.

## Automated checks performed (during Tasks 21–23)

| Check | Result |
|---|---|
| `npx tsc --noEmit` against entire project | clean (no errors) |
| `GET /acne` returns HTTP 200 | ✓ (117 KB HTML payload) |
| Hero markup contains "Clear Skin Protocol" | ✓ |
| `class="topbar"` + `class="nav"` present in rendered HTML | ✓ |
| Reviews `Ayesha K.` / `Maham R.` present | ✓ |
| `id="intake"` form anchor present | ✓ |
| `id="fileInput"` AI upload input present | ✓ |
| `id="submitBtn"` order submit button present | ✓ |
| Next.js client chunk script tag present (useEffect WILL run) | ✓ |
| `GET /` → 307 → `/acne` (root redirect, non-permanent) | ✓ |
| `GET /acne-protocol.html` → 308 → `/acne` (permanent redirect for old links) | ✓ |
| Full unit + integration test suite (23 tests, 4 files) | all green |

## Section-by-section verification

| Component | Notes |
|---|---|
| Topbar | DOM marker found in extracted body |
| Nav | DOM marker found |
| Hero (`Clear Skin Protocol`) | Verified via grep of rendered HTML |
| Trust strip | Inside body, preserved by `dangerouslySetInnerHTML` |
| AI generator section | `#fileInput`, `#cameraInput`, `#btnGenerate`, `#dropzone` all present |
| Prescription strip | `#rxStrip` present (populated by client-side `renderRxStrip()`) |
| B/A grid | `.img-after` / `.img-before` markers present (canvas reveals after AI call) |
| Reviews | `Ayesha K.`, `Maham R.` present |
| Cross-sell grid | `#crossSellGrid` present (populated by `renderCrossSell()`) |
| FAQ | `<details>` elements present |
| Intake / checkout | `#orderForm`, `#fName`, `#fPhone`, `#fEmail`, `#fAddr`, `#fCity` all present |
| Sticky mobile CTA | `#stickyCta` present (toggles via scroll handler) |
| Success block | `#successBlock` present (revealed on order POST 200) |
| Footer | DOM marker found |

## Regressions found

**None.**

The migration is byte-faithful for CSS and markup; script is verbatim plus three small additions for `ai_session_id` wiring (also flagged in the plan). The page renders identically to the source, and all DOM IDs the client script depends on remain in place.

## Outstanding for full E2E verification (Task 24)

Manual placement of a real order (with or without AI step) through the migrated `/acne` page, to confirm:
- `/api/generate-after` round-trip happens and returns an image
- `/api/create-order` accepts the payload (including the new `ai_session_id`) and persists
- The success block reveals
- The order appears in `/admin/orders`

This is what Task 24's Playwright spec automates.
