import { NextResponse } from "next/server";
import { getSanMiguelWeather } from "@/lib/weather";

export async function GET() {
  const weather = await getSanMiguelWeather();

  return NextResponse.json(weather, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
