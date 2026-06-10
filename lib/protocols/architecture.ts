/**
 * Shared data + copy layer for the 4 protocol landing pages (/acne,
 * /even-tone, /renewal, /barrier). Each page's NEW Tailwind layers
 * (hero, evidence band, step composition, savings math) read from
 * here so the four pages stay in lockstep while differing only in the
 * facts that should differ per concern.
 *
 * The LEGACY dangerouslySetInnerHTML bodies (protocol.html.ts) keep
 * rendering below the new layers — this file does NOT replace them.
 */

import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import type { Bundle, Product } from '@/lib/db/schema';
import { productImagePaths, PRODUCT_CONTENT } from '@/lib/products/content';

/**
 * Functional stage label per SKU — what role this product plays in any
 * protocol it ships in. Used as the eyebrow on each step card
 * ("STEP 01 · CLEANSE"). Per the COSRX Glass Skin Routine pattern from
 * the bundle-pages research (docs/research/2026-05-23-bundle-pages).
 */
export const SKU_PROTOCOL_STAGE: Record<string, string> = {
  prep: 'Prep',
  rescue: 'Cleanse',
  vitc: 'Brighten',
  acne: 'Treat',
  ha: 'Hydrate',
  reti: 'Renew',
  light: 'Brighten',
  spf: 'Protect',
};

/**
 * Short single-line "what this step does" copy per SKU. Renders under
 * the product name on each step card. Operator-owned editorial copy —
 * if missing, falls back to product.actives.
 */
export const SKU_STEP_PURPOSE: Record<string, string> = {
  prep: 'A gentle PHA cleanse that prepares the skin without stripping the barrier.',
  rescue: 'A salicylic + zinc face wash that decongests pores and calms active breakouts.',
  vitc: 'A morning antioxidant serum that brightens dullness and accelerates fading of marks.',
  acne: 'A niacinamide + azelaic treatment serum that targets active breakouts and post-acne pigmentation.',
  ha: 'A barrier-restorative hyaluronic serum that hydrates without aggravating actives.',
  reti: 'An evening retinol serum that drives twelve-week renewal of fine lines and texture.',
  light: 'A tranexamic + kojic cream that lifts melasma and uneven tone across all skin tones.',
  spf: 'A broad-spectrum SPF 50+ that closes the routine and protects the work the protocol does.',
};

/**
 * Per-concern outcome headline (the new Tailwind hero's H1).
 * Italic Fraunces, kept under ~5 words for the visual scale.
 */
export const CONCERN_OUTCOME: Record<
  string,
  { headline: string; emphasized: string; sub: string }
> = {
  acne: {
    headline: 'in twelve weeks.',
    emphasized: 'Visibly clearer skin',
    sub: 'A clinically-dosed niacinamide, azelaic, and salicylic regimen for active breakouts and the post-acne marks they leave behind.',
  },
  pigmentation: {
    headline: 'in twelve weeks.',
    emphasized: 'Even-toned skin',
    sub: 'L-Ascorbic 15%, tranexamic acid, alpha-arbutin, and SPF 50 — designed for melasma and stubborn pigmentation across all skin tones.',
  },
  'anti-ageing': {
    headline: 'in twelve weeks.',
    emphasized: 'Smoother, renewed skin',
    sub: 'Retinol 0.3%, L-Ascorbic, hyaluronic, and ceramides — for fine lines, texture, and visible renewal under medical guidance.',
  },
  hydration: {
    headline: 'in twelve weeks.',
    emphasized: 'A calmer, restored barrier',
    sub: 'Triple hyaluronic, panthenol, ceramides, and SPF 50 — no actives, just disciplined restoration for a compromised barrier.',
  },
};

export interface ProtocolStep {
  /** 1-indexed step number for "STEP 01" labelling. */
  num: number;
  /** Functional stage label — "Cleanse", "Treat", etc. */
  stage: string;
  /** Short single-line description of what this step does. */
  purpose: string;
  /** The product itself. */
  product: Product;
  /** Resolved hero image path (local /public asset if available; else legacy URL). */
  image: string | null;
}

export interface ProtocolPageData {
  bundle: Bundle;
  /** Outcome copy keyed off the bundle's concern. */
  outcome: { headline: string; emphasized: string; sub: string };
  steps: ProtocolStep[];
  savings: {
    /** Sum of each SKU's list price (the "buy individually" anchor). */
    listSum: number;
    /** The bundle's price — what the customer actually pays. */
    bundlePrice: number;
    /** listSum − bundlePrice. Always ≥ 0; protocols never cost more than individuals. */
    saved: number;
    /** Percent off vs the listSum anchor, rounded to nearest 1%. */
    pct: number;
  };
}

/**
 * Loads the full per-protocol page payload by bundle slug. One DB read
 * each for the bundle, its items, and the products themselves — kept
 * separate so any one query failing is loud, not silent.
 *
 * Returns null if the bundle doesn't exist. Caller should 404.
 */
export async function getProtocolPageData(
  slug: string,
): Promise<ProtocolPageData | null> {
  const [bundle] = await db
    .select()
    .from(schema.bundles)
    .where(eq(schema.bundles.slug, slug))
    .limit(1);
  if (!bundle || !bundle.active) return null;

  const items = await db
    .select()
    .from(schema.bundleItems)
    .where(eq(schema.bundleItems.bundleId, bundle.id));

  const sortedItems = [...items].sort((a, b) => a.position - b.position);

  const products = await Promise.all(
    sortedItems.map(async (item) => {
      const [p] = await db
        .select()
        .from(schema.products)
        .where(eq(schema.products.id, item.productId))
        .limit(1);
      return p;
    }),
  );

  const steps: ProtocolStep[] = products
    .filter((p): p is Product => !!p)
    .map((product, idx) => {
      const hasLocalImage = !!PRODUCT_CONTENT[product.sku];
      const image = hasLocalImage
        ? productImagePaths(product.sku).hero
        : product.imageUrl ?? null;
      return {
        num: idx + 1,
        stage: SKU_PROTOCOL_STAGE[product.sku] ?? 'Apply',
        purpose: SKU_STEP_PURPOSE[product.sku] ?? product.actives ?? '',
        product,
        image,
      };
    });

  const listSum = steps.reduce(
    (s, step) => s + (step.product.listPricePkr ?? step.product.pricePkr),
    0,
  );
  const bundlePrice = bundle.pricePkr;
  const saved = Math.max(0, listSum - bundlePrice);
  const pct = listSum > 0 ? Math.round((saved / listSum) * 100) : 0;

  const outcome =
    CONCERN_OUTCOME[bundle.concern] ?? {
      headline: 'in twelve weeks.',
      emphasized: 'Clearer, calmer skin',
      sub: 'A clinically-dosed twelve-week regimen, dispensed from Lahore.',
    };

  return {
    bundle,
    outcome,
    steps,
    savings: { listSum, bundlePrice, saved, pct },
  };
}
