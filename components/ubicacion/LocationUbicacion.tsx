"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Activity, Anchor, Home, Leaf, type LucideIcon } from "lucide-react";

type PinConfig = {
    title: string;
    subtitle: string;
    x: number;
    y: number;
    icon: LucideIcon;
    pulseClassName: string;
    buttonClassName: string;
    labelDx: number;
    labelDy: number;
    labelAlign: "left" | "right" | "center";
};

const proximityItems = [
    {
        time: "10 Min",
        title: "Fabrica La Aurora",
        body: "Centro de arte y diseno.",
        accent: "bg-[#E1B19B]",
        border: "border-[#E1B19B]",
    },
    {
        time: "8 Min",
        title: "Centro Historico",
        body: "Corazon de la ciudad, restaurantes y cultura.",
        accent: "bg-[#AA7D69]",
        border: "border-[#AA7D69]",
    },
    {
        time: "5 Min",
        title: "Mercados Organicos",
        body: "Productos locales y comunidad.",
        accent: "bg-[#D7D7AA]",
        border: "border-[#D7D7AA]",
    },
];

const desktopSteps = [
    {
        eyebrow: "01 / Panorama",
        title: "Vista general del santuario.",
        body: "El recorrido inicia con una lectura completa del terreno para entender como las fracciones, el rio y la presa se relacionan entre si.",
        accent: "Mantener contexto antes de acercarse.",
        icon: Anchor,
    },
    {
        eyebrow: "02 / Fraccion B",
        title: "El scroll entra al corazon residencial.",
        body: "La camara se acerca al Club Residencial para convertir el mapa en una experiencia mas narrativa y menos estatica.",
        accent: "Aqui vive la propuesta habitacional.",
        icon: Home,
    },
    {
        eyebrow: "03 / Fraccion C",
        title: "Luego sube hacia wellness y naturaleza.",
        body: "La guia revela la relacion entre el wellness center, el paisaje y la fraccion organica que completa la experiencia.",
        accent: "Bienestar y naturaleza en una sola lectura.",
        icon: Activity,
    },
    {
        eyebrow: "04 / Presa",
        title: "El cierre enfoca el espejo de agua.",
        body: "La presa aparece como remate visual del recorrido para enfatizar el caracter unico del entorno.",
        accent: "El agua cierra la historia del mapa.",
        icon: Leaf,
    },
];

const pinConfigs: PinConfig[] = [
    {
        title: "Fraccion A",
        subtitle: "Organic Farm & Flowers",
        x: 1554,
        y: 1208,
        icon: Leaf,
        pulseClassName: "bg-[#C4A3A4]/50",
        buttonClassName: "bg-[#C4A3A4]",
        labelDx: 0,
        labelDy: -78,
        labelAlign: "center",
    },
    {
        title: "Fraccion B",
        subtitle: "Club Residencial",
        x: 863,
        y: 743,
        icon: Home,
        pulseClassName: "bg-[#C99580]/50",
        buttonClassName: "bg-[#C99580]",
        labelDx: 0,
        labelDy: -82,
        labelAlign: "center",
    },
    {
        title: "Fraccion C",
        subtitle: "Wellness Center",
        x: 547,
        y: 390,
        icon: Activity,
        pulseClassName: "bg-[#B5B588]/50",
        buttonClassName: "bg-[#B5B588]",
        labelDx: 0,
        labelDy: -78,
        labelAlign: "right",
    },
    {
        title: "Presa de la Cantera",
        subtitle: "Cuerpo de Agua / Marina",
        x: 2360,
        y: 948,
        icon: Anchor,
        pulseClassName: "bg-[#8FC0DA]/40",
        buttonClassName: "bg-[#8FC0DA]",
        labelDx: -20,
        labelDy: -96,
        labelAlign: "right",
    },
];

