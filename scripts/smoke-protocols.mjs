// Verifies protocol (bundle) management: edit price + reorder products
// (confirmed via the public /api/bundles endpoint, then restored), and
// create + delete a throwaway protocol through the confirm dialog.
import { chromium } from 'playwright';
import postgres from 'postgres';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const { ADMIN_EMAIL: EMAIL, ADMIN_PASSWORD: PASSWORD } = process.env;
const SLUG = 'clear-skin-protocol';
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const fail = (m) => { console.error(`✗ ${m}`); process.exitCode = 1; };

// capture original state
const [bundle] = await sql`SELECT id, price_pkr FROM bundles WHERE slug = ${SLUG} LIMIT 1`;
const origItems = await sql`SELECT product_id FROM bundle_items WHERE bundle_id = ${bundle.id} ORDER BY position`;
const origIds = origItems.map((r) => r.product_id);
const newPrice = bundle.price_pkr + 100;
console.log(`protocol ${SLUG} (${bundle.id}) price=${bundle.price_pkr} items=${origIds.length}`);

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 } })).newPage();

try {
  await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
  await page.fill('#email', EMAIL);
  await page.fill('#password', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/admin`, { timeout: 15000 });
  console.log('✓ logged in');

  // list
  await page.goto(`${BASE}/admin/protocols`, { waitUntil: 'networkidle' });
  (await page.locator('body').innerText()).includes(SLUG)
    ? console.log('✓ protocols list shows the kit')
    : fail('protocol missing from list');
  await page.screenshot({ path: 'scripts/smoke-out/admin-protocols.png', fullPage: true });

  // edit page
  await page.goto(`${BASE}/admin/protocols/${bundle.id}`, { waitUntil: 'networkidle' });

  // change price + save details
  await page.fill('#price', String(newPrice));
  let patch = page.waitForResponse((r) => r.url().includes(`/api/admin/protocols/${bundle.id}`) && r.request().method() === 'PATCH', { timeout: 15000 });
  await page.getByRole('button', { name: 'Save details' }).click();
  await patch;
  console.log('✓ saved new kit price');

  // reorder: move first product down, then save composition
  await page.getByRole('button', { name: 'Move down' }).first().click();
  patch = page.waitForResponse((r) => r.url().includes(`/api/admin/protocols/${bundle.id}`) && r.request().method() === 'PATCH', { timeout: 15000 });
  await page.getByRole('button', { name: 'Save composition' }).click();
  await patch;
  console.log('✓ saved reordered composition');
  await page.screenshot({ path: 'scripts/smoke-out/admin-protocol-edit.png', fullPage: true });

  // verify via the PUBLIC bundles API
  const api = await (await fetch(`${BASE}/api/bundles/${SLUG}`)).json();
  const apiIds = api.bundle.items.map((p) => p.id);
  const priceOk = api.bundle.pricePkr === newPrice;
  const orderOk = origIds.length < 2 || apiIds[0] === origIds[1]; // first moved down → old #2 is now #1
  priceOk ? console.log('✓ public API reflects new price') : fail(`API price wrong (${api.bundle.pricePkr})`);
  orderOk ? console.log('✓ public API reflects new product order') : fail('API order unchanged');

  // create a throwaway protocol → lands on its edit page
  await page.goto(`${BASE}/admin/protocols/new`, { waitUntil: 'networkidle' });
  await page.fill('#slug', 'zz-smoke-protocol');
  await page.fill('#name', 'ZZ Smoke Protocol');
  await page.fill('#concern', 'acne');
  await page.fill('#price', '999');
  await page.getByRole('button', { name: 'Create protocol' }).click();
  await page.waitForURL(/\/admin\/protocols\/[0-9a-f-]{36}$/, { timeout: 15000 });
  const newId = page.url().split('/').pop();
  console.log(`✓ created throwaway protocol (${newId})`);

  // delete it via the confirm dialog
  await page.getByRole('button', { name: 'Delete protocol' }).click();
  await page.waitForTimeout(400);
  (await page.getByRole('alertdialog').count()) ? console.log('✓ delete confirmation dialog appeared') : fail('no confirm dialog');
  await page.locator('[data-slot="alert-dialog-content"]').getByRole('button', { name: 'Delete protocol' }).click();
  await page.waitForURL(`${BASE}/admin/protocols`, { timeout: 10000 }).catch(() => {});
  const after = await page.goto(`${BASE}/admin/protocols/${newId}`, { waitUntil: 'networkidle' });
  after?.status() === 404 ? console.log('✓ throwaway protocol deleted (404)') : fail(`not deleted (status ${after?.status()})`);
} finally {
  await browser.close();
  // restore original price + composition exactly
  await sql`UPDATE bundles SET price_pkr = ${bundle.price_pkr}, updated_at = now() WHERE id = ${bundle.id}`;
  await sql`DELETE FROM bundle_items WHERE bundle_id = ${bundle.id}`;
  for (let i = 0; i < origIds.length; i++) {
    await sql`INSERT INTO bundle_items (bundle_id, product_id, position) VALUES (${bundle.id}, ${origIds[i]}, ${i})`;
  }
  await sql`DELETE FROM bundles WHERE slug = 'zz-smoke-protocol'`;
  await sql.end();
  console.log('✓ restored original protocol state');
  console.log(process.exitCode ? '\n✗ protocols smoke failed' : '\n✓ protocols management OK');
}
