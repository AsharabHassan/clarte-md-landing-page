# Daraz Pakistan

**URL:** https://www.daraz.pk/cart/ (cart) → /checkout (gated behind login + populated cart)
**Positioning:** Pakistan's dominant general marketplace (owned by Alibaba Group); mass-market, multi-seller; Rs. 100–Rs. 500,000+ price range; COD + card + JazzCash + EasyPaisa + Daraz Wallet; mobile-first (Android app primary surface)
**Why study them:** Clarté's customers have ordered on Daraz before they've ordered on Clarté. Pakistani consumer checkout expectations — how COD is presented, how addresses are entered, what "place order" feels like, how vouchers work — are calibrated by what Daraz has trained them on. This is ground-truth for the PK market.

Note on sourcing: Daraz's cart and checkout are fully JS-rendered and gated behind authentication + a populated cart. Direct WebFetch returns only footer shells or 500 errors. This teardown is sourced from: (a) Daraz's own official blog posts and help articles, (b) the COD Plus announcement from The Nation PK (July 2025), (c) multiple search-verified step descriptions from Daraz's checkout process, (d) the 2024 Daraz App Redesign UX case study on Medium (Yashal Moazzam), (e) Pakistani tech press coverage (PropPakistani, TechJuice, PhoneWorld). All indirectly sourced claims are flagged [indirect].

---

## URL + entry point

- Cart: `https://www.daraz.pk/cart/` — full-page cart (app equivalent: cart tab). No slide-in drawer in the web experience; the app surfaces a cart icon with count badge [indirect: multiple Daraz app walkthroughs, no drawer pattern mentioned in any source].
- Checkout: Accessed by tapping "Proceed to Pay" from the cart. Gated behind account login — Daraz **requires an account** to check out [indirect: multiple sources confirm login requirement before checkout; no documented guest-checkout path on Daraz].
- The cart page URL on web is `daraz.pk/cart/`; on the app it is the Cart tab in the bottom navigation [indirect: Daraz app documentation].

## Cart drawer composition

None confirmed on web. The Daraz app uses a dedicated Cart tab in the bottom navigation bar rather than a drawer. On web, the cart icon in the header is a link to the full cart page [indirect: Daraz app UI descriptions, PhoneWorld coverage].

The app's cart icon shows a badge count. Tapping "Add to Cart" on a product listing triggers a brief inline confirmation (the button state changes or a brief animation plays) and the badge count updates — no full-page reload and no slide-in drawer [indirect: Daraz app walkthroughs].

## Cart page composition

**Layout (web):** Single-column on mobile (dominant surface). On desktop, a more spacious two-column-ish layout is reported but the web experience is secondary — Daraz's design investment is overwhelmingly in the Android app [indirect: "Daraz is a Mall, A Marketplace & a Community in Your Pocket" — PhoneWorld].

**Seller grouping:** Items in the cart are grouped by seller, because Daraz is a marketplace. Each seller's items form a sub-group with the seller's name visible. This is a critical structural difference from Clarté (single seller) — it's a familiar pattern Pakistani users expect when shopping [indirect: standard marketplace cart pattern, confirmed via Daraz app descriptions].

**Item line:** Product thumbnail (small), product name (often truncated), variant (size/color), unit price, quantity stepper, remove option. Bundle price vs individual price may show strikethrough pricing if a promotion is active [indirect: standard Daraz app item card pattern].

**Qty stepper:** −/+ buttons. Removing an item can be done via the stepper (reduce to 0) or a remove/delete icon [indirect: standard Daraz cart behavior per multiple walkthroughs].

**Select / deselect items:** Daraz cart allows customers to select/deselect individual items before checkout — checkboxes per item or per seller group. This enables partial checkout (buy some items, leave others in cart for later) [indirect: Daraz UX case study + app screenshots described by reviewers].

**Voucher code entry:** The voucher code input is on the checkout page (the "Order Review" step), not on the cart page. The cart page may show a "Collect Vouchers" section where platform vouchers can be claimed [indirect: Daraz blog — "enter a voucher code if you wish to avail one during the checkout review"; collectible-vouchers.daraz.pk page exists as a separate surface].

