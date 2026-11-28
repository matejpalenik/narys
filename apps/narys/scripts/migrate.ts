import nextEnv from '@next/env';
import { Environment } from '../src/config/environment';
import { SqliteMigrations } from '../src/feature/architecture/infrastructure/migrations/migrate-sqlite';

nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');
SqliteMigrations.apply(Environment.parse(process.env).DATABASE_PATH);
process.stdout.write('Narys SQLite migrations are current.\n');
