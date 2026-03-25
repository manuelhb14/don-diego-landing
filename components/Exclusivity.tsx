"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useTranslations } from "next-intl";

export default function Exclusivity() {
    const hasVisited = useHasVisited();
    const tx = useTranslations("exclusivity");

    return (
        <section className="relative overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/babylon/banner-4.webp"
                    alt={tx("imageAlt")}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/10" /> */}
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto w-full min-h-[220px] md:min-h-[280px] lg:min-h-[420px] flex items-center">
                <div className="px-6 md:px-10 lg:pl-16 lg:pr-12 py-10 md:py-12 lg:py-20 max-w-[600px]">
                    <motion.h2
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[#222222] leading-[1.1] mb-5"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)",
                        }}
                    >
                        {tx("title1")}
                        <br />
                        {tx("title2")}{" "}
                        <em className="text-[#AA7D69]">{tx("titleEm")}</em>
                    </motion.h2>

                    <motion.p
                        initial={hasVisited ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="text-[#222222]/55 text-base lg:text-lg leading-[1.85] max-w-sm"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {tx("subtitle")}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
