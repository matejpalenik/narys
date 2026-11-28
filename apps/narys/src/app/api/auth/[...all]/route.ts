import 'server-only';

import { Environment } from '@/config/environment';
import { GitHubAuth } from '@/feature/architecture/infrastructure/access/session-better-auth';
import { SqliteDatabase } from '@/feature/architecture/infrastructure/adapters/sqlite/database-sqlite';
import { toNextJsHandler } from 'better-auth/next-js';

/** The starter mounts Better Auth on the Node.js runtime for native SQLite access. */
export const runtime = 'nodejs';

let auth: ReturnType<typeof GitHubAuth.create> | undefined;

/** Handles Better Auth requests. Initialize the live database only on the first request. */
export const { GET, POST } = toNextJsHandler((request: Request) => {
  if (!auth) {
    const environment = Environment.parse(process.env);
    const database = SqliteDatabase.open(environment.DATABASE_PATH);
    auth = GitHubAuth.create({ environment, database: database.db });
  }
  return auth.handler(request);
});
