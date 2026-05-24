# Shopify Default Checkout

**URL:** https://www.shopify.com/payments/checkout (product page) — live instances at any Shopify store's `/checkout` path
**Positioning:** Platform-default checkout used by 1M+ Shopify merchants; most-A/B-tested e-commerce checkout in the world
**Why study them:** Virtually every DTC skincare brand Clarté competes for shelf-space against runs on Shopify. The Shopify checkout is the mental model your customers arrive with. When they land on Clarté's COD form, they're pattern-matching against whatever Shopify they used last.

## Quick take

Shopify's default checkout is the most studied, most criticized, and most deployed checkout in e-commerce. Its three-step structure (Information → Shipping → Payment) has been the DTC standard since 2016. Shopify's 2023 one-page checkout migration didn't kill the three-step model — it offered it as an alternative, and many Plus brands stayed on three-step intentionally because the step decomposition manages cognitive load for high-consideration purchases. The express-checkout row (Shop Pay / Apple Pay / Google Pay) at the top of mobile is the most-copied checkout pattern of the last five years. Clarté can't use any of those buttons, but the principle — "give the fastest path to commit above the form" — is already implemented as the `trust-cod-hero` band.

---

## URL + entry point

- Shopify product/checkout page: https://www.shopify.com/payments/checkout
- One-page checkout overview: https://www.shopify.com/enterprise/blog/one-page-checkout
- Checkout form options (Help Center): https://help.shopify.com/en/manual/checkout-settings/checkout-form-options
- Accelerated checkouts docs: https://help.shopify.com/en/manual/payments/accelerated-checkouts
- Checkout and accounts editor: https://help.shopify.com/en/manual/checkout-settings/customize-checkout-configurations/checkout-editor
- Shopify dev — Checkout UI Extensions (2025): https://shopify.dev/docs/api/checkout-ui-extensions/latest
- Address collection preferences: https://help.shopify.com/en/manual/checkout-settings/address-collection-preferences

Sourcing note: live Shopify checkout instances are session-gated (require a populated cart on a real merchant store). Observations below are from Shopify Help Center docs, developer documentation, Shopify enterprise blog posts, and UX agency teardowns (digismoothie.com, ecomexperts.io). Claims from third-party sources are flagged \[via source\].

---

## Cart-to-checkout transition

**Button copy:** "Check out" (Shopify default theme). Variants used by customized stores: "Proceed to Checkout", "Secure Checkout", "Continue to Checkout". The Shopify default is lowercase "out" — matching the brand-voice register of DTC stores that don't want a stiff "Place Order" at the cart stage.

**Pre-checkout reassurance:** Shopify stores vary, but the platform default places the express-checkout buttons (Shop Pay / Apple Pay / Google Pay) *inside* the cart summary panel below the "Check out" CTA, giving returning users a path to skip the form entirely before they even leave the cart. \[via Shopify Help — accelerated checkouts\]

**Total visible before threshold:** Yes. The cart's order summary (subtotal, shipping estimate if calculable, total) is visible on the cart page before the customer crosses into checkout. On mobile, the total is always in the sticky footer of the cart drawer or cart page.

---

## Express checkout buttons (top of checkout)

The express-checkout section renders at the **very top of the checkout page**, before the breadcrumb, before the email field, before any form field. Order (dynamically sorted by Shopify based on which wallet the browser detects): Shop Pay → Apple Pay → Google Pay → Amazon Pay → PayPal. \[via Shopify Help — accelerated checkouts: "ordered dynamically to display the fastest checkout method for your customer"\]

**Wallet detection behavior:** Shopify only renders a button if the wallet is detected on the device/browser. Apple Pay appears only on Safari on Apple devices with a card on file. Google Pay appears only when the browser detects a saved Google Pay method. If no wallet is detected, the entire express-checkout section is hidden — no empty placeholder row.

**Shop Pay is always shown** (if the merchant has activated it) regardless of device, because Shop Pay is Shopify's cross-device account system. A customer with a Shop Pay account can autofill from any browser. \[via Shopify Help — Shop Pay overview\]

