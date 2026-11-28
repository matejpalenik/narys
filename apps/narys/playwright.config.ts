import { defineConfig, devices } from '@playwright/test';

const origin = 'http://127.0.0.1:4318';

export default defineConfig({
  testDir: './tests/browser',
  use: { baseURL: origin, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm exec tsx tests/browser/server.ts ${origin}`,
    url: `${origin}/api/auth/ok`,
    timeout: 60_000,
    gracefulShutdown: { signal: 'SIGTERM', timeout: 5_000 },
  },
});
