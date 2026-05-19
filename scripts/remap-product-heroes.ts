/**
 * One-shot hero remapper for public/products/<sku>/{hero,view-1,2,3}.webp.
 *
 * After the first optimizer pass landed on 2026-05-19, operator
 * reviewed each gallery and picked a different image as the hero per
 * SKU. This script swaps hero.webp <-> view-N.webp for each SKU
 * according to the PICKS table below, so the chosen single-bottle
 * front shot becomes the gallery hero and the old 3-bottle composite
 * drops into the picked view slot.
 *
 * Idempotent — re-running with the same PICKS yields the same final
 * state (the swap is its own inverse after one application; running
 * twice with the same picks would undo, so DON'T run twice unless
 * you've changed PICKS).
 *
 * Run: npx tsx scripts/remap-product-heroes.ts
 */
import { existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const PICKS: Record<string, number> = {
  acne: 2,
  ha: 3,
  light: 2,
  prep: 2,
  rescue: 2,
  reti: 3,
  spf: 1,
  vitc: 2,
};

const OUT_ROOT = join(process.cwd(), 'public', 'products');

function swap(skuDir: string, viewIdx: number) {
  const hero = join(skuDir, 'hero.webp');
  const view = join(skuDir, `view-${viewIdx}.webp`);
  const tmp = join(skuDir, '.tmp-swap.webp');
  if (!existsSync(hero) || !existsSync(view)) {
    throw new Error(`Missing file(s) for swap in ${skuDir}: hero=${existsSync(hero)} view=${existsSync(view)}`);
  }
  renameSync(hero, tmp);
  renameSync(view, hero);
  renameSync(tmp, view);
}

for (const [sku, pick] of Object.entries(PICKS)) {
  const dir = join(OUT_ROOT, sku);
  swap(dir, pick);
  console.log(`  ✓ ${sku}: hero <-> view-${pick}`);
}

console.log('\nHero remap complete.');
