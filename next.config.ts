import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep postgres-js and drizzle-orm out of the server bundle; both rely
  // on dynamic require + native-feeling internals that break when bundled
  // by Turbopack. Per Drizzle's Supabase guide.
  serverExternalPackages: ['postgres', 'drizzle-orm'],

  /* ────────────────── Image optimisation ──────────────────
     - formats: serve modern webp/avif when the browser accepts it.
     - deviceSizes: shrink the breakpoints we ship srcsets for.
       Default has 8 sizes (640 → 3840). We only need 3 mobile + tablet
       + desktop — keeps the srcset attribute short.
     - imageSizes: small thumbnails (cart, upsell, summary). Default
       includes 16/32/48/64/96/128/256/384.
     - minimumCacheTTL: cache optimised variants in the CDN edge cache
       for 30 days. Source-image SHA invalidates automatically when the
       file changes, so longer = better.
     - remotePatterns: allow the legacy Shopify CDN hosts used as
       fallback hero images in lib/db/seed.ts.
  ─────────────────────────────────────────────────────────── */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'clartemd.com.pk' },
      // Supabase Storage public buckets (e.g. customer-uploaded review photos).
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },

  /* ────────────────── Bundle trimming ─────────────────────
     optimizePackageImports rewrites barrel-file imports
     (`import { Foo } from 'lucide-react'`) into deep paths
     so the bundler only ships what each component actually uses.
     lucide-react alone is ~400KB unminified — this knocks it to
     ~10KB on most pages.
  ─────────────────────────────────────────────────────────── */
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'motion',
      'motion/react',
      '@number-flow/react',
    ],
  },

  /* ────────────────── Long-term asset caching ────────────── */
  async headers() {
    return [
      {
        source: '/products/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/protocols/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/about/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/acne-protocol.html', destination: '/acne', permanent: true },
      { source: '/even-tone-protocol.html', destination: '/even-tone', permanent: true },
      { source: '/renewal-protocol.html', destination: '/renewal', permanent: true },
      { source: '/barrier-protocol.html', destination: '/barrier', permanent: true },
    ];
  },
};

export default nextConfig;