const DesktopLocationImages = () => (
    <>
        <motion.div
            className="absolute -top-12 -right-8 xl:-right-16 w-48 aspect-[3/4] z-10 pointer-events-none"
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 } } }}
        >
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white shadow-[0_15px_40px_-12px_rgba(0,0,0,0.12)] relative bg-[#222]">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDs00-_GCKkrCFoxuqIdnSQPBxxiSQOB34r6bUBs4vDrhv7xcLgDNId9KW3fzHaZjAJ0BL2gdc62yx5W2TMofi1XrWQJAiha_vWecWib2NbdFaqSXcLectwiuzP_uasJ6WR2aX6uUq05yQy0ahv0IRQF63LLInINhNuPfoSaWFIc0Oz0OchmKztsZvsTspnRbvNl_XPTBTSLrLjc_newbjbVlYWMRHqC4d8xTtIdxrWfzNn_6En6--apeBhJOC3d2u51EtT5AQ6yqef")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 z-10">
                    <p className="text-white text-sm font-bold leading-tight">Centro Historico</p>
                    <p className="text-[#E1B19B] text-[10px] uppercase tracking-wide">Encanto Colonial</p>
                </div>
            </div>
        </motion.div>

        <motion.div
            className="absolute -top-2 w-60 aspect-video z-20 pointer-events-none -right-32 xl:-right-48"
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 1 } } }}
        >
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white shadow-[0_15px_40px_-12px_rgba(0,0,0,0.12)] relative bg-[#222]">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsXLPABdSM9fcKIShbnfpbg8h2Y9UqsiOi9oAKnNNsQKhknnXl6x-ikZHuRFPXtOaLEe3QX83TxDdPganEgmlvCby8PtiOzU_I1ep9twDHIiY_tzb6XpocVrnxGvm_HY6OD1h6A3mWhiurKSFoNv9WK7b21FMzX6wlPbostRbNpxfZ1WQ-HvAHT1Ny2c-gkiHlwTDKTRCO8S-z6caoZcN8ceKhcH7S2KC-HXe20oweKB8-INxGIZxhKrTvajqBZA0wA_PnCpOnzu9n")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 z-10">
                    <p className="text-white text-sm font-bold leading-tight drop-shadow-sm">La Parroquia</p>
                    <p className="text-[#E1B19B]/90 text-[10px] uppercase tracking-wide">Icono Historico</p>
                </div>
            </div>
        </motion.div>
    </>
);

const MobileLocationImages = () => (
    <div className="absolute -bottom-32 right-4 flex items-start gap-2 z-40 pointer-events-none translate-x-4 outline-none">
        <motion.div
            className="w-36 aspect-[3/4] shadow-2xl rounded-xl relative z-40 origin-bottom translate-y-6"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, delay: 1.4 } } }}
        >
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white/80 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.12)] relative bg-[#222]">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDs00-_GCKkrCFoxuqIdnSQPBxxiSQOB34r6bUBs4vDrhv7xcLgDNId9KW3fzHaZjAJ0BL2gdc62yx5W2TMofi1XrWQJAiha_vWecWib2NbdFaqSXcLectwiuzP_uasJ6WR2aX6uUq05yQy0ahv0IRQF63LLInINhNuPfoSaWFIc0Oz0OchmKztsZvsTspnRbvNl_XPTBTSLrLjc_newbjbVlYWMRHqC4d8xTtIdxrWfzNn_6En6--apeBhJOC3d2u51EtT5AQ6yqef")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-[#222]/30 to-transparent" />
                <div className="absolute bottom-2 left-2 z-10 w-[calc(100%-16px)]">
                    <p className="text-white text-xs font-bold leading-tight truncate">Centro Historico</p>
                    <p className="text-[#E1B19B] text-[8px] uppercase tracking-wide truncate">Encanto Colonial</p>
                </div>
            </div>
        </motion.div>

        <motion.div
            className="w-44 aspect-video mt-8 -ml-8 shadow-2xl rounded-xl relative z-30 origin-bottom"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, delay: 1.6 } } }}
        >
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white/80 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.12)] relative bg-[#222]">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsXLPABdSM9fcKIShbnfpbg8h2Y9UqsiOi9oAKnNNsQKhknnXl6x-ikZHuRFPXtOaLEe3QX83TxDdPganEgmlvCby8PtiOzU_I1ep9twDHIiY_tzb6XpocVrnxGvm_HY6OD1h6A3mWhiurKSFoNv9WK7b21FMzX6wlPbostRbNpxfZ1WQ-HvAHT1Ny2c-gkiHlwTDKTRCO8S-z6caoZcN8ceKhcH7S2KC-HXe20oweKB8-INxGIZxhKrTvajqBZA0wA_PnCpOnzu9n")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-[#222]/30 to-transparent" />
                <div className="absolute bottom-2 left-2 z-10 w-[calc(100%-16px)]">
                    <p className="text-white text-xs font-bold leading-tight drop-shadow-sm truncate">La Parroquia</p>
                    <p className="text-[#E1B19B]/90 text-[8px] uppercase tracking-wide truncate">Icono Historico</p>
                </div>
            </div>
        </motion.div>
    </div>
);

