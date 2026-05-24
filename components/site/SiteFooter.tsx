'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  MessageCircle,
  Banknote,
  Truck,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { Magnetic } from '@/lib/anim/magnetic';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'error';

const COLUMNS: Array<{
  label: string;
  links: Array<{ href: string; text: string }>;
}> = [
  {
    label: 'Protocols',
    links: [
      { href: '/acne', text: 'Clear Skin · Acne' },
      { href: '/even-tone', text: 'Even Tone · Pigmentation' },
      { href: '/renewal', text: 'Renewal · Anti-ageing' },
      { href: '/barrier', text: 'Barrier · Hydration' },
    ],
  },
  {
    label: 'Help',
    links: [
      { href: '/contact', text: 'Contact' },
      { href: '/order', text: 'Track an order' },
      { href: '/legal/returns', text: 'Returns' },
      { href: '/legal/shipping', text: 'Shipping' },
    ],
  },
  {
    label: 'Browse',
    links: [
      { href: '/products', text: 'Catalogue' },
      { href: '/quiz', text: 'Skin quiz' },
      { href: '/about', text: 'About Clarté' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/legal/privacy', text: 'Privacy policy' },
      { href: '/legal/terms', text: 'Terms of service' },
    ],
  },
];

const TRUST_SIGNALS = [
  { icon: Banknote, label: 'Cash on delivery' },
  { icon: Truck, label: 'Nationwide shipping' },
  { icon: RotateCcw, label: '30-day returns' },
  { icon: MapPin, label: 'Made in Pakistan' },
];

export function SiteFooter() {
  const reduced = !!useReducedMotion();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email.');
      return;
    }
    setStatus('submitting');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, subscribe: true }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Could not subscribe. Try again later.');
        return;
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Network issue.');
    }
  }

  return (
    <footer className="relative isolate mt-20 overflow-hidden bg-navy-deep text-white">
      {/* Backdrop layers — grid + halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:80px_80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[36rem] w-[36rem] rounded-full bg-cobalt/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-32 h-[40rem] w-[40rem] rounded-full bg-cobalt-glow/10 blur-[120px]"
      />
      <CursorGlow color="rgba(138, 176, 224, 0.16)" size={520} />

      <div className="relative mx-auto max-w-[82rem] px-6 py-16 md:py-20">
        {/* ─── Top band: wordmark + tagline + CTAs ─── */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-12 md:pb-16">
          {/* Left — wordmark + tagline */}
          <div>
            <Reveal>
              <Link
                href="/"
                aria-label="Clarté MD home"
                className="group inline-flex items-baseline gap-2 no-underline"
              >
                <motion.span
                  initial={reduced ? { opacity: 0.85 } : { opacity: 0, y: 8 }}
                  whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color: '#ffffff' }}
                  className={cn(
                    'font-display font-light italic',
                    'text-[clamp(64px,8.5vw,128px)] leading-[0.85] tracking-[-0.035em]',
                    '[text-shadow:0_2px_30px_rgba(138,176,224,0.25)]',
                  )}
                >
                  Clarté
                </motion.span>
                <span
                  className={cn(
                    'font-mono not-italic font-semibold text-cobalt-glow',
                    'text-[clamp(14px,2vw,22px)] tracking-[0.22em]',
                    '-translate-y-[2.6em]',
                  )}
                >
                  MD
                </span>
              </Link>
            </Reveal>

            <Reveal>
              <p
                style={{ color: '#ffffff' }}
                className="mt-5 max-w-[34rem] font-display font-light italic text-[clamp(17px,1.8vw,22px)] leading-[1.35] tracking-[-0.005em] text-white"
              >
                Dermatologist-led skincare, made in Pakistan.
              </p>
            </Reveal>
            <Reveal>
              <p className="mt-2 max-w-[34rem] font-body text-[13.5px] leading-relaxed text-white/65">
                Twelve-week protocols formulated by a team of doctors in London and Lahore.
              </p>
            </Reveal>
          </div>

          {/* Right — primary CTAs */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 md:items-end">
              <Magnetic strength={5}>
                <Link
                  href="/quiz"
                  className={cn(
                    'group/cta inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-6 text-navy-deep',
                    'font-mono text-[11.5px] font-semibold uppercase tracking-[0.2em] no-underline',
                    'shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]',
                    'transition-colors duration-300 hover:bg-cobalt-glow hover:text-navy-deep',
                    'h-12',
                  )}
                >
                  Take the 30-second quiz
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                </Link>
              </Magnetic>
              <Magnetic strength={3}>
                <a
                  href="https://wa.me/923249986822"
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    'inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 text-white backdrop-blur',
                    'font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] no-underline',
                    'transition-[background-color,border-color] duration-300 hover:border-white hover:bg-white/15',
                  )}
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp our team
                </a>
              </Magnetic>

              {/* Trust signal chips — mobile-first horizontal scroll */}
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
                {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-1.5 text-white/55">
                    <Icon className="h-3 w-3" strokeWidth={1.5} />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em]">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ─── 4-column nav ─── */}
        <RevealGroup stagger={0.06}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4 md:gap-x-10 md:py-14">
            {COLUMNS.map((col) => (
              <Reveal key={col.label}>
                <FooterColumn label={col.label}>
                  {col.links.map((l) => (
                    <FooterLink key={l.href} href={l.href}>
                      {l.text}
                    </FooterLink>
                  ))}
                </FooterColumn>
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        {/* ─── Newsletter — slim band ─── */}
        <Reveal>
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:grid-cols-[1fr_1.2fr] md:items-center md:gap-10 md:p-8">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt-glow">
                <span aria-hidden="true" className="h-px w-6 bg-cobalt-glow" />
                The Newsletter
              </span>
              <h3
                style={{ color: '#ffffff' }}
                className="font-display font-light italic text-[clamp(20px,2.4vw,28px)] leading-[1.15] tracking-[-0.015em]"
              >
                Honest dermatology, once a month.
              </h3>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-white/65">
                One short letter — new protocols, panel data, dispatch updates. No noise.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              noValidate
              aria-describedby="newsletter-feedback"
              className="w-full"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                      setErrorMessage(null);
                    }
                  }}
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  aria-invalid={status === 'error' ? true : undefined}
                  disabled={status === 'submitting' || status === 'success'}
                  className={cn(
                    'h-12 flex-1 rounded-full border-white/15 bg-white/[0.06] px-5 text-white',
                    'placeholder:text-white/40',
                    'transition-[border-color,box-shadow,background-color] duration-300',
                    'focus-visible:border-cobalt-glow focus-visible:bg-white/12 focus-visible:ring-cobalt-glow/30',
                    'disabled:cursor-not-allowed disabled:opacity-60',
                  )}
                />
                <Magnetic strength={3}>
                  <button
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    className={cn(
                      'h-12 shrink-0 rounded-full px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.2em]',
                      'transition-colors duration-300',
                      status === 'success'
                        ? 'bg-cobalt-glow text-navy-deep'
                        : 'bg-white text-navy-deep hover:bg-cobalt-glow',
                      'disabled:cursor-not-allowed disabled:opacity-70',
                    )}
                  >
                    {status === 'submitting' ? '…' : status === 'success' ? '✓ Subscribed' : 'Subscribe →'}
                  </button>
                </Magnetic>
              </div>
              <p
                id="newsletter-feedback"
                role="status"
                aria-live="polite"
                className={cn(
                  'mt-2 min-h-[1.25rem] font-mono text-[10px] uppercase tracking-[0.18em]',
                  status === 'error' && 'text-rose-300',
                  status === 'success' && 'text-cobalt-glow',
                  status !== 'error' && status !== 'success' && 'text-transparent',
                )}
              >
                {status === 'success'
                  ? "You're on the list."
                  : status === 'error'
                    ? errorMessage
                    : 'placeholder'}
              </p>
            </form>
          </div>
        </Reveal>
      </div>

      {/* ─── Heritage strip ─── */}
      <div className="relative border-t border-white/10 bg-navy-deep/80 backdrop-blur">
        <div
          className={cn(
            'mx-auto flex max-w-[82rem] flex-col items-center justify-between gap-2 px-6 py-5 text-center',
            'font-mono text-[10px] uppercase tracking-[0.22em] text-white/50',
            'md:flex-row md:text-left',
          )}
        >
          <span>© MMXXIV · Established Lahore</span>
          <Link
            href="/"
            aria-label="Clarté MD home"
            className="inline-flex items-baseline gap-1.5 no-underline transition-opacity hover:opacity-80"
          >
            <span style={{ color: '#ffffff' }} className="font-display text-[15px] font-light italic text-white">
              Clarté
            </span>
            <span className="font-mono text-[9px] font-semibold tracking-[0.22em] text-cobalt-glow">
              MD
            </span>
          </Link>
          <span>COD across Pakistan · Made in Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt-glow">
        <span aria-hidden="true" className="h-px w-5 bg-cobalt-glow/60" />
        {label}
      </span>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'group/link inline-flex items-center gap-1.5 font-display text-[14.5px] text-white/70 no-underline',
          'transition-colors duration-200 hover:text-white',
        )}
      >
        <span className="relative">
          {children}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-cobalt-glow transition-transform duration-400 ease-out',
              'group-hover/link:scale-x-100',
            )}
          />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            'h-3 w-3 -translate-x-1 -translate-y-1 opacity-0',
            'transition-[opacity,transform] duration-300',
            'group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100',
          )}
        />
      </Link>
    </li>
  );
}
