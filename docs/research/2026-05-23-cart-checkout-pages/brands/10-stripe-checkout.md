# Stripe Checkout

**URL:** https://stripe.com/payments/checkout — demo at https://checkout.stripe.dev/
**Positioning:** Hosted, prebuilt payment page for SaaS and e-commerce; optimized by hundreds of millions of transactions
**Why study them:** The canonical source of truth for payment form UX. Even though Clarté is COD-only with no Stripe integration, every checkout-form convention in use today — label placement, validation timing, field order, error treatment, autofill tokens — was either established by or validated against Stripe's research.

## Quick take

Stripe Checkout is not a competitor product to study for copyable visual patterns. It is the reference layer below every form Clarté will ever build. The value is in the atomics: how Stripe handles on-blur validation, why they use labels-above not floating-labels for accessibility, what "real-time error correction" actually means at the keystroke level, and why their button copy ("Pay $42.98") embeds the amount. Every one of those decisions is exportable to a COD form.

---

## URL + entry point

- Product page: https://stripe.com/payments/checkout
- Interactive demo (publicly accessible without login): https://checkout.stripe.dev/
- Hosted checkout quickstart docs: https://docs.stripe.com/checkout/quickstart
- One-step checkout guide: https://stripe.com/resources/more/one-step-checkout
- Mobile checkout UI guide: https://stripe.com/resources/more/mobile-checkout-ui
- Payment HTML forms best practices: https://stripe.com/resources/more/payment-html-forms
- Address Element docs: https://docs.stripe.com/elements/address-element

Sourcing note: the interactive demo at checkout.stripe.dev is publicly accessible for form-level inspection. The live product page (stripe.com/payments/checkout) describes the feature set but does not embed a clickable demo. All observations below are triangulated from the demo, official docs, and Stripe's published best-practice guides — flagged where indirect.

---

## Cart-to-checkout transition

Not applicable. Stripe Checkout is a destination page, not a storefront. Merchants redirect customers to it; there is no cart drawer or cart page within Stripe's hosted surface.

---

## Express checkout buttons (top of checkout)

Stripe's Express Checkout Element renders Apple Pay, Google Pay, and Link (Stripe's own saved-payment network) as a button row at the top of the page, **before any form fields**. The behavior is wallet-detection: if the device/browser has Apple Pay configured, the Apple Pay button appears; if Google Pay, the Google Pay button appears; if neither, the row is hidden entirely and the customer drops straight to the form fields. No empty ghost buttons, no "coming soon" placeholders. \[via stripe.com/payments/checkout product page + docs.stripe.com/payments/checkout\]

Order within the row: Apple Pay → Google Pay → Link. On mobile, Link's "Autofill with Link" button may appear as the primary because Stripe knows it has the highest completion rate for returning users.

This is the most copied pattern in DTC checkout. For Clarté: no PK wallet rails exist, so this entire row is replaced by the `trust-cod-hero` band — which is already implemented and correctly positioned above the form fields in `CheckoutForm.tsx`.

---

## Form structure

Stripe Checkout collects the following fields in this order \[via docs.stripe.com/payments/checkout/how-checkout-works + docs.stripe.com/checkout/quickstart\]:

1. **Email** — `type="email"`, `autocomplete="email"`, `inputMode="email"`. Always first. Used for receipt, Link account detection, and marketing opt-in if enabled.
2. **Marketing opt-in checkbox** — optional, shown below email if merchant enables it. Default: unchecked.
3. **Name on card** — single full-name field, not split first/last. `autocomplete="name"`. \[via Stripe payment-html-forms guide\]
4. **Card number** — `autocomplete="cc-number"`, numeric keyboard triggered.
5. **Expiry** — `autocomplete="cc-exp"`.
6. **CVC** — `autocomplete="cc-csc"`.
7. **Country** — dropdown, positions before postal in regions where postal alone is insufficient.
8. **Postal / ZIP** — numeric keyboard, `autocomplete="postal-code"`.
9. **Shipping address block** (if merchant enables shipping collection): Address Line 1, Address Line 2 (hidden behind a link by default — Baymard-recommended pattern), City, State/Province dropdown, Postal, Country.
10. **Phone** — shown below shipping address if shipping is enabled; shown below email if no shipping step. Optional unless merchant sets required. \[via docs.stripe.com/payments/checkout/phone-numbers\]

