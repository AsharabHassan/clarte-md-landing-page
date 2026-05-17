import { GoogleGenAI } from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const pager = await ai.models.list();
  console.log('Models that can generate images via responseModalities=[IMAGE]:');
  for await (const m of pager) {
    const name = m.name || '';
    const methods = (m as any).supportedActions || (m as any).supportedGenerationMethods || [];
    const supportsGen = methods.includes('generateContent') || methods.length === 0;
    if (supportsGen && /image/i.test(name)) {
      console.log(`  ${name}  display="${m.displayName || ''}"`);
    }
  }
  console.log('\nAll 2.5 models:');
  const pager2 = await ai.models.list();
  for await (const m of pager2) {
    if (m.name && m.name.includes('2.5')) console.log(`  ${m.name}`);
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
