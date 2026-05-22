/**
 * WCAG 2.1 contrast checker for Clarté MD design tokens.
 *
 * Run: node scripts/check-contrast.mjs
 *
 * Targets:
 *   - Normal text on background: ≥ 4.5:1 (AA), ≥ 7:1 (AAA)
 *   - Large text (18pt+ or 14pt+ bold): ≥ 3:1 (AA)
 *   - UI components / focus rings: ≥ 3:1 (AA)
 *
 * Reads token values directly from app/globals.css to stay in sync.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const cssPath = join(here, '..', 'app', 'globals.css');
const css = readFileSync(cssPath, 'utf8');

function readToken(name) {
  // Match `--name: value;` and resolve var(...) references one level deep.
  const re = new RegExp(`--${name}:\\s*([^;]+);`);
  const m = css.match(re);
  if (!m) throw new Error(`Token --${name} not found in globals.css`);
  let v = m[1].trim();
  const varRe = /var\(--([\w-]+)\)/;
  const vm = v.match(varRe);
  if (vm) return readToken(vm[1]);
  return v;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function luminance({ r, g, b }) {
  const toLin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function contrast(hexA, hexB) {
  const la = luminance(hexToRgb(hexA));
  const lb = luminance(hexToRgb(hexB));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const palette = {
  background: readToken('background'),
  foreground: readToken('foreground'),
  card: readToken('card'),
  cardFg: readToken('card-foreground'),
  primary: readToken('primary'),
  primaryFg: readToken('primary-foreground'),
  secondary: readToken('secondary'),
  secondaryFg: readToken('secondary-foreground'),
  muted: readToken('muted'),
  mutedFg: readToken('muted-foreground'),
  accent: readToken('accent'),
  accentFg: readToken('accent-foreground'),
  destructive: readToken('destructive'),
  border: readToken('border'),
  ring: readToken('ring'),
};

const checks = [
  // Body text on surfaces
  { name: 'Body text — foreground on background', fg: 'foreground', bg: 'background', min: 4.5, kind: 'AA normal' },
  { name: 'Body text — foreground on card', fg: 'foreground', bg: 'card', min: 4.5, kind: 'AA normal' },
  { name: 'Muted text — muted-foreground on background', fg: 'mutedFg', bg: 'background', min: 4.5, kind: 'AA normal' },
  { name: 'Muted text — muted-foreground on card', fg: 'mutedFg', bg: 'card', min: 4.5, kind: 'AA normal' },

  // CTA buttons
  { name: 'Primary CTA — text on primary bg', fg: 'primaryFg', bg: 'primary', min: 4.5, kind: 'AA normal' },
  { name: 'Secondary CTA — text on secondary bg', fg: 'secondaryFg', bg: 'secondary', min: 4.5, kind: 'AA normal' },
  { name: 'Accent — text on accent bg', fg: 'accentFg', bg: 'accent', min: 4.5, kind: 'AA normal' },
  { name: 'Destructive — white on destructive bg', fg: 'card', bg: 'destructive', min: 4.5, kind: 'AA normal' },

  // Surface vs surface — note: card-on-canvas separation is informational
  // only; cards in the design rely on --border + shadow rather than fill
  // contrast for separation, which is the prestige-skincare segment norm
  // (Bader / Tatcha / Sulwhasoo all do the same).
  { name: 'Card vs background (informational)', fg: 'card', bg: 'background', min: 1.0, kind: 'informational' },

  // Focus ring — 3:1 is WCAG 1.4.11 minimum for UI components.
  // This is the load-bearing one; failure here would block AA.
  { name: 'Ring (cobalt) on background', fg: 'ring', bg: 'background', min: 3.0, kind: 'AA UI' },
  { name: 'Ring (cobalt) on card', fg: 'ring', bg: 'card', min: 3.0, kind: 'AA UI' },

  // Border — decorative when paired with fill/shadow; not the sole UI indicator.
  // Tracked at 1.0 to surface the value, not as a WCAG gate.
  { name: 'Border (rule) on background (decorative)', fg: 'border', bg: 'background', min: 1.0, kind: 'decorative' },

  // Secondary used as text on canvas (links, cobalt branded inline elements)
  { name: 'Cobalt text on background (links)', fg: 'secondary', bg: 'background', min: 4.5, kind: 'AA normal' },
  { name: 'Cobalt text on card (links)', fg: 'secondary', bg: 'card', min: 4.5, kind: 'AA normal' },
];

let failed = 0;
const rows = checks.map((c) => {
  const fgHex = palette[c.fg];
  const bgHex = palette[c.bg];
  const ratio = contrast(fgHex, bgHex);
  const pass = ratio >= c.min;
  if (!pass) failed++;
  return {
    Check: c.name,
    fg: `${c.fg} (${fgHex})`,
    bg: `${c.bg} (${bgHex})`,
    Ratio: `${ratio.toFixed(2)}:1`,
    Min: `${c.min}:1`,
    Type: c.kind,
    Result: pass ? 'PASS' : 'FAIL',
  };
});

console.log('\n=== Clarté MD Phase 0 — WCAG 2.1 contrast audit ===\n');
console.table(rows);
console.log(`\n${failed === 0 ? '✓ All checks passed.' : `✗ ${failed} check(s) failed — see FAIL rows above.`}`);
process.exit(failed === 0 ? 0 : 1);
