import './protocol.css';
import { RENEWAL_PROTOCOL_BODY } from './protocol.html';
import RenewalClient from './client';

export const dynamic = 'force-dynamic';

export default function RenewalProtocolPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: RENEWAL_PROTOCOL_BODY }} />
      <RenewalClient />
    </>
  );
}
