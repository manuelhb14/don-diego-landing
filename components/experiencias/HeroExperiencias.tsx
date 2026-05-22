"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { EXPERIENCIAS_TITLE_PATHS } from "./experienciasTitlePaths";

const OUTER_G_TRANSFORM = "matrix(1,0,0,1,-462.7,-1485.2)";
const LETTER_G_TRANSFORM = "matrix(1.744749,0,0,0.681499,-1704.100573,263.976581)";
const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const pathReveal = {
    hidden: { pathLength: 0, fill: "rgba(28, 23, 19, 0)" },
    visible: {
        pathLength: 1,
        fill: "rgba(28, 23, 19, 1)",
        transition: {
            pathLength: { duration: 0.92, ease: EASE_OUT_CUBIC },
            fill: { duration: 0.78, ease: EASE_OUT_CUBIC },
        },
    },
};

export default function HeroExperiencias() {
    const t = useTranslations("pages.experiencias.hero");
    const shouldReduceMotion = useReducedMotion() ?? false;

    return (
        <section className="relative flex min-h-[38vh] w-full items-center justify-center overflow-hidden bg-[#FFF8ED] px-6 pt-24 pb-10 md:min-h-[48vh] md:px-10 md:pt-32 md:pb-20 lg:px-16 lg:pt-36">
            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex w-full flex-col items-center md:mb-8">
                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.62,
                            ease: EASE_OUT_CUBIC,
                        }}
                        className="mb-6 text-xs uppercase tracking-[0.3em] text-[#AA7D69] md:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </motion.p>

                    <motion.svg
                        role="img"
                        aria-label={t("svgAriaLabel")}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: shouldReduceMotion ? 0 : 0.07,
                                    delayChildren: 0.05,
                                },
                            },
                        }}
                        initial={shouldReduceMotion ? false : "hidden"}
                        animate="visible"
                        viewBox="0 0 2496 221"
                        className="h-auto w-full max-w-[780px] px-1 pb-2 sm:px-8"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g transform={OUTER_G_TRANSFORM}>
                            {EXPERIENCIAS_TITLE_PATHS.map((d, i) => (
                                <g key={i} transform={LETTER_G_TRANSFORM}>
                                    <motion.path
                                        d={d}
                                        variants={shouldReduceMotion ? undefined : pathReveal}
                                        fill={shouldReduceMotion ? "#1C1713" : undefined}
                                        stroke="#1C1713"
                                        strokeWidth="2"
                                    />
                                </g>
                            ))}
                        </g>
                    </motion.svg>
                </div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.78, delay: shouldReduceMotion ? 0 : 0.38, ease: EASE_OUT_CUBIC }}
                    className="max-w-[620px]"
                >
                    <p
                        className="mb-4 text-base font-medium leading-relaxed text-[#1C1713]/78 md:text-xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("description")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
