"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Dumbbell, Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import ResidentialDetailsHighlight from "@/components/residencial/ResidentialDetailsHighlight";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const clubhouseStory = {
    key: "clubhouse",
    src: "/final/casa-club.mp4",
    poster: "/final/casa-club-poster.jpg",
    altKey: "casaClub",
    secondaryImages: [
        { src: "/images/renders/restaurants.jpeg", altKey: "restaurant" },
        { src: "/images/renders/terrace.jpeg", altKey: "rooftopBar" },
        { src: "/images/renders/coworking.jpeg", altKey: "businessCenter" },
        { src: "/babylon/comunidad-2.webp", altKey: "ludoteca" },
    ],
    highlights: ["restaurant", "rooftopBar", "businessCenter", "ludoteca"],
} as const;

const compactAmenityRows = [
    {
        key: "padel",
        image: "/final/padel.jpg",
        altKey: "sports",
    },
    {
        key: "pickleball",
        image: "/final/pickleball.png",
        altKey: "pickleball",
    },
    {
        key: "coveredGym",
        image: "/babylon/gym.webp",
        altKey: "gym",
    },
    {
        key: "waterWellness",
        image: "/images/renders/pool.jpeg",
        altKey: "pool",
    },
    {
        key: "yoga",
        image: "/images/renders/yoga.png",
        altKey: "yoga",
    },
    {
        key: "spa",
        image: "/final/spa-2.png",
        altKey: "spa",
    },
    {
        key: "jacuzzis",
        image: "/babylon/jacuzzi.webp",
        altKey: "jacuzzis",
    },
] as const;

const compactAmenityGroups = [
    {
        key: "sports",
        icon: Dumbbell,
        rows: compactAmenityRows.slice(0, 3),
    },
    {
        key: "relaxation",
        icon: Waves,
        rows: compactAmenityRows.slice(3),
    },
] as const;

type ClubhouseStory = typeof clubhouseStory;

