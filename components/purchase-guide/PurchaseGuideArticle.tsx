"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { getPurchaseGuideBundle, type InternationalPurchaseGuide, type LocalMexicoPurchaseGuide, type PurchaseGuideStep } from "@/content/purchaseGuide";
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

type ViewMode = "international" | "local";

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

function checklistStorageKey(locale: string, view: ViewMode) {
    return `don-diego-purchase-guide-checklist-${locale}-${view}`;
}

function useMotionSpring(reduce: boolean | null) {
    return useMemo(
        () =>
            reduce
                ? { duration: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
                : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.7 },
        [reduce],
    );
}

function useFadeTrans(reduce: boolean | null) {
    return useMemo(
        () => ({
            initial: { opacity: 0, y: reduce ? 0 : 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: reduce ? 0 : -6 },
            transition: reduce
                ? { duration: 0.15 }
                : { type: "spring" as const, stiffness: 380, damping: 32 },
        }),
        [reduce],
    );
}

type StepListProps = {
    items: PurchaseGuideStep[];
    openSteps: boolean[];
    onToggleStep: (index: number) => void;
    idPrefix: string;
    reduce: boolean;
};

function StepAccordionList({ items, openSteps, onToggleStep, idPrefix, reduce }: StepListProps) {
    const panelTrans = useMemo(
        () =>
            reduce
                ? { duration: 0.15, ease: "easeOut" as const }
                : { type: "spring" as const, stiffness: 500, damping: 38, mass: 0.5 },
        [reduce],
    );

    return (
        <ul className="mt-6 space-y-3">
            {items.map((step, i) => {
                const open = openSteps[i] ?? false;
                return (
                    <motion.li
                        key={i}
                        className="list-none"
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                        transition={reduce ? undefined : { delay: i * 0.05, type: "spring", stiffness: 400, damping: 35 }}
                    >
                        <div
                            className={cn(
                                "overflow-hidden rounded-lg border border-[#222222]/12 bg-white/40 transition-shadow duration-200",
                                open && "shadow-sm ring-1 ring-[#222222]/10",
                            )}
                        >
                            <motion.button
                                type="button"
                                id={`${idPrefix}-step-${i}`}
                                aria-expanded={open}
                                className="flex w-full items-start gap-3 px-4 py-3 text-left md:px-5 md:py-4"
                                onClick={() => onToggleStep(i)}
                                whileTap={reduce ? undefined : { scale: 0.995 }}
                            >
                                <motion.span
                                    className={cn(
                                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                                        open
                                            ? "border-[#222222] bg-[#222222] text-[#FFF3E1]"
                                            : "border-[#222222]/25 text-[#222222]/70",
                                    )}
                                    layout={!reduce}
                                    transition={reduce ? undefined : { type: "spring", stiffness: 500, damping: 32 }}
                                >
                                    {i + 1}
                                </motion.span>
                                <span className="min-w-0 flex-1">
                                    <span className="font-serif text-base md:text-lg text-[#222222]">
                                        {step.title.replace(/^\d+\.\s*/, "")}
                                    </span>
                                </span>
                                <motion.span
                                    className="mt-1 inline-flex shrink-0"
                                    animate={{ rotate: open ? 180 : 0 }}
                                    transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 400, damping: 28 }}
                                >
                                    <ChevronDown className="h-4 w-4 text-[#222222]/45" />
                                </motion.span>
                            </motion.button>
                            <AnimatePresence initial={false}>
                                {open ? (
                                    <motion.div
                                        key={`${idPrefix}-panel-${i}`}
                                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                        transition={panelTrans}
                                        className="border-t border-[#222222]/10"
                                    >
                                        <p className="px-4 pb-4 pl-[3.25rem] pt-2 text-[#222222]/85 md:px-5 md:pb-5 md:pl-14">
                                            {step.body}
                                        </p>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </div>
                    </motion.li>
                );
            })}
        </ul>
    );
}

