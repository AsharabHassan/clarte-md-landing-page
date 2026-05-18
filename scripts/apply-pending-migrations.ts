/**
 * One-shot fix for the v0.6 deploy.
 *
 * The initial DB was provisioned via `npm run db:push --force` per
 * project_subproject_2 memory, which skipped the drizzle migration
 * journal. As a result, `npm run db:migrate` now tries to apply 0000
 * fresh and fails because the tables already exist — and 0001 /
 * 0002 never get reached.
 *
 * This script:
 *   1. Ensures `drizzle.__drizzle_migrations` exists
 *   2. Inserts the 0000 baseline entry (if missing) so drizzle knows
 *      the baseline schema is already deployed
 *   3. Applies 0001 (order_lookups) + 0002 (subscribers) directly
 *      with `CREATE TABLE IF NOT EXISTS` semantics
 *   4. Inserts journal rows for 0001 + 0002 so future db:migrate is
 *      a no-op
 *
 * Idempotent. Safe to re-run.
 */
import postgres from 'postgres';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const sql = postgres(process.env.DATABASE_URL!, { max: 1 });

interface JournalEntry {
  idx: number;
  tag: string;
  when: number;
}

async function main() {
  const journalPath = path.join('lib', 'db', 'migrations', 'meta', '_journal.json');
  const journal = JSON.parse(await readFile(journalPath, 'utf8')) as {
    entries: JournalEntry[];
  };

  await sql.unsafe(`CREATE SCHEMA IF NOT EXISTS drizzle`);
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
      id SERIAL PRIMARY KEY,
      hash TEXT NOT NULL,
      created_at BIGINT
    )
  `);

  for (const entry of journal.entries) {
    const sqlPath = path.join('lib', 'db', 'migrations', `${entry.tag}.sql`);
    const sqlText = await readFile(sqlPath, 'utf8');
    const hash = createHash('sha256').update(sqlText).digest('hex');

    const [existing] = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count FROM drizzle.__drizzle_migrations WHERE hash = ${hash}
    `;
    if (existing.count > 0) {
      console.log(`[skip] ${entry.tag} — already in journal`);
      continue;
    }

    if (entry.idx === 0) {
      // Baseline schema was applied via db:push --force; do not re-run the SQL.
      console.log(`[journal] ${entry.tag} — baseline, journaling without re-applying`);
    } else {
      // Convert plain CREATE TABLE into CREATE TABLE IF NOT EXISTS for
      // idempotency; CREATE INDEX statements already tolerate re-run via
      // their own IF NOT EXISTS rewrite.
      const idempotent = sqlText
        .replace(/CREATE TABLE "/g, 'CREATE TABLE IF NOT EXISTS "')
        .replace(/CREATE INDEX "/g, 'CREATE INDEX IF NOT EXISTS "');
      const statements = idempotent
        .split('--> statement-breakpoint')
        .map((s) => s.trim())
        .filter(Boolean);
      for (const stmt of statements) {
        console.log(`[exec] ${entry.tag} — ${stmt.slice(0, 60).replace(/\s+/g, ' ')}...`);
        await sql.unsafe(stmt);
      }
    }

    await sql`
      INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
      VALUES (${hash}, ${entry.when})
    `;
    console.log(`[ok] ${entry.tag} journaled`);
  }

  const tables = await sql<{ table_name: string }[]>`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name IN ('order_lookups', 'subscribers')
    ORDER BY table_name
  `;
  console.log('New tables present:', tables.map((r) => r.table_name).join(', ') || '(none)');

  await sql.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
