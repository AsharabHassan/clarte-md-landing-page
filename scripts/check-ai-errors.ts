import { db, schema } from '../lib/db/client';
import { desc, isNotNull } from 'drizzle-orm';

async function main() {
  const rows = await db
    .select({
      id: schema.aiSessions.id,
      kind: schema.aiSessions.kind,
      createdAt: schema.aiSessions.createdAt,
      error: schema.aiSessions.error,
      modelVersion: schema.aiSessions.modelVersion,
    })
    .from(schema.aiSessions)
    .where(isNotNull(schema.aiSessions.error))
    .orderBy(desc(schema.aiSessions.createdAt))
    .limit(5);

  for (const r of rows) {
    console.log('---');
    console.log(`id: ${r.id}`);
    console.log(`kind: ${r.kind}`);
    console.log(`model: ${r.modelVersion}`);
    console.log(`at: ${r.createdAt.toISOString()}`);
    console.log(`error: ${r.error}`);
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
