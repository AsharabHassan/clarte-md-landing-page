'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = [
  'pending',
  'confirmed',
  'dispatched',
  'delivered',
  'cancelled',
  'refunded',
] as const;

export default function OrderStatusButtons({
  orderId,
  current,
}: {
  orderId: string;
  current: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function set(s: string) {
    if (s === current) return;
    setBusy(true);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: s }),
    });
    setBusy(false);
    if (!res.ok) {
      alert('Update failed');
      return;
    }
    router.refresh();
  }

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
      {STATUSES.map((s) => (
        <button
          key={s}
          onClick={() => set(s)}
          disabled={busy || s === current}
          style={{
            padding: '8px 14px',
            background: s === current ? '#0e1f3a' : '#fff',
            color: s === current ? '#fff' : '#0e1f3a',
            border: '1px solid #0e1f3a',
            borderRadius: 6,
            cursor: s === current ? 'default' : 'pointer',
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
