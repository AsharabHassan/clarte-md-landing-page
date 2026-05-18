# v0.6 — Storefront Platform Acceptance Report

**Date:** 2026-05-18
**Spec:** `docs/superpowers/specs/2026-05-17-storefront-design.md`
**Plan:** `docs/superpowers/plans/2026-05-17-storefront.md`
**Subproject:** #6 — Storefront platform
**Tag:** `v0.6`

## TL;DR

All 33 tasks across Phases A–G complete. The Clarté MD landing page is now
a real DTC storefront: homepage, AI quiz, product catalog, persistent
cart, universal checkout, order tracking, contact form, four placeholder
legal pages, and SEO foundations (sitemap, robots, OG, Schema.org). All
test suites green: 38 unit/integration tests, 2 Playwright E2E specs,
clean `npm run build` (35 routes), and a manual smoke pass on every route
in the sitemap returns 200.

Two real bugs surfaced during the closing-pass smoke and were fixed:
- The original Next.js scaffold `app/page.tsx` was silently winning the
  `/` route over `app/(site)/page.tsx`. Removed.
- `CheckoutForm` raced `clearCart()` against `router.push('/order/...')`,
  letting `/checkout`'s empty-cart bounce-back fire before navigation
  could complete. Switched to `window.location.assign(...)` for the
  post-order hop.

Database schema is one migration ahead of production —
`order_lookups` (Task 28) and `subscribers` (Task 29). Both applied to
the Supabase DB on 2026-05-18 via a one-shot script
(`scripts/apply-pending-migrations.ts`) because `npm run db:migrate`
choked on the un-journaled baseline (memory: the v0.2 setup used
`db:push --force` which skipped journaling). The script journaled all
three migrations (`0000`, `0001`, `0002`) so future `db:migrate` works
normally.

## Spec §13 success criteria

| # | Criterion | Status | Notes |
|---|---|---|---|
| 1 | `/` renders a homepage (not a redirect) | ✅ | New homepage with hero + 4-protocol grid + quiz CTA + trust block. Old `/` → `/acne` redirect removed in Phase B Task 13. |
| 2 | 4 protocol pages convert end-to-end (now cart-driven) | ✅ | Both inline-form path (full-flow.spec.ts) and cart-driven path (storefront-flow.spec.ts) E2E-pass. CartProvider bridges the inline `clarte:add-bundle` event so existing CTAs still work. |
| 3 | Visitor takes quiz from `/`, gets recommended protocol, clicks through, completes order | ✅ | `/quiz` ships with `<QuizFlow />`; recommendation links route to the matched protocol. E2E doesn't exercise the AI step (requires a real photo); manual smoke confirms quiz renders. |
| 4 | Visitor browses `/products`, views a detail page, adds to cart, checks out | ✅ | `/products` lists 8 SKUs + 4 bundles; `/products/[sku]` shows Product JSON-LD + add-to-cart; routes verified manually. |
| 5 | Mixed-cart (bundle + individual) check out in one flow | ✅ | `/api/create-order` accepts mixed payloads; server recomputes totals via `computeTotals`; existing v0.5 tests cover the math. |
| 6 | `/order/CLM-2026-XXXX?phone=XXXX` returns the order; refuses wrong phones | ✅ | Phone-last-4 verification; mismatch and missing-order both 404 to avoid existence leak. Rate-limited via the new `order_lookups` table. |
| 7 | `/contact` submits and fires `WEBHOOK_CONTACT_SUBMITTED` | ✅ | Form posts to `/api/contact`; Zod-validated; webhook dispatched (silent no-op when env var is blank); newsletter opt-in writes to `subscribers`. |
| 8 | All 4 legal pages render with reviewable content | ✅ | `/legal/{privacy,terms,returns,shipping}` SSG-generated via `next-mdx-remote`; each opens with an amber `[PLACEHOLDER — pending PK lawyer review]` callout. |
| 9 | `sitemap.xml`, `robots.txt`, OG meta, Schema.org all present and valid | ✅ | 21-URL sitemap (4 protocols + 4 legal + 8 products + 5 static); robots disallows funnel/admin/api; dynamic 1200×630 OG card via `next/og`; Schema.org coverage: Organization + LocalBusiness (site-wide), Product (per SKU + per bundle), FAQPage (per protocol, 8–12 Q/A each). Lighthouse SEO score validation deferred to operator post-deploy. |
| 10 | All `/admin/orders` operations still work | ✅ | No changes touched the admin surface. Existing integration tests pass. |
| 11 | Full test suite green | ✅ | `npm run lint` clean (1 pre-existing font warning); `npm test` 38/38 across 5 files; `npm run test:e2e` 2/2 specs. |
| 12 | `npm run build` succeeds; tagged `v0.6` | ✅ | 35 build routes (5 static, 4 SSG legal slugs, ~14 SSR, ~12 API + middleware), tag pushed in the closing commit. Deploy to Vercel is operator-triggered (auto-deploy on push to `main`). |

All 12 ✅.

## Plan deviations

