'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProtocolHeroUploader({
  bundleId,
  currentUrl,
}: {
  bundleId: string;
  currentUrl: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, or WebP).');
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setError('Image must be under 8 MB.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
    setSaved(false);
  }

  async function onUpload() {
    if (!file) return;
    setBusy(true);
    setError(null);
    setSaved(false);

    const fd = new FormData();
    fd.append('file', file);

    const res = await fetch(`/api/admin/protocols/${bundleId}/hero-image`, {
      method: 'POST',
      body: fd,
    });
    setBusy(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Upload failed');
      return;
    }

    setSaved(true);
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    router.refresh();
  }

  const displayUrl = preview ?? currentUrl;

  return (
    <div className="space-y-4">
      {displayUrl ? (
        <div className="relative h-52 w-full overflow-hidden rounded-lg border border-border bg-muted">
          <Image src={displayUrl} alt="Protocol hero preview" fill className="object-cover" unoptimized />
          {preview && (
            <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-white">
              Preview — not saved yet
            </span>
          )}
        </div>
      ) : (
        <div className="flex h-52 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted text-muted-foreground">
          <div className="flex flex-col items-center gap-2 text-sm">
            <ImageIcon className="size-8 opacity-40" />
            <span>No hero image set</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={`hero-file-${bundleId}`}
          className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <Upload className="size-4" />
          {file ? 'Change image' : 'Choose image'}
        </label>
        <input
          id={`hero-file-${bundleId}`}
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={onFileChange}
        />
        {file && (
          <Button onClick={onUpload} disabled={busy} size="sm">
            {busy ? 'Uploading…' : 'Save image'}
          </Button>
        )}
        {saved && <span className="text-sm text-[var(--clarte-success)]">Saved — page now shows the new image</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>

      {file && (
        <p className="text-xs text-muted-foreground">
          {file.name} · {(file.size / 1024).toFixed(0)} KB
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Recommended: landscape, 1920×1080 or wider. JPEG, PNG, or WebP, max 8 MB.
        The uploaded image is stored in Supabase and replaces the static hero on the protocol landing page.
      </p>
    </div>
  );
}
