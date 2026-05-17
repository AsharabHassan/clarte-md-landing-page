# v0.3 Acceptance — 4-Protocol Storefront

**Date:** 2026-05-17
**Tag:** `v0.3`
**Commit range:** `b52954b..3af19eb` (v0.2 acceptance → v0.3 acceptance)
**Scope:** sub-project #5 partial — port 3 sibling protocol pages from Folder B so the storefront launches with all 4 protocols available, not just acne.

## What v0.3 adds on top of v0.2

| Slug | Concern | Bundle price | Items | Source HTML |
|---|---|---|---|---|
| `/even-tone` | pigmentation, melasma | Rs 6,999 | prep + vitc + light + spf | Folder B `even-tone-protocol.html` |
| `/renewal` | anti-ageing, fine lines | Rs 7,999 | prep + vitc + reti + ha + spf | Folder B `renewal-protocol.html` |
| `/barrier` | sensitivity, hydration | Rs 4,799 | prep + ha + spf | Folder B `barrier-protocol.html` |

Plus 3 redirects:
- `/even-tone-protocol.html` → `/even-tone` (308)
- `/renewal-protocol.html` → `/renewal` (308)
- `/barrier-protocol.html` → `/barrier` (308)

DB now has 4 bundles (was 1) and 16 bundle_items (was 4). All 8 products were already seeded — no new SKUs added.

## What's intentionally NOT in v0.3

- **Conversion-audit improvements on sibling pages.** Acne went through sub-project #1's 12-pattern audit (sticky CTA, FAQ purchase-objection questions, ingredient %, etc.). The 3 sibling pages are ported byte-faithfully from Folder B's pre-audit copy — they look great but don't yet have those refinements. **Plan:** audit pass after first-traffic data informs which patterns matter most per concern. Scope flagged for sub-project #5 phase 2.
- **Storefront index at `/`**. Still 307-redirects to `/acne`. Sub-project #6 will replace it with a real 4-protocol grid landing.
- **AI triage routing**. `/api/ai/analyze-skin` returns `recommended_protocol: 'even-tone-protocol' | 'renewal-protocol' | 'barrier-protocol' | 'clear-skin-protocol' | 'see-doctor-in-person'`, but no UI consumer of it yet. The protocol pages each have their own AI generator; the analyze-skin endpoint is for a future quiz/concierge flow.

## Final test results (v0.3)

| Check | Result |
|---|---|
| `npm run lint` | ✅ clean (1 non-blocking font warning) |
| `npm run test` | ✅ 23 passed across 4 files |
| `npm run build` | ✅ 17 routes compile (8 API + 3 admin + 4 protocols + / + _not-found), middleware 89.2 kB |
| `npx tsc --noEmit` | ✅ clean |
| `/acne`, `/even-tone`, `/renewal`, `/barrier` | ✅ all return 200 in dev |
| 4 sibling redirects | ✅ all 308 to correct destination |
| Root `/` | ✅ 307 → /acne |

## Migration approach (identical across all 4)

The same byte-faithful pattern that worked for /acne in sub-project #2 Phase 5:

1. CSS extracted verbatim to `app/(protocols)/{slug}/protocol.css`
2. Body extracted to `app/(protocols)/{slug}/protocol.html.ts` as a `String.raw` template
3. `page.tsx` is a 12-line Server Component that loads CSS, renders the body via `dangerouslySetInnerHTML`, and mounts the client component
4. `client.tsx` puts the inline `<script>` body into a `useEffect`, with all 5 fixes applied:
   - `/* eslint-disable */` + `// @ts-nocheck` on the first 2 lines
   - `let lastAiSessionId = null` declared in the closure
   - `if (data.ai_session_id) lastAiSessionId = data.ai_session_id` after the AI response
   - `ai_session_id: lastAiSessionId || undefined` in the order payload
   - `(window as any).addBundleToCart = addBundleToCart` (and `toggleCrossSell`) so inline HTML `onclick=` handlers resolve

No JSX conversion. No structural changes. The 3 new pages render byte-identical to their Folder B HTML originals.

## Per-page file sizes (informational)

| Page | CSS lines | Body lines | Script lines | Bundle (build) |
|---|---|---|---|---|
| `/acne` | 2097 | 733 | 379 | 5.12 kB / First Load 108 kB |
| `/even-tone` | 1910 | 593 | 343 | 4.65 kB / First Load 107 kB |
| `/renewal` | 1911 | 601 | 342 | 4.63 kB / First Load 107 kB |
| `/barrier` | 1910 | 585 | 343 | 4.66 kB / First Load 107 kB |

Acne is meaningfully larger because of the 21 conversion improvements applied in sub-project #1 — the 3 sibling pages will likely converge closer to acne's size once their audit pass runs.

## Ready for first deploy

All code-side work complete. Pending operator actions per `docs/runbooks/2026-05-17-provisioning.md`:

1. `npm i -g vercel` (CLI install)
2. `vercel login` + `vercel link` (project setup)
3. `vercel env add` × 8 env vars (paste from `.env.local`)
4. `vercel deploy --prod`
5. Smoke test the 4 protocol pages on the prod URL

Supabase project is already fully provisioned (schema + RLS + buckets + seed) — §2 of the runbook is a no-op for this deploy.
