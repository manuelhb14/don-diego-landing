"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

type ProyectoCard = {
    title: string;
    description: string;
    image: string;
    href: string;
    colSpan: string;
    aspect: string;
    ledColor: string;
    ledActive: boolean;
    statusLabel: string;
    pending: boolean;
};

export default function GridProyecto() {
    const t = useTranslations("pages.proyecto.grid");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const phaseNote = t("phaseNote");
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    const components: ProyectoCard[] = [
        {
            title: t("cards.residencial.title"),
            description: t("cards.residencial.description"),
            image: "/final/residencial.png",
            href: "/residencial",
            colSpan: "md:col-span-7",
            aspect: "aspect-[16/11] md:aspect-auto md:h-[520px]",
            ledColor: "#E1B19B",
            ledActive: true,
            statusLabel: t("status.inDevelopment"),
            pending: false,
        },
        {
            title: t("cards.farm.title"),
            description: t("cards.farm.description"),
            image: "/final/organic-farm.png",
            href: "/farm",
            colSpan: "md:col-span-5",
            aspect: "aspect-[16/11] md:aspect-auto md:h-[520px]",
            ledColor: "#DEBEBF",
            ledActive: true,
            statusLabel: t("status.inDevelopment"),
            pending: false,
        },
        {
            title: t("cards.wellness.title"),
            description: t("cards.wellness.description"),
            image: "/final/wellness-center.png",
            href: "/wellness",
            colSpan: "md:col-span-5",
            aspect: "aspect-[16/11] md:aspect-auto md:h-[520px]",
            ledColor: "#D7D7AA",
            ledActive: false,
            statusLabel: t("status.comingSoon"),
            pending: true,
        },
        {
            title: t("cards.presa.title"),
            description: t("cards.presa.description"),
            image: "/final/presa.png",
            href: "/presa",
            colSpan: "md:col-span-7",
            aspect: "aspect-[16/11] md:aspect-auto md:h-[520px]",
            ledColor: "#C8D7E6",
            ledActive: false,
            statusLabel: t("status.comingSoon"),
            pending: true,
        },
    ];

    return (
        <section id="componentes" className="w-full bg-[#FFF3E1] px-6 py-16 md:px-10 md:py-24 lg:px-16">
            <div className="mx-auto w-full max-w-[1440px]">
                <div className="mb-10 grid gap-8 md:mb-14 md:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] md:items-center lg:gap-16">
                    <motion.h2
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={revealTransition()}
                        className="max-w-[760px] text-[#222222]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 6vw, 6rem)",
                            lineHeight: 1,
                            letterSpacing: "0",
                        }}
                    >
                        {t("bottomTitleLine1")} <br />
                        <span className="italic text-[#AA7D69]">{t("bottomTitleLine2")}</span>
                    </motion.h2>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={revealTransition(0.16)}
                        className="max-w-[560px] md:justify-self-end"
                    >
                        {phaseNote ? (
                            <p
                                className="mb-4 text-xs font-bold uppercase leading-[1.7] tracking-[0.22em] text-[#AA7D69]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {phaseNote}
                            </p>
                        ) : null}
                        <p
                            className="text-base font-medium leading-relaxed text-[#222222]/80 md:text-xl"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("bottomBody")}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 lg:gap-6">
                    {components.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={revealTransition(index * 0.08)}
                            className={`${item.colSpan} relative overflow-hidden`}
                        >
                            <Link
                                href={item.href}
                                className={`group relative block w-full overflow-hidden rounded-sm bg-[#1F1D1B] shadow-[0_18px_45px_rgba(36,24,18,0.10)] ${item.aspect}`}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className={`object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-safe:group-hover:scale-[1.035] ${item.pending ? "saturate-[0.88]" : ""}`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 58vw"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#15120F]/80 via-[#15120F]/20 to-transparent transition-opacity duration-700 group-hover:opacity-95" />
                                {item.pending ? <div className="absolute inset-0 bg-[#FFF3E1]/10 transition-colors duration-700 group-hover:bg-[#FFF3E1]/5" /> : null}

                                <div className="absolute left-4 top-4 z-10 flex items-center gap-3 md:left-5 md:top-5">
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFF3E1]/85"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        0{index + 1}
                                    </span>
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${item.ledActive ? "motion-safe:animate-pulse" : ""}`}
                                        style={{
                                            backgroundColor: item.ledColor,
                                            opacity: item.ledActive ? 1 : 0.56,
                                            boxShadow: item.ledActive ? `0 0 14px ${item.ledColor}8C` : `inset 0 0 0 1px ${item.ledColor}`,
                                        }}
                                    />
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFF3E1]/90"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {item.statusLabel}
                                    </span>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-8 lg:p-10">
                                    <div className="max-w-[560px]">
                                        <h3
                                            className="max-w-[18ch] text-[1.75rem] leading-[1.05] text-[#FFF3E1] md:text-[clamp(1.75rem,3vw,2.75rem)]"
                                            style={{ fontFamily: "var(--font-serif)", letterSpacing: "0" }}
                                        >
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 max-w-[34rem] text-sm font-medium leading-relaxed text-[#FFF3E1]/80 md:mt-4 md:text-base">
                                            {item.description}
                                        </p>

                                        <span
                                            className="mt-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FFF3E1] md:mt-7"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {t("discover")}
                                            <span className="h-px w-8 bg-[#FFF3E1]/55 transition-all duration-300 group-hover:w-12 group-hover:bg-[#FFF3E1]" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
