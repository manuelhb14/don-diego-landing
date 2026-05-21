"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ProjectStatusPill from "@/components/ProjectStatusPill";
import EnvironmentCarousel from "@/components/EnvironmentCarousel";
import { environmentCarouselSlides } from "@/content/environmentCarousels";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function HeroPresa() {
    const t = useTranslations("pages.presa.hero");
    const tn = useTranslations("nav");
    const ref = useRef(null);
    const shouldReduceMotion = useReducedMotion() ?? false;
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window === "undefined" ? true : window.matchMedia("(min-width: 1024px)").matches,
    );

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
    const revealTransition = (duration = 0.78, delay = 0) => ({
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE_OUT_CUBIC,
    });

    return (
        <section
            ref={ref}
            className="relative w-full bg-[#EFE6DC] px-6 py-14 md:px-10 lg:px-20 lg:py-16"
        >
            <div className="flex flex-col lg:flex-row w-full overflow-hidden">

                {/* Left: Content Panel */}
                <motion.div
                    className="relative z-10 flex flex-col w-full lg:w-[75%] h-[45%] lg:h-full bg-[#fff8ed] py-8 lg:py-16"
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={revealTransition(0.6)}
                >
                    <ProjectStatusPill label={tn("status.comingSoon")} color="#C8D7E6" active={false} />

                    {/* Center: Tagline + Logo placeholder + Copy */}
                    <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-12 text-center">
                        <motion.p
                            initial={shouldReduceMotion ? false : { opacity: 0, y: -18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={revealTransition(0.78, 0.6)}
                            className="mb-2 text-xs tracking-[0.3em] text-[#5A7A8A] uppercase lg:mb-8"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("eyebrow")}
                        </motion.p>

                        <motion.svg
                            initial={shouldReduceMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={revealTransition(0.3)}
                            viewBox="0 0 2698 1984"
                            className="w-full h-auto max-w-[220px] md:max-w-[280px] lg:max-w-[300px] pb-2 pt-2 md:pt-6"
                            preserveAspectRatio="xMidYMid meet"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            strokeLinejoin="round"
                            strokeMiterlimit={2}
                        >
                            <g transform="matrix(1,0,0,1,-20434.627629,-598.731937)">
                            <motion.g
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.04,
                                                delayChildren: 1.2
                                            }
                                        }
                                    }}
                                    initial={shouldReduceMotion ? "visible" : "hidden"}
                                    animate="visible"
                                >
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,20734.810127,2104.482148)">
                                        <motion.path
                                            d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21013.202834,1947.786604)">
                                        <motion.path
                                            d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.987,13.775 11.507,-0.325 -2.998,-0.001C-15.397,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.423,61.911 -1.621,61.587"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21322.306789,2057.096944)">
                                        <motion.path
                                            d="M0,-23.095C0,-27.876 0.162,-31.847 0.487,-35.008C0.892,-38.168 1.458,-41.409 2.35,-44.732L-10.535,-44.732C-9.643,-41.409 -9.076,-38.168 -8.752,-35.008C-8.347,-31.847 -8.185,-27.876 -8.185,-23.095L-8.185,7.374L-39.951,-35.899C-42.868,-39.465 -44.733,-42.382 -45.543,-44.732L-55.834,-44.732C-54.781,-38.655 -54.213,-32.496 -54.213,-23.096L-54.213,0C-54.213,4.781 -54.376,8.752 -54.7,11.912C-55.105,15.073 -55.672,18.314 -56.564,21.637L-43.679,21.637C-44.57,18.314 -45.138,15.073 -45.461,11.912C-45.867,8.752 -46.029,4.781 -46.029,0L-46.029,-30.469L-14.262,12.804C-11.345,16.37 -9.481,19.287 -8.671,21.637L1.621,21.637C0.567,15.559 0,9.401 0,0L0,-23.095Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21501.953558,2104.482148)">
                                        <motion.path
                                            d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21689.835192,2064.492949)">
                                        <motion.path
                                            d="M0,-28.281C0,-36.385 -0.649,-41.49 -2.35,-47.325L10.534,-47.325C8.833,-41.49 8.185,-36.385 8.185,-28.281L8.185,0.001C8.185,8.104 8.833,13.21 10.534,19.044L-2.35,19.044C-0.649,13.21 0,8.104 0,0.001L0,-28.281Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,22107.528361,2090.160471)">
                                        <motion.path
                                            d="M0,-44.733L-0.243,-44.651C-6.969,-48.299 -12.722,-49.676 -19.125,-49.676C-34.44,-49.676 -45.785,-38.817 -45.785,-22.529C-46.028,-6.564 -33.954,5.104 -18.152,4.861C-13.047,4.861 -8.59,3.97 -4.862,2.268L-4.862,-4.539C-4.862,-11.589 -6.159,-17.667 -8.833,-22.61L5.106,-22.61C4.052,-19.935 3.404,-15.236 3.404,-10.778L3.404,-3.323C3.404,1.296 3.809,4.861 4.62,7.374C-2.188,10.048 -10.453,11.668 -18.476,11.668C-43.435,11.831 -55.104,-3.485 -54.942,-20.989C-55.185,-41.491 -39.788,-56.564 -18.314,-56.321C-11.912,-56.321 -5.834,-55.673 0,-54.295L0,-44.733Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,22283.664237,1947.786604)">
                                        <motion.path
                                            d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.986,13.775 11.507,-0.325 -2.998,-0.001C-15.398,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.422,61.911 -1.621,61.587"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21894.893356,2092.459717)">
                                        <motion.path
                                            d="M0,-47.891L0,-57.13L-35.089,-57.13C-33.387,-51.294 -32.738,-46.19 -32.738,-38.086L-32.738,-9.804C-32.738,-1.701 -33.387,3.405 -35.089,9.239L0,9.239L0,0.001C-5.591,2.27 -16.613,3.404 -24.554,3.404L-24.554,-21.011L-21.354,-21.011C-15.543,-21.011 -11.883,-20.546 -7.699,-19.326L-7.699,-28.565C-11.883,-27.345 -15.543,-26.879 -21.354,-26.879L-24.554,-26.879L-24.554,-51.294C-16.613,-51.294 -5.591,-50.161 0,-47.891"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,20734.810127,2104.482148)">
                                        <motion.path
                                            d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21013.202834,1947.786604)">
                                        <motion.path
                                            d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.987,13.775 11.507,-0.325 -2.998,-0.001C-15.397,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.423,61.911 -1.621,61.587"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21322.306789,2057.096944)">
                                        <motion.path
                                            d="M0,-23.095C0,-27.876 0.162,-31.847 0.487,-35.008C0.892,-38.168 1.458,-41.409 2.35,-44.732L-10.535,-44.732C-9.643,-41.409 -9.076,-38.168 -8.752,-35.008C-8.347,-31.847 -8.185,-27.876 -8.185,-23.095L-8.185,7.374L-39.951,-35.899C-42.868,-39.465 -44.733,-42.382 -45.543,-44.732L-55.834,-44.732C-54.781,-38.655 -54.213,-32.496 -54.213,-23.096L-54.213,0C-54.213,4.781 -54.376,8.752 -54.7,11.912C-55.105,15.073 -55.672,18.314 -56.564,21.637L-43.679,21.637C-44.57,18.314 -45.138,15.073 -45.461,11.912C-45.867,8.752 -46.029,4.781 -46.029,0L-46.029,-30.469L-14.262,12.804C-11.345,16.37 -9.481,19.287 -8.671,21.637L1.621,21.637C0.567,15.559 0,9.401 0,0L0,-23.095Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21501.953558,2104.482148)">
                                        <motion.path
                                            d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21689.835192,2064.492949)">
                                        <motion.path
                                            d="M0,-28.281C0,-36.385 -0.649,-41.49 -2.35,-47.325L10.534,-47.325C8.833,-41.49 8.185,-36.385 8.185,-28.281L8.185,0.001C8.185,8.104 8.833,13.21 10.534,19.044L-2.35,19.044C-0.649,13.21 0,8.104 0,0.001L0,-28.281Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,22107.528361,2090.160471)">
                                        <motion.path
                                            d="M0,-44.733L-0.243,-44.651C-6.969,-48.299 -12.722,-49.676 -19.125,-49.676C-34.44,-49.676 -45.785,-38.817 -45.785,-22.529C-46.028,-6.564 -33.954,5.104 -18.152,4.861C-13.047,4.861 -8.59,3.97 -4.862,2.268L-4.862,-4.539C-4.862,-11.589 -6.159,-17.667 -8.833,-22.61L5.106,-22.61C4.052,-19.935 3.404,-15.236 3.404,-10.778L3.404,-3.323C3.404,1.296 3.809,4.861 4.62,7.374C-2.188,10.048 -10.453,11.668 -18.476,11.668C-43.435,11.831 -55.104,-3.485 -54.942,-20.989C-55.185,-41.491 -39.788,-56.564 -18.314,-56.321C-11.912,-56.321 -5.834,-55.673 0,-54.295L0,-44.733Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,22283.664237,1947.786604)">
                                        <motion.path
                                            d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.986,13.775 11.507,-0.325 -2.998,-0.001C-15.398,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.422,61.911 -1.621,61.587"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                <g transform="matrix(0.666927,0,0,0.666927,7402.199721,1166.159021)">
                                    <g transform="matrix(2.852297,0,0,2.852297,21894.893356,2092.459717)">
                                        <motion.path
                                            d="M0,-47.891L0,-57.13L-35.089,-57.13C-33.387,-51.294 -32.738,-46.19 -32.738,-38.086L-32.738,-9.804C-32.738,-1.701 -33.387,3.405 -35.089,9.239L0,9.239L0,0.001C-5.591,2.27 -16.613,3.404 -24.554,3.404L-24.554,-21.011L-21.354,-21.011C-15.543,-21.011 -11.883,-20.546 -7.699,-19.326L-7.699,-28.565C-11.883,-27.345 -15.543,-26.879 -21.354,-26.879L-24.554,-26.879L-24.554,-51.294C-16.613,-51.294 -5.591,-50.161 0,-47.891"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                </motion.g>
                                <motion.g
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.6
                                            }
                                        }
                                    }}
                                    initial={shouldReduceMotion ? "visible" : "hidden"}
                                    animate="visible"
                                >
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9404.606,5098.471L9404.606,4993.203L9452.07,4993.203C9464.554,4993.203 9474.288,4996.01 9481.272,5001.625C9488.255,5007.239 9491.747,5014.808 9491.747,5024.332C9491.747,5033.857 9488.255,5041.426 9481.272,5047.04C9474.288,5052.655 9464.554,5055.462 9452.07,5055.462L9425.186,5055.462L9425.186,5098.471L9404.606,5098.471ZM9425.186,5039.972L9451.514,5039.972C9464.369,5039.972 9470.796,5034.759 9470.796,5024.332C9470.796,5013.906 9464.369,5008.693 9451.514,5008.693L9425.186,5008.693L9425.186,5039.972Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9528.828,5098.471L9528.828,4993.203L9574.438,4993.203C9586.675,4993.203 9596.193,4995.76 9602.991,5000.873C9609.789,5005.986 9613.188,5013.054 9613.188,5022.077C9613.188,5029.295 9610.994,5035.31 9606.606,5040.123C9602.219,5044.935 9595.946,5048.143 9587.788,5049.747L9625.054,5098.471L9602.064,5098.471L9565.539,5051.101L9549.408,5051.101L9549.408,5098.471L9528.828,5098.471ZM9549.408,5035.611L9574.438,5035.611C9586.552,5035.611 9592.608,5031.1 9592.608,5022.077C9592.608,5013.154 9586.552,5008.693 9574.438,5008.693L9549.408,5008.693L9549.408,5035.611Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9655.461,5098.471L9655.461,4993.203L9733.703,4993.203L9733.703,5008.693L9676.041,5008.693L9676.041,5034.709L9722.578,5034.709L9722.578,5050.048L9676.041,5050.048L9676.041,5082.982L9735.557,5082.982L9735.557,5098.471L9655.461,5098.471Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9764.295,5070.5L9781.167,5062.079C9785.864,5076.816 9794.887,5084.185 9808.236,5084.185C9813.922,5084.185 9818.465,5082.907 9821.864,5080.35C9825.263,5077.794 9826.962,5074.109 9826.962,5069.297C9826.962,5066.189 9825.85,5063.532 9823.625,5061.327C9821.524,5059.221 9818.959,5057.367 9815.931,5055.762C9812.902,5054.158 9807.927,5052.003 9801.005,5049.296L9797.668,5047.943C9789.139,5044.434 9782.712,5040.448 9778.386,5035.987C9774.06,5031.526 9771.897,5025.886 9771.897,5019.069C9771.897,5011.349 9775.172,5004.908 9781.723,4999.745C9788.274,4994.582 9796.556,4992 9806.568,4992C9823.501,4992 9835.182,4998.065 9841.609,5010.196L9825.108,5018.768C9821.524,5011.249 9815.344,5007.489 9806.568,5007.489C9802.365,5007.489 9798.842,5008.567 9795.999,5010.723C9793.156,5012.878 9791.735,5015.46 9791.735,5018.467C9791.735,5021.575 9792.909,5024.232 9795.258,5026.438C9797.483,5028.643 9800.202,5030.523 9803.416,5032.077C9806.629,5033.631 9811.512,5035.561 9818.063,5037.867C9828.075,5041.677 9835.522,5045.887 9840.404,5050.499C9845.287,5055.111 9847.728,5061.126 9847.728,5068.545C9847.728,5077.869 9843.989,5085.388 9836.511,5091.102C9829.033,5096.817 9819.422,5099.674 9807.68,5099.674C9796.679,5099.674 9787.223,5096.892 9779.313,5091.328C9771.402,5085.764 9766.396,5078.821 9764.295,5070.5Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9871.089,5098.471L9915.772,4993.203L9935.981,4993.203L9980.85,5098.471L9958.786,5098.471L9948.404,5072.154L9903.535,5072.154L9892.967,5098.471L9871.089,5098.471ZM9909.468,5056.665L9942.285,5056.665L9925.969,5015.309L9909.468,5056.665Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10073.924,5098.471L10073.924,4993.203L10112.674,4993.203C10129.484,4993.003 10143.73,4997.614 10155.41,5007.038C10167.091,5016.462 10172.808,5029.395 10172.56,5045.837C10172.808,5062.279 10167.091,5075.212 10155.41,5084.636C10143.73,5094.06 10129.484,5098.672 10112.674,5098.471L10073.924,5098.471ZM10094.504,5082.982L10107.297,5082.982C10119.905,5082.982 10130.411,5080.074 10138.816,5074.26C10147.345,5068.345 10151.609,5058.87 10151.609,5045.837C10151.609,5032.603 10147.345,5023.129 10138.816,5017.415C10130.535,5011.6 10120.029,5008.693 10107.297,5008.693L10094.504,5008.693L10094.504,5082.982Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10211.681,5098.471L10211.681,4993.203L10289.923,4993.203L10289.923,5008.693L10232.261,5008.693L10232.261,5034.709L10278.798,5034.709L10278.798,5050.048L10232.261,5050.048L10232.261,5082.982L10291.777,5082.982L10291.777,5098.471L10211.681,5098.471Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10392.453,5098.471L10392.453,4993.203L10413.033,4993.203L10413.033,5082.982L10469.767,5082.982L10469.767,5098.471L10392.453,5098.471Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10495.168,5098.471L10539.851,4993.203L10560.06,4993.203L10604.929,5098.471L10582.865,5098.471L10572.483,5072.154L10527.614,5072.154L10517.046,5098.471L10495.168,5098.471ZM10533.547,5056.665L10566.364,5056.665L10550.048,5015.309L10533.547,5056.665Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9563.129,5196.22C9562.881,5179.678 9568.629,5166.52 9580.371,5156.745C9592.114,5146.97 9606.39,5142.183 9623.2,5142.383C9636.797,5142.383 9648.138,5145.115 9657.222,5150.579C9666.307,5156.043 9672.395,5163.738 9675.485,5173.663L9656.759,5177.723C9651.197,5164.489 9640.011,5157.873 9623.2,5157.873C9611.705,5157.873 9602.311,5161.206 9595.019,5167.873C9587.726,5174.54 9584.08,5183.989 9584.08,5196.22C9584.08,5208.451 9587.726,5217.901 9595.019,5224.568C9602.311,5231.235 9611.705,5234.568 9623.2,5234.568C9640.011,5234.568 9651.197,5227.951 9656.759,5214.717L9675.485,5218.778C9672.395,5228.703 9666.307,5236.398 9657.222,5241.862C9648.138,5247.326 9636.797,5250.057 9623.2,5250.057C9606.39,5250.258 9592.114,5245.471 9580.371,5235.696C9568.629,5225.921 9562.881,5212.762 9563.129,5196.22Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9699.217,5248.854L9743.9,5143.586L9764.109,5143.586L9808.978,5248.854L9786.914,5248.854L9776.532,5222.537L9731.663,5222.537L9721.095,5248.854L9699.217,5248.854ZM9737.596,5207.048L9770.413,5207.048L9754.097,5165.693L9737.596,5207.048Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M9841.053,5248.854L9841.053,5143.586L9863.117,5143.586L9915.772,5219.079L9915.772,5143.586L9936.352,5143.586L9936.352,5248.854L9914.289,5248.854L9861.633,5173.512L9861.633,5248.854L9841.053,5248.854Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10004.582,5248.854L10004.582,5159.076L9967.686,5159.076L9967.686,5143.586L10062.058,5143.586L10062.058,5159.076L10025.162,5159.076L10025.162,5248.854L10004.582,5248.854Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10093.392,5248.854L10093.392,5143.586L10171.633,5143.586L10171.633,5159.076L10113.972,5159.076L10113.972,5185.092L10160.509,5185.092L10160.509,5200.431L10113.972,5200.431L10113.972,5233.365L10173.487,5233.365L10173.487,5248.854L10093.392,5248.854Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10212.423,5248.854L10212.423,5143.586L10258.033,5143.586C10270.27,5143.586 10279.787,5146.143 10286.586,5151.256C10293.384,5156.369 10296.783,5163.437 10296.783,5172.46C10296.783,5179.678 10294.589,5185.693 10290.201,5190.506C10285.813,5195.318 10279.54,5198.526 10271.382,5200.13L10308.649,5248.854L10285.658,5248.854L10249.133,5201.484L10233.003,5201.484L10233.003,5248.854L10212.423,5248.854ZM10233.003,5185.994L10258.033,5185.994C10270.146,5185.994 10276.203,5181.483 10276.203,5172.46C10276.203,5163.537 10270.146,5159.076 10258.033,5159.076L10233.003,5159.076L10233.003,5185.994Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                <g transform="matrix(2.247312,0,0,2.770701,-700.45436,-12437.147279)">
                                    <motion.path
                                        d="M10330.156,5248.854L10374.839,5143.586L10395.048,5143.586L10439.917,5248.854L10417.853,5248.854L10407.471,5222.537L10362.602,5222.537L10352.034,5248.854L10330.156,5248.854ZM10368.535,5207.048L10401.352,5207.048L10385.036,5165.693L10368.535,5207.048Z"
                                        variants={{
                                            hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                            visible: {
                                                pathLength: 1,
                                                fill: "rgba(200, 215, 230, 1)",
                                                transition: {
                                                    pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                    fill: { duration: 0.4, ease: "easeOut" }
                                                }
                                            }
                                        }}
                                        stroke="#C8D7E6"
                                        strokeWidth={1}
                                        fillRule="nonzero"
                                    />
                                </g>
                                </motion.g>
                                <motion.g
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.075,
                                                delayChildren: 0.15
                                            }
                                        }
                                    }}
                                    initial={shouldReduceMotion ? "visible" : "hidden"}
                                    animate="visible"
                                >
                                <g transform="matrix(1,0,0,1,215.919296,3.1903)">
                                    <g transform="matrix(11.718191,0,0,11.718191,21773.684673,846.278207)">
                                        <motion.path
                                            d="M0,1.021C-0.307,1.057 -0.682,0.513 -1.037,0.512C-1.39,0.512 -1.736,0.802 -2.046,0.767C-2.532,0.712 -2.752,0.591 -2.846,0.458C-2.863,0.419 -3.124,0.503 -3.107,0.462C-3,0.328 -2.544,0.125 -2.066,0.07C-1.756,0.034 -1.391,-0.232 -1.038,-0.233C-0.684,-0.233 -0.346,0.278 -0.039,0.315C0.454,0.374 1.153,0.344 1.219,0.505C1.158,0.667 0.496,0.963 0,1.021M-2.014,7.203C-2.657,7.195 -2.793,6.949 -2.743,6.771C-2.778,6.59 -2.635,6.427 -2.008,6.528C-1.744,6.571 -1.392,6.715 -1.197,6.659C-1.002,6.602 -0.658,6.65 -0.658,6.802C-0.657,6.954 -1.427,7.21 -2.014,7.203M-3.11,3.809C-3.696,3.778 -4.036,3.692 -4.116,3.515C-4.13,3.47 -4.544,3.379 -4.52,3.333C-4.367,3.171 -3.736,3.348 -3.284,3.305C-2.952,3.274 -2.591,3.11 -2.244,3.132C-1.834,3.158 -1.411,3.157 -1.167,3.244C-0.697,3.502 -1.2,3.678 -1.884,3.754C-2.263,3.797 -2.7,3.831 -3.11,3.809M-3.344,10.809C-3.404,10.907 -3.655,11.077 -4.085,11.126C-4.337,11.155 -4.634,11.246 -4.937,11.256C-5.217,11.265 -5.515,11.159 -5.793,11.151C-6.1,11.142 -6.376,10.957 -6.622,10.926C-7.094,10.866 -7.533,10.782 -7.465,10.631C-7.345,10.534 -6.857,10.327 -6.365,10.284C-6.05,10.257 -5.671,10.8 -5.313,10.799C-4.955,10.799 -4.599,10.495 -4.283,10.524C-3.812,10.569 -3.396,10.575 -3.254,10.697C-3.235,10.721 -3.335,10.783 -3.344,10.809M-7.92,14.88C-8.201,14.896 -8.523,14.869 -8.8,14.84C-9.236,14.796 -9.733,14.611 -9.722,14.462C-9.661,14.3 -9.154,14.573 -8.758,14.542C-8.482,14.52 -8.224,14.444 -7.945,14.474C-7.549,14.518 -7.235,14.38 -7.158,14.506C-7.143,14.546 -6.817,14.558 -6.816,14.602C-6.851,14.733 -7.495,14.856 -7.92,14.88M-10.968,3.808C-11.348,3.785 -11.69,3.36 -12.017,3.303C-12.544,3.212 -13.221,3.206 -13.292,3.047C-13.244,2.882 -12.562,2.802 -12.002,2.776C-11.668,2.761 -11.31,3.142 -10.927,3.165C-10.545,3.189 -10.164,2.979 -9.831,3.034C-9.293,3.122 -8.77,3.043 -8.697,3.186C-8.687,3.224 -8.697,3.32 -8.722,3.352C-8.877,3.48 -9.35,3.759 -9.848,3.784C-10.183,3.801 -10.591,3.831 -10.968,3.808M-11.062,18.506C-11.339,18.536 -11.673,18.083 -11.992,18.082C-12.309,18.082 -12.621,18.324 -12.899,18.295C-13.339,18.249 -13.551,18.142 -13.638,18.029C-13.652,17.999 -13.864,18.071 -13.851,18.039C-13.761,17.926 -13.352,17.759 -12.915,17.713C-12.637,17.683 -12.31,17.461 -11.993,17.461C-11.674,17.46 -11.368,17.887 -11.092,17.917C-10.646,17.966 -10.037,17.939 -9.973,18.074C-10.031,18.208 -10.612,18.457 -11.062,18.506M-15.604,13.405C-16.125,13.35 -16.478,13.05 -16.384,12.908C-16.254,12.83 -15.908,12.738 -15.504,12.689C-15.247,12.658 -14.945,12.672 -14.631,12.655C-14.351,12.639 -14.054,12.695 -13.76,12.691C-13.466,12.687 -13.179,12.877 -12.899,12.886C-12.584,12.896 -12.281,12.693 -12.025,12.72C-11.612,12.765 -11.424,12.957 -11.312,13.052C-11.297,13.071 -11.06,13.007 -11.064,13.032C-11.107,13.121 -11.543,13.342 -12.016,13.397C-12.276,13.428 -12.598,13.335 -12.921,13.353C-13.207,13.369 -13.513,13.296 -13.814,13.301C-14.116,13.305 -14.427,13.644 -14.711,13.637C-15.037,13.628 -15.348,13.432 -15.604,13.405M-15.605,16.663C-15.655,16.783 -16.11,16.6 -16.684,16.659C-17.009,16.692 -17.35,17.28 -17.741,17.291C-18.103,17.302 -18.485,16.97 -18.843,16.961C-19.24,16.95 -19.624,17.006 -19.939,16.969C-20.581,16.893 -20.971,16.695 -20.776,16.498C-20.613,16.409 -20.265,16.008 -19.785,15.96C-19.471,15.928 -19.078,16.279 -18.707,16.268C-18.361,16.258 -18.009,16.352 -17.664,16.362C-17.291,16.373 -16.932,16.283 -16.62,16.32C-16.14,16.376 -15.712,16.371 -15.566,16.498C-15.545,16.524 -15.601,16.632 -15.605,16.663M-17.395,20.101C-17.94,20.128 -18.161,20.082 -18.085,19.899C-17.993,19.797 -17.853,19.594 -17.388,19.571C-16.938,19.548 -16.625,19.644 -16.499,19.761C-16.484,19.779 -16.32,19.586 -16.313,19.621C-16.342,19.746 -16.885,20.077 -17.395,20.101M-20.51,5.215C-20.807,5.245 -21.102,5.159 -21.403,5.133C-21.838,5.095 -22.245,5.285 -22.307,5.132C-22.319,5.077 -22.369,5.083 -22.359,5.023C-22.274,4.863 -21.835,4.882 -21.414,4.846C-21.111,4.821 -20.766,4.514 -20.469,4.545C-20.003,4.595 -19.386,4.903 -19.409,5.074C-19.404,5.253 -20.053,5.169 -20.51,5.215M-21.278,12.762C-21.375,12.807 -21.352,12.826 -21.454,12.871C-21.789,12.96 -22.27,13.048 -22.565,12.949C-23.031,12.791 -23.089,12.682 -22.595,12.53C-22.32,12.412 -22.12,12.344 -21.786,12.433C-21.306,12.559 -20.885,12.559 -21.278,12.762M-22.195,19.081C-22.48,19.165 -22.967,18.821 -23.365,18.79C-23.722,18.762 -24.169,19.059 -24.496,18.971C-24.949,18.85 -25.227,18.422 -25.359,18.255C-25.418,17.998 -24.962,18.339 -24.335,18.381C-23.944,18.407 -23.516,18.223 -23.137,18.317C-22.505,18.473 -21.923,18.618 -22.11,18.824C-22.163,18.872 -22.13,19.047 -22.195,19.081M-26.072,16.025C-26.41,16.047 -26.754,15.952 -27.094,15.917C-27.617,15.862 -28.094,16.022 -28.105,15.851C-28.101,15.798 -28.152,15.779 -28.122,15.729C-27.963,15.588 -27.503,15.65 -27.069,15.622C-26.739,15.601 -26.362,15.301 -26.039,15.341C-25.581,15.398 -24.974,15.602 -24.88,15.775C-24.839,15.972 -25.531,15.991 -26.072,16.025M-29.63,12.988C-29.676,12.955 -29.722,13.01 -29.758,12.958C-29.811,12.772 -29.306,12.421 -28.703,12.294C-28.326,12.215 -27.88,12.206 -27.494,12.194C-26.929,12.176 -26.488,12.298 -26.409,12.515C-26.432,12.681 -26.886,12.591 -27.436,12.706C-27.789,12.781 -28.137,13.095 -28.509,13.113C-28.984,13.135 -29.416,13.11 -29.63,12.988M-30.962,8.475C-30.857,8.362 -30.273,8.406 -29.807,8.337C-29.507,8.292 -29.157,8.426 -28.814,8.41C-28.471,8.393 -28.154,8.502 -27.851,8.521C-27.403,8.549 -27.167,8.473 -27.026,8.599C-26.998,8.633 -26.633,8.47 -26.627,8.516C-26.661,8.658 -27.241,9.075 -27.766,9.156C-28.081,9.205 -28.482,9.027 -28.842,9.044C-29.208,9.061 -29.585,9.142 -29.896,9.118C-30.459,9.075 -31.054,8.688 -30.962,8.475M-31.147,3.701C-31.479,3.73 -31.817,3.645 -32.153,3.62C-32.655,3.583 -33.111,3.769 -33.161,3.611C-33.171,3.56 -33.232,3.561 -33.216,3.505C-33.099,3.35 -32.62,3.37 -32.159,3.327C-31.825,3.296 -31.449,2.985 -31.119,3.017C-30.642,3.064 -30.006,3.303 -29.939,3.491C-29.929,3.669 -30.624,3.655 -31.147,3.701M-31.879,12.75C-32.187,12.771 -32.537,12.211 -32.89,12.196C-33.242,12.181 -33.599,12.457 -33.906,12.41C-34.394,12.335 -34.6,12.222 -34.674,12.079C-34.685,12.038 -34.947,12.073 -34.923,12.037C-34.787,11.91 -34.334,11.747 -33.872,11.713C-33.561,11.69 -33.185,11.44 -32.836,11.455C-32.482,11.47 -32.169,11.997 -31.866,12.048C-31.368,12.131 -30.669,12.152 -30.636,12.319C-30.695,12.468 -31.373,12.715 -31.879,12.75M-34.285,6.737C-34.683,6.763 -35.098,6.676 -35.496,6.651C-36.109,6.612 -36.652,6.795 -36.705,6.632C-36.714,6.588 -36.772,6.594 -36.759,6.542C-36.653,6.381 -36.067,6.394 -35.473,6.351C-35.064,6.321 -34.607,6.009 -34.206,6.04C-33.566,6.09 -32.812,6.458 -32.84,6.678C-32.895,6.837 -33.672,6.698 -34.285,6.737M-36.948,1.434C-37.484,1.393 -37.774,1.278 -37.881,1.16C-37.906,1.126 -38.359,1.199 -38.356,1.149C-38.284,0.993 -37.572,0.947 -37.039,0.88C-36.711,0.838 -36.337,0.734 -35.957,0.727C-35.581,0.72 -35.2,0.779 -34.867,0.806C-34.363,0.847 -33.688,0.736 -33.546,0.855C-33.454,1.054 -34.147,1.355 -34.748,1.431C-35.078,1.472 -35.461,1.402 -35.85,1.409C-36.232,1.415 -36.609,1.459 -36.948,1.434M-28.423,-2.094C-28.564,-2.005 -28.83,-1.787 -29.341,-1.7C-29.647,-1.648 -29.992,-1.478 -30.381,-1.432C-30.713,-1.393 -31.107,-1.727 -31.475,-1.694C-31.821,-1.663 -32.169,-1.579 -32.527,-1.556C-32.883,-1.532 -33.227,-1.286 -33.576,-1.271C-33.944,-1.256 -34.304,-1.21 -34.641,-1.207C-35.031,-1.204 -35.384,-1.475 -35.697,-1.491C-36.181,-1.517 -36.556,-1.456 -36.746,-1.539C-36.754,-1.542 -36.63,-1.539 -36.639,-1.534C-36.648,-1.527 -36.625,-1.529 -36.633,-1.523C-36.678,-1.477 -36.98,-1.517 -36.982,-1.533C-36.98,-1.559 -36.918,-1.74 -36.86,-1.784C-36.85,-1.794 -36.728,-1.655 -36.719,-1.66C-36.548,-1.779 -36.217,-1.968 -35.79,-2.038C-35.482,-2.088 -35.129,-2.308 -34.732,-2.354C-34.394,-2.394 -33.965,-1.79 -33.591,-1.824C-33.239,-1.856 -32.891,-2.021 -32.529,-2.045C-32.165,-2.07 -31.81,-2.192 -31.457,-2.209C-31.081,-2.226 -30.713,-1.996 -30.374,-2.001C-29.971,-2.007 -29.608,-2.289 -29.299,-2.274C-28.648,-2.244 -28.352,-2.242 -28.423,-2.094M-21.588,7.769C-21.709,7.898 -22.313,7.827 -22.792,7.838C-23.104,7.846 -23.441,7.666 -23.792,7.634C-24.145,7.602 -24.455,7.449 -24.758,7.387C-25.255,7.285 -25.486,7.4 -25.529,7.249C-25.529,7.205 -25.883,7.08 -25.856,7.048C-25.698,6.933 -25.159,6.753 -24.698,6.74C-24.382,6.73 -24.013,6.958 -23.661,6.988C-23.303,7.019 -22.925,6.989 -22.624,7.054C-22.098,7.167 -21.538,7.584 -21.588,7.769M-23.524,2.001C-23.883,2.065 -24.323,2.013 -24.736,2.049C-25.154,2.085 -25.579,2.114 -25.939,2.108C-26.597,2.097 -27.1,1.891 -27.023,1.672C-26.921,1.543 -26.45,1.471 -25.897,1.373C-25.551,1.312 -25.139,1.487 -24.74,1.454C-24.343,1.421 -23.966,1.138 -23.612,1.145C-23.087,1.154 -22.793,1.375 -22.624,1.503C-22.596,1.531 -22.128,1.306 -22.114,1.347C-22.122,1.487 -22.898,1.89 -23.524,2.001M-17.155,1.672C-17.217,1.851 -17.814,1.505 -18.311,1.516C-18.648,1.524 -19.004,1.807 -19.336,1.753C-19.828,1.674 -20.047,1.585 -20.086,1.404C-20.084,1.349 -20.321,1.345 -20.289,1.304C-20.123,1.161 -19.675,1.109 -19.236,1.107C-18.898,1.105 -18.471,0.813 -18.149,0.869C-17.629,0.96 -17.11,1.501 -17.155,1.672M-13.405,-0.001C-13.84,-0.039 -14.041,-0.111 -14.103,-0.264C-14.115,-0.319 -14.553,-0.331 -14.544,-0.39C-14.458,-0.551 -13.821,-0.454 -13.4,-0.489C-13.097,-0.515 -12.767,-0.672 -12.47,-0.641C-12.003,-0.592 -11.53,-0.433 -11.553,-0.263C-11.548,-0.083 -12.03,-0.075 -12.487,-0.029C-12.784,0 -13.104,0.025 -13.405,-0.001M-15.139,9.952C-15.24,10.171 -16.025,10.187 -16.554,10.179C-17.142,10.17 -17.542,10.053 -17.488,9.832C-17.528,9.608 -17.131,9.758 -16.548,9.75C-16.019,9.743 -15.67,9.622 -15.57,9.839C-15.553,9.896 -15.127,9.893 -15.139,9.952M-15.76,6.99C-15.682,6.859 -15.128,6.817 -14.685,6.786C-14.406,6.766 -14.094,6.903 -13.775,6.916C-13.457,6.929 -13.167,7.045 -12.889,7.085C-12.444,7.148 -12.217,7.08 -12.145,7.195C-12.134,7.226 -11.826,7.26 -11.844,7.289C-11.954,7.399 -12.441,7.591 -12.87,7.621C-13.15,7.64 -13.486,7.464 -13.803,7.452C-14.122,7.44 -14.455,7.481 -14.731,7.439C-15.182,7.372 -15.714,7.127 -15.76,6.99M-9.288,1.288C-9.304,1.25 -9.407,1.206 -9.391,1.165C-9.284,1.031 -8.818,0.761 -8.341,0.705C-8.031,0.67 -7.655,0.778 -7.303,0.778C-6.948,0.777 -6.611,0.993 -6.303,1.03C-5.811,1.089 -5.242,1.062 -5.175,1.223C-5.237,1.385 -5.76,1.762 -6.255,1.821C-6.562,1.857 -6.947,1.205 -7.302,1.204C-7.655,1.203 -8.007,1.566 -8.316,1.531C-8.803,1.476 -9.193,1.421 -9.288,1.288M-8.573,6.579C-8.321,6.546 -7.995,6.777 -7.691,6.761C-7.409,6.746 -7.116,6.498 -6.837,6.5C-6.529,6.503 -6.248,6.855 -6.001,6.881C-5.517,6.933 -5.176,6.949 -5.278,7.108C-5.392,7.203 -5.792,7.352 -6.285,7.403C-6.598,7.435 -6.966,7.283 -7.322,7.291C-7.679,7.299 -8.017,7.13 -8.33,7.109C-8.818,7.075 -9.258,7.296 -9.374,7.176C-9.391,7.151 -9.334,7.069 -9.332,7.038C-9.289,6.939 -9.013,6.637 -8.573,6.579M-18.905,-19.688C-17.307,-19.688 -15.765,-19.335 -14.262,-18.97C-12.723,-18.596 -11.191,-18.198 -9.803,-17.487C-8.403,-16.768 -7.195,-15.742 -6.003,-14.725C-4.81,-13.708 -3.756,-12.567 -2.825,-11.298C-1.902,-10.041 -1.025,-8.739 -0.413,-7.28C0.186,-5.853 0.727,-4.248 0.978,-2.671C-1.091,-1.938 -3.165,-2.775 -5.273,-3.456C-6.831,-3.958 -8.467,-4.257 -10.081,-4.14C-11.662,-4.027 -13.498,-3.838 -15.324,-3.293C-15.789,-3.154 -16.233,-2.989 -16.671,-2.839C-17.949,-2.402 -19.198,-1.998 -20.626,-1.986C-22.86,-1.96 -24.993,-2.717 -27.014,-3.466C-28.38,-3.973 -29.739,-4.64 -31.198,-4.927C-32.135,-5.111 -33.046,-5.172 -33.917,-5.172C-35.593,-5.172 -37.175,-4.803 -38.446,-4.144C-38.097,-5.615 -37.402,-7.017 -36.754,-8.336C-36.091,-9.682 -35.436,-11.021 -34.505,-12.17C-33.566,-13.33 -32.463,-14.34 -31.297,-15.262C-30.132,-16.183 -28.852,-16.935 -27.506,-17.582C-26.174,-18.221 -24.817,-18.872 -23.352,-19.206C-21.922,-19.532 -20.419,-19.688 -18.905,-19.688M-18.905,-21.397C-20.365,-21.397 -21.81,-21.414 -23.191,-21.14C-24.613,-20.858 -25.938,-20.277 -27.247,-19.733C-28.577,-19.18 -29.929,-18.656 -31.113,-17.863C-32.305,-17.064 -33.434,-16.143 -34.446,-15.131C-35.457,-14.12 -36.285,-12.928 -37.084,-11.736C-37.877,-10.552 -38.435,-9.238 -38.988,-7.908C-39.532,-6.599 -40.192,-5.302 -40.475,-3.881C-40.749,-2.5 -40.667,-1.051 -40.667,0.409C-40.667,1.87 -40.521,3.273 -40.246,4.654C-39.964,6.076 -39.539,7.421 -38.995,8.729C-38.442,10.06 -37.787,11.311 -36.994,12.494C-36.195,13.686 -35.271,14.753 -34.26,15.764C-33.248,16.776 -32.247,17.796 -31.054,18.595C-29.871,19.388 -28.595,20.042 -27.264,20.595C-25.955,21.139 -24.579,21.506 -23.157,21.788C-21.776,22.063 -20.365,22.435 -18.905,22.435C-17.445,22.435 -16.022,22.119 -14.641,21.845C-13.22,21.562 -11.83,21.196 -10.521,20.652C-9.19,20.099 -7.897,19.451 -6.713,18.657C-5.521,17.858 -4.516,16.82 -3.505,15.809C-2.494,14.798 -1.435,13.807 -0.636,12.615C0.158,11.431 0.873,10.16 1.426,8.829C1.97,7.52 2.329,6.11 2.611,4.688C2.885,3.308 2.827,1.869 2.827,0.409C2.827,-1.051 2.729,-2.458 2.455,-3.839C2.173,-5.261 1.818,-6.639 1.274,-7.948C0.721,-9.279 0.083,-10.563 -0.711,-11.746C-1.51,-12.938 -2.352,-14.122 -3.363,-15.133C-4.374,-16.144 -5.52,-17.041 -6.713,-17.84C-7.896,-18.633 -9.146,-19.389 -10.477,-19.942C-11.785,-20.486 -13.239,-20.648 -14.661,-20.93C-16.042,-21.204 -17.445,-21.397 -18.905,-21.397"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(200, 215, 230, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(200, 215, 230, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.3, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#C8D7E6"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                                </motion.g>
                            </g>
                </motion.svg>

                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={revealTransition(0.78, 0.65)}
                            className="mt-6 flex flex-col items-center gap-2"
                        >
                            <p
                                className="text-base leading-relaxed text-[#5A7A8A] lg:text-xl"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                {t("tagline")}
                            </p>
                            <p
                                className="hidden lg:block text-[#222222]/70 text-sm lg:text-base leading-relaxed max-w-sm"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("description")}
                            </p>
                        </motion.div>
                    </div>

                </motion.div>

                {/* Right: Image */}
                <div className="w-full h-[240px] sm:h-[320px] lg:relative lg:h-auto">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={revealTransition(0.9)}
                        className="relative w-full h-full lg:absolute lg:inset-0"
                    >
                        <EnvironmentCarousel
                            slides={environmentCarouselSlides.presa}
                            accent="#C8D7E6"
                            className="h-full"
                            imageLayerClassName="absolute left-0 top-0 h-full w-full lg:h-[112%]"
                            imageMotionY={isDesktop && !shouldReduceMotion ? imgY : 0}
                            priority
                            imageClassName="object-center"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
