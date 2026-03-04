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

export default function NavbarV5({ locale }: { locale: string }) {
    const t = useTranslations("nav");
    const router = useRouter();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 60);

            if (currentScrollY > lastScrollY && currentScrollY > 0) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setHidden(false);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when mobile menu open
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
                initial={{ opacity: 0 }}
                animate={{ opacity: hidden ? 0 : 1 }}
                transition={{ duration: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#FFF3E1]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(170,125,105,0.08)]"
                    : "bg-transparent"
                    }`}
            >
                <div className="mx-auto flex w-full items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
                    {/* Left: Logo */}
                    <a href="#" className="relative z-10 flex items-center">
                        <Image
                            src={scrolled ? "/logos/logo-new.png" : "/logos/logo-new.png"}
                            alt="Don Diego Logo"
                            width={140}
                            height={44}
                            className="h-3 w-auto transition-all duration-500"
                            priority
                        />
                    </a>

                    {/* Center: Links (desktop) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map(({ key, href }) => (
                            <a
                                key={key}
                                href={href}
                                className={`relative px-4 py-2 text-[10px] font-medium tracking-[0.18em] uppercase transition-all duration-300 group ${scrolled
                                    ? "text-[#222]/50 hover:text-[#222]"
                                    : "text-white/60 hover:text-white"
                                    }`}
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t(key)}
                                <span
                                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-6 transition-all duration-300 ${scrolled ? "bg-[#AA7D69]" : "bg-[#E1B19B]"
                                        }`}
                                />
                            </a>
                        ))}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={switchLocale}
                            className={`text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${scrolled
                                ? "text-[#222]/40 hover:text-[#222]"
                                : "text-white/40 hover:text-white"
                                }`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`flex lg:hidden h-8 w-8 flex-col items-center justify-center gap-[5px] ${scrolled ? "text-[#222]" : "text-white"
                                }`}
                            aria-label="Menu"
                        >
                            <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                            <span className={`block h-px w-5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                            <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile fullscreen overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-[#111]/98 backdrop-blur-xl lg:hidden"
                    >
                        <div className="flex h-full flex-col items-center justify-center gap-8">
                            {navLinks.map(({ key, href }, i) => (
                                <motion.a
                                    key={key}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                    className="text-2xl text-white/80 hover:text-[#E1B19B] transition-colors tracking-[0.15em] uppercase"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {t(key)}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
