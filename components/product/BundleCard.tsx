import Link from 'next/link';
import type { Bundle } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

const CONCERN_LABELS: Record<string, string> = {
  acne: 'Acne · PIH',
  pigmentation: 'Pigmentation · Melasma',
  'anti-ageing': 'Anti-ageing · Fine lines',
  hydration: 'Sensitivity · Hydration',
};

interface BundleCardProps {
  bundle: Bundle;
  itemCount: number;
  listPriceSum: number;
}

export function BundleCard({ bundle, itemCount, listPriceSum }: BundleCardProps) {
  const route = PROTOCOL_ROUTES[bundle.slug] || '/';
  const savings = Math.max(0, listPriceSum - bundle.pricePkr);
  const savingsPct =
    listPriceSum > 0 ? Math.round((savings / listPriceSum) * 100) : 0;

  return (
    <article
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-rule bg-card p-6',
        'transition-[border-color,transform] duration-200',
        'hover:-translate-y-0.5 hover:border-navy',
      )}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
        Bundle · {itemCount} products
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-cobalt">
        {CONCERN_LABELS[bundle.concern]}
      </span>
      <h3 className="font-display text-xl font-medium leading-tight text-navy">{bundle.name}</h3>
      <div className="mt-1 flex flex-col gap-1">
        {savings > 0 ? (
          <>
            <span className="font-mono text-[11px] text-ink-faint line-through">
              List Rs. {listPriceSum.toLocaleString()}
            </span>
            <span className="font-display text-2xl text-navy">
              Rs. {bundle.pricePkr.toLocaleString()}
            </span>
            <span className="font-mono text-[11px] text-cobalt">
              Save Rs. {savings.toLocaleString()} ({savingsPct}%)
            </span>
          </>
        ) : (
          <span className="font-display text-2xl text-navy">
            Rs. {bundle.pricePkr.toLocaleString()}
          </span>
        )}
      </div>
      <Button asChild className="mt-2 w-full">
        <Link href={route}>Start the Protocol →</Link>
      </Button>
    </article>
  );
}
