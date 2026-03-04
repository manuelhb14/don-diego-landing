"use client";

import Image from "next/image";
import { motion } from "motion/react";

const team = [
    {
        name: "Grupo Cimienta",
        role: "Desarrollo y Dirección General",
        description: "Más de 30 años de experiencia en el ciclo completo de desarrollo inmobiliario.",
        logo: "/logos/residencial.png",
        color: "#AA7D69",
    },
    {
        name: "Barragán Arquitectos",
        role: "Diseño Arquitectónico",
        description: "Arq. Luis Barragán Rivera — estética contemporánea enraizada en la identidad de SMA.",
        logo: "/logos/wellness.png",
        color: "#E1B19B",
    },
    {
        name: "Espacios Verdes / Arredarq",
        role: "Paisajismo y Sustentabilidad",
        description: "Arq. Eliseo Arredondo — fundador de la Sociedad de Arquitectos Paisajistas de México.",
        logo: "/logos/farm.png",
        color: "#AA7D69",
    },
];

export default function TeamV5() {
    return (
        <section id="equipo" className="bg-[#111] py-24 lg:py-36 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 lg:mb-24"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#E1B19B]/40 uppercase mb-4"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        (El Equipo)
                    </p>
                    <h2
                        className="text-white leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                        }}
                    >
                        Maestros de su{" "}
                        <em className="text-[#E1B19B]">oficio.</em>
                    </h2>
                </motion.div>

                {/* Team cards — horizontal overlapping on desktop */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-0">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="relative group"
                            style={{
                                zIndex: team.length - i,
                                marginLeft: i > 0 ? undefined : undefined,
                            }}
                        >
                            <div
                                className="relative bg-[#1A1A1A] border border-white/5 p-8 lg:p-10 transition-all duration-500 group-hover:border-white/15 group-hover:bg-[#1E1E1E] lg:-mr-3"
                            >
                                {/* Top accent line */}
                                <div
                                    className="h-0.5 w-10 rounded-full mb-8 transition-all duration-500 group-hover:w-16"
                                    style={{ backgroundColor: member.color }}
                                />

                                {/* Logo */}
                                <div className="h-9 mb-8">
                                    <Image
                                        src={member.logo}
                                        alt={member.name}
                                        width={110}
                                        height={36}
                                        className="h-full w-auto object-contain opacity-40 group-hover:opacity-70 transition-opacity duration-500 brightness-0 invert"
                                    />
                                </div>

                                {/* Role */}
                                <p
                                    className="text-[10px] tracking-[0.2em] uppercase mb-4"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        color: member.color,
                                    }}
                                >
                                    {member.role}
                                </p>

                                {/* Name */}
                                <h3
                                    className="text-white text-xl lg:text-2xl mb-4 leading-snug"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.name}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-white/30 text-sm leading-relaxed"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {member.description}
                                </p>

                                {/* Number */}
                                <p
                                    className="absolute top-6 right-8 text-white/5 leading-none"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "5rem",
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