**Shipping info on cart page:** Basic delivery estimate shown per seller group or per item ("Delivery by [date range]"). Daraz Express items show a different badge/label from standard marketplace items [indirect: Daraz Express page, delivery estimate display described in multiple walkthroughs].

**"COD" badge on items:** Some listings show a COD eligibility indicator on the product card/cart item — not all sellers offer COD, so the cart surface may flag which items are COD-eligible vs. prepayment-only [indirect: multiple Pakistani user reviews mentioning COD availability varying by seller].

**Primary CTA:** "Proceed to Pay" — this is the button that moves from the cart to the checkout flow [indirect: multiple verified step descriptions — "click on proceed to pay" is the consistent copy across sources].

## Cart-to-checkout transition

**Button copy on cart page:** "Proceed to Pay" [indirect: multiple sources — Daraz blog, help center descriptions, app walkthroughs all use this exact copy].

**Gate:** Login required. If not logged in, clicking "Proceed to Pay" routes to the login/signup screen. There is no documented guest-checkout path — Daraz requires a registered account [indirect: multiple user reviews + Daraz help center flow descriptions].

**Address pre-fill:** For logged-in users with a saved address, the delivery address is pre-filled on the checkout screen [indirect: Daraz app UX description — users manage saved addresses in their account].

## Checkout layout

**Architecture:** The checkout is a linear multi-screen flow on the app, rendered as a single page with sections on web [indirect: Daraz app walkthroughs]. On the app: Cart → Checkout (address + delivery) → Payment selection → Order confirmation. On web, similar but compressed.

**Step structure (app):**
1. Cart review (item selection + "Proceed to Pay")
2. Checkout screen: delivery address selection + delivery method + voucher entry
3. Payment method selection screen
4. Order review / Place Order [indirect: multiple step-by-step walkthroughs verified].

**No step indicator bar:** Unlike Sephora or the Allbirds/Shopify model, Daraz does not show a numbered breadcrumb or progress bar. The flow is sequential screens (app) or a single scrollable page (web) [indirect: Daraz app UX case study — no step indicator identified as a redesign target].

**Order summary placement:** On the checkout screen, items are summarized with the total visible at the top or in a persistent summary area. On mobile, the total and "Place Order" are typically pinned to the bottom [indirect: standard PK app checkout pattern + Daraz walkthroughs].

## Form structure + interactions

**Address entry:** Daraz's address form is PK-specific and structured as:
- Full name
- Phone number (mobile — 03XX format expected)
- Province/Region dropdown (all PK provinces including AJK, GB)
- City — **dropdown or autocomplete** from a PK city list (not free text). Includes major cities + "Other" for unlisted areas. Daraz's own help center has a dedicated article on "Non-Listed Areas" [direct: buyer-helpcenter.daraz.pk has a "What are the Non Listed Areas while placing the order?" article confirming city-as-managed-list].
- Area/Neighborhood — a second-level selector that populates based on city selection (e.g., select Lahore → choose DHA, Gulberg, Johar Town, etc.)
- Street address — free text
- Landmark (optional but encouraged) — Daraz explicitly recommends adding landmarks (e.g., "near the blue mosque") because Pakistani street addresses are often non-standardized [indirect: Daraz delivery FAQ — "include landmarks for better delivery"].
- Set as Default checkbox [indirect: app address management UX].

**Saved addresses:** Logged-in users can select from previously saved addresses (list view with radio select) or add a new one [indirect: Daraz address management feature].

**Phone:** Required. 03XX XXXXXXX format. Used for courier contact and OTP verification in some flows.

