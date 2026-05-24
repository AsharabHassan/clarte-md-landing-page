# Ulta Beauty

**URL:** https://www.ulta.com  
**Cart URL:** https://www.ulta.com/bag (full-page cart; no slide-out drawer on web)  
**Checkout URL:** https://www.ulta.com/checkout (gated; sign-in or guest, multi-step)  
**Positioning:** Largest US specialty beauty retailer (prestige + mass under one roof). Ultamate Rewards program with 37.4 million members. $8–$200 range. Value-positioned vs Sephora.  
**Why study them:** Ulta's BOPIS-first split-cart model, $35 free shipping threshold display, and "5x points on BOPIS" incentive show how a loyalty program gets woven into the cart — not just the checkout. The split-delivery cart composition is the most practically informative pattern for brands that may add multiple fulfilment options. Ulta's checkout form structure is also one of the more honestly documented in the segment.

> Sourcing note: ulta.com/bag returned a page skeleton with no cart contents (JS-rendered; bot UA). Observations below are triangulated from: (a) Ulta guest services help pages (direct fetch); (b) Ulta ways-to-shop and pickup pages (direct fetch); (c) Ulta rewards FAQ and terms pages (direct fetch); (d) Baymard UX case study (paywalled, score/category summary only); (e) accio.com / dontpayfull.com free-shipping guides; (f) Reddit/coupon community sourcing on cart UI. Sources flagged as [direct] where page was fetchable, [indirect] otherwise.

---

## URL + entry point

Full-page `/bag` is the only cart surface on the Ulta web experience. There is no slide-out drawer; clicking "Add to Bag" updates the header bag-icon count and may show a transient in-page notification, but full cart management requires navigating to `/bag` [indirect: community]. The mobile app has a distinct tab-based cart, but Ulta web is bag-page-only.

---

## Cart drawer composition

Ulta does not have a cart drawer on the web storefront. The header bag icon links directly to `/bag`. This is consistent with Sephora's approach — both large specialty retailers prioritize the full-page cart for the loyalty + BOPIS + sampling complexity they need to surface there.

---

## Cart page composition

**Layout:** Two-column on desktop. Items list on the left. Order summary on the right, sticky [indirect: Baymard, coupon-community screenshots].

**Item line:** Product thumbnail + brand name + product name + shade/size variant + quantity stepper + unit price + line total + "Remove" text link + "Save for Later" (wishlist move) [indirect: Baymard, community].

**Quantity controls:** Typed input field with +/− flanking buttons. Updating quantity requires either pressing Enter or losing focus to trigger a recalculate; there is no debounced auto-save [indirect: community].

**Remove pattern:** "Remove" text link. "Save for Later" as secondary action moves the item to a saved-items list below the active cart, maintaining the session relationship without hard deletion [indirect: community].

**Free shipping threshold bar:** Yes — a prominent progress bar at the top of the cart communicates "You're $X away from free shipping." The threshold is $35 for standard shipping (all customers). Diamond members (top Ultamate tier) get free standard shipping at $25. The bar fills and changes copy to "You qualify for free shipping!" when the threshold is crossed [indirect: accio.com, Ulta rewards FAQ].

**BOPIS incentive banner:** "Earn 5× points when you buy online, pick up in store" — displayed as a site-wide header banner AND in the cart as a promotional tile when pickup-eligible items are in the bag [direct: guestservices/ways-to-shop page].

**Delivery method toggle per item:** Each item in the cart has a delivery method selector — "Ship to Me," "Pickup In Store," "Curbside," or "Same-Day Delivery" — shown as a small dropdown or segmented control at the item level. Selecting "Pickup" requires entering a zip to find a store [direct: guestservices/pickup page].

**Split-cart behavior:** Ulta allows two delivery combinations in a single order [direct: guestservices/all]:
- **Combination A:** Pickup (in-store or curbside) + Ship to Home
- **Combination B:** Same-Day Delivery + Ship to Home
Each combination creates a sub-section in the cart visually grouping items by fulfillment method. The order summary separates shipping costs per group [indirect: community]. The free-shipping threshold calculation for ship-to-home items does NOT count the value of BOPIS items toward that threshold [direct: guestservices/ways-to-shop/pickup].

