"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SustentabilidadFarm() {
    const t = useTranslations("pages.farm.sustentabilidad");

    return (
        <section id="sustentabilidad" className="relative w-full py-2 lg:py-12 overflow-hidden bg-[#fff8ed] text-[#1a1917]">

            <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-16 flex flex-col lg:flex-row relative">

                {/* Left Side: Editorial Typography */}
                <div className="w-full lg:w-[45%] flex flex-col justify-start z-20 pt-10 lg:pt-16 pr-0 lg:pr-12">
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#9B5C6E]/85 uppercase mb-4 lg:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("eyebrow")}
                    </p>

                    <h2
                        className="text-[#1a1917] leading-[1.1] mb-10 tracking-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                        }}
                    >
                        {t("title.line1")}<br />
                        <span className="italic text-[#8B4A5E]">{t("title.accent")}</span><br />
                        {t("title.line2")}
                    </h2>

                    <div className="space-y-8 max-w-md">
                        <p
                            className="text-[#1a1917]/82 text-lg lg:text-xl font-medium leading-relaxed"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("bodyPrimary")}
                        </p>

                        <div className="h-px w-24 bg-[#1a1917]/15 hidden lg:block" />

                        <p
                            className="text-[#1a1917]/65 text-base lg:text-lg leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("bodySecondary")}
                        </p>
                    </div>
                </div>

                {/* Right Side: Parallax Image Grid */}
                <div className="w-full lg:w-[55%] relative h-[550px] lg:h-[900px] -mt-12 lg:-mt-0">

                    {/* Main Image Layer */}
                    <div className="absolute right-0 top-10 lg:top-16 w-[80%] lg:w-[70%] h-[75%] lg:h-[80%] z-10 overflow-hidden shadow-2xl">
                        <Image
                            src="/babylon/farm-1.webp"
                            alt={t("images.mainAlt")}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-1000"
                        />
                    </div>

                    {/* Offset Accelerated Image Layer */}
                    <div className="absolute left-0 bottom-10 lg:bottom-24 w-[60%] lg:w-[50%] h-[50%] lg:h-[55%] z-20 overflow-hidden shadow-2xl border-4 lg:border-8 border-[#EFE6DC]">
                        <Image
                            src="/babylon/farm-2.webp"
                            alt={t("images.secondaryAlt")}
                            fill
                            className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-1000"
                        />
                    </div>

                    {/* Decorative minimalist shapes */}
                    {/* <div className="absolute top-20 right-[75%] lg:right-[65%] w-32 h-32 border border-[#1a1917]/10 rounded-full hidden md:block" /> */}
                    {/* <div className="absolute bottom-40 -right-10 w-64 h-64 border border-[#1a1917]/5 rounded-full z-0 hidden lg:block" /> */}
                </div>

            </div>
        </section>
    );
}
