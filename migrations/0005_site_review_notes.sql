CREATE TABLE IF NOT EXISTS site_review_notes (
  id TEXT PRIMARY KEY,
  project TEXT NOT NULL,
  pathname TEXT NOT NULL,
  page_url TEXT NOT NULL,
  page_title TEXT,
  locale TEXT,
  target_type TEXT NOT NULL CHECK (target_type IN ('element', 'image', 'section')),
  target_tag_name TEXT NOT NULL,
  selector TEXT NOT NULL,
  xpath TEXT,
  element_text TEXT,
  note TEXT NOT NULL,
  context_before TEXT,
  context_after TEXT,
  snippet TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_site_review_notes_project_path_created
  ON site_review_notes(project, pathname, created_at DESC);

CREATE TABLE IF NOT EXISTS site_review_note_images (
  id TEXT PRIMARY KEY,
  note_id TEXT NOT NULL REFERENCES site_review_notes(id) ON DELETE CASCADE,
  r2_key TEXT NOT NULL,
  url TEXT NOT NULL,
  filename TEXT,
  content_type TEXT,
  size_bytes INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_site_review_note_images_note
  ON site_review_note_images(note_id, created_at);
