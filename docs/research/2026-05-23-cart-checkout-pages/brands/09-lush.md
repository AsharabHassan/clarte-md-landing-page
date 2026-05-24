# Lush — Cart + Checkout Teardown

**URL:** https://www.lush.com (UK: /uk/en; US: /us/en_us)
**Positioning:** Handmade, packaging-free, ethical cosmetics; mid-range ($8–$65 per item); independent; anti-corporate brand voice
**Why study them:** Lush has the most unusual cart architecture in the reference set — full-page only, no drawer — plus a distinctive eco/sustainability framing in the delivery step and a free-sample mechanic that is genuinely relevant to Clarté's "add a sample to your order" consideration. Prior coverage (04-cart.md) gave Lush two paragraphs; this goes deeper on their full-page cart composition, eco-delivery presentation, knot-wrap gifting logic, and the note/sample mechanic.

**Sourcing note:** lush.com returns HTTP 403 to bots on all regional storefronts. Sources used: (a) Lush UK Delivery Pass FAQ — zendesk help center (partially accessible via Google snippets), (b) Inviqa/Lush ecommerce case study, (c) Lush's own FAQ pages (faq/sample-program, faq/delivery-information — snippets via search), (d) the ABTasty Lush digital CX case study PDF (retrieved but in French — not usable for English copy), (e) the Lush US help articles (403 direct; snippets only), (f) customer community discussions (Quora, Reddit), (g) Lush corporate blog (weare.lush.com — partially accessible). Inline flags throughout.

---

## URL + entry point

- Cart: `https://www.lush.com/uk/en/cart` and `https://www.lush.com/us/en_us/cart` — both 403 to bots
- Checkout: served from the same origin, not a separate hosted domain (Lush is not on Shopify — proprietary platform) — gated
- Accessible reference: `https://www.lushusa.com/cart` redirects to the main US storefront homepage; not a standalone cart URL

---

## Cart drawer composition

**Lush does not use a cart drawer.** This is the brand's most structurally unusual cart decision. Lush's "basket" (their word for cart, UK convention) is exclusively a **full-page** experience. When a customer adds a product, they can either stay on the page with a brief add-confirmation toast, or navigate directly to `/cart`. There is no right-side sliding panel. 〔via Inviqa case study: Lush's e-commerce emphasizes "story-telling and immersion" over frictionless add-to-cart; the full-page basket is consistent with this posture〕

**Cart trigger in the header:** basket icon + count ("Basket" UK, "Bag" US) — text label, not icon-only. 〔via prior research in 04-cart.md〕

This is a deliberate brand-voice decision: Lush wants customers to go to the basket as an act of intentional review, not as a flyout that keeps them in browsing mode. The editorial philosophy prioritizes reflection over impulse. It has a conversion cost (no-drawer is slower to purchase) that Lush knowingly accepts.

---

## Cart page composition

〔via prior 04-cart.md research + Inviqa case study + customer community sources + Lush FAQ snippets〕

**Layout:** single-column on desktop — all items in a stacked vertical list, full-width. No two-column split with a sticky order summary. The order summary (subtotal, shipping, checkout CTA) appears at the **bottom** of the page below all items, not in a persistent right column. This is highly unusual — most premium DTC brands use the two-column pattern. Lush's full-width single column is driven by their product photography strategy.

**Product image treatment — the brand signature:** Lush shows the **unpackaged ("naked") product** in the basket, not the labeled container. A bath bomb looks like a pink sphere; a solid shampoo bar looks like a cut-stone puck. No packaging label visible. This is visually distinctive and brand-consistent — Lush's anti-packaging philosophy extends into the cart UI. 〔via 04-cart.md prior research + customer Reddit/Quora descriptions〕

**Item line composition:**
- Large-ish product image (~120px on desktop — larger than industry standard) showing the naked product
- Product name in Lush's sans-serif, left-aligned
- Variant / size if applicable
- Price per unit and line price
- Qty stepper: −/+ with a **direct integer input field** in the center — customers can type "3" to change quantity without clicking the stepper multiple times. This is a Baymard-approved pattern that most brands get wrong. 〔via 04-cart.md〕
- Remove: × icon or "Remove" text link — exact treatment could not be verified

