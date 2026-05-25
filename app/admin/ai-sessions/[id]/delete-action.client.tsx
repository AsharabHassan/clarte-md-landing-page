'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeleteAiSession({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function del() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/ai-sessions/${id}`, { method: 'DELETE' });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Delete failed');
      return;
    }
    router.push('/admin/ai-sessions');
    router.refresh();
  }

  if (!confirming) {
    return (
      <Button variant="destructive" size="sm" onClick={() => setConfirming(true)}>
        <Trash2 className="size-4" /> Delete session & images
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">
        Permanently delete this session row and its stored images? This can’t be undone.
      </p>
      <div className="flex gap-2">
        <Button variant="destructive" size="sm" disabled={busy} onClick={del}>
          {busy ? 'Deleting…' : 'Confirm delete'}
        </Button>
        <Button variant="ghost" size="sm" disabled={busy} onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
