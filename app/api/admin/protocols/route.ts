import { NextRequest, NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { CreateBundleSchema } from '@/lib/validators/admin-protocols';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { recordAudit } from '@/lib/audit/log';

export async function GET() {
  const guard = await guardAdminApi(AREA_ACCESS.protocols);
  if ('response' in guard) return guard.response;
  const bundles = await db.select().from(schema.bundles).orderBy(asc(schema.bundles.name));
  return NextResponse.json({ ok: true, bundles });
}

export async function POST(req: NextRequest) {
  const guard = await guardAdminApi(AREA_ACCESS.protocols);
  if ('response' in guard) return guard.response;

  const body = await req.json().catch(() => null);
  const parsed = CreateBundleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid protocol' },
      { status: 400 },
    );
  }
  const b = parsed.data;

  try {
    const [created] = await db
      .insert(schema.bundles)
      .values({ slug: b.slug, name: b.name, concern: b.concern, pricePkr: b.pricePkr })
      .returning();

    await recordAudit({
      actorEmail: guard.user.email ?? null,
      action: 'protocol.created',
      entityType: 'bundle',
      entityId: created.id,
      meta: { slug: created.slug, name: created.name },
    });

    return NextResponse.json({ ok: true, bundle: created }, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === '23505') {
      return NextResponse.json({ ok: false, error: `Slug "${b.slug}" already exists` }, { status: 409 });
    }
    console.error('protocol create failed', err);
    return NextResponse.json({ ok: false, error: 'Could not create protocol' }, { status: 500 });
  }
}
