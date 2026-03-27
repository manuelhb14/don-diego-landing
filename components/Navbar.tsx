"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { useChat } from "@/components/chat/ChatProvider";

type NavbarTheme = "light" | "dark";
type DropdownPosition = { left: number; top: number };
type NavScrollState = { hidden: boolean; scrolled: boolean };
type NavSubLink = { key: string; label: string; href: string; color: string };
type NavProyectoPopoverLink = { key: string; label: string; href: string };
type NavGroupLink = { key: string; label: string; href: string };
type NavTopItem =
    | { type: "link"; key: string; label: string; href: string }
    | {
          type: "proyecto";
          key: "proyecto";
          label: string;
          subLinks: NavSubLink[];
          popoverLinks: NavProyectoPopoverLink[];
      }
    | {
          type: "navGroup";
          key: string;
          label: string;
          links: NavGroupLink[];
      };

function buildNavLinks(t: (key: string) => string): NavTopItem[] {
    const proyectoSubLinks: NavSubLink[] = [
        { key: "residencial", label: t("sub.residencial"), href: "/residencial", color: "#E1B19B" },
        { key: "farm", label: t("sub.farm"), href: "/farm", color: "#DEBEBF" },
        { key: "wellness", label: t("sub.wellness"), href: "/wellness", color: "#D7D7AA" },
        { key: "presa", label: t("sub.presa"), href: "/presa", color: "#C8D7E6" },
    ];
    return [
        { type: "link", key: "inicio", label: t("inicio"), href: "/" },
        {
            type: "proyecto",
            key: "proyecto",
            label: t("proyecto"),
            subLinks: proyectoSubLinks,
            popoverLinks: [
                { key: "experiencias", label: t("experiencias"), href: "/experiencias" },
                { key: "ubicacion", label: t("ubicacion"), href: "/ubicacion" },
            ],
        },
        {
            type: "navGroup",
            key: "equipo",
            label: t("conocenos"),
            links: [
                { key: "equipo", label: t("equipo"), href: "/equipo" },
                { key: "blog", label: t("blog"), href: "/blog" },
                { key: "contacto", label: t("contacto"), href: "/contacto" },
            ],
        },
    ];
}

function isProyectoNavActive(pathname: string, subLinks: NavSubLink[], popoverLinks: NavProyectoPopoverLink[]) {
    if (pathname === "/proyecto") return true;
    if (popoverLinks.some((p) => isActivePath(pathname, p.href))) return true;
    return subLinks.some((s) => isActivePath(pathname, s.href));
}

const NAV_SCROLL_CONFIG = {
    alwaysShowBelowPx: 10,
    minHideScrollYPx: 20,
    scrolledOnPx: 72,
    scrolledOffPx: 56,
} as const;

const DESKTOP_DROPDOWN_OFFSET_PX = 10;
const DESKTOP_DROPDOWN_CLOSE_DELAY_MS = 120;
const DESKTOP_DROPDOWN_TRANSITION = {
    duration: 0.2,
    ease: [0.215, 0.61, 0.355, 1],
} as const;

function isActivePath(pathname: string, href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
}

function isNavGroupActive(pathname: string, links: NavGroupLink[]) {
    return links.some((l) => isActivePath(pathname, l.href));
}

