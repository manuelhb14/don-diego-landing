"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Footprints, BookOpen, Trees } from "lucide-react";

const highlights = [
    {
        icon: Footprints,
        title: "Rutas entre cultivos",
        text: "Andadores que atraviesan hileras y bancales para ver de cerca el trabajo diario del huerto.",
    },
    {
        icon: BookOpen,
        title: "Lectura del paisaje",
        text: "Cada recorrido invita a entender variedades, riego y cosecha en el contexto del proyecto.",
    },
    {
        icon: Trees,
        title: "Estaciones y calendario",
        text: "Los paseos cambian con el año: brotes, floración y cosecha marcan qué ver en cada visita.",
    },
] as const;

const IMAGES = [
    {
        src: "/babylon/huerto.webp",
        alt: "Huertos y senderos en Don Diego",
    },
    {
        src: "/babylon/tranquilidad.webp",
        alt: "Paisaje y caminos del entorno",
    },
    {
        src: "/babylon/tierra-2.webp",
        alt: "Detalle del suelo y los cultivos",
    },
] as const;

export default function PaseosHuertosFarm() {
    return (
        <section
            id="paseos-huertos"
            aria-labelledby="paseos-huertos-heading"
            className="relative overflow-hidden border-t border-[#1F1D1B]/[0.06] bg-[#FFF8ED] text-[#1a1917] py-16 lg:py-24"
        >
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className="mb-10 lg:mb-14"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-12 xl:gap-16">
                        <div className="min-w-0 max-w-3xl lg:max-w-[min(100%,52%)]">
                            <p
                                className="mb-8 text-[10px] tracking-[0.3em] text-[#9B5C6E]/85 uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                [PASEOS POR LOS HUERTOS]
                            </p>
                            <h2
                                id="paseos-huertos-heading"
                                className="tracking-tight text-[#1a1917] leading-[1.1]"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(2.75rem, 4.75vw, 4.25rem)",
                                }}
                            >
                                El terreno
                                <br />
                                <span className="italic text-[#8B4A5E]">como recorrido</span>
                            </h2>
                        </div>
                        <p
                            className="ml-auto w-full max-w-[350px] text-right font-serif text-base lg:text-lg font-normal leading-[1.8] tracking-[0.01em] text-[#222]/80 lg:pt-3"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Los huertos se recorren a pie: un circuito pensado para vivir la producción desde adentro,
                            con vistas abiertas al paisaje y paradas donde el cultivo cuenta su propia historia.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-4"
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11] lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:min-h-[min(56vh,540px)]">
                        <Image
                            src={IMAGES[0].src}
                            alt={IMAGES[0].alt}
                            fill
                            className="object-cover object-[center_40%]"
                            sizes="(min-width: 1024px) 58vw, 100vw"
                        />
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFF8ED]/15 via-transparent to-transparent"
                            aria-hidden
                        />
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden shadow-[0_16px_40px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/[0.06] sm:aspect-[16/11] lg:col-span-5 lg:row-start-1 lg:aspect-auto lg:min-h-0">
                        <Image
                            src={IMAGES[1].src}
                            alt={IMAGES[1].alt}
                            fill
                            className="object-cover object-center"
                            sizes="(min-width: 1024px) 38vw, 100vw"
                        />
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden shadow-[0_16px_40px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/[0.06] sm:aspect-[16/11] lg:col-span-5 lg:row-start-2 lg:aspect-auto lg:min-h-0">
                        <Image
                            src={IMAGES[2].src}
                            alt={IMAGES[2].alt}
                            fill
                            className="object-cover object-[center_35%]"
                            sizes="(min-width: 1024px) 38vw, 100vw"
                        />
                    </div>
                </motion.div>

                <motion.ul
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-8 grid grid-cols-1 gap-8 border-t border-[#1a1917]/10 pt-4 sm:grid-cols-2 sm:gap-x-10 lg:mt-12 lg:grid-cols-3 lg:gap-x-0 lg:gap-y-8 lg:pt-2"
                >
                    {highlights.map(({ icon: Icon, title, text }, i) => (
                        <li
                            key={title}
                            className={`flex flex-col gap-3 lg:pl-4 ${i > 0 ? "lg:border-l lg:border-[#1a1917]/10" : ""}`}
                        >
                            <div className="flex flex-row items-center gap-3 pr-3 sm:pr-4">
                                <p
                                    className="min-w-0 flex-1 text-lg font-medium leading-snug text-[#1a1917] sm:text-xl"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {title}
                                </p>
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1a1917]/10 bg-white/80 text-[#9B5C6E] shadow-sm">
                                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
                                </span>
                            </div>
                            <p
                                className="text-sm leading-relaxed text-[#1a1917]/70"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {text}
                            </p>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
