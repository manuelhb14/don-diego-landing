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
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
