"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroPresa() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} className="relative flex flex-col lg:flex-row h-dvh min-h-[700px] w-full overflow-hidden bg-[#1F1D1B]">

            <div className="lg:hidden absolute inset-0">
                <motion.div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ y: imgY }}
                >
                    <Image
                        src="/images/renders/presa-1.png"
                        alt="Presa de la Cantera"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#1F1D1B]/60" />
                </motion.div>
            </div>

            <motion.div
                className="relative z-10 flex flex-col items-center justify-center px-6 md:px-8 lg:px-16 text-center w-full lg:w-1/2 h-full bg-[#1F1D1B]"
                style={{ y: contentY }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-sm tracking-[0.3em] text-[#C8D7E6] uppercase mb-6 lg:mb-8"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    [VIDA JUNTO AL AGUA]
                </motion.p>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#C8D7E6] leading-none tracking-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            lineHeight: 0.9,
                        }}
                    >
                        Presa de la
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#C8D7E6] leading-none tracking-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            lineHeight: 0.9,
                        }}
                    >
                        Cantera
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8 lg:mt-10 max-w-md"
                >
                    <p
                        className="text-[#C8D7E6]/90 text-lg lg:text-xl leading-relaxed mb-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Espacio público/privado junto al agua
                    </p>
                    <p
                        className="text-[#FFF3E1]/70 text-sm lg:text-base leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Naturaleza, comunidad y vida social integradas en un frente lacustre único.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-10 lg:mt-12"
                >
                    <a
                        href="#espacios"
                        className="inline-flex items-center justify-center gap-4 group"
                    >
                        <span className="h-px w-8 bg-[#C8D7E6]/40 group-hover:w-12 transition-all duration-500" />
                        <span
                            className="text-[11px] tracking-[0.2em] text-[#C8D7E6] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Conocer más
                        </span>
                        <span className="h-px w-8 bg-[#C8D7E6]/40 group-hover:w-12 transition-all duration-500" />
                    </a>
                </motion.div>
            </motion.div>

            <div className="hidden lg:block relative w-1/2 h-full overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-[120%]"
                    style={{ y: imgY }}
                >
                    <Image
                        src="/images/renders/presa-1.png"
                        alt="Presa de la Cantera"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-6 left-6 lg:bottom-10 lg:left-16 z-20"
            >
                <p
                    className="text-sm text-[#C8D7E6]/70"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    San Miguel de Allende, Guanajuato
                </p>
            </motion.div>
        </section>
    );
}