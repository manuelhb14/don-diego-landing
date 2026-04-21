import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { isEditorAuthenticated } from "@/lib/editor-auth";
import { putImage } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isEditorAuthenticated())) {
    return NextResponse.json({ errorCode: "EDITOR_UNAUTHORIZED" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ errorCode: "EDITOR_FILE_REQUIRED" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "png").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "png";
  const key = `editor/${Date.now()}-${nanoid(8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  await putImage(key, bytes, { contentType: file.type || "application/octet-stream" });

  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return NextResponse.json({ url: `/api/r2/${encodedKey}` });
}
