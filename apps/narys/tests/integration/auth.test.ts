import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { z } from 'zod';
import { GitHubAuth } from '../../src/feature/architecture/infrastructure/access/session-better-auth';
import { verification } from '../../src/feature/architecture/infrastructure/access/schema-auth-sqlite';
import { SqliteDatabase } from '../../src/feature/architecture/infrastructure/adapters/sqlite/database-sqlite';
import { SqliteMigrations } from '../../src/feature/architecture/infrastructure/migrations/migrate-sqlite';
import { StarterSettings } from '../fixtures/starter-settings';

it('starts GitHub OAuth and persists its verification state in the migrated SQLite database', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'narys-auth-test-'));
  const databasePath = join(directory, 'auth.sqlite');
  try {
    const environment = StarterSettings.create(databasePath);
    const origin = environment.BETTER_AUTH_URL;
    SqliteMigrations.apply(databasePath);
    const database = SqliteDatabase.open(databasePath);
    try {
      const auth = GitHubAuth.create({ environment, database: database.db });
      const session = await auth.handler(new Request(`${origin}/api/auth/get-session`));
      expect(session.status).toBe(200);
      expect(await session.json()).toBeNull();

      const request = await auth.handler(
        new Request(`${origin}/api/auth/sign-in/social`, {
          method: 'POST',
          headers: { origin, 'content-type': 'application/json' },
          body: JSON.stringify({ provider: 'github', callbackURL: '/', disableRedirect: true }),
        }),
      );

      expect(request.status).toBe(200);
      const result = z.object({ url: z.url() }).parse(await request.json());
      const redirect = new URL(result.url);
      expect(redirect.origin).toBe('https://github.com');
      expect(redirect.pathname).toBe('/login/oauth/authorize');
      expect(redirect.searchParams.get('client_id')).toBe(environment.GITHUB_CLIENT_ID);
      expect(redirect.searchParams.get('redirect_uri')).toBe(`${origin}/api/auth/callback/github`);
      expect(redirect.searchParams.get('scope') ?? '').toBe('');
      expect(redirect.searchParams.get('state')).toBeTruthy();
      expect(database.db.select().from(verification).all()).toHaveLength(1);

      const unsafe = await auth.handler(
        new Request(`${origin}/api/auth/sign-in/social`, {
          method: 'POST',
          headers: { origin, 'content-type': 'application/json' },
          body: JSON.stringify({
            provider: 'github',
            callbackURL: 'https://untrusted.example/',
          }),
        }),
      );
      expect(unsafe.status).toBe(403);
      expect(database.db.select().from(verification).all()).toHaveLength(1);
    } finally {
      database.close();
    }

    SqliteMigrations.apply(databasePath);
    const reopened = SqliteDatabase.open(databasePath);
    try {
      expect(reopened.db.select().from(verification).all()).toHaveLength(1);
    } finally {
      reopened.close();
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
