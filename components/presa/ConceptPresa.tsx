"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function ConceptPresa() {
    const t = useTranslations("pages.presa.concept");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const features = useMemo(
        () => [
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
        ],
        [t],
    );

    const [activeFeature, setActiveFeature] = useState(features[0].id);
    const activeFeatureIndex = features.findIndex((feature) => feature.id === activeFeature);
    const activeFeatureData = features[activeFeatureIndex] ?? features[0];

    const selectAdjacentFeature = (direction: -1 | 1) => {
        const currentIndex = activeFeatureIndex === -1 ? 0 : activeFeatureIndex;
        const nextIndex = (currentIndex + direction + features.length) % features.length;
        setActiveFeature(features[nextIndex].id);
    };

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section
            id="concepto"
            className="overflow-hidden bg-[#fff8ed] py-12 text-[#1a221f] lg:py-20"
            aria-label={t("sectionAriaLabel")}
        >
            <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition()}
                    className="mb-8 grid gap-5 lg:mb-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(300px,0.28fr)] lg:items-end"
                >
                    <div>
                        <p
                            className="mb-4 text-xs tracking-[0.3em] text-[#5A7A8A] uppercase lg:mb-7"
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
                            {t("title.base")}
                            <br />
                            <span className="italic text-[#5A7A8A]">{t("title.accent")}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 lg:justify-end">
                        <button
                            type="button"
                            aria-label={t("previousFeatureAria")}
                            onClick={() => selectAdjacentFeature(-1)}
                            className="grid h-10 w-10 place-items-center border border-[#5A7A8A]/24 bg-[#FFF9F2] text-[#3d5a6b] transition-colors duration-200 hover:border-[#5A7A8A]/45 hover:bg-[#edf5f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A7A8A]/35"
                        >
                            <ChevronLeft className="h-4 w-4" strokeWidth={1.7} />
                        </button>
                        <button
                            type="button"
                            aria-label={t("nextFeatureAria")}
                            onClick={() => selectAdjacentFeature(1)}
                            className="grid h-10 w-10 place-items-center border border-[#5A7A8A]/24 bg-[#FFF9F2] text-[#3d5a6b] transition-colors duration-200 hover:border-[#5A7A8A]/45 hover:bg-[#edf5f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A7A8A]/35"
                        >
                            <ChevronRight className="h-4 w-4" strokeWidth={1.7} />
                        </button>
                    </div>
                </motion.div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(400px,0.68fr)] lg:gap-8">
                    <motion.div
                        key={activeFeatureData.id}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={revealTransition(0.04)}
                        className="relative min-h-[320px] overflow-hidden shadow-[0_24px_54px_rgba(26,25,23,0.12)] ring-1 ring-[#1a1917]/10 sm:min-h-[430px] lg:min-h-[560px]"
                    >
                        <Image
                            src={activeFeatureData.image}
                            alt={activeFeatureData.title}
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(min-width: 1024px) 58vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#172025]/72 via-[#172025]/10 to-transparent" />
                        <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 sm:right-6 sm:bottom-6 sm:left-6">
                            <p
                                className="text-[10px] tracking-[0.3em] text-[#E8F0F6] uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {String(activeFeatureIndex + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                            </p>
                            <div className="h-px w-16 bg-[#E8F0F6]/45" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.08)}
                        className="flex min-h-[320px] flex-col border border-[#5A7A8A]/18 bg-[#F2EFE8] p-5 sm:p-7 lg:min-h-[560px] lg:p-8"
                    >
                        <div className="mb-8 flex flex-wrap gap-2">
                            {features.map((feature, index) => {
                                const isActive = feature.id === activeFeature;

                                return (
                                    <button
                                        key={feature.id}
                                        type="button"
                                        onClick={() => setActiveFeature(feature.id)}
                                        className={`border px-3 py-2 text-[10px] tracking-[0.22em] uppercase transition-colors duration-200 ${
                                            isActive
                                                ? "border-[#5A7A8A] bg-[#5A7A8A] text-[#FFF9F2]"
                                                : "border-[#5A7A8A]/18 bg-[#FFF9F2] text-[#3d5a6b] hover:border-[#5A7A8A]/38"
                                        }`}
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {String(index + 1).padStart(2, "0")} {feature.shortTitle}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-auto">
                            <p
                                className="mb-4 text-xs tracking-[0.3em] text-[#5A7A8A] uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {activeFeatureData.shortTitle}
                            </p>
                            <h3
                                className="max-w-[28rem] text-[#1a221f]"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(2.15rem, 4vw, 3.6rem)",
                                    lineHeight: 1.03,
                                }}
                            >
                                {activeFeatureData.title}
                            </h3>
                            <p
                                className="mt-5 max-w-[34rem] text-base leading-relaxed text-[#1a1917]/72 md:text-lg"
                                style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                            >
                                {activeFeatureData.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
