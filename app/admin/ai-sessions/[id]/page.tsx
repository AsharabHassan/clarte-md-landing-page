import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime } from '@/lib/admin/format';
import { signAiImage } from '@/lib/admin/ai-images';
import DeleteAiSession from './delete-action.client';

export const dynamic = 'force-dynamic';

export default async function AiSessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession(AREA_ACCESS.ai);
  const { id } = await params;

  const [session] = await db.select().from(schema.aiSessions).where(eq(schema.aiSessions.id, id)).limit(1);
  if (!session) notFound();

  const [inputUrl, outputUrl] = await Promise.all([
    signAiImage('ai-inputs', session.inputImagePath),
    signAiImage('ai-outputs', session.outputImagePath),
  ]);

  const analysis =
    session.analysisJson && typeof session.analysisJson === 'object'
      ? JSON.stringify(session.analysisJson, null, 2)
      : null;

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/ai-sessions"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> AI sessions
      </Link>

      <PageHeader
        title={session.kind === 'before_after' ? 'Before / After session' : 'Skin analysis session'}
        description={formatDateTime(session.createdAt)}
      >
        {session.consentGiven ? (
          <Badge variant="success">Consent given</Badge>
        ) : (
          <Badge variant="destructive">No consent</Badge>
        )}
        {session.error && <Badge variant="destructive">Error</Badge>}
      </PageHeader>

      {/* Disclaimer banner — clinician-branded AI output must carry this. */}
      <div className="mb-6 flex items-start gap-2 rounded-md border border-[var(--clarte-rust)]/40 bg-[var(--clarte-rust)]/10 p-3 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--clarte-rust)]" />
        <p className="text-foreground/80">
          AI-generated projection — illustrative only, not a medical guarantee. Review for quality and
          appropriateness (including realism across skin tones) before any reuse. Patient photos are
          sensitive PII; handle and delete per the 90-day retention policy.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {(inputUrl || outputUrl) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <figure>
                    <figcaption className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                      Input (selfie)
                    </figcaption>
                    {inputUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={inputUrl} alt="AI input" className="w-full rounded-md border border-border" />
                    ) : (
                      <div className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                        No input image
                      </div>
                    )}
                  </figure>
                  <figure>
                    <figcaption className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                      Output (projection)
                    </figcaption>
                    {outputUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={outputUrl} alt="AI output" className="w-full rounded-md border border-border" />
                    ) : (
                      <div className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                        No output image
                      </div>
                    )}
                  </figure>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Signed URLs expire in ~5 minutes; reload to refresh.</p>
              </CardContent>
            </Card>
          )}

          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Analysis JSON</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">{analysis}</pre>
              </CardContent>
            </Card>
          )}

          {session.error && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-destructive">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-auto rounded-md bg-destructive/10 p-3 text-xs text-destructive">
                  {session.error}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Meta label="Kind" value={session.kind} />
              <Meta label="Concern" value={session.concern ?? '—'} />
              <Meta label="Model" value={session.modelVersion} />
              <Meta label="Latency" value={session.latencyMs ? `${(session.latencyMs / 1000).toFixed(1)}s` : '—'} />
              <Meta label="Image SHA-256" value={session.inputImageSha256.slice(0, 16) + '…'} mono />
              <Meta label="Client UA" value={session.clientUa ?? '—'} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <DeleteAiSession id={session.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className={mono ? 'font-mono text-xs' : 'text-right'}>{value}</span>
    </div>
  );
}
