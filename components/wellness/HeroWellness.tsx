"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroWellness() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} className="relative flex flex-col lg:flex-row h-dvh min-h-[700px] w-full overflow-hidden bg-[#1F1D1B]">

            {/* Mobile: Full background image */}
            <div className="lg:hidden absolute inset-0">
                <motion.div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ y: imgY }}
                >
                    <Image
                        src="/images/gallery/gallery-3.png"
                        alt="Wellness Center"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#1F1D1B]/60" />
                </motion.div>
            </div>

            {/* Left: Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center px-6 md:px-8 lg:px-16 text-center w-full lg:w-1/2 h-full bg-[#1F1D1B]"
                style={{ y: contentY }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-sm tracking-[0.3em] text-[#DEBEBF] uppercase mb-6 lg:mb-8"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    [CENTRO DE BIENESTAR]
                </motion.p>

                <div className="overflow-hidden">
                    <img src="/logos/wellness.png" alt="Logo Wellness" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8 lg:mt-10 max-w-md"
                >
                    <p
                        className="text-[#DEBEBF]/90 text-lg lg:text-xl leading-relaxed mb-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Bienestar integral y manejo del dolor
                    </p>
                    <p
                        className="text-[#FFF3E1]/70 text-sm lg:text-base leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Creemos que la calidad de vida se construye con calma,
                        naturaleza, comunidad y atención real
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-10 lg:mt-12"
                >
                    <a
                        href="#servicios"
                        className="inline-flex items-center justify-center gap-4 group"
                    >
                        <span className="h-px w-8 bg-[#DEBEBF]/40 group-hover:w-12 transition-all duration-500" />
                        <span
                            className="text-[11px] tracking-[0.2em] text-[#DEBEBF] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Conocer más
                        </span>
                        <span className="h-px w-8 bg-[#DEBEBF]/40 group-hover:w-12 transition-all duration-500" />
                    </a>
                </motion.div>
            </motion.div>

            {/* Desktop: Right side image */}
            <div className="hidden lg:block relative w-1/2 h-full overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-[120%]"
                    style={{ y: imgY }}
                >
                    <Image
                        src="/images/gallery/gallery-3.png"
                        alt="Wellness Center"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </motion.div>
            </div>

            {/* Bottom location tag */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-6 left-6 lg:bottom-10 lg:left-16 z-20"
            >
                <p
                    className="text-sm text-[#DEBEBF]/70"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    A minutos de San Miguel de Allende
                </p>
            </motion.div>
        </section>
    );
}