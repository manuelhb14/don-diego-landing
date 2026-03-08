"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Instagram, Youtube } from "lucide-react";
import Link from 'next/link';

export default function ComingSoon() {
    return (
        <main className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#FFF3E1] text-[#222222]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/gallery/gallery-6.jpg"
                    alt="San Miguel de Allende"
                    fill
                    className="object-cover object-center opacity-20 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFF3E1] via-[#FFF3E1]/80 to-[#FFF3E1]/40" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-8 md:mb-12"
                >
                    <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                        <div className="text-[#AA7D69] tracking-[0.2em] uppercase font-serif text-xl sm:text-2xl">
                            Don Diego
                        </div>
                    </Link>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <p className="text-[9px] sm:text-xs tracking-[0.4em] text-[#AA7D69] uppercase mb-4 md:mb-6" style={{ fontFamily: "var(--font-sans)" }}>
                        [ Próximamente ]
                    </p>
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl leading-none mb-6 md:mb-8 text-[#222222]"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Cerca de todo <br /><span className="text-[#AA7D69] italic">lejos de lo común</span>
                    </h1>
                    <p
                        className="text-[#222222]/70 text-base md:text-xl max-w-md mx-auto leading-relaxed mb-8 md:mb-12"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                    >
                        Descubre un espacio único en San Miguel de Allende, donde la naturaleza y el diseño se encuentran para crear una experiencia inolvidable.
                    </p>
                </motion.div>

                {/* Notify Me / Contact Form */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md mx-auto mb-8 md:mb-16 flex flex-col items-center"
                >
                    <form className="relative flex items-center border-b border-[#AA7D69]/50 pb-2 group w-full">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            required
                            className="w-full bg-transparent text-[#222222] placeholder-[#222222]/40 outline-none text-base"
                            style={{ fontFamily: "var(--font-sans)" }}
                        />
                        <button
                            type="submit"
                            className="absolute right-0 text-[#AA7D69] group-hover:text-[#8C7B6C] transition-colors p-2"
                            aria-label="Registrarse"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-[9px] sm:text-[10px] text-[#222222]/50 mt-3 text-center w-full" style={{ fontFamily: "var(--font-sans)" }}>
                        Regístrate para recibir acceso prioritario y novedades exclusivas.
                    </p>
                </motion.div> */}

                {/* Social Links Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Socials Divider */}
                    <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-[#AA7D69]/40 to-transparent mb-6"></div>

                    {/* Links */}
                    <div className="flex items-center gap-6 sm:gap-8">
                        {/* Instagram */}
                        <a href="https://www.instagram.com/dondiegosma/" target="_blank" rel="noopener noreferrer" className="text-[#AA7D69]/70 hover:text-[#AA7D69] hover:-translate-y-1 transition-all duration-300">
                            <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
                        </a>
                        {/* Youtube */}
                        <a href="https://www.youtube.com/@dondiegosma" target="_blank" rel="noopener noreferrer" className="text-[#AA7D69]/70 hover:text-[#AA7D69] hover:-translate-y-1 transition-all duration-300">
                            <Youtube className="w-6 h-6 sm:w-7 sm:h-7" />
                        </a>
                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@dondiegosma" target="_blank" rel="noopener noreferrer" className="text-[#AA7D69]/70 hover:text-[#AA7D69] hover:-translate-y-1 transition-all duration-300">
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