**The "OR" divider:** Below the express-checkout button row, a horizontal rule with "OR" in the center separates the express path from the form. This is the standard visual treatment across the DTC brands surveyed in `05-checkout.md` (Glossier, Allbirds, Tatcha, EltaMD).

For Clarté: this section is replaced by the `trust-cod-hero` band. The `trust-cod-hero` correctly occupies the same spatial real estate (above the form, before the Contact fieldset) and performs the same cognitive function: "before you fill anything out, here is the fastest / most important thing to know."

---

## Form structure

Shopify's three-step checkout distributes fields across pages as follows. \[via Shopify Help Center — checkout form options + Shopify dev — address collection preferences\]

### Step 1: Information

Field order (default, US/PK locale):
1. **Email** — `type="email"`, always first. Used for receipts and account detection. Shopify also offers "email OR phone" as a merchant setting — customer fills one or the other.
2. **Marketing opt-in checkbox** — below email, pre-checked if merchant enables. Opt-in only (GDPR default is unchecked).
3. **Country** — dropdown, positioned early so Shopify can render the correct address format for the selected region.
4. **First name** + **Last name** — split two-column on desktop. Shopify Help offers a "Last name only" option to reduce to a single field. The split default is Shopify's legacy; Baymard recommends single full-name field, but most Shopify stores ship the split default.
5. **Address Line 1** — text input, `autocomplete="address-line1"`.
6. **Address Line 2** (apartment, suite, etc.) — shown by default as a separate visible field unless the merchant sets it to "optional" or "don't include" in checkout form options. \[via Shopify Help — checkout form options\] This is Baymard's most-flagged Shopify omission: the Address Line 2 field should be collapsed behind a link by default but Shopify's default renders it as a visible field.
7. **City** — text input.
8. **State / Province** — dropdown (locale-aware).
9. **Postal / ZIP** — text input, `inputMode="numeric"` implied but not always set explicitly in older themes.
10. **Phone** (Shipping Address Phone) — configurable: "Don't include" / "Optional" / "Required" via merchant settings. When shown, appears at the bottom of the address block. \[via Shopify Help — checkout form options\]

### Step 2: Shipping

A single-purpose page. Contains:
- **Order summary** (right rail desktop, collapsible top mobile — carried over from Step 1).
- **Shipping method** as radio cards. Each card: method name, delivery window, price. Example format: "Economy · Rs. 250 · 4–7 business days". Date-range format is optional — Shopify shows delivery speed ("4–7 business days"), not a specific date, unless the merchant adds a calculated date via app or custom liquid.
- **Continue to Payment** CTA button at the bottom of the form column.

### Step 3: Payment

- **Express-checkout buttons** — re-shown at the top of the Payment step on mobile (second chance to use Apple Pay / Shop Pay). \[via Shopify — accelerated checkouts: buttons display at the beginning of checkout\]
- **Card form:** Card number, Expiry, CVC (inline, side-by-side expiry + CVC on desktop, stacked on mobile). Name on card is not shown separately — Shopify does not collect cardholder name by default.
- **Billing address toggle:** "Same as shipping address" checkbox pre-checked. Unchecking expands a full billing-address block. \[via Shopify Plus merchant help docs\]
- **"Use as billing address" toggle:** Yes/No toggle rather than checkbox in some Plus-customized stores.
- **Payment footer attribution:** "All transactions are secure and encrypted" + Shopify's padlock icon. Some brands customize this to add card-network logos (Visa/MC/Amex).

**What is required vs optional:** Email, country, address line 1, city, state, postal, and card fields are always required. Address Line 2, company, phone, and marketing opt-in are configurable. \[via Shopify Help — checkout form options\]

---

## Validation

**Timing:** On-change for address fields — Shopify's checkout address fields update validation state when the field value changes, not on blur. \[via Shopify Dev — addresses API: "the address updates when the field is committed (on change) rather than every keystroke"\]

This is a subtle but important detail: Shopify's "on change" means on commit (tab-out or enter), not on every keystroke. This is functionally equivalent to on-blur for most fields but means that a customer typing in the city field sees no validation feedback until they move focus away.

