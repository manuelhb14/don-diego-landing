import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser, DAILY_CREDIT_LIMIT } from "@/lib/virtual-staging";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ errorCode: "VS_EMAIL_REQUIRED" }, { status: 400 });
    }

    const user = await getOrCreateUser(email);
    if (!user) {
      return NextResponse.json({ errorCode: "VS_USER_NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ credits: user.Credits, dailyLimit: DAILY_CREDIT_LIMIT });
  } catch {
    return NextResponse.json({ errorCode: "VS_INTERNAL_SERVER_ERROR" }, { status: 500 });
  }
}
