-- Chat sessions, messages, and inferred lead profile (see docs/DATABASE_AND_STORAGE.md).
-- Retention: align with privacy policy (recommended operational cap 24 months, then delete or anonymize).

CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  locale TEXT NOT NULL,
  pathname_last TEXT NOT NULL DEFAULT '',
  visitor_key TEXT NOT NULL,
  ip_hash TEXT,
  user_agent_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor_updated
  ON chat_sessions (visitor_key, updated_at DESC);

CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  client_message_id TEXT,
  page_context_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (session_id, client_message_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_created
  ON chat_messages (session_id, created_at);

CREATE TABLE IF NOT EXISTS chat_lead_profile (
  session_id TEXT PRIMARY KEY REFERENCES chat_sessions(id) ON DELETE CASCADE,
  display_name TEXT,
  phone TEXT,
  preferences_json TEXT,
  confidence_json TEXT,
  merged_from_visitor INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
