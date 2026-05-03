"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function HighlightsWellness() {
    const t = useTranslations("pages.wellness.highlights");
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
                behavior: "smooth",
            });
        }
    };

    return (
        <section ref={containerRef} className="relative bg-[#fff8ed] pt-16 lg:pt-18 overflow-hidden pb-12 lg:pb-16">
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

            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#5a6b52]/85 uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("eyebrow")}
                        </p>
                        <h2
                            className="tracking-tight text-[#1a221f] leading-[1.1] font-medium"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.75rem, 4.75vw, 4.25rem)",
                            }}
                        >
                            {t("title.base")} <span className="italic text-[#5a6b52]">{t("title.accent")}</span>
                        </h2>
                        <p
                            className="text-[#1a221f]/78 mt-4 max-w-2xl text-lg lg:text-xl"
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
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "0px 1px 0px 1px" }}
                            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                            onClick={() => scrollTo(index)}
                            className="group relative shrink-0 w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[60vw] max-w-[1000px] aspect-[4/5] sm:aspect-[4/3] md:aspect-[1.6] lg:aspect-[1.7] overflow-hidden snap-start bg-[#1F2420] flex flex-col cursor-pointer rounded-sm"
                        >
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                {item.image ? (
                                    <>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={`object-cover group-hover:scale-105 transition-all duration-700 ease-out ${activeIndex === index ? "opacity-100" : "opacity-50 group-hover:opacity-75"
                                                }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2420] via-transparent to-transparent opacity-90" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#5a6b52]/25 via-[#1F2420] to-[#1F2420]" />
                                )}
                            </div>

                            <div className="relative z-10 mt-auto flex h-full flex-col justify-end p-7 md:p-9">
                                <h3
                                    className="text-balance text-[#d3dacd] text-3xl sm:text-4xl lg:text-5xl mb-1 lg:mb-4 max-w-lg tracking-tight"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="max-w-md text-sm lg:text-base leading-relaxed font-light text-[#E8EDE3]/88 pl-2"
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
            <div className="flex justify-center items-center">
                <div className="flex bg-[#EFE6DC]/90 rounded-full p-4 border border-[#1a221f]/10 backdrop-blur-md shadow-sm">
                    <div className="flex gap-3 items-center">
                        {highlights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`h-2 rounded-full transition-all duration-500 ease-in-out ${activeIndex === index
                                    ? "w-10 bg-[#5a6b52]"
                                    : "w-2.5 bg-[#5a6b52]/30 hover:bg-[#5a6b52]/60 hover:w-6 cursor-pointer"
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
