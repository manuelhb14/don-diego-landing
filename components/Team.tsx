"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const TEAM_KEYS = ["cimenta", "barragan", "arredarq", "artemisa"] as const;
const TEAM_COLORS = ["#AA7D69", "#E1B19B", "#AA7D69", "#E1B19B"] as const;

export default function Team() {
    const t = useTranslations("team");
    const shouldReduceMotion = useReducedMotion();
    const team = useMemo(
        () =>
            TEAM_KEYS.map((key, i) => ({
                name: t(`${key}.name`),
                role: t(`${key}.role`),
                description: t(`${key}.description`),
                logo: key === "cimenta" ? "/logos/CIMIENTA.png" : undefined,
                color: TEAM_COLORS[i],
            })),
        [t]
    );

    return (
        <section id="equipo" className="overflow-hidden bg-[#EFE6DC] py-12 lg:py-20">
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
                    className="mb-10 flex flex-col gap-5 md:items-end md:justify-between md:flex-row lg:mb-14"
                >
                    <div>
                        <p
                            className="mb-3 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="leading-none text-[#111111]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                            }}
                        >
                            {t("headingLine1")}{" "}
                            <em className="text-[#AA7D69]">{t("headingEm")}</em>
                        </h2>
                    </div>
                    <p
                        className="max-w-md text-base font-medium leading-relaxed text-[#111111]/72 md:text-right md:text-xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Team cards */}
                <div className="grid gap-px border-t border-[#111111]/10 md:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : i * 0.08 }}
                            className="group relative h-full"
                            style={{
                                zIndex: team.length - i,
                            }}
                        >
                            <div
                                className="flex h-full min-h-[260px] flex-col border-b border-[#111111]/10 bg-[#fffdf9] px-5 py-5 transition-colors duration-500 group-hover:bg-[#fbf5ee] lg:min-h-[300px] lg:px-6 lg:py-6"
                            >
                                {/* Top accent line & Icon */}
                                <div className="mb-4 flex h-10 items-start justify-between">
                                    <div
                                        className="mt-2 h-px w-10 transition-all duration-500 group-hover:w-16"
                                        style={{ backgroundColor: member.color }}
                                    />
                                    {member.logo && (
                                        <div className="relative -mt-1 h-10 w-10 flex-shrink-0">
                                            <Image
                                                src={member.logo}
                                                alt={member.name}
                                                fill
                                                // The team section background is light; force logos to render dark for contrast.
                                                className="object-contain opacity-40 group-hover:opacity-80 transition-opacity duration-500 brightness-0"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Role */}
                                <p
                                    className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        color: member.color,
                                    }}
                                >
                                    {member.role}
                                </p>

                                {/* Name */}
                                <h3
                                    className="mb-3 text-[1.45rem] leading-[1.08] text-[#111111] lg:text-[1.7rem]"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.name}
                                </h3>

                                {/* Description */}
                                <p
                                    className="mb-5 text-sm leading-relaxed text-[#111111]/62"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {member.description}
                                </p>

                                {/* Number - aligned bottom right */}
                                <div className="mt-auto flex justify-end">
                                    <p
                                        className="pointer-events-none select-none text-5xl leading-none text-[#111111]/[0.055] transition-colors duration-500 group-hover:text-[#111111]/[0.085] lg:text-6xl"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            lineHeight: "0.8",
                                        }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.2 }}
                    className="mt-8 flex justify-end"
                >
                    <Link
                        href="/equipo"
                        className="inline-block border-b border-[#222222] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#222222] transition-opacity hover:opacity-60 lg:text-[11px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("cta")}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
