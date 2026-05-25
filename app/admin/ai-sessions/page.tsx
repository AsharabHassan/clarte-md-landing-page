import Link from 'next/link';
import { and, desc, eq, isNotNull, sql, type SQL } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/admin/format';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 30;
type SP = Record<string, string | undefined>;

export default async function AiSessionsPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireAdminSession(AREA_ACCESS.ai);
  const params = await searchParams;

  const kind = params.kind === 'before_after' || params.kind === 'skin_analysis' ? params.kind : undefined;
  const onlyErrors = params.errors === '1';
  const noConsent = params.consent === '0';
  const offset = Math.max(0, Number(params.offset ?? 0) || 0);

  const clauses: SQL[] = [];
  if (kind) clauses.push(eq(schema.aiSessions.kind, kind));
  if (onlyErrors) clauses.push(isNotNull(schema.aiSessions.error));
  if (noConsent) clauses.push(eq(schema.aiSessions.consentGiven, false));
  const where = clauses.length === 0 ? undefined : clauses.length === 1 ? clauses[0] : and(...clauses);

  const base = db.select().from(schema.aiSessions);
  const [sessions, countRows] = await Promise.all([
    (where ? base.where(where) : base)
      .orderBy(desc(schema.aiSessions.createdAt))
      .limit(PAGE_SIZE)
      .offset(offset),
    db.select({ c: sql<number>`count(*)::int` }).from(schema.aiSessions).where(where),
  ]);
  const total = Number(countRows[0]?.c ?? 0);

  const buildHref = (next: SP) => {
    const sp = new URLSearchParams();
    const merged = { kind, errors: onlyErrors ? '1' : undefined, consent: noConsent ? '0' : undefined, ...next };
    for (const [k, v] of Object.entries(merged)) if (v) sp.set(k, String(v));
    const s = sp.toString();
    return `/admin/ai-sessions${s ? `?${s}` : ''}`;
  };

  const filterTab = (label: string, href: string, active: boolean) => (
    <Link
      href={href}
      className={cn(
        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted',
      )}
    >
      {label}
    </Link>
  );

  return (
    <div>
      <PageHeader title="AI sessions" description={`${total.toLocaleString('en-PK')} matching · review & moderate`} />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {filterTab('All', buildHref({ kind: undefined, errors: undefined, consent: undefined, offset: undefined }), !kind && !onlyErrors && !noConsent)}
        {filterTab('Before/After', buildHref({ kind: 'before_after', offset: undefined }), kind === 'before_after')}
        {filterTab('Skin analysis', buildHref({ kind: 'skin_analysis', offset: undefined }), kind === 'skin_analysis')}
        {filterTab('Errors only', buildHref({ errors: onlyErrors ? undefined : '1', offset: undefined }), onlyErrors)}
        {filterTab('No consent', buildHref({ consent: noConsent ? undefined : '0', offset: undefined }), noConsent)}
      </div>

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Kind</TableHead>
                <TableHead>Concern</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Consent</TableHead>
                <TableHead>State</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-muted-foreground">{formatDateTime(s.createdAt)}</TableCell>
                  <TableCell>
                    <Badge variant={s.kind === 'before_after' ? 'secondary' : 'outline'}>
                      {s.kind === 'before_after' ? 'B/A' : 'Analysis'}
                    </Badge>
                  </TableCell>
                  <TableCell>{s.concern ?? '—'}</TableCell>
                  <TableCell className="max-w-[180px] truncate text-xs text-muted-foreground" title={s.modelVersion}>
                    {s.modelVersion}
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    {s.latencyMs ? `${(s.latencyMs / 1000).toFixed(1)}s` : '—'}
                  </TableCell>
                  <TableCell>
                    {s.consentGiven ? (
                      <Badge variant="success">Yes</Badge>
                    ) : (
                      <Badge variant="destructive">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {s.error ? <Badge variant="destructive">Error</Badge> : <Badge variant="outline">OK</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/ai-sessions/${s.id}`}>Review</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sessions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                    No AI sessions match these filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {total === 0 ? 0 : offset + 1}–{Math.min(offset + PAGE_SIZE, total)} of {total.toLocaleString('en-PK')}
        </span>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" disabled={offset === 0}>
            <Link href={buildHref({ offset: String(Math.max(0, offset - PAGE_SIZE)) })}>Previous</Link>
          </Button>
          <Button asChild variant="outline" size="sm" disabled={offset + PAGE_SIZE >= total}>
            <Link href={buildHref({ offset: String(offset + PAGE_SIZE) })}>Next</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
