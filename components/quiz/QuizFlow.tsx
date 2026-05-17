/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import './quiz.css';

type State =
  | { kind: 'idle' }
  | { kind: 'previewing'; dataUrl: string; blob: Blob }
  | { kind: 'loading' }
  | { kind: 'result'; data: AnalysisResult }
  | { kind: 'error'; message: string };

interface AnalysisResult {
  severity: 'mild' | 'moderate' | 'severe';
  primary_concerns: string[];
  secondary_concerns: string[];
  recommended_protocol:
    | 'clear-skin-protocol'
    | 'even-tone-protocol'
    | 'renewal-protocol'
    | 'barrier-protocol'
    | 'see-doctor-in-person';
  recommended_actives: string[];
  expected_timeline_weeks: number;
  warnings: string[];
  confidence: 'low' | 'medium' | 'high';
}

const PROTOCOL_ROUTES: Record<string, { path: string; name: string }> = {
  'clear-skin-protocol': { path: '/acne', name: 'The Clear Skin Protocol' },
  'even-tone-protocol': { path: '/even-tone', name: 'The Even Tone Protocol' },
  'renewal-protocol': { path: '/renewal', name: 'The Renewal Protocol' },
  'barrier-protocol': { path: '/barrier', name: 'The Barrier Protocol' },
};

const PROGRESS_STEPS = [
  'Reading texture, tone, and inflammation markers…',
  'Mapping concern topography…',
  'Modelling active-ingredient response…',
  'Cross-referencing protocol fit…',
  'Almost there…',
];

