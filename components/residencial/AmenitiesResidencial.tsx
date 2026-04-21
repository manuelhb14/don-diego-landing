"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AmenitiesResidencial() {
    const t = useTranslations("pages.residencial.amenities");
    const gridImages = [
        "/images/renders/padel.png",
        "/images/renders/padel-1.png",
        "/images/renders/padel-2.png",
        "/images/renders/render-5.png",
        "/images/renders/render-1.png",
        "/images/renders/render-2.png"
    ];

    const padelGridInnerCorners = ["rounded-br-md", "rounded-bl-md", "rounded-tr-md", "rounded-tl-md"] as const;

    return (
        <section id="amenidades" className="bg-[#EFE6DC] text-[#1F1D1B] py-10 lg:py-14 overflow-hidden">
            <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 lg:mb-12 max-w-2xl text-center mx-auto"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase mb-4"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("kicker")}
                    </p>
                    <h2
                        className="text-[#1F1D1B] leading-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        }}
                    >
                        {t("titleLine1")} <span className="italic text-[#b76d4b]">{t("titleAccent")}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="col-span-1 md:col-span-2 bg-[#fff8ed] overflow-hidden relative min-h-[400px] lg:min-h-[450px] flex flex-col md:flex-row"
                    >
                        {/* Left Side: Text */}
                        <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-10">
                            <h3 className="text-[#1F1D1B] text-3xl lg:text-5xl font-medium mb-6 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                                {t("socialHeart.title")}
                            </h3>
                            <p className="text-[#1F1D1B]/70 text-base lg:text-lg leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                                {t("socialHeart.body")}
                            </p>
                        </div>

                        {/* Right Side: Image Collage */}
                        <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0 p-0 h-full w-full">
                                <div className="relative col-span-2 row-span-2 overflow-hidden">
                                    <Image src="/images/renders/render-8.png" alt={t("alts.casaClub")} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="relative col-span-1 row-span-1 overflow-hidden">
                                    <Image src="/images/renders/restaurants.jpeg" alt={t("alts.restaurante")} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="relative col-span-1 row-span-2 overflow-hidden">
                                    <Image src="/images/renders/pool.jpeg" alt={t("alts.coworking")} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="relative col-span-1 row-span-1 overflow-hidden">
                                    <Image src="/images/renders/terrace.jpeg" alt={t("alts.terrazas")} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="relative col-span-1 row-span-1 overflow-hidden">
                                    <Image src="/images/renders/coworking.jpeg" alt={t("alts.piscina")} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2 (Bottom Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="col-span-1 bg-[#fff8ed] overflow-hidden relative min-h-[450px] p-8 lg:p-12 flex flex-col"
                    >
                        <div className="relative z-10 max-w-sm">
                            <h3 className="text-[#1F1D1B] text-2xl lg:text-3xl font-medium mb-3 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                                {t("wellness.title")}
                            </h3>
                            <p className="text-[#1F1D1B]/80 text-sm lg:text-base leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                                {t("wellness.body")}
                            </p>
                        </div>

                        {/* Image Playground mock */}
                        <div className="flex-1 w-full relative mt-16 lg:mt-24 flex items-center justify-center">
                            <div className="absolute w-53 h-53 lg:w-56 lg:h-56 rounded-full shadow-2xl overflow-hidden border-[6px] border-[#FFF3E1] z-20">
                                <Image src="/images/renders/spa.jpeg" alt={t("alts.spa")} fill className="object-cover" />
                                <div className="hidden lg:flex absolute inset-0 flex items-center justify-center">
                                    <span className="text-[#1F1D1B] text-[10px] font-bold tracking-widest absolute bottom-2 lg:bottom-3 bg-white/90 px-3 py-1 rounded-full backdrop-blur-md shadow-md">{t("labels.spa")}</span>
                                </div>
                            </div>
                            <div className="absolute w-36 h-36 lg:w-56 lg:h-56 rounded-full shadow-xl overflow-hidden border-4 border-[#FFF3E1] -translate-x-20 -translate-y-24 lg:-translate-x-34 lg:-translate-y-0  z-10">
                                <Image src="/images/renders/yoga.png" alt={t("alts.yoga")} fill className="object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[#1F1D1B] text-[10px] font-bold tracking-widest absolute top-2 lg:top-46 bg-white/90 px-3 py-1 rounded-full backdrop-blur-md shadow-md">{t("labels.yoga")}</span>
                                </div>
                            </div>
                            <div className="absolute w-32 h-32 lg:w-56 lg:h-56 rounded-full shadow-xl overflow-hidden border-4 border-[#FFF3E1] translate-x-24 translate-y-16 lg:translate-x-34 lg:-translate-y-0  z-30">
                                <Image src="/images/renders/spa-2.png" alt={t("alts.relax")} fill className="object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[#1F1D1B] text-[10px] font-bold tracking-widest absolute bottom-2 lg:bottom-3 bg-white/90 px-3 py-1 rounded-full backdrop-blur-md shadow-md">{t("labels.jacuzzi")}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3 (Bottom Right) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="col-span-1 bg-[#fff8ed] overflow-hidden relative min-h-[450px] flex flex-col pt-8 lg:pt-12"
                    >
                        <div className="px-8 lg:px-12 mb-8 relative z-10">
                            <h3 className="text-[#1F1D1B] text-2xl lg:text-3xl font-medium mb-3 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                                {t("sports.title")}
                            </h3>
                            <p className="text-[#1F1D1B]/70 text-sm lg:text-base leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-sans)" }}>
                                {t("sports.body")}
                            </p>
                        </div>

                        {/* Photos style block */}
                        <div className="relative flex-1 bg-[#1F1D1B] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] h-[250px] sm:h-auto">
                            <div className="grid grid-cols-2 gap-1 absolute inset-0 pb-1 px-1 pt-1">
                                {gridImages.slice(0, 4).map((src, i) => (
                                    <div
                                        key={i}
                                        className={`relative w-full h-full overflow-hidden ${padelGridInnerCorners[i]}`}
                                    >
                                        <Image src={src} alt={t("alts.activity")} fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
                                    </div>
                                ))}
                            </div>

                            {/* Photos style search bar */}
                            <div className="absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 bg-[#FFF3E1]/90 backdrop-blur-xl px-5 py-3 rounded-2xl lg:rounded-full flex items-center gap-3 w-[85%] max-w-[300px] shadow-2xl">
                                <Search className="w-5 h-5 text-[#1F1D1B]/60" />
                                <span className="text-[#1F1D1B]/80 text-sm font-medium tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>{t("searchPlaceholder")}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
