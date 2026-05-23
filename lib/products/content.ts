/**
 * Per-SKU rich content for the single product page, transcribed from
 * the operator-supplied product description docs on 2026-05-19.
 *
 * The DB's `products` table stores commerce facts (price, SKU, actives
 * line). This file holds the editorial content (benefits, ingredients
 * table, directions, important warnings) that the PDP renders.
 *
 * Image paths follow the convention public/products/<sku>/hero.webp +
 * view-{1,2,3}.webp produced by scripts/optimize-product-images.ts.
 */

export interface ProductIngredient {
  name: string;
  role: string;
}

export interface ProductContent {
  /** Eyebrow tags shown under the title, e.g. ['Anti-Aging', 'Renewing']. */
  tags: string[];
  /** Trust badges, e.g. ['Physician-Formulated', 'Cruelty-Free', ...]. */
  badges: string[];
  /** Single-line spec, e.g. '30ml / 1.0 fl oz · Suitable for All Skin Types'. */
  formulation: string;
  /**
   * Italic Fraunces microcopy shown under the PDP CTA — EltaMD pattern
   * (03-pdp.md). Descriptive only ("Best for X type prone to Y") — never
   * a clinical claim. Optional: omitted when no honest line exists.
   */
  bestFor?: string;
  /** Bulleted benefit copy — each item already begins with the bolded lead phrase. */
  benefits: string[];
  /** Two-column ingredient table. */
  ingredients: ProductIngredient[];
  /** Numbered usage steps. */
  directions: string[];
  /**
   * Optional per-step duration string, runs parallel to `directions` by
   * index — e.g. ['', '45s', '1 min', 'until absorbed']. Bader pattern
   * (03-pdp.md): customers process routines faster when each step has a
   * concrete time cost. Empty string = no duration shown for that step.
   */
  directionDurations?: string[];
  /** Bulleted safety / storage notes. */
  important: string[];
}

