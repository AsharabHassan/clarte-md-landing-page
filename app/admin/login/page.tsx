'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const supa = createSupabaseBrowserClient();
    const { error } = await supa.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    router.push('/admin/orders');
  }

  return (
    <main style={{ maxWidth: 420, margin: '80px auto', padding: 32, fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Clarté MD · Admin</h1>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginTop: 4, border: '1px solid #ccc', borderRadius: 6 }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginTop: 4, border: '1px solid #ccc', borderRadius: 6 }}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          style={{
            padding: 12,
            background: '#0e1f3a',
            color: '#fff',
            border: 0,
            borderRadius: 6,
            cursor: busy ? 'wait' : 'pointer',
          }}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        {err && <p style={{ color: '#c0392b' }}>{err}</p>}
      </form>
    </main>
  );
}
