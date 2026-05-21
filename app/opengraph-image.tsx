import { ImageResponse } from 'next/og';

/**
 * Site-wide OG card. Plan Task 32 Step 4 asked for a static
 * /og-default.png; using Next's ImageResponse instead so the asset
 * stays editable in code and ships without a designer round-trip.
 * Operator may replace with a static asset later — just delete this
 * file and add /public/og-default.png (then point metadata at it).
 */
export const runtime = 'edge';
export const alt = 'Clarté MD — Dermatologist-led skincare for Pakistan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background:
            'linear-gradient(135deg, #f5f7fb 0%, #ffffff 55%, #eef3ff 100%)',
          color: '#0e1f3a',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'monospace',
            fontSize: 18,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#0057ff',
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              background: '#0057ff',
              borderRadius: '50%',
              display: 'block',
            }}
          />
          Clarté MD · Lahore
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              maxWidth: 980,
            }}
          >
            <span>Dermatologist-led skincare,</span>
            <span style={{ color: '#0057ff', fontStyle: 'italic' }}>
              built for Pakistan.
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'sans-serif',
              fontSize: 26,
              color: '#4a5573',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            12-week clinical regimens for acne, pigmentation, anti-ageing,
            and barrier repair. Formulated in Lahore. COD across PK.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'monospace',
            fontSize: 16,
            color: '#6b7280',
            letterSpacing: '0.05em',
          }}
        >
          <span>Made in Lahore · GMC-registered doctor</span>
          <span style={{ color: '#0e1f3a', fontWeight: 600 }}>
            clartemd.com.pk
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
