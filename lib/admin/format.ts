/** Shared formatting helpers for the admin console. */

export function formatPkr(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '—';
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
}

export function formatDateTime(value: Date | string | null | undefined): string {
  if (!value) return '—';
  const d = typeof value === 'string' ? new Date(value) : value;
  return d.toLocaleString('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDate(value: Date | string | null | undefined): string {
  if (!value) return '—';
  const d = typeof value === 'string' ? new Date(value) : value;
  return d.toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Strip non-digits and normalise a PK phone to wa.me format (E.164-ish). */
export function whatsappLink(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `92${digits.slice(1)}`;
  else if (digits.startsWith('92')) {
    /* already country-coded */
  } else if (digits.length === 10) digits = `92${digits}`;
  return `https://wa.me/${digits}`;
}
