"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useTranslations } from "next-intl";

export default function ManifestoProyecto() {
    const t = useTranslations("pages.proyecto.manifesto");
    const hasVisited = useHasVisited();

    return (
        <section
            id="manifiesto"
            className="relative bg-[#1F1D1B] w-full py-24 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 flex items-center justify-center overflow-hidden"
        >
            <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                {/* Left Side: Title and Intro */}
                <div className="lg:col-span-5 flex flex-col items-start z-10">
                    <motion.p
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-[10px] sm:text-xs tracking-[0.3em] text-[#AA7D69] uppercase mb-6 sm:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("kicker")}
                    </motion.p>

                    <motion.h2
                        initial={hasVisited ? false : { opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[#E6E1D6] leading-[1.1] mb-8"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                        }}
                    >
                        {t("titleLine1")} <br />
                        <span className="italic text-[#8C7B6C]">{t("titleLine2")}</span>
                    </motion.h2>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full h-[1px] bg-[#8C7B6C]/30 mb-8"
                    />

                    <motion.p
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-[#E6E1D6]/70 leading-relaxed text-sm lg:text-base font-sans font-light max-w-sm"
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
                                initial={hasVisited ? false : { opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: item.delay }}
                                className="flex items-center gap-6"
                            >
                                <span className="text-[#8C7B6C] text-sm font-light font-sans tracking-widest">0{index + 1}</span>
                                <h3
                                    className="text-[#D7D7AA] italic text-2xl sm:text-3xl lg:text-4xl leading-none"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Accent Image */}
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.6 }}
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
