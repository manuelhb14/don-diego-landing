"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    Anchor,
    Building2,
    CircleParking,
    Mic2,
    PlayCircle,
    Store,
    UtensilsCrossed,
} from "lucide-react";

type AreaRow = {
    id: string;
    eyebrow: string;
    title: string;
    titleItalic: string;
    description: string;
    image: { src: string; alt: string };
    Icon: LucideIcon;
    imageLeft: boolean;
    card: {
        border: string;
        bg: string;
        shadow: string;
        eyebrowClass: string;
        titleAccent: string;
        iconRing: [string, string, string];
        iconBg: string;
        iconBorder: string;
        iconColor: string;
    };
};

const rowStyleMap = {
    restaurantes: {
        Icon: UtensilsCrossed,
        imageLeft: false,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#fff8ed]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.12)]",
            eyebrowClass: "text-[#5a7a8a]/90",
            titleAccent: "text-[#5a7a8a]",
            iconRing: ["border-[#5a7a8a]/16", "border-[#5a7a8a]/20", "border-[#5a7a8a]/24"] as [string, string, string],
            iconBg: "bg-[#EEF4F6]",
            iconBorder: "border-[#5a7a8a]/28",
            iconColor: "text-[#3d5a6b]",
        },
    },
    estacionamiento: {
        Icon: CircleParking,
        imageLeft: true,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#F2EFE8]/95",
            shadow: "shadow-[0_24px_48px_rgba(26,25,23,0.1)]",
            eyebrowClass: "text-[#6B6358]/90",
            titleAccent: "text-[#6B6358]/95",
            iconRing: ["border-[#8B8478]/22", "border-[#8B8478]/26", "border-[#8B8478]/30"] as [string, string, string],
            iconBg: "bg-[#E8E4DB]",
            iconBorder: "border-[#7A7268]/35",
            iconColor: "text-[#4A453E]",
        },
    },
    comerciales: {
        Icon: Store,
        imageLeft: false,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#fff8ed]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.1)]",
            eyebrowClass: "text-[#5a7a8a]/90",
            titleAccent: "text-[#5a7a8a]",
            iconRing: ["border-[#5a7a8a]/16", "border-[#5a7a8a]/20", "border-[#5a7a8a]/24"] as [string, string, string],
            iconBg: "bg-[#EEF4F6]",
            iconBorder: "border-[#5a7a8a]/28",
            iconColor: "text-[#3d5a6b]",
        },
    },
    departamentos: {
        Icon: Building2,
        imageLeft: true,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#F2EFE8]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.1)]",
            eyebrowClass: "text-[#6B6358]/90",
            titleAccent: "text-[#6B6358]/95",
            iconRing: ["border-[#8B8478]/22", "border-[#8B8478]/26", "border-[#8B8478]/30"] as [string, string, string],
            iconBg: "bg-[#E8E4DB]",
            iconBorder: "border-[#7A7268]/35",
            iconColor: "text-[#4A453E]",
        },
    },
    parques: {
        Icon: PlayCircle,
        imageLeft: true,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#F2EFE8]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.1)]",
            eyebrowClass: "text-[#6B6358]/90",
            titleAccent: "text-[#6B6358]/95",
            iconRing: ["border-[#8B8478]/22", "border-[#8B8478]/26", "border-[#8B8478]/30"] as [string, string, string],
            iconBg: "bg-[#E8E4DB]",
            iconBorder: "border-[#7A7268]/35",
            iconColor: "text-[#4A453E]",
        },
    },
    nautico: {
        Icon: Anchor,
        imageLeft: false,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#F2EFE8]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.1)]",
            eyebrowClass: "text-[#5a7a8a]/90",
            titleAccent: "text-[#5a7a8a]",
            iconRing: ["border-[#5a7a8a]/16", "border-[#5a7a8a]/20", "border-[#5a7a8a]/24"] as [string, string, string],
            iconBg: "bg-[#EEF4F6]",
            iconBorder: "border-[#5a7a8a]/28",
            iconColor: "text-[#3d5a6b]",
        },
    },
    anfiteatro: {
        Icon: Mic2,
        imageLeft: false,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#fff8ed]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.1)]",
            eyebrowClass: "text-[#6B6358]/90",
            titleAccent: "text-[#6B6358]/95",
            iconRing: ["border-[#8B8478]/22", "border-[#8B8478]/26", "border-[#8B8478]/30"] as [string, string, string],
            iconBg: "bg-[#E8E4DB]",
            iconBorder: "border-[#7A7268]/35",
            iconColor: "text-[#4A453E]",
        },
    },
} as const;

