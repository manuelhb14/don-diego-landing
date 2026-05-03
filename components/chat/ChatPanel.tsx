"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, Sparkles, SendHorizontal, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useChat } from "@/components/chat/ChatProvider";
import { CHAT_PANEL_WIDTH_CSS } from "@/components/chat/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations } from "next-intl";

export default function ChatPanel() {
    const t = useTranslations("components.chatPanel");
    const {
        closeChat,
        messages,
        isLoading,
        sendMessage,
        suggestions,
        applySuggestion,
        clearChat,
        focusInputSignal,
        isOpen,
        chatSessionReady,
    } = useChat();
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const [value, setValue] = useState("");
    const [showFollowups, setShowFollowups] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const hadConversationRef = useRef(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, [focusInputSignal]);

    useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, isLoading]);

    useEffect(() => {
        const hasConversation = messages.length > 0;
        if (!hasConversation) {
            hadConversationRef.current = false;
            return;
        }

        if (!hadConversationRef.current) {
            hadConversationRef.current = true;
        }
    }, [messages.length]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const next = value.trim();
        if (!next || !chatSessionReady) return;
        setValue("");
        await sendMessage(next);
    };

    const panelContent = (
        <div className="flex h-full min-h-0 flex-col">
                <header className="border-b border-[#222]/10 px-2 md:px-4 pt-2 pb-1">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p
                                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#AA7D69] pt-1"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                <Sparkles className="size-3.5" />
                                {t("headerTitle")}
                            </p>
                            {/* <p
                                className="mt-2 text-[11px] tracking-[0.12em] uppercase text-[#222]/50"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {subtitle}
                            </p> */}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={clearChat}
                                disabled={isLoading || messages.length === 0 || !chatSessionReady}
                                className="inline-flex size-8 items-center justify-center rounded-full border border-[#222]/15 text-[#222]/70 transition-colors hover:text-[#222] disabled:cursor-not-allowed disabled:opacity-45"
                                aria-label={t("clearAria")}
                            >
                                <Trash2 className="size-4" />
                            </button>
                            <button
                                type="button"
                                onClick={closeChat}
                                className="inline-flex size-8 items-center justify-center rounded-full border border-[#222]/15 text-[#222]/70 transition-colors hover:text-[#222]"
                                aria-label={t("closeAria")}
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    </div>
                </header>

                <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-5">
                    {messages.length === 0 ? (
                        <div className="flex min-h-full items-center">
                            <div className="w-full rounded-xl border border-[#AA7D69]/20 bg-[#FFF8F0] px-4 py-5">
                                {/* <p
                                    className="text-center text-[11px] tracking-[0.12em] uppercase text-[#AA7D69]/80"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {subtitle}
                                </p> */}
                                <p
                                    className="mx-auto mt-2 max-w-[36ch] text-center text-[12px] leading-relaxed text-[#222]/75"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {t("emptyState")}
                                </p>

                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={suggestion.id}
                                            type="button"
                                            onClick={() => applySuggestion(suggestion.prompt)}
                                            disabled={isLoading || !chatSessionReady}
                                            className="rounded-full border border-[#AA7D69]/35 bg-white px-3 py-1.5 text-left text-[11px] tracking-[0.08em] uppercase text-[#6F4C3D] transition-colors hover:border-[#AA7D69] hover:text-[#3B261D] disabled:cursor-not-allowed disabled:opacity-50"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {suggestion.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {messages.map((message) => {
                        const isUser = message.role === "user";
                        return (
                            <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[92%] rounded-md px-3 py-2 text-[13px] leading-relaxed ${isUser ? "whitespace-pre-wrap" : ""} ${
                                        isUser
                                            ? "bg-[#AA7D69] text-white"
                                            : "border border-[#222]/10 bg-white text-[#222]/85"
                                    }`}
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {isUser ? (
                                        message.content
                                    ) : (
                                        <div className="chat-markdown text-[13px] leading-relaxed">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    p: ({ children }) => <p className="my-2">{children}</p>,
                                                    ul: ({ children }) => (
                                                        <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
                                                    ),
                                                    ol: ({ children }) => (
                                                        <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
                                                    ),
                                                    li: ({ children }) => <li className="pl-0.5">{children}</li>,
                                                    a: ({ href, children }) => (
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-[#8F6654] underline underline-offset-2"
                                                        >
                                                            {children}
                                                        </a>
                                                    ),
                                                    strong: ({ children }) => (
                                                        <strong className="font-bold text-[#222]">{children}</strong>
                                                    ),
                                                }}
                                            >
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {isLoading ? (
                        <div className="flex justify-start">
                            <div
                                className="rounded-md border border-[#222]/10 bg-white px-3 py-2 text-[12px] text-[#222]/60"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("thinking")}
                            </div>
                        </div>
                    ) : null}
                </div>

                <footer className="border-t border-[#222]/10 px-2 md:px-4 pt-2 pb-1 md:pb-4">
                    {messages.length > 0 ? (
                        <div className="mb-3">
                            <button
                                type="button"
                                onClick={() => setShowFollowups((prev) => !prev)}
                                className="inline-flex items-center gap-1 text-[10px] tracking-[0.14em] uppercase text-[#6F4C3D]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {showFollowups
                                    ? t("hideFollowups")
                                    : t("showFollowups")}
                                {showFollowups ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
                            </button>

                            {showFollowups ? (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={suggestion.id}
                                            type="button"
                                            onClick={() => applySuggestion(suggestion.prompt)}
                                            disabled={isLoading || !chatSessionReady}
                                            className="rounded-full border border-[#AA7D69]/35 bg-white px-3 py-1.5 text-left text-[11px] tracking-[0.08em] uppercase text-[#6F4C3D] transition-colors hover:border-[#AA7D69] hover:text-[#3B261D] disabled:cursor-not-allowed disabled:opacity-50"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {suggestion.label}
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            disabled={!chatSessionReady}
                            placeholder={
                                t("inputPlaceholder")
                            }
                            className="h-10 w-full rounded-md border border-[#222]/20 bg-white px-3 text-[13px] outline-none transition-colors focus:border-[#AA7D69] disabled:cursor-not-allowed disabled:opacity-50"
                            style={{ fontFamily: "var(--font-sans)" }}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !value.trim() || !chatSessionReady}
                            className="inline-flex h-10 shrink-0 items-center gap-1 rounded-md bg-[#AA7D69] px-3 text-[12px] tracking-[0.14em] uppercase text-white transition-colors hover:bg-[#8F6654] disabled:cursor-not-allowed disabled:opacity-50"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            <SendHorizontal className="size-3.5" />
                            {t("send")}
                        </button>
                    </form>
                </footer>
        </div>
    );

    return (
        <Drawer
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) closeChat();
            }}
            direction={isDesktop ? "right" : "bottom"}
        >
            <DrawerContent
                className={`max-h-screen bg-[#F8F1E8] p-0 ${isDesktop ? "h-screen rounded-none border-l border-[#222]/10" : "h-[95dvh] rounded-t-2xl border-t border-[#222]/10"}`}
                style={{
                    width: isDesktop ? CHAT_PANEL_WIDTH_CSS : "100vw",
                    maxWidth: isDesktop ? CHAT_PANEL_WIDTH_CSS : "100vw",
                }}
                aria-label={t("panelAria")}
            >
                {panelContent}
            </DrawerContent>
        </Drawer>
    );
}
