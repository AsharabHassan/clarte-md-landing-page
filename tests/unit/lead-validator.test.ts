import { describe, it, expect } from 'vitest';
import {
  LeadSchema,
  SCAN_TITLES,
  buildLeadWebhookPayload,
} from '@/lib/validators/lead';

describe('LeadSchema', () => {
  const valid = {
    name: 'Ayesha Khan',
    email: 'ayesha@example.com',
    phone: '+92 300 1234567',
    surface: 'acne' as const,
  };

  it('accepts a well-formed lead', () => {
    const r = LeadSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it('accepts optional concern + ai_session_id', () => {
    const r = LeadSchema.safeParse({ ...valid, concern: 'acne', ai_session_id: 'abc-123' });
    expect(r.success).toBe(true);
  });

  it('rejects a missing name', () => {
    const r = LeadSchema.safeParse({ ...valid, name: '' });
    expect(r.success).toBe(false);
  });

  it('rejects a bad email', () => {
    const r = LeadSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(r.success).toBe(false);
  });

  it('rejects a too-short phone', () => {
    const r = LeadSchema.safeParse({ ...valid, phone: '123' });
    expect(r.success).toBe(false);
  });

  it('rejects letters in phone', () => {
    const r = LeadSchema.safeParse({ ...valid, phone: 'call-me-maybe' });
    expect(r.success).toBe(false);
  });

  it('rejects an unknown surface', () => {
    const r = LeadSchema.safeParse({ ...valid, surface: 'homepage' });
    expect(r.success).toBe(false);
  });
});

describe('buildLeadWebhookPayload', () => {
  const base = {
    name: 'Ayesha Khan',
    email: 'ayesha@example.com',
    phone: '+92 300 1234567',
  };

  it('always includes a non-empty scan_title for every surface', () => {
    for (const surface of ['quiz', 'acne', 'barrier', 'even-tone', 'renewal'] as const) {
      const p = buildLeadWebhookPayload(
        { ...base, surface },
        { sourceUrl: null, timestamp: '2026-05-31T00:00:00.000Z' },
      );
      expect(p.lead.scan_title).toBe(SCAN_TITLES[surface]);
      expect(p.lead.scan_title.length).toBeGreaterThan(0);
    }
  });

  it('maps surface to the expected scan title', () => {
    const p = buildLeadWebhookPayload(
      { ...base, surface: 'acne', concern: 'acne', ai_session_id: 's-1' },
      { sourceUrl: 'https://lp.clartemd.com.pk/acne', timestamp: '2026-05-31T00:00:00.000Z' },
    );
    expect(p).toEqual({
      event: 'lead.captured',
      timestamp: '2026-05-31T00:00:00.000Z',
      lead: {
        name: 'Ayesha Khan',
        email: 'ayesha@example.com',
        phone: '+92 300 1234567',
        surface: 'acne',
        scan_title: 'The Clear Skin Protocol — 12-week AI scan',
        concern: 'acne',
        ai_session_id: 's-1',
        source_url: 'https://lp.clartemd.com.pk/acne',
      },
    });
  });

  it('nulls optional fields when absent', () => {
    const p = buildLeadWebhookPayload(
      { ...base, surface: 'quiz' },
      { sourceUrl: null, timestamp: '2026-05-31T00:00:00.000Z' },
    );
    expect(p.lead.concern).toBeNull();
    expect(p.lead.ai_session_id).toBeNull();
    expect(p.lead.source_url).toBeNull();
    expect(p.lead.scan_title).toBe('AI Skin Analysis Quiz');
  });
});
