# Cart UX — cross-brand teardown

## How to read this

Live cart drawers are JS-rendered behind add-to-cart, and most brands below block raw HTML fetches once you cross product → cart. Where I couldn't reach the populated cart via `WebFetch`, I sourced from: (a) the empty-cart HTML (still leaks structure + copy strings), (b) shipping / promo / FAQ pages, (c) Vervaunt / Baymard / Rebuy / Awwwards teardowns, (d) shopper screenshots. Anything not a direct fetch is flagged inline as **[indirect]**.

The goal is not to inventory pixels — it's to land the few patterns Clarté's `/cart` (full-page) and a possible new cart drawer (shadcn `Sheet`, already in the Header) should adopt or reject, given:

- **Pakistan-first, COD-only.** No Shop Pay / Apple Pay / Klarna. No subscribe-and-save. Express-checkout buttons we can't fulfil = active harm.
- **Flat Rs. 250 shipping, no free-shipping threshold** (per `feedback_unverified_claims`). Every "you're $X away from free shipping" pattern below is OFF LIMITS.
- **Anonymized doctor + no fake "open before paying"** (per `feedback_anonymize_doctor`, `feedback_cod_policy`).

Clarté's current `/cart` baseline: full-page, two-col on desktop (`grid-cols-[1fr_23.75rem]`), custom +/− stepper for products, fixed ×1 for bundles, "Remove" text link, OrderSummary panel, single "Proceed to checkout →" CTA. No drawer. No samples. No promo input. No upsell.

## Per-brand observations

### 1. Glossier
**URL:** https://www.glossier.com — cart at /cart + drawer on add
**Drawer or page?** Both. Right-side drawer ("Toggle Bag" / "Close cart drawer" in DOM) **[direct]**; `/cart` is full-page fallback.
**Trigger UX:** Top-right header link `Bag (0)` — the word "Bag" + parenthetical count, no icon. Count updates inline on add.
**Drawer direction / width:** Right edge, ~400–440px desktop (Shopify standard). Mobile = full-screen overlay + scroll lock **[indirect: Vervaunt + Awwwards]**.
**Empty state:** "Your bag is empty, but you still look good" + link to /collections/all **[direct]**.
**Item line:** Image left; name + variant + price right; stepper; remove.
**Qty stepper:** −/+ with central count; reduces-to-0 removes the item.
**Upsell pattern:** Free-gift slot ("Your free gift") appears inline when threshold crosses. No cross-sell carousel in the drawer.
**Free-sample picker:** **No** — gifts auto-add at threshold ("Get Lip Glaze on us with any qualifying order") **[direct: homepage]**.
**Promo input:** Not in the drawer; entered at checkout.
**Free-shipping bar:** Yes, region-aware — US $40+, CA $60+, EU €65+, AU $110+. Templated `{{threshold_with_currency}}` so one UI ships globally.
**Subtotal / tax:** Subtotal + savings + estimated tax + estimated total. "Sales tax shown in checkout is a best estimate" — honest framing.
**Checkout CTA:** Single "Checkout" primary; Shop Pay / Apple Pay / PayPal express below **[indirect]**.
**Distinctive element:** **Text-label "Bag (n)" trigger instead of icon** — brand voice in the chrome. Empty-state copy ("but you still look good") is on-brand, not generic.

