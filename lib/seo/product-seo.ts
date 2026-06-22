/**
 * Per-SKU and per-bundle SEO metadata — keyword-targeted titles,
 * descriptions, and Schema.org fields aligned with the Google Ads
 * keyword clusters (see ClarteMD_Google_Ads_Build_Sheet).
 *
 * Drives BOTH the on-page <title>/<meta description> (generateMetadata)
 * and the Product/bundle JSON-LD (`description`, `category`, `keywords`).
 * Keeping ad keywords, page copy, and structured data in one place is
 * what closes the "ad keyword ↔ landing page" relevance gap that hurts
 * Google Ads Quality Score / Ad Rank.
 *
 * SKUs / slugs not listed fall back to the generic name + actives
 * template, so this map is purely additive.
 */

export interface ProductSeo {
  /** Keyword-led <title> (brand suffix `· Clarté MD` is appended by the template). */
  seoTitle: string;
  /** Lead clause for the meta description + JSON-LD description. */
  descriptionLead: string;
  /** Comma-joined Schema.org keywords (mirrors the ad keyword cluster). */
  keywords: string;
  /** Schema.org Product category. */
  category: string;
}

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  rescue: {
    seoTitle: 'Salicylic Acid Face Wash for Oily Skin — Rescue Wash',
    descriptionLead:
      'A 2% salicylic acid face wash for oily, acne-prone skin — an oil-control cleanser that clears pimples, blackheads, and congestion',
    keywords:
      'salicylic acid face wash, salicylic acid cleanser, face wash for oily skin, oil control face wash, face wash for pimples, face wash for blackheads',
    category: 'Facial Cleanser',
  },
  acne: {
    seoTitle: 'Azelaic Acid & Niacinamide Serum for Acne',
    descriptionLead:
      'A niacinamide 10% + azelaic acid 10% serum for acne — calms active pimples and breakouts and fades post-acne marks',
    keywords:
      'azelaic acid serum, azelaic acid cream, niacinamide serum, niacinamide and azelaic acid, azelaic acid for acne, serum for pimples',
    category: 'Face Serum',
  },
  light: {
    seoTitle: 'Kojic & Tranexamic Acid Cream for Pigmentation',
    descriptionLead:
      'A skin-lightening cream with tranexamic acid 3%, kojic acid, and alpha arbutin — for pigmentation, melasma, and stubborn dark spots',
    keywords:
      'kojic acid cream, tranexamic acid cream, alpha arbutin, skin lightening cream, kojic acid for pigmentation, tranexamic acid for pigmentation',
    category: 'Face Cream',
  },
  spf: {
    seoTitle: 'Non-Comedogenic Sunscreen SPF 50 for Oily Skin',
    descriptionLead:
      'A non-comedogenic SPF 50+ PA++++ sunscreen for oily, acne-prone skin — lightweight oil-control sun protection that helps prevent pigmentation and melasma',
    keywords:
      'sunscreen for oily skin, non comedogenic sunscreen, sunscreen spf 50, best sunscreen for face, sunscreen for pigmentation, sunscreen for melasma',
    category: 'Sunscreen',
  },
};

export interface BundleSeo {
  keywords: string;
  category: string;
}

export const BUNDLE_SEO: Record<string, BundleSeo> = {
  'clear-skin-protocol': {
    keywords:
      'pimple treatment, acne treatment, pimple cream, best pimple cream, salicylic acid, azelaic acid, blackheads, whiteheads, comedones, pimple marks, dark spots, acne scars',
    category: 'Acne Treatment Kit',
  },
  'even-tone-protocol': {
    keywords:
      'pigmentation treatment, hyperpigmentation treatment, melasma treatment, melasma cream, dark spot removal cream, uneven skin tone, skin brightening, tranexamic acid, kojic acid, alpha arbutin',
    category: 'Skin Brightening Kit',
  },
};
