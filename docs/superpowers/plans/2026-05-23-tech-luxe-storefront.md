# Tech-Luxe Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Clarté MD storefront to a tech-luxe (Apple/Hermès) register with scroll-driven motion, magnetic interactions, and cinematic product photography — without breaking the existing Bader-grade editorial restraint or the e-commerce flow.

**Architecture:** Add `motion` + `lenis` as the animation/scroll foundation. Build 6 small animation primitives under `lib/anim/` that every page composes. Generate 12 cinematic product/bundle hero images via Higgsfield. Apply primitives page-by-page (home → catalog → PDP → cart → checkout → chrome).

**Tech Stack:** Next.js 15 (app router, Turbopack), React 19, TypeScript, Tailwind v4, `motion@^12`, `lenis@^1.3`, Higgsfield (image generation), existing radix-ui primitives.

**Spec:** [docs/superpowers/specs/2026-05-23-tech-luxe-storefront-design.md](../specs/2026-05-23-tech-luxe-storefront-design.md)

**Verification model for UI work:** This is a visual/interaction redesign. TDD-style unit tests for "does this animation feel right" produce zero signal. We verify at task boundaries via:
1. `npx tsc --noEmit` (type safety after every change)
2. `npm run build` (compiler + tree-shake passes) at phase boundaries
3. Browser walkthrough at every page-level task (dev server + manual check + reduced-motion mode)

This is a deliberate departure from strict TDD. Animation/visual specs don't unit-test well; the spec's per-section intent is the contract, and the browser is the assertion.

---

## Phase 0 — Foundation (deps, primitives, globals)

### Task 1: Install motion + lenis

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (auto)

- [ ] **Step 1: Install both packages**

Run:
```
npm install motion@^12 lenis@^1.3
```

Expected: both installed, no peer-dep warnings on React 19. If a React 19 warning appears for `motion`, confirm the warning is about old "framer-motion" peer (safe to ignore — `motion` v12 declares React 19 compatible).

- [ ] **Step 2: Verify install**

Run:
```
npx tsc --noEmit
```
Expected: no errors. The new packages aren't imported anywhere yet.

- [ ] **Step 3: Commit**

```
git add package.json package-lock.json
git commit -m "feat(deps): add motion and lenis for tech-luxe animations"
```

---

### Task 2: Add animation tokens + reduced-motion override to globals.css

**Files:**
- Modify: `app/globals.css` (append a new block at the end)

- [ ] **Step 1: Append animation tokens**

Append the following at the end of `app/globals.css`:

```css
/* ─────────────────────────────────────────────────────────────
   Tech-luxe motion tokens — added 2026-05-23.
   Used by lib/anim primitives. Keep durations conservative;
   premium ≠ slow. Easing is the "luxe" out-quint we use everywhere.
   ───────────────────────────────────────────────────────────── */
@theme inline {
  --ease-luxe: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 200ms;
  --dur-base: 400ms;
  --dur-slow: 800ms;
}

/* Ken-Burns slow zoom — used on featured product/bundle photos */
@keyframes kenburns {
  0%, 100% { transform: scale(1.0); }
  50%      { transform: scale(1.05); }
}
.kenburns-anim {
  animation: kenburns 20s ease-in-out infinite;
}

/* Light sweep on hover — used by <CinematicPhoto lightSweep /> */
@keyframes lightsweep {
  0%   { transform: translateX(-110%) skewX(-12deg); }
  100% { transform: translateX(110%) skewX(-12deg); }
}
.lightsweep-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.lightsweep-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    100deg,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 100%
  );
  transform: translateX(-110%) skewX(-12deg);
}
.group:hover .lightsweep-overlay::after {
  animation: lightsweep 1.1s ease-out;
}

/* Global reduced-motion safety net.
   lib/anim primitives are also gated via useReducedMotion(); this is
   the belt-and-braces fallback for any CSS animation we add. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .kenburns-anim {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add app/globals.css
git commit -m "feat(css): add motion tokens, ken-burns, light-sweep, reduced-motion override"
```

---

### Task 3: Create animation hooks

**Files:**
- Create: `lib/anim/hooks.ts`

- [ ] **Step 1: Write hooks file**

Create `lib/anim/hooks.ts`:

```ts
'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion as motionRM } from 'motion/react';

/** Re-export of motion's useReducedMotion (client-only). */
export const useReducedMotion = motionRM;

/**
 * Mouse-tracking magnetic effect. Returns ref + style.
 * `strength` is max translation in px (default 8).
 * No-op when prefers-reduced-motion: reduce.
 */
export function useMagnetic(strength = 8) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      setT({
        x: Math.max(-1, Math.min(1, dx)) * strength,
        y: Math.max(-1, Math.min(1, dy)) * strength,
      });
    }
    function onLeave() {
      setT({ x: 0, y: 0 });
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, reduced]);

  return {
    ref,
    style: {
      transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
      transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
    } as React.CSSProperties,
  };
}

/** Returns true after first client mount. Useful to gate motion props during SSR. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add lib/anim/hooks.ts
git commit -m "feat(anim): add useMagnetic, useMounted, re-export useReducedMotion"
```

---

### Task 4: Create SmoothScrollProvider (Lenis)

**Files:**
- Create: `lib/anim/provider.tsx`

- [ ] **Step 1: Write provider**

Create `lib/anim/provider.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './hooks';

/**
 * Mounts Lenis once on the client. Skips entirely if the user
 * prefers reduced motion — they get native browser scroll.
 *
 * Lenis hijacks wheel events for inertial smoothing. Cap the duration
 * conservatively so it doesn't feel sluggish on long pages.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Guard against double-init in StrictMode.
    if ((window as unknown as { __lenis?: Lenis }).__lenis) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced]);

  return <>{children}</>;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Mount in layout**

Modify `app/layout.tsx`. Add import near top:

```tsx
import { SmoothScrollProvider } from '@/lib/anim/provider';
```

Replace the body content:

```tsx
<body suppressHydrationWarning>
  <SmoothScrollProvider>
    <CartProvider>{children}</CartProvider>
  </SmoothScrollProvider>
</body>
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`
Visit `http://localhost:3000`. Scroll the home page with mouse wheel. Confirm the scroll feels smoother (slight inertia). Open DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" — confirm scroll snaps back to native (no inertia).

- [ ] **Step 5: Commit**

```
git add lib/anim/provider.tsx app/layout.tsx
git commit -m "feat(anim): mount Lenis smooth-scroll provider, gated on reduced-motion"
```

---

### Task 5: Create <Reveal> and <RevealGroup>

**Files:**
- Create: `lib/anim/reveal.tsx`

- [ ] **Step 1: Write components**

Create `lib/anim/reveal.tsx`:

