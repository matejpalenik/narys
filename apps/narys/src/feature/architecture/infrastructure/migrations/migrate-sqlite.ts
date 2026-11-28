import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { fileURLToPath } from 'node:url';
import { SqliteDatabase } from '../adapters/sqlite/database-sqlite';

/** Applies the checked-in Architecture feature migrations during operator setup. */
export class SqliteMigrations {
  /** Applies pending SQL and closes the migration connection on success or failure. */
  static apply(path: string): void {
    const database = SqliteDatabase.openForMigration(path);
    try {
      migrate(database.db, {
        migrationsFolder: fileURLToPath(new URL('./sqlite/', import.meta.url)),
      });
    } finally {
      database.close();
    }
  }
}
