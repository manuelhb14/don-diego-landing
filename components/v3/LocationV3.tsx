"use client";

// The Map section uses standard HTML elements and inline styles.


export default function LocationV3() {
    return (
        <section id="location" className="bg-[#FFF3E1] text-[#222222] overflow-x-hidden antialiased">
            <main className="relative w-full flex flex-col items-center py-12 md:py-16 px-6 md:px-10 max-w-[1440px] mx-auto">
                <div className="w-full max-w-6xl mb-8 md:mb-12 z-10 relative">
                    <h5
                        className="text-[#AA7D69] text-sm font-bold uppercase tracking-[0.2em] mb-4 pl-1"
                    >
                        San Miguel de Allende
                    </h5>
                    <h1
                        className="text-[#222] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 max-w-4xl"
                    >
                        CERCA DE TODO, <br className="hidden md:block" />
                        <span className="text-[#AA7D69]/90 italic font-light">LEJOS DE LO COMÚN</span>
                    </h1>
                    <p
                        className="text-[#222]/70 text-lg font-normal leading-relaxed max-w-xl pl-6 border-l-2 border-[#AA7D69]/30"
                    >
                        Un santuario de vida consciente donde el lujo se encuentra con la naturaleza. Conectado al vibrante corazón de la ciudad, pero resguardado en la tranquilidad.
                    </p>
                </div>
                <div
                    className="relative w-full max-w-7xl h-auto min-h-[450px] md:min-h-[550px] grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                    <div
                        className="lg:col-span-9 relative w-full h-[450px] md:h-full min-h-[450px] bg-[#FFF3E1] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(170,125,105,0.15)] border border-[#AA7D69]/10 group"
                        style={{
                            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(225, 177, 155, 0.1) 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(225, 177, 155, 0.05) 0px, rgba(225, 177, 155, 0.05) 1px, transparent 1px, transparent 40px)`
                        }}
                        data-location="San Miguel de Allende"
                    >
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            preserveAspectRatio="xMidYMid slice"
                            viewBox="0 0 1000 800"
                        >
                            <path
                                d="M-100,800 L200,800 C150,700 300,650 400,750 C500,850 600,800 650,850 L-100,900 Z"
                                fill="#C8D7E6"
                                opacity="0.4"
                            ></path>
                            <path
                                d="M-100,600 C100,550 300,650 500,500 S 800,300 1100,200"
                                fill="none"
                                opacity="0.4"
                                stroke="#D7D7AA"
                                strokeWidth="1.5"
                            ></path>
                            <path
                                d="M-100,700 C150,650 350,750 600,600 S 900,400 1200,300"
                                fill="none"
                                opacity="0.3"
                                stroke="#DEBEBF"
                                strokeWidth="1.5"
                            ></path>
                            <path
                                d="M0,300 Q 300,100 600,200 T 1000,100"
                                fill="none"
                                opacity="0.3"
                                stroke="#AA7D69"
                                strokeWidth="1"
                            ></path>
                            <path
                                d="M800,800 C750,600 700,500 600,400 C500,300 450,350 350,300 C250,250 200,100 150,0"
                                fill="none"
                                opacity="0.8"
                                stroke="#AA7D69"
                                strokeLinecap="round"
                                strokeWidth="4"
                            ></path>
                            <path
                                d="M600,400 C550,500 400,500 300,600"
                                fill="none"
                                opacity="0.7"
                                stroke="#E1B19B"
                                strokeDasharray="8,4"
                                strokeWidth="2.5"
                            ></path>
                            <path
                                d="M350,300 C400,200 500,150 600,100"
                                fill="none"
                                opacity="0.7"
                                stroke="#E1B19B"
                                strokeDasharray="8,4"
                                strokeWidth="2.5"
                            ></path>
                            <circle
                                cx="200"
                                cy="600"
                                fill="#D7D7AA"
                                fillOpacity="0.15"
                                r="180"
                            ></circle>
                            <circle
                                cx="750"
                                cy="150"
                                fill="#DEBEBF"
                                fillOpacity="0.1"
                                r="100"
                            ></circle>
                        </svg>
                        <div
                            className="absolute top-[35%] left-[45%] flex flex-col items-center z-20 cursor-pointer group/pin"
                        >
                            <div className="relative flex items-center justify-center size-20">
                                <div
                                    className="absolute inset-0 bg-[#AA7D69]/30 rounded-full animate-ping opacity-75"
                                ></div>
                                <div
                                    className="relative z-10 bg-[#AA7D69] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(170,125,105,0.4)] transition-transform group-hover/pin:scale-110"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-134 0-227-93t-93-227q0-108 61.5-197.5T384-754v234H264q9-48 36.5-88.5T364-678l-84-84q-54 48-85 113.5T164-500q0 39 9 76.5t25 71.5L340-494v-66h140v140H414L252-258q49 33 107.5 50.5T480-190q109 0 193.5-66.5T778-430q3-22 5-45t2-45q0-88-34-165.5T658-818l-84 84q45 42 70.5 98.5T670-520H546v-240h128q-36-50-89-80t-115-30q-26 0-51 4.5T370-852l-90-90q63-39 133-58.5T560-1020q187 0 317.5 130.5T1008-540q0 29-2.5 58t-7.5 56q-16 114-87.5 201T684-142q-48 11-99 16.5T480-120Z" /></svg>
                                </div>
                            </div>
                            <div
                                className="mt-4 bg-white/90 backdrop-blur-md px-5 py-2 rounded-xl border border-[#AA7D69]/20 shadow-xl translate-y-2 opacity-0 group-hover/pin:translate-y-0 group-hover/pin:opacity-100 transition-all duration-300"
                            >
                                <span
                                    className="text-[#222] font-bold tracking-wide text-sm uppercase"
                                >Don Diego</span>
                                <p className="text-[#AA7D69] text-xs">Estás aquí</p>
                            </div>
                        </div>
                        <div
                            className="absolute top-[15%] right-[25%] flex flex-col items-center z-10 group/poi cursor-pointer hover:z-30"
                        >
                            <div
                                className="bg-white/90 p-2 rounded-full border border-[#E1B19B] hover:bg-[#E1B19B] hover:border-[#E1B19B] transition-colors duration-300 shadow-sm"
                            >
                                <svg className="text-[#AA7D69] group-hover/poi:text-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-720q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720ZM240-160v-360h-80v-80h160v-160h320v160h160v80h-80v360H240Zm80-80h320v-280H320v280Z" /></svg>
                            </div>
                            <span
                                className="text-[#222] text-[10px] font-bold mt-2 uppercase tracking-widest bg-white/80 px-2 py-1 rounded backdrop-blur-sm border border-[#E1B19B]/20"
                            >Centro</span>
                        </div>
                        <div
                            className="absolute bottom-[25%] left-[20%] flex flex-col items-center z-10 group/poi cursor-pointer hover:z-30"
                        >
                            <div
                                className="bg-white/90 p-2 rounded-full border border-[#C8D7E6] hover:bg-[#C8D7E6] hover:border-[#C8D7E6] transition-colors duration-300 shadow-sm"
                            >
                                <svg className="text-[#C8D7E6] group-hover/poi:text-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m480-300 160-200H320l160 200Zm0 220 320-400H160l320 400Z" /></svg>
                            </div>
                            <span
                                className="text-[#222] text-[10px] font-bold mt-2 uppercase tracking-widest bg-white/80 px-2 py-1 rounded backdrop-blur-sm border border-[#C8D7E6]/20"
                            >La Presa</span>
                        </div>
                        <div className="absolute bottom-8 right-8 opacity-20 pointer-events-none">
                            <svg className="text-[#AA7D69] w-16 h-16" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm-32-114 114-254 254-114-114 254-254 114Zm112-206q34 0 57.5-23.5T640-560q0-34-23.5-57.5T560-640q-34 0-57.5 23.5T480-560q0 34 23.5 57.5T560-480Z" /></svg>
                        </div>
                    </div>
                    <div
                        className="hidden lg:block absolute -top-12 right-0 w-64 aspect-[3/4] z-20 floating-card animate-[float_6s_ease-in-out_infinite]"
                    >
                        <div
                            className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] relative group"
                        >
                            <div
                                className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
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
                    </div>
                    <div
                        className="hidden lg:block absolute -bottom-16 left-12 w-80 aspect-video z-20 floating-card-delayed animate-[float_7s_ease-in-out_infinite_1s]"
                    >
                        <div
                            className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] relative group"
                        >
                            <div
                                className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
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
                    </div>
                    <div
                        className="lg:col-span-3 lg:-ml-12 z-30 flex flex-col justify-center py-8"
                    >
                        <div
                            className="bg-white/80 backdrop-blur-xl border border-[#D7D7AA]/40 p-8 rounded-2xl shadow-[0_15px_40px_-10px_rgba(225,177,155,0.2)] hover:bg-white transition-all duration-300 group/panel"
                        >
                            <div
                                className="flex items-center gap-3 mb-8 pb-4 border-b border-[#AA7D69]/10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AA7D69"><path d="v-10h40ZM150-130q-46 0-78-32t-32-78v-480q0-46 32-78t78-32h40v-80h80v80h320v-80h80v80h40q46 0 78 32t32 78v480q0 46-32 78t-78 32H150Zm0-80h660v-300H150v300Zm0-380h660v-100H150v100Zm0 0v-100 100Z" /></svg>
                                <h3
                                    className="text-[#222] text-sm font-bold uppercase tracking-widest"
                                >
                                    Proximidad
                                </h3>
                            </div>
                            <ul className="space-y-8 relative">
                                <div
                                    className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#AA7D69]/10"
                                ></div>
                                <li className="flex items-start gap-5 relative">
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
                                </li>
                                <li className="flex items-start gap-5 relative">
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
                                </li>
                                <li className="flex items-start gap-5 relative">
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
                                </li>
                            </ul>
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
                </div>
                <div className="lg:hidden w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="relative h-64 rounded-xl overflow-hidden group shadow-lg">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjBsaAQLqp-mkLyClGyM7VMqokQs5WDWo9YcdboMkwp4km_61ubQ-opzFfkBLu3ai0hdXX2PM-rDU3ruCdHCjhZo1V0-Xd9ti_An9WC1b5rExvqW9Is1yWqWqK9qo0Hs7PvZw1JIPI6THHxprBdLtnzlFlc--ctMb1j2ODGj7QADs368U_SLGwPdAHHdBDSm0XFzrgf8bWfTyV98GnD2e6Pct0ajmxr07GCM49sJuKze1tvx_IWTp-yqRb81K1RQe8051d59hHg-uK")`
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                            <p className="text-white font-bold">Encanto Colonial</p>
                        </div>
                    </div>
                    <div className="relative h-64 rounded-xl overflow-hidden group shadow-lg">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5H-CJkL248aO_sxSwfLD8-_sQ5Z-3C2TuAXTvZyF55m7JfYMvCI2MoERdOMhSElJgmpr05YRK2nfZOY4mXKRHi3Akmj0ybks6AeK3HpZV-lmkTiuQK4JciMkw-CiSeu1yNB-dK5E81zDIybsPU_klV6VEsYVxHzH0Be0PJcNs8khYCTgZ66l4Ig93hWBNlXnDr_pv0fQnrTUIddUUxfGjD0-vjJ2Erll3Alp5d4X0S4jAOeC_tGDUhZ-7j1KFCiFUAqWzzvW8vG5T")`
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                            <p className="text-white font-bold">La Parroquia</p>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}
