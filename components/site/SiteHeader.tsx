'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CartIcon } from './CartIcon';
import { cn } from '@/lib/utils';

const PROTOCOLS = [
  { slug: '/acne', label: 'Clear Skin · Acne' },
  { slug: '/even-tone', label: 'Even Tone · Pigmentation' },
  { slug: '/renewal', label: 'Renewal · Anti-ageing' },
  { slug: '/barrier', label: 'Barrier · Hydration' },
];

// Desktop top-level nav links (excluding the Protocols dropdown).
// Ingredients is new — placeholder route with noindex until the glossary ships.
const TOP_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/ingredients', label: 'Ingredients' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/about', label: 'About' },
];

const navItemClass = cn(
  'text-sm font-medium text-ink',
  'transition-colors hover:text-cobalt',
  'focus-visible:outline-none focus-visible:text-cobalt',
);

export function SiteHeader() {
  // Sheet open state is controlled so nav links can close the drawer on click.
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'border-b border-rule bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[82rem] items-center justify-between px-5">
        <Link
          href="/"
          aria-label="Clarté MD home"
          className="font-display text-[22px] font-semibold leading-none tracking-[-0.01em] text-navy"
        >
          Clarté MD
        </Link>

        {/* Desktop nav — hidden under lg breakpoint */}
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(navItemClass, 'flex items-center gap-1 outline-none')}
            >
              Protocols
              <ChevronDown
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform data-[state=open]:rotate-180"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[14rem]">
              {PROTOCOLS.map((p) => (
                <DropdownMenuItem key={p.slug} asChild>
                  <Link href={p.slug}>{p.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {TOP_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navItemClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartIcon />

          {/* Mobile hamburger — visible under lg */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="lg:hidden text-ink hover:bg-sky"
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

                <div className="mt-4 mb-1 font-mono text-xs uppercase tracking-[0.18em] text-ink-mute">
                  Protocols
                </div>
                {PROTOCOLS.map((p) => (
                  <MobileLink key={p.slug} href={p.slug} onNavigate={() => setSheetOpen(false)}>
                    {p.label}
                  </MobileLink>
                ))}

                <div className="mt-4 mb-1 font-mono text-xs uppercase tracking-[0.18em] text-ink-mute">
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
    </header>
  );
}

function MobileLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'block py-2.5 text-base text-ink',
        'border-b border-rule-soft last:border-b-0',
        'transition-colors hover:text-cobalt',
      )}
    >
      {children}
    </Link>
  );
}
