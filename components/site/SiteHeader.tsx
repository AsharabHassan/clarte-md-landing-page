'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CartIcon } from './CartIcon';
import { PromoBar } from './PromoBar';
import { useReducedMotion } from '@/lib/anim/hooks';
import { bundleCinematicPath } from '@/lib/products/content';
import { cn } from '@/lib/utils';

const PROTOCOLS = [
  {
    slug: '/acne',
    bundleSlug: 'clear-skin-protocol',
    label: 'Clear Skin',
    concern: 'Acne · PIH',
    tagline: 'Niacinamide 10% · Azelaic · Salicylic 2%',
    accent: 'bg-acne-accent',
  },
  {
    slug: '/even-tone',
    bundleSlug: 'even-tone-protocol',
    label: 'Even Tone',
    concern: 'Pigmentation · Melasma',
    tagline: 'L-Ascorbic 15% · Tranexamic · Alpha-Arbutin',
    accent: 'bg-eventone-accent',
  },
  {
    slug: '/renewal',
    bundleSlug: 'renewal-protocol',
    label: 'Renewal',
    concern: 'Fine lines · Texture',
    tagline: 'Retinol 0.3% · L-Ascorbic · HA · Ceramides',
    accent: 'bg-renewal-accent',
  },
  {
    slug: '/barrier',
    bundleSlug: 'barrier-protocol',
    label: 'Barrier',
    concern: 'Sensitive · Hydration',
    tagline: 'Triple HA · B5 · Ceramides · SPF 50',
    accent: 'bg-barrier-accent',
  },
];

const TOP_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/about', label: 'About' },
];

/**
 * Routes that render a full-bleed dark hero. While scrollY === 0 on
 * one of these, the header is transparent with white nav text so it
 * sits on the cinematic image. On scroll past the hero, the header
 * transitions to the frosted-cream pattern.
 */
