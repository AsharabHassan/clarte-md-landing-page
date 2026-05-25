import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';
import { removeAiImages } from '@/lib/admin/ai-images';

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminApi(AREA_ACCESS.ai);
  if ('response' in guard) return guard.response;
  const { id } = await ctx.params;

  const [session] = await db.select().from(schema.aiSessions).where(eq(schema.aiSessions.id, id)).limit(1);
  if (!session) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  // orders.ai_session_id is a nullable FK with no cascade — detach any
  // referencing orders before deleting so we don't violate the constraint.
  await db
    .update(schema.orders)
    .set({ aiSessionId: null })
    .where(eq(schema.orders.aiSessionId, id));

  await db.delete(schema.aiSessions).where(eq(schema.aiSessions.id, id));

  // Remove the stored images (best-effort; row is already gone).
  await removeAiImages(session.inputImagePath, session.outputImagePath);

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'ai_session.deleted',
    entityType: 'ai_session',
    entityId: id,
    meta: { kind: session.kind, sha256: session.inputImageSha256 },
  });

  return NextResponse.json({ ok: true });
}