**Free shipping bar:** UK £50 threshold; US $60 threshold. Progress bar displayed at the top of the basket page. Copy: roughly "Spend £X more for free delivery." Completes with a congratulatory state. 〔DOCUMENT — DO NOT RECOMMEND for Clarté. Flat Rs. 250 shipping, no threshold.〕

**Promo code input:** visible by default — a standard promo-code field is not collapsed under a link. Lush surfaces it prominently. 〔via 04-cart.md〕

**Order total at the bottom of the item list:** subtotal + shipping line + total. Because the summary is below all items on a long-ish page, this creates a slightly longer scroll-to-commit experience than a sticky right column. Clarté's two-column cart page (per 04-cart.md baseline: `grid-cols-[1fr_23.75rem]`) is structurally superior for conversion.

**Mobile cart:** single-column by default, same as desktop. The order summary stays at the bottom. No sticky checkout CTA — customer scrolls to the bottom to reach the CTA. This is a UX weakness that Clarté should consciously avoid.

---

## Free sample mechanic

〔via Lush "Sample Program" FAQ snippet + customer Quora discussions + 04-cart.md〕

This is Lush's most instructive cart pattern. Lush offers **one free sample per online order**, selectable in the basket. The implementation varies by region and time period:

- **Current US status:** The online sample program is "currently on pause" as Lush reviews the mechanics 〔via FAQ snippet: "currently on pause as they review and make necessary changes"〕. The feature may still be active in UK and AU regions.
- **When active (historical/UK pattern):** a sample-selection module appears inside the basket — either (a) a free-text "notes" field where customers can request a specific product, or (b) a curated pick-your-sample tile with an Add button. The free-text notes approach is operationally fuzzy (staff may not fulfill the specific request) but conversion-positive because it makes the brand feel personal.
- **Customer experience:** 〔via multiple Quora/Reddit sources〕 customers appreciated the sample mechanic but reported inconsistent fulfillment — staff would sometimes substitute or include a different sample than requested.

