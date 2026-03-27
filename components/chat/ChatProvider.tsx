"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useChat as useAiChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChatContext, ChatMessage } from "@/components/chat/types";
import { getChatSuggestions, type ChatSuggestion } from "@/components/chat/suggestions";

type ChatProviderValue = {
    isOpen: boolean;
    messages: ChatMessage[];
    isLoading: boolean;
    context: ChatContext;
    suggestions: ChatSuggestion[];
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
    clearChat: () => void;
    sendMessage: (content: string) => Promise<void>;
    applySuggestion: (prompt: string) => Promise<void>;
    setContextDetail: (detail?: Record<string, unknown>) => void;
    setContextPageType: (pageType?: string) => void;
    registerTrigger: (node: HTMLButtonElement | null) => void;
    focusInputSignal: number;
};

type ScopedContextValue<T> = {
    pathname: string;
    value: T;
};

const ChatContextStore = createContext<ChatProviderValue | null>(null);

function inferPageType(pathname: string): string {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/blog/")) return "blogPost";
    if (pathname === "/blog") return "blog";
    if (pathname.startsWith("/residencial")) return "residencial";
    if (pathname.startsWith("/proyecto")) return "proyecto";
    if (pathname.startsWith("/contacto")) return "contacto";
    if (pathname.startsWith("/equipo")) return "equipo";
    return "general";
}

export function ChatProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [scopedContextDetail, setScopedContextDetail] =
        useState<ScopedContextValue<Record<string, unknown> | undefined> | null>(null);
    const [scopedPageTypeOverride, setScopedPageTypeOverride] =
        useState<ScopedContextValue<string | undefined> | null>(null);
    const [focusInputSignal, setFocusInputSignal] = useState(0);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const aiChat = useAiChat({
        transport: new DefaultChatTransport({ api: "/api/chat" }),
    });

    const contextDetail =
        scopedContextDetail && scopedContextDetail.pathname === pathname
            ? scopedContextDetail.value
            : undefined;
    const pageTypeOverride =
        scopedPageTypeOverride && scopedPageTypeOverride.pathname === pathname
            ? scopedPageTypeOverride.value
            : undefined;

    const context = useMemo<ChatContext>(() => {
        const pageType = pageTypeOverride || inferPageType(pathname);
        return {
            pathname,
            locale,
            pageType,
            detail: contextDetail,
        };
    }, [contextDetail, locale, pageTypeOverride, pathname]);

    const openChat = useCallback(() => {
        setIsOpen(true);
        setFocusInputSignal((prev) => prev + 1);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
        triggerRef.current?.focus();
    }, []);

    const toggleChat = useCallback(() => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                setFocusInputSignal((value) => value + 1);
            } else {
                requestAnimationFrame(() => {
                    triggerRef.current?.focus();
                });
            }
            return next;
        });
    }, []);

    const clearChat = useCallback(() => {
        aiChat.setMessages([]);
    }, [aiChat]);

    const messages = useMemo<ChatMessage[]>(() => {
        return aiChat.messages
            .filter((message) => message.role === "user" || message.role === "assistant")
            .map((message) => {
                const content = message.parts
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("");

                return {
                    id: message.id,
                    role: message.role as ChatMessage["role"],
                    content,
                };
            });
    }, [aiChat.messages]);

    const isLoading = aiChat.status === "submitted" || aiChat.status === "streaming";

    const sendMessage = useCallback(
        async (content: string) => {
            const trimmed = content.trim();
            if (!trimmed || isLoading) return;

            await aiChat.sendMessage(
                { text: trimmed },
                {
                    body: {
                        context,
                    },
                },
            );
        },
        [aiChat, context, isLoading],
    );

    const suggestions = useMemo(() => getChatSuggestions(context), [context]);

    const applySuggestion = useCallback(
        async (prompt: string) => {
            await sendMessage(prompt);
        },
        [sendMessage],
    );

    const setContextDetail = useCallback(
        (detail?: Record<string, unknown>) => {
            setScopedContextDetail({ pathname, value: detail });
        },
        [pathname],
    );

    const setContextPageType = useCallback(
        (pageType?: string) => {
            setScopedPageTypeOverride({ pathname, value: pageType });
        },
        [pathname],
    );

    const registerTrigger = useCallback((node: HTMLButtonElement | null) => {
        triggerRef.current = node;
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            setIsOpen(false);
            requestAnimationFrame(() => {
                triggerRef.current?.focus();
            });
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const value = useMemo<ChatProviderValue>(
        () => ({
            isOpen,
            messages,
            isLoading,
            context,
            suggestions,
            openChat,
            closeChat,
            toggleChat,
            clearChat,
            sendMessage,
            applySuggestion,
            setContextDetail,
            setContextPageType,
            registerTrigger,
            focusInputSignal,
        }),
        [
            applySuggestion,
            closeChat,
            context,
            focusInputSignal,
            isLoading,
            isOpen,
            messages,
            openChat,
            registerTrigger,
            sendMessage,
            clearChat,
            setContextDetail,
            setContextPageType,
            suggestions,
            toggleChat,
        ],
    );

    return <ChatContextStore.Provider value={value}>{children}</ChatContextStore.Provider>;
}

export function useChat() {
    const ctx = useContext(ChatContextStore);
    if (!ctx) {
        throw new Error("useChat must be used within ChatProvider");
    }
    return ctx;
}
