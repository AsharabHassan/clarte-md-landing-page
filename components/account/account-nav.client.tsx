'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Package, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/account/orders', label: 'Orders', icon: Package },
  { href: '/account/profile', label: 'Profile', icon: User },
];

export default function AccountNav({ name }: { name: string }) {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    await fetch('/api/account/logout', { method: 'POST' });
    router.push('/account/login');
    router.refresh();
  }

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-rule pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-1">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active ? 'bg-navy text-white' : 'text-ink-mute hover:bg-sky',
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-ink-mute">
          Hi, <span className="font-medium text-ink">{name.split(/\s+/)[0]}</span>
        </span>
        <button
          type="button"
          onClick={signOut}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-ink-mute transition-colors hover:bg-sky"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </div>
  );
}
