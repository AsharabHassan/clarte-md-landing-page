import { QuizFlow } from '@/components/quiz/QuizFlow';

export const metadata = {
  title: 'Skin quiz — Find your protocol',
  description:
    'Upload a selfie. Our AI reads texture, tone, and concern markers and recommends the Clarté MD protocol most likely to help. Free, 30 seconds, no signup.',
};

export const dynamic = 'force-dynamic';

export default function QuizPage() {
  return <QuizFlow />;
}
