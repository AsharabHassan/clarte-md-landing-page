'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eyebrow } from '@/components/ui/eyebrow';
import { cn } from '@/lib/utils';

// Dark-surface link style — used in all four footer columns.
const linkClass = cn(
  'block py-1 text-sm leading-relaxed text-white/75',
  'transition-colors hover:text-white',
);

export function SiteFooter() {
  // Newsletter form is intentionally a stub — see comment on onSubmit below.
  const [email, setEmail] = useState('');

  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="mx-auto grid max-w-[82rem] grid-cols-1 gap-9 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Eyebrow className="mb-4 text-white">Protocols</Eyebrow>
          <ul>
            <li>
              <Link href="/acne" className={linkClass}>
                Clear Skin Protocol
              </Link>
            </li>
            <li>
              <Link href="/even-tone" className={linkClass}>
                Even Tone Protocol
              </Link>
            </li>
            <li>
              <Link href="/renewal" className={linkClass}>
                Renewal Protocol
              </Link>
            </li>
            <li>
              <Link href="/barrier" className={linkClass}>
                Barrier Protocol
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Eyebrow className="mb-4 text-white">Help</Eyebrow>
          <ul>
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/order" className={linkClass}>
                Track an order
              </Link>
            </li>
            <li>
              <Link href="/legal/returns" className={linkClass}>
                Returns
              </Link>
            </li>
            <li>
              <Link href="/legal/shipping" className={linkClass}>
                Shipping
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Eyebrow className="mb-4 text-white">Legal</Eyebrow>
          <ul>
            <li>
              <Link href="/legal/privacy" className={linkClass}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className={linkClass}>
                Terms of service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Eyebrow className="mb-4 text-white">Newsletter</Eyebrow>
          <p className="mb-3 text-sm leading-relaxed text-white/70">
            Honest dermatology, monthly. No spam.
          </p>
          {/*
            Stub: full subscriber UX lands in a follow-up. The input is
            controlled (value + onChange) so that browser password-managers /
            autofill that inject a DOM value don't trip React's
            "uncontrolled → controlled" warning when the page re-renders.
          */}
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email for newsletter"
              className={cn(
                'h-9 flex-1 border-white/15 bg-white/5 text-white',
                'placeholder:text-white/40',
                'focus-visible:border-cobalt-soft focus-visible:ring-cobalt/40',
              )}
            />
            <Button type="submit" variant="secondary" size="default">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div
          className={cn(
            'mx-auto flex max-w-[82rem] flex-wrap justify-between gap-3 px-5 py-4',
            'font-mono text-xs uppercase tracking-[0.12em] text-white/55',
          )}
        >
          <span>Clarté MD · Lahore, Pakistan</span>
          <span>Made in Lahore · COD across Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
