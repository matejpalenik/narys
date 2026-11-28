import { randomBytes } from 'node:crypto';
import type { AppEnvironment } from '../../src/config/environment';

/** Creates isolated test credentials for local OAuth initiation only. */
export class StarterSettings {
  /** Supplies an application origin and existing-or-to-be-migrated database path. */
  static create(databasePath: string, origin = 'http://localhost:3000'): AppEnvironment {
    return {
      BETTER_AUTH_URL: origin,
      BETTER_AUTH_SECRET: randomBytes(32).toString('hex'),
      GITHUB_CLIENT_ID: 'narys-test-client',
      GITHUB_CLIENT_SECRET: randomBytes(24).toString('hex'),
      DATABASE_PATH: databasePath,
    };
  }
}