function ProximityPanel({ compact = false }: { compact?: boolean }) {
    return (
        <motion.div
            className={`relative z-30 flex flex-col justify-start pointer-events-auto w-full ${compact ? "" : "lg:max-w-[300px]"}`}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 } } }}
        >
            <div className={`relative z-30 bg-white/80 backdrop-blur-xl border border-[#D7D7AA]/40 rounded-2xl shadow-[0_15px_40px_-10px_rgba(225,177,155,0.2)] transition-all duration-300 group/panel ${compact ? "p-5 md:p-6" : "p-6 md:p-8"}`}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#AA7D69]/10">
                    <h3 className="text-[#222] text-sm font-bold uppercase tracking-widest">Proximidad</h3>
                </div>

                <motion.ul
                    className="space-y-8 relative"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
                >
                    <div className="absolute md:left-[19px] left-2.5 top-4 bottom-4 w-0.5 bg-[#AA7D69]/10" />
                    {proximityItems.map((item) => (
                        <motion.li
                            key={item.title}
                            className="flex items-start gap-5 relative"
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                        >
                            <div className={`relative z-10 bg-white p-1.5 rounded-full border ${item.border} group-hover/panel:scale-110 transition-transform`}>
                                <div className={`w-2 h-2 rounded-full ${item.accent}`} />
                            </div>
                            <div>
                                <h4
                                    className="text-[#222] font-bold text-xl leading-none mb-1"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.time}
                                </h4>
                                <p className="text-[#AA7D69] text-sm font-medium mb-1">{item.title}</p>
                                <p className="text-[#222]/60 text-xs">{item.body}</p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </motion.div>
    );
}

function MapPins() {
    return (
        <>
            {pinConfigs.map((pin) => {
                const Icon = pin.icon;
                const labelWidth = 232;
                const labelX = pin.labelAlign === "center" ? -labelWidth / 2 : pin.labelAlign === "right" ? -labelWidth : 0;
                const labelTextAlign = pin.labelAlign === "center" ? "text-center" : pin.labelAlign === "right" ? "text-right" : "text-left";

                return (
                    <g key={pin.title} transform={`translate(${pin.x} ${pin.y})`} className="group cursor-pointer">
                        <foreignObject x={-48} y={-48} width={96} height={96} className="overflow-visible pointer-events-none">
                            <div xmlns="http://www.w3.org/1999/xhtml" className="relative flex h-24 w-24 items-center justify-center">
                                <div className={`absolute inset-[10px] rounded-full animate-ping opacity-75 transition-transform duration-300 group-hover:scale-125 ${pin.pulseClassName}`} />
                                <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${pin.buttonClassName}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </foreignObject>

                        <foreignObject x={labelX + pin.labelDx} y={pin.labelDy - 54} width={labelWidth} height={72} className="overflow-visible pointer-events-none">
                            <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                className={`rounded-xl border border-[#AA7D69]/20 bg-white/95 p-3 shadow-xl opacity-0 transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:opacity-100 ${labelTextAlign}`}
                            >
                                <div className="text-[#222] text-sm font-bold uppercase tracking-wider">{pin.title}</div>
                                <div className="text-[#AA7D69] text-xs font-semibold leading-relaxed">{pin.subtitle}</div>
                            </div>
                        </foreignObject>
                    </g>
                );
            })}
        </>
    );
}