```tsx
'use client';

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { useReducedMotion } from './hooks';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Stagger delay in seconds. Set by <RevealGroup>. */
  delay?: number;
  /** Y offset in px (default 24). */
  y?: number;
  /** Duration in seconds (default 0.6). */
  duration?: number;
  /** Re-animate every time it enters view (default false = once). */
  repeat?: boolean;
}

/**
 * Fade-up on enter view. Wrap any block to reveal it.
 *   <Reveal>...</Reveal>
 *   <Reveal delay={0.08}>...</Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  repeat = false,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !repeat, margin: '-8% 0px -8% 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  /** Per-child delay in seconds (default 0.08 = 80ms). */
  stagger?: number;
  /** Base delay added to all children (default 0). */
  baseDelay?: number;
}

/**
 * Wraps children that are <Reveal>s and injects an incrementing delay.
 * Non-Reveal children pass through unchanged.
 */
export function RevealGroup({ children, stagger = 0.08, baseDelay = 0 }: RevealGroupProps) {
  let i = 0;
  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement(child) && child.type === Reveal) {
          const el = child as ReactElement<RevealProps>;
          const next = cloneElement(el, { delay: baseDelay + i * stagger });
          i += 1;
          return next;
        }
        return child;
      })}
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add lib/anim/reveal.tsx
git commit -m "feat(anim): add Reveal + RevealGroup primitives"
```

---

### Task 6: Create <Magnetic>

**Files:**
- Create: `lib/anim/magnetic.tsx`

- [ ] **Step 1: Write component**

Create `lib/anim/magnetic.tsx`:

```tsx
'use client';

import { Children, cloneElement, isValidElement, type ReactElement, type Ref } from 'react';
import { useMagnetic } from './hooks';

/**
 * Wraps a single child element (link, button) and gives it
 * cursor-tracking magnetic translation on hover.
 *
 * Child MUST forward `ref` and accept `style`.
 * Most native elements do this; for component children, wrap in a span.
 */
export function Magnetic({
  children,
  strength = 8,
}: {
  children: ReactElement<{ ref?: Ref<HTMLElement>; style?: React.CSSProperties }>;
  strength?: number;
}) {
  const { ref, style } = useMagnetic(strength);
  if (!isValidElement(children)) return children;
  const existingStyle = (children.props.style ?? {}) as React.CSSProperties;
  return cloneElement(Children.only(children), {
    ref: ref as unknown as Ref<HTMLElement>,
    style: { ...existingStyle, ...style, willChange: 'transform' },
  });
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add lib/anim/magnetic.tsx
git commit -m "feat(anim): add Magnetic wrapper for cursor-tracking CTAs"
```

---

### Task 7: Create <CursorGlow>

**Files:**
- Create: `lib/anim/cursor-glow.tsx`

- [ ] **Step 1: Write component**

Create `lib/anim/cursor-glow.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './hooks';

/**
 * Absolutely-positioned radial-gradient that follows the cursor inside its
 * parent. Parent MUST be `position: relative` (or absolute/fixed).
 *
 * Designed for dark sections (navy brand block, PDP cinematic hero).
 * No-op on touch devices and prefers-reduced-motion.
 */
export function CursorGlow({
  color = 'rgba(138, 176, 224, 0.18)', // cobalt-glow @ 18%
  size = 480,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    function onMove(e: MouseEvent) {
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      targetX = e.clientX - r.left;
      targetY = e.clientY - r.top;
    }
    function loop() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (el) {
        el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }
    parent.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced, size]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0 rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color}, transparent 65%)`,
        willChange: 'transform',
      }}
    />
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add lib/anim/cursor-glow.tsx
git commit -m "feat(anim): add CursorGlow for dark luxe sections"
```

---

### Task 8: Create <CinematicPhoto>

**Files:**
- Create: `lib/anim/cinematic-photo.tsx`

- [ ] **Step 1: Write component**

Create `lib/anim/cinematic-photo.tsx`:

```tsx
'use client';

import Image, { type ImageProps } from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from './hooks';

interface CinematicPhotoProps extends Omit<ImageProps, 'fill' | 'placeholder'> {
  /** Parallax scale amount (0 = none, 0.15 = scales 1→1.15). */
  parallax?: number;
  /** Diagonal light-sweep on hover (CSS-only). */
  lightSweep?: boolean;
  /** Slow scale loop (Ken-Burns). */
  kenBurns?: boolean;
  /** Aspect ratio class, e.g. 'aspect-[4/5]'. Defaults to 'aspect-[4/5]'. */
  aspectClass?: string;
  /** Wrapper className. */
  wrapperClassName?: string;
}

/**
 * Cinematic image wrapper. Composes next/image with parallax (scroll-driven scale),
 * an optional hover light-sweep, and an optional Ken-Burns loop.
 *
 * Picks the right effect based on prop combination — most callers use one effect.
 *
 * Reduced-motion: parallax + Ken-Burns disabled. Light-sweep is CSS-only and
 * already nuked by globals.css reduced-motion override.
 */
