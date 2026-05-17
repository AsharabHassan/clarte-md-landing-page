import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// Load .env.local so DATABASE_URL is visible to drizzle-kit commands
// (Next.js loads it for the app at runtime; drizzle-kit doesn't.)
config({ path: '.env.local' });

export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dbCredentials: { url: process.env.DATABASE_URL! },
  verbose: true,
  strict: true,
});
