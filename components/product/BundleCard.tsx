import Image from 'next/image';
import Link from 'next/link';
import type { Bundle } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { bundleCinematicPath } from '@/lib/products/content';
import { cn } from '@/lib/utils';

const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

const CONCERN_LABELS: Record<string, string> = {
  acne: 'Acne - PIH',
  pigmentation: 'Pigmentation - Melasma',
  'anti-ageing': 'Anti-ageing - Fine lines',
  hydration: 'Sensitivity - Hydration',
};

interface BundleCardProps {
  bundle: Bundle;
  itemCount: number;
  listPriceSum: number;
}

export function BundleCard({ bundle, itemCount, listPriceSum }: BundleCardProps) {
  const route = PROTOCOL_ROUTES[bundle.slug] || '/';
  const imageSrc = bundleCinematicPath(bundle.slug);
  const savings = Math.max(0, listPriceSum - bundle.pricePkr);
  const savingsPct =
    listPriceSum > 0 ? Math.round((savings / listPriceSum) * 100) : 0;

  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-card',
        'transition-[border-color,transform] duration-200',
        'hover:-translate-y-0.5 hover:border-navy',
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-soft">
        <Image
          src={imageSrc}
          alt={`${bundle.name} products`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 pt-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          Bundle - {itemCount} products
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
        <Button asChild className="mt-auto w-full">
          <Link href={route}>Start the Protocol {'->'}</Link>
        </Button>
      </div>
    </article>
  );
}
