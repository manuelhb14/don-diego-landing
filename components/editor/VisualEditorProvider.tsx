"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";

type ContentType = "text" | "image";

type EditorContextValue = {
  isHomePage: boolean;
  isEditMode: boolean;
  isAuthenticated: boolean;
  isBusy: boolean;
  getValue: (contentKey: string, fallback: string) => string;
  saveDraft: (contentKey: string, contentType: ContentType, value: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string | null>;
};

const EditorContext = createContext<EditorContextValue | null>(null);

function isHomePath(pathname: string) {
  return /^\/(es|en)\/?$/.test(pathname);
}

export function VisualEditorProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const editRequested = searchParams.get("edit") === "1";
  const isHomePage = isHomePath(pathname);
  const isEditMode = editRequested && isHomePage;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const refreshContent = useCallback(async () => {
    if (!isHomePage) return;
    const qs = new URLSearchParams({ scope: "home", locale });
    if (isEditMode && isAuthenticated) {
      qs.set("preview", "1");
    }
    const res = await fetch(`/api/editor/content?${qs.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return;
    const data = (await res.json()) as { content?: Record<string, string> };
    setEntries(data.content ?? {});
  }, [isAuthenticated, isEditMode, isHomePage, locale]);

  useEffect(() => {
    if (!isHomePage) return;
    refreshContent();
  }, [isHomePage, refreshContent]);

  useEffect(() => {
    if (!isEditMode) return;
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/editor/auth", { cache: "no-store" });
      const data = (await res.json()) as { authenticated?: boolean };
      if (!cancelled) {
        setIsAuthenticated(Boolean(data.authenticated));
        setAuthChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isEditMode]);

  const getValue = useCallback(
    (contentKey: string, fallback: string) => {
      return entries[contentKey] ?? fallback;
    },
    [entries]
  );

  const saveDraft = useCallback(
    async (contentKey: string, contentType: ContentType, value: string) => {
      if (!isEditMode || !isAuthenticated) return;
      setEntries((current) => ({ ...current, [contentKey]: value }));
      await fetch("/api/editor/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: "home",
          locale,
          contentKey,
          contentType,
          value,
        }),
      });
    },
    [isAuthenticated, isEditMode, locale]
  );

  const uploadImage = useCallback(
    async (file: File) => {
      if (!isEditMode || !isAuthenticated) return null;
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/editor/upload", { method: "POST", body: formData });
      if (!res.ok) return null;
      const data = (await res.json()) as { url?: string };
      return data.url || null;
    },
    [isAuthenticated, isEditMode]
  );

  const handleLogin = useCallback(async () => {
    setLoginError(null);
    setIsBusy(true);
    try {
      const res = await fetch("/api/editor/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (!res.ok) {
        setLoginError("Invalid password");
        return;
      }
      setIsAuthenticated(true);
      setPasswordInput("");
    } finally {
      setIsBusy(false);
    }
  }, [passwordInput]);

  const handleLogout = useCallback(async () => {
    setIsBusy(true);
    try {
      await fetch("/api/editor/auth", { method: "DELETE" });
      setIsAuthenticated(false);
    } finally {
      setIsBusy(false);
    }
  }, []);

  const handlePublish = useCallback(async () => {
    setIsBusy(true);
    try {
      await fetch("/api/editor/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "publish", scope: "home", locale }),
      });
      await refreshContent();
    } finally {
      setIsBusy(false);
    }
  }, [locale, refreshContent]);

  useEffect(() => {
    if (!(isEditMode && isAuthenticated)) return;
    void refreshContent();
  }, [isAuthenticated, isEditMode, refreshContent]);

  const contextValue = useMemo<EditorContextValue>(
    () => ({
      isHomePage,
      isEditMode,
      isAuthenticated,
      isBusy,
      getValue,
      saveDraft,
      uploadImage,
    }),
    [getValue, isAuthenticated, isBusy, isEditMode, isHomePage, saveDraft, uploadImage]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
      {isEditMode && (
        <div className="fixed top-3 left-1/2 z-[9999] w-[min(95vw,860px)] -translate-x-1/2 rounded-lg border border-[#AA7D69]/40 bg-[#fff8ed]/95 p-3 shadow-[0_20px_50px_rgba(34,23,18,0.2)] backdrop-blur">
          {!authChecked ? (
            <p className="text-xs text-[#222]" style={{ fontFamily: "var(--font-sans)" }}>
              Loading editor...
            </p>
          ) : isAuthenticated ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#AA7D69]/15 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[#6f4e40]" style={{ fontFamily: "var(--font-sans)" }}>
                Visual edit mode
              </span>
              <span className="text-xs text-[#222]/75" style={{ fontFamily: "var(--font-sans)" }}>
                Click text to edit inline. Click image badge to replace.
              </span>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isBusy}
                  className="rounded border border-[#AA7D69] bg-[#AA7D69] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[#fff8ed] disabled:opacity-60"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Publish
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isBusy}
                  className="rounded border border-[#AA7D69]/35 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[#6f4e40] disabled:opacity-60"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-[0.13em] text-[#6f4e40]" style={{ fontFamily: "var(--font-sans)" }}>
                Editor password
              </span>
              <input
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") void handleLogin();
                }}
                className="w-[220px] rounded border border-[#AA7D69]/35 bg-white px-2 py-1.5 text-sm text-[#222] outline-none focus:border-[#AA7D69]"
                style={{ fontFamily: "var(--font-sans)" }}
              />
              <button
                type="button"
                onClick={handleLogin}
                disabled={isBusy}
                className="rounded border border-[#AA7D69] bg-[#AA7D69] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[#fff8ed] disabled:opacity-60"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Unlock
              </button>
              {loginError && (
                <span className="text-xs text-red-700" style={{ fontFamily: "var(--font-sans)" }}>
                  {loginError}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </EditorContext.Provider>
  );
}

export function useVisualEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useVisualEditor must be used within VisualEditorProvider");
  }
  return context;
}
