import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const EDITOR_COOKIE = "dd_editor_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.EDITOR_SESSION_SECRET || process.env.ADMIN_EDITOR_PASSWORD || "dev-editor-secret";
}

export function getEditorPassword() {
  return process.env.ADMIN_EDITOR_PASSWORD || process.env.EDITOR_PASSWORD || "";
}

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payloadBase64: string) {
  return createHmac("sha256", getSecret()).update(payloadBase64).digest("base64url");
}

export function createEditorSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payloadBase64 = toBase64Url(JSON.stringify({ exp }));
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function verifyEditorSessionToken(token: string) {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return false;

  const expected = signPayload(payloadBase64);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  try {
    const parsed = JSON.parse(fromBase64Url(payloadBase64)) as { exp?: number };
    return typeof parsed.exp === "number" && parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isEditorAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(EDITOR_COOKIE)?.value;
  return token ? verifyEditorSessionToken(token) : false;
}

export function getEditorCookieName() {
  return EDITOR_COOKIE;
}
