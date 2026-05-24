/**
 * Bulk PNG → WebP converter for /public content images.
 *
 * Target folders:
 *   public/protocols/<slug>/hero-gpt.png
 *   public/protocols/<slug>/visual-studies/case-*.png
 *   public/about/*.png
 *
 * The originals are 1.5 – 3 MB each. WebP @ q82 brings them to ~150–
 * 400 KB with no visible quality loss on these illustrative photos.
 *
 * Behaviour:
 *   - Writes <same-name>.webp next to the source PNG (keeps PNG so we
 *     can roll back; the new next.config + image-path swap make the
 *     webp authoritative).
 *   - Resizes to 1800w max so hero/case images don't ship at native
 *     resolution to mobile.
 *   - Idempotent: skips files where the webp is newer than the source.
 *
 * Run: npx tsx scripts/optimize-content-images.ts
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, basename, dirname, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = join(process.cwd(), 'public');

const TARGETS: string[] = [
  join(ROOT, 'protocols'),
  join(ROOT, 'about'),
];

const MAX_WIDTH = 1800;
const QUALITY = 82;

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(png|jpe?g)$/i.test(name)) out.push(full);
  }
  return out;
}

async function convertOne(src: string): Promise<{ savedBytes: number; skipped: boolean }> {
  const dest = join(dirname(src), basename(src, extname(src)) + '.webp');
  if (existsSync(dest)) {
    const a = statSync(src).mtimeMs;
    const b = statSync(dest).mtimeMs;
    if (b > a) return { savedBytes: 0, skipped: true };
  }
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dest);
  const srcSize = statSync(src).size;
  const destSize = statSync(dest).size;
  return { savedBytes: srcSize - destSize, skipped: false };
}

async function main() {
  const files: string[] = [];
  for (const t of TARGETS) walk(t, files);

  if (files.length === 0) {
    console.log('No PNG/JPG sources found under', TARGETS.join(', '));
    return;
  }

  console.log(`Converting ${files.length} files to webp …`);
  let totalSaved = 0;
  let processed = 0;
  let skipped = 0;
  for (const f of files) {
    try {
      const { savedBytes, skipped: wasSkipped } = await convertOne(f);
      if (wasSkipped) {
        skipped += 1;
      } else {
        processed += 1;
        totalSaved += savedBytes;
        const rel = f.replace(ROOT + '\\', '').replace(ROOT + '/', '');
        const kb = (savedBytes / 1024).toFixed(0);
        console.log(`  ✓ ${rel}  (saved ${kb} KB)`);
      }
    } catch (e) {
      console.error(`  ✗ ${f}: ${(e as Error).message}`);
    }
  }
  console.log(
    `\nDone. Processed ${processed}, skipped ${skipped}. Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
