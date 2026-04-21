/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  IMAGES: R2Bucket;
  ADMIN_EDITOR_PASSWORD?: string;
  EDITOR_PASSWORD?: string;
  EDITOR_SESSION_SECRET?: string;
}