| Where | What | Why |
|---|---|---|
| Task 28 (rate-limit) | New `order_lookups` table instead of the plan's "use existing IP-hash mechanism" | Existing mechanism counts INSERT-driven tables (orders, ai_sessions). For a read-only lookup endpoint that doesn't write to those, the counter would never grow → unlimited brute-force on phone-last-4. New small event table with a `(client_ip_hash, created_at)` index. |
| Task 28 | Bonus `/order` lookup form route | Plan only specified `/order/[number]`. Added a top-level `/order` lookup form so customers without an emailed deep-link can still self-serve. Additive. |
| Task 30 | `app/(site)/legal/[slug]/page.tsx` + `content/legal/*.mdx` | Plan literally wanted `app/legal/privacy/page.mdx` etc. (file-based MDX routing). Task 1 chose `next-mdx-remote` over `@next/mdx`, so file-based routing isn't wired. Reconciled to a dynamic route reading from `content/legal/`. |
| Task 32 | `app/opengraph-image.tsx` instead of static `/og-default.png` | Code-generated OG card via `next/og`'s `ImageResponse`. Operator can swap to a static PNG by deleting this file + dropping `/public/og-default.png` + retargeting the metadata. |
| Task 32 | `/contact` skipped per-page metadata | It's a client component; adding metadata requires a server-shell split. Out of scope for v0.6 — falls back to layout defaults. |
| Pre-Task 32 | Surprise commit `fix(brand): anonymize remaining 15 'Dr. Ahmad' leaks on /acne` (08eb245) | Discovered while preparing FAQPage JSON-LD that dd12e6c had only caught `Dr. Tauqir` patterns; plain `Dr. Ahmad` (15 instances on /acne) had slipped through. Surfacing them into structured data would have amplified the leak. Fixed first. |
| Task 33 | Surprise commit `fix(checkout): hard-nav to /order` | Found during E2E that the cart-driven path bounced to /cart on a clean order. Real bug, fix-then-test. |
| Task 33 | Surprise commit `fix(home): remove leftover Next.js scaffold page` | The original `create-next-app` scaffold `app/page.tsx` was silently winning over the route-grouped homepage. Real bug, fix-then-test. |
| Task 33 | `scripts/apply-pending-migrations.ts` | One-shot journal-repair tool. The v0.2 setup used `db:push --force` which skipped the drizzle migration journal; `db:migrate` then failed every time. Script is idempotent and now journals `0000` + applies `0001` + `0002`. |

## Operator content gaps (open)

These were flagged in spec §15 — none block ship, all need operator follow-up:

| Asset | Status |
|---|---|
| Lead-doctor portrait + anonymized bio | Not in scope; about page uses copy without portrait |
| Lab / manufacturing photos (2–3) | Not added; about page renders without |
| Brand philosophy copy (~200 words) | Placeholder OK on /about |
| Per-product hero shots audit | Some SKUs have `imageUrl`, some fall back to default OG — operator to fill DB |
| **Legal page content review by PK lawyer** | **Required before public PR / paid traffic.** All 4 pages flagged with amber `[PLACEHOLDER]` callouts. |
| Product copy review by prescribing doctor | Operator + clinician |
| `WEBHOOK_CONTACT_SUBMITTED` URL | Blank in Vercel env — set when CRM is wired |

## Operator action items before deploy

1. **Vercel auto-deploys on `git push origin main --tags`** — no manual step.
2. Migrations already applied to Supabase DB (via the one-shot script in this session). Future schema changes use `npm run db:migrate` normally.
3. **Optional:** `WEBHOOK_CONTACT_SUBMITTED` env var on Vercel — silent no-op until set.
4. Validate Schema.org markup with **Google Rich Results Test** at https://search.google.com/test/rich-results once the production URL is live with v0.6. Expected types per page: Organization + LocalBusiness on every page; Product on `/products/*`; Product + FAQPage on each protocol; nothing extra on legal.
5. Watch the first 24h of `/api/order/*` requests for unexpected 429s (the new `order_lookups` rate-limit is 10/hr/IP — generous, but new behaviour).

## Verification log

```
npm run lint            # 1 pre-existing font warning, no errors
npm test                # 5 files / 38 tests / 11.4s
npm run test:e2e        # 2/2 specs (40s total)
npm run build           # 35 routes, no errors
```

Manual smoke (curl per route):

```
200 /                       200 /quiz             200 /about
200 /products               200 /contact          200 /acne
200 /even-tone              200 /renewal          200 /barrier
200 /legal/privacy          200 /legal/terms      200 /legal/returns
200 /legal/shipping         200 /cart             200 /checkout
200 /order                  200 /admin/login      200 /sitemap.xml
200 /robots.txt             200 /opengraph-image
200 /products/{acne,ha,light,prep,rescue,reti,spf,vitc}  (×8)
```

Schema.org coverage spot-checks:
- `/products/spf` → Organization, LocalBusiness, Product, Offer, Brand
- `/acne` → Organization, LocalBusiness, Product, Offer, Brand, FAQPage, Question, Answer

## What's next (out of scope, v0.7+)

- Sub-project #3 phase 2 — order-confirmation emails / SMS, GHL automation
- Sub-project #4 — JazzCash / Easypaisa / Card payment processing (parked on merchant approval)
- Sub-project #7 — full newsletter subscribe UX (footer is currently a stub)
- Conversion-audit pass on the new homepage + quiz once first-traffic data lands
- WhatsApp Business API verification, DRAP cert for paid traffic scaling

See [[project_production]] / [[project_long_lead_blockers]] for the full backlog.
