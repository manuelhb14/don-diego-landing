import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { buildSystemPrompt } from "@/lib/chat";
import type { ChatContext } from "@/components/chat/types";

type ChatRequestBody = {
    messages?: UIMessage[];
    context?: ChatContext;
};

function parseBody(raw: unknown): { messages: UIMessage[]; context: ChatContext } | null {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const body = raw as ChatRequestBody;

    const messages = Array.isArray(body.messages)
        ? body.messages.slice(-20)
        : [];

    const context = body.context;
    if (!context || typeof context !== "object" || Array.isArray(context)) return null;
    if (typeof context.pathname !== "string") return null;
    if (typeof context.locale !== "string") return null;
    if (typeof context.pageType !== "string") return null;

    return {
        messages,
        context: {
            pathname: context.pathname,
            locale: context.locale,
            pageType: context.pageType,
            detail: context.detail && typeof context.detail === "object" ? context.detail : undefined,
        },
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

        const google = createGoogleGenerativeAI({ apiKey });
        const modelName = process.env.GEMINI_CHAT_MODEL || process.env.GEMINI_MODEL || "gemini-2.5-flash";

        const result = streamText({
            model: google(modelName),
            system: buildSystemPrompt(parsed.context),
            messages: await convertToModelMessages(parsed.messages),
            temperature: 0.5,
            maxOutputTokens: 1200,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("chat route error", error);
        return new Response(JSON.stringify({ errorCode: "CHAT_REQUEST_FAILED" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
