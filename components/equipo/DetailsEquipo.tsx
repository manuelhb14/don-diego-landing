"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function DetailsEquipo() {
    const t = useTranslations("pages.equipo.details");
    const teamInfo = [
        {
            name: t("members.grupoCimienta.name"),
            role: t("members.grupoCimienta.role"),
            description: t("members.grupoCimienta.description"),
            logo: "/logos/CIMIENTA.png",
            color: "#AA7D69",
            index: "01"
        },
        {
            name: t("members.barraganArquitectos.name"),
            role: t("members.barraganArquitectos.role"),
            description: t("members.barraganArquitectos.description"),
            color: "#8C7B6C",
            index: "02"
        },
        {
            name: t("members.espaciosVerdesArredarq.name"),
            role: t("members.espaciosVerdesArredarq.role"),
            description: t("members.espaciosVerdesArredarq.description"),
            color: "#AA7D69",
            index: "03"
        },
        {
            name: t("members.artemisaBranding.name"),
            role: t("members.artemisaBranding.role"),
            description: t("members.artemisaBranding.description"),
            color: "#8C7B6C",
            index: "04"
        },
    ];

    return (
        <section id="equipo-details" className="bg-[#fff8ed] py-16 md:py-32 px-6 md:px-12 lg:px-24 w-full relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[#EFE6DC]" />
            <div className="max-w-[1440px] mx-auto w-full">
                {/* Team list - Vertical Stack with large borders */}
                <div className="relative z-10 flex justify-center items-center flex-col w-full border-t border-[#AA7D69]/25">
                    {teamInfo.map((member) => (
                        <motion.div
                            key={member.name}
                            className="group flex flex-col md:flex-row w-full py-8 md:py-16 border-b border-[#AA7D69]/25 bg-[#fff8ed] transition-colors duration-500 hover:bg-[#f8efe1]/80 cursor-default px-6 md:px-12 -mx-6 md:-mx-12"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Left Side: Number and Role */}
                            <div className="w-full md:w-1/3 flex flex-col justify-between mb-2 md:mb-0">
                                <div className="flex w-full justify-between items-center gap-6">
                                    <span
                                        className="text-[#AA7D69]/35 text-5xl lg:text-6xl font-light group-hover:text-[#AA7D69]/85 transition-colors duration-500"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {member.index}
                                    </span>
                                    {/* Right Side: Logo Display */}
                                    {member.logo && (
                                        <div className="relative w-16 md:w-24 h-16 opacity-55 group-hover:opacity-100 transition-opacity duration-700 saturate-75 group-hover:saturate-100">
                                            <Image
                                                src={member.logo}
                                                alt={member.name}
                                                fill
                                                className="object-contain object-left md:object-right"
                                            />
                                        </div>
                                    )}
                                    <div className="h-full w-px bg-[#AA7D69]/25 group-hover:bg-[#AA7D69]/60 transition-colors duration-500 hidden md:block" />
                                </div>

                                <div className="mt-4 lg:mt-8 md:mt-auto">
                                    <p
                                        className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2"
                                        style={{ fontFamily: "var(--font-sans)", color: member.color }}
                                    >
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                            {/* Middle Side: Name and Description */}
                            <div className="w-full md:w-4/6 flex flex-col justify-center pl-0 md:pl-12">
                                <h3
                                    className="text-[#222222]/90 text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 lg:mb-6 group-hover:text-[#222222] transition-colors duration-500"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.name}
                                </h3>
                                <p
                                    className="text-[#222222]/65 text-sm md:text-base leading-relaxed max-w-xl group-hover:text-[#222222]/85 transition-colors duration-500"
                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                                >
                                    {member.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
