# Provisioning Runbook — Clarté MD Backend

> **For:** the operator setting up a new environment (dev, staging, prod) for the first time.
> **Goal:** A working Next.js app deployed to Vercel with Supabase backing and Gemini access.

## 1. Prerequisites

- GitHub account with this repo cloned
- Vercel account (free tier OK to start)
- Supabase account (free tier OK to start)
- Google AI Studio account → API key for Gemini
- Domain DNS access (only for production)
- Node.js 22+ locally

## 2. Supabase setup (per environment)

1. **Create project.** Dashboard → New Project. Name: `clarte-md-{env}`. Region: closest to Pakistan (eu-west-1 / Frankfurt works well). Save the DB password.
2. **Apply schema:** locally, with `.env.local` pointing at this project's `DATABASE_URL`, run `npm run db:push -- --force` against an empty DB. (For populated DBs use `npm run db:migrate`.) Confirms 6 tables created.
3. **Run setup scripts** (RLS policies, sequence, storage buckets — these live in idempotent `scripts/setup-*.ts` not in migration SQL):
   ```powershell
   tsx --env-file=.env.local scripts/setup-rls.ts
   tsx --env-file=.env.local scripts/setup-storage.ts
   tsx --env-file=.env.local scripts/setup-sequences.ts
   ```
4. **Seed:** `npm run db:seed`. Confirms 8 products, 1 bundle, 4 bundle_items.
5. **Create admin user:** Dashboard → Authentication → Users → Add user. Set email + password. This becomes the only admin login for v1.
6. **Collect:**
   - `NEXT_PUBLIC_SUPABASE_URL` (Settings → API → Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Settings → API → `anon` `public` key)
   - `SUPABASE_SERVICE_ROLE_KEY` (Settings → API → `service_role` key — SECRET, never commit)
   - `DATABASE_URL` (Settings → Database → Connection string → "Direct connection". URL-encode any special characters in the password.)

## 3. Gemini setup

1. Visit https://aistudio.google.com/apikey
2. Create a new API key. Project: pick or create one.
3. Save as `GEMINI_API_KEY`. Tag in your password manager so you can find it if rotation is needed.

## 4. Vercel setup (production)

1. Vercel Dashboard → New Project → Import this Git repo.
2. Framework preset: Next.js (auto-detected).
3. Add all env vars from §2 and §3 above, PLUS:
   - `IP_HASH_PEPPER` — generate via PowerShell:
     ```powershell
     -join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Maximum 256) })
     ```
   - `CRON_SECRET` — generate the same way (Vercel uses this to authenticate cron requests to `/api/cron/purge-old-images`)
   - `NEXT_PUBLIC_GTM_ID=GTM-P8VD7TBS`
4. Deploy. Wait for the build to finish (~2 minutes).
5. Confirm the deployed URL responds: `https://<project>.vercel.app/acne` → page loads.

## 5. Custom domain

1. Vercel project → Settings → Domains → Add `clartemd.com.pk` (or whatever your domain is).
2. Follow Vercel's instructions to update DNS A/CNAME records.
3. Wait for DNS propagation (5 min – 24 hours; typically <30 min).
4. Verify HTTPS certificate auto-issued by Vercel.

## 6. First production smoke test

Visit your domain. Confirm:
- [ ] `/` redirects to `/acne` (307)
- [ ] `/acne-protocol.html` redirects to `/acne` (308)
- [ ] `/acne` page renders with the brand fonts (Fraunces, Plus Jakarta, JetBrains Mono)
- [ ] AI generator can upload an image (use a real selfie of yourself or a stock face)
- [ ] AI returns a generated image within ~30s
- [ ] Order form submits successfully → see success screen
- [ ] `/admin/login` works
- [ ] Logged-in admin sees the test order at `/admin/orders`
- [ ] Order detail view loads
- [ ] Status update button works
- [ ] Mark your test order as `cancelled` so it doesn't pollute the dashboard

## 7. Ongoing operations

- **Add a product:** Edit `lib/db/seed.ts`, add the entry, re-run `npm run db:seed`. Seed is idempotent (upserts on SKU).
- **Add a bundle:** Same — edit seed, re-run.
- **Inspect AI sessions:** Supabase Dashboard → Table editor → `ai_sessions`. Useful for debugging "AI didn't work for user X" reports.
- **Rotate Gemini key:** Generate new key in AI Studio, update Vercel env var, redeploy. Old key continues working until you revoke it in AI Studio.
- **Reset admin password:** Supabase Dashboard → Authentication → Users → click admin user → Send password recovery.

## 8. Cron job (image purge)

The `/api/cron/purge-old-images` route is registered in `vercel.json` to run daily at 03:00 UTC. It deletes files from `ai-inputs` and `ai-outputs` buckets older than 90 days. Vercel auto-authenticates with the `CRON_SECRET` env var. Check execution history in Vercel project → Crons.

## 9. Disaster recovery

- **DB backup:** Supabase free tier includes daily backups. Restore via Dashboard → Database → Backups.
- **Lost service-role key:** Supabase Dashboard → Settings → API → Reset. Update Vercel env var, redeploy.
- **All AI sessions purged:** Storage is for analytics; orders are unaffected. Customers' B/A previews are not recoverable but they didn't expect persistence.

## 10. Known operational blockers (track separately)

- **JazzCash / Easypaisa**: validator currently accepts these payment values but route processes only COD. Real wallet integration is sub-project #3 or #4.
- **WhatsApp Business API**: order notifications go to operator's personal WhatsApp via the form's WA link for now. Official API requires Meta business verification.
- **Real B/A photos**: AI projections are clearly labelled as projections. Real before/after photos with consent docs are an operational pipeline, not a code task.
- **DRAP product certification**: required before any large-scale paid traffic in Pakistan. Independent of the codebase.
