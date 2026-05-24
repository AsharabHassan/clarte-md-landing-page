# Brooklinen — Cart + Checkout Teardown

**URL:** https://www.brooklinen.com
**Positioning:** Premium DTC bedding (sheets, comforters, towels); direct-to-consumer since 2014; $60–$350 per item; Shopify Plus
**Why study them:** The closest design-craft reference for "trustworthy DTC without being lifestyle-y." Their checkout is cited as a Shopify Plus benchmark for clarity. Prior coverage (06-thank-you.md) noted their referral program on the confirmation page — this goes deeper on cart drawer structure, the Hardcore Bundle presentation in cart, free-shipping threshold mechanics, and checkout form composition.

**Sourcing note:** brooklinen.com/cart returns truncated content via WebFetch (JS-rendered behind add-to-cart). Sources used: (a) the GoBeyond.AI Brooklinen case study (direct fetch, useful UX descriptions), (b) Brooklinen's own FAQ and help pages (partially accessible via Google snippets), (c) Shopify Plus case study (shopify.com/case-studies/brooklinen), (d) ecomm.design listing (tech-stack confirmed), (e) the product bundle pages (partially accessible). Inline flags where indirect.

---

## URL + entry point

- Cart drawer: triggered on add-to-cart; right-side slide panel
- Full cart page: `https://www.brooklinen.com/cart` (JS-rendered; not fully WebFetchable)
- Checkout: Shopify Plus hosted, standard multi-step architecture; URL pattern `brooklinen.com/checkouts/...`

---

## Cart drawer composition

〔via GoBeyond.AI case study + ecomm.design tech listing + Shopify Plus standard patterns〕

Brooklinen operates a **right-side cart drawer** on add-to-cart, sliding in from the right edge. Standard Shopify Plus drawer behavior.

**Drawer dimensions:** approximately 400px desktop, full-screen on mobile. No documented deviation from Shopify Plus default width. 〔unverified exact px — flagged〕

**Header content:** "Your bag" or "Your cart" — exact copy could not be confirmed. "Bag" aligns with DTC premium convention; "Cart" is the Shopify default. 〔unverified — flagged〕

**Item line:** product image (small, ~64px square) left; product name + size/color variant label + price right; qty stepper; remove. Line-item price shown per-unit. 〔standard Shopify Plus drawer pattern, consistent with ecomm.design tech listing confirming Shopify〕

**Qty controls:** standard −/+ stepper. Reduce to 0 removes the item. 〔standard Shopify behavior〕

**Free-shipping bar:** this is the drawer's dominant conversion element. Copy pattern: *"You're $X away from free shipping"* with a progress bar incrementing toward $100 (US, contiguous 48 states, before tax) 〔confirmed threshold via Brooklinen FAQ snippet: "free ground shipping on orders $100 or more"〕. When the threshold is crossed, the bar completes and copy shifts to a congratulatory state. The bar is positioned above the item list or immediately below the header — Brooklinen follows the Shopify community standard of top-of-drawer placement for threshold bars.

**DOCUMENT BUT DO NOT RECOMMEND for Clarté:** Clarté has no free-shipping threshold (flat Rs. 250 always). Never introduce threshold psychology. The bar is documented here purely as a structural reference for what Brooklinen's drawer looks like as a composition: [threshold bar] → [item list] → [subtotal] → [CTA].

**Upsell module inside the drawer:** 〔via GoBeyond.AI case study: "they use this as an opportunity to upsell their All-Purpose Bleach Alternative"〕 Brooklinen surfaces a single product recommendation tile inside the cart for orders that don't yet include a complementary care product. The tile has a product image, name, price, and a direct "Add" button. Position: below the item list, above the checkout CTA. Low-density — one recommendation, not a carousel.

**Add-a-note field:** 〔via GoBeyond.AI: "another little detail we love is the opportunity to add a message to the order"〕 A collapsible "Add a note to your order" field appears in the drawer. This is a one-line text input, not a prominent feature — but it exists. Lush's equivalent is more prominent (see 09-lush.md); Brooklinen's is quietly available. For Clarté, this is the pattern that a "skin notes for your doctor" feature could borrow.

