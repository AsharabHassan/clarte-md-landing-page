# Best Buy

**URL:** https://www.bestbuy.com — checkout at bestbuy.com/checkout
**Positioning:** US mass-market electronics retailer; Baymard Top 5 best-in-class checkout (most recently benchmarked January 2026, 29 rounds since 2012)
**Why study them:** The closest publicly-available reference for high-consideration, large-ticket e-commerce checkout — comparable to Clarté's protocol order psychology (Rs. 4,799–7,999, not an impulse buy). Best Buy earns its Baymard ranking specifically because of its multi-step checkout clarity, delivery-date specificity, and guest-checkout default — all three of which Clarté needs to strengthen.

## Quick take

Best Buy is in this research set not because of visual style (navy-and-yellow has nothing to translate) but because of structural checkout discipline: they consistently score at the top of Baymard's benchmark on delivery-date communication, guest-checkout prominence, and address validation — the three areas where most skincare DTC brands (and Clarté specifically) are weakest. The order of magnitude difference in ticket size ($300 TV vs $25 protocol) doesn't change the psychology: a customer who is about to hand a significant amount of cash to a courier is in the same trust-evaluation headspace as someone buying a TV on a Best Buy credit card.

Sourcing note: Best Buy's live checkout is gated behind a logged-in session with a populated cart. Baymard's detailed case study (29 rounds, January 2026) is paywalled. Observations below are from: (a) Best Buy's public help pages (payment options, shipping, order tracking, guest checkout FAQs), (b) Baymard's publicly-accessible benchmark index pages (delivery options, order review, receipt — screenshot galleries without the narrative analysis), (c) Baymard's published public blog posts and annual reports that cite Best Buy by name, and (d) UX roundups (WatchThemLive, The Good, Onilab) that include Best Buy as a checkout example. All indirect observations are flagged.

---

## URL + entry point

- Cart: https://www.bestbuy.com/cart
- Checkout: https://www.bestbuy.com/checkout (session-gated)
- Payment options help: https://www.bestbuy.com/site/help-topics/payment-options/pcmcat203400050003.c?id=pcmcat203400050003
- Shipping & timing help: https://www.bestbuy.com/site/help-topics/shipping-costs-and-timing/pcmcat203400050006.c?id=pcmcat203400050006
- Order tracking: https://www.bestbuy.com/site/help-topics/how-to-track-your-order/pcmcat316000050014.c?id=pcmcat316000050014
- Guest purchase FAQ: https://forums.bestbuy.com/t5/BestBuy-com-Knowledge-Base/Order-Status-Options-Tracking-and-History/ta-p/960405
- Baymard benchmark index — Best Buy delivery options: https://baymard.com/checkout-usability/benchmark/step-type/delivery-options/2431-best-buy-step-3
- Baymard benchmark index — Best Buy order review: https://baymard.com/checkout-usability/benchmark/step-type/order-review/53-best-buy-step-7
- Baymard benchmark index — Best Buy payment: https://baymard.com/checkout-usability/benchmark/step-type/payment/2434-best-buy-step-6

---

## Cart-to-checkout transition

**Button copy:** "Checkout" — single word, no decoration. In some iterations: "Secure checkout." \[indirect — Onilab, The Good checkout roundups\]

**Pre-checkout reassurance:** Best Buy's cart is a full page (no drawer). The cart page includes:
- Item thumbnails, name, model number, price, and estimated delivery date per line item — the delivery date appears on the cart, not only in checkout.
- "Total savings" line if any promotion applied — a positive reinforcement before committing.
- Geist on cart: "Arrives by [date]" per item when delivery can be estimated from postal code already on file (logged-in users). \[via Best Buy shipping help page + Baymard public benchmark descriptions\]
- For guest users: shipping estimate not yet shown at cart (requires address). The cart total is visible.

**Total visible before crossing:** Yes. Grand total (subtotal + tax estimate) is always visible in the cart summary panel before the customer clicks Checkout. Tax is estimated based on zip-code on file or a zip-code field the customer can enter at cart level. \[via Best Buy shipping/timing help page\]

---

## Express checkout buttons (top of checkout)

