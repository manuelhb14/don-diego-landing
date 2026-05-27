"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_STORAGE_KEY = "don-diego-cookie-consent";
const CONSENT_COOKIE_NAME = "don_diego_cookie_consent";
const CONSENT_EVENT_NAME = "don-diego-cookie-consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const CONSENT_VERSION = 1;

type CookieConsent = {
    necessary: true;
    analytics: boolean;
    version: number;
    decidedAt: string;
};

function isValidConsentValue(value: string) {
    const parsed = JSON.parse(value) as Partial<CookieConsent>;
    return (
        parsed.necessary === true &&
        typeof parsed.analytics === "boolean" &&
        parsed.version === CONSENT_VERSION
    );
}

function getConsentCookie() {
    if (typeof document === "undefined") return null;

    const cookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${CONSENT_COOKIE_NAME}=`));

    if (!cookie) return null;

    return decodeURIComponent(cookie.slice(CONSENT_COOKIE_NAME.length + 1));
}

function hasStoredConsent() {
    let stored: string | null = null;

    try {
        stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
        stored = null;
    }

    try {
        const consentValue = stored ?? getConsentCookie();
        if (!consentValue) return false;

        return isValidConsentValue(consentValue);
    } catch {
        return false;
    }
}

function storeConsent(analytics: boolean) {
    const consent: CookieConsent = {
        necessary: true,
        analytics,
        version: CONSENT_VERSION,
        decidedAt: new Date().toISOString(),
    };

    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch {
        // The cookie fallback still preserves the user's choice when storage is unavailable.
    }

    try {
        const secureAttribute = process.env.NODE_ENV === "production" ? "; Secure" : "";
        document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secureAttribute}`;
    } catch {
        // If persistence is unavailable, the user's current choice still dismisses the banner.
    }

    window.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME, { detail: consent }));
}

function subscribeToConsentChanges(onStoreChange: () => void) {
    if (typeof window === "undefined") return () => {};

    const handleConsentChange = () => onStoreChange();
    const handleStorage = (event: StorageEvent) => {
        if (event.key === CONSENT_STORAGE_KEY) onStoreChange();
    };

    window.addEventListener(CONSENT_EVENT_NAME, handleConsentChange);
    window.addEventListener("storage", handleStorage);

    return () => {
        window.removeEventListener(CONSENT_EVENT_NAME, handleConsentChange);
        window.removeEventListener("storage", handleStorage);
    };
}

function getConsentSnapshot() {
    return !hasStoredConsent();
}

function getServerConsentSnapshot() {
    return false;
}

export default function CookieBanner() {
    const t = useTranslations("cookieBanner");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const shouldShowBanner = useSyncExternalStore(
        subscribeToConsentChanges,
        getConsentSnapshot,
        getServerConsentSnapshot,
    );
    const [dismissed, setDismissed] = useState(false);
    const isVisible = shouldShowBanner && !dismissed;

    const save = (analytics: boolean) => {
        storeConsent(analytics);
        setDismissed(true);
    };

    const bannerMotion = shouldReduceMotion
        ? {
              initial: false as const,
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0 },
          }
        : {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 12 },
              transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
          };

    return (
        <AnimatePresence>
            {isVisible ? (
                <motion.aside
                    {...bannerMotion}
                    aria-live="polite"
                    className="fixed right-3 bottom-3 z-[70] w-[calc(100vw-1.5rem)] max-w-[360px] rounded-[2px] border border-[#AA7D69]/18 bg-[#F6F0E8] p-3 text-[#1C1713] shadow-[0_2px_6px_rgba(47,39,33,0.06),0_10px_28px_rgba(47,39,33,0.11)] sm:right-5 sm:w-fit sm:max-w-[calc(100vw-2.5rem)] md:max-w-[420px] md:p-4"
                >
                    <div className="grid w-full gap-2.5 text-[12px] sm:w-[39ch] md:w-[42ch] md:gap-3 md:text-[14px]">
                        <div className="min-w-0">
                            <p
                                className="mb-1 text-[9px] font-bold tracking-[0.2em] text-[#AA7D69] uppercase md:mb-1.5 md:text-[10px]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("kicker")}
                            </p>
                            <p
                                className="leading-relaxed text-[#1C1713]/74"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                <span className="font-bold text-[#1C1713]">{t("title")}</span>{" "}
                                {t("body")}{" "}
                                <Link
                                    href="/privacidad"
                                    className="font-bold text-[#8F6654] underline underline-offset-4 transition-colors hover:text-[#1C1713]"
                                >
                                    {t("privacyLink")}
                                </Link>
                            </p>
                        </div>

                        <div className="flex w-full items-center gap-3">
                            <button
                                type="button"
                                onClick={() => save(true)}
                                className="inline-flex min-h-8 items-center justify-center bg-[#AA7D69] px-4 py-1.5 text-center text-[9px] font-bold tracking-[0.17em] text-[#FFF9F2] uppercase transition-colors hover:bg-[#956955] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AA7D69] md:min-h-9 md:px-5 md:py-2 md:text-[10px]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("acceptAll")}
                            </button>
                            <button
                                type="button"
                                onClick={() => save(false)}
                                className="inline-flex min-h-8 items-center justify-center px-0 py-1.5 text-left text-[9px] font-bold tracking-[0.12em] text-[#6F4C3D]/76 uppercase transition-colors hover:text-[#1C1713] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AA7D69] md:min-h-9 md:py-2 md:text-[10px]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("necessaryOnly")}
                            </button>
                        </div>
                    </div>
                </motion.aside>
            ) : null}
        </AnimatePresence>
    );
}
