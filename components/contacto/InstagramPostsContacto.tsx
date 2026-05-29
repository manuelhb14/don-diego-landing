"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Instagram, Heart, MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/dondiegosma/";
const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const posts = [
    {
        key: "farm",
        image: "/babylon/organic-farm.webp",
        accent: "#6F8A55",
    },
    {
        key: "wellness",
        image: "/babylon/wellness-center.webp",
        accent: "#AA7D69",
    },
    {
        key: "presa",
        image: "/babylon/presa-de-la-cantera.webp",
        accent: "#547A86",
    },
    {
        key: "residencial",
        image: "/babylon/club-residencial.webp",
        accent: "#8C7B6C",
    },
] as const;

export default function InstagramPostsContacto() {
    const t = useTranslations("pages.contacto.instagram");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const edgeTolerance = 8;
        const maxScroll = Math.max(el.scrollWidth - el.clientWidth, 0);
        const safeScrollLeft = Math.min(Math.max(el.scrollLeft, 0), maxScroll);
        const hasOverflow = maxScroll > edgeTolerance;

        setCanScrollLeft(hasOverflow && safeScrollLeft > edgeTolerance);
        setCanScrollRight(hasOverflow && safeScrollLeft < maxScroll - edgeTolerance);
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

            const leadingPadding = parseFloat(getComputedStyle(el).paddingLeft) || 0;
            const maxScroll = Math.max(el.scrollWidth - el.clientWidth, 0);
            const scrollTargets = Array.from(el.children)
                .map((child) => {
                    if (!(child instanceof HTMLElement)) return null;
                    return Math.min(Math.max(child.offsetLeft - leadingPadding, 0), maxScroll);
                })
                .filter((target): target is number => target !== null);

            const edgeTolerance = 8;
            const currentScroll = el.scrollLeft;
            let target: number | undefined;

            if (direction === "right") {
                target = scrollTargets.find((position) => position > currentScroll + edgeTolerance);
            } else {
                for (let i = scrollTargets.length - 1; i >= 0; i -= 1) {
                    if (scrollTargets[i] < currentScroll - edgeTolerance) {
                        target = scrollTargets[i];
                        break;
                    }
                }
            }

            if (target === undefined) return;

            el.scrollTo({
                left: target,
                behavior: shouldReduceMotion ? "auto" : "smooth",
            });
        },
        [shouldReduceMotion],
    );

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section className="border-t border-[#1C1713]/10 bg-[#F6F0E8] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
            <div className="mx-auto w-full max-w-[1440px]">
                <motion.div
                    className="mb-8 md:mb-10"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={revealTransition()}
                >
                    <div className="max-w-full">
                        <p
                            className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#AA7D69]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="max-w-full overflow-hidden whitespace-nowrap leading-none text-[#1C1713]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.85rem, 8.2vw, 6rem)",
                            }}
                        >
                            {t("titleLine1")} <em className="text-[#AA7D69]">{t("titleLine2")}</em>
                        </h2>
                    </div>
                </motion.div>

                <motion.div
                    ref={scrollerRef}
                    className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 scroll-px-6 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:scroll-px-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={`${t("titleLine1")} ${t("titleLine2")}`}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.06,
                            },
                        },
                    }}
                >
                    {posts.map((post) => (
                        <motion.article
                            key={post.key}
                            className="w-[82vw] max-w-[380px] shrink-0 snap-start snap-always overflow-hidden border border-[#1C1713]/10 bg-[#FFF9F2] sm:w-[56vw] sm:max-w-[420px] md:w-auto md:max-w-none md:shrink"
                            variants={{
                                hidden: { opacity: 0, y: 24 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={revealTransition()}
                        >
                            <div className="flex items-center gap-3 border-b border-[#1C1713]/10 px-4 py-3">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#F6F0E8]"
                                    style={{ borderColor: `${post.accent}55`, color: post.accent }}
                                >
                                    <Instagram className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p
                                        className="truncate text-sm font-bold text-[#1C1713]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        @dondiegosma
                                    </p>
                                    <p
                                        className="truncate text-[10px] uppercase tracking-[0.16em] text-[#1C1713]/45"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {t(`posts.${post.key}.label`)}
                                    </p>
                                </div>
                            </div>

                            <div className="relative aspect-square overflow-hidden bg-[#E8D9C8]">
                                <Image
                                    src={post.image}
                                    alt={t(`posts.${post.key}.alt`)}
                                    fill
                                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 82vw"
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            <div className="space-y-4 px-4 py-4">
                                <div className="flex items-center text-[#1C1713]/55">
                                    <div className="flex items-center gap-3">
                                        <Heart className="h-4 w-4" strokeWidth={1.7} />
                                        <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                                        <Send className="h-4 w-4" strokeWidth={1.7} />
                                    </div>
                                </div>

                                <p
                                    className="text-sm leading-relaxed text-[#1C1713]/80"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    <span className="font-bold text-[#1C1713]">@dondiegosma</span>{" "}
                                    {t(`posts.${post.key}.caption`)}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                <div className="mt-1 flex items-center gap-2 md:hidden">
                    <button
                        type="button"
                        aria-label={t("carouselPrevAria")}
                        onClick={() => scrollCarousel("left")}
                        disabled={!canScrollLeft}
                        className="grid h-10 w-10 place-items-center border border-[#AA7D69]/24 bg-[#FFF9F2] text-[#8C5F4D] transition-colors duration-200 hover:border-[#AA7D69]/45 hover:bg-[#F4E6DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA7D69]/35 disabled:pointer-events-none disabled:opacity-40"
                    >
                        <ChevronLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        aria-label={t("carouselNextAria")}
                        onClick={() => scrollCarousel("right")}
                        disabled={!canScrollRight}
                        className="grid h-10 w-10 place-items-center border border-[#AA7D69]/24 bg-[#FFF9F2] text-[#8C5F4D] transition-colors duration-200 hover:border-[#AA7D69]/45 hover:bg-[#F4E6DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA7D69]/35 disabled:pointer-events-none disabled:opacity-40"
                    >
                        <ChevronRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </button>
                </div>

                <motion.div
                    className="mt-8 flex justify-center md:mt-10 md:justify-end"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={revealTransition(0.16)}
                >
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border-b border-[#222222] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#222222] transition-opacity hover:opacity-60 lg:text-[11px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("cta")}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
