export type ChatRole = "user" | "assistant";

export type ChatMessage = {
    id: string;
    role: ChatRole;
    content: string;
};

export type ChatContext = {
    pathname: string;
    locale: string;
    pageType: string;
    detail?: Record<string, unknown>;
};
