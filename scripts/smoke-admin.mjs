// Drives the admin panel end-to-end in a real browser: logs in, then
// visits every page and asserts it rendered (heading present, no Next.js
// error overlay). Screenshots the dashboard. Run with the dev server up:
//   npx tsx -e ... no — plain node with env:
//   node --env-file=.env.local scripts/smoke-admin.mjs
import { chromium } from 'playwright';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error('ADMIN_EMAIL / ADMIN_PASSWORD missing (use --env-file=.env.local)');
  process.exit(1);
}

const PAGES = [
  ['/admin', 'Dashboard'],
  ['/admin/orders', 'Orders'],
  ['/admin/products', 'Products'],
  ['/admin/products/new', 'Add product'],
  ['/admin/ai-sessions', 'AI sessions'],
  ['/admin/subscribers', 'Subscribers'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console.error: ${m.text()}`);
});

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exitCode = 1;
}

// ── Login ──
await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
await page.fill('#email', EMAIL);
await page.fill('#password', PASSWORD);
await page.click('button[type="submit"]');
await page.waitForURL(`${BASE}/admin`, { timeout: 15000 }).catch(() => {});
if (!page.url().includes('/admin')) fail(`login did not redirect (at ${page.url()})`);
else console.log('✓ logged in');

// ── Walk pages ──
// Real errors = uncaught page exceptions (pageerror). The Next.js dev
// build injects a <nextjs-portal> for its dev-tools indicator on EVERY
// page, so that element's presence is not an error signal — the actual
// error overlay is a dialog with [data-nextjs-dialog].
for (const [path, expectText] of PAGES) {
  const pageErrors = [];
  const onErr = (e) => pageErrors.push(e.message);
  page.on('pageerror', onErr);
  const res = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  const status = res?.status();
  const errorDialog = await page.locator('[data-nextjs-dialog]').count();
  const bodyText = await page.locator('body').innerText();
  page.off('pageerror', onErr);
  const ok = status === 200 && errorDialog === 0 && pageErrors.length === 0 && bodyText.includes(expectText);
  if (ok) console.log(`✓ ${path}  (${status}, "${expectText}" present)`);
  else fail(`${path}  status=${status} errorDialog=${errorDialog} hasText=${bodyText.includes(expectText)} pageErrors=${pageErrors.length}`);
  if (pageErrors.length) console.error(`   ${pageErrors.join('\n   ')}`);
}

// ── Screenshot dashboard ──
await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'scripts/smoke-out/admin-dashboard.png', fullPage: true });
console.log('✓ screenshot → scripts/smoke-out/admin-dashboard.png');

// ── Visit one order detail if any exist ──
const firstOrder = page.locator('a[href^="/admin/orders/"]').first();
if (await firstOrder.count()) {
  const href = await firstOrder.getAttribute('href');
  await page.goto(`${BASE}${href}`, { waitUntil: 'networkidle' });
  const errDialog = await page.locator('[data-nextjs-dialog]').count();
  if (errDialog === 0) console.log(`✓ order detail ${href} rendered`);
  else fail(`order detail ${href} had error dialog`);
  await page.screenshot({ path: 'scripts/smoke-out/admin-order-detail.png', fullPage: true });
}

await browser.close();
console.log(process.exitCode ? '\n✗ smoke finished with failures' : '\n✓ all admin pages OK');