**What is required vs optional:** Email, card fields, and country/postal are always required. Company, Address Line 2, and phone are optional by default. Custom fields (up to 3) can be added via the Dashboard with optional=true flag per field. \[via docs.stripe.com/payments/checkout/custom-fields\]

**Single name field, not split first/last:** Stripe uses one "Full name" field. This aligns with Baymard's finding that split first/last causes 42% of users to enter their full name in the first field — the single-field variant reduces form abandonment.

**Address Line 2 hidden behind a link:** Stripe hides the apartment/suite field behind an "Add apartment, suite, etc." link. Only 20% of benchmark sites do this (Baymard 2024) despite the strong evidence that visible Address Line 2 causes users to stop and worry about how to split their address.

---

## Validation

**Timing:** On-blur for most fields — validation fires when the customer tabs or taps out of a field. Exception: card number and expiry validate on character-count completion (when the field reaches 16 digits / 5 characters), not on blur, because the correct length is unambiguous. \[via Stripe mobile checkout best practices + Baymard inline validation research\]

**Never on-focus (premature):** Stripe explicitly avoids validating empty fields when the user first clicks into them. Baymard research recorded users saying "I don't like how this is yelling at me before I've tried to submit anything" when sites validate on focus. Stripe's defaults avoid this.

**Inline error treatment:** Error messages appear directly below the offending field in red text. The field border turns red. The error message updates at the keystroke level — it disappears the instant the input becomes valid, not just on the next blur. This is Baymard's "positive inline validation" — errors vanish in real-time, not after another tab-out.

**Positive validation icons:** Green checkmarks appear on fields that pass validation. This is the "positive inline validation" pattern Baymard recommends, confirming correct entries before the user reaches the submit button.

**Don't clear on error:** When the form has a server-side error (e.g., card declined), Stripe does not clear all fields. Only the payment fields are cleared if the card is declined; name, email, and address are preserved. \[via Stripe payment forms best practices — "don't clear all fields when there's an error"\]

**Adaptive error messages:** Error messages are specific to the failure reason. "Your card number is incomplete" not "Invalid input." "Your card was declined" not "Payment failed." Baymard calls this "adaptive error messaging" and notes 94% of sites don't implement it.

---

## Address autocomplete

Stripe's Address Element supports Google Places autocomplete for 25 countries (AU, BE, BR, CA, CH, DE, ES, FR, GB, IE, IN, IT, JP, MX, MY, NL, NO, NZ, PH, PL, RU, SE, SG, TR, US, ZA). \[via docs.stripe.com/elements/address-element\]

Trigger: fires after 3+ characters are typed in Address Line 1, showing a dropdown of matching addresses. On selection, it pre-fills City, State/Province, Postal Code, and Country fields automatically. The fallback when autocomplete fails is graceful — the dropdown simply doesn't appear and the customer fills fields manually; no error state.

Pakistan is not in the supported-countries list. This means Clarté cannot implement Stripe Address Element autocomplete anyway. The relevant lesson is behavioral: the 3-character trigger, the dropdown pattern, and the graceful fallback are the right model for a Pakistani address autocomplete if Clarté ever integrates a Pakistani mapping API.

---

## Shipping method selection

Not present in the standard Stripe Checkout hosted flow. If a merchant configures shipping rates, Stripe renders them as radio-card rows below the shipping address block. Each row shows: carrier name (or "Standard"), delivery window as a date range ("Arrives May 28–30", not "2–4 business days"), and price. \[via docs.stripe.com — shipping rates configuration\]

The date-range format over speed-description is consistent with Baymard and Apple's pattern — "Arrives May 28–30" is cognitively superior to "Standard (2 business days)."

---

## Payment + trust

**Payment method presentation:** Card fields render in a single grouping. Alternative payment methods (Apple Pay, Google Pay, Link) are above the fold, as noted in the express-checkout section. No tabs between payment methods — the page shows the fastest method first, then the form.

**Trust signals:** A "Powered by Stripe" lock-badge footer appears below the submit button. This is Stripe's primary trust signal — it does not add SSL shield badges or generic security imagery because Baymard and Stripe's own research show those "quiet but visible" trust marks perform better than decorative badge clusters. \[via Stripe one-step checkout guide: "Don't overdo it. Trust signals work best when they're quiet but visible."\]

