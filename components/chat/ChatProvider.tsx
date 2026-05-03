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
import { useLocale, useTranslations } from "next-intl";
import { useChat as useAiChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { nanoid } from "nanoid";
import type { ChatContext, ChatMessage } from "@/components/chat/types";
import { getChatSuggestions, type ChatSuggestion } from "@/components/chat/suggestions";
import { CHAT_SESSION_STORAGE_KEY } from "@/lib/chat-constants";
import { getDefaultDetailForPageType } from "@/lib/chat-page-context";

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
    chatSessionReady: boolean;
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
    if (pathname.startsWith("/farm")) return "farm";
    if (pathname.startsWith("/wellness")) return "wellness";
    if (pathname.startsWith("/presa")) return "presa";
    if (pathname.startsWith("/proyecto")) return "proyecto";
    if (pathname.startsWith("/ubicacion")) return "ubicacion";
    if (pathname.startsWith("/contacto")) return "contacto";
    if (pathname.startsWith("/experiencias")) return "experiencias";
    if (pathname.startsWith("/equipo")) return "equipo";
    if (pathname.startsWith("/terminos")) return "terminos";
    if (pathname.startsWith("/privacidad")) return "privacidad";
    if (pathname.startsWith("/guia-compra")) return "guiaCompra";
    if (pathname.startsWith("/proximamente")) return "proximamente";
    return "general";
}

function readOrCreateSessionId(): string {
    if (typeof window === "undefined") return "";
    let id = window.localStorage.getItem(CHAT_SESSION_STORAGE_KEY);
    if (!id) {
        id = nanoid();
        window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, id);
    }
    return id;
}