### 2. Drunk Elephant
**URL:** https://www.drunkelephant.com — cart at /cart + drawer on add
**Drawer or page?** Right-side drawer + `/cart` fallback **[indirect: Shopify Plus]**.
**Trigger UX:** Top-right bag icon with badge. DOM aria-label "Quantity of items in cart is , 0" — screen-reader-announced **[direct]**.
**Empty state:** "Your bag is empty" + Continue Shopping.
**Item line:** Image, name, variant, qty, line price, remove.
**Qty stepper:** Standard −/+.
**Upsell pattern:** **Multi-tier free-gift unlock** is the cart hero. Tiers at snapshot: $65/$95/$125 → 1/2/3 deluxe sample duos (up to 6); $100+ → "Hydra and the Bright" kit; $175+ → kit + full-size F-Balm **[direct + Coupons.com terms]**. Progress bar climbs through tiers; each tier is a card.
**Free-sample picker:** **Partial** — $65/$95/$125 sample-duo tiers are customer-picked (pairs grid); $100/$175 gifts auto-add.
**Promo input:** Collapsed "Have a code?" expands at cart.
**Free-shipping bar:** Yes — "$40+ for free shipping" top-of-drawer strip.
**Checkout CTA:** "Checkout" + Shop Pay / PayPal / Apple Pay.
**Distinctive element:** **Tiered sample-picker with inline grid selectors at each unlock.** Most aggressive AOV play of the eight; each tier card flips into a 2/3/n sample-selector when crossed.

### 3. Tatcha
**URL:** https://www.tatcha.com — cart at /cart + drawer on add
**Drawer or page?** Both. Right-side mini-drawer, ~380–420px desktop **[indirect]**.
**Trigger UX:** Top-right bag icon + "(0 items)" inline counter **[direct]**.
**Empty state:** "Your bag is empty" + "Continue shopping" + **two trust lines under the CTA**: "Complimentary shipping and returns on U.S. orders" and "Complimentary samples with every order" **[direct]**. Trust lines are load-bearing — they make empty still feel premium.
**Item line:** Image, italic-serif name, size variant, price, stepper, × remove. Generous whitespace.
**Qty stepper:** Standard −/+; removes at 0.
**Upsell pattern:** Drawer stays sparse — "Curate your own set" cross-sell lives near but not in the cart.
**Free-sample picker:** **None in the cart.** Samples are warehouse-curated. A separate `/create-a-set.html` tool lets you pick 3 minis pre-purchase + complimentary pouch unlock **[indirect]**.
**Promo input:** Collapsed link; expand on click.
**Free-shipping bar:** **No bar** — $0 threshold (free on all US orders), just static "Complimentary shipping". Mirrors a "no threshold" world Clarté can lean on.
**Checkout CTA:** Single "Checkout" in serif type; express buttons present.
**Distinctive element:** **Static trust block — "Complimentary samples with every order" — next to the checkout button.** PK-translatable: *"Complimentary doctor's note + skin-log printable with every order"*.

### 4. Lush
**URL:** https://www.lush.com/uk — cart 403 to bot UAs; sourced from FAQ + community
**Drawer or page?** **Full-page only** — Lush resists the drawer, sticking with a full list so customers can audit and add notes **[indirect: Lush help, lushcosmetics LJ]**.
**Trigger UX:** Top-right basket icon + count ("Basket" UK, "Bag" US).
**Empty state:** "Your basket is empty" + browse CTA + cruelty-free / handmade trust copy.
**Item line:** **Photo of the *naked* (unpackaged) product** is the brand signature — they don't show packaged SKUs in cart.
**Qty stepper:** −/+ with full integer input on focus (you can type "5" directly).
**Upsell pattern:** Lush does *not* aggressively cross-sell in the cart.
**Free-sample picker:** **Yes — the "one free sample" mechanic.** Free-text notes field OR pick from a list. Customers report mixed fulfilment **[indirect: Quora, LJ, sample FAQ]**. On-brand, operationally loose.
**Promo input:** Visible by default — direct redemption.
**Free-shipping bar:** UK £50+, US $60+ — progress bar top of cart **[indirect]**.
**Checkout CTA:** Single "Checkout" — no Shop Pay / Apple Pay on UK historically.
**Distinctive element:** **Free-text "notes" field at cart** — customers request a sample or add delivery instructions. Operationally fuzzy, conversion-positive because it makes the brand feel human.

