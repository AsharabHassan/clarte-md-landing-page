import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
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

export const dynamic = 'force-dynamic';

const CAP = 500;

export default async function SubscribersPage() {
  await requireAdminSession(AREA_ACCESS.subscribers);
  const subscribers = await db
    .select()
    .from(schema.subscribers)
    .orderBy(desc(schema.subscribers.createdAt))
    .limit(CAP);

  return (
    <div>
      <PageHeader
        title="Subscribers"
        description={`${subscribers.length}${subscribers.length === CAP ? '+' : ''} newsletter opt-ins`}
      >
        <Button asChild size="sm" variant="outline">
          <a href="/api/admin/subscribers/export">Export CSV</a>
        </Button>
      </PageHeader>

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.email}</TableCell>
                  <TableCell className="text-muted-foreground">{s.sourcePage}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(s.createdAt)}</TableCell>
                </TableRow>
              ))}
              {subscribers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                    No subscribers yet.
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
