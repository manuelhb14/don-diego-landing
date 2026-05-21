"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Activity, HeartPulse, Home, Trees, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

type WellnessService = {
    kicker: string;
    titleBase: string;
    titleAccent: string;
    description: string;
    image: string;
    Icon: LucideIcon;
    tone: "warm" | "earth";
};

export default function ServicesWellness() {
    const t = useTranslations("pages.wellness.services");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const services: WellnessService[] = [
        {
            kicker: t("items.rehabilitacion.kicker"),
            titleBase: t("items.rehabilitacion.titleBase"),
            titleAccent: t("items.rehabilitacion.titleAccent"),
            description: t("items.rehabilitacion.description"),
            image: "/babylon/wellness-5.webp",
            Icon: HeartPulse,
            tone: "earth",
        },
        {
            kicker: t("items.seniorLiving.kicker"),
            titleBase: t("items.seniorLiving.titleBase"),
            titleAccent: t("items.seniorLiving.titleAccent"),
            description: t("items.seniorLiving.description"),
            image: "/babylon/wellness-6.webp",
            Icon: Activity,
            tone: "warm",
        },
        {
            kicker: t("items.departamentosFamiliares.kicker"),
            titleBase: t("items.departamentosFamiliares.titleBase"),
            titleAccent: t("items.departamentosFamiliares.titleAccent"),
            description: t("items.departamentosFamiliares.description"),
            image: "/babylon/wellness-7.webp",
            Icon: Home,
            tone: "earth",
        },
        {
            kicker: t("items.amenidades.kicker"),
            titleBase: t("items.amenidades.titleBase"),
            titleAccent: t("items.amenidades.titleAccent"),
            description: t("items.amenidades.description"),
            image: "/babylon/wellness-8.webp",
            Icon: Trees,
            tone: "warm",
        },
    ];
    const revealTransition = {
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
    };

    return (
        <section id="servicios" className="bg-[#F1E8DF] py-12 text-[#18201d] lg:py-20">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition}
                    className="mb-8 lg:mb-12"
                >
                    <p
                        className="mb-4 text-xs tracking-[0.3em] text-[#5A6B52] uppercase lg:mb-7"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-medium leading-[1.02] tracking-normal text-[#18201d]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.75rem, 5vw, 4.75rem)",
                        }}
                    >
                        {t("title.base")} <span className="italic text-[#5a6b52]">{t("title.accent")}</span>
                    </h2>
                </motion.div>

                <div className="space-y-8 lg:space-y-12">
                    {services.map((service, index) => {
                        const Icon = service.Icon;
                        const isEarth = service.tone === "earth";
                        const panelClass = isEarth
                            ? "border-[#6B735F]/18 bg-[#ECEFE4]"
                            : "border-[#6F6258]/14 bg-[#F7EFE6]";
                        const accentClass = isEarth ? "text-[#5A6B52]" : "text-[#796C63]";
                        const iconClass = isEarth
                            ? "border-[#5A6B52]/25 bg-[#E0E7D7] text-[#4E6048]"
                            : "border-[#796C63]/20 bg-[#EFE6DC] text-[#5A6B52]";
                        const titleAccentClass = isEarth ? "text-[#5a6b52]" : "text-[#796C63]";

                        return (
                            <div
                                key={`${service.titleBase} ${service.titleAccent}`}
                                className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8"
                            >
                                <motion.article
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : index * 0.06 }}
                                    className={`order-1 flex h-full w-full flex-col justify-center border px-5 py-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] sm:min-h-[236px] sm:px-8 sm:py-8 lg:min-h-[300px] lg:px-8 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"} ${panelClass}`}
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
                                                {service.kicker}
                                            </p>
                                            <h3
                                                className="text-left leading-tight text-[#18201d] sm:text-center lg:text-left"
                                                style={{
                                                    fontFamily: "var(--font-serif)",
                                                    fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)",
                                                }}
                                            >
                                                {service.titleBase} <span className={`italic ${titleAccentClass}`}>{service.titleAccent}</span>
                                            </h3>
                                        </div>
                                    </div>

                                    <p
                                        className="mt-3 text-left text-[13px] leading-[1.65] text-[#18201d]/72 sm:mt-4 sm:text-base sm:leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                    >
                                        {service.description}
                                    </p>
                                </motion.article>

                                <motion.div
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : index * 0.06 + 0.04 }}
                                    className={`order-2 relative flex min-h-0 w-full flex-col lg:h-full ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                                >
                                    <div className="relative aspect-[16/9] w-full min-h-[190px] flex-1 overflow-hidden shadow-[0_18px_38px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/10 sm:min-h-[238px] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                                        <Image
                                            src={service.image}
                                            alt={`${service.titleBase} ${service.titleAccent}`}
                                            fill
                                            className="object-cover object-center"
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                        />
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