### 5. EltaMD
**URL:** https://eltamd.com — cart at /cart + drawer on add
**Drawer or page?** Drawer on add + `/cart` for direct hits **[direct: PDP]**.
**Trigger UX:** Header label `My Cart 0` (text + count, no icon-only) — closer to clinical / B2B than beauty.
**Empty state:** "You don't have any items in your cart" + Continue shopping + **"Select your free gift(s)" CTA persists on empty state** **[direct]**. Most brands hide the gift slot until items exist; EltaMD keeps it up.
**Item line:** Image, name, qty, price, remove. Clinical sans.
**Qty stepper:** −/+.
**Upsell pattern:** Free-gift unlock with progress copy *"Spend more for Free shipping"* → *"Congrats! You qualify for FREE Shipping"*; *"FREE Deluxe Mini UV Restore Tinted when you spend $50+"* **[direct]**. Subscribe & Save offered too.
**Free-sample picker:** "Select your free gift(s)" — curated single-pick at threshold.
**Promo input:** Standard text field.
**Free-shipping bar:** Yes with progress + congrats state.
**Checkout CTA:** Primary "Checkout"; View Cart link inside the drawer.
**Distinctive element:** **FSA/HSA-eligible badge inside the cart** — turns cart from transaction surface into benefits-claim surface. PK analogue: *"Insurance claim receipt available on request"* or a sticker for participating clinics.

### 6. Augustinus Bader
**URL:** https://augustinusbader.com — cart at /us/en/checkout/cart/
**Drawer or page?** Mini-drawer on add + full-page at `/checkout/cart/` (Magento, not Shopify).
**Trigger UX:** "My Bag" link top-right + **a gift-box icon, not a shopping bag** **[direct]**. Extreme luxury cue.
**Empty state:** "You have no items in your bag" + Go shopping + **Help + WhatsApp options surfaced on empty cart** **[direct]**. Converts empty into a contact-us moment.
**Item line:** Clean studio image, italic-serif name, size variant, price in big type. Luxury restraint.
**Qty stepper:** −/+ with dropdown alternative on some pages (Magento default).
**Upsell pattern:** **Auto-add tiered gift sets** — $250 = 8-piece Introduction (first order); $475 = 8-piece mini regimen in AB pouch; $500 = full-size haircare trio **[indirect]**. *No picker, no choice* — "we choose what's best for you".
**Free-sample picker:** None — fully curated.
**Promo input:** Visible "Promo code" field in cart summary.
**Free-shipping bar:** "Complimentary standard shipping on US orders $75+"; header banner + cart progress hint **[direct + indirect]**.
**Checkout CTA:** Single "Proceed to Checkout"; PayPal express below.
**Distinctive element:** **WhatsApp concierge link near the bag.** Highest-leverage steal for Clarté — PK is WhatsApp-first.

### 7. Beauty of Joseon
**URL:** https://beautyofjoseon.com — cart at /cart + drawer on add
**Drawer or page?** Both. Right-side drawer on add; `/cart` is full-page **[direct]**.
**Trigger UX:** Top-right `Cart 0` text link **[direct]**. No icon-only.
**Empty state:** "Your Cart is Empty" + Continue Shopping + Check Out + newsletter tile + hCaptcha badge **[direct]**.
**Item line:** Image, Korean+English name, size, price, qty, remove.
**Qty stepper:** −/+ + **"Update Cart" button required to save changes** (Shopify legacy theme) **[direct]**.
**Upsell pattern:** **Multi-tier free-gift unlock with explicit opt-in.** "Add Flash Sale Item, Get Free Shipping"; $100+ → Revive Eye Serum Mini free; gift tiles 🎁 Revive Firming Moisturizer 1ml and 🎁 Calming Barrier Serum 1ml, each "100% off" with an inline `Add` button.
**Free-sample picker:** **Yes — explicit `Add` button next to each gift tile, customer opts in.** Inventory-limited: "Quantity Limit for This Product has Exceeded" when stock runs out **[direct]**.
**Promo input:** *None on cart* — "Shipping, taxes, and discount codes are calculated at checkout" **[direct]**.
**Free-shipping bar:** Yes, $70+ **[indirect: FAQ]** + flash-sale conditional pathway.
**Checkout CTA:** "Check Out" primary; Shopify express standard.
**Distinctive element:** **Opt-in `Add` button on each gift tile.** Highest-conversion + lowest-pushy variant. This is the model Clarté should ship.

