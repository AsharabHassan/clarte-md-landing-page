import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { PortalProfileSchema } from '@/lib/validators/portal';
import { getPortalCustomer } from '@/lib/auth/portal';
import { recordAudit } from '@/lib/audit/log';

export async function PATCH(req: NextRequest) {
  const customer = await getPortalCustomer();
  if (!customer) return NextResponse.json({ ok: false, error: 'Not signed in' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = PortalProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid update' },
      { status: 400 },
    );
  }

  const d = parsed.data;
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  for (const k of ['name', 'email', 'address', 'city', 'postal'] as const) {
    if (k in d && d[k] !== undefined) patch[k] = d[k];
  }

  const [updated] = await db
    .update(schema.customers)
    .set(patch)
    .where(eq(schema.customers.id, customer.id))
    .returning();

  await recordAudit({
    actorEmail: customer.email ?? customer.phone,
    action: 'customer.self_updated',
    entityType: 'customer',
    entityId: customer.id,
    meta: { fields: Object.keys(patch).filter((k) => k !== 'updatedAt'), via: 'portal' },
  });

  return NextResponse.json({
    ok: true,
    customer: {
      name: updated.name,
      email: updated.email,
      address: updated.address,
      city: updated.city,
      postal: updated.postal,
    },
  });
}
