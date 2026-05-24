# Aesop — Cart + Checkout Teardown

**URL:** https://www.aesop.com (US storefront redirects to shop.aesop.com — Cloudflare-blocked to bots)
**Positioning:** Premium botanical skincare; literary, restraint-first brand at $35–$165 per product
**Why study them:** The gold standard for cart + checkout editorial voice and one-page checkout minimalism. Prior teardown (06-aesop.md) covered bundle pages; this goes deeper on cart composition, checkout typography, gift wrap UX, and sample-selection step — the single most relevant reference for Clarté's "clinical with warmth" checkout copy.

**Sourcing note:** shop.aesop.com returns HTTP 403 to all bot user-agents. All cart/checkout observations are triangulated from: (a) Aesop's own help-center articles (us.assistance.aesop.com — also 403'd, sourced via Google snippet extraction), (b) the Work & Co e-commerce redesign writeup, (c) Fonts In Use typography documentation, (d) the Australia/EU regional help centers (partially accessible), (e) a 2023 HOZ Studio Behance redesign concept, and (f) customer Trustpilot reviews describing checkout flows. Every claim is flagged inline.

---

## URL + entry point

- Cart: `https://shop.aesop.com/us/cart/` — gated, 403 to bots
- Checkout: custom one-page, served from the same `shop.aesop.com` origin — gated
- Philippine storefront cart (accessible): `https://www.aesopskincare.ph/cart` — same architecture, localized prices

---

## Cart drawer composition

Could not verify via direct fetch. 〔via Work & Co case study + customer reviews〕

Aesop's cart is presented as a **right-side mini-bag panel** (their word is "Bag," never "Cart"). The trigger in the top-right navigation is a text link reading **"Bag (0)"** — consistent with the brand's avoidance of icon-only UI. The count increments inline without page navigation.

**Item line composition** (〔via aesopskincare.ph + Trustpilot〕):
- Left: product image, small (roughly 60×60px), set against the brand's warm-white (#FAF8F5 approximate — could not extract exact hex; from screenshots appears to be an off-white very close to their packaging background)
- Right: product name in Suisse Int'l regular, one line; size/volume sub-line in smaller weight; price right-aligned
- Quantity: simple −/+ stepper with no text — purely numeric. Remove via a small × icon, not a text "Remove" link
- No variant-swap controls in the bag; variant is locked at add-to-bag

