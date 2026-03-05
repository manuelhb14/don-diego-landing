"use client";

import { motion } from "motion/react";

export default function HeroEquipo() {
    return (
        <section className="relative flex h-[60vh] md:h-[70vh] min-h-[500px] w-full items-center justify-center overflow-hidden bg-[#fff8ed]">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/gallery/gallery-6.jpg')] bg-cover bg-center mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff8ed] via-transparent to-[#fff8ed] opacity-80" />

            <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center mt-12 md:mt-16">
                <div className="overflow-hidden mb-6">
                    <p
                        className="text-[10px] sm:text-xs tracking-[0.3em] text-[#AA7D69] uppercase mb-6 sm:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [El Equipo]
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
                        Visión y<br />
                        <span className="text-[#8C7B6C] italic">Maestría</span>
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-xl"
                >
                    <p
                        className="text-[#222222]/80 text-xl font-medium leading-relaxed mb-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Un conjunto de mentes excepcionales trabajando en sintonía para dar vida a un santuario residencial sin precedentes en San Miguel de Allende.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
