import { NextResponse } from "next/server";
import type { UIMessage } from "ai";
import { isChatSessionId } from "@/lib/chat-constants";
import { listChatMessagesForSession } from "@/lib/chat-db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id || !isChatSessionId(id)) {
      return NextResponse.json(
        { errorCode: "CHAT_SESSION_INVALID_ID" },
        { status: 400 },
      );
    }

    const rows = await listChatMessagesForSession(id, 80);
    const messages: UIMessage[] = rows.map((row, index) => ({
      id: row.client_message_id ?? `db-${index}-${row.role}`,
      role: row.role,
      parts: [{ type: "text" as const, text: row.content }],
    }));

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("chat session GET error", err);
    return NextResponse.json(
      { errorCode: "CHAT_SESSION_LOAD_FAILED" },
      { status: 500 },
    );
  }
}
