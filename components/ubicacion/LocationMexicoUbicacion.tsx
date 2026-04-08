"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Compass, Mountain, MapPinned } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LocationMexicoUbicacion() {
    const t = useTranslations("pages.ubicacion.locationMexico");
    const highlights = [
        {
            title: t("highlights.bajio.title"),
            body: t("highlights.bajio.body"),
            icon: Compass,
        },
        {
            title: t("highlights.humanScale.title"),
            body: t("highlights.humanScale.body"),
            icon: MapPinned,
        },
        {
            title: t("highlights.mexico.title"),
            body: t("highlights.mexico.body"),
            icon: Mountain,
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-[#FFF3E1] text-[#222222]">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 lg:gap-12 px-6 py-10 md:px-10 md:py-24">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center md:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#AA7D69]/60"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
                        >
                            {t("titleLine1")}
                        </h2>
                        <h2
                            className="text-[#AA7D69]/90 italic leading-none"
                            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
                        >
                            {t("titleLine2")}
                        </h2>
                    </motion.div>

                    <motion.p
                        className="max-w-xl text-base font-medium leading-relaxed text-[#222]/80 md:text-xl lg:justify-self-center"
                        style={{ fontFamily: "var(--font-serif)" }}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        {t("intro")}
                    </motion.p>
                </div>

                <motion.div
                    className="relative overflow-hidden rounded-[36px] border border-[#AA7D69]/12 bg-[#F6E7D3] shadow-[0_25px_80px_-30px_rgba(170,125,105,0.35)]"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.12 }}
                >
                    <div className="relative aspect-square lg:aspect-[16/9] w-full">
                        <Image
                            src="/babylon/map.webp"
                            alt={t("imageAlt")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 1280px"
                            priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/55 via-transparent to-transparent" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                        {/* <p className="text-[10px] uppercase tracking-[0.28em] text-white/75">
                            [Centro de Mexico]
                        </p> */}
                        <p
                            className="mt-2 max-w-2xl text-white text-lg md:text-3xl leading-tight"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("overlay")}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="grid gap-4 lg:gap-5 lg:grid-cols-3"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    {highlights.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.title}
                                className="rounded-[24px] lg:rounded-[32px] border border-[#AA7D69]/12 bg-white/70 p-4 lg:p-7 shadow-[0_20px_60px_-25px_rgba(170,125,105,0.25)] backdrop-blur-sm"
                            >
                                <div className="2 lg:mb-6 flex items-center justify-between gap-3 lg:gap-4">
                                    <h3
                                        className="text-lg lg:text-[2rem] leading-none text-[#222]"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <div className="flex h-8 lg:h-12 w-8 lg:w-12 shrink-0 items-center justify-center rounded-full border border-[#AA7D69]/15 bg-[#FFF8ED] text-[#AA7D69]">
                                        <Icon className="h-4 lg:h-5 w-4 lg:w-5" />
                                    </div>
                                </div>
                                <p className="text-[13px] leading-relaxed text-[#222]/70 md:text-base">
                                    {item.body}
                                </p>
                            </article>
                        );
                    })}
                </motion.div>
{/* 
                <motion.div
                    className="rounded-[36px] border border-[#AA7D69]/12 bg-[#F6E7D3] px-6 py-8 md:px-10"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
                        <p
                            className="text-[2.2rem] leading-[0.95] text-[#222]"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            El valor del lugar no solo esta en la distancia, sino en la calidad cultural y geografica de su contexto.
                        </p>
                        <p className="max-w-2xl text-sm leading-relaxed text-[#222]/70 md:text-base">
                            Para esta pagina, la ubicacion puede leerse como una idea mas amplia: San Miguel de Allende dentro de Mexico, dentro del Bajio y dentro de una forma de vida que combina patrimonio, naturaleza y contemporaneidad.
                        </p>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}