function MapSurface({
    cameraViewBox,
    showDesktopImages = false,
    showMobileImages = false,
    frameClassName = "",
}: {
    cameraViewBox?: string | MotionValue<string>;
    showDesktopImages?: boolean;
    showMobileImages?: boolean;
    frameClassName?: string;
}) {
    return (
        <motion.div
            className="relative w-full max-w-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.2,
                    },
                },
            }}
        >
            <div className={`relative w-full aspect-[2878/1858] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(170,125,105,0.15)] border border-[#AA7D69]/10 group bg-[#EDE5DA] ${frameClassName}`}>
                <motion.svg
                    viewBox={cameraViewBox ?? "0 0 2878 1858"}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-full block"
                    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    variants={{ hidden: {}, visible: {} }}
                >
                    <motion.g>
                        <g transform="matrix(1,0,0,1,-643.944767,-477.834302)">
                            <g transform="matrix(1,0,0,1,2082.944767,1406.834302)">
                                <g transform="matrix(1,0,0,1,-1439,-929)">
                                    <g transform="matrix(1,0,0,1,-634.50453,-485)">
                                        <g transform="matrix(1.014606,0,0,1.00267,-51.295034,-3.185581)">
                                            <motion.path
                                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 } } }}
                                                d="M2485,1446L2818,1193L3174,1355L3274,1236L3512,1266L3421,1621L3186,1698C3186,1698 3188.833,1866.833 3164,1857C3139.167,1847.167 3078.167,1636.167 3037,1639C2995.833,1641.833 2992.058,1828.148 2917,1874C2834.333,1924.5 2541,1942 2541,1942L2485,1446Z"
                                                style={{ fill: "rgb(200,215,230)", stroke: "white", strokeOpacity: 0, strokeWidth: "0.99px" }}
                                            />
                                        </g>

                                        <g transform="matrix(1,0,0,1,634.50453,485)">
                                            <motion.path
                                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 } } }}
                                                d="M1838,956L1903,1561L1198,1568L1145,1767L902,1696C902,1696 1027.333,1374.833 1069,1276C1093.847,1217.063 1116.5,1146.333 1152,1103C1185.044,1062.665 1235.167,1038.833 1282,1016C1328.833,993.167 1398.278,975.056 1433,966"
                                                style={{ fill: "rgb(222,190,191)" }}
                                            />
                                        </g>

                                        <motion.path
                                            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1], delay: 0.1 } } }}
                                            d="M661,1210C801,1290.111 1081,1450.333 1172,1511C1191.988,1524.326 1191.5,1565.5 1207,1574C1222.5,1582.5 1246.929,1569.951 1265,1562C1294.167,1549.167 1338.343,1506.191 1382,1497C1426.333,1487.667 1488.833,1497.167 1531,1506C1567.842,1513.718 1600.501,1534.943 1635,1550C1674.333,1567.167 1735.5,1582.333 1767,1609C1796.505,1633.978 1807,1685 1824,1710C1836.47,1728.338 1851.167,1750.333 1869,1759C1886.833,1767.667 1910.31,1762.145 1931,1762C1954.833,1761.833 1987.167,1758.167 2012,1758C2034.688,1757.848 2061.667,1757.333 2080,1761C2095.068,1764.014 2108.5,1773.167 2122,1780C2135.317,1786.741 2147.329,1796.009 2161,1802C2175.833,1808.5 2194.107,1814.049 2211,1819C2230.333,1824.667 2254.718,1831.571 2277,1836C2303.833,1841.333 2340.323,1846.069 2372,1851C2407.333,1856.5 2463.833,1865.167 2489,1869C2500.325,1870.725 2515.442,1872.908 2523,1874"
                                            style={{ fill: "none", stroke: "rgb(187,216,234)", strokeWidth: "25px" }}
                                        />

                                        <g transform="matrix(1,0,0,1,634.50453,485)">
                                            <motion.path
                                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.75 } } }}
                                                d="M859,392C782.667,523.667 630,787 630,787L1129,1101L1281,992L977,720"
                                                style={{ fill: "rgb(225,177,155)" }}
                                            />
                                        </g>

                                        <motion.path
                                            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 } } }}
                                            d="M1477.363,2322C1537.04,2143.333 1656.394,1786 1736,1644C1781.593,1562.672 1882.667,1504.167 1955,1470C2020.471,1439.075 2099.333,1442.167 2170,1439C2239.711,1435.876 2320.667,1458.333 2379,1451C2429.176,1444.692 2475.747,1419.477 2520,1395C2565.5,1369.833 2613,1329.667 2652,1300C2686.888,1273.461 2716.852,1240.269 2754,1217C2799.5,1188.5 2871.836,1164.82 2925,1129C3026.667,1060.5 3272.833,876.167 3364,806C3402.523,776.351 3448.841,730.784 3472,708"
                                            style={{ fill: "none", stroke: "rgb(170,125,105)", strokeWidth: "42px" }}
                                        />

                                        <g transform="matrix(0.496702,-0.867922,0.867922,0.496702,-120.09095,1641.795485)">
                                            <motion.rect
                                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 } } }}
                                                x={1068}
                                                y={805}
                                                width={407}
                                                height={199}
                                                style={{ fill: "rgb(215,215,170)" }}
                                            />
                                        </g>

                                        <g transform="matrix(1,0,0,1,-5,-2)">
                                            <motion.path
                                                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0 } } }}
                                                d="M649.505,2322L1717,497"
                                                style={{ fill: "none", stroke: "rgb(170,125,105)", strokeWidth: "20px" }}
                                            />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </motion.g>

                    <MapPins />
                </motion.svg>
            </div>

            {showMobileImages ? <MobileLocationImages /> : null}

            {showDesktopImages ? (
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-10 hidden lg:block max-w-5xl mx-auto">
                    <DesktopLocationImages />
                </div>
            ) : null}
        </motion.div>
    );
}

