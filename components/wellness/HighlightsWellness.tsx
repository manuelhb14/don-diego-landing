"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function HighlightsWellness() {
    const t = useTranslations("pages.wellness.highlights");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const highlights = [
        {
            id: 1,
            title: t("items.naturaleza.title"),
            description: t("items.naturaleza.description"),
            image: "/babylon/wellness-1.webp",
        },
        {
            id: 2,
            title: t("items.atencion.title"),
            description: t("items.atencion.description"),
            image: "/babylon/wellness-2.webp",
        },
        {
            id: 3,
            title: t("items.comunidad.title"),
            description: t("items.comunidad.description"),
            image: "/babylon/wellness-3.webp",
        },
        {
            id: 4,
            title: t("items.ubicacion.title"),
            description: t("items.ubicacion.description"),
            image: "/babylon/wellness-4.webp",
        },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollContainer = scrollRef.current;
        const scrollPosition = scrollContainer.scrollLeft;
        const leadingPadding = parseFloat(getComputedStyle(scrollContainer).paddingLeft) || 0;
        const alignedEdge = scrollPosition + leadingPadding;

        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(scrollContainer.children).forEach((child, index) => {
            const childElement = child as HTMLElement;
            if (!childElement.classList.contains("group")) return;

            const distance = Math.abs(alignedEdge - childElement.offsetLeft);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex < highlights.length) {
            setActiveIndex(closestIndex);
        }
    };

    const scrollTo = (index: number) => {
        if (!scrollRef.current) return;
        const scrollContainer = scrollRef.current;
        // The first 4 children are the cards, assuming they are direct children
        const card = scrollContainer.children[index] as HTMLElement;
        if (card) {
            const leadingPadding = parseFloat(getComputedStyle(scrollContainer).paddingLeft) || 0;
            const scrollLeftPos = card.offsetLeft - leadingPadding;
            scrollContainer.scrollTo({
                left: scrollLeftPos,
                behavior: shouldReduceMotion ? "auto" : "smooth",
            });
        }
    };

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-[#fff8ed] py-12 lg:py-20">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                .wellness-highlights-scroll {
                    --wellness-carousel-gutter: max(1.5rem, calc((100vw - 1600px) / 2 + 1.5rem));
                    padding-left: var(--wellness-carousel-gutter);
                    padding-right: var(--wellness-carousel-gutter);
                    scroll-padding-left: var(--wellness-carousel-gutter);
                }

                @media (min-width: 1024px) {
                    .wellness-highlights-scroll {
                        --wellness-carousel-gutter: max(4rem, calc((100vw - 1600px) / 2 + 4rem));
                    }
                }
            `}</style>

            <div className="mx-auto mb-8 max-w-[1600px] px-6 lg:mb-12 lg:px-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition()}
                    >
                        <p
                            className="mb-4 text-xs tracking-[0.3em] text-[#5A6B52] uppercase lg:mb-7"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("eyebrow")}
                        </p>
                        <h2
                            className="leading-[1.02] tracking-normal text-[#1a221f]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.75rem, 5vw, 4.75rem)",
                            }}
                        >
                            {t("title.base")} <span className="italic text-[#5a6b52]">{t("title.accent")}</span>
                        </h2>
                        <p
                            className="mt-5 max-w-[34rem] text-base leading-relaxed text-[#1a221f]/78 md:text-lg"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("intro")}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="wellness-highlights-scroll flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 lg:gap-8 pb-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 1px 0px 1px" }}
                            transition={revealTransition(index * 0.06)}
                            onClick={() => scrollTo(index)}
                            className="group relative flex aspect-[5/4] w-[78vw] max-w-[900px] shrink-0 snap-start cursor-pointer flex-col overflow-hidden rounded-sm bg-[#1F2420] sm:aspect-[16/10] sm:w-[68vw] md:aspect-[16/9] md:w-[54vw] lg:w-[52vw]"
                        >
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                {item.image ? (
                                    <>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${activeIndex === index ? "opacity-100" : "opacity-80 group-hover:opacity-95"
                                                }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2420]/78 via-[#1F2420]/10 to-transparent" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#5a6b52]/25 via-[#1F2420] to-[#1F2420]" />
                                )}
                            </div>

                            <div className="relative z-10 mt-auto flex h-full flex-col justify-end p-6 md:p-8">
                                <h3
                                    className="mb-2 max-w-lg text-balance text-3xl tracking-normal text-[#E8EDE3] sm:text-4xl lg:mb-4 lg:text-[2.65rem]"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="max-w-md text-sm leading-relaxed text-[#F6F0E8]/86 lg:text-base"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {/* Spacer to allow the final card to align to the text edge. */}
                    <div className="shrink-0 w-[1px] md:w-[10vw] hidden md:block" />
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center">
                <div className="border-t border-[#5A6B52]/16 pt-4">
                    <div className="flex items-center gap-3">
                        {highlights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`h-2 transition-all duration-500 ease-in-out ${activeIndex === index
                                    ? "w-10 bg-[#5a6b52]"
                                    : "w-2.5 cursor-pointer bg-[#5a6b52]/30 hover:w-6 hover:bg-[#5a6b52]/60"
                                    }`}
                                aria-label={t("paginationAriaLabel", { index: index + 1 })}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
