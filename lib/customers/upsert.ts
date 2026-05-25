import { db, schema } from '@/lib/db/client';

/**
 * Ensure a customer profile exists for this phone and return its id.
 *
 * On conflict we deliberately DON'T overwrite the stored profile fields
 * (name/email/address) — an admin may have corrected them — we only bump
 * updated_at. New phones get a full profile from the order details.
 *
 * Best-effort: returns null on any failure so the caller (order creation)
 * never breaks because of customer bookkeeping.
 */
export async function upsertCustomerByPhone(input: {
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  postal?: string | null;
}): Promise<string | null> {
  const phone = input.phone?.trim();
  if (!phone) return null;
  try {
    const [row] = await db
      .insert(schema.customers)
      .values({
        name: input.name,
        phone,
        email: input.email ?? null,
        address: input.address ?? null,
        city: input.city ?? null,
        postal: input.postal ?? null,
      })
      .onConflictDoUpdate({
        target: schema.customers.phone,
        set: { updatedAt: new Date() },
      })
      .returning({ id: schema.customers.id });
    return row?.id ?? null;
  } catch (err) {
    console.error('upsertCustomerByPhone failed', err);
    return null;
  }
}