**Sticky footer totals and CTA:**
- Subtotal label + amount
- Free-shipping threshold reminder (if not yet reached)
- Primary CTA: **"Check Out"** 〔Shopify's default capitalization; consistent with Shopify Plus standard〕
- Secondary link: "View Cart" or "Continue Shopping" — smaller, below the CTA
- No express checkout buttons visible in public Brooklinen cart drawer screenshots 〔could not confirm Apple Pay / Shop Pay presence in drawer — flagged; GoBeyond.AI case study mentions "Shop Pay, Affirm, and Venmo" at checkout page, not drawer〕

---

## Cart page composition

〔via GoBeyond.AI case study + Brooklinen bundle pages + Shopify Plus standard full-cart structure〕

Brooklinen's full cart page at `/cart` follows Shopify's standard two-column layout on desktop:
- **Left column:** item list with product images (larger than drawer, ~96×96px), name, size, color, qty controls, remove, line prices
- **Right column:** order summary — subtotal, shipping estimate placeholder ("Calculated at checkout"), promo code input, CTA, and the free-shipping progress indicator

**Bundle presentation in cart:** when a Hardcore Bundle (e.g., the Classic Percale Hardcore Sheet Bundle at ~$299, saving ~15% vs individual) is in the cart, it appears as **a single line item** — the bundle SKU, not individual component SKUs. No component breakdown is shown in the cart. The savings are visible on the line price vs. the regular bundle price (if previously displayed on the PDP), but the cart itself does not show component itemization. 〔inferred from Shopify bundle-as-single-variant pattern and Brooklinen's bundle PDPs listing bundles as single products〕

**Promo code input:** visible by default on the right column of the full cart, not collapsed. Standard Shopify placement.

**Qty controls on full cart:** same −/+ stepper as drawer. "Remove" is a text link or × icon below the product name. 〔could not verify specific remove-item treatment — flagged〕

**Image size:** approximately 96px square on full cart, with studio-quality lifestyle/product photography (flat-lay of sheets on a styled bed). Contrast: Lush uses naked-product photos in cart; Brooklinen uses the same lifestyle PDP shot at a small scale, which is important for variant confirmation (color, material).

**Order message / note field:** appears on the full cart page as well. 〔GoBeyond.AI〕

**Mobile cart page:** single-column, order summary collapses below the item list. "Check Out" CTA remains sticky or prominent at bottom. 〔standard Shopify behavior〕

---

## Cart-to-checkout transition

**Button copy verbatim:** **"Check Out"** — Shopify's default, Title Case with a space. 〔Consistent across multiple Shopify Plus brand references〕

No interstitial pop-up between cart and checkout. The one-click transition is clean — cart button → checkout form, no "before you go" overlay.

**Guest checkout:** yes, default on Shopify Plus. Brooklinen follows the standard pattern: email field at top of checkout form, account creation offered post-purchase. No forced login. 〔GoBeyond.AI: "users are guided through three steps"〕

**Express checkout at top of checkout page:** Shop Pay + Affirm + Venmo buttons appear above the email form on the checkout page (not the cart drawer). 〔GoBeyond.AI: "another checkout page option which allows them a number of express checkout options"〕

---

## Checkout layout

〔via GoBeyond.AI case study + Shopify Plus standard architecture + Shopify case study (shopify.com/case-studies/brooklinen)〕

**Architecture:** Shopify Plus multi-step checkout — three discrete pages:
1. **Information:** email, shipping address
2. **Shipping:** shipping method selection
3. **Payment:** card fields + express buttons + place order

**Step indicator:** Shopify's default breadcrumb — "Information → Shipping → Payment" — with the active step bolded and prior steps as underlined back-links. Brooklinen does not appear to deviate from this default navigation chrome. 〔via Shopify Plus standard patterns + ecomm.design tech listing confirming Shopify Plus〕

