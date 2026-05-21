"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function ManifestoProyecto() {
    const t = useTranslations("pages.proyecto.manifesto");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section
            id="manifiesto"
            className="relative flex w-full items-center justify-center overflow-hidden bg-[#1F1D1B] px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32"
        >
            <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">

                {/* Left Side: Title and Intro */}
                <div className="lg:col-span-5 flex flex-col items-start z-10">
                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={revealTransition()}
                        className="mb-5 text-xs uppercase tracking-[0.3em] text-[#E1B19B]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("kicker")}
                    </motion.p>

                    <motion.h2
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={revealTransition(0.16)}
                        className="mb-8 text-[#FFF3E1]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 6vw, 6rem)",
                            lineHeight: 1,
                            letterSpacing: "0",
                        }}
                    >
                        {t("titleLine1")} <br />
                        <span className="italic text-[#E1B19B]">{t("titleLine2")}</span>
                    </motion.h2>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={revealTransition(0.2)}
                        className="mb-8 h-px w-full bg-[#E1B19B]/28"
                    />

                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={revealTransition(0.24)}
                        className="max-w-sm text-base font-medium leading-relaxed text-[#FFF3E1]/75"
                    >
                        {t("body")}
                    </motion.p>
                </div>

                {/* Right Side: Philosophy Pillars & Image */}
                <div className="lg:col-span-7 relative h-full flex flex-col md:flex-row items-center gap-12">

                    {/* Philosophical Pillars */}
                    <div className="flex flex-col gap-8 md:gap-12 z-20 w-full md:w-1/2">
                        {[
                            { title: t("pillars.earth"), delay: 0.3 },
                            { title: t("pillars.community"), delay: 0.5 },
                            { title: t("pillars.self"), delay: 0.7 },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={revealTransition(item.delay)}
                                className="flex items-center gap-6"
                            >
                                <span className="font-sans text-sm font-medium tracking-widest text-[#E1B19B]/70">0{index + 1}</span>
                                <h3
                                    className="text-2xl italic leading-none text-[#D7D7AA] sm:text-3xl lg:text-4xl"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Accent Image */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={revealTransition(0.24)}
                        className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded-sm z-10 hidden md:block"
                    >
                        <Image
                            src="/images/gallery/gallery-9.jpg"
                            alt={t("imageAlt")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-[#1F1D1B]/20 mix-blend-multiply" />
                    </motion.div>
                </div>
            </div>

            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#AA7D69]/5 to-transparent pointer-events-none" />
        </section>
    );
}
