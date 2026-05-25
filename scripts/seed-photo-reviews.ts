/**
 * Seeds 2 product-specific reviews for each of the 8 products (16 total),
 * each carrying a REAL product photo (converted to public/reviews/<sku>-N.webp
 * from the client's photo set). Reviews surface on the matching product page
 * via subject_type='product' / subject_ref=<sku>.
 *
 * The review WORDING is original placeholder copy — illustrative, not real
 * customer testimonials. The PHOTOS are the brand's own product shots. All
 * rows are source='seed-demo' so they can be cleared in one statement before
 * launch (replace with real, consented reviews then):
 *
 *   DELETE FROM reviews WHERE source = 'seed-demo';
 *   (also delete the public/reviews/*.webp files if not keeping them)
 *
 * Re-running this script deletes the previous seed-demo rows first, then
 * re-inserts — so it's idempotent.
 *
 * Run: npx tsx --env-file=.env.local scripts/seed-photo-reviews.ts
 */
import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing');
  process.exit(1);
}
const sql = postgres(process.env.DATABASE_URL, { prepare: false });

type R = { name: string; city: string; rating: number; body: string };
type Product = { name: string; reviews: [R, R] };

// sku → product display name + its two reviews. reviews[0] gets <sku>-1.webp,
// reviews[1] gets <sku>-2.webp.
const PRODUCTS: Record<string, Product> = {
  prep: {
    name: 'Radiance Prep Cleanser',
    reviews: [
      { name: 'Areeba N.', city: 'Lahore', rating: 5, body: 'A gentle cleanser that actually prepares my skin instead of stripping it. After a few weeks my face looks clearer and it never feels tight afterwards.' },
      { name: 'Hassan R.', city: 'Islamabad', rating: 4, body: 'Lathers just enough and rinses clean without that squeaky, dry feeling. My serums sink in far better now that I start the routine with this.' },
    ],
  },
  rescue: {
    name: 'Clarifying Rescue Face Wash',
    reviews: [
      { name: 'Bilal K.', city: 'Faisalabad', rating: 5, body: 'Cleared the little bumps along my forehead within a month and keeps the oiliness in check through the day. It does not over-dry like other acne washes I have tried.' },
      { name: 'Sana T.', city: 'Karachi', rating: 4, body: 'Mild on the skin but it genuinely keeps breakouts down. A small amount foams up plenty, so the bottle lasts a long time.' },
    ],
  },
  acne: {
    name: 'Clarifying Acne Serum',
    reviews: [
      { name: 'Zoya M.', city: 'Karachi', rating: 5, body: 'Twelve weeks in and the active breakouts are gone — even the older marks along my jaw are fading. Easily the best my skin has looked in years.' },
      { name: 'Ahmed F.', city: 'Lahore', rating: 5, body: 'Niacinamide and azelaic at strengths that actually do something. No purging, no irritation, just steadily clearer skin week after week.' },
    ],
  },
  vitc: {
    name: 'Vitamin CE Ferrulic Serum',
    reviews: [
      { name: 'Nida A.', city: 'Lahore', rating: 5, body: 'My skin looks brighter and more even in photos now. It absorbs quickly with no stickiness and layers nicely under sunscreen.' },
      { name: 'Faisal R.', city: 'Islamabad', rating: 4, body: 'A few weeks of morning use and the dull patches are lifting. The glow is real as long as you stay consistent with it.' },
    ],
  },
  reti: {
    name: 'Retinol Serum',
    reviews: [
      { name: 'Saad M.', city: 'Lahore', rating: 5, body: 'Introduced it slowly the way the card suggests and never peeled once. The fine lines around my eyes have softened over a couple of months.' },
      { name: 'Ayesha K.', city: 'Karachi', rating: 4, body: 'Gentle for a retinol — my cheeks feel smoother and look firmer in the mornings. Start twice a week and build up from there.' },
    ],
  },
  ha: {
    name: 'Hyaluronic Acid Serum',
    reviews: [
      { name: 'Rabia N.', city: 'Rawalpindi', rating: 5, body: 'Plumps and hydrates without any heaviness, and my dry patches have completely settled. Lovely layered under moisturiser and SPF.' },
      { name: 'Owais T.', city: 'Islamabad', rating: 4, body: 'A lightweight hydration layer that makes my skin feel bouncier all day. It calms the tightness I used to get sitting in the AC.' },
    ],
  },
  light: {
    name: 'Radiance Lightening Cream',
    reviews: [
      { name: 'Sadia R.', city: 'Karachi', rating: 5, body: 'The melasma around my mouth has visibly lightened and there has been no irritation at all. Patience plus daily SPF really pays off with this one.' },
      { name: 'Noor F.', city: 'Lahore', rating: 4, body: 'Evened out my tone over a couple of months. The dark spots left behind by old breakouts are noticeably softer now.' },
    ],
  },
  spf: {
    name: 'Barrier Restore SPF 50+',
    reviews: [
      { name: 'Zainab M.', city: 'Islamabad', rating: 5, body: 'Genuinely the best sunscreen I have used in Pakistan — no white cast, no grease, and it does not sting my sensitive skin.' },
      { name: 'Aiman K.', city: 'Karachi', rating: 4, body: 'Sits beautifully under makeup and keeps my barrier calm. Just remember to reapply around midday and you are sorted.' },
    ],
  },
};

async function main() {
  console.log('── clearing previous seed-demo reviews ──');
  const del = await sql`DELETE FROM reviews WHERE source = 'seed-demo'`;
  console.log(`  removed ${del.count}`);

  let n = 0;
  const base = new Date();
  for (const [sku, product] of Object.entries(PRODUCTS)) {
    for (let i = 0; i < product.reviews.length; i++) {
      const r = product.reviews[i];
      const photo = {
        src: `/reviews/${sku}-${i + 1}.webp`,
        alt: `${product.name} — customer photo`,
        caption: product.name,
      };
      const d = new Date(base.getTime() - n * 3 * 24 * 60 * 60 * 1000); // ~3 days apart
      await sql`
        INSERT INTO reviews
          (name, location, rating, protocol, subject_type, subject_ref, body, verified, status, source, review_date, photos)
        VALUES
          (${r.name}, ${r.city}, ${r.rating}, ${product.name}, 'product', ${sku}, ${r.body},
           true, 'approved', 'seed-demo', ${d.toISOString()}, ${sql.json([photo])})`;
      n++;
    }
  }
  console.log(`\n✓ inserted ${n} photo reviews (2 per product)`);

  const rows = await sql<Array<{ subject_ref: string; c: number; withp: number }>>`
    SELECT subject_ref, count(*)::int c, count(*) FILTER (WHERE jsonb_array_length(photos) > 0)::int withp
    FROM reviews WHERE source='seed-demo' GROUP BY subject_ref ORDER BY subject_ref`;
  console.log('\nseeded per product (sku → reviews / with-photo):');
  for (const r of rows) console.log(`  ${r.subject_ref.padEnd(8)} ${r.c} / ${r.withp}`);

  await sql.end();
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
