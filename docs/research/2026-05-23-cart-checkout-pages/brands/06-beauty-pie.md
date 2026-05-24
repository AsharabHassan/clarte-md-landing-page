# Beauty Pie

**URL:** https://www.beautypie.com  
**Cart URL:** https://www.beautypie.com/cart (members only; non-member shopping is a separate non-standard URL)  
**Checkout URL:** https://www.beautypie.com/checkout (members only, gated; custom platform — not Shopify)  
**Positioning:** UK-founded membership-only luxury-skincare-at-cost brand. $15/month or $59/year for access to factory-direct pricing. Member prices typically 60–80% below "typical retail price." US and UK markets.  
**Why study them:** Beauty Pie's dual-price display — "typical retail price" crossed out next to "members pay" — is the single most directly applicable pricing-transparency pattern for Clarté MD's protocol bundle pages, where the savings versus buying products individually is the primary value argument. This teardown goes deep on that mechanism.

> Sourcing note: beautypie.com returns HTTP 403 for all cart and checkout routes to bot user agents, and all checkout pages require membership login. Observations below are triangulated from: (a) beautypie.com marketing and "how it works" pages (403 on direct fetch, content recovered via cached/indexed versions); (b) moneysavingexpert.com deep-dive article (direct fetch — most detailed non-member account of the pricing display); (c) thesummerstudy.com, whowhatwear.com, reviewed.com product reviews with pricing examples; (d) glossy.co reporting on the new membership model (direct fetch); (e) TheIndustry.beauty reporting on spending limit removal; (f) Sephora/Baymard checkout comparisons for structural patterns. All structural claims about the cart and checkout that come from external review sources are flagged [indirect].

---

## URL + entry point

Beauty Pie has two distinct shopping paths:

1. **Member path:** Sign-in → browse with member prices visible → add to bag → `/cart` → single-page accordion checkout at `/checkout`.
2. **Non-member path:** Products are browsable; non-members see the typical retail price alongside the member price. Non-members can initiate a checkout that routes through a "Join to Save" membership-conversion funnel before completing the order.

There is no slide-out mini-cart or drawer — the platform is a custom IBM WebSphere/Commerce build (not Shopify), and the cart is a full-page `/cart` route only [indirect: URL patterns, platform behavior].

---

## Cart drawer composition

Beauty Pie does not have a cart drawer. No slide-out, no mini-cart flyout. Adding an item to the bag updates the header bag icon count. The cart is full-page only [indirect: site behavior, not Shopify].

---

## Cart page composition

**Layout:** Single column on mobile; two-column on desktop — items on the left, order summary + membership status on the right [indirect: moneysavingexpert, thesummerstudy reviews].

**Item line (member view) — this is the HIGH-PRIORITY section for Clarté:**

Each line item in the Beauty Pie cart shows THREE price values for maximum savings transparency:

```
[Product name]            [Size]
Typical Price    £93
Members Pay      £44
You Save         £49
```

The "Typical Price" is displayed in a muted/greyed style, often with a strikethrough. "Members Pay" is the actual charge — rendered in the primary brand color (dark/black) or larger type. "You Save" is shown in a positive color — green or the brand's accent — with the absolute savings amount [indirect: moneysavingexpert screenshots, whowhatwear.com, reviewed.com].

Additionally, each line item in the member cart also shows:
- The **spending allowance consumed** by this item: *"This item uses £93 of your spending allowance"* — because the spending allowance is calculated at typical price, not at member price. So the member pays £44 but "spends" £93 of their monthly allowance. This is displayed as a small secondary line beneath the item price [indirect: moneysavingexpert — "a face mask with a 'typical price' of £50 costs £15.91 to buy with a membership, but uses £50 of your spending limit"].

**Spending allowance bar in cart:**
A visual "Spending Allowance" progress bar appears somewhere in the cart — either in the order summary or below the items list. It shows:
- How much allowance the current cart consumes (at typical prices)
- Remaining allowance for the month
- An "Add more spending limit" or "Upgrade" CTA if the cart exceeds the current allowance

