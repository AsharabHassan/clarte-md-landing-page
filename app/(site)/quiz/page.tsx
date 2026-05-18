import type { Metadata } from 'next';
import { QuizFlow } from '@/components/quiz/QuizFlow';
import { SITE_URL } from '@/lib/schema/json-ld';

const TITLE = 'Skin quiz — Find your protocol';
const DESCRIPTION =
  'Upload a selfie. Our AI reads texture, tone, and concern markers and recommends the Clarté MD protocol most likely to help. Free, 30 seconds, no signup.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/quiz` },
  openGraph: {
    title: `${TITLE} · Clarté MD`,
    description: DESCRIPTION,
    url: `${SITE_URL}/quiz`,
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function QuizPage() {
  return <QuizFlow />;
}