export function CinematicPhoto({
  parallax = 0,
  lightSweep = false,
  kenBurns = false,
  aspectClass = 'aspect-[4/5]',
  wrapperClassName,
  className,
  alt,
  ...imageProps
}: CinematicPhotoProps) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || parallax === 0 ? [1, 1] : [1, 1 + parallax],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || parallax === 0 ? ['0%', '0%'] : ['0%', '-6%'],
  );

  return (
    <div
      ref={wrap}
      className={cn(
        'group relative overflow-hidden',
        aspectClass,
        wrapperClassName,
      )}
    >
      <motion.div
        className={cn('absolute inset-0', kenBurns && !reduced && 'kenburns-anim')}
        style={parallax > 0 && !reduced ? { scale, y } : undefined}
      >
        <Image
          alt={alt}
          fill
          sizes={imageProps.sizes ?? '100vw'}
          className={cn('object-cover', className)}
          {...imageProps}
        />
      </motion.div>
      {lightSweep && <div className="lightsweep-overlay" aria-hidden="true" />}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add lib/anim/cinematic-photo.tsx
git commit -m "feat(anim): add CinematicPhoto with parallax, light-sweep, ken-burns"
```

---

### Task 9: Phase 0 build gate

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: success. If the build fails, fix before proceeding. The primitives aren't consumed yet — any failure is a typing/import bug.

- [ ] **Step 2: Tag commit**

```
git commit --allow-empty -m "chore: phase 0 (foundation) complete"
```

---

## Phase 1 — Cinematic photography (Higgsfield)

### Task 10: Generate the 4 protocol bundle cinematic shots

**Files:**
- Create: `public/bundles/clear-skin-protocol/cinematic.webp`
- Create: `public/bundles/even-tone-protocol/cinematic.webp`
- Create: `public/bundles/renewal-protocol/cinematic.webp`
- Create: `public/bundles/barrier-protocol/cinematic.webp`

This task uses the Higgsfield MCP tools. They are not version-controlled — each shot must be generated, downloaded, and committed.

- [ ] **Step 1: Generate clear-skin protocol shot**

Prompt for `generate_image`:
> "Editorial product photography of a complete skincare kit — multiple unmarked apothecary-style glass dropper bottles and one ceramic jar — arranged on raw concrete texture with morning side-light, soft cool shadows, single willow branch as accent, dark slate-blue gradient background fading to black, 16:9 cinematic crop, shallow depth of field, La Mer / Augustinus Bader luxury beauty editorial register, no humans, no text, no watermarks."

Use `aspect_ratio: "16:9"`, high quality. Save the result to `public/bundles/clear-skin-protocol/cinematic.webp` (convert from PNG/JPG if needed via `sharp` CLI or browser export).

- [ ] **Step 2: Generate even-tone protocol shot**

Prompt:
> "Editorial product photography of a luxury skincare kit on white Carrara marble with subtle brass accents, warm morning light from upper-left, fresh citrus zest and a single rose scattered as ingredient props, deep navy gradient backdrop, 16:9 cinematic crop, shallow depth of field, Hermès Beauty register, no humans, no text."

Save to `public/bundles/even-tone-protocol/cinematic.webp`.

- [ ] **Step 3: Generate renewal protocol shot**

Prompt:
> "Editorial product photography of an evening luxury skincare kit on aged oak wood with raw linen drape, low candlelit warm side-light, single olive leaf and a small dish of golden serum, deep aubergine gradient background, 16:9 cinematic crop, shallow depth of field, Byredo / Le Labo register, no humans, no text."

Save to `public/bundles/renewal-protocol/cinematic.webp`.

- [ ] **Step 4: Generate barrier protocol shot**

Prompt:
> "Editorial product photography of a gentle skincare kit on raw natural linen with chalk and white stone textures, diffused soft northern daylight, single oat sprig and a small clear-water dish, pale sage and warm cream gradient backdrop, 16:9 cinematic crop, shallow depth of field, Aesop / Tatcha register, no humans, no text."

Save to `public/bundles/barrier-protocol/cinematic.webp`.

- [ ] **Step 5: Sanity-check files**

Run from project root:
```
ls public/bundles/clear-skin-protocol/cinematic.webp public/bundles/even-tone-protocol/cinematic.webp public/bundles/renewal-protocol/cinematic.webp public/bundles/barrier-protocol/cinematic.webp
```
Expected: all four files exist, each between 80 KB and 600 KB.

- [ ] **Step 6: Commit**

```
git add public/bundles/
git commit -m "feat(assets): add 4 cinematic protocol bundle hero shots"
```

---

### Task 11: Generate the 8 product cinematic shots

**Files:**
- Create: `public/products/{prep,rescue,vitc,acne,ha,reti,light,spf}/cinematic.webp`

- [ ] **Step 1: Generate `prep` (cleanser)**

Prompt:
> "Editorial product photography of a single matte amber glass cleanser bottle on a slate-blue gradient backdrop, dramatic single side-light from camera-right, water beads visible on glass, soft shadow on dark wet surface, 4:5 portrait crop, shallow depth of field, Augustinus Bader register, no text, no watermarks."

Save to `public/products/prep/cinematic.webp`.

- [ ] **Step 2: Generate `rescue` (barrier balm)**

Prompt:
> "Editorial product photography of a matte ceramic jar of skincare balm, warm low side-light, single oat sprig as ingredient prop, raw linen surface, deep warm beige gradient backdrop, 4:5 portrait crop, shallow depth of field, Tatcha register, no text."

Save to `public/products/rescue/cinematic.webp`.

- [ ] **Step 3: Generate `vitc` (vitamin C serum)**

Prompt:
> "Editorial product photography of a clear glass serum dropper bottle filled with amber-gold liquid, scattered fresh orange zest and one rose, polished black surface, morning warm side-light, deep navy gradient backdrop, 4:5 portrait crop, shallow depth of field, luxury beauty register, no text."

Save to `public/products/vitc/cinematic.webp`.

- [ ] **Step 4: Generate `acne` (niacinamide serum)**

Prompt:
> "Editorial product photography of a frosted glass serum dropper bottle, cool blue clinical side-light, single willow branch as ingredient prop, polished slate surface, deep slate-blue gradient backdrop, 4:5 portrait crop, shallow depth of field, La Mer register, no text."

Save to `public/products/acne/cinematic.webp`.

- [ ] **Step 5: Generate `ha` (hyaluronic serum)**

Prompt:
> "Editorial product photography of a clear glass serum dropper bottle of viscous clear liquid, large refractive water droplet hero in foreground, cool aqua side-light, glossy black surface, deep ocean-blue gradient backdrop, 4:5 portrait crop, shallow depth of field, beauty editorial register, no text."

Save to `public/products/ha/cinematic.webp`.

- [ ] **Step 6: Generate `reti` (retinol)**

Prompt:
> "Editorial product photography of an opaque amber glass serum dropper bottle, evening warm gradient side-light, single olive leaf as ingredient prop, aged oak surface, deep aubergine gradient backdrop, 4:5 portrait crop, shallow depth of field, Byredo register, no text."

Save to `public/products/reti/cinematic.webp`.

- [ ] **Step 7: Generate `light` (pigmentation serum)**

Prompt:
> "Editorial product photography of a clear glass serum dropper bottle of pale pink liquid, soft morning daylight, white Carrara marble surface, single white camellia bloom as accent, pale ivory gradient backdrop, 4:5 portrait crop, shallow depth of field, luxury Korean beauty register, no text."

Save to `public/products/light/cinematic.webp`.

- [ ] **Step 8: Generate `spf` (sunscreen)**

Prompt:
> "Editorial product photography of a sleek matte ceramic tube of sunscreen, warm sun-side-light, single fresh aloe leaf as accent, fine sand texture surface, warm cream-to-amber gradient backdrop, 4:5 portrait crop, shallow depth of field, Hermès Beauty register, no text."

Save to `public/products/spf/cinematic.webp`.

- [ ] **Step 9: Sanity-check all 8**

Run:
```
ls public/products/prep/cinematic.webp public/products/rescue/cinematic.webp public/products/vitc/cinematic.webp public/products/acne/cinematic.webp public/products/ha/cinematic.webp public/products/reti/cinematic.webp public/products/light/cinematic.webp public/products/spf/cinematic.webp
```
Expected: all 8 exist.

- [ ] **Step 10: Commit**

```
git add public/products/*/cinematic.webp
git commit -m "feat(assets): add 8 cinematic product hero shots"
```

---

### Task 12: Extend `productImagePaths` to expose cinematic path

**Files:**
- Modify: `lib/products/content.ts` (around line 412)

- [ ] **Step 1: Update helper**

Find the existing `productImagePaths` function and replace with:

```ts
export function productImagePaths(sku: string) {
  return {
    hero: `/products/${sku}/hero.webp`,
    cinematic: `/products/${sku}/cinematic.webp`,
    views: [
      `/products/${sku}/view-1.webp`,
      `/products/${sku}/view-2.webp`,
      `/products/${sku}/view-3.webp`,
    ],
  };
}
```

Also add a parallel helper for bundles at the very bottom of the file:

```ts
/** Path to the cinematic protocol-bundle hero shot. */
export function bundleCinematicPath(slug: string) {
  return `/bundles/${slug}/cinematic.webp`;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (existing callers using `hero` and `views` are unaffected).

- [ ] **Step 3: Commit**

```
git add lib/products/content.ts
git commit -m "feat(content): expose cinematic image paths for products and bundles"
```

---

## Phase 2 — Home page

### Task 13: Redesign home hero (cinematic split + line reveals + magnetic CTA)

**Files:**
- Modify: `app/(site)/page.tsx` (HERO section, lines ~96-159)
- Modify: `app/(site)/page.tsx` (add imports at top)

- [ ] **Step 1: Add imports**

Near the top of `app/(site)/page.tsx`, add:

```tsx
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { CinematicPhoto } from '@/lib/anim/cinematic-photo';
import { bundleCinematicPath } from '@/lib/products/content';
```

- [ ] **Step 2: Replace HERO section markup**

Find the section starting `{/* HERO — Bader-grade. */}` and ending at the closing `</section>` before the receipt band. Replace the inner `<div className="mx-auto max-w-[75rem]...">` block with a two-column grid:

```tsx
<section className="relative overflow-hidden bg-canvas">
  <div className="mx-auto grid max-w-[75rem] grid-cols-1 items-end gap-10 px-6 pt-24 pb-20 md:pt-32 md:pb-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-40 lg:pb-32">
    <div>
      <RevealGroup stagger={0.1}>
        <Reveal>
          <div className="mb-12 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute md:mb-16">
            Clarté MD · Lahore, Pakistan
          </div>
        </Reveal>
        <Reveal>
          <h1
            className={cn(
              'mb-8 font-display font-light text-navy',
              'text-[clamp(48px,8vw,96px)] leading-[0.95] tracking-[-0.025em]',
              'max-w-[64rem]',
            )}
          >
            Dermatologist-led skincare,
            <br />
            <em className="italic text-cobalt">for Pakistan.</em>
          </h1>
        </Reveal>
        <Reveal>
          <p
            className={cn(
              'mb-12 max-w-[40rem] font-display italic text-ink-2',
              'text-[clamp(18px,2vw,24px)] leading-[1.4]',
            )}
          >
            A twelve-week protocol per concern, dosed by our GMC-registered doctor.
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-5">
            <Magnetic strength={6}>
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-[15px] font-medium tracking-wide"
              >
                <Link href="/quiz" className="inline-flex items-center gap-2">
                  Find your protocol
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
            <Link
              href="/products"
              className="text-sm text-ink-mute underline-offset-4 transition-colors hover:text-navy hover:underline"
            >
              Or browse the catalogue
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            <span>30-Second AI Skin Quiz</span>
            <span aria-hidden="true">·</span>
            <span>Made in Lahore</span>
            <span aria-hidden="true">·</span>
            <span>COD across Pakistan</span>
          </div>
        </Reveal>
      </RevealGroup>
    </div>
    {featured && (
      <Reveal delay={0.2} className="hidden lg:block">
        <CinematicPhoto
          src={bundleCinematicPath(featured.slug)}
          alt={`${featured.name} cinematic still`}
          width={900}
          height={1125}
          priority
          parallax={0.12}
          aspectClass="aspect-[4/5]"
          wrapperClassName="rounded-3xl border border-sand/40 shadow-[0_30px_60px_-20px_rgba(14,31,58,0.25)]"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </Reveal>
    )}
  </div>
</section>
```

- [ ] **Step 3: Browser check**

Run: `npm run dev`. Visit `/`. Confirm:
  - Headline + sub copy reveal in sequence on load (each line 80ms apart)
  - Primary CTA softly tracks cursor on hover
  - Right column shows the clear-skin cinematic shot (desktop only)
  - Image subtly scales as you scroll past the hero
  - Toggle reduced-motion in DevTools → all reveals/parallax/magnetic become no-ops

- [ ] **Step 4: Commit**

```
git add app/(site)/page.tsx
git commit -m "feat(home): cinematic split hero with line reveals and magnetic CTA"
```

---

### Task 14: Animate receipt band + redesign protocols grid

**Files:**
- Modify: `app/(site)/page.tsx` (RECEIPT BAND section + PROTOCOLS section)

- [ ] **Step 1: Wrap receipt stats with Reveal**

Find the `<dl>` block in the RECEIPT BAND section. Replace with:

```tsx
<RevealGroup stagger={0.1}>
  <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-12">
    <Reveal><PendingStat label="Visible improvement reported at week 8" /></Reveal>
    <Reveal><PendingStat label="Would recommend the protocol to a friend" /></Reveal>
    <Reveal><PendingStat label="Routine still active at week 12" /></Reveal>
  </dl>
</RevealGroup>
```

Also wrap the `<header>` and trailing `<p>` of the receipt band in `<Reveal>` each.

- [ ] **Step 2: Upgrade featured protocol card**

Find the `{featured && (` Link block in PROTOCOLS section. Add a cinematic background image. Replace the contents of the Link with:

```tsx
<Link
  href={PROTOCOL_ROUTES[featured.slug] || '/'}
  className={cn(
    'group relative flex min-h-[32rem] flex-col justify-between overflow-hidden',
    'rounded-3xl border border-sand/40 bg-canvas-soft p-10 md:p-14',
    'no-underline text-inherit isolate',
    'transition-[border-color,box-shadow] duration-500',
    'hover:border-navy/30 hover:shadow-[0_30px_60px_-20px_rgba(14,31,58,0.18)]',
  )}
>
  {/* Cinematic background */}
  <div className="absolute inset-0 -z-10">
    <CinematicPhoto
      src={bundleCinematicPath(featured.slug)}
      alt=""
      width={1200}
      height={900}
      kenBurns
      aspectClass="h-full w-full"
      wrapperClassName="h-full w-full"
      className="opacity-[0.18] mix-blend-multiply"
      sizes="(min-width: 1024px) 60vw, 100vw"
    />
  </div>
  <div
    aria-hidden="true"
    className={cn(
      'absolute left-0 top-0 h-full w-1.5 origin-top transition-transform duration-500 group-hover:scale-y-110',
      PROTOCOL_ACCENT_CLASS[featured.slug],
    )}
  />
  {/* keep the existing inner content (Eyebrow, h3, p, price footer) unchanged */}
  <div>
    <Eyebrow className="mb-4 text-ink-mute">
      Most prescribed · {CONCERN_LABELS[featured.concern]}
    </Eyebrow>
    <h3 className="mb-6 font-display font-light text-navy text-[clamp(34px,4.5vw,52px)] leading-[1.05] tracking-[-0.02em]">
      <em className="italic">{featured.name.split(' ').slice(0, -1).join(' ')}</em>{' '}
      <span className="font-normal">{featured.name.split(' ').slice(-1)}</span>
    </h3>
    <p className="max-w-[28rem] font-display italic text-base leading-relaxed text-ink-2 md:text-lg">
      {PROTOCOL_TAGLINES[featured.slug]}
    </p>
  </div>
  <div className="mt-10 flex items-baseline justify-between border-t border-sand/40 pt-6">
    <span className="font-display text-2xl text-navy md:text-3xl">
      Rs. {featured.pricePkr.toLocaleString()}
    </span>
    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-cobalt transition-transform duration-300 group-hover:translate-x-1">
      Start the protocol
      <ArrowUpRight className="h-3.5 w-3.5" />
    </span>
  </div>
</Link>
```

Wrap the whole grid (`<div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">`) in a `<Reveal>`.

- [ ] **Step 3: Upgrade supporting cards (accent bar grows on hover)**

For each supporting Link in `.map(supporting...)`, change the accent bar div from:

```tsx
className={cn('absolute left-0 top-0 h-full w-1', PROTOCOL_ACCENT_CLASS[b.slug])}
```

to:

```tsx
className={cn(
  'absolute left-0 top-0 h-full w-1 origin-top transition-transform duration-500 group-hover:scale-y-110',
  PROTOCOL_ACCENT_CLASS[b.slug],
)}
```

Also wrap the entire `.map(supporting...)` result in a `<RevealGroup stagger={0.08}>` and wrap each generated Link in `<Reveal key={b.id}>`.

- [ ] **Step 4: Browser check**

Visit `/`. Confirm:
  - Receipt stats fade up in sequence on scroll
  - Featured protocol card shows the cinematic shot at 18% opacity, slowly Ken-Burns scaling
  - Hover the featured card → border darkens, soft shadow appears, accent bar scales up
  - Supporting cards stagger in on view, accent bar grows on hover

- [ ] **Step 5: Commit**

```
git add app/(site)/page.tsx
git commit -m "feat(home): cinematic backdrop + reveal + hover-bar on protocols grid"
```

---

### Task 15: Animate How-it-works + product strip + brand block + final CTA

**Files:**
- Modify: `app/(site)/page.tsx`

- [ ] **Step 1: How-it-works stagger**

Wrap the `<ol>` in the HOW IT WORKS section:

```tsx
<RevealGroup stagger={0.12}>
  <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
    <Reveal>
      <HowStep num="01" title="Take the quiz" body="Upload a selfie..." />
    </Reveal>
    <Reveal>
      <HowStep num="02" title="We dispatch" body="Each protocol is..." />
    </Reveal>
    <Reveal>
      <HowStep num="03" title="Pay on arrival" body="Cash on delivery..." />
    </Reveal>
  </ol>
</RevealGroup>
```

Keep the existing body strings unchanged (use the ones already in the file).

Also wrap the `<header>` of this section in a `<Reveal>`.

- [ ] **Step 2: Wrap product strip section**

In the INDIVIDUAL PRODUCTS section, wrap the `<header>` in a `<Reveal>` and wrap the scroll-snap/grid `<div>` in `<RevealGroup stagger={0.05}>` with each product wrapped in `<Reveal>`:

```tsx
<RevealGroup stagger={0.05}>
  <div className={cn('-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4', /* ...existing classes... */)}>
    {orderedProducts.map((p) => (
      <Reveal key={p.id}>
        <div className="w-[72%] flex-shrink-0 snap-start sm:w-auto sm:flex-shrink">
          <ProductCard product={p} />
        </div>
      </Reveal>
    ))}
  </div>
</RevealGroup>
```

Wrap the trailing "View the full catalogue" link's container in a `<Reveal>` too.

- [ ] **Step 3: Add CursorGlow + cinematic image to navy brand block**

In the BRAND STORY section (the dark `bg-navy` section), do two things:

(a) Add `<CursorGlow color="rgba(138, 176, 224, 0.2)" size={520} />` as the **first child** inside the `<section>` element so the parent positions it correctly (the section is already `relative`).

(b) Replace the placeholder gradient div on the right with a cinematic photo. Replace:

```tsx
<div
  aria-hidden="true"
  className={cn(
    'flex aspect-[4/5] items-center justify-center rounded-2xl',
    'bg-gradient-to-br from-navy-2 via-[#1c2b4a] to-[#243958]',
    'border border-white/5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30',
  )}
>
  <span>Doctor / clinic still life</span>
</div>
```

With:

```tsx
<CinematicPhoto
  src="/bundles/renewal-protocol/cinematic.webp"
  alt=""
  width={800}
  height={1000}
  parallax={0.1}
  aspectClass="aspect-[4/5]"
  wrapperClassName="rounded-2xl border border-white/5"
  className="opacity-90"
  sizes="(min-width: 1024px) 40vw, 90vw"
/>
```

(Renewal's evening / aubergine palette matches the navy block best — the spec called for a doctor/clinic still but for Phase 1 we reuse a generated bundle shot. A bespoke doctor shot is deferred.)

Wrap the section's two columns (left text + right image) each in their own `<Reveal>` (the right one gets `delay={0.15}`).

- [ ] **Step 4: Magnetic final CTA**

In the FINAL CTA section, wrap the `<Button>` with `<Magnetic strength={6}>` (identical pattern to the hero):

```tsx
<Magnetic strength={6}>
  <Button asChild size="lg" className="h-14 px-8 text-[15px]">
    <Link href="/quiz" className="inline-flex items-center gap-2">
      Take the skin quiz
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  </Button>
</Magnetic>
```

Also wrap the surrounding `<Eyebrow>`, `<h2>`, and `<Magnetic>` block in `<RevealGroup stagger={0.1}>` with each as a `<Reveal>`.

- [ ] **Step 5: Browser check**

Walk the whole home page. Confirm every section reveals on scroll, the navy block has the cursor-glow effect (move mouse around — soft blue blob follows), the final CTA is magnetic. Toggle reduced-motion and confirm everything snaps to a clean, motionless layout.

- [ ] **Step 6: Commit**

```
git add app/(site)/page.tsx
git commit -m "feat(home): reveals + magnetic CTA + cursor-glow on remaining sections"
```

---

### Task 16: Phase 2 build gate

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: success. Check the build output for the first-load JS delta on `/` — should be ~50-60 kB more than before (motion+lenis added).

- [ ] **Step 2: Commit**

```
git commit --allow-empty -m "chore: phase 2 (home) complete"
```

---

## Phase 3 — Products list + PDP

### Task 17: Upgrade ProductCard with hover-tilt and cinematic crossfade

**Files:**
- Modify: `components/product/ProductCard.tsx`

- [ ] **Step 1: Convert to motion-driven card**

Replace the existing file with:

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';
import { PRODUCT_CONTENT, productImagePaths } from '@/lib/products/content';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const reduced = useReducedMotion();
  const content = PRODUCT_CONTENT[product.sku];
  const images = content ? productImagePaths(product.sku) : null;
  const heroImage = images ? images.hero : product.imageUrl;
  const swapImage = images ? images.views[0] : null;

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-card',
        'transition-[border-color] duration-200',
        'hover:border-navy',
      )}
    >
      <Link href={`/products/${product.sku}`} className="block">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-sky">
          {heroImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={product.name}
                loading="lazy"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover',
                  'transition-opacity duration-500 ease-out',
                  swapImage ? 'group-hover:opacity-0' : '',
                )}
              />
              {swapImage && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={swapImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover opacity-0',
                    'transition-opacity duration-500 ease-out',
                    'group-hover:opacity-100',
                  )}
                />
              )}
              <div className="lightsweep-overlay" aria-hidden="true" />
            </>
          ) : (
            <span className="font-mono text-[11px] tracking-[0.05em] text-ink-faint">
              [Photo pending]
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.sku}`} className="text-inherit">
          <h3 className="mb-2 font-display text-[17px] font-medium leading-tight text-navy">
            {product.name}
          </h3>
        </Link>
        {product.actives && (
          <p className="mb-5 flex-1 font-mono text-[11px] tracking-[0.03em] text-ink-mute">
            {product.actives}
          </p>
        )}
        <button
          type="button"
          onClick={() => addProduct(product.sku)}
          aria-label={`Add ${product.name} to cart for Rs. ${product.pricePkr.toLocaleString('en-PK')}`}
          className={cn(
            'group/btn flex w-full items-center justify-between gap-3',
            'rounded-md border border-cobalt/40 bg-transparent px-4 py-3 text-cobalt',
            'font-mono text-[11px] font-medium uppercase tracking-[0.18em]',
            'transition-colors duration-150',
            'hover:border-cobalt hover:bg-cobalt hover:text-white',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          )}
        >
          <span>+ Add</span>
          <span className="font-mono tracking-[0.08em]">
            Rs. {product.pricePkr.toLocaleString('en-PK')}
          </span>
        </button>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Browser check**

Visit `/`. Hover a product card. Confirm:
  - Card lifts ~4px with subtle 3D tilt
  - Image crossfades from hero to view-1
  - Light-sweep gleam runs diagonally across the image once

- [ ] **Step 3: Commit**

```
git add components/product/ProductCard.tsx
git commit -m "feat(product): 3D-tilt hover + light-sweep on ProductCard"
```

---

### Task 18: Catalog page hero + grid reveal

**Files:**
- Read: `app/(site)/products/page.tsx` (study current structure)
- Modify: `app/(site)/products/page.tsx`

- [ ] **Step 1: Add imports near top of `app/(site)/products/page.tsx`**

```tsx
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { CinematicPhoto } from '@/lib/anim/cinematic-photo';
```

- [ ] **Step 2: Add a cinematic banner above the grid**

Locate the page's main wrapper (its top-level `<div>` or `<section>`). At the top of the page content, before any product grid, insert:

```tsx
<section className="relative overflow-hidden border-b border-sand/40">
  <CinematicPhoto
    src="/bundles/even-tone-protocol/cinematic.webp"
    alt=""
    width={2400}
    height={900}
    priority
    parallax={0.08}
    aspectClass="aspect-[21/9] md:aspect-[24/7]"
    wrapperClassName="w-full"
    className="object-cover"
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-canvas/95 via-canvas/55 to-transparent" />
  <div className="absolute inset-0 flex items-center">
    <div className="mx-auto w-full max-w-[75rem] px-6">
      <Reveal>
        <span className="mb-4 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
          — The full catalogue
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="max-w-[40rem] font-display font-light text-navy text-[clamp(36px,6vw,72px)] leading-[0.95] tracking-[-0.025em]">
          Every <em className="italic">formulation,</em> à la carte.
        </h1>
      </Reveal>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Wrap product grid with RevealGroup**

