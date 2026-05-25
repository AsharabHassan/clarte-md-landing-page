/**
 * Idempotent: create the PUBLIC Supabase Storage bucket for customer
 * review photos. Approved review photos are shown publicly on the
 * storefront, so a public bucket keeps both the storefront (next/image)
 * and the admin viewer rendering the URL directly — no signed URLs.
 *
 * Run: npx tsx --env-file=.env.local scripts/setup-review-storage.ts
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing');
  process.exit(1);
}

const supabase = createClient(url, key);
const BUCKET = 'review-photos';
const LIMIT = 8 * 1024 * 1024;
const MIME = ['image/jpeg', 'image/png', 'image/webp'];

async function main() {
  const { data: existing } = await supabase.storage.listBuckets();
  if (existing?.some((b) => b.name === BUCKET)) {
    console.log(`↺ ${BUCKET} already exists`);
  } else {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: LIMIT,
      allowedMimeTypes: MIME,
    });
    if (error) throw error;
    console.log(`✓ created ${BUCKET} (public, 8 MB limit, jpeg/png/webp)`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error('Setup failed:', e);
  process.exit(1);
});