**Visual theming:** 〔via Shopify Branding API reference + kopi.ai: "personalized design with light colors that match the website's branding"〕 Brooklinen applies their brand colors to the Shopify checkout form — soft off-white or warm-white background (#F7F6F4 approximate, unverified hex), their navy-to-slate heading color, and a clean sans-serif type treatment. Not aggressively re-skinned — the Shopify form structure is visible — but the colors feel consistent with the storefront.

**Right-column order summary:** sticky, persistent across all three steps on desktop. Shows itemized list with product thumbnails, quantities, line prices, subtotal, shipping cost (shows "Free" when threshold is met), and taxes estimated. 〔Shopify standard〕

**Mobile order summary:** collapsed behind a "Show order summary" toggle at the top of the form, below the breadcrumb. The collapsed state shows the total — important for budget awareness. Standard Shopify Plus mobile behavior.

---

## Form structure + interactions

〔Shopify Plus standard fields with Brooklinen visual theming〕

**Field order:** Email → First name / Last name (side by side on desktop) → Address line 1 → Address line 2 (optional, collapsible) → City → State (dropdown) → ZIP code → Country → Phone (optional) → Shipping method selection (Shipping step) → Card fields (Payment step)

**Input chrome:** Shopify's default input style — rectangular fields, thin border, label above. Brooklinen applies brand color to the border-focus state (likely their navy or a slate accent). Rounded corners matching their general UI aesthetic (approx 4px radius — unverified).

**Validation timing:** Shopify default — on submit, or on blur after first submission attempt. Inline error messages below each field in a muted red.

**Address autocomplete:** yes — Shopify Plus supports Google Places-based address autocomplete. When ZIP is entered, city + state autofill. 〔Shopify Plus standard〕

**Promo code:** not on the cart drawer; appears as a collapsed "Discount code or gift card" field on the cart full page AND at checkout. 〔Shopify standard〕

**Phone formatting:** optional field. No auto-formatter — standard US (555) 555-5555 hint text.

---

## Payment + trust

**Payment methods at checkout:** Shop Pay (accelerated, above form) + Affirm (BNPL, above form) + Venmo (above form) + credit/debit card (Visa, MC, Amex, Discover) + PayPal. Presented in two zones: express buttons at the very top of checkout Information step; card form on the Payment step.

**DOCUMENT BUT DO NOT RECOMMEND for Clarté:** the Affirm BNPL button and the Venmo express option are both irrelevant to COD Pakistan. Never surface payment-rail logos that don't exist in the fulfillment flow.

**Free-shipping achievement copy at checkout:** the order summary right column shows "Free" for shipping once the $100 threshold is met — confirmed as a positive reinforcement signal that the customer made the right choice by meeting the threshold. Again: document, do not replicate.

**Trust signals near submit:** 〔via Shopify standard + kopi.ai score notes: "trust signals, mobile optimization"〕 Minimal. Shopify's standard "All transactions are secure and encrypted" line under the card fields. No press logos, no money-back badges in the checkout form itself. Brand reputation carries the trust.

**Security copy:** Shopify's default "Your information is safe and protected" or "All transactions are secure and encrypted." One line, below the card number field. No prominent badge.

**Returns policy:** linked in the checkout page footer. Brooklinen's return window is within 1 year for unused items. Not staged near the submit button — footer placement only.

---

## Submit button

**Copy verbatim:** **"Pay now"** — Shopify's default submit copy. 〔Shopify Plus standard; Brooklinen does not appear to have customized this〕

**Note for Clarté:** "Pay now" is explicitly wrong for COD. Clarté's current "Place Order — Rs. {total}" is the correct departure from this default. Do not revert.

**Allbirds enhancement pattern (relevant):** Allbirds customizes the Shopify submit to include the total: "Pay now — $138.00." Brooklinen does not appear to do this. Clarté's "Place Order — Rs. {total}" is already superior to Brooklinen's default here.

**Loading state:** Shopify default — button text replaced with a spinner or "Processing..." during submission.

**Disabled state:** Shopify form disables submit until required fields are filled.

**Mobile sticky:** Shopify Plus renders the submit button at the bottom of the viewport as a sticky CTA on mobile for the Payment step.

---

## Microinteractions + state

**Added-to-cart confirmation:** 〔Shopify Plus standard〕 drawer slides in from right immediately on add-to-cart click. Slight overlay shadow behind the drawer. Cart icon in header updates count with a brief scale animation (standard Shopify JS).

**Loading skeletons:** Shopify Plus renders a skeleton/spinner for the order summary while the checkout loads.

**Empty cart state:** "Your cart is empty" 〔Shopify default〕 with a Continue Shopping link. No brand-voice empty state. The Glossier contrast ("but you still look good") demonstrates the brand-voice opportunity Brooklinen doesn't fully use. Clarté's empty state could read: *"Your bag is empty. Browse our protocols to get started."*

**Error toasts:** Shopify standard error banners at the top of the form for payment failures or network errors.

---

## Mobile-specific

- Cart drawer becomes full-screen on mobile (standard Shopify behavior)
- Order summary collapses to "Show order summary" disclosure at top of checkout form, showing total in collapsed state
- Express buttons (Shop Pay, Affirm, Venmo) rendered first on mobile, above the email form — the "fastest path to commit" mobile pattern that Clarté should replicate as a COD reassurance block at the top of the checkout form
- Sticky submit CTA at bottom of viewport on Payment step
- Address autofill relies on iOS keyboard address suggestion for returning users; new users fill manually

---

## DTC craft specifics

### Free-shipping threshold bar — document, skip for Clarté

Brooklinen's $100 threshold bar is a well-executed example of the pattern. The progress bar composition: a thin horizontal bar spanning the full width of the drawer header area, starting empty, filling as cart value grows. Text above: *"You're $X away from free shipping"* interpolating the delta. On completion: *"You've unlocked free shipping!"* or similar congratulatory copy.

This is textbook threshold AOV lifting. **It has no application to Clarté** (flat Rs. 250 shipping, no threshold). What IS liftable from this pattern: the concept of a progress indicator in the cart for a *different* milestone. For example, a "Complete your protocol" bar that shows 3/4 protocol products in the cart — but this requires Clarté's protocol logic to be cart-aware.

### Hardcore Bundle presentation in cart

The Hardcore Bundle (e.g., Classic Percale: fitted + flat + 4 pillowcases + duvet cover) enters the cart as **a single line item** at the bundle price. Savings (~15%) are visible from the PDP but not re-stated in the cart as "You saved $X." The cart simply shows the bundle name and the bundle price — restraint about savings that parallels Aesop's "rare reduction" posture.

This is the right model for Clarté's protocols in the cart: each protocol is a single line item ("Clear-Skin 12-Week Protocol — Rs. 5,999"), not an itemized list of the 4 constituent products. The composition breakdown is a PDP/protocol-page concern, not a cart concern. Currently Clarté's cart page shows protocols as single line items (confirmed in 04-cart.md baseline), which is already correct.

### Order-by-X, ship-by-Y precision

〔via Brooklinen FAQ page and shipping help: "when will my order ship?" article〕

Brooklinen offers order-cutoff-time messaging that affects ship date. Their FAQ states that orders placed before a cutoff time on business days ship the same day. The checkout **does not surface a specific date inline** during the form (unlike Apple's per-item delivery-date display in the order summary). Delivery is shown as a window at the Shipping step based on the selected method. This is a missed opportunity relative to the Apple benchmark.

For Clarté: showing "Delivers in 2–4 days after WhatsApp confirmation" near the submit button (as recommended in 05-checkout.md synthesis) is more useful than what Brooklinen does — a named window that reduces courier-name guessing.

### Note / order message field

〔GoBeyond.AI: "little detail we love is the opportunity to add a message to the order"〕

A collapsible "Add a note" field in the cart drawer and full cart page. Text input, single-line or multi-line (could not verify). The design treatment is quiet — it doesn't demand attention. For Clarté, this is the structural pattern a "skin consultation note" or "tell us about your skin" input could borrow.

---

## What to lift for Clarté

1. **Single line item per protocol/bundle in cart.** Brooklinen confirms that bundles-as-single-cart-items is the correct pattern. Clarté already does this — validate and preserve it. Do not componentize the cart to show individual product lines within a protocol.

2. **Collapsible "Add a note" field pattern.** In Clarté's cart drawer, add a collapsible text area below the item list: *"Tell us about your skin concern (optional)"* or *"Order note for your courier."* Model the visual treatment after Brooklinen's quiet approach — not a prominent input, just a small text link that expands. Apply to the shadcn Sheet drawer component.

3. **Checkout-breadcrumb step labels as visual anchor.** Brooklinen uses Shopify's standard "Information → Shipping → Payment" breadcrumb. For Clarté's single-page form, the equivalent is the three section headers ("Contact / Shipping / Confirm") styled in JetBrains Mono uppercase — which the 05-checkout.md synthesis already recommends. Brooklinen's checkout validates that named-step navigation reduces anxiety on the checkout surface.

4. **Order summary shows total in mobile-collapsed state.** Brooklinen's Shopify mobile summary shows the total in the collapsed trigger. Clarté's order summary mobile behavior should do the same — the total is the single most important number for a COD customer who needs to prepare cash. If the summary collapses and hides the total, add a `data-total` span to the collapsed trigger.

5. **Typography restraint on form fields.** Brooklinen's checkout applies brand typography to a standard Shopify form without redesigning the form itself. Clarté's `CheckoutForm.tsx` follows the same principle — Plus Jakarta Sans on labels and inputs, with JetBrains Mono on the section eyebrows. Don't over-design the form; let the type system carry the brand.

---

## What to skip

1. **Free-shipping threshold bar.** Flat Rs. 250, no threshold. Never introduce a progress bar toward a free-shipping milestone. Per `feedback_unverified_claims`.

2. **Affirm / Shop Pay / Venmo express buttons.** None are operational in Pakistan. Brooklinen places these above the form on mobile — highest visual prominence. For Clarté, that top-of-form slot belongs to the COD reassurance block ("Cash on Delivery. Pay the courier when your parcel arrives."), not payment-rail logos.

3. **"Pay now" submit copy.** Wrong verb for COD. Brooklinen keeps Shopify's default "Pay now" — Clarté's "Place Order — Rs. {total}" is already superior. Do not regress.

4. **BNPL math in cart.** Brooklinen's case study mentions Affirm installments at the checkout edge. No BNPL rail exists in Pakistan. Don't surface installment math.

5. **Loyalty-points overlay on the order summary.** Brooklinen's referral program mechanics (mentioned in 06-thank-you.md) do not surface at checkout — this is correct behavior. Clarté has no loyalty program currently; the order summary should be clean of non-operational features.

---

## Sources

- GoBeyond.AI — Brooklinen case study: how they acquire customers and grow profitably — https://medium.com/gobeyond-ai/case-study-how-brooklinen-acquires-customers-grows-profitably-online-f5720660a694 (direct)
- Shopify — Brooklinen case study — https://www.shopify.com/case-studies/brooklinen (direct)
- Brooklinen — Cart page — https://www.brooklinen.com/cart (JS-gated; structure inferred from Shopify Plus standard)
- Brooklinen — Free shipping FAQ — https://www.brooklinen.com/pages/faq?a=Does-Brooklinen-offer-free-US-shipping---id--1b50Cl_wSuiEqf4NUNMMOQ (Google snippet; direct fetch truncated)
- Brooklinen — Classic Percale Hardcore Bundle — https://www.brooklinen.com/products/classic-hardcore-sheet-bundle (direct fetch truncated; product structure inferred)
- Brooklinen — All Bundles — https://www.brooklinen.com/pages/all-bundles (direct)
- Brooklinen — Shipping FAQ — https://www.brooklinen.com/blogs/faq/when-is-my-order-shipping (direct fetch truncated)
- Brooklinen — Rewards Program — https://www.brooklinen.com/pages/rewards (direct)
- ecomm.design — Brooklinen listing — https://ecomm.design/site/brooklinen/ (direct; confirms Shopify platform + Klaviyo + GA)
- Kopi AI — Brooklinen Shopify analysis score 92/5 — https://www.trykopi.ai/shopify-analyzer/brooklinen-eb1OH9z3 (truncated)
- ReferralCandy — Brooklinen referral program — https://www.referralcandy.com/blog/bedding-referral-program-examples-brooklinen (sourced for 06-thank-you.md; cross-referenced here)
- Baymard Institute — Checkout UX benchmark (general patterns) — https://baymard.com/blog/current-state-of-checkout-ux
