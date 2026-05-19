import type { Metadata } from 'next';
import Link from 'next/link';
import { db, schema } from '@/lib/db/client';
import { SITE_URL } from '@/lib/schema/json-ld';
import './home.css';

const TITLE = 'Clarté MD — Dermatologist-led skincare for Pakistan';
const DESCRIPTION =
  'Four 12-week clinical regimens for acne, pigmentation, anti-ageing, and barrier repair. Take the 30-second AI skin quiz to find yours. Formulated in Lahore. COD across Pakistan.';

export const metadata: Metadata = {
  // Homepage title intentionally bypasses the layout %s template so the
  // brand name isn't appended twice.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

const CONCERN_LABELS: Record<string, string> = {
  acne: 'Acne · PIH',
  pigmentation: 'Pigmentation · Melasma',
  'anti-ageing': 'Anti-ageing · Fine lines',
  hydration: 'Sensitivity · Hydration',
};

const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

const PROTOCOL_TAGLINES: Record<string, string> = {
  'clear-skin-protocol':
    'Niacinamide 10% · Azelaic · 2% Salicylic — for active breakouts and post-acne marks.',
  'even-tone-protocol':
    'L-Ascorbic 15% · Tranexamic · Alpha-Arbutin · SPF 50 — for pigmentation and melasma.',
  'renewal-protocol':
    'Retinol 0.3% · L-Ascorbic · HA · Ceramides — for fine lines, dullness, and texture.',
  'barrier-protocol':
    'Triple HA · B5 · Ceramides · SPF 50 — no actives, calms compromised barriers.',
};

async function getBundles() {
  const bundles = await db.select().from(schema.bundles);
  return bundles;
}

export default async function HomePage() {
  const bundles = await getBundles();
  // Order in the canonical hero → ordered display: acne, even-tone, renewal, barrier
  const ordered = ['clear-skin-protocol', 'even-tone-protocol', 'renewal-protocol', 'barrier-protocol']
    .map((slug) => bundles.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => !!b);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-eyebrow mono">Clarté MD · Lahore</div>
          <h1 className="home-hero-title display">
            Dermatologist-led skincare,
            <br />
            <em>for Pakistan.</em>
          </h1>
          <p className="home-hero-lede">
            Four 12-week clinical protocols, each formulated by our GMC-registered doctor.
            Clinically dosed actives. Honest expectations. Manufactured in Lahore under
            ISO 22716 GMP.
          </p>
          <div className="home-hero-ctas">
            <Link href="/quiz" className="btn btn-primary home-cta-primary">
              Take the 30-second skin quiz →
            </Link>
            <Link href="/products" className="btn btn-secondary home-cta-secondary">
              Browse all protocols
            </Link>
          </div>
          <div className="home-hero-trust mono">
            <span>ISO 22716 · GMP</span>
            <span>·</span>
            <span>COD across Pakistan</span>
            <span>·</span>
            <span>Free shipping over Rs. 4,000</span>
          </div>
        </div>
      </section>

      {/* 4-PROTOCOL GRID */}
      <section className="home-protocols">
        <div className="home-section-head">
          <span className="mono eyebrow">— 01 — The Protocols</span>
          <h2 className="display">Pick the protocol matching your concern.</h2>
          <p className="lede">
            Each is a 12-week regimen — clinically dosed, fully sealed, dispatched from Lahore.
          </p>
        </div>
        <div className="home-protocol-grid">
          {ordered.map((b) => (
            <Link
              key={b.id}
              href={PROTOCOL_ROUTES[b.slug] || '/'}
              className="home-protocol-card"
            >
              <div className="home-protocol-concern mono">{CONCERN_LABELS[b.concern]}</div>
              <h3 className="display">{b.name}</h3>
              <p className="home-protocol-tagline">{PROTOCOL_TAGLINES[b.slug]}</p>
              <div className="home-protocol-foot">
                <span className="home-protocol-price">Rs. {b.pricePkr.toLocaleString()}</span>
                <span className="home-protocol-arrow">Start the Protocol →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BRAND-STORY PREVIEW */}
      <section className="home-about">
        <div className="home-about-inner">
          <div className="home-about-text">
            <span className="mono eyebrow">— 02 — How we work</span>
            <h2 className="display">No bottles before consultation.</h2>
            <p>
              Clarté MD only ships clinical protocols — never single actives sold as
              cure-alls. Every regimen is formulated by our GMC-registered doctor at our
              Lahore clinic, manufactured under ISO 22716 GMP, and dispatched with full
              ingredient transparency and dosed expectations.
            </p>
            <p>
              You upload a selfie. The AI projects week 12. You choose the protocol. The
              courier knocks. You pay on delivery — and the 12-week clock starts.
            </p>
            <Link href="/about" className="home-about-cta">
              About the brand →
            </Link>
          </div>
          <div className="home-about-aside">
            {/* Placeholder for clinic/lab/doctor photo — operator-supplied per spec §15 */}
            <div className="home-about-photo-placeholder">
              <span className="mono">[Doctor / lab portrait pending]</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP / TRUST STRIP */}
      <section className="home-trust">
        <div className="home-trust-inner">
          <div className="home-trust-cell">
            <h3 className="display">12 weeks</h3>
            <p>Every protocol is dosed for 12 weeks. No half-bottles, no upsells.</p>
          </div>
          <div className="home-trust-cell">
            <h3 className="display">COD</h3>
            <p>Pay the courier in cash when your parcel arrives. Damaged order? WhatsApp us within 24 hours.</p>
          </div>
          <div className="home-trust-cell">
            <h3 className="display">WhatsApp</h3>
            <p>
              A real person answers — usually within 2 hours during the day.{' '}
              <a
                href="https://wa.me/923249986822"
                target="_blank"
                rel="noopener"
                className="home-wa-link"
              >
                Message our team →
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