**The pattern Clarté should study:** a single-tap opt-in tile in the cart, not a free-text notes field. The notes field creates expectation mismatch. A curated "Add a complimentary sample" button with a defined product (e.g., a mini of a cleanser from the protocol the customer doesn't have) removes the ambiguity. Lush proves the mechanic increases warmth even when execution is imperfect — Clarté can execute it cleanly by pre-specifying which sample maps to which cart state.

**Note field separately:** in addition to the sample mechanic, Lush's basket includes a general **order notes field** where customers can add delivery instructions, gifting requests, or special notes. 〔via 04-cart.md, GoBeyond.AI Brooklinen comparison〕 This is distinct from the sample-request mechanic.

---

## Gift options — Knot Wrap

〔via Lush UK product pages (Knot-Wrap category accessible) + sustainability articles〕

**What it is:** A Knot Wrap is Lush's reusable fabric gift wrap — organic cotton or recycled PET fabric squares that can be used to wrap products in the traditional Japanese furoshiki style. Lush sells these as individual products (£5–£12 per Knot Wrap) in seasonal and year-round designs. 〔via lush.com/uk/en/c/knot-wraps — direct〕

**Cart presentation:** Knot Wraps are added to the basket as **regular products**, not as a gifting service option. There is no gift-wrap toggle in Lush's basket that automatically wraps your order in a Knot Wrap. Instead, the customer buys one or more Knot Wraps alongside their other items, and the physical wrapping is done by the customer after delivery.

This means Lush's "gift wrap" is entirely a product purchase, not a service toggle — it is the opposite of Aesop's complimentary-gift-wrap-in-checkout model. The brand rationale: Lush doesn't want to create a gifting service with its own environmental footprint; instead, the Knot Wrap itself is the zero-waste packaging alternative that the customer keeps and reuses.

**Cart/checkout implication:** no checkout step for gift wrapping. No gift message field described in customer documentation 〔could not verify whether a gift message option exists at checkout — flagged〕.

**For Clarté:** skip. Clarté has no gifting positioning and operational wrapping complexity is out of scope. The interesting observation from Lush's Knot Wrap is the **principle** — sustainability credentials can be an upsell in the cart without being manipulative, if the product genuinely does something useful (reusable wrap). A Clarté analog would be a "Protocol Guide Booklet" as an add-on product — but that's a future feature, not a current priority.

---

## Eco / sustainability presentation in cart — the core learning

〔via Lush Delivery Pass FAQ (Google snippets) + lush.com/uk/en/p/lush-delivery-pass product page snippets + environmental policy articles〕

Lush's most distinctive sustainability signal in the cart/checkout flow is the **Delivery Pass** — not a free-shipping threshold, but a product you buy:

**Lush Delivery Pass (UK):** £15 for unlimited standard delivery for one year on all orders placed on the registered account 〔verified via Zendesk FAQ snippet〕. It is added to the basket like any other product, paid once, and activates immediately upon checkout. Once active, it automatically applies free standard shipping to all future orders within the year.

**Eco copy on the Delivery Pass:** *"We ask that you think twice about how often you use your pass. By grouping smaller deliveries into one, you will lessen the impact on the planet."* 〔verbatim via Lush Delivery Pass FAQ snippet〕 This is the single most elegant sustainability-in-checkout copy pattern in the research set. It:
1. Acknowledges the environmental cost of delivery without being preachy
2. Frames the behavioral ask ("group your orders") as thoughtful, not punitive
3. Does not add friction — it's copy, not a mandatory step

**Eco-pop chips:** Lush uses potato starch-based packing chips that biodegrade in water or soil. 〔via Delivery Pass FAQ〕 This is mentioned in the delivery information, not prominently in the cart.

**Carbon-positive packaging:** Lush's cork packaging (for some products) uses carbon-positive production. 〔via press articles〕 This is not surfaced in the cart or checkout flow — it lives on product pages and the brand's corporate content.

**No carbon-neutral delivery option as a paid toggle:** I found no evidence that Lush offers a paid "offset my delivery's carbon footprint" checkbox at checkout, despite the research brief's suggestion of a "Forest Friendly Delivery upsell." The Delivery Pass is the main sustainability mechanic in the checkout flow. The "knot wrap" and eco messaging are product-level, not checkout-level. 〔flagged — could not access live checkout to verify; this interpretation is based on available indirect sources〕

---

## Cart-to-checkout transition

**CTA copy:** **"Checkout"** — single word, no "Proceed to" prefix. 〔via 04-cart.md〕

No express checkout buttons in the basket (confirmed for UK historically; US status unclear). Lush's custom platform pre-dates Shopify's accelerated checkout ecosystem.

Guest checkout is the default — Lush does not require an account to purchase online. 〔via customer community sources〕

---

## Checkout layout

〔primarily inferred from Inviqa case study + customer descriptions + Lush's proprietary platform architecture〕

**Platform:** Lush runs a **custom-built proprietary platform** (confirmed by Inviqa case study — Inviqa rebuilt the Lush UK storefront). Not Shopify, not Magento. This means checkout patterns are Lush-specific, not attributable to a platform default.

**Architecture:** multi-step, similar to Shopify's standard 3-step model. Steps reported in customer descriptions: contact/address → delivery method → payment → review/confirm. 〔inferred; could not verify step names or exact count〕

**Order summary:** right column on desktop, persists through checkout steps. Standard positioning. 〔customer descriptions consistent with this〕

**Step indicator:** present — a horizontal breadcrumb at the top of the checkout form. Exact style (numbered, named, progress bar fill) could not be verified. 〔inferred〕

**Visual language in checkout:** Lush's checkout is described in the Inviqa case study as visually consistent with the editorial storefront — the same brand colors (black, white, with accent colors matching seasonal campaigns) and typography. Not sterile.

---

## Form structure + interactions

〔inferred from Inviqa case study + customer commentary + Lush help articles〕

**Field order:** Email → First/last name → Address → City → Postcode → Country → Phone → Delivery method → Payment

**Delivery method step:** this is where Lush's eco positioning has historically appeared. The Delivery Pass discount applies automatically for pass-holders. Non-pass-holders see standard vs. express shipping options. **No eco-offset paid add-on** at this step per available evidence. 〔flagged: could not verify conclusively — may vary by region or campaign period〕

**Payment:** Lush UK historically did not offer Apple Pay or Shop Pay (the brand had an ambivalent relationship with Big Tech). Credit/debit card and PayPal have been the core options. 〔via 04-cart.md prior research〕

**Quantity controls on checkout:** the basket's direct-integer-input stepper does not appear to persist to the checkout itself — checkout typically shows read-only items and routes edits back to the basket. 〔inferred〕

**Notes field at checkout:** a general notes/instructions field (distinct from the sample-request notes field in the basket) may appear at the checkout level, specifically for delivery instructions. 〔customer community references to leaving "gate codes" or "leave at door" notes during checkout〕

---

## Payment + trust

**Payment methods:** credit/debit card (Visa, MC, Amex) + PayPal. UK historically no Apple Pay. No BNPL. No express checkout buttons. Lush's checkout is explicitly un-slick by Silicon Valley standards — it values operational control over payment-partner brand-sharing. 〔via 04-cart.md, Inviqa case study〕

**Trust signals:** 〔Inviqa case study emphasis on "brand narrative" and "story-telling"〕 Lush's trust is carried by the editorial voice throughout the site, not by checkout-specific badges. In the checkout itself: cruelty-free and handmade messaging may appear in the page footer, consistent with their brand pillars. No "256-bit SSL" banner. 〔inferred from general Lush brand approach; could not verify specific checkout trust elements〕

**Returns/refund placement:** linked from checkout footer. Lush offers a 365-day return policy for unused products. 〔via Lush T&Cs〕

---

## Submit button

〔could not verify exact verbatim for Lush's checkout submit button — flagged〕

**Likely copy:** "Place Order" or "Confirm Order" — UK convention, consistent with their non-Shopify platform and avoiding US-style "Pay now." 〔inferred from "place" language in Lush T&Cs and help articles; not confirmed〕

**Mobile sticky:** unknown — could not verify. Lush's basket-page CTA is not sticky (a known UX weakness); the checkout submit behavior may differ. 〔flagged〕

---

## Microinteractions + state

**Add-to-basket confirmation:** brief inline confirmation near the product (a "Added to basket" toast or overlay), then the header basket count increments. No drawer flies out. 〔customer commentary + 04-cart.md〕

**Empty basket state:** "Your basket is empty" + browse CTA + cruelty-free / handmade trust copy 〔via 04-cart.md〕 — the trust copy on the empty state is a notable pattern: Lush's empty basket is not just "nothing here," it reinforces brand values. This is a softer version of Augustinus Bader's "WhatsApp concierge on empty cart."

**Error treatment:** standard inline validation; specific error styling unknown.

**Loading:** custom platform — likely custom loading states; no shimmer skeleton observed in descriptions.

---

## Mobile-specific

- No cart drawer — full-page basket on all devices
- Basket CTA ("Checkout") is not sticky on mobile — customer scrolls to the bottom of the item list to reach it. This is a genuine UX weakness. 〔confirmed in 04-cart.md as "easy win" for competitors to address〕
- Product images in the basket remain larger on mobile than typical — the naked-product photography is a design feature, not something they compress away on small screens
- Delivery Pass option in checkout appears the same on mobile — it's a delivery method choice, not a widget

---

## DTC craft specifics

### Editorial voice in the cart — where Lush is unique

Lush's basket editorial voice is notably less present than Aesop's. The storefront is rich with editorial content (product origin stories, ingredient sourcing, founder advocacy) but this thins considerably in the basket. The main editorial presence in the basket is:
1. The cruelty-free / handmade copy on the empty-basket state
2. The eco-pop chips / sustainability packaging note (minor, in delivery context)
3. The note / sample-request field, which by its very presence implies "we're a human company that can respond to your note"

**The tension:** Lush's brand is highly editorial-voice-driven, but the basket strips most of that down. This creates a jarring tone shift. Aesop's basket is tonally continuous with the rest of the site because the restraint is consistent. Lush's basket is the first "non-editorial" surface the customer hits — and it feels like a different brand.

**For Clarté:** this is a cautionary pattern. The checkout surface should be tonally continuous with the storefront. Clinical warmth in the header/PDP copy should continue into the cart and checkout. At minimum: the cart drawer footer message, the empty-state copy, and the section labels in CheckoutForm.tsx should use Fraunces/Mono/Jakarta in exactly the same roles as the rest of the site.

### Eco/sustainability presentation — the "think twice" pattern

The Delivery Pass copy — *"We ask that you think twice about how often you use your pass. By grouping smaller deliveries into one, you will lessen the impact on the planet."* — is the best sustainability-in-cart copy in the entire reference set. It earns three things simultaneously:
1. **Authenticity:** acknowledges the cost of delivery rather than greenwashing it away
2. **Action guidance:** specific behavior recommendation ("group orders"), not abstract principle
3. **Trust:** frames Lush as a company that cares about outcomes over revenue

**For Clarté:** the closest analog is the COD delivery copy. A note in the checkout like: *"We dispatch within 24 hours to minimise your wait. Grouping multiple products in one order saves your courier a trip."* — this uses the same logic (grouping = virtue) without being eco-preachy. It's a warmth signal, not a sustainability claim. Apply near the shipping section in `CheckoutForm.tsx`.

### Knot Wrap as an in-cart product, not a service

Lush's approach to gift wrap as a **regular product add-on** (the customer buys the wrap, the customer does the wrapping) rather than a checkout service toggle is an operational insight. For brands that can't staff a gift-wrapping operation, selling the packaging component as a product is a viable model. Clarté doesn't need this pattern now, but it's worth noting as a future "add a protocol guide card to your order" product — a printable card sold at Rs. 0 (free add-on) or Rs. 50 that describes the 12-week protocol. Modeled after Lush's naked-product-as-art philosophy.

---

## What to lift for Clarté

1. **"Think twice" delivery-framing pattern for the checkout shipping section.** Borrow the behavioral framing of Lush's Delivery Pass copy. In `CheckoutForm.tsx`, below the Rs. 250 shipping line, add a single sentence: *"Your order is dispatched within 24 hours. Ordering together saves your courier a return trip."* This communicates dispatch speed + consolidation value + human warmth without any unverified claims. Apply to the Shipping section of the checkout form.

2. **Empty basket/bag state with brand-values copy.** Lush's empty basket includes cruelty-free/handmade trust copy. Clarté's empty cart state (if it exists) could read: *"Your bag is empty. Our 12-week protocols are designed to work — not to be rushed. Browse and add what your skin actually needs."* This communicates clinical intent, not urgency. Apply to the empty state rendering in the shadcn Sheet drawer and the full `/cart` page.

3. **Direct-integer-input qty stepper in the cart.** Lush's quantity stepper lets customers type a number directly, not just tap −/+. Clarté's custom `+/−` stepper in the cart page (per current `page.tsx` baseline) should add a click-on-count → focus-editable-input behavior so customers can type a new quantity. This is a Baymard-approved high-impact cart refinement. Apply to `components/cart/QuantityStepper.tsx` (or equivalent).

4. **One-free-sample opt-in tile in the cart drawer.** Lush's sample mechanic — even in its messy free-text form — proves the pattern adds warmth. Clarté's version: a single pre-defined "Add a complimentary sample" tile in the cart drawer, below the item list, showing one specific product sample (e.g., the Cleanser from the Clear-Skin protocol for anyone with a non-Clear-Skin protocol in cart). Explicit "Add" button, opt-in only (no auto-add). Follows the BoJ/EltaMD pattern from 04-cart.md. The Lush precedent shows this is viable even for a smaller brand.

5. **Full-page cart as the primary surface, with a drawer as a fast-add shortcut.** Lush's full-page-only approach has a conversion cost — no drawer means the customer has to navigate away from browsing to review. But Lush proves a full-page cart can carry rich editorial content and complex product photography. Clarté's strategy (full-page cart at `/cart` + shadcn Sheet drawer added per 04-cart.md recommendation) is the optimal hybrid: drawer for quick adds, full page for deliberate review. Lush's full-page serves as the visual design benchmark for what a Clarté `/cart` page can look like with proper image treatment.

---

## What to skip

1. **Full-page-only cart (no drawer).** Lush's most distinctive cart choice is also their biggest conversion cost relative to peers. Clarté should have both — the drawer per 04-cart.md recommendation remains valid. Do not go Lush-only on full-page.

2. **Non-sticky cart CTA on mobile.** Lush's mobile basket requires scrolling to the bottom to reach "Checkout" — a confirmed UX weakness. Clarté's cart CTA must be sticky on mobile. Per 04-cart.md: a sticky `bottom-0` CTA is the highest-impact cart fix.

3. **Free-shipping threshold bar.** Lush UK £50 / US $60 — document only. Flat Rs. 250 shipping, no threshold. Per `feedback_unverified_claims`.

4. **Eco-offset paid delivery upgrade.** No verified evidence that Lush offers this as a checkout step; and even if they did, Clarté has no carbon-offset supplier relationship and no infrastructure to deliver on an eco-shipping promise. Do not introduce an eco-delivery toggle.

5. **Knot Wrap as a cart upsell.** No gifting positioning for Clarté currently. The "buy the wrapping as a product" model is operationally interesting but out of scope.

6. **Custom proprietary platform patterns.** Lush's checkout is on a bespoke Inviqa-built platform. The specific interaction patterns (form chrome, error states, step transitions) are not extractable as template code. Take the content/copy principles; ignore the implementation patterns.

---

## Sources

- Inviqa — Lush ecommerce case study — https://inviqa.com/case-studies/lush (direct)
- Lush UK — Delivery Pass product page — https://www.lush.com/uk/en/p/lush-delivery-pass (403 direct; Google snippet for copy)
- Lush UK — Delivery Pass FAQs (Zendesk) — https://lushltd.zendesk.com/hc/en-gb/articles/19869218356114-UK-Lush-Delivery-Pass-FAQs (403 direct; Google snippet: verbatim eco copy extracted)
- Lush US — Sample Program FAQ — https://www.lush.com/us/en_us/faq/sample-program (403 direct; Google snippet: "currently on pause")
- Lush US — Delivery Information — https://www.lush.com/us/en_us/faq/usa-delivery-information (403 direct; Google snippet)
- Lush US — Popular Questions FAQ — https://www.lush.com/us/en_us/faq/na-popular-questions (403 direct)
- Lush UK — Knot Wraps category — https://www.lush.com/uk/en/c/knot-wraps (direct; product listing accessible)
- Lush US — Knot Wraps — https://www.lushusa.com/gifts/knot-wraps/ (direct redirect to main site)
- Lush — Environmental policy — https://www.lush.com/us/en_us/a/our-environmental-policy (403 direct; Google snippet)
- We Are Lush — Environmental policy — https://weare.lush.com/lush-life/our-policies/environmental-policy/ (direct)
- Lush — Packaging Free Cosmetics — https://www.lush.com/uk/en/a/packaging-free-cosmetics (direct)
- We Are Lush — Lush Retail Experience Case Study — https://weare.lush.com/lush-life/our-staff-room/case-study-revolutionising-the-lush-retail-experience/ (direct)
- GreenQueen — Lush carbon-positive packaging — https://www.greenqueen.com.hk/lush-carbon-positive-packaging-driven-by-consumer-demand/ (direct)
- Quora — How to get Lush samples — https://www.quora.com/How-do-you-get-free-Lush-samples (customer experience descriptions)
- ABTasty — Lush customer experience case study — https://www.abtasty.com/wp-content/uploads/2024/04/Case-Study-Lush-EN.pdf (retrieved as PDF; content in French — not usable for English copy verification)
- Prior Clarté research — 04-cart.md (Lush section, basket patterns baseline)
- Baymard Institute — Cart quantity control benchmarks — https://baymard.com/checkout-usability/benchmark/step-type/cart (indirect; general patterns)
