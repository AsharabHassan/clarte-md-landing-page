/**
 * One-shot image optimizer for the 8 product folders supplied by
 * operator on 2026-05-19. Reads raw PNGs from each source folder,
 * resizes to 1200px wide max, converts to WebP at quality 82, and
 * writes to public/products/<sku>/{hero,view-1,view-2,view-3}.webp.
 *
 * Why webp + 1200w: target PK mobile data plans. The original PNGs
 * average 3 MB each (12 MB per product); after this pass each image
 * lands at ~80-150 KB. Total payload for all 32 images: ~3 MB.
 *
 * Run: npx tsx scripts/optimize-product-images.ts
 * Idempotent — overwrites prior output.
 *
 * NOTE: This pass picks the operator's *named* file in each folder
 * (e.g. Retinol.png) as the hero — which turned out to be a 3-bottle
 * composite shot. Operator subsequently asked for single-bottle front
 * shots as heroes. If you re-run this optimizer from scratch, also
 * run `scripts/remap-product-heroes.ts` afterward to apply the chosen
 * hero/view swaps.
 */
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import sharp from 'sharp';

interface SourceMap {
  sku: string;
  folder: string;
  // The "named" file in each folder (vs the 3 UUID-named angle views).
  // We use this as the hero (front-of-bottle product shot).
  heroFile: string;
}

const SOURCE_ROOT =
  'C:\\Users\\786\\Downloads\\YUSuh\\Clarte MD Products 360 view Pictures\\Clarte MD Products 360 view Pictures';

const SOURCES: SourceMap[] = [
  { sku: 'reti', folder: 'Retinol', heroFile: 'Retinol.png' },
  { sku: 'spf', folder: 'SPF50+', heroFile: 'SPF 50+.jpeg' },
  { sku: 'vitc', folder: 'Vitamin C', heroFile: 'Vitamin.png' },
  { sku: 'ha', folder: 'Hydrolanic Acid', heroFile: 'Hyrolunic Acid.png' },
  { sku: 'prep', folder: 'Padiance Prep', heroFile: 'radiance Prep.png' },
  { sku: 'light', folder: 'Radiance Cream', heroFile: 'Cream.jpeg' },
  { sku: 'rescue', folder: 'Clarifying Rescue', heroFile: 'Clarifying rescue wash.png' },
  { sku: 'acne', folder: 'Claryfying Acne', heroFile: 'Acne Serum.png' },
];

const OUT_ROOT = join(process.cwd(), 'public', 'products');

async function optimizeOne(src: string, dest: string) {
  await sharp(src)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
}

async function main() {
  if (!existsSync(OUT_ROOT)) mkdirSync(OUT_ROOT, { recursive: true });

  for (const s of SOURCES) {
    const srcFolder = join(SOURCE_ROOT, s.folder);
    const outFolder = join(OUT_ROOT, s.sku);
    if (!existsSync(outFolder)) mkdirSync(outFolder, { recursive: true });

    const files = readdirSync(srcFolder).filter(
      (f) => /\.(png|jpe?g)$/i.test(f) && !f.startsWith('.'),
    );

    if (!files.includes(s.heroFile)) {
      throw new Error(`Hero file missing for ${s.sku}: expected ${s.heroFile} in ${srcFolder}`);
    }

    // Hero image (the named product shot)
    await optimizeOne(join(srcFolder, s.heroFile), join(outFolder, 'hero.webp'));
    console.log(`  ✓ ${s.sku}/hero.webp`);

    // Three UUID-named angle views, sorted alphabetically for deterministic output
    const angles = files.filter((f) => f !== s.heroFile).sort();
    for (let i = 0; i < angles.length && i < 3; i++) {
      await optimizeOne(join(srcFolder, angles[i]), join(outFolder, `view-${i + 1}.webp`));
      console.log(`  ✓ ${s.sku}/view-${i + 1}.webp`);
    }
  }

  console.log('\nImage optimization complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
