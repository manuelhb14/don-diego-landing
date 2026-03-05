"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MapPin } from "lucide-react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} className="relative flex h-[800px] md:h-dvh min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#111]">
            {/* Full-bleed background image */}
            <motion.div
                className="absolute inset-0 z-0 h-full w-full overflow-hidden"
                style={{ scale: imgScale }}
            >
                <Image
                    src="/images/renders/render-1.png"
                    alt="Don Diego — Club Residencial"
                    fill
                    priority
                    className="object-cover object-center"
                />
                {/* Gradient overlay to ensure text is readable */}
                {/* <div className="absolute inset-0 bg-black/40" /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </motion.div>

            {/* Centered content block */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 text-center w-full max-w-4xl"
                style={{ y: contentY }}
            >
                {/* Location tag */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-sm tracking-[0.3em] text-[#FFF3E1] uppercase mb-6 lg:mb-8"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    [DESARROLLO RESIDENCIAL]
                </motion.p>

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
                    initial="hidden"
                    animate="visible"
                    viewBox="0 0 1327 647"
                    className="w-full h-auto max-w-[450px] mt-4 mb-4"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g transform="matrix(1,0,0,1,-2177.39,-1092.9)">
                        <g transform="matrix(4.16667,0,0,4.16667,0,0)">
                            {/* D */}
                            <g transform="matrix(1,0,0,1,583.364,323.971)">
                                <motion.path
                                    d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* O */}
                            <g transform="matrix(1,0,0,1,680.967,268.704)">
                                <motion.path
                                    d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.987,13.775 11.507,-0.325 -2.998,-0.001C-15.397,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.423,61.911 -1.621,61.587"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* N */}
                            <g transform="matrix(1,0,0,1,789.338,307.844)">
                                <motion.path
                                    d="M0,-23.095C0,-27.876 0.162,-31.847 0.487,-35.008C0.892,-38.168 1.458,-41.409 2.35,-44.732L-10.535,-44.732C-9.643,-41.409 -9.076,-38.168 -8.752,-35.008C-8.347,-31.847 -8.185,-27.876 -8.185,-23.095L-8.185,7.374L-39.951,-35.899C-42.868,-39.465 -44.733,-42.382 -45.543,-44.732L-55.834,-44.732C-54.781,-38.655 -54.213,-32.496 -54.213,-23.096L-54.213,0C-54.213,4.781 -54.376,8.752 -54.7,11.912C-55.105,15.073 -55.672,18.314 -56.564,21.637L-43.679,21.637C-44.57,18.314 -45.138,15.073 -45.461,11.912C-45.867,8.752 -46.029,4.781 -46.029,0L-46.029,-30.469L-14.262,12.804C-11.345,16.37 -9.481,19.287 -8.671,21.637L1.621,21.637C0.567,15.559 0,9.401 0,0L0,-23.095Z"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>

                            {/* D (second line) */}
                            <g transform="matrix(1,0,0,1,534.081,411.237)">
                                <motion.path
                                    d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* I */}
                            <g transform="matrix(1,0,0,1,599.951,397.703)">
                                <motion.path
                                    d="M0,-28.281C0,-36.385 -0.649,-41.49 -2.35,-47.325L10.534,-47.325C8.833,-41.49 8.185,-36.385 8.185,-28.281L8.185,0.001C8.185,8.104 8.833,13.21 10.534,19.044L-2.35,19.044C-0.649,13.21 0,8.104 0,0.001L0,-28.281Z"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* E */}
                            <g transform="matrix(1,0,0,1,671.843,407.508)">
                                <motion.path
                                    d="M0,-47.891L0,-57.13L-35.089,-57.13C-33.387,-51.294 -32.738,-46.19 -32.738,-38.086L-32.738,-9.804C-32.738,-1.701 -33.387,3.405 -35.089,9.239L0,9.239L0,0.001C-5.591,2.27 -16.613,3.404 -24.554,3.404L-24.554,-21.011L-21.354,-21.011C-15.543,-21.011 -11.883,-20.546 -7.699,-19.326L-7.699,-28.565C-11.883,-27.345 -15.543,-26.879 -21.354,-26.879L-24.554,-26.879L-24.554,-51.294C-16.613,-51.294 -5.591,-50.161 0,-47.891"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* G */}
                            <g transform="matrix(1,0,0,1,746.392,405.889)">
                                <motion.path
                                    d="M0,-44.733L-0.243,-44.651C-6.969,-48.299 -12.722,-49.676 -19.125,-49.676C-34.44,-49.676 -45.785,-38.817 -45.785,-22.529C-46.028,-6.564 -33.954,5.104 -18.152,4.861C-13.047,4.861 -8.59,3.97 -4.862,2.268L-4.862,-4.539C-4.862,-11.589 -6.159,-17.667 -8.833,-22.61L5.106,-22.61C4.052,-19.935 3.404,-15.236 3.404,-10.778L3.404,-3.323C3.404,1.296 3.809,4.861 4.62,7.374C-2.188,10.048 -10.453,11.668 -18.476,11.668C-43.435,11.831 -55.104,-3.485 -54.942,-20.989C-55.185,-41.491 -39.788,-56.564 -18.314,-56.321C-11.912,-56.321 -5.834,-55.673 0,-54.295L0,-44.733Z"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                            {/* O */}
                            <g transform="matrix(1,0,0,1,808.144,355.97)">
                                <motion.path
                                    d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.986,13.775 11.507,-0.325 -2.998,-0.001C-15.398,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.422,61.911 -1.621,61.587"
                                    variants={{
                                        hidden: { pathLength: 0, fill: "rgba(255, 243, 225, 0)" },
                                        visible: {
                                            pathLength: 1,
                                            fill: "rgba(255, 243, 225, 1)",
                                            transition: {
                                                pathLength: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                                                fill: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }
                                    }}
                                    stroke="#FFF3E1"
                                    strokeWidth="0.5"
                                />
                            </g>
                        </g>
                    </g>
                </motion.svg>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-6 lg:mt-4 max-w-md"
                >
                    <p className="text-[#FFF3E1] text-xl font-medium leading-relaxed mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                        Un santuario donde la arquitectura se encuentra con la naturaleza.
                        Diseñado para una vida en conexión.
                    </p>
                    <motion.a
                        href="#proyecto"
                        whileHover={{ y: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="inline-flex items-center justify-center gap-4 group"
                    >
                        <span className="h-px w-8 bg-[#FFF3E1]/40 group-hover:w-12 transition-all duration-500" />
                        <span
                            className="text-[11px] tracking-[0.2em] text-[#FFF3E1] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Explorar
                        </span>
                        <span className="h-px w-8 bg-[#FFF3E1]/40 group-hover:w-12 transition-all duration-500" />
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Bottom-right tag */}
            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex items-center gap-2 z-10"
            >
                <MapPin className="w-5 h-5 text-[#FFF3E1]" />
                <p
                    className="text-base font-normal text-[#FFF3E1]"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    San Miguel de Allende
                </p>
            </motion.div> */}
        </section>
    );
}
