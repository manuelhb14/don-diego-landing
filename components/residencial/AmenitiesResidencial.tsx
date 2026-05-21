"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
    Dumbbell,
    Waves,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ResidentialDetailsHighlight from "@/components/residencial/ResidentialDetailsHighlight";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const socialHighlights = [
    {
        key: "restaurant",
        image: "/images/renders/restaurants.jpeg",
    },
    {
        key: "coffee",
        image: "/babylon/coffee-bar.webp",
    },
    {
        key: "coworking",
        image: "/images/renders/coworking.jpeg",
    },
] as const;

const wellnessItems = [
    {
        key: "yoga",
        image: "/images/renders/yoga.png",
        position: "object-center",
    },
    {
        key: "spa",
        image: "/final/spa-2.png",
        position: "object-center",
    },
    {
        key: "jacuzzi",
        image: "/babylon/jacuzzi.webp",
        position: "object-center",
    },
] as const;

export default function AmenitiesResidencial() {
    const t = useTranslations("pages.residencial.amenities");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section
            id="amenidades"
            className="overflow-hidden bg-[#FFF8ED] py-16 text-[#1F1D1B] md:py-24 lg:py-24"
            aria-labelledby="amenidades-residencial-heading"
        >
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition()}
                    className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.72fr)] lg:items-center"
                >
                    <div>
                        <p
                            className="mb-5 text-xs uppercase tracking-[0.3em] text-[#B76D4B]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            id="amenidades-residencial-heading"
                            className="text-[#242322]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                                lineHeight: 1,
                                letterSpacing: "0",
                            }}
                        >
                            {t("titleLine1")} <span className="italic text-[#b48572]">{t("titleAccent")}</span>
                        </h2>
                    </div>
                    <p
                        className="max-w-[640px] text-base font-medium leading-relaxed text-[#1F1D1B]/78 md:text-xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("intro")}
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <motion.article
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.08)}
                        className="overflow-hidden bg-[#FFF9F2] p-5 shadow-[0_18px_48px_rgba(67,52,42,0.07)]"
                    >
                        <div className="relative aspect-[4/3] lg:aspect-[16/9] min-h-[230px] overflow-hidden">
                            <video
                                className="absolute inset-0 h-full w-full scale-[1.5] object-cover"
                                src="/final/casa-club.mp4"
                                poster="/babylon/club-residencial.webp"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                aria-label={t("alts.casaClub")}
                            />
                        </div>

                        <div className="grid gap-4 px-1 py-6 lg:px-4">
                            <div>
                                <p
                                    className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#B76D4B]"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {t("socialHeart.kicker")}
                                </p>
                                <h3
                                    className="text-[1.75rem] leading-tight text-[#242322] lg:text-[2.45rem]"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {t("socialHeart.headline")}
                                </h3>
                                <p
                                    className="mt-4 w-full text-[16px] leading-[1.8] text-[#1F1D1B]/68 lg:text-[17px]"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {t("socialHeart.body")}
                                </p>
                            </div>
                        </div>

                        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pl-6 pr-5 scroll-pl-6 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-pl-0 [&::-webkit-scrollbar]:hidden">
                            {socialHighlights.map(({ key, image }) => (
                                <div key={key} className="min-w-[74vw] snap-start snap-always sm:min-w-0">
                                    <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[21/9] lg:aspect-[4/3]">
                                        <Image
                                            src={image}
                                            alt={t(`socialHeart.highlights.${key}.title`)}
                                            fill
                                            className="object-cover transition duration-500 hover:scale-[1.03]"
                                            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 100vw"
                                        />
                                    </div>
                                    <p
                                        className="mt-2 lg:mt-4 truncate text-center text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-[#1F1D1B]/85"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {t(`socialHeart.highlights.${key}.title`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.article>

                    <div className="grid gap-6">
                        <motion.article
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={revealTransition(0.16)}
                            className="bg-[#FFF9F2]/86 p-4 shadow-[0_18px_48px_rgba(67,52,42,0.06)] sm:p-6"
                        >
                            <div className="mb-5 flex items-start gap-5">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#c9947e]/25 text-[#b76d4b]">
                                    <Waves className="h-7 w-7 stroke-[1.25]" aria-hidden />
                                </span>
                                <div className="min-w-0">
                                    <p
                                        className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#B76D4B]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {t("wellness.kicker")}
                                    </p>
                                    <h3
                                        className="text-xl leading-tight text-[#34302c]"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {t("wellness.intro")}
                                    </h3>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {wellnessItems.map(({ key, image, position }) => (
                                    <div
                                        key={key}
                                        className="group grid min-h-[92px] grid-cols-[minmax(118px,0.48fr)_minmax(0,1fr)] overflow-hidden bg-[#F8EFE6] sm:grid-cols-[minmax(190px,0.48fr)_minmax(0,1fr)]"
                                    >
                                        <div className="relative min-h-0 overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={t(`wellness.items.${key}.title`)}
                                                fill
                                                className={`${position} object-cover transition duration-500 group-hover:scale-[1.03]`}
                                                sizes="(min-width: 1024px) 19vw, 100vw"
                                            />
                                        </div>
                                        <div className="flex min-w-0 items-center px-4 py-3 sm:px-5 sm:py-4">
                                            <div className="min-w-0">
                                                <h4
                                                    className="text-lg leading-tight text-[#242322] sm:text-xl"
                                                    style={{ fontFamily: "var(--font-serif)" }}
                                                >
                                                    {t(`wellness.items.${key}.title`)}
                                                </h4>
                                                <p
                                                    className="mt-1 text-[13px] leading-relaxed text-[#1F1D1B]/58"
                                                    style={{ fontFamily: "var(--font-serif)" }}
                                                >
                                                    {t(`wellness.items.${key}.body`)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.article>

                        <motion.article
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={revealTransition(0.24)}
                            className="overflow-hidden bg-[#FFF9F2]/86 p-3 shadow-[0_18px_48px_rgba(67,52,42,0.06)] sm:p-6"
                        >
                            <div className="mb-5 flex items-start gap-4 sm:gap-5">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#c9947e]/25 text-[#b76d4b]">
                                    <Dumbbell className="h-7 w-7 stroke-[1.25]" aria-hidden />
                                </span>
                                <div className="min-w-0">
                                    <p
                                        className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#B76D4B]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {t("sports.kicker")}
                                    </p>
                                    <h3
                                        className="text-xl leading-tight text-[#34302c]"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {t("sports.intro")}
                                    </h3>
                                </div>
                            </div>

                            <div className="grid min-w-0 grid-cols-1 gap-2 bg-[#fff8ed]/90 p-2 sm:grid-cols-[minmax(0,1.85fr)_minmax(150px,0.75fr)] sm:gap-3 sm:p-3">
                                <div className="relative aspect-[21/9] min-w-0 overflow-hidden sm:aspect-[16/9] sm:min-h-[245px]">
                                    <Image
                                        src="/final/padel.jpg"
                                        alt={t("alts.activity")}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 60vw, 100vw"
                                    />
                                </div>
                                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-3">
                                    <div className="relative aspect-[4/3] min-w-0 overflow-hidden sm:aspect-auto sm:min-h-[116px]">
                                        <Image
                                            src="/babylon/gym.webp"
                                            alt={t("alts.gym")}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 13vw, (min-width: 640px) 25vw, 50vw"
                                        />
                                    </div>
                                    <div className="relative aspect-[4/3] min-w-0 overflow-hidden sm:aspect-auto sm:min-h-[116px]">
                                        <Image
                                            src="/images/renders/padel-2.png"
                                            alt={t("alts.field")}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 13vw, (min-width: 640px) 25vw, 50vw"
                                        />
                                    </div>
                                </div>
                            </div>

                        </motion.article>
                    </div>
                </div>

                <ResidentialDetailsHighlight />
            </div>
        </section>
    );
}