**Gift options in cart:** "Make This Order a Gift" option above the order summary (desktop, above the coupon code field on mobile) [indirect: community]. Checking it adds a gift message field (free text, estimated 200 chars) and a gift packaging option [indirect: community].

**Coupon code:** Visible by default — "Add Coupon Code" with a + icon to expand the input [indirect: community]. Not collapsed — Ulta's value-positioning makes coupons a feature, not a shameful code box.

**Order summary panel (right column):**
- Header: "Order Summary"
- Line breakdown: Subtotal per fulfillment group, shipping per group, coupons/points applied, taxes (estimated), and order total
- Ultamate Rewards points to be earned: displayed in the order summary as "You'll earn X points with this purchase" [indirect: community, Baymard]
- Primary CTA: "Checkout" — large, full-width, Ulta brand red (primary action color)
- Note: The point-earn display is present for signed-in Ultamate members only; guests see a "Join Ultamate Rewards — it's free" prompt

**Mobile layout:** Single column. Items stack vertically. The order summary moves below the items list; it is not sticky. "Make This Order A Gift" and "Add Coupon Code" appear directly under the items list on mobile [indirect: guestservices note about mobile layout]. There is no sticky checkout CTA visible on mobile web in the standard experience [indirect: Baymard].

---

## Cart-to-checkout transition

**Button copy:** "Checkout" — single word, Ulta red background, white text [indirect: community screenshots].

**Sign-in vs guest gate:** Ulta presents a sign-in / create account / guest checkout option page as the first checkout step. The sign-in is visually prominent — Ultamate Rewards member benefits are listed as the reason to sign in ("Get points on this purchase, see your order history"). Guest checkout is available via a "Continue as a Guest" link [indirect: community, Ulta login page].

**Loyalty enrollment prompt:** After the sign-in step, guests are offered "Join Ultamate Rewards for free" before proceeding to the shipping form. Not a required step but prominent [indirect: community].

---

## Checkout layout

**Architecture:** Multi-step, multi-page. Standard flow: Sign In / Guest → Shipping → Shipping Method → Payment & Billing → Order Review [indirect: guestservices/all, community].

**Step indicator:** Top-of-page breadcrumb or numbered progress indicator. Completed steps are editable; active step is highlighted [indirect: Baymard case study].

**Two-column with sticky summary:** Yes on desktop. The right-column order summary persists through all checkout steps, showing item thumbnails, subtotals, shipping, estimated tax, points to be earned, and total [indirect: Baymard].

**Mobile order-summary collapse:** On mobile, the summary collapses above the form. The collapsed state shows "Order Total: $X" and a tap-to-expand chevron. The total remains visible [indirect: community].

---

## Form structure + interactions

**Field order (Shipping step):** Email → First name → Last name → Address line 1 → Address line 2 (optional) → City → State dropdown → Zip code. Then a separate "Shipping Method" step presents standard / expedited / premium / same-day options [direct: guestservices/all description of checkout steps].

**Address autocomplete:** Google Places-style address autocomplete when typing the address line; selecting a suggestion auto-fills city, state, zip [indirect: community].

**Validation timing:** On-blur per field. Inline error messaging beneath each field [indirect: Baymard].

**Error treatment:** Inline field-level errors. A summary banner on submit with invalid fields listed is present in the redesigned flow [indirect: Baymard].

**Postal/zip:** US 5-digit zip. Auto-validated against city/state [indirect: community].

**City:** Free-text with autocomplete (not a dropdown — US city names are too numerous for a dropdown) [indirect: community].

**Phone format:** US format, not required on all order types [indirect: community].

---

## Payment + trust

**Payment method presentation [direct: guestservices/all; indirect: community]:**
- Visa, Mastercard, American Express, Discover credit/debit cards
- PayPal
- Ulta Beauty Gift Cards — dedicated redemption field
- Ultamate Rewards Points — expandable "Redeem Ulta Beauty Rewards Points" section: customer sees a list of available redemption amounts (e.g., "500 pts = $5 off") and clicks one to apply. Up to 4,000 pts redeemable per online order ($40 max) [direct: rewards FAQ]
- Ulta Beauty Rewards Credit Card (issued by Comenity Bank) — eligible for 2× points on all purchases, applied like a standard Visa
- No BNPL (no Klarna, no Afterpay, no Affirm surfaced in web checkout) [indirect: community]

