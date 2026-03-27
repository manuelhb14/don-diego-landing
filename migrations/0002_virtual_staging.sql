CREATE TABLE IF NOT EXISTS Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Email TEXT NOT NULL UNIQUE,
  Credits INTEGER DEFAULT 5,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  LastCreditRefresh DATETIME
);

CREATE TABLE IF NOT EXISTS VirtualStagings (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  UserId INTEGER NOT NULL,
  OriginalImageUrl TEXT NOT NULL,
  GeneratedImageUrl TEXT,
  Style TEXT,
  Prompt TEXT,
  Status TEXT DEFAULT 'pending',
  PropertyId INTEGER,
  OriginalImageIndex INTEGER,
  ShareId TEXT,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE INDEX IF NOT EXISTS idx_virtual_stagings_user_created
  ON VirtualStagings(UserId, CreatedAt DESC);

CREATE INDEX IF NOT EXISTS idx_virtual_stagings_share_id
  ON VirtualStagings(ShareId);

CREATE INDEX IF NOT EXISTS idx_virtual_stagings_property_image
  ON VirtualStagings(PropertyId, OriginalImageIndex, CreatedAt DESC);
