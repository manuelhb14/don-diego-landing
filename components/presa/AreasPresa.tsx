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
            border: "border-[#C28E7A]/[0.14]",
            bg: "bg-[#fff8ed]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.12)]",
            eyebrowClass: "text-[#C28E7A]",
            titleAccent: "text-[#C28E7A]",
            iconRing: ["border-[#C28E7A]/20", "border-[#C28E7A]/25", "border-[#C28E7A]/30"] as [string, string, string],
            iconBg: "bg-[#FFF3E1]",
            iconBorder: "border-[#C28E7A]/40",
            iconColor: "text-[#2C3D38]",
        },
    },
    estacionamiento: {
        Icon: CircleParking,
        imageLeft: true,
        card: {
            border: "border-[#1F1D1B]/[0.08]",
            bg: "bg-[#EEF1EE]/95",
            shadow: "shadow-[0_24px_48px_rgba(26,25,23,0.1)]",
            eyebrowClass: "text-[#2C3D38]/80",
            titleAccent: "text-[#2C3D38]/85",
            iconRing: ["border-[#2C3D38]/15", "border-[#2C3D38]/18", "border-[#2C3D38]/22"] as [string, string, string],
            iconBg: "bg-[#E8EEEA]",
            iconBorder: "border-[#2C3D38]/30",
            iconColor: "text-[#1a1917]",
        },
    },
    comerciales: {
        Icon: Store,
        imageLeft: false,
        card: {
            border: "border-[#5a7a8a]/[0.14]",
            bg: "bg-[#F0F6F9]/95",
            shadow: "shadow-[0_24px_48px_rgba(44,90,108,0.08)]",
            eyebrowClass: "text-[#5a7a8a]/90",
            titleAccent: "text-[#5a7a8a]",
            iconRing: ["border-[#5a7a8a]/18", "border-[#5a7a8a]/22", "border-[#5a7a8a]/26"] as [string, string, string],
            iconBg: "bg-[#E4EEF3]",
            iconBorder: "border-[#5a7a8a]/35",
            iconColor: "text-[#3d5a6b]",
        },
    },
    departamentos: {
        Icon: Building2,
        imageLeft: true,
        card: {
            border: "border-[#6B6358]/[0.14]",
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
        imageLeft: false,
        card: {
            border: "border-[#4A7C8C]/[0.12]",
            bg: "bg-[#E8F2F7]/95",
            shadow: "shadow-[0_24px_48px_rgba(44,90,108,0.08)]",
            eyebrowClass: "text-[#4A7C8C]/85",
            titleAccent: "text-[#4A7C8C]/90",
            iconRing: ["border-[#5B8FA8]/18", "border-[#5B8FA8]/22", "border-[#5B8FA8]/28"] as [string, string, string],
            iconBg: "bg-[#DCEEF5]",
            iconBorder: "border-[#5B8FA8]/35",
            iconColor: "text-[#3D6B80]",
        },
    },
    nautico: {
        Icon: Anchor,
        imageLeft: true,
        card: {
            border: "border-[#3d5a6b]/[0.12]",
            bg: "bg-[#E6EEF2]/95",
            shadow: "shadow-[0_24px_48px_rgba(30,55,65,0.08)]",
            eyebrowClass: "text-[#3d5a6b]/88",
            titleAccent: "text-[#3d5a6b]",
            iconRing: ["border-[#3d5a6b]/16", "border-[#3d5a6b]/20", "border-[#3d5a6b]/24"] as [string, string, string],
            iconBg: "bg-[#DCE8EE]",
            iconBorder: "border-[#3d5a6b]/32",
            iconColor: "text-[#2a4a58]",
        },
    },
    anfiteatro: {
        Icon: Mic2,
        imageLeft: false,
        card: {
            border: "border-[#8B7355]/[0.14]",
            bg: "bg-[#FBF6EF]/95",
            shadow: "shadow-[0_24px_48px_rgba(47,39,33,0.1)]",
            eyebrowClass: "text-[#8B7355]/90",
            titleAccent: "text-[#8B7355]",
            iconRing: ["border-[#A08060]/20", "border-[#A08060]/24", "border-[#A08060]/28"] as [string, string, string],
            iconBg: "bg-[#F5EBE0]",
            iconBorder: "border-[#8B7355]/35",
            iconColor: "text-[#5c4a38]",
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
                <div className="relative aspect-[4/3] w-full min-h-[240px] flex-1 overflow-hidden shadow-[0_24px_50px_rgba(47,39,33,0.12)] ring-1 ring-[#1F1D1B]/[0.06] lg:aspect-auto lg:min-h-[320px] lg:h-full">
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
                className={`flex h-full min-h-[240px] w-full flex-col justify-center border ${card.border} ${card.bg} px-4 py-6 backdrop-blur-md sm:px-9 sm:py-9 lg:min-h-[320px] ${card.shadow}`}
            >
                <div className="relative mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center lg:mx-0">
                    <span className={`absolute inset-0 rounded-full border ${card.iconRing[0]}`} aria-hidden />
                    <span className={`absolute inset-2 rounded-full border ${card.iconRing[1]}`} aria-hidden />
                    <span className={`absolute inset-4 rounded-full border ${card.iconRing[2]}`} aria-hidden />
                    <div
                        className={`relative flex h-14 w-14 items-center justify-center rounded-full border ${card.iconBorder} ${card.iconBg} ${card.iconColor}`}
                    >
                        <Icon className="h-6 w-6 stroke-[1.5]" aria-hidden />
                    </div>
                </div>

                <p
                    className={`mb-3 text-center text-[10px] tracking-[0.3em] uppercase lg:text-left ${card.eyebrowClass}`}
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {row.eyebrow}
                </p>
                <h2
                    id={`${row.id}-heading`}
                    className="text-center leading-tight text-[#1F1D1B] lg:text-left"
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                    }}
                >
                    {row.title}{` `}
                    <span className={`italic ${card.titleAccent}`}>{row.titleItalic}</span>
                </h2>
                <p
                    className="mt-4 text-center text-[15px] leading-relaxed text-[#1F1D1B]/75 lg:text-left sm:text-[16px]"
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
            id: "parques",
            eyebrow: t("rows.parques.eyebrow"),
            title: t("rows.parques.title"),
            titleItalic: t("rows.parques.titleItalic"),
            description: t("rows.parques.description"),
            image: { src: "/babylon/presa-9.webp", alt: t("rows.parques.alt") },
            ...rowStyleMap.parques,
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
            className="border-t border-[#1F1D1B]/[0.06] bg-[#EFE6DC] text-[#1F1D1B] py-10 lg:py-14"
            aria-label={t("sectionAriaLabel")}
        >
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 lg:mb-10 max-w-[42rem]"
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
                        className="mt-4 text-lg leading-relaxed text-[#1a1917]/72"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                    >
                        {t("intro")}
                    </p>
                </motion.div>

                {rows.map((row, index) => (
                    <div
                        key={row.id}
                        className={index === 0 ? "" : "pt-10 lg:pt-14"}
                        aria-labelledby={`${row.id}-heading`}
                    >
                        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
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