export default function PurchaseGuideArticle({ locale, chrome }: Props) {
    const t = useTranslations("pages.purchaseGuide");
    const bundle = useMemo(() => getPurchaseGuideBundle(locale), [locale]);
    const [viewMode, setViewMode] = useState<ViewMode>("international");
    const shouldReduce = useReducedMotion();
    const spring = useMotionSpring(shouldReduce);
    const contentFade = useFadeTrans(shouldReduce);

    const intl = bundle.international;
    const local = bundle.localMexico;

    const activeContent = viewMode === "international" ? intl : local;

    const sectionOrder: SectionKey[] = useMemo(
        () =>
            viewMode === "international"
                ? ["disclaimer", "steps", "mexico", "home", "checklist"]
                : ["disclaimer", "mexico", "steps", "checklist"],
        [viewMode],
    );

    const activeSection = useSectionSpy(sectionOrder);
    const progress = useReadingProgress();

    const stepCount =
        viewMode === "international" ? intl.steps.items.length : local.steps.items.length;
    const [openSteps, setOpenSteps] = useState<boolean[]>(() =>
        Array.from({ length: stepCount }, (_, i) => i === 0),
    );

    const onToggleStep = useCallback(
        (index: number) => {
            setOpenSteps((prev) => {
                const next = Array.from({ length: stepCount }, (_, j) => Boolean(prev[j]));
                next[index] = !next[index];
                return next;
            });
        },
        [stepCount],
    );

    useEffect(() => {
        setOpenSteps(Array.from({ length: stepCount }, (_, i) => i === 0));
    }, [viewMode, stepCount, locale]);

    const [regionTab, setRegionTab] = useState<"us" | "ca" | "eu" | "latam">("us");

    const checklistLen = activeContent.checklist.items.length;
    const [checked, setChecked] = useState<boolean[]>(() => Array(checklistLen).fill(false));
    const [checklistHydrated, setChecklistHydrated] = useState(false);

    useEffect(() => {
        setRegionTab("us");
    }, [viewMode]);

    useEffect(() => {
        const key = checklistStorageKey(locale, viewMode);
        queueMicrotask(() => {
            try {
                const raw = localStorage.getItem(key);
                if (raw) {
                    const parsed = JSON.parse(raw) as unknown;
                    if (Array.isArray(parsed) && parsed.length === checklistLen) {
                        setChecked(parsed.map((x) => Boolean(x)));
                    } else {
                        setChecked(Array(checklistLen).fill(false));
                    }
                } else {
                    setChecked(Array(checklistLen).fill(false));
                }
            } catch {
                setChecked(Array(checklistLen).fill(false));
            }
            setChecklistHydrated(true);
        });
    }, [locale, checklistLen, viewMode]);

    useEffect(() => {
        if (!checklistHydrated) return;
        try {
            localStorage.setItem(checklistStorageKey(locale, viewMode), JSON.stringify(checked));
        } catch {
            /* ignore */
        }
    }, [checked, checklistHydrated, locale, viewMode]);

    const preparedCount = checked.filter(Boolean).length;
    const checklistProgressPct = checklistLen > 0 ? (preparedCount / checklistLen) * 100 : 0;

    const resetChecklist = useCallback(() => {
        setChecked(Array(checklistLen).fill(false));
    }, [checklistLen]);

    const navItems: { key: SectionKey; label: string }[] = useMemo(() => {
        if (viewMode === "international") {
            return [
                { key: "disclaimer", label: t("navDisclaimer") },
                { key: "steps", label: t("navSteps") },
                { key: "mexico", label: t("navMexico") },
                { key: "home", label: t("navHomeCountry") },
                { key: "checklist", label: t("navChecklist") },
            ];
        }
        return [
            { key: "disclaimer", label: t("navDisclaimer") },
            { key: "mexico", label: t("navLocalContext") },
            { key: "steps", label: t("navSteps") },
            { key: "checklist", label: t("navChecklist") },
        ];
    }, [t, viewMode]);

    const regionConfig = useMemo(
        () =>
            ({
                us: { label: t("tabUnitedStates"), region: intl.homeCountryConsiderations.unitedStates },
                ca: { label: t("tabCanada"), region: intl.homeCountryConsiderations.canada },
                eu: { label: t("tabEurope"), region: intl.homeCountryConsiderations.europe },
                latam: { label: t("tabLatinAmerica"), region: intl.homeCountryConsiderations.latinAmerica },
            }) as const,
        [intl.homeCountryConsiderations, t],
    );

    const activeRegion = regionConfig[regionTab];

    const scrollToId = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const disclaimerBody = activeContent.disclaimerBody;

    return (
        <div className="relative">
            <div className="mb-8 w-full" role="tablist" aria-label={t("viewToggleLabel")}>
                {/* Mobile: stacked pills with clear active state (no shared slider) */}
                <div className="flex flex-col gap-2 sm:hidden">
                    <motion.button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "international"}
                        className={cn(
                            "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                            viewMode === "international"
                                ? "border-[#222222] bg-[#222222] text-[#FFF3E1] shadow-sm"
                                : "border-[#222222]/15 bg-white/50 text-[#222222]/70",
                        )}
                        onClick={() => setViewMode("international")}
                        whileTap={shouldReduce ? undefined : { scale: 0.99 }}
                    >
                        {t("tabViewInternational")}
                    </motion.button>
                    <motion.button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "local"}
                        className={cn(
                            "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                            viewMode === "local"
                                ? "border-[#222222] bg-[#222222] text-[#FFF3E1] shadow-sm"
                                : "border-[#222222]/15 bg-white/50 text-[#222222]/70",
                        )}
                        onClick={() => setViewMode("local")}
                        whileTap={shouldReduce ? undefined : { scale: 0.99 }}
                    >
                        {t("tabViewLocalMexico")}
                    </motion.button>
                </div>
                {/* sm+: segmented control with sliding highlight */}
                <div className="relative hidden min-h-[3.25rem] w-full sm:grid sm:grid-cols-2 sm:items-stretch sm:overflow-hidden sm:rounded-2xl sm:border sm:border-[#222222]/12 sm:bg-[#222222]/[0.05] sm:p-1">
                    <motion.div
                        className="pointer-events-none absolute top-1 bottom-1 z-0 w-[calc(50%-6px)] rounded-xl bg-[#222222] shadow-[0_1px_0_rgba(0,0,0,0.06)]"
                        initial={false}
                        animate={{
                            left: viewMode === "international" ? 4 : "calc(50% + 0px)",
                        }}
                        transition={shouldReduce ? { duration: 0.2, ease: "easeInOut" } : spring}
                    />
                    <button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "international"}
                        className={cn(
                            "relative z-10 flex items-center justify-center rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-colors",
                            viewMode === "international" ? "text-[#FFF3E1]" : "text-[#222222]/70 hover:text-[#222222]",
                        )}
                        onClick={() => setViewMode("international")}
                    >
                        {t("tabViewInternational")}
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "local"}
                        className={cn(
                            "relative z-10 flex items-center justify-center rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-colors",
                            viewMode === "local" ? "text-[#FFF3E1]" : "text-[#222222]/70 hover:text-[#222222]",
                        )}
                        onClick={() => setViewMode("local")}
                    >
                        {t("tabViewLocalMexico")}
                    </button>
                </div>
            </div>

            <nav
                className="mb-6 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] lg:hidden"
                aria-label={t("onThisPage")}
            >
                {navItems.map(({ key, label }) => (
                    <motion.button
                        key={key}
                        type="button"
                        className={cn(
                            "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium",
                            activeSection === key
                                ? "border-[#222222] bg-[#222222] text-[#FFF3E1]"
                                : "border-[#222222]/15 bg-white/40 text-[#222222]/70",
                        )}
                        onClick={() => scrollToId(SECTION_IDS[key])}
                        whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                    >
                        {label}
                    </motion.button>
                ))}
            </nav>

            <div
                className="pointer-events-none sticky top-0 z-[55] -mx-1 mb-8 h-1.5 overflow-hidden rounded-full bg-[#222222]/10"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t("readingProgress")}
            >
                <motion.div
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#AA7D69]/80 to-[#222222]/70"
                    initial={false}
                    animate={{ scaleX: progress / 100 }}
                    style={{ transformOrigin: "0% 50%" }}
                    transition={shouldReduce ? { duration: 0.1 } : { type: "spring", stiffness: 120, damping: 22 }}
                />
            </div>

            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-14">
                <div className="min-w-0 space-y-12 font-sans font-light text-sm leading-relaxed opacity-95 md:text-base">
                    <aside
                        id={SECTION_IDS.disclaimer}
                        className="scroll-mt-36 rounded-lg border border-[#222222]/15 bg-black/[0.03] p-6 md:p-8"
                        aria-labelledby="purchase-guide-disclaimer-heading"
                    >
                        <h2
                            id="purchase-guide-disclaimer-heading"
                            className="font-serif text-xl text-[#222222] md:text-2xl"
                        >
                            {chrome.disclaimerTitle}
                        </h2>
                        <p className="mt-3 font-medium text-[#222222]/90">{chrome.disclaimerLead}</p>

                        <details className="group mt-5 border-t border-[#222222]/10 pt-5">
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between gap-3 font-sans text-sm font-medium text-[#222222]/80 outline-none marker:content-none transition-colors hover:text-[#222222] [&::-webkit-details-marker]:hidden"
                            >
                                <span>{t("disclaimerDetailsLabel")}</span>
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-open:rotate-180" />
                            </summary>
                            <div className="mt-4 space-y-4 text-[#222222]/90">
                                {disclaimerBody.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </details>
                    </aside>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {viewMode === "local" ? (
                            <motion.section
                                key="local-mex"
                                id={SECTION_IDS.mexico}
                                className="scroll-mt-36"
                                aria-labelledby="pg-mexico-heading"
                                {...contentFade}
                            >
                                <h2 id="pg-mexico-heading" className="font-serif text-2xl text-[#222222] md:text-3xl">
                                    {(activeContent as LocalMexicoPurchaseGuide).localIntro.title}
                                </h2>
                                <div className="mt-6 space-y-4 rounded-lg border border-[#222222]/10 bg-white/30 p-5 md:p-7">
                                    {(activeContent as LocalMexicoPurchaseGuide).localIntro.paragraphs.map((p, i) => (
                                        <p key={i} className="text-[#222222]/88">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </motion.section>
                        ) : null}
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {viewMode === "international" ? (
                            <motion.section
                                key="intl-steps"
                                id={SECTION_IDS.steps}
                                className="scroll-mt-36"
                                aria-labelledby="pg-steps-heading"
                                {...contentFade}
                            >
                                <h2 id="pg-steps-heading" className="font-serif text-2xl text-[#222222] md:text-3xl">
                                    {(activeContent as InternationalPurchaseGuide).steps.title}
                                </h2>
                                <StepAccordionList
                                    items={(activeContent as InternationalPurchaseGuide).steps.items}
                                    openSteps={openSteps}
                                    onToggleStep={onToggleStep}
                                    idPrefix="pg"
                                    reduce={!!shouldReduce}
                                />
                            </motion.section>
                        ) : null}
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {viewMode === "local" ? (
                            <motion.section
                                key="local-steps"
                                id={SECTION_IDS.steps}
                                className="scroll-mt-36"
                                aria-labelledby="pg-steps-heading-local"
                                {...contentFade}
                            >
                                <h2 id="pg-steps-heading-local" className="font-serif text-2xl text-[#222222] md:text-3xl">
                                    {(activeContent as LocalMexicoPurchaseGuide).steps.title}
                                </h2>
                                <StepAccordionList
                                    items={(activeContent as LocalMexicoPurchaseGuide).steps.items}
                                    openSteps={openSteps}
                                    onToggleStep={onToggleStep}
                                    idPrefix="pg-local"
                                    reduce={!!shouldReduce}
                                />
                            </motion.section>
                        ) : null}
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {viewMode === "international" ? (
                            <motion.section
                                key="intl-mex-ctx"
                                id={SECTION_IDS.mexico}
                                className="scroll-mt-36"
                                aria-labelledby="pg-mexico-heading-intl"
                                {...contentFade}
                            >
                                <h2 id="pg-mexico-heading-intl" className="font-serif text-2xl text-[#222222] md:text-3xl">
                                    {intl.mexicoForeignBuyer.title}
                                </h2>
                                <div className="mt-6 space-y-4 rounded-lg border border-[#222222]/10 bg-white/30 p-5 md:p-7">
                                    {intl.mexicoForeignBuyer.paragraphs.map((p, i) => (
                                        <p key={i} className="text-[#222222]/88">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </motion.section>
                        ) : null}
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {viewMode === "international" ? (
                            <motion.section
                                key="intl-regions"
                                id={SECTION_IDS.home}
                                className="scroll-mt-36"
                                aria-labelledby="pg-home-heading"
                                {...contentFade}
                            >
                                <h2 id="pg-home-heading" className="font-serif text-2xl text-[#222222] md:text-3xl">
                                    {intl.homeCountryConsiderations.title}
                                </h2>
                                <p className="mt-4 text-[#222222]/88">{intl.homeCountryConsiderations.intro}</p>

                                <LayoutGroup id="pg-region-tabs">
                                    <div
                                        className="mt-6 flex flex-wrap gap-1 border-b border-[#222222]/10 pb-0"
                                        role="tablist"
                                        aria-label={t("navHomeCountry")}
                                    >
                                        {(["us", "ca", "eu", "latam"] as const).map((key) => (
                                            <motion.button
                                                key={key}
                                                type="button"
                                                role="tab"
                                                aria-selected={regionTab === key}
                                                className={cn(
                                                    "relative rounded-t-md px-3 py-2.5 text-sm font-medium sm:px-4",
                                                    regionTab === key
                                                        ? "text-[#FFF3E1]"
                                                        : "text-[#222222]/55 hover:text-[#222222]",
                                                )}
                                                onClick={() => setRegionTab(key)}
                                                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
                                            >
                                                {regionTab === key ? (
                                                    <motion.span
                                                        layoutId="pg-region-pill"
                                                        className="absolute inset-0 -z-10 rounded-t-md bg-[#222222] shadow-sm"
                                                        transition={shouldReduce ? { duration: 0.2 } : spring}
                                                    />
                                                ) : null}
                                                <span className="relative z-10">{regionConfig[key].label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </LayoutGroup>

                                <div className="relative mt-0 min-h-[12rem] overflow-hidden rounded-b-lg rounded-tr-lg border border-t-0 border-[#222222]/10 bg-white/30 p-5 md:p-7 lg:rounded-tl-none">
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.div
                                            key={regionTab}
                                            role="tabpanel"
                                            id={`pg-region-panel-${regionTab}`}
                                            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                            transition={shouldReduce ? { duration: 0.12 } : { type: "spring", stiffness: 400, damping: 34 }}
                                        >
                                            <h3 className="font-serif text-xl text-[#222222] md:text-2xl">{activeRegion.region.title}</h3>
                                            <p className="mt-3 text-[#222222]/88">{activeRegion.region.intro}</p>
                                            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-[#222222]/50">
                                                {activeRegion.region.bullets.map((b, j) => (
                                                    <motion.li
                                                        key={j}
                                                        initial={shouldReduce ? false : { opacity: 0, x: -6 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={
                                                            shouldReduce
                                                                ? undefined
                                                                : { delay: j * 0.04, type: "spring", stiffness: 400, damping: 35 }
                                                        }
                                                    >
                                                        {b}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.section>
                        ) : null}
                    </AnimatePresence>

                    <section id={SECTION_IDS.checklist} className="scroll-mt-36" aria-labelledby="pg-checklist-heading">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <h2 id="pg-checklist-heading" className="font-serif text-2xl text-[#222222] md:text-3xl">
                                {activeContent.checklist.title}
                            </h2>
                            <div className="flex w-full flex-col gap-2 sm:max-w-xs sm:items-end">
                                <div className="flex w-full flex-wrap items-center justify-between gap-2 text-sm text-[#222222]/65">
                                    <span>{t("checklistProgress", { prepared: preparedCount, total: checklistLen })}</span>
                                    <motion.button
                                        type="button"
                                        className="text-left underline decoration-[#222222]/30 underline-offset-4 hover:decoration-[#222222]/70"
                                        onClick={resetChecklist}
                                        whileTap={shouldReduce ? undefined : { scale: 0.98 }}
                                    >
                                        {t("resetChecklist")}
                                    </motion.button>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#222222]/10" aria-hidden>
                                    <motion.div
                                        className="h-full rounded-full bg-[#AA7D69]/90"
                                        initial={false}
                                        animate={{ width: `${checklistProgressPct}%` }}
                                        transition={shouldReduce ? { duration: 0.15 } : spring}
                                    />
                                </div>
                            </div>
                        </div>

                        <ul className="mt-6 space-y-3">
                            {activeContent.checklist.items.map((item, i) => {
                                const isOn = checked[i] ?? false;
                                return (
                                    <motion.li
                                        key={i}
                                        className="list-none"
                                        initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                                        whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={
                                            shouldReduce
                                                ? undefined
                                                : { delay: 0.03 * i, type: "spring", stiffness: 380, damping: 34 }
                                        }
                                    >
                                        <label className="flex cursor-pointer gap-3 rounded-lg border border-[#222222]/10 bg-white/35 p-4 transition-colors hover:bg-white/55 md:p-5">
                                            <input
                                                type="checkbox"
                                                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-[#222222]/35 text-[#222222] focus:ring-[#222222]/30"
                                                checked={isOn}
                                                onChange={() =>
                                                    setChecked((prev) => {
                                                        const next = [...prev];
                                                        next[i] = !next[i];
                                                        return next;
                                                    })
                                                }
                                            />
                                            <motion.span
                                                className={cn(
                                                    "text-[#222222]/90",
                                                    isOn && "text-[#222222]/50 line-through decoration-[#222222]/35",
                                                )}
                                                layout={!shouldReduce}
                                            >
                                                {item}
                                            </motion.span>
                                        </label>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </section>
                </div>

                <nav className="mt-10 hidden lg:block" aria-label={t("onThisPage")}>
                    <div className="sticky top-36 space-y-3">
                        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#222222]/40">
                            {t("onThisPage")}
                        </p>
                        <ul className="space-y-0.5">
                            {navItems.map(({ key, label }) => {
                                const isActive = activeSection === key;
                                return (
                                    <li key={key}>
                                        <a
                                            href={`#${SECTION_IDS[key]}`}
                                            className={cn(
                                                "block border-l-2 py-1.5 pl-3 text-sm transition-colors",
                                                isActive
                                                    ? "border-[#222222] font-medium text-[#222222]"
                                                    : "border-transparent text-[#222222]/45 hover:border-[#222222]/20 hover:text-[#222222]/80",
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToId(SECTION_IDS[key]);
                                            }}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
