"use client";

import type { ReactNode } from "react";
import ChatPanel from "@/components/chat/ChatPanel";

export default function ChatLayoutShell({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <ChatPanel />
        </>
    );
}
