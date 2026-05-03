import type { ChatContext } from "@/components/chat/types";
import { getDb } from "@/lib/db";

export type ChatLeadSnapshot = {
  displayName: string | null;
  phone: string | null;
  preferences: string | null;
  mergedFromVisitor: boolean;
};

type LeadRow = {
  display_name: string | null;
  phone: string | null;
  preferences_json: string | null;
  confidence_json: string | null;
  merged_from_visitor: number | null;
};

export async function upsertChatSession(params: {
  sessionId: string;
  locale: string;
  pathnameLast: string;
  visitorKey: string;
  ipHash: string | null;
  userAgentHash: string | null;
}): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `INSERT INTO chat_sessions (id, created_at, updated_at, locale, pathname_last, visitor_key, ip_hash, user_agent_hash)
       VALUES (?, datetime('now'), datetime('now'), ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         updated_at = datetime('now'),
         locale = excluded.locale,
         pathname_last = excluded.pathname_last,
         visitor_key = excluded.visitor_key,
         ip_hash = COALESCE(excluded.ip_hash, ip_hash),
         user_agent_hash = COALESCE(excluded.user_agent_hash, user_agent_hash)`,
    )
    .bind(
      params.sessionId,
      params.locale,
      params.pathnameLast,
      params.visitorKey,
      params.ipHash,
      params.userAgentHash,
    )
    .run();
}

export async function insertChatMessageIfNew(params: {
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  clientMessageId: string | null;
  pageContext: ChatContext | null;
}): Promise<void> {
  const db = getDb();
  const ctxJson =
    params.pageContext != null ? JSON.stringify(params.pageContext) : null;
  await db
    .prepare(
      `INSERT OR IGNORE INTO chat_messages (session_id, role, content, client_message_id, page_context_json)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(
      params.sessionId,
      params.role,
      params.content,
      params.clientMessageId,
      ctxJson,
    )
    .run();
}

export async function loadLeadSnapshot(
  sessionId: string,
  visitorKey: string,
): Promise<ChatLeadSnapshot | null> {
  const db = getDb();

  const sessionLead = await db
    .prepare(
      `SELECT display_name, phone, preferences_json, confidence_json, merged_from_visitor
       FROM chat_lead_profile WHERE session_id = ?`,
    )
    .bind(sessionId)
    .first<LeadRow>();

  const visitorLead = await db
    .prepare(
      `SELECT l.display_name, l.phone, l.preferences_json, l.confidence_json, l.merged_from_visitor
       FROM chat_lead_profile l
       INNER JOIN chat_sessions s ON l.session_id = s.id
       WHERE s.visitor_key = ?
         AND datetime(s.updated_at) > datetime('now', '-90 days')
         AND (l.display_name IS NOT NULL OR l.phone IS NOT NULL OR l.preferences_json IS NOT NULL)
       ORDER BY datetime(l.updated_at) DESC
       LIMIT 1`,
    )
    .bind(visitorKey)
    .first<LeadRow>();

  if (!sessionLead && !visitorLead) return null;

  const mergedFromVisitor = Boolean(
    visitorLead &&
      (!sessionLead ||
        (!sessionLead.display_name &&
          !sessionLead.phone &&
          !sessionLead.preferences_json)),
  );

  const displayName =
    sessionLead?.display_name || visitorLead?.display_name || null;
  const phone = sessionLead?.phone || visitorLead?.phone || null;
  const preferences =
    sessionLead?.preferences_json || visitorLead?.preferences_json || null;

  if (!displayName && !phone && !preferences) return null;

  return {
    displayName,
    phone,
    preferences,
    mergedFromVisitor: mergedFromVisitor && Boolean(visitorLead),
  };
}

export async function getLeadProfileRow(sessionId: string): Promise<LeadRow | null> {
  const db = getDb();
  return db
    .prepare(
      `SELECT display_name, phone, preferences_json, confidence_json, merged_from_visitor
       FROM chat_lead_profile WHERE session_id = ?`,
    )
    .bind(sessionId)
    .first<LeadRow>();
}

export async function saveLeadProfile(params: {
  sessionId: string;
  displayName: string | null;
  phone: string | null;
  preferences: string | null;
  confidenceJson: string | null;
  mergedFromVisitor: boolean;
}): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `INSERT INTO chat_lead_profile (session_id, display_name, phone, preferences_json, confidence_json, merged_from_visitor, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(session_id) DO UPDATE SET
         display_name = excluded.display_name,
         phone = excluded.phone,
         preferences_json = excluded.preferences_json,
         confidence_json = excluded.confidence_json,
         merged_from_visitor = excluded.merged_from_visitor,
         updated_at = datetime('now')`,
    )
    .bind(
      params.sessionId,
      params.displayName,
      params.phone,
      params.preferences,
      params.confidenceJson,
      params.mergedFromVisitor ? 1 : 0,
    )
    .run();
}

export type StoredChatMessage = {
  role: "user" | "assistant";
  content: string;
  client_message_id: string | null;
};

export async function listChatMessagesForSession(
  sessionId: string,
  limit: number,
): Promise<StoredChatMessage[]> {
  const db = getDb();
  const { results } = await db
    .prepare(
      `SELECT role, content, client_message_id
       FROM chat_messages
       WHERE session_id = ?
       ORDER BY datetime(created_at) ASC, id ASC
       LIMIT ?`,
    )
    .bind(sessionId, limit)
    .all<StoredChatMessage>();
  return results ?? [];
}
