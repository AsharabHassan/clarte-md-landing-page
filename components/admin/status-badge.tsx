import { Badge } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

const ORDER_STATUS_VARIANT: Record<string, BadgeVariant> = {
  pending: 'outline',
  confirmed: 'secondary',
  dispatched: 'default',
  delivered: 'success',
  cancelled: 'destructive',
  refunded: 'warning',
  returned: 'warning',
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={ORDER_STATUS_VARIANT[status] ?? 'outline'} className="capitalize">
      {status}
    </Badge>
  );
}
