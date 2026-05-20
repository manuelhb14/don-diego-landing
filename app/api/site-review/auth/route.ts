import { NextResponse } from "next/server";
import {
  authenticateSiteReviewAccessCode,
  authenticateSiteReviewPassword,
  getSiteReviewRequester,
} from "@/lib/site-review-auth";

export async function GET() {
  const requester = await getSiteReviewRequester();
  return NextResponse.json({
    authenticated: Boolean(requester),
    reviewer: requester,
  });
}

export async function POST(request: Request) {
  const raw = (await request.json().catch(() => ({}))) as {
    password?: string;
    accessCode?: string;
  };
  const provided = typeof raw.password === "string" ? raw.password.trim() : "";
  const accessCode = typeof raw.accessCode === "string" ? raw.accessCode.trim() : provided;

  const requester =
    (accessCode ? await authenticateSiteReviewAccessCode(accessCode) : null) ||
    (provided ? await authenticateSiteReviewPassword(provided) : null);

  if (!requester) {
    return NextResponse.json({ errorCode: "SITE_REVIEW_INVALID_ACCESS_CODE" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    reviewer: requester,
  });
}
