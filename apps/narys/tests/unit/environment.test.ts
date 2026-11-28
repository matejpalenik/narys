import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { Environment } from '../../src/config/environment';
import { StarterSettings } from '../fixtures/starter-settings';

describe('Narys runtime settings', () => {
  it('parses valid server settings and drops unrelated variables', () => {
    const env = StarterSettings.create('.data/test.sqlite');
    expect(Environment.parse({ ...env, UNRELATED: 'ignored' })).toEqual(env);
  });

  it('lists missing settings without printing credential values', () => {
    expect(() => Environment.parse({ GITHUB_CLIENT_SECRET: 'fixture-value' })).toThrow(
      /BETTER_AUTH_URL.*BETTER_AUTH_SECRET.*GITHUB_CLIENT_ID.*DATABASE_PATH/,
    );
    expect(() => Environment.parse({ BETTER_AUTH_SECRET: 'fixture-value' })).not.toThrow(
      /fixture-value/,
    );
  });

  it.each(['http://narys.example', 'https://narys.example/app', 'https://narys.example/?test=1'])(
    'rejects an invalid authentication origin %s',
    (origin) => {
      expect(() => Environment.parse(StarterSettings.create('test.sqlite', origin))).toThrow(
        /BETTER_AUTH_URL/,
      );
    },
  );

  it('requires a local dotenv file for interactive development', () => {
    const directory = mkdtempSync(join(tmpdir(), 'narys-env-test-'));
    try {
      expect(() => Environment.requireDevelopmentFile(directory)).toThrow(/Missing apps\/narys/);
      writeFileSync(join(directory, '.env.local'), '');
      expect(() => Environment.requireDevelopmentFile(directory)).not.toThrow();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
