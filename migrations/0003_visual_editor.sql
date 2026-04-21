CREATE TABLE IF NOT EXISTS editor_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scope TEXT NOT NULL,
  locale TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_type TEXT NOT NULL,
  draft_value TEXT,
  published_value TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(scope, locale, content_key)
);

CREATE INDEX IF NOT EXISTS idx_editor_content_scope_locale
  ON editor_content(scope, locale);
