import { chromium } from 'playwright';
const B = 'http://localhost:3000';
const NAMES = {
  prep: ['Areeba N.', 'Hassan R.'], rescue: ['Bilal K.', 'Sana T.'], acne: ['Zoya M.', 'Ahmed F.'],
  vitc: ['Nida A.', 'Faisal R.'], reti: ['Saad M.', 'Ayesha K.'], ha: ['Rabia N.', 'Owais T.'],
  light: ['Sadia R.', 'Noor F.'], spf: ['Zainab M.', 'Aiman K.'],
};
const decode = (src) => {
  if (!src) return '';
  const m = src.split('url=')[1];
  return m ? decodeURIComponent(m.split('&')[0]) : src;
};
const br = await chromium.launch();
const p = await (await br.newContext({ viewport: { width: 1280, height: 1100 } })).newPage();
let bad = false; const fail = (m) => { console.error('  ✗ ' + m); bad = true; };

for (const [sku, names] of Object.entries(NAMES)) {
  await p.goto(`${B}/products/${sku}`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  const sec = p.locator('section:has-text("Reviews for")').first();
  if (!(await sec.count())) { fail(`${sku}: no "Reviews for" section`); continue; }
  const txt = await sec.innerText();
  const hasNames = names.every((n) => txt.includes(n));            // specific reviews are a must
  const cards = await sec.locator('article').count();             // total reviews shown
  const srcs = await sec.locator('button[aria-label^="View photo"] img').evaluateAll(
    (imgs) => imgs.map((i) => i.getAttribute('src')),
  );
  const ownPhoto = srcs.map(decode).some((s) => s.includes(`/reviews/${sku}-`)); // this product's photo present
  (hasNames && cards >= 6 && ownPhoto)
    ? console.log(`  ✓ ${sku.padEnd(7)} ${cards} reviews · both specific shown · own photo present`)
    : fail(`${sku}: specificNames=${hasNames} cards=${cards} ownPhoto=${ownPhoto}`);
}

// acne: confirm a thumbnail actually renders + capture
await p.goto(`${B}/products/acne`, { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
const sec = p.locator('section:has-text("Reviews for")').first();
await sec.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
const acneThumb = sec.locator('button[aria-label^="View photo"] img').first();
const loaded = await acneThumb.evaluate((i) => i.complete && i.naturalWidth > 0).catch(() => false);
loaded ? console.log('  ✓ acne photo thumbnail renders (naturalWidth>0)') : fail('acne thumbnail broken');
await sec.screenshot({ path: 'scripts/smoke-out/photo-reviews-acne.png' });

// protocol page still shows reviews
await p.goto(`${B}/acne`, { waitUntil: 'networkidle' });
await p.waitForTimeout(700);
(await p.locator('section:has-text("Reviews for")').count()) ? console.log('  ✓ protocol /acne shows reviews') : fail('protocol reviews missing');

// homepage random still works
await p.goto(B + '/', { waitUntil: 'networkidle' });
(await p.locator('section:has-text("What patients say")').count()) ? console.log('  ✓ homepage reviews render') : fail('homepage reviews missing');

await br.close();
console.log(bad ? '\n✗ FAILED' : '\n✓ photo reviews verified (≥6 per page, specific guaranteed)');
process.exit(bad ? 1 : 0);