Find the grid that renders `<ProductCard>` instances. Wrap it like:

```tsx
<RevealGroup stagger={0.04}>
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {products.map((p) => (
      <Reveal key={p.id}>
        <ProductCard product={p} />
      </Reveal>
    ))}
  </div>
</RevealGroup>
```

(If the existing markup already uses `CatalogFilterChips` or other wrappers, leave them untouched — only wrap the actual grid.)

- [ ] **Step 4: Browser check**

Visit `/products`. Confirm hero banner with parallax cinematic + dark→clear gradient, title reveals in sequence, cards stagger-in on scroll.

- [ ] **Step 5: Commit**

```
git add app/(site)/products/page.tsx
git commit -m "feat(catalog): cinematic banner + reveal stagger on /products"
```

---

### Task 19: Build CinematicHero component for PDP

**Files:**
- Create: `components/product/CinematicHero.tsx`

- [ ] **Step 1: Write component**

Create `components/product/CinematicHero.tsx`:

```tsx
'use client';

import { CinematicPhoto } from '@/lib/anim/cinematic-photo';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { Reveal } from '@/lib/anim/reveal';
import { cn } from '@/lib/utils';

/**
 * Full-bleed dark cinematic band shown above the product detail layout.
 * Uses the product's cinematic.webp shot, with cursor-glow over the dark
 * gradient and scroll-driven scale.
 */
export function CinematicHero({
  cinematicSrc,
  productName,
  eyebrow,
}: {
  cinematicSrc: string;
  productName: string;
  eyebrow?: string;
}) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-navy-deep text-white',
        'min-h-[60vh] md:min-h-[70vh]',
      )}
    >
      <CinematicPhoto
        src={cinematicSrc}
        alt={`${productName} cinematic still`}
        width={2400}
        height={1600}
        priority
        parallax={0.18}
        aspectClass="absolute inset-0 h-full w-full"
        wrapperClassName="absolute inset-0"
        className="object-cover opacity-80"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/0 via-navy-deep/30 to-navy-deep/85" />
      <CursorGlow color="rgba(138, 176, 224, 0.22)" size={560} />
      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[75rem] flex-col justify-end px-6 pb-16 pt-32 md:min-h-[70vh] md:pb-20 md:pt-40">
        {eyebrow && (
          <Reveal>
            <span className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
              — {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <h1 className="max-w-[44rem] font-display font-light text-white text-[clamp(40px,7vw,84px)] leading-[0.95] tracking-[-0.025em]">
            {productName}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add components/product/CinematicHero.tsx
git commit -m "feat(product): add CinematicHero band for PDP"
```

