import { NextResponse } from "next/server";
import { isEditorAuthenticated } from "@/lib/editor-auth";
import {
  getPublishedEntries,
  publishAllDrafts,
  saveDraftEntry,
  type EditorContentType,
  type EditorScope,
} from "@/lib/visual-editor";

function isScope(value: string): value is EditorScope {
  return value === "home";
}

function isContentType(value: string): value is EditorContentType {
  return value === "text" || value === "image";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") || "";
  const locale = searchParams.get("locale") || "";
  const previewDraft = searchParams.get("preview") === "1";

  if (!isScope(scope) || !locale) {
    return NextResponse.json({ errorCode: "EDITOR_INVALID_QUERY" }, { status: 400 });
  }

  const entries = await getPublishedEntries(scope, locale);
  const canPreviewDraft = previewDraft && (await isEditorAuthenticated());
  const content = entries.reduce<Record<string, string>>((acc, item) => {
    const value = canPreviewDraft
      ? item.draft_value ?? item.published_value
      : item.published_value;
    if (value !== null) acc[item.content_key] = value;
    return acc;
  }, {});

  return NextResponse.json({ content });
}

export async function PUT(request: Request) {
  if (!(await isEditorAuthenticated())) {
    return NextResponse.json({ errorCode: "EDITOR_UNAUTHORIZED" }, { status: 401 });
  }

  const raw = (await request.json().catch(() => ({}))) as {
    scope?: string;
    locale?: string;
    contentKey?: string;
    contentType?: string;
    value?: string;
  };

  if (
    !raw.scope ||
    !raw.locale ||
    !raw.contentKey ||
    !raw.contentType ||
    typeof raw.value !== "string" ||
    !isScope(raw.scope) ||
    !isContentType(raw.contentType)
  ) {
    return NextResponse.json({ errorCode: "EDITOR_INVALID_PAYLOAD" }, { status: 400 });
  }

  await saveDraftEntry({
    scope: raw.scope,
    locale: raw.locale,
    contentKey: raw.contentKey,
    contentType: raw.contentType,
    value: raw.value,
  });

  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  if (!(await isEditorAuthenticated())) {
    return NextResponse.json({ errorCode: "EDITOR_UNAUTHORIZED" }, { status: 401 });
  }

  const raw = (await request.json().catch(() => ({}))) as {
    action?: string;
    scope?: string;
    locale?: string;
  };

  if (raw.action !== "publish" || !raw.scope || !raw.locale || !isScope(raw.scope)) {
    return NextResponse.json({ errorCode: "EDITOR_INVALID_PUBLISH_REQUEST" }, { status: 400 });
  }

  await publishAllDrafts(raw.scope, raw.locale);
  return NextResponse.json({ success: true });
}
