import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { Eyebrow } from '@/components/ui/eyebrow';
import { cn } from '@/lib/utils';

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

// Tailwind descendant-selector prose. Targets the MDX-rendered elements
// directly so we don't need @tailwindcss/typography as a dep. The
// blockquote treatment in particular is the amber "pending lawyer review"
// callout — preserved with the same visual weight as the previous CSS.
const proseClass = cn(
  'text-base leading-[1.65] text-ink-2',
  // Headings
  '[&_h2]:font-display [&_h2]:font-normal [&_h2]:text-[26px] [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.01em] [&_h2]:text-navy [&_h2]:mt-11 [&_h2]:mb-3.5',
  '[&_h3]:font-body [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:text-navy [&_h3]:mt-8 [&_h3]:mb-2.5',
  // Paragraphs
  '[&_p]:my-0 [&_p:not(:last-child)]:mb-[18px]',
  // Links
  '[&_a]:text-cobalt [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-cobalt-2',
  // Strong
  '[&_strong]:text-navy [&_strong]:font-semibold',
  // Lists
  '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_ul]:mb-[22px] [&_ol]:mb-[22px]',
  '[&_li]:my-1.5',
  // Inline code
  '[&_code]:font-mono [&_code]:text-[13px] [&_code]:bg-sky [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-navy',
  // Horizontal rules
  '[&_hr]:border-0 [&_hr]:border-t [&_hr]:border-rule [&_hr]:my-10',
  // Blockquote — the "pending PK lawyer review" amber callout
  '[&_blockquote]:bg-amber-50 [&_blockquote]:border-l-[3px] [&_blockquote]:border-amber-500',
  '[&_blockquote]:px-[18px] [&_blockquote]:py-[14px] [&_blockquote]:mb-8 [&_blockquote]:rounded-r-md',
  '[&_blockquote]:text-sm [&_blockquote]:text-amber-900',
  '[&_blockquote_p]:my-0',
  '[&_blockquote_p+p]:mt-2',
  // Tables (privacy + shipping use them)
  '[&_table]:w-full [&_table]:border-collapse [&_table]:mt-[18px] [&_table]:mb-[26px] [&_table]:text-sm',
  '[&_th]:font-body [&_th]:font-semibold [&_th]:text-[13px] [&_th]:text-navy [&_th]:bg-sky [&_th]:text-left [&_th]:px-3 [&_th]:py-2.5 [&_th]:border-b [&_th]:border-rule',
  '[&_td]:px-3 [&_td]:py-2.5 [&_td]:border-b [&_td]:border-rule [&_td]:align-top [&_td]:text-left',
);

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
    <article className="mx-auto max-w-[47.5rem] px-6 pt-18 pb-24">
      <header className="mb-10 border-b border-rule pb-7 text-center">
        <Eyebrow className="mb-3.5 text-cobalt">{EYEBROWS[typedSlug]}</Eyebrow>
        <h1 className="mb-3.5 font-display font-light text-navy text-[clamp(32px,4.5vw,46px)] leading-[1.1] tracking-[-0.02em]">
          {TITLES[typedSlug]}
        </h1>
        <p className="font-mono text-xs text-ink-faint">
          Last reviewed: {LAST_REVIEWED} · Clarté MD, Lahore, Pakistan
        </p>
      </header>
      <div className={proseClass}>
        <MDXRemote source={source} />
      </div>
    </article>
  );
}
