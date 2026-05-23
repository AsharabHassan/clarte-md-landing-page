/**
 * Per-SKU filter axes for the catalog chip-filter row.
 *
 * Kept separate from PRODUCT_CONTENT so the heavy editorial PDP file
 * doesn't need to change every time we add an active ingredient or
 * re-categorize a product type.
 *
 * `concerns` are derived server-side from bundle_items membership
 * (a product can ship in more than one protocol), NOT hardcoded here.
 *
 * Active-ingredient slugs follow the convention used in the future
 * /ingredients glossary — lowercase, hyphenated, including the % when
 * the % is part of the brand's identity for that active (e.g.
 * "niacinamide-10", "vitamin-c-15").
 */

export type ProductType = 'cleanser' | 'face-wash' | 'serum' | 'cream' | 'spf';

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  cleanser: 'Cleanser',
  'face-wash': 'Face wash',
  serum: 'Serum',
  cream: 'Cream',
  spf: 'SPF',
};

export interface ProductFilterAxes {
  type: ProductType;
  activeIngredients: string[];
}

export const PRODUCT_FILTER_AXES: Record<string, ProductFilterAxes> = {
  prep: { type: 'cleanser', activeIngredients: ['pha-4', 'aloe'] },
  rescue: { type: 'face-wash', activeIngredients: ['salicylic-2', 'zinc'] },
  vitc: { type: 'serum', activeIngredients: ['vitamin-c-15', 'vitamin-e', 'ferulic'] },
  acne: { type: 'serum', activeIngredients: ['niacinamide-10', 'azelaic-10'] },
  ha: { type: 'serum', activeIngredients: ['hyaluronic-acid', 'panthenol'] },
  reti: { type: 'serum', activeIngredients: ['retinol'] },
  light: { type: 'cream', activeIngredients: ['tranexamic-3', 'kojic', 'arbutin'] },
  spf: { type: 'spf', activeIngredients: ['spf-58', 'centella'] },
};

export interface ActiveIngredientMeta {
  slug: string;
  label: string;
}

/**
 * Sorted list of ingredients actually present in the SKU catalog. The
 * UI surfaces only these — no ingredients for SKUs we don't sell.
 */
export const ACTIVE_INGREDIENT_OPTIONS: ActiveIngredientMeta[] = [
  { slug: 'niacinamide-10', label: 'Niacinamide 10%' },
  { slug: 'azelaic-10', label: 'Azelaic Acid 10%' },
  { slug: 'salicylic-2', label: 'Salicylic 2%' },
  { slug: 'vitamin-c-15', label: 'Vitamin C 15%' },
  { slug: 'tranexamic-3', label: 'Tranexamic 3%' },
  { slug: 'kojic', label: 'Kojic Acid' },
  { slug: 'arbutin', label: 'Alpha-Arbutin' },
  { slug: 'retinol', label: 'Retinol' },
  { slug: 'hyaluronic-acid', label: 'Hyaluronic Acid' },
  { slug: 'panthenol', label: 'Panthenol' },
  { slug: 'centella', label: 'Centella' },
  { slug: 'pha-4', label: 'PHA 4%' },
  { slug: 'spf-58', label: 'SPF 58 PA++++' },
];

export const CONCERN_OPTIONS: Array<{ slug: string; label: string }> = [
  { slug: 'acne', label: 'Acne · post-acne' },
  { slug: 'pigmentation', label: 'Pigmentation' },
  { slug: 'anti-ageing', label: 'Anti-ageing' },
  { slug: 'hydration', label: 'Barrier · hydration' },
];

export const TYPE_OPTIONS: Array<{ slug: ProductType; label: string }> = (
  Object.entries(PRODUCT_TYPE_LABELS) as Array<[ProductType, string]>
).map(([slug, label]) => ({ slug, label }));
