'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, MessageCircle, PackageSearch } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrustStrip } from '@/components/marketing/TrustStrip';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { cn } from '@/lib/utils';

export default function OrderLookupPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = orderNumber.trim().toUpperCase();
    const ph = phone.replace(/\D/g, '').slice(-4);
    router.push(`/order/${encodeURIComponent(num)}?phone=${encodeURIComponent(ph)}`);
  }

  return (
    <div className="bg-canvas pb-20">
      {/* Hero */}
      <header className="border-b border-rule bg-canvas-soft">
        <div className="mx-auto max-w-[60rem] px-6 pt-14 pb-10 md:pt-20 md:pb-14">
          <Reveal>
            <Eyebrow className="mb-3 inline-flex items-center gap-2 text-cobalt">
              <PackageSearch className="h-3.5 w-3.5" />
              Track your order
            </Eyebrow>
          </Reveal>
          <Reveal>
            <h1 className="font-display font-light text-navy text-[clamp(32px,5vw,56px)] leading-[1.02] tracking-[-0.025em]">
              Where is your <em className="italic">order?</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-3 max-w-[40rem] font-display italic text-[clamp(15px,1.6vw,19px)] leading-relaxed text-ink-mute">
              Enter your order number and the last 4 digits of the phone you used at checkout.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Form */}
      <div className="mx-auto max-w-[42rem] px-6 pt-10 md:pt-14">
        <RevealGroup stagger={0.08}>
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-rule bg-card p-5 shadow-[0_24px_60px_-32px_rgba(14,31,58,0.25)] md:p-7"
            >
              <label className="mb-5 block">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  Order number
                </span>
                <Input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="CLM-2026-XXXX"
                  required
                  autoFocus
                  className={cn(
                    'h-14 font-mono text-[16px] tracking-[0.05em]',
                  )}
                />
              </label>
              <label className="mb-2 block">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  Last 4 digits of your phone
                </span>
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="XXXX"
                  required
                  className="h-14 text-center font-mono text-lg tracking-[0.5em]"
                />
              </label>
              <Button type="submit" size="lg" className="mt-5 h-14 w-full text-[15px]">
                Look up my order →
              </Button>
            </form>
          </Reveal>

          {/* WhatsApp escape hatch */}
          <Reveal>
            <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
              <MessageCircle className="h-3.5 w-3.5 text-cobalt" />
              Can't find your order number? Check the email/SMS we sent after checkout, or{' '}
              <a
                href="https://wa.me/923249986822"
                className="font-semibold text-cobalt hover:underline"
              >
                WhatsApp our team
              </a>
              .
            </p>
          </Reveal>
        </RevealGroup>
      </div>

      {/* Trust band */}
      <section className="mx-auto max-w-[60rem] px-6 pt-14 md:pt-20">
        <Reveal>
          <div className="mb-5 inline-flex items-center gap-2">
            <Eyebrow className="text-cobalt">— Every order, every time</Eyebrow>
          </div>
        </Reveal>
        <Reveal>
          <TrustStrip variant="cards" tone="light" limit={6} />
        </Reveal>
      </section>

      {/* Help card */}
      <section className="mx-auto mt-12 max-w-[60rem] px-6">
        <Reveal>
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-cobalt/25 bg-cobalt/5 p-5 sm:flex-row sm:items-center md:p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cobalt text-white">
              <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-[16px] font-medium text-navy md:text-[18px]">
                Still stuck?
              </h2>
              <p className="mt-1 font-body text-[13.5px] leading-relaxed text-ink-2">
                A real person from our team replies on WhatsApp — usually within 2 hours, Mon–Sat.
              </p>
            </div>
            <a
              href="https://wa.me/923249986822"
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-emerald-600 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-emerald-700"
            >
              WhatsApp our team
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