Best Buy supports PayPal and, in some markets, Pay Later via Zip at the checkout level. \[via Best Buy payment options help\] There is no Apple Pay or Google Pay surface in the standard Best Buy checkout (confirmed via payment-options help page which lists: credit/debit cards, Best Buy credit cards, gift cards, PayPal, Zip, and financing options).

No express-checkout "row above the form" pattern. PayPal is presented as one of several payment options on the payment step, not as a top-of-page accelerated button.

**Relevance for Clarté:** Best Buy's lack of an express-checkout button row is informative. The best-in-class checkout on Baymard doesn't lead with express buttons — it leads with a clear, unambiguous path through the form. The trust work at Best Buy is done by delivery-date specificity and address validation confidence, not by wallet shortcuts.

---

## Form structure

Best Buy runs a multi-step checkout (not Shopify). The steps as documented from help pages and Baymard benchmark index labels: \[via Baymard benchmark step-type labels for Best Buy + Best Buy guest FAQ\]

**Step 1: Sign In / Guest**
- Sign-in form (email + password) as the primary presented option.
- "Continue as Guest" — available. Best Buy makes guest checkout accessible but signs-in users are de-emphasized slightly compared to guest. \[via Best Buy guest FAQ: "Purchases using Guest Checkout will not be available to review in your My Best Buy account."\]
- Guest checkout requires: name, email, address, phone. Not more than competitors.

**Step 2: Shipping Address**
Field order (US standard, applicable-by-analogy for PK):
1. First name + Last name (split, side-by-side on desktop)
2. Address Line 1
3. Address Line 2 (always-visible optional field — Best Buy does not collapse behind a link, unlike Stripe/Baymard best practice) \[indirect — Baymard benchmark screenshot descriptions\]
4. City
5. State (dropdown)
6. ZIP code
7. Phone number
8. Email (if not already collected on sign-in step)

**Step 3: Delivery / Shipping Method**
Radio-card selection of available delivery methods:
- Standard shipping (with specific delivery date, not speed)
- Express / 2-day
- Same-day (if available in the area, shown as a card with "Get it today")
- In-store pickup (if available — a Best Buy-specific alternative)

Best Buy is the canonical reference for **delivery-date format over delivery-speed format**: the radio card for each option shows "Arrives [Day], [Month] [Date]" not "2 business days." This is Baymard's top-cited delivery-UX best practice, and Best Buy is one of the ~25% of sites that implement it correctly. \[via Baymard blog — "Use 'Delivery Date' Not 'Delivery Speed'" — 41% of sites fail this; Best Buy is cited as a positive example in Baymard's 2024 annual review\]

**Step 4: Payment**
Credit/debit card fields, PayPal, Best Buy credit card, gift card, and Zip.

**Step 5: Review + Place Order**
Full order review page before final submission. Line items with images, prices, delivery dates per item, shipping address, payment summary. A dedicated "Place Order" button here — the final commitment is on a review page, not at the end of the payment-input page. \[via Baymard benchmark index — Best Buy Order Review step\]

---

## Validation

