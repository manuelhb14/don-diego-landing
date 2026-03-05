"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
    { key: "proyecto", label: "Proyecto", href: "/proyecto" },
    { key: "ubicacion", label: "Ubicación", href: "/ubicacion" },
    { key: "equipo", label: "Equipo", href: "/equipo" },
    { key: "contacto", label: "Contacto", href: "/contacto" },
] as const;

export default function Navbar({ locale, theme = "light" }: { locale: string; theme?: "light" | "dark" }) {
    const router = useRouter();
    const pathname = usePathname();
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent ${scrolled || theme === "dark" ? "mix-blend-difference" : ""}`}
            >
                <div className="mx-auto flex w-full items-center justify-between px-6 py-4 lg:px-6 lg:py-5 text-white">
                    {/* Left: Links (Desktop) */}
                    <div className="flex-1 hidden lg:flex items-center justify-start gap-6">
                        {navLinks.map(({ key, label, href }) => (
                            <Link
                                key={key}
                                href={href}
                                className="relative flex items-center px-2 py-2 text-[13px] font-light tracking-[0.18em] uppercase transition-all duration-300 group hover:text-white/80"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {label}
                                <span
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-[24px] transition-all duration-300 bg-white"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className="relative z-10 flex items-center justify-center flex-none">
                        <Image
                            src="/logos/logo-white.svg"
                            alt="Don Diego Logo"
                            width={160}
                            height={50}
                            className="h-3.5 md:h-4.5 w-auto transition-all duration-500"
                            priority
                        />
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex flex-1 items-center justify-end gap-6">
                        {/* Locale Switch */}
                        <button
                            onClick={switchLocale}
                            className="text-[13px] font-light tracking-[0.18em] uppercase transition-colors duration-300 hover:text-white/80"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex lg:hidden h-8 w-8 flex-col items-center justify-center gap-[6px] text-white"
                            aria-label="Menu"
                        >
                            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                            <span className={`block h-px w-6 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
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
                            {navLinks.map(({ key, label, href }, i) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                >
                                    <Link
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-2xl text-white/80 hover:text-[#E1B19B] transition-colors tracking-[0.15em] uppercase block"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