function isDarkHeroRoute(pathname: string): boolean {
  if (!pathname) return false;
  if (
    pathname === '/acne' ||
    pathname === '/even-tone' ||
    pathname === '/renewal' ||
    pathname === '/barrier'
  ) {
    return true;
  }
  // Product detail pages have a dark cinematic hero band; the catalog
  // /products list does not.
  if (pathname.startsWith('/products/') && pathname.length > '/products/'.length) {
    return true;
  }
  return false;
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [protocolsOpen, setProtocolsOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const darkHero = isDarkHeroRoute(pathname);
  // "Dark mode" means white text on transparent backdrop — only active
  // when we're on a dark-hero route AND scrolled to top. After scroll
  // we flip to the frosted-cream pattern even on dark-hero routes.
  const dark = darkHero && !scrolled;

  return (
    <header className="sticky top-0 z-50">
      <PromoBar />
      <motion.div
        initial={false}
        animate={{
          height: scrolled ? 56 : 72,
          backgroundColor: dark
            ? 'rgba(8, 21, 42, 0)'
            : scrolled
              ? 'rgba(246, 241, 235, 0.78)'
              : 'rgba(246, 241, 235, 0.92)',
          backdropFilter: scrolled || !darkHero ? 'blur(16px) saturate(1.3)' : 'blur(0px)',
          boxShadow: scrolled
            ? '0 8px 28px -16px rgba(14, 31, 58, 0.22)'
            : '0 0 0 0 rgba(0,0,0,0)',
          borderBottomColor: scrolled
            ? 'rgba(219, 226, 238, 0.5)'
            : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'relative w-full border-b',
          dark ? 'text-white' : 'text-navy',
        )}
        style={{ borderBottomStyle: 'solid', borderBottomWidth: 1 }}
      >
        {/* Subtle dark scrim in transparent mode — keeps white nav text
            legible no matter what part of the hero is behind it. */}
        {dark && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-full bg-gradient-to-b from-navy-deep/75 via-navy-deep/45 to-transparent"
          />
        )}
        <div className="relative z-10 mx-auto flex h-full max-w-[82rem] items-center justify-between px-5">
          {/* ─── Logo — italic Fraunces with MD superscript ─── */}
          <Link
            href="/"
            aria-label="Clarté MD home"
            className={cn(
              'group inline-flex items-baseline gap-0.5 font-display font-light leading-none tracking-[-0.015em] no-underline',
              'text-[clamp(20px,2vw,24px)]',
              dark ? 'text-white' : 'text-navy',
              'transition-colors duration-300',
            )}
          >
            <span className="italic">Clarté</span>
            <sup
              className={cn(
                'mt-0 ml-0.5 font-mono text-[10px] font-medium not-italic tracking-[0.16em] uppercase',
                'transition-colors duration-300',
                dark ? 'text-cobalt-glow' : 'text-cobalt',
              )}
            >
              MD
            </sup>
          </Link>

          {/* ─── Desktop nav ─── */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setProtocolsOpen(false)}
          >
            {/* Protocols dropdown trigger */}
            <button
              type="button"
              onMouseEnter={() => setProtocolsOpen(true)}
              onClick={() => setProtocolsOpen((v) => !v)}
              aria-expanded={protocolsOpen}
              aria-haspopup="menu"
              className={cn(
                'group relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 outline-none',
                'font-mono text-[11px] font-semibold uppercase tracking-[0.18em]',
                dark ? 'text-white/95 hover:text-white' : 'text-navy hover:text-cobalt',
                'transition-colors duration-200',
              )}
            >
              Protocols
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'h-3 w-3 transition-transform duration-300',
                  protocolsOpen && 'rotate-180',
                )}
              />
              <NavUnderline dark={dark} active={protocolsOpen} />
            </button>

            {TOP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative inline-flex h-10 items-center px-4',
                  'font-mono text-[11px] font-semibold uppercase tracking-[0.18em] no-underline',
                  dark ? 'text-white/95 hover:text-white' : 'text-navy hover:text-cobalt',
                  'transition-colors duration-200',
                )}
              >
                {link.label}
                <NavUnderline dark={dark} active={pathname === link.href} />
              </Link>
            ))}
          </nav>

          {/* ─── Right: cart + mobile menu ─── */}
          <div className="flex items-center gap-2">
            <span className={cn(dark && '[&_button]:!text-white [&_button:hover]:!text-cobalt-glow')}>
              <CartIcon />
            </span>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className={cn(
                    'lg:hidden',
                    dark
                      ? 'text-white hover:bg-white/10 hover:text-white'
                      : 'text-navy hover:bg-sky',
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[22rem]">
                <SheetHeader className="px-6 pt-6">
                  <SheetTitle className="text-left font-display text-xl text-navy">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 pb-8 pt-4">
                  <MobileLink href="/" onNavigate={() => setSheetOpen(false)}>
                    Home
                  </MobileLink>

                  <div className="mt-5 mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                    Protocols
                  </div>
                  {PROTOCOLS.map((p) => (
                    <MobileLink
                      key={p.slug}
                      href={p.slug}
                      onNavigate={() => setSheetOpen(false)}
                      accent={p.accent}
                    >
                      {p.label} · <span className="text-ink-mute">{p.concern}</span>
                    </MobileLink>
                  ))}

                  <div className="mt-5 mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                    Browse
                  </div>
                  {TOP_LINKS.map((link) => (
                    <MobileLink
                      key={link.href}
                      href={link.href}
                      onNavigate={() => setSheetOpen(false)}
                    >
                      {link.label}
                    </MobileLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* ─── Mega-menu — premium split layout: intro pane + 4 photo cards ─── */}
        <AnimatePresence>
          {protocolsOpen && (
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setProtocolsOpen(true)}
              onMouseLeave={() => setProtocolsOpen(false)}
              className={cn(
                'absolute inset-x-0 top-full hidden border-b border-sand/40 lg:block',
                'bg-canvas/96 backdrop-blur-xl',
                'shadow-[0_30px_60px_-20px_rgba(14,31,58,0.28)]',
              )}
            >
              <div className="mx-auto grid max-w-[82rem] grid-cols-[minmax(0,18rem)_minmax(0,1fr)] gap-10 px-5 py-9">
                {/* Left: intro pane */}
                <div className="flex flex-col justify-between border-r border-sand/40 pr-8">
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt">
                      — The Protocols
                    </span>
                    <h3 className="mt-3 font-display font-light italic text-navy text-[clamp(24px,2.4vw,32px)] leading-[1.05] tracking-[-0.015em]">
                      Pick the protocol that matches your skin.
                    </h3>
                    <p className="mt-3 font-display italic text-[14px] leading-relaxed text-ink-mute">
                      Four concerns. Four regimens. Twelve weeks each.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/quiz"
                      onClick={() => setProtocolsOpen(false)}
                      className={cn(
                        'group/cta inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-white',
                        'font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] no-underline',
                        'transition-colors duration-300 hover:bg-navy-2',
                      )}
                    >
                      Take the 30-second quiz
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Right: 4 photo cards */}
                <div className="grid grid-cols-4 gap-4">
                  {PROTOCOLS.map((p) => (
                    <Link
                      key={p.slug}
                      href={p.slug}
                      onClick={() => setProtocolsOpen(false)}
                      className={cn(
                        'group/card relative isolate flex flex-col overflow-hidden rounded-xl bg-card',
                        'no-underline text-inherit',
                        'border border-sand/40 transition-[border-color,transform,box-shadow] duration-400',
                        'hover:-translate-y-1 hover:border-navy/30 hover:shadow-[0_24px_44px_-22px_rgba(14,31,58,0.32)]',
                      )}
                    >
                      {/* Photo */}
                      <div className="relative aspect-[5/4] overflow-hidden bg-canvas-soft">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={bundleCinematicPath(p.bundleSlug)}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-canvas/85 to-transparent" />
                        <div className="lightsweep-overlay" aria-hidden="true" />
                        {/* Accent bar — grows on hover */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            'absolute left-0 top-0 h-full w-1 origin-top transition-transform duration-500 group-hover/card:scale-y-110',
                            p.accent,
                          )}
                        />
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col gap-1.5 p-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                          {p.concern}
                        </span>
                        <h4 className="font-display text-[18px] font-light italic leading-tight text-navy">
                          The {p.label}
                        </h4>
                        <p className="font-body text-[11.5px] leading-snug text-ink-mute">
                          {p.tagline}
                        </p>
                        <div className="mt-2 flex items-center justify-between border-t border-sand/40 pt-2.5">
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                            12-week kit
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-cobalt transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

/**
 * Underline that expands left-to-right under nav items on hover, and
 * stays expanded for the active route.
 */
function NavUnderline({ dark, active }: { dark: boolean; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left transition-transform duration-400 ease-out',
        dark ? 'bg-cobalt-glow' : 'bg-cobalt',
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
      )}
    />
  );
}

function MobileLink({
  href,
  children,
  onNavigate,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'group relative block py-2.5 pl-3 text-base text-ink no-underline',
        'border-b border-rule-soft last:border-b-0',
        'transition-colors hover:text-cobalt',
      )}
    >
      {accent && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100',
            accent,
          )}
        />
      )}
      {children}
    </Link>
  );
}
