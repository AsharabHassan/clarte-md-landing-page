import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import '@/components/checkout/checkout.css';

/**
 * Route-group layout for the new platform surfaces (homepage, /about,
 * /products, /cart, /checkout, /order, /contact, /legal/*, /ingredients).
 *
 * Protocol pages (/acne, /even-tone, /renewal, /barrier) live under
 * app/(protocols)/ which has NO layout file — they use the root layout
 * only, so they don't pick up SiteHeader/SiteFooter. Each protocol page
 * has its own topbar + footer baked into its protocol.html.ts body.
 *
 * Cart state (CartProvider in app/layout.tsx) is still shared across
 * both route groups so a customer can add a bundle on /acne and check
 * out via /checkout under (site).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
