"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const highlights = [
    {
        id: 1,
        title: "Naturaleza y tranquilidad",
        description: "Un entorno de paz donde los jardines, el agua y el paisaje de la Presa Allende crean el ambiente ideal para la recuperación y el bienestar.",
    },
    {
        id: 2,
        title: "Atención personalizada",
        description: "Equipos médicos especializados y cuidados certificados que entienden que cada persona tiene necesidades únicas.",
    },
    {
        id: 3,
        title: "Vida en comunidad",
        description: "Espacios diseñados para la convivencia, actividades compartidas y la construcción de vínculos significativos.",
    },
    {
        id: 4,
        title: "Ubicación privilegiada",
        description: "A minutos de San Miguel de Allende, con acceso inmediato a servicios médicos, culturales y de ocio de primer nivel.",
    },
];

export default function HighlightsWellness() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

    return (
        <section ref={containerRef} className="relative bg-[#1F1D1B] overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
                    
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-16 lg:mb-20"
                        >
                            <p
                                className="text-[10px] tracking-[0.3em] text-[#DEBEBF] uppercase mb-6"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                [Nuestra filosofía]
                            </p>
                            <h2
                                className="text-[#DEBEBF] leading-tight max-w-xl"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                                }}
                            >
                                La calidad de vida se construye con calma, naturaleza, comunidad y atención real
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div className="h-px w-8 bg-[#DEBEBF]/40 mb-5 group-hover:w-16 transition-all duration-500" />
                                    <h3
                                        className="text-[#DEBEBF] text-lg lg:text-xl mb-2"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-[#FFF3E1]/60 text-sm leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm"
                        >
                            <motion.div style={{ y: imageY }} className="absolute inset-0 h-[110%]">
                                <Image
                                    src="/images/gallery/gallery-15.jpg"
                                    alt="Wellness Center"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B]/40 via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                                <p
                                    className="text-[#DEBEBF]/80 text-sm lg:text-base leading-relaxed italic"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    "Un paraíso natural con vistas abiertas hacia la Presa Allende"
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}