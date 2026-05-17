import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  hashIp,
  extractClientIp,
  RATE_LIMIT_AI_PER_HOUR,
  RATE_LIMIT_ORDERS_PER_HOUR,
} from '@/lib/ai/rate-limit';

describe('hashIp', () => {
  const ORIGINAL_PEPPER = process.env.IP_HASH_PEPPER;

  beforeEach(() => {
    process.env.IP_HASH_PEPPER = 'test-pepper-deadbeef';
  });

  afterEach(() => {
    if (ORIGINAL_PEPPER === undefined) delete process.env.IP_HASH_PEPPER;
    else process.env.IP_HASH_PEPPER = ORIGINAL_PEPPER;
  });

  it('produces a 64-hex-char SHA-256 string', () => {
    const h = hashIp('192.168.1.1');
    expect(h).toMatch(/^[0-9a-f]{64}$/);
  });

  it('is deterministic for the same IP', () => {
    expect(hashIp('1.2.3.4')).toBe(hashIp('1.2.3.4'));
  });

  it('differs for different IPs', () => {
    expect(hashIp('1.2.3.4')).not.toBe(hashIp('1.2.3.5'));
  });

  it('differs for the same IP under a different pepper (rotation works)', () => {
    const a = hashIp('1.2.3.4');
    process.env.IP_HASH_PEPPER = 'a-different-pepper';
    const b = hashIp('1.2.3.4');
    expect(a).not.toBe(b);
  });

  it('throws when IP_HASH_PEPPER is not set', () => {
    delete process.env.IP_HASH_PEPPER;
    expect(() => hashIp('1.2.3.4')).toThrow(/IP_HASH_PEPPER/);
  });
});

describe('extractClientIp', () => {
  it('prefers x-forwarded-for (first entry)', () => {
    const h = new Headers({ 'x-forwarded-for': '203.0.113.1, 10.0.0.1' });
    expect(extractClientIp(h)).toBe('203.0.113.1');
  });

  it('trims whitespace from x-forwarded-for entries', () => {
    const h = new Headers({ 'x-forwarded-for': '   203.0.113.7   , 10.0.0.1' });
    expect(extractClientIp(h)).toBe('203.0.113.7');
  });

  it('falls back to x-real-ip when x-forwarded-for is absent', () => {
    const h = new Headers({ 'x-real-ip': '198.51.100.42' });
    expect(extractClientIp(h)).toBe('198.51.100.42');
  });

  it('returns 0.0.0.0 when no recognizable header is present', () => {
    const h = new Headers();
    expect(extractClientIp(h)).toBe('0.0.0.0');
  });
});

describe('rate-limit constants', () => {
  it('exports the documented limits', () => {
    expect(RATE_LIMIT_AI_PER_HOUR).toBe(5);
    expect(RATE_LIMIT_ORDERS_PER_HOUR).toBe(10);
  });
});
