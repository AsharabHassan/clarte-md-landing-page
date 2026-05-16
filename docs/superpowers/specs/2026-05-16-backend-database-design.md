# Backend + Database for Clarté MD — Design Spec

- **Date:** 2026-05-16
- **Status:** Approved (pending user review of this written spec)
- **Owner:** Faisal Chaudhry
- **Scope:** Sub-project #2 of the Clarté MD webstore initiative
- **Predecessor sub-project:** #1 (conversion research, applied to `acne-protocol.html`, completed in commit chain `3c081ea`…`83fa57e`)
- **Out of scope here:** GHL automation (sub-project #3), real payment integrations (JazzCash/Easypaisa), customer accounts, additional protocol pages, storefront shell

---

## 1. Problem statement

The Clarté MD landing page at `acne-protocol.html` POSTs orders to `/api/create-order` and AI generation requests to `/api/generate-after`. Both endpoints currently 404 — orders cannot be placed, AI generation falls back to a client-side canvas mock. This sub-project builds the real backend behind those endpoints, the database that persists what they receive, and the admin UI to view and manage what lands there.

## 2. Goals

- Replace the two no-op endpoints with real implementations that persist to a real database.
- Wire the AI before/after generator to Google Gemini 2.5 Flash Image so the page produces real, identity-preserving projections instead of a canvas-filter mock.
- Add a second AI endpoint for structured skin analysis (UI to follow in a later sub-project).
- Ship an admin login + order list so the operator can see and process incoming orders.
- Migrate the existing static `acne-protocol.html` into a Next.js app without visual regression, so the page and the API share one deployment.
- Establish the data model and conventions that all future protocol pages, the storefront shell, and the GHL automation layer will build on.

## 3. Non-goals

- No GoHighLevel CRM integration (separate sub-project #3).
- No JazzCash / Easypaisa / Stripe integration. COD-only for v1.
- No customer-facing login, accounts, order history pages.
- No email/SMS notifications (will fold into GHL sub-project).
- No React componentization of the migrated page beyond what the lift-and-shift requires. Componentization comes when additional protocol pages are built.
- No additional protocol landing pages (pigmentation, anti-ageing, barrier).
- No admin analytics dashboards, product CRUD UI, or AI session browser beyond a basic order list.

## 4. Tech stack

| Concern | Choice | Reason |
|---|---|---|
| Runtime / framework | Next.js 15 App Router, TypeScript strict | User choice; unifies frontend + backend in one deployment |
| Database | Supabase (Postgres) | User choice; includes auth and storage; pooler handles serverless |
| ORM | Drizzle ORM | Type-safe, readable SQL output, smaller than Prisma, no codegen step |
| Validation | Zod | TS-native, used everywhere from API routes to env vars |
| Auth | Supabase Auth (email + password) | Single admin user in v1, no OAuth, no magic links |
| AI provider | Google Gemini via `@google/genai` SDK | User choice; Flash Image for B/A, 2.5 Pro for analysis |
| Object storage | Supabase Storage (two private buckets) | Co-located with DB, signed URLs available |
| Hosting | Vercel | Native Next.js host; preview deployments per PR |
| Testing | Vitest (unit + integration), Playwright (E2E) | Standard, fast, integrates with Vercel |
| CI | GitHub Actions | Runs lint + tests + build on every PR |

## 5. Architecture

**Single Next.js application** at the root of the existing project directory. The existing `acne-protocol.html` is preserved at the root for reference and git history but is not served; Next.js routing takes precedence.

```
D:/May Project/Dr Ahmad clartemd/
├── app/
│   ├── (protocols)/
│   │   └── acne/
│   │       ├── page.tsx              ← Server Component, migrated markup
│   │       ├── client.tsx            ← Client Component, migrated <script>
│   │       └── protocol.css          ← Migrated <style> block (verbatim)
│   ├── api/
│   │   ├── create-order/route.ts     ← Preserves existing URL (no client change)
│   │   ├── generate-after/route.ts   ← Preserves existing URL
│   │   ├── ai/analyze-skin/route.ts  ← New endpoint
│   │   ├── products/route.ts         ← Public catalog
│   │   ├── bundles/[slug]/route.ts   ← Public bundle detail
│   │   ├── admin/
│   │   │   ├── orders/route.ts       ← GET list, auth-gated
│   │   │   └── orders/[id]/route.ts  ← GET detail, PATCH status
│   │   └── cron/
│   │       └── purge-old-images/route.ts  ← Daily Vercel Cron
│   ├── admin/
│   │   ├── login/page.tsx
│   │   └── orders/page.tsx           ← Order list + detail view (minimal UI)
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── db/
│   │   ├── schema.ts                 ← Drizzle tables
│   │   ├── client.ts                 ← Supabase server-side client
│   │   ├── migrations/
│   │   └── seed.ts                   ← Products + bundles seed
│   ├── ai/
│   │   ├── gemini.ts                 ← GoogleGenAI client factory
│   │   ├── prompts.ts                ← B/A + analysis prompt strings
│   │   ├── generate-after.ts         ← Wraps Gemini call + Storage upload
│   │   ├── analyze-skin.ts           ← Wraps Gemini call + structured output
│   │   └── rate-limit.ts             ← Postgres-backed rate limiting
│   ├── auth/
│   │   └── admin.ts                  ← requireAdminSession()
│   ├── orders/
│   │   ├── compute-totals.ts         ← Canonical price recompute
│   │   └── order-number.ts           ← CLM-YYYY-NNNN generator
│   └── validators/                   ← One Zod schema per endpoint
├── acne-protocol.html                ← Original, kept for history/reference
├── docs/
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local                        ← Not committed
├── .env.example                      ← Documents required vars, committed
├── drizzle.config.ts
├── next.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## 6. Data model

7 tables. Drizzle schema definitions; Postgres is the source of truth.

### 6.1 `products`

The catalog. Seeded from the existing in-page `PRODUCTS` config.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK default `gen_random_uuid()` | |
| `sku` | `text` UNIQUE NOT NULL | matches existing keys: `prep`, `rescue`, `vitc`, `acne`, `ha`, `reti`, `light`, `spf` |
| `name` | `text` NOT NULL | |
| `price_pkr` | `integer` NOT NULL | rupees as integers, no paise |
| `list_price_pkr` | `integer` NULL | for strike-through display |
| `actives` | `text` NULL | "Niacinamide 10% · Azelaic 10%" |
| `image_url` | `text` NULL | CDN URL |
| `active` | `boolean` NOT NULL DEFAULT true | soft-hide flag |
| `created_at` | `timestamptz` NOT NULL DEFAULT `now()` | |
| `updated_at` | `timestamptz` NOT NULL DEFAULT `now()` | trigger updates on modification |

### 6.2 `bundles`

Protocol bundles (1 for v1; up to 4 once siblings exist).

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `slug` | `text` UNIQUE NOT NULL | `clear-skin-protocol` |
| `name` | `text` NOT NULL | "The Clear Skin Protocol" |
| `concern` | `text` NOT NULL | `acne` / `pigmentation` / `anti-ageing` / `barrier` |
| `price_pkr` | `integer` NOT NULL | 6499 |
| `created_at`, `updated_at` | `timestamptz` | |

### 6.3 `bundle_items`

M:N between bundles and products.

| Column | Type | Notes |
|---|---|---|
| `bundle_id` | `uuid` FK → `bundles.id` ON DELETE CASCADE | |
| `product_id` | `uuid` FK → `products.id` | |
| `position` | `integer` NOT NULL | display order in rx-strip |
| PK | `(bundle_id, product_id)` | |

### 6.4 `orders`

One row per checkout.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `order_number` | `text` UNIQUE NOT NULL | `CLM-2026-0042`, server-generated via Postgres sequence |
| `status` | `text` NOT NULL DEFAULT `'pending'` | enum: `pending`, `confirmed`, `dispatched`, `delivered`, `cancelled`, `refunded` |
| `concern` | `text` NULL | from form, used for analytics |
| `source_page` | `text` NOT NULL | `acne-protocol` |
| `customer_name` | `text` NOT NULL | |
| `customer_phone` | `text` NOT NULL | |
| `customer_email` | `text` NOT NULL | |
| `shipping_address` | `text` NOT NULL | |
| `shipping_city` | `text` NOT NULL | |
| `shipping_postal` | `text` NULL | optional in v1 |
| `shipping_notes` | `text` NULL | optional in v1 |
| `payment_method` | `text` NOT NULL | `cod` for v1 |
| `payment_status` | `text` NOT NULL DEFAULT `'pending'` | `pending`, `paid`, `failed`, `refunded` |
| `subtotal_pkr` | `integer` NOT NULL | server-recomputed |
| `shipping_pkr` | `integer` NOT NULL | server-recomputed |
| `total_pkr` | `integer` NOT NULL | server-recomputed |
| `bundle_in_cart` | `boolean` NOT NULL | |
| `used_ai_preview` | `boolean` NOT NULL | |
| `ai_session_id` | `uuid` FK → `ai_sessions.id` NULL | links the AI session that preceded this order |
| `created_at`, `updated_at` | `timestamptz` | |

### 6.5 `order_items`

Line items per order. Names and prices snapshotted at order time.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `order_id` | `uuid` FK → `orders.id` ON DELETE CASCADE | |
| `sku` | `text` NOT NULL | snapshotted, no FK |
| `name` | `text` NOT NULL | snapshotted |
| `qty` | `integer` NOT NULL | |
| `unit_price_pkr` | `integer` NOT NULL | snapshotted |
| `is_bundle` | `boolean` NOT NULL DEFAULT false | true for the protocol bundle line |

### 6.6 `ai_sessions`

Every AI generation or analysis call.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `kind` | `text` NOT NULL | `before_after` or `skin_analysis` |
| `concern` | `text` NULL | |
| `input_image_path` | `text` NOT NULL | Supabase Storage path |
| `input_image_sha256` | `text` NOT NULL | dedup / abuse detection |
| `output_image_path` | `text` NULL | for `before_after` only |
| `analysis_json` | `jsonb` NULL | for `skin_analysis` only |
| `model_version` | `text` NOT NULL | `gemini-2.5-flash-image-preview` etc. |
| `latency_ms` | `integer` NULL | |
| `consent_given` | `boolean` NOT NULL | |
| `client_ip_hash` | `text` NOT NULL | SHA-256(IP + pepper); raw IP never stored |
| `client_ua` | `text` NULL | |
| `error` | `text` NULL | |
| `created_at` | `timestamptz` NOT NULL DEFAULT `now()` | |

Indexes: `(client_ip_hash, created_at)` for rate-limit queries; `(kind, created_at)` for analytics.

### 6.7 `admin_users`

Managed by Supabase Auth's built-in `auth.users` table. No custom table in v1. One admin user is created manually via the Supabase Dashboard at provisioning time.

### 6.8 Row Level Security

| Table | Anon-key access | Notes |
|---|---|---|
| `products`, `bundles`, `bundle_items` | Read-only public | Catalog data |
| `orders`, `order_items`, `ai_sessions` | Deny all | Access only via service role from server |

All writes happen server-side via the service-role key, which bypasses RLS. Browser never holds the service-role key.

## 7. API endpoints

### 7.1 Public endpoints (no auth)

#### `POST /api/create-order`

Existing client already POSTs to this URL with this exact payload shape (verified via Task 24 of sub-project #1):

```ts
{
  concern: string,
  page: string,
  contact: { name, phone, email },
  shipping: { address, city, postal, notes },
  payment: "cod",
  items: [{ sku, name, qty, price }],
  totals: { subtotal, shipping, total },
  bundle_in_cart: boolean,
  used_ai_preview: boolean,
  ts: string,
  ai_session_id?: string  // NEW — appended client-side after a successful AI generation
}
```

Response: `{ ok: true, order_number: "CLM-2026-0042" }` on success; `{ ok: false, error: string }` on failure.

Server-side flow:
1. Zod-validate the payload.
2. Re-compute totals server-side from canonical product/bundle prices. Reject if `client.totals.total ≠ server.total` (price-tampering defense).
3. Generate order number from a Postgres sequence.
4. Insert `orders` row + per-item `order_items` rows in a single transaction.
5. If `ai_session_id` is present and valid, link it on the order row.
6. Return success.

Rate limit: 10 orders / IP-hash / hour. Above → 429 with WhatsApp fallback message.

#### `POST /api/generate-after`

Existing client payload preserved exactly:

```ts
{ image_base64: string, mime_type: string, concern: string, prompt: string }
```

Response: `{ image: "data:image/jpeg;base64,...", ai_session_id: "uuid" }`.

Server-side flow:
1. Zod-validate. Reject images > 8 MB. Reject non-image mime types.
2. Compute SHA-256 of input bytes.
3. Rate-limit check: 5 generations / IP-hash / hour. Above → 429.
4. Upload input to `ai-inputs/YYYY/MM/<sha256>.jpg`.
5. Call Gemini 2.5 Flash Image with input image + prompt. Timeout 60s.
6. Upload output to `ai-outputs/`. Insert `ai_sessions` row with both paths, latency, model version.
7. Return output as data URI + `ai_session_id`.

Failure handling: 5xx from Gemini retried once with 1s backoff; still failing → 504 to client. Content-policy refusal → 422.

#### `POST /api/ai/analyze-skin`

New endpoint. Not yet wired into the existing landing page — endpoint ready for a future UI piece.

```ts
// Request
{ image_base64: string, mime_type: string, concern: string, consent: boolean }

// Response
{
  ai_session_id: string,
  analysis: {
    severity: "mild" | "moderate" | "severe",
    primary_concerns: string[],
    secondary_concerns: string[],
    recommended_protocol: string,
    recommended_actives: string[],
    expected_timeline_weeks: number,
    warnings: string[],
    confidence: "low" | "medium" | "high"
  }
}
```

Server-side flow: same upload + rate-limit pattern as B/A; Gemini 2.5 Pro with `responseMimeType: 'application/json'` and a JSON schema enforcing the response shape; analysis persisted to `ai_sessions.analysis_json`.

Critical disclaimer baked into the prompt: model returns `recommended_protocol: 'see-doctor-in-person'` for anything outside cosmetic acne/pigmentation.

#### `GET /api/products`

Returns all `active = true` products.

#### `GET /api/bundles/[slug]`

Returns a bundle with its products joined.

### 7.2 Admin endpoints (Supabase Auth required)

Middleware at `lib/auth/admin.ts` enforces session check on every `/api/admin/*` route. No session → 401.

#### `GET /api/admin/orders`

Lists orders with filters: `?status=pending&limit=50&offset=0`.

#### `GET /api/admin/orders/[id]`

Full order detail incl. line items + linked AI session metadata (not the image, just the session row).

#### `PATCH /api/admin/orders/[id]`

Update status. Body: `{ status: "confirmed" | "dispatched" | "delivered" | "cancelled" | "refunded" }`. Logs `updated_at`.

### 7.3 Cron endpoints (Vercel Cron)

#### `POST /api/cron/purge-old-images`

Daily. Deletes Supabase Storage objects in `ai-inputs/` and `ai-outputs/` older than 90 days. Requires `Authorization: Bearer <CRON_SECRET>` header — set by Vercel automatically.

## 8. Admin UI

Minimal, two pages under `app/admin/`:

- `/admin/login` — email + password form against Supabase Auth. On success, redirect to `/admin/orders`.
- `/admin/orders` — table of orders with status filter, click-through to detail. Detail view has status update buttons and a read-only display of the linked AI session (latency, model, output path).

Visual style: matches the landing page design system (Fraunces, Plus Jakarta Sans, JetBrains Mono, navy/cobalt palette) for consistency.

No customer-facing account UI in v1.

## 9. AI integration

### 9.1 Gemini client

Single factory at `lib/ai/gemini.ts`:

```ts
import { GoogleGenAI } from '@google/genai';
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
```

### 9.2 Models

| Endpoint | Model | Reason |
|---|---|---|
| `/api/generate-after` | `gemini-2.5-flash-image-preview` | Identity-preserving image edits |
| `/api/ai/analyze-skin` | `gemini-2.5-pro` | Structured-output reasoning over vision input |

### 9.3 Before/after prompt

Preserved verbatim from line 2504 of `acne-protocol.html`:

> "Generate a photorealistic projection of this person's skin after 12 weeks of consistent acne treatment with a niacinamide 10% + azelaic + 2% BHA + SPF 50 regimen. Show: cleared active breakouts, faded post-inflammatory hyperpigmentation, smoother skin texture, healthier barrier. Critical: keep identity, ethnicity, age, hair, lighting, framing, and pose IDENTICAL. Realistic clinical improvement only — no airbrushing, no idealization beyond what a dermatologist would expect."

Client can override per concern for future protocol pages.

### 9.4 Analysis prompt

A system instruction requiring JSON-only output matching the response schema in §7.1. Includes a clinical-triage disclaimer: model returns `recommended_protocol: 'see-doctor-in-person'` for anything beyond cosmetic acne / pigmentation / anti-ageing / barrier concerns.

### 9.5 Image storage

| Bucket | Visibility | Lifetime |
|---|---|---|
| `ai-inputs` | Private | 90 days (cron-purged) |
| `ai-outputs` | Private | 90 days (cron-purged) |

Paths: `YYYY/MM/<sha256>.jpg`. Display on the page uses base64 data URIs (existing pattern); Storage is for analytics + abuse-investigation only in v1.

### 9.6 Rate limiting

Postgres-backed, no Redis:

- AI generation: 5 calls / IP-hash / hour. Query `ai_sessions WHERE client_ip_hash = ? AND created_at > now() - interval '1 hour'`.
- Order creation: 10 orders / IP-hash / hour. Query `orders` similarly (would need an IP-hash column added — see open question).

IP is hashed with `SHA-256(ip + IP_HASH_PEPPER)` before storage.

## 10. Migration plan for `acne-protocol.html`

Mechanical, not creative — every byte either moves to a new file or stays the same.

| Step | Output | Effort |
|---|---|---|
| 1 | Scaffold Next.js project at repo root (`create-next-app` with App Router, TS, no Tailwind, no `src/`) | ~30 min |
| 2 | Move `<style>` block to `app/(protocols)/acne/protocol.css` verbatim; move font links to `app/layout.tsx` | ~30 min |
| 3 | Create `app/(protocols)/acne/page.tsx` Server Component rendering the static HTML (sections, footer, form). Mechanical edits: `class=` → `className=`, `for=` → `htmlFor=` | ~3-4 hours |
| 4 | Create `app/(protocols)/acne/client.tsx` Client Component wrapping the existing `<script>` body in `useEffect`. Two URL fetches preserved as-is | ~1 hour |
| 5 | Add one client-side change: capture `ai_session_id` from generate-after response, include in order POST payload | ~10 min |
| 6 | Playwright visual parity check: Next.js page vs. original HTML side-by-side | ~30 min |
| 7 | Set up `/acne` redirect from `/acne-protocol.html` in `next.config.ts` | ~5 min |

Original `acne-protocol.html` is preserved at the project root, untouched, for reference and git history. Vercel does not serve it (Next.js routing wins).

## 11. Deployment

**Environments:**
- Local dev: `npm run dev`, hits hosted Supabase project, real Gemini key.
- Vercel preview per PR: same env vars, isolated DB optional (defer for v1 — use prod project's `dev` schema).
- Production: `main` auto-deploys to Vercel.

**Required env vars** (documented in `.env.example`, committed; actual values in Vercel + local `.env.local`, neither committed):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
IP_HASH_PEPPER=
CRON_SECRET=
NEXT_PUBLIC_GTM_ID=GTM-P8VD7TBS
```

**Provisioning checklist** (run once per environment):
1. Create Supabase project
2. Run Drizzle migrations
3. Seed `products` + `bundles` + `bundle_items`
4. Create admin user in Supabase Dashboard
5. Apply RLS policies via migration SQL
6. Create `ai-inputs` and `ai-outputs` Storage buckets (private)
7. Set Vercel env vars
8. Custom domain DNS → Vercel
9. Smoke test: place a test order, generate an AI preview, log in to admin, view order, update status

## 12. Testing

**Three layers:**

1. **Unit (Vitest):** `compute-totals.ts`, `rate-limit.ts`, `auth/admin.ts`, `order-number.ts`. ~10 tests.
2. **Integration (Vitest + test DB schema):** every API route, happy path + 2-3 failure paths each. Gemini SDK mocked at the module boundary. ~15 tests.
3. **E2E (Playwright):** one full-flow test — load page, place order, admin login, see order, update status. ~30s runtime.

**CI:** GitHub Actions runs `npm run lint && npm run test && npm run build` on every PR. Block merge if red.

**Excluded from testing:** the migrated client-side JS (already smoke-verified in sub-project #1), Supabase SDK internals, Gemini SDK internals.

## 13. Observability

For v1:
- Vercel built-in logs (7-day retention, free).
- Supabase Dashboard for slow-query inspection.
- `ai_sessions.error` and `ai_sessions.latency_ms` for AI-specific incident triage.
- Weekly Vercel Cron emails you a summary: "Last week's orders: N, AI generations: M, errors: K."

Deferred (add when needed):
- Sentry or equivalent error tracking
- Uptime monitoring
- Slack alerting

## 14. Security

- Service-role key only in server-side handlers. Never exposed to browser.
- RLS denies all anon-key access to `orders`, `order_items`, `ai_sessions`, `admin_users`.
- All API request bodies validated via Zod before any DB interaction.
- Server-side total recomputation prevents trivial cart-tampering.
- IP addresses hashed with a server-side pepper before persistence.
- Cron endpoints require a secret in the `Authorization` header.
- Supabase Auth handles password hashing, session cookies, CSRF protection.
- AI image uploads stored in private buckets; not publicly addressable.

## 15. Success criteria

1. A real order placed on the migrated landing page persists to Postgres with correct totals (server-recomputed), generates a unique `CLM-YYYY-NNNN` order number, and the customer sees the success screen.
2. An AI before/after generation call produces a real Gemini-generated image with preserved identity, stored in private Storage, linked to an `ai_sessions` row.
3. Admin can log in, see the order in the orders table, view its detail (including linked AI session), and update its status.
4. Visual parity check against `acne-protocol.html` passes — the migrated Next.js page renders pixel-identically on desktop and mobile.
5. Existing client-side smoke tests from sub-project #1 still pass against the new deployment.
6. `npm run test` is green; `npm run build` produces a deployable Vercel build.
7. All env vars documented in `.env.example`. No secrets in git.

## 16. Estimated effort

| Phase | Hours |
|---|---|
| Project scaffold + Drizzle setup + first migration | ~4 |
| Page migration (Steps 1–7 of §10) | ~10 |
| Order endpoint + admin UI | ~8 |
| AI endpoints + Storage + rate limiting | ~12 |
| Auth + RLS + admin pages | ~4 |
| Tests (unit + integration + E2E) | ~8 |
| Deployment, provisioning, first prod smoke | ~4 |
| **Total** | **~50 hours / 6–7 focused days** |

## 17. Open questions

These are noted for the implementation phase, not blocking spec approval:

- **IP-hash column on `orders` for rate limiting:** the data model in §6.4 doesn't currently include a `client_ip_hash` column on `orders`. Add as part of the implementation OR drop order rate-limiting from v1 (less concerning — orders trigger COD logistics, not direct cost). Recommendation: add the column for parity with `ai_sessions`.

- **Test-DB strategy:** integration tests against a dedicated schema in the prod Supabase project vs. local Supabase emulator vs. ephemeral test project. Decided at plan time.

- **Migration to Componentized React:** documented as out-of-scope here but explicitly listed as a future sub-project. The migrated `client.tsx` will be a monolith; we accept this for v1.

- **Sub-project #1 commit chain integration:** sub-project #1's commits live on `main`. This sub-project continues on the same `main` branch. No rebase needed.

## 18. Repository state note

Project is on `main` with 26 commits from sub-project #1. The `acne-protocol.html` file plus the `docs/research/` and `docs/superpowers/` trees are committed. This sub-project will add:
- New Next.js project files at the repo root
- New Drizzle schema and migrations under `lib/db/`
- New API routes and admin pages under `app/`
- The migrated landing page under `app/(protocols)/acne/`
- Tests under `tests/`

The existing files remain untouched.
