import { getEnv } from "@/lib/cloudflare";

/**
 * Execute a D1 prepared statement. Use in Server Components, Route Handlers, Server Actions.
 *
 * @example
 * const result = await db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
 * const { results } = await db.prepare("SELECT * FROM posts").all();
 */
export function getDb() {
  return getEnv().DB;
}

/**
 * Run a raw SQL string (for migrations or one-off). Prefer prepare() + bind() for user input.
 */
export async function execSql(sql: string) {
  const db = getEnv().DB;
  return db.exec(sql);
}
