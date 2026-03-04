"use client";

import Image from "next/image";
import { motion } from "motion/react";

const stats = [
    { value: "364", unit: "", label: "Residencias privadas" },
    { value: "8", unit: " min", label: "Al Centro Histórico" },
    { value: "100", unit: "%", label: "Peatonal y cercano" },
    { value: "24/7", unit: "", label: "Concierge y seguridad" },
];

export default function ManifestoV2() {
    return (
        <section id="proyecto" className="relative bg-[#FFF3E1] overflow-hidden">
            {/* Top thin rule */}
            <div className="w-full h-px bg-[#AA7D69]/15" />

            {/* Main content grid */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14 pt-24 pb-0 lg:pt-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left column */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-10"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            (Acerca de)
                        </p>

                        <h2
                            className="text-[#222] leading-[1.05]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontStyle: "italic",
                                fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                            }}
                        >
                            Diseño atemporal.{" "}
                            <span className="not-italic text-[#AA7D69]">Vida consciente.</span>
                        </h2>

                        <div className="mt-10 space-y-5 max-w-lg">
                            <p
                                className="text-[#222]/60 text-base leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                San Miguel de Allende es Patrimonio de la Humanidad por la UNESCO,
                                reconocida internacionalmente por su arquitectura colonial, su vibrante
                                escena cultural y su clima primaveral.
                            </p>
                            <p
                                className="text-[#222]/60 text-base leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                Don Diego nace en las tierras de la antigua Hacienda de Don Diego,
                                construyendo un nuevo capítulo en armonía con la naturaleza y la comunidad.
                            </p>
                        </div>

                        <motion.a
                            href="#proyecto"
                            whileHover={{ x: 6 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="inline-flex items-center gap-3 mt-10 group"
                        >
                            <span
                                className="text-[11px] tracking-[0.2em] text-[#AA7D69] uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                Descubre el concepto
                            </span>
                            <span className="text-[#AA7D69] group-hover:translate-x-1 transition-transform">→</span>
                        </motion.a>
                    </motion.div>

                    {/* Right column — image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image
                                src="/images/location/san-miguel.png"
                                alt="San Miguel de Allende"
                                fill
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF3E1]/20 to-transparent" />
                        </div>
                        {/* Decorative accent line */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#E1B19B]/40" />
                    </motion.div>
                </div>
            </div>

            {/* Stats band */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14 mt-24 pb-28 lg:pb-36">
                <div className="h-px bg-[#AA7D69]/15 mb-16" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.12 }}
                        >
                            <div
                                className="text-[#222] leading-none mb-3"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(3.5rem, 6vw, 7rem)",
                                    fontWeight: 300,
                                }}
                            >
                                {s.value}
                                <span
                                    className="text-[#E1B19B]"
                                    style={{ fontSize: "0.35em" }}
                                >
                                    {s.unit}
                                </span>
                            </div>
                            <p
                                className="text-[#222]/35 text-xs tracking-wider uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
