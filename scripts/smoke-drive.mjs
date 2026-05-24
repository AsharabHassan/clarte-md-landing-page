import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const OUT = 'C:\\Users\\786\\Downloads\\Dr Ahmad clartemd\\Dr Ahmad clartemd\\scripts\\smoke-out';
if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const FORBIDDEN = [
  'ISO 22716',
  'GMP',
  '2× refund',
  '2x refund',
  'Free shipping over',
  'Add Rs.',
  'free shipping',
  'MMXXVI',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
});
page.on('pageerror', (e) => consoleErrors.push(`[pageerror] ${e.message}`));

async function visit(label, path, opts = {}) {
  console.log(`\n→ ${label}  (${path})`);
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 60000 });
  const html = await page.content();
  const hits = FORBIDDEN.filter((kw) => html.toLowerCase().includes(kw.toLowerCase()));
  console.log(`  forbidden hits: ${hits.length === 0 ? 'none ✓' : JSON.stringify(hits)}`);
  const safe = label.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  await page.screenshot({ path: `${OUT}\\${safe}.png`, fullPage: opts.full ?? false });
  return { label, path, hits };
}

const results = [];
results.push(await visit('home', '/', { full: true }));
results.push(await visit('about', '/about', { full: true }));
results.push(await visit('products', '/products', { full: true }));
results.push(await visit('acne-protocol', '/acne'));
results.push(await visit('legal-shipping', '/legal/shipping', { full: true }));

// Seed cart in localStorage with a small order (< Rs 4000) AND a large order
// to confirm both still pay flat Rs. 250 shipping.
console.log('\n→ seeding cart with bundle in localStorage');
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  const cart = {
    items: [{ type: 'bundle', slug: 'clear-skin-protocol', qty: 1 }],
    createdAt: Date.now(),
  };
  localStorage.setItem('clarte_cart_v1', JSON.stringify(cart));
});
results.push(await visit('cart-large-order', '/cart', { full: true }));
results.push(await visit('checkout-large-order', '/checkout', { full: true }));

// Capture the OrderSummary text specifically — this is the diff-bearing UI.
const summaryText = await page.locator('.order-summary').first().innerText().catch(() => '(no .order-summary on page)');
console.log('\n--- OrderSummary on /checkout ---');
console.log(summaryText);
console.log('---------------------------------');

// And a small-cart case: vitc product only (Rs 2,250, was below threshold).
console.log('\n→ seeding cart with single product (small order)');
await page.evaluate(() => {
  const cart = {
    items: [{ type: 'product', sku: 'vitc', qty: 1 }],
    createdAt: Date.now(),
  };
  localStorage.setItem('clarte_cart_v1', JSON.stringify(cart));
});
results.push(await visit('cart-small-order', '/cart', { full: true }));
results.push(await visit('checkout-small-order', '/checkout', { full: true }));
const smallText = await page.locator('.order-summary').first().innerText().catch(() => '(no .order-summary)');
console.log('\n--- OrderSummary on /checkout (small order) ---');
console.log(smallText);
console.log('---------------------------------');

console.log('\n=== summary ===');
for (const r of results) {
  console.log(`${r.hits.length === 0 ? 'OK ' : 'BAD'} ${r.label} (${r.path}) hits=${r.hits.length}`);
}
console.log(`\nconsole errors: ${consoleErrors.length}`);
for (const e of consoleErrors.slice(0, 20)) console.log('  ' + e);

await browser.close();
process.exit(results.some((r) => r.hits.length > 0) ? 1 : 0);
