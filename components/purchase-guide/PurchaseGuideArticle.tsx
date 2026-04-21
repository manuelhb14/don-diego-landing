"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { getPurchaseGuideContent } from "@/content/purchaseGuide";
import { cn } from "@/lib/utils";

type Chrome = {
    disclaimerTitle: string;
    disclaimerLead: string;
};

type Props = {
    locale: string;
    chrome: Chrome;
};

const SECTION_IDS = {
    disclaimer: "pg-section-disclaimer",
    steps: "pg-section-steps",
    mexico: "pg-section-mexico",
    home: "pg-section-home",
    checklist: "pg-section-checklist",
} as const;

type SectionKey = keyof typeof SECTION_IDS;

function useReadingProgress() {
    const [p, setP] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const max = el.scrollHeight - el.clientHeight;
            setP(max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return p;
}

function useSectionSpy(order: SectionKey[]) {
    const [active, setActive] = useState<SectionKey>("disclaimer");
    useEffect(() => {
        const els = order
            .map((k) => document.getElementById(SECTION_IDS[k]))
            .filter(Boolean) as HTMLElement[];
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = [...entries]
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                const first = visible[0]?.target.id;
                if (!first) return;
                const key = order.find((k) => SECTION_IDS[k] === first);
                if (key) setActive(key);
            },
            { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] },
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [order]);
    return active;
}

function checklistStorageKey(locale: string) {
    return `don-diego-purchase-guide-checklist-${locale}`;
}

