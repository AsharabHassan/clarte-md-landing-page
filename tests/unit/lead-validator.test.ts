import { describe, it, expect } from 'vitest';
import {
  LeadSchema,
  SCAN_TITLES,
  buildLeadWebhookPayload,
  leadWebhookEnvName,
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
        skin_type: null,
        severity: null,
        confidence_pct: null,
        expected_timeline_weeks: null,
        primary_concerns: null,
        secondary_concerns: null,
        detected_issues: null,
        recommended_actives: null,
        warnings: null,
        observation: null,
      },
    });
  });

  it('flattens the AI scan skin_map into per-issue GHL fields', () => {
    const p = buildLeadWebhookPayload(
      {
        ...base,
        surface: 'acne',
        concern: 'acne',
        skin_map: {
          primary_concerns: ['Inflammatory acne', 'Comedones'],
          secondary_concerns: ['Post-inflammatory hyperpigmentation'],
          recommended_actives: ['Azelaic acid 10%', 'Niacinamide 5%'],
          warnings: ['Possible cystic acne — see a doctor'],
          skin_type: 'combination',
          severity: 'moderate',
          confidence: 0.78,
          expected_timeline_weeks: 12,
          observation: 'Visible inflammatory papules across the cheeks.',
        },
      },
      { sourceUrl: null, timestamp: '2026-05-31T00:00:00.000Z' },
    );
    expect(p.lead.skin_type).toBe('combination');
    expect(p.lead.severity).toBe('moderate');
    expect(p.lead.confidence_pct).toBe(78);
    expect(p.lead.expected_timeline_weeks).toBe(12);
    expect(p.lead.primary_concerns).toBe('Inflammatory acne, Comedones');
    expect(p.lead.secondary_concerns).toBe('Post-inflammatory hyperpigmentation');
    expect(p.lead.detected_issues).toBe(
      'Inflammatory acne, Comedones, Post-inflammatory hyperpigmentation',
    );
    expect(p.lead.recommended_actives).toBe('Azelaic acid 10%, Niacinamide 5%');
    expect(p.lead.warnings).toBe('Possible cystic acne — see a doctor');
    expect(p.lead.observation).toBe('Visible inflammatory papules across the cheeks.');
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

describe('leadWebhookEnvName', () => {
  it('routes each AI-scan surface to its own per-concern webhook', () => {
    expect(leadWebhookEnvName('acne')).toBe('WEBHOOK_LEAD_ACNE');
    expect(leadWebhookEnvName('even-tone')).toBe('WEBHOOK_LEAD_PIGMENTATION');
    expect(leadWebhookEnvName('renewal')).toBe('WEBHOOK_LEAD_AGEING');
    expect(leadWebhookEnvName('barrier')).toBe('WEBHOOK_LEAD_BARRIER');
  });

  it('keeps quiz leads on the generic lead webhook', () => {
    expect(leadWebhookEnvName('quiz')).toBe('WEBHOOK_LEAD_CAPTURED');
  });
});
