# Automation Webhooks Runbook — Sub-project #3

> **For:** the operator wiring SMS / email / WhatsApp / CRM automations into the Clarté MD backend.
> **Goal:** route every order lifecycle event into your downstream tools (Zapier / Make.com / n8n / direct provider APIs).

## The 6 events

| Env var | Fires when | Operator use case |
|---|---|---|
| `WEBHOOK_ORDER_CREATED` | New order placed (POST /api/create-order returned 200) | Send "we got your order" SMS + email; push lead to CRM; ping ops WhatsApp |
| `WEBHOOK_ORDER_CONFIRMED` | Admin marked order `confirmed` | "We've confirmed your order" SMS + email |
| `WEBHOOK_ORDER_DISPATCHED` | Admin marked order `dispatched` | "On the way + tracking link" SMS + email + WhatsApp |
| `WEBHOOK_ORDER_DELIVERED` | Admin marked order `delivered` | Review request SMS + email; follow-up consult invite WhatsApp |
| `WEBHOOK_ORDER_CANCELLED` | Admin marked order `cancelled` | Cancellation notice |
| `WEBHOOK_ORDER_REFUNDED` | Admin marked order `refunded` | Refund-processed notice |

Each fires exactly once per transition. Clicking the same status button twice does not re-fire (no-op transitions are detected).

## Behavior on failure

- 3-second timeout per webhook. The customer's order POST is never blocked longer than that.
- Blank env var → silent skip. No webhook configured for that event.
- Non-2xx response or timeout → logged to Vercel runtime logs, **never thrown**. Order flow always completes.
- No retries in the Clarté backend. **Zapier and similar tools have their own retry on the receiving side** — usually 3 attempts with exponential backoff. That covers 99% of transient failures.

If you need stronger delivery guarantees (e.g. payment notifications), wire those events to a queue-backed provider (n8n self-hosted, Inngest, Trigger.dev) instead of Zapier.

## Payload shape — `order.created`

```json
{
  "event": "order.created",
  "timestamp": "2026-05-17T13:24:11.000Z",
  "order": {
    "id": "uuid-here",
    "order_number": "CLM-2026-0005",
    "status": "pending",
    "concern": "acne",
    "source_page": "acne-protocol",
    "customer": {
      "name": "Ayesha K.",
      "phone": "03001234567",
      "email": "ayesha@example.com"
    },
    "shipping": {
      "address": "House 1, Street 1, Gulberg",
      "city": "Lahore",
      "postal": "54000",
      "notes": null
    },
    "payment_method": "COD",
    "payment_status": "pending",
    "items": [
      {
        "sku": "clear-skin-protocol",
        "name": "The Clear Skin Protocol · 4-product kit",
        "qty": 1,
        "unit_price_pkr": 6499,
        "is_bundle": true
      }
    ],
    "totals": {
      "subtotal_pkr": 6499,
      "shipping_pkr": 0,
      "total_pkr": 6499
    },
    "used_ai_preview": true,
    "ai_session_id": "uuid-here-or-null",
    "created_at": "2026-05-17T13:24:11.000Z",
    "admin_link": "https://lp.clartemd.com.pk/admin/orders/uuid-here"
  }
}
```

## Payload shape — status-change events (5 of them)

Same as above, with one addition: `order.previous_status`. Example for `order.dispatched`:

```json
{
  "event": "order.dispatched",
  "timestamp": "...",
  "order": {
    "id": "...",
    "order_number": "CLM-2026-0005",
    "status": "dispatched",
    "previous_status": "confirmed",
    ... rest identical ...
  }
}
```

## Setting up a Zapier flow (concrete walkthrough)

**Goal:** when a new order arrives, send the customer an SMS via Twilio + add them to your GoHighLevel pipeline + alert your ops Slack.

1. **Zapier → New Zap → Webhooks by Zapier → Catch Hook**
   - Zapier gives you a URL like `https://hooks.zapier.com/hooks/catch/12345/abcde/`
   - Copy that URL.

2. **Vercel → Project Settings → Environment Variables**
   - Add `WEBHOOK_ORDER_CREATED` = (the URL from step 1)
   - Environment: Production (also Preview if you want preview deploys to trigger Zaps; usually no)
   - Click Save → trigger a redeploy (or push any commit)

3. **Send a test event from your laptop:**
   ```powershell
   npx tsx --env-file=.env.local scripts/test-webhooks.ts
   ```
   (after also setting WEBHOOK_ORDER_CREATED locally in your `.env.local`)
   In Zapier, the Catch Hook step now shows the sample payload — Zapier uses this for field mapping in subsequent steps.

