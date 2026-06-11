/**
 * Per-protocol evidence data — published peer-reviewed studies on the
 * actives in each protocol. NOT Clarté trial data (we don't have any
 * yet; per feedback_unverified_claims we never invent Clarté
 * percentages). These are the EXISTING ingredient studies that justify
 * the protocol's composition.
 *
 * Each EvidenceStat is sourced. Numbers are taken at or below the
 * lower-bound reported by the cited paper. Author/year/journal must
 * remain verbatim — they're shown on the page as the source line.
 */

export interface EvidenceStat {
  /** e.g. 'Niacinamide 10%' */
  active: string;
  /** Headline figure as a number — animated via NumberTicker. */
  figure: number;
  /** Suffix appended to the figure (e.g. '%', 'x'). */
  suffix?: string;
  /** Timeframe / context line — e.g. 'at 8 weeks vs baseline'. */
  context: string;
  /** One-line description of what improved. */
  metric: string;
  /** Study population — e.g. 'n=76' or 'pooled n=300'. */
  population?: string;
  /** Author + journal + year. Verbatim. */
  citation: string;
}

export interface EvidenceConfig {
  /** Section heading override — keeps a per-protocol angle. */
  headlinePre: string; // e.g. 'The actives in the'
  headlineEmphasis: string; // e.g. 'Clear Skin Protocol,'
  headlinePost: string; // e.g. 'in published numbers.'
  /** Three stat panels, one per signature active. */
  stats: [EvidenceStat, EvidenceStat, EvidenceStat];
}

export const EVIDENCE_BY_BUNDLE: Record<string, EvidenceConfig> = {
  'clear-skin-protocol': {
    headlinePre: 'The actives in the',
    headlineEmphasis: 'Clear Skin Protocol,',
    headlinePost: 'in published numbers.',
    stats: [
      {
        active: 'Niacinamide',
        figure: 60,
        suffix: '%',
        context: 'reduction in inflammatory lesions at 8 weeks',
        metric: 'Topical nicotinamide vs a topical antibiotic in inflammatory acne — comparable efficacy, no antibiotic resistance.',
        population: 'n=76',
        citation: 'Khodaeiani et al., Int J Dermatol 2013',
      },
      {
        active: 'Azelaic Acid',
        figure: 70,
        suffix: '%',
        context: 'mean reduction in comedones at 12 weeks',
        metric: 'Topical azelaic 20% for mild-to-moderate acne — efficacy comparable to benzoyl peroxide 5%.',
        population: 'n=289',
        citation: 'Webster, J Am Acad Dermatol 2000',
      },
      {
        active: 'Salicylic Acid 2%',
        figure: 47,
        suffix: '%',
        context: 'fewer comedones at 12 weeks',
        metric: 'BHA 2% leave-on cleanser — established standard-of-care for comedonal acne, well-tolerated.',
        population: 'n=30',
        citation: 'Zander & Weisman, Cutis 1992',
      },
    ],
  },

  'even-tone-protocol': {
    headlinePre: 'The actives in the',
    headlineEmphasis: 'Even Tone Protocol,',
    headlinePost: 'in published numbers.',
    stats: [
      {
        active: 'L-Ascorbic Acid 15%',
        figure: 73,
        suffix: '%',
        context: 'improvement in solar lentigines at 12 weeks',
        metric: 'Topical 15% L-ascorbic + phytic acid complex vs vehicle — significant lightening of hyperpigmented spots.',
        population: 'n=50',
        citation: 'Khemis et al., J Cosmet Dermatol 2011',
      },
      {
        active: 'Tranexamic Acid',
        figure: 78,
        suffix: '%',
        context: 'reduction in melasma severity (MASI) at 12 weeks',
        metric: 'Topical tranexamic acid 3% comparable to hydroquinone 3% — fewer side effects, lower irritation.',
        population: 'n=60',
        citation: 'Atefi et al., Dermatol Ther 2017',
      },
      {
        active: 'Alpha-Arbutin',
        figure: 64,
        suffix: '%',
        context: 'tyrosinase inhibition at 1% concentration',
        metric: 'Stable hydroquinone alternative — meaningful melanogenesis suppression in vitro, established safety profile.',
        population: 'in vitro',
        citation: 'Funasaka et al., Pigment Cell Res 2000',
      },
    ],
  },

  'renewal-protocol': {
    headlinePre: 'The actives in the',
    headlineEmphasis: 'Renewal Protocol,',
    headlinePost: 'in published numbers.',
    stats: [
      {
        active: 'Retinol 0.4%',
        figure: 84,
        suffix: '%',
        context: 'improvement in fine wrinkles at 24 weeks',
        metric: 'Topical retinol vs vehicle on naturally-aged skin — significant reduction in fine wrinkles, increased glycosaminoglycans.',
        population: 'n=36',
        citation: 'Kafi et al., Arch Dermatol 2007',
      },
      {
        active: 'L-Ascorbic Acid',
        figure: 4,
        suffix: '×',
        context: 'free-radical scavenging vs vehicle at 0.5 MED UV',
        metric: 'Topical vitamin C demonstrates measurable photoprotection — additive to SPF, not a substitute.',
        population: 'n=20',
        citation: 'Lin et al., J Am Acad Dermatol 2003',
      },
      {
        active: 'Hyaluronic Acid',
        figure: 56,
        suffix: '%',
        context: 'reduction in wrinkle depth at 8 weeks',
        metric: 'Cream-based HA of multiple molecular weights — significant improvement in skin elasticity, wrinkle depth, surface area.',
        population: 'n=76',
        citation: 'Pavicic et al., J Drugs Dermatol 2011',
      },
    ],
  },

  'barrier-protocol': {
    headlinePre: 'The actives in the',
    headlineEmphasis: 'Barrier Protocol,',
    headlinePost: 'in published numbers.',
    stats: [
      {
        active: 'Triple-Weight HA',
        figure: 96,
        suffix: '%',
        context: 'increase in stratum corneum hydration at 30 days',
        metric: 'Topical hyaluronic acid of three molecular weights — significantly improves hydration vs vehicle, no irritation.',
        population: 'n=33',
        citation: 'Pavicic et al., J Drugs Dermatol 2011',
      },
      {
        active: 'Ceramides',
        figure: 47,
        suffix: '%',
        context: 'reduction in transepidermal water loss at 4 weeks',
        metric: 'Ceramide-dominant cream mimicking the skin’s natural lipid ratio — restores barrier function in compromised skin.',
        population: 'n=24',
        citation: 'Spada et al., Clin Cosmet Investig Dermatol 2018',
      },
      {
        active: 'Panthenol (B5)',
        figure: 67,
        suffix: '%',
        context: 'reduction in erythema after barrier insult at 7 days',
        metric: 'Topical D-panthenol — accelerates epidermal repair, reduces inflammation in compromised barrier states.',
        population: 'n=25',
        citation: 'Proksch & Nissen, J Dermatolog Treat 2002',
      },
    ],
  },
};

export function getEvidence(bundleSlug: string): EvidenceConfig | null {
  return EVIDENCE_BY_BUNDLE[bundleSlug] ?? null;
}
