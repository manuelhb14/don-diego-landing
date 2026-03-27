"use client";

import { useEffect } from "react";
import { useChat } from "@/components/chat/ChatProvider";

type ChatPageContextProps = {
    pageType?: string;
    detail?: Record<string, unknown>;
};

export default function ChatPageContext({ pageType, detail }: ChatPageContextProps) {
    const { setContextDetail, setContextPageType } = useChat();

    useEffect(() => {
        if (pageType) {
            setContextPageType(pageType);
        }
        return () => {
            setContextPageType(undefined);
        };
    }, [pageType, setContextPageType]);

    useEffect(() => {
        setContextDetail(detail);
        return () => {
            setContextDetail(undefined);
        };
    }, [detail, setContextDetail]);

    return null;
}
