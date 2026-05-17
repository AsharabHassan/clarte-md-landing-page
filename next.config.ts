import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep postgres-js and drizzle-orm out of the server bundle; both rely
  // on dynamic require + native-feeling internals that break when bundled
  // by Turbopack. Per Drizzle's Supabase guide.
  serverExternalPackages: ['postgres', 'drizzle-orm'],
  async redirects() {
    return [
      // Old static URLs → migrated routes (308 permanent so search engines update).
      { source: '/acne-protocol.html', destination: '/acne', permanent: true },
      { source: '/even-tone-protocol.html', destination: '/even-tone', permanent: true },
      { source: '/renewal-protocol.html', destination: '/renewal', permanent: true },
      { source: '/barrier-protocol.html', destination: '/barrier', permanent: true },
      // Root → acne (highest-volume concern in PK per conversion research).
      // 307 non-permanent because sub-project #6 will introduce a real storefront
      // index that lists all 4 protocols.
      { source: '/', destination: '/acne', permanent: false },
    ];
  },
};

export default nextConfig;
