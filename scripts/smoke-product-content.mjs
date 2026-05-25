// Verifies admin product-content editing reaches the public PDP.
// Edits a benefit on a real product via the admin UI, confirms it shows
// on /products/<sku>, then restores the original content from the DB.
import { chromium } from 'playwright';
import postgres from 'postgres';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const { ADMIN_EMAIL: EMAIL, ADMIN_PASSWORD: PASSWORD } = process.env;
const SKU = 'vitc';
const MARKER = `SMOKE-BENEFIT-${Date.now()}`;
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const fail = (m) => { console.error(`✗ ${m}`); process.exitCode = 1; };

const [{ id: productId, content: original }] = await sql`SELECT id, content FROM products WHERE sku = ${SKU} LIMIT 1`;
console.log(`editing product ${SKU} (${productId})`);

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1100 } })).newPage();

try {
  // login
  await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
  await page.fill('#email', EMAIL);
  await page.fill('#password', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/admin`, { timeout: 15000 });

  // open product edit page
  await page.goto(`${BASE}/admin/products/${productId}`, { waitUntil: 'networkidle' });
  const hasEditor = (await page.locator('text=Storefront content').count()) > 0;
  hasEditor ? console.log('✓ storefront content editor present on edit page') : fail('content editor missing');

  // append a marker benefit and save
  const current = await page.locator('#benefits').inputValue();
  await page.fill('#benefits', `${current}\n${MARKER}`);
  const patch = page.waitForResponse((r) => r.url().includes(`/api/admin/products/${productId}`) && r.request().method() === 'PATCH', { timeout: 15000 });
  await page.getByRole('button', { name: 'Save storefront content' }).click();
  const resp = await patch;
  resp.ok() ? console.log('✓ content PATCH saved (200)') : fail(`content save failed (${resp.status()})`);
  await page.getByText('Saved', { exact: true }).waitFor({ timeout: 5000 }).catch(() => {});
  await page.screenshot({ path: 'scripts/smoke-out/admin-content-editor.png', fullPage: true });

  // verify on the public PDP
  await page.goto(`${BASE}/products/${SKU}`, { waitUntil: 'networkidle' });
  const body = await page.locator('body').innerText();
  body.includes(MARKER)
    ? console.log('✓ edited benefit appears on the public product page')
    : fail('edited benefit NOT visible on PDP');
  await page.screenshot({ path: 'scripts/smoke-out/pdp-after-edit.png', fullPage: true });
} finally {
  await browser.close();
  // restore original content exactly as it was
  await sql`UPDATE products SET content = ${JSON.stringify(original)}::jsonb, updated_at = now() WHERE id = ${productId}`;
  await sql.end();
  console.log('✓ restored original content');
  console.log(process.exitCode ? '\n✗ product-content smoke failed' : '\n✓ product content editing OK');
}
