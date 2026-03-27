import { getDb } from "@/lib/db";
import {
  type User,
  DAILY_CREDIT_LIMIT,
  getAllUsers,
  refreshCreditsIfNewDay,
  getOrCreateUser,
  getUser,
} from "@/lib/users";

export interface VirtualStaging {
  Id: number;
  UserId: number;
  OriginalImageUrl: string;
  GeneratedImageUrl?: string;
  Style: string;
  Prompt?: string;
  Status: "pending" | "completed" | "failed";
  CreatedAt: string;
  PropertyId?: number;
  OriginalImageIndex?: number;
  ShareId?: string;
}

export {
  type User,
  DAILY_CREDIT_LIMIT,
  getAllUsers,
  refreshCreditsIfNewDay,
  getOrCreateUser,
  getUser,
};

export async function createVirtualStaging(
  userId: number,
  originalUrl: string,
  style: string,
  prompt?: string,
  propertyId?: number,
  imageIndex?: number,
  shareId?: string,
): Promise<number | null> {
  const db = getDb();
  const result = await db
    .prepare(
      "INSERT INTO VirtualStagings (UserId, OriginalImageUrl, Style, Prompt, Status, PropertyId, OriginalImageIndex, ShareId) VALUES (?, ?, ?, ?, 'pending', ?, ?, ?) RETURNING Id",
    )
    .bind(
      userId,
      originalUrl,
      style,
      prompt || null,
      propertyId || null,
      imageIndex ?? null,
      shareId || null,
    )
    .all<{ Id: number }>();

  return result.results?.[0]?.Id ?? null;
}

export async function updateVirtualStagingResult(
  id: number,
  generatedUrl: string,
  status: "completed" | "failed" = "completed",
) {
  const db = getDb();
  await db
    .prepare("UPDATE VirtualStagings SET GeneratedImageUrl = ?, Status = ? WHERE Id = ?")
    .bind(generatedUrl, status, id)
    .run();
}

export async function getUserVirtualStagings(userId: number): Promise<VirtualStaging[]> {
  const db = getDb();
  const result = await db
    .prepare(
      "SELECT * FROM VirtualStagings WHERE UserId = ? AND Status = 'completed' ORDER BY CreatedAt DESC",
    )
    .bind(userId)
    .all<VirtualStaging>();
  return result.results ?? [];
}

export async function getPropertyVirtualStagings(
  propertyId: number,
  imageIndex?: number,
): Promise<VirtualStaging[]> {
  const db = getDb();
  if (imageIndex !== undefined) {
    const result = await db
      .prepare(
        "SELECT * FROM VirtualStagings WHERE PropertyId = ? AND OriginalImageIndex = ? AND Status = 'completed' ORDER BY CreatedAt DESC",
      )
      .bind(propertyId, imageIndex)
      .all<VirtualStaging>();
    return result.results ?? [];
  }

  const result = await db
    .prepare(
      "SELECT * FROM VirtualStagings WHERE PropertyId = ? AND Status = 'completed' ORDER BY CreatedAt DESC",
    )
    .bind(propertyId)
    .all<VirtualStaging>();
  return result.results ?? [];
}

export async function getVirtualStagingByShareId(
  shareId: string,
): Promise<VirtualStaging | null> {
  const db = getDb();
  const staging = await db
    .prepare("SELECT * FROM VirtualStagings WHERE ShareId = ?")
    .bind(shareId)
    .first<VirtualStaging>();
  return staging ?? null;
}
