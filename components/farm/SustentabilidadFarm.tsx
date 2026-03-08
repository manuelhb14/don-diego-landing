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

    // Parallax layers for images
    const imageY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const imageY2 = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    return (
        <section id="sustentabilidad" ref={containerRef} className="relative w-full py-32 lg:py-48 overflow-hidden bg-[#1F1D1B]">

            <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-16 flex flex-col lg:flex-row relative">

                {/* Left Side: Editorial Typography */}
                <motion.div
                    style={{ y: textY }}
                    className="w-full lg:w-[45%] flex flex-col justify-center z-20 pt-10 lg:pt-32 pr-0 lg:pr-12"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#DEBEBF] uppercase mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Filosofía Cíclica]
                    </p>

                    <h2
                        className="text-[#DEBEBF] leading-[1.1] mb-10 tracking-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                        }}
                    >
                        El paisaje<br />
                        <span className="italic opacity-80">productivo</span><br />
                        del proyecto
                    </h2>

                    <div className="space-y-8 max-w-md">
                        <p
                            className="text-[#FFF3E1]/80 text-lg lg:text-xl font-medium leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Huertos orgánicos, frutales y flores de temporada. Produce para abastecer el ecosistema y mantenerlo vivo todo el año.
                        </p>

                        <div className="h-px w-24 bg-[#DEBEBF]/30 hidden lg:block" />

                        <p
                            className="text-[#FFF3E1]/60 text-base lg:text-lg leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Una comunidad que consume lo que produce, conectada a los ciclos de la tierra.
                        </p>
                    </div>
                </motion.div>

                {/* Right Side: Parallax Image Grid */}
                <div className="w-full lg:w-[55%] relative h-[600px] lg:h-[900px] mt-24 lg:mt-0">

                    {/* Main Image Layer */}
                    <motion.div
                        style={{ y: imageY1 }}
                        className="absolute right-0 top-0 w-[80%] lg:w-[70%] h-[70%] lg:h-[80%] z-10 overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/renders/farm.jpg"
                            alt="The Farm"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-1000"
                        />
                    </motion.div>

                    {/* Offset Accelerated Image Layer */}
                    <motion.div
                        style={{ y: imageY2 }}
                        className="absolute left-0 bottom-0 lg:bottom-10 w-[60%] lg:w-[50%] h-[50%] lg:h-[55%] z-20 overflow-hidden shadow-2xl border-4 lg:border-8 border-[#1F1D1B]"
                    >
                        <Image
                            src="/images/gallery/gallery-4.png"
                            alt="Crops"
                            fill
                            className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-1000"
                        />
                    </motion.div>

                    {/* Decorative minimalist shapes */}
                    <div className="absolute top-20 right-[75%] lg:right-[65%] w-32 h-32 border border-[#DEBEBF]/10 rounded-full hidden md:block" />
                    <div className="absolute bottom-40 -right-10 w-64 h-64 border border-[#DEBEBF]/5 rounded-full z-0 hidden lg:block" />
                </div>

            </div>
        </section>
    );
}