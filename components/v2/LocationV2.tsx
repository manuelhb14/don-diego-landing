"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const distances = [
    { time: "8", unit: "min", place: "Centro Histórico de SMA" },
    { time: "10", unit: "min", place: "Fábrica La Aurora" },
    { time: "5", unit: "min", place: "Mercados Orgánicos" },
    { time: "~2", unit: "hrs", place: "Querétaro" },
];

export default function LocationV2() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    return (
        <section id="ubicacion" ref={ref} className="bg-white overflow-hidden">

            {/* Top content band */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14 pt-24 pb-16 lg:pt-32 lg:pb-20">

                {/* Section label + address */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-5"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            (Ubicación)
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 7vw, 8rem)",
                            }}
                        >
                            Cerca de todo.
                            <br />
                            <em className="text-[#AA7D69]">Lejos de lo común.</em>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:text-right lg:max-w-xs"
                    >
                        <p
                            className="text-[#222]/40 text-sm leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Cerrada del Trébol, Carretera Celaya – Dolores Hidalgo.
                            <br />
                            San Miguel de Allende, Guanajuato.
                        </p>
                        <p
                            className="mt-4 text-sm leading-relaxed"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontStyle: "italic",
                                color: "#AA7D69",
                            }}
                        >
                            Colinda con la Presa Ignacio Allende y la Presa La Cantera.
                        </p>
                    </motion.div>
                </div>

                {/* Distance ticker row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-[#AA7D69]/15 pt-10">
                    {distances.map((d, i) => (
                        <motion.div
                            key={d.place}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-baseline gap-1 mb-2">
                                <span
                                    className="text-[#222] leading-none"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "clamp(2.5rem, 4vw, 4.5rem)",
                                        fontWeight: 300,
                                    }}
                                >
                                    {d.time}
                                </span>
                                <span
                                    className="text-[#AA7D69] text-base"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {d.unit}
                                </span>
                            </div>
                            <p
                                className="text-[#222]/40 text-xs tracking-wide leading-snug"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {d.place}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Full-width aerial image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full overflow-hidden"
                style={{ height: "clamp(320px, 55vw, 720px)" }}
            >
                <motion.div className="absolute inset-0 w-full h-[115%] -top-[7.5%]" style={{ y: imgY }}>
                    <Image
                        src="/images/location/aerial.png"
                        alt="Vista aérea Don Diego — San Miguel de Allende"
                        fill
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                </motion.div>

                {/* Floating label overlay */}
                <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10">
                    <div className="bg-[#FFF3E1]/80 backdrop-blur-sm px-4 py-2.5">
                        <p
                            className="text-[10px] tracking-[0.2em] text-[#AA7D69] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            San Miguel de Allende
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
