import { db, schema } from '@/lib/db/client';

/**
 * Append a row to the audit_log. Best-effort: a logging failure must
 * never break the underlying admin action, so errors are swallowed and
 * logged to the console rather than thrown.
 *
 * `action` is a dotted verb (e.g. 'order.status_changed', 'product.created',
 * 'ai_session.deleted'). `meta` holds any before/after detail worth keeping.
 */
export async function recordAudit(entry: {
  actorEmail?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  meta?: Record<string, unknown> | null;
}): Promise<void> {
  try {
    await db.insert(schema.auditLog).values({
      actorEmail: entry.actorEmail ?? null,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId ?? null,
      meta: entry.meta ?? null,
    });
  } catch (err) {
    console.error('audit log insert failed', entry.action, err);
  }
}
