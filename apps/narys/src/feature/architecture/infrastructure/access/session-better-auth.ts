import type { AppEnvironment } from '@/config/environment';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';
import type { NarysDatabase } from '../adapters/sqlite/database-sqlite';
import * as schema from './schema-auth-sqlite';

/** Supplies the validated GitHub App credentials and an already-open authentication store. */
export interface CreateGitHubAuth {
  readonly environment: AppEnvironment;
  readonly database: NarysDatabase;
}

/** Creates the Better Auth starter with GitHub OAuth and SQLite-backed sessions. */
export class GitHubAuth {
  /** The starter establishes identity. Workspace access is checked separately by Narys. */
  static create({ environment, database }: CreateGitHubAuth) {
    return betterAuth({
      appName: 'Narys',
      baseURL: environment.BETTER_AUTH_URL,
      secret: environment.BETTER_AUTH_SECRET,
      database: drizzleAdapter(database, { provider: 'sqlite', schema }),
      socialProviders: {
        github: {
          clientId: environment.GITHUB_CLIENT_ID,
          clientSecret: environment.GITHUB_CLIENT_SECRET,
          disableDefaultScope: true,
        },
      },
      account: {
        encryptOAuthTokens: true,
        accountLinking: { enabled: false },
      },
      advanced: { disableOriginCheck: false, disableCSRFCheck: false },
      session: { expiresIn: 8 * 60 * 60, disableSessionRefresh: true },
    });
  }
}
