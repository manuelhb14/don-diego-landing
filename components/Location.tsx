"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Home, Anchor, Leaf, Activity } from "lucide-react";

const LocationVideo = () => (
    <video
        className="w-full h-full object-cover brightness-110 contrast-110"
        src="/babylon/sma-video.mp4"
        width={720}
        height={406}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
    />
);

const DesktopLocationImages = () => (
    <>
        <motion.div
            className="hidden lg:block absolute -top-20 -right-6 xl:-right-16 w-68 aspect-[3/4] z-10 pointer-events-none"
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 } } }}
        >
            <div className="w-full h-full overflow-hidden border-2 border-white shadow-[0_15px_40px_-12px_rgba(0,0,0,0.12)] relative bg-[#222]">
                <LocationVideo />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-3 left-3 z-10">
                    <p className="text-white text-sm font-bold leading-tight">Centro Histórico</p>
                    <p className="text-[#E1B19B] text-[10px] uppercase tracking-wide">Encanto Colonial</p>
                </div>
            </div>
        </motion.div>
    </>
);

const MobileLocationImages = () => (
    <div className="absolute -bottom-32 right-4 flex lg:hidden items-start gap-2 z-40 pointer-events-none translate-x-4 outline-none">
        <motion.div
            className="w-48 aspect-[3/4] shadow-2xl relative z-40 origin-bottom translate-y-6"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, delay: 1.4 } } }}
        >
            <div className="w-full h-full overflow-hidden border-2 border-white/80 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.12)] relative bg-[#222]">
                <LocationVideo />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-[#222]/30 to-transparent"></div>
                <div className="absolute bottom-2 left-2 z-10 w-[calc(100%-16px)]">
                    <p className="text-white text-xs font-bold leading-tight truncate">Centro Histórico</p>
                    <p className="text-[#E1B19B] text-[8px] uppercase tracking-wide truncate">Encanto Colonial</p>
                </div>
            </div>
        </motion.div>
    </div>
);

