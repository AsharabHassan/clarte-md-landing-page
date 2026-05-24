/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Camera,
  Upload,
  RotateCcw,
  MessageCircle,
  ShieldAlert,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { SplitReveal } from '@/lib/anim/split-reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

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

const PROTOCOL_ROUTES: Record<string, { path: string; name: string; accentClass: string }> = {
  'clear-skin-protocol': { path: '/acne', name: 'The Clear Skin Protocol', accentClass: 'bg-acne-accent' },
  'even-tone-protocol': { path: '/even-tone', name: 'The Even Tone Protocol', accentClass: 'bg-eventone-accent' },
  'renewal-protocol': { path: '/renewal', name: 'The Renewal Protocol', accentClass: 'bg-renewal-accent' },
  'barrier-protocol': { path: '/barrier', name: 'The Barrier Protocol', accentClass: 'bg-barrier-accent' },
};

const PROGRESS_STEPS = [
  'Reading texture, tone, and inflammation markers…',
  'Mapping concern topography…',
  'Modelling active-ingredient response…',
  'Cross-referencing protocol fit…',
  'Compositing the analysis…',
  'Almost there…',
];

export function QuizFlow() {
  const reduced = !!useReducedMotion();
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [consent, setConsent] = useState(false);
  const [progressIdx, setProgressIdx] = useState(0);

  function handleFile(file: File | Blob) {
    const blob = file instanceof File ? file : new File([file], `selfie-${Date.now()}.jpg`, { type: 'image/jpeg' });
    if (!blob.type.match(/^image\/(jpeg|png|webp)$/)) {
      setState({ kind: 'error', message: 'Please use a JPEG, PNG, or WebP image.' });
      return;
    }
    if (blob.size > 8 * 1024 * 1024) {
      setState({ kind: 'error', message: 'Image is too large (max 8 MB).' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setState({ kind: 'previewing', dataUrl, blob });
    };
    reader.onerror = () => setState({ kind: 'error', message: 'Could not read that image.' });
    reader.readAsDataURL(blob);
  }

  async function openCamera() {
    try {
      const { openLiveCamera } = await import('@/lib/camera/live-camera');
      const blob = await openLiveCamera();
      handleFile(blob);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (msg && msg !== 'cancelled') {
        setState({ kind: 'error', message: 'Camera unavailable. Try uploading a photo instead.' });
      }
    }
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

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-navy-deep text-white">
      {/* Blueprint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:96px_96px]"
      />
      {/* Cobalt halo top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[44rem] w-[44rem] rounded-full bg-cobalt/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[36rem] w-[36rem] rounded-full bg-cobalt-glow/10 blur-3xl"
      />
      <CursorGlow color="rgba(138, 176, 224, 0.18)" size={560} />

      <div className="relative mx-auto max-w-[68rem] px-6 py-20 md:py-28">
        <AnimatePresence mode="wait">
          {state.kind === 'idle' && (
            <motion.div
              key="idle"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <IdleScreen onFile={handleFile} onCamera={openCamera} />
            </motion.div>
          )}

          {state.kind === 'previewing' && (
            <motion.div
              key="previewing"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PreviewScreen
                dataUrl={state.dataUrl}
                consent={consent}
                onConsent={setConsent}
                onAnalyse={analyze}
                onReset={reset}
              />
            </motion.div>
          )}

          {state.kind === 'loading' && (
            <motion.div
              key="loading"
              initial={reduced ? { opacity: 0 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LoadingScreen step={PROGRESS_STEPS[progressIdx]} reduced={reduced} />
            </motion.div>
          )}

          {state.kind === 'error' && (
            <motion.div
              key="error"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <ErrorScreen message={state.message} onReset={reset} />
            </motion.div>
          )}

          {state.kind === 'result' && (
            <motion.div
              key="result"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <ResultScreen data={state.data} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────── IDLE ─────────────────────────── */

function IdleScreen({
  onFile,
  onCamera,
}: {
  onFile: (f: File) => void;
  onCamera: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
      <div>
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
            <span aria-hidden="true" className="h-px w-8 bg-cobalt-glow" />
            The Skin Quiz
          </span>
        </Reveal>
        <SplitReveal
          as="h1"
          text="One selfie. *Thirty seconds.*"
          italicMarkers
          baseDelay={0.1}
          stagger={0.06}
          className={cn(
            'font-display font-light text-white',
            'text-[clamp(40px,7vw,84px)] leading-[0.95] tracking-[-0.025em]',
            '[&_.italic_span]:text-cobalt-glow',
          )}
        />
        <Reveal>
          <p className="mt-6 max-w-[40rem] font-display italic text-[clamp(16px,1.5vw,20px)] leading-relaxed text-white/80">
            GPT-4o vision reads texture, tone, and concern markers from your
            photo, then routes you to the Clarté MD protocol most likely to
            help. Free. No signup.
          </p>
        </Reveal>
        <Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/55 sm:grid-cols-3 sm:gap-x-6">
            <li>· Even light</li>
            <li>· No filter</li>
            <li>· No makeup if possible</li>
          </ul>
        </Reveal>
      </div>

      {/* Right: the cinematic dropzone */}
      <Reveal delay={0.15}>
        <label
          className={cn(
            'group relative isolate flex aspect-[4/5] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/25 bg-white/5 p-8 text-center backdrop-blur-md',
            'transition-[border-color,background-color,transform] duration-300',
            'hover:border-cobalt-glow/60 hover:bg-white/8 hover:scale-[1.01]',
          )}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
          {/* Animated corner brackets */}
          <span aria-hidden="true" className="pointer-events-none absolute left-6 top-6 h-6 w-6 border-l border-t border-cobalt-glow/60" />
          <span aria-hidden="true" className="pointer-events-none absolute right-6 top-6 h-6 w-6 border-r border-t border-cobalt-glow/60" />
          <span aria-hidden="true" className="pointer-events-none absolute left-6 bottom-6 h-6 w-6 border-l border-b border-cobalt-glow/60" />
          <span aria-hidden="true" className="pointer-events-none absolute right-6 bottom-6 h-6 w-6 border-r border-b border-cobalt-glow/60" />

          {/* Soft pulse halo */}
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: [0.9, 1.06, 0.9], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-32 w-32 rounded-full bg-cobalt-glow/15 blur-2xl"
          />

          <span className="relative z-10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-cobalt-glow/40 bg-navy/40 text-cobalt-glow">
            <Upload className="h-6 w-6" />
          </span>
          <span className="relative z-10 font-display text-[clamp(20px,2.4vw,26px)] font-light italic leading-tight text-white">
            Drop your selfie here
          </span>
          <span className="relative z-10 mt-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/55">
            JPG · PNG · WebP &middot; max 8 MB
          </span>

          <div className="relative z-10 mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic strength={5}>
              <span
                className={cn(
                  'inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-navy-deep',
                  'font-mono text-[11px] font-semibold uppercase tracking-[0.18em]',
                  'transition-colors duration-300 group-hover:bg-cobalt-glow',
                )}
              >
                <Upload className="h-3.5 w-3.5" /> Choose file
              </span>
            </Magnetic>
            <Magnetic strength={4}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCamera();
                }}
                className={cn(
                  'inline-flex h-12 items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 text-white backdrop-blur',
                  'font-mono text-[11px] font-semibold uppercase tracking-[0.18em]',
                  'transition-[background-color,border-color] duration-300 hover:border-white hover:bg-white/12',
                )}
              >
                <Camera className="h-3.5 w-3.5" /> Live camera
              </button>
            </Magnetic>
          </div>
        </label>
      </Reveal>
    </div>
  );
}

/* ────────────────────────── PREVIEW ────────────────────────── */

function PreviewScreen({
  dataUrl,
  consent,
  onConsent,
  onAnalyse,
  onReset,
}: {
  dataUrl: string;
  consent: boolean;
  onConsent: (v: boolean) => void;
  onAnalyse: () => void;
  onReset: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
      <Reveal>
        <div className="relative isolate aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="Selfie preview" className="h-full w-full object-cover" />
          {/* Specimen frame markers */}
          <span aria-hidden="true" className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-cobalt-glow" />
          <span aria-hidden="true" className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-cobalt-glow" />
          <span aria-hidden="true" className="absolute left-4 bottom-4 h-6 w-6 border-l-2 border-b-2 border-cobalt-glow" />
          <span aria-hidden="true" className="absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2 border-cobalt-glow" />
          <span className="absolute left-4 top-4 -translate-y-8 font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt-glow">
            Specimen received
          </span>
        </div>
      </Reveal>

      <RevealGroup stagger={0.08} baseDelay={0.1}>
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
            <span aria-hidden="true" className="h-px w-8 bg-cobalt-glow" />
            Preview &amp; consent
          </span>
        </Reveal>
        <Reveal>
          <h2 className="mt-4 font-display font-light italic text-white text-[clamp(34px,5vw,56px)] leading-[1.02] tracking-[-0.02em]">
            Looks good. Ready?
          </h2>
        </Reveal>
        <Reveal>
          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-white/12 bg-white/5 p-4 text-[14px] leading-relaxed text-white/80 backdrop-blur transition-colors hover:bg-white/8">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => onConsent(e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer accent-cobalt-glow"
            />
            <span>
              I understand this is an AI triage, not a clinical diagnosis. I
              consent to my photo being processed once for this analysis, after
              which it is deleted from Clarté's servers within 90 days.
            </span>
          </label>
        </Reveal>
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={6}>
              <button
                type="button"
                onClick={onAnalyse}
                disabled={!consent}
                className={cn(
                  'group/cta inline-flex h-14 items-center gap-3 rounded-md px-7',
                  'font-mono text-[12px] font-semibold uppercase tracking-[0.18em]',
                  'transition-[background-color,opacity] duration-300',
                  consent
                    ? 'bg-white text-navy-deep hover:bg-cobalt-glow'
                    : 'bg-white/30 text-white/60 cursor-not-allowed',
                )}
              >
                Analyse my skin
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-12 items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Different photo
            </button>
          </div>
        </Reveal>
      </RevealGroup>
    </div>
  );
}

/* ────────────────────────── LOADING ────────────────────────── */

function LoadingScreen({ step, reduced }: { step: string; reduced: boolean }) {
  return (
    <div className="mx-auto max-w-[48rem] text-center">
      <Reveal>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
          <motion.span
            aria-hidden="true"
            animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-cobalt-glow"
          />
          Analysing &middot; GPT-4o vision
        </span>
      </Reveal>
      <Reveal>
        <h2 className="mt-6 font-display font-light italic text-white text-[clamp(36px,5.5vw,64px)] leading-[1.02] tracking-[-0.02em]">
          Reading your skin…
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-14 grid h-32 w-32 place-items-center">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-cobalt-glow/30"
          animate={reduced ? undefined : { scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-3 rounded-full border border-cobalt-glow/40"
          animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />
        <Loader2
          className={cn('h-10 w-10 text-cobalt-glow', !reduced && 'animate-spin')}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-10 font-display italic text-[clamp(15px,1.6vw,18px)] text-white/85"
        >
          {step}
        </motion.p>
      </AnimatePresence>

      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/45">
        Usually 15–30 seconds &middot; Don&apos;t close this tab
      </p>
    </div>
  );
}

/* ────────────────────────── ERROR ────────────────────────── */

function ErrorScreen({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <div className="mx-auto max-w-[44rem] text-center">
      <Reveal>
        <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-rust">
          <ShieldAlert className="h-3.5 w-3.5" /> Error 01
        </span>
      </Reveal>
      <Reveal>
        <h2 className="font-display font-light text-white text-[clamp(34px,5vw,56px)] leading-[1.05] tracking-[-0.02em]">
          Specimen <em className="italic text-cobalt-glow">unreadable.</em>
        </h2>
      </Reveal>
      <Reveal>
        <p className="mt-4 font-display italic text-[clamp(15px,1.6vw,18px)] leading-relaxed text-white/75">
          {message}
        </p>
      </Reveal>
      <Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={5}>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-cobalt-glow"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Try again
            </button>
          </Magnetic>
          <a
            href="https://wa.me/923249986822?text=Hi%2C%20the%20Clart%C3%A9%20MD%20skin%20quiz%20didn%27t%20work%20for%20me.%20Can%20you%20help%3F"
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp our team
          </a>
        </div>
      </Reveal>
    </div>
  );
}

/* ────────────────────────── RESULT ────────────────────────── */

function ResultScreen({ data, onReset }: { data: AnalysisResult; onReset: () => void }) {
  if (data.recommended_protocol === 'see-doctor-in-person') {
    return (
      <div className="mx-auto max-w-[48rem] text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-rust">
            <ShieldAlert className="h-3.5 w-3.5" /> Please see a doctor
          </span>
        </Reveal>
        <Reveal>
          <h2 className="mt-4 font-display font-light text-white text-[clamp(34px,5vw,56px)] leading-[1.05] tracking-[-0.02em]">
            This one needs an{' '}
            <em className="italic text-cobalt-glow">in-person consult.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-4 max-w-[40rem] mx-auto font-display italic text-[16px] leading-relaxed text-white/80">
            Based on what we saw, the Clarté MD protocols aren't the right
            starting point for your concern. We strongly recommend an in-person
            dermatologist visit before any topical regimen.
          </p>
        </Reveal>
        {data.warnings.length > 0 && (
          <Reveal>
            <ul className="mx-auto mt-6 max-w-[36rem] space-y-2 rounded-xl border-l-2 border-rust bg-rust/8 p-4 text-left">
              {data.warnings.map((w, i) => (
                <li key={i} className="flex gap-2 font-display italic text-[14px] text-white/85">
                  <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-rust" /> {w}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={5}>
              <a
                href="https://wa.me/923249986822?text=Hi%2C%20the%20skin%20quiz%20recommended%20I%20see%20a%20doctor%20in%20person.%20Can%20you%20help%20with%20a%20referral%3F"
                target="_blank"
                rel="noopener"
                className="inline-flex h-14 items-center gap-2 rounded-md bg-white px-7 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-cobalt-glow"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp for a referral
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-12 items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Re-take the quiz
            </button>
          </div>
        </Reveal>
      </div>
    );
  }

  const rec = PROTOCOL_ROUTES[data.recommended_protocol];

  return (
    <div className="mx-auto max-w-[60rem]">
      <Reveal>
        <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Your result &middot; Severity: {data.severity} &middot; Confidence: {data.confidence}
        </div>
      </Reveal>
      <Reveal>
        <h2 className="font-display font-light text-white text-[clamp(36px,6vw,72px)] leading-[0.96] tracking-[-0.025em]">
          Recommended:{' '}
          <em className="italic text-cobalt-glow">
            {rec?.name || data.recommended_protocol}
          </em>
        </h2>
      </Reveal>
      <Reveal>
        <p className="mt-6 max-w-[44rem] font-display italic text-[clamp(16px,1.7vw,20px)] leading-relaxed text-white/85">
          Based on{' '}
          <span className="font-semibold not-italic text-white">
            {data.primary_concerns.join(', ')}
          </span>
          {data.secondary_concerns.length > 0 && (
            <>
              {' '}
              (with minor{' '}
              <span className="not-italic text-white/70">
                {data.secondary_concerns.join(', ')}
              </span>
              )
            </>
          )}
          . Expected timeline:{' '}
          <span className="font-semibold not-italic text-cobalt-glow">
            {data.expected_timeline_weeks} weeks
          </span>
          .
        </p>
      </Reveal>

      {/* Card with actives + warnings + CTA */}
      <Reveal>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 md:grid-cols-2">
          {data.recommended_actives.length > 0 && (
            <div className="bg-navy-deep/60 p-7 backdrop-blur md:p-9">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt-glow">
                — Actives in this protocol
              </span>
              <ul className="mt-4 space-y-2.5">
                {data.recommended_actives.map((a, i) => (
                  <li key={i} className="flex items-baseline gap-3 font-display italic text-[15px] text-white">
                    <span aria-hidden="true" className="text-cobalt-glow">·</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.warnings.length > 0 && (
            <div className="bg-navy-deep/60 p-7 backdrop-blur md:p-9">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-rust">
                — Notes
              </span>
              <ul className="mt-4 space-y-2.5">
                {data.warnings.map((w, i) => (
                  <li key={i} className="flex items-baseline gap-3 font-display italic text-[14px] text-white/80">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-rust" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {rec && (
            <Magnetic strength={6}>
              <Link
                href={rec.path}
                className={cn(
                  'group/cta relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-md bg-white px-7 text-navy-deep',
                  'font-mono text-[12px] font-semibold uppercase tracking-[0.18em] no-underline',
                  'shadow-[0_18px_36px_-16px_rgba(0,0,0,0.55)]',
                  'transition-colors duration-300 hover:bg-cobalt-glow',
                )}
              >
                {/* Protocol accent stripe */}
                <span aria-hidden="true" className={cn('absolute left-0 top-0 h-full w-1', rec.accentClass)} />
                <span className="pl-2">Start {rec.name}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
            </Magnetic>
          )}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-12 items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Re-take the quiz
          </button>
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-10 max-w-[44rem] rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-display italic text-[13px] leading-relaxed text-white/55 backdrop-blur">
          This is an AI triage aid, not a clinical diagnosis. For complex
          cases, please consult an in-person dermatologist before starting any
          regimen.
        </p>
      </Reveal>
    </div>
  );
}
