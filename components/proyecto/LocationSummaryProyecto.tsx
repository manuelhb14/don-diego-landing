"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";

export default function LocationSummaryProyecto() {
    const hasVisited = useHasVisited();

    return (
        <section className="relative bg-[#1F1D1B] w-full py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                {/* Left: Image */}
                <motion.div
                    initial={hasVisited ? false : { opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full md:w-1/3 relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm group"
                >
                    <Image
                        src="/images/gallery/gallery-13.jpg"
                        alt="San Miguel de Allende"
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[#AA7D69]/10 mix-blend-multiply" />
                </motion.div>

                {/* Right: Text */}
                <motion.div
                    initial={hasVisited ? false : { opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-2/3 flex flex-col items-start"
                >
                    <p
                        className="text-[10px] sm:text-xs tracking-[0.3em] text-[#AA7D69] uppercase mb-6 sm:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Ubicación]
                    </p>

                    <h2
                        className="text-[#E6E1D6] leading-none mb-8 lg:mb-12 tracking-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 5vw, 4.5rem)",
                        }}
                    >
                        El corazón de <br />
                        <span className="italic text-[#8C7B6C]">México</span>
                    </h2>

                    <p className="text-[#E6E1D6]/70 leading-relaxed text-base lg:text-lg font-sans font-light mb-12 max-w-md">
                        A solo diez minutos del vibrante centro histórico de San Miguel de Allende.
                        Don Diego ofrece un refugio de paz y privacidad, manteniendo una conexión íntima
                        con una de las ciudades más cautivadoras del mundo.
                    </p>

                    <Link
                        href="/location" /* Note: Replace with actual location link when ready */
                        className="inline-flex items-center gap-4 group cursor-pointer"
                    >
                        <span
                            className="text-[11px] tracking-[0.2em] text-[#D7D7AA] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Explorar Entorno
                        </span>
                        <span className="w-8 h-[1px] bg-[#D7D7AA]/40 group-hover:w-16 group-hover:bg-[#D7D7AA] transition-all duration-500" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
