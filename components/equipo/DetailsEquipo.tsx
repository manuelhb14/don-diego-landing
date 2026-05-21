"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function DetailsEquipo() {
    const t = useTranslations("pages.equipo.details");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });
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
        <section id="equipo-details" className="relative w-full overflow-hidden bg-[#EFE6DC] px-6 py-12 md:px-10 md:py-20 lg:px-16 lg:py-24">
            <div className="mx-auto w-full max-w-[1440px]">
                <div className="flex w-full flex-col border-t border-[#1F1D1B]/10">
                    {teamInfo.map((member, index) => (
                        <motion.div
                            key={member.name}
                            className="group grid w-full grid-cols-1 gap-5 border-b border-[#1F1D1B]/10 py-8 transition-colors duration-500 hover:bg-[#F7EFE6]/55 md:grid-cols-[6rem_minmax(0,0.74fr)_minmax(0,1.26fr)] md:gap-8 md:py-10 lg:grid-cols-[7rem_minmax(0,0.78fr)_minmax(0,1.22fr)] lg:py-12"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                            transition={revealTransition(index * 0.05)}
                        >
                            <div className="flex items-start justify-between gap-6 md:block">
                                <span
                                    className="block text-4xl font-light leading-none text-[#AA7D69]/55 transition-colors duration-500 group-hover:text-[#AA7D69]/80 md:text-5xl lg:text-6xl"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.index}
                                </span>
                                {member.logo && (
                                    <div className="relative h-12 w-14 opacity-45 saturate-75 transition-opacity duration-500 group-hover:opacity-75 md:mt-8 md:h-14 md:w-16">
                                        <Image
                                            src={member.logo}
                                            alt={member.name}
                                            fill
                                            className="object-contain object-right brightness-0"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="md:pt-2">
                                <p
                                    className="max-w-[18rem] text-xs uppercase tracking-[0.24em]"
                                    style={{ fontFamily: "var(--font-sans)", color: member.color }}
                                >
                                    {member.role}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center">
                                <h3
                                    className="mb-3 text-[clamp(2rem,4.1vw,3.35rem)] leading-[1.04] text-[#222222]/92 transition-colors duration-500 group-hover:text-[#222222]"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.name}
                                </h3>
                                <p
                                    className="max-w-[45rem] text-[15px] leading-[1.72] text-[#222222]/66 transition-colors duration-500 group-hover:text-[#222222]/78 md:text-base"
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
