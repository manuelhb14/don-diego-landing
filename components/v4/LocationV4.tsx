"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const distances = [
    { time: "8", unit: "min", place: "Centro Histórico de SMA", icon: "🏛" },
    { time: "10", unit: "min", place: "Fábrica La Aurora", icon: "🎨" },
    { time: "5", unit: "min", place: "Mercados Orgánicos", icon: "🌿" },
    { time: "~2", unit: "hrs", place: "Querétaro", icon: "✈" },
];

export default function LocationV4() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <section id="ubicacion" ref={ref} className="relative overflow-hidden">
            {/* Full-bleed aerial image */}
            <div className="relative h-[60vh] lg:h-[75vh] overflow-hidden">
                <motion.div className="absolute inset-0 w-full h-[115%] -top-[7.5%]" style={{ y: imgY }}>
                    <Image
                        src="/images/location/aerial.png"
                        alt="Vista aérea Don Diego — San Miguel de Allende"
                        fill
                        className="object-cover object-center"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-cream/80" />

                {/* Floating headline */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center px-6"
                    >
                        <h2
                            className="font-serif text-white leading-[1.05] drop-shadow-lg"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
                        >
                            Cerca de todo.
                            <br />
                            <em className="text-terracotta">Lejos de lo común.</em>
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Info band on cream */}
            <div className="bg-cream py-16 lg:py-24">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
                        {/* Left: Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-[10px] font-bold tracking-[0.25em] text-clay/50 uppercase mb-6">
                                Ubicación
                            </p>
                            <p className="text-dark/45 text-[15px] leading-relaxed mb-3">
                                Cerrada del Trébol, Carretera Celaya – Dolores Hidalgo.
                                <br />
                                San Miguel de Allende, Guanajuato.
                            </p>
                            <p className="font-serif italic text-clay text-sm">
                                Colinda con la Presa Ignacio Allende y la Presa La Cantera.
                            </p>
                        </motion.div>

                        {/* Right: Distance cards */}
                        <div className="grid grid-cols-2 gap-5">
                            {distances.map((d, i) => (
                                <motion.div
                                    key={d.place}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="bg-white border border-clay/8 p-5 lg:p-6 group hover:border-clay/20 transition-colors duration-300"
                                >
                                    <span className="text-lg mb-3 block">{d.icon}</span>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span
                                            className="font-serif text-dark leading-none"
                                            style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
                                        >
                                            {d.time}
                                        </span>
                                        <span className="font-serif text-clay text-sm">{d.unit}</span>
                                    </div>
                                    <p className="text-dark/35 text-xs font-bold tracking-wide uppercase">
                                        {d.place}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
