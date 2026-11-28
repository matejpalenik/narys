import { randomBytes } from 'node:crypto';
import { betterAuth } from 'better-auth';

/** Allows the Better Auth CLI to generate its core schema without runtime credentials. */
export const auth = betterAuth({
  appName: 'Narys',
  baseURL: 'http://localhost:3000',
  secret: randomBytes(32).toString('hex'),
});
