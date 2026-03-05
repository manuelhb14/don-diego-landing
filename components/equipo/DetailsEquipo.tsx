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
        logo: "/logos/BARRAGAN.png",
        color: "#E1B19B",
        index: "02"
    },
    {
        name: "Espacios Verdes / Arredarq",
        role: "Paisajismo y Sustentabilidad",
        description: "Liderado por el Arq. Eliseo Arredondo, fundador de la Sociedad de Arquitectos Paisajistas de México, este equipo concibe la naturaleza como la protagonista. Respetan el ecosistema endémico integrando vida y flora autóctona en la experiencia residencial.",
        logo: "/logos/ARREDARQ.png",
        color: "#AA7D69",
        index: "03"
    },
];

export default function DetailsEquipo() {
    return (
        <section id="equipo-details" className="bg-[#111111] py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full relative">
            <div className="max-w-[1440px] mx-auto w-full">

                <div className="w-full flex flex-col md:flex-row justify-between items-end gap-12 mb-16 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-left md:text-right w-full md:w-auto ml-auto order-1 md:order-2 flex flex-col items-start md:items-end"
                    >
                        <h2
                            className="text-[#E6E1D6] leading-snug tracking-tight mb-8"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            }}
                        >
                            "Cada elemento del diseño es un tributo a la historia y al paisaje, creado con precisión artesanal por nuestro equipo."
                        </h2>
                        <div className="h-px w-24 bg-[#AA7D69]/50 ml-0 md:ml-auto"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-[35%] lg:w-[30%] aspect-[4/3] relative rounded-xl overflow-hidden order-2 md:order-1 hidden md:block"
                    >
                        <Image
                            src="/images/gallery/gallery-7.jpg"
                            alt="Equipo Don Diego"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#AA7D69]/10" />
                    </motion.div>

                    {/* Mobile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full aspect-[4/3] relative rounded-xl overflow-hidden order-3 block md:hidden mt-4"
                    >
                        <Image
                            src="/images/gallery/gallery-7.jpg"
                            alt="Equipo Don Diego"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#AA7D69]/10" />
                    </motion.div>
                </div>

                {/* Team list - Vertical Stack with large borders */}
                <div className="flex flex-col w-full border-t border-[#AA7D69]/20">
                    {teamInfo.map((member, i) => (
                        <motion.div
                            key={member.name}
                            className="group flex flex-col md:flex-row w-full py-12 md:py-16 border-b border-[#AA7D69]/20 transition-colors duration-500 hover:bg-[#1A1A1A] cursor-default px-6 md:px-12 -mx-6 md:-mx-12 rounded-2xl"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Left Side: Number and Role */}
                            <div className="w-full md:w-1/3 flex flex-col justify-between mb-8 md:mb-0">
                                <div className="flex items-center gap-6">
                                    <span
                                        className="text-[#AA7D69]/40 text-4xl md:text-5xl lg:text-6xl font-light group-hover:text-[#AA7D69] transition-colors duration-500"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {member.index}
                                    </span>
                                    <div className="h-full w-px bg-[#AA7D69]/20 group-hover:bg-[#AA7D69]/60 transition-colors duration-500 hidden md:block" />
                                </div>

                                <div className="mt-8 md:mt-auto">
                                    <p
                                        className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2"
                                        style={{ fontFamily: "var(--font-sans)", color: member.color }}
                                    >
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                            {/* Middle Side: Name and Description */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-12">
                                <h3
                                    className="text-[#E6E1D6] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 group-hover:text-white transition-colors duration-500"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {member.name}
                                </h3>
                                <p
                                    className="text-[#E6E1D6]/60 text-base md:text-lg leading-relaxed max-w-xl group-hover:text-[#E6E1D6]/90 transition-colors duration-500"
                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                                >
                                    {member.description}
                                </p>
                            </div>

                            {/* Right Side: Logo Display */}
                            <div className="w-full md:w-1/6 flex items-center justify-start md:justify-end mt-8 md:mt-0">
                                <div className="relative w-32 md:w-40 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-700 filter invert brightness-0">
                                    <Image
                                        src={member.logo}
                                        alt={member.name}
                                        fill
                                        className="object-contain object-left md:object-right"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
