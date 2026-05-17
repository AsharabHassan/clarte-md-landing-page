import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart/provider';

export const metadata: Metadata = {
  title: {
    default: 'Clarté MD — Dermatologist-led skincare for Pakistan',
    template: '%s · Clarté MD',
  },
  description:
    'Dermatologist-led 12-week clinical regimens for acne, pigmentation, anti-ageing, and barrier repair. Formulated in Lahore by our GMC-registered doctor. COD across Pakistan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
