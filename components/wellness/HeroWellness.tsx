"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function HeroWellness() {
    const t = useTranslations("pages.wellness.hero");
    const ref = useRef(null);
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

    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section ref={ref} className="relative w-full bg-[#EFE6DC] py-16 px-6 md:px-10 lg:px-20">
            <div className="flex flex-col lg:flex-row w-full overflow-hidden">

                {/* Left: Content Panel */}
                <motion.div
                    className="relative z-10 flex flex-col w-full lg:w-[75%] h-[45%] lg:h-full bg-[#fff8ed] py-8 lg:py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >

                    {/* Center: Logo & Title */}
                    <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-12 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-xs lg:text-sm tracking-[0.3em] text-[#b8b267] uppercase mb-2 lg:mb-8"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("eyebrow")}
                        </motion.p>

                        <motion.svg
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            viewBox="0 0 4076 1516"
                            className="w-full h-auto max-w-[320px] lg:max-w-[560px] pb-2 pt-2 md:pt-6"
                            preserveAspectRatio="xMidYMid meet"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            strokeLinejoin="round"
                            strokeMiterlimit={2}
                        >
                            <g transform="matrix(1,0,0,1,-7152.375,-4293.004756)">
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
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,20734.810127,2104.482148)">
                                            <motion.path
                                                d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21013.202834,1947.786604)">
                                            <motion.path
                                                d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.987,13.775 11.507,-0.325 -2.998,-0.001C-15.397,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.423,61.911 -1.621,61.587"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21322.306789,2057.096944)">
                                            <motion.path
                                                d="M0,-23.095C0,-27.876 0.162,-31.847 0.487,-35.008C0.892,-38.168 1.458,-41.409 2.35,-44.732L-10.535,-44.732C-9.643,-41.409 -9.076,-38.168 -8.752,-35.008C-8.347,-31.847 -8.185,-27.876 -8.185,-23.095L-8.185,7.374L-39.951,-35.899C-42.868,-39.465 -44.733,-42.382 -45.543,-44.732L-55.834,-44.732C-54.781,-38.655 -54.213,-32.496 -54.213,-23.096L-54.213,0C-54.213,4.781 -54.376,8.752 -54.7,11.912C-55.105,15.073 -55.672,18.314 -56.564,21.637L-43.679,21.637C-44.57,18.314 -45.138,15.073 -45.461,11.912C-45.867,8.752 -46.029,4.781 -46.029,0L-46.029,-30.469L-14.262,12.804C-11.345,16.37 -9.481,19.287 -8.671,21.637L1.621,21.637C0.567,15.559 0,9.401 0,0L0,-23.095Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21501.953558,2104.482148)">
                                            <motion.path
                                                d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21689.835192,2064.492949)">
                                            <motion.path
                                                d="M0,-28.281C0,-36.385 -0.649,-41.49 -2.35,-47.325L10.534,-47.325C8.833,-41.49 8.185,-36.385 8.185,-28.281L8.185,0.001C8.185,8.104 8.833,13.21 10.534,19.044L-2.35,19.044C-0.649,13.21 0,8.104 0,0.001L0,-28.281Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,22107.528361,2090.160471)">
                                            <motion.path
                                                d="M0,-44.733L-0.243,-44.651C-6.969,-48.299 -12.722,-49.676 -19.125,-49.676C-34.44,-49.676 -45.785,-38.817 -45.785,-22.529C-46.028,-6.564 -33.954,5.104 -18.152,4.861C-13.047,4.861 -8.59,3.97 -4.862,2.268L-4.862,-4.539C-4.862,-11.589 -6.159,-17.667 -8.833,-22.61L5.106,-22.61C4.052,-19.935 3.404,-15.236 3.404,-10.778L3.404,-3.323C3.404,1.296 3.809,4.861 4.62,7.374C-2.188,10.048 -10.453,11.668 -18.476,11.668C-43.435,11.831 -55.104,-3.485 -54.942,-20.989C-55.185,-41.491 -39.788,-56.564 -18.314,-56.321C-11.912,-56.321 -5.834,-55.673 0,-54.295L0,-44.733Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,22283.664237,1947.786604)">
                                            <motion.path
                                                d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.986,13.775 11.507,-0.325 -2.998,-0.001C-15.398,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.422,61.911 -1.621,61.587"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21894.893356,2092.459717)">
                                            <motion.path
                                                d="M0,-47.891L0,-57.13L-35.089,-57.13C-33.387,-51.294 -32.738,-46.19 -32.738,-38.086L-32.738,-9.804C-32.738,-1.701 -33.387,3.405 -35.089,9.239L0,9.239L0,0.001C-5.591,2.27 -16.613,3.404 -24.554,3.404L-24.554,-21.011L-21.354,-21.011C-15.543,-21.011 -11.883,-20.546 -7.699,-19.326L-7.699,-28.565C-11.883,-27.345 -15.543,-26.879 -21.354,-26.879L-24.554,-26.879L-24.554,-51.294C-16.613,-51.294 -5.591,-50.161 0,-47.891"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,20734.810127,2104.482148)">
                                            <motion.path
                                                d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21013.202834,1947.786604)">
                                            <motion.path
                                                d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.987,13.775 11.507,-0.325 -2.998,-0.001C-15.397,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.423,61.911 -1.621,61.587"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21322.306789,2057.096944)">
                                            <motion.path
                                                d="M0,-23.095C0,-27.876 0.162,-31.847 0.487,-35.008C0.892,-38.168 1.458,-41.409 2.35,-44.732L-10.535,-44.732C-9.643,-41.409 -9.076,-38.168 -8.752,-35.008C-8.347,-31.847 -8.185,-27.876 -8.185,-23.095L-8.185,7.374L-39.951,-35.899C-42.868,-39.465 -44.733,-42.382 -45.543,-44.732L-55.834,-44.732C-54.781,-38.655 -54.213,-32.496 -54.213,-23.096L-54.213,0C-54.213,4.781 -54.376,8.752 -54.7,11.912C-55.105,15.073 -55.672,18.314 -56.564,21.637L-43.679,21.637C-44.57,18.314 -45.138,15.073 -45.461,11.912C-45.867,8.752 -46.029,4.781 -46.029,0L-46.029,-30.469L-14.262,12.804C-11.345,16.37 -9.481,19.287 -8.671,21.637L1.621,21.637C0.567,15.559 0,9.401 0,0L0,-23.095Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21501.953558,2104.482148)">
                                            <motion.path
                                                d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21689.835192,2064.492949)">
                                            <motion.path
                                                d="M0,-28.281C0,-36.385 -0.649,-41.49 -2.35,-47.325L10.534,-47.325C8.833,-41.49 8.185,-36.385 8.185,-28.281L8.185,0.001C8.185,8.104 8.833,13.21 10.534,19.044L-2.35,19.044C-0.649,13.21 0,8.104 0,0.001L0,-28.281Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,22107.528361,2090.160471)">
                                            <motion.path
                                                d="M0,-44.733L-0.243,-44.651C-6.969,-48.299 -12.722,-49.676 -19.125,-49.676C-34.44,-49.676 -45.785,-38.817 -45.785,-22.529C-46.028,-6.564 -33.954,5.104 -18.152,4.861C-13.047,4.861 -8.59,3.97 -4.862,2.268L-4.862,-4.539C-4.862,-11.589 -6.159,-17.667 -8.833,-22.61L5.106,-22.61C4.052,-19.935 3.404,-15.236 3.404,-10.778L3.404,-3.323C3.404,1.296 3.809,4.861 4.62,7.374C-2.188,10.048 -10.453,11.668 -18.476,11.668C-43.435,11.831 -55.104,-3.485 -54.942,-20.989C-55.185,-41.491 -39.788,-56.564 -18.314,-56.321C-11.912,-56.321 -5.834,-55.673 0,-54.295L0,-44.733Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,22283.664237,1947.786604)">
                                            <motion.path
                                                d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.986,13.775 11.507,-0.325 -2.998,-0.001C-15.398,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.422,61.911 -1.621,61.587"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(0.666927,0,0,0.666927,-5172.969575,4391.968721)">
                                        <g transform="matrix(2.852297,0,0,2.852297,21894.893356,2092.459717)">
                                            <motion.path
                                                d="M0,-47.891L0,-57.13L-35.089,-57.13C-33.387,-51.294 -32.738,-46.19 -32.738,-38.086L-32.738,-9.804C-32.738,-1.701 -33.387,3.405 -35.089,9.239L0,9.239L0,0.001C-5.591,2.27 -16.613,3.404 -24.554,3.404L-24.554,-21.011L-21.354,-21.011C-15.543,-21.011 -11.883,-20.546 -7.699,-19.326L-7.699,-28.565C-11.883,-27.345 -15.543,-26.879 -21.354,-26.879L-24.554,-26.879L-24.554,-51.294C-16.613,-51.294 -5.591,-50.161 0,-47.891"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.4, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
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
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9124.271,5287L9089.971,4995.333L9111.663,4995.333L9135.581,5220.333L9161.538,5026.167L9179.522,5026.167L9205.479,5220.333L9229.397,4995.333L9251.089,4995.333L9216.789,5287L9195.838,5287L9170.437,5101.167L9145.222,5287L9124.271,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9281.496,5287L9281.496,4995.333L9359.737,4995.333L9359.737,5038.25L9302.076,5038.25L9302.076,5110.333L9348.613,5110.333L9348.613,5152.833L9302.076,5152.833L9302.076,5244.083L9361.592,5244.083L9361.592,5287L9281.496,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9400.527,5287L9400.527,4995.333L9421.107,4995.333L9421.107,5244.083L9477.842,5244.083L9477.842,5287L9400.527,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9514.737,5287L9514.737,4995.333L9535.318,4995.333L9535.318,5244.083L9592.052,5244.083L9592.052,5287L9514.737,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9628.948,5287L9628.948,4995.333L9651.011,4995.333L9703.667,5204.5L9703.667,4995.333L9724.247,4995.333L9724.247,5287L9702.184,5287L9649.528,5078.25L9649.528,5287L9628.948,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9769.857,5287L9769.857,4995.333L9848.099,4995.333L9848.099,5038.25L9790.437,5038.25L9790.437,5110.333L9836.974,5110.333L9836.974,5152.833L9790.437,5152.833L9790.437,5244.083L9849.953,5244.083L9849.953,5287L9769.857,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9878.691,5209.5L9895.563,5186.167C9900.26,5227 9909.283,5247.417 9922.632,5247.417C9928.318,5247.417 9932.86,5243.875 9936.26,5236.792C9939.659,5229.708 9941.358,5219.5 9941.358,5206.167C9941.358,5197.556 9940.246,5190.194 9938.021,5184.083C9935.92,5178.25 9933.355,5173.111 9930.327,5168.667C9927.298,5164.222 9922.323,5158.25 9915.401,5150.75L9912.064,5147C9903.535,5137.278 9897.108,5126.236 9892.782,5113.875C9888.456,5101.514 9886.292,5085.889 9886.292,5067C9886.292,5045.611 9889.568,5027.764 9896.119,5013.458C9902.67,4999.153 9910.952,4992 9920.964,4992C9937.897,4992 9949.578,5008.806 9956.005,5042.417L9939.504,5066.167C9935.92,5045.333 9929.739,5034.917 9920.964,5034.917C9916.761,5034.917 9913.238,5037.903 9910.395,5043.875C9907.552,5049.847 9906.131,5057 9906.131,5065.333C9906.131,5073.944 9907.305,5081.306 9909.654,5087.417C9911.879,5093.528 9914.598,5098.736 9917.812,5103.042C9921.025,5107.347 9925.908,5112.694 9932.459,5119.083C9942.471,5129.639 9949.918,5141.306 9954.8,5154.083C9959.683,5166.861 9962.124,5183.528 9962.124,5204.083C9962.124,5229.917 9958.385,5250.75 9950.907,5266.583C9943.429,5282.417 9933.818,5290.333 9922.076,5290.333C9911.075,5290.333 9901.619,5282.625 9893.709,5267.208C9885.798,5251.792 9880.792,5232.556 9878.691,5209.5Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M9990.676,5209.5L10007.548,5186.167C10012.245,5227 10021.269,5247.417 10034.618,5247.417C10040.304,5247.417 10044.846,5243.875 10048.245,5236.792C10051.644,5229.708 10053.344,5219.5 10053.344,5206.167C10053.344,5197.556 10052.231,5190.194 10050.007,5184.083C10047.905,5178.25 10045.341,5173.111 10042.312,5168.667C10039.284,5164.222 10034.309,5158.25 10027.387,5150.75L10024.05,5147C10015.521,5137.278 10009.094,5126.236 10004.767,5113.875C10000.441,5101.514 9998.278,5085.889 9998.278,5067C9998.278,5045.611 10001.554,5027.764 10008.105,5013.458C10014.656,4999.153 10022.937,4992 10032.949,4992C10049.883,4992 10061.564,5008.806 10067.991,5042.417L10051.49,5066.167C10047.905,5045.333 10041.725,5034.917 10032.949,5034.917C10028.747,5034.917 10025.224,5037.903 10022.381,5043.875C10019.538,5049.847 10018.117,5057 10018.117,5065.333C10018.117,5073.944 10019.291,5081.306 10021.639,5087.417C10023.864,5093.528 10026.584,5098.736 10029.797,5103.042C10033.011,5107.347 10037.893,5112.694 10044.444,5119.083C10054.456,5129.639 10061.904,5141.306 10066.786,5154.083C10071.668,5166.861 10074.109,5183.528 10074.109,5204.083C10074.109,5229.917 10070.37,5250.75 10062.892,5266.583C10055.414,5282.417 10045.804,5290.333 10034.062,5290.333C10023.061,5290.333 10013.605,5282.625 10005.694,5267.208C9997.784,5251.792 9992.778,5232.556 9990.676,5209.5Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M10166.071,5141.167C10165.824,5095.333 10171.572,5058.875 10183.314,5031.792C10195.056,5004.708 10209.333,4991.444 10226.143,4992C10239.739,4992 10251.08,4999.569 10260.165,5014.708C10269.25,5029.847 10275.338,5051.167 10278.428,5078.667L10259.702,5089.917C10254.139,5053.25 10242.953,5034.917 10226.143,5034.917C10214.648,5034.917 10205.254,5044.153 10197.961,5062.625C10190.668,5081.097 10187.022,5107.278 10187.022,5141.167C10187.022,5175.056 10190.668,5201.236 10197.961,5219.708C10205.254,5238.181 10214.648,5247.417 10226.143,5247.417C10242.953,5247.417 10254.139,5229.083 10259.702,5192.417L10278.428,5203.667C10275.338,5231.167 10269.25,5252.486 10260.165,5267.625C10251.08,5282.764 10239.739,5290.333 10226.143,5290.333C10209.333,5290.889 10195.056,5277.625 10183.314,5250.542C10171.572,5223.458 10165.824,5187 10166.071,5141.167Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M10316.807,5287L10316.807,4995.333L10395.048,4995.333L10395.048,5038.25L10337.387,5038.25L10337.387,5110.333L10383.924,5110.333L10383.924,5152.833L10337.387,5152.833L10337.387,5244.083L10396.903,5244.083L10396.903,5287L10316.807,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M10435.838,5287L10435.838,4995.333L10457.901,4995.333L10510.557,5204.5L10510.557,4995.333L10531.137,4995.333L10531.137,5287L10509.074,5287L10456.418,5078.25L10456.418,5287L10435.838,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M10599.367,5287L10599.367,5038.25L10562.471,5038.25L10562.471,4995.333L10656.843,4995.333L10656.843,5038.25L10619.947,5038.25L10619.947,5287L10599.367,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M10688.176,5287L10688.176,4995.333L10766.418,4995.333L10766.418,5038.25L10708.757,5038.25L10708.757,5110.333L10755.294,5110.333L10755.294,5152.833L10708.757,5152.833L10708.757,5244.083L10768.272,5244.083L10768.272,5287L10688.176,5287Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
                                            strokeWidth={1}
                                            fillRule="nonzero"
                                        />
                                    </g>
                                    <g transform="matrix(2.247312,0,0,1,-13275.623656,123)">
                                        <motion.path
                                            d="M10807.208,5287L10807.208,4995.333L10852.818,4995.333C10865.054,4995.333 10874.572,5002.417 10881.37,5016.583C10888.168,5030.75 10891.568,5050.333 10891.568,5075.333C10891.568,5095.333 10889.374,5112 10884.986,5125.333C10880.598,5138.667 10874.325,5147.556 10866.167,5152L10903.434,5287L10880.443,5287L10843.918,5155.75L10827.788,5155.75L10827.788,5287L10807.208,5287ZM10827.788,5112.833L10852.818,5112.833C10864.931,5112.833 10870.987,5100.333 10870.987,5075.333C10870.987,5050.611 10864.931,5038.25 10852.818,5038.25L10827.788,5038.25L10827.788,5112.833Z"
                                            variants={{
                                                hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                visible: {
                                                    pathLength: 1,
                                                    fill: "rgba(215, 215, 170, 1)",
                                                    transition: {
                                                        pathLength: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                                                        fill: { duration: 0.4, ease: "easeOut" }
                                                    }
                                                }
                                            }}
                                            stroke="#D7D7AA"
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
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <g transform="matrix(13.453759,0,0,13.453759,-16513.417098,-1745.057611)">
                                        <g transform="matrix(1,0,0,1,1931.994366,448.5846)">
                                            <motion.path
                                                d="M0,25.923C-0.531,25.518 -1.249,25.311 -1.916,25.091C-4.017,24.434 -6.941,23.683 -8.889,22.979C-10.775,22.333 -9.35,21.557 -8.393,20.88C-6.751,19.829 -3.932,18.076 -2.258,17.008C-1.878,16.732 -0.462,15.893 -0.872,15.537C-1.385,15.349 -1.991,15.496 -2.585,15.556C-4.261,15.835 -7.059,16.378 -8.887,16.702C-9.587,16.787 -10.423,17.026 -11.058,16.773C-12.401,16.136 -2.381,5.628 -6.534,7.804C-16.556,14.04 -14.824,15.011 -13.219,3.693C-13.019,0.777 -15.665,5.815 -16.136,6.456C-16.669,7.31 -17.167,8.153 -17.6,8.788C-18.174,9.623 -18.589,10.087 -18.875,9.997C-19.432,9.619 -19.434,8.678 -19.613,8.029C-19.922,6.252 -20.34,3.47 -20.644,1.822C-20.752,1.423 -20.971,-0.054 -21.413,0.26C-22.115,1.532 -22.116,3.298 -22.451,4.876C-22.778,6.377 -22.898,9.025 -23.596,9.937C-24.609,11.024 -29.612,-0.561 -29.359,3.755C-29.283,4.867 -28.84,6.921 -28.529,8.741C-28.331,10.164 -27.95,11.083 -28.215,12.217C-28.634,12.845 -30.098,11.631 -30.772,11.251C-32.187,10.324 -34.301,8.848 -35.634,8.034C-37.942,6.65 -36.893,8.338 -36.223,9.307C-34.985,11.075 -33.041,13.622 -31.854,15.411C-30.506,17.384 -32.386,16.873 -33.695,16.702C-35.523,16.378 -38.321,15.835 -39.997,15.556C-42.375,15.192 -42.24,15.751 -40.392,16.963C-38.773,17.999 -36.007,19.721 -34.327,20.789C-33.804,21.149 -33.19,21.513 -32.842,21.984C-32.747,22.129 -32.722,22.257 -32.773,22.377C-33.181,22.948 -34.09,23.093 -34.76,23.348C-37.164,24.161 -40.267,24.732 -42.433,25.824C-43.138,26.281 -42.307,26.464 -41.826,26.425C-36.135,26.393 -5.701,26.484 -0.259,26.395C0.097,26.33 0.274,26.177 0.019,25.94L0,25.923Z"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.3, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(13.453759,0,0,13.453759,-16513.417098,-1745.057611)">
                                        <g transform="matrix(1,0,0,1,1891.626266,478.8732)">
                                            <motion.path
                                                d="M0,1.663C0,1.663 3.211,2.197 4.79,1.928C6.49,1.638 7.876,1.851 9.572,1.904C12.737,2.003 15.951,2.14 19.118,2.071C20.618,2.038 22.072,1.854 23.575,1.951C25.254,2.059 26.977,2.423 28.652,2.426C30.163,2.428 31.598,1.998 33.131,2.038C34.865,2.084 36.489,1.97 38.212,2.065C39.654,2.145 39.633,1.302 38.139,1.01C36.426,0.676 34.889,-0.247 33.131,-0.293C31.575,-0.334 30.181,0.068 28.652,0.095C27,0.124 25.234,-0.275 23.575,-0.38C22.071,-0.475 20.618,-0.293 19.118,-0.26C15.95,-0.191 12.738,-0.328 9.572,-0.427C8.177,-0.471 6.834,-0.765 5.436,-0.565C3.614,-0.304 1.878,0.41 0.037,0.493C-1.457,0.56 -1.504,1.439 0,1.663"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.3, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(13.453759,0,0,13.453759,-16513.417098,-1745.057611)">
                                        <g transform="matrix(1,0,0,1,1897.451166,484.8861)">
                                            <motion.path
                                                d="M0,1.181C1.974,1.371 5.433,1.971 7.414,1.924C9.384,1.877 11.262,1.536 13.227,1.645C15.059,1.747 16.886,1.799 18.722,1.713C19.691,1.668 20.658,1.544 21.625,1.459C22.762,1.36 25.529,1.275 26.654,1.163C28.116,1.016 28.195,0.259 26.727,0.066C25.702,-0.069 19.982,-0.547 19.014,-0.483C17.078,-0.354 15.16,-0.578 13.227,-0.686C11.351,-0.79 9.61,-0.184 7.743,-0.25C5.398,-0.332 1.817,-0.033 -0.272,0.045C-1.767,0.101 -1.503,1.237 0,1.181"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.3, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                    <g transform="matrix(13.453759,0,0,13.453759,-16513.417098,-1745.057611)">
                                        <g transform="matrix(1,0,0,1,1903.461066,490.8879)">
                                            <motion.path
                                                d="M0,0.704C1.732,1.3 4.469,1.615 6.292,1.498C8.05,1.386 12.727,1.264 14.513,0.928C15.986,0.65 15.721,-0.474 14.253,-0.197C12.651,0.105 7.666,-0.911 6.057,-0.831C4.542,-0.756 1.856,-0.509 0.343,-0.571C-1.338,-0.64 -1.412,0.217 0,0.704"
                                                variants={{
                                                    hidden: { pathLength: 0, fill: "rgba(215, 215, 170, 0)" },
                                                    visible: {
                                                        pathLength: 1,
                                                        fill: "rgba(215, 215, 170, 1)",
                                                        transition: {
                                                            pathLength: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                                                            fill: { duration: 0.3, ease: "easeOut" }
                                                        }
                                                    }
                                                }}
                                                stroke="#D7D7AA"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>
                                </motion.g>
                            </g>
                        </motion.svg>


                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="mt-6 flex flex-col items-center gap-2"
                        >
                            <p
                                className="text-[#b8b267] text-base lg:text-xl leading-relaxed"
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
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full h-full lg:absolute lg:inset-0 lg:h-[120%]"
                        style={{ y: isDesktop ? imgY : 0 }}
                    >
                        <Image
                            src="/final/wellness-center.png"
                            alt={t("imageAlt")}
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