export default function AmenitiesResidencial() {
    const t = useTranslations("pages.residencial.amenities");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    const renderMainMedia = (story: ClubhouseStory) => {
        const mainMediaClass = [
            "relative min-w-0 w-full max-w-full self-start overflow-hidden bg-[#EDE5DA]",
        ].join(" ");

        return (
            <div className={mainMediaClass} style={{ width: "100%", maxWidth: "100%" }}>
                <div className="block pb-[75%] lg:pb-[62.5%]" aria-hidden />
                <video
                    className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
                    src={story.src}
                    poster={story.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={t(`alts.${story.altKey}`)}
                />
            </div>
        );
    };

    const renderPrimaryBottomImages = (story: ClubhouseStory) => (
        <div className="-mx-3 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pl-3 pr-3 scroll-pl-3 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-pl-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {story.secondaryImages.map((image) => (
                <div key={image.altKey} className="min-w-[66vw] snap-start snap-always sm:min-w-0">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#EDE5DA] sm:aspect-[4/3] lg:aspect-[8/9]">
                        <Image
                            src={image.src}
                            alt={t(`alts.${image.altKey}`)}
                            fill
                            className="object-cover transition duration-500 hover:scale-[1.03]"
                            sizes="(min-width: 1024px) 12vw, (min-width: 640px) 30vw, 66vw"
                        />
                    </div>
                    <p
                        className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#1F1D1B]/82"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t(`features.${story.key}.media.${image.altKey}`)}
                    </p>
                </div>
            ))}
        </div>
    );

    const renderClubhouseStory = (story: ClubhouseStory, index: number) => (
        <motion.article
            key={story.key}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransition(0.08 + index * 0.08)}
            className="min-w-0 border border-[#B76D4B]/16 bg-[#FFF9F2] p-3 shadow-[0_18px_48px_rgba(67,52,42,0.06)] sm:p-4 lg:p-5"
        >
            <div className="grid min-w-0 w-full max-w-full grid-cols-[minmax(0,1fr)] gap-5">
                {renderMainMedia(story)}

                <div className="px-1 pb-1 sm:px-2">
                    <p
                        className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#B76D4B]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t(`features.${story.key}.kicker`)}
                    </p>
                    <h3
                        className="max-w-[760px] text-[2rem] leading-[1.02] text-[#242322] lg:text-[3rem]"
                        style={{ fontFamily: "var(--font-serif)", letterSpacing: "0" }}
                    >
                        {t(`features.${story.key}.title`)}
                    </h3>
                    <p
                        className="mt-4 max-w-[720px] text-pretty text-[16px] leading-[1.8] text-[#1F1D1B]/68 lg:text-[17px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t(`features.${story.key}.body`)}
                    </p>

                    {renderPrimaryBottomImages(story)}
                </div>
            </div>
        </motion.article>
    );

    const renderCompactAmenitiesPanel = () => (
        <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransition(0.16)}
            className="min-w-0 border border-[#B76D4B]/16 bg-[#FFF9F2] p-4 shadow-[0_18px_48px_rgba(67,52,42,0.06)]"
        >
            <div className="mb-3 px-1 py-1 sm:px-2">
                <p
                    className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#B76D4B]"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t("compact.kicker")}
                </p>
                <h3
                    className="max-w-[760px] text-[1.7rem] leading-[1.05] text-[#242322] lg:text-[2.05rem]"
                    style={{ fontFamily: "var(--font-serif)", letterSpacing: "0" }}
                >
                    {t("compact.title")}
                </h3>
                <p
                    className="mt-3 max-w-[720px] text-pretty text-[15px] leading-[1.65] text-[#1F1D1B]/68"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t("compact.body")}
                </p>
            </div>

            <div className="grid gap-2.5">
                {compactAmenityGroups.map((group) => {
                    const Icon = group.icon;

                    return (
                        <div key={group.key} className="grid gap-2">
                            <div className="flex items-center gap-2 px-1 pt-2">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#B76D4B]/22 text-[#B76D4B]">
                                    <Icon className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden />
                                </span>
                                <h4
                                    className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#1F1D1B]/70"
                                    style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.24em" }}
                                >
                                    {t(`compact.groups.${group.key}`)}
                                </h4>
                            </div>

                            <div className="grid gap-2">
                                {group.rows.map((row) => (
                                    <div
                                        key={row.key}
                                        className="grid min-h-[78px] grid-cols-[minmax(96px,0.34fr)_minmax(0,1fr)] overflow-hidden bg-[#F8EFE6] sm:grid-cols-[minmax(122px,0.34fr)_minmax(0,1fr)]"
                                    >
                                        <div className="relative min-h-0 overflow-hidden bg-[#EDE5DA]">
                                            <Image
                                                src={row.image}
                                                alt={t(`alts.${row.altKey}`)}
                                                fill
                                                className="object-cover transition duration-500 hover:scale-[1.03]"
                                                sizes="(min-width: 1024px) 12vw, (min-width: 640px) 22vw, 34vw"
                                            />
                                        </div>
                                        <div className="flex min-w-0 items-center px-3 py-2 sm:px-4">
                                            <div className="min-w-0">
                                                <h5
                                                    className="text-[1rem] leading-tight text-[#242322] lg:text-[1.12rem]"
                                                    style={{ fontFamily: "var(--font-serif)" }}
                                                >
                                                    {t(`compact.rows.${row.key}.title`)}
                                                </h5>
                                                <p
                                                    className="mt-1 text-pretty text-[11.5px] leading-[1.35] text-[#1F1D1B]/60"
                                                    style={{ fontFamily: "var(--font-sans)" }}
                                                >
                                                    {t(`compact.rows.${row.key}.body`)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.aside>
    );

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
                    className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.72fr)] lg:items-end"
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
                        className="max-w-[680px] text-pretty text-base font-medium leading-relaxed text-[#1F1D1B]/78 md:text-xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("intro")}
                    </p>
                </motion.div>

                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                    {renderClubhouseStory(clubhouseStory, 0)}
                    {renderCompactAmenitiesPanel()}
                </div>

                <ResidentialDetailsHighlight />
            </div>
        </section>
    );
}
