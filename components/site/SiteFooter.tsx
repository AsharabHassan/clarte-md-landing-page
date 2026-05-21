'use client';

import { useState } from 'react';
import Link from 'next/link';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-col">
          <h4>Protocols</h4>
          <Link href="/acne">Clear Skin Protocol</Link>
          <Link href="/even-tone">Even Tone Protocol</Link>
          <Link href="/renewal">Renewal Protocol</Link>
          <Link href="/barrier">Barrier Protocol</Link>
        </div>
        <div className="site-footer-col">
          <h4>Help</h4>
          <Link href="/contact">Contact</Link>
          <Link href="/order">Track an order</Link>
          <Link href="/legal/returns">Returns</Link>
          <Link href="/legal/shipping">Shipping</Link>
        </div>
        <div className="site-footer-col">
          <h4>Legal</h4>
          <Link href="/legal/privacy">Privacy policy</Link>
          <Link href="/legal/terms">Terms of service</Link>
        </div>
        <div className="site-footer-col site-footer-newsletter">
          <h4>Newsletter</h4>
          <p className="site-footer-news-blurb">
            Honest dermatology, monthly. No spam.
          </p>
          {/* Stub: full subscriber UX lands in sub-project #7. The
              input is controlled (value + onChange) so that browser
              password-managers / autofill that inject a DOM value
              don't trip React's "uncontrolled → controlled" warning
              when the page re-renders. */}
          <form
            className="site-footer-news-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email for newsletter"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>Clarté MD · Lahore, Pakistan</span>
        <span>
          Made in Lahore · COD across Pakistan
        </span>
      </div>
    </footer>
  );
}
