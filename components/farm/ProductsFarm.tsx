"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bike, Leaf, Sprout, Users, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type ProductCard = {
    kicker: string;
    titleBase: string;
    titleAccent: string;
    description: string;
    image: string;
    Icon: LucideIcon;
    tone: "warm" | "earth";
};

export default function ProductsFarm() {
    const t = useTranslations("pages.farm.products");
    const products: ProductCard[] = [
        {
            kicker: t("items.invernaderos.kicker"),
            titleBase: t("items.invernaderos.titleBase"),
            titleAccent: t("items.invernaderos.titleAccent"),
            description: t("items.invernaderos.description"),
            image: "/babylon/farm-5.webp",
            Icon: Sprout,
            tone: "warm",
        },
        {
            kicker: t("items.andadoresCicloruta.kicker"),
            titleBase: t("items.andadoresCicloruta.titleBase"),
            titleAccent: t("items.andadoresCicloruta.titleAccent"),
            description: t("items.andadoresCicloruta.description"),
            image: "/babylon/farm-3.webp",
            Icon: Bike,
            tone: "earth",
        },
        {
            kicker: t("items.experienciaComunitaria.kicker"),
            titleBase: t("items.experienciaComunitaria.titleBase"),
            titleAccent: t("items.experienciaComunitaria.titleAccent"),
            description: t("items.experienciaComunitaria.description"),
            image: "/babylon/farm-7.webp",
            Icon: Users,
            tone: "warm",
        },
        {
            kicker: t("items.origenLocal.kicker"),
            titleBase: t("items.origenLocal.titleBase"),
            titleAccent: t("items.origenLocal.titleAccent"),
            description: t("items.origenLocal.description"),
            image: "/babylon/farm-6.webp",
            Icon: Leaf,
            tone: "earth",
        },
    ];

    return (
        <section className="relative bg-[#EFE6DC] py-8 pb-10 lg:py-20 lg:pb-28">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="mb-5 lg:mb-12">
                    <p
                        className="mb-3 text-[10px] tracking-[0.3em] text-[#9B5C6E]/85 uppercase lg:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="tracking-tight text-[#1a1917] leading-[1.1]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3.125rem, 5.25vw, 4.25rem)",
                        }}
                    >
                        {t("title.base")} {" "}
                        <span className="italic text-[#8B4A5E]">{t("title.accent")}</span>
                    </h2>
                </div>

                <div className="space-y-6 lg:space-y-14">
                    {products.map((item, i) => {
                        const Icon = item.Icon;
                        const isEarth = item.tone === "earth";
                        const cardClass = isEarth
                            ? "border-[#6B6358]/[0.14] bg-[#F2EFE8]/95"
                            : "border-[#1F1D1B]/[0.08] bg-[#fff8ed]/95";
                        const accentClass = isEarth ? "text-[#6B6358]/90" : "text-[#9B5C6E]/85";
                        const iconInnerClass = isEarth
                            ? "border-[#7A7268]/35 bg-[#E8E4DB] text-[#4A453E]"
                            : "border-[#9B5C6E]/24 bg-[#F8ECEE] text-[#8B4A5E]";

                        return (
                            <div
                                key={`${item.titleBase} ${item.titleAccent}`}
                                className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10"
                            >
                                <motion.article
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: i * 0.06 }}
                                    className={`order-1 flex h-full w-full flex-col justify-start border px-4 py-4 shadow-[0_24px_48px_rgba(47,39,33,0.1)] backdrop-blur-md sm:min-h-[240px] sm:px-9 sm:py-9 lg:min-h-[320px] lg:justify-center lg:px-7 ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"} ${cardClass}`}
                                >
                                    <div className="flex items-center gap-3 sm:block">
                                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-[4.5rem] sm:w-[4.5rem] lg:mx-0">
                                            <span className={isEarth ? "absolute inset-0 rounded-full border border-[#8B8478]/22" : "absolute inset-0 rounded-full border border-[#9B5C6E]/12"} aria-hidden />
                                            <span className={isEarth ? "absolute inset-2 rounded-full border border-[#8B8478]/26" : "absolute inset-2 rounded-full border border-[#9B5C6E]/18"} aria-hidden />
                                            <span className={isEarth ? "absolute inset-4 rounded-full border border-[#8B8478]/30" : "absolute inset-4 rounded-full border border-[#9B5C6E]/24"} aria-hidden />
                                            <div className={`relative flex h-12 w-12 items-center justify-center rounded-full border sm:h-14 sm:w-14 ${iconInnerClass}`}>
                                                <Icon className="h-[1.375rem] w-[1.375rem] stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p
                                            className={`mb-1 text-left text-[10px] tracking-[0.3em] uppercase sm:mb-3 sm:text-center lg:text-left ${accentClass}`}
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
                                        className="mt-2 text-left text-[13px] leading-[1.6] text-[#1F1D1B]/75 sm:mt-4 sm:text-[16px] sm:leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                    >
                                        {item.description}
                                    </p>
                                </motion.article>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: i * 0.06 + 0.04 }}
                                    className={`order-2 relative flex min-h-0 w-full flex-col lg:h-full ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                                >
                                    <div className="relative aspect-[16/8] w-full min-h-[180px] flex-1 overflow-hidden shadow-[0_30px_60px_rgba(26,25,23,0.18)] ring-1 ring-[#1a1917]/10 sm:aspect-[16/9] sm:min-h-[230px] lg:aspect-auto lg:min-h-[280px] lg:h-full">
                                        <Image
                                            src={item.image}
                                            alt={`${item.titleBase} ${item.titleAccent}`}
                                            fill
                                            className="object-cover object-center"
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1917]/20 via-transparent to-transparent" />
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
