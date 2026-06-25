/**
 * Shared, framework-agnostic lead-capture gate.
 *
 * Renders a hard-gate overlay (name / email / phone) IN FRONT OF an AI scan
 * result and resolves only once the lead is submitted. Used by both the React
 * quiz (`components/quiz/QuizFlow.tsx`) and the four vanilla-DOM protocol
 * projection generators (`app/(protocols)/<slug>/client.tsx`), so there is one
 * implementation and identical behaviour everywhere.
 *
 * Design notes:
 *  - Self-contained: builds its own overlay appended to <body>, injects its own
 *    scoped stylesheet once (class prefix `clg-`), and removes everything on
 *    close. It never touches existing page DOM, so it cannot disturb the scan
 *    UI it sits in front of.
 *  - Hard gate: no close button, no backdrop dismiss, Escape does nothing —
 *    the only way out is a successful submit.
 *  - Fail-open safety: a real customer is never trapped. If the submit REQUEST
 *    itself fails (e.g. offline) twice, the gate resolves anyway so results
 *    still reveal. (The API returns ok even when the downstream GHL webhook is
 *    down, so this path is only hit on genuine network failure.)
 *  - SSR-safe: no `document`/`window` access at module load — only inside
 *    `openLeadGate`, which runs from a browser event handler.
 */

export type LeadSurface = 'quiz' | 'acne' | 'barrier' | 'even-tone' | 'renewal';

export interface LeadGateContext {
  surface: LeadSurface;
  concern?: string;
  ai_session_id?: string;
  /**
   * The AI scan's detected-issues object (the on-screen "skin map"). Forwarded
   * verbatim to /api/lead, which flattens it into per-issue GHL webhook fields.
   * Optional — the quiz and the mock path have no map.
   */
  skin_map?: unknown;
}

const STYLE_ID = 'clg-styles';
const OVERLAY_ID = 'clg-overlay';

/** What the user is about to see — tunes the copy per surface. */
function resultNoun(surface: LeadSurface): string {
  return surface === 'quiz' ? 'personalised skin analysis' : '12-week projection';
}

