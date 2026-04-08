"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Flower2, Palette, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TrabajoFloresFarm() {
    const t = useTranslations("pages.farm.trabajoFlores");
    const highlights = [
        {
            icon: Flower2,
            title: t("highlights.variedades.title"),
            text: t("highlights.variedades.text"),
        },
        {
            icon: Palette,
            title: t("highlights.diseno.title"),
            text: t("highlights.diseno.text"),
        },
        {
            icon: Sun,
            title: t("highlights.ciclo.title"),
            text: t("highlights.ciclo.text"),
        },
    ] as const;

    const heroImage = {
        src: "/babylon/flowers.webp",
        alt: t("imageAlt"),
    } as const;

    return (
        <section
            id="flores"
            aria-labelledby="trabajo-flores-heading"
            className="border-t border-[#1F1D1B]/[0.06] bg-[#EFE6DC] text-[#1a1917] py-14 lg:py-20"
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
                            className="mb-4 text-[10px] tracking-[0.3em] text-[#9B5C6E]/85 uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("eyebrow")}
                        </p>
                        <h2
                            id="trabajo-flores-heading"
                            className="tracking-tight text-[#1a1917] leading-[1.1]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3.125rem, 5.25vw, 4.25rem)",
                            }}
                        >
                            {t("title.line1")}
                            <br />
                            <span className="italic text-[#8B4A5E]">{t("title.accent")}</span>
                        </h2>
                        <p
                            className="mt-5 max-w-md text-lg leading-relaxed text-[#1a1917]/78"
                            style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                        >
                            {t("intro")}
                        </p>

                        <ul className="mt-8 flex flex-col gap-5">
                            {highlights.map(({ icon: Icon, title, text }) => (
                                <li key={title} className="flex gap-4">
                                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1a1917]/10 bg-white/60 text-[#9B5C6E]">
                                        <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                                    </span>
                                    <div>
                                        <p
                                            className="text-[15px] font-medium leading-snug text-[#1a1917]"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {title}
                                        </p>
                                        <p
                                            className="mt-1 text-sm leading-relaxed text-[#1a1917]/70"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {text}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.06 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_28px_60px_rgba(26,25,23,0.15)] ring-1 ring-[#1a1917]/[0.08] sm:aspect-[3/4] lg:aspect-[4/5]">
                            <Image
                                src={heroImage.src}
                                alt={heroImage.alt}
                                fill
                                className="object-cover object-center"
                                sizes="(min-width: 1024px) 45vw, 100vw"
                            />
                            <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1917]/30 via-transparent to-transparent"
                                aria-hidden
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
