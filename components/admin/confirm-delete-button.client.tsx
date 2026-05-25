'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'xs' | 'sm' | 'default' | 'lg';

/**
 * Destructive action button gated behind an AlertDialog confirmation.
 * Used for both customer and order deletion. The dialog is controlled so
 * it stays open while the DELETE request is in flight and can surface an
 * error instead of silently closing.
 */
export default function ConfirmDeleteButton({
  deleteUrl,
  title = 'Are you absolutely sure?',
  description,
  confirmLabel = 'Delete',
  triggerLabel,
  redirectTo,
  withIcon = true,
  triggerVariant = 'destructive',
  triggerSize = 'sm',
  triggerClassName,
}: {
  deleteUrl: string;
  title?: string;
  description: string;
  confirmLabel?: string;
  triggerLabel: string;
  redirectTo?: string;
  withIcon?: boolean;
  triggerVariant?: Variant;
  triggerSize?: Size;
  triggerClassName?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onConfirm(e: React.MouseEvent) {
    e.preventDefault(); // keep the dialog open until the request resolves
    setBusy(true);
    setError(null);
    const res = await fetch(deleteUrl, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setBusy(false);
      setError(data?.error ?? 'Delete failed');
      return;
    }
    setBusy(false);
    setOpen(false);
    if (redirectTo) router.push(redirectTo);
    router.refresh();
  }

  return (
    <AlertDialog open={open} onOpenChange={(v) => !busy && setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize} className={triggerClassName}>
          {withIcon && <Trash2 className="size-4" />}
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={busy}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {busy ? 'Deleting…' : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
