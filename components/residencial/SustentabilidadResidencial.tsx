"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Droplets, Leaf, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { residentialSectionHeadingStyle } from "@/components/residencial/residentialTypography";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const HERO_IMAGE = {
    src: "/final/agua.webp",
} as const;

export default function SustentabilidadResidencial() {
    const t = useTranslations("pages.residencial.sustainability");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    const highlights = [
        {
            icon: Leaf,
            title: t("highlights.landscape.title"),
            text: t("highlights.landscape.body"),
        },
        {
            icon: Droplets,
            title: t("highlights.water.title"),
            text: t("highlights.water.body"),
        },
        {
            icon: Sun,
            title: t("highlights.daily.title"),
            text: t("highlights.daily.body"),
        },
    ] as const;

    return (
        <section
            id="sustentabilidad"
            aria-labelledby="sustentabilidad-residencial-heading"
            className="border-t border-[#1F1D1B]/[0.06] bg-[#E8EDE5] py-12 text-[#1a1917] md:py-16 lg:py-18"
        >
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition()}
                        className="order-1 flex flex-col justify-center"
                    >
                        <p
                            className="mb-5 text-xs uppercase tracking-[0.3em] text-[#3D5C4A]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            id="sustentabilidad-residencial-heading"
                            className="text-[#1a1917]"
                            style={residentialSectionHeadingStyle}
                        >
                            {t("titleLine1")}
                            <br />
                            <span className="text-[#2d4a3a]/90 italic">{t("titleLine2")}</span>
                        </h2>
                        <p
                            className="mt-4 max-w-[600px] text-base font-medium leading-relaxed text-[#1a1917]/78 md:text-lg"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("body")}
                        </p>

                        <ul className="mt-5 flex flex-col gap-3">
                            {highlights.map(({ icon: Icon, title, text }) => (
                                <li key={title} className="flex gap-4">
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1a1917]/10 bg-[#FFF8ED]/70 text-[#2d4a3a]">
                                        <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                                    </span>
                                    <div>
                                        <p
                                            className="text-[#1a1917] text-[15px] font-medium leading-snug"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {title}
                                        </p>
                                        <p
                                            className="mt-0.5 text-[#1a1917]/70 text-sm leading-relaxed"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {text}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/farm"
                            className="mt-6 inline-flex w-fit border-b border-[#2d4a3a]/45 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2d4a3a] transition hover:opacity-70"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("cta")}
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.12)}
                        className="order-2"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden shadow-[0_24px_48px_rgba(26,25,23,0.12)] sm:aspect-[16/10] lg:ml-auto lg:aspect-auto lg:h-[clamp(350px,37vw,540px)] lg:w-[88%]">
                            <Image
                                src={HERO_IMAGE.src}
                                alt={t("imageAlt")}
                                fill
                                className="object-cover object-center"
                                sizes="(min-width: 1024px) 40vw, 100vw"
                            />
                            <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1917]/35 via-transparent to-transparent"
                                aria-hidden
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
