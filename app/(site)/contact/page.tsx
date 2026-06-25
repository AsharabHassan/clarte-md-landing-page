'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Eyebrow } from '@/components/ui/eyebrow';
import { cn } from '@/lib/utils';
import { pushLeadConversion } from '@/lib/marketing/lead-conversion';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Reusable label style across the form. Sans, ink-mute, snug spacing
// above the input.
const labelClass = 'block text-sm text-ink-mute mb-1.5';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErr(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message'),
          subscribe: fd.get('subscribe') === 'on',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErr(data.error || 'Could not send. Please try again or WhatsApp us.');
        return;
      }
      // Google Ads "Lead — form submit" conversion (GTM generate_lead).
      pushLeadConversion({
        surface: 'contact',
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
      });
      setStatus('success');
    } catch (e: unknown) {
      setStatus('error');
      setErr(e instanceof Error ? e.message : 'Network issue. WhatsApp us instead.');
    }
  }

  return (
    <div className="mx-auto max-w-[64rem] px-6 pt-12 pb-24">
      <header className="mb-14 text-center">
        <Eyebrow className="mb-3.5 text-cobalt">— Get in touch —</Eyebrow>
        <h1 className="font-display font-normal text-navy text-[clamp(32px,4vw,44px)] leading-[1.15]">
          Talk to our team.
        </h1>
        <p className="mx-auto mt-4 max-w-[37.5rem] text-base text-ink-mute leading-relaxed">
          WhatsApp is the fastest. For everything else — questions about your skin, your order,
          our protocols — fill out the form and we&apos;ll reply within a working day.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[20rem_1fr]">
        <aside className="flex flex-col gap-7">
          <div>
            <h3 className="mb-2 font-display text-[15px] font-medium uppercase tracking-[0.08em] text-ink-mute">
              WhatsApp
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-ink-2">
              Usually answered within 2 hours during business hours.
            </p>
            <a
              href="https://wa.me/923249986822"
              target="_blank"
              rel="noopener"
              className={cn(
                'inline-block rounded-md px-4 py-3',
                'bg-[#25d366] text-white hover:bg-[#1aa852]',
                'text-[13px] font-semibold no-underline transition-colors',
              )}
            >
              Message us →
            </a>
          </div>
          <div>
            <h3 className="mb-2 font-display text-[15px] font-medium uppercase tracking-[0.08em] text-ink-mute">
              Email
            </h3>
            <p className="text-sm leading-relaxed text-ink-2">
              <a
                href="mailto:hello@clartemd.com.pk"
                className="font-medium text-cobalt no-underline hover:underline"
              >
                hello@clartemd.com.pk
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-display text-[15px] font-medium uppercase tracking-[0.08em] text-ink-mute">
              Clinic
            </h3>
            <p className="text-sm leading-relaxed text-ink-2">
              Clarté MD
              <br />
              Lahore, Pakistan
            </p>
          </div>
        </aside>

        <form className="rounded-2xl bg-sky p-8" onSubmit={onSubmit}>
          {status === 'success' ? (
            <div className="py-6 text-center">
              <h2 className="mb-3 font-display text-2xl font-normal text-navy">
                Thanks — message received.
              </h2>
              <p className="text-sm text-ink-mute leading-relaxed">
                Our team will reply within a working day. If it&apos;s urgent, message us on
                WhatsApp directly.
              </p>
            </div>
          ) : (
            <>
              <label className="mb-4 block">
                <span className={labelClass}>Your name</span>
                <Input
                  name="name"
                  type="text"
                  required
                  minLength={1}
                  maxLength={128}
                  className="h-11 bg-card text-[15px] text-ink"
                />
              </label>
              <label className="mb-4 block">
                <span className={labelClass}>Email</span>
                <Input
                  name="email"
                  type="email"
                  required
                  maxLength={128}
                  className="h-11 bg-card text-[15px] text-ink"
                />
              </label>
              <label className="mb-4 block">
                <span className={labelClass}>Phone (optional, for callback)</span>
                <Input
                  name="phone"
                  type="tel"
                  maxLength={32}
                  required
                  placeholder="03XXXXXXXXX"
                  className="h-11 bg-card text-[15px] text-ink"
                />
              </label>
              <label className="mb-4 block">
                <span className={labelClass}>Message</span>
                <Textarea
                  name="message"
                  required
                  minLength={5}
                  maxLength={2000}
                  rows={5}
                  className="min-h-[7rem] bg-card text-[15px] text-ink"
                />
              </label>
              <label className="mb-5 flex items-start gap-2.5 text-sm text-ink-mute">
                <input
                  name="subscribe"
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-cobalt"
                />
                <span className="leading-snug">
                  Send me Clarté MD&apos;s monthly newsletter (honest dermatology, no spam).
                </span>
              </label>
              {err && (
                <p
                  role="alert"
                  className="mb-4 rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {err}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={status === 'submitting'}
                className="w-full"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message →'}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
