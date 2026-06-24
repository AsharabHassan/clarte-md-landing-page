import { describe, it, expect } from 'vitest';
import { toE164PK } from '@/lib/marketing/purchase-conversion';

describe('toE164PK', () => {
  it('converts a local 0-prefixed number', () => {
    expect(toE164PK('03001234567')).toBe('+923001234567');
  });

  it('handles formatting characters', () => {
    expect(toE164PK('0300-123 4567')).toBe('+923001234567');
  });

  it('keeps an already-international 92 number', () => {
    expect(toE164PK('923001234567')).toBe('+923001234567');
    expect(toE164PK('+92 300 1234567')).toBe('+923001234567');
  });

  it('adds +92 to a bare 10-digit mobile', () => {
    expect(toE164PK('3001234567')).toBe('+923001234567');
  });

  it('returns empty string for empty input', () => {
    expect(toE164PK('')).toBe('');
    expect(toE164PK('   ')).toBe('');
  });
});