export default function PurchaseGuideArticle({ locale, chrome }: Props) {
    const t = useTranslations("pages.purchaseGuide");
    const c = useMemo(() => getPurchaseGuideContent(locale), [locale]);
    const progress = useReadingProgress();
    const sectionOrder = useMemo(
        (): SectionKey[] => ["disclaimer", "steps", "mexico", "home", "checklist"],
        [],
    );
    const activeSection = useSectionSpy(sectionOrder);

    const [openStep, setOpenStep] = useState<number | null>(0);
    const [regionTab, setRegionTab] = useState<"us" | "ca" | "eu">("us");

    const checklistLen = c.checklist.items.length;
    const [checked, setChecked] = useState<boolean[]>(() => Array(checklistLen).fill(false));
    const [checklistHydrated, setChecklistHydrated] = useState(false);

    useEffect(() => {
        const key = checklistStorageKey(locale);
        queueMicrotask(() => {
            try {
                const raw = localStorage.getItem(key);
                if (raw) {
                    const parsed = JSON.parse(raw) as unknown;
                    if (Array.isArray(parsed) && parsed.length === checklistLen) {
                        setChecked(parsed.map((x) => Boolean(x)));
                    }
                }
            } catch {
                /* ignore */
            }
            setChecklistHydrated(true);
        });
    }, [locale, checklistLen]);

    useEffect(() => {
        if (!checklistHydrated) return;
        try {
            localStorage.setItem(checklistStorageKey(locale), JSON.stringify(checked));
        } catch {
            /* ignore */
        }
    }, [checked, checklistHydrated, locale]);

    const preparedCount = checked.filter(Boolean).length;

    const resetChecklist = useCallback(() => {
        setChecked(Array(checklistLen).fill(false));
    }, [checklistLen]);

    const navItems: { key: SectionKey; label: string }[] = [
        { key: "disclaimer", label: t("navDisclaimer") },
        { key: "steps", label: t("navSteps") },
        { key: "mexico", label: t("navMexico") },
        { key: "home", label: t("navHomeCountry") },
        { key: "checklist", label: t("navChecklist") },
    ];

    const regionConfig = useMemo(
        () =>
            ({
                us: { label: t("tabUnitedStates"), region: c.homeCountryConsiderations.unitedStates },
                ca: { label: t("tabCanada"), region: c.homeCountryConsiderations.canada },
                eu: { label: t("tabEurope"), region: c.homeCountryConsiderations.europe },
            }) as const,
        [c.homeCountryConsiderations, t],
    );

    const activeRegion = regionConfig[regionTab];

    const scrollToId = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="relative">
            <nav
                className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden [-webkit-overflow-scrolling:touch]"
                aria-label={t("onThisPage")}
            >
                {navItems.map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        className={cn(
                            "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                            activeSection === key
                                ? "border-[#222222] bg-[#222222] text-[#FFF3E1]"
                                : "border-[#222222]/15 bg-white/40 text-[#222222]/70",
                        )}
                        onClick={() => scrollToId(SECTION_IDS[key])}
                    >
                        {label}
                    </button>
                ))}
            </nav>

            <div
                className="sticky top-24 z-20 -mx-1 mb-8 h-1 overflow-hidden rounded-full bg-[#222222]/10"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t("readingProgress")}
            >
                <div
                    className="h-full rounded-full bg-[#222222]/55 transition-[width] duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-14">
                <div className="min-w-0 space-y-12 font-sans font-light text-sm md:text-base leading-relaxed opacity-95">
                    <aside
                        id={SECTION_IDS.disclaimer}
                        className="scroll-mt-36 rounded-lg border border-[#222222]/15 bg-black/[0.03] p-6 md:p-8"
                        aria-labelledby="purchase-guide-disclaimer-heading"
                    >
                        <h2
                            id="purchase-guide-disclaimer-heading"
                            className="font-serif text-xl md:text-2xl text-[#222222]"
                        >
                            {chrome.disclaimerTitle}
                        </h2>
                        <p className="mt-3 font-medium text-[#222222]/90">{chrome.disclaimerLead}</p>

                        <details className="group mt-5 border-t border-[#222222]/10 pt-5">
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between gap-3 font-sans text-sm font-medium text-[#222222]/80 outline-none marker:content-none [&::-webkit-details-marker]:hidden"
                            >
                                <span>{t("disclaimerDetailsLabel")}</span>
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="mt-4 space-y-4 text-[#222222]/90">
                                {c.disclaimerBody.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </details>
                    </aside>

                    <section id={SECTION_IDS.steps} className="scroll-mt-36" aria-labelledby="pg-steps-heading">
                        <h2 id="pg-steps-heading" className="font-serif text-2xl md:text-3xl text-[#222222]">
                            {c.steps.title}
                        </h2>
                        <p className="mt-2 text-sm text-[#222222]/60">{t("stepHint")}</p>
                        <ul className="mt-6 space-y-3">
                            {c.steps.items.map((step, i) => {
                                const open = openStep === i;
                                return (
                                    <li key={i} className="list-none">
                                        <div
                                            className={cn(
                                                "rounded-lg border border-[#222222]/12 bg-white/40 transition-shadow",
                                                open && "shadow-sm ring-1 ring-[#222222]/10",
                                            )}
                                        >
                                            <button
                                                type="button"
                                                id={`pg-step-${i}`}
                                                aria-expanded={open}
                                                className="flex w-full items-start gap-3 px-4 py-3 text-left md:px-5 md:py-4"
                                                onClick={() => setOpenStep(open ? null : i)}
                                            >
                                                <span
                                                    className={cn(
                                                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                                                        open
                                                            ? "border-[#222222] bg-[#222222] text-[#FFF3E1]"
                                                            : "border-[#222222]/25 text-[#222222]/70",
                                                    )}
                                                >
                                                    {i + 1}
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="font-serif text-base md:text-lg text-[#222222]">
                                                        {step.title.replace(/^\d+\.\s*/, "")}
                                                    </span>
                                                </span>
                                                <ChevronDown
                                                    className={cn(
                                                        "mt-1 h-4 w-4 shrink-0 text-[#222222]/45 transition-transform duration-200",
                                                        open && "rotate-180",
                                                    )}
                                                />
                                            </button>
                                            {open ? (
                                                <div className="border-t border-[#222222]/10 px-4 pb-4 pt-1 md:px-5 md:pb-5">
                                                    <p className="pl-10 text-[#222222]/85">{step.body}</p>
                                                </div>
                                            ) : null}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section id={SECTION_IDS.mexico} className="scroll-mt-36" aria-labelledby="pg-mexico-heading">
                        <h2 id="pg-mexico-heading" className="font-serif text-2xl md:text-3xl text-[#222222]">
                            {c.mexicoForeignBuyer.title}
                        </h2>
                        <div className="mt-6 space-y-4 rounded-lg border border-[#222222]/10 bg-white/30 p-5 md:p-7">
                            {c.mexicoForeignBuyer.paragraphs.map((p, i) => (
                                <p key={i} className="text-[#222222]/88">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </section>

                    <section id={SECTION_IDS.home} className="scroll-mt-36" aria-labelledby="pg-home-heading">
                        <h2 id="pg-home-heading" className="font-serif text-2xl md:text-3xl text-[#222222]">
                            {c.homeCountryConsiderations.title}
                        </h2>
                        <p className="mt-4 text-[#222222]/88">{c.homeCountryConsiderations.intro}</p>

                        <div
                            className="mt-6 flex flex-wrap gap-2 border-b border-[#222222]/10 pb-1"
                            role="tablist"
                            aria-label={t("navHomeCountry")}
                        >
                            {(["us", "ca", "eu"] as const).map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    role="tab"
                                    aria-selected={regionTab === key}
                                    className={cn(
                                        "rounded-t-md px-4 py-2.5 text-sm font-medium transition-colors",
                                        regionTab === key
                                            ? "bg-[#222222] text-[#FFF3E1]"
                                            : "bg-transparent text-[#222222]/55 hover:bg-black/[0.04] hover:text-[#222222]",
                                    )}
                                    onClick={() => setRegionTab(key)}
                                >
                                    {regionConfig[key].label}
                                </button>
                            ))}
                        </div>

                        <div
                            role="tabpanel"
                            className="mt-6 rounded-b-lg rounded-tr-lg border border-t-0 border-[#222222]/10 bg-white/30 p-5 md:p-7 lg:rounded-tl-none"
                        >
                            <h3 className="font-serif text-xl md:text-2xl text-[#222222]">{activeRegion.region.title}</h3>
                            <p className="mt-3 text-[#222222]/88">{activeRegion.region.intro}</p>
                            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-[#222222]/50">
                                {activeRegion.region.bullets.map((b, j) => (
                                    <li key={j}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section id={SECTION_IDS.checklist} className="scroll-mt-36" aria-labelledby="pg-checklist-heading">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <h2 id="pg-checklist-heading" className="font-serif text-2xl md:text-3xl text-[#222222]">
                                {c.checklist.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-[#222222]/65">
                                <span>{t("checklistProgress", { prepared: preparedCount, total: checklistLen })}</span>
                                <button
                                    type="button"
                                    className="underline decoration-[#222222]/30 underline-offset-4 hover:decoration-[#222222]/70"
                                    onClick={resetChecklist}
                                >
                                    {t("resetChecklist")}
                                </button>
                            </div>
                        </div>

                        <ul className="mt-6 space-y-3">
                            {c.checklist.items.map((item, i) => (
                                <li key={i} className="list-none">
                                    <label className="flex cursor-pointer gap-3 rounded-lg border border-[#222222]/10 bg-white/35 p-4 transition-colors hover:bg-white/55 md:p-5">
                                        <input
                                            type="checkbox"
                                            className="mt-1 h-4 w-4 shrink-0 rounded border-[#222222]/35 text-[#222222] focus:ring-[#222222]/30"
                                            checked={checked[i]}
                                            onChange={() =>
                                                setChecked((prev) => {
                                                    const next = [...prev];
                                                    next[i] = !next[i];
                                                    return next;
                                                })
                                            }
                                        />
                                        <span
                                            className={cn(
                                                "text-[#222222]/90 transition-opacity",
                                                checked[i] && "text-[#222222]/50 line-through decoration-[#222222]/35",
                                            )}
                                        >
                                            {item}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <nav
                    className="mt-10 hidden lg:block"
                    aria-label={t("onThisPage")}
                >
                    <div className="sticky top-36 space-y-3">
                        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#222222]/40">
                            {t("onThisPage")}
                        </p>
                        <ul className="space-y-1 border-l border-[#222222]/15 pl-4">
                            {navItems.map(({ key, label }) => (
                                <li key={key}>
                                    <a
                                        href={`#${SECTION_IDS[key]}`}
                                        className={cn(
                                            "block py-1.5 text-sm transition-colors",
                                            activeSection === key
                                                ? "font-medium text-[#222222]"
                                                : "text-[#222222]/45 hover:text-[#222222]/80",
                                        )}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToId(SECTION_IDS[key]);
                                        }}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>

        </div>
    );
}
