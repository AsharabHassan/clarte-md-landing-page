export interface ProtocolVisualStudy {
  id: string;
  label: string;
  condition: string;
  week: string;
  area: string;
  beforeSrc?: string;
  afterSrc?: string;
  pairSrc?: string;
}

export interface ProtocolVisualStudySet {
  bundleSlug: string;
  title: string;
  eyebrow: string;
  intro: string;
  cases: ProtocolVisualStudy[];
}

const visualStudyPath = (bundleSlug: string, fileName: string) =>
  // Source assets are converted PNG → WebP at build-time via
  // scripts/optimize-content-images.ts. Rewrite any incoming PNG/JPG
  // request to its .webp sibling — saves ~2 MB per case image.
  `/protocols/${bundleSlug}/visual-studies/${fileName.replace(/\.(png|jpe?g)$/i, '.webp')}`;

export const PROTOCOL_VISUAL_STUDIES: Record<string, ProtocolVisualStudySet> = {
  'clear-skin-protocol': {
    bundleSlug: 'clear-skin-protocol',
    title: 'Clear Skin Visual Studies',
    eyebrow: 'Acne, congestion, and PIH',
    intro:
      'Condition-specific AI visual studies showing realistic skin-zoom changes across active breakouts, post-acne marks, congestion, and redness.',
    cases: [
      {
        id: 'case-01',
        label: 'Inflamed cheek acne',
        condition: 'Active papules, redness, post-acne marks',
        week: 'Week 12',
        area: 'Cheek crop',
        beforeSrc: visualStudyPath('clear-skin-protocol', 'case-01-before.png'),
        afterSrc: visualStudyPath('clear-skin-protocol', 'case-01-after.png'),
      },
      {
        id: 'case-02',
        label: 'Jawline breakouts',
        condition: 'Clustered acne and healing marks',
        week: 'Week 12',
        area: 'Jawline crop',
        pairSrc: visualStudyPath('clear-skin-protocol', 'case-02-pair.png'),
      },
      {
        id: 'case-03',
        label: 'Forehead congestion',
        condition: 'Closed comedones and uneven texture',
        week: 'Week 10',
        area: 'Forehead crop',
        pairSrc: visualStudyPath('clear-skin-protocol', 'case-03-pair.png'),
      },
      {
        id: 'case-04',
        label: 'Post-acne marks',
        condition: 'PIH, roughness, and healing blemishes',
        week: 'Week 14',
        area: 'Cheek crop',
        pairSrc: visualStudyPath('clear-skin-protocol', 'case-04-pair.png'),
      },
      {
        id: 'case-05',
        label: 'Oily pores',
        condition: 'Shine, papules, and visible pores',
        week: 'Week 12',
        area: 'Cheek and pore crop',
        pairSrc: visualStudyPath('clear-skin-protocol', 'case-05-pair.png'),
      },
      {
        id: 'case-06',
        label: 'Mixed lower-face acne',
        condition: 'Redness, clogged pores, and PIH',
        week: 'Week 12',
        area: 'Lower-face crop',
        pairSrc: visualStudyPath('clear-skin-protocol', 'case-06-pair.png'),
      },
    ],
  },
  'even-tone-protocol': {
    bundleSlug: 'even-tone-protocol',
    title: 'Even Tone Visual Studies',
    eyebrow: 'Melasma, hyperpigmentation, and uneven tone',
    intro:
      'Condition-specific AI visual studies showing realistic pigment softening without implying perfect clearance.',
    cases: [
      {
        id: 'case-01',
        label: 'Cheek melasma',
        condition: 'Patchy hyperpigmentation and uneven tone',
        week: 'Week 12',
        area: 'Cheek crop',
        beforeSrc: visualStudyPath('even-tone-protocol', 'case-01-before.png'),
        afterSrc: visualStudyPath('even-tone-protocol', 'case-01-after.png'),
      },
      {
        id: 'case-02',
        label: 'Sun spots',
        condition: 'Temple pigmentation and uneven tan',
        week: 'Week 12',
        area: 'Temple crop',
        pairSrc: visualStudyPath('even-tone-protocol', 'case-02-pair.png'),
      },
      {
        id: 'case-03',
        label: 'Post-inflammatory pigment',
        condition: 'Brown marks after blemishes',
        week: 'Week 10',
        area: 'Cheek crop',
        pairSrc: visualStudyPath('even-tone-protocol', 'case-03-pair.png'),
      },
      {
        id: 'case-04',
        label: 'Dull uneven tone',
        condition: 'Patchiness, sallowness, and texture',
        week: 'Week 12',
        area: 'Lower-cheek crop',
        pairSrc: visualStudyPath('even-tone-protocol', 'case-04-pair.png'),
      },
      {
        id: 'case-05',
        label: 'Perioral pigmentation',
        condition: 'Lower-face discoloration and dryness',
        week: 'Week 14',
        area: 'Perioral crop',
        pairSrc: visualStudyPath('even-tone-protocol', 'case-05-pair.png'),
      },
      {
        id: 'case-06',
        label: 'Patchy discoloration',
        condition: 'Forehead and upper-cheek pigment clusters',
        week: 'Week 12',
        area: 'Forehead crop',
        pairSrc: visualStudyPath('even-tone-protocol', 'case-06-pair.png'),
      },
    ],
  },
  'renewal-protocol': {
    bundleSlug: 'renewal-protocol',
    title: 'Renewal Visual Studies',
    eyebrow: 'Fine lines, pores, texture, and dullness',
    intro:
      'Condition-specific AI visual studies showing subtle renewal: texture refinement, improved hydration, and softened early ageing signs.',
    cases: [
      {
        id: 'case-01',
        label: 'Fine lines and texture',
        condition: 'Upper-cheek lines, dullness, early photoageing',
        week: 'Week 12',
        area: 'Upper-cheek crop',
        beforeSrc: visualStudyPath('renewal-protocol', 'case-01-before.png'),
        afterSrc: visualStudyPath('renewal-protocol', 'case-01-after.png'),
      },
      {
        id: 'case-02',
        label: 'Forehead lines',
        condition: 'Fine lines, roughness, and dullness',
        week: 'Week 12',
        area: 'Forehead crop',
        pairSrc: visualStudyPath('renewal-protocol', 'case-02-pair.png'),
      },
      {
        id: 'case-03',
        label: 'Pores and roughness',
        condition: 'Visible pores and uneven texture',
        week: 'Week 10',
        area: 'Cheek crop',
        pairSrc: visualStudyPath('renewal-protocol', 'case-03-pair.png'),
      },
      {
        id: 'case-04',
        label: 'Early photoageing',
        condition: 'Sun texture, faint lines, uneven radiance',
        week: 'Week 12',
        area: 'Cheek crop',
        pairSrc: visualStudyPath('renewal-protocol', 'case-04-pair.png'),
      },
      {
        id: 'case-05',
        label: 'Crepey texture',
        condition: 'Under-eye and upper-cheek fine texture',
        week: 'Week 14',
        area: 'Upper-cheek crop',
        pairSrc: visualStudyPath('renewal-protocol', 'case-05-pair.png'),
      },
      {
        id: 'case-06',
        label: 'Dullness and firmness',
        condition: 'Lower-cheek dullness and mild laxity',
        week: 'Week 12',
        area: 'Lower-cheek crop',
        pairSrc: visualStudyPath('renewal-protocol', 'case-06-pair.png'),
      },
    ],
  },
  'barrier-protocol': {
    bundleSlug: 'barrier-protocol',
    title: 'Barrier Visual Studies',
    eyebrow: 'Redness, dehydration, sensitivity, and flaking',
    intro:
      'Condition-specific AI visual studies showing realistic barrier support: calmer redness, better hydration, and reduced roughness.',
    cases: [
      {
        id: 'case-01',
        label: 'Redness and dehydration',
        condition: 'Cheek redness, tightness, rough surface',
        week: 'Week 12',
        area: 'Cheek crop',
        beforeSrc: visualStudyPath('barrier-protocol', 'case-01-before.png'),
        afterSrc: visualStudyPath('barrier-protocol', 'case-01-after.png'),
      },
      {
        id: 'case-02',
        label: 'Flaky barrier texture',
        condition: 'Dry patches, roughness, dullness',
        week: 'Week 10',
        area: 'Cheek and jaw crop',
        pairSrc: visualStudyPath('barrier-protocol', 'case-02-pair.png'),
      },
      {
        id: 'case-03',
        label: 'Reactive redness',
        condition: 'Flushing, irritation, uneven patches',
        week: 'Week 12',
        area: 'Cheek crop',
        pairSrc: visualStudyPath('barrier-protocol', 'case-03-pair.png'),
      },
      {
        id: 'case-04',
        label: 'Rough dry patches',
        condition: 'Scaly texture, dryness, and mild redness',
        week: 'Week 12',
        area: 'Lower-cheek crop',
        pairSrc: visualStudyPath('barrier-protocol', 'case-04-pair.png'),
      },
      {
        id: 'case-05',
        label: 'Sensitivity and flushing',
        condition: 'Pink-red surface and tight dehydration',
        week: 'Week 14',
        area: 'Cheek crop',
        pairSrc: visualStudyPath('barrier-protocol', 'case-05-pair.png'),
      },
      {
        id: 'case-06',
        label: 'Compromised barrier',
        condition: 'Dull dehydration, flaking, roughness',
        week: 'Week 12',
        area: 'Lower-face crop',
        pairSrc: visualStudyPath('barrier-protocol', 'case-06-pair.png'),
      },
    ],
  },
};

export function getProtocolVisualStudies(bundleSlug: string) {
  return PROTOCOL_VISUAL_STUDIES[bundleSlug];
}
