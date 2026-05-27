"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { getImageProps } from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import EditableText from "@/components/editor/EditableText";
import HeroBotanicalBackground from "./hero/HeroBotanicalBackground";
import HeroWeatherWidget from "./hero/HeroWeatherWidget";
import type { WeatherResponse } from "@/lib/weather";

type HeroProps = {
    initialWeather?: WeatherResponse;
};

const {
    props: { srcSet: desktopHeroSrcSet, sizes: desktopHeroSizes },
} = getImageProps({
    src: "/final-hero-2.png",
    alt: "",
    width: 2688,
    height: 1370,
    sizes: "100vw",
});

const { props: mobileHeroImageProps } = getImageProps({
    src: "/final-hero-mobile.jpg",
    alt: "",
    width: 1448,
    height: 2560,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
    className: "block h-full w-full object-cover object-center md:object-[80%_center]",
});

const titlePathVariants: Variants = {
    hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
    visible: (letterIndex = 0) => {
        const delay = 0.24 + Number(letterIndex) * 0.08;

        return {
            pathLength: 1,
            fill: "rgba(255, 243, 225, 1)",
            transition: {
                pathLength: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] },
                fill: { duration: 0.5, delay: delay + 0.35, ease: [0, 0, 0.2, 1] },
            },
        };
    },
};

const EXPLORE_SCROLL_DURATION_MS = 3400;
const EXPLORE_SCROLL_INTRO_TIME_PROGRESS = 0.28;
const EXPLORE_SCROLL_MANIFESTO_TIME_PROGRESS = 0.6;
const EXPLORE_SCROLL_FALLBACK_INTRO_DISTANCE_PROGRESS = 0.4;
const EXPLORE_SCROLL_FALLBACK_MANIFESTO_DISTANCE_PROGRESS = 0.82;

const easeInOutSine = (progress: number) => -(Math.cos(Math.PI * progress) - 1) / 2;
const easeOutQuad = (progress: number) => 1 - (1 - progress) ** 2;

