import type { ReactNode } from 'react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getUserRole, roleLabel, AREA_ACCESS, type AdminArea } from '@/lib/auth/roles';
import AdminSidebar from '@/components/admin/sidebar.client';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated (only /admin/login reaches here — middleware gates
  // the rest). Render the page bare; it supplies its own centered UI.
  if (!user) {
    return <>{children}</>;
  }

  const role = getUserRole(user);
  const allowedAreas = (Object.keys(AREA_ACCESS) as AdminArea[]).filter((area) =>
    (AREA_ACCESS[area] as readonly string[]).includes(role),
  );

  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      <AdminSidebar
        email={user.email ?? 'admin'}
        roleLabel={roleLabel(role)}
        allowedAreas={allowedAreas}
      />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