---

### Task 20: Build StickyAddBar for PDP

**Files:**
- Create: `components/product/StickyAddBar.tsx`

- [ ] **Step 1: Write component**

Create `components/product/StickyAddBar.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Product } from '@/lib/db/schema';
import { useCart } from '@/lib/cart/use-cart';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

/**
 * Slides in from bottom when the primary on-page CTA scrolls off.
 * Pass a `triggerSelector` that resolves to the primary CTA element;
 * we observe it with IntersectionObserver.
 */
export function StickyAddBar({
  product,
  triggerSelector,
}: {
  product: Product;
  triggerSelector: string;
}) {
  const { addProduct } = useCart();
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.querySelector(triggerSelector);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerSelector]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { y: '110%', opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: '110%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-canvas/95 backdrop-blur-md',
            'shadow-[0_-10px_40px_-10px_rgba(14,31,58,0.18)]',
          )}
        >
          <div className="mx-auto flex max-w-[75rem] items-center justify-between gap-6 px-6 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-medium text-navy md:text-lg">
                {product.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                Rs. {product.pricePkr.toLocaleString('en-PK')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => addProduct(product.sku)}
              className={cn(
                'rounded-md bg-navy px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white',
                'transition-colors hover:bg-navy-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
              )}
            >
              Add to cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```