function injectStylesOnce() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .clg-overlay{position:fixed;inset:0;z-index:2147483600;display:flex;
      align-items:center;justify-content:center;padding:20px;
      background:rgba(8,21,42,.72);backdrop-filter:blur(6px);
      -webkit-backdrop-filter:blur(6px);
      font-family:'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif;
      animation:clg-fade .22s ease both;}
    @keyframes clg-fade{from{opacity:0}to{opacity:1}}
    @keyframes clg-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
    .clg-card{width:100%;max-width:420px;background:#fff;border-radius:20px;
      padding:30px 28px;box-shadow:0 24px 70px rgba(8,21,42,.4);
      animation:clg-rise .28s cubic-bezier(.2,.7,.3,1) both;}
    .clg-eyebrow{font-family:'JetBrains Mono',ui-monospace,monospace;
      font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;
      color:#2f6df6;margin:0 0 10px;}
    .clg-title{font-size:24px;line-height:1.12;letter-spacing:-.02em;
      color:#0c1b33;margin:0 0 8px;font-weight:600;}
    .clg-sub{font-size:14px;line-height:1.5;color:#5b6b82;margin:0 0 20px;}
    .clg-field{display:block;margin-bottom:13px;}
    .clg-label{display:block;font-size:11px;letter-spacing:.04em;
      text-transform:uppercase;color:#5b6b82;margin-bottom:6px;font-weight:600;}
    .clg-input{width:100%;box-sizing:border-box;height:46px;padding:0 14px;
      font-size:15px;color:#0c1b33;background:#f7f9fc;border:1px solid #dfe6f0;
      border-radius:11px;outline:none;transition:border-color .15s,box-shadow .15s;}
    .clg-input:focus{border-color:#2f6df6;box-shadow:0 0 0 3px rgba(47,109,246,.16);background:#fff;}
    .clg-input.clg-invalid{border-color:#e0444f;box-shadow:0 0 0 3px rgba(224,68,79,.14);}
    .clg-error{min-height:16px;font-size:12.5px;color:#e0444f;margin:2px 0 12px;}
    .clg-btn{width:100%;height:50px;border:none;border-radius:12px;cursor:pointer;
      background:#2f6df6;color:#fff;font-size:15px;font-weight:600;
      letter-spacing:.01em;transition:background .15s,opacity .15s;}
    .clg-btn:hover{background:#245ad6;}
    .clg-btn:disabled{opacity:.6;cursor:wait;}
    .clg-fine{font-size:11.5px;line-height:1.45;color:#8a98ac;margin:14px 0 0;text-align:center;}
    @media (prefers-reduced-motion:reduce){
      .clg-overlay,.clg-card{animation:none;}
    }
  `;
  document.head.appendChild(style);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+\-]{7,32}$/;

export function openLeadGate(ctx: LeadGateContext): Promise<void> {
  // SSR / non-browser guard.
  if (typeof document === 'undefined') return Promise.resolve();
  // Never stack two gates.
  if (document.getElementById(OVERLAY_ID)) return Promise.resolve();

  injectStylesOnce();

  return new Promise<void>((resolve) => {
    const prevOverflow = document.body.style.overflow;
    let networkFailures = 0;

    const overlay = document.createElement('div');
    overlay.className = 'clg-overlay';
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Reveal your results');

    overlay.innerHTML = `
      <div class="clg-card" role="document">
        <p class="clg-eyebrow">— Your ${resultNoun(ctx.surface)} is ready</p>
        <h2 class="clg-title">See your results</h2>
        <p class="clg-sub">Enter your details and we'll reveal your ${resultNoun(
          ctx.surface,
        )} — and send a copy so you don't lose it.</p>
        <form novalidate>
          <label class="clg-field">
            <span class="clg-label">Full name</span>
            <input class="clg-input" name="name" type="text" autocomplete="name" placeholder="Your name" />
          </label>
          <label class="clg-field">
            <span class="clg-label">Email</span>
            <input class="clg-input" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com" />
          </label>
          <label class="clg-field">
            <span class="clg-label">Phone</span>
            <input class="clg-input" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="03xx xxxxxxx" />
          </label>
          <p class="clg-error" data-clg-error aria-live="polite"></p>
          <button class="clg-btn" type="submit">Reveal my results →</button>
        </form>
        <p class="clg-fine">We use this only to send your results and skincare guidance. No spam.</p>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const form = overlay.querySelector('form') as HTMLFormElement;
    const nameEl = overlay.querySelector('input[name=name]') as HTMLInputElement;
    const emailEl = overlay.querySelector('input[name=email]') as HTMLInputElement;
    const phoneEl = overlay.querySelector('input[name=phone]') as HTMLInputElement;
    const errEl = overlay.querySelector('[data-clg-error]') as HTMLParagraphElement;
    const btn = overlay.querySelector('.clg-btn') as HTMLButtonElement;

    setTimeout(() => nameEl.focus(), 60);

    function cleanup() {
      document.body.style.overflow = prevOverflow;
      overlay.remove();
    }

    function showError(msg: string, field?: HTMLInputElement) {
      errEl.textContent = msg;
      [nameEl, emailEl, phoneEl].forEach((el) => el.classList.remove('clg-invalid'));
      if (field) {
        field.classList.add('clg-invalid');
        field.focus();
      }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const phone = phoneEl.value.trim();

      if (!name) return showError('Please enter your name.', nameEl);
      if (!EMAIL_RE.test(email)) return showError('Please enter a valid email.', emailEl);
      if (!PHONE_RE.test(phone)) return showError('Please enter a valid phone number.', phoneEl);

      showError('');
      btn.disabled = true;
      btn.textContent = 'Revealing…';

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            surface: ctx.surface,
            concern: ctx.concern,
            ai_session_id: ctx.ai_session_id,
            skin_map: ctx.skin_map,
          }),
        });
        if (res.ok) {
          cleanup();
          resolve();
          return;
        }
        // 400 from the validator — surface a generic message and let them fix.
        btn.disabled = false;
        btn.textContent = 'Reveal my results →';
        showError('Please double-check your details and try again.');
      } catch {
        // Genuine network failure. Don't trap a real customer: prompt once,
        // then fail open on the next attempt so results still reveal.
        networkFailures += 1;
        if (networkFailures >= 2) {
          cleanup();
          resolve();
          return;
        }
        btn.disabled = false;
        btn.textContent = 'Try again →';
        showError("Couldn't connect. Check your connection and tap again.");
      }
    });
  });
}
