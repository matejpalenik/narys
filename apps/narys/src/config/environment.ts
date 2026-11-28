import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';

const loopbackHosts = new Set(['localhost', '127.0.0.1', '[::1]']);

const environmentSchema = z.object({
  BETTER_AUTH_URL: z.url({ protocol: /^https?$/ }).refine((value) => {
    const url = new URL(value);
    return (
      (url.protocol === 'https:' || loopbackHosts.has(url.hostname)) &&
      url.pathname === '/' &&
      !url.search &&
      !url.hash &&
      !url.username &&
      !url.password
    );
  }, 'Use an HTTPS origin or a loopback HTTP origin.'),
  BETTER_AUTH_SECRET: z.string().trim().min(32),
  GITHUB_CLIENT_ID: z.string().trim().min(1),
  GITHUB_CLIENT_SECRET: z.string().trim().min(1),
  DATABASE_PATH: z.string().trim().min(1),
});

/** Validated server settings for the authentication starter and its SQLite database. */
export type AppEnvironment = z.infer<typeof environmentSchema>;

/** Validates runtime settings without including their values in errors. */
export class Environment {
  /** Requires a local environment file for interactive development. */
  static requireDevelopmentFile(appDirectory: string): void {
    const files = ['.env.local', '.env'];
    if (!files.some((file) => existsSync(join(appDirectory, file)))) {
      throw new Error(
        'Missing apps/narys/.env.local or .env. Copy apps/narys/.env.example to get started.',
      );
    }
  }

  /** Reads settings after the host has loaded its environment. */
  static parse(input: unknown): AppEnvironment {
    const result = environmentSchema.safeParse(input);
    if (!result.success) {
      const names = new Set(result.error.issues.map((issue) => issue.path.join('.')));
      throw new Error(`Missing or invalid Narys environment settings: ${[...names].join(', ')}`);
    }
    return result.data;
  }
}
