import Database from 'better-sqlite3';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import * as schema from '../../access/schema-auth-sqlite';

/** Server-side Drizzle database for the starter's auth schema. */
export type NarysDatabase = BetterSQLite3Database<typeof schema>;

/** Owns a SQLite connection and the server-side Drizzle client. */
export class SqliteDatabase {
  readonly db: NarysDatabase;

  private constructor(private readonly connection: Database.Database) {
    this.db = drizzle(connection, { schema });
  }

  /** Opens a connection to a prepared database file. */
  static open(path: string): SqliteDatabase {
    return SqliteDatabase.connect(path, true);
  }

  /** Creates the storage directory and opens a database during the operator migration step. */
  static openForMigration(path: string): SqliteDatabase {
    mkdirSync(dirname(path), { recursive: true });
    return SqliteDatabase.connect(path, false);
  }

  /** Releases the owned SQLite connection. */
  close(): void {
    this.connection.close();
  }

  private static connect(path: string, fileMustExist: boolean): SqliteDatabase {
    const connection = new Database(path, { fileMustExist, timeout: 1000 });
    try {
      connection.pragma('foreign_keys = ON');
      connection.pragma('journal_mode = WAL');
      return new SqliteDatabase(connection);
    } catch (error) {
      connection.close();
      throw error;
    }
  }
}
