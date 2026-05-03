export const CHAT_SESSION_STORAGE_KEY = "don-diego-chat-session-id";

export function isChatSessionId(value: string): boolean {
  return /^[A-Za-z0-9_-]{8,64}$/.test(value);
}
