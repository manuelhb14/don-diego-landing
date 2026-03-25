"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useTranslations } from "next-intl";

export default function Services() {
    const hasVisited = useHasVisited();
    const ts = useTranslations("servicesPage");
    const tp = useTranslations("project");
    return (
        <section id="services" className="bg-[#fff8ed] text-[#222222] overflow-hidden relative">
            <div className="max-w-[1440px] mx-auto w-full py-12 lg:pt-24 px-6 md:px-10 lg:px-16 flex flex-col">

                {/* Top Section: Headers & Intro Paragraph */}
                <div className="w-full flex justify-between items-end mb-4 lg:mb-8">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {ts("kicker")}
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)"
                            }}
                        >
                            {ts("heading")}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:flex"
                    >
                        <p className="text-[#222]/80 text-base leading-[1.8] font-normal tracking-[0.01em] w-[350px] text-right font-serif">
                            {ts("intro")}
                        </p>
                    </motion.div>
                </div>

                {/* Mobile Text (Visible only on small screens) */}
                <motion.div
                    initial={hasVisited ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex lg:hidden mb-8 md:mb-16"
                >
                    <p className="text-[#222]/80 text-lg leading-[1.8] font-normal tracking-[0.01em] w-full font-serif">
                        {ts("intro")}
                    </p>
                </motion.div>

                {/* Bottom Section: Staggered Image Cards */}
                <div className="w-full flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-8 items-start w-full">

                        {/* Image 1 - Club Residencial */}
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 self-start order-1 relative z-10"
                        >
                            <Link href="/residencial" className="block relative w-full aspect-[4/3] md:aspect-[2/3] group cursor-pointer overflow-hidden rounded-sm">
                                <Image
                                    src="/babylon/club-residencial.webp"
                                    alt={tp("residencial.name")}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 sm:p-4 text-center">
                                    <h3
                                        className="text-white text-[10px] xl:text-[11px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {ts("cardClubL1")}<br />{ts("cardClubL2")}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Image 2 - Organic Farm */}
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
                            className="w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-8 lg:pt-6 self-end md:self-start order-2 relative z-20 mt-4 md:mt-0 right-0"
                        >
                            <Link href="/farm" className="block relative w-full aspect-[4/3] md:aspect-[2/3] group cursor-pointer overflow-hidden rounded-sm">
                                <Image
                                    src="/babylon/organic-farm.webp"
                                    alt={tp("farm.name")}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 sm:p-4 text-center">
                                    <h3
                                        className="text-white text-[10px] xl:text-[11px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {ts("cardFarmL1")}<br />{ts("cardFarmL2")}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Image 3 - Wellness Center */}
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-16 lg:pt-12 self-start order-3 relative z-30 mt-4 md:mt-0 text-left"
                        >
                            <Link href="/wellness" className="block relative w-full aspect-[4/3] md:aspect-[2/3] group cursor-pointer overflow-hidden rounded-sm">
                                <Image
                                    src="/babylon/wellness-center.webp"
                                    alt={tp("wellness.name")}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 sm:p-4 text-center">
                                    <h3
                                        className="text-white text-[10px] xl:text-[11px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {ts("cardWellnessL1")}<br />{ts("cardWellnessL2")}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Image 4 - Presa de la Cantera */}
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
                            className="w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-24 lg:pt-18 self-end md:self-start order-4 relative z-40 mt-4 md:mt-0 right-0"
                        >
                            <Link href="/presa" className="block relative w-full aspect-[4/3] md:aspect-[2/3] group cursor-pointer overflow-hidden rounded-sm">
                                <Image
                                    src="/babylon/presa-de-la-cantera.webp"
                                    alt={tp("presa.name")}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 sm:p-4 text-center">
                                    <h3
                                        className="text-white text-[10px] xl:text-[11px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {ts("cardPresaL1")}<br />{ts("cardPresaL2")}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>

                    </div>

                    {/* Bottom Right: Paragraph & Link */}
                    <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                        >
                            <p className="text-[#222] text-xl font-medium leading-relaxed mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                                    {ts("closing")}
                            </p>
                            <Link
                                href="/proyecto"
                                className="inline-block text-[#222] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#222] pb-1 hover:opacity-60 transition-opacity"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {ts("cta")}
                            </Link>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
