"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Bike, Leaf, Sprout, Users, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

type ProductCard = {
    kicker: string;
    titleBase: string;
    titleAccent: string;
    description: string;
    image: string;
    video?: string;
    Icon: LucideIcon;
    tone: "warm" | "earth";
};

export default function ProductsFarm() {
    const t = useTranslations("pages.farm.products");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const products: ProductCard[] = [
        {
            kicker: t("items.invernaderos.kicker"),
            titleBase: t("items.invernaderos.titleBase"),
            titleAccent: t("items.invernaderos.titleAccent"),
            description: t("items.invernaderos.description"),
            image: "/final/invernadero.webp",
            video: "/final/invernadero-video.mp4",
            Icon: Sprout,
            tone: "warm",
        },
        {
            kicker: t("items.andadoresCicloruta.kicker"),
            titleBase: t("items.andadoresCicloruta.titleBase"),
            titleAccent: t("items.andadoresCicloruta.titleAccent"),
            description: t("items.andadoresCicloruta.description"),
            image: "/images/renders/farm.jpg",
            Icon: Bike,
            tone: "earth",
        },
        {
            kicker: t("items.experienciaComunitaria.kicker"),
            titleBase: t("items.experienciaComunitaria.titleBase"),
            titleAccent: t("items.experienciaComunitaria.titleAccent"),
            description: t("items.experienciaComunitaria.description"),
            image: "/final/casa-flores.webp",
            Icon: Users,
            tone: "warm",
        },
        {
            kicker: t("items.origenLocal.kicker"),
            titleBase: t("items.origenLocal.titleBase"),
            titleAccent: t("items.origenLocal.titleAccent"),
            description: t("items.origenLocal.description"),
            image: "/final/caja-verduras.png",
            Icon: Leaf,
            tone: "earth",
        },
    ];
    const revealTransition = {
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
    };

    return (
        <section className="relative bg-[#EFE6DC] py-12 lg:py-20">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="mb-8 lg:mb-12">
                    <p
                        className="mb-4 text-xs tracking-[0.3em] text-[#9B5C6E] uppercase lg:mb-7"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="leading-[1.02] tracking-normal text-[#1a1917]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.75rem, 5vw, 4.75rem)",
                        }}
                    >
                        {t("title.base")} {" "}
                        <span className="italic text-[#8B4A5E]">{t("title.accent")}</span>
                    </h2>
                </div>

                <div className="space-y-8 lg:space-y-12">
                    {products.map((item, i) => {
                        const Icon = item.Icon;
                        const isEarth = item.tone === "earth";
                        const panelClass = isEarth
                            ? "border-[#6B6358]/18 bg-[#EEEAE1]"
                            : "border-[#9B5C6E]/16 bg-[#F8ECEE]";
                        const accentClass = isEarth ? "text-[#6B6358]" : "text-[#9B5C6E]";
                        const iconClass = isEarth
                            ? "border-[#7A7268]/25 bg-[#E5E0D6] text-[#4A453E]"
                            : "border-[#9B5C6E]/22 bg-[#F1DDE3] text-[#8B4A5E]";

                        return (
                            <div
                                key={`${item.titleBase} ${item.titleAccent}`}
                                className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8"
                            >
                                <motion.article
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : i * 0.06 }}
                                    className={`order-1 flex h-full w-full flex-col justify-center border px-5 py-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] sm:min-h-[236px] sm:px-8 sm:py-8 lg:min-h-[300px] lg:px-8 ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"} ${panelClass}`}
                                >
                                    <div className="flex items-center gap-3 sm:block">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-16 sm:w-16 lg:mx-0">
                                            <div className={`flex h-full w-full items-center justify-center border ${iconClass}`}>
                                                <Icon className="h-[1.375rem] w-[1.375rem] stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p
                                                className={`mb-1 text-left text-xs tracking-[0.3em] uppercase sm:mb-3 sm:text-center lg:text-left ${accentClass}`}
                                                style={{ fontFamily: "var(--font-sans)" }}
                                            >
                                                {item.kicker}
                                            </p>
                                            <h3
                                                className="text-left leading-tight text-[#1F1D1B] sm:text-center lg:text-left"
                                                style={{
                                                    fontFamily: "var(--font-serif)",
                                                    fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)",
                                                }}
                                            >
                                                {item.titleBase} <span className={`italic ${isEarth ? "text-[#6B6358]/95" : "text-[#8B4A5E]"}`}>{item.titleAccent}</span>
                                            </h3>
                                        </div>
                                    </div>

                                    <p
                                        className="mt-3 text-left text-[13px] leading-[1.65] text-[#1F1D1B]/72 sm:mt-4 sm:text-base sm:leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                    >
                                        {item.description}
                                    </p>
                                </motion.article>

                                <motion.div
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : i * 0.06 + 0.04 }}
                                    className={`order-2 relative flex min-h-0 w-full flex-col lg:h-full ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                                >
                                    <div className="relative aspect-[16/9] w-full min-h-[190px] flex-1 overflow-hidden shadow-[0_18px_38px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/10 sm:min-h-[238px] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                                        {item.video ? (
                                            <video
                                                className="absolute inset-0 h-full w-full object-cover object-center"
                                                src={item.video}
                                                poster={item.image}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                aria-label={`${item.titleBase} ${item.titleAccent}`}
                                            />
                                        ) : (
                                            <Image
                                                src={item.image}
                                                alt={`${item.titleBase} ${item.titleAccent}`}
                                                fill
                                                className="object-cover object-center"
                                                sizes="(min-width: 1024px) 50vw, 100vw"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1917]/14 via-transparent to-transparent" />
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
