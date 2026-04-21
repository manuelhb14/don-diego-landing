"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const TEAM_KEYS = ["cimenta", "barragan", "arredarq", "artemisa"] as const;
const TEAM_COLORS = ["#AA7D69", "#E1B19B", "#AA7D69", "#E1B19B"] as const;

export default function Team() {
    const t = useTranslations("team");
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
        <section id="equipo" className="bg-[#EFE6DC] pt-12 pb-12 lg:pt-16 lg:pb-16 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 lg:mb-12"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/55 uppercase mb-4"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("kicker")}
                    </p>
                    <h2
                        className="text-[#111] leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                        }}
                    >
                        {t("headingLine1")}{" "}
                        <em className="text-[#E1B19B]">{t("headingEm")}</em>
                    </h2>
                </motion.div>

                {/* Team cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-0">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="relative group h-full"
                            style={{
                                zIndex: team.length - i,
                            }}
                        >
                            <div
                                className="relative bg-[#fffdf9] border border-black/6 px-6 pt-5 pb-2 lg:p-10 transition-all duration-500 group-hover:border-black/12 group-hover:bg-[#f6ecdf] lg:-mr-3 h-full flex flex-col"
                            >
                                {/* Top accent line & Icon */}
                                <div className="flex justify-between items-start mb-0 lg:mb-4 h-10">
                                    <div
                                        className="h-0.5 w-10 rounded-full mt-2 transition-all duration-500 group-hover:w-16"
                                        style={{ backgroundColor: member.color }}
                                    />
                                    {member.logo && (
                                        <div className="relative w-12 h-12 -mt-1 flex-shrink-0">
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
                                    className="text-[10px] tracking-[0.2em] uppercase mb-2 lg:mb-4"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        color: member.color,
                                    }}
                                >
                                    {member.role}
                                </p>

                                {/* Name */}
                                <h3
                                    className="text-[#111] text-xl lg:text-2xl mb-2 lg:mb-4 leading-snug"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.name}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-[#111]/60 text-sm leading-relaxed mb-0 lg:mb-6"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {member.description}
                                </p>

                                {/* Number - aligned bottom right */}
                                <div className="mt-auto flex justify-end">
                                    <p
                                        className="text-[#111]/[0.06] text-6xl lg:text-8xl leading-none pointer-events-none select-none transition-colors duration-500 group-hover:text-[#111]/[0.09]"
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
            </div>
        </section>
    );
}
