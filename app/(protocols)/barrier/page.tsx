import './protocol.css';
import { BARRIER_PROTOCOL_BODY } from './protocol.html';
import BarrierClient from './client';

export const dynamic = 'force-dynamic';

export default function BarrierProtocolPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BARRIER_PROTOCOL_BODY }} />
      <BarrierClient />
    </>
  );
}
