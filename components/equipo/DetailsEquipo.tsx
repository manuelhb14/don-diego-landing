"use client";

import { motion } from "motion/react";
import Image from "next/image";

const teamInfo = [
    {
        name: "Grupo Cimienta",
        role: "Desarrollo y Dirección General",
        description: "Uniendo más de 30 años de experiencia, Grupo Cimienta dirige el ciclo completo del desarrollo inmobiliario. Su enfoque garantiza rentabilidad y un profundo respeto por el entorno, desde la concepción del máster plan hasta la ejecución y administración estratégica.",
        logo: "/logos/CIMIENTA.png",
        color: "#AA7D69",
        index: "01"
    },
    {
        name: "Barragán Arquitectos",
        role: "Diseño Arquitectónico",
        description: "Bajo la dirección del Arq. Luis Barragán Rivera, el estudio fusiona una estética contemporánea enraizada en la identidad de San Miguel de Allende. Cada espacio es una interpretación del lujo sutil que se enhebra con el paisaje histórico y natural.",
        color: "#E1B19B",
        index: "02"
    },
    {
        name: "Espacios Verdes / Arredarq",
        role: "Paisajismo y Sustentabilidad",
        description: "Liderado por el Arq. Eliseo Arredondo, fundador de la Sociedad de Arquitectos Paisajistas de México, este equipo concibe la naturaleza como la protagonista. Respetan el ecosistema endémico integrando vida y flora autóctona en la experiencia residencial.",
        color: "#AA7D69",
        index: "03"
    },
    {
        name: "Artemisa Branding",
        role: "Identidad y Estrategia de Marca",
        description: "Artemisa Branding es un estudio creativo especializado en la creación de identidades visuales y estrategias de marca para proyectos inmobiliarios de alto nivel. Su enfoque se centra en la creación de marcas que reflejen la esencia del proyecto y conecten con su público objetivo.",
        color: "#E1B19B",
        index: "04"
    },
];

export default function DetailsEquipo() {
    return (
        <section id="equipo-details" className="bg-[#111111] py-16 md:py-32 px-6 md:px-12 lg:px-24 w-full relative">
            <div className="max-w-[1440px] mx-auto w-full">
                {/* Team list - Vertical Stack with large borders */}
                <div className="flex justify-center items-center flex-col w-full border-t border-[#AA7D69]/20">
                    {teamInfo.map((member, i) => (
                        <motion.div
                            key={member.name}
                            className="group flex flex-col md:flex-row w-full py-8 md:py-16 border-b border-[#AA7D69]/20 transition-colors duration-500 hover:bg-[#1A1A1A] cursor-default px-6 md:px-12 -mx-6 md:-mx-12 "
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Left Side: Number and Role */}
                            <div className="w-full md:w-1/3 flex flex-col justify-between mb-2 md:mb-0">
                                <div className="flex w-full justify-between items-center gap-6">
                                    <span
                                        className="text-[#AA7D69]/40 text-5xl lg:text-6xl font-light group-hover:text-[#AA7D69] transition-colors duration-500"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {member.index}
                                    </span>
                                    {/* Right Side: Logo Display */}
                                    {member.logo && (
                                        <div className="relative w-1 md:w-24 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-700 filter invert brightness-0">
                                            <Image
                                                src={member.logo}
                                                alt={member.name}
                                                fill
                                                className="object-contain object-left md:object-right"
                                            />
                                        </div>
                                    )}
                                    <div className="h-full w-px bg-[#AA7D69]/20 group-hover:bg-[#AA7D69]/60 transition-colors duration-500 hidden md:block" />
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
                                    className="text-[#E6E1D6] text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 lg:mb-6 group-hover:text-white transition-colors duration-500"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.name}
                                </h3>
                                <p
                                    className="text-[#E6E1D6]/60 text-sm md:text-base leading-relaxed max-w-xl group-hover:text-[#E6E1D6]/90 transition-colors duration-500"
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
