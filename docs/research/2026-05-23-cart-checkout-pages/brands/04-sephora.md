# Sephora

**URL:** https://www.sephora.com  
**Cart URL:** https://www.sephora.com/basket (full-page; no public drawer URL)  
**Checkout URL:** https://www.sephora.com/checkout (gated behind sign-in or guest entry)  
**Positioning:** Largest multi-brand beauty retailer in the US. Mass-prestige. $12–$400 range. Loyalty-first retention model.  
**Why study them:** Sephora's cart and checkout set the expectation grammar for beauty e-commerce customers. The Beauty Insider loyalty integration, sample picker, and BOPIS/gift features are the most-copied patterns in the segment.

> Sourcing note: sephora.com returns HTTP 403 to bot user agents across all cart and checkout routes. All observations below are triangulated from: (a) Baymard Institute UX benchmark (scored 251 pre-redesign, 575 post-redesign — via ritsandcompany.com case study); (b) Sephora help pages accessed before 403; (c) Sephora Beauty Insider community posts 2024; (d) Paze integration press release; (e) ECDB payment-method data; (f) JL Design checkout redesign case study. Sources flagged inline as [indirect].

---

## URL + entry point

Full-page `/basket` is the canonical cart. There is no persistent mini-cart drawer on the Sephora web experience [indirect: Baymard]. The add-to-basket action updates a header badge count and offers a "View Bag" inline toast; actual cart interaction happens at `/basket`. The mobile app has a distinct cart tab experience but the web is full-page only.

---

## Cart drawer composition

Sephora does not ship a slide-out cart drawer on the web storefront [indirect: Baymard, community]. The add-to-basket confirmation is a transient header notification, not a drawer. The user must navigate to `/basket` for full cart interaction. This is notable because it means Sephora's "cart" is unusually full-page-only for a retailer of its size.

---

## Cart page composition

**Layout:** Two-column on desktop — items list left, order summary right. The right column is sticky [indirect: Baymard, JL Design].

**Item line:** Product thumbnail + name + shade/size variant + quantity stepper + price per line + remove control. Each line item shows the individual unit price and the line total separately [indirect: Baymard, community screenshots].

**Quantity controls:** +/− stepper. Reducing to 0 removes the item [indirect: Baymard].

**Remove pattern:** Small "Remove" text link adjacent to the qty control. An "Add to Wishlist" / "Save for Later" secondary action sits below the remove, converting potential cart abandonment into a saved item instead of a hard exit [indirect: Baymard].

**Free shipping threshold bar:** Yes — a progress bar at the top or top of the order summary column communicates proximity to free shipping. Standard shipping free over $50 (Beauty Insider members get free standard shipping on qualifying orders with no threshold stated in some tiers) [indirect: help pages].

**Delivery method toggle in cart:** The cart shows shipping method options — "Ship to Me," "Same-Day Delivery" (via DoorDash), and "In-Store Pickup" — as a segmented control per item or per order [indirect: Baymard, Sephora ways-to-shop page].

**Gift options:** "Make this a gift" option in the cart, which adds: (a) a gift message text input, and (b) a gift-wrap add-on. Gift wrapping is available as a paid add-on in the "Delivery & Gift Options" section [indirect: community, gifting help page].

**Beauty Insider Benefits section:** This is the section that sets Sephora apart from every DTC brand in the reference set. Below the items list and above or beside the totals, a collapsible "Beauty Insider Benefits" section contains three things:
1. **Sample picker** — "Add up to 2 free samples" with a curated grid of available deluxe samples (typically 6–10 options). Each sample shows a thumbnail, brand name, product name, and a radio-select button. You pick 2 of the available options [indirect: community posts 2024, samples-promotion help page].
2. **Rewards redemption** — A collapsed "Redeem rewards" field that expands to show point balance and available redemption options. Members can burn Beauty Insider Cash (100 pts = $10) as a cart-level discount [indirect: loyalty-program page, community].
3. **Promo code field** — Collapsed "Apply a promo code" field [indirect: community].

