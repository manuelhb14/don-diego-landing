"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
// imports for unused commented code kept temporarily
import { useRef, useEffect, useState } from "react";

export default function ManifestoV3() {
    return (
        <section id="proyecto" className="relative overflow-hidden">
            {/* Part 1: Design Section (Arraigado) */}
            <div className="py-24 px-6 md:px-12 lg:px-24 bg-[#F5F2EB] dark:bg-[#1F1D1B] relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-10">
                        <div className="w-16 h-[1px] bg-[#8C7B6C] mb-4"></div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl text-[#2D2A26] dark:text-[#E6E1D6] leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                            Arraigado en <br /><span className="italic text-[#8C7B6C]">San Miguel</span>
                        </h3>
                        <div className="space-y-6 text-xl md:text-2xl text-stone-600 dark:text-stone-400" style={{ fontFamily: "var(--font-serif)" }}>
                            <p className="leading-relaxed">Con la Tierra.</p>
                            <p className="leading-relaxed ml-8 md:ml-12">Con la Comunidad.</p>
                            <p className="leading-relaxed ml-16 md:ml-24">Con uno Mismo.</p>
                        </div>
                        <div className="pt-8 text-sm md:text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-md" style={{ fontFamily: "var(--font-sans)" }}>
                            <p>
                                Don Diego ofrece un santuario donde la arquitectura se encuentra con la naturaleza.
                                Diseñado para quienes buscan una conexión más profunda con su entorno, hemos creado
                                espacios atemporales, a la medida y profundamente pacíficos.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-7 relative h-[600px] w-full">
                        <div className="absolute top-0 right-0 w-[85%] h-[90%] overflow-hidden rounded-sm shadow-2xl">
                            <img
                                alt="Detalle arquitectónico de muro de piedra y plantas"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKG1X-MNDHlA-4Z7f9rkXW-iSYLlbqe4hCqYbNTycq8YijLj4ScBLxyZzNSfVmgTKVzcJgfezuNkCA8gp_DPg7qQK_DtNtZ047rQuqYTM2NxLqLpK0rYRayFemS6hKIqK99CxqmEJ1WJpRgRuCHyuRnEdl1wIU8mZCr7pneFu8FULkL00E3yyO6sHV2RTtPCgFxC_MPyf7GRWDUANA32UsYpDiQib9PUp4FVwhMG1F5PkZ2vKS-_KR7rESUTPElUUgG89x1OplSF-h"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-[45%] h-[50%] overflow-hidden rounded-sm shadow-xl border-8 border-[#F5F2EB] dark:border-[#1F1D1B]">
                            <img
                                alt="Primer plano de cerámica artesanal de barro"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtCylWR-K5Fy27jG7S08cbchxuL6RNUadmMZvBq3u-xYjOyBMWDyv-6DIguKpgS94OAStOKrVA7L5xDqM_oeERgOlFK0mojL5rlPVHsmzrjM125q3bzANEH_1fUHZXeJ9_12gc7uaR6qBCppjqHVGrKVFqAvs4LR1uUvEMNIbZNqC4JDpET07q6Cn-15Qvw5LNLB8FD7-noKhxI7dP1_ZzhzQJwwAw64bvT-WvTdjIXLHPeIAFjaIS471wiL97y8f-s1HIs7gzUkmu"
                            />
                        </div>
                        <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[#8C7B6C] opacity-50"></div>
                    </div>
                </div>
            </div>


            {/* Part 3: Full-bleed image with overlaid text */}
            {/* <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
                <Image
                    src="/images/location/san-miguel.png"
                    alt="San Miguel de Allende"
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center px-6"
                    >
                        <p
                            className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Patrimonio de la Humanidad · UNESCO
                        </p>
                        <h3
                            className="text-white leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.5rem, 6vw, 7rem)",
                            }}
                        >
                            San Miguel de Allende
                        </h3>
                    </motion.div>
                </div>
            </div> */}
        </section>
    );
}
