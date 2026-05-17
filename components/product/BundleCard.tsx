import Link from 'next/link';
import type { Bundle } from '@/lib/db/schema';

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
    <article className="bundle-card">
      <div className="bundle-card-tag mono">
        Bundle · {itemCount} products
      </div>
      <div className="bundle-card-concern mono">{CONCERN_LABELS[bundle.concern]}</div>
      <h3 className="bundle-card-name">{bundle.name}</h3>
      <div className="bundle-card-savings">
        {savings > 0 && (
          <>
            <span className="bundle-card-list">
              List Rs. {listPriceSum.toLocaleString()}
            </span>
            <span className="bundle-card-current">
              Rs. {bundle.pricePkr.toLocaleString()}
            </span>
            <span className="bundle-card-save mono">
              Save Rs. {savings.toLocaleString()} ({savingsPct}%)
            </span>
          </>
        )}
        {savings === 0 && (
          <span className="bundle-card-current">
            Rs. {bundle.pricePkr.toLocaleString()}
          </span>
        )}
      </div>
      <Link href={route} className="bundle-card-cta">
        Start the Protocol →
      </Link>
    </article>
  );
}