**Inline error treatment:** Field-level red border + error message below the field. Error messages are plain-language per field: "Enter a valid email address", "Enter a ZIP code", "Select a state". No top-of-form error summary by default — errors appear only inline. \[via Shopify Help + EcomExperts Shopify checkout teardown\]

**Submit-blocked until valid:** The "Continue" / "Pay now" button is not disabled while fields are empty — it is clickable, but submitting an incomplete form triggers the inline errors to all appear simultaneously. This is Baymard's "submit-reveals-errors" pattern, which is acceptable but inferior to the "button disabled until valid" pattern.

**No positive validation icons:** Shopify's default checkout does not show green checkmarks on valid fields. Only error states are visually communicated. Brands using Shopify Plus can add these via the Branding API. \[indirect — Shopify Plus customization docs\]

---

## Address autocomplete

Google Places Autocomplete is available as a Shopify setting: Settings → Checkout → "Enable address autocompletion." When enabled, typing 3+ characters in Address Line 1 shows a dropdown of Google Places suggestions. On selection, it pre-fills City, State/Province, and Postal Code. \[via Shopify Help — address collection preferences; digismoothie.com Shopify checkout optimization guide\]

The autocomplete is powered by Google Maps API. The fallback when autocomplete fails (network issue, unsupported country) is graceful: the dropdown doesn't appear and the customer fills fields manually.

Pakistan is not in Shopify's address-autocompletion top-tier (similar to Stripe's 25-country list). Merchants in PK can enable it but coverage is incomplete. The behavioral model (3-char trigger, dropdown, pre-fill downstream fields) is still the right aspiration for Clarté's address field if/when PK mapping APIs improve.

---

## Shipping method selection

Radio cards. Each card contains:
- Method name ("Standard Shipping", "Express Shipping", "Free Shipping")
- Delivery window in Shopify's default format: "X–Y business days" (not a specific date)
- Price (or "Free")

Shopify renders only the shipping methods the merchant has configured. If only one method exists, the radio is pre-selected and the step may be collapsed (Plus behavior) or still shown as a single-option confirmation page.

The date-format weakness ("2–4 business days" vs "Arrives May 28–30") is a known Baymard finding — 41% of sites fail to use delivery dates. Shopify's default uses speed, not date. Clarté should improve on this; see "What to lift."

---

## Payment + trust

**Payment method presentation:** Default Shopify checkout on Step 3 shows card fields (number, expiry, CVC) as the primary method. Express-checkout buttons (Apple Pay, Shop Pay) appear as a secondary row above the card form on mobile — a second chance for the accelerated path.

**Alternative payment methods below card form:** PayPal button appears below the card form if PayPal is enabled. BNPL options (Klarna, Afterpay/Clearpay, Zip) appear as radio options if configured — each shows the instalment math ("4 payments of $X"). \[indirect — Shopify Plus payment docs\]

**Trust signal near submit:** "All transactions are secure and encrypted." Lock icon. This appears immediately above or below the payment CTA in most customized Shopify stores. Plain text, no badge cluster. Clarté's equivalent is "Nothing to pay now. Pay the courier on arrival." — which replaces this entirely appropriately.

**Order summary positioning:** Right column on desktop (persistent across all three steps). On mobile: a collapsible disclosure at the top of the form, below the breadcrumb. Default collapsed state shows the total ("Order Total: Rs. X"). Tapping expands inline to show line items — no navigation, no modal. \[via EcomExperts Shopify checkout teardown, 05-checkout.md\]

---

## Submit button

**Step 1 CTA copy:** "Continue to shipping" (Title Case).
**Step 2 CTA copy:** "Continue to payment" (Title Case).
**Step 3 CTA copy:** "Pay now" (lowercase n, Shopify default). Some Plus brands override to "Place order" or "Complete purchase."

**Amount in button:** Not in the default CTA. The total is in the order summary, not the button label. This is a divergence from Allbirds / Stripe's best practice ("Pay now — $138.00"). Plus brands can override via Branding API.

