"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Droplets, Leaf, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

const HERO_IMAGE = {
    src: "/final/agua.webp",
} as const;

export default function SustentabilidadResidencial() {
    const t = useTranslations("pages.residencial.sustainability");

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
            className="border-t border-[#1F1D1B]/[0.06] bg-[#E8EDE5] text-[#1a1917] py-14 lg:py-20"
        >
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75 }}
                        className="order-2 flex flex-col justify-center lg:order-1"
                    >
                        <p
                            className="mb-4 text-[10px] tracking-[0.3em] text-[#3d5c4a]/80 uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            id="sustentabilidad-residencial-heading"
                            className="text-[#1a1917] leading-[1.08]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                            }}
                        >
                            {t("titleLine1")}
                            <br />
                            <span className="text-[#2d4a3a]/90 italic">{t("titleLine2")}</span>
                        </h2>
                        <p
                            className="mt-5 max-w-md text-[#1a1917]/78 text-base leading-relaxed lg:text-[17px]"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                        >
                            {t("body")}
                        </p>

                        <ul className="mt-8 flex flex-col gap-5">
                            {highlights.map(({ icon: Icon, title, text }) => (
                                <li key={title} className="flex gap-4">
                                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1a1917]/10 bg-white/60 text-[#2d4a3a]">
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
                                            className="mt-1 text-[#1a1917]/70 text-sm leading-relaxed"
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
                            className="mt-10 inline-flex w-fit text-[10px] font-bold uppercase tracking-[0.15em] text-[#2d4a3a] underline decoration-[#2d4a3a]/35 underline-offset-4 transition hover:opacity-70"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("cta")}
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.06 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative aspect-[6/7] w-full overflow-hidden shadow-[0_28px_60px_rgba(26,25,23,0.15)] ring-1 ring-[#1a1917]/[0.08] sm:aspect-[3/4] lg:aspect-[4/5]">
                            <Image
                                src={HERO_IMAGE.src}
                                alt={t("imageAlt")}
                                fill
                                className="object-cover object-center"
                                sizes="(min-width: 1024px) 45vw, 100vw"
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
