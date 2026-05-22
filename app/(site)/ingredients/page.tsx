import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Ingredients',
  description:
    'A plain-English glossary of the actives in Clarté MD protocols — niacinamide, azelaic acid, retinaldehyde, tranexamic acid, hyaluronic acid, ceramides, salicylic acid.',
  // Placeholder content; do NOT let Google index a thin page.
  // Re-enable indexing when the glossary ships with real entries.
  robots: {
    index: false,
    follow: true,
  },
};

const PLANNED_INGREDIENTS = [
  'Niacinamide',
  'Azelaic acid',
  'Retinaldehyde',
  'Salicylic acid',
  'Tranexamic acid',
  'Hyaluronic acid',
  'Ceramides',
  'Kojic acid',
  'Panthenol',
  'Centella',
  'Vitamin C',
  'Glycolic acid',
];

export default function IngredientsPage() {
  return (
    <div className="mx-auto max-w-[42rem] px-5 py-16 md:py-24">
      <Eyebrow className="mb-4">In progress</Eyebrow>
      <h1 className="font-display text-3xl md:text-4xl text-navy leading-[1.15]">
        Our ingredient glossary
      </h1>
      <p className="mt-4 font-body text-base md:text-lg text-ink-mute leading-relaxed">
        We&apos;re writing a plain-English explainer for every active that appears in a Clarté
        protocol — what it does, what concentration we use it at, and why our GMC-registered
        doctor chose it. Twelve entries are on the way.
      </p>

      <div className="mt-10">
        <Eyebrow className="mb-4">Coming soon</Eyebrow>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 font-body text-sm text-ink">
          {PLANNED_INGREDIENTS.map((name) => (
            <li key={name} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cobalt" />
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/products">Browse the products</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/quiz">Take the skin quiz</Link>
        </Button>
      </div>
    </div>
  );
}
