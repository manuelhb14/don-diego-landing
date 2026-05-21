"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type ExclusivityItem = {
    id: string;
    title: string;
    imageSrc?: string; // optional for now; you can add later
};

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

function ParallaxCardImage({
    imageSrc,
    title,
    y,
    reduceMotion,
}: {
    imageSrc: string;
    title: string;
    y: MotionValue<string>;
    reduceMotion: boolean;
}) {
    return (
        <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE6DC]">
            <motion.div
                className="absolute -top-[14%] left-0 right-0 h-[128%] w-full"
                style={reduceMotion ? undefined : { y }}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-[center_58%]"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 490px"
                />
            </motion.div>
        </div>
    );
}

export default function ThingsToDo() {
    const reduceMotion = useReducedMotion();
    const shouldReduceMotion = !!reduceMotion;
    const tt = useTranslations("thingsToDo");
    const items = useMemo<ExclusivityItem[]>(
        () => [
            { id: "clubhouse", title: tt("items.clubhouse"), imageSrc: "/babylon/clubhouse.webp" },
            { id: "piscina", title: tt("items.pool"), imageSrc: "/babylon/pool.webp" },
            { id: "gimnasio", title: tt("items.gym"), imageSrc: "/babylon/gym.webp" },
            { id: "spa", title: tt("items.spa"), imageSrc: "/final/spa.jpg" },
            { id: "restaurante", title: tt("items.restaurant"), imageSrc: "/final/restaurante-3.webp" },
            { id: "padel", title: tt("items.padel"), imageSrc: "/final/padel.jpg" },
        ],
        [tt],
    );

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const updateScrollState = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const edgeTolerance = 8;
        const firstItem = el.firstElementChild as HTMLElement | null;
        const startOffset = firstItem ? firstItem.offsetLeft : 0;

        const rawMaxScroll = Math.max(el.scrollWidth - el.clientWidth, 0);
        const maxScroll = Math.max(rawMaxScroll - startOffset, 0);
        const normalizedScrollLeft = Math.max(el.scrollLeft - startOffset, 0);
        const safeScrollLeft = Math.min(normalizedScrollLeft, maxScroll);

        const hasOverflow = maxScroll > edgeTolerance;
        const isAtStart = safeScrollLeft <= edgeTolerance;
        const isAtEnd = safeScrollLeft >= maxScroll - edgeTolerance;
        let progress = 0;

        if (maxScroll > edgeTolerance * 2) {
            if (safeScrollLeft <= edgeTolerance) {
                progress = 0;
            } else if (safeScrollLeft >= maxScroll - edgeTolerance) {
                progress = 1;
            } else {
                progress = (safeScrollLeft - edgeTolerance) / (maxScroll - edgeTolerance * 2);
            }
        } else if (maxScroll > 0) {
            progress = safeScrollLeft / maxScroll;
        }

        setCanScrollLeft(hasOverflow && !isAtStart);
        setCanScrollRight(hasOverflow && !isAtEnd);
        setScrollProgress(progress);
    }, []);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const frame = window.requestAnimationFrame(updateScrollState);
        el.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);

        const resizeObserver = new ResizeObserver(updateScrollState);
        resizeObserver.observe(el);

        return () => {
            window.cancelAnimationFrame(frame);
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
            resizeObserver.disconnect();
        };
    }, [updateScrollState]);

    const scrollCarousel = useCallback(
        (direction: "left" | "right") => {
            const el = scrollerRef.current;
            if (!el) return;

            const amount = el.clientWidth * 0.72;
            el.scrollBy({
                left: direction === "left" ? -amount : amount,
                behavior: shouldReduceMotion ? "auto" : "smooth",
            });
        },
        [shouldReduceMotion],
    );
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.82,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section ref={sectionRef} className="overflow-visible bg-[#F6F0E8]">
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 py-12 lg:py-16">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition()}
                >
                    <p
                        className="mb-3 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {tt("kicker")}
                    </p>
                    <h2
                        className="max-w-full whitespace-nowrap leading-[0.95] text-[#222222]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 6vw, 6rem)",
                        }}
                    >
                        {tt("titleLead")} <em className="text-[#AA7D69]">{tt("titleAccent")}</em>
                    </h2>
                </motion.div>

                <div className="group/carousel relative mt-10 lg:mt-12">
                    <div className="absolute -top-5 right-0 z-[3] h-px w-24 overflow-hidden md:w-28">
                        <div className="h-full w-full bg-[#AA7D69]/18" />
                        <div
                            className="absolute left-0 top-0 h-full bg-[#AA7D69]/70 transition-[width] duration-200"
                            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                        />
                    </div>

                    <div
                        aria-hidden="true"
                        className={[
                            "pointer-events-none absolute inset-y-0 left-[-1.5rem] md:left-[-2.5rem] lg:left-[-4rem] z-[2] w-8 bg-gradient-to-r from-[#F6F0E8] to-transparent transition-opacity duration-300",
                            canScrollLeft ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                    />
                    <div
                        aria-hidden="true"
                        className={[
                            "pointer-events-none absolute inset-y-0 right-[-1.5rem] md:right-[-2.5rem] lg:right-[-4rem] z-[2] w-8 bg-gradient-to-l from-[#F6F0E8] to-transparent transition-opacity duration-300",
                            canScrollRight ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                    />

                    <button
                        type="button"
                        aria-label={tt("carouselPrevAria")}
                        aria-hidden={!canScrollLeft}
                        onClick={() => scrollCarousel("left")}
                        disabled={!canScrollLeft}
                        className={[
                            "absolute left-1 top-[42%] z-[3] flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/70 bg-[#16120f]/24 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 hover:bg-[#f4e6db] hover:text-[#222222] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:left-0 md:h-9 md:w-9 lg:-left-3",
                            canScrollLeft
                                ? "opacity-100 lg:pointer-events-none lg:opacity-0 lg:group-hover/carousel:pointer-events-auto lg:group-hover/carousel:opacity-100 lg:focus-visible:pointer-events-auto lg:focus-visible:opacity-100"
                                : "pointer-events-none opacity-0 invisible",
                        ].join(" ")}
                    >
                        <ChevronLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    </button>

                    <button
                        type="button"
                        aria-label={tt("carouselNextAria")}
                        aria-hidden={!canScrollRight}
                        onClick={() => scrollCarousel("right")}
                        disabled={!canScrollRight}
                        className={[
                            "absolute right-1 top-[42%] z-[3] flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/70 bg-[#16120f]/24 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 hover:bg-[#f4e6db] hover:text-[#222222] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-0 md:h-9 md:w-9 lg:-right-3",
                            canScrollRight
                                ? "opacity-100 lg:pointer-events-none lg:opacity-0 lg:group-hover/carousel:pointer-events-auto lg:group-hover/carousel:opacity-100 lg:focus-visible:pointer-events-auto lg:focus-visible:opacity-100"
                                : "pointer-events-none opacity-0 invisible",
                        ].join(" ")}
                    >
                        <ChevronRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    </button>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.16)}
                        ref={scrollerRef}
                        className={[
                            "relative flex gap-4 overflow-x-auto pb-5 md:gap-5",
                            "-mx-6 md:-mx-10 lg:-mx-16",
                            "px-6 md:px-10 lg:px-16",
                            "scrollbar-none snap-x snap-mandatory",
                            "select-none",
                        ].join(" ")}
                        style={{
                            WebkitOverflowScrolling: "touch",
                            scrollbarWidth: "none",
                        }}
                    >
                        {items.map((item, idx) => (
                            <div
                                key={item.id}
                                className={[
                                    "min-w-[280px] snap-start border-t border-[#222222]/[0.10] bg-transparent pt-4 sm:min-w-[340px] lg:min-w-[460px]",
                                    idx === 0 ? "z-[1]" : "",
                                ].join(" ")}
                            >
                                {item.imageSrc ? (
                                    <ParallaxCardImage
                                        imageSrc={item.imageSrc}
                                        title={item.title}
                                        y={imageParallaxY}
                                        reduceMotion={shouldReduceMotion}
                                    />
                                ) : (
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE6DC]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#E7DCCE] via-[#EFE6DC] to-[#E1D4C5]" />
                                    </div>
                                )}

                                <div className="flex items-center justify-between gap-4 pt-4">
                                    <div
                                        className="text-[1.35rem] leading-tight text-[#222222]/72 md:text-[1.5rem] lg:text-[1.65rem]"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex min-w-[92px] snap-start flex-col border-t border-[#AA7D69]/35 pt-4 sm:min-w-[104px] lg:min-w-[116px]">
                            <div className="h-[175px] sm:h-[212px] lg:h-[287px]">
                                <Link
                                    aria-label={tt("nextAria")}
                                    href="/experiencias"
                                    className="group/end flex h-full w-full flex-col items-center justify-center gap-3 text-center text-[#AA7D69] transition-colors duration-300 hover:text-[#8C5F4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AA7D69]"
                                >
                                    <span className="flex h-10 w-10 items-center justify-center border border-current bg-[#F6F0E8] transition-all duration-300 group-hover/end:-translate-y-0.5 group-hover/end:translate-x-0.5 group-hover/end:bg-[#AA7D69] group-hover/end:text-[#F6F0E8]">
                                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                                    </span>
                                    <span
                                        className="text-center text-[10px] font-bold uppercase tracking-[0.15em]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {tt("nextAria")}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                    {/* Bottom Right: Paragraph & Link */}
                    <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={revealTransition(0.16)}
                            className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                        >
                            <p className="mb-4 text-base font-medium leading-relaxed text-[#222222] md:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
                                {tt("body")}
                            </p>
                            <Link
                                href="/experiencias"
                                className="inline-block text-[#222] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#222] pb-1 hover:opacity-60 transition-opacity"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {tt("cta")}
                            </Link>
                        </motion.div>
                    </div>

            </div>
        </section>
    );
}
