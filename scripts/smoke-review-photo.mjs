import { chromium } from 'playwright';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';
import path from 'node:path';
const BASE = 'http://localhost:3000';
const { ADMIN_EMAIL: AE, ADMIN_PASSWORD: AP } = process.env;
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const fail = (m) => { console.error('✗ ' + m); process.exitCode = 1; };
const PHONE = '03007650001', EMAIL = 'photo-review@example.com';
const MARK = `PHOTO-REVIEW-${Date.now()}`;
const IMG = path.resolve('public/products/prep/hero.webp');

const [cust] = await sql`INSERT INTO customers (name, phone, email, city) VALUES ('ZZ Photo Reviewer', ${PHONE}, ${EMAIL}, 'Testville') RETURNING id`;
const [prod] = await sql`SELECT name FROM products WHERE active = true ORDER BY name LIMIT 1`;
console.log('seeded customer', cust.id, '| product to select:', prod.name);

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 } })).newPage();
let reviewId = null, photoPath = null;
try {
  // login → review form
  await page.goto(BASE + '/account/login?next=/account/reviews/new', { waitUntil: 'networkidle' });
  await page.fill('#phone', PHONE); await page.fill('#email', EMAIL);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/account\/reviews\/new$/, { timeout: 15000 });

  // product option present in the select?
  const hasProduct = await page.locator('#subject').evaluate(
    (sel, name) => Array.from(sel.querySelectorAll('optgroup[label="Individual products"] option')).some((o) => o.value === name),
    prod.name,
  );
  hasProduct ? console.log('✓ product options present in selector') : fail('no product option for ' + prod.name);

  // fill: rating, product, body, photo
  await page.getByRole('button', { name: '5 stars' }).click();
  await page.locator('#subject').selectOption(prod.name);
  await page.fill('#body', MARK + ' — single product worked great for me, very pleased.');
  await page.setInputFiles('input[type=file]', IMG);
  await page.waitForTimeout(600);
  (await page.locator('img[alt="hero.webp"]').count()) ? console.log('✓ photo preview shown in form') : fail('photo preview missing');
  await page.getByRole('button', { name: 'Submit review' }).click();
  await page.getByText('review submitted', { exact: false }).waitFor({ timeout: 15000 });
  console.log('✓ submitted with product + photo');

  // DB checks
  const [row] = await sql`SELECT id, status, protocol, photos FROM reviews WHERE customer_id = ${cust.id} ORDER BY created_at DESC LIMIT 1`;
  reviewId = row?.id;
  const photos = row?.photos ?? [];
  (row?.status === 'pending' && row?.protocol === prod.name) ? console.log(`✓ pending, attributed to product "${row.protocol}"`) : fail('row wrong: ' + JSON.stringify({ s: row?.status, p: row?.protocol }));
  (Array.isArray(photos) && photos.length === 1 && photos[0].src.includes('/review-photos/')) ? console.log('✓ photo stored: ' + photos[0].src.split('/review-photos/')[1]) : fail('photo not stored: ' + JSON.stringify(photos));
  if (photos[0]?.src) {
    photoPath = decodeURIComponent(photos[0].src.split('/review-photos/')[1]);
    const r = await fetch(photos[0].src);
    r.ok ? console.log(`✓ photo public URL loads (${r.status}, ${r.headers.get('content-type')})`) : fail('photo URL not accessible: ' + r.status);
  }

  // admin sees photo thumbnail
  const actx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const ap = await actx.newPage();
  await ap.goto(BASE + '/admin/login', { waitUntil: 'networkidle' });
  await ap.fill('#email', AE); await ap.fill('#password', AP);
  await ap.click('button[type="submit"]');
  await ap.waitForTimeout(3000); // let signInWithPassword set the session cookie
  await ap.goto(BASE + '/admin/reviews?status=pending', { waitUntil: 'networkidle' });
  if (ap.url().includes('/admin/login')) fail('admin login did not authenticate');
  const card = ap.locator('[data-slot="card"]').filter({ hasText: MARK });
  const thumb = card.locator('[aria-label^="View photo"] img').first();
  (await thumb.count()) && (await thumb.evaluate(i => i.complete && i.naturalWidth > 0))
    ? console.log('✓ admin shows the uploaded photo thumbnail (loaded)') : fail('admin photo thumbnail missing/broken');
  await actx.close();

  // approve → storefront shows
  await sql`UPDATE reviews SET status='approved' WHERE id = ${reviewId}`;
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const sec = page.locator('section:has-text("Real skin")');
  ((await sec.count()) && (await sec.innerText()).includes(MARK)) ? console.log('✓ approved review shows on storefront') : fail('approved review not on storefront');
} catch (e) {
  fail('exception: ' + e.message);
} finally {
  await browser.close().catch(() => {});
  if (photoPath) { try { await supa.storage.from('review-photos').remove([photoPath]); } catch {} }
  if (reviewId) await sql`DELETE FROM reviews WHERE id = ${reviewId}`;
  await sql`DELETE FROM reviews WHERE customer_id = ${cust.id}`;
  await sql`DELETE FROM customers WHERE id = ${cust.id}`;
  await sql`DELETE FROM order_lookups WHERE target_order_number LIKE 'portal-login:%' AND created_at > now() - interval '10 minutes'`;
  await sql.end();
  console.log('✓ cleaned up');
  console.log(process.exitCode ? '\n✗ review photo smoke failed' : '\n✓ review photo + product selection OK');
}
