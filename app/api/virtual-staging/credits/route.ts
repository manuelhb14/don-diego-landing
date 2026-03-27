import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser, DAILY_CREDIT_LIMIT } from "@/lib/virtual-staging";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await getOrCreateUser(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ credits: user.Credits, dailyLimit: DAILY_CREDIT_LIMIT });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
