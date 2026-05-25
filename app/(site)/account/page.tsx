import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// /account is just an entry point — send people to their orders (the
// guard there bounces signed-out visitors to /account/login).
export default function AccountIndex() {
  redirect('/account/orders');
}
