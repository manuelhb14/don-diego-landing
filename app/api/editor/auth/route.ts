import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createEditorSessionToken,
  getEditorCookieName,
  getEditorPassword,
  isEditorAuthenticated,
} from "@/lib/editor-auth";

export async function GET() {
  const authenticated = await isEditorAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  const raw = (await request.json().catch(() => ({}))) as { password?: string };
  const expected = getEditorPassword();
  const provided = typeof raw.password === "string" ? raw.password : "";

  if (!expected || provided !== expected) {
    return NextResponse.json({ errorCode: "EDITOR_INVALID_PASSWORD" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getEditorCookieName(), createEditorSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(getEditorCookieName());
  return NextResponse.json({ success: true });
}