**Disabled state:** Not disabled while empty. Clicking with empty fields triggers inline errors simultaneously. "Continue" buttons between steps are enabled at all times.

**Loading state:** Spinner replaces the button label during processing. Button becomes non-interactive.

**Sticky mobile:** "Pay now" on Step 3 sticks to the bottom of the viewport on mobile. Steps 1 and 2 CTAs are fixed at the bottom of the form column (not viewport-sticky, but positioned such that the form is short enough to keep it visible without scrolling on most device heights). \[via Shopify checkout page design best practices\]

---

## Post-submit success / confirmation

Shopify renders two pages:
1. **Thank You page** — shown immediately after checkout completes, at `checkout.{store}.com/thank_you`. Contains: "Thank you, {first_name}!" headline, order number, confirmation email notice, full order summary with thumbnails, shipping address, payment method (card last-4 or "Shop Pay"). Account-creation prompt with a single password field (post-purchase, not pre-purchase — Baymard-correct). "Continue shopping" CTA.
2. **Order Status page** — served to return visits of the same URL. Shows tracking link + carrier once fulfilled. Tracking map if carrier is supported.

Both pages are hosted on Shopify's domain (`checkout.shopify.com` or the store's custom domain), not the storefront. Customers cannot revisit the Thank You page; return visits serve Order Status.

\[via Shopify Help — understanding order status pages; 06-thank-you.md\]

---

## Microinteractions + state

**Loading skeleton:** The checkout page loads a server-rendered shell on first visit. If JS is slow (slow network), the form fields appear but are non-interactive until Checkout.js hydrates. Some stores (Shopify default) show a loading spinner over the page until hydration completes.

**Slow network handling:** Shopify's checkout is served from Shopify's CDN and generally loads in < 1s on fast connections. On slow connections (3G Pakistan-tier), the express-checkout button row can fail to load (requires JS), leaving the form fields which are server-rendered HTML — a graceful degradation.

**Error recovery (network failure mid-submit):** Shopify retries failed requests silently. If the payment API is unreachable, the "Pay now" button re-enables and an inline error banner appears above the form. Customer data is not cleared.

**Quantity-update on order summary:** The order summary in the checkout right rail is read-only — items cannot be edited. Customers who want to change quantities must navigate back to the cart (a "Edit cart" link in the order summary header). This is a deliberate Shopify friction-reduction choice: removing the edit-in-checkout UX reduces the loop from "I'll just add one more" back through the store.

**Order summary live update:** If a discount code is applied in the order summary, the total in the summary updates live (without page reload). On mobile, the collapsed summary header pulses to indicate the total has changed. \[via 05-checkout.md — Glossier observation\]

---

## Mobile-specific

- **Express checkout row is more prominent on mobile than desktop** — it takes up a larger share of above-fold space on mobile, intentionally biasing toward the fastest path.
- **Step indicator collapses to "Step X of 3"** on small screens. The full "Information → Shipping → Payment" breadcrumb does not fit; Shopify truncates to a single-step indicator with a back chevron.
- **Order summary collapses to a disclosure at the top** — the collapsed state shows the order total, not "Show order summary." Tapping it expands inline.
- **Phone keyboard for phone field** — Shopify sets `type="tel"` on the phone field correctly.
- **Google Autofill compatibility** — Shopify's checkout fields use standard `autocomplete` tokens (`email`, `given-name`, `family-name`, `address-line1`, `address-line2`, `address-level2` for city, `address-level1` for state, `postal-code`, `tel`). This means a customer who has filled a Shopify checkout before on Android has a high probability of autofilling the entire contact + address block in one tap.

---

## What to lift for Clarté