### 8. Charlotte Tilbury
**URL:** https://www.charlottetilbury.com/us — basket at /us/basket
**Drawer or page?** Drawer on add (Add-to-Bag CTAs inline on PLP cards) **[direct: homepage]**; `/basket` is the full-page fallback.
**Trigger UX:** Shopping-bag icon top-right; badge digit JS-rendered on count change **[direct]**.
**Empty state:** Only reachable via 404 at `/cart` (real route is `/basket`). Historical empty copy: "Your basket is empty, beautiful" — signature voice.
**Item line:** Generous image, serif name, shade/variant prominent (makeup brand), qty, price.
**Qty stepper:** Standard.
**Upsell pattern:** **Loyalty-gated gift unlock** — "Loyalty-Exclusive Gift! Unlock A Free Collagen Lip Bath in Pillow Talk Fair When You Spend $115" **[direct: homepage banner]**. Tied to "Charlotte's Members Club".
**Free-sample picker:** No standard picker; loyalty members may see additional tiles.
**Promo input:** Collapsed "Apply a promo code" link.
**Free-shipping bar:** Yes, with **"loyalty coins" gamification overlay** earned per purchase.
**Checkout CTA:** "Checkout" + **Klarna / Afterpay / Zip BNPL options surfaced *in* the basket** (not just at checkout) **[indirect]** — BNPL trust-build at cart edge.
**Distinctive element:** **BNPL math at cart edge ("4 payments of $X interest-free").** Off-limits operationally (no BNPL rail in PK), but the *psychological pattern* — re-framing the total into a smaller anchored number — is repeatable as a *"Rs. X COD on delivery"* reassurance.

## Cross-cutting patterns

1. **Drawer + page coexistence.** All eight have both — drawer on add, full-page route as fallback. None is drawer-only. Clarté's full-page-only is *behind the norm*; adding a `Sheet` drawer (right slide, 400–440px desktop, full-screen mobile) closes the gap without dropping the full page.
2. **Right-side slide is universal.** Zero of the eight slide from left or top.
3. **Free-shipping progress bar everywhere except Tatcha and Augustinus Bader.** Tatcha = $0 threshold; AB = $75+ de-emphasized. **Clarté has no threshold and must not invent one.**
4. **Free-gift / sample picker has three flavours:** *auto-add at threshold* (Glossier, AB — luxury logic, no choice); *picker at threshold* (DE, Tatcha "create a set" — customer picks 2–3 from curated grid); *opt-in `Add` tile* (BoJ, EltaMD, Lush — each gift has its own Add button). The **opt-in tile** is highest-conversion + lowest-pushy. That's what Clarté should ship.
5. **Express-checkout buttons stacked below primary CTA on six of eight** (excludes Lush, AB). Clarté has none of these PK rails — don't show.
6. **Promo input collapsed under "Have a code?"** on five of eight. Visible-by-default on Lush; pushed to checkout on BoJ. Collapsed is default — doesn't seed "you don't have a code" doubt in full-price buyers.
7. **Trust signals at cart are sparse but specific.** Tatcha = complimentary samples + returns; EltaMD = derm-recommended + FSA/HSA; AB = WhatsApp concierge; CT = Klarna math. None shoves generic "256-bit SSL" — each shows *brand-specific* signals matching positioning.
8. **Sticky checkout button on mobile is universal.** Clarté's current `/cart` does not — easy win.

## What's worth stealing for Clarté MD cart

Ordered by impact:

1. **Add a cart drawer via shadcn `Sheet`** (already imported for Header). Slide from right, 400–440px desktop, full-screen mobile. Keep existing `/cart` as fallback (link from drawer footer as "View full cart"). Trigger is the cart icon in Header. Closes the biggest cart-UX gap.
2. **Opt-in "free sample with order" tile** in both drawer + page, modelled on BoJ / Paula's Choice. Single tile under items list, headlined *"Add a complimentary sample"*, 2–3 sample swatches (e.g., the cleanser in the protocol the user hasn't bought) + explicit `Add` button. **Do not auto-add.** Opt-in only — preserves COD trust and avoids the "what's this weird thing in my parcel" CS ticket.
3. **WhatsApp concierge link in cart drawer footer**, modelled on AB's empty-bag CTA. PK is WhatsApp-first; *"Questions before you order? Message us on WhatsApp →"* does the trust work BNPL does for CT. Cheap; high signal.
4. **Sticky checkout CTA on mobile.** Wrap `Proceed to checkout →` in a sticky `bottom-0` footer under 768px. Universal on all eight; missing on Clarté.
5. **"Complimentary doctor's note + skin-log printable with every order" trust line** under checkout button, modelled on Tatcha's complimentary samples line. Concrete, brand-specific, anonymizes the doctor correctly ("our GMC-registered doctor"), turns cart edge into credibility moment without unverified claims. (Verify operational producibility with Faisal first.)
6. **0-removes affordance on the qty stepper** (tap − when qty=1 → remove). Six of eight do this; more forgiving than a separate Remove link. Polish — lower impact than 1–4.

## What to avoid

1. **Free-shipping threshold copy.** Do not lift *"You're Rs. X away from free shipping"* from six of eight. Clarté is flat Rs. 250, no threshold (per `feedback_unverified_claims`). Resist.
2. **Subscribe & Save default-on toggles.** No subscription infrastructure for Clarté; don't show a Sub/Save tile.
3. **Express-checkout button stack (Shop Pay / Apple Pay / PayPal / Klarna / Afterpay / Zip).** None operational in PK. Showing buttons that fail or don't exist on tap is a trust-killer. Single COD "Proceed to checkout →" only.
4. **Auto-add free gifts at threshold.** AB's pattern is luxury-coded; for COD-on-arrival, an auto-added gift will look like an upsell scam at the door. Use opt-in `Add` tile (BoJ pattern) instead.
5. **BNPL math at the cart edge.** No BNPL rail in PK — would advertise a feature that doesn't exist.
6. **Scarcity tactics in the cart** ("only 2 left", countdown timers). None of the eight uses these — actively harm clinical-credibility positioning.

## Sources

- https://www.glossier.com/ (direct) + https://www.glossier.com/cart (direct, empty state)
- https://www.drunkelephant.com/ (direct) + https://www.drunkelephant.com/cart (direct, empty state)
- https://www.tatcha.com/ (direct) + https://www.tatcha.com/cart (direct, empty state) + https://www.tatcha.com/create-a-set.html (indirect)
- https://beautyofjoseon.com/ (direct) + https://beautyofjoseon.com/cart (direct)
- https://eltamd.com/ (direct) + https://eltamd.com/cart (direct, empty state) + https://eltamd.com/products/uv-clear-broad-spectrum-spf-46 (direct, drawer-on-add behavior)
- https://augustinusbader.com/us/en/ (direct) + https://augustinusbader.com/us/en/checkout/cart/ (direct, empty state) + https://augustinusbader.com/us/en/complimentary-8-piece-gift (indirect, auto-add tiers)
- https://www.charlottetilbury.com/us (direct) + https://www.charlottetilbury.com/us/content/pay-with-klarna (indirect, BNPL math)
- https://www.lush.com/uk (403) + https://www.lush.com/us/en_us/faq/sample-program (indirect) + https://uk.lush.com/help/our-delivery-options (indirect)
- https://vervaunt.com/ecommerce-cart-drawers-examples-technologies-ux-best-practices (indirect, drawer-UX best practices)
- https://oxify.app/blog/slide-cart-vs-mini-cart (indirect, slide-vs-mini conversion data)
- https://baymard.com/blog/collections/cart-and-checkout (indirect, Baymard cart studies)
- https://www.rebuyengine.com/blog/cart-flyouts-we-love (indirect, flyout teardowns)
- https://www.awwwards.com/inspiration/glossier-add-to-bag (indirect, Glossier drawer entry)
- Clarté internal: `app/(site)/cart/page.tsx` (current state baseline)
