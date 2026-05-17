import './protocol.css';
import { ACNE_PROTOCOL_BODY } from './protocol.html';
import AcneClient from './client';

export const dynamic = 'force-dynamic';

export default function AcneProtocolPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: ACNE_PROTOCOL_BODY }} />
      <AcneClient />
    </>
  );
}