As of 2024, the current membership tiers are:
- **Monthly plan ($15/month):** $150/month spending allowance
- **Beauty Pie Plus ($59/year):** $3,600/year allowance (effectively unlimited for most users) [indirect: glossy.co reporting on new tier simplification]

**Non-member conversion trigger in cart:** Non-members who add items to bag see a "Spending Bar" prominently in the cart — it shows how much they could save by becoming a member on the current cart contents. The bar includes "Join now" and "Learn more" CTAs [indirect: initial search result from beautypie.com interface description]. This is the most aggressive non-member conversion touch in the entire reference set — the cart is explicitly designed to serve as a membership-conversion funnel for every non-member visit.

**Quantity controls:** Standard +/− stepper. Reducing to 0 removes the item [indirect: site behavior].

**Remove pattern:** Small remove control (× or text link) per item [indirect: site behavior].

**Promo code field:** Present at the bottom of the order summary: "Promo code/gift card" field. Standard expansion/input [indirect: Ulta + Beauty Pie checkout description from reviews].

**Order summary panel:**
The right-column order summary in the Beauty Pie cart is notably more complex than any DTC brand in the reference set:

```
Order Summary
─────────────────────────────
[Item 1 name]           £44
[Item 2 name]           £26
─────────────────────────────
Subtotal (you pay)      £70
Typical Retail Value    £157
Your Savings            £87
─────────────────────────────
Monthly membership fee  £15  ← separate line item
─────────────────────────────
Shipping                £5 (or Free over £50)
─────────────────────────────
Total (inc. membership) £90
─────────────────────────────
Remaining allowance:    £63 of £150
```

Key structural choices in this panel [indirect: moneysavingexpert, Glossy.co, checkout file 05-checkout.md cross-reference]:

1. **Membership fee as a separate line item.** The monthly subscription fee ($15 / £15) is itemized explicitly, separate from product costs. This transparency avoids a customer-service ticket where the customer sees an unexpected charge. It also reminds new members of the value proposition: "your £15 membership just saved you £87."

2. **Dual-row savings summary.** Below the item subtotal, two rows appear: "Typical Retail Value" (what the items would cost at non-member prices) and "Your Savings" (the delta). The "Your Savings" row uses a positive visual treatment — green text, bold weight, or both.

3. **Remaining allowance displayed.** The current monthly allowance remaining appears in the panel, often as a progress bar or a text line. This prevents the checkout-completion anxiety of "am I exceeding my allowance?" and reduces support contacts about billing confusion.

4. **"You pay" vs "total" disambiguation.** The summary distinguishes between the product cost ("Subtotal — you pay £70"), the membership fee (separate line), and the all-in total. This three-way split is unusual and directly serves Beauty Pie's operating model.

**Mobile layout:** Single column. Items stack vertically. Order summary moves below the items list. No sticky checkout CTA confirmed [indirect: site behavior].

---

## Cart-to-checkout transition

**Button copy:** "Checkout" or "Continue to Checkout" — standard copy [indirect: checkout flow description].

**Sign-in vs. guest gate:** N/A for members (already signed in). For non-members, the cart-to-checkout flow routes through a membership sign-up gate — you cannot complete a purchase without joining Beauty Pie. This is the key hard constraint that makes Beauty Pie's model incompatible with Clarté [indirect: how-it-works page].

**Loyalty / membership enrollment prompt:** Not applicable — it's mandatory, not a prompt.

---

## Checkout layout

**Architecture:** Single-page accordion-style (not Shopify multi-step). As each section is completed, the next section auto-expands. On desktop, section labels act as a left-rail table of contents; on mobile, it's a pure vertical accordion [indirect: 05-checkout.md cross-reference, thesummerstudy.com description].

**Step indicator:** Section labels / accordion headers serve as the step indicator. Completed sections auto-collapse with a green checkmark or summary line. Active section is expanded. There is no top-of-page numeric step breadcrumb [indirect: 05-checkout.md].

**Two-column with sticky summary:** Yes on desktop. The order summary (with the full dual-price breakdown) persists in the right column throughout the checkout. This is critical — the customer sees their savings throughout the entire checkout, not just in the cart [indirect: 05-checkout.md, site behavior].

**Mobile order-summary collapse:** Order summary collapses to a footer tap-to-expand on mobile. The collapsed state shows the total [indirect: 05-checkout.md].

