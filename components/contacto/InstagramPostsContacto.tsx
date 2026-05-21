"use client";

import Image from "next/image";
import { Instagram, Heart, MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

const INSTAGRAM_URL = "https://www.instagram.com/dondiegosma/";
const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

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

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section className="border-t border-[#1C1713]/10 bg-[#F6F0E8] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
            <div className="mx-auto w-full max-w-[1440px]">
                <motion.div
                    className="mb-8 md:mb-10"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={revealTransition()}
                >
                    <div className="max-w-full">
                        <p
                            className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#AA7D69]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="max-w-full overflow-hidden whitespace-nowrap leading-none text-[#1C1713]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.85rem, 8.2vw, 6rem)",
                            }}
                        >
                            {t("titleLine1")} <em className="text-[#AA7D69]">{t("titleLine2")}</em>
                        </h2>
                    </div>
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
                            className="w-[82vw] max-w-[380px] shrink-0 snap-start snap-always overflow-hidden border border-[#1C1713]/10 bg-[#FFF9F2] sm:w-[56vw] sm:max-w-[420px] md:w-auto md:max-w-none md:shrink"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={revealTransition(index * 0.06)}
                        >
                            <div className="flex items-center gap-3 border-b border-[#1C1713]/10 px-4 py-3">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#F6F0E8]"
                                    style={{ borderColor: `${post.accent}55`, color: post.accent }}
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
                                <div className="flex items-center text-[#1C1713]/55">
                                    <div className="flex items-center gap-3">
                                        <Heart className="h-4 w-4" strokeWidth={1.7} />
                                        <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                                        <Send className="h-4 w-4" strokeWidth={1.7} />
                                    </div>
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

                <motion.div
                    className="mt-8 flex justify-center md:mt-10 md:justify-end"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={revealTransition(0.16)}
                >
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border-b border-[#222222] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#222222] transition-opacity hover:opacity-60 lg:text-[11px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("cta")}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
