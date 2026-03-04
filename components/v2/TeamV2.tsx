"use client";

import Image from "next/image";
import { motion } from "motion/react";

const team = [
    {
        name: "Grupo Cimienta",
        role: "Desarrollo y Dirección General",
        description: "Más de 30 años de experiencia en el ciclo completo de desarrollo inmobiliario.",
        logo: "/logos/residencial.png",
    },
    {
        name: "Barragán Arquitectos",
        role: "Diseño Arquitectónico",
        description: "Arq. Luis Barragán Rivera — estética contemporánea enraizada en la identidad de SMA.",
        logo: "/logos/wellness.png",
    },
    {
        name: "Espacios Verdes / Arredarq",
        role: "Paisajismo y Sustentabilidad",
        description: "Arq. Eliseo Arredondo — fundador de la Sociedad de Arquitectos Paisajistas de México.",
        logo: "/logos/farm.png",
    },
];

export default function TeamV2() {
    return (
        <section id="equipo" className="bg-[#FFF3E1] py-24 lg:py-32">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 flex items-end justify-between gap-8"
                >
                    <div>
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            (El Equipo)
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                            }}
                        >
                            Maestros de su oficio.
                        </h2>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="group border-t border-[#AA7D69]/20 pt-8"
                        >
                            <div className="h-10 mb-6">
                                <Image
                                    src={member.logo}
                                    alt={member.name}
                                    width={120}
                                    height={40}
                                    className="h-full w-auto object-contain opacity-60 group-hover:opacity-80 transition-opacity"
                                />
                            </div>
                            <p
                                className="text-[#AA7D69] text-[10px] tracking-[0.2em] uppercase mb-3"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {member.role}
                            </p>
                            <h3
                                className="text-[#222] text-xl mb-3 leading-snug"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                {member.name}
                            </h3>
                            <p
                                className="text-[#222]/45 text-sm leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {member.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
