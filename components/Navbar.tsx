"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const navLinks = [
    { key: "inicio", label: "Inicio", href: "/" },
    {
        key: "proyecto",
        label: "Proyecto",
        href: "/proyecto",
        subLinks: [
            { key: "residencial", label: "Club Residencial", href: "/residencial", color: "#E1B19B" },
            { key: "farm", label: "Organic Farm", href: "/farm", color: "#DEBEBF" },
            { key: "wellness", label: "Wellness Center", href: "/wellness", color: "#D7D7AA" },
            { key: "presa", label: "Presa de la Cantera", href: "/presa", color: "#C8D7E6" },
        ]
    },
    { key: "ubicacion", label: "Ubicación", href: "/ubicacion" },
    { key: "equipo", label: "Equipo", href: "/equipo" },
    { key: "contacto", label: "Contacto", href: "/contacto" },
];

export default function Navbar({ locale, theme = "light", hideLogoAtTop = false }: { locale: string; theme?: "light" | "dark"; hideLogoAtTop?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
    const [desktopDropdownPosition, setDesktopDropdownPosition] = useState<{ left: number; top: number } | null>(null);
    const desktopDropdownCloseTimeout = useRef<number | null>(null);
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 60);
            setOpenDesktopMenu(null);
            setDesktopDropdownPosition(null);

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

    useEffect(() => {
        return () => {
            if (desktopDropdownCloseTimeout.current !== null) {
                window.clearTimeout(desktopDropdownCloseTimeout.current);
            }
        };
    }, []);

    const switchLocale = () => {
        const next = locale === "es" ? "en" : "es";
        router.replace(pathname, { locale: next });
    };

    const clearDesktopDropdownClose = () => {
        if (desktopDropdownCloseTimeout.current !== null) {
            window.clearTimeout(desktopDropdownCloseTimeout.current);
            desktopDropdownCloseTimeout.current = null;
        }
    };

    const openDesktopDropdown = (key: string, trigger: HTMLDivElement) => {
        clearDesktopDropdownClose();
        const rect = trigger.getBoundingClientRect();
        setOpenDesktopMenu(key);
        setDesktopDropdownPosition({ left: rect.left, top: rect.bottom + 10 });
    };

    const scheduleDesktopDropdownClose = () => {
        clearDesktopDropdownClose();
        desktopDropdownCloseTimeout.current = window.setTimeout(() => {
            setOpenDesktopMenu(null);
            setDesktopDropdownPosition(null);
            desktopDropdownCloseTimeout.current = null;
        }, 120);
    };

    const activeDesktopSubLinks = navLinks.find((link) => link.key === openDesktopMenu)?.subLinks;

    return (
        <>
            <nav
                className={`fixed left-0 right-0 z-50 transition-[top] duration-500 bg-transparent ${scrolled ? "mix-blend-difference text-white" : ""} ${hidden ? "-top-28 pointer-events-none" : "top-0"}`}
            >
                <div className={`mx-auto flex w-full items-center justify-between px-6 py-4 lg:px-4 lg:pt-2.5 ${theme === "dark" && !scrolled ? "text-black" : "text-white"}`}>
                    {/* Left: Links (Desktop) */}
                    <div className="flex-1 hidden lg:flex items-center justify-start gap-4">
                        {navLinks.map(({ key, label, href, subLinks }) => {
                            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                            const isDesktopDropdownOpen = openDesktopMenu === key;

                            return (
                                <div
                                    key={key}
                                    className="relative group"
                                    onMouseEnter={subLinks ? (event) => openDesktopDropdown(key, event.currentTarget) : undefined}
                                    onMouseLeave={subLinks ? scheduleDesktopDropdownClose : undefined}
                                >
                                    <Link
                                        href={href}
                                        className={`relative flex items-center px-2 pt-1.5 text-xs font-light tracking-[0.18em] uppercase transition-all duration-300 ${isActive ? (theme === "dark" && !scrolled ? "text-black font-medium" : "text-white font-medium") : (theme === "dark" && !scrolled ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white")}`}
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {label}
                                        {subLinks && (
                                            <span className={`ml-1.5 opacity-70 transition-transform duration-300 text-[8px] ${isDesktopDropdownOpen ? "rotate-90" : "group-hover:rotate-90"}`}>
                                                ▶
                                            </span>
                                        )}
                                        <span
                                            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ${theme === "dark" && !scrolled ? "bg-black" : "bg-white"} ${isActive || isDesktopDropdownOpen ? "w-[32px]" : "w-0 group-hover:w-[32px]"}`}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Center: Logo */}
                    <Link
                        href="/"
                        className={`relative z-10 flex items-center justify-center flex-none transition-all duration-500 ${hideLogoAtTop && !scrolled ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"}`}
                    >
                        <Image
                            src="/logos/logo-white.svg"
                            alt="Don Diego Logo"
                            width={160}
                            height={50}
                            className={`h-3.5 md:h-4.5 w-auto transition-all duration-500 ${theme === "dark" && !scrolled ? "[filter:invert(1)_brightness(0)]" : ""}`}
                            priority
                        />
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex flex-1 items-center justify-end gap-6">
                        {/* Locale Switch */}
                        <button
                            onClick={switchLocale}
                            className={`text-[13px] font-light tracking-[0.18em] uppercase transition-colors duration-300 ${theme === "dark" && !scrolled ? "hover:text-black/80" : "hover:text-white/80"}`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`flex lg:hidden h-8 w-8 flex-col items-center justify-center gap-[6px] ${theme === "dark" && !scrolled ? "text-black" : "text-white"}`}
                            aria-label="Menu"
                        >
                            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                            <span className={`block h-px w-6 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {activeDesktopSubLinks && desktopDropdownPosition && (
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: shouldReduceMotion ? 0.12 : 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                        className="fixed left-0 top-0 z-[60] hidden min-w-[220px] flex-col gap-3 rounded-sm border border-black/10 bg-white/90 px-5 py-5 shadow-lg shadow-black/10 backdrop-blur-md will-change-transform lg:flex"
                        style={{ left: desktopDropdownPosition.left, top: desktopDropdownPosition.top }}
                        onMouseEnter={clearDesktopDropdownClose}
                        onMouseLeave={scheduleDesktopDropdownClose}
                    >
                        {activeDesktopSubLinks.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                                <Link
                                    key={sub.key}
                                    href={sub.href}
                                    className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${isSubActive ? "font-bold" : "text-black/70 hover:text-black"}`}
                                    style={{ fontFamily: "var(--font-sans)", color: isSubActive ? sub.color : undefined }}
                                    onClick={() => {
                                        setOpenDesktopMenu(null);
                                        setDesktopDropdownPosition(null);
                                    }}
                                >
                                    <span className={`w-2.5 h-2.5 flex-none transition-all duration-300 ${isSubActive ? "rounded-full" : "rounded-sm"}`} style={{ backgroundColor: sub.color, transform: isSubActive ? "scale(1.4)" : "scale(1)", boxShadow: isSubActive ? `0 0 10px 1px ${sub.color}80` : "none" }} />
                                    {sub.label}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile fullscreen overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="flex h-full flex-col items-center justify-center gap-6 overflow-y-auto py-20">
                            {navLinks.map(({ key, label, href, subLinks }, i) => {
                                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                                return (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.5 }}
                                        className="flex flex-col items-center w-full"
                                    >
                                        <Link
                                            href={href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`text-2xl transition-colors tracking-[0.15em] uppercase block ${isActive ? "text-[#E1B19B]" : "text-black/70 hover:text-black"}`}
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {label}
                                        </Link>

                                        {subLinks && (
                                            <div className="flex flex-col items-start gap-3 mt-4 mb-2">
                                                {subLinks.map(sub => {
                                                    const isSubActive = pathname === sub.href;
                                                    return (
                                                        <Link
                                                            key={sub.key}
                                                            href={sub.href}
                                                            onClick={() => setMobileOpen(false)}
                                                            className={`flex items-center gap-3 text-[13px] uppercase tracking-[0.15em] transition-all duration-300 ${isSubActive ? "font-bold" : "text-black/60 hover:text-black"}`}
                                                            style={{ fontFamily: "var(--font-sans)", color: isSubActive ? sub.color : undefined }}
                                                        >
                                                            <span className={`w-2.5 h-2.5 flex-none transition-all duration-300 ${isSubActive ? "rounded-full" : "rounded-sm"}`} style={{ backgroundColor: sub.color, transform: isSubActive ? "scale(1.4)" : "scale(1)", boxShadow: isSubActive ? `0 0 10px 1px ${sub.color}80` : "none" }} />
                                                            {sub.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