**Order summary positioning:** In Stripe's two-column desktop layout, the order summary (product image, name, price, taxes) is in the right column, persistent across all steps. On mobile, a collapsible header shows the total — tap to expand. This is the universal right-rail/collapsible-header pattern confirmed across all eight skincare-brand references in `05-checkout.md`.

---

## Submit button

**Copy pattern:** The canonical Stripe default is `"Pay $42.98"` — verb + amount embedded in the button label. Configurable via `submit_type` parameter (`pay`, `donate`, `subscribe`, `book`). \[via Stripe mobile checkout UI guide\]

The rationale is documented: "Make the action specific — 'Pay $42.98' often works better than a vague 'Continue.'" The customer sees the commitment amount on the very button they're about to tap. Allbirds uses the same pattern ("Pay now — $138.00") cited as the strongest DTC button copy in `05-checkout.md`.

Clarté already implements this: `CheckoutForm.tsx` / `OrderSummary.tsx` renders "Place Order — Rs. {total}" with the live total embedded via `preview.totals.total_pkr.toLocaleString('en-PK')`. This is correct and no change is needed.

**Loading state:** Button copy changes to "Placing order…" (spinner replaces or supplements label) during the async submit. Clarté already has `submitting ? 'Placing order…'` in `OrderSummary.tsx` line 132.

**Disabled state:** Button is disabled until required fields pass validation. Stripe's default enforces this at the JS level; Clarté uses `disabled={submitting}` — this only disables during the fetch, not during validation. See "What to lift" below.

**Sticky mobile:** Stripe's mobile submit button is pinned to the bottom of the viewport with a full-width layout when the form overflows the screen. `min-height: 44px` applies to meet Apple HIG tap-target requirements.

**Post-submit:** On success, the page redirects to the merchant's `success_url`. No in-page animation; the browser navigates. Clarté mirrors this with `window.location.assign('/order/{orderNumber}?phone={last4}&placed=1')` — the correct pattern.

---

## Post-submit success / confirmation

Not part of Stripe Checkout's hosted surface — the success page is owned by the merchant. Stripe provides the order data via webhook or session retrieval API; the merchant's success page is responsible for the confirmation experience. See `06-thank-you.md` for the Clarté-specific confirmation recommendations.

---

## Microinteractions + state

**Loading skeleton:** The Stripe Checkout hosted page renders a full-page loading skeleton (white cards with animated shimmer) on slow networks. Fields appear progressively as JS loads. No blank-page flash.

**Slow-network handling:** If the checkout session takes > 3s to initialise, a spinner appears in the place of payment element. The form never shows an empty or broken state.

**Error recovery (network failure mid-submit):** If the fetch to Stripe's API fails, the error appears below the form (not replacing the form) and the button re-enables. The customer does not lose their entered data. Clarté's `CheckoutForm.tsx` handles this correctly in the `catch` block at line 100-103, setting `setErr` and `setSubmitting(false)`.

**Quantity-update debouncing:** Not applicable to Stripe Checkout (no cart quantity controls within the hosted page). The order line items are passed from the session and are not editable inside checkout.

---

## Mobile-specific

- **Single-column layout.** All Stripe form guidance prohibits side-by-side fields on mobile. City + State + ZIP never share a row on mobile even if they do on desktop. \[via Stripe mobile checkout UI: "Use a single-column layout for mobile. Multicolumn forms don't translate well to small screens."\]
- **Labels above fields, never placeholder-only.** Stripe's mobile guide explicitly: "Keep form labels outside of input fields" and "Top-align all field labels." Placeholder text is a supplement, not a replacement. This matters because placeholder text disappears on focus, leaving the customer unsure what the field was for mid-entry.
- **Correct keyboard types per field:**
  - Email: `type="email"` → shows `@` key; `inputMode="email"`
  - Phone: `type="tel"` → numeric pad with `+` and `()`
  - Card number / postal: `inputMode="numeric"` → numeric pad
  - Card expiry: accepts MM/YY autocomplete via `autocomplete="cc-exp"`
  - State/Country: native `<select>` → triggers native picker, not free text
