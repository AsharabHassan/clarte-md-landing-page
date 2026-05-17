'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CartIcon } from './CartIcon';

const PROTOCOLS = [
  { slug: '/acne', label: 'Clear Skin · Acne' },
  { slug: '/even-tone', label: 'Even Tone · Pigmentation' },
  { slug: '/renewal', label: 'Renewal · Anti-ageing' },
  { slug: '/barrier', label: 'Barrier · Hydration' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [protocolsOpen, setProtocolsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Clarté MD home">
          <span className="site-brand-mark">Clarté MD</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <div
            className="site-nav-item site-nav-dropdown"
            onMouseEnter={() => setProtocolsOpen(true)}
            onMouseLeave={() => setProtocolsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={protocolsOpen}
              aria-haspopup="true"
              className="site-nav-trigger"
              onClick={() => setProtocolsOpen((v) => !v)}
            >
              Protocols <span aria-hidden="true">▾</span>
            </button>
            {protocolsOpen && (
              <ul className="site-nav-menu" role="menu">
                {PROTOCOLS.map((p) => (
                  <li key={p.slug} role="none">
                    <Link href={p.slug} role="menuitem">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link className="site-nav-item" href="/products">
            Products
          </Link>
          <Link className="site-nav-item" href="/quiz">
            Quiz
          </Link>
          <Link className="site-nav-item" href="/about">
            About
          </Link>
        </nav>

        <div className="site-header-right">
          <CartIcon />
          <button
            type="button"
            className="site-hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="site-nav-mobile" aria-label="Mobile">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <details>
            <summary>Protocols</summary>
            <ul>
              {PROTOCOLS.map((p) => (
                <li key={p.slug}>
                  <Link href={p.slug} onClick={() => setOpen(false)}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <Link href="/products" onClick={() => setOpen(false)}>
            Products
          </Link>
          <Link href="/quiz" onClick={() => setOpen(false)}>
            Quiz
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </nav>
      )}
    </header>
  );
}
