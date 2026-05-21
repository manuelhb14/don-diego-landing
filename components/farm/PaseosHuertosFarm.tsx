"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Footprints, BookOpen, Trees } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function PaseosHuertosFarm() {
    const t = useTranslations("pages.farm.paseosHuertos");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const highlights = [
        {
            icon: Footprints,
            title: t("highlights.rutas.title"),
            text: t("highlights.rutas.text"),
        },
        {
            icon: BookOpen,
            title: t("highlights.lectura.title"),
            text: t("highlights.lectura.text"),
        },
        {
            icon: Trees,
            title: t("highlights.estaciones.title"),
            text: t("highlights.estaciones.text"),
        },
    ] as const;

    const images = [
        {
            src: "/babylon/huerto.webp",
            alt: t("images.oneAlt"),
        },
        {
            src: "/babylon/tranquilidad.webp",
            alt: t("images.twoAlt"),
        },
        {
            src: "/babylon/tierra-2.webp",
            alt: t("images.threeAlt"),
        },
    ] as const;

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section
            id="paseos-huertos"
            aria-labelledby="paseos-huertos-heading"
            className="relative overflow-hidden border-t border-[#AA7D69]/10 bg-[#EFE6DC] py-12 text-[#1a1917] lg:py-20"
        >
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition()}
                    className="mb-9 lg:mb-12"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-12 xl:gap-16">
                        <div className="min-w-0 max-w-3xl lg:max-w-[min(100%,52%)]">
                            <p
                                className="mb-7 text-xs tracking-[0.3em] text-[#9B5C6E] uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("eyebrow")}
                            </p>
                            <h2
                                id="paseos-huertos-heading"
                                className="tracking-tight text-[#1a1917] leading-[1.1]"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(2.75rem, 4.75vw, 4.5rem)",
                                }}
                            >
                                {t("title.line1")}
                                <br />
                                <span className="italic text-[#8B4A5E]">{t("title.accent")}</span>
                            </h2>
                        </div>
                        <p
                            className="ml-auto w-full max-w-[360px] text-left font-serif text-base font-normal leading-[1.75] tracking-normal text-[#222]/80 lg:pt-3 lg:text-right lg:text-lg"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("intro")}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition(0.08)}
                    className="grid h-[clamp(320px,82vw,500px)] grid-cols-2 grid-rows-[minmax(0,2fr)_minmax(0,1fr)] gap-3 sm:gap-4 lg:h-auto lg:grid-cols-12 lg:grid-rows-2 lg:gap-4"
                >
                    <div className="relative col-span-2 row-start-1 w-full overflow-hidden lg:col-span-7 lg:row-span-2 lg:min-h-[min(56vh,540px)]">
                        <Image
                            src={images[0].src}
                            alt={images[0].alt}
                            fill
                            className="object-cover object-[center_40%]"
                            sizes="(min-width: 1024px) 58vw, 100vw"
                        />
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFF8ED]/15 via-transparent to-transparent"
                            aria-hidden
                        />
                    </div>

                    <div className="relative col-span-1 col-start-1 row-start-2 overflow-hidden shadow-[0_16px_40px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/[0.06] lg:col-span-5 lg:col-start-auto lg:row-start-1">
                        <video
                            className="absolute inset-0 h-full w-full object-cover object-center"
                            src="/final/gallinas.mp4"
                            poster={images[1].src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label={images[1].alt}
                        />
                    </div>

                    <div className="relative col-span-1 col-start-2 row-start-2 overflow-hidden shadow-[0_16px_40px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/[0.06] lg:col-span-5 lg:col-start-auto lg:row-start-2">
                        <Image
                            src={images[2].src}
                            alt={images[2].alt}
                            fill
                            className="object-cover object-[center_35%]"
                            sizes="(min-width: 1024px) 38vw, 50vw"
                        />
                    </div>
                </motion.div>

                <motion.ul
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition(0.12)}
                    className="mt-8 grid grid-cols-1 gap-7 border-t border-[#AA7D69]/12 pt-5 sm:grid-cols-2 sm:gap-x-10 lg:mt-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8"
                >
                    {highlights.map(({ icon: Icon, title, text }) => (
                        <li
                            key={title}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex flex-row items-center gap-3 pr-3 sm:pr-4">
                                <p
                                    className="min-w-0 flex-1 text-lg font-medium leading-snug text-[#1a1917] sm:text-xl"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {title}
                                </p>
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#9B5C6E]/18 bg-[#FFF9F2] text-[#9B5C6E] shadow-sm">
                                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
                                </span>
                            </div>
                            <p
                                className="text-sm leading-relaxed text-[#1a1917]/70"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {text}
                            </p>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
