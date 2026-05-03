import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { buildSystemPrompt } from "@/lib/chat";
import type { ChatContext } from "@/components/chat/types";
import { isChatSessionId } from "@/lib/chat-constants";
import {
  insertChatMessageIfNew,
  loadLeadSnapshot,
  upsertChatSession,
} from "@/lib/chat-db";
import { mergeAndPersistLeadProfile } from "@/lib/chat-extraction";
import {
  computeIpHash,
  computeUserAgentHash,
  computeVisitorKey,
  getClientIp,
  getClientUserAgent,
} from "@/lib/chat-visitor";

type ChatRequestBody = {
  messages?: UIMessage[];
  context?: ChatContext;
  sessionId?: string;
  chatClientVersion?: string;
};

function uiMessageText(message: UIMessage): string {
  const parts = message.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

function parseBody(raw: unknown): {
  messages: UIMessage[];
  context: ChatContext;
  sessionId: string;
} | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const body = raw as ChatRequestBody;

  const messages = Array.isArray(body.messages)
    ? body.messages.slice(-20)
    : [];

  const context = body.context;
  if (!context || typeof context !== "object" || Array.isArray(context))
    return null;
  if (typeof context.pathname !== "string") return null;
  if (typeof context.locale !== "string") return null;
  if (typeof context.pageType !== "string") return null;

  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (!sessionId || !isChatSessionId(sessionId)) return null;

  return {
    messages,
    context: {
      pathname: context.pathname,
      locale: context.locale,
      pageType: context.pageType,
      detail:
        context.detail && typeof context.detail === "object"
          ? context.detail
          : undefined,
    },
    sessionId,
  };
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = parseBody(raw);

    if (!parsed || parsed.messages.length === 0) {
      return new Response(JSON.stringify({ errorCode: "CHAT_INVALID_PAYLOAD" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ errorCode: "CHAT_MISSING_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ip = getClientIp(request);
    const ua = getClientUserAgent(request);
    const visitorKey = computeVisitorKey(ip, ua);
    const ipHash = ip !== "unknown" ? computeIpHash(ip) : null;
    const userAgentHash = ua ? computeUserAgentHash(ua) : null;

    await upsertChatSession({
      sessionId: parsed.sessionId,
      locale: parsed.context.locale,
      pathnameLast: parsed.context.pathname,
      visitorKey,
      ipHash,
      userAgentHash,
    });

    const leadSnapshot = await loadLeadSnapshot(parsed.sessionId, visitorKey);

    const lastUser = [...parsed.messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      const userText = uiMessageText(lastUser).trim();
      if (userText) {
        await insertChatMessageIfNew({
          sessionId: parsed.sessionId,
          role: "user",
          content: userText,
          clientMessageId: lastUser.id,
          pageContext: parsed.context,
        });
      }
    }

    const isFirstAssistantTurn = !parsed.messages.some((m) => m.role === "assistant");

    const google = createGoogleGenerativeAI({ apiKey });
    const modelName =
      process.env.GEMINI_CHAT_MODEL || process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = google(modelName);

    const transcriptForExtraction = parsed.messages
      .slice(-8)
      .map((m) => `${m.role}: ${uiMessageText(m).trim()}`)
      .join("\n");

    const result = streamText({
      model,
      system: buildSystemPrompt(parsed.context, {
        leadSnapshot,
        isFirstAssistantTurn,
      }),
      messages: await convertToModelMessages(parsed.messages),
      temperature: 0.5,
      maxOutputTokens: 1200,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: parsed.messages,
      onFinish: async ({ responseMessage }) => {
        try {
          const assistantText = uiMessageText(responseMessage).trim();
          if (!assistantText) return;
          await insertChatMessageIfNew({
            sessionId: parsed.sessionId,
            role: "assistant",
            content: assistantText,
            clientMessageId: responseMessage.id,
            pageContext: null,
          });
          const transcript = `${transcriptForExtraction}\nassistant: ${assistantText}`;
          await mergeAndPersistLeadProfile({
            sessionId: parsed.sessionId,
            model,
            transcript,
            visitorMergedHint: Boolean(leadSnapshot?.mergedFromVisitor),
          });
        } catch (err) {
          console.error("chat persist or extraction error", err);
        }
      },
    });
  } catch (error) {
    console.error("chat route error", error);
    return new Response(JSON.stringify({ errorCode: "CHAT_REQUEST_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