export const PRODUCT_CONTENT: Record<string, ProductContent> = {
  reti: {
    tags: ['Anti-Aging', 'Renewing'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Dermatologist Tested',
    ],
    formulation: 'For all skin types · 30ml / 1.0 fl oz',
    bestFor: 'Best for fine lines, texture, and skin renewal — evening use only.',
    benefits: [
      'Visibly firms and tightens skin with clinically-proven Retinol at the cellular level',
      'Accelerates cellular renewal for a smoother, more refined skin texture over time',
      'Delivers deep, lasting hydration through Sodium Hyaluronate to replenish as it renews',
      'Reduces the appearance of fine lines, wrinkles, and uneven tone with consistent nightly use',
      'Rebuilds collagen and steadily erases visible damage caused by time, stress, and sun exposure',
    ],
    ingredients: [
      { name: 'Retinol', role: 'Gold-standard anti-aging active that accelerates skin turnover and rebuilds collagen' },
      { name: 'Niacinamide', role: 'Calms potential retinol-induced irritation and brightens overall skin tone' },
      { name: 'Sodium Hyaluronate', role: 'Deeply penetrating form of Hyaluronic Acid that replenishes and locks in moisture' },
      { name: 'Tocopherol (Vitamin E)', role: 'Protects the skin barrier and nourishes against oxidative stress overnight' },
    ],
    directions: [
      'Use as part of your evening routine only — Retinol should not be applied during the day.',
      'Cleanse face thoroughly and pat dry.',
      'Dispense 2–3 drops onto fingertips.',
      'Apply evenly across face and neck, avoiding the immediate eye area and lips.',
      'Gently press into skin — do not rub.',
      'Follow with your Clarté MD moisturiser to seal in hydration and support the barrier.',
      'If new to Retinol, begin with 2–3 applications per week and gradually increase to nightly use as skin adjusts.',
    ],
    important: [
      'For external use only. Avoid direct contact with eyes and lips. If contact occurs, rinse immediately with water.',
      'For evening use only. Retinol increases photosensitivity — always apply broad-spectrum SPF 30+ the following morning.',
      'Patch test recommended before first use. New Retinol users may experience mild dryness, flaking, or sensitivity during the first 2–4 weeks — this is a normal adjustment phase.',
      'If severe irritation, persistent redness, or peeling occurs, reduce frequency of use and consult a dermatologist or physician.',
      'Do not use during pregnancy or breastfeeding. Retinol is contraindicated for use in pregnant and nursing individuals.',
      'Avoid combining with other strong actives (e.g. AHAs, BHAs, Vitamin C) in the same routine without medical guidance.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.',
    ],
  },

  spf: {
    tags: ['Hydrating', 'Sun Protection'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Dermatologist Tested',
    ],
    formulation: 'For all skin types · 100ml / 3.4 fl oz',
    bestFor: 'Best for daily UV defense after any AM active routine.',
    benefits: [
      'Delivers broad-spectrum SPF 50+ protection against both UVA and UVB damage daily',
      'Actively repairs and rebuilds a compromised skin barrier from the ground up with every application',
      'Provides deep, long-lasting hydration without heaviness, grease, or residue',
      'Supports anti-aging by neutralising free radicals that accelerate premature skin ageing',
      'Replaces multiple routine steps — a complete rehabilitation treatment and sun shield in one',
    ],
    ingredients: [
      { name: 'Zinc Oxide', role: 'Mineral UV filter providing broad-spectrum UVA and UVB protection' },
      { name: 'Ceramides', role: "Rebuild and reinforce the skin's fractured protective barrier from within" },
      { name: 'Shea Butter', role: 'Envelops skin in rich, lasting moisture and nourishment' },
      { name: 'Glycerin', role: 'Attracts and seals in hydration for sustained softness throughout the day' },
      { name: 'D-Panthenol', role: 'Accelerates cellular repair and soothes inflammation and sensitivity' },
      { name: 'Sodium Hyaluronate', role: 'Plumps and hydrates at multiple skin layers for visible fullness' },
      { name: 'Ascorbyl Glucoside', role: 'Stable Vitamin C derivative that neutralises oxidative damage and brightens' },
    ],
    directions: [
      'Apply as the final step of your morning skincare routine, after serums and moisturiser.',
      'Dispense a generous amount — approximately a 2-finger length — onto fingertips.',
      'Apply evenly across the entire face and neck, including often-missed areas such as the hairline, ears, and jawline.',
      'Gently press and smooth into skin until fully absorbed.',
      'Do not rub in vigorously — this may reduce SPF efficacy.',
      'Reapply every 2 hours when outdoors or after sweating and swimming for continued protection.',
      'Use every morning without exception — UV damage occurs even on cloudy days and indoors near windows.',
    ],
    important: [
      'For external use only. Avoid direct contact with eyes. If contact occurs, rinse immediately with water.',
      'Patch test recommended before first use, especially for sensitive, post-treatment, or reactive skin.',
      'If irritation, stinging, or adverse reaction occurs, discontinue use and consult a dermatologist or physician.',
      'Contains Zinc Oxide — a small amount of white cast may be visible on very deep skin tones; blend thoroughly for best results.',
      'Not a substitute for additional sun protection — seek shade, wear protective clothing, and limit peak sun exposure alongside daily SPF use.',
      'Do not apply to broken, wounded, or severely inflamed skin without medical advice.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight. Do not leave in a hot vehicle or direct heat.',
    ],
  },

  vitc: {
    tags: ['Brightening', 'Anti-Aging'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Dermatologist Tested',
    ],
    formulation: 'For all skin types · 30ml / 1.0 fl oz',
    bestFor: 'Best for dullness and uneven tone — apply in the morning.',
    benefits: [
      'Visibly brightens and evens skin tone with every use for a luminous, radiant complexion',
      'Shields against free radical damage and premature ageing with doubled antioxidant potency',
      'Delivers lasting hydration through deep-penetrating Hyaluronic Acid',
      'Gradually fades dark spots and hyperpigmentation for a long-term luminous glow',
      'Transforms overall skin quality — brighter, younger, and clearer with consistent use',
    ],
    ingredients: [
      { name: 'Vitamin C', role: 'Brightens skin tone, fades hyperpigmentation, and defends against environmental damage' },
      { name: 'Ferulic Acid', role: 'Doubles the potency of Vitamin C and provides deep, synergistic antioxidant protection' },
      { name: 'Hyaluronic Acid', role: 'Penetrates deeply to deliver lasting hydration and visibly plump the skin' },
    ],
    directions: [
      'Cleanse face thoroughly and pat dry (ideally with the Clarté MD Radiance Prep Cleanser).',
      'Dispense 2–3 drops onto fingertips.',
      'Apply evenly across face and neck using gentle pressing motions.',
      'Allow to fully absorb — approximately 30–60 seconds — before layering additional products.',
      'Follow with your Clarté MD moisturiser or SPF as the next step.',
      'Recommended for morning use to maximise antioxidant defence against daily environmental aggressors.',
      'Always follow with broad-spectrum SPF 30+ during the day when using Vitamin C formulations.',
    ],
    important: [
      'For external use only. Avoid direct contact with eyes and lips. If contact occurs, rinse immediately with water.',
      'Patch test recommended before first use, especially for sensitive or reactive skin.',
      'If irritation, tingling, or redness occurs and persists beyond initial use, discontinue and consult a dermatologist or physician.',
      'Contains Vitamin C — slight natural discolouration of the serum over time is normal and does not affect efficacy; if the serum turns dark brown or develops an unusual odour, discontinue use.',
      'Always apply SPF after morning use — Vitamin C increases skin sensitivity to UV exposure.',
      'Avoid combining with Retinol or strong AHAs/BHAs in the same routine without medical guidance to prevent irritation.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight. Keep lid tightly closed to preserve Vitamin C stability.',
    ],
  },

  ha: {
    tags: ['Hydrating', 'Plumping'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Dermatologist Tested',
    ],
    formulation: 'For all skin types · 30ml / 1.0 fl oz',
    bestFor: 'Best for dehydrated or barrier-compromised skin.',
    benefits: [
      'Delivers intense, multi-layer hydration that visibly plumps fine lines and restores skin suppleness',
      "Restores skin's natural bounce and reinforces barrier resilience against environmental stressors",
      'Soothes inflammation and calms sensitised or reactive skin with every application',
      'Supports collagen production and promotes long-term deep cellular renewal',
      'Shields against oxidative damage that accelerates premature ageing',
    ],
    ingredients: [
      { name: 'Hyaluronic Acid', role: 'Draws and locks in moisture at every skin layer, visibly plumping and smoothing' },
      { name: 'Pro-Vitamin B5', role: 'Accelerates skin repair and reinforces the protective barrier' },
      { name: 'Niacinamide (Vitamin B3)', role: 'Brightens, evens skin tone, and calms inflammation' },
      { name: 'Green Tea Extract', role: 'Delivers potent antioxidant protection against oxidative and environmental damage' },
      { name: 'Chamomile', role: 'Anti-inflammatory action that soothes and reduces skin reactivity' },
      { name: 'Witch Hazel Extract', role: 'Refines pores and tones skin for a smoother, more refined appearance' },
      { name: 'L-Arginine', role: 'Amino acid that supports collagen synthesis and deep cellular regeneration' },
      { name: 'Glycerine', role: 'Seals in hydration for long-lasting moisture throughout the day and night' },
    ],
    directions: [
      'Cleanse face thoroughly and pat dry.',
      'Dispense 2–3 drops onto fingertips.',
      'Apply evenly across face and neck, pressing gently into skin.',
      'Allow to fully absorb — approximately 30–60 seconds.',
      'Follow with your Clarté MD moisturiser to seal in hydration.',
      'Use daily, morning and/or evening, as part of your Clarté MD routine.',
      'For best results, apply to slightly damp skin to maximise Hyaluronic Acid absorption.',
    ],
    directionDurations: ['60s', '', '20s', '30–60s', '', '', ''],
    important: [
      'For external use only. Avoid direct contact with eyes. If contact occurs, rinse immediately with water.',
      'Patch test recommended before first use, especially for sensitive or reactive skin.',
      'If irritation or adverse reaction occurs, discontinue use and consult a dermatologist or physician.',
      'Contains Witch Hazel Extract — those with extremely sensitive or rosacea-prone skin should perform a patch test before full application.',
      'Apply SPF during daytime use to protect renewed skin from UV exposure.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.',
    ],
  },

  prep: {
    tags: ['Brightening', 'Clarifying'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Fragrance-Free',
      'Dermatologist Tested',
    ],
    formulation: 'For all skin types · 100ml / 3.4 fl oz',
    bestFor: 'Best for a gentle daily cleanse before any active routine.',
    benefits: [
      "Gently cleanses without disrupting the skin's natural moisture barrier",
      'Initiates brightening and pigmentation control from the very first step of your routine',
      'Refines and smooths skin texture with each wash for a consistently even complexion',
      'Prepares skin to absorb subsequent serums and treatments with maximum efficacy',
      'Builds visible luminosity over time with consistent daily use',
    ],
    ingredients: [
      { name: 'Glutathione', role: 'Master antioxidant that inhibits melanin formation and initiates visible skin luminosity' },
      { name: 'Sodium Lactate', role: 'Gently exfoliates and refines texture by dissolving dull, dead surface cells' },
      { name: 'Citric Acid', role: "Brightens and balances the skin's pH for optimal active ingredient absorption" },
      { name: 'Alkyl Acrylates', role: 'Creates a weightless, silky finish and refines skin feel after cleansing' },
    ],
    directions: [
      'Wet face with lukewarm water.',
      'Apply a small amount of the Radiance Prep Cleanser to your fingertips.',
      'Gently massage onto face in circular motions for 30–60 seconds.',
      'Rinse thoroughly with water and pat dry.',
      'Proceed immediately with your Clarté MD serum or treatment for maximum absorption.',
      'Use daily, morning and/or evening, as the first step of your Clarté MD routine.',
    ],
    directionDurations: ['10s', '', '30–60s', '20s', '', ''],
    important: [
      'For external use only. Avoid direct contact with eyes. If contact occurs, rinse immediately with water.',
      'Patch test recommended before first use, especially for sensitive or reactive skin.',
      'If irritation, redness, or discomfort occurs, discontinue use and consult a dermatologist or physician.',
      'Contains Citric Acid — apply SPF during daytime use to protect freshly exfoliated skin from UV-induced sensitivity and pigmentation.',
      'Contains Glutathione — results build with consistent daily use; avoid skipping applications for best brightening outcomes.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.',
    ],
  },

  light: {
    tags: ['Brightening', 'Hydrating'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Dermatologist Tested',
    ],
    formulation: 'For all skin types · 30ml / 1.0 fl oz',
    bestFor: 'Best for melasma and hyperpigmentation across all skin tones.',
    benefits: [
      'Visibly lifts dark spots, melasma, and uneven pigmentation over time without harmful ingredients',
      'Deeply hydrates and smooths skin texture with every application for a healthier complexion',
      'Provides UV protection to actively prevent pigmentation from returning or worsening',
      'Strengthens and nourishes the skin barrier with a rich antioxidant complex',
      'Interrupts melanin production at every stage for comprehensive, gradual brightening',
    ],
    ingredients: [
      { name: 'L-Glutathione', role: 'Master antioxidant that inhibits melanin synthesis and promotes overall luminosity' },
      { name: 'Alpha Arbutin', role: 'Targets and suppresses melanin production for visible dark spot reduction' },
      { name: 'Kojic Acid', role: 'Brightening agent that lifts existing pigmentation and evens skin tone' },
      { name: 'Niacinamide', role: 'Interrupts melanin transfer, refines pores, and calms inflammation' },
      { name: 'Sodium Ascorbyl Phosphate', role: 'Stable Vitamin C derivative that brightens and protects against oxidative damage' },
      { name: 'Liquorice Extract', role: 'Natural skin-brightener that soothes and reduces hyperpigmentation' },
      { name: 'Hyaluronic Acid', role: 'Delivers profound, lasting hydration at multiple skin layers' },
      { name: 'Glycerine', role: 'Seals in moisture and maintains barrier softness throughout the day' },
      { name: 'Avobenzone', role: 'Provides UV protection to guard against rays that trigger pigmentation' },
      { name: 'Vitamin E & Tocopheryl Acetate', role: 'Seals in nourishment and shields the barrier from oxidative stress' },
    ],
    directions: [
      'Cleanse face thoroughly and pat dry (ideally with the Clarté MD Radiance Prep Cleanser).',
      'Apply any Clarté MD serums first and allow to fully absorb.',
      'Take a small amount of the Radiance Lightening Cream and warm between fingertips.',
      'Apply evenly across face and neck using gentle upward strokes.',
      'Press lightly into skin — do not rub aggressively.',
      'Use daily, morning and/or evening, as the final step of your Clarté MD routine.',
      'For daytime use, follow with a broad-spectrum SPF 30+ for enhanced pigmentation protection.',
    ],
    important: [
      'For external use only. Avoid direct contact with eyes and lips. If contact occurs, rinse immediately with water.',
      'Patch test recommended before first use, particularly for sensitive or reactive skin.',
      'If irritation, stinging, or adverse reaction occurs, discontinue use and consult a dermatologist or physician.',
      'Contains Kojic Acid and Alpha Arbutin — results are gradual; avoid discontinuing use prematurely for best outcomes.',
      'Contains Avobenzone — provides some UV protection, but a dedicated broad-spectrum SPF is still strongly recommended for daytime use.',
      'Not recommended for use during pregnancy or breastfeeding without prior medical consultation, due to the concentration of active brightening agents.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.',
    ],
  },

  rescue: {
    tags: ['Clarifying', 'Anti-Acne'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Fragrance-Free',
      'Dermatologist Tested',
    ],
    formulation: 'For acne-prone skin · 100ml / 3.4 fl oz',
    bestFor: 'Best for combination + oily skin types prone to congestion.',
    benefits: [
      'Deeply unclogs pores and controls excess oil production to prevent future breakouts',
      'Eliminates acne-causing bacteria with the combined power of Tea Tree Oil and Salicylic Acid',
      'Calms active inflammation and reduces post-acne dark marks and hyperpigmentation',
      'Soothes and hydrates to maintain a healthy, resilient skin barrier — no stripping, no compromise',
    ],
    ingredients: [
      { name: 'Tea Tree Oil', role: 'Antimicrobial action that neutralises acne-causing bacteria at the source' },
      { name: 'Niacinamide', role: 'Calms redness, reduces inflammation, and fades post-acne marks' },
      { name: 'Aloe Vera Extract', role: 'Soothes and replenishes the skin barrier' },
      { name: 'Glycerine', role: 'Hydrates without compromising barrier integrity' },
      { name: 'Vitamin E Beads', role: 'Delivers antioxidant nourishment with every wash' },
    ],
    directions: [
      'Wet face with lukewarm water.',
      'Apply a small amount of the Clarifying Rescue Wash to your fingertips.',
      'Gently massage onto face in circular motions for 30–60 seconds, focusing on breakout-prone areas.',
      'Rinse thoroughly with water.',
      'Follow with your Clarté MD moisturiser or treatment serum.',
      'Use daily, morning and/or evening, for best results.',
    ],
    important: [
      'For external use only. Avoid direct contact with eyes. If contact occurs, rinse immediately with water.',
      'Patch test recommended before first use, especially for sensitive or reactive skin.',
      'If irritation, redness, or discomfort occurs, discontinue use and consult a physician.',
      'Contains Salicylic Acid — avoid use if pregnant or breastfeeding without medical advice.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.',
    ],
  },

  acne: {
    tags: ['Clarifying', 'Anti-Acne'],
    badges: [
      'Physician-Formulated',
      'Cruelty-Free',
      'Paraben-Free',
      'Vegan',
      'Dermatologist Tested',
    ],
    formulation: 'For all skin types · 30ml / 1.0 fl oz',
    bestFor: 'Best for active breakouts and post-acne marks.',
    benefits: [
      'Targets and eliminates active breakouts at the source before they escalate',
      'Visibly minimises pores and refines skin texture for a smoother, more even complexion',
      'Reduces redness and inflammation with every application for calmer, clearer skin',
      'Prevents post-acne dark spots and promotes ongoing skin renewal',
      'Maintains barrier hydration throughout the clearing process — no compromise on skin health',
    ],
    ingredients: [
      { name: 'Azelaic Acid', role: 'Calms inflammation and prevents post-acne dark marks and hyperpigmentation' },
      { name: 'Tea Tree Oil', role: 'Neutralises acne-causing bacteria and reduces active blemishes' },
      { name: 'Niacinamide', role: 'Refines and visibly minimises pores while improving overall skin texture' },
      { name: 'Allantoin', role: 'Soothes sensitised and reactive skin' },
      { name: 'Hyaluronic Acid', role: 'Keeps the skin barrier hydrated and intact throughout the treatment process' },
    ],
    directions: [
      'Cleanse face thoroughly and pat dry (ideally with the Clarté MD Clarifying Rescue Wash).',
      'Dispense 2–3 drops of serum onto fingertips.',
      'Apply evenly across the face, or directly onto breakout-prone areas as a targeted treatment.',
      'Gently press into skin — do not rub.',
      'Allow to fully absorb before applying moisturiser or SPF.',
      'Use daily, morning and/or evening, as part of your Clarté MD routine.',
    ],
    important: [
      'For external use only. Avoid contact with eyes, lips, and mucous membranes. If contact occurs, rinse immediately with water.',
      'Patch test recommended before first use, particularly for sensitive or reactive skin.',
      'If irritation, burning, or persistent redness occurs, discontinue use and consult a dermatologist or physician.',
      'Contains Salicylic Acid and Azelaic Acid — consult a medical professional before use if pregnant or breastfeeding.',
      'Use SPF during the day when using active acid formulations to protect against UV-induced sensitivity.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.',
    ],
  },
};

/** Returns the local image gallery paths for a given SKU. */
export function productImagePaths(sku: string) {
  return {
    hero: `/products/${sku}/hero.webp`,
    views: [
      `/products/${sku}/view-1.webp`,
      `/products/${sku}/view-2.webp`,
      `/products/${sku}/view-3.webp`,
    ],
  };
}
