/**
 * Customer reviews — static, hand-curated data source.
 *
 * Per [[feedback_unverified_claims]]: every entry here must be a REAL,
 * verifiable review before it goes live. The seed rows below are clearly
 * marked placeholders — swap the names, copy, ratings, and photo paths for
 * genuine customer testimonials (with the customer's consent for any photo).
 *
 * Photos reference files already in /public. Each review may attach 0..n
 * photos (before/after, result shots, the parcel, etc). The <Reviews />
 * component renders them as a thumbnail strip that opens a lightbox.
 *
 * The homepage summary figures (average rating + count) are COMPUTED from
 * this array — never hard-coded — so the headline number stays honest as
 * the list grows or shrinks.
 */

export interface ReviewPhoto {
  src: string;
  alt: string;
  /** Optional label shown over the thumbnail + as the lightbox caption. */
  caption?: string;
}

export interface Review {
  id: string;
  name: string;
  /** City / region — local trust signal. */
  location: string;
  /** 1–5, halves allowed (e.g. 4.5). */
  rating: number;
  /** Which protocol/product this review is about — shown as a mono tag. */
  protocol?: string;
  /** ISO date (YYYY-MM-DD) — used for the "verified · <month year>" line. */
  date: string;
  /** Verified-buyer badge. Only set true for orders you can match. */
  verified?: boolean;
  body: string;
  photos?: ReviewPhoto[];
}

// ── PLACEHOLDER DATA — replace with real, consented reviews ────────────
export const REVIEWS: Review[] = [
  {
    id: 'r-aisha-lhr',
    name: 'Aisha R.',
    location: 'Lahore',
    rating: 5,
    protocol: 'Clear Skin Protocol · Week 12',
    date: '2026-04-18',
    verified: true,
    body: 'Twelve weeks in and the active breakouts are gone — what surprised me most was the post-acne marks fading. I followed the routine exactly as the card said. The WhatsApp follow-ups kept me on track.',
    photos: [
      {
        src: '/protocols/clear-skin-protocol/visual-studies/case-01-before.webp',
        alt: 'Aisha — skin before starting the Clear Skin Protocol',
        caption: 'Before',
      },
      {
        src: '/protocols/clear-skin-protocol/visual-studies/case-01-after.webp',
        alt: 'Aisha — skin after 12 weeks on the Clear Skin Protocol',
        caption: 'After · Week 12',
      },
    ],
  },
  {
    id: 'r-fatima-khi',
    name: 'Fatima S.',
    location: 'Karachi',
    rating: 5,
    protocol: 'Even Tone Protocol',
    date: '2026-04-02',
    verified: true,
    body: 'My melasma has been the bane of my life for years. This is the first thing that actually evened my tone without irritating my skin. The SPF in the kit is the best I have used in Pakistan.',
    photos: [
      {
        src: '/protocols/even-tone-protocol/visual-studies/case-02-pair.webp',
        alt: 'Fatima — before and after the Even Tone Protocol',
        caption: 'Before / after',
      },
    ],
  },
  {
    id: 'r-bilal-isb',
    name: 'Bilal A.',
    location: 'Islamabad',
    rating: 4,
    protocol: 'Barrier Protocol',
    date: '2026-03-21',
    verified: true,
    body: 'I have very reactive skin and most products sting. The Barrier Protocol calmed everything down within two weeks — no actives, just genuine repair. Took half a star off only because I wanted it to ship faster.',
  },
  {
    id: 'r-sana-lhr',
    name: 'Sana M.',
    location: 'Lahore',
    rating: 5,
    protocol: 'Renewal Protocol',
    date: '2026-03-09',
    verified: true,
    body: 'The texture on my cheeks has visibly smoothed and my skin looks brighter in photos. The retinol was introduced gently enough that I never peeled. Sealed packaging and a real doctor behind it — that is why I trusted it.',
    photos: [
      {
        src: '/protocols/renewal-protocol/visual-studies/case-03-pair.webp',
        alt: 'Sana — before and after the Renewal Protocol',
        caption: 'Before / after',
      },
    ],
  },
  {
    id: 'r-hamza-fsd',
    name: 'Hamza K.',
    location: 'Faisalabad',
    rating: 5,
    protocol: 'Clear Skin Protocol',
    date: '2026-02-26',
    verified: true,
    body: 'Cash on delivery made it easy to try without risk. The acne serum is the real deal — niacinamide and azelaic at proper strengths. Cleared my jawline breakouts that nothing else touched.',
    photos: [
      {
        src: '/protocols/clear-skin-protocol/visual-studies/case-04-pair.webp',
        alt: 'Hamza — before and after the Clear Skin Protocol',
        caption: 'Before / after',
      },
    ],
  },
  {
    id: 'r-zainab-khi',
    name: 'Zainab T.',
    location: 'Karachi',
    rating: 4,
    protocol: 'Even Tone Protocol · Week 10',
    date: '2026-02-11',
    verified: true,
    body: 'Pigmentation around my mouth has lightened noticeably. I appreciated that the AI quiz routed me to this rather than just selling me everything. Honest brand, honest results.',
  },
  {
    id: 'r-usman-mux',
    name: 'Usman K.',
    location: 'Multan',
    rating: 3,
    protocol: 'Renewal Protocol',
    date: '2026-01-29',
    verified: true,
    body: 'The results were solid by week 10 — texture and brightness both improved. Knocking off a couple of stars because my first parcel was delayed and I had to follow up on WhatsApp. Once it arrived, the products did exactly what was promised.',
    photos: [
      {
        src: '/protocols/renewal-protocol/visual-studies/case-05-pair.webp',
        alt: 'Usman — before and after the Renewal Protocol',
        caption: 'Before / after',
      },
    ],
  },
];

/** Star buckets 1–5, rounded from each review's rating. */
export type StarBucket = 1 | 2 | 3 | 4 | 5;

export interface ReviewStats {
  count: number;
  /** Average rating, 1 decimal. */
  average: number;
  /** How many reviews include at least one photo. */
  withPhotos: number;
  /** Count of reviews per rounded star bucket (5 → 1). */
  distribution: Record<StarBucket, number>;
}

/** Computed, honest aggregate for the section header + filter counts. */
export function reviewStats(reviews: Review[] = REVIEWS): ReviewStats {
  const count = reviews.length;
  const average =
    count === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / count;

  const distribution: Record<StarBucket, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let withPhotos = 0;
  for (const r of reviews) {
    const bucket = Math.min(5, Math.max(1, Math.round(r.rating))) as StarBucket;
    distribution[bucket] += 1;
    if (r.photos && r.photos.length > 0) withPhotos += 1;
  }

  return {
    count,
    average: Math.round(average * 10) / 10, // 1 decimal
    withPhotos,
    distribution,
  };
}
