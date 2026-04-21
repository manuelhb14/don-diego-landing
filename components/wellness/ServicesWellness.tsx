"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ServicesWellness() {
    const t = useTranslations("pages.wellness.services");
    const services = [
        {
            id: 1,
            title: t("items.rehabilitacion.title"),
            description: t("items.rehabilitacion.description"),
            image: "/babylon/wellness-5.webp",
        },
        {
            id: 2,
            title: t("items.seniorLiving.title"),
            description: t("items.seniorLiving.description"),
            image: "/babylon/wellness-6.webp",
        },
        {
            id: 3,
            title: t("items.departamentosFamiliares.title"),
            description: t("items.departamentosFamiliares.description"),
            image: "/babylon/wellness-7.webp",
        },
        {
            id: 4,
            title: t("items.amenidades.title"),
            description: t("items.amenidades.description"),
            image: "/babylon/wellness-8.webp",
        },
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="servicios" className="bg-[#EFE6DC] py-24 lg:py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 lg:mb-12"
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
                </motion.div>

                {/* Interactive Container */}
                <div className="relative w-full min-h-[600px] md:min-h-0 md:aspect-[4/3] lg:aspect-[2] rounded-sm overflow-hidden bg-[#1F2420] flex items-center border border-white/5">

                    {/* Background Images */}
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={activeIndex !== null ? activeIndex : "default"}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 z-0 bg-[#1F2420]"
                        >
                            <Image
                                src={activeIndex !== null ? services[activeIndex].image : "/images/gallery/gallery-9.jpg"}
                                alt={t("backgroundAlt")}
                                fill
                                priority
                                className="object-cover opacity-80"
                            />
                            {/* Dark gradient for text readability */}
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent w-full md:w-3/4" /> */}
                            {/* Bottom gradient for mobile text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Content Column (Pills) */}
                    <div className="relative z-10 flex flex-col items-start gap-3 md:gap-4 p-6 sm:p-8 md:p-12 lg:p-16 w-full md:w-[65%] lg:w-[50%] justify-end md:justify-center h-full mt-24 md:mt-0">
                        {services.map((service, index) => {
                            const isActive = activeIndex === index;

                            // Slower spring for an elegant, deliberate pill expansion
                            const springTransition = { type: "spring" as const, duration: 0.6, bounce: 0 };

                            return (
                                <motion.div
                                    layout
                                    key={`pill-${service.id}`}
                                    onClick={() => setActiveIndex(isActive ? null : index)}
                                    className={`relative z-10 cursor-pointer overflow-hidden backdrop-blur-xl border border-white/10 transition-colors duration-[150ms] ease-out ${isActive
                                            ? "bg-[#2A302C]/80 rounded-[28px] w-full"
                                            : "bg-[#2A302C]/50 hover:bg-[#2A302C]/70 rounded-full w-auto"
                                        }`}
                                    style={{
                                        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
                                    }}
                                    transition={springTransition}
                                >
                                    <div className={`flex items-start ${isActive ? 'p-5 lg:p-6 gap-4 lg:gap-5' : 'py-2.5 px-4 lg:px-5 gap-3'}`}>

                                        {/* Icon */}
                                        <div className="relative shrink-0 rounded-full border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-300 w-6 h-6 mt-0.5 bg-white/10">
                                            <AnimatePresence mode="popLayout" initial={false}>
                                                {isActive ? (
                                                    <motion.div
                                                        key="minus"
                                                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="absolute inset-0 flex items-center justify-center text-white/50"
                                                    >
                                                        <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                                                            <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        </svg>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="plus"
                                                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="absolute inset-0 flex items-center justify-center text-white/90"
                                                    >
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        </svg>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Text Container */}
                                        <div className="flex flex-col flex-1 overflow-hidden min-h-[28px] justify-start pt-1">
                                            <span
                                                className={`whitespace-nowrap transition-all duration-300 ${isActive ? 'text-lg font-serif' : 'text-[14px] sm:text-[15px] font-sans'} text-[#b8c9a8] font-semibold`}
                                            >
                                                {service.title}{isActive ? '.' : ''}
                                            </span>

                                            {/* Description - only shown when active */}
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, filter: "blur(4px)" }}
                                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                                                    className="pt-2 text-[#E8EDE3]/95 text-[15px] sm:text-base leading-relaxed font-sans font-normal"
                                                >
                                                    {service.description}
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Close Button at top right */}
                    <AnimatePresence>
                        {activeIndex !== null && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: [0.165, 0.84, 0.44, 1] }} // ease-out-quart
                                onClick={() => setActiveIndex(null)}
                                className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full bg-[#2A302C]/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#2A302C]/90 hover:text-white transition-colors duration-[150ms] ease-out z-20 shadow-lg"
                                aria-label={t("closeAriaLabel")}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
