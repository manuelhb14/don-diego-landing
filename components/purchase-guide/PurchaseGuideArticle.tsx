"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

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

function useSmoothTransition(reduce: boolean | null, duration = 0.42) {
    return useMemo(
        () =>
            reduce
                ? { duration: 0.16, ease: EASE_OUT_CUBIC }
                : { duration, ease: EASE_OUT_CUBIC },
        [duration, reduce],
    );
}

function useFadeTrans(reduce: boolean | null) {
    return useMemo(
        () => ({
            initial: { opacity: 0, y: reduce ? 0 : 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: reduce ? 0 : -6 },
            transition: reduce ? { duration: 0.15 } : { duration: 0.78, ease: EASE_OUT_CUBIC },
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
                ? { duration: 0.15, ease: EASE_OUT_CUBIC }
                : { duration: 0.32, ease: EASE_OUT_CUBIC },
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
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                        transition={reduce ? undefined : { delay: i * 0.06, duration: 0.7, ease: EASE_OUT_CUBIC }}
                    >
                        <div
                            className={cn(
                                "overflow-hidden border border-[#1C1713]/10 bg-[#FFF9F2]/72 transition-colors duration-300",
                                open && "border-[#AA7D69]/35 bg-[#FFF9F2]",
                            )}
                        >
                            <motion.button
                                type="button"
                                id={`${idPrefix}-step-${i}`}
                                aria-expanded={open}
                                className="flex w-full items-start gap-4 px-4 py-4 text-left md:px-5 md:py-5"
                                onClick={() => onToggleStep(i)}
                                whileTap={reduce ? undefined : { scale: 0.995 }}
                            >
                                <motion.span
                                    className={cn(
                                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border text-[11px] font-bold",
                                        open
                                            ? "border-[#AA7D69] bg-[#AA7D69] text-[#FFF9F2]"
                                            : "border-[#AA7D69]/35 text-[#AA7D69]",
                                    )}
                                    layout={!reduce}
                                    transition={panelTrans}
                                >
                                    {i + 1}
                                </motion.span>
                                <span className="min-w-0 flex-1">
                                    <span className="font-serif text-base text-[#1C1713] md:text-xl">
                                        {step.title.replace(/^\d+\.\s*/, "")}
                                    </span>
                                </span>
                                <motion.span
                                    className="mt-1 inline-flex shrink-0"
                                    animate={{ rotate: open ? 180 : 0 }}
                                    transition={panelTrans}
                                >
                                    <ChevronDown className="h-4 w-4 text-[#AA7D69]" />
                                </motion.span>
                            </motion.button>
                            <motion.div
                                initial={false}
                                animate={{
                                    gridTemplateRows: open ? "1fr" : "0fr",
                                    opacity: open ? 1 : 0,
                                }}
                                transition={panelTrans}
                                className="grid border-t border-[#1C1713]/10"
                            >
                                <div className="overflow-hidden">
                                    <p className="px-4 pb-5 pl-[3.75rem] pt-3 text-[#1C1713]/78 md:px-5 md:pb-6 md:pl-[4.25rem]">
                                        {step.body}
                                    </p>
                                </div>
                            </motion.div>
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
    const smooth = useSmoothTransition(shouldReduce);
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
        queueMicrotask(() => {
            setOpenSteps(Array.from({ length: stepCount }, (_, i) => i === 0));
        });
    }, [viewMode, stepCount, locale]);

    const [regionTab, setRegionTab] = useState<"us" | "ca" | "eu" | "latam">("us");

    const checklistLen = activeContent.checklist.items.length;
    const [checked, setChecked] = useState<boolean[]>(() => Array(checklistLen).fill(false));
    const [checklistHydrated, setChecklistHydrated] = useState(false);

    useEffect(() => {
        queueMicrotask(() => {
            setRegionTab("us");
        });
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
                <div className="flex flex-col gap-2 sm:hidden">
                    <motion.button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "international"}
                        className={cn(
                            "border px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] transition-colors",
                            viewMode === "international"
                                ? "border-[#AA7D69] bg-[#AA7D69] text-[#FFF9F2]"
                                : "border-[#AA7D69]/25 bg-[#FFF9F2]/70 text-[#1C1713]/65",
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
                            "border px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] transition-colors",
                            viewMode === "local"
                                ? "border-[#AA7D69] bg-[#AA7D69] text-[#FFF9F2]"
                                : "border-[#AA7D69]/25 bg-[#FFF9F2]/70 text-[#1C1713]/65",
                        )}
                        onClick={() => setViewMode("local")}
                        whileTap={shouldReduce ? undefined : { scale: 0.99 }}
                    >
                        {t("tabViewLocalMexico")}
                    </motion.button>
                </div>
                <div className="relative hidden min-h-[3.25rem] w-full sm:grid sm:grid-cols-2 sm:items-stretch sm:overflow-hidden sm:border sm:border-[#AA7D69]/22 sm:bg-[#FFF9F2]/70 sm:p-1">
                    <motion.div
                        className="pointer-events-none absolute top-1 bottom-1 z-0 w-[calc(50%-4px)] bg-[#AA7D69]"
                        initial={false}
                        animate={{
                            left: viewMode === "international" ? 4 : "calc(50% + 0px)",
                        }}
                        transition={smooth}
                    />
                    <button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "international"}
                        className={cn(
                            "relative z-10 flex items-center justify-center px-3 py-2.5 text-center text-sm font-bold uppercase tracking-[0.12em] transition-colors",
                            viewMode === "international" ? "text-[#FFF9F2]" : "text-[#1C1713]/68 hover:text-[#1C1713]",
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
                            "relative z-10 flex items-center justify-center px-3 py-2.5 text-center text-sm font-bold uppercase tracking-[0.12em] transition-colors",
                            viewMode === "local" ? "text-[#FFF9F2]" : "text-[#1C1713]/68 hover:text-[#1C1713]",
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
                            "shrink-0 border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em]",
                            activeSection === key
                                ? "border-[#AA7D69] bg-[#AA7D69] text-[#FFF9F2]"
                                : "border-[#AA7D69]/22 bg-[#FFF9F2]/70 text-[#1C1713]/62",
                        )}
                        onClick={() => scrollToId(SECTION_IDS[key])}
                        whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                    >
                        {label}
                    </motion.button>
                ))}
            </nav>

            <div
                className="pointer-events-none sticky top-0 z-[55] mb-8 h-[2px] overflow-hidden bg-[#1C1713]/10"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t("readingProgress")}
            >
                <motion.div
                    className="h-full w-full origin-left bg-[#AA7D69]"
                    initial={false}
                    animate={{ scaleX: progress / 100 }}
                    style={{ transformOrigin: "0% 50%" }}
                    transition={shouldReduce ? { duration: 0.1 } : smooth}
                />
            </div>

            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-14">
                <div className="min-w-0 space-y-10 font-sans text-sm font-medium leading-relaxed md:text-base">
                    <aside
                        id={SECTION_IDS.disclaimer}
                        className="scroll-mt-36 border-y border-[#AA7D69]/22 bg-[#FFF9F2]/58 px-5 py-5 md:px-6 md:py-6"
                        aria-labelledby="purchase-guide-disclaimer-heading"
                    >
                        <h2
                            id="purchase-guide-disclaimer-heading"
                            className="font-serif text-xl text-[#1C1713] md:text-2xl"
                        >
                            {chrome.disclaimerTitle}
                        </h2>
                        <p className="mt-3 text-[#1C1713]/82">{chrome.disclaimerLead}</p>

                        <details className="group mt-5 border-t border-[#1C1713]/10 pt-5">
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between gap-3 font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#AA7D69] outline-none marker:content-none transition-colors hover:text-[#956955] [&::-webkit-details-marker]:hidden"
                            >
                                <span>{t("disclaimerDetailsLabel")}</span>
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-open:rotate-180" />
                            </summary>
                            <div className="mt-4 space-y-4 text-[#1C1713]/82">
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
                                <h2 id="pg-mexico-heading" className="font-serif text-2xl text-[#1C1713] md:text-3xl">
                                    {(activeContent as LocalMexicoPurchaseGuide).localIntro.title}
                                </h2>
                                <div className="mt-6 space-y-4 border border-[#AA7D69]/16 bg-[#FFF9F2]/62 p-5 md:p-7">
                                    {(activeContent as LocalMexicoPurchaseGuide).localIntro.paragraphs.map((p, i) => (
                                        <p key={i} className="text-[#1C1713]/82">
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
                                <h2 id="pg-steps-heading" className="font-serif text-2xl text-[#1C1713] md:text-3xl">
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
                                <h2 id="pg-steps-heading-local" className="font-serif text-2xl text-[#1C1713] md:text-3xl">
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
                                <h2 id="pg-mexico-heading-intl" className="font-serif text-2xl text-[#1C1713] md:text-3xl">
                                    {intl.mexicoForeignBuyer.title}
                                </h2>
                                <div className="mt-6 space-y-4 border border-[#AA7D69]/16 bg-[#FFF9F2]/62 p-5 md:p-7">
                                    {intl.mexicoForeignBuyer.paragraphs.map((p, i) => (
                                        <p key={i} className="text-[#1C1713]/82">
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
                                <h2 id="pg-home-heading" className="font-serif text-2xl text-[#1C1713] md:text-3xl">
                                    {intl.homeCountryConsiderations.title}
                                </h2>
                                <p className="mt-4 text-[#1C1713]/82">{intl.homeCountryConsiderations.intro}</p>

                                <div
                                    className="mt-6 flex flex-wrap gap-1 border-b border-[#AA7D69]/18 pb-0"
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
                                                "px-3 py-2.5 text-sm font-bold uppercase tracking-[0.1em] transition-colors sm:px-4",
                                                regionTab === key
                                                    ? "bg-[#AA7D69] text-[#FFF9F2]"
                                                    : "text-[#1C1713]/55 hover:text-[#1C1713]",
                                            )}
                                            onClick={() => setRegionTab(key)}
                                            whileTap={shouldReduce ? undefined : { scale: 0.98 }}
                                        >
                                            {regionConfig[key].label}
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="relative mt-0 min-h-[12rem] overflow-hidden border border-t-0 border-[#AA7D69]/18 bg-[#FFF9F2]/62 p-5 md:p-7">
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.div
                                            key={regionTab}
                                            role="tabpanel"
                                            id={`pg-region-panel-${regionTab}`}
                                            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                            transition={shouldReduce ? { duration: 0.12 } : { duration: 0.42, ease: EASE_OUT_CUBIC }}
                                        >
                                            <h3 className="font-serif text-xl text-[#1C1713] md:text-2xl">{activeRegion.region.title}</h3>
                                            <p className="mt-3 text-[#1C1713]/82">{activeRegion.region.intro}</p>
                                            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-[#AA7D69]">
                                                {activeRegion.region.bullets.map((b, j) => (
                                                    <motion.li
                                                        key={j}
                                                        initial={shouldReduce ? false : { opacity: 0, x: -6 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={
                                                            shouldReduce
                                                                ? undefined
                                                                : { delay: j * 0.04, duration: 0.42, ease: EASE_OUT_CUBIC }
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
                            <h2 id="pg-checklist-heading" className="font-serif text-2xl text-[#1C1713] md:text-3xl">
                                {activeContent.checklist.title}
                            </h2>
                            <div className="flex w-full flex-col gap-2 sm:max-w-xs sm:items-end">
                                <div className="flex w-full flex-wrap items-center justify-between gap-2 text-sm text-[#1C1713]/65">
                                    <span>{t("checklistProgress", { prepared: preparedCount, total: checklistLen })}</span>
                                    <motion.button
                                        type="button"
                                        className="text-left font-bold uppercase tracking-[0.1em] text-[#AA7D69] underline decoration-[#AA7D69]/30 underline-offset-4 hover:decoration-[#AA7D69]/70"
                                        onClick={resetChecklist}
                                        whileTap={shouldReduce ? undefined : { scale: 0.98 }}
                                    >
                                        {t("resetChecklist")}
                                    </motion.button>
                                </div>
                                <div className="h-[2px] w-full overflow-hidden bg-[#1C1713]/10" aria-hidden>
                                    <motion.div
                                        className="h-full bg-[#AA7D69]"
                                        initial={false}
                                        animate={{ width: `${checklistProgressPct}%` }}
                                        transition={shouldReduce ? { duration: 0.15 } : smooth}
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
                                        initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                                        whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={
                                            shouldReduce
                                                ? undefined
                                                : { delay: 0.04 * i, duration: 0.62, ease: EASE_OUT_CUBIC }
                                        }
                                    >
                                        <label className="flex cursor-pointer gap-3 border border-[#AA7D69]/14 bg-[#FFF9F2]/62 p-4 transition-colors hover:border-[#AA7D69]/35 hover:bg-[#FFF9F2] md:p-5">
                                            <input
                                                type="checkbox"
                                                className="mt-1 h-4 w-4 shrink-0 cursor-pointer border-[#AA7D69]/45 text-[#AA7D69] focus:ring-[#AA7D69]/30"
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
                                                    "text-[#1C1713]/86",
                                                    isOn && "text-[#1C1713]/45 line-through decoration-[#AA7D69]/45",
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
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#AA7D69]">
                            {t("onThisPage")}
                        </p>
                        <ul className="space-y-1">
                            {navItems.map(({ key, label }) => {
                                const isActive = activeSection === key;
                                return (
                                    <li key={key}>
                                        <a
                                            href={`#${SECTION_IDS[key]}`}
                                            className={cn(
                                                "block border-l-2 py-1.5 pl-3 text-sm transition-colors",
                                                isActive
                                                    ? "border-[#AA7D69] font-bold text-[#1C1713]"
                                                    : "border-transparent text-[#1C1713]/45 hover:border-[#AA7D69]/25 hover:text-[#1C1713]/80",
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
