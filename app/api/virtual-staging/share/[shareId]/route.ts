import { NextRequest, NextResponse } from "next/server";
import { getVirtualStagingByShareId } from "@/lib/virtual-staging";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> },
) {
  try {
    const { shareId } = await params;
    if (!shareId) {
      return NextResponse.json({ error: "Share ID is required" }, { status: 400 });
    }

    const staging = await getVirtualStagingByShareId(shareId);
    if (!staging) {
      return NextResponse.json({ error: "Virtual staging not found" }, { status: 404 });
    }

    return NextResponse.json({ staging });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