function ChatSessionCore({
    sessionId,
    initialMessages,
    children,
    pathname,
    locale,
    scopedContextDetail,
    scopedPageTypeOverride,
    isOpen,
    setIsOpen,
    focusInputSignal,
    setFocusInputSignal,
    triggerRef,
    onRotateSession,
    setContextDetailParent,
    setContextPageTypeParent,
}: {
    sessionId: string;
    initialMessages: UIMessage[];
    children: ReactNode;
    pathname: string;
    locale: string;
    scopedContextDetail: ScopedContextValue<Record<string, unknown> | undefined> | null;
    scopedPageTypeOverride: ScopedContextValue<string | undefined> | null;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    focusInputSignal: number;
    setFocusInputSignal: React.Dispatch<React.SetStateAction<number>>;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    onRotateSession: () => void;
    setContextDetailParent: (detail?: Record<string, unknown>) => void;
    setContextPageTypeParent: (pageType?: string) => void;
}) {
    const t = useTranslations("components.chatPanel.errors");
    const contextRef = useRef<ChatContext>({
        pathname,
        locale,
        pageType: inferPageType(pathname),
        detail: undefined,
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
        const defaultDetail = getDefaultDetailForPageType(pageType);
        const detail =
            defaultDetail || contextDetail
                ? {
                      ...(defaultDetail ?? {}),
                      ...(contextDetail ?? {}),
                  }
                : undefined;

        return {
            pathname,
            locale,
            pageType,
            detail,
        };
    }, [contextDetail, locale, pageTypeOverride, pathname]);

    useEffect(() => {
        contextRef.current = context;
    }, [context]);

    const aiChat = useAiChat({
        id: sessionId,
        messages: initialMessages,
        transport: new DefaultChatTransport({ api: "/api/chat" }),
    });

    const openChat = useCallback(() => {
        setIsOpen(true);
        setFocusInputSignal((prev) => prev + 1);
    }, [setFocusInputSignal, setIsOpen]);

    const closeChat = useCallback(() => {
        setIsOpen(false);
        triggerRef.current?.focus();
    }, [setIsOpen, triggerRef]);

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
    }, [setFocusInputSignal, setIsOpen, triggerRef]);

    const clearChat = useCallback(() => {
        onRotateSession();
    }, [onRotateSession]);

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

            const requestContext = contextRef.current;
            const shouldLogChatDebug =
                process.env.NODE_ENV !== "production" ||
                (typeof window !== "undefined" && window.localStorage.getItem("chatDebug") === "1");

            if (shouldLogChatDebug) {
                console.log("[chat] sending message", {
                    context: requestContext,
                    sessionId,
                    preview: trimmed.slice(0, 120),
                });
            }

            try {
                await aiChat.sendMessage(
                    { text: trimmed },
                    {
                        body: {
                            context: requestContext,
                            sessionId,
                        },
                    },
                );
            } catch {
                const fallback = t("chatRequestFailed");

                aiChat.setMessages((prev) => [
                    ...prev,
                    {
                        id: `fallback-${Date.now()}`,
                        role: "assistant",
                        parts: [{ type: "text", text: fallback }],
                    },
                ]);
            }
        },
        [aiChat, isLoading, sessionId, t],
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
            setContextDetailParent(detail);
        },
        [setContextDetailParent],
    );

    const setContextPageType = useCallback(
        (pageType?: string) => {
            setContextPageTypeParent(pageType);
        },
        [setContextPageTypeParent],
    );

    const registerTrigger = useCallback(
        (node: HTMLButtonElement | null) => {
            triggerRef.current = node;
        },
        [triggerRef],
    );

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
            chatSessionReady: true,
        }),
        [
            applySuggestion,
            clearChat,
            closeChat,
            context,
            focusInputSignal,
            isLoading,
            isOpen,
            messages,
            openChat,
            registerTrigger,
            sendMessage,
            setContextDetail,
            setContextPageType,
            suggestions,
            toggleChat,
        ],
    );

    return <ChatContextStore.Provider value={value}>{children}</ChatContextStore.Provider>;
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

    const [sessionId, setSessionId] = useState<string | null>(null);
    const [initialMessages, setInitialMessages] = useState<UIMessage[]>([]);
    const [sessionHydrated, setSessionHydrated] = useState(false);

    useEffect(() => {
        const id = readOrCreateSessionId();
        setSessionId(id);
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(
                    `/api/chat/session?id=${encodeURIComponent(id)}`,
                );
                const data: unknown = await res.json();
                const msgs =
                    data &&
                    typeof data === "object" &&
                    !Array.isArray(data) &&
                    Array.isArray((data as { messages?: unknown }).messages)
                        ? (data as { messages: UIMessage[] }).messages
                        : [];
                if (!cancelled) setInitialMessages(msgs);
            } catch {
                if (!cancelled) setInitialMessages([]);
            } finally {
                if (!cancelled) setSessionHydrated(true);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const rotateSession = useCallback(() => {
        const newId = nanoid();
        if (typeof window !== "undefined") {
            window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, newId);
        }
        setSessionId(newId);
        setInitialMessages([]);
    }, []);

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
        const defaultDetail = getDefaultDetailForPageType(pageType);
        const detail =
            defaultDetail || contextDetail
                ? {
                      ...(defaultDetail ?? {}),
                      ...(contextDetail ?? {}),
                  }
                : undefined;

        return {
            pathname,
            locale,
            pageType,
            detail,
        };
    }, [contextDetail, locale, pageTypeOverride, pathname]);

    const openChat = useCallback(() => {
        setIsOpen(true);
        setFocusInputSignal((prev) => prev + 1);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
        triggerRef.current?.focus();
    }, [triggerRef]);

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
    }, [triggerRef]);

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

    const placeholderValue = useMemo<ChatProviderValue>(
        () => ({
            isOpen,
            messages: [],
            isLoading: false,
            context,
            suggestions: getChatSuggestions(context),
            openChat,
            closeChat,
            toggleChat,
            clearChat: () => {},
            sendMessage: async () => {},
            applySuggestion: async () => {},
            setContextDetail,
            setContextPageType,
            registerTrigger,
            focusInputSignal,
            chatSessionReady: false,
        }),
        [
            closeChat,
            context,
            focusInputSignal,
            isOpen,
            openChat,
            registerTrigger,
            setContextDetail,
            setContextPageType,
            toggleChat,
        ],
    );

    if (!sessionHydrated || !sessionId) {
        return (
            <ChatContextStore.Provider value={placeholderValue}>
                {children}
            </ChatContextStore.Provider>
        );
    }

    return (
        <ChatSessionCore
            key={sessionId}
            sessionId={sessionId}
            initialMessages={initialMessages}
            pathname={pathname}
            locale={locale}
            scopedContextDetail={scopedContextDetail}
            scopedPageTypeOverride={scopedPageTypeOverride}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            focusInputSignal={focusInputSignal}
            setFocusInputSignal={setFocusInputSignal}
            triggerRef={triggerRef}
            onRotateSession={rotateSession}
            setContextDetailParent={setContextDetail}
            setContextPageTypeParent={setContextPageType}
        >
            {children}
        </ChatSessionCore>
    );
}

export function useChat() {
    const ctx = useContext(ChatContextStore);
    if (!ctx) {
        throw new Error("useChat must be used within ChatProvider");
    }
    return ctx;
}
