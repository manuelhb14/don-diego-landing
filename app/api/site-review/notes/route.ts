import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getDb } from "@/lib/db";
import { getSiteReviewRequester } from "@/lib/site-review-auth";
import { deleteImage, putImage } from "@/lib/storage";

export const runtime = "nodejs";

type SiteReviewTargetType = "element" | "image" | "section";

type IncomingNote = {
  id?: unknown;
  project?: unknown;
  pathname?: unknown;
  pageUrl?: unknown;
  pageTitle?: unknown;
  locale?: unknown;
  targetType?: unknown;
  tagName?: unknown;
  selector?: unknown;
  xpath?: unknown;
  elementText?: unknown;
  note?: unknown;
  comment?: unknown;
  contextBefore?: unknown;
  contextAfter?: unknown;
  snippet?: unknown;
  completed?: unknown;
  completedAt?: unknown;
  requesterCode?: unknown;
  requesterLabel?: unknown;
  createdAt?: unknown;
};

type StoredImage = {
  id: string;
  noteId: string;
  r2Key: string;
  url: string;
  filename: string | null;
  contentType: string | null;
  sizeBytes: number | null;
  createdAt: string;
};

type StoredNote = {
  id: string;
  project: string;
  pathname: string;
  pageUrl: string;
  pageTitle: string | null;
  locale: string | null;
  targetType: SiteReviewTargetType;
  tagName: string;
  selector: string;
  xpath: string | null;
  elementText: string | null;
  note: string;
  contextBefore: string | null;
  contextAfter: string | null;
  snippet: string | null;
  completed: boolean;
  completedAt: string | null;
  requesterCode: string | null;
  requesterLabel: string | null;
  createdAt: string;
  updatedAt: string;
  images: StoredImage[];
};

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function cleanText(value: unknown, maxLength: number, fallback = "") {
  return asString(value, fallback).trim().slice(0, maxLength);
}

function asTargetType(value: unknown): SiteReviewTargetType {
  return value === "image" || value === "section" ? value : "element";
}

function asBoolean(value: unknown) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function sanitizeExtension(filename: string, contentType: string) {
  const fromName = filename.split(".").pop() || "";
  const ext = fromName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  if (ext) return ext;
  if (contentType === "image/jpeg") return "jpg";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  return "png";
}

function getProxyUrl(key: string) {
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `/api/r2/${encodedKey}`;
}

function normalizeIncomingNote(raw: IncomingNote, requester: Awaited<ReturnType<typeof getSiteReviewRequester>>) {
  const noteText = cleanText(raw.note ?? raw.comment, 5000);
  return {
    id: cleanText(raw.id, 120, `note_${nanoid(12)}`),
    project: cleanText(raw.project, 120, "Don Diego"),
    pathname: cleanText(raw.pathname, 512, "/"),
    pageUrl: cleanText(raw.pageUrl, 2048),
    pageTitle: cleanText(raw.pageTitle, 300),
    locale: cleanText(raw.locale, 16),
    targetType: asTargetType(raw.targetType),
    tagName: cleanText(raw.tagName, 80, "element").toLowerCase(),
    selector: cleanText(raw.selector, 2048),
    xpath: cleanText(raw.xpath, 2048),
    elementText: cleanText(raw.elementText, 2000),
    note: noteText,
    contextBefore: cleanText(raw.contextBefore, 500),
    contextAfter: cleanText(raw.contextAfter, 500),
    snippet: cleanText(raw.snippet, 6000),
    completed: asBoolean(raw.completed),
    completedAt: cleanText(raw.completedAt, 80),
    requesterCode: requester?.code || cleanText(raw.requesterCode, 120),
    requesterLabel: requester?.label || cleanText(raw.requesterLabel, 120),
    createdAt: cleanText(raw.createdAt, 80) || new Date().toISOString(),
  };
}

function parseNoteJson(value: FormDataEntryValue | null): IncomingNote | null {
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value) as IncomingNote;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