function ImagePanel({ row }: { row: AreaRow }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex min-h-0 w-full flex-col lg:h-full"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.05 }}
                className="relative w-full flex-1"
            >
                <div className="relative aspect-[16/8] w-full min-h-[180px] flex-1 overflow-hidden shadow-[0_24px_50px_rgba(47,39,33,0.12)] ring-1 ring-[#1F1D1B]/[0.06] sm:aspect-[16/9] sm:min-h-[230px] lg:aspect-auto lg:min-h-[320px] lg:h-full">
                    <Image
                        src={row.image.src}
                        alt={row.image.alt}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#1a1917]/18 via-transparent to-transparent"
                        aria-hidden
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

function TextCard({ row }: { row: AreaRow }) {
    const { Icon, card } = row;
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="flex min-h-0 w-full flex-col lg:h-full"
        >
            <div
                className={`flex h-full w-full flex-col justify-start border ${card.border} ${card.bg} px-4 py-4 backdrop-blur-md sm:min-h-[240px] sm:px-9 sm:py-9 lg:min-h-[320px] lg:justify-center lg:px-7 ${card.shadow}`}
            >
                <div className="flex items-center gap-3 sm:block">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-[4.5rem] sm:w-[4.5rem] lg:mx-0">
                        <span className={`absolute inset-0 rounded-full border ${card.iconRing[0]}`} aria-hidden />
                        <span className={`absolute inset-2 rounded-full border ${card.iconRing[1]}`} aria-hidden />
                        <span className={`absolute inset-4 rounded-full border ${card.iconRing[2]}`} aria-hidden />
                        <div
                            className={`relative flex h-12 w-12 items-center justify-center rounded-full border sm:h-14 sm:w-14 ${card.iconBorder} ${card.iconBg} ${card.iconColor}`}
                        >
                            <Icon className="h-[1.375rem] w-[1.375rem] stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <p
                            className={`mb-1 text-left text-[10px] tracking-[0.3em] uppercase sm:mb-3 sm:text-center lg:text-left ${card.eyebrowClass}`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {row.eyebrow}
                        </p>
                        <h2
                            id={`${row.id}-heading`}
                            className="text-left leading-tight text-[#1F1D1B] sm:text-center lg:text-left"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)",
                            }}
                        >
                            {row.title}
                            {row.titleItalic ? <span className={`italic ${card.titleAccent}`}> {row.titleItalic}</span> : null}
                        </h2>
                    </div>
                </div>

                <p
                    className="mt-2 text-left text-[13px] leading-[1.6] text-[#1F1D1B]/75 sm:mt-4 sm:text-[16px] sm:leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                >
                    {row.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function AreasPresa() {
    const t = useTranslations("pages.presa.areas");
    const rows: AreaRow[] = [
        {
            id: "restaurantes",
            eyebrow: t("rows.restaurantes.eyebrow"),
            title: t("rows.restaurantes.title"),
            titleItalic: t("rows.restaurantes.titleItalic"),
            description: t("rows.restaurantes.description"),
            image: { src: "/babylon/presa-5.webp", alt: t("rows.restaurantes.alt") },
            ...rowStyleMap.restaurantes,
        },
        {
            id: "estacionamiento",
            eyebrow: t("rows.estacionamiento.eyebrow"),
            title: t("rows.estacionamiento.title"),
            titleItalic: t("rows.estacionamiento.titleItalic"),
            description: t("rows.estacionamiento.description"),
            image: { src: "/babylon/presa-6.webp", alt: t("rows.estacionamiento.alt") },
            ...rowStyleMap.estacionamiento,
        },
        {
            id: "comerciales",
            eyebrow: t("rows.comerciales.eyebrow"),
            title: t("rows.comerciales.title"),
            titleItalic: t("rows.comerciales.titleItalic"),
            description: t("rows.comerciales.description"),
            image: { src: "/babylon/presa-7.webp", alt: t("rows.comerciales.alt") },
            ...rowStyleMap.comerciales,
        },
        {
            id: "departamentos",
            eyebrow: t("rows.departamentos.eyebrow"),
            title: t("rows.departamentos.title"),
            titleItalic: t("rows.departamentos.titleItalic"),
            description: t("rows.departamentos.description"),
            image: { src: "/babylon/presa-8.webp", alt: t("rows.departamentos.alt") },
            ...rowStyleMap.departamentos,
        },
        {
            id: "nautico",
            eyebrow: t("rows.nautico.eyebrow"),
            title: t("rows.nautico.title"),
            titleItalic: t("rows.nautico.titleItalic"),
            description: t("rows.nautico.description"),
            image: { src: "/babylon/presa-10.webp", alt: t("rows.nautico.alt") },
            ...rowStyleMap.nautico,
        },
        {
            id: "parques",
            eyebrow: t("rows.parques.eyebrow"),
            title: t("rows.parques.title"),
            titleItalic: t("rows.parques.titleItalic"),
            description: t("rows.parques.description"),
            image: { src: "/babylon/presa-9.webp", alt: t("rows.parques.alt") },
            ...rowStyleMap.parques,
        },
        {
            id: "anfiteatro",
            eyebrow: t("rows.anfiteatro.eyebrow"),
            title: t("rows.anfiteatro.title"),
            titleItalic: t("rows.anfiteatro.titleItalic"),
            description: t("rows.anfiteatro.description"),
            image: { src: "/babylon/presa-11.webp", alt: t("rows.anfiteatro.alt") },
            ...rowStyleMap.anfiteatro,
        },
    ];

    return (
        <section
            id="areas"
            className="border-t border-[#1F1D1B]/[0.06] bg-[#EFE6DC] text-[#1F1D1B] py-6 lg:py-14"
            aria-label={t("sectionAriaLabel")}
        >
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-5 max-w-[42rem] lg:mb-10"
                >
                    <p
                        className="mb-3 text-[10px] tracking-[0.3em] text-[#5a7a8a]/90 uppercase"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="text-[#1a221f] leading-[1.12] font-medium"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.35rem, 5vw, 3.75rem)",
                        }}
                    >
                        {t("title.base")} {" "}
                        <span className="italic text-[#5a7a8a]">{t("title.accent")}</span>
                    </h2>
                    <p
                        className="mt-3 text-[15px] leading-relaxed text-[#1a1917]/72 sm:text-lg"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                    >
                        {t("intro")}
                    </p>
                </motion.div>

                {rows.map((row, index) => (
                    <div
                        key={row.id}
                        className={index === 0 ? "" : "pt-6 lg:pt-14"}
                        aria-labelledby={`${row.id}-heading`}
                    >
                        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
                            {row.imageLeft ? (
                                <>
                                    <div className="order-2 lg:order-1">
                                        <ImagePanel row={row} />
                                    </div>
                                    <div className="order-1 lg:order-2">
                                        <TextCard row={row} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="order-1">
                                        <TextCard row={row} />
                                    </div>
                                    <div className="order-2">
                                        <ImagePanel row={row} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
