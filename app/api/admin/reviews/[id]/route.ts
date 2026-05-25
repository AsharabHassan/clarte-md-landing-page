import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { UpdateReviewStatusSchema } from '@/lib/validators/admin-reviews';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.reviews);
  if ('response' in guard) return guard.response;
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  const parsed = UpdateReviewStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid status' }, { status: 400 });
  }

  const [existing] = await db
    .select({ id: schema.reviews.id, status: schema.reviews.status, name: schema.reviews.name })
    .from(schema.reviews)
    .where(eq(schema.reviews.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const newStatus = parsed.data.status;
  await db
    .update(schema.reviews)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(schema.reviews.id, id));

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'review.status_changed',
    entityType: 'review',
    entityId: id,
    meta: { from: existing.status, to: newStatus, name: existing.name },
  });

  return NextResponse.json({ ok: true, status: newStatus });
}

/** Permanently delete a review. Destructive → owner only. */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.reviews);
  if ('response' in guard) return guard.response;
  if (!canDelete(getUserRole(guard.user))) {
    return NextResponse.json({ ok: false, error: 'Only an owner can delete reviews' }, { status: 403 });
  }
  const { id } = await ctx.params;

  const [existing] = await db
    .select({ id: schema.reviews.id, name: schema.reviews.name })
    .from(schema.reviews)
    .where(eq(schema.reviews.id, id))
    .limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  await db.delete(schema.reviews).where(eq(schema.reviews.id, id));

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'review.deleted',
    entityType: 'review',
    entityId: id,
    meta: { name: existing.name },
  });

  return NextResponse.json({ ok: true });
}
