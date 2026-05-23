import { cn } from '@/lib/utils';

/**
 * Three-step numbered breadcrumb above the checkout form.
 *
 * Visual only — the form is a single page (no actual paging),
 * but the breadcrumb signals the customer's mental model of the flow:
 * "I'll give contact info, then shipping, then confirm payment".
 * Six of eight reference checkouts surface a step indicator at the top
 * (05-checkout.md). On the Sephora variant the steps are tappable
 * anchors — we don't anchor here yet because the form is short enough
 * that scrolling does the job, and adding anchor scroll-jump on
 * mobile is more disruptive than helpful for COD.
 */
export function CheckoutSteps({ activeStep = 3 }: { activeStep?: 1 | 2 | 3 }) {
  const steps: Array<{ n: 1 | 2 | 3; label: string }> = [
    { n: 1, label: 'Contact' },
    { n: 2, label: 'Shipping' },
    { n: 3, label: 'Confirm' },
  ];
  return (
    <ol
      className="mb-6 flex w-full items-center gap-2 sm:gap-4"
      aria-label="Checkout progress"
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isComplete = step.n < activeStep;
        const isActive = step.n === activeStep;
        return (
          <li
            key={step.n}
            aria-current={isActive ? 'step' : undefined}
            className="flex flex-1 items-center gap-2 sm:gap-3"
          >
            <span
              className={cn(
                'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-semibold',
                isActive && 'bg-navy text-white',
                isComplete && 'bg-cobalt/15 text-cobalt',
                !isActive && !isComplete && 'border border-rule text-ink-faint',
              )}
            >
              {step.n.toString().padStart(2, '0')}
            </span>
            <span
              className={cn(
                'font-mono text-[10.5px] uppercase tracking-[0.18em]',
                isActive && 'text-navy',
                isComplete && 'text-cobalt',
                !isActive && !isComplete && 'text-ink-faint',
              )}
            >
              {step.label}
            </span>
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn(
                  'ml-1 h-px flex-1',
                  isComplete ? 'bg-cobalt/40' : 'bg-rule',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