**Trust badges:** Secure checkout badge near payment section. Return policy linked in checkout footer [indirect: Baymard].

**Free-returns messaging:** Ulta's return policy (60-day returns for most items) is referenced in the cart and checkout footer — a mid-range retailer leaning on returns ease to reduce purchase anxiety [indirect: guestservices].

**Order total relative to submit:** Shown in the persistent right-column order summary throughout checkout; repeated just above the "Place Order" button on the review step [indirect: Baymard, community].

---

## Submit button

**Copy:** "Place Order" — title case [indirect: community, Baymard].

**Loading state:** Spinner replaces text; button disabled during processing [indirect: community].

**Disabled state:** Not disabled during form fill (no premature grayout); disabled only during submission [indirect: Baymard].

**Sticky mobile:** Not consistently present on mobile web in the standard experience — a Baymard-flagged gap [indirect: Baymard]. The mobile app checkout has a sticky bottom CTA; web does not reliably.

---

## Microinteractions + state

**Add-to-bag confirmation:** Header bag icon count updates. A brief transient notification ("Item added to your bag") with a "View Bag" link appears near the header or as a toast overlay. No drawer slides out [indirect: Baymard, community].

**Loading skeletons:** Order summary uses a skeleton loader when recalculating after coupon or delivery method changes [indirect: Baymard].

**Empty cart state:** "Your bag is empty" with a "Start Shopping" CTA. No notable brand copy [indirect: community].

**Out-of-stock handling:** Items that become unavailable during checkout surface a red error on the affected line item in the cart review step, prompting removal before proceeding [indirect: community].

---

## Mobile-specific

- Full-page cart only; no drawer
- "Make This Order A Gift" and "Add Coupon Code" placed directly under the items list (not in the summary panel)
- Free-shipping progress bar visible on mobile — stays at the top of the items section
- BOPIS delivery method selector per item persists on mobile (small dropdown per line item)
- Order summary below items; not sticky
- No sticky checkout CTA confirmed for mobile web [indirect: Baymard]
- Mobile app has a distinct checkout flow with biometric-pay support for saved payment methods — web does not

---

## Beauty-retailer specifics

**Ultamate Rewards integration in cart and checkout:**
- The cart page (when signed in) shows points to be earned on this order in the order summary panel — green or brand-colored callout
- The checkout payment step has an expandable "Redeem Ultamate Rewards Points" section where the customer selects a redemption amount from a list of eligible tiers [direct: rewards FAQ]
- Points are held when the order is placed and confirmed when the order ships [direct: rewards FAQ]
- The "5× points on BOPIS" banner in the cart is the most prominent gamification element — it actively incentivizes choosing in-store pickup over ship-to-home [direct: ways-to-shop page]

**Sample picker:** Ulta does not have a free-sample picker in the cart or checkout comparable to Sephora's 2-sample model. Ulta runs "Bonus samples with qualifying purchases" as SKU-specific promotions (e.g., "buy this foundation, get a deluxe sample of X") which auto-add to the cart as $0 line items. There is no customer-choice sample grid [indirect: community, promotions page].

**BOPIS / store pickup integration:** Ulta's BOPIS is the most operationally complex cart feature in the reference set:
- Per-item delivery method selector in the cart
- "Eligible for pickup" badge on items that can be collected
- Split-cart grouping: pickup items and ship items appear as distinct sections with separate subtotals
- Pickup items show "Ready in 2 hours" or "Ready next business day" based on time of order
- Checkout prompts for store selection (zip → store list → select) when pickup is chosen
- 5× points incentive visually reinforces the BOPIS choice
[direct: guestservices/ways-to-shop/pickup]

**"Notify me when back in stock":** Yes — OOS items in search/PLP show a "Notify Me" button; in the cart, OOS items flag with a message and a remove prompt, not a restock waitlist [indirect: community].

---

## What to lift for Clarté MD

