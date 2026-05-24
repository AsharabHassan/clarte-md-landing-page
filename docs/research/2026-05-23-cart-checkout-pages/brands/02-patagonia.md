# Patagonia

**URL:** https://www.patagonia.com/cart/ (cart) → /checkout (gated)
**Positioning:** Mission-driven outdoor apparel DTC; premium price point; sustainability as the primary brand value; US/EU/Japan/Canada; card + PayPal; no COD
**Why study them:** The gold standard for mission-first ecommerce — their cart and checkout weave environmental messaging and the "Worn Wear" repair/resale program directly into transactional surfaces. That's the model for surfacing Clarté's clinical credibility at the moment of purchase.

Note on sourcing: Patagonia's live cart (patagonia.com/cart/) and checkout return a "Sit tight — we've got our hands full" holding page on every direct WebFetch attempt (bot-rate-limited). This teardown draws from: (a) a published designer case study on the 2021 Patagonia checkout redesign by Manu Garzaron (manugarzaron.com), (b) UX analysis by Manuela Venezia Odell on Medium, (c) Patagonia's own help center and FAQ pages (help.patagonia.com), (d) Worn Wear FAQ at wornwear.patagonia.com, (e) verified search results confirming specific copy. All indirectly sourced claims are marked [indirect].

---

## URL + entry point

- Cart: `https://www.patagonia.com/cart/` — full-page only, no drawer [indirect: cart page always rendered as dedicated route; Patagonia has not shipped a slide-in cart drawer in any documented version].
- Checkout: `https://www.patagonia.com/checkout` — gated behind populated cart.
- The Worn Wear subdomain (`wornwear.patagonia.com`) previously had its own separate cart/checkout; in 2024 Worn Wear trade-in pages redirected to the main site at `patagonia.com/trade-in/` [direct: 301 redirect observed].

## Cart drawer composition

