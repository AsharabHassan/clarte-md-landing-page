import { test, expect } from '@playwright/test';

/**
 * Sub-project #6 storefront acceptance — Phase G Task 33.
 *
 * Exercises the new universal-checkout funnel introduced in v0.6:
 *   home → click into a protocol → add bundle to cart →
 *   /cart → /checkout → fill form → place order →
 *   /order/[number]?phone=XXXX renders the tracking page
 *
 * Distinct from full-flow.spec.ts which exercises the inline intake
 * form on /acne (sub-project #2's path, still supported).
 */
test('storefront end-to-end via universal cart + checkout', async ({ page }) => {
  // 1. Homepage renders with brand heading. Dev server compiles each
  //    route on first request — give the h1 assertion a generous
  //    timeout so cold compiles don't flake.
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('h1').first()).toContainText(/skincare|Clarté/i, {
    timeout: 20_000,
  });

  // 2. Navigate into the acne protocol page
  await page.goto('/acne', { waitUntil: 'networkidle' });
  await expect(page.locator('h1').first()).toContainText(/clinical answer to acne/i, {
    timeout: 20_000,
  });

  // 3. Add the bundle via the global hook exposed by client.tsx — same
  //    bridge the inline page CTAs use. This fires the
  //    `clarte:add-bundle` window event the CartProvider listens for.
  await page.evaluate(() => (window as { addBundleToCart?: () => void }).addBundleToCart?.());

  // 4. Go to the cart; expect the bundle row + a "Proceed to checkout" CTA
  await page.goto('/cart', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: /your cart/i })).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.locator('body')).toContainText(/clear-skin-protocol|Clear Skin/i);

  // 5. Navigate to checkout via the in-cart CTA so the CartProvider's
  //    localStorage rehydration is settled before /checkout mounts.
  //    Going direct via page.goto('/checkout') races the empty-cart
  //    bounce-back to /cart in CartProvider's initial render.
  await page.getByRole('link', { name: /proceed to checkout/i }).click();
  await page.waitForURL(/\/checkout/, { timeout: 10_000 });
  await expect(page.locator('#checkoutForm')).toBeVisible({ timeout: 20_000 });

  // 6. Fill required fields
  const uniquePhone = `0300${Date.now().toString().slice(-7)}`;
  const phoneLast4 = uniquePhone.slice(-4);
  await page.fill('input[name="name"]', 'Storefront E2E');
  await page.fill('input[name="phone"]', uniquePhone);
  await page.fill('input[name="email"]', 'storefront-e2e@example.com');
  await page.fill('input[name="address"]', 'House 9, Street 9, DHA');
  await page.selectOption('select[name="city"]', 'Lahore');

  // 7. Submit — capture the create-order response status. We don't
  //    read its body: CheckoutForm calls window.location.assign() the
  //    moment it resolves, which tears down the page context before
  //    Playwright can buffer the body (status arrives, body is lost).
  //    The order number is recoverable from the navigated URL below.
  const responsePromise = page.waitForResponse(
    (r) =>
      r.url().includes('/api/create-order') &&
      r.request().method() === 'POST',
    { timeout: 15_000 },
  );
  await page.getByRole('button', { name: /place order/i }).click();
  const orderResp = await responsePromise;
  expect(orderResp.status()).toBe(200);

  // 8. Checkout navigates to /order/[number]?phone=XXXX on success.
  //    Extract the order number from the URL itself — that's the
  //    server-authoritative ID and the only reliable source post-nav.
  await page.waitForURL(/\/order\/CLM-\d{4}-\d{4,}\?phone=\d{4}/, {
    timeout: 10_000,
  });
  const urlMatch = page.url().match(/\/order\/(CLM-\d{4}-\d{4,})\?phone=/);
  expect(urlMatch).not.toBeNull();
  const orderNumber = urlMatch![1];
  await expect(page.locator('body')).toContainText(orderNumber);
  await expect(page.locator('body')).toContainText(/order received|preparing|on the way/i);

  // 9. The phone-last-4 verification round-trip really hit /api/order
  await expect(page.locator('body')).toContainText(/items|total/i);

  // 10. Sanity check: /sitemap.xml and /robots.txt respond
  const sitemapResp = await page.request.get('/sitemap.xml');
  expect(sitemapResp.status()).toBe(200);
  const sitemap = await sitemapResp.text();
  expect(sitemap).toContain('/acne');
  expect(sitemap).toContain('/legal/privacy');

  const robotsResp = await page.request.get('/robots.txt');
  expect(robotsResp.status()).toBe(200);
  expect(await robotsResp.text()).toMatch(/Disallow:\s*\/admin/);
});
