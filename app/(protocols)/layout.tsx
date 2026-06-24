import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import '@/components/checkout/checkout.css';

/**
 * Route-group layout for the four protocol landings (/acne, /even-tone,
 * /renewal, /barrier).
 *
 * Originally this group had NO layout file — the legacy
 * dangerouslySetInnerHTML bodies carried their own self-contained
 * topbar + nav + footer chrome. Phase 4a hid the legacy hero; this
 * Phase 4b commit removes the rest of the duplicate chrome and mounts
 * the platform's SiteHeader + SiteFooter so the protocol pages live
 * INSIDE the site, not as standalone landings.
 *
 * What this brings to every protocol page:
 *   - PromoBar with the "Free shipping nationwide · COD" trust strip
 *   - SiteHeader nav with Protocols / Products / Ingredients / Quiz / About
 *   - Persistent CartIcon that opens the cart drawer (Phase 3b.1)
 *   - SiteFooter with newsletter, legal links, brand attribution
 *
 * Cart state is shared with (site) via the root layout's CartProvider,
 * so a bundle added on /acne shows up on /cart and /checkout.
 */
export default function ProtocolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