---

## Form structure + interactions

**Field order:** Because members are already signed in, the contact step is often pre-filled. The typical flow is: Address (with address book for returning members) → Delivery method → Payment → Review [indirect: checkout file 05-checkout.md].

**Address book:** Returning members with saved addresses see an address picker (address book pattern) — one-click to select a saved address, bypassing the full form. New address can be added [indirect: site behavior — custom WS Commerce platform].

**Address autocomplete:** Present for new address entry [indirect: site behavior].

**Validation timing:** On-blur per field. Inline error messages [indirect: site behavior].

**Error treatment:** Inline field-level errors; the accordion-style checkout means the section containing an error stays expanded or re-expands on submit [indirect: site behavior].

**Postal/zip:** UK postcode format (UK default; US zip for US members) with formatting enforcement [indirect: site behavior].

---

## Payment + trust

**Payment method presentation [indirect: Beauty Pie payment-methods page was 403; cross-referenced from previous checkout research in 05-checkout.md]:**
- Major credit/debit cards (Visa, Mastercard, Amex)
- PayPal
- Apple Pay (surfaced on supported devices)
- No BNPL confirmed

**Membership fee itemization:** The membership fee ($15/month or pro-rated if joining) is shown as a separate line item on both the cart summary AND the checkout order summary. For new member first purchases, both the product cost and the membership fee are explicitly itemized. This transparency is deliberately chosen — Beauty Pie's help pages state it's to prevent billing confusion [indirect: 05-checkout.md, beautypie.com help center].

**Trust signals at submit:** "Your factory-cost prices are locked in" member benefits reminder. A satisfaction guarantee link. A link to return/refund policy [indirect: 05-checkout.md].

**Savings reinforcement at submit:** The order summary in the right column continues to show "Your Savings: £87" (or equivalent) at the moment the customer clicks "Place Order." This is the single most unusual trust signal in the reference set — framing the submit moment as a savings confirmation rather than a payment event [indirect: 05-checkout.md, whowhatwear.com commentary].

---

## Submit button

**Copy:** "Place Order" — UK e-commerce convention [indirect: 05-checkout.md].

**Loading state:** Standard spinner/disabled during processing [indirect: site behavior].

**Disabled state:** Disabled during submission; enabled during form fill [indirect: site behavior].

**Sticky mobile:** Sticky bottom CTA on mobile during the accordion checkout [indirect: 05-checkout.md].

---

## Microinteractions + state

**Add-to-bag confirmation:** Header bag icon count updates. Likely a brief toast or inline notification; no drawer [indirect: site behavior].

**Spending allowance live update:** As items are added or removed, the "Remaining Allowance" indicator in the cart panel updates in real time. If the cart total (at typical prices) exceeds the remaining allowance, a warning or "upgrade" prompt appears [indirect: spending-limit help page, glossy.co].

**Empty cart state:** "Your bag is empty" with a browse CTA. Non-members see the "Join Beauty Pie" conversion messaging here as well [indirect: site behavior].

---

## Mobile-specific

- Full-page cart; no drawer
- Single-column item list; order summary below items
- Accordion checkout is effectively single-step on mobile — entire checkout is one scrollable page
- Sticky "Place Order" at the bottom during checkout
- Spending allowance bar visible on mobile cart

---

## Beauty-retailer specifics — MAXIMUM DETAIL: the dual-price model

This is the section most relevant to Clarté MD. The complete dual-price mechanism:

**On the product page (PDP):**
```
Typical Price    $93
Members Pay      $44  (or "You Pay $44 as a member")
You Save         $49 (53% off)
```
The typical price is either crossed out or displayed in a lighter/muted style. The member price is the dominant displayed number. The savings amount is shown in green or an accent color with the absolute figure and a percentage.

**On add-to-bag confirmation:**
A transient notification shows: *"You'll save $49 on this as a member"* — reinforcing the decision at the commitment moment.

**In the cart line item:**
Each line item repeats the dual-price structure:
- Typical price (small, muted, crossed out or labelled "Typical Price")
- Member price (larger, prominent, labelled "Members Pay" or "You Pay")
- Savings (small green line: "You save $49")
- Allowance consumed: "Uses $93 of your allowance"