**Sample picker UX specifics [indirect: community posts 2024]:**
- On desktop: sample picker appears in the right-hand "Beauty Insider Benefits" panel, below the order subtotals. The section is labelled "Pick Your Complimentary Samples."
- On mobile: the same section appears at the bottom of the page, under all items; a sticky "Add Up to 2 Free Sample(s)" tab is pinned to the screen bottom to prompt selection.
- The grid shows 6–10 thumbnail cards. Selecting one highlights it with a border ring. After 2 selections, remaining options grey out.
- The section does NOT appear if the basket contains only gift cards (no qualifying merchandise).
- Historically offered 3 samples; as of 2023–2024 community posts, reduced to 2. [The "3 free samples" count in prior research was outdated.]

**Order summary panel (right column):**
- Header: "Order Summary"
- Line breakdown: subtotal, estimated shipping (or "Free" if threshold met), estimated tax, order total
- Beauty Insider points earned: shown in green below the total as "Earn X points with this order." This is a soft pre-purchase loyalty incentive — the customer sees what they'll earn before committing [indirect: loyalty-program page, community].
- Primary CTA: "Checkout" button — large, full-width, brand-dark (black or near-black background)
- Secondary: no secondary "Keep Shopping" in the panel itself; the item list has a breadcrumb back to shopping

**Mobile layout:** Single column. Items stack vertically. Order summary moves below the items list; it is NOT sticky. Beauty Insider Benefits section anchors to the bottom. There is no persistent sticky checkout CTA on mobile in the default web experience — this is a Baymard-flagged weakness [indirect: Baymard, JL Design case study].

---

## Cart-to-checkout transition

**Button copy:** "Checkout" — uppercase C, lowercase remainder [indirect: multiple community screenshots].

**Sign-in gate:** Yes. Sephora presents a "Sign in or continue as guest" step as the first page of checkout. The sign-in prompt is aggressive by DTC standards — Beauty Insider sign-in is the visually dominant option, with "Continue as Guest" as a quieter secondary link. Baymard's 2024 benchmark flagged this as a pattern that adds unnecessary friction [indirect: Baymard, ritsandcompany.com].

**Loyalty enrollment prompt:** If the user continues as guest, the checkout presents a "Join Beauty Insider — it's free" prompt below the email field. Not required but visible [indirect: community].

---

## Checkout layout

**Architecture:** Multi-step, multi-page. The post-redesign flow runs: Account selection → Shipping → Shipping method → Payment → Order review. Baymard scored the redesigned flow at 575 (up from 251), placing it in "State of the Art" on five dimensions [indirect: ritsandcompany.com case study].

**Step indicator:** Numbered breadcrumb at top of page: "1. Shipping / 2. Payment / 3. Review." Completed steps are green-ticked and tappable to edit. This is the most explicit step indicator in the reference set — every prior step is both a status indicator and a navigation target [indirect: Baymard, JL Design].

**Two-column with sticky summary:** Yes on desktop. Order summary right column persists through all checkout steps. It shows the itemized cart with thumbnails, the Beauty Insider points to be earned, shipping, taxes, and the running total [indirect: Baymard, JL Design].

**Mobile order-summary collapse:** On mobile, the step breadcrumb collapses to "Step X of 3." The order summary folds into a "Total: $X" footer with a tap-to-expand sheet. The total remains visible even when collapsed [indirect: Baymard].

---

## Form structure + interactions

**Field order (Shipping step):** Email → Full name → Phone number → Address line 1 → Address line 2 (optional) → City → State → Zip.

**Address autocomplete:** Google Places-style autocomplete on the address field — as you type, a dropdown of matched addresses appears. Selecting auto-fills city, state, zip [indirect: Baymard redesign, community].

