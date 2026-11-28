import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER } from 'next/constants';
import { Environment } from './src/config/environment';

/** Validates settings when Next starts a server. Builds can run without credentials. */
export default function nextConfig(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    Environment.requireDevelopmentFile(process.cwd());
  }

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_SERVER) {
    Environment.parse(process.env);
  }

  return {};
}
