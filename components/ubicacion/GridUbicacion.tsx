"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";

const locations = [
    {
        id: "centro",
        title: "Centro Histórico",
        subtitle: "15 min",
        description: "El corazón vibrante de la ciudad, lleno de restaurantes, galerías, tiendas exclusivas y toda la cultura que hace famoso a San Miguel.",
        image: "/images/gallery/gallery-2.png",
    },
    {
        id: "fábrica",
        title: "Fábrica La Aurora",
        subtitle: "10 min",
        description: "Un centro de arte y diseño reconocido internacionalmente, albergado en un hermoso entorno industrial con decenas de galerías y estudios.",
        image: "/images/gallery/gallery-5.png",
    },
    {
        id: "mercados",
        title: "Mercados Orgánicos",
        subtitle: "5 min",
        description: "Conexión directa con los productores locales. Ingredientes frescos, pan artesanal y una comunidad unida en torno al bienestar.",
        image: "/images/gallery/gallery-10.jpg",
    },
    {
        id: "vinedos",
        title: "Viñedos Circundantes",
        subtitle: "20 min",
        description: "Campos majestuosos y bodegas vinícolas de primer nivel. Degustaciones al atardecer en los extraordinarios valles de la región.",
        image: "/images/gallery/gallery-4.png",
    }
];

export default function GridUbicacion() {
    const hasVisited = useHasVisited();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="entorno" className="bg-[#FFF3E1] py-12 md:py-24 px-6 md:px-12 lg:px-24 w-full relative">
            <div className="max-w-[1440px] mx-auto w-full">
                <div className="w-full mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl relative z-10"
                    >
                        <h2
                            className="text-[#222222] leading-none tracking-tight"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 5rem)",
                            }}
                        >
                            Lo Mejor de SMA <br />
                            <span className="italic text-[#8C7B6C]">A tu Alcance</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md md:mb-2 lg:mb-4 relative z-10"
                    >
                        <p
                            className="text-[#222222]/80 text-base md:text-lg leading-relaxed"
                            style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.05em" }}
                        >
                            Con una ubicación privilegiada, estarás rodeado de los principales atractivos de la región, conservando la tranquilidad del campo.
                        </p>
                    </motion.div>
                </div>

                <div className="relative flex flex-col md:flex-row gap-12 lg:gap-24 items-start w-full">
                    {/* Left: Text sections */}
                    <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col gap-12 md:gap-[30vh] md:pb-[30vh]">
                        {locations.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className={`flex flex-col gap-4 relative ${index === locations.length - 1 ? "pb-[30vh] md:pb-0" : ""}`}
                                initial={{ opacity: 0.3 }}
                                whileInView={{ opacity: 1 }}
                                onViewportEnter={() => setActiveIndex(index)}
                                viewport={{ margin: "-40% 0px -40% 0px", amount: 0.5, once: index === locations.length - 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="block md:hidden w-full aspect-[4/3] rounded-lg overflow-hidden relative mb-4 shadow-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-[#AA7D69]/10" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-px bg-[#AA7D69]/30 w-12 hidden md:block" />
                                    <h3
                                        className="text-[#AA7D69] text-sm md:text-md uppercase tracking-[0.2em] font-medium"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        A {item.subtitle}
                                    </h3>
                                </div>

                                <h4
                                    className="text-[#222222] text-3xl md:text-4xl leading-tight"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h4>

                                <p className="text-[#222222]/70 font-sans font-light text-base md:text-lg leading-relaxed max-w-sm mt-2">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Sticky Image Gallery (Desktop only) */}
                    <div className="hidden md:block w-[55%] lg:w-[60%] sticky top-[20vh] h-[60vh] rounded-xl overflow-hidden shadow-2xl group border border-[#AA7D69]/20">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={locations[activeIndex].image}
                                    alt={locations[activeIndex].title}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/10 to-transparent opacity-80" />
                                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                                    <div>
                                        <p className="text-[#E6E1D6]/80 tracking-[0.25em] text-[10px] uppercase mb-3" style={{ fontFamily: "var(--font-sans)" }}>
                                            Destino
                                        </p>
                                        <p className="text-white text-4xl leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                                            {locations[activeIndex].title}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" /></svg>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
