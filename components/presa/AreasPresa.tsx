"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    Anchor,
    CircleParking,
    Coffee,
    Mountain,
    PlayCircle,
    UtensilsCrossed,
} from "lucide-react";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

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
        eyebrowClass: string;
        titleAccent: string;
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
            border: "border-[#5a7a8a]/16",
            bg: "bg-[#EEF4F6]",
            eyebrowClass: "text-[#5a7a8a]",
            titleAccent: "text-[#5a7a8a]",
            iconBg: "bg-[#DDEBF0]",
            iconBorder: "border-[#5a7a8a]/25",
            iconColor: "text-[#3d5a6b]",
        },
    },
    estacionamiento: {
        Icon: CircleParking,
        imageLeft: true,
        card: {
            border: "border-[#6B6358]/18",
            bg: "bg-[#EEEAE1]",
            eyebrowClass: "text-[#6B6358]",
            titleAccent: "text-[#6B6358]/95",
            iconBg: "bg-[#E5E0D6]",
            iconBorder: "border-[#7A7268]/25",
            iconColor: "text-[#4A453E]",
        },
    },
    comerciales: {
        Icon: Coffee,
        imageLeft: false,
        card: {
            border: "border-[#5a7a8a]/16",
            bg: "bg-[#EEF4F6]",
            eyebrowClass: "text-[#5a7a8a]",
            titleAccent: "text-[#5a7a8a]",
            iconBg: "bg-[#DDEBF0]",
            iconBorder: "border-[#5a7a8a]/25",
            iconColor: "text-[#3d5a6b]",
        },
    },
    departamentos: {
        Icon: Mountain,
        imageLeft: true,
        card: {
            border: "border-[#6B6358]/18",
            bg: "bg-[#EEEAE1]",
            eyebrowClass: "text-[#6B6358]",
            titleAccent: "text-[#6B6358]/95",
            iconBg: "bg-[#E5E0D6]",
            iconBorder: "border-[#7A7268]/25",
            iconColor: "text-[#4A453E]",
        },
    },
    parques: {
        Icon: PlayCircle,
        imageLeft: true,
        card: {
            border: "border-[#6B6358]/18",
            bg: "bg-[#EEEAE1]",
            eyebrowClass: "text-[#6B6358]",
            titleAccent: "text-[#6B6358]/95",
            iconBg: "bg-[#E5E0D6]",
            iconBorder: "border-[#7A7268]/25",
            iconColor: "text-[#4A453E]",
        },
    },
    nautico: {
        Icon: Anchor,
        imageLeft: false,
        card: {
            border: "border-[#5a7a8a]/16",
            bg: "bg-[#EEF4F6]",
            eyebrowClass: "text-[#5a7a8a]",
            titleAccent: "text-[#5a7a8a]",
            iconBg: "bg-[#DDEBF0]",
            iconBorder: "border-[#5a7a8a]/25",
            iconColor: "text-[#3d5a6b]",
        },
    },
} as const;

function ImagePanel({ row, shouldReduceMotion }: { row: AreaRow; shouldReduceMotion: boolean }) {
    const revealTransition = {
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
    };

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransition}
            className="relative flex min-h-0 w-full flex-col lg:h-full"
        >
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.04 }}
                className="relative w-full flex-1"
            >
                <div className="relative aspect-[16/9] w-full min-h-[190px] flex-1 overflow-hidden shadow-[0_18px_38px_rgba(26,25,23,0.1)] ring-1 ring-[#1F1D1B]/[0.06] sm:min-h-[238px] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                    <Image
                        src={row.image.src}
                        alt={row.image.alt}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#1a1917]/14 via-transparent to-transparent"
                        aria-hidden
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

