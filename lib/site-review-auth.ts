import { cookies } from "next/headers";
import { createEditorSessionToken, getEditorCookieName, getEditorPassword, isEditorAuthenticated } from "@/lib/editor-auth";

const SITE_REVIEW_ACCESS_COOKIE = "dd_site_review_access_code";
const ACCESS_TTL_SECONDS = 60 * 60 * 24 * 30;

export type SiteReviewRequester = {
  code: string;
  label: string;
};

function getConfiguredAccessCodes() {
  const raw = process.env.SITE_REVIEW_ACCESS_CODES || process.env.REVIEWER_ACCESS_CODES || "";
  return raw
    .split(/[\n,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [code, ...labelParts] = entry.split(":");
      const cleanCode = code.trim();
      return {
        code: cleanCode,
        label: (labelParts.join(":").trim() || cleanCode).slice(0, 120),
      };
    })
    .filter((entry) => entry.code.length > 0);
}

export function getSiteReviewRequesterForCode(code: string): SiteReviewRequester | null {
  const cleanCode = code.trim();
  if (!cleanCode) return null;
  const match = getConfiguredAccessCodes().find((entry) => entry.code === cleanCode);
  return match ? { code: match.code, label: match.label } : null;
}

async function getSiteReviewAccessRequesterFromCookie() {
  const cookieStore = await cookies();
  const code = cookieStore.get(SITE_REVIEW_ACCESS_COOKIE)?.value || "";
  return getSiteReviewRequesterForCode(code);
}

export async function getSiteReviewRequester() {
  if (await isEditorAuthenticated()) {
    return { code: "editor", label: "Editor" };
  }

  return getSiteReviewAccessRequesterFromCookie();
}

export async function isSiteReviewAuthenticated() {
  return Boolean(await getSiteReviewRequester());
}

export async function authenticateSiteReviewAccessCode(code: string) {
  const requester = getSiteReviewRequesterForCode(code);
  if (!requester) return null;

  const cookieStore = await cookies();
  cookieStore.set(SITE_REVIEW_ACCESS_COOKIE, requester.code, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_TTL_SECONDS,
  });

  return requester;
}

export async function authenticateSiteReviewPassword(password: string) {
  const expected = getEditorPassword();
  if (!expected || password !== expected) return null;

  const cookieStore = await cookies();
  cookieStore.set(getEditorCookieName(), createEditorSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return { code: "editor", label: "Editor" };
}