git add components/product/StickyAddBar.tsx
git commit -m "feat(product): add StickyAddBar that slides in on CTA scroll-off"
```

---

### Task 21: Integrate CinematicHero + StickyAddBar into PDP

**Files:**
- Read: `components/product/ProductDetailPage.tsx`
- Modify: `components/product/ProductDetailPage.tsx`

- [ ] **Step 1: Read the current PDP**

Run: read `components/product/ProductDetailPage.tsx` end to end so you know where the existing top section, gallery, primary CTA, and ingredient/why-it-works sections live.

- [ ] **Step 2: Imports**

Add at the top of `components/product/ProductDetailPage.tsx`:

```tsx
import { CinematicHero } from './CinematicHero';
import { StickyAddBar } from './StickyAddBar';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { productImagePaths } from '@/lib/products/content';
```

(Some of those imports may already exist; skip duplicates.)

- [ ] **Step 3: Render CinematicHero at top**

Just inside the page's outermost wrapper, before the existing PDP layout, render:

```tsx
<CinematicHero
  cinematicSrc={productImagePaths(product.sku).cinematic}
  productName={product.name}
  eyebrow={product.actives ?? undefined}
/>
```

- [ ] **Step 4: Add a stable `id` to the primary "Add to cart" CTA**

Find the existing primary Add-to-cart button on the PDP. Give it `id="pdp-primary-cta"`. Wrap it in `<Magnetic strength={5}>`. (If it's a `<button>` and not a single child element compatible with Magnetic, the wrap is still safe — Magnetic uses Children.only.)

- [ ] **Step 5: Mount StickyAddBar at the bottom of the page**

At the end of the page JSX (just before the outermost closing tag), add:

```tsx
<StickyAddBar product={product} triggerSelector="#pdp-primary-cta" />
```

- [ ] **Step 6: Wrap remaining PDP content sections in Reveal**

For each visually distinct PDP section after the CinematicHero (gallery, copy, ingredients, directions, related), wrap the section root in a `<Reveal>`. If a section has multiple stacked blocks, use `<RevealGroup stagger={0.08}>` with each block as a `<Reveal>`.

(Apply pragmatically — don't add `<Reveal>` to leaf elements like list items; section-level is enough.)

- [ ] **Step 7: Browser check**

Visit `/products/vitc`. Confirm:
  - Dark cinematic hero band at top with parallax shot + cursor-glow + product name reveals
  - Primary Add-to-cart button softly tracks cursor
  - Scroll down — once the primary CTA leaves view, sticky add-bar slides up from bottom
  - Scroll back up — sticky bar slides out
  - Other PDP sections fade up on scroll
  - Reduced-motion: hero shows still, no parallax, sticky bar fades only

- [ ] **Step 8: Commit**

```
git add components/product/ProductDetailPage.tsx
git commit -m "feat(pdp): cinematic hero, magnetic CTA, sticky add-bar, reveal sections"
```

---

### Task 22: Phase 3 build gate

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 2: Commit**

```
git commit --allow-empty -m "chore: phase 3 (catalog + PDP) complete"
```

---

## Phase 4 — Cart + Checkout

### Task 23: Animate cart line items + qty changes

**Files:**
- Read: `app/(site)/cart/page.tsx` + `components/cart/*`
- Modify: relevant cart line-item component (likely `components/cart/CartLine.tsx` or whichever renders each row)

- [ ] **Step 1: Discover the cart structure**

Run: `ls components/cart/` and read each file to find which renders the per-line UI and which renders the totals.

- [ ] **Step 2: Wrap line items with motion + AnimatePresence**

In the component that maps line items, wrap the list with `AnimatePresence`:

```tsx
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '@/lib/anim/hooks';

// inside render:
const reduced = useReducedMotion();
return (
  <AnimatePresence initial={true}>
    {lines.map((line, i) => (
      <motion.div
        key={line.sku}
        layout
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
        transition={{
          duration: 0.4,
          delay: reduced ? 0 : i * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* existing line markup */}
      </motion.div>
    ))}
  </AnimatePresence>
);
```

- [ ] **Step 3: Add scale-punch on quantity change**

In the quantity stepper (likely a `+` / `-` button pair), use motion's `whileTap`:

```tsx
<motion.button
  whileTap={reduced ? undefined : { scale: 0.92 }}
  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
  onClick={onIncrement}
  className="..."
