"use client";

import Image from "next/image";
import { motion } from "motion/react";

const amenities = [
    {
        id: 1,
        title: "Casa Club",
        description: "Restaurante, cafeterías y barras de bar en distintas zonas. Business center.",
        image: "/images/gallery/gallery-5.png",
        className: "col-span-1 md:col-span-2 row-span-2 min-h-[400px] md:min-h-[600px]",
    },
    {
        id: 2,
        title: "Mercados Locales",
        description: "Espacio central para mercados de productos locales y actividades de comunidad.",
        image: "/images/gallery/gallery-6.png",
        className: "col-span-1 row-span-1 min-h-[300px]",
    },
    {
        id: 3,
        title: "Bienestar",
        description: "Alberca panorámica, spa, gimnasio, ludoteca y salón de usos múltiples.",
        image: "/images/gallery/gallery-7.png",
        className: "col-span-1 row-span-1 min-h-[300px]",
    },
    {
        id: 4,
        title: "Deportes",
        description: "Pádel y pickleball, jacuzzis, cicloruta, parques infantiles, pet garden.",
        image: "/images/gallery/gallery-10.jpg",
        className: "col-span-1 md:col-span-2 row-span-1 min-h-[400px]",
    },
];

export default function AmenitiesResidencial() {
    return (
        <section id="amenidades" className="bg-[#1F1D1B] text-[#FFF3E1] py-24 lg:py-32 overflow-hidden">
            <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-16">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 lg:mb-24 max-w-2xl"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#E1B19B] uppercase mb-6"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Actividades]
                    </p>
                    <h2
                        className="text-[#E1B19B] leading-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                        }}
                    >
                        Comunidad y Vida en Don Diego
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[minmax(300px,auto)]">
                    {amenities.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`group relative overflow-hidden bg-[#2A2826] border border-white/5 ${item.className}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            />

                            {/* Gradient Overlay for Text Legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B] via-[#1F1D1B]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                                <span
                                    className="text-[#E1B19B] text-sm font-bold tracking-widest mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    0{item.id}
                                </span>
                                <h3
                                    className="text-[#FFF3E1] text-2xl lg:text-3xl mb-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 will-change-transform"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-[#FFF3E1]/70 text-base md:text-sm lg:text-base leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Detail Box */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 p-8 lg:p-12 bg-[#E1B19B] flex items-center justify-between flex-wrap gap-8"
                >
                    <h3
                        className="text-[#1F1D1B] text-xl lg:text-2xl font-bold"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Diseño Peatonal
                    </h3>
                    <p
                        className="text-[#1F1D1B]/80 text-base font-medium max-w-2xl leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Interior 100% peatonal, sin autos visibles. Circulación vehicular periférica en desnivel con estacionamiento techado y acceso peatonal directo (2 cajones por vivienda).
                    </p>
                </motion.div>

            </div>
        </section>
    );
}