export default function Location() {
    const [activePin, setActivePin] = useState<string | null>(null);

    const togglePin = (pinId: string) => {
        setActivePin((currentPin) => (currentPin === pinId ? null : pinId));
    };

    return (
        <section id="location" className="bg-[#fff8ed] text-[#222222] overflow-x-hidden antialiased w-full relative">
            <main className="relative w-full flex flex-col items-center py-12 md:py-16 px-6 md:px-10 max-w-[1440px] mx-auto mb-16 md:mb-12">
                <div className="w-full max-w-6xl mb-8 md:mb-12 z-10 relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
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
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                            }}
                        >
                            Cerca de todo
                        </h2>
                        <h2
                            className="text-[#AA7D69]/90 italic"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                            }}
                        >
                            Lejos de lo común
                        </h2>
                    </motion.div>
                    <motion.p
                        className="text-[#222]/80 text-base md:text-xl font-medium leading-relaxed text-center md:text-right md:max-w-md"
                        style={{ fontFamily: "var(--font-serif)" }}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        Un santuario de vida consciente donde el lujo se encuentra con la naturaleza. Conectado al vibrante corazón de la ciudad, pero resguardado en la tranquilidad.
                    </motion.p>
                </div>

                <motion.div
                    className="relative w-full max-w-5xl h-auto md:pb-12 pb-32 lg:pb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    <div
                        className="relative w-full overflow-visible shadow-[0_20px_60px_-15px_rgba(170,125,105,0.15)] border border-[#AA7D69]/10 group bg-[#EDE5DA]"
                        data-location="San Miguel de Allende"
                        onClick={() => setActivePin(null)}
                    >
                        {/* Animated inline SVG map */}
                        <div className="relative z-0 overflow-hidden">
                            <motion.svg
                                viewBox="0 0 2878 1858"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-auto block"
                                style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                                variants={{
                                    hidden: {},
                                    visible: {}
                                }}
                            >
                                <g transform="matrix(1,0,0,1,-643.944767,-477.834302)">
                                    <g transform="matrix(1,0,0,1,2082.944767,1406.834302)">
                                        <g transform="matrix(1,0,0,1,-1439,-929)">
                                            <g transform="matrix(1,0,0,1,-634.50453,-485)">
                                            {/* Fracción C — Wellness Center (blue polygon, top-right) */}
                                            <g transform="matrix(1.014606,0,0,1.00267,-51.295034,-3.185581)">
                                                <motion.path
                                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 } } }}
                                                    d="M2485,1446L2818,1193L3174,1355L3274,1236L3512,1266L3421,1621L3186,1698C3186,1698 3188.833,1866.833 3164,1857C3139.167,1847.167 3078.167,1636.167 3037,1639C2995.833,1641.833 2992.058,1828.148 2917,1874C2834.333,1924.5 2541,1942 2541,1942L2485,1446Z"
                                                    style={{ fill: "rgb(200,215,230)", stroke: "white", strokeOpacity: 0, strokeWidth: "0.99px" }}
                                                />
                                            </g>

                                            {/* Fracción B — Residencial (pink shape, center) */}
                                            <g transform="matrix(1,0,0,1,634.50453,485)">
                                                <motion.path
                                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 } } }}
                                                    d="M1838,956L1903,1561L1198,1568L1145,1767L902,1696C902,1696 1027.333,1374.833 1069,1276C1093.847,1217.063 1116.5,1146.333 1152,1103C1185.044,1062.665 1235.167,1038.833 1282,1016C1328.833,993.167 1398.278,975.056 1433,966"
                                                    style={{ fill: "rgb(222,190,191)" }}
                                                />
                                            </g>

                                            {/* River (light blue stroke) */}
                                            <motion.path
                                                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1], delay: 0.1 } } }}
                                                d="M661,1210C801,1290.111 1081,1450.333 1172,1511C1191.988,1524.326 1191.5,1565.5 1207,1574C1222.5,1582.5 1246.929,1569.951 1265,1562C1294.167,1549.167 1338.343,1506.191 1382,1497C1426.333,1487.667 1488.833,1497.167 1531,1506C1567.842,1513.718 1600.501,1534.943 1635,1550C1674.333,1567.167 1735.5,1582.333 1767,1609C1796.505,1633.978 1807,1685 1824,1710C1836.47,1728.338 1851.167,1750.333 1869,1759C1886.833,1767.667 1910.31,1762.145 1931,1762C1954.833,1761.833 1987.167,1758.167 2012,1758C2034.688,1757.848 2061.667,1757.333 2080,1761C2095.068,1764.014 2108.5,1773.167 2122,1780C2135.317,1786.741 2147.329,1796.009 2161,1802C2175.833,1808.5 2194.107,1814.049 2211,1819C2230.333,1824.667 2254.718,1831.571 2277,1836C2303.833,1841.333 2340.323,1846.069 2372,1851C2407.333,1856.5 2463.833,1865.167 2489,1869C2500.325,1870.725 2515.442,1872.908 2523,1874"
                                                style={{ fill: "none", stroke: "rgb(187,216,234)", strokeWidth: "25px" }}
                                            />

                                            {/* Location marker (orange polygon) */}
                                            <g transform="matrix(1,0,0,1,634.50453,485)">
                                                <motion.path
                                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.75 } } }}
                                                    d="M859,392C782.667,523.667 630,787 630,787L1129,1101L1281,992L977,720"
                                                    style={{ fill: "rgb(225,177,155)" }}
                                                />
                                            </g>

                                            {/* Main Road (brown stroke) */}
                                            <motion.path
                                                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 } } }}
                                                d="M1477.363,2322C1537.04,2143.333 1656.394,1786 1736,1644C1781.593,1562.672 1882.667,1504.167 1955,1470C2020.471,1439.075 2099.333,1442.167 2170,1439C2239.711,1435.876 2320.667,1458.333 2379,1451C2429.176,1444.692 2475.747,1419.477 2520,1395C2565.5,1369.833 2613,1329.667 2652,1300C2686.888,1273.461 2716.852,1240.269 2754,1217C2799.5,1188.5 2871.836,1164.82 2925,1129C3026.667,1060.5 3272.833,876.167 3364,806C3402.523,776.351 3448.841,730.784 3472,708"
                                                style={{ fill: "none", stroke: "rgb(170,125,105)", strokeWidth: "42px" }}
                                            />

                                            {/* Olive rotated rectangle */}
                                            <g transform="matrix(0.496702,-0.867922,0.867922,0.496702,-120.09095,1641.795485)">
                                                <motion.rect
                                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 } } }}
                                                    x={1068} y={805} width={407} height={199}
                                                    style={{ fill: "rgb(215,215,170)" }}
                                                />
                                            </g>

                                            {/* Railway (brown diagonal line) */}
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
                            </motion.svg>
                        </div>

                        <div className="absolute inset-0 z-20 overflow-visible">
                            {/* Pin 3: Fracción A -> Organic Farm — pink, on the orange marker area top-left */}
                            <motion.div
                                variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.2, duration: 0.5, delay: 1.4 } } }}
                                className={`absolute top-[65%] right-[46%] flex flex-col items-center cursor-pointer group/pin ${activePin === "organic-farm" ? "z-50" : "z-20"}`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    togglePin("organic-farm");
                                }}
                                onMouseEnter={() => setActivePin("organic-farm")}
                                onMouseLeave={() => setActivePin((currentPin) => (currentPin === "organic-farm" ? null : currentPin))}
                            >
                                <div className="relative flex items-center justify-center size-7 md:size-12">
                                    <div className="absolute inset-0 bg-[#C4A3A4]/50 rounded-full animate-ping opacity-75"></div>
                                    <div className={`relative z-10 bg-[#C4A3A4] text-white p-1.5 md:p-3 rounded-full shadow-lg transition-transform group-hover/pin:scale-110 ${activePin === "organic-farm" ? "scale-110" : ""}`}>
                                        <Leaf className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                    </div>
                                </div>
                                <div className={`absolute bottom-full mb-2 md:mb-3 left-1/2 -translate-x-1/2 w-max max-w-[132px] sm:max-w-[160px] md:max-w-[240px] bg-white/95 backdrop-blur-md px-2.5 py-2 md:p-4 rounded-lg md:rounded-xl border border-[#AA7D69]/20 shadow-xl transition-all duration-200 pointer-events-none origin-bottom text-center ${activePin === "organic-farm" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"} group-hover/pin:opacity-100 group-hover/pin:-translate-y-0 group-hover/pin:scale-100`}>
                                    <h4 className="text-[#222] font-bold text-[10px] leading-tight md:text-sm mb-0 md:mb-1 uppercase tracking-[0.18em] md:tracking-wider whitespace-normal">Organic Farm & Flowers</h4>
                                    {/* <p className="text-[#C4A3A4] text-xs leading-relaxed font-semibold">Organic Farm & Flowers</p> */}
                                </div>
                            </motion.div>

                            {/* Pin 2: Fracción B -> Club Residencial — orange, on the pink polygon center */}
                            <motion.div
                                variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.2, duration: 0.5, delay: 1.5 } } }}
                                className={`absolute top-[40%] left-[30%] flex flex-col items-center cursor-pointer group/pin ${activePin === "club-residencial" ? "z-50" : "z-20"}`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    togglePin("club-residencial");
                                }}
                                onMouseEnter={() => setActivePin("club-residencial")}
                                onMouseLeave={() => setActivePin((currentPin) => (currentPin === "club-residencial" ? null : currentPin))}
                            >
                                <div className="relative flex items-center justify-center size-7 md:size-12">
                                    <div className="absolute inset-0 bg-[#C99580]/50 rounded-full animate-ping opacity-75"></div>
                                    <div className={`relative z-10 bg-[#C99580] text-white p-1.5 md:p-3 rounded-full shadow-lg transition-transform group-hover/pin:scale-110 ${activePin === "club-residencial" ? "scale-110" : ""}`}>
                                        <Home className="w-3 h-3 md:w-5 md:h-5" />
                                    </div>
                                </div>
                                <div className={`absolute bottom-full mb-2 md:mb-3 left-1/2 -translate-x-1/2 w-max max-w-[132px] sm:max-w-[160px] md:max-w-[240px] bg-white/95 backdrop-blur-md px-2.5 py-2 md:p-4 rounded-lg md:rounded-xl border border-[#AA7D69]/20 shadow-xl transition-all duration-200 pointer-events-none origin-bottom text-center ${activePin === "club-residencial" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"} group-hover/pin:opacity-100 group-hover/pin:-translate-y-0 group-hover/pin:scale-100`}>
                                    <h4 className="text-[#222] font-bold text-[10px] leading-tight md:text-sm mb-0 md:mb-1 uppercase tracking-[0.18em] md:tracking-wider whitespace-normal">Club Residencial</h4>
                                    {/* <p className="text-[#C99580] text-xs leading-relaxed font-semibold">Club Residencial</p> */}
                                </div>
                            </motion.div>

                            {/* Pin 1: Fracción C -> Wellness Center — green, on the blue polygon top-right */}
                            <motion.div
                                variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.2, duration: 0.5, delay: 1.6 } } }}
                                className={`absolute top-[21%] left-[19%] md:top-[23%] md:left-[21%] flex flex-col items-center cursor-pointer group/pin ${activePin === "wellness-center" ? "z-50" : "z-20"}`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    togglePin("wellness-center");
                                }}
                                onMouseEnter={() => setActivePin("wellness-center")}
                                onMouseLeave={() => setActivePin((currentPin) => (currentPin === "wellness-center" ? null : currentPin))}
                            >
                                <div className="relative flex items-center justify-center size-7 md:size-12">
                                    <div className="absolute inset-0 bg-[#B5B588]/50 rounded-full animate-ping opacity-75"></div>
                                    <div className={`relative z-10 bg-[#B5B588] text-white p-1.5 md:p-3 rounded-full shadow-lg transition-transform group-hover/pin:scale-110 ${activePin === "wellness-center" ? "scale-110" : ""}`}>
                                        <Activity className="w-3 h-3 md:w-5 md:h-5" />
                                    </div>
                                </div>
                                <div className={`absolute top-full mt-2 md:top-auto md:bottom-full md:mt-0 md:mb-3 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-max max-w-[132px] sm:max-w-[160px] md:max-w-[240px] bg-white/95 backdrop-blur-md px-2.5 py-2 md:p-4 rounded-lg md:rounded-xl border border-[#AA7D69]/20 shadow-xl transition-all duration-200 pointer-events-none origin-top md:origin-bottom-right text-center md:text-right ${activePin === "wellness-center" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 md:translate-y-2 scale-95"} group-hover/pin:opacity-100 group-hover/pin:translate-y-0 group-hover/pin:scale-100`}>
                                    <h4 className="text-[#222] font-bold text-[10px] leading-tight md:text-sm mb-0 md:mb-1 uppercase tracking-[0.18em] md:tracking-wider whitespace-normal">Wellness Center</h4>
                                    {/* <p className="text-[#B5B588] text-xs leading-relaxed font-semibold">Wellness Center</p> */}
                                </div>
                            </motion.div>

                            {/* Pin 4: Presa de la Cantera — blue, on the river/water area */}
                            <motion.div
                                variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.2, duration: 0.5, delay: 1.7 } } }}
                                className={`absolute top-[51%] right-[18%] flex flex-col items-center cursor-pointer group/pin ${activePin === "presa-cantera" ? "z-50" : "z-20"}`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    togglePin("presa-cantera");
                                }}
                                onMouseEnter={() => setActivePin("presa-cantera")}
                                onMouseLeave={() => setActivePin((currentPin) => (currentPin === "presa-cantera" ? null : currentPin))}
                            >
                                <div className="relative flex items-center justify-center size-8 md:size-14">
                                    <div className="absolute inset-0 bg-[#8FC0DA]/40 rounded-full animate-ping opacity-75"></div>
                                    <div className={`relative z-10 bg-[#8FC0DA] text-white p-2 md:p-3.5 rounded-full shadow-lg transition-transform group-hover/pin:scale-110 ${activePin === "presa-cantera" ? "scale-110" : ""}`}>
                                        <Anchor className="w-3 h-3 md:w-5 md:h-5" />
                                    </div>
                                </div>
                                <div className={`absolute bottom-full mb-2 md:mb-3 right-0 w-max max-w-[132px] sm:max-w-[160px] md:max-w-[240px] bg-white/95 backdrop-blur-md px-2.5 py-2 md:p-4 rounded-lg md:rounded-xl border border-[#AA7D69]/20 shadow-xl transition-all duration-200 pointer-events-none origin-bottom-right text-right ${activePin === "presa-cantera" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"} group-hover/pin:opacity-100 group-hover/pin:-translate-y-0 group-hover/pin:scale-100`}>
                                    <h4 className="text-[#222] font-bold text-[10px] leading-tight md:text-sm mb-0 md:mb-1 uppercase tracking-[0.18em] md:tracking-wider whitespace-normal">Presa de la Cantera</h4>
                                    {/* <p className="text-[#8FC0DA] text-xs leading-relaxed font-semibold">Cuerpo de Agua / Marina</p> */}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        className="relative lg:absolute lg:-left-40 lg:-bottom-8 mt-8 lg:mt-0 z-30 flex flex-col justify-start pointer-events-auto w-full lg:w-auto lg:max-w-[280px]"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.2 } } }}
                    >
                        <div
                            className="relative z-30 bg-white/80 backdrop-blur-xl border border-[#D7D7AA]/40 p-6 md:p-8 shadow-[0_15px_40px_-10px_rgba(225,177,155,0.2)] hover:bg-white transition-all duration-300 group/panel"
                        >
                            <div
                                className="flex items-center gap-3 mb-8 pb-4 border-b border-[#AA7D69]/10"
                            >
                                {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AA7D69"><path d="v-10h40ZM150-130q-46 0-78-32t-32-78v-480q0-46 32-78t78-32h40v-80h80v80h320v-80h80v80h40q46 0 78 32t32 78v480q0 46-32 78t-78 32H150Zm0-80h660v-300H150v500Zm0-380h660v-100H150v100Zm0 0v-100 100Z" /></svg> */}
                                <h3
                                    className="text-[#222] text-sm font-bold uppercase tracking-widest"
                                >
                                    Proximidad
                                </h3>
                            </div>
                            <motion.ul
                                className="space-y-8 relative"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.15 } }
                                }}
                            >
                                <div
                                    className="absolute md:left-[19px] left-2.5 top-4 bottom-4 w-0.5 bg-[#AA7D69]/10"
                                ></div>
                                <motion.li
                                    className="flex items-start gap-5 relative"
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                                >
                                    <div
                                        className="relative z-10 bg-white p-1.5 rounded-full border border-[#E1B19B] group-hover/panel:scale-110 transition-transform"
                                    >
                                        <div className="w-2 h-2 bg-[#E1B19B] rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4
                                            className="text-[#222] font-bold text-xl leading-none mb-1"
                                            style={{ fontFamily: 'var(--font-serif)' }}
                                        >
                                            10 Min
                                        </h4>
                                        <p className="text-[#AA7D69] text-sm font-medium mb-1">
                                            Fábrica La Aurora
                                        </p>
                                        <p className="text-[#222]/60 text-xs">
                                            Centro de arte y diseño.
                                        </p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    className="flex items-start gap-5 relative"
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                                >
                                    <div
                                        className="relative z-10 bg-white p-1.5 rounded-full border border-[#AA7D69] group-hover/panel:scale-110 transition-transform"
                                    >
                                        <div className="w-2 h-2 bg-[#AA7D69] rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4
                                            className="text-[#222] font-bold text-xl leading-none mb-1"
                                            style={{ fontFamily: 'var(--font-serif)' }}
                                        >
                                            8 Min
                                        </h4>
                                        <p className="text-[#AA7D69] text-sm font-medium mb-1">
                                            Centro Histórico
                                        </p>
                                        <p className="text-[#222]/60 text-xs">
                                            Corazón de la ciudad, restaurantes y cultura.
                                        </p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    className="flex items-start gap-5 relative"
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                                >
                                    <div
                                        className="relative z-10 bg-white p-1.5 rounded-full border border-[#D7D7AA] group-hover/panel:scale-110 transition-transform"
                                    >
                                        <div className="w-2 h-2 bg-[#D7D7AA] rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4
                                            className="text-[#222] font-bold text-xl leading-none mb-1"
                                            style={{ fontFamily: 'var(--font-serif)' }}
                                        >
                                            5 Min
                                        </h4>
                                        <p className="text-[#AA7D69] text-sm font-medium mb-1">
                                            Mercados Orgánicos
                                        </p>
                                        <p className="text-[#222]/60 text-xs">
                                            Productos locales y comunidad.
                                        </p>
                                    </div>
                                </motion.li>
                            </motion.ul>
                            <div className="md:mt-8 mt-2 md:pt-6 pt-4 border-t border-[#AA7D69]/10">
                                <a
                                    className="inline-flex items-center gap-2 text-[#AA7D69] hover:text-[#222] transition-colors text-sm font-bold uppercase tracking-wider group/link"
                                    href="/ubicacion"
                                >
                                    Ver más
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="text-lg group-hover/link:translate-x-1 transition-transform"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Images attached cleanly to the bottom right on mobile */}
                        <MobileLocationImages />
                    </motion.div>

                    {/* Render Desktop images outside of the map's overflow-hidden */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-10 hidden lg:block max-w-5xl mx-auto">
                        <DesktopLocationImages />
                    </div>
                </motion.div>

            </main>
        </section >
    );
}
