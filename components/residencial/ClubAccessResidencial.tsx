"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const gallery = [
    { src: "/babylon/clubhouse.webp", alt: "Clubhouse Don Diego" },
    { src: "/babylon/spa.webp", alt: "Spa y bienestar" },
    { src: "/babylon/restaurant.webp", alt: "Restaurante" },
] as const;

export default function ClubAccessResidencial() {
    return (
        <section
            aria-labelledby="club-access-heading"
            className="bg-[#2A2826] text-[#FFF3E1] py-14 lg:py-24 overflow-hidden"
        >
            <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-12">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl lg:max-w-none"
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [COMUNIDAD]
                        </p>
                        <h2
                            id="club-access-heading"
                            className="text-[#FFF3E1] leading-[1.08]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3.35rem)",
                            }}
                        >
                            Ser dueño es formar parte de la <span className="italic text-[#b76d4b]">comunidad</span>
                        </h2>
                        <p
                            className="mt-4 text-[#b76d4b]/95 italic"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
                            }}
                        >
                            El club como lugar de encuentro y vida compartida
                        </p>
                        <p
                            className="mt-6 text-[#FFF3E1]/75 text-base lg:text-[17px] leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                        >
                            No solo tienes acceso a los espacios: te integras a una comunidad de vecinos que comparten
                            el mismo entorno, el mismo cuidado y el mismo ritmo de vida. Participas del club como quien
                            pertenece—con voz, encuentros y una experiencia que se construye en conjunto.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mt-9"
                        >
                            <Link
                                href="/experiencias"
                                className="inline-block text-[#FFF3E1] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#b76d4b]/70 pb-1 hover:opacity-70 transition-opacity"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                EXPLORAR LAS EXPERIENCIAS
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, delay: 0.06 }}
                        className="w-full min-w-0"
                    >
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#FFF3E1]/[0.12] shadow-[0_24px_48px_rgba(0,0,0,0.35)] lg:aspect-[2.1/1]">
                                <Image
                                    src={gallery[0].src}
                                    alt={gallery[0].alt}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 42vw, 100vw"
                                    priority={false}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#FFF3E1]/[0.12]">
                                    <Image
                                        src={gallery[1].src}
                                        alt={gallery[1].alt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 21vw, 50vw"
                                    />
                                </div>
                                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#FFF3E1]/[0.12]">
                                    <Image
                                        src={gallery[2].src}
                                        alt={gallery[2].alt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 21vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
