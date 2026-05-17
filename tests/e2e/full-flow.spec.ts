import { test, expect } from '@playwright/test';

test('end-to-end: visit acne page, place order (no AI step), see success block', async ({
  page,
}) => {
  // 1. Visit the migrated page (hero h1 is "A clinical answer to acne...")
  await page.goto('/acne');
  await expect(page.locator('h1').first()).toContainText(/clinical answer to acne/i);

  // 2. Add bundle to cart via the global hook exposed in client.tsx
  await page.evaluate(() => (window as any).addBundleToCart?.());

  // 3. Fill the order form
  await page.fill('#fName', 'E2E Test');
  await page.fill('#fPhone', '03001234567');
  await page.fill('#fEmail', 'e2e@example.com');
  await page.fill('#fAddr', 'House 1, Street 1, Gulberg');
  await page.selectOption('#fCity', 'Lahore');

  // 4. Submit (capture the create-order response for diagnostics on failure)
  const responsePromise = page.waitForResponse(
    (r) => r.url().includes('/api/create-order'),
    { timeout: 15_000 },
  );
  await page.click('#submitBtn');
  const orderResp = await responsePromise;
  const orderJson = await orderResp.json().catch(() => ({}));
  console.log('create-order:', orderResp.status(), JSON.stringify(orderJson));

  expect(orderResp.status()).toBe(200);
  expect(orderJson.ok).toBe(true);
  expect(orderJson.order_number).toMatch(/^CLM-\d{4}-\d{4,}$/);

  // 5. The DOM reveal flips class="hide" off intakeGrid and adds class="show"
  //    to successBlock. Wait for that to settle.
  await expect(page.locator('#successBlock')).toHaveClass(/show/, { timeout: 5_000 });
});