>
  +
</motion.button>
```

Same for `-`.

- [ ] **Step 4: Editorial empty state**

In the cart page, find the empty-state branch (where it renders "Your cart is empty" or similar). Replace with:

```tsx
<Reveal>
  <div className="mx-auto max-w-[40rem] py-32 text-center">
    <span className="mb-4 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
      — Nothing here yet
    </span>
    <h1 className="mb-8 font-display font-light text-navy text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.025em]">
      Your cart is <em className="italic">empty.</em>
    </h1>
    <p className="mb-10 font-display italic text-[clamp(16px,1.6vw,20px)] text-ink-mute">
      Twelve weeks. One protocol. Pick yours.
    </p>
    <Magnetic strength={6}>
      <Link
        href="/quiz"
        className="inline-flex h-14 items-center gap-2 rounded-md bg-navy px-8 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-navy-2"
      >
        Take the skin quiz
      </Link>
    </Magnetic>
  </div>
</Reveal>
```

Imports needed at top of the file:

```tsx
import Link from 'next/link';
import { Reveal } from '@/lib/anim/reveal';
import { Magnetic } from '@/lib/anim/magnetic';
```

- [ ] **Step 5: Browser check**

Add a product from `/products/vitc`. Visit `/cart`. Confirm:
  - Line items stagger-in on first render
  - Press `+` / `-` — button scales down briefly on tap
  - Remove all items — items animate out (slide left + fade), empty state appears
  - Empty state shows large editorial type + magnetic CTA

- [ ] **Step 6: Commit**

```
git add app/(site)/cart/page.tsx components/cart/
git commit -m "feat(cart): line stagger, qty punch, editorial empty state"
```

---

### Task 24: Animate checkout (field focus + step transitions + success)

**Files:**
- Read: `app/(site)/checkout/**/page.tsx` + `components/checkout/*`
- Modify: relevant checkout components

- [ ] **Step 1: Discover checkout structure**

Run: `ls app/(site)/checkout/ components/checkout/` and read the layout to find: form field components, multi-step flow controller, success page.

- [ ] **Step 2: Field focus animation**

In the form field component (likely `components/checkout/Field.tsx` or inline in a form), if fields use a wrapped `<input>` with an underline border, add a motion-driven scale-x line:

```tsx
import { motion } from 'motion/react';

// Inside the field render, alongside the <input>:
<div className="relative">
  <input
    {...props}
    onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
    onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
    className="..."
  />
  <motion.div
    className="absolute bottom-0 left-0 h-px w-full origin-left bg-cobalt"
    initial={false}
    animate={{ scaleX: focused ? 1 : 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  />
</div>
```

(If the existing form already has a border-bottom on focus via CSS, layer this on top as the animated accent.)

- [ ] **Step 3: Step transitions**

If checkout has multiple steps (e.g., shipping → payment → review), find the step container and wrap with `AnimatePresence`:

```tsx
import { AnimatePresence, motion } from 'motion/react';

<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key={currentStep}
    initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
    animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
    exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* step content */}
  </motion.div>
</AnimatePresence>
```

- [ ] **Step 4: Order success cinematic reveal**

In the order success page/component (likely `app/(site)/order/[id]/page.tsx` or `components/checkout/OrderSuccess.tsx`), wrap the success message in a `<RevealGroup stagger={0.15}>`:

```tsx
<RevealGroup stagger={0.15}>
  <Reveal>
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
      — Order confirmed
    </span>
  </Reveal>
  <Reveal>
    <h1 className="font-display font-light text-navy text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.025em]">
      Thank you. <em className="italic">Your protocol is on its way.</em>
    </h1>
  </Reveal>
  <Reveal>
    {/* existing order details */}
  </Reveal>
</RevealGroup>
```

- [ ] **Step 5: Browser check**

Walk through checkout. Confirm:
  - Form field underline animates left-to-right on focus
  - Step transitions cross-fade horizontally
  - Order success page reveals in sequence
  - Reduced-motion: all motion degrades to plain fades or instant snaps

- [ ] **Step 6: Commit**

```
git add app/(site)/checkout/ app/(site)/order/ components/checkout/
git commit -m "feat(checkout): field focus underline, step transitions, success reveal"
```

---

## Phase 5 — Header + Footer chrome

### Task 25: Scroll-aware header + cart bounce

**Files:**
- Read: `components/site/SiteHeader.tsx` + `components/site/CartIcon.tsx`
- Modify: both

- [ ] **Step 1: Convert SiteHeader to scroll-aware**

At the top of `components/site/SiteHeader.tsx`, mark `'use client'` if not already. Add:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/anim/hooks';
```

