/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema/json-ld';
import './about.css';

const TITLE = 'About — Dermatologist-led skincare from Lahore';
const DESCRIPTION =
  'How Clarté MD works — a GMC-registered doctor formulating clinical protocols at our Lahore lab. Honest expectations, fully sealed packaging, COD across Pakistan.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `${TITLE} · Clarté MD`,
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="mono eyebrow">— How we work —</span>
          <h1 className="display">
            We don't sell single bottles.
            <br />
            <em>We dispatch protocols.</em>
          </h1>
          <p className="about-hero-lede">
            Clarté MD ships 12-week clinical regimens formulated by our GMC-registered doctor —
            never an active sold in isolation, never a routine the patient builds without
            guidance. Manufactured in Lahore.
          </p>
        </div>
      </section>

      {/* DOCTOR BLOCK */}
      <section className="about-doctor">
        <div className="about-doctor-inner">
          <div className="about-doctor-portrait">
            {/* Placeholder until operator supplies a portrait (spec §15) */}
            <div className="about-photo-placeholder">
              <span className="mono">[Doctor portrait pending]</span>
            </div>
          </div>
          <div className="about-doctor-text">
            <span className="mono eyebrow">The prescribing doctor</span>
            <h2 className="display">Our GMC-registered doctor.</h2>
            <p>
              MBBS · GMC-Registered Dermatologist · London &amp; Lahore. Every Clarté MD protocol
              is reviewed and signed off by the same clinician — not assembled by a marketing
              team, not "formulated by experts" with no name behind it.
            </p>
            <p>
              The doctor's clinical practice runs in both cities. Protocols are designed for
              Pakistani skin types, climate, and the medications patients are already taking.
            </p>
            <div className="about-credentials">
              <div>
                <strong>MBBS</strong>
                <span>Medical degree</span>
              </div>
              <div>
                <strong>GMC-Registered</strong>
                <span>General Medical Council, UK</span>
              </div>
              <div>
                <strong>Dermatologist</strong>
                <span>London &amp; Lahore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-philosophy">
        <div className="about-philosophy-inner">
          <span className="mono eyebrow">— What we believe —</span>
          <h2 className="display">Honest dermatology means honest expectations.</h2>
          <div className="about-philosophy-grid">
            <div>
              <h3>Clinically dosed actives</h3>
              <p>
                Niacinamide at 10%, not 2%. Vitamin C at 15%. Retinol at 0.3-0.5%. Doses that
                actually do clinical work, not the homeopathic concentrations most local brands
                ship.
              </p>
            </div>
            <div>
              <h3>One protocol, twelve weeks</h3>
              <p>
                Skin biology runs on weeks, not days. Every protocol is dosed for 12 weeks of
                consistent use — no half-bottles, no top-up upsells, no Instagram quick-fixes.
              </p>
            </div>
            <div>
              <h3>Sealed packaging, COD payment</h3>
              <p>
                Every parcel ships sealed and labeled. Pay the courier in cash when it
                arrives. If your order arrives damaged or incorrect, WhatsApp us within
                24 hours and we'll arrange a refund or re-ship.
              </p>
            </div>
            <div>
              <h3>WhatsApp consult, free</h3>
              <p>
                A real person — our team — answers within 2 hours during business hours. Ask
                about your skin, your routine, side effects, anything. No bot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING */}
      <section className="about-manufacturing">
        <div className="about-manufacturing-inner">
          <div className="about-manufacturing-text">
            <span className="mono eyebrow">— Where we make it —</span>
            <h2 className="display">Made in Lahore.</h2>
            <p>
              All Clarté MD products are manufactured at our Lahore facility. Every batch
              is tested before release. Stability data on file. Active concentrations
              verified by independent assay.
            </p>
            <p>
              Ingredient sourcing prioritises pharma-grade actives from European and Korean
              suppliers. We publish the actives and their concentrations on every product
              label — no proprietary-complex obfuscation.
            </p>
            <ul className="about-cert-list">
              <li>Batch-tested, stability-validated</li>
              <li>Active concentrations independently assayed</li>
              <li>Full ingredient transparency on labels</li>
            </ul>
          </div>
          <div className="about-manufacturing-photo">
            <div className="about-photo-placeholder">
              <span className="mono">[Lab / manufacturing photo pending]</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA TO PROTOCOLS */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <h2 className="display">Find your protocol.</h2>
          <p>30 seconds. Upload a selfie, get a recommendation.</p>
          <div className="about-cta-buttons">
            <Link href="/quiz" className="btn btn-primary">
              Take the skin quiz →
            </Link>
            <Link href="/products" className="btn btn-secondary">
              Browse all 4 protocols
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
