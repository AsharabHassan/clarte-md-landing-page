'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import './contact.css';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErr(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message'),
          subscribe: fd.get('subscribe') === 'on',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErr(data.error || 'Could not send. Please try again or WhatsApp us.');
        return;
      }
      setStatus('success');
    } catch (e: unknown) {
      setStatus('error');
      setErr(e instanceof Error ? e.message : 'Network issue. WhatsApp us instead.');
    }
  }

  return (
    <div className="contact-page">
      <header className="contact-header">
        <span className="mono eyebrow">— Get in touch —</span>
        <h1>Talk to our team.</h1>
        <p className="contact-lede">
          WhatsApp is the fastest. For everything else — questions about your skin, your
          order, our protocols — fill out the form and we'll reply within a working day.
        </p>
      </header>

      <div className="contact-grid">
        <aside className="contact-direct">
          <div className="contact-direct-block">
            <h3>WhatsApp</h3>
            <p>Usually answered within 2 hours during business hours.</p>
            <a
              href="https://wa.me/923249986822"
              target="_blank"
              rel="noopener"
              className="contact-wa-btn"
            >
              Message us →
            </a>
          </div>
          <div className="contact-direct-block">
            <h3>Email</h3>
            <p>
              <a href="mailto:hello@clartemd.com.pk">hello@clartemd.com.pk</a>
            </p>
          </div>
          <div className="contact-direct-block">
            <h3>Clinic</h3>
            <p>
              Clarté MD<br />
              Lahore, Pakistan
            </p>
          </div>
        </aside>

        <form className="contact-form" onSubmit={onSubmit}>
          {status === 'success' ? (
            <div className="contact-success">
              <h2>Thanks — message received.</h2>
              <p>
                Our team will reply within a working day. If it's urgent, message us on
                WhatsApp directly.
              </p>
            </div>
          ) : (
            <>
              <label>
                Your name
                <input name="name" type="text" required minLength={1} maxLength={128} />
              </label>
              <label>
                Email
                <input name="email" type="email" required maxLength={128} />
              </label>
              <label>
                Phone (optional, for callback)
                <input name="phone" type="tel" maxLength={32} placeholder="03XXXXXXXXX" required />
              </label>
              <label>
                Message
                <textarea name="message" required minLength={5} maxLength={2000} rows={5} />
              </label>
              <label className="contact-subscribe">
                <input name="subscribe" type="checkbox" />
                <span>Send me Clarté MD's monthly newsletter (honest dermatology, no spam).</span>
              </label>
              {err && <p className="contact-error">{err}</p>}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send message →'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
