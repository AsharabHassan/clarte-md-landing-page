'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ProductCard } from './ProductCard';
import { BundleCard } from './BundleCard';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useReducedMotion } from '@/lib/anim/hooks';
import type { Bundle, Product } from '@/lib/db/schema';
import {
  CONCERN_OPTIONS,
  PRODUCT_FILTER_AXES,
  TYPE_OPTIONS,
} from '@/lib/products/filters';
import { cn } from '@/lib/utils';

/**
 * Triple-axis catalog browser: kind (All / Bundles / Individuals) +
 * Concern + Type + Active-ingredient. The grid is one unified
 * collection — bundles and SKUs share a card height-grid via auto-fill.
 *
 * Reference brands surveyed in 02-shop.md (Sephora · The Ordinary ·
 * Paula's Choice · COSRX · EltaMD · BoJ · Drunk Elephant · Tatcha) all
 * use a triple-axis chip filter on collections in the 12–30 SKU range.
 * For Clarté at 12 items (4 bundles + 8 individuals), chips are the
 * right scale — a left sidebar would dwarf the grid.
 *
 * Recommendation empty state: when no SKU matches the active filter,
 * we recommend the closest *protocol bundle* (chosen by overlap with
 * the active Concern chips) and link to its protocol landing. Converts
 * a dead end into a regimen recommendation — see 02-shop.md.
 */

type KindFilter = 'all' | 'bundles' | 'individuals';

export interface EnrichedBundle {
  bundle: Bundle;
  itemCount: number;
  listPriceSum: number;
}

export interface EnrichedProduct {
  product: Product;
  concerns: string[];
}

export function CatalogFilterChips({
  bundles,
  products,
}: {
  bundles: EnrichedBundle[];
  products: EnrichedProduct[];
}) {
  const [kind, setKind] = useState<KindFilter>('all');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const anyChipActive = concerns.length > 0 || types.length > 0 || kind !== 'all';

  const filteredBundles = useMemo(() => {
    if (kind === 'individuals') return [];
    return bundles.filter((b) => {
      if (concerns.length > 0 && !concerns.includes(b.bundle.concern)) return false;
      // Bundles don't carry a type axis — if the user filters by type,
      // they want individual products, so hide bundles when type is set.
      if (types.length > 0) return false;
      return true;
    });
  }, [bundles, kind, concerns, types]);

  const filteredProducts = useMemo(() => {
    if (kind === 'bundles') return [];
    return products.filter((ep) => {
      const axes = PRODUCT_FILTER_AXES[ep.product.sku];
      if (concerns.length > 0 && !concerns.some((c) => ep.concerns.includes(c)))
        return false;
      if (types.length > 0 && (!axes || !types.includes(axes.type))) return false;
      return true;
    });
  }, [products, kind, concerns, types]);

  const isEmpty = filteredBundles.length === 0 && filteredProducts.length === 0;

  /**
   * When the result is empty, surface the bundle that overlaps the most
   * with the user's selected concerns. With no concerns selected, recommend
   * the first protocol (acne) as the funnel default.
   */
  const recommendedBundle = useMemo<EnrichedBundle | null>(() => {
    if (!isEmpty) return null;
    if (concerns.length === 0) return bundles[0] ?? null;
    return bundles.find((b) => concerns.includes(b.bundle.concern)) ?? bundles[0] ?? null;
  }, [isEmpty, concerns, bundles]);

  function clearAll() {
    setKind('all');
    setConcerns([]);
    setTypes([]);
  }

  const reduced = useReducedMotion();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-rule pb-6">
        {/* Kind toggle — single-select */}
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow className="text-ink-mute">Showing</Eyebrow>
          <ToggleGroup
            type="single"
            value={kind}
            onValueChange={(v) => setKind((v || 'all') as KindFilter)}
            variant="outline"
            size="sm"
            className="flex-wrap"
            aria-label="Filter by kind"
          >
            <ToggleGroupItem value="all">All ({bundles.length + products.length})</ToggleGroupItem>
            <ToggleGroupItem value="bundles">Protocol bundles ({bundles.length})</ToggleGroupItem>
            <ToggleGroupItem value="individuals">
              Individual products ({products.length})
            </ToggleGroupItem>
          </ToggleGroup>
          {anyChipActive && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <ChipRow
          label="Concern"
          options={CONCERN_OPTIONS}
          value={concerns}
          onChange={setConcerns}
        />
        <ChipRow
          label="Type"
          options={TYPE_OPTIONS.map((t) => ({ slug: t.slug as string, label: t.label }))}
          value={types}
          onChange={setTypes}
          disabled={kind === 'bundles'}
        />
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-cobalt/25 bg-canvas-soft px-7 py-10 text-center">
          <Eyebrow className="mb-3 justify-self-center text-cobalt">— No exact match</Eyebrow>
          <p className="mb-2 font-display text-[clamp(20px,2.5vw,26px)] italic text-navy">
            The catalogue has nothing matching this exact combination.
          </p>
          {recommendedBundle && (
            <>
              <p className="mb-6 text-sm leading-relaxed text-ink-mute">
                The{' '}
                <span className="font-display italic text-navy">
                  {recommendedBundle.bundle.name}
                </span>{' '}
                covers this concern as a 12-week protocol — try it before narrowing further.
              </p>
              <Link
                href={`/${recommendedBundle.bundle.slug.replace('-protocol', '')}`}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md border border-navy bg-transparent px-6 py-2.5',
                  'font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-navy',
                  'transition-colors hover:bg-navy hover:text-white',
                )}
              >
                View the protocol →
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={clearAll}
            className="ml-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt hover:underline"
          >
            Or clear filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]"
        >
          <AnimatePresence mode="popLayout">
            {filteredBundles.map(({ bundle, itemCount, listPriceSum }, i) => (
              <motion.div
                key={bundle.id}
                layout
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  delay: reduced ? 0 : i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <BundleCard
                  bundle={bundle}
                  itemCount={itemCount}
                  listPriceSum={listPriceSum}
                />
              </motion.div>
            ))}
            {filteredProducts.map(({ product }, i) => (
              <motion.div
                key={product.id}
                layout
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  delay: reduced ? 0 : (filteredBundles.length + i) * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function ChipRow({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: Array<{ slug: string; label: string }>;
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', disabled && 'opacity-40')}>
      <Eyebrow className="text-ink-mute">{label}</Eyebrow>
      <ToggleGroup
        type="multiple"
        value={value}
        onValueChange={onChange}
        variant="outline"
        size="sm"
        className="flex-wrap"
        disabled={disabled}
        aria-label={`Filter by ${label}`}
      >
        {options.map((o) => (
          <ToggleGroupItem key={o.slug} value={o.slug}>
            {o.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