- **Minimum tap target:** 44px × 44px for all interactive elements (Apple HIG standard; also enforced by Stripe Elements' default CSS).
- **Floating vs. above-label:** Stripe mobile guide recommends "floating labels that stay visible, or labels above the fields." Stripe's own Elements use labels **above** fields (not inside) for accessibility — floating labels that overlap the input create WCAG 1.4.4 (resize) and 1.3.1 (info and relationships) issues that a fixed above-label avoids entirely.
- **Sticky submit CTA:** On mobile, the submit button is full-width and stays within thumb range (lower half of screen). The Stripe guide: "Place them where thumbs naturally land: toward the lower half of the screen, not the top."
- **Autofill:** Stripe actively encourages browser autofill. The correct `autocomplete` attributes on each field (as listed above) allow iOS/Android to pre-fill the entire form from saved addresses and payment methods in one tap. This is the mobile-checkout lever Clarté should maximally exploit.

---

## What to lift for Clarté

**1. Correct `autocomplete` and `inputMode` attributes on every field in `CheckoutForm.tsx`.** Currently `CheckoutForm.tsx` has `type="tel"` on phone (correct) and `type="email"` on email (correct) but no explicit `autocomplete` attributes anywhere. Adding `autocomplete="name"` on the name field, `autocomplete="tel-national"` on phone, `autocomplete="email"` on email, `autocomplete="street-address"` on address, and `autocomplete="postal-code"` on postal code allows iOS/Android to pre-fill the entire Contact + Shipping section in one tap from a saved address. This is zero-cost and directly reduces form abandonment — applies to `CheckoutForm.tsx` fieldsets on lines 136-183.

**2. On-blur validation with real-time error removal.** Currently `CheckoutForm.tsx` relies on browser-native `required` + HTML5 validation (triggered only on submit via `form.requestSubmit()`). Adding React-side on-blur validation with instant error-removal at the keystroke level is the single highest-impact form change. Pattern: on `onBlur`, mark the field touched and run validation; on `onChange` of a touched field, re-validate instantly so the error disappears as soon as the input becomes valid. This is the Stripe / Baymard pattern — applies to all three fieldsets.

**3. Disable the submit button while required fields are invalid, not just during submitting.** Currently `OrderSummary.tsx` line 126 disables with `disabled={submitting}`. This means the button is enabled even when the form is empty. Adding a `formValid` boolean (all required fields non-empty + passing their patterns) to the `CheckoutForm` state and passing it to `OrderSummary` lets the button communicate "not yet" before the user even attempts submit. Lower-priority than (1) and (2), but completes the feedback loop.

**4. Address Line 2 hidden behind a link.** Currently the form has no apartment/floor field at all — which is fine for Pakistan where addresses are usually a single block description. But if Clarté ever adds an apartment field, use the Stripe / Baymard pattern: hide it behind "Add floor / flat number" link, not always-visible.

**5. Adaptive error messages.** The current `setErr` on line 204 shows the API error string directly. Add a small error-message normalizer that maps known API error codes to plain-language Pakistani-context strings: "We couldn't reach our server — please check your connection or WhatsApp us." rather than a raw JSON error.

---

## What to skip

- **Apple Pay / Google Pay / Link express buttons.** No PK payment rails. The `trust-cod-hero` band already fills this role correctly.
- **Card form fields (cc-number, cc-exp, cc-csc).** No card billing.
- **"Powered by Stripe" footer.** No Stripe integration; would be misleading.
- **Link autofill.** Stripe's saved-payment network — not operational in PK.
- **Shipping rate radio cards.** Clarté has flat Rs. 250 shipping; no carrier selection step is needed or appropriate.

---

## Sources

- https://stripe.com/payments/checkout
- https://docs.stripe.com/payments/checkout/how-checkout-works
- https://docs.stripe.com/checkout/quickstart
- https://docs.stripe.com/elements/address-element
- https://docs.stripe.com/payments/checkout/phone-numbers
- https://docs.stripe.com/payments/checkout/custom-fields
- https://stripe.com/resources/more/one-step-checkout
- https://stripe.com/resources/more/mobile-checkout-best-practices-for-ecommerce-businesses
- https://stripe.com/resources/more/mobile-checkout-ui
- https://stripe.com/resources/more/payment-html-forms
- https://baymard.com/checkout-usability (inline validation, address line 2, field order research)
- https://baymard.com/blog/inline-form-validation
- https://baymard.com/blog/checkout-flow-average-form-fields
- https://baymard.com/blog/current-state-of-checkout-ux
- https://baymard.com/blog/checkout-2024-launch
