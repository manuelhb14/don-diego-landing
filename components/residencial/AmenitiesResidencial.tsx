"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
    Clock,
    Dumbbell,
    KeyRound,
    Route,
    Sparkles,
    Sprout,
    Waves,
} from "lucide-react";
import { useTranslations } from "next-intl";

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
    },
    {
        key: "spa",
        image: "/images/renders/spa.jpeg",
    },
    {
        key: "jacuzzi",
        image: "/babylon/jacuzzi.webp",
    },
] as const;

const featureStrip = [
    {
        key: "dailyLife",
        icon: Clock,
    },
    {
        key: "mobility",
        icon: Route,
    },
    {
        key: "homeCare",
        icon: KeyRound,
    },
    {
        key: "landscape",
        icon: Sprout,
    },
] as const;

export default function AmenitiesResidencial() {
    const t = useTranslations("pages.residencial.amenities");

    return (
        <section
            id="amenidades"
            className="overflow-hidden bg-[#fff8ed] py-12 text-[#1F1D1B] lg:py-16"
            aria-labelledby="amenidades-residencial-heading"
        >
            <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75 }}
                    className="mb-7 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)] lg:items-end"
                >
                    <div>
                        <p
                            className="mb-3 text-[10px] uppercase tracking-[0.38em] text-[#b76d4b]/80"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            id="amenidades-residencial-heading"
                            className="leading-[0.95] text-[#242322]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            }}
                        >
                            {t("titleLine1")} <span className="italic text-[#b48572]">{t("titleAccent")}</span>
                        </h2>
                    </div>
                    <p
                        className="max-w-[470px] text-[15px] leading-[1.8] text-[#1F1D1B]/78 sm:text-base lg:pb-2"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("intro")}
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <motion.article
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.05 }}
                        className="overflow-hidden border border-[#c7a58f]/25 bg-[#fffaf1]/72 p-5 shadow-[0_18px_48px_rgba(67,52,42,0.08)]"
                    >
                        <div className="relative aspect-[4/3] lg:aspect-[16/9] min-h-[230px] overflow-hidden">
                            <Image
                                src="/babylon/club-residencial.webp"
                                alt={t("alts.casaClub")}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 50vw, 100vw"
                            />
                        </div>

                        <div className="grid gap-6 px-1 py-6 sm:grid-cols-[110px_minmax(0,1fr)] lg:px-4">
                            <div className="hidden lg:flex justify-center sm:justify-start">
                                <span className="flex h-20 w-20 items-center justify-center border border-[#c9947e]/25 text-[#b76d4b]">
                                    <Sparkles className="h-9 w-9 stroke-[1.25]" aria-hidden />
                                </span>
                            </div>
                            <div>
                                <p
                                    className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#b76d4b]/85"
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
                                    className="mt-4 max-w-[470px] text-[14px] leading-[1.85] text-[#1F1D1B]/68"
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
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75, delay: 0.1 }}
                            className="border border-[#c7a58f]/25 bg-[#fffaf1]/70 p-4 shadow-[0_18px_48px_rgba(67,52,42,0.07)] sm:p-6"
                        >
                            <div className="mb-5 flex items-start gap-5">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#c9947e]/25 text-[#b76d4b]">
                                    <Waves className="h-7 w-7 stroke-[1.25]" aria-hidden />
                                </span>
                                <div className="min-w-0">
                                    <p
                                        className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#b76d4b]/85"
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
                                {wellnessItems.map(({ key, image }) => (
                                    <div
                                        key={key}
                                        className="group grid min-h-[92px] grid-cols-[minmax(118px,0.48fr)_minmax(0,1fr)] overflow-hidden border border-[#c7a58f]/30 bg-[#fff8ed]/85 sm:grid-cols-[minmax(190px,0.48fr)_minmax(0,1fr)]"
                                    >
                                        <div className="relative min-h-0 overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={t(`wellness.items.${key}.title`)}
                                                fill
                                                className="object-cover transition duration-500 group-hover:scale-[1.03]"
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
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75, delay: 0.15 }}
                            className="overflow-hidden border border-[#c7a58f]/25 bg-[#fffaf1]/70 p-3 shadow-[0_18px_48px_rgba(67,52,42,0.07)] sm:p-6"
                        >
                            <div className="mb-5 flex items-start gap-4 sm:gap-5">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#c9947e]/25 text-[#b76d4b]">
                                    <Dumbbell className="h-7 w-7 stroke-[1.25]" aria-hidden />
                                </span>
                                <div className="min-w-0">
                                    <p
                                        className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#b76d4b]/85"
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
                                        src="/images/renders/padel.png"
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

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.12 }}
                    className="mt-8 grid overflow-hidden border border-[#c7a58f]/25 bg-[#fffaf1]/72 shadow-[0_18px_48px_rgba(67,52,42,0.06)] sm:grid-cols-2 lg:grid-cols-4"
                >
                    {featureStrip.map(({ key, icon: Icon }, index) => (
                        <div
                            key={key}
                            className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 px-4 py-4 sm:px-7 sm:py-6 lg:border-l lg:first:border-l-0 lg:border-[#c7a58f]/25"
                        >
                            <span className="flex h-14 w-14 items-center justify-center border border-[#c9947e]/25 text-[#b76d4b]">
                                <Icon className="h-6 w-6 stroke-[1.35]" aria-hidden />
                            </span>
                            <div className={index > 0 ? "lg:pl-2" : undefined}>
                                <h4
                                    className="text-[17px] leading-snug text-[#34302c]"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {t(`featureStrip.${key}.title`)}
                                </h4>
                                <p
                                    className="mt-1 text-[13px] leading-relaxed text-[#1F1D1B]/58"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {t(`featureStrip.${key}.body`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
