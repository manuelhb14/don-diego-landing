"use client";

import Image from "next/image";
import { motion } from "motion/react";

const services = [
    {
        id: 1,
        title: "Centro de rehabilitación",
        subtitle: "y tratamiento contra el dolor",
        description: "Espacios especializados con tecnología de vanguardia para recuperación física y manejo integral del dolor.",
        image: "/images/gallery/gallery-10.jpg",
    },
    {
        id: 2,
        title: "Estudios para el retiro",
        subtitle: "Senior Living",
        description: "Residencias diseñadas para una vida activa y digna, con atención personalizada y comunidad de apoyo.",
        image: "/images/gallery/gallery-12.jpg",
    },
    {
        id: 3,
        title: "30 departamentos",
        subtitle: "para familiares",
        description: "Espacios de hospedaje pensados para que las familias estén cerca de sus seres queridos durante su proceso de recuperación.",
        image: "/images/gallery/gallery-13.jpg",
    },
    {
        id: 4,
        title: "Zona de equipamiento",
        subtitle: "y amenidades",
        description: "Áreas comunes, jardines terapéuticos, alberca y espacios de esparcimiento integrados con la naturaleza.",
        image: "/images/gallery/gallery-14.JPG",
    },
];

export default function ServicesWellness() {
    return (
        <section id="servicios" className="bg-[#1F1D1B] text-[#FFF3E1] py-24 lg:py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-16">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#DEBEBF] uppercase mb-6"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Servicios]
                    </p>
                    <h2
                        className="text-[#DEBEBF] leading-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                        }}
                    >
                        Espacios para sanar
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="relative w-full aspect-[16/10] mb-6 overflow-hidden rounded-sm">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#DEBEBF]/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <span
                                    className="text-[#DEBEBF]/40 text-sm mt-1"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {String(service.id).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3
                                        className="text-[#DEBEBF] text-xl lg:text-2xl mb-1"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p
                                        className="text-[#DEBEBF]/70 text-sm lg:text-base mb-3"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {service.subtitle}
                                    </p>
                                    <p
                                        className="text-[#FFF3E1]/60 text-sm leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {service.description}
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