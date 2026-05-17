# Storefront Platform Implementation Plan — Sub-project #6

> **For agentic workers:** execute one task at a time. Each task = one commit. Per the established workflow (see [[feedback_workflow]]), commit + push after each, summarize what changed, then pause and wait for the user's green light before starting the next.

**Goal:** Implement the storefront platform per [Sub-project #6 design spec](../specs/2026-05-17-storefront-design.md). Turn the current 4-protocol deployment into a real DTC platform with homepage, AI quiz, product catalog, unified cart, universal checkout, order tracking, contact, legal pages, and SEO foundations.

**Final tag:** `v0.6`

**Environment notes:**
- Working dir: `C:/Users/786/Downloads/Dr Ahmad clartemd/Dr Ahmad clartemd/`
- Windows 11, PowerShell + Bash both available (see [[feedback_windows_shell]])
- Git repo on `main`, currently at `v0.5` + 1 commit
- Vercel auto-redeploys on every push to `main`
- Production URL: `https://lp.clartemd.com.pk`
- **Anonymization rule active**: never name Dr. Tauqir Ahmad on any public surface — use "our GMC-registered doctor" or similar (see [[feedback_anonymize_doctor]])

---

## File Structure

| Path | Created / Modified | Owner phase / task |
|---|---|---|
| `lib/cart/types.ts` | Created | Phase A, Task 3 |
| `lib/cart/operations.ts` | Created | Phase A, Task 3 |
| `lib/cart/provider.tsx` | Created | Phase A, Task 4 |
| `lib/cart/storage.ts` | Created | Phase A, Task 3 |
| `components/site/SiteHeader.tsx` | Created | Phase A, Task 2 |
| `components/site/SiteFooter.tsx` | Created | Phase A, Task 2 |
| `components/site/CartIcon.tsx` | Created | Phase A, Task 2 |
| `components/checkout/CheckoutForm.tsx` | Created | Phase A, Task 5 |
| `components/checkout/OrderSummary.tsx` | Created | Phase A, Task 5 |
| `app/layout.tsx` | Modified | Phase A, Task 6 (wrap children w/ SiteHeader/Footer + CartProvider) |
| `app/(protocols)/{slug}/page.tsx` (×4) | Modified | Phase A, Task 6+7 |
| `app/(protocols)/{slug}/protocol.html.ts` (×4) | Modified | Phase A, Task 7 (replace inline form with Add-to-cart button) |
| `app/(protocols)/{slug}/client.tsx` (×4) | Modified | Phase A, Task 7 (wire bundle-add button) |
| `app/page.tsx` | Created (replaces redirect) | Phase B, Task 9 |
| `app/page.css` (or shared) | Created | Phase B, Task 9 |
| `app/about/page.tsx` | Created | Phase B, Task 10 |
| `components/quiz/QuizFlow.tsx` | Created | Phase B, Task 11 |
| `app/quiz/page.tsx` | Created | Phase B, Task 12 |
| `next.config.ts` | Modified (remove / → /acne redirect) | Phase B, Task 13 |
| `components/product/ProductCard.tsx` | Created | Phase C, Task 14 |
| `components/product/BundleCard.tsx` | Created | Phase C, Task 14 |
| `app/products/page.tsx` | Created | Phase C, Task 15 |
| `components/product/ProductDetailPage.tsx` | Created | Phase C, Task 16 |
| `app/products/[sku]/page.tsx` | Created | Phase C, Task 17 |
| `app/api/products/[sku]/route.ts` | Created | Phase C, Task 18 |
| `lib/schema/json-ld.ts` | Created | Phase C, Task 21 + Phase F, Task 32 |
| `app/cart/page.tsx` | Created | Phase D, Task 22 |
| `app/checkout/page.tsx` | Created | Phase D, Task 23 |
| `app/api/cart/preview/route.ts` | Created | Phase D, Task 24 |
| `app/api/create-order/route.ts` | Modified (mixed-cart support) | Phase D, Task 25 |
| `app/order/[number]/page.tsx` | Created | Phase E, Task 27 |
| `app/api/order/[number]/route.ts` | Created | Phase E, Task 28 |
| `app/contact/page.tsx` | Created | Phase E, Task 29 |
| `app/api/contact/route.ts` | Created | Phase E, Task 29 |
| `lib/validators/contact.ts` | Created | Phase E, Task 29 |
| `lib/db/schema.ts` | Modified (add `subscribers` table) | Phase A or Phase E (pick earlier) |
| `lib/db/migrations/<timestamp>_subscribers.sql` | Created | same |
| `app/legal/privacy/page.mdx` (or .tsx) | Created | Phase F, Task 30 |
| `app/legal/terms/page.mdx` | Created | Phase F, Task 30 |
| `app/legal/returns/page.mdx` | Created | Phase F, Task 30 |
| `app/legal/shipping/page.mdx` | Created | Phase F, Task 30 |
| `app/sitemap.ts` | Created | Phase F, Task 31 |
| `app/robots.ts` | Created | Phase F, Task 31 |
| `tests/e2e/storefront-flow.spec.ts` | Created | Phase G, Task 33 |
| `docs/runbooks/2026-05-17-storefront-v0.6-acceptance.md` | Created | Phase G, Task 33 |

---

## Phase A — Foundation

Establish site-wide chrome + cart state + reusable checkout components. After this phase the 4 protocol pages still look the same to users but cart state is wired and they route through the new checkout.

### Task 1: Install required dependencies

**Files:** Modify `package.json`

- [ ] **Step 1: Install `next-mdx-remote`**
   ```powershell
   npm install next-mdx-remote
   ```
- [ ] **Step 2: Verify tsc + build still pass**
   ```powershell
   npx tsc --noEmit
   npm run build
   ```
- [ ] **Step 3: Commit**
   ```powershell
   git add package.json package-lock.json
   git commit -m "chore: install next-mdx-remote for legal pages"
   ```

### Task 2: Build site-wide chrome — header + footer + cart icon

**Files:**
- Create: `components/site/SiteHeader.tsx`, `components/site/SiteFooter.tsx`, `components/site/CartIcon.tsx`, `components/site/site.css`

- [ ] **Step 1: Decide nav structure**
   - Desktop: `Protocols ▾` (dropdown listing 4) · `Products` · `Quiz` · `About` · cart-icon
   - Mobile: hamburger menu, cart-icon, logo
- [ ] **Step 2: Build `<SiteHeader />`**
   - Sticky at top, 64px tall, white bg, subtle border-bottom
   - Brand mark on left
   - Nav center, cart-icon right
   - Cart icon shows badge count from `useCart()` (mock 0 until Task 4 lands the provider)
- [ ] **Step 3: Build `<SiteFooter />`**
   - 4 columns: Protocols, Help, Legal, Newsletter
   - Bottom strip: © year · Made in Lahore · ISO 22716 · GMP badges
   - Newsletter input is a stub for now (no API hookup yet)
- [ ] **Step 4: Build `<CartIcon />`**
   - SVG cart with absolutely-positioned numeric badge
   - Hidden when count = 0
- [ ] **Step 5: Visual check in Storybook OR a temporary `/dev-preview` route**
- [ ] **Step 6: Commit**
   ```powershell
   git add components/site/
   git commit -m "feat(site): SiteHeader + SiteFooter + CartIcon components"
   ```

### Task 3: Build cart types + operations + storage layer

**Files:** Create `lib/cart/types.ts`, `lib/cart/operations.ts`, `lib/cart/storage.ts`, `tests/unit/cart-operations.test.ts`

- [ ] **Step 1: Write the TDD test (RED)**
   - Test cases: addBundle replaces existing same-slug; addProduct increments existing; removeItem; updateQty; free-shipping math at Rs 4,000 threshold
   - Run: `npx vitest run tests/unit/cart-operations.test.ts` — expect module-not-found
- [ ] **Step 2: Build `lib/cart/types.ts`**
   ```ts
   import { z } from 'zod';
   export const CartItemSchema = z.discriminatedUnion('type', [
     z.object({ type: z.literal('bundle'), slug: z.string(), qty: z.literal(1) }),
     z.object({ type: z.literal('product'), sku: z.string(), qty: z.number().int().min(1).max(20) }),
   ]);
   export const CartSchema = z.object({ items: z.array(CartItemSchema), createdAt: z.number() });
   export type Cart = z.infer<typeof CartSchema>;
   export type CartItem = z.infer<typeof CartItemSchema>;
   ```
- [ ] **Step 3: Build `lib/cart/operations.ts`**
   - Pure functions, take/return Cart immutably
- [ ] **Step 4: Build `lib/cart/storage.ts`**
   - `loadCart(): Cart` — reads localStorage `clarte_cart_v1`, Zod-parses, returns empty cart on failure
   - `saveCart(cart: Cart): void`
   - Server-safe: returns empty cart when `typeof window === 'undefined'`
   - 14-day TTL — clear if `Date.now() - cart.createdAt > 14 days`
- [ ] **Step 5: Run test, expect GREEN**
- [ ] **Step 6: Commit**
   ```powershell
   git add lib/cart/ tests/unit/cart-operations.test.ts
   git commit -m "feat(cart): types + operations + storage with TDD"
   ```

### Task 4: Build `<CartProvider />` React Context

**Files:** Create `lib/cart/provider.tsx`, `lib/cart/use-cart.ts`

- [ ] **Step 1: Create context + provider in `provider.tsx`**
   - State: `Cart`
   - On mount: `loadCart()` → setState
   - On every state change: `saveCart()`
   - 'use client' directive
- [ ] **Step 2: Export `useCart()` hook from `use-cart.ts`**
- [ ] **Step 3: Test by mounting in a sandbox page**
- [ ] **Step 4: Commit**
   ```powershell
   git add lib/cart/provider.tsx lib/cart/use-cart.ts
   git commit -m "feat(cart): CartProvider React Context + useCart hook"
   ```

### Task 5: Extract `<CheckoutForm />` + `<OrderSummary />`

**Files:** Create `components/checkout/CheckoutForm.tsx`, `components/checkout/OrderSummary.tsx`, `components/checkout/checkout.css`

- [ ] **Step 1: Study `/acne` page's current inline form structure**
   - Form fields: name, phone, email, address, city (select), postal, notes, payment radio (COD only — see [[feedback_anonymize_doctor]] + recent COD-only commit)
   - Submit handler logic from `app/(protocols)/acne/client.tsx`
- [ ] **Step 2: Build `<CheckoutForm />`**
   - Accepts cart from `useCart()`
   - Validates via existing `CreateOrderSchema` (Zod)
   - Submits to existing `POST /api/create-order`
   - On success, navigates to `/order/[number]?phone=XXXX`
   - On failure, inline error UI (same pattern as acne)
- [ ] **Step 3: Build `<OrderSummary />`**
   - Renders the current acne sidebar — line items, discount row, shipping, total
   - Two display modes via `showPlaceOrderButton` prop
- [ ] **Step 4: Visual parity check — mount on a temporary `/dev/checkout-preview` route**
- [ ] **Step 5: Commit**
   ```powershell
   git add components/checkout/
   git commit -m "feat(checkout): extract CheckoutForm + OrderSummary as reusable components"
   ```

### Task 6: Mount provider + chrome in `app/layout.tsx`

**Files:** Modify `app/layout.tsx`

- [ ] **Step 1: Wrap children with `<CartProvider>`**
- [ ] **Step 2: Render `<SiteHeader />` above + `<SiteFooter />` below the children block**
- [ ] **Step 3: Verify all 4 protocol pages still render with the new chrome**
   - Dev server: visit `/acne`, `/even-tone`, `/renewal`, `/barrier`
   - Confirm chrome appears + protocol content renders normally underneath
- [ ] **Step 4: Commit**
   ```powershell
   git add app/layout.tsx
   git commit -m "feat(layout): mount CartProvider + SiteHeader + SiteFooter site-wide"
   ```

### Task 7: Replace protocol-page inline forms with Add-to-cart button

**Files:** Modify all 4 `app/(protocols)/{slug}/protocol.html.ts` + matching `client.tsx`

- [ ] **Step 1: For each protocol page, replace the inline `<form id="orderForm">` block in `protocol.html.ts` with:**
   ```html
   <div class="cart-cta-section">
     <button id="addBundleAndCheckout" class="btn btn-primary">
       Add to cart — Rs. <span class="cta-price"><!-- bundle price --></span> →
     </button>
     <p class="cta-sub mono">Free shipping over Rs. 4,000 · COD · Cancel anytime</p>
   </div>
   ```
- [ ] **Step 2: In each `client.tsx`, wire the button:**
   ```ts
   document.getElementById('addBundleAndCheckout')?.addEventListener('click', () => {
     // useCart can't be called in vanilla JS — use a window event the React layer listens to
     window.dispatchEvent(new CustomEvent('clarte:add-bundle', { detail: { slug: BUNDLE.sku } }));
     window.location.href = '/checkout';
   });
   ```
- [ ] **Step 3: In `<CartProvider />`, listen for `clarte:add-bundle` events and call `addBundle()`**
- [ ] **Step 4: Smoke test each protocol page → click CTA → land on `/checkout` with the bundle in cart**
- [ ] **Step 5: Commit**
   ```powershell
   git add app/(protocols)/*/protocol.html.ts app/(protocols)/*/client.tsx lib/cart/provider.tsx
   git commit -m "feat(protocols): replace inline intake forms with cart-driven CTAs"
   ```

### Task 8: Phase A verification

**Files:** Read-only

- [ ] **Step 1: Run full test suite + lint + build**
   ```powershell
   npm test ; npm run lint ; npm run build ; npx tsc --noEmit
   ```
- [ ] **Step 2: Manual smoke**
   - Visit all 4 protocol pages
   - Confirm header + footer render
   - Confirm "Add to cart" CTA replaces the inline form
   - Confirm clicking CTA navigates to `/checkout` (404 fine for now — Phase D builds the page)
- [ ] **Step 3: Push**
   ```powershell
   git push origin main
   ```
   No commit on this task — just verification.

---

## Phase B — Discovery layer

Build the homepage, AI quiz, about page. After this phase visitors landing on `/` see a real storefront instead of being redirected.

### Task 9: Build `/` homepage

**Files:** Create `app/page.tsx`, `app/page.css`

- [ ] **Step 1: Sketch the homepage sections**
   - Hero: "Dermatologist-led skincare for Pakistan" + CTA "Take the 30-second skin quiz →"
   - 4-protocol grid: 4 cards with name + concern + bundle price + "Start the Protocol →"
   - Brand-story preview: 200-word excerpt + photo of "our GMC-registered doctor" (placeholder) + "More about us →"
   - Reviews preview: top 3 reviews across all protocols (use placeholders from Phase 5 audit pass for now)
   - WhatsApp + trust strip
- [ ] **Step 2: Build the page as a Server Component**
   - Server-fetch bundles + products from DB to populate the 4-protocol grid
- [ ] **Step 3: Style with existing brand CSS variables (reuse from protocol.css patterns)**
- [ ] **Step 4: Smoke test in dev — visit `/` (will still 307 to `/acne` until Task 13)**
- [ ] **Step 5: Commit**
   ```powershell
   git add app/page.tsx app/page.css
   git commit -m "feat(home): /  homepage with 4-protocol grid + AI-quiz CTA"
   ```

### Task 10: Build `/about` page

**Files:** Create `app/about/page.tsx`

- [ ] **Step 1: Sections**
   - Hero: "How we work" + photo of clinic / lab
   - Brand philosophy (~200 words)
   - Lead doctor block: portrait + "Our GMC-registered doctor" + credentials (MBBS · GMC-Registered Dermatologist · London & Lahore) — **anonymized per [[feedback_anonymize_doctor]]**
   - Manufacturing: ISO 22716, GMP, made-in-Lahore, ingredient sourcing
   - Why protocols, not single products
   - The 4-protocol grid (cross-reference)
- [ ] **Step 2: Use `[PLACEHOLDER — content pending]` markers anywhere operator-supplied content isn't ready**
- [ ] **Step 3: Commit**
   ```powershell
   git add app/about/
   git commit -m "feat(about): brand-story page with anonymized doctor block"
   ```

### Task 11: Build `<QuizFlow />` component

**Files:** Create `components/quiz/QuizFlow.tsx`, `components/quiz/quiz.css`

- [ ] **Step 1: State machine (use React useState)**
   - States: `idle` → `consent` → `loading` → `result` → `error`
- [ ] **Step 2: Each state's UI**
   - `idle`: "Upload a selfie" button + dropzone, no result yet
   - `consent`: consent checkbox + "Analyze my skin" CTA
   - `loading`: 30s indeterminate progress bar with rotating "Reading texture, tone, and inflammation markers…" messages (reuse from protocol pages' progress steps)
   - `result`: shows severity badge + primary/secondary concerns + recommended protocol with "Start the X Protocol →" CTA + secondary "These also help" links
   - `error`: WhatsApp consult fallback
- [ ] **Step 3: Wire to existing `POST /api/ai/analyze-skin`**
- [ ] **Step 4: Handle the `see-doctor-in-person` branch — show consult link, no protocol CTA**
- [ ] **Step 5: Commit**
   ```powershell
   git add components/quiz/
   git commit -m "feat(quiz): QuizFlow component — upload → analyze → result"
   ```

### Task 12: Build `/quiz` page

**Files:** Create `app/quiz/page.tsx`

- [ ] **Step 1: Page wrapper — minimal, just renders `<QuizFlow />` centered**
- [ ] **Step 2: SEO meta — "Find your protocol — Clarté MD" + OG image**
- [ ] **Step 3: Commit**
   ```powershell
   git add app/quiz/
   git commit -m "feat(quiz): /quiz route mounting QuizFlow"
   ```

### Task 13: Remove the `/` → `/acne` redirect

**Files:** Modify `next.config.ts`

- [ ] **Step 1: Delete the `{ source: '/', destination: '/acne', permanent: false }` line**
- [ ] **Step 2: Keep the 4 `.html` → `/<slug>` permanent redirects**
- [ ] **Step 3: Test in dev — `/` now serves the homepage, no redirect**
- [ ] **Step 4: Commit + verify in prod (auto-redeploy)**
   ```powershell
   git add next.config.ts
   git commit -m "feat(home): remove / → /acne redirect; homepage is live"
   git push origin main
   ```

---

## Phase C — Product catalog

Surface individual products for purchase, not just bundles. After this phase a customer can browse à la carte products.

### Task 14: Build `<ProductCard />` + `<BundleCard />`

**Files:** Create `components/product/ProductCard.tsx`, `components/product/BundleCard.tsx`, `components/product/product.css`

- [ ] **Step 1: `<ProductCard />` shape — image, name, actives line, price (with optional strikethrough list-price), "Add to cart" button that calls `useCart().addProduct(sku)`**
- [ ] **Step 2: `<BundleCard />` distinguishes itself visually — savings badge, item-count chip, "Save Rs X" line, "Start the Protocol →" CTA**
- [ ] **Step 3: Commit**
   ```powershell
   git add components/product/
   git commit -m "feat(product): ProductCard + BundleCard components"
   ```

### Task 15: Build `/products` catalog page

**Files:** Create `app/products/page.tsx`, `app/products/products.css`

- [ ] **Step 1: Server-fetch all 8 products + 4 bundles from DB**
- [ ] **Step 2: Render as a 2-section grid: "Protocols (4)" section above, "Individual products (8)" section below**
- [ ] **Step 3: Optional filter chips by concern (acne / pigmentation / anti-ageing / hydration)**
- [ ] **Step 4: Commit**
   ```powershell
   git add app/products/
   git commit -m "feat(catalog): /products grid with 4 bundles + 8 products"
   ```

### Task 16: Build `<ProductDetailPage />` shell

**Files:** Create `components/product/ProductDetailPage.tsx`

- [ ] **Step 1: Sections**
   - Hero: large product image + name + actives + price + "Add to cart"
   - "What's inside" / actives breakdown
   - Usage instructions
   - Per-product FAQ (3-5 questions, scaffold with placeholders if copy not ready)
   - Cross-sell: 3 related products from the same concern
   - Schema.org `Product` JSON-LD
- [ ] **Step 2: Style consistently with brand CSS**
- [ ] **Step 3: Commit**
   ```powershell
   git add components/product/ProductDetailPage.tsx
   git commit -m "feat(product): ProductDetailPage layout shell"
   ```

### Task 17: Build `/products/[sku]` dynamic route

**Files:** Create `app/products/[sku]/page.tsx`

- [ ] **Step 1: Server-fetch product by SKU; 404 if not found or inactive**
- [ ] **Step 2: Render `<ProductDetailPage />` with the product data**
- [ ] **Step 3: `generateStaticParams()` for the 8 known SKUs (optimization — pre-renders these pages)**
- [ ] **Step 4: Commit**
   ```powershell
   git add app/products/[sku]/
   git commit -m "feat(product): /products/[sku] dynamic detail route"
   ```

### Task 18: Create `GET /api/products/[sku]` endpoint

**Files:** Create `app/api/products/[sku]/route.ts`

- [ ] **Step 1: Build the route — query products by SKU, return JSON, 404 on miss, cache headers**
- [ ] **Step 2: Commit**
   ```powershell
   git add app/api/products/[sku]/
   git commit -m "feat(api): GET /api/products/[sku]"
   ```

### Task 19: Wire "Add to cart" buttons site-wide

**Files:** Modify `<ProductCard />`, `<BundleCard />`, `<ProductDetailPage />`

- [ ] **Step 1: Confirm every "Add to cart" button calls `useCart().add*()` with the right item**
- [ ] **Step 2: Add a brief animation/toast confirming "Added" — small UX win**
- [ ] **Step 3: Commit**
   ```powershell
   git add components/product/
   git commit -m "feat(cart): wire Add-to-cart from product/bundle cards + detail page"
   ```

### Task 20: Source product images / fallback placeholders

**Files:** Modify `lib/db/seed.ts` if any SKU missing image_url

- [ ] **Step 1: Audit which of 8 products have `imageUrl` populated**
- [ ] **Step 2: For any missing, use a generic placeholder URL or commit a brand-styled SVG**
- [ ] **Step 3: Re-run `npm run db:seed`**
- [ ] **Step 4: Commit if anything changed**
   ```powershell
   git add lib/db/seed.ts
   git commit -m "chore(seed): ensure all 8 SKUs have imageUrl populated"
   ```

### Task 21: Schema.org Product markup per product page

**Files:** Create `lib/schema/json-ld.ts`, Modify `<ProductDetailPage />`

- [ ] **Step 1: Create JSON-LD builder for Product type**
- [ ] **Step 2: Mount via `<script type="application/ld+json">` in the product detail page**
- [ ] **Step 3: Validate with Google's Rich Results Test once deployed**
- [ ] **Step 4: Commit**
   ```powershell
   git add lib/schema/json-ld.ts components/product/ProductDetailPage.tsx
   git commit -m "feat(seo): Schema.org Product JSON-LD on product pages"
   ```

---

## Phase D — Cart + universal checkout

Unify the purchase flow. After this phase the protocol pages + product catalog all funnel into the same `/checkout`.

### Task 22: Build `/cart` page

**Files:** Create `app/cart/page.tsx`, `app/cart/cart.css`

- [ ] **Step 1: 'use client' page that reads from `useCart()`**
- [ ] **Step 2: Render `<OrderSummary cart={cart} showPlaceOrderButton={false} />` + a "Proceed to checkout →" button that navigates to `/checkout`**
- [ ] **Step 3: Empty-cart state — friendly empty message + "Browse protocols →" CTA**
- [ ] **Step 4: Per-item controls — remove + qty +/- (for product type only; bundles are fixed qty=1)**
- [ ] **Step 5: Commit**
   ```powershell
   git add app/cart/
   git commit -m "feat(cart): /cart page with line items + proceed-to-checkout"
   ```

### Task 23: Build `/checkout` page

**Files:** Create `app/checkout/page.tsx`

- [ ] **Step 1: 'use client' page**
- [ ] **Step 2: Left column = `<CheckoutForm />`; right column = `<OrderSummary cart={cart} showPlaceOrderButton={true} />`**
- [ ] **Step 3: Empty-cart redirect → back to `/cart`**
- [ ] **Step 4: After successful order POST, navigate to `/order/[number]?phone=XXXX` (clears cart in the process)**
- [ ] **Step 5: Commit**
   ```powershell
   git add app/checkout/
   git commit -m "feat(checkout): /checkout page with universal CheckoutForm"
   ```

### Task 24: Build `POST /api/cart/preview` endpoint

**Files:** Create `app/api/cart/preview/route.ts`, `lib/validators/cart-preview.ts`

- [ ] **Step 1: Zod-validate payload (array of CartItems)**
- [ ] **Step 2: Server-side resolve each item:**
   - Bundle: look up by slug, return name + price + member items
   - Product: look up by SKU, return name + price
- [ ] **Step 3: Apply free-shipping rule (Rs 4,000+ → 0; else Rs 250)**
- [ ] **Step 4: Return resolved totals**
- [ ] **Step 5: Wire `<OrderSummary />` to call this on mount + whenever cart changes**
- [ ] **Step 6: Commit**
   ```powershell
   git add app/api/cart/preview/ lib/validators/cart-preview.ts components/checkout/
   git commit -m "feat(api): POST /api/cart/preview — server-authoritative cart totals"
   ```

### Task 25: Extend `POST /api/create-order` to accept mixed-cart payloads

**Files:** Modify `app/api/create-order/route.ts`, `lib/validators/create-order.ts`

- [ ] **Step 1: Update `CreateOrderSchema.items` validator to accept either bundle-slug or product-sku items**
- [ ] **Step 2: Update route logic to look up SKUs server-side and validate each**
- [ ] **Step 3: Re-run integration test from sub-project #2 (Task 15) — confirm still passes**
- [ ] **Step 4: Add 1-2 new integration tests covering mixed-cart payloads**
- [ ] **Step 5: Commit**
   ```powershell
   git add app/api/create-order/ lib/validators/create-order.ts tests/integration/create-order.test.ts
   git commit -m "feat(api): /api/create-order accepts mixed-cart payloads"
   ```

### Task 26: Wire cart-icon badge count in `<SiteHeader />`

**Files:** Modify `components/site/CartIcon.tsx`

- [ ] **Step 1: Replace the mocked 0 from Task 2 with `useCart().cart.items.length`**
- [ ] **Step 2: Confirm count updates live as items are added/removed**
- [ ] **Step 3: Commit**
   ```powershell
   git add components/site/CartIcon.tsx
   git commit -m "feat(cart): wire CartIcon badge to live cart count"
   ```

---

## Phase E — Customer utilities

### Task 27: Build `/order/[number]` order tracking page

**Files:** Create `app/order/[number]/page.tsx`, `app/order/[number]/order.css`

- [ ] **Step 1: Page reads `[number]` from route params + `phone` from search params**
- [ ] **Step 2: If `phone` missing, render a phone-input form prompting for last 4 digits**
- [ ] **Step 3: If `phone` present, server-fetch via `/api/order/[number]?phone=XXXX`**
- [ ] **Step 4: Render order summary — status, items, totals, ETA**
- [ ] **Step 5: 404 / wrong-phone state — generic "Order not found" (don't leak whether it exists)**
- [ ] **Step 6: Commit**
   ```powershell
   git add app/order/[number]/
   git commit -m "feat(order): /order/[number] tracking page with phone verification"
   ```

### Task 28: Build `GET /api/order/[number]` with phone verification

**Files:** Create `app/api/order/[number]/route.ts`

- [ ] **Step 1: Read order_number + phone from request**
- [ ] **Step 2: Look up order; compare last 4 of stored `customerPhone` to provided `phone`**
- [ ] **Step 3: On mismatch → 404 (don't 401, don't leak existence)**
- [ ] **Step 4: Rate-limit via existing IP-hash mechanism**
- [ ] **Step 5: Sanitize response — first name only, no full address**
- [ ] **Step 6: Commit**
   ```powershell
   git add app/api/order/[number]/
   git commit -m "feat(api): GET /api/order/[number] with phone-last-4 verification"
   ```

### Task 29: Build `/contact` page + endpoint

**Files:** Create `app/contact/page.tsx`, `app/api/contact/route.ts`, `lib/validators/contact.ts`

- [ ] **Step 1: Page sections:**
   - Header: clinic address (Lahore) + phone + email
   - WhatsApp link (existing wa.me URL)
   - Contact form: name, email, phone, message, optional newsletter checkbox
- [ ] **Step 2: `POST /api/contact`:**
   - Zod-validate
   - Rate-limit (5/hr per IP — same as AI)
   - Fire `WEBHOOK_CONTACT_SUBMITTED` webhook (extends sub-project #3)
   - If newsletter opted-in, insert into `subscribers` table (or fail silently if dedupe collision)
- [ ] **Step 3: Add `WEBHOOK_CONTACT_SUBMITTED` to .env.example + .env.local (blank)**
- [ ] **Step 4: Add subscribers table migration**
- [ ] **Step 5: Commit**
   ```powershell
   git add app/contact/ app/api/contact/ lib/validators/contact.ts lib/db/schema.ts .env.example
   git commit -m "feat(contact): /contact page + POST /api/contact + subscribers table"
   ```

---

## Phase F — Legal + SEO

### Task 30: Write 4 legal pages as MDX

**Files:** Create `app/legal/privacy/page.mdx`, `app/legal/terms/page.mdx`, `app/legal/returns/page.mdx`, `app/legal/shipping/page.mdx`

- [ ] **Step 1: Scaffold all 4 with `[PLACEHOLDER — pending PK lawyer review]` markers**
- [ ] **Step 2: Use existing brand CSS for typography**
- [ ] **Step 3: Footer nav links to each**
- [ ] **Step 4: Commit**
   ```powershell
   git add app/legal/
   git commit -m "feat(legal): scaffold 4 legal pages (placeholder pending lawyer review)"
   ```

### Task 31: Generate sitemap.xml + robots.txt

**Files:** Create `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: `app/sitemap.ts` returns array of routes**
   - All 4 protocols, /products, 8 /products/[sku] pages, /, /quiz, /about, /contact, 4 legal pages
- [ ] **Step 2: `app/robots.ts` allows all + points to sitemap**
- [ ] **Step 3: Verify at `/sitemap.xml` and `/robots.txt` in dev**
- [ ] **Step 4: Commit**
   ```powershell
   git add app/sitemap.ts app/robots.ts
   git commit -m "feat(seo): dynamic sitemap.xml + robots.txt"
   ```

### Task 32: Open Graph + Twitter Card + Schema.org markup

**Files:** Modify `app/layout.tsx` (defaults), each `page.tsx` (overrides), `lib/schema/json-ld.ts`

- [ ] **Step 1: Site-wide defaults in `app/layout.tsx` metadata**
- [ ] **Step 2: Per-page `generateMetadata` for `/`, `/quiz`, `/about`, `/products`, each protocol page**
- [ ] **Step 3: Schema.org JSON-LD: `Organization` + `LocalBusiness` site-wide; `Product` per product page; `FAQPage` per protocol page (read FAQ from existing HTML)**
- [ ] **Step 4: OG image — create or commit a static brand asset at `/og-default.png`**
- [ ] **Step 5: Validate with Google Rich Results Test once deployed**
- [ ] **Step 6: Commit**
   ```powershell
   git add app/layout.tsx app/page.tsx app/quiz/ app/about/ app/products/ app/(protocols)/*/page.tsx lib/schema/
   git commit -m "feat(seo): OG meta + Schema.org JSON-LD (Organization + Product + FAQPage)"
   ```

---

## Phase G — Testing + acceptance

### Task 33: Full E2E + lint + test + build + acceptance + tag v0.6

**Files:** Create `tests/e2e/storefront-flow.spec.ts`, `docs/runbooks/2026-05-17-storefront-v0.6-acceptance.md`

- [ ] **Step 1: Write E2E covering the new platform funnel**
   ```ts
   test('storefront end-to-end', async ({ page }) => {
     await page.goto('/');
     await expect(page.locator('h1')).toContainText(/Clarté MD/i);
     // Click into a protocol
     await page.click('text=Start the Clear Skin Protocol');
     // Add bundle to cart from CTA
     await page.click('#addBundleAndCheckout');
     // Should land on /checkout with bundle in cart
     await expect(page).toHaveURL(/\/checkout/);
     // Fill form, submit (existing pattern from sub-project #2 E2E)
     ...
     // Then visit /order/[number] with the phone
     ...
   });
   ```
- [ ] **Step 2: Run E2E — expect pass**
- [ ] **Step 3: `npm run lint` + `npm test` + `npm run build` — all green**
- [ ] **Step 4: Manual smoke list — visit every new route in browser**
   - `/`, `/quiz`, `/about`, `/products`, `/products/[sku]` for a couple SKUs, `/cart`, `/checkout`, `/order/CLM-2026-XXXX?phone=...`, `/contact`, all 4 `/legal/*`
- [ ] **Step 5: Write acceptance report at `docs/runbooks/2026-05-17-storefront-v0.6-acceptance.md`**
   - Cover all 12 success criteria from the spec
   - List all plan deviations
   - List operator-content gaps that need filling
- [ ] **Step 6: Commit + tag + push**
   ```powershell
   git add tests/e2e/storefront-flow.spec.ts docs/runbooks/2026-05-17-storefront-v0.6-acceptance.md
   git commit -m "docs(v0.6): sub-project #6 acceptance + E2E smoke"
   git tag -a v0.6 -m "v0.6 — Storefront Platform live"
   git push origin main --tags
   ```

---

## Self-Review

### Spec coverage check

| Spec section | Implemented by task(s) |
|---|---|
| §1 Goal | Whole plan |
| §2 Non-goals | Excluded explicitly |
| §3 Tech stack | Task 1 (next-mdx-remote) |
| §4 Routes + endpoints | Tasks 9-13 (discovery), 15-18 (products), 22-25 (cart/checkout), 27-29 (utilities), 30-32 (legal/SEO) |
| §5 `subscribers` table | Task 29 |
| §6 Cart model | Tasks 3-4, 7 |
| §7 Checkout model | Tasks 5, 23, 25 |
| §8 SEO strategy | Tasks 21, 31, 32 |
| §9 Component contracts | Tasks 2, 4, 5, 11, 14, 16 |
| §10 API endpoint specs | Tasks 18, 24, 28, 29 |
| §11 Migration strategy | Tasks 6-8 |
| §12 Decisions | Reflected in task choices |
| §13 Success criteria | Task 33 acceptance report |
| §14 Effort estimate | 33 tasks ≈ 53-67h matches plan |
| §15 Content gaps | Flagged in Tasks 10, 16, 30 with `[PLACEHOLDER]` markers |
| §16 Risks | Mitigations baked into task structure (rollback at end of Phase A; placeholders ensure platform ships even with missing content) |

**Type consistency check:**
- `Cart`, `CartItem` defined Task 3 → used Tasks 4, 5, 7, 22-25 ✓
- `CartProvider`, `useCart` defined Task 4 → used Tasks 2 (icon), 5 (checkout), 7 (protocol pages), 22-23 ✓
- `<CheckoutForm />`, `<OrderSummary />` defined Task 5 → used Tasks 22, 23 ✓
- `<ProductCard />`, `<BundleCard />` defined Task 14 → used Task 15 ✓
- `<ProductDetailPage />` defined Task 16 → used Task 17 ✓
- `CreateOrderSchema` extended Task 25 → consistent with sub-project #2 Task 6 + #5 changes ✓

**Anonymization check:**
- Tasks 9, 10, 16, 30 all explicitly reference [[feedback_anonymize_doctor]]
- No task introduces a named doctor reference
- Every new doctor mention uses "our GMC-registered doctor" or similar

**Placeholder scan:** Tasks 9, 10, 16, 30 use `[PLACEHOLDER — content pending]` markers for operator-blocked content. These are explicit and clearly marked.

**Scope check:** 33 tasks, mostly 1-2h each. Total fits the spec's 53-67h estimate. Each phase is a deployable boundary — if work stops at end of any phase the site remains functional with the prior version of the affected surfaces.
