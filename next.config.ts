import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep postgres-js and drizzle-orm out of the server bundle; both rely
  // on dynamic require + native-feeling internals that break when bundled
  // by Turbopack. Per Drizzle's Supabase guide.
  serverExternalPackages: ['postgres', 'drizzle-orm'],
  async redirects() {
    return [
      // Old static URL → migrated route (permanent so search engines update).
      { source: '/acne-protocol.html', destination: '/acne', permanent: true },
      // Root → the only live protocol page during sub-project #2.
      // Non-permanent because sub-project #6 will introduce a real storefront index.
      { source: '/', destination: '/acne', permanent: false },
    ];
  },
};

export default nextConfig;
