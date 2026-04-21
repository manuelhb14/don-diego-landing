import { getDb } from "@/lib/db";

export type EditorContentType = "text" | "image";
export type EditorScope = "home";

export type EditorEntry = {
  content_key: string;
  content_type: EditorContentType;
  draft_value: string | null;
  published_value: string | null;
};

type RawEditorEntry = {
  content_key: string;
  content_type: string;
  draft_value: string | null;
  published_value: string | null;
};

export async function getPublishedEntries(scope: EditorScope, locale: string) {
  const db = getDb();
  const result = await db
    .prepare(
      "SELECT content_key, content_type, draft_value, published_value FROM editor_content WHERE scope = ? AND locale = ?"
    )
    .bind(scope, locale)
    .all<RawEditorEntry>();

  return (result.results ?? []).map((entry) => ({
    content_key: entry.content_key,
    content_type: entry.content_type === "image" ? "image" : "text",
    draft_value: entry.draft_value,
    published_value: entry.published_value,
  })) as EditorEntry[];
}

export async function saveDraftEntry(params: {
  scope: EditorScope;
  locale: string;
  contentKey: string;
  contentType: EditorContentType;
  value: string;
}) {
  const db = getDb();
  await db
    .prepare(
      `INSERT INTO editor_content (scope, locale, content_key, content_type, draft_value, updated_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(scope, locale, content_key)
       DO UPDATE SET
         content_type = excluded.content_type,
         draft_value = excluded.draft_value,
         updated_at = datetime('now')`
    )
    .bind(params.scope, params.locale, params.contentKey, params.contentType, params.value)
    .run();
}

export async function publishAllDrafts(scope: EditorScope, locale: string) {
  const db = getDb();
  await db
    .prepare(
      `UPDATE editor_content
       SET published_value = draft_value,
           updated_at = datetime('now')
       WHERE scope = ? AND locale = ? AND draft_value IS NOT NULL`
    )
    .bind(scope, locale)
    .run();
}