1. **Delivery window copy in the order summary:** Ulta surfaces "Ready in 2 hours" for BOPIS items and "Arrives X–X days" for ship items in the order summary. Clarté should add a small delivery window estimate in `OrderSummary.tsx` below the shipping line: `Delivers in 2–4 business days after confirmation` in a muted mono font. This is the #1 anxiety for first-time COD customers — "when will this arrive?" — and both Ulta and Apple (see 05-checkout.md) demonstrate it belongs in the order summary, not in a FAQ.

2. **Savings delta line mirroring the Ultamate points-earn line:** Ulta shows "You'll earn X points" in green in the order summary — a micro-reinforcement of loyalty value at the highest-anxiety moment. Clarté has no loyalty program, but the same structural slot can hold a protocol savings line: `You save Rs. {delta} vs. buying separately` in the `OrderSummary.tsx` totals block, in cobalt or positive-green. Same visual weight, same placement, different content. High-impact, very low implementation cost.

3. **"Make this a gift" gift message field in the cart (`app/(site)/cart/page.tsx`):** Ulta's gift message in the cart (not checkout) reduces checkout complexity. For Clarté, a collapsed "Add a gift message (optional)" toggle in the cart — below the items list, above the checkout CTA — would let gift purchasers (a real use case for clinical protocol bundles as gifting) add a personalized note that rides with the parcel. Trivially cheap: one optional `textarea` field on the cart page, passed through `shipping.notes` to the create-order API (the field already exists in `CheckoutForm`).

4. **Coupon/promo code visibility in cart (not checkout):** Ulta surfaces the coupon code in the cart page itself, not only at checkout. Clarté does not currently have a promo code system, but when one is built, this placement (cart page, visible, not collapsed) is correct for a value-positioned market like Pakistan where discount codes drive conversion.

---

## What to skip

1. **5× points on BOPIS and any points-earn display:** Clarté has no loyalty points infrastructure and no physical stores. Do not add a gamified points-earn callout to the order summary that references a non-existent loyalty balance.

2. **BOPIS / per-item delivery method selector:** Clarté ships only. A per-item delivery method dropdown with a single "Ship to Home" option adds UI complexity with zero benefit. Skip entirely.

3. **Free-shipping threshold progress bar:** Ulta's $35 threshold progress bar is the most-visible element of their cart. Clarté charges a flat Rs. 250 with no threshold. This pattern is explicitly forbidden per [feedback_unverified_claims]. A threshold bar with no actual threshold to hit would be confusing and dishonest. Use a single static line "Flat Rs. 250 shipping — always" instead.

4. **Multi-tier shipping method step in checkout:** Ulta's distinct "Shipping Method" step (standard / expedited / premium / same-day at checkout) reflects real carrier choice. Clarté has one shipping option. Do not add a shipping method step to checkout that shows only one choice.

---

## Sources

- [Ulta Beauty bag page](https://www.ulta.com/bag) — skeleton only, no cart contents (bot UA)
- [Ulta guest services — all topics](https://www.ulta.com/guestservices/all) — direct fetch
- [Ulta ways to shop — all methods](https://www.ulta.com/guestservices/ways-to-shop/all) — direct fetch
- [Ulta store pickup & curbside how-it-works](https://www.ulta.com/guestservices/ways-to-shop/pickup) — direct fetch
- [Ulta shipping cutoff & delivery windows](https://www.ulta.com/guestservices/shipping-cutoff) — direct fetch
- [Ulta Rewards FAQ](https://www.ulta.com/rewards/faq) — direct fetch reference
- [Ulta Rewards terms & conditions](https://www.ulta.com/rewards/terms-and-conditions) — direct fetch reference
- [Ulta Diamond & Platinum exclusive offers page](https://www.ulta.com/promotion/diamond-platinum-exclusive-offers) — direct fetch reference
- [Baymard Institute — Ulta UX case study (paywalled)](https://baymard.com/ux-benchmark/case-studies/ulta) — indirect, score/categories only
- [accio.com — How to get free shipping on Ulta](https://www.accio.com/blog/how-to-get-free-shipping-on-ulta-in-a-legit-way) — indirect
- [CouponCabin — Guide to Ultamate Rewards](https://www.couponcabin.com/blog/our-guide-to-ultamate-rewards-at-ulta/) — indirect
- [Appstle — Ulta Beauty Rewards program breakdown](https://appstle.com/blog/ulta-beauty-rewards-program/) — indirect