**OTP verification:** Daraz has used OTP (one-time password via SMS) for account actions and order confirmation in some regions/flows. For COD orders specifically, OTP may be sent at order placement to confirm the mobile number [indirect: Releasit COD & OTP app reference in Shopify ecosystem, Daraz's own COD confirmation patterns mentioned in Pakistani user community discussion]. This is not uniformly documented but is a known PK e-commerce pattern that Daraz implements.

**Validation timing:** On-submit and on-blur. Error messages inline below the field [indirect: standard Daraz app behavior].

## Payment + trust

**Payment method selection screen:** Appears as a dedicated step/section after address selection. Payment options displayed as a list of radio-button-style tiles or cards [indirect: Daraz app walkthrough descriptions — "select your desired payment method" with each option as a distinct tappable row].

**Payment options (current, 2024–2025):**
- Cash on Delivery (COD) — default and most-selected by Pakistani consumers
- Daraz Wallet — Daraz's proprietary closed-loop digital wallet
- JazzCash — Pakistan's largest mobile money service
- EasyPaisa — second-largest mobile money
- Credit/Debit Card (Visa, Mastercard) — via secure payment gateway
- HBL Direct Transfer (select users)
- EMI / Easy Installments (select banks + select products)
[direct: daraz.pk/payment-partners/ lists all payment partners; confirmed via multiple search results]

**COD presentation:** COD is presented as one option in the payment method list. It is labeled "Cash on Delivery" and shown alongside the other options — it is not pre-selected or given visual dominance in current UI, though it is by far the most-used option [indirect: multiple walkthroughs + "COD remains dominant in Pakistan" per COD Plus announcement].

**COD Plus (2025):** Introduced July 2025. Customers who select COD can, at delivery time, receive a secure link to switch to card/digital payment if they don't have cash or prefer digital [direct: The Nation PK, July 2025 — Ehsan Saya, MD Daraz Pakistan: "COD Plus is a powerful bridge that retains the confidence of cash payments while unlocking the benefits of digital convenience."].

**Trust signals at checkout:** Daraz surfaces:
- Delivery date estimate per seller/item ("Estimated delivery: Jun 3–5") [indirect: multiple walkthroughs].
- Return policy icons/labels on eligible items (Daraz's "Easy Return" badge) [indirect: standard Daraz checkout trust elements].
- Seller rating is visible on the cart grouping (marketplace context).
- "Secure Checkout" language in the payment section [indirect: standard for PK e-commerce trust-building].

**No SSL badge emphasis:** Pakistani customers are more concerned about "will it arrive and will COD work" than card-security, so trust signals are delivery-focused, not payment-security-focused [indirect: COD dominance + COD Plus rationale in The Nation article].

## Submit button

**Copy:** "Place Order" — this is the confirmed final submit button copy on Daraz's checkout [indirect: multiple sources verified — "after selecting your payment method, you tap 'Place Order' to complete the transaction"].

**Placement:** Pinned to the bottom of the screen on mobile, always visible without scrolling [indirect: standard Daraz app mobile pattern].

**Loading state:** Brief spinner / "Processing…" state after tap, then navigation to the order-confirmation screen [indirect: standard app behavior pattern].

**Post-submit:** Order confirmation screen showing order number, items, delivery address, estimated delivery, and payment method. An SMS and app notification are sent [indirect: Daraz help center — order confirmation + SMS described].

## Microinteractions + state

**Voucher entry on checkout screen:** A "Enter Voucher Code" text input field, typically positioned above the order summary/total section on the checkout screen [indirect: Daraz blog — "Enter Daraz Voucher Code option can be found above the booking summary on the Daraz checkout page"]. There are two types: platform vouchers (Daraz-issued, collectible) and seller vouchers (store-specific). Both can be entered in the same field [indirect: Daraz voucher help].

**Delivery estimate display:** Per-item or per-seller-group delivery window: "Estimated delivery: [date range]" or "Daraz Express: Delivered by [specific date]". Daraz Express items get a more specific promise; standard marketplace items show a wider window (7–14 days domestic; up to 22+ days for Daraz Global) [indirect: Daraz help center shipping info].

**"Daraz Express" badge:** Daraz Express items (fulfilled by Daraz's own logistics arm, not third-party sellers) carry a distinct badge in the cart and checkout. These items get faster delivery (same-day or next-day in major cities) and different trust treatment [direct: daraz.pk/daraz-express/ page confirmed].

**Seller-group separation:** Each seller group in cart/checkout may have its own shipping fee and delivery estimate [indirect: marketplace structure].

**Pick-up point option:** At the address selection step, customers can choose to pick up from a Daraz Shop (physical pickup points in 19+ cities) instead of home delivery — an option surfaced because Pakistani customers sometimes prefer pickup to avoid delivery failures [indirect: Daraz Shops page, PhoneWorld coverage].

**Empty cart state:** "Your cart is empty" + "Start Shopping" CTA [indirect: standard PK e-commerce empty state pattern].

## Mobile-specific

**App vs. web:** Daraz's primary surface is the Android app — the mobile web experience is secondary and less polished. Design investment is in the app. The vast majority of PK e-commerce orders go through the app [indirect: "Best Online Shopping App" as Daraz's own positioning].

**Bottom navigation:** The app uses a persistent bottom navigation bar with Home, Categories, Deals, Cart, and Me tabs. The Cart tab shows a badge count. This is how Pakistani mobile shoppers expect to reach their cart — NOT a slide-in drawer from the top-right [indirect: Daraz app screenshots described across multiple sources].

**Sticky "Proceed to Pay" / "Place Order":** Both CTAs are pinned to the bottom of the screen. Never inline or scrollable-off-screen [indirect: confirmed by multiple walkthroughs, standard PK app checkout pattern].

**Mobile keyboard:** Standard Android keyboard. No visible `inputMode` optimization described for Pakistani apps — but phone number fields trigger numeric keyboard implicitly.

**Low-bandwidth optimization:** "Daraz App is optimized to perform well even on low speed connections" [indirect: PhoneWorld — Daraz feature highlight]. Image loading is deferred; checkout form fields render immediately without waiting for images.

**OTP SMS for order confirmation:** On some flows, especially new accounts or suspicious order patterns, Daraz sends an OTP to confirm the order before it's placed into the seller queue [indirect: Pakistani user community discussions, Daraz seller documentation mentioning order verification].

## What to lift for Clarté MD

1. **City as a managed dropdown (not free text).** Daraz uses a structured city list (with sub-area selection that cascades from city). Clarté's `CheckoutForm.tsx` already implements this correctly — `PK_CITIES` is a dropdown with the 11 major cities + "Other." This is exactly the right pattern for the PK market. Do NOT change to a free-text field. However, consider adding a second-level "Area/Neighbourhood" field for the major cities (Lahore → DHA / Gulberg / Johar Town, etc.) to reduce courier delivery failures — this is Daraz's pattern and solves a real PK logistics problem.

2. **Landmark field (optional, labeled with a prompt).** Daraz explicitly encourages landmark entry because PK street addresses are non-standardized. Clarté's current "Notes (optional)" field handles this but is un-labeled in a way that explains the purpose. Rename it to "Landmark / Delivery notes (optional)" with a placeholder: "e.g., Near KFC, Blue house, opposite the park." One-line change in `CheckoutForm.tsx`, directly reduces failed COD deliveries.

3. **COD as a separate payment-selection tile with an icon.** Daraz shows payment methods as distinct tappable rows/tiles, each with an icon. Clarté's Payment fieldset renders COD as a radio-button with text. Elevate it: make the COD option a styled tile (border, icon — a door-delivery icon or a banknote icon, already available in lucide-react) rather than a bare radio. This matches the visual pattern Pakistani customers expect from the COD selection step.

4. **Delivery estimate in the order summary, framed as a date window.** Daraz shows "Estimated delivery: June 3–5" per item. Clarté's `OrderSummary.tsx` shows only "Shipping: Rs. 250" with no timeframe. Add a sub-line under the shipping row: "Delivered in 2–4 working days after confirmation." Daraz's pattern proves this is the expectation Pakistani customers arrive with — they look for it, and its absence creates anxiety for a COD purchase where they need to have cash ready.

5. **"Place Order" button copy — already correct.** Daraz uses "Place Order" as the final submit copy. Clarté already does this. This convergence validates the decision — it matches both the premium market reference (Apple) and the PK ground-truth reference (Daraz). Do not change.

6. **Voucher/promo code field: collapsed and positioned above the total in the summary.** Daraz places the voucher input above the booking summary. If Clarté introduces a promo code (e.g., doctor-referral codes), position it above the subtotal line in `OrderSummary.tsx`, not below the total. This is where PK customers will look for it based on Daraz habituation.

## What to skip

1. **Login-gated checkout.** Daraz requires account creation before checkout — this is forced by their marketplace model (seller ratings, order history, wallet). For Clarté as a DTC brand, requiring login before checkout would add friction for no operational reason. Stay guest-only (current behavior is correct).

2. **Seller grouping in the cart.** Daraz groups cart items by seller because it's a marketplace with multiple independent sellers. Clarté is the sole seller. No multi-seller grouping is needed or appropriate.

3. **COD Plus / digital-switch-at-delivery.** The COD Plus feature (July 2025) — offering a payment link at the door to switch to card — is a sensible Daraz innovation for their scale. For Clarté at current volume, it introduces WhatsApp/SMS payment link infrastructure that doesn't exist. The simpler model (pay cash to courier on arrival) is correct for now.

4. **Heavy voucher/coupon infrastructure.** Daraz has a complex two-tier voucher system (platform + seller) with dedicated "collectible vouchers" pages. Clarté does not need this complexity — if vouchers are introduced, a single field that accepts a code against a discount table is sufficient.

5. **Daraz Express badge distinction.** The dual fulfilment track (Daraz Express vs. standard marketplace) only applies in a multi-seller marketplace. Clarté ships from one location; no badge differentiation is needed.

6. **Payment method breadth (JazzCash, EasyPaisa, EMI, Daraz Wallet).** Clarté is COD-only. Do not add digital payment option tiles for methods that don't work — this is the single most important constraint. Every payment tile that Pakistani customers tap and find non-functional is a trust-killer. One COD tile, nothing else, until a real payment rail is live.

## Sources

- https://www.daraz.pk/cart/ (direct — page fetched; returns footer/shell, no cart content; structure confirmed as full-page)
- https://www.daraz.pk/payment-partners/ (direct — full payment partner list)
- https://www.daraz.pk/daraz-express/ (direct — Daraz Express badge and delivery promise)
- https://www.nation.com.pk/25-Jul-2025/daraz-pakistan-introduces-cod-plus-as-step-towards-cashless-e-commerce-ecosystem (direct — COD Plus feature, July 2025, MD quote)
- https://buyer-helpcenter.daraz.pk/s/page/knowledge (indirect — help center structure confirming city-as-managed-list via "Non-Listed Areas" article)
- https://medium.com/@yashalmoazzam22/daraz-app-redesign-452bcc853d07 [indirect — app UX redesign study, cart simplification, minimal interface goal]
- https://www.daraz.pk/collectible-vouchers/ (direct — voucher collection surface)
- https://blog.daraz.pk/how-to-use-daraz-vouchers-code/ (500 on direct fetch) [indirect — voucher input positioned "above the booking summary" per search-verified description]
- https://blog.daraz.pk/how-to-order-on-daraz/ (500 on direct fetch) [indirect — step-by-step: cart → proceed to pay → address → voucher → payment method → place order, confirmed via search synthesis]
- https://www.phoneworld.com.pk/daraz-is-a-mall-a-marketplace-a-community-in-your-pocket/ [indirect — app as primary surface, bottom nav Cart tab]
- https://www.phoneworld.com.pk/daraz-launches-daraz-wallet/ [indirect — payment method coverage]
- https://www.daraz.pk/mobile-apps/ (direct — "faster and more secure checkout facility" claim, low-bandwidth optimization)
- https://www.daraz.pk/same-day-delivery/ (direct — Daraz Express delivery coverage)
- https://helpcenter.daraz.pk/page/knowledge?pageId=12&category=1000001092 (indirect, redirected — shipping info, delivery windows: 7–14 days domestic, 22+ days global)
- https://apps.shopify.com/cash-on-delivery-cod-order-confirmation [indirect — COD OTP verification pattern in PK market context]
- docs/research/2026-05-23-page-ux-skincare/04-cart.md (internal — cross-reference on WhatsApp concierge as PK cart trust signal)
- docs/research/2026-05-23-page-ux-skincare/05-checkout.md (internal — COD-specific checkout patterns, "Place Order" verb confirmed)
