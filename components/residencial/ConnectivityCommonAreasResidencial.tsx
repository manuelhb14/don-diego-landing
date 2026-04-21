"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Bus, Leaf, MapPin, Users, Wifi } from "lucide-react";
import { useTranslations } from "next-intl";

const WIFI_HERO_IMAGE = {
    src: "/babylon/wifi.webp",
} as const;

const COMMUNITY_HERO_IMAGE = {
    src: "/final/mismo2.webp",
} as const;

const NATURE_HERO_IMAGE = {
    src: "/final/naturaleza.webp",
} as const;

export default function ConnectivityCommonAreasResidencial() {
    const t = useTranslations("pages.residencial.connectivity");

    return (
        <section
            className="border-t border-[#1F1D1B]/[0.06] bg-[#EFE6DC] text-[#1F1D1B] py-10 lg:py-14"
            aria-label={t("sectionAria")}
        >
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div
                    id="shuttles"
                    className="grid grid-cols-1 items-stretch gap-4 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10"
                    aria-labelledby="shuttles-heading"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.06 }}
                        className="order-1 flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                    >
                        <div className="flex h-full min-h-[240px] w-full flex-col justify-start gap-4 lg:gap-6 overflow-hidden border border-[#1F1D1B]/[0.08] bg-[#fff8ed]/95 px-4 lg:px-7 pb-8 pt-8 shadow-[0_24px_48px_rgba(47,39,33,0.12)] backdrop-blur-md sm:px-9 sm:pb-9 sm:pt-9 lg:min-h-[320px]">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.65 }}
                                className="-mx-7 -mt-8 max-w-none self-stretch sm:-mx-9 sm:-mt-9"
                            >
                                <div className="border-b border-[#1F1D1B]/[0.1] bg-[#FFF3E1]/90 px-4 py-2.5 shadow-[0_8px_28px_rgba(47,39,33,0.06)] backdrop-blur-sm sm:px-5 sm:py-3">
                                    <div className="flex flex-col gap-3 sm:flex-row items-center sm:justify-between sm:gap-4">
                                        <div
                                            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#b76d4b]/90 sm:text-[13px]"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            <Bus className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
                                            {t("route")}
                                        </div>
                                        <div
                                            className="flex flex-wrap items-center gap-2.5 text-[13px] sm:gap-3 md:text-sm"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            <span className="flex items-center gap-1.5 text-[#1F1D1B]/82">
                                                <MapPin className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
                                                {t("routeFrom")}
                                            </span>
                                            <div className="hidden h-px min-w-[1.5rem] flex-1 bg-[#1F1D1B]/20 sm:block" />
                                            <span className="rounded-full border border-[#C28E7A]/30 bg-[#FFF3E1]/95 px-2.5 py-0.5 text-[12px] font-medium tracking-wide text-[#1F1D1B]/90">
                                                {t("routeTime")}
                                            </span>
                                            <div className="hidden h-px min-w-[1.5rem] flex-1 bg-[#1F1D1B]/20 sm:block" />
                                            <span className="text-[#1F1D1B]/82">{t("routeTo")}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <p
                                className="mb-3 text-center text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase lg:text-left"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("shuttles.kicker")}
                            </p>
                            <h2
                                id="shuttles-heading"
                                className="text-center leading-tight text-[#1F1D1B] lg:text-left"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                                }}
                            >
                                {t("shuttles.titleLine1")} <span className="text-[#b76d4b] italic">{t("shuttles.titleLine2")}</span>
                            </h2>
                            <p
                                className="mt-4 text-center text-[15px] leading-relaxed text-[#1F1D1B]/75 lg:text-left sm:text-[16px]"
                                style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                            >
                                {t("shuttles.body")}
                            </p>
                            <Link
                                href="/ubicacion"
                                className="mt-8 inline-flex w-fit items-center gap-2 self-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#b76d4b] underline decoration-[#b76d4b]/35 underline-offset-4 transition hover:opacity-70 lg:self-start"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("shuttles.cta")}
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="order-2 relative flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, delay: 0.05 }}
                            className="relative w-full flex-1"
                        >
                            <div className="relative aspect-[16/11] w-full min-h-[240px] flex-1 overflow-hidden shadow-[0_30px_60px_rgba(26,25,23,0.18)] ring-1 ring-[#1a1917]/10 lg:aspect-auto lg:min-h-[280px] lg:h-full">
                                <Image
                                    src="/babylon/shuttle-2.webp"
                                    alt={t("shuttles.imageAlt")}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1917]/25 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div
                    id="wifi"
                    className="pt-10 lg:pt-14"
                    aria-labelledby="wifi-common-heading"
                >
                    <div className="grid grid-cols-1 items-stretch gap-4 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="order-2 relative flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                        >
                            <div className="relative aspect-[4/3] w-full min-h-[240px] flex-1 overflow-hidden shadow-[0_24px_50px_rgba(47,39,33,0.12)] ring-1 ring-[#1F1D1B]/[0.06] lg:aspect-auto lg:min-h-[320px] lg:h-full">
                                <Image
                                    src={WIFI_HERO_IMAGE.src}
                                    alt={t("wifi.imageAlt")}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    priority={false}
                                />
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1F1D1B]/15 via-transparent to-transparent lg:from-[#1F1D1B]/10"
                                    aria-hidden
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.06 }}
                            className="order-1 flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                        >
                            <div className="flex h-full min-h-[240px] w-full flex-col justify-center border border-[#6B6358]/[0.14] bg-[#F2EFE8]/95 px-4 lg:px-7 py-6 shadow-[0_24px_48px_rgba(47,39,33,0.1)] backdrop-blur-md sm:px-9 sm:py-9 lg:min-h-[320px]">
                                <div className="relative mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center lg:mx-0">
                                    <span className="absolute inset-0 rounded-full border border-[#8B8478]/22" aria-hidden />
                                    <span className="absolute inset-2 rounded-full border border-[#8B8478]/26" aria-hidden />
                                    <span className="absolute inset-4 rounded-full border border-[#8B8478]/30" aria-hidden />
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#7A7268]/35 bg-[#E8E4DB] text-[#4A453E]">
                                        <Wifi className="h-6 w-6 stroke-[1.5]" aria-hidden />
                                    </div>
                                </div>

                                <p
                                    className="mb-3 text-center text-[10px] tracking-[0.3em] text-[#6B6358]/90 uppercase lg:text-left"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {t("wifi.kicker")}
                                </p>
                                <h2
                                    id="wifi-common-heading"
                                    className="text-center text-[#1F1D1B] leading-tight lg:text-left"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                                    }}
                                >
                                    {t("wifi.titleLine1")} <span className="text-[#6B6358]/95 italic">{t("wifi.titleLine2")}</span>
                                </h2>
                                <p
                                    className="mt-4 text-center text-[15px] leading-relaxed text-[#1F1D1B]/75 lg:text-left sm:text-[16px]"
                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                >
                                    {t("wifi.body")}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div
                    id="comunidad"
                    className="pt-10 lg:pt-14"
                    aria-labelledby="comunidad-heading"
                >
                    <div className="grid grid-cols-1 items-stretch gap-4 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.06 }}
                            className="order-1 flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                        >
                            <div className="flex h-full min-h-[240px] w-full flex-col justify-center border border-[#1F1D1B]/[0.08] bg-[#fff8ed]/95 px-4 lg:px-7 py-4 lg:py-6 shadow-[0_24px_48px_rgba(47,39,33,0.12)] backdrop-blur-md sm:px-9 sm:py-9 lg:min-h-[320px]">
                                <div className="relative mx-auto mb-4 lg:mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center lg:mx-0">
                                    <span className="absolute inset-0 rounded-full border border-[#C28E7A]/20" aria-hidden />
                                    <span className="absolute inset-2 rounded-full border border-[#C28E7A]/25" aria-hidden />
                                    <span className="absolute inset-4 rounded-full border border-[#C28E7A]/30" aria-hidden />
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#C28E7A]/40 bg-[#FFF3E1] text-[#2C3D38]">
                                        <Users className="h-6 w-6 stroke-[1.5]" aria-hidden />
                                    </div>
                                </div>

                                <p
                                    className="mb-3 text-center text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase lg:text-left"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {t("community.kicker")}
                                </p>
                                <h2
                                    id="comunidad-heading"
                                    className="text-center leading-tight text-[#1F1D1B] lg:text-left"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                                    }}
                                >
                                    {t("community.titleLine1")} <span className="text-[#b76d4b] italic">{t("community.titleLine2")}</span>
                                </h2>
                                <p
                                    className="mt-4 text-center text-[15px] leading-relaxed text-[#1F1D1B]/75 lg:text-left sm:text-[16px]"
                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                >
                                    {t("community.body")}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="order-2 relative flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.85, delay: 0.05 }}
                                className="relative w-full flex-1"
                            >
                                <div className="relative aspect-[16/11] w-full min-h-[240px] flex-1 overflow-hidden shadow-[0_30px_60px_rgba(26,25,23,0.18)] ring-1 ring-[#1a1917]/10 lg:aspect-auto lg:min-h-[280px] lg:h-full">
                                    <Image
                                        src={COMMUNITY_HERO_IMAGE.src}
                                        alt={t("community.imageAlt")}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1917]/20 via-transparent to-transparent" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <div
                    id="naturaleza"
                    className="pt-10 lg:pt-14"
                    aria-labelledby="naturaleza-heading"
                >
                    <div className="grid grid-cols-1 items-stretch gap-4 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="order-2 relative flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                        >
                            <div className="relative aspect-[4/3] w-full min-h-[240px] flex-1 overflow-hidden shadow-[0_24px_50px_rgba(47,39,33,0.12)] ring-1 ring-[#1F1D1B]/[0.06] lg:aspect-auto lg:min-h-[320px] lg:h-full">
                                <Image
                                    src={NATURE_HERO_IMAGE.src}
                                    alt={t("nature.imageAlt")}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    priority={false}
                                />
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2C3428]/18 via-transparent to-transparent lg:from-[#2C3428]/12"
                                    aria-hidden
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.06 }}
                            className="order-1 flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                        >
                            <div className="flex h-full min-h-[240px] w-full flex-col justify-center border border-[#6B6358]/[0.14] bg-[#F2EFE8]/95 px-4 lg:px-7 py-6 shadow-[0_24px_48px_rgba(47,39,33,0.1)] backdrop-blur-md sm:px-9 sm:py-9 lg:min-h-[320px]">
                                <div className="relative mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center lg:mx-0">
                                    <span className="absolute inset-0 rounded-full border border-[#8B8478]/22" aria-hidden />
                                    <span className="absolute inset-2 rounded-full border border-[#8B8478]/26" aria-hidden />
                                    <span className="absolute inset-4 rounded-full border border-[#8B8478]/30" aria-hidden />
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#7A7268]/35 bg-[#E8E4DB] text-[#4A453E]">
                                        <Leaf className="h-6 w-6 stroke-[1.5]" aria-hidden />
                                    </div>
                                </div>

                                <p
                                    className="mb-3 text-center text-[10px] tracking-[0.3em] text-[#6B6358]/90 uppercase lg:text-left"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {t("nature.kicker")}
                                </p>
                                <h2
                                    id="naturaleza-heading"
                                    className="text-center leading-tight text-[#1F1D1B] lg:text-left"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                                    }}
                                >
                                    {t("nature.titleLine1")} <span className="text-[#6B6358]/95 italic">{t("nature.titleLine2")}</span>
                                </h2>
                                <p
                                    className="mt-4 text-center text-[15px] leading-relaxed text-[#1F1D1B]/75 lg:text-left sm:text-[16px]"
                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                >
                                    {t("nature.body")}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
