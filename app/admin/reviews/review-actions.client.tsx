'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmDeleteButton from '@/components/admin/confirm-delete-button.client';

export default function ReviewActions({
  id,
  status,
  name,
  canDelete,
}: {
  id: string;
  status: string;
  name: string;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function setStatus(next: 'approved' | 'disapproved') {
    if (next === status || busy) return;
    setBusy(next);
    setError(null);
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    setBusy(null);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Failed');
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {status !== 'approved' && (
        <Button
          size="sm"
          variant="outline"
          disabled={busy !== null}
          onClick={() => setStatus('approved')}
          className="border-[var(--clarte-success)]/40 text-[var(--clarte-success)] hover:bg-[var(--clarte-success)]/10"
        >
          <Check className="size-4" /> {busy === 'approved' ? '…' : 'Approve'}
        </Button>
      )}
      {status !== 'disapproved' && (
        <Button
          size="sm"
          variant="outline"
          disabled={busy !== null}
          onClick={() => setStatus('disapproved')}
        >
          <X className="size-4" /> {busy === 'disapproved' ? '…' : 'Disapprove'}
        </Button>
      )}
      {canDelete && (
        <ConfirmDeleteButton
          deleteUrl={`/api/admin/reviews/${id}`}
          triggerLabel="Delete"
          triggerVariant="ghost"
          title="Delete this review?"
          description={`This permanently removes the review by ${name}. This cannot be undone. (To hide it instead, use Disapprove.)`}
          confirmLabel="Delete review"
        />
      )}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
