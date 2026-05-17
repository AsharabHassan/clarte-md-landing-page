import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Clear Skin Protocol — Clarté MD · Case Study 001',
  description:
    'A dermatologist-led 12-week clinical regimen for active acne and post-acne marks. Upload a selfie; see a photoreal projection of week 12. Formulated in Lahore by our GMC-registered doctor.',
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
      <body>{children}</body>
    </html>
  );
}