function useNavbarScrollState() {
    const [navScroll, setNavScroll] = useState<NavScrollState>({ hidden: false, scrolled: false });

    useEffect(() => {
        const {
            alwaysShowBelowPx,
            minHideScrollYPx,
            scrolledOnPx,
            scrolledOffPx,
        } = NAV_SCROLL_CONFIG;

        const lastScrollYRef = { current: window.scrollY };
        let rafId: number | null = null;

        const flush = () => {
            rafId = null;
            const y = window.scrollY;
            const delta = y - lastScrollYRef.current;
            lastScrollYRef.current = y;

            setNavScroll((prev) => {
                const nextHidden =
                    y <= alwaysShowBelowPx || delta < 0
                        ? false
                        : y > minHideScrollYPx
                            ? true
                            : prev.hidden;

                const nextScrolled = nextHidden
                    ? prev.scrolled
                    : prev.scrolled
                        ? y > scrolledOffPx
                        : y > scrolledOnPx;

                if (nextHidden === prev.hidden && nextScrolled === prev.scrolled) {
                    return prev;
                }

                return { hidden: nextHidden, scrolled: nextScrolled };
            });
        };

        const onScroll = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(flush);
        };

        flush();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return navScroll;
}

export default function Navbar({ locale, theme = "light", hideLogoAtTop = false }: { locale: string; theme?: NavbarTheme; hideLogoAtTop?: boolean }) {
    const t = useTranslations("nav");
    const navLinks = useMemo(() => buildNavLinks(t), [t]);
    const contactCta = useMemo(
        () => ({
            key: "contacto" as const,
            label: "CONTACTO",
            href: "https://wa.me/5200000000000" as const,
        }),
        [],
    );
    const router = useRouter();
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();
    const { toggleChat, isOpen: isChatOpen, registerTrigger } = useChat();
    const [mobileOpen, setMobileOpen] = useState(false);
    const desktopChatTriggerRef = useRef<HTMLButtonElement | null>(null);
    const navScroll = useNavbarScrollState();
    const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
    const [desktopDropdownPosition, setDesktopDropdownPosition] = useState<DropdownPosition | null>(null);
    const desktopDropdownCloseTimeout = useRef<number | null>(null);
    const { hidden, scrolled } = navScroll;
    const isDarkAtTop = theme === "dark" && !scrolled;
    const isContactActive = pathname === "/contacto";

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useEffect(() => {
        if (mobileOpen) return;
        registerTrigger(desktopChatTriggerRef.current);
    }, [mobileOpen, registerTrigger]);

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

    const closeDesktopDropdown = () => {
        setOpenDesktopMenu(null);
        setDesktopDropdownPosition(null);
    };

    const openDesktopDropdown = (key: string, trigger: HTMLDivElement) => {
        clearDesktopDropdownClose();
        const rect = trigger.getBoundingClientRect();
        setOpenDesktopMenu(key);
        setDesktopDropdownPosition({ left: rect.left, top: rect.bottom + DESKTOP_DROPDOWN_OFFSET_PX });
    };

    const scheduleDesktopDropdownClose = () => {
        clearDesktopDropdownClose();
        desktopDropdownCloseTimeout.current = window.setTimeout(() => {
            closeDesktopDropdown();
            desktopDropdownCloseTimeout.current = null;
        }, DESKTOP_DROPDOWN_CLOSE_DELAY_MS);
    };

    const proyectoNavItem = navLinks.find((item): item is Extract<NavTopItem, { type: "proyecto" }> => item.type === "proyecto");
    const equipoNavGroupItem = navLinks.find((item): item is Extract<NavTopItem, { type: "navGroup" }> => item.type === "navGroup");
    const showProyectoDropdown = openDesktopMenu === "proyecto" && proyectoNavItem && desktopDropdownPosition;
    const showNavGroupDropdown = openDesktopMenu === "equipo" && equipoNavGroupItem && desktopDropdownPosition;

    return (
        <>
            <nav
                className={`fixed left-0 z-50 transition-[top,right] duration-500 bg-transparent ${scrolled ? "mix-blend-difference text-white" : ""} ${hidden ? "-top-28 pointer-events-none" : "top-0"}`}
                style={{ right: "0px" }}
            >
                <div className={`mx-auto flex w-full items-center justify-between px-6 py-4 lg:px-4 lg:pt-2.5 ${isDarkAtTop ? "text-black" : "text-white"}`}>
                    {/* Left: Links (Desktop) — flush left */}
                    <div className="flex-1 hidden lg:flex min-w-0 items-center justify-start gap-4">
                        {navLinks.map((item) => {
                            if (item.type === "link") {
                                const { key, label, href } = item;
                                const isActive = isActivePath(pathname, href);
                                return (
                                    <div key={key} className="relative group">
                                        <Link
                                            href={href}
                                            className={`relative flex items-center px-2 pt-1.5 text-xs font-light tracking-[0.18em] uppercase transition-all duration-300 ${
                                                isActive
                                                    ? isDarkAtTop
                                                        ? "text-black font-medium"
                                                        : "text-white font-medium"
                                                    : isDarkAtTop
                                                        ? "text-black/70 hover:text-black"
                                                        : "text-white/70 hover:text-white"
                                            }`}
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {label}
                                            <span
                                                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ${isDarkAtTop ? "bg-black" : "bg-white"} ${isActive ? "w-[32px]" : "w-0 group-hover:w-[32px]"}`}
                                            />
                                        </Link>
                                    </div>
                                );
                            }

                            if (item.type === "proyecto") {
                                const { key, label, subLinks, popoverLinks } = item;
                                const isActive = isProyectoNavActive(pathname, subLinks, popoverLinks);
                                const isDesktopDropdownOpen = openDesktopMenu === key;
                                return (
                                    <div
                                        key={key}
                                        className="relative group"
                                        onMouseEnter={(event) => openDesktopDropdown(key, event.currentTarget)}
                                        onMouseLeave={scheduleDesktopDropdownClose}
                                    >
                                        <span
                                            className={`relative flex cursor-default items-center px-2 pt-1.5 text-xs font-light tracking-[0.18em] uppercase transition-all duration-300 ${
                                                isActive
                                                    ? isDarkAtTop
                                                        ? "text-black font-medium"
                                                        : "text-white font-medium"
                                                    : isDarkAtTop
                                                        ? "text-black/70 hover:text-black"
                                                        : "text-white/70 hover:text-white"
                                            }`}
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {label}
                                            <span className={`ml-1.5 opacity-70 transition-transform duration-300 text-[8px] ${isDesktopDropdownOpen ? "rotate-90" : "group-hover:rotate-90"}`}>
                                                ▶
                                            </span>
                                            <span
                                                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ${isDarkAtTop ? "bg-black" : "bg-white"} ${isActive || isDesktopDropdownOpen ? "w-[32px]" : "w-0 group-hover:w-[32px]"}`}
                                            />
                                        </span>
                                    </div>
                                );
                            }

                            const { key, label, links } = item;
                            const isActive = isNavGroupActive(pathname, links);
                            const isDesktopDropdownOpen = openDesktopMenu === key;
                            return (
                                <div
                                    key={key}
                                    className="relative group"
                                    onMouseEnter={(event) => openDesktopDropdown(key, event.currentTarget)}
                                    onMouseLeave={scheduleDesktopDropdownClose}
                                >
                                    <span
                                        className={`relative flex cursor-default items-center px-2 pt-1.5 text-xs font-light tracking-[0.18em] uppercase transition-all duration-300 ${
                                            isActive
                                                ? isDarkAtTop
                                                    ? "text-black font-medium"
                                                    : "text-white font-medium"
                                                : isDarkAtTop
                                                    ? "text-black/70 hover:text-black"
                                                    : "text-white/70 hover:text-white"
                                        }`}
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {label}
                                        <span className={`ml-1.5 opacity-70 transition-transform duration-300 text-[8px] ${isDesktopDropdownOpen ? "rotate-90" : "group-hover:rotate-90"}`}>
                                            ▶
                                        </span>
                                        <span
                                            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ${isDarkAtTop ? "bg-black" : "bg-white"} ${isActive || isDesktopDropdownOpen ? "w-[32px]" : "w-0 group-hover:w-[32px]"}`}
                                        />
                                    </span>
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
                            className={`h-3.5 md:h-4.5 w-auto transition-all duration-500 ${isDarkAtTop ? "[filter:invert(1)_brightness(0)]" : ""}`}
                            priority
                        />
                    </Link>

                    {/* Right: Contact CTA + locale + mobile menu */}
                    <div className="flex flex-1 items-center justify-end gap-4 lg:gap-4">
                        <button
                            type="button"
                            onClick={toggleChat}
                            ref={(el) => {
                                desktopChatTriggerRef.current = el;
                            }}
                            aria-label={t("aiAssistant")}
                            aria-pressed={isChatOpen}
                            className={`hidden lg:inline-flex shrink-0 items-center gap-1.5 rounded-sm px-1 py-1.5 text-[11px] font-light uppercase tracking-[0.18em] transition-all duration-300 sm:text-xs ${
                                isChatOpen
                                    ? isDarkAtTop
                                        ? "border-black bg-black/[0.06] font-medium text-black"
                                        : "border-white bg-white/10 font-medium text-white"
                                    : isDarkAtTop
                                        ? "border-black/35 text-black/80 hover:border-black/55 hover:bg-black/[0.04]"
                                        : "border-white/40 text-white/90 hover:border-white/60 hover:bg-white/10"
                            }`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            <Sparkles className="size-3.5" />
                            <span>{t("aiAssistant")}</span>
                        </button>
                        {/* Locale Switch */}
                        <button
                            onClick={switchLocale}
                            className={`text-[13px] font-light tracking-[0.18em] uppercase transition-colors duration-300 ${isDarkAtTop ? "hover:text-black/80" : "hover:text-white/80"}`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>
                        <a
                            href={contactCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex shrink-0 items-center rounded-sm border px-3 py-1.5 text-[11px] font-light font-[variant:small-caps] uppercase tracking-[0.18em] transition-all duration-300 sm:px-4 sm:text-xs ${
                                isContactActive
                                    ? isDarkAtTop
                                        ? "border-black bg-black/[0.06] font-medium text-black"
                                        : "border-white bg-white/10 font-medium text-white"
                                    : isDarkAtTop
                                        ? "border-black/35 text-black/80 hover:border-black/55 hover:bg-black/[0.04]"
                                        : "border-white/40 text-white/90 hover:border-white/60 hover:bg-white/10"
                            }`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {contactCta.label}
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`flex h-8 w-8 flex-col items-center justify-center gap-[6px] lg:hidden ${isDarkAtTop ? "text-black" : "text-white"}`}
                            aria-label={t("menuAria")}
                        >
                            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                            <span className={`block h-px w-6 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {showProyectoDropdown && proyectoNavItem && desktopDropdownPosition && (
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={shouldReduceMotion ? { duration: 0.12 } : DESKTOP_DROPDOWN_TRANSITION}
                        className="fixed left-0 top-0 z-[60] hidden min-w-[240px] flex-col items-start gap-3 rounded-sm border border-black/10 bg-white/90 px-5 py-5 text-left shadow-lg shadow-black/10 backdrop-blur-md will-change-transform lg:flex"
                        style={{ left: desktopDropdownPosition.left, top: desktopDropdownPosition.top }}
                        onMouseEnter={clearDesktopDropdownClose}
                        onMouseLeave={scheduleDesktopDropdownClose}
                    >
                        <Link
                            href="/proyecto"
                            className={`block w-full text-left text-[12px] font-light uppercase tracking-[0.18em] transition-colors duration-300 ${pathname === "/proyecto" ? "font-medium text-black" : "text-black/80 hover:text-black"}`}
                            style={{ fontFamily: "var(--font-sans)" }}
                            onClick={closeDesktopDropdown}
                        >
                            {proyectoNavItem.label}
                        </Link>
                        {proyectoNavItem.subLinks.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                                <Link
                                    key={sub.key}
                                    href={sub.href}
                                    className={`flex w-full items-center justify-start gap-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${isSubActive ? "font-bold" : "text-black/70 hover:text-black"}`}
                                    style={{ fontFamily: "var(--font-sans)", color: isSubActive ? sub.color : undefined }}
                                    onClick={closeDesktopDropdown}
                                >
                                    <span
                                        className={`w-2.5 h-2.5 flex-none transition-all duration-300 ${isSubActive ? "rounded-full" : "rounded-sm"}`}
                                        style={{
                                            backgroundColor: sub.color,
                                            transform: isSubActive ? "scale(1.4)" : "scale(1)",
                                            boxShadow: isSubActive ? `0 0 10px 1px ${sub.color}80` : "none",
                                        }}
                                    />
                                    {sub.label}
                                </Link>
                            );
                        })}
                        <div className="flex w-full flex-col gap-3">
                            {proyectoNavItem.popoverLinks.map((pl) => {
                                const isPlActive = isActivePath(pathname, pl.href);
                                return (
                                    <Link
                                        key={pl.key}
                                        href={pl.href}
                                        className={`flex w-full items-center justify-start text-left text-[12px] uppercase tracking-[0.15em] transition-all duration-300 ${isPlActive ? "font-bold text-black" : "text-black/70 hover:text-black"}`}
                                        style={{ fontFamily: "var(--font-sans)" }}
                                        onClick={closeDesktopDropdown}
                                    >
                                        {pl.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showNavGroupDropdown && equipoNavGroupItem && desktopDropdownPosition && (
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={shouldReduceMotion ? { duration: 0.12 } : DESKTOP_DROPDOWN_TRANSITION}
                        className="fixed left-0 top-0 z-[60] hidden min-w-[240px] flex-col items-start gap-3 rounded-sm border border-black/10 bg-white/90 px-5 py-5 text-left shadow-lg shadow-black/10 backdrop-blur-md will-change-transform lg:flex"
                        style={{ left: desktopDropdownPosition.left, top: desktopDropdownPosition.top }}
                        onMouseEnter={clearDesktopDropdownClose}
                        onMouseLeave={scheduleDesktopDropdownClose}
                    >
                        {equipoNavGroupItem.links.map((l) => {
                            const isLActive = isActivePath(pathname, l.href);
                            return (
                                <Link
                                    key={l.key}
                                    href={l.href}
                                    className={`flex w-full items-center justify-start text-left text-[12px] uppercase tracking-[0.15em] transition-all duration-300 ${isLActive ? "font-bold text-black" : "text-black/70 hover:text-black"}`}
                                    style={{ fontFamily: "var(--font-sans)" }}
                                    onClick={closeDesktopDropdown}
                                >
                                    {l.label}
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
                            {navLinks.map((navItem, i) => {
                                if (navItem.type === "link") {
                                    const { key, label, href } = navItem;
                                    const isActive = isActivePath(pathname, href);
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
                                        </motion.div>
                                    );
                                }

                                if (navItem.type === "navGroup") {
                                    return (
                                        <motion.div
                                            key={navItem.key}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08, duration: 0.5 }}
                                            className="flex w-full flex-col items-start gap-4 px-6"
                                        >
                                            <div className="flex w-full flex-col items-start gap-4">
                                                {navItem.links.map((l) => {
                                                    const isLActive = isActivePath(pathname, l.href);
                                                    return (
                                                        <Link
                                                            key={l.key}
                                                            href={l.href}
                                                            onClick={() => setMobileOpen(false)}
                                                            className={`block w-full text-left text-[25px] leading-tight tracking-[0.15em] uppercase transition-colors ${isLActive ? "text-[#E1B19B]" : "text-black/70 hover:text-black"}`}
                                                            style={{ fontFamily: "var(--font-serif)" }}
                                                        >
                                                            {l.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    );
                                }

                                const proyectoActive = isProyectoNavActive(pathname, navItem.subLinks, navItem.popoverLinks);
                                return (
                                    <motion.div
                                        key={navItem.key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.5 }}
                                        className="flex w-full flex-col items-start gap-4 px-6"
                                    >
                                        <div className="flex w-full flex-col items-start">
                                            <span
                                                className={`block w-full text-left text-[25px] leading-tight tracking-[0.15em] uppercase ${proyectoActive ? "text-[#E1B19B]" : "text-black/70"}`}
                                                style={{ fontFamily: "var(--font-serif)" }}
                                            >
                                                {navItem.label}
                                            </span>
                                            <div className="mt-4 mb-2 flex w-full flex-col items-start gap-3">
                                                {navItem.subLinks.map((sub) => {
                                                    const isSubActive = pathname === sub.href;
                                                    return (
                                                        <Link
                                                            key={sub.key}
                                                            href={sub.href}
                                                            onClick={() => setMobileOpen(false)}
                                                            className={`flex w-full items-center justify-start gap-3 text-[13px] uppercase tracking-[0.15em] transition-all duration-300 ${isSubActive ? "font-bold" : "text-black/60 hover:text-black"}`}
                                                            style={{ fontFamily: "var(--font-sans)", color: isSubActive ? sub.color : undefined }}
                                                        >
                                                            <span className={`w-2.5 h-2.5 flex-none transition-all duration-300 ${isSubActive ? "rounded-full" : "rounded-sm"}`} style={{ backgroundColor: sub.color, transform: isSubActive ? "scale(1.4)" : "scale(1)", boxShadow: isSubActive ? `0 0 10px 1px ${sub.color}80` : "none" }} />
                                                            {sub.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col items-start gap-4">
                                            {navItem.popoverLinks.map((pl) => {
                                                const isActive = isActivePath(pathname, pl.href);
                                                return (
                                                    <Link
                                                        key={pl.key}
                                                        href={pl.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className={`block w-full text-left text-[25px] leading-tight tracking-[0.15em] uppercase transition-colors ${isActive ? "text-[#E1B19B]" : "text-black/70 hover:text-black"}`}
                                                        style={{ fontFamily: "var(--font-serif)" }}
                                                    >
                                                        {pl.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.08, duration: 0.5 }}
                                className="flex w-full flex-col items-center px-6"
                            >
                                <button
                                    type="button"
                                    ref={registerTrigger}
                                    aria-label={t("aiAssistant")}
                                    aria-pressed={isChatOpen}
                                    onClick={() => {
                                        setMobileOpen(false);
                                        toggleChat();
                                    }}
                                    className={`inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-sm border px-4 py-3 text-[11px] font-light font-[variant:small-caps] uppercase tracking-[0.18em] transition-all duration-300 ${
                                        isChatOpen
                                            ? "border-black/25 bg-black/[0.06] font-medium text-black"
                                            : "border-black/20 text-black/80 hover:border-black/35 hover:bg-black/[0.04]"
                                    }`}
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    <Sparkles className="size-4 shrink-0 text-black/70" />
                                    {t("aiAssistant")}
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
