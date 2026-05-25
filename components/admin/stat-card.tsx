import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: 'default' | 'warning' | 'danger';
}) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="p-5">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div
          className={cn(
            'mt-2 text-2xl font-semibold tracking-tight tabular-nums',
            tone === 'warning' && 'text-[var(--clarte-rust)]',
            tone === 'danger' && 'text-destructive',
          )}
        >
          {value}
        </div>
        {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
      </CardContent>
    </Card>
  );
}
