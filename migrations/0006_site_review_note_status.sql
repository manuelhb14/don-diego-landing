ALTER TABLE site_review_notes ADD COLUMN completed INTEGER NOT NULL DEFAULT 0;
ALTER TABLE site_review_notes ADD COLUMN completed_at TEXT;
ALTER TABLE site_review_notes ADD COLUMN requester_code TEXT;
ALTER TABLE site_review_notes ADD COLUMN requester_label TEXT;

CREATE INDEX IF NOT EXISTS idx_site_review_notes_project_status
  ON site_review_notes(project, pathname, completed, created_at DESC);
