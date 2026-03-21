import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow /proximamente (with or without locale prefix)
  const isProximamente =
    pathname === "/proximamente" ||
    pathname.startsWith("/proximamente/") ||
    /^\/(es|en)\/proximamente(\/|$)/.test(pathname);

  if (isProximamente) {
    return intlMiddleware(request);
  }

  // Optional “coming soon” gate: set COMING_SOON=true on the Worker (e.g. Cloudflare dashboard) to send all traffic to /proximamente
  if (
    process.env.NODE_ENV === "production" &&
    process.env.COMING_SOON === "true"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}/proximamente`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
