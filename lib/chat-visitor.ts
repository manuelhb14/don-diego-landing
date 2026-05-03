import { createHash, createHmac } from "node:crypto";

function getVisitorSalt(): string {
  return (
    process.env.CHAT_VISITOR_SALT ||
    "don-diego-dev-visitor-salt-not-for-production"
  );
}

export function computeVisitorKey(ip: string, userAgent: string): string {
  const salt = getVisitorSalt();
  return createHmac("sha256", salt)
    .update(`${ip}|${userAgent}`)
    .digest("hex");
}

export function computeIpHash(ip: string): string {
  const salt = getVisitorSalt();
  return createHash("sha256")
    .update(`ip|${salt}|${ip}`)
    .digest("hex");
}

export function computeUserAgentHash(userAgent: string): string {
  const salt = getVisitorSalt();
  return createHash("sha256")
    .update(`ua|${salt}|${userAgent}`)
    .digest("hex");
}

export function getClientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf?.trim()) return cf.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

export function getClientUserAgent(request: Request): string {
  return request.headers.get("user-agent")?.trim() || "";
}
