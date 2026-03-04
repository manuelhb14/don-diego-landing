"use client";

import Image from "next/image";
import { motion } from "motion/react";

const team = [
    {
        name: "Grupo Cimienta",
        role: "Desarrollo y Dirección General",
        description: "Más de 30 años de experiencia en el ciclo completo de desarrollo inmobiliario. Urbanización, vivienda y máxima eficiencia.",
        logo: "/logos/residencial.png",
        years: "30+",
    },
    {
        name: "Barragán Arquitectos",
        role: "Diseño Arquitectónico",
        description: "Arq. Luis Barragán Rivera — estética contemporánea enraizada en la identidad arquitectónica de San Miguel de Allende.",
        logo: "/logos/wellness.png",
        years: "",
    },
    {
        name: "Espacios Verdes / Arredarq",
        role: "Paisajismo y Sustentabilidad",
        description: "Arq. Eliseo Arredondo, formado en Versalles. Fundador de la Sociedad de Arquitectos Paisajistas de México.",
        logo: "/logos/farm.png",
        years: "",
    },
];

export default function TeamV4() {
    return (
        <section id="equipo" className="bg-white py-24 lg:py-36 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 lg:mb-20 max-w-2xl"
                >
                    <p className="text-[10px] font-bold tracking-[0.25em] text-clay/50 uppercase mb-4">
                        El Equipo
                    </p>
                    <h2
                        className="font-serif text-dark leading-[1.05]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                    >
                        Respaldado por{" "}
                        <em className="text-clay">maestros de su oficio.</em>
                    </h2>
                </motion.div>

                {/* Team cards — horizontal scroll on mobile, grid on desktop */}
                <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory lg:snap-none">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            className="flex-shrink-0 w-[85vw] lg:w-auto snap-center group"
                        >
                            <div className="bg-cream border border-clay/8 p-8 lg:p-10 h-full transition-all duration-500 group-hover:border-clay/20 group-hover:shadow-[0_8px_30px_rgba(170,125,105,0.06)]">
                                {/* Top row: logo + years badge */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className="h-10">
                                        <Image
                                            src={member.logo}
                                            alt={member.name}
                                            width={100}
                                            height={40}
                                            className="h-full w-auto object-contain opacity-50 group-hover:opacity-75 transition-opacity duration-500"
                                        />
                                    </div>
                                    {member.years && (
                                        <div className="bg-dark text-white text-[10px] font-bold tracking-wider px-3 py-1.5 uppercase">
                                            {member.years} años
                                        </div>
                                    )}
                                </div>

                                {/* Role */}
                                <p className="text-[10px] font-bold tracking-[0.18em] text-clay uppercase mb-3">
                                    {member.role}
                                </p>

                                {/* Name */}
                                <h3 className="font-serif text-dark text-xl lg:text-2xl mb-4 leading-snug">
                                    {member.name}
                                </h3>

                                {/* Divider */}
                                <div className="h-px w-full bg-clay/10 mb-4" />

                                {/* Description */}
                                <p className="text-dark/40 text-sm leading-relaxed">
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
