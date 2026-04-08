"use client";

import { motion, AnimatePresence } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useMemo, useState, useId, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

type ExperienciaItem = {
    id: string;
    title: string;
    description: string;
    imageSrc?: string;
};

function GridCardMedia({ imageSrc, title }: { imageSrc?: string; title: string }) {
    return (
        <div className="relative overflow-hidden bg-[#EFE6DC] aspect-[7/8]">
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover object-[center_58%]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
                    aria-hidden
                />
            ) : (
                <div
                    role="img"
                    aria-label={title}
                    className="absolute inset-0 bg-gradient-to-br from-[#E7DCCE] via-[#EFE6DC] to-[#E1D4C5]"
                />
            )}
        </div>
    );
}

/**
 * Vertical band in the viewport (as % of viewport height, measured from the top edge).
 * Slightly above center so panels open when the image sits a bit higher on screen.
 */
const VIEWPORT_TRIGGER_BAND_TOP_PCT = 22;
const VIEWPORT_TRIGGER_BAND_BOTTOM_PCT = 56;

function getGridColumnCount(): number {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
}

/** Tailwind `sm` breakpoint: mobile = below 640px */
const MOBILE_MQ = "(max-width: 639px)";

function allItemIds(items: ExperienciaItem[]): Set<string> {
    return new Set(items.map((i) => i.id));
}

const ITEM_DEFS = [
    { id: "clubhouse", imageSrc: "/babylon/clubhouse.webp" },
    { id: "piscina", imageSrc: "/babylon/pool.webp" },
    { id: "gimnasio", imageSrc: "/babylon/gym.webp" },
    { id: "spa", imageSrc: "/babylon/spa.webp" },
    { id: "restaurante", imageSrc: "/final/restaurante-3.webp" },
    { id: "padel", imageSrc: "/babylon/padel.webp" },
    { id: "parquesInfantiles", imageSrc: "/babylon/presa-9.webp" },
    { id: "clubNautico", imageSrc: "/babylon/presa-10.webp" },
    { id: "localesComerciales", imageSrc: "/babylon/presa-7.webp" },
    { id: "anfiteatro", imageSrc: "/babylon/presa-11.webp" },
    { id: "gastronomiaLacustre", imageSrc: "/babylon/presa-5.webp" },
    { id: "coworking", imageSrc: "/babylon/coworking.webp" },
    { id: "barrasCafe", imageSrc: "/babylon/coffee-bar.webp" },
    { id: "salonYoga", imageSrc: "/babylon/yoga.webp" },
    { id: "jacuzzis", imageSrc: "/babylon/jacuzzi.webp" },
    { id: "shuttles", imageSrc: "/babylon/shuttle-2.webp" },
    { id: "paseosHuertos", imageSrc: "/babylon/huerto.webp" },
    { id: "cicloruta", imageSrc: "/babylon/farm-3.webp" },
    { id: "invernaderos", imageSrc: "/babylon/farm-5.webp" },
    { id: "programasEducativos", imageSrc: "/babylon/farm-7.webp" },
    { id: "floresTemporada", imageSrc: "/babylon/flowers.webp" },
    { id: "rehabilitacion", imageSrc: "/babylon/wellness-5.webp" },
    { id: "seniorLiving", imageSrc: "/babylon/wellness-6.webp" },
    { id: "hospedajeFamiliar", imageSrc: "/babylon/wellness-7.webp" },
    { id: "jardinesTerapeuticos", imageSrc: "/babylon/wellness-8.webp" },
    { id: "beachClub", imageSrc: "/babylon/presa-4.webp" },
    { id: "wifiAreasComunes", imageSrc: "/babylon/wifi.webp" },
] as const;

