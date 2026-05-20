"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type ExclusivityItem = {
    id: string;
    title: string;
    imageSrc?: string; // optional for now; you can add later
};

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
        <div className="relative overflow-hidden bg-[#EFE6DC] aspect-[9/7]">
            <motion.div
                className="absolute left-0 right-0 h-[145%] w-full -top-[22.5%]"
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
    const hasVisited = useHasVisited();
    const reduceMotion = useReducedMotion();
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

    const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-11%"]);
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
                behavior: reduceMotion ? "auto" : "smooth",
            });
        },
        [reduceMotion],
    );

    return (
        <section ref={sectionRef} className="overflow-visible bg-[#F6F0E8]">
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 py-12 lg:py-16">
                <motion.div
                    initial={hasVisited ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {tt("kicker")}
                    </p>
                    <h2
                        className="text-[#222] leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        {tt("title1")}
                    </h2>
                    <h2
                        className="text-[#AA7D69]/90 italic"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        {tt("title2")}
                    </h2>
                </motion.div>

                <div className="relative mt-8 group/carousel">
                    <div className="absolute -top-5 -right-4 md:-right-6 lg:-right-8 z-[3] h-[3px] w-28 overflow-hidden">
                        <div className="h-full w-full bg-[#222222]/15" />
                        <div
                            className="absolute left-0 top-0 h-full bg-[#222222]/60 transition-[width] duration-200"
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
                            "absolute left-0 md:-left-2 lg:-left-4 top-[calc(50%_-_0.75rem)] z-[3] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#222222]/15 bg-[#F6F0E8]/85 text-[#222222]/70 shadow-sm backdrop-blur transition-all duration-200",
                            canScrollLeft
                                ? "opacity-100 hover:text-[#222222] lg:opacity-0 lg:group-hover/carousel:opacity-100 lg:focus-visible:opacity-100"
                                : "pointer-events-none opacity-0 invisible",
                        ].join(" ")}
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        aria-label={tt("carouselNextAria")}
                        aria-hidden={!canScrollRight}
                        onClick={() => scrollCarousel("right")}
                        disabled={!canScrollRight}
                        className={[
                            "absolute right-0 md:-right-2 lg:-right-4 top-[calc(50%_-_0.75rem)] z-[3] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#222222]/15 bg-[#F6F0E8]/85 text-[#222222]/70 shadow-sm backdrop-blur transition-all duration-200",
                            canScrollRight
                                ? "opacity-100 hover:text-[#222222] lg:opacity-0 lg:group-hover/carousel:opacity-100 lg:focus-visible:opacity-100"
                                : "pointer-events-none opacity-0 invisible",
                        ].join(" ")}
                    >
                        <ArrowRightIcon className="h-4 w-4" />
                    </button>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        ref={scrollerRef}
                        className={[
                            "relative flex gap-0 overflow-x-auto pb-5",
                            "-mx-6 md:-mx-10 lg:-mx-16",
                            "pl-3 md:pl-5 lg:pl-8 pr-6 md:pr-8",
                            "scrollbar-none snap-x snap-mandatory",
                            "select-none",
                        ].join(" ")}
                        style={{
                            WebkitOverflowScrolling: "touch",
                            scrollbarWidth: "none",
                        }}
                    >
                        {/* <div
                            aria-hidden="true"
                            className="shrink-0 snap-start border border-[#222222]/[0.08] bg-transparent p-4"
                            style={{ width: "56px" }}
                        >
                            <div className="aspect-[3/4]" />
                            <div className="h-12" />
                        </div> */}

                        {items.map((item, idx) => (
                            <div
                                key={item.id}
                                className={[
                                    "min-w-[300px] sm:min-w-[360px] lg:min-w-[490px] snap-start border border-[#222222]/[0.08] bg-transparent p-4 -ml-px",
                                    idx === 0 ? "z-[1]" : "",
                                ].join(" ")}
                            >
                                {item.imageSrc ? (
                                    <ParallaxCardImage
                                        imageSrc={item.imageSrc}
                                        title={item.title}
                                        y={imageParallaxY}
                                        reduceMotion={!!reduceMotion}
                                    />
                                ) : (
                                    <div className="relative overflow-hidden bg-[#EFE6DC] aspect-[7/8]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#E7DCCE] via-[#EFE6DC] to-[#E1D4C5]" />
                                    </div>
                                )}

                                <div className="pt-4 flex items-center justify-between gap-4">
                                    <div
                                        className="text-xl lg:text-2xl text-[#222222]/70"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {item.title}
                                    </div>

                                    {/* <button
                                        type="button"
                                        aria-label={`Abrir ${item.title}`}
                                        className="h-8 w-8 rounded-full border border-[#222222]/25 text-[#222222]/60 hover:text-[#222222] hover:border-[#222222]/35 transition-colors grid place-items-center"
                                    >
                                        <span className="text-[18px] leading-none">+</span>
                                    </button> */}
                                </div>
                            </div>
                        ))}

                        <div className="min-w-[70px] snap-start p-4 -ml-px flex flex-col items-center justify-center">
                            <div className="aspect-square grid place-items-center bg-[#222222] rounded-full p-2">
                                <Link
                                    aria-label={tt("nextAria")}
                                    className="w-full h-full cursor-pointer flex flex-col items-center justify-center"
                                    href="/experiencias"
                                >
                                    <span className="text-white text-2xl lg:text-3xl leading-none w-full h-full flex items-center justify-center p-2">
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </span>
                                </Link>
                            </div>
                            <div className="pt-4 h-8" />
                        </div>
                    </motion.div>
                </div>
                
                    {/* Bottom Right: Paragraph & Link */}
                    <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                        >
                            <p className="text-[#222] text-xl font-medium leading-relaxed mb-4" style={{ fontFamily: "var(--font-serif)" }}>
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
