"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useTranslations } from "next-intl";

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
    const hasVisited = useHasVisited();

    const components: ProyectoCard[] = [
        {
            title: t("cards.residencial.title"),
            description: t("cards.residencial.description"),
            image: "/final/residencial.png",
            href: "/residencial",
            colSpan: "col-span-1 md:col-span-8",
            aspect: "aspect-[4/3] md:aspect-[21/9]",
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
            colSpan: "col-span-1 md:col-span-4",
            aspect: "aspect-[4/3] md:aspect-[3/4]",
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
            colSpan: "col-span-1 md:col-span-5",
            aspect: "aspect-[4/3] md:aspect-square",
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
            colSpan: "col-span-1 md:col-span-7",
            aspect: "aspect-[4/3] md:aspect-[16/9]",
            ledColor: "#C8D7E6",
            ledActive: false,
            statusLabel: t("status.comingSoon"),
            pending: true,
        },
    ];

    return (
        <section id="componentes" className="bg-[#FFF3E1] pt-12 pb-12 md:pb-24 px-6 md:px-12 lg:px-24 w-full">
            <div className="max-w-[1440px] mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    {components.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={hasVisited ? false : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            className={`${item.colSpan} relative group overflow-hidden rounded-sm`}
                        >
                            <Link href={item.href} className={`block w-full h-full relative ${item.aspect} bg-[#1F1D1B]`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className={`object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105 ${item.pending ? "saturate-[0.82] brightness-[0.92]" : ""}`}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B]/90 via-[#1F1D1B]/20 to-transparent opacity-95 md:opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
                                {item.pending && <div className="absolute inset-0 bg-[#FFF3E1]/18 transition-colors duration-700 group-hover:bg-[#FFF3E1]/12" />}

                                <div className="absolute right-4 top-4 z-10 flex items-center gap-2 md:right-5 md:top-5">
                                    <span
                                        className="text-[9px] font-black uppercase tracking-[0.18em] text-[#FFF8EC] drop-shadow-[0_1px_2px_rgba(31,29,27,0.38)] md:text-[10px] lg:text-[11px]"
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            textShadow: "0 1px 2px rgba(31, 29, 27, 0.42), 0 2px 5px rgba(31, 29, 27, 0.22)",
                                        }}
                                    >
                                        {item.statusLabel}
                                    </span>
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${item.ledActive ? "animate-pulse" : ""}`}
                                        style={{
                                            backgroundColor: item.ledColor,
                                            opacity: item.ledActive ? 1 : 0.52,
                                            boxShadow: item.ledActive ? `0 0 5px 1px ${item.ledColor}80, 0 0 10px 2px ${item.ledColor}45` : `inset 0 0 0 1px ${item.ledColor}80`,
                                        }}
                                    />
                                </div>

                                <div className="absolute inset-0 p-5 md:p-12 flex flex-col justify-end">
                                    <div className="transform translate-y-0 md:translate-y-28 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-0">
                                        <h3
                                            className="text-[#E6E1D6] text-2xl md:text-3xl lg:text-4xl leading-tight mb-2 md:mb-4"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {item.title}
                                        </h3>

                                        <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 ease-in-out h-auto overflow-hidden">
                                            <p className="text-[#E6E1D6]/80 font-sans font-light text-sm md:text-base max-w-md mb-2 md:mb-6 leading-relaxed">
                                                {item.description}
                                            </p>

                                            <span
                                                className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-[#E6E1D6] uppercase group/link"
                                                style={{ fontFamily: "var(--font-sans)" }}
                                            >
                                                {t("discover")}
                                                <span className="w-6 h-[1px] bg-[#E6E1D6]/50 group-hover/link:w-10 transition-all duration-300" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full mt-10 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <h2
                            className="text-[#222222] leading-none tracking-tight"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 5rem)",
                            }}
                        >
                            {t("bottomTitleLine1")} <br />
                            <span className="italic text-[#8C7B6C]">{t("bottomTitleLine2")}</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md md:mb-2 lg:mb-4"
                    >
                        {/*
                        <p
                            className="mb-5 text-right text-[10px] font-medium uppercase leading-[1.7] tracking-[0.18em] text-[#AA7D69]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("phaseNote")}
                        </p>
                        */}
                        <p className="text-[#222] text-lg md:text-xl font-medium leading-relaxed mb-0" style={{ fontFamily: "var(--font-serif)" }}>
                            {t("bottomBody")}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
