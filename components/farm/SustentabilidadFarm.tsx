"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FarmDetailsHighlight from "@/components/farm/FarmDetailsHighlight";

export default function SustentabilidadFarm() {
    const t = useTranslations("pages.farm.sustentabilidad");

    return (
        <section id="sustentabilidad" className="relative w-full overflow-hidden bg-[#fff8ed] py-12 text-[#1a1917] md:py-14 lg:py-[72px]">

            <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-16">

                {/* Left Side: Editorial Typography */}
                <div className="z-20 flex w-full flex-col justify-start pr-0 lg:w-[45%] lg:pr-8">
                    <p
                        className="mb-4 text-xs tracking-[0.3em] text-[#9B5C6E] uppercase lg:mb-7"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </p>

                    <h2
                        className="mb-6 text-[2.65rem] leading-[1.04] tracking-normal text-[#1a1917] sm:text-[3.25rem] lg:mb-8 lg:text-[clamp(3.35rem,4.8vw,4.75rem)] lg:leading-[1.04]"
                        style={{
                            fontFamily: "var(--font-serif)",
                        }}
                    >
                        {t("title.line1")}<br />
                        <span className="italic text-[#8B4A5E]">{t("title.accent")}</span><br />
                        {t("title.line2")}
                    </h2>

                    <div className="max-w-md space-y-5 lg:space-y-6">
                        <p
                            className="text-lg font-medium leading-relaxed text-[#1a1917]/82 lg:text-xl"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("bodyPrimary")}
                        </p>

                        <div className="h-px w-24 bg-[#1a1917]/15 hidden lg:block" />

                        <p
                            className="text-base leading-relaxed text-[#1a1917]/65 lg:text-lg"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("bodySecondary")}
                        </p>
                    </div>
                </div>

                {/* Right Side: Parallax Image Grid */}
                <div className="relative h-[320px] w-full sm:h-[400px] lg:h-[640px] lg:w-[55%]">

                    {/* Main Image Layer */}
                    <div className="absolute top-0 right-0 z-10 h-[72%] w-[74%] overflow-hidden shadow-[0_20px_44px_rgba(26,25,23,0.11)] lg:top-8 lg:h-[76%] lg:w-[70%]">
                        <Image
                            src="/final/terreno.png"
                            alt={t("images.mainAlt")}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-1000"
                        />
                    </div>

                    {/* Offset Accelerated Image Layer */}
                    <div className="absolute bottom-0 left-0 z-20 h-[42%] w-[54%] overflow-hidden border-4 border-[#EFE6DC] shadow-[0_18px_40px_rgba(26,25,23,0.12)] sm:bottom-4 lg:bottom-16 lg:h-[48%] lg:w-[48%] lg:border-[6px]">
                        <video
                            className="h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                            src="/final/gallinas.mp4"
                            poster="/final/reja.jpg"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label={t("images.secondaryAlt")}
                        />
                    </div>

                    {/* Decorative minimalist shapes */}
                    {/* <div className="absolute top-20 right-[75%] lg:right-[65%] w-32 h-32 border border-[#1a1917]/10 rounded-full hidden md:block" /> */}
                    {/* <div className="absolute bottom-40 -right-10 w-64 h-64 border border-[#1a1917]/5 rounded-full z-0 hidden lg:block" /> */}
                </div>

            </div>
            <FarmDetailsHighlight />
        </section>
    );
}
