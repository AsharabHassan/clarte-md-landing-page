import './protocol.css';
import { EVEN_TONE_PROTOCOL_BODY } from './protocol.html';
import EvenToneClient from './client';

export const dynamic = 'force-dynamic';

export default function EvenToneProtocolPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: EVEN_TONE_PROTOCOL_BODY }} />
      <EvenToneClient />
    </>
  );
}
