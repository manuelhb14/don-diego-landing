import { NextRequest, NextResponse } from "next/server";
import {
  getUser,
  getUserVirtualStagings,
  getPropertyVirtualStagings,
} from "@/lib/virtual-staging";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const propertyId = searchParams.get("propertyId");
    const imageIndex = searchParams.get("imageIndex");

    if (!email) {
      return NextResponse.json({ errorCode: "VS_EMAIL_REQUIRED" }, { status: 400 });
    }

    const user = await getUser(email);
    if (!user) {
      return NextResponse.json({ data: [] });
    }

    let stagings;
    if (propertyId && imageIndex !== null) {
      const allStagings = await getPropertyVirtualStagings(
        parseInt(propertyId, 10),
        parseInt(imageIndex || "0", 10),
      );
      stagings = allStagings.filter((s) => s.UserId === user.Id);
    } else {
      stagings = await getUserVirtualStagings(user.Id);
    }

    return NextResponse.json({ data: stagings });
  } catch {
    return NextResponse.json({ errorCode: "VS_INTERNAL_SERVER_ERROR" }, { status: 500 });
  }
}
