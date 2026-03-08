"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

const highlights = [
    {
        id: 1,
        title: "Naturaleza y tranquilidad",
        description: "Un entorno de paz donde los jardines, el agua y el paisaje de la Presa Allende crean el ambiente ideal para la recuperación y el bienestar.",
        image: "/images/gallery/gallery-15.jpg",
    },
    {
        id: 2,
        title: "Atención personalizada",
        description: "Equipos médicos especializados y cuidados certificados que entienden que cada persona tiene necesidades únicas.",
        image: "/images/gallery/gallery-11.jpg",
    },
    {
        id: 3,
        title: "Vida en comunidad",
        description: "Espacios diseñados para la convivencia, actividades compartidas y la construcción de vínculos significativos.",
        image: "/images/gallery/gallery-12.jpg",
    },
    {
        id: 4,
        title: "Ubicación privilegiada",
        description: "A minutos de San Miguel de Allende, con acceso inmediato a servicios médicos, culturales y de ocio de primer nivel.",
        image: "/images/gallery/gallery-13.jpg",
    },
];

export default function HighlightsWellness() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollContainer = scrollRef.current;
        const scrollPosition = scrollContainer.scrollLeft;

        // Find the index of the child that is closest to the center
        const containerCenter = scrollPosition + scrollContainer.clientWidth / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(scrollContainer.children).forEach((child, index) => {
            const childElement = child as HTMLElement;
            // Skip non-card elements if any (like empty spacer). Cards have class group.
            if (!childElement.classList.contains('group')) return;

            const childCenter = childElement.offsetLeft + childElement.clientWidth / 2;
            const distance = Math.abs(containerCenter - childCenter);
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
            // Scroll to center the card
            const scrollLeftPos = card.offsetLeft - (scrollContainer.clientWidth / 2) + (card.clientWidth / 2);
            scrollContainer.scrollTo({
                left: scrollLeftPos,
                behavior: "smooth",
            });
        }
    };

    return (
        <section ref={containerRef} className="relative bg-[#1F1D1B] pt-24 lg:pt-24 overflow-hidden">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
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
                            className="text-[10px] tracking-[0.3em] text-[#D7D7AA] uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [Nuestra filosofía]
                        </p>
                        <h2
                            className="text-[#D7D7AA] leading-tight font-medium"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                            }}
                        >
                            Bienestar integral
                        </h2>
                        <p
                            className="text-[#FFF3E1] mt-4 max-w-2xl text-lg lg:text-xl"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            La calidad de vida se construye con calma, naturaleza, comunidad y atención real.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 lg:px-16 gap-6 lg:gap-8 pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            onClick={() => scrollTo(index)}
                            className="group relative shrink-0 w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[60vw] max-w-[1000px] aspect-[4/5] sm:aspect-[4/3] md:aspect-[1.6] lg:aspect-[1.7] overflow-hidden snap-center bg-[#11100F] border border-white/5 flex flex-col cursor-pointer rounded-md"
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
                                        <div className="absolute inset-0 bg-gradient-to-t  from-[#11100F]/30 via-[#11100F]/10 to-transparent" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#DEBEBF]/30 via-[#11100F] to-[#11100F]" />
                                )}
                            </div>

                            <div className="relative z-10 p-8 sm:p-10 lg:p-8 flex flex-col items-start justify-end h-full">
                                <h3
                                    className="text-[#D7D7AA] text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-sm tracking-tight"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-[#FFF3E1] text-base max-w-md leading-relaxed pl-2"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {/* Spacer to allow full scroll to the end so final card can center easily */}
                    <div className="shrink-0 w-[1px] md:w-[10vw] hidden md:block" />
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center">
                <div className="flex bg-[#23211F]/80 rounded-full p-4 border border-white/5 backdrop-blur-md">
                    <div className="flex gap-3 items-center">
                        {highlights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`h-2 rounded-full transition-all duration-500 ease-in-out ${activeIndex === index
                                    ? "w-10 bg-[#D7D7AA]"
                                    : "w-2.5 bg-[#D7D7AA]/30 hover:bg-[#D7D7AA]/60 hover:w-6 cursor-pointer"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}