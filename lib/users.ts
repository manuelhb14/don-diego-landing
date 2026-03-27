import { getDb } from "@/lib/db";

export interface User {
  Id: number;
  Email: string;
  Credits: number;
  CreatedAt: string;
  UpdatedAt: string;
  LastCreditRefresh: string | null;
}

export const DAILY_CREDIT_LIMIT = 5;

export async function getAllUsers(): Promise<User[]> {
  const db = getDb();
  const result = await db
    .prepare(
      "SELECT Id, Email, Credits, CreatedAt, UpdatedAt, LastCreditRefresh FROM Users ORDER BY CreatedAt DESC",
    )
    .all<User>();
  return result.results ?? [];
}

export async function refreshCreditsIfNewDay(userId: number): Promise<User | null> {
  const db = getDb();
  const userResult = await db
    .prepare("SELECT * FROM Users WHERE Id = ?")
    .bind(userId)
    .first<User>();

  if (!userResult) return null;

  const today = new Date().toISOString().split("T")[0];
  const lastRefresh = userResult.LastCreditRefresh?.split("T")[0];

  if (lastRefresh !== today) {
    await db
      .prepare("UPDATE Users SET Credits = ?, LastCreditRefresh = datetime('now') WHERE Id = ?")
      .bind(DAILY_CREDIT_LIMIT, userId)
      .run();

    const refreshed = await db
      .prepare("SELECT * FROM Users WHERE Id = ?")
      .bind(userId)
      .first<User>();
    return refreshed ?? null;
  }

  return userResult;
}

export async function getOrCreateUser(email: string): Promise<User | null> {
  const db = getDb();
  const existing = await db
    .prepare("SELECT * FROM Users WHERE Email = ?")
    .bind(email)
    .first<User>();

  if (existing) {
    return refreshCreditsIfNewDay(existing.Id);
  }

  await db
    .prepare(
      "INSERT INTO Users (Email, Credits, LastCreditRefresh) VALUES (?, ?, datetime('now'))",
    )
    .bind(email, DAILY_CREDIT_LIMIT)
    .run();

  const created = await db
    .prepare("SELECT * FROM Users WHERE Email = ?")
    .bind(email)
    .first<User>();

  return created ?? null;
}

export async function getUser(email: string): Promise<User | null> {
  const db = getDb();
  const user = await db
    .prepare("SELECT * FROM Users WHERE Email = ?")
    .bind(email)
    .first<User>();
  return user ?? null;
}