function TextCard({ row, shouldReduceMotion }: { row: AreaRow; shouldReduceMotion: boolean }) {
    const { Icon, card } = row;
    const revealTransition = {
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
    };

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
            className="flex min-h-0 w-full flex-col lg:h-full"
        >
            <div
                className={`flex h-full w-full flex-col justify-center border ${card.border} ${card.bg} px-5 py-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] sm:min-h-[236px] sm:px-8 sm:py-8 lg:min-h-[300px] lg:px-8`}
            >
                <div className="flex items-center gap-3 sm:block">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-16 sm:w-16 lg:mx-0">
                        <div
                            className={`flex h-full w-full items-center justify-center border ${card.iconBorder} ${card.iconBg} ${card.iconColor}`}
                        >
                            <Icon className="h-[1.375rem] w-[1.375rem] stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <p
                            className={`mb-1 text-left text-xs tracking-[0.3em] uppercase sm:mb-3 sm:text-center lg:text-left ${card.eyebrowClass}`}
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
                    className="mt-3 text-left text-[13px] leading-[1.65] text-[#1F1D1B]/72 sm:mt-4 sm:text-base sm:leading-relaxed"
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
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = {
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
    };
    const rows: AreaRow[] = [
        {
            id: "departamentos",
            eyebrow: t("rows.departamentos.eyebrow"),
            title: t("rows.departamentos.title"),
            titleItalic: t("rows.departamentos.titleItalic"),
            description: t("rows.departamentos.description"),
            image: { src: "/babylon/presa-8.webp", alt: t("rows.departamentos.alt") },
            ...rowStyleMap.departamentos,
            imageLeft: false,
        },
        {
            id: "comerciales",
            eyebrow: t("rows.comerciales.eyebrow"),
            title: t("rows.comerciales.title"),
            titleItalic: t("rows.comerciales.titleItalic"),
            description: t("rows.comerciales.description"),
            image: { src: "/babylon/presa-7.webp", alt: t("rows.comerciales.alt") },
            ...rowStyleMap.comerciales,
            imageLeft: true,
        },
        {
            id: "nautico",
            eyebrow: t("rows.nautico.eyebrow"),
            title: t("rows.nautico.title"),
            titleItalic: t("rows.nautico.titleItalic"),
            description: t("rows.nautico.description"),
            image: { src: "/babylon/presa-10.webp", alt: t("rows.nautico.alt") },
            ...rowStyleMap.nautico,
            imageLeft: false,
        },
        {
            id: "restaurantes",
            eyebrow: t("rows.restaurantes.eyebrow"),
            title: t("rows.restaurantes.title"),
            titleItalic: t("rows.restaurantes.titleItalic"),
            description: t("rows.restaurantes.description"),
            image: { src: "/babylon/presa-5.webp", alt: t("rows.restaurantes.alt") },
            ...rowStyleMap.restaurantes,
            imageLeft: true,
        },
        {
            id: "parques",
            eyebrow: t("rows.parques.eyebrow"),
            title: t("rows.parques.title"),
            titleItalic: t("rows.parques.titleItalic"),
            description: t("rows.parques.description"),
            image: { src: "/babylon/presa-9.webp", alt: t("rows.parques.alt") },
            ...rowStyleMap.parques,
            imageLeft: false,
        },
        {
            id: "estacionamiento",
            eyebrow: t("rows.estacionamiento.eyebrow"),
            title: t("rows.estacionamiento.title"),
            titleItalic: t("rows.estacionamiento.titleItalic"),
            description: t("rows.estacionamiento.description"),
            image: { src: "/babylon/presa-6.webp", alt: t("rows.estacionamiento.alt") },
            ...rowStyleMap.estacionamiento,
            imageLeft: true,
        },
    ];

    return (
        <section
            id="areas"
            className="border-t border-[#1F1D1B]/[0.06] bg-[#EFE6DC] py-12 text-[#1F1D1B] lg:py-20"
            aria-label={t("sectionAriaLabel")}
        >
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition}
                    className="mb-8 grid gap-5 lg:mb-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-end lg:gap-14"
                >
                    <div className="max-w-[42rem]">
                        <p
                            className="mb-4 text-xs tracking-[0.3em] text-[#5a7a8a] uppercase lg:mb-7"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("eyebrow")}
                        </p>
                        <h2
                            className="font-medium leading-[1.02] tracking-normal text-[#1a221f]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.75rem, 5vw, 4.75rem)",
                            }}
                        >
                            {t("title.base")} {" "}
                            <span className="italic text-[#5a7a8a]">{t("title.accent")}</span>
                        </h2>
                    </div>
                    <p
                        className="max-w-[34rem] text-base leading-relaxed text-[#1a1917]/72 md:text-lg lg:pb-2"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                    >
                        {t("intro")}
                    </p>
                </motion.div>

                {rows.map((row, index) => (
                    <div
                        key={row.id}
                        className={index === 0 ? "" : "pt-8 lg:pt-12"}
                        aria-labelledby={`${row.id}-heading`}
                    >
                        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
                            {row.imageLeft ? (
                                <>
                                    <div className="order-2 lg:order-1">
                                        <ImagePanel row={row} shouldReduceMotion={shouldReduceMotion} />
                                    </div>
                                    <div className="order-1 lg:order-2">
                                        <TextCard row={row} shouldReduceMotion={shouldReduceMotion} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="order-1">
                                        <TextCard row={row} shouldReduceMotion={shouldReduceMotion} />
                                    </div>
                                    <div className="order-2">
                                        <ImagePanel row={row} shouldReduceMotion={shouldReduceMotion} />
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