4. **Add a Zap step: Twilio → Send SMS**
   - To: `{{order__customer__phone}}` (pulled from the payload)
   - Body: `Hi {{order__customer__name}}, your Clarté MD order {{order__order_number}} (Rs {{order__totals__total_pkr}}) is confirmed. Track at {{order__admin_link}}`

5. **Add a Zap step: GoHighLevel → Create Opportunity / Contact**
   - Pipeline: Acne intake (or whichever you set up)
   - Name: `{{order__customer__name}}`
   - Phone: `{{order__customer__phone}}`
   - Email: `{{order__customer__email}}`
   - Tags: `clartemd, {{order__concern}}, order-{{order__order_number}}`

6. **Add a Zap step: Slack → Send Channel Message**
   - Channel: `#orders`
   - Message: `New order {{order__order_number}} · Rs {{order__totals__total_pkr}} · {{order__customer__name}} ({{order__shipping__city}}) → {{order__admin_link}}`

7. **Test the Zap end-to-end** with `scripts/test-webhooks.ts` — confirm SMS lands, GHL contact appears, Slack pings.

8. **Turn the Zap on.** Done.

Repeat for the other 5 events with different downstream steps.

## Pro tip: one Zap per event, fan-out inside

Don't create separate Zaps for "SMS the customer" and "ping Slack" — they'll be triggered by the same event and become hard to keep in sync. One Zap per event, multiple action steps inside that Zap. Easier to debug.

## Pro tip: use Zapier's "Filter" step for conditional logic

Example: only send a courier tracking SMS if the order is going to a non-Lahore city (Lahore orders are same-day delivery and don't need tracking). Add a Filter step after the trigger: `Continue if order__shipping__city is not "Lahore"`.

## Verifying webhooks fired in production

In Vercel project → Logs (Runtime Logs tab):

- Search: `webhook[`
- Look for `webhook[order.created] ok status=200 url=https://hooks.zapier.com/...`
- Failures show as `webhook[order.created] failed status=4xx ...` or `webhook[order.created] failed reason=timeout ...`

URLs are redacted in logs (only the prefix is shown) so Zapier hook codes don't leak.

## Operator checklist (when you're ready to wire automation)

- [ ] Create Zapier (or Make.com / n8n) account
- [ ] For each of the 6 events you want to automate, create a "Catch Hook" Zap and grab its URL
- [ ] Add those URLs to Vercel project env vars (one per event, prefix `WEBHOOK_ORDER_`)
- [ ] Trigger a redeploy (push any commit, or click Redeploy in Vercel)
- [ ] Place a test order via the live site to confirm `order.created` fires
- [ ] In `/admin/orders/[id]`, click through `confirmed → dispatched → delivered` and confirm each fires its Zap
- [ ] Run `npx tsx --env-file=.env.local scripts/test-webhooks.ts` locally with your URLs in `.env.local` to verify all 6 endpoints respond
- [ ] Turn the Zaps on (they default to OFF after creation)
- [ ] Monitor Vercel runtime logs for the first 24 hrs after enabling — look for `webhook[*] failed`

## When to revisit

- **First customer SMS bounces** → fix the phone-format normalization in your Zap (PK numbers come in as `03XXXXXXXXX`, Twilio wants `+923XXXXXXXXX`)
- **Email goes to spam** → set up Resend / Postmark / SendGrid with your own domain (`mail.clartemd.com.pk`) and SPF/DKIM/DMARC
- **Volume hits 100+ orders/day** → consider replacing Zapier with self-hosted n8n or Make.com (cheaper at scale)
- **You add wallet payments** (sub-project #4) → extend the payload schema with `payment_received` and `payment_failed` events; same dispatcher

## Files reference

| Path | What |
|---|---|
| `lib/webhooks/dispatcher.ts` | `dispatchWebhook(url, payload, label)` — POST with timeout + logging |
| `lib/webhooks/payloads.ts` | `buildOrderEventPayload(args)` + status↔event lookups |
| `lib/webhooks/types.ts` | `OrderEvent` union + `OrderEventPayload` shape |
| `app/api/create-order/route.ts` | Fires `order.created` after successful insert |
| `app/api/admin/orders/[id]/route.ts` | Fires status-change events on PATCH |
| `scripts/test-webhooks.ts` | Live-fire test against `.env.local` config |
