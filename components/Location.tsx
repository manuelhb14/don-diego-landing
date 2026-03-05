"use client";

// The Map section uses standard HTML elements and inline styles.

import { motion } from "motion/react";
import { Home, Anchor, Leaf, Activity } from "lucide-react";

const MapPaths = () => (
    <>
        {/* Fracción C (Wellness Center) - Top Left Block */}
        <motion.path
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.6, transition: { duration: 1.5, ease: "easeOut" } } }}
            d="M50,150 L250,50 L350,200 L150,300 Z"
            fill="#C8D7E6"
        />

        {/* Fracción B (Club Residencial) - Top Middle Area */}
        <motion.path
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.3, transition: { duration: 1.5, ease: "easeOut" } } }}
            d="M350,250 L650,100 L800,350 L500,500 Z"
            fill="#D7D7AA"
        />

        {/* Fracción A (Organic Farm) - Expanded Bottom connecting Residences and Presa */}
        <motion.path
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.4, transition: { duration: 1.5, ease: "easeOut" } } }}
            d="M250,650 C400,600 600,500 750,550 C850,580 900,650 1000,750 L1000,950 L200,900 Z"
            fill="#A6A672"
        />

        {/* Presa de la Cantera (Lake) - Right Side */}
        <motion.path
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.5, transition: { duration: 1.5, ease: "easeOut" } } }}
            d="M750,550 C850,450 1000,300 1150,350 C1250,400 1200,650 1000,750 C900,650 850,580 750,550 Z"
            fill="#7B9CB6"
        />

        {/* Line drawings (stroke length animations) */}
        {/* Main Road */}
        <motion.path
            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.7, transition: { duration: 2, ease: "easeInOut" } } }}
            d="M250,850 Q350,600 550,550 T1050,150"
            fill="none" stroke="#AA7D69" strokeWidth="16"
        />
        <motion.path
            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.9, transition: { duration: 2, ease: "easeInOut" } } }}
            d="M250,850 Q350,600 550,550 T1050,150"
            fill="none" stroke="#FFF3E1" strokeWidth="2" strokeDasharray="10, 10"
        />

        {/* River */}
        <motion.path
            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.6, transition: { duration: 1.5, ease: "easeInOut" } } }}
            d="M-50,650 Q100,750 250,650 T450,750 T650,650"
            fill="none" stroke="#C8D7E6" strokeWidth="24" strokeLinecap="round"
        />

        {/* Railway */}
        <motion.path
            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.5, transition: { duration: 1.5, ease: "easeInOut" } } }}
            d="M250,-50 L0,700"
            fill="none" stroke="#AA7D69" strokeWidth="4"
        />
        <motion.path
            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.2, transition: { duration: 1.5, ease: "easeInOut" } } }}
            d="M250,-50 L0,700"
            fill="none" stroke="#222" strokeWidth="8" strokeDasharray="4, 8"
        />

        {/* Residential Grids & Details */}
        <motion.path variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.6, transition: { duration: 1, ease: "easeInOut" } } }} d="M150,150 L300,450 M120,200 L250,500 M100,300 L200,550" fill="none" stroke="#E1B19B" strokeWidth="2" />
        <motion.path variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.6, transition: { duration: 1, ease: "easeInOut" } } }} d="M150,150 L100,200 M200,250 L120,300 M250,350 L150,400 M300,450 L200,500 M250,550 L180,600" fill="none" stroke="#E1B19B" strokeWidth="2" />
        <motion.path variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.5, transition: { duration: 0.8, ease: "easeInOut" } } }} d="M380,620 Q450,580 520,620" fill="none" stroke="#D7D7AA" strokeWidth="2" />
        <motion.path variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.5, transition: { duration: 0.8, ease: "easeInOut" } } }} d="M400,640 Q450,610 500,640" fill="none" stroke="#D7D7AA" strokeWidth="2" />
    </>
);

