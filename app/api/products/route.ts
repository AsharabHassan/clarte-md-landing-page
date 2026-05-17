import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';

/**
 * GET /api/products
 * Returns the public catalog (active=true) used by the landing-page
 * rx-strip and the storefront grid. No auth, no rate-limit.
 */
export async function GET() {
  try {
    const products = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.active, true));
    return NextResponse.json({ ok: true, products });
  } catch (err) {
    console.error('/api/products error', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to load products' },
      { status: 500 },
    );
  }
}
