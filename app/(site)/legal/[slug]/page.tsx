import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import './legal.css';

// Plan Task 30 chose `next-mdx-remote` rather than `@next/mdx`, so the
// 4 legal pages live as raw MDX in `content/legal/*.mdx` and render
// through this single dynamic route. `generateStaticParams` pre-renders
// them at build time — no per-request file read in production.
const LEGAL_SLUGS = ['privacy', 'terms', 'returns', 'shipping'] as const;
type LegalSlug = (typeof LEGAL_SLUGS)[number];

const TITLES: Record<LegalSlug, string> = {
  privacy: 'Privacy policy',
  terms: 'Terms of service',
  returns: 'Returns & refunds',
  shipping: 'Shipping policy',
};

const EYEBROWS: Record<LegalSlug, string> = {
  privacy: '— Privacy —',
  terms: '— Terms —',
  returns: '— Returns —',
  shipping: '— Shipping —',
};

// The "last reviewed" date is the date the MDX file was last updated.
// For the placeholder scaffold this is the date the page was created;
// the PK lawyer will bump this on their review pass.
const LAST_REVIEWED = '2026-05-18';

export const dynamicParams = false; // 404 anything off this list

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(LEGAL_SLUGS as readonly string[]).includes(slug)) return {};
  return {
    title: `${TITLES[slug as LegalSlug]} · Clarté MD`,
    description: `${TITLES[slug as LegalSlug]} for Clarté MD — Pakistan-first dermatologist-led skincare.`,
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(LEGAL_SLUGS as readonly string[]).includes(slug)) notFound();
  const typedSlug = slug as LegalSlug;

  const file = path.join(process.cwd(), 'content', 'legal', `${typedSlug}.mdx`);
  const source = await readFile(file, 'utf8');

  return (
    <article className="legal-page">
      <header className="legal-header">
        <span className="mono eyebrow">{EYEBROWS[typedSlug]}</span>
        <h1>{TITLES[typedSlug]}</h1>
        <p className="legal-meta mono">
          Last reviewed: {LAST_REVIEWED} · Clarté MD, Lahore, Pakistan
        </p>
      </header>
      <div className="legal-prose">
        <MDXRemote source={source} />
      </div>
    </article>
  );
}