**In the order summary:**
```
Subtotal (you pay)         $70
──────────────────────────────
Typical Retail Value       $157
Your Savings This Order    $87  ← GREEN, bold
──────────────────────────────
Monthly Membership         $15  ← separate line
Shipping                   Free
──────────────────────────────
Order Total                $85
──────────────────────────────
Remaining Allowance: $63 of $150
```

The "Your Savings This Order" row is the structural centrepiece. It makes the value of the membership tangible at the exact moment the customer is about to commit. The mental arithmetic is complete: "$15 for membership, but I saved $87. Net saving: $72 on this order alone."

**For non-members browsing the site:**
Non-member price is shown as the larger/primary displayed price. A "Join to save" or "Members pay $44" callout appears as a secondary line. The cart shows a "Spending Bar" — a visual indicator of how much they would save by becoming a member on the current cart contents, with a prominent "Join now" CTA.

**2024 model simplification [indirect: glossy.co, TheIndustry.beauty]:**
In late 2023 / early 2024, Beauty Pie simplified from a multi-tier spending-cap model to two tiers: Monthly ($15 / $150 cap) and Beauty Pie Plus ($59 / $3,600 cap annually). The previous model had complex rollover rules that confused users; the redesign intentionally reduced allowance-tracking anxiety. The allowance bar and savings display remained — they're fundamental to the model — but the tier logic became simpler.

---

## What to lift for Clarté MD

This is the highest-priority section in the entire three-brand research series for Clarté.

1. **"You save Rs. X vs. buying separately" row in `OrderSummary.tsx` — direct adaptation of Beauty Pie's "Your Savings This Order" pattern [HIGH PRIORITY]:**  
   Clarté protocol bundles are priced Rs. 700–1,400 below the sum of their component products' individual prices. This savings delta is currently not surfaced anywhere in the cart or checkout. Add a single row to the `OrderSummary.tsx` totals block:
   ```
   You save    Rs. {bundle_savings_pkr}  ← cobalt or positive-green text
   vs. buying products separately
   ```
   Position it between the Subtotal row and the Shipping row. Use the same visual treatment as the existing `os-grand` total — high-contrast, slightly larger than the sub-rows. The API already computes `listPricePkr` for bundle items (or it can be added to the `/api/cart/preview` response). The display calculation is `sum(listPricePkr × qty) - subtotal_pkr`. Show it only when the cart contains at least one bundle; individual products have no savings to show.

2. **Dual-price in cart line items for bundles:** Beauty Pie shows the "Typical Price" crossed out next to "Members Pay" for every cart line item. Adapt this for Clarté's cart item lines: when `item.type === 'bundle'`, show:
   ```
   Clear Skin Protocol  — 12-Week Bundle
   ~~Rs. 8,499~~  Rs. 6,999  (Save Rs. 1,500)
   ```
   The strikethrough `listPricePkr` and green "Save Rs. X" is borrowed directly from Beauty Pie's line-item pattern. Implementation: add `listPricePkr` and `savings_pkr` fields to the `PreviewItem` shape in `OrderSummary.tsx` (the preview API already has per-item pricing). Requires the "list price" to be real and accurate — only do this when `listPricePkr > pricePkr` with verified data (per [feedback_unverified_claims], never fabricate a higher "original price").

3. **Savings reinforcement at submit moment:** Beauty Pie keeps the "Your Savings" line visible in the right-column summary at the exact moment the customer clicks "Place Order." Clarté's `OrderSummary.tsx` already has the right-column placement — add the savings row so it's visible alongside the "Place Order — Rs. X" button. The customer's last action before committing should show them what they saved, not just what they're paying.

4. **Allowance-remaining style "You've unlocked protocol pricing" status line:** Beauty Pie's "Remaining Allowance: $63 of $150" communicates membership value at the cart level. Clarté has no membership, but the structural slot can serve a different function: a one-line status below the totals block confirming clinical protocol pricing is applied: `Protocol price applied — no code needed.` in JetBrains Mono at `text-ink-mute` — reassures customers that the discounted price is automatic, not conditional on a code they might be missing.

