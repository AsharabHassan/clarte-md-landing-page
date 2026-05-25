'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Layers,
  Star,
  Sparkles,
  Mail,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { AdminArea } from '@/lib/auth/roles';

const NAV: { href: string; label: string; icon: typeof LayoutDashboard; area: AdminArea }[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, area: 'dashboard' },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag, area: 'orders' },
  { href: '/admin/customers', label: 'Customers', icon: Users, area: 'customers' },
  { href: '/admin/reviews', label: 'Reviews', icon: Star, area: 'reviews' },
  { href: '/admin/products', label: 'Products', icon: Package, area: 'products' },
  { href: '/admin/protocols', label: 'Protocols', icon: Layers, area: 'protocols' },
  { href: '/admin/ai-sessions', label: 'AI Sessions', icon: Sparkles, area: 'ai' },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Mail, area: 'subscribers' },
];

export default function AdminSidebar({
  email,
  roleLabel,
  allowedAreas,
}: {
  email: string;
  roleLabel: string;
  allowedAreas: AdminArea[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const items = NAV.filter((n) => allowedAreas.includes(n.area));

  async function signOut() {
    const supa = createSupabaseBrowserClient();
    await supa.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
        <span className="font-semibold tracking-tight text-foreground">Clarté MD · Admin</span>
        <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <aside
        className={cn(
          'flex w-full flex-col border-r border-border bg-card md:h-screen md:w-60 md:shrink-0',
          open ? 'block' : 'hidden md:flex',
        )}
      >
        <div className="hidden px-5 py-5 md:block">
          <div className="text-lg font-semibold tracking-tight text-foreground">Clarté MD</div>
          <div className="text-xs text-muted-foreground">Admin console</div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border px-4 py-4">
          <div className="mb-2 truncate text-sm font-medium text-foreground" title={email}>
            {email}
          </div>
          <div className="mb-3 text-xs text-muted-foreground">{roleLabel}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </aside>
    </>
  );
}
