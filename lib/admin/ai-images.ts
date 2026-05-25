import { createSupabaseAdminClient } from '@/lib/supabase/server';

/**
 * AI selfies + projections live in PRIVATE Storage buckets, so the admin
 * review UI can only show them through short-lived signed URLs minted
 * server-side with the service-role client.
 *
 * input  → bucket 'ai-inputs'  keyed by aiSessions.inputImagePath
 * output → bucket 'ai-outputs' keyed by aiSessions.outputImagePath
 */
const SIGN_TTL_SECONDS = 300;

export async function signAiImage(
  bucket: 'ai-inputs' | 'ai-outputs',
  path: string | null | undefined,
): Promise<string | null> {
  if (!path) return null;
  try {
    const supa = createSupabaseAdminClient();
    const { data, error } = await supa.storage.from(bucket).createSignedUrl(path, SIGN_TTL_SECONDS);
    if (error || !data) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}

/** Remove the input/output objects backing a session (best-effort). */
export async function removeAiImages(
  inputPath: string | null,
  outputPath: string | null,
): Promise<void> {
  try {
    const supa = createSupabaseAdminClient();
    if (inputPath) await supa.storage.from('ai-inputs').remove([inputPath]);
    if (outputPath) await supa.storage.from('ai-outputs').remove([outputPath]);
  } catch (err) {
    console.error('removeAiImages failed', err);
  }
}