**1. "Step X of 3" mobile collapse for `CheckoutSteps.tsx`.** Currently `CheckoutSteps.tsx` shows all three steps with their labels on all screen sizes. On widths below ~375px (common in PK on budget Android devices), the three-step row with labels may overflow or truncate. Add a responsive variant: at `< sm` breakpoint, collapse to "Step 3 of 3 — Confirm" (since Clarté's checkout is always at step 3 — the single-page form). This mirrors Shopify's mobile truncation and prevents the breadcrumb from wrapping awkwardly.

**2. "Continue shopping" back-link in the checkout page header.** Shopify renders the store logo as a link back to the storefront at the top of every checkout step. Clarté's checkout (`app/(site)/checkout/page.tsx`) has no header navigation — the customer is trapped if they want to change something. Add a small "← Back to cart" link above `CheckoutForm`'s heading. This exists on all eight reference brands and costs nothing.

**3. Collapsible order summary with total-visible collapsed state on mobile.** Currently `OrderSummary.tsx` renders as a static aside in the layout. On mobile, this requires significant scroll to reach. Wrap `OrderSummary` in a disclosure (`<details>/<summary>`) on mobile — collapsed state shows "Order summary — Rs. {total}", expanded state shows the full item list. Specifically: the total must be visible in the collapsed state (not hidden) because COD customers need to know the number to prepare cash. Allbirds and Shopify both confirm this.

**4. Delivery window copy near the shipping section.** Shopify's shipping method step shows "X–Y business days." Clarté's form has no delivery window anywhere. Add one line below the Shipping fieldset in `CheckoutForm.tsx`: `"Delivers in 2–4 working days after WhatsApp confirmation"` as a `<p className="form-sub">`. This is the single-highest-anxiety gap in the COD flow — customers familiar with Shopify expect to see when their order arrives.

**5. Discount code accordion pattern (for future use).** Clarté has no coupon system today. When one ships, use the Shopify pattern: a collapsed "Have a promo code?" link that expands inline, not a permanently visible text field. Visible code fields seed "I should go find a code" doubt in full-price buyers — Baymard documents this as a conversion-killer.

---

## What to skip

- **Express checkout button row (Shop Pay / Apple Pay / Google Pay / PayPal).** No PK rails. The `trust-cod-hero` band replaces this correctly.
- **Three-page navigation (Step 1 → Step 2 → Step 3 as separate routes).** Clarté's single-page form with visual step indicators is the right call for a 10-field form. Multi-step is overkill at this size and introduces navigation cost that single-page avoids.
- **Card form fields (number, expiry, CVC, name on card).** No card billing.
- **Billing-address toggle.** No card billing; no separate billing address is needed.
- **BNPL instalment math (Klarna / Afterpay / Zip).** Not operational in PK.
- **"All transactions are secure and encrypted" copy.** Wrong for COD. The COD trust copy ("Pay the courier when your parcel arrives") is the correct replacement — already implemented.
- **"Pay now" submit button copy.** Wrong verb for COD. Clarté uses "Place Order — Rs. {total}" correctly.
- **Free-shipping progress bar** and any threshold messaging. Flat Rs. 250, no threshold (per `feedback_unverified_claims`).

---

## Sources

- https://www.shopify.com/payments/checkout
- https://www.shopify.com/enterprise/blog/one-page-checkout
- https://help.shopify.com/en/manual/checkout-settings/checkout-form-options
- https://help.shopify.com/en/manual/payments/accelerated-checkouts
- https://help.shopify.com/en/manual/checkout-settings/customize-checkout-configurations/checkout-editor
- https://help.shopify.com/en/manual/checkout-settings/address-collection-preferences
- https://shopify.dev/docs/api/checkout-ui-extensions/latest
- https://www.shopify.com/enterprise/blog/checkout-page-design
- https://www.shopify.com/enterprise/blog/faster-checkout-process
- https://ecomexperts.io/blogs/all/5-brands-crushing-shopify-checkout-for-e-commerce-growth (indirect — Glossier teardown)
- https://www.digismoothie.com/blog/optimize-shopify-checkout (indirect — form options + autocomplete)
- https://help.shopify.com/en/manual/fulfillment/setup/order-status-page/understanding-order-status-pages
- https://baymard.com/blog/current-state-of-checkout-ux (Shopify-specific issues: Address Line 2 visibility, delivery-speed vs delivery-date)
- https://baymard.com/checkout-usability (Shopify benchmark)