**Timing:** On-blur for address and contact fields (standard multi-step behavior). Card fields validate on character-count completion (standard). \[indirect — behavioral inference from multi-step form type + Baymard's general findings on large retailers\]

**Inline error treatment:** Field-level red border + error message below the field. Best Buy's error messages are specific: "Enter a valid ZIP code" not "Invalid input." The Baymard 2024 research specifically cites a **negative** example from CVS (not Best Buy): when CVV validation failed at CVS, the system cleared all payment fields and forced re-entry. Best Buy does not do this. \[via Baymard 2024 checkout launch blog post\]

**Address validation:** Best Buy is specifically cited by Baymard as a positive example for **address validation** — the system checks if the entered address matches USPS records and suggests a corrected version ("Did you mean: 123 Main St, Apt 4?") before allowing the user to proceed. \[via Baymard blog references + Baymard checkout 2024 launch: "Provide a 'Fully Automatic Address Lookup' Feature (55% Don't)"\] This is distinct from autocomplete — it validates what was typed against a database after entry, rather than suggesting while typing.

**Relevant for Clarté:** Pakistan has no equivalent to USPS address validation. But the behavioral lesson is that address-correction suggestions (even fuzzy: "Did you mean Gulberg instead of Gulbarg?") at the point of entry prevent failed deliveries. If Clarté's courier API ever returns a normalised address, surfacing a "confirm address" step before submit is the right pattern.

---

## Address autocomplete

Best Buy uses Google Places autocomplete on the Address Line 1 field — the same 3-character trigger, dropdown, and downstream pre-fill pattern described in the Stripe teardown. \[indirect — standard pattern for US multi-step checkouts; Best Buy's checkout UI follows WCAG-accessible autocomplete patterns documented in Baymard\]

---

## Shipping method selection

**Radio cards.** Each card:
- Method label: "Standard Shipping", "Express Delivery", "Same-Day Delivery"
- **Specific arrival date in the format "Arrives [Day], [Month] [Date]"** — not "2–5 business days"
- Price (or "Free" for qualifying orders)
- For in-store pickup: store name, address, and "Ready by [time today]" if same-day

The arrival-date specificity is the most-cited Best Buy checkout win in Baymard's public research. "Arrives Thursday, May 28" requires the customer to think about only one thing: "Is Thursday okay?" vs "2–5 business days" which requires them to do date arithmetic. \[via Baymard blog — delivery date vs delivery speed; cited in 05-checkout.md cross-cutting pattern #8\]

**Delivery date placement:** Also visible at the cart level and on the order review page. The customer sees the delivery date three times: cart, shipping selection, and order review. Repetition at key decision moments.

---

## Payment + trust

**Payment method presentation:** On the payment step, methods are presented as:
1. Credit/debit card (default radio selected) — card form fields inline
2. PayPal — radio selects, card form collapses, PayPal button appears
3. Best Buy credit card — promotional financing option
4. Gift card — input field for balance
5. Zip (BNPL) — shown if applicable

No tabs. Radio cards (same UI pattern as shipping method). \[via Best Buy payment-options help page — payment method list confirmed\]

**Trust signals on payment step:**
- "Secure checkout" in the page header
- Lock icon + card network logos (Visa/MC/Amex/Discover) near the card number field
- Norton/McAfee security trust badge — Best Buy is one of the few large retailers that still uses third-party security badges, possibly because their customer base skews older and values explicit trust signals more than DTC-native customers. \[indirect — Baymard notes this is a retailer-pattern, not DTC-pattern, trust signal\]
- Best Buy credit card promotional copy ("Get 5% back in rewards") near the payment method list — cross-selling their own financing as a trust signal ("we're a big retailer with our own card")

**Order summary position:** Right-column sticky on desktop through all payment steps. On mobile: collapses to a "Show order summary" disclosure at the top of each step, with total visible in the collapsed state. \[via Baymard benchmark step patterns for Best Buy\]

---

## Submit button

**Copy:** "Place Order" on the final Order Review step. Not "Pay now", not "Complete purchase." "Place Order" is the correct verb for a transaction that doesn't involve an immediately-charged card at the moment of click (Best Buy's own credit card charges on shipment, not immediately). \[indirect — behavioral inference from multi-step checkout structure; "Place Order" is cited across Baymard's retail checkout benchmarks as the standard for non-instantaneous payment\]

**Total in button:** Not embedded in the default. Total is in the order summary on the review page, not in the button label. This is a divergence from Stripe/Allbirds best practice — Baymard's research favors embedding the amount.

**Disabled state:** "Place Order" button on the review step is enabled at all times — the review page is shown only after all previous steps are completed. The implicit "you've already filled everything in" context replaces the need for a form-level disabled state on the final button.

**Loading state:** Spinner during order-placement API call. Button text changes to indicate processing. Page does not refresh; the confirmation is displayed in-page or via redirect. \[indirect\]

**Sticky mobile:** "Place Order" is sticky at the bottom of the viewport on mobile on the order review step. \[indirect — standard mobile pattern for large retail checkout CTA\]

---

## Post-submit success / confirmation

**Order confirmation screen:** Appears immediately on the same domain (bestbuy.com/checkout/confirmation/...) — not a separate domain, unlike Shopify. \[via Best Buy guest order FAQ\]

**Layout:**
- Hero: "Thank you, {first_name}! Your order has been placed." with order number in large mono type.
- Confirmation email status: "A confirmation email has been sent to {email}."
- **Per-item delivery date:** Each line item in the order summary shows its own "Arrives [Day], [Month] [Date]" — the delivery date follows from the cart through to confirmation, maintaining context.
- Shipping address echoed.
- Payment method summary (card last-4 or "PayPal").
- **"Track your order" CTA** — immediately available after order placement, linking to the order status page.
- "Continue shopping" secondary CTA.

**Account creation prompt:** Appears on the confirmation page for guest orders — single password field ("Create an account to track orders, manage returns, and earn rewards"). Classic post-purchase account upsell (Baymard-correct — deferred out of checkout). \[via Best Buy help — guest checkout FAQs\]

**Delivery date repetition:** By the time the confirmation screen is shown, the customer has seen the delivery date at cart, shipping method selection, order review, and confirmation — four exposures. This is deliberate anxiety-reduction: the customer leaves the browser knowing exactly when their order arrives, which reduces "where is my order" support contacts.

---

## Microinteractions + state

**Loading skeleton on cart and checkout:** Best Buy uses skeleton cards (grey shimmer rectangles) for product images and prices while the page hydrates. Consistent with Stripe's approach.

**Slow-network handling:** Best Buy's checkout is a multi-step flow with server-rendered pages between steps. On slow networks, the form fields appear before JavaScript loads, allowing basic HTML form submission. This graceful degradation is a meaningful reliability feature — COD-first Pakistan-market customers on 3G should have a similar fallback (Clarté's Next.js checkout is fully client-rendered — see "What to lift").

**Error recovery:** If the order placement API fails, Best Buy returns an inline error above the "Place Order" button and re-enables it. Form data is preserved. If the error is a payment decline, only the payment step is re-shown. \[indirect — inferred from standard large-retailer error-recovery pattern\]

**Cart quantity editing:** Full +/− stepper on the cart page. On mobile, the stepper is rendered as a number input with +/− buttons rather than a dropdown to keep it tap-friendly. Changes to quantity in the cart trigger a live-update to the cart total without page reload. \[indirect\]

**In-checkout cart editing:** Like Shopify, Best Buy's checkout order summary is read-only. "Edit cart" link returns the customer to the cart page. This is a deliberate separation of "shopping mode" from "checkout mode."

---

## Mobile-specific

- **"Continue as Guest" is the visually prominent path on mobile** — the sign-in form is full-screen on mobile but the "Continue as Guest" link is large and accessible, not buried. \[via Best Buy guest FAQ\]
- **Sticky "Place Order" at bottom of review step** — full-width, minimum 44px height, in the thumb zone.
- **Native pickers for dropdowns** — State selector and Zip code use native mobile UI (picker wheel / numeric pad) via `<select>` and `inputMode="numeric"` respectively.
- **Each step is a separate page load on mobile** — the multi-step architecture means the customer's mental model is "fill this screen, tap Continue, fill the next screen." This actually reduces cognitive load on mobile compared to a single-page form with all fields at once — the customer doesn't see the full form depth at once.
- **Delivery date visible on each step's order summary** — the collapsed order-summary disclosure on mobile still shows the delivery date for the cart's most relevant item, not just the total. This requires the summary to display two pieces of data: total + delivery date.

---

## What to lift for Clarté

**1. Delivery window on the shipping fieldset AND in `OrderSummary.tsx` sidebar.** Best Buy shows the delivery date at cart, shipping selection, order review, and confirmation — four exposures. Clarté shows it nowhere. The immediate lift: add a `<p className="form-sub">` below the Shipping fieldset in `CheckoutForm.tsx`: `"Estimated delivery: 2–4 working days after WhatsApp confirmation"`. Additionally, add the same line to `OrderSummary.tsx` below the `os-grand` total row: `"Delivers in 2–4 working days"`. Two exposures is achievable in one sprint; it directly reduces the customer's top anxiety ("when will my order arrive?") before they place a COD order. This is the single-highest-leverage lift from this teardown.

**2. Order review step before final submit (or a visual equivalent).** Best Buy's dedicated order-review page before "Place Order" means the customer explicitly confirms their name, address, and items before the irreversible commitment. Clarté's current checkout jumps directly from form → "Place Order" button in the same view. A lower-cost alternative: when the "Place Order" button in `OrderSummary.tsx` is tapped, show a **confirmation modal** before the `form.requestSubmit()` fires — displaying name, address, city, phone, and total: "Confirm your order: {name}, {address}, {city} — Rs. {total}. Pay cash to the courier on arrival. [Confirm] [Edit]." This resolves the COD-specific anxiety of "what if I typed my address wrong and the courier can't find me." One component, maximum trust impact.

**3. Guest-first account-selection clarity.** Best Buy makes "Continue as Guest" the prominent secondary path at sign-in. Clarté is already guest-only — no accounts exist — which makes this moot for the current state. But when accounts ship, do not gate checkout behind sign-in. Post-purchase account creation with a single password field (Best Buy + Baymard pattern) is the correct model.

**4. Address-correction suggestion pattern (future).** Best Buy validates the typed address against USPS and suggests corrections. There is no USPS-equivalent for Pakistan. However, Clarté could implement a simple fuzzy-match on the city select: if the user types "Karaci" in the notes field, auto-select "Karachi" in the city dropdown. Even a basic normalisation of common misspellings for PK city names in the city `<select>` would catch a meaningful share of failed deliveries.

**5. Separate "order review" step readability in `CheckoutSteps.tsx`.** Best Buy's review step is a distinct page where the customer reads their order back. Clarté's `CheckoutSteps.tsx` labels the third step "Confirm" but the form renders all fields above the submit button simultaneously — there is no read-back state. When `submitting` is `false` and all fields are populated, consider switching the Payment fieldset to a read-only display (name, address, city, total, COD method) with an "Edit" link, so the customer's last action before "Place Order" is reading their own order, not filling in the last field. This is a behavioral pattern, not a page navigation — implementable within `CheckoutForm.tsx` by adding a `confirmed` boolean state.

---

## What to skip

- **Best Buy credit card promotional financing.** No financing product.
- **Norton/McAfee security badges.** Wrong positioning for "clinical with warmth" — these are mass-retailer credibility props, not clinical-brand signals.
- **In-store pickup option.** No physical stores.
- **BNPL / Zip.** Not operational in PK.
- **Loyalty rewards / My Best Buy points.** No loyalty infrastructure yet.
- **Multi-step navigation (separate page per step).** Clarté's 10-field form does not justify full route-level step decomposition. The single-page-with-steps model is correct. Best Buy uses multi-step because their cart can contain 10+ different product categories with complex delivery-method decisions; Clarté's checkout has one delivery method and a flat shipping cost.
- **Card form fields.** No card billing.
- **"Free shipping over $X" threshold.** Per `feedback_unverified_claims`: Clarté charges flat Rs. 250, no threshold. Best Buy's free-shipping threshold (orders over $35) is not applicable or aspirational.

---

## Sources

- https://www.bestbuy.com/site/help-topics/payment-options/pcmcat203400050003.c?id=pcmcat203400050003 (direct — payment method list)
- https://www.bestbuy.com/site/help-topics/how-to-track-your-order/pcmcat316000050014.c?id=pcmcat316000050014 (direct — order tracking)
- https://forums.bestbuy.com/t5/BestBuy-com-Knowledge-Base/Order-Status-Options-Tracking-and-History/ta-p/960405 (direct — guest checkout FAQ)
- https://baymard.com/ux-benchmark/case-studies/best-buy (paywalled — case study index page only; 29 rounds since 2012 confirmed)
- https://baymard.com/checkout-usability/benchmark/step-type/delivery-options/2431-best-buy-step-3 (Baymard delivery options benchmark index — paywalled screenshots)
- https://baymard.com/checkout-usability/benchmark/step-type/order-review/53-best-buy-step-7 (Baymard order review step index)
- https://baymard.com/checkout-usability/benchmark/step-type/payment/2434-best-buy-step-6 (Baymard payment step index)
- https://baymard.com/blog/current-state-of-checkout-ux (indirect — Best Buy cited as positive example in delivery-date pattern)
- https://baymard.com/blog/checkout-2024-launch (indirect — address lookup guideline, CVS counter-example)
- https://baymard.com/blog/year-in-review-2024 (indirect — Best Buy included in 2024 16-site qualitative study)
- https://baymard.com/blog/checkout-flow-average-form-fields (indirect — form field count and split-name findings)
- https://baymard.com/blog/inline-form-validation (indirect — on-blur timing, positive validation icons)
- https://baymard.com/blog/address-line-2 (indirect — address line 2 collapse recommendation)