export default function Location() {
    return (
        <section id="location" className="bg-[#FFF3E1] text-[#222222] overflow-x-hidden md:overflow-hidden antialiased w-full relative">
            <main className="relative w-full flex flex-col items-center py-12 md:py-16 px-6 md:px-10 max-w-[1440px] mx-auto mb-12">
                <div className="w-full max-w-6xl mb-8 md:mb-12 z-10 relative flex flex-col items-center text-center">
                    {/* <h5
                        className="text-[#AA7D69] text-sm font-bold uppercase tracking-[0.2em] mb-4 pl-1"
                    >
                        San Miguel de Allende
                    </h5>
                    <h1
                        className="text-[#222] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 max-w-4xl"
                    >
                        CERCA DE TODO, <br className="hidden md:block" />
                        <span className="text-[#AA7D69]/90 italic font-light">LEJOS DE LO COMÚN</span>
                    </h1> */}
                    <motion.div
                        className="flex flex-col items-center justify-center text-center w-full"
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
                </div>

                <motion.div
                    className="relative w-full max-w-5xl h-auto min-h-[500px] md:min-h-[550px] pb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.08,
                                delayChildren: 0.1
                            }
                        }
                    }}
                >
                    <div
                        className="relative w-full aspect-[4/5] min-h-[500px] md:aspect-auto md:h-[600px] bg-[#EAE0D5] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(170,125,105,0.15)] border border-[#AA7D69]/10 group"
                        style={{
                            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(225, 177, 155, 0.1) 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(225, 177, 155, 0.05) 0px, rgba(225, 177, 155, 0.05) 1px, transparent 1px, transparent 40px)`
                        }}
                        data-location="San Miguel de Allende"
                    >
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            preserveAspectRatio="xMidYMid slice"
                            viewBox="-150 -100 1300 1000"
                        >
                            <MapPaths />
                        </svg>

                        {/* Pin 1: Fracción C -> Wellness Center (Top Left) */}
                        <motion.div
                            variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } } }}
                            className="absolute top-[15%] left-[5%] md:top-[15%] md:left-[15%] flex flex-col items-center z-20 cursor-pointer group/pin md:w-max"
                        >
                            <div className="relative flex items-center justify-center size-12">
                                <div className="absolute inset-0 bg-[#A6A672]/40 rounded-full animate-ping opacity-75"></div>
                                <div className="relative z-10 bg-[#A6A672] text-white p-3 rounded-full shadow-lg transition-transform group-hover/pin:scale-110">
                                    <Activity className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="absolute bottom-full mb-3 left-0 w-max max-w-[200px] md:max-w-[240px] bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#AA7D69]/20 shadow-xl opacity-0 translate-y-2 scale-95 group-hover/pin:opacity-100 group-hover/pin:-translate-y-0 group-hover/pin:scale-100 transition-all duration-200 pointer-events-none origin-bottom-left text-left">
                                <h4 className="text-[#222] font-bold text-sm mb-1 uppercase tracking-wider">Fracción C</h4>
                                <p className="text-[#A6A672] text-xs leading-relaxed font-semibold">Wellness Center</p>
                            </div>
                        </motion.div>

                        {/* Pin 2: Fracción B -> Club Residencial (Top Middle) */}
                        <motion.div
                            variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } } }}
                            className="absolute top-[18%] left-[40%] md:top-[20%] md:left-[45%] flex flex-col items-center z-20 cursor-pointer group/pin"
                        >
                            <div className="relative flex items-center justify-center size-12">
                                <div className="absolute inset-0 bg-[#E1B19B]/40 rounded-full animate-ping opacity-75"></div>
                                <div className="relative z-10 bg-[#E1B19B] text-white p-3 rounded-full shadow-lg transition-transform group-hover/pin:scale-110">
                                    <Home className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[200px] md:max-w-[240px] bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#AA7D69]/20 shadow-xl opacity-0 translate-y-2 scale-95 group-hover/pin:opacity-100 group-hover/pin:-translate-y-0 group-hover/pin:scale-100 transition-all duration-200 pointer-events-none origin-bottom text-center">
                                <h4 className="text-[#222] font-bold text-sm mb-1 uppercase tracking-wider">Fracción B</h4>
                                <p className="text-[#AA7D69] text-xs leading-relaxed font-semibold">Club Residencial</p>
                            </div>
                        </motion.div>

                        {/* Pin 3: Fracción A -> Organic farm & flowers (Bottom Middle) */}
                        <motion.div
                            variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } } }}
                            className="absolute bottom-[28%] left-[50%] md:bottom-[30%] md:left-[45%] flex flex-col items-center z-20 cursor-pointer group/pin"
                        >
                            <div className="relative flex items-center justify-center size-12">
                                <div className="absolute inset-0 bg-[#A6A672]/50 rounded-full animate-ping opacity-75"></div>
                                <div className="relative z-10 bg-[#A6A672] text-white p-3 rounded-full shadow-lg transition-transform group-hover/pin:scale-110">
                                    <Leaf className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[200px] md:max-w-[240px] bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#AA7D69]/20 shadow-xl opacity-0 translate-y-2 scale-95 group-hover/pin:opacity-100 group-hover/pin:-translate-y-0 group-hover/pin:scale-100 transition-all duration-200 pointer-events-none origin-bottom text-center">
                                <h4 className="text-[#222] font-bold text-sm mb-1 uppercase tracking-wider">Fracción A</h4>
                                <p className="text-[#A6A672] text-xs leading-relaxed font-semibold">Organic Farm & Flowers</p>
                            </div>
                        </motion.div>

                        {/* Pin 4: Presa de la Cantera (Right) */}
                        <motion.div
                            variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } } }}
                            className="absolute top-[55%] right-[10%] md:top-[60%] md:right-[15%] flex flex-col items-center z-20 cursor-pointer group/pin"
                        >
                            <div className="relative flex items-center justify-center size-14">
                                <div className="absolute inset-0 bg-[#7B9CB6]/40 rounded-full animate-ping opacity-75"></div>
                                <div className="relative z-10 bg-[#7B9CB6] text-white p-3.5 rounded-full shadow-lg transition-transform group-hover/pin:scale-110">
                                    <Anchor className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="absolute bottom-full mb-3 right-0 w-max max-w-[200px] md:max-w-[240px] bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#AA7D69]/20 shadow-xl opacity-0 translate-y-2 scale-95 group-hover/pin:opacity-100 group-hover/pin:-translate-y-0 group-hover/pin:scale-100 transition-all duration-200 pointer-events-none origin-bottom-right text-right">
                                <h4 className="text-[#222] font-bold text-sm mb-1 uppercase tracking-wider">Presa de la Cantera</h4>
                                <p className="text-[#7B9CB6] text-xs leading-relaxed font-semibold">Cuerpo de Agua / Marina</p>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="hidden lg:block absolute top-16 -right-8 w-64 aspect-[3/4] z-10 pointer-events-none"
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } }}
                    >
                        <div
                            className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] relative"
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDs00-_GCKkrCFoxuqIdnSQPBxxiSQOB34r6bUBs4vDrhv7xcLgDNId9KW3fzHaZjAJ0BL2gdc62yx5W2TMofi1XrWQJAiha_vWecWib2NbdFaqSXcLectwiuzP_uasJ6WR2aX6uUq05yQy0ahv0IRQF63LLInINhNuPfoSaWFIc0Oz0OchmKztsZvsTspnRbvNl_XPTBTSLrLjc_newbjbVlYWMRHqC4d8xTtIdxrWfzNn_6En6--apeBhJOC3d2u51EtT5AQ6yqef")`
                                }}
                            ></div>
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-transparent to-transparent opacity-80"
                            ></div>
                            <div className="absolute bottom-5 left-5">
                                <p className="text-white text-lg font-bold">Encanto Colonial</p>
                                <p className="text-[#E1B19B] text-xs uppercase tracking-wide">
                                    Centro Histórico
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hidden lg:block absolute -top-24 -right-32 w-80 aspect-video z-20 pointer-events-none"
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } } }}
                    >
                        <div
                            className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] relative"
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsXLPABdSM9fcKIShbnfpbg8h2Y9UqsiOi9oAKnNNsQKhknnXl6x-ikZHuRFPXtOaLEe3QX83TxDdPganEgmlvCby8PtiOzU_I1ep9twDHIiY_tzb6XpocVrnxGvm_HY6OD1h6A3mWhiurKSFoNv9WK7b21FMzX6wlPbostRbNpxfZ1WQ-HvAHT1Ny2c-gkiHlwTDKTRCO8S-z6caoZcN8ceKhcH7S2KC-HXe20oweKB8-INxGIZxhKrTvajqBZA0wA_PnCpOnzu9n")`
                                }}
                            ></div>
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-transparent to-transparent opacity-80"
                            ></div>
                            <div className="absolute bottom-5 left-5">
                                <p className="text-white text-lg font-bold">La Parroquia</p>
                                <p className="text-[#E1B19B] text-xs uppercase tracking-wide">
                                    Ícono Histórico
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <div
                        className="lg:absolute lg:-left-8 lg:-bottom-12 mt-8 lg:mt-0 z-30 flex flex-col justify-start pointer-events-auto w-full lg:w-auto"
                    >
                        <div
                            className="bg-white/80 backdrop-blur-xl border border-[#D7D7AA]/40 p-8 rounded-2xl shadow-[0_15px_40px_-10px_rgba(225,177,155,0.2)] hover:bg-white transition-all duration-300 group/panel"
                        >
                            <div
                                className="flex items-center gap-3 mb-8 pb-4 border-b border-[#AA7D69]/10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AA7D69"><path d="v-10h40ZM150-130q-46 0-78-32t-32-78v-480q0-46 32-78t78-32h40v-80h80v80h320v-80h80v80h40q46 0 78 32t32 78v480q0 46-32 78t-78 32H150Zm0-80h660v-300H150v500Zm0-380h660v-100H150v100Zm0 0v-100 100Z" /></svg>
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
                                    className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#AA7D69]/10"
                                ></div>
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
                                            15 Min
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
                            <div className="mt-8 pt-6 border-t border-[#AA7D69]/10">
                                <a
                                    className="inline-flex items-center gap-2 text-[#AA7D69] hover:text-[#222] transition-colors text-sm font-bold uppercase tracking-wider group/link"
                                    href="#"
                                >
                                    Descargar Guía de la Zona
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="text-lg group-hover/link:translate-x-1 transition-transform"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Text moved to be under the map */}
                <div className="w-full max-w-3xl mt-2 md:mt-32 text-center flex flex-col items-center px-4 relative z-10">
                    <p className="text-[#222]/80 text-xl font-medium leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
                        Un santuario de vida consciente donde el lujo se encuentra con la naturaleza. Conectado al vibrante corazón de la ciudad, pero resguardado en la tranquilidad.
                    </p>
                </div>

            </main>
        </section >
    );
}