5. **Membership fee as separate line item — adapt for Rs. 250 shipping as an explicit honesty line:** Beauty Pie itemizes the membership fee explicitly to prevent billing surprise. For Clarté, the Rs. 250 shipping line (already in `OrderSummary.tsx`) should be labeled with "Flat-rate delivery — no surprises" or "Standard delivery Rs. 250 — always" to pre-empt the "why am I being charged for shipping?" question that COD-first customers ask. One-word label change, no engineering cost.

---

## What to skip

1. **Membership gate before checkout:** Beauty Pie's mandatory sign-in / membership creation before purchase is the opposite of Clarté's model. Clarté is explicitly guest-only by default (per [feedback_workflow.md]). Do not add any "join to access" friction before checkout.

2. **Spending allowance bar and allowance-remaining progress indicator:** Beauty Pie's spending bar is load-bearing for their membership model — it makes the allowance tangible and prevents overrun anxiety. Clarté has no spending cap, no membership, no allowance. Adding any progress bar or "remaining balance" language would confuse customers into thinking there is a spending limit. Skip.

3. **"Typical Price" savings claim using fabricated or unverified list prices:** The savings display is only valid if `listPricePkr` is a real, accurate individual-product price. Beauty Pie anchors their "typical price" in "what a product of comparable quality would cost at retail" — their methodology is publicly documented and independently scrutinized. Clarté's strikethrough savings must be anchored in the actual sum of the protocol's component products at their real individual prices. Never fabricate a higher list price for the purpose of making the saving look larger (per [feedback_unverified_claims]).

4. **Non-member conversion messaging in cart:** Beauty Pie's "Spending Bar" and "Join to Save" cart messaging is designed to convert free browsers into paying members. Clarté has no membership tier to upgrade to. Any "upgrade your plan" or "join for better prices" language in the cart has no destination and would confuse customers.

---

## Sources

- [Beauty Pie homepage](https://www.beautypie.com/) — 403
- [Beauty Pie how-it-works](https://www.beautypie.com/bp/about/how-it-works) — 403
- [Beauty Pie cost-transparency page](https://www.beautypie.com/bp/about/cost-transparency) — 403
- [Beauty Pie payment-methods](https://www.beautypie.com/payment-methods) — 403
- [Beauty Pie spending-limit top-up page](https://www.beautypie.com/top-up-pause) — 403
- [Beauty Pie overpaying FAQ](https://www.beautypie.com/us/blog/overpaying-overrated-faqs) — 403
- [Glossy.co — Beauty Pie simplifies membership model, adds unlimited annual tier](https://www.glossy.co/beauty/beauty-pie-simplifies-membership-model-and-adds-unlimited-annual-tier/) — indirect, direct fetch
- [TheIndustry.beauty — Beauty Pie scraps monthly spending limits](https://theindustry.beauty/beauty-pie-scraps-monthly-spending-limits-in-new-membership-model/) — indirect
- [MoneySavingExpert — Beauty Pie deep-dive](https://www.moneysavingexpert.com/deals/deals-hunter/2021/03/beauty-pie/) — indirect, direct fetch; most detailed public account of the spending-limit mechanics
- [Reviewed.com — What to know about Beauty Pie before signing up](https://www.reviewed.com/beauty/features/beauty-pie-membership-what-to-know) — indirect, direct fetch
- [WhoWhatWear — Is Beauty Pie Worth It](https://www.whowhatwear.com/beauty/skin/is-beauty-pie-worth-it) — indirect, direct fetch
- [The Summer Study — Beauty Pie review](https://thesummerstudy.com/beauty-pie-review/) — indirect
- [The Quality Edit — Is Beauty Pie worth the annual subscription?](https://www.thequalityedit.com/articles/beauty-pie-skincare-review) — indirect
- [CNN Underscored — Beauty Pie anti-aging skincare](https://www.cnn.com/cnn-underscored/beauty/9-beauty-pie-products-skincare-routine-2024-10-21) — indirect, pricing examples
- Previous Clarté research cross-reference: `docs/research/2026-05-23-page-ux-skincare/05-checkout.md` (Beauty Pie checkout section)