type ExploreScrollCurve = {
    introDistanceProgress: number;
    manifestoDistanceProgress: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getExploreScrollCurve = (startY: number, targetY: number): ExploreScrollCurve => {
    const fallback = {
        introDistanceProgress: EXPLORE_SCROLL_FALLBACK_INTRO_DISTANCE_PROGRESS,
        manifestoDistanceProgress: EXPLORE_SCROLL_FALLBACK_MANIFESTO_DISTANCE_PROGRESS,
    };
    const manifesto = document.getElementById("proyecto");
    const distance = targetY - startY;

    if (!manifesto || distance <= 0) return fallback;

    const manifestoRect = manifesto.getBoundingClientRect();
    const manifestoTop = manifestoRect.top + startY;
    const introDistanceProgress = clamp(
        (manifestoTop + manifestoRect.height * 0.04 - startY) / distance,
        0.32,
        0.46,
    );
    const manifestoDistanceProgress = clamp(
        (manifestoTop + manifestoRect.height * 0.72 - startY) / distance,
        introDistanceProgress + 0.24,
        0.86,
    );

    return {
        introDistanceProgress,
        manifestoDistanceProgress,
    };
};

const getExploreScrollProgress = (progress: number, curve: ExploreScrollCurve) => {
    const { introDistanceProgress, manifestoDistanceProgress } = curve;

    if (progress < EXPLORE_SCROLL_INTRO_TIME_PROGRESS) {
        const localProgress = progress / EXPLORE_SCROLL_INTRO_TIME_PROGRESS;
        return introDistanceProgress * easeOutQuad(localProgress);
    }

    if (progress < EXPLORE_SCROLL_MANIFESTO_TIME_PROGRESS) {
        const localProgress =
            (progress - EXPLORE_SCROLL_INTRO_TIME_PROGRESS) /
            (EXPLORE_SCROLL_MANIFESTO_TIME_PROGRESS - EXPLORE_SCROLL_INTRO_TIME_PROGRESS);
        return (
            introDistanceProgress +
            (manifestoDistanceProgress - introDistanceProgress) * easeInOutSine(localProgress)
        );
    }

    const localProgress =
        (progress - EXPLORE_SCROLL_MANIFESTO_TIME_PROGRESS) /
        (1 - EXPLORE_SCROLL_MANIFESTO_TIME_PROGRESS);
    return manifestoDistanceProgress + (1 - manifestoDistanceProgress) * easeOutQuad(localProgress);
};

export default function Hero({ initialWeather }: HeroProps) {
    const th = useTranslations("hero");
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["-60px", "20px"]);
    const chevronOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

    const scrollToVideo = () => {
        const target = document.getElementById("home-video");
        if (!target) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            target.scrollIntoView({ block: "start" });
            return;
        }

        const startY = window.scrollY;
        const targetY = target.getBoundingClientRect().top + startY;
        const distance = targetY - startY;
        if (Math.abs(distance) < 8) return;

        const duration = EXPLORE_SCROLL_DURATION_MS;
        const scrollCurve = getExploreScrollCurve(startY, targetY);
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            window.scrollTo(0, startY + distance * getExploreScrollProgress(progress, scrollCurve));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    return (
        <section ref={ref} className="relative flex h-[800px] min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#111] md:h-dvh">
            {/* Full-bleed animated botanical background */}
            <motion.div
                className="absolute inset-0 z-0 h-full w-full overflow-hidden"
                style={{ scale: shouldReduceMotion ? 1 : imgScale }}
            >
                <picture className="absolute inset-0 block h-full w-full">
                    <source
                        media="(min-width: 768px)"
                        srcSet={desktopHeroSrcSet ?? "/final-hero-2.png"}
                        sizes={desktopHeroSizes}
                    />
                    <img {...mobileHeroImageProps} alt="" />
                </picture>
                <HeroBotanicalBackground
                    atmosphereOnly
                    className="absolute inset-0 h-full w-full min-h-full"
                    initialWeatherCondition={initialWeather?.condition}
                />
                <div className="hero-text-vignette hidden md:block" aria-hidden />
                <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            </motion.div>

            {/* Centered content block */}
            <motion.div
                className="relative top-8 z-10 flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.42),0_2px_18px_rgba(0,0,0,0.18)] md:top-0 md:px-8"
                style={{ y: shouldReduceMotion ? 0 : contentY }}
            >
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-3 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#FFF3E1] md:mb-5"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    <span>San Miguel de Allende</span>
                </motion.div>

                {/* Title Animation */}
                <motion.svg
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                    viewBox="0 0 1327 647"
                    className="mb-2 mt-0 h-auto w-full max-w-[280px] sm:max-w-[420px] md:mb-4 md:max-w-[450px] lg:max-w-[470px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g transform="matrix(1,0,0,1,-2177.39,-1092.9)">
                        <g transform="matrix(4.16667,0,0,4.16667,0,0)">
                            {/* D */}
                            <g transform="matrix(1,0,0,1,583.364,323.971)">
                                <motion.path
                                    custom={0}
                                    d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* O */}
                            <g transform="matrix(1,0,0,1,680.967,268.704)">
                                <motion.path
                                    custom={1}
                                    d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.987,13.775 11.507,-0.325 -2.998,-0.001C-15.397,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.423,61.911 -1.621,61.587"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* N */}
                            <g transform="matrix(1,0,0,1,789.338,307.844)">
                                <motion.path
                                    custom={2}
                                    d="M0,-23.095C0,-27.876 0.162,-31.847 0.487,-35.008C0.892,-38.168 1.458,-41.409 2.35,-44.732L-10.535,-44.732C-9.643,-41.409 -9.076,-38.168 -8.752,-35.008C-8.347,-31.847 -8.185,-27.876 -8.185,-23.095L-8.185,7.374L-39.951,-35.899C-42.868,-39.465 -44.733,-42.382 -45.543,-44.732L-55.834,-44.732C-54.781,-38.655 -54.213,-32.496 -54.213,-23.096L-54.213,0C-54.213,4.781 -54.376,8.752 -54.7,11.912C-55.105,15.073 -55.672,18.314 -56.564,21.637L-43.679,21.637C-44.57,18.314 -45.138,15.073 -45.461,11.912C-45.867,8.752 -46.029,4.781 -46.029,0L-46.029,-30.469L-14.262,12.804C-11.345,16.37 -9.481,19.287 -8.671,21.637L1.621,21.637C0.567,15.559 0,9.401 0,0L0,-23.095Z"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>

                            {/* D (second line) */}
                            <g transform="matrix(1,0,0,1,534.081,411.237)">
                                <motion.path
                                    custom={3}
                                    d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* I */}
                            <g transform="matrix(1,0,0,1,599.951,397.703)">
                                <motion.path
                                    custom={4}
                                    d="M0,-28.281C0,-36.385 -0.649,-41.49 -2.35,-47.325L10.534,-47.325C8.833,-41.49 8.185,-36.385 8.185,-28.281L8.185,0.001C8.185,8.104 8.833,13.21 10.534,19.044L-2.35,19.044C-0.649,13.21 0,8.104 0,0.001L0,-28.281Z"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* E */}
                            <g transform="matrix(1,0,0,1,671.843,407.508)">
                                <motion.path
                                    custom={5}
                                    d="M0,-47.891L0,-57.13L-35.089,-57.13C-33.387,-51.294 -32.738,-46.19 -32.738,-38.086L-32.738,-9.804C-32.738,-1.701 -33.387,3.405 -35.089,9.239L0,9.239L0,0.001C-5.591,2.27 -16.613,3.404 -24.554,3.404L-24.554,-21.011L-21.354,-21.011C-15.543,-21.011 -11.883,-20.546 -7.699,-19.326L-7.699,-28.565C-11.883,-27.345 -15.543,-26.879 -21.354,-26.879L-24.554,-26.879L-24.554,-51.294C-16.613,-51.294 -5.591,-50.161 0,-47.891"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* G */}
                            <g transform="matrix(1,0,0,1,746.392,405.889)">
                                <motion.path
                                    custom={6}
                                    d="M0,-44.733L-0.243,-44.651C-6.969,-48.299 -12.722,-49.676 -19.125,-49.676C-34.44,-49.676 -45.785,-38.817 -45.785,-22.529C-46.028,-6.564 -33.954,5.104 -18.152,4.861C-13.047,4.861 -8.59,3.97 -4.862,2.268L-4.862,-4.539C-4.862,-11.589 -6.159,-17.667 -8.833,-22.61L5.106,-22.61C4.052,-19.935 3.404,-15.236 3.404,-10.778L3.404,-3.323C3.404,1.296 3.809,4.861 4.62,7.374C-2.188,10.048 -10.453,11.668 -18.476,11.668C-43.435,11.831 -55.104,-3.485 -54.942,-20.989C-55.185,-41.491 -39.788,-56.564 -18.314,-56.321C-11.912,-56.321 -5.834,-55.673 0,-54.295L0,-44.733Z"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* O */}
                            <g transform="matrix(1,0,0,1,808.144,355.97)">
                                <motion.path
                                    custom={7}
                                    d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.986,13.775 11.507,-0.325 -2.998,-0.001C-15.398,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.422,61.911 -1.621,61.587"
                                    variants={titlePathVariants}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                        </g>
                    </g>
                </motion.svg>

                {/* Subtitle */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-2 max-w-[18rem] sm:max-w-sm md:mt-5 md:max-w-md lg:mt-4"
                >
                    <p className="mb-2 text-sm font-medium leading-relaxed text-[#FFF3E1] sm:text-lg md:mb-3 md:text-xl md:leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
                        <EditableText contentKey="home.hero.bodyLine1" fallback={th("bodyLine1")} />
                        <br />
                        <EditableText contentKey="home.hero.bodyLine2" fallback={th("bodyLine2")} />
                    </p>
                    <button
                        type="button"
                        onClick={scrollToVideo}
                        aria-label={th("explore")}
                        className="-mx-10 -my-4 inline-flex min-h-12 items-center justify-center px-10 py-4 transition-opacity duration-300 hover:opacity-90 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF3E1]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] sm:-mx-12 sm:-my-5 sm:min-h-14 sm:px-12 sm:py-5"
                    >
                        <motion.span
                            className="group inline-flex items-center justify-center gap-3 sm:gap-4 md:gap-5"
                            whileHover={shouldReduceMotion ? undefined : { y: 2 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="h-px w-6 bg-[#FFF3E1]/40 group-hover:w-8 transition-all duration-500 sm:w-8 md:w-10 md:group-hover:w-14" />
                            <span
                                className="text-[11px] tracking-[0.18em] text-[#FFF3E1] uppercase sm:text-xs md:text-sm md:tracking-[0.22em]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                <EditableText contentKey="home.hero.explore" fallback={th("explore")} />
                            </span>
                            <span className="h-px w-6 bg-[#FFF3E1]/40 group-hover:w-8 transition-all duration-500 sm:w-8 md:w-10 md:group-hover:w-14" />
                        </motion.span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll chevron */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
                aria-hidden
            >
                <motion.div
                    style={{ opacity: chevronOpacity }}
                    className="flex flex-col items-center"
                >
                    <motion.svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-[#FFF3E1]/50"
                        animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                </motion.div>
            </motion.div>

            <HeroWeatherWidget initialWeather={initialWeather} />
        </section>
    );
}