export default function ExperienciasListing() {
    const t = useTranslations("pages.experiencias.listing");
    const hasVisited = useHasVisited();
    const baseId = useId();
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());
    const [isMobile, setIsMobile] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    /** Mobile: how “centered” the active card is in the viewport band (0–1), drives border/shadow strength while scrolling. */
    const [mobileFocusStrength, setMobileFocusStrength] = useState(0);
    const columnCountRef = useRef(getGridColumnCount());
    /** Measure only image + title row — excludes expanding panel so height doesn’t feed back into scroll scoring. */
    const anchorRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
    const scrollSyncPausedUntilRef = useRef(0);
    const scrollTickingRef = useRef(false);
    const skipLayoutPauseRef = useRef(true);

    /** Desktop/tablet: reset row-open state when column count changes. Mobile handled by matchMedia effect. */
    useEffect(() => {
        const onResize = () => {
            if (typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches) return;
            const c = getGridColumnCount();
            if (c !== columnCountRef.current) {
                columnCountRef.current = c;
                setOpenIds(new Set());
            }
        };
        columnCountRef.current = getGridColumnCount();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const items = useMemo<ExperienciaItem[]>(
        () =>
            ITEM_DEFS.map((item) => ({
                id: item.id,
                imageSrc: item.imageSrc,
                title: t(`items.${item.id}.title`),
                description: t(`items.${item.id}.description`),
            })),
        [t],
    );

    /** Mobile: keep all descriptions open; leaving mobile clears row state for scroll sync. useLayoutEffect avoids one paint of wrong (collapsed) state. */
    useLayoutEffect(() => {
        const mq = window.matchMedia(MOBILE_MQ);
        const syncMobileLayout = () => {
            const mobile = mq.matches;
            setIsMobile(mobile);
            columnCountRef.current = getGridColumnCount();
            if (mobile) {
                setOpenIds(allItemIds(items));
            } else {
                setActiveId(null);
                setMobileFocusStrength(0);
                setOpenIds(new Set());
            }
        };
        syncMobileLayout();
        mq.addEventListener("change", syncMobileLayout);
        return () => mq.removeEventListener("change", syncMobileLayout);
    }, [items]);

    const getRowItemIds = useCallback(
        (itemId: string): string[] => {
            const cols = columnCountRef.current;
            const idx = items.findIndex((i) => i.id === itemId);
            if (idx === -1) return [itemId];
            const rowStart = Math.floor(idx / cols) * cols;
            return items.slice(rowStart, rowStart + cols).map((i) => i.id);
        },
        [items],
    );

    const updateOpenRowsFromScroll = useCallback(() => {
        if (typeof window === "undefined") return;
        if (Date.now() < scrollSyncPausedUntilRef.current) return;

        const vh = window.innerHeight;
        const bandTop = vh * (VIEWPORT_TRIGGER_BAND_TOP_PCT / 100);
        const bandBottom = vh * (VIEWPORT_TRIGGER_BAND_BOTTOM_PCT / 100);
        const bandCenterY = (bandTop + bandBottom) / 2;

        let winner: { id: string; score: number } | null = null;

        for (const item of items) {
            const el = anchorRefs.current.get(item.id);
            if (!el) continue;
            const r = el.getBoundingClientRect();
            const overlapTop = Math.max(r.top, bandTop);
            const overlapBottom = Math.min(r.bottom, bandBottom);
            const overlap = overlapBottom - overlapTop;
            if (overlap <= 0) continue;

            const cardCenterY = r.top + r.height / 2;
            const score = overlap * 1000 - Math.abs(cardCenterY - bandCenterY);

            if (!winner || score > winner.score) {
                winner = { id: item.id, score };
            }
        }

        if (typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches) {
            const nextActive = winner?.id ?? null;
            let nextStrength = 0;
            if (winner) {
                const el = anchorRefs.current.get(winner.id);
                if (el) {
                    const r = el.getBoundingClientRect();
                    const overlapTop = Math.max(r.top, bandTop);
                    const overlapBottom = Math.min(r.bottom, bandBottom);
                    const overlap = Math.max(0, overlapBottom - overlapTop);
                    const bandH = bandBottom - bandTop;
                    const overlapT =
                        bandH > 0 ? Math.min(1, overlap / Math.min(Math.max(r.height, 1), bandH)) : 0;
                    const cardCenterY = r.top + r.height / 2;
                    const dist = Math.abs(cardCenterY - bandCenterY);
                    const falloff = vh * 0.32;
                    const centerT = falloff > 0 ? Math.max(0, 1 - dist / falloff) : 0;
                    nextStrength = Math.max(0, Math.min(1, overlapT * 0.45 + centerT * 0.55));
                }
            }
            setActiveId((prev) => (prev === nextActive ? prev : nextActive));
            setMobileFocusStrength((prev) =>
                Math.abs(prev - nextStrength) < 0.02 ? prev : nextStrength,
            );
            return;
        }

        const nextIds = winner === null ? new Set<string>() : new Set(getRowItemIds(winner.id));
        setOpenIds((prev) => {
            if (prev.size === nextIds.size && [...prev].every((id) => nextIds.has(id))) return prev;
            return nextIds;
        });
    }, [items, getRowItemIds]);

    /** After any open state commit, briefly ignore scroll so browser scroll-anchoring / layout doesn’t re-enter the scorer. (Desktop row expand/collapse only.) */
    useLayoutEffect(() => {
        if (typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches) return;
        if (skipLayoutPauseRef.current) {
            skipLayoutPauseRef.current = false;
            return;
        }
        scrollSyncPausedUntilRef.current = Date.now() + 240;
    }, [openIds]);

    useEffect(() => {
        const onScrollOrResize = () => {
            if (scrollTickingRef.current) return;
            scrollTickingRef.current = true;
            requestAnimationFrame(() => {
                scrollTickingRef.current = false;
                updateOpenRowsFromScroll();
            });
        };

        requestAnimationFrame(() => {
            updateOpenRowsFromScroll();
        });
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [updateOpenRowsFromScroll]);

    return (
        <section className="overflow-visible bg-[#fff8ed]">
            <div className="mx-auto w-full max-w-[min(100%,1920px)] px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-12 lg:pt-0 lg:pb-16">
                {/* <motion.div
                    initial={hasVisited ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Experiencias]
                    </p>
                    <h2
                        className="text-[#222] leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        Actividades para disfrutar
                    </h2>
                    <h2
                        className="text-[#AA7D69]/90 italic"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        dentro de Don Diego
                    </h2>
                </motion.div> */}

                <motion.div
                    initial={hasVisited ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.05 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-px bg-[#222222]/[0.08] border border-[#222222]/[0.08]"
                    style={{ overflowAnchor: "none" }}
                >
                    {items.map((item) => {
                        const isOpen = openIds.has(item.id);
                        const panelId = `${baseId}-${item.id}-panel`;
                        const isFocusedMobile = isMobile && activeId === item.id;
                        const isDimmedMobile = isMobile && activeId !== null && activeId !== item.id;

                        return (
                            <motion.div
                                key={item.id}
                                className={[
                                    "bg-[#F6F0E8] p-2.5 sm:p-3 md:p-3.5 lg:p-4 flex flex-col min-w-0 w-full relative",
                                    isFocusedMobile ? "z-[2]" : isMobile ? "z-0" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                animate={
                                    isMobile
                                        ? { opacity: isDimmedMobile ? 0.9 : 1 }
                                        : { opacity: 1 }
                                }
                                transition={{
                                    opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                                }}
                            >
                                {isMobile && (
                                    <motion.div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 z-[1]"
                                        initial={false}
                                        style={{
                                            boxShadow:
                                                "inset 0 0 0 1px rgba(170, 125, 105, 0.2), 0 12px 36px rgba(34, 34, 34, 0.06)",
                                        }}
                                        animate={{
                                            opacity: isFocusedMobile ? mobileFocusStrength : 0,
                                            scale: isFocusedMobile ? 1 : 0.992,
                                        }}
                                        transition={{
                                            opacity: {
                                                type: "spring",
                                                stiffness: 220,
                                                damping: 26,
                                                mass: 0.55,
                                            },
                                            scale: {
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 32,
                                            },
                                        }}
                                    />
                                )}
                                <div
                                    ref={(el) => {
                                        if (el) anchorRefs.current.set(item.id, el);
                                        else anchorRefs.current.delete(item.id);
                                    }}
                                    className="w-full flex flex-col min-w-0 shrink-0"
                                >
                                    <GridCardMedia imageSrc={item.imageSrc} title={item.title} />

                                    <div className="pt-3 flex items-center justify-between gap-2 min-w-0">
                                        <p
                                            id={`${baseId}-${item.id}-title`}
                                            className="text-base md:text-[17px] lg:text-2xl text-[#222222]/85 leading-snug flex-1 min-w-0"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {item.title}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (isMobile) return;
                                                scrollSyncPausedUntilRef.current = Date.now() + 900;
                                                const rowIds = getRowItemIds(item.id);
                                                setOpenIds((prev) => {
                                                    if (prev.has(item.id)) {
                                                        const next = new Set(prev);
                                                        for (const id of rowIds) next.delete(id);
                                                        return next;
                                                    }
                                                    return new Set(rowIds);
                                                });
                                            }}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            aria-label={
                                                isOpen
                                                    ? t("toggle.closeAriaLabel", { title: item.title })
                                                    : t("toggle.openAriaLabel", { title: item.title })
                                            }
                                            className={[
                                                "hidden sm:flex shrink-0 mt-px h-7 w-7 items-center justify-center rounded-full",
                                                "bg-[#111111] text-white shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]",
                                                "transition-[transform,background-color,box-shadow] duration-200",
                                                "hover:bg-black hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]",
                                                "active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F0E8]",
                                            ].join(" ")}
                                        >
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                className="flex items-center justify-center"
                                                aria-hidden
                                            >
                                                <Plus className="h-3 w-3" strokeWidth={2.5} />
                                            </motion.span>
                                        </button>
                                    </div>
                                </div>

                                {isMobile ? (
                                    <div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={`${baseId}-${item.id}-title`}
                                    >
                                        <p
                                            className="pt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#222]/72 border-t border-[#222222]/[0.08] mt-2.5"
                                            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                ) : (
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={panelId}
                                                role="region"
                                                aria-labelledby={`${baseId}-${item.id}-title`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{
                                                    height: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    opacity: { duration: 0.22 },
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p
                                                    className="pt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#222]/72 border-t border-[#222222]/[0.08] mt-2.5"
                                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                                >
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                    >
                        <p
                            className="text-[#222] text-xl font-medium leading-relaxed mb-4"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("footerText")}
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-block text-[#222] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#222] pb-1 hover:opacity-60 transition-opacity"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("cta")}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