async function requireEditorAuth() {
  if (await getSiteReviewRequester()) return null;
  return NextResponse.json({ errorCode: "SITE_REVIEW_UNAUTHORIZED" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireEditorAuth();
  if (unauthorized) return unauthorized;

  const project = request.nextUrl.searchParams.get("project") || "Don Diego";
  const pathname = request.nextUrl.searchParams.get("pathname") || "";
  const db = getDb();

  const query = pathname
    ? db
        .prepare(
          `SELECT
            id, project, pathname, page_url AS pageUrl, page_title AS pageTitle, locale,
            target_type AS targetType, target_tag_name AS tagName, selector, xpath,
            element_text AS elementText, note, context_before AS contextBefore,
            context_after AS contextAfter, snippet, completed, completed_at AS completedAt,
            requester_code AS requesterCode, requester_label AS requesterLabel,
            created_at AS createdAt, updated_at AS updatedAt
          FROM site_review_notes
          WHERE project = ? AND pathname = ?
          ORDER BY created_at DESC`,
        )
        .bind(project, pathname)
    : db
        .prepare(
          `SELECT
            id, project, pathname, page_url AS pageUrl, page_title AS pageTitle, locale,
            target_type AS targetType, target_tag_name AS tagName, selector, xpath,
            element_text AS elementText, note, context_before AS contextBefore,
            context_after AS contextAfter, snippet, completed, completed_at AS completedAt,
            requester_code AS requesterCode, requester_label AS requesterLabel,
            created_at AS createdAt, updated_at AS updatedAt
          FROM site_review_notes
          WHERE project = ?
          ORDER BY created_at DESC
          LIMIT 250`,
        )
        .bind(project);

  const { results } = await query.all<Omit<StoredNote, "images">>();
  const notes = results ?? [];
  if (notes.length === 0) {
    return NextResponse.json({ notes: [] });
  }

  const placeholders = notes.map(() => "?").join(",");
  const imageRows = await db
    .prepare(
      `SELECT
        id, note_id AS noteId, r2_key AS r2Key, url, filename, content_type AS contentType,
        size_bytes AS sizeBytes, created_at AS createdAt
      FROM site_review_note_images
      WHERE note_id IN (${placeholders})
      ORDER BY created_at ASC`,
    )
    .bind(...notes.map((note) => note.id))
    .all<StoredImage>();

  const imagesByNote = new Map<string, StoredImage[]>();
  for (const image of imageRows.results ?? []) {
    const current = imagesByNote.get(image.noteId) ?? [];
    current.push(image);
    imagesByNote.set(image.noteId, current);
  }

  return NextResponse.json({
    notes: notes.map((note) => ({
      ...note,
      images: imagesByNote.get(note.id) ?? [],
    })),
  });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireEditorAuth();
  if (unauthorized) return unauthorized;
  const requester = await getSiteReviewRequester();

  const formData = await request.formData();
  const rawNote = parseNoteJson(formData.get("note"));
  if (!rawNote) {
    return NextResponse.json({ errorCode: "SITE_REVIEW_NOTE_REQUIRED" }, { status: 400 });
  }

  const note = normalizeIncomingNote(rawNote, requester);
  if (!note.note || !note.selector || !note.pageUrl) {
    return NextResponse.json({ errorCode: "SITE_REVIEW_INVALID_NOTE" }, { status: 400 });
  }

  const db = getDb();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO site_review_notes (
        id, project, pathname, page_url, page_title, locale, target_type, target_tag_name,
        selector, xpath, element_text, note, context_before, context_after, snippet,
        completed, completed_at, requester_code, requester_label, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        project = excluded.project,
        pathname = excluded.pathname,
        page_url = excluded.page_url,
        page_title = excluded.page_title,
        locale = excluded.locale,
        target_type = excluded.target_type,
        target_tag_name = excluded.target_tag_name,
        selector = excluded.selector,
        xpath = excluded.xpath,
        element_text = excluded.element_text,
        note = excluded.note,
        context_before = excluded.context_before,
        context_after = excluded.context_after,
        snippet = excluded.snippet,
        completed = excluded.completed,
        completed_at = excluded.completed_at,
        requester_code = excluded.requester_code,
        requester_label = excluded.requester_label,
        updated_at = excluded.updated_at`,
    )
    .bind(
      note.id,
      note.project,
      note.pathname,
      note.pageUrl,
      note.pageTitle || null,
      note.locale || null,
      note.targetType,
      note.tagName,
      note.selector,
      note.xpath || null,
      note.elementText || null,
      note.note,
      note.contextBefore || null,
      note.contextAfter || null,
      note.snippet || null,
      note.completed ? 1 : 0,
      note.completedAt || null,
      note.requesterCode || null,
      note.requesterLabel || null,
      note.createdAt,
      now,
    )
    .run();

  const files = formData
    .getAll("images")
    .filter((file): file is File => file instanceof File && file.size > 0);

  const storedImages: StoredImage[] = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    const id = `img_${nanoid(14)}`;
    const ext = sanitizeExtension(file.name, file.type);
    const key = `site-review/${note.id}/${Date.now()}-${nanoid(8)}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    await putImage(key, bytes, { contentType: file.type || "application/octet-stream" });

    const url = getProxyUrl(key);
    const image: StoredImage = {
      id,
      noteId: note.id,
      r2Key: key,
      url,
      filename: file.name || null,
      contentType: file.type || null,
      sizeBytes: file.size,
      createdAt: now,
    };

    await db
      .prepare(
        `INSERT INTO site_review_note_images (
          id, note_id, r2_key, url, filename, content_type, size_bytes, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        image.id,
        image.noteId,
        image.r2Key,
        image.url,
        image.filename,
        image.contentType,
        image.sizeBytes,
        image.createdAt,
      )
      .run();

    storedImages.push(image);
  }

  return NextResponse.json({
    note: {
      ...note,
      comment: note.note,
      tagName: note.tagName,
      completed: note.completed,
      completedAt: note.completedAt || null,
      requesterCode: note.requesterCode || null,
      requesterLabel: note.requesterLabel || null,
      images: storedImages,
      updatedAt: now,
      syncStatus: "synced",
    },
  });
}

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireEditorAuth();
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => ({}))) as {
    id?: unknown;
    completed?: unknown;
    completedAt?: unknown;
  };
  const id = cleanText(body.id, 120);
  if (!id) {
    return NextResponse.json({ errorCode: "SITE_REVIEW_NOTE_ID_REQUIRED" }, { status: 400 });
  }

  const completed = asBoolean(body.completed);
  const completedAt = completed ? cleanText(body.completedAt, 80) || new Date().toISOString() : "";
  const now = new Date().toISOString();
  const db = getDb();

  await db
    .prepare(
      `UPDATE site_review_notes
       SET completed = ?, completed_at = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(completed ? 1 : 0, completedAt || null, now, id)
    .run();

  return NextResponse.json({
    success: true,
    id,
    completed,
    completedAt: completedAt || null,
    updatedAt: now,
  });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = await requireEditorAuth();
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => ({}))) as { id?: unknown };
  const id = cleanText(body.id, 120);
  if (!id) {
    return NextResponse.json({ errorCode: "SITE_REVIEW_NOTE_ID_REQUIRED" }, { status: 400 });
  }

  const db = getDb();
  const imageRows = await db
    .prepare("SELECT r2_key AS r2Key FROM site_review_note_images WHERE note_id = ?")
    .bind(id)
    .all<{ r2Key: string }>();

  for (const image of imageRows.results ?? []) {
    await deleteImage(image.r2Key).catch(() => undefined);
  }

  await db.prepare("DELETE FROM site_review_note_images WHERE note_id = ?").bind(id).run();
  await db.prepare("DELETE FROM site_review_notes WHERE id = ?").bind(id).run();

  return NextResponse.json({ success: true });
}