Inside the component, track scroll:

```tsx
const [scrolled, setScrolled] = useState(false);
const reduced = useReducedMotion();

useEffect(() => {
  function onScroll() {
    setScrolled(window.scrollY > 80);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

Replace the outermost `<header>` with `<motion.header>`:

```tsx
<motion.header
  initial={false}
  animate={{
    paddingTop: scrolled ? 8 : 20,
    paddingBottom: scrolled ? 8 : 20,
    backgroundColor: scrolled ? 'rgba(246, 241, 235, 0.85)' : 'rgba(246, 241, 235, 0)',
    backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
    boxShadow: scrolled
      ? '0 4px 24px -8px rgba(14, 31, 58, 0.12)'
      : '0 0 0 0 rgba(0,0,0,0)',
  }}
  transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
  className="sticky top-0 z-30 w-full px-6"
>
  {/* existing inner content */}
</motion.header>
```

(If the existing header already manages its own sticky/positioning, adapt the className but keep the motion outer wrapper.)

- [ ] **Step 2: Cart icon bounce on add**

In `components/site/CartIcon.tsx`, listen for cart count changes and trigger a bounce via Motion's `key`-based animation:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '@/lib/cart/use-cart';
import { useReducedMotion } from '@/lib/anim/hooks';

// Inside the component (assuming useCart returns { itemCount }):
const { itemCount } = useCart();
const reduced = useReducedMotion();
const prev = useRef(itemCount);
const [bumpKey, setBumpKey] = useState(0);

useEffect(() => {
  if (itemCount > prev.current) setBumpKey((k) => k + 1);
  prev.current = itemCount;
}, [itemCount]);
```

Wrap the icon SVG with a motion element keyed on `bumpKey`:

```tsx
<motion.span
  key={bumpKey}
  initial={reduced ? false : { scale: 1 }}
  animate={reduced ? undefined : { scale: [1, 1.25, 1] }}
  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  className="inline-block"
>
  {/* existing cart SVG icon */}
</motion.span>
```

For the count badge, also animate the number flip:

```tsx
<motion.span
  key={itemCount}
  initial={reduced ? false : { y: -8, opacity: 0 }}
  animate={reduced ? undefined : { y: 0, opacity: 1 }}
  transition={{ duration: 0.25 }}
  className="ml-1 font-mono text-[11px]"
>
  {itemCount}
</motion.span>
```

- [ ] **Step 3: Browser check**

Visit `/`. Scroll down — header should shrink padding + blur its background. Scroll back to top — header expands back. Add an item to cart from any page — cart icon bounces, count number flips up.

- [ ] **Step 4: Commit**

```
git add components/site/SiteHeader.tsx components/site/CartIcon.tsx
git commit -m "feat(chrome): scroll-aware header, cart bounce + count flip"
```

---

### Task 26: Footer column stagger

**Files:**
- Modify: `components/site/SiteFooter.tsx`

- [ ] **Step 1: Wrap columns in RevealGroup**

At the top of `components/site/SiteFooter.tsx`, mark `'use client'` and import:

```tsx
'use client';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
```

Wrap the column grid in `<RevealGroup stagger={0.08}>` and each column in `<Reveal>`:

```tsx
<RevealGroup stagger={0.08}>
  <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
    <Reveal>{/* column 1 */}</Reveal>
    <Reveal>{/* column 2 */}</Reveal>
    <Reveal>{/* column 3 */}</Reveal>
    <Reveal>{/* column 4 */}</Reveal>
  </div>
</RevealGroup>
```

(Adapt to the actual number of columns the footer renders.)

- [ ] **Step 2: Browser check**

Scroll to bottom of any page. Confirm footer columns stagger in.

- [ ] **Step 3: Commit**

```
git add components/site/SiteFooter.tsx
git commit -m "feat(chrome): stagger reveal footer columns"
```

---

## Phase 6 — Verification

### Task 27: Full storefront walkthrough

This is a manual verification task. The goal is to catch jank, layout shift, and reduced-motion violations across the whole site.

- [ ] **Step 1: Type + build**

Run:
```
npx tsc --noEmit
npm run build
```
Both must pass. If `tsc` flags errors, fix before walkthrough.

- [ ] **Step 2: Full storefront walk (default motion)**

Run: `npm run dev`. With DevTools open (Performance + Console tabs), visit in this order and confirm each page renders smoothly, no console errors, no layout shift:

  - `/` (home)
  - `/products` (catalog)
  - `/products/vitc` (a representative PDP)
  - `/products/acne` (second PDP)
  - Add a product to cart
  - `/cart`
  - Begin checkout, walk through to success page (use test data)
  - `/about`, `/ingredients`, `/contact` (verify chrome works, no regressions)

For each page, hover any obvious interactive element (CTA, card) and confirm magnetic / tilt / cinematic effects fire as designed.

- [ ] **Step 3: Reduced-motion walk**

In DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Reload and re-walk all the same pages. Confirm:
  - No parallax, no Ken-Burns, no magnetic tracking, no Lenis smoothing
  - Reveals appear instantly (children visible at first paint)
  - Cart and step transitions degrade to fades only
  - Nothing is broken or invisible — the static layout should be fully accessible

- [ ] **Step 4: Mobile viewport check**

In DevTools → Toggle device toolbar → iPhone 14. Re-walk the same pages. Confirm:
  - Cursor-glow + magnetic effects are no-ops on touch (the hooks check `(hover: none)`)
  - Sticky add-bar still appears on PDP after primary CTA scrolls off
  - All layouts are usable

- [ ] **Step 5: Note any regressions**

If anything jank, log it as a follow-up task with TaskCreate. Do not fix in this pass unless trivial.

- [ ] **Step 6: Commit verification log**

If you created any follow-ups, no commit needed — TaskList holds them. If everything passes, tag the final commit:

```
git commit --allow-empty -m "chore: phase 6 (verification) complete — tech-luxe redesign shipped"
```

---

## Self-Review Notes

Coverage check against the spec — every spec section maps to ≥ 1 task:

| Spec section | Task(s) |
|---|---|
| Stack additions (motion + lenis) | 1 |
| Generated assets (12 photos) | 10, 11 |
| `SmoothScrollProvider` | 4 |
| `hooks.ts` | 3 |
| `<Reveal>` / `<RevealGroup>` | 5 |
| `<Magnetic>` | 6 |
| `<CursorGlow>` | 7 |
| `<CinematicPhoto>` | 8 |
| CSS additions | 2 |
| Home page treatment | 13, 14, 15 |
| Products list | 18 |
| PDP | 17, 19, 20, 21 |
| Cart | 23 |
| Checkout | 24 |
| Header / Footer | 25, 26 |
| Reduced-motion contract | Hooks-level (every primitive), Task 27 verifies |
| Performance budget | Task 16, 22 build gates; Task 27 walkthrough |

Type-consistency spot-checks:
- `productImagePaths(sku).cinematic` (Task 12) → consumed by Task 21 ✓
- `bundleCinematicPath(slug)` (Task 12) → consumed by Task 13, 14 ✓
- `<Reveal>` props (Task 5) → consumed by every page task ✓
- `<Magnetic>` requires single child element forwarding ref → Button via asChild Link works (Radix Slot forwards refs) ✓

Placeholder scan: no TBDs, no "implement similar to", no "add appropriate handling".
