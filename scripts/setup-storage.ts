/**
 * Idempotent Supabase Storage setup.
 *
 * Creates two private buckets used by the AI generation flow:
 *   - ai-inputs   stores selfies uploaded to /api/generate-after
 *   - ai-outputs  stores B/A projections returned by Gemini
 *
 * Both are PRIVATE — files served via short-lived signed URLs only.
 *
 * Run: npx tsx scripts/setup-storage.ts
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing — check .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

const BUCKETS = [
  { name: 'ai-inputs', limitBytes: 10 * 1024 * 1024, mime: ['image/jpeg', 'image/png', 'image/webp'] },
  { name: 'ai-outputs', limitBytes: 10 * 1024 * 1024, mime: ['image/jpeg', 'image/png', 'image/webp'] },
] as const;

async function main() {
  const { data: existing, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) throw listErr;
  const existingNames = new Set(existing?.map((b) => b.name) ?? []);

  for (const b of BUCKETS) {
    if (existingNames.has(b.name)) {
      console.log(`  ↺ ${b.name} (already exists)`);
      continue;
    }
    const { error } = await supabase.storage.createBucket(b.name, {
      public: false,
      fileSizeLimit: b.limitBytes,
      allowedMimeTypes: [...b.mime],
    });
    if (error) throw error;
    console.log(`  ✓ ${b.name} created (private, ${b.limitBytes / 1024 / 1024} MB limit)`);
  }

  const { data: final } = await supabase.storage.listBuckets();
  console.log(`\nFinal: ${final?.length ?? 0} buckets — ${final?.map((b) => `${b.name}(${b.public ? 'public' : 'private'})`).join(', ')}`);
}

main().catch((e) => {
  console.error('Setup failed:', e);
  process.exit(1);
});