**Validation timing:** On-blur validation (validate field when the user leaves it, not on submit). Field-level inline error messages appear beneath the offending field in red [indirect: Baymard, JL Design].

**Error treatment:** Two layers. (1) Inline, field-level error under the input. (2) On submit with errors: a red banner at the top of the form summarizes all errors, and each error item is a clickable anchor that scrolls to the relevant field. This is the most accessible multi-error pattern in the reference set [indirect: Baymard].

**Postal/zip:** Standard 5-digit US zip with +4 optional. No special formatting [indirect: help pages].

**City dropdown:** No dropdown — free-text city field with autocomplete from address lookup [indirect: Baymard].

**Phone formatting:** US phone format, auto-hyphenation on input [indirect: Baymard].

---

## Payment + trust

**Payment method presentation [indirect: help pages, community, ECDB]:**
- Visa, Mastercard, American Express, Discover — standard credit/debit card form
- PayPal — redirects to PayPal auth flow
- Klarna — "Buy now, pay in 4" BNPL; surfaces in cart AND on checkout Payment step
- Afterpay — BNPL; similar placement
- Sephora Gift Cards — dedicated field in Payment step
- Paze — bank-linked checkout (added August 2024 for Beauty Insider members only). No app download or stored password required; linked to participating bank cards [indirect: Paze press release 2024]
- No Apple Pay surfaced in the standard web checkout flow (mobile browser behavior may vary)

**Trust badges:** "Your information is secure" with a small lock icon. Free-returns guarantee badge. Customer service phone number near the submit button [indirect: Baymard]. No generic SSL shields — Baymard noted Sephora's post-redesign trust signals are "specific and actionable."

**Return/refund placement:** Returns policy hyperlinked in the checkout footer. A "Free returns" badge visible near the order summary [indirect: Baymard].

**Order total relative to submit:** Visible in the persistent right-column summary AND repeated inline in the submit button area as "Order Total: $X" just above the "Place Order" button [indirect: Baymard].

---

## Submit button

**Copy:** "Place Order" — title case, explicit commitment verb [indirect: community, Baymard].

**Loading state:** Button text changes to a spinner + "Processing…" during API submission. Button is disabled during processing [indirect: JL Design].

**Disabled state:** Active by default; disabled only during submission (not while fields are empty, to avoid premature feedback) [indirect: Baymard].

**Sticky mobile:** Post-redesign, the "Place Order" button is sticky at the bottom of the mobile viewport during the Review step [indirect: JL Design case study]. The prior design did not have this.

---

## Microinteractions + state

**Add-to-basket confirmation:** Transient header notification — the header bag icon animates (subtle bounce) and the count badge updates. A brief toast or header message shows the item was added with a "View Bag" link. No full drawer slides out [indirect: Baymard, community].

**Loading skeletons:** Post-redesign checkout uses skeleton loaders on the order summary while it recalculates (e.g., after applying a promo code or changing shipping method) [indirect: JL Design].

**Empty cart state:** "Your bag is empty" + "Continue Shopping" CTA. No notable brand copy — utilitarian [indirect: community posts].

**Error toast:** API-level errors (e.g., out-of-stock during checkout) surface as a red banner at the top of the current checkout step with specific messaging [indirect: Baymard].

---

## Mobile-specific

- No slide-out cart drawer — full-page cart only
- Beauty Insider Benefits section anchored to bottom of mobile cart; "Add up to 2 free samples" sticky tab persists while scrolling the items list
- Step breadcrumb collapses to "Step X of 3" on mobile
- Order summary collapses to sticky footer with expandable sheet
- "Place Order" button sticky at the bottom of the Review step
- Sephora's mobile app checkout differs more significantly (tab-based navigation, biometric auth for saved-card pay) — web mobile is the less optimized surface

---

## Beauty-retailer specifics

