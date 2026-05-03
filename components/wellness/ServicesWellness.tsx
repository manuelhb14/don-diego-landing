"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Activity, HeartPulse, Home, Trees, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

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

    return (
        <section id="servicios" className="bg-[#F1E8DF] py-8 pb-10 text-[#18201d] lg:py-20 lg:pb-24">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-5 lg:mb-12"
                >
                    <p
                        className="mb-3 text-[10px] tracking-[0.3em] text-[#5a6b52]/85 uppercase lg:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-medium leading-[1.1] tracking-tight text-[#18201d]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.75rem, 4.75vw, 4.25rem)",
                        }}
                    >
                        {t("title.base")} <span className="italic text-[#5a6b52]">{t("title.accent")}</span>
                    </h2>
                </motion.div>

                <div className="space-y-6 lg:space-y-14">
                    {services.map((service, index) => {
                        const Icon = service.Icon;
                        const isEarth = service.tone === "earth";
                        const cardClass = isEarth
                            ? "border-[#6B735F]/[0.14] bg-[#F2EFE8]/95"
                            : "border-[#1F1D1B]/[0.08] bg-[#fffaf4]/95";
                        const accentClass = isEarth ? "text-[#52644f]/90" : "text-[#756e68]/90";
                        const iconInnerClass = isEarth
                            ? "border-[#6B735F]/30 bg-[#E9EDE4] text-[#52644f]"
                            : "border-[#756e68]/24 bg-[#F7F2EB] text-[#5a6b52]";
                        const titleAccentClass = isEarth ? "text-[#5a6b52]" : "text-[#756e68]";

                        return (
                            <div
                                key={`${service.titleBase} ${service.titleAccent}`}
                                className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10"
                            >
                                <motion.article
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: index * 0.06 }}
                                    className={`order-1 flex h-full w-full flex-col justify-start border px-4 py-4 shadow-[0_24px_48px_rgba(47,39,33,0.1)] backdrop-blur-md sm:min-h-[240px] sm:px-9 sm:py-9 lg:min-h-[320px] lg:justify-center lg:px-7 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"} ${cardClass}`}
                                >
                                    <div className="flex items-center gap-3 sm:block">
                                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-[4.5rem] sm:w-[4.5rem] lg:mx-0">
                                            <span className={isEarth ? "absolute inset-0 rounded-full border border-[#6B735F]/18" : "absolute inset-0 rounded-full border border-[#756e68]/14"} aria-hidden />
                                            <span className={isEarth ? "absolute inset-2 rounded-full border border-[#6B735F]/24" : "absolute inset-2 rounded-full border border-[#756e68]/20"} aria-hidden />
                                            <span className={isEarth ? "absolute inset-4 rounded-full border border-[#6B735F]/30" : "absolute inset-4 rounded-full border border-[#756e68]/26"} aria-hidden />
                                            <div className={`relative flex h-12 w-12 items-center justify-center rounded-full border sm:h-14 sm:w-14 ${iconInnerClass}`}>
                                                <Icon className="h-[1.375rem] w-[1.375rem] stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p
                                                className={`mb-1 text-left text-[10px] tracking-[0.3em] uppercase sm:mb-3 sm:text-center lg:text-left ${accentClass}`}
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
                                        className="mt-2 text-left text-[13px] leading-[1.6] text-[#18201d]/75 sm:mt-4 sm:text-[16px] sm:leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                    >
                                        {service.description}
                                    </p>
                                </motion.article>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: index * 0.06 + 0.04 }}
                                    className={`order-2 relative flex min-h-0 w-full flex-col lg:h-full ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                                >
                                    <div className="relative aspect-[16/8] w-full min-h-[180px] flex-1 overflow-hidden shadow-[0_30px_60px_rgba(26,25,23,0.18)] ring-1 ring-[#1a1917]/10 sm:aspect-[16/9] sm:min-h-[230px] lg:aspect-auto lg:min-h-[280px] lg:h-full">
                                        <Image
                                            src={service.image}
                                            alt={`${service.titleBase} ${service.titleAccent}`}
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
