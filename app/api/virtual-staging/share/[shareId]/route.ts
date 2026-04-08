import { NextRequest, NextResponse } from "next/server";
import { getVirtualStagingByShareId } from "@/lib/virtual-staging";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> },
) {
  try {
    const { shareId } = await params;
    if (!shareId) {
      return NextResponse.json({ errorCode: "VS_SHARE_ID_REQUIRED" }, { status: 400 });
    }

    const staging = await getVirtualStagingByShareId(shareId);
    if (!staging) {
      return NextResponse.json({ errorCode: "VS_STAGING_NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ staging });
  } catch {
    return NextResponse.json({ errorCode: "VS_INTERNAL_SERVER_ERROR" }, { status: 500 });
  }
}
