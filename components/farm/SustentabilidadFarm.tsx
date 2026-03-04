"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function SustentabilidadFarm() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Subtly parallax the background image slower than the scroll
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    // Subtly parallax the central glass card faster than the scroll
    const cardY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

    return (
        <section id="sustentabilidad" ref={containerRef} className="relative w-full h-[120vh] min-h-[800px] overflow-hidden flex items-center justify-center bg-[#1F1D1B]">

            {/* Full Immersive Background Layer */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div style={{ y: imageY }} className="absolute inset-0 h-[150%] w-full">
                    <Image
                        src="/images/renders/farm.jpg"
                        alt="Organic Farm"
                        fill
                        className="object-cover object-center"
                        quality={100}
                    />
                </motion.div>
                {/* Dark overlay to ensure text legibility */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Central Glassmorphism Island */}
            <motion.div
                style={{ y: cardY }}
                className="relative z-10 w-full max-w-4xl px-6 md:px-12 lg:px-0 flex flex-col items-center justify-center"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-16 lg:p-20 shadow-2xl rounded-sm w-full text-center hover:bg-white/15 transition-colors duration-500">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2
                            className="text-[#FFF3E1] leading-tight mb-8 lg:mb-12"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 5rem)",
                            }}
                        >
                            Organic Farm <br className="hidden sm:block" />& Flowers
                        </h2>

                        <div className="space-y-6 lg:space-y-8 max-w-2xl mx-auto">
                            <p
                                className="text-[#FFF3E1]/90 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                El paisaje productivo del proyecto
                            </p>

                            <div className="h-px w-24 bg-[#D7D7AA]/40 mx-auto" />

                            <p
                                className="text-[#FFF3E1]/80 text-base md:text-lg lg:text-xl font-medium leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                Huertos orgánicos, frutales y flores de temporada. Produce para abastecer el ecosistema y mantenerlo vivo todo el año.
                            </p>
                            <p
                                className="text-[#FFF3E1]/80 text-base md:text-lg lg:text-xl font-medium leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                Una comunidad que consume lo que produce, conectada a los ciclos de la tierra.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

        </section>
    );
}