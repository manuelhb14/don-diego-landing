"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Bus, Leaf, MapPin, Users, Wifi } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

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
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = {
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
    };

    return (
        <section
            className="border-t border-[#1F1D1B]/[0.06] bg-[#EFE6DC] py-12 text-[#1F1D1B] lg:py-20"
            aria-label={t("sectionAria")}
        >
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div
                    id="shuttles"
                    className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8"
                    aria-labelledby="shuttles-heading"
                >
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
                        className="order-1 flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                    >
                        <div className="flex h-full w-full flex-col justify-center gap-3 overflow-hidden border border-[#b76d4b]/16 bg-[#F7EFE6] px-5 py-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] sm:min-h-[236px] sm:px-8 sm:py-8 lg:min-h-[300px] lg:gap-5 lg:px-8">
                            <motion.div
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
                                className="-mx-5 -mt-6 max-w-none self-stretch sm:-mx-8 sm:-mt-8"
                            >
                                <div className="border-b border-[#b76d4b]/16 bg-[#EFE6DC] px-3.5 py-2 sm:px-5 sm:py-3">
                                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:flex-nowrap sm:justify-between sm:gap-4">
                                        <div
                                            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b76d4b]/90 sm:gap-2.5 sm:text-[13px] sm:tracking-[0.18em]"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            <Bus className="h-4 w-4 shrink-0 opacity-70 sm:h-5 sm:w-5" aria-hidden />
                                            {t("route")}
                                        </div>
                                        <div
                                            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] sm:justify-start sm:gap-3 sm:text-[13px] md:text-sm"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            <span className="flex items-center gap-1.5 text-[#1F1D1B]/82">
                                                <MapPin className="h-3.5 w-3.5 shrink-0 opacity-60 sm:h-4 sm:w-4" aria-hidden />
                                                {t("routeFrom")}
                                            </span>
                                            <div className="hidden h-px min-w-[1.5rem] flex-1 bg-[#1F1D1B]/20 sm:block" />
                                            <span className="rounded-full border border-[#C28E7A]/30 bg-[#FFF3E1]/95 px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#1F1D1B]/90 sm:px-2.5 sm:text-[12px]">
                                                {t("routeTime")}
                                            </span>
                                            <div className="hidden h-px min-w-[1.5rem] flex-1 bg-[#1F1D1B]/20 sm:block" />
                                            <span className="text-[#1F1D1B]/82">{t("routeTo")}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <p
                                className="mb-1 text-center text-xs tracking-[0.3em] text-[#b76d4b] uppercase sm:mb-3 lg:text-left"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("shuttles.kicker")}
                            </p>
                            <h2
                                id="shuttles-heading"
                                className="text-center leading-tight text-[#1F1D1B] lg:text-left"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)",
                                }}
                            >
                                {t("shuttles.titleLine1")} <span className="text-[#b76d4b] italic">{t("shuttles.titleLine2")}</span>
                            </h2>
                            <p
                                className="mt-3 text-center text-[13px] leading-[1.65] text-[#1F1D1B]/72 sm:mt-4 sm:text-base sm:leading-relaxed lg:text-left"
                                style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                            >
                                {t("shuttles.body")}
                            </p>
                            <Link
                                href="/ubicacion"
                                className="mt-4 inline-flex w-fit items-center gap-2 self-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#b76d4b] underline decoration-[#b76d4b]/35 underline-offset-4 transition hover:opacity-70 sm:mt-8 lg:self-start"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("shuttles.cta")}
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition}
                        className="order-2 relative flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                    >
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.04 }}
                            className="relative w-full flex-1"
                        >
                            <div className="relative aspect-[16/9] w-full min-h-[190px] flex-1 overflow-hidden shadow-[0_18px_38px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/10 sm:min-h-[238px] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                                <video
                                    className="absolute inset-0 h-full w-full scale-[1.1] object-cover"
                                    src="/final/shuttle.mp4"
                                    poster="/babylon/shuttle-2.webp"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    aria-label={t("shuttles.imageAlt")}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1917]/14 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div
                    id="wifi"
                    className="pt-8 lg:pt-12"
                    aria-labelledby="wifi-common-heading"
                >
                    <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8">
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={revealTransition}
                            className="order-2 relative flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                        >
                            <div className="relative aspect-[16/9] w-full min-h-[190px] flex-1 overflow-hidden shadow-[0_18px_38px_rgba(26,25,23,0.1)] ring-1 ring-[#1F1D1B]/[0.06] sm:min-h-[238px] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                                <Image
                                    src={WIFI_HERO_IMAGE.src}
                                    alt={t("wifi.imageAlt")}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    priority={false}
                                />
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1F1D1B]/14 via-transparent to-transparent lg:from-[#1F1D1B]/10"
                                    aria-hidden
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
                            className="order-1 flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                        >
                            <div className="flex h-full w-full flex-col justify-center border border-[#6B6358]/18 bg-[#EEEAE1] px-5 py-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] sm:min-h-[236px] sm:px-8 sm:py-8 lg:min-h-[300px] lg:px-8">
                                <div className="flex items-center gap-3 sm:block">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-16 sm:w-16 lg:mx-0">
                                        <div className="flex h-full w-full items-center justify-center border border-[#7A7268]/25 bg-[#E5E0D6] text-[#4A453E]">
                                            <Wifi className="h-5.5 w-5.5 stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="mb-1 text-left text-xs tracking-[0.3em] text-[#6B6358] uppercase sm:mb-3 sm:text-center lg:text-left"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {t("wifi.kicker")}
                                        </p>
                                        <h2
                                            id="wifi-common-heading"
                                            className="text-left text-[#1F1D1B] leading-tight sm:text-center lg:text-left"
                                            style={{
                                                fontFamily: "var(--font-serif)",
                                                fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)",
                                            }}
                                        >
                                            {t("wifi.titleLine1")} <span className="text-[#6B6358]/95 italic">{t("wifi.titleLine2")}</span>
                                        </h2>
                                    </div>
                                </div>

                                <p
                                    className="mt-3 text-left text-[13px] leading-[1.65] text-[#1F1D1B]/72 sm:mt-4 sm:text-base sm:leading-relaxed"
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
                    className="pt-8 lg:pt-12"
                    aria-labelledby="comunidad-heading"
                >
                    <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8">
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
                            className="order-1 flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                        >
                            <div className="flex h-full w-full flex-col justify-center border border-[#b76d4b]/16 bg-[#F7EFE6] px-5 py-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] sm:min-h-[236px] sm:px-8 sm:py-8 lg:min-h-[300px] lg:px-8">
                                <div className="flex items-center gap-3 sm:block">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-16 sm:w-16 lg:mx-0">
                                        <div className="flex h-full w-full items-center justify-center border border-[#C28E7A]/28 bg-[#EFE6DC] text-[#2C3D38]">
                                            <Users className="h-5.5 w-5.5 stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="mb-1 text-left text-xs tracking-[0.3em] text-[#b76d4b] uppercase sm:mb-3 sm:text-center lg:text-left"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {t("community.kicker")}
                                        </p>
                                        <h2
                                            id="comunidad-heading"
                                            className="text-left leading-tight text-[#1F1D1B] sm:text-center lg:text-left"
                                            style={{
                                                fontFamily: "var(--font-serif)",
                                                fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)",
                                            }}
                                        >
                                            {t("community.titleLine1")} <span className="text-[#b76d4b] italic">{t("community.titleLine2")}</span>
                                        </h2>
                                    </div>
                                </div>

                                <p
                                    className="mt-3 text-left text-[13px] leading-[1.65] text-[#1F1D1B]/72 sm:mt-4 sm:text-base sm:leading-relaxed"
                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                >
                                    {t("community.body")}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={revealTransition}
                            className="order-2 relative flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                        >
                            <motion.div
                                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.04 }}
                                className="relative w-full flex-1"
                            >
                                <div className="relative aspect-[16/9] w-full min-h-[190px] flex-1 overflow-hidden shadow-[0_18px_38px_rgba(26,25,23,0.1)] ring-1 ring-[#1a1917]/10 sm:min-h-[238px] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                                    <Image
                                        src={COMMUNITY_HERO_IMAGE.src}
                                        alt={t("community.imageAlt")}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1917]/14 via-transparent to-transparent" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <div
                    id="naturaleza"
                    className="pt-8 lg:pt-12"
                    aria-labelledby="naturaleza-heading"
                >
                    <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8">
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={revealTransition}
                            className="order-2 relative flex min-h-0 w-full flex-col lg:order-1 lg:h-full"
                        >
                            <div className="relative aspect-[16/9] w-full min-h-[190px] flex-1 overflow-hidden shadow-[0_18px_38px_rgba(26,25,23,0.1)] ring-1 ring-[#1F1D1B]/[0.06] sm:min-h-[238px] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                                <Image
                                    src={NATURE_HERO_IMAGE.src}
                                    alt={t("nature.imageAlt")}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    priority={false}
                                />
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2C3428]/14 via-transparent to-transparent lg:from-[#2C3428]/10"
                                    aria-hidden
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
                            className="order-1 flex min-h-0 w-full flex-col lg:order-2 lg:h-full"
                        >
                            <div className="flex h-full w-full flex-col justify-center border border-[#6B6358]/18 bg-[#EEEAE1] px-5 py-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] sm:min-h-[236px] sm:px-8 sm:py-8 lg:min-h-[300px] lg:px-8">
                                <div className="flex items-center gap-3 sm:block">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:mx-auto sm:mb-6 sm:h-16 sm:w-16 lg:mx-0">
                                        <div className="flex h-full w-full items-center justify-center border border-[#7A7268]/25 bg-[#E5E0D6] text-[#4A453E]">
                                            <Leaf className="h-5.5 w-5.5 stroke-[1.5] sm:h-6 sm:w-6" aria-hidden />
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="mb-1 text-left text-xs tracking-[0.3em] text-[#6B6358] uppercase sm:mb-3 sm:text-center lg:text-left"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {t("nature.kicker")}
                                        </p>
                                        <h2
                                            id="naturaleza-heading"
                                            className="text-left leading-tight text-[#1F1D1B] sm:text-center lg:text-left"
                                            style={{
                                                fontFamily: "var(--font-serif)",
                                                fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)",
                                            }}
                                        >
                                            {t("nature.titleLine1")} <span className="text-[#6B6358]/95 italic">{t("nature.titleLine2")}</span>
                                        </h2>
                                    </div>
                                </div>

                                <p
                                    className="mt-3 text-left text-[13px] leading-[1.65] text-[#1F1D1B]/72 sm:mt-4 sm:text-base sm:leading-relaxed"
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