export function QuizFlow() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [consent, setConsent] = useState(false);
  const [progressIdx, setProgressIdx] = useState(0);

  function handleFile(file: File) {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setState({ kind: 'error', message: 'Please use a JPEG, PNG, or WebP image.' });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setState({ kind: 'error', message: 'Image is too large (max 8 MB).' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setState({ kind: 'previewing', dataUrl, blob: file });
    };
    reader.onerror = () => setState({ kind: 'error', message: 'Could not read that image.' });
    reader.readAsDataURL(file);
  }

  async function blobToBase64(blob: Blob): Promise<{ b64: string; mime: string }> {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        const result = r.result as string;
        const c = result.indexOf(',');
        resolve({ b64: c > -1 ? result.slice(c + 1) : result, mime: blob.type });
      };
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
  }

  async function analyze() {
    if (state.kind !== 'previewing') return;
    if (!consent) return;
    setState({ kind: 'loading' });
    setProgressIdx(0);

    // Rotate progress messages every ~5s while waiting
    const interval = setInterval(() => {
      setProgressIdx((i) => Math.min(i + 1, PROGRESS_STEPS.length - 1));
    }, 5000);

    try {
      const { b64, mime } = await blobToBase64(state.blob);
      const res = await fetch('/api/ai/analyze-skin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          image_base64: b64,
          mime_type: mime,
          concern: 'unknown',
          consent: true,
        }),
      });
      clearInterval(interval);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState({
          kind: 'error',
          message:
            data.error ||
            "We couldn't analyse the photo. Try a clearer front-facing selfie in even light.",
        });
        return;
      }
      setState({ kind: 'result', data: data.analysis as AnalysisResult });
    } catch (e: unknown) {
      clearInterval(interval);
      setState({
        kind: 'error',
        message: e instanceof Error ? e.message : 'Network issue. Please try again.',
      });
    }
  }

  function reset() {
    setState({ kind: 'idle' });
    setConsent(false);
    setProgressIdx(0);
  }

  // ───────── RENDER ─────────

  if (state.kind === 'idle') {
    return (
      <div className="quiz-flow">
        <div className="quiz-eyebrow mono">— The Skin Quiz —</div>
        <h1 className="quiz-title display">
          One selfie. <em>Thirty seconds.</em>
        </h1>
        <p className="quiz-lede">
          Our AI reads texture, tone, and concern markers from your photo, then recommends the
          Clarté MD protocol most likely to help. Free. No signup.
        </p>

        <label className="quiz-dropzone">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <div className="quiz-dropzone-icon">📷</div>
          <div className="quiz-dropzone-prompt">
            <strong>Upload a front-facing selfie</strong>
            <span>JPG, PNG, or WebP · max 8 MB</span>
          </div>
        </label>

        <div className="quiz-tips mono">
          <span>• Even light · no filter · no makeup if possible</span>
        </div>
      </div>
    );
  }

  if (state.kind === 'previewing') {
    return (
      <div className="quiz-flow">
        <div className="quiz-eyebrow mono">— Preview &amp; consent —</div>
        <h1 className="quiz-title display">Looks good. Ready?</h1>
        <div className="quiz-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={state.dataUrl} alt="Selfie preview" />
        </div>
        <label className="quiz-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            I understand this is an AI triage, not a clinical diagnosis. I consent to my photo
            being processed once for this analysis, after which it is deleted from Clarté's
            servers within 90 days.
          </span>
        </label>
        <div className="quiz-actions">
          <button className="btn btn-secondary" onClick={reset}>
            ← Different photo
          </button>
          <button className="btn btn-primary" disabled={!consent} onClick={analyze}>
            Analyse my skin →
          </button>
        </div>
      </div>
    );
  }

  if (state.kind === 'loading') {
    return (
      <div className="quiz-flow">
        <div className="quiz-eyebrow mono">— Analysing —</div>
        <h1 className="quiz-title display">Reading your skin…</h1>
        <div className="quiz-spinner" />
        <p className="quiz-progress-msg">{PROGRESS_STEPS[progressIdx]}</p>
        <p className="quiz-progress-sub mono">
          Usually 15-30 seconds. Don't close this tab.
        </p>
      </div>
    );
  }

  if (state.kind === 'error') {
    return (
      <div className="quiz-flow">
        <div className="quiz-eyebrow mono">— Hmm —</div>
        <h1 className="quiz-title display">Something didn't work.</h1>
        <p className="quiz-lede">{state.message}</p>
        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={reset}>
            Try again
          </button>
          <a
            href="https://wa.me/923249986822?text=Hi%2C%20the%20Clart%C3%A9%20MD%20skin%20quiz%20didn%27t%20work%20for%20me.%20Can%20you%20help%3F"
            target="_blank"
            rel="noopener"
            className="btn btn-secondary"
          >
            WhatsApp our team →
          </a>
        </div>
      </div>
    );
  }

  // state.kind === 'result'
  const { data } = state;
  if (data.recommended_protocol === 'see-doctor-in-person') {
    return (
      <div className="quiz-flow">
        <div className="quiz-eyebrow mono">— Please see a doctor —</div>
        <h1 className="quiz-title display">This one needs an in-person consult.</h1>
        <p className="quiz-lede">
          Based on what we saw, the Clarté MD protocols aren't the right starting point for
          your concern. We strongly recommend an in-person dermatologist visit before any
          topical regimen.
        </p>
        {data.warnings.length > 0 && (
          <ul className="quiz-warnings">
            {data.warnings.map((w, i) => (
              <li key={i}>⚠ {w}</li>
            ))}
          </ul>
        )}
        <div className="quiz-actions">
          <a
            href="https://wa.me/923249986822?text=Hi%2C%20the%20skin%20quiz%20recommended%20I%20see%20a%20doctor%20in%20person.%20Can%20you%20help%20with%20a%20referral%3F"
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
          >
            WhatsApp our team for a referral →
          </a>
          <button className="btn btn-secondary" onClick={reset}>
            ← Re-take the quiz
          </button>
        </div>
      </div>
    );
  }

  const rec = PROTOCOL_ROUTES[data.recommended_protocol];
  return (
    <div className="quiz-flow quiz-result">
      <div className="quiz-eyebrow mono">— Your result —</div>
      <h1 className="quiz-title display">
        Recommended: <em>{rec?.name || data.recommended_protocol}</em>
      </h1>
      <p className="quiz-lede">
        Based on{' '}
        <strong>{data.primary_concerns.join(', ')}</strong>
        {data.secondary_concerns.length > 0 && (
          <>
            {' '}
            (and minor {data.secondary_concerns.join(', ')})
          </>
        )}
        . Expected timeline: <strong>{data.expected_timeline_weeks} weeks</strong>. Confidence:{' '}
        <strong>{data.confidence}</strong>.
      </p>

      {data.recommended_actives.length > 0 && (
        <div className="quiz-actives">
          <span className="mono eyebrow">Active ingredients in this protocol</span>
          <ul>
            {data.recommended_actives.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {data.warnings.length > 0 && (
        <ul className="quiz-warnings">
          {data.warnings.map((w, i) => (
            <li key={i}>⚠ {w}</li>
          ))}
        </ul>
      )}

      <div className="quiz-actions">
        {rec && (
          <Link href={rec.path} className="btn btn-primary">
            Start {rec.name} →
          </Link>
        )}
        <button className="btn btn-secondary" onClick={reset}>
          Re-take the quiz
        </button>
      </div>

      <p className="quiz-disclaimer mono">
        This is an AI triage aid, not a clinical diagnosis. For complex cases, please consult
        an in-person dermatologist before starting any regimen.
      </p>
    </div>
  );
}
