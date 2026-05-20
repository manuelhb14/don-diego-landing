"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const gallery = [
    { src: "/babylon/clubhouse.webp" },
    { src: "/babylon/spa.webp" },
    { src: "/babylon/restaurant.webp" },
] as const;

export default function ClubAccessResidencial() {
    const t = useTranslations("pages.residencial.clubAccess");

    return (
        <section
            aria-labelledby="club-access-heading"
            className="bg-[#2A2826] text-[#FFF3E1] py-10 lg:py-16 overflow-hidden"
        >
            <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-12">
                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
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
                            {t("kicker")}
                        </p>
                        <h2
                            id="club-access-heading"
                            className="text-[#FFF3E1] leading-[1.08]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3.35rem)",
                            }}
                        >
                            {t("titleLine1")} <span className="italic text-[#b76d4b]">{t("titleAccent")}</span>
                        </h2>
                        <p
                            className="mt-4 text-[#b76d4b]/95 italic"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
                            }}
                        >
                            {t("subtitle")}
                        </p>
                        <p
                            className="mt-6 text-[#FFF3E1]/75 text-base lg:text-[17px] leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                        >
                            {t("body")}
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mt-7"
                        >
                            <Link
                                href="/experiencias"
                                className="inline-block text-[#FFF3E1] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#b76d4b]/70 pb-1 hover:opacity-70 transition-opacity"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("cta")}
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
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#FFF3E1]/[0.12] shadow-[0_24px_48px_rgba(0,0,0,0.35)] lg:aspect-[2.35/1]">
                                <Image
                                    src={gallery[0].src}
                                    alt={t("alts.clubhouse")}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 42vw, 100vw"
                                    priority={false}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="relative aspect-[6/5] overflow-hidden rounded-sm border border-[#FFF3E1]/[0.12]">
                                    <Image
                                        src={gallery[1].src}
                                        alt={t("alts.spa")}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 21vw, 50vw"
                                    />
                                </div>
                                <div className="relative aspect-[6/5] overflow-hidden rounded-sm border border-[#FFF3E1]/[0.12]">
                                    <Image
                                        src={gallery[2].src}
                                        alt={t("alts.restaurant")}
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
