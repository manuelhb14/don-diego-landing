"use client";

import { motion } from "motion/react";

export default function HeroUbicacion() {
    return (
        <section className="relative flex h-[50vh] md:h-[60vh] min-h-[400px] w-full items-center justify-center overflow-hidden bg-[#fff8ed]">
            <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center mt-12 md:mt-16">
                <div className="overflow-hidden mb-6">
                    <p
                        className="text-[10px] sm:text-xs tracking-[0.3em] text-[#AA7D69] uppercase mb-6 sm:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [El Entorno]
                    </p>
                    <motion.h1
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#222222] uppercase"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 6vw, 4.5rem)",
                            letterSpacing: "0.2em",
                            lineHeight: 1.2,
                        }}
                    >
                        Ubicación
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-md"
                >
                    <p
                        className="text-[#222222]/80 text-xl font-medium leading-relaxed mb-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Conectado al vibrante corazón de la ciudad, pero resguardado en la tranquilidad de un santuario natural.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
