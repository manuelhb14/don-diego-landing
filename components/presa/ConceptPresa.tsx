"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

export default function ConceptPresa() {
    const t = useTranslations("pages.presa.concept");
    const features = [
        {
            id: "vistas",
            title: t("features.vistas.title"),
            shortTitle: t("features.vistas.shortTitle"),
            description: t("features.vistas.description"),
            image: "/babylon/presa-1.webp",
        },
        {
            id: "aire-libre",
            title: t("features.aireLibre.title"),
            shortTitle: t("features.aireLibre.shortTitle"),
            description: t("features.aireLibre.description"),
            image: "/babylon/presa-2.webp",
        },
        {
            id: "identidad",
            title: t("features.identidad.title"),
            shortTitle: t("features.identidad.shortTitle"),
            description: t("features.identidad.description"),
            image: "/babylon/presa-3.webp",
        },
        {
            id: "encuentro",
            title: t("features.encuentro.title"),
            shortTitle: t("features.encuentro.shortTitle"),
            description: t("features.encuentro.description"),
            image: "/babylon/presa-4.webp",
        },
    ];

    const [activeFeature, setActiveFeature] = useState(features[0].id);

    return (
        <section
            id="concepto"
            className="bg-[#fff8ed] py-16 lg:py-24 overflow-hidden min-h-screen flex items-center"
            aria-label={t("sectionAriaLabel")}
        >
            <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-16">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-6 lg:mb-8"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#4d6d80]/90 uppercase mb-4"
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
                        {t("title.base")}{` `}
                        <span className="italic text-[#5a7a8a]">{t("title.accent")}</span>
                    </h2>
                </motion.div>

                {/* Horizontal Accordion Layout */}
                <div className="flex flex-col lg:flex-row h-[70vh] min-h-[500px] lg:min-h-[600px] gap-2 lg:gap-4">
                    {features.map((feature, index) => {
                        const isActive = activeFeature === feature.id;

                        return (
                            <motion.div
                                key={feature.id}
                                onClick={() => setActiveFeature(feature.id)}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out ${isActive
                                        ? 'flex-[5] lg:flex-[6] h-full shadow-2xl'
                                        : 'flex-[1] lg:flex-[1] h-24 lg:h-full opacity-60 hover:opacity-100 hover:bg-[#5a7a8a]/10'
                                    }`}
                                style={{ backgroundColor: isActive ? 'transparent' : '#2A302C' }}
                            >
                                {/* Background Image (Only visible when active) */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="absolute inset-0 z-0"
                                        >
                                            <Image
                                                src={feature.image}
                                                alt={feature.title}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                            {/* Gradient Overlay for Text Legibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2420] via-[#1F2420]/40 to-transparent" />
                                            {/* <div className="absolute inset-0 bg-black/20" /> */}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Inactive State UI (Vertical Text on Desktop, Horizontal on Mobile) */}
                                <div className={`absolute inset-0 flex items-center justify-center p-4 z-10 transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                    <h3
                                        className="text-[#a8c9d9] font-bold tracking-widest text-sm lg:text-base whitespace-nowrap lg:-rotate-90 origin-center"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {feature.shortTitle}
                                    </h3>
                                </div>

                                {/* Active State Content - fades out fast when inactive to avoid bump during resize */}
                                <div className={`absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-20 pointer-events-none ${isActive ? 'pointer-events-auto' : ''}`}>
                                    <motion.div
                                        initial={false}
                                        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
                                        transition={{
                                            duration: isActive ? 0.35 : 0.15,
                                            delay: isActive ? 0.15 : 0,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                    >
                                        <div className="flex items-center gap-4 mb-1 lg:mb-4">
                                            <span className="text-[#a8c9d9] text-sm font-bold tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>
                                                0{index + 1}
                                            </span>
                                            <div className="h-px flex-grow max-w-[50px] bg-[#5a7a8a]/45" />
                                        </div>
                                        <h3
                                            className="text-[#E8F0F6] text-3xl lg:text-5xl mb-1 lg:mb-4 leading-tight"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p
                                            className="text-[#E8F0F6]/95 text-sm lg:text-lg max-w-xl leading-relaxed"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {feature.description}
                                        </p>

                                        {/* Optional Explore Button */}
                                        {/* <button className="mt-8 flex items-center gap-2 text-[#C8D7E6] font-medium text-sm hover:gap-4 transition-all duration-300" style={{ fontFamily: "var(--font-sans)" }}>
                                            <span>Descubrir más</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button> */}
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
