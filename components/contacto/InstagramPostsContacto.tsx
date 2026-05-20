"use client";

import Image from "next/image";
import { Instagram, Heart, MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

const INSTAGRAM_URL = "https://www.instagram.com/dondiegosma/";
const revealEase = [0.25, 0.46, 0.45, 0.94] as const;

const posts = [
    {
        key: "farm",
        image: "/babylon/organic-farm.webp",
        accent: "#6F8A55",
    },
    {
        key: "wellness",
        image: "/babylon/wellness-center.webp",
        accent: "#AA7D69",
    },
    {
        key: "presa",
        image: "/babylon/presa-de-la-cantera.webp",
        accent: "#547A86",
    },
    {
        key: "residencial",
        image: "/babylon/club-residencial.webp",
        accent: "#8C7B6C",
    },
] as const;

export default function InstagramPostsContacto() {
    const t = useTranslations("pages.contacto.instagram");
    const shouldReduceMotion = useReducedMotion() ?? false;

    return (
        <section className="bg-[#fff8ed] px-6 py-16 md:px-12 md:py-24 lg:px-24">
            <div className="mx-auto w-full max-w-[1440px]">
                <motion.div
                    className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease: revealEase }}
                >
                    <div className="max-w-2xl">
                        <p
                            className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#AA7D69]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="text-[#1C1713]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 4rem)",
                                lineHeight: 0.95,
                            }}
                        >
                            {t("titleLine1")} <span className="italic text-[#AA7D69]">{t("titleLine2")}</span>
                        </h2>
                    </div>

                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-fit self-start border-b border-[#222] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#222] transition-opacity hover:opacity-60 md:self-auto lg:text-[11px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("cta")}
                    </a>
                </motion.div>

                <div
                    className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 scroll-px-6 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:scroll-px-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={`${t("titleLine1")} ${t("titleLine2")}`}
                >
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.key}
                            className="w-[82vw] max-w-[380px] shrink-0 snap-start snap-always overflow-hidden border border-[#AA7D69]/20 bg-[#F6F0E8] shadow-sm sm:w-[56vw] sm:max-w-[420px] md:w-auto md:max-w-none md:shrink"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: index * 0.08, ease: revealEase }}
                        >
                            <div className="flex items-center gap-3 border-b border-[#AA7D69]/12 px-4 py-3">
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                                    style={{ backgroundColor: post.accent }}
                                >
                                    <Instagram className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p
                                        className="truncate text-sm font-bold text-[#1C1713]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        @dondiegosma
                                    </p>
                                    <p
                                        className="truncate text-[10px] uppercase tracking-[0.16em] text-[#1C1713]/45"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {t(`posts.${post.key}.label`)}
                                    </p>
                                </div>
                            </div>

                            <div className="relative aspect-square overflow-hidden bg-[#E8D9C8]">
                                <Image
                                    src={post.image}
                                    alt={t(`posts.${post.key}.alt`)}
                                    fill
                                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 82vw"
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            <div className="space-y-4 px-4 py-4">
                                <div className="flex items-center justify-between text-[#1C1713]">
                                    <div className="flex items-center gap-4">
                                        <Heart className="h-5 w-5" />
                                        <MessageCircle className="h-5 w-5" />
                                        <Send className="h-5 w-5" />
                                    </div>
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#AA7D69]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {t("mockLabel")}
                                    </span>
                                </div>

                                <p
                                    className="text-sm leading-relaxed text-[#1C1713]/80"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    <span className="font-bold text-[#1C1713]">@dondiegosma</span>{" "}
                                    {t(`posts.${post.key}.caption`)}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
