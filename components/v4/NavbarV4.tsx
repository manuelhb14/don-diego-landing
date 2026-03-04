"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
    { key: "proyecto", href: "#proyecto" },
    { key: "galeria", href: "#galeria" },
    { key: "ubicacion", href: "#ubicacion" },
    { key: "equipo", href: "#equipo" },
    { key: "contacto", href: "#contacto" },
] as const;

export default function NavbarV4({ locale }: { locale: string }) {
    const t = useTranslations("nav");
    const router = useRouter();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const switchLocale = () => {
        const next = locale === "es" ? "en" : "es";
        router.replace(pathname, { locale: next });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${scrolled
                        ? "bg-cream/95 backdrop-blur-md border-b border-clay/8"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
                    {/* Left: nav links (desktop) */}
                    <div className="hidden lg:flex items-center gap-8 flex-1">
                        {navLinks.slice(0, 3).map(({ key, href }) => (
                            <a
                                key={key}
                                href={href}
                                className={`text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-300 ${scrolled
                                        ? "text-dark/40 hover:text-dark"
                                        : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {t(key)}
                            </a>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <a href="#" className="relative z-10">
                        <Image
                            src={scrolled ? "/logos/logo-dark.png" : "/logos/logo-light.png"}
                            alt="Don Diego Club Residencial"
                            width={160}
                            height={50}
                            className="h-8 w-auto lg:h-10 transition-all duration-500"
                            priority
                        />
                    </a>

                    {/* Right: nav links + lang (desktop) */}
                    <div className="hidden lg:flex items-center justify-end gap-8 flex-1">
                        {navLinks.slice(3).map(({ key, href }) => (
                            <a
                                key={key}
                                href={href}
                                className={`text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-300 ${scrolled
                                        ? "text-dark/40 hover:text-dark"
                                        : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {t(key)}
                            </a>
                        ))}
                        <button
                            onClick={switchLocale}
                            className={`text-[11px] font-bold tracking-[0.14em] uppercase ml-2 transition-colors duration-300 ${scrolled
                                    ? "text-clay/60 hover:text-clay"
                                    : "text-white/40 hover:text-white"
                                }`}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>
                    </div>

                    {/* Mobile: lang + hamburger */}
                    <div className="flex items-center gap-5 lg:hidden">
                        <button
                            onClick={switchLocale}
                            className={`text-[11px] font-bold tracking-[0.14em] uppercase ${scrolled ? "text-dark/40" : "text-white/50"
                                }`}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`flex h-8 w-8 flex-col items-center justify-center gap-[5px] ${scrolled ? "text-dark" : "text-white"
                                }`}
                            aria-label="Menu"
                        >
                            <span className={`block h-[1.5px] w-5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
                            <span className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                            <span className={`block h-[1.5px] w-5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-40 bg-cream lg:hidden flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-7">
                            {navLinks.map(({ key, href }, i) => (
                                <motion.a
                                    key={key}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.4 }}
                                    className="text-dark/70 hover:text-dark text-2xl tracking-[0.08em] uppercase transition-colors font-bold"
                                >
                                    {t(key)}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
