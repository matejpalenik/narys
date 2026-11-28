import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SqliteMigrations } from '../../src/feature/architecture/infrastructure/migrations/migrate-sqlite';
import { StarterSettings } from '../fixtures/starter-settings';

const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:4318');
const directory = mkdtempSync(join(tmpdir(), 'narys-browser-test-'));
const databasePath = join(directory, 'auth.sqlite');

try {
  SqliteMigrations.apply(databasePath);
  const next = spawn(
    process.execPath,
    [
      fileURLToPath(import.meta.resolve('next/dist/bin/next')),
      'start',
      '--hostname',
      origin.hostname,
      '--port',
      origin.port,
    ],
    {
      env: { ...process.env, ...StarterSettings.create(databasePath, origin.origin) },
      stdio: 'inherit',
    },
  );
  const stop = () => next.kill('SIGTERM');
  process.once('SIGTERM', stop);
  process.once('SIGINT', stop);

  try {
    process.exitCode = await new Promise<number>((resolve, reject) => {
      next.once('error', reject);
      next.once('exit', (code) => resolve(code ?? 1));
    });
  } finally {
    process.removeListener('SIGTERM', stop);
    process.removeListener('SIGINT', stop);
  }
} finally {
  rmSync(directory, { recursive: true, force: true });
}
