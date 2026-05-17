import { describe, it, expect } from 'vitest';
import { formatOrderNumber } from '@/lib/orders/order-number';

describe('formatOrderNumber', () => {
  it('formats year + zero-padded sequence', () => {
    expect(formatOrderNumber(2026, 42)).toBe('CLM-2026-0042');
  });

  it('pads single digits to 4 wide', () => {
    expect(formatOrderNumber(2026, 1)).toBe('CLM-2026-0001');
    expect(formatOrderNumber(2026, 9)).toBe('CLM-2026-0009');
  });

  it('keeps 4-digit sequences at their natural width', () => {
    expect(formatOrderNumber(2026, 9999)).toBe('CLM-2026-9999');
  });

  it('expands beyond 4 digits for sequences over 9999', () => {
    expect(formatOrderNumber(2026, 10000)).toBe('CLM-2026-10000');
    expect(formatOrderNumber(2026, 123456)).toBe('CLM-2026-123456');
  });

  it('throws on non-integer sequence', () => {
    expect(() => formatOrderNumber(2026, 1.5)).toThrow();
    expect(() => formatOrderNumber(2026, NaN)).toThrow();
  });

  it('throws on zero or negative sequence', () => {
    expect(() => formatOrderNumber(2026, 0)).toThrow();
    expect(() => formatOrderNumber(2026, -1)).toThrow();
  });
});
