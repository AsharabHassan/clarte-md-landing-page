import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart/provider';
import { organizationGraphLd, SITE_URL } from '@/lib/schema/json-ld';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Clarté MD — Dermatologist-led skincare for Pakistan',
    template: '%s · Clarté MD',
  },
  description:
    'Dermatologist-led 12-week clinical regimens for acne, pigmentation, anti-ageing, and barrier repair. Formulated in Lahore by our GMC-registered doctor. COD across Pakistan.',
  applicationName: 'Clarté MD',
  authors: [{ name: 'Clarté MD' }],
  generator: 'Next.js',
  keywords: [
    'dermatologist-led skincare',
    'Pakistan',
    'Lahore',
    'acne protocol',
    'pigmentation',
    'anti-ageing',
    'barrier repair',
    'niacinamide',
    'azelaic acid',
    'cash on delivery skincare',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE_URL,
    siteName: 'Clarté MD',
    title: 'Clarté MD — Dermatologist-led skincare for Pakistan',
    description:
      'Dermatologist-led 12-week clinical regimens for acne, pigmentation, anti-ageing, and barrier repair. Formulated in Lahore by our GMC-registered doctor.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Clarté MD — Dermatologist-led skincare for Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clarté MD — Dermatologist-led skincare for Pakistan',
    description:
      'Dermatologist-led 12-week clinical regimens. Formulated in Lahore. COD across Pakistan.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = organizationGraphLd();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      {/*
        suppressHydrationWarning is React's documented escape hatch
        for the case the Next.js error message itself calls out:
        "a browser extension messes with the HTML before React loaded."
        Some PK clients run extensions (Dashlane, Norton Safe Web,
        Grammarly, etc.) that inject attributes like
        `__processed_<uuid>__="true"` on <body> at first paint, which
        React then flags as a hydration mismatch. The flag suppresses
        attribute warnings on this element ONLY — children still
        hydrate with full mismatch checking.
      */}
      <body suppressHydrationWarning>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