export default function LocationUbicacion() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    const viewBoxX = useTransform(scrollYProgress, [0, 0.34, 0.68, 1], [0, 520, 220, 1580]);
    const viewBoxY = useTransform(scrollYProgress, [0, 0.34, 0.68, 1], [0, 420, 120, 560]);
    const viewBoxWidth = useTransform(scrollYProgress, [0, 0.34, 0.68, 1], [2878, 1680, 1260, 1040]);
    const viewBoxHeight = useTransform(scrollYProgress, [0, 0.34, 0.68, 1], [1858, 1085, 815, 670]);
    const animatedViewBox = useMotionTemplate`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`;
    const cameraViewBox = shouldReduceMotion ? "0 0 2878 1858" : animatedViewBox;

    return (
        <section id="location-ubicacion" className="bg-[#FFF3E1] text-[#222222] antialiased w-full relative">
            <main className="relative w-full flex flex-col items-center py-12 md:py-16 px-6 md:px-10 max-w-[1440px] mx-auto">
                <div className="w-full max-w-6xl mb-10 md:mb-14 z-10 relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                    <motion.div
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [El Lugar]
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
                        >
                            Cerca de todo
                        </h2>
                        <h2
                            className="text-[#AA7D69]/90 italic"
                            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
                        >
                            Lejos de lo comun
                        </h2>
                    </motion.div>

                    <motion.div
                        className="max-w-xl md:text-right text-center"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        <p
                            className="text-[#222]/80 text-base md:text-xl font-medium leading-relaxed"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Un mapa que deja de ser ilustracion y se convierte en recorrido. Al hacer scroll, la camara navega el propio SVG para mantener el trazo nitido mientras descubre cada punto.
                        </p>
                    </motion.div>
                </div>

                <div className="lg:hidden relative w-full max-w-5xl">
                    <div className="sticky top-16 z-10 -mx-2 sm:mx-0">
                        <MapSurface showMobileImages frameClassName="min-h-[62svh] sm:min-h-[68svh]" />
                    </div>

                    <div className="relative z-20 mt-10 space-y-4 pb-6">
                        {desktopSteps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.article
                                    key={step.title}
                                    className="rounded-[28px] border border-[#AA7D69]/15 bg-white/82 backdrop-blur-md p-6 shadow-[0_20px_60px_-25px_rgba(170,125,105,0.25)]"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="size-10 rounded-full bg-[#FFF3E1] text-[#AA7D69] flex items-center justify-center border border-[#AA7D69]/15">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#AA7D69]/70">{step.eyebrow}</p>
                                    </div>
                                    <h3 className="text-3xl text-[#222] leading-none mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-[#222]/75 leading-relaxed mb-3">{step.body}</p>
                                    <p className="text-[#AA7D69] text-sm uppercase tracking-[0.2em]">{step.accent}</p>
                                </motion.article>
                            );
                        })}
                    </div>

                    <div className="relative z-20 mt-8">
                        <ProximityPanel compact />
                    </div>
                </div>

                <div ref={scrollRef} className="hidden lg:grid w-full max-w-6xl grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-10">
                    <div>
                        <div className="sticky top-24 pt-2">
                            <MapSurface cameraViewBox={cameraViewBox} showDesktopImages />
                        </div>
                        <div className="mt-8 max-w-[320px]">
                            <ProximityPanel compact />
                        </div>
                    </div>

                    <div className="relative">
                        {desktopSteps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.article
                                    key={step.title}
                                    className="min-h-[72vh] flex items-center"
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                                >
                                    <div className="rounded-[32px] border border-[#AA7D69]/15 bg-white/72 backdrop-blur-md p-8 xl:p-10 shadow-[0_30px_80px_-30px_rgba(170,125,105,0.35)]">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="size-12 rounded-full bg-[#FFF3E1] text-[#AA7D69] border border-[#AA7D69]/15 flex items-center justify-center">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] uppercase tracking-[0.28em] text-[#AA7D69]/70 mb-1">{step.eyebrow}</p>
                                                <div className="w-16 h-px bg-[#AA7D69]/20" />
                                            </div>
                                        </div>

                                        <h3 className="text-[clamp(2.75rem,4vw,4.5rem)] leading-[0.95] text-[#222] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                                            {step.title}
                                        </h3>
                                        <p className="text-[#222]/75 text-lg leading-relaxed mb-5 max-w-md">
                                            {step.body}
                                        </p>
                                        <p className="text-[#AA7D69] text-sm uppercase tracking-[0.24em]">
                                            {step.accent}
                                        </p>
                                        {index === 0 ? (
                                            <p className="mt-8 text-sm text-[#222]/55 max-w-md">
                                                {shouldReduceMotion
                                                    ? "La version con movimiento reducido mantiene el mapa estable y preserva la lectura del contenido."
                                                    : "La camara ahora recorta el viewBox del SVG para acercarse sin rasterizar el mapa."}
                                            </p>
                                        ) : null}
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </main>
        </section>
    );
}
