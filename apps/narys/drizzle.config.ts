import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/feature/architecture/infrastructure/access/schema-auth-sqlite.ts',
  out: './src/feature/architecture/infrastructure/migrations/sqlite',
  strict: true,
});