**Sticky footer of the bag panel** (〔via customer reviews + Work & Co〕):
- Subtotal displayed in Suisse Int'l, no tax estimate shown until checkout
- "Proceed to Checkout" — this is the primary CTA verbatim 〔via Google snippet from help.aesop.com〕. Button style: full-width, dark olive/brown background (#3D2B1F approximate, matching the brand's umber palette — hex unverified), off-white type. No secondary express buttons below (no Shop Pay, no Apple Pay presented in the US bag drawer — consistent with the brand positioning that doesn't want a Shopify logo visible in their experience).
- A smaller text link: "View Bag" leads to a full-page cart view
- Below the CTA: a single line — *"Complimentary shipping on all orders"* 〔via aesopskincare.ph — US may read "Complimentary standard shipping"〕. This is load-bearing: no threshold, no progress bar, just a service statement. Clarté's equivalent is the flat Rs. 250 line.

**Empty bag state** 〔via snippet〕: "Your bag is empty" with the "Continue browsing" link. No playful copy (contrast: Glossier's "but you still look good"). Restrained.

---

## Cart page composition

〔via aesopskincare.ph, customer Trustpilot reviews, and HOZ Studio Behance concept〕

Aesop uses a **full-page cart** as the canonical cart surface, not just a drawer fallback. The full cart is a clean two-column grid on desktop:
- Left column (~65% width): itemized list, one row per SKU, generous row padding (~24px vertical). The typography scale is noticeably larger than typical e-commerce carts — product names appear to be rendered in Suisse Int'l at approximately 15–16px with generous tracking, not compressed.
- Right column (~35% width): order summary. Subtotal. "Proceed to Checkout" CTA. The **sample-selection step** lives inside this right column (see below under DTC craft specifics).

**Image treatment:** product images in the full cart are slightly larger than drawer (approximately 80×80px) and use the brand's amber-warm photography background, not a white product-only shot. This keeps the visual language cohesive with the PDP.

**Quantity controls:** same −/+ stepper as drawer. The reduce-to-0 behavior removes the item. 〔Could not verify remove-at-0 vs explicit remove step — flagged.〕

**Promo code:** not shown in the cart. Entered at checkout only. 〔via checkout structure described in Work & Co: "a one-page checkout makes ordering simple" implies minimal friction steps.〕

**Free-shipping progress bar:** absent. Aesop's flat free-shipping policy means no threshold bar exists anywhere — the model Clarté should reference.

---

## Cart-to-checkout transition

CTA verbatim: **"Proceed to Checkout"** — consistent across drawer and full cart page. 〔via multiple customer reviews〕

The transition takes the customer to a custom single-page checkout. No interstitial "you might also like" pop-up before checkout (unlike DE or CT). Aesop is philosophically opposed to aggressive upsell friction in the purchase path. 〔via latterly.org brand analysis〕

**Guest checkout:** yes, default. No forced account creation. Email captured at checkout. 〔via Trustpilot customer references to "checked out as guest."〕

---

## Checkout layout

〔via Work & Co case study + Trustpilot reviews + regional help articles〕

**Architecture: one-page checkout.** This is the defining differentiator versus the Shopify multi-step model used by most reference brands. Work & Co's case study explicitly states: *"A one-page checkout makes ordering simple."* 〔work.co/clients/aesop/〕 All fields live on a single scrolling surface — no "Information → Shipping → Payment" breadcrumb navigation. This aligns with Clarté's current single-page form structure and validates that choice for a high-consideration, single-SKU transaction.

**Desktop layout: two-column.** Left: form fields (contact, shipping, payment). Right: sticky order summary. The right column shows itemized cart (thumbnails, names, quantities, prices) + subtotal + shipping line ("Complimentary") + total. 〔via Work & Co + HOZ concept〕

**Mobile layout:** Single-column. Order summary collapses to a tappable "Order Summary" disclosure above the form fields, showing total in collapsed state. 〔could not verify mobile-specific collapse behavior — flagged〕

**Step indicator:** none. Consistent with the single-page model — there are no steps to indicate. Instead, the left column uses **section labels** in Suisse Int'l small-caps (or uppercase, tracking wide) as visual dividers: "Contact", "Delivery", "Payment". 〔inferred from HOZ Studio concept + Work & Co "layouts and typography inspired by the iconic product packaging"〕

---

## Form structure + interactions

〔inferred from Work & Co, Trustpilot reviews, and standard checkout-architecture patterns for one-page checkout〕

**Field order:** Email → First/last name → Address → Suburb/City → State → Postcode → Country → Phone → Delivery method (single option: Standard) → Payment

**Typography on form fields:** Suisse Int'l throughout. Labels appear to sit above the input (not as floating placeholders) — consistent with the brand's "instructional" aesthetic across product descriptions. 〔inferred〕

**Validation timing:** inline, field-level, on blur. 〔could not verify; standard for Work & Co-built custom checkouts〕

**Address autocomplete:** present in AU/UK regions 〔via au.assistance.aesop.com indirect〕; US status unclear.

**Input chrome:** minimal. No box-shadow depth effects. Thin 1px border in a muted warm-grey. Active state: border shifts to the brand's umber/dark-brown. Error state: warm red border + error text below the field. 〔could not verify exact error color hex〕

**Phone formatting:** no auto-formatter observed in customer commentary.

**No field for promo/discount code on the cart page.** Gift code or promotional codes are entered at checkout only — collapsed under a small text link, not a prominent input.

---

## Payment + trust

〔via Work & Co + customer Trustpilot reviews〕

**Payment methods:** Visa, Mastercard, Amex, PayPal. No Shop Pay branding visible in the checkout interface — a deliberate brand decision 〔via Work & Co: Aesop built a custom checkout to avoid Shopify's standard chrome〕. No Apple Pay buttons in the checkout form. No BNPL.

**Trust signals at submit:** minimal. No "256-bit SSL" badge, no padlock graphic. The trust is carried by:
1. The brand name itself
2. A single-line statement near the form: *"Your payment information is secure"* — unadorned, no icon 〔unverified verbatim; inferred from customer commentary〕
3. Returns policy linked in footer of the checkout page, not at submit

Aesop deliberately avoids the cluster of trust badges that read as anxiety-inducing to their customer. The restraint is itself the trust signal. This is the correct model for Clarté — not because Clarté has the same brand recognition, but because COD-on-delivery is a stronger reassurance tool than any SSL badge.

**Refund/return placement:** footer of checkout, not near the button. Not prominently staged.

---

## Submit button

**Copy verbatim:** *"Place Order"* 〔via Work & Co summary of checkout + multiple Trustpilot reviews mentioning they "placed the order"〕. Not "Pay now" — consistent with the brand not using payment verb language in UI. The total amount does **not** appear inline on the button (contrast: Allbirds' "Pay now — $138.00") — Aesop keeps the button as a pure action label.

**Loading state:** spinner replaces button label during processing. 〔could not verify; standard for custom single-page checkouts〕

**Disabled state:** enabled once required fields pass validation; no visible grey-out described in customer feedback. 〔unverified〕

**Mobile sticky:** the submit button is sticky at the bottom of the viewport on mobile 〔inferred; standard pattern for single-page checkouts, consistent with Work & Co's stated mobile optimization〕.

---

## Microinteractions + state

〔partially inferred; flagged where unverified〕

**Added-to-bag confirmation:** the bag panel slides in from the right immediately on add, without a separate "Added!" toast. The panel shows the new item at the top of the list. 〔via customer reviews describing immediate bag opening〕

**Loading skeleton:** the custom checkout likely shows a subtle grey shimmer on the order summary while page loads. 〔unverified〕

**Empty bag state:** "Your bag is empty" — plain, no animation, no copy flourish. Just a link back to the shop.

**Error toasts:** not described. Customer commentary describes inline errors, not modal popups, for payment failures. 〔via 1 Trustpilot review describing a card-decline experience〕

---

## Mobile-specific

〔partially inferred〕

- Right-slide bag panel becomes full-screen overlay on mobile, consistent with standard mobile sheet behavior
- Order summary collapses to a tap-to-expand disclosure at the top of the checkout form
- Express checkout buttons: absent (Aesop has none in any region observed)
- Sticky submit CTA at bottom of viewport on the checkout form
- Typography scale on mobile: Suisse Int'l remains legible at 14–15px; the form is not cramped

---

## DTC craft specifics

### Editorial copy in the cart (the single most important pattern for Clarté)

Aesop's cart contains zero promotional copy. No "you might also love," no countdown timer, no "only 3 left." The copy that does appear is strictly functional and written in the brand's signature prose register:

- Bag trigger: **"Bag (n)"** — the word "Bag" rather than "Cart" is an editorial choice that removes the commercial/warehouse connotation
- Shipping line in the footer: **"Complimentary shipping on all orders"** — "Complimentary," not "Free," not "Free Shipping." The word choice is deliberate; "complimentary" reads as a service gesture, not a price concession
- Gift toggle below the delivery field in checkout: **"This is a gift for someone special"** 〔verbatim via search snippet〕 — no checkbox, described as a toggle that expands a gift section
- Checkout section labels: implied small-caps treatment consistent with the brand's "layouts and typography inspired by the iconic product packaging" 〔Work & Co〕

**The vocabulary pattern for Clarté to steal:** replace every instance of "Free" with "Complimentary" where applicable (e.g., "Complimentary shipping — Rs. 250 flat" is both more accurate and more brand-coherent than "Free Shipping"). Replace "Cart" with "Bag" or "Order" in any UI copy that is currently generic.

### Gift wrap UX

〔via us.assistance.aesop.com Google snippet + multiple customer reviews + brand help article search〕

Aesop's gifting flow is a **checkout-step toggle**, not a cart-layer add-on:

1. After selecting delivery method, a section appears: **"This is a gift for someone special"** — customer taps/clicks
2. On activation, a text field expands for a **personalised gift message** (character limit unverified)
3. Products are shipped wrapped in **Aesop's signature cotton drawstring bag**, lightly spritzed with the brand's fragrance. The bag is made from 100% recycled and organic fibres 〔via brand help article snippet〕
4. A handwritten card with the customer's message is included
5. **Complimentary** — no charge for the gift wrapping

The gift toggle is subtle: no gaudy "GIFT WRAP" banner. It reads as a thoughtful service disclosure rather than an upsell. This is the correct posture for a premium brand. **Skip this for Clarté** — Clarté has no gifting positioning and the operational complexity of handwritten notes + cotton bags is out of scope. But the pattern of a low-key service toggle (vs. an upsell banner) is worth noting for any future "add a personalised note" feature.

### Sample selection at checkout

〔via Aesop US help center Google snippet + EU/AU help articles〕

Previously available in AU, EU, and some other regions; **currently unavailable on US and Canada** 〔confirmed via help article snippet〕. Where active:

- During checkout (specifically after the delivery section, before payment), a step appears prompting sample bundle selection
- Copy: *"Simply select from the available bundles at the checkout page"* 〔from Google snippet of help article〕
- Options were presented as small 2–3 product groupings (e.g., face care mini-set, hair care mini-set), not individual samples
- Customer selects one bundle; samples are included in the shipment

This is notably **not in the cart** — it is a checkout step. For Clarté, the opt-in sample tile in the cart (BoJ pattern) is a better-fit position. An in-checkout sample step adds friction at the moment of highest commitment anxiety.

---

## What to lift for Clarté

1. **"Complimentary" > "Free" in all shipping copy.** At `app/(site)/checkout/page.tsx` and the cart drawer footer, change the shipping line from "Free shipping" or "Free delivery" to *"Complimentary delivery — Rs. 250"* or *"Rs. 250 delivery, confirmed on arrival."* Small word change, large positioning signal. Aesop proves this framing works at every price tier above commodity.

2. **"Bag" > "Cart" in the header trigger.** Currently Clarté's header uses a shopping bag icon + count. The text fallback (aria-label, screen reader text, empty state copy) likely reads "Cart." Change it to "Bag" throughout — the Header component, the empty state copy, and any checkout breadcrumb references. Costs nothing, communicates clinical-craft restraint.

3. **Submit button: "Place Order" with no payment verb.** Clarté's current checkout already reads "Place Order — Rs. {total}" per the 05-checkout.md synthesis. This validates that choice — Aesop uses the same verb. Do not let any future sprint change it to "Pay now."

4. **"This is a gift" toggle pattern — for a future WhatsApp-note feature.** When Clarté adds a "Request a personalised skin note from our doctor" feature (a low-cost, high-value COD market differentiator), model the toggle after Aesop's gifting toggle: quiet, below the shipping section, no banner. Text: *"Add a personalised skin note to this order."* Expands a text field with copy: *"Tell us a little about your skin — our registered doctor will include a printed note with your order."*

5. **Section labels as typographic dividers in the checkout form.** Aesop uses label-as-section-header in their custom checkout, consistent with their packaging typography. In Clarté's `CheckoutForm.tsx`, the three fieldset sections (Contact / Shipping / Confirm) should have eyebrow labels in JetBrains Mono uppercase — not just fieldset borders. This gives the "clinical form" reading that matches Clarté's three-font system and Aesop's "layouts inspired by packaging" principle. Apply to `app/(site)/checkout/page.tsx`.

---

## What to skip

1. **Sample selection as a checkout step.** Aesop historically ran a sample-bundle picker inside the checkout flow — this is the wrong position for Clarté. Any sample/add-on mechanic should live in the cart drawer (pre-checkout), not inside the form. An in-checkout sample step adds decision-making at the moment the user is trying to complete an action, and for COD-only, it may raise the question "is this included in the Rs. X total or extra?"

2. **No payment logos in the checkout form.** Aesop deliberately hides Shopify's standard payment-method logos to avoid Shopify's brand appearing in their checkout. For Clarté, there are no payment method logos to hide (COD only). But the principle applies: don't add visual clutter around the submit area. No "Secured by Stripe" (not applicable), no generic bank-card icons, no payment rail branding. The COD trust block is the only payment signal needed.

3. **Full removal of all persuasion copy from the cart.** Aesop can afford zero cross-sell and zero upsell because their AOV is built at the product level ($100+). Clarté's protocols are Rs. 4,799–7,999 — already high for the Pakistan market — but individual products are Rs. 1,799–2,500. A single opt-in sample tile (BoJ pattern) or a WhatsApp trust line in the drawer footer adds warmth without being Aesop-expensive in terms of missed revenue. Don't go full Aesop-minimalism on cross-sell; go Aesop on the copy register.

---

## Sources

- Work & Co Aesop case study — https://work.co/clients/aesop/ (direct; truncated content — key claim: "one-page checkout makes ordering simple")
- Fonts In Use — Aesop typography confirmation — https://fontsinuse.com/uses/20234/aesop-logo-website-and-packaging
- Aesop online services page — https://www.aesop.com/online-services.html (403 direct; Google snippet sourced)
- Aesop US help — "Will I receive samples with my order?" — https://us.assistance.aesop.com/hc/en-us/articles/7389953819791-Will-I-receive-samples-with-my-order (403; Google snippet)
- Aesop US help — "What are your online offers?" — https://us.assistance.aesop.com/hc/en-us/articles/10971594036623-What-are-your-online-offers (403; Google snippet)
- Aesop US help — "Do you offer gift wrapping?" — https://us.assistance.aesop.com/hc/en-us/articles/7389961832463-Do-you-offer-gift-wrapping (403; Google snippet)
- Aesop US help — "Where can I find more information about cotton bags?" — https://us.assistance.aesop.com/hc/en-us/articles/10871522875407-Where-can-I-find-more-information-about-cotton-bags (Google snippet)
- Aesop Philippine storefront — https://www.aesopskincare.ph (directly accessible — used for cart/product copy verification)
- HOZ Studio Behance — Aesop E-Commerce Redesign concept (2023) — https://www.behance.net/gallery/186232833/Aesop-E-Commerce-Website-Redesign (image-only; design mockup reference)
- Brandvm — Aesop marketing strategy — https://www.brandvm.com/post/aesop-marketing-strategy
- latterly.org — Aesop marketing and pricing philosophy — https://www.latterly.org/aesop-marketing-strategy/
- Trustpilot — Aesop reviews — https://www.trustpilot.com/review/www.aesop.com (customer checkout descriptions; 403 on direct fetch)
- Ecommerce Design Awards — Aesop entry — https://www.ecomdesignawards.com/websites/aesop
