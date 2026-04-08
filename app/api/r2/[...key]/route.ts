import { NextRequest, NextResponse } from "next/server";
import { getImage } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ key: string[] }> },
) {
  const { key: keyParts } = await context.params;
  const key = keyParts?.join("/");

  if (!key) {
    return NextResponse.json({ errorCode: "R2_MISSING_OBJECT_KEY" }, { status: 400 });
  }

  const object = await getImage(key);
  if (!object) {
    return NextResponse.json({ errorCode: "R2_OBJECT_NOT_FOUND" }, { status: 404 });
  }

  const contentType = object.httpMetadata?.contentType || "application/octet-stream";
  return new NextResponse(object.body, {
    status: 200,
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