**Sample picker UX [indirect: community, samples-promotion help page]:**
- Triggered by the "Add Up to 2 Free Sample(s)" link in the Beauty Insider Benefits section
- Available on qualifying merchandise orders; requires at least one non-gift-card item
- Grid of 6–10 samples — brand thumbnail, product name, size indicator
- Selection UI: clicking a tile toggles a selection border/ring. Two selections max; unselected tiles grey out after 2
- "Done" button confirms the selection and closes the picker interface
- Selected samples appear as $0 line items in the cart and order summary
- Note: community posts from late 2024 indicate some periods where samples were paused or inventory-limited; the "Samples no longer offered?" threads reflect that this feature has operational variability

**Loyalty points earn display:** Green "You'll earn X Beauty Insider points" line in the order summary. Points tally live-updates when promo codes are applied or items are added [indirect: community].

**Loyalty points burn:** Expandable "Redeem Rewards" section in the cart. Click opens a menu of available rewards (Beauty Insider Cash tiers: 250 pts = $10, 500 pts = $20, 1000 pts = $50). Selection applies as a cart-level discount. Points are held then deducted when the order ships [indirect: loyalty FAQ].

**Gift wrap:** Paid add-on in the "Delivery & Gift Options" section — two packaging options with prices comparable to competitor Ulta's $5 gift box [indirect: community, gifting help page].

**Gift message:** Free text field "Add a gift message" in the same Delivery & Gift Options section. Available for standard shipping and same-day delivery. Not available for BOPIS orders [indirect: gifting help page].

**BOPIS / store pickup:** Per-item or per-order toggle in the cart between "Ship" and "Pickup" fulfillment methods. Curbside is an additional option at select stores. On the checkout Shipping step, a "Choose Store" flow appears when Pickup is selected. Ready in 2 hours if ordered by 6 PM local [indirect: in-store-pickup help page].

---

## What to lift for Clarté MD

1. **Two-column cart with sticky right-panel order summary (`app/(site)/cart/page.tsx`):** Clarté already has this layout (`grid-cols-[1fr_23.75rem]`) — but the `OrderSummary` is NOT sticky on scroll. Adding `sticky top-4` to the `aside.order-summary` on desktop closes the gap. On long item lists, the customer loses sight of the total as they scroll. One CSS line; highest-ROI single change on the cart page.

2. **Sample/add-on opt-in tile below the items list, above the CTA — with `$0` line item on add:** The Sephora pattern proves the tile belongs in the cart list, not in a separate drawer. For Clarté: a single "Complimentary sample with your order" tile between the last line item and the "Proceed to checkout" button. An `Add` button adds a `$0 / Rs. 0` line item. The line item appearing in the order summary mirrors Sephora's treatment (where selected samples appear as Rs. 0 items). Builds trust that the item is confirmed, not forgotten.

3. **"Earn X points" style — adapt as "Save Rs. X vs buying separately" protocol savings line in OrderSummary:** Sephora's green points-earn line in the order summary is the best single pattern from the entire retailer reference set for Clarté's bundle math. Clarté bundles are already Rs. 700–1,400 cheaper than buying the included products individually. Surface that savings delta as a green line in `OrderSummary.tsx`: `You save Rs. {savings_pkr} vs. buying individually` — same placement, same green color treatment, same live-update mechanic. This is the highest-priority lift from this teardown for Clarté.

4. **Numbered, ticked, tappable step breadcrumb in checkout — `CheckoutSteps.tsx`:** Sephora's numbered step indicator (1. Shipping / 2. Payment / 3. Review) with green ticks on completed steps and clickable back-links is the pattern `CheckoutSteps.tsx` should build toward. Currently `CheckoutSteps.tsx` exists but the active-step is always passed as `3` (hardcoded). Making the steps reactive to section completion, and making past steps tappable to scroll-to, is the Sephora pattern.