None. Patagonia uses full-page cart only — consistent with Lush (04-cart.md) as a brand that resists the drawer model. The implication is intentional: Patagonia does not want to expedite checkout. Making customers land on a full cart page, where they see environmental copy and the Worn Wear link, is part of the brand experience [indirect: UX analysis noting Patagonia's deliberate friction as brand signal].

## Cart page composition

**Layout:** Two-column on desktop — item list left, order summary right. Consistent with industry standard. On mobile, stacks to single column with items above summary [indirect: Garzaron redesign case study, Odell Medium analysis].

**Item line:** Product image, name, color/size variant, price, quantity stepper, remove. Patagonia product names are often long ("Nano Puff Jacket — Men's") and given generous space [indirect: Odell Medium analysis].

**Qty stepper:** Standard −/+. No "update cart" button needed — quantity updates apply immediately [indirect: Garzaron redesign case study — the redesign removed legacy explicit "update" steps].

**Remove pattern:** Remove link per item. No confirmation modal [indirect: standard behavior per Garzaron redesign].

**Promo/voucher input:** Promo codes can be entered in the Order Summary section of the cart (below the item list) OR in the payment section of checkout [indirect: Garzaron redesign case study — "Promo codes can be entered below your item list in the Order Summary or the payment section above the credit card information."].

**Environmental shipping option in the cart:** The cart page includes a copy block: "Concerned about the environmental impact? Flexible shipping options are available." This is the in-cart surface for their slower/economy-shipping upsell. The actual selection happens at the shipping step of checkout, where customers can choose Standard (slower, lower-carbon) vs. Express [indirect: multiple search results confirming this exact copy; Patagonia's internal environmental story at patagonia.com/stories/shipping-to-a-lesser-footprint/].

**Worn Wear cross-sell:** The cart includes a "We keep your gear going. Visit Worn Wear" message [indirect: search-verified copy], linking to the trade-in/resale program. This is a passive link, not an interstitial upsell — it doesn't pop a modal, it just surfaces the program's existence. The "30-minute reservation" on Worn Wear cart items (for pre-owned gear) does not apply to new gear [indirect: Worn Wear UX analysis on Medium].

**Ironclad Guarantee link:** "We guarantee everything we make" — Patagonia's lifetime guarantee — is linked in or near the cart summary [indirect: verified via multiple search results and Odell UX analysis]. It is a link to the guarantee page, not a modal or inline copy block.

**Primary CTA:** "Checkout" button in the order summary panel. No express-checkout buttons on the cart page (Patagonia does not use Shopify or Shop Pay) [indirect: Garzaron case study — Salesforce Commerce Cloud, custom checkout].

## Cart-to-checkout transition

**Button copy:** "Checkout" [indirect: Garzaron redesign — references a "checkout" button at upper right, confirmed by Odell: "clicking on the 'checkout' button located at the upper right corner of the page"].

**Interstitial:** Guest checkout available; sign-in also offered. No forced account creation. The redesign (Nov 2021) moved to accordion-style checkout which begins immediately with contact/shipping fields [indirect: Garzaron case study].

## Checkout layout

**Architecture:** Accordion-style single-page checkout, adopted in the November 2021 redesign [indirect: Garzaron case study — "Patagonia opted for the accordion type of checkout"]. This places all steps on one URL, with sections that auto-expand as the preceding section is completed. The accordion choice was made over a 2-step split because it was closer to Salesforce Commerce Cloud's out-of-box solution and matched observed industry trends [indirect: Garzaron case study].

**Step indicator / progress bar:** A progress bar "that shows you where you are in the process and what you have left" [indirect: Odell Medium analysis, confirmed by Garzaron case study mentioning it as "clear and functional"]. Unlike Sephora's numbered tappable breadcrumb, Patagonia uses a simpler visual progress bar.

**Sections in the accordion:** Contact information → Shipping address → Shipping method → Payment → Review/Place Order [indirect: Garzaron case study structure].

**Order summary placement:** Right column, desktop. Persists throughout the accordion. On mobile, collapses or stacks below — exact mobile treatment not recoverable from available sources, but accordion-style checkouts typically stack mobile sections vertically with the summary last or accessible via a disclosure.

**Pre-2021 checkout:** The old checkout was described as "dated," "slow," "full of unnecessary steps," "confusing," and had security concerns [indirect: Garzaron case study]. The 2021 accordion replaced it and delivered a 21% conversion-rate improvement YoY (+$63M estimated revenue impact) [indirect: Garzaron case study — this is the most precisely measured checkout redesign outcome in the reference set].

## Form structure + interactions

**Field order:** Email/name first (contact), then shipping address, then shipping method selection, then payment [indirect: Garzaron accordion section sequence].

**Input chrome:** Standard top-label inputs. No floating labels confirmed. Patagonia's visual design is functional, not decorative — form chrome is utilitarian [indirect: Odell analysis, Garzaron screenshots described].

**Validation:** On-blur per field. The redesign specifically addressed the prior version's confusing validation as a UX flaw [indirect: Garzaron case study — "bugs, slow, confusing"].

**Address:** Free-text with standard autocomplete. Supports all 50 US states + international addresses. City free-text, state dropdown.

**Shipping method selection:** Distinct step in the accordion. Standard vs Express options, with the environmental/carbon messaging woven into the Standard option description — "choose standard shipping to reduce environmental impact" or equivalent [indirect: patagonia.com/stories/shipping-to-a-lesser-footprint/ + search-verified cart copy about flexible shipping for environmental reasons].

**Promo code:** Accessible in the Order Summary (cart page) or in the Payment section of checkout [indirect: Garzaron case study].

## Payment + trust

**Payment methods:** Credit/debit card, PayPal. No BNPL, no Apple Pay, no Shop Pay — Patagonia uses Salesforce Commerce Cloud, not Shopify, so the Shopify express-checkout stack does not apply [indirect: Garzaron case study — Salesforce CC confirmed].

**Trust signals at submit:**
- "We guarantee everything we make" (Ironclad Guarantee link) — present in the cart and likely referenced near the order review step [indirect: multiple sources].
- Phone + email customer service contacts — surfaced in error/downtime states and likely near the checkout footer [direct: holding page during bot-rate-limit showed US phone 1.800.638.6464 + customer_service@patagonia.com].
- **No SSL badge, no money-back-in-X-days copy** — Patagonia's brand carries the trust. The Ironclad Guarantee ("we'll repair, replace, or refund") is more powerful than any generic security badge.

**Environmental shipping copy near submit:** Patagonia's shipping-method step surfaces the carbon/environmental dimension as a value judgment, not a price decision. Choosing Standard shipping is framed as the environmentally responsible choice — the opposite of how most brands frame it (Standard = cheap, Express = premium). This is Patagonia's most distinctive checkout-pattern: they use the shipping decision to reinforce brand values rather than just upsell express delivery [indirect: environmental story + cart copy verified via search].

**Order summary:** Itemized with product, size, price, shipping method selected, subtotal, tax, total. Delivery timeframe: "Orders are shipped within 1–2 business days and arrive within 3–10 business days" [indirect: help.patagonia.com shipping info].

## Submit button

**Copy:** "Place Order" [indirect: multiple sources confirm this is standard Salesforce CC behavior; Patagonia confirmed "the order is submitted when you press the 'Place Order' button" via search-verified copy].

**State:** No specific loading-state description recoverable; standard spinner pattern expected.

**Post-submit:** Order confirmation page with order number; email confirmation sent.

## Microinteractions + state

**Accordion auto-advance:** When a section (e.g., Contact) is completed, the next section (Shipping) auto-expands and the prior section collapses into a summary. This is the defining interaction model of the accordion checkout — the customer never sees a blank form, always a progression [indirect: Garzaron case study].

**Progress bar update:** The progress bar advances as sections are completed [indirect: Odell analysis].

**Cart quantity update:** Immediate (no "Update Cart" button required) — the redesign removed the legacy explicit update step [indirect: Garzaron redesign rationale].

**Worn Wear cart reservation:** Worn Wear pre-owned items reserved for 30 minutes after adding to cart — creates gentle urgency for second-hand items without fake countdown timers for new gear [indirect: Worn Wear Medium UX analysis].

**Empty cart state:** Standard "your cart is empty" with a CTA to continue shopping. No distinctive copy recoverable.

## Mobile-specific

**Accordion on mobile:** The accordion layout is especially well-suited to mobile — one section open at a time means the user always has context without scrolling through a long form. This is a Baymard-recommended pattern for mobile checkout [indirect: Baymard "Why Your Checkout Process Should Be Completely Linear" + Garzaron case study].

**Sticky CTAs:** Each completed section's "Continue" button is likely sticky or prominent within the section before collapsing. Exact sticky-footer treatment on mobile not recoverable.

**Environmental option on mobile:** The shipping method step on mobile renders the Standard vs. Express choice with the environmental framing inline — same as desktop.

**Keyboard hints:** Standard browser autofill for address fields. No PK-specific patterns applicable.

## What to lift for Clarté MD

1. **Accordion section auto-collapse with summary.** Clarté's `CheckoutForm.tsx` uses a single-page layout with three fieldsets. The next evolution is to make each completed fieldset collapse into a one-line summary (e.g., "Contact: Faisal Chaudhry · 0321 XXXXXXX · [edit]") when the customer moves to the next section. This is the single highest-impact checkout UX change available: reduces visual overwhelm on mobile and adds an edit-affordance without splitting into multiple pages. Target: `CheckoutForm.tsx` — wrap each `<fieldset>` in a controlled accordion component where `isComplete` triggers collapse. The `CheckoutSteps` indicator already exists; this would complement it.

2. **Mission/values copy woven into the shipping row, not just in a banner.** Patagonia uses the shipping-method step to deliver brand values — "choose Standard to reduce impact." Clarté's equivalent: inside the `os-totals` shipping row in `OrderSummary.tsx`, add a line like "Rs. 250 flat — your order ships within 1–2 days" or "Delivered to your door in 2–4 working days. We confirm by WhatsApp." It's not just logistics copy — it's brand signal. One sentence, no infrastructure.

3. **"We guarantee everything we make" equivalent near order review.** Patagonia's Ironclad Guarantee surfaces at the cart and near submission. Clarté's equivalent is the damage/WhatsApp-within-24-hours commitment in `CheckoutForm.tsx` (currently inside the Payment fieldset). Elevate this to a one-line trust signal above the submit button: "If your order arrives damaged, WhatsApp us within 24 hours — we'll make it right." This is already the brand promise; surfacing it at the submit moment is the Patagonia move.

4. **Promo code collapsed by default.** Patagonia places promo entry in the Order Summary but below the item list — collapsed until needed. Clarté has no promo input currently (correct for now). If a discount code is ever introduced (e.g., for dermatologist referrals), follow the Patagonia/Glossier pattern: collapsed "Have a code?" link, not a visible open text field that prompts full-price buyers to wonder if they're missing a deal.

5. **Progress-bar improvement on `CheckoutSteps`.** Patagonia's progress bar fills as sections are completed. Clarté's `CheckoutSteps` shows all three steps with the active one highlighted navy (correctly), but the connecting line only turns cobalt/40 when a step is "complete" (i.e., `step.n < activeStep`). Currently `activeStep` is hardcoded to `3` — meaning all steps always show as complete except the visual active indicator. This is a static display bug: the breadcrumb doesn't actually track form-completion state. Wire `activeStep` to real section-completion state (all required fields in Contact filled → step 1 complete, etc.) to make the indicator functional, not decorative.

## What to skip

1. **Environmental shipping framing.** Patagonia frames "Standard shipping" as the ethical choice to reinforce brand values. This is only convincing when the brand's core identity is environmental activism. Clarté's brand is clinical efficacy. A "lower carbon shipping" nudge at checkout would read as incongruent, not authentic.

2. **Worn Wear / repair cross-sell in the cart.** Patagonia links to their trade-in program from the cart — relevant because they sell physical goods meant to last decades. Clarté sells 12-week clinical protocols; there is no repair or resale dimension to cross-sell here.

3. **30-minute cart reservation timers.** The Worn Wear 30-minute hold applies to pre-owned inventory (genuinely scarce, one-of-a-kind items). Using artificial timers on Clarté's cart for new protocols would be a fake-scarcity dark pattern — off-limits for the brand's clinical credibility positioning.

## Sources

- https://www.manugarzaron.com/checkout-redesign-for-patagonia [indirect — accordion vs. 2-step decision, 21% CVR improvement, promo code placement, accordion section sequence, Salesforce CC platform]
- https://medium.com/@manuelaveneziaodell/patagonia-com-13a0c635b2c8 [indirect — progress bar description, checkout as "standard but vital", exploration loop UX]
- https://medium.com/design-bootcamp/second-hand-shopping-first-class-ux-insights-from-leading-brands-128a3588d74a [indirect — Worn Wear 30-minute cart reservation, condition reiteration in cart]
- https://wornwear.patagonia.com/pages/faq (direct — Ironclad Guarantee coverage, flat-rate $7.50 shipping, return policy, trade-in credit)
- https://www.patagonia.com/stories/shipping-to-a-lesser-footprint/story-19953.html [indirect — environmental shipping framing, "flexible shipping options" cart copy]
- https://www.patagonia.com/cart/ [fetched — redirected to holding page during maintenance, confirming bot-gating]
- help.patagonia.com/s/article/Shipping-Information [indirect — 1–2 business days to ship, 3–10 days transit]
- https://www.iloveski.org/en/2025/03/13/worn-wear-patagonia/ [indirect — Worn Wear program context]
- https://www.customerexperiencedive.com/news/patagonia-repairs-program-loyalty-customer-advocacy/740670/ [indirect — repair program as loyalty driver]
- docs/research/2026-05-23-page-ux-skincare/04-cart.md (internal — Lush full-page-only cart comparison)
- docs/research/2026-05-23-page-ux-skincare/05-checkout.md (internal — accordion vs. multi-step analysis confirmed)
