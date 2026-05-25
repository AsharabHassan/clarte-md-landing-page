import Link from 'next/link';
import { asc, sql } from 'drizzle-orm';
import { Plus, ExternalLink } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPkr } from '@/lib/admin/format';

export const dynamic = 'force-dynamic';

// Slug → public protocol landing route. Custom protocols have no landing
// page until one is built, so the link is shown only when mapped.
const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

export default async function ProtocolsPage() {
  await requireAdminSession(AREA_ACCESS.protocols);

  const [bundles, counts] = await Promise.all([
    db.select().from(schema.bundles).orderBy(asc(schema.bundles.name)),
    db
      .select({ bundleId: schema.bundleItems.bundleId, c: sql<number>`count(*)::int` })
      .from(schema.bundleItems)
      .groupBy(schema.bundleItems.bundleId),
  ]);
  const countFor = (id: string) => counts.find((c) => c.bundleId === id)?.c ?? 0;

  return (
    <div>
      <PageHeader title="Protocols" description={`${bundles.length} protocol kits`}>
        <Button asChild size="sm">
          <Link href="/admin/protocols/new">
            <Plus className="size-4" /> Add protocol
          </Link>
        </Button>
      </PageHeader>

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Concern</TableHead>
                <TableHead className="text-right">Kit price</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead>Page</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bundles.map((b) => {
                const route = PROTOCOL_ROUTES[b.slug];
                return (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">
                      <Link href={`/admin/protocols/${b.id}`} className="text-secondary hover:underline">
                        {b.name}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{b.slug}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{b.concern}</Badge></TableCell>
                    <TableCell className="text-right tabular-nums">{formatPkr(b.pricePkr)}</TableCell>
                    <TableCell className="text-right tabular-nums">{countFor(b.id)}</TableCell>
                    <TableCell>
                      {route ? (
                        <a
                          href={route}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-secondary hover:underline"
                        >
                          {route} <ExternalLink className="size-3.5" />
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {bundles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No protocols yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