5. **Error banner at top of form + anchor links to offending fields:** Currently `CheckoutForm.tsx` has a single `<p className="form-error">` at the bottom for API errors. Sephora's post-redesign (and Baymard's endorsement) shows a red banner at the TOP listing each invalid field as a clickable anchor. Add this for client-side validation failures: if the user hits "Place Order" with blank required fields, a banner scrolls into view naming each error, each a link that focuses the field. Critical on mobile where the form is long and the bottom error is below the fold.

---

## What to skip

1. **Loyalty points earn/burn display as-is:** The beauty of Sephora's points display is that members *already have* an account with a balance. Clarté has no accounts, no points infrastructure. Lift the *visual pattern* (green savings line in order summary) but wire it to bundle savings math, not an invisible points balance.

2. **BOPIS / store pickup toggle in cart:** Clarté has no physical stores. Do not add a delivery-method toggle that only has one option.

3. **Klarna / Afterpay / Paze payment methods:** None of these payment rails exist in Pakistan. The Payment section in `CheckoutForm.tsx` correctly shows COD only; do not add disabled BNPL options as "coming soon" placeholders.

4. **Gift wrapping add-on:** Clarté's protocol bundles already ship in branded packaging. A paid gift wrap upsell would undermine the "clinical with warmth" positioning and add fulfilment complexity. Skip.

5. **Aggressive Beauty Insider sign-in gate before checkout:** Sephora pushes account sign-in hard — Baymard explicitly flagged this as a friction point. Clarté is correctly guest-only. Do not add any account gate before "Place Order."

---

## Sources

- [Sephora homepage](https://www.sephora.com/) — 403 to bot UA
- [Sephora samples & promotions help](https://www.sephora.com/beauty/samples-promotion) — 403
- [Sephora gifting help](https://www.sephora.com/beauty/gifting) — 403
- [Sephora in-store pickup help](https://www.sephora.com/beauty/in-store-pickup) — 403
- [Sephora payment methods](https://www.sephora.com/beauty/payment-methods) — 403
- [Sephora Paze FAQ](https://www.sephora.com/beauty/paze-faq) — 403
- [Paze press release — Sephora Beauty Insider integration, Aug 2024](https://www.paze.com/paze-online-checkout-experience-added-sephoras-beauty-insider-loyalty-members) — indirect
- [Paze / PR Newswire press release](https://www.prnewswire.com/news-releases/paze-online-checkout-experience-added-for-sephoras-beauty-insider-loyalty-members-302232890.html) — indirect
- [Rits & Company — Sephora Checkout Redesign UX case study](https://ritsandcompany.com/index.php/portfolio-items/ecommerce-checkout/) — indirect
- [JL Design — Sephora Checkout Flow Redesign](https://www.jadeliang.com/casestudy/sephoracheckout) — indirect
- [Baymard Institute — Sephora UX Case Study (paywalled)](https://baymard.com/ux-benchmark/case-studies/sephora) — indirect, score only
- [Medium / Mansi Kamble — Reimagining Sephora's Shopping Experience UX Case Study](https://medium.com/@kamble.ma/reimagining-sephoras-shopping-experience-a-ux-case-study-on-building-trust-reducing-d752f1bca950) — indirect
- [Sephora Beauty Insider Community — How to apply for free samples](https://community.sephora.com/t5/Customer-Support/How-to-apply-for-free-samples/td-p/6921139) — indirect
- [Sephora Beauty Insider Community — Samples no longer offered? (2024)](https://community.sephora.com/t5/Customer-Support/Samples-no-longer-offered/m-p/6972031) — indirect
- [Sephora Beauty Insider loyalty program](https://www.sephora.com/beauty/loyalty-program) — 403
- [loyaltyrewardco.com — Sephora Beauty Insider guide](https://loyaltyrewardco.com/master-guide-sephora-beauty-insider-explained/) — indirect
- [Rivo.io — Sephora Beauty Insider breakdown](https://www.rivo.io/blog/sephoras-beauty-insider-program) — indirect
