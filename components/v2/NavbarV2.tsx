"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";

const navLinks = [
    { key: "proyecto", href: "#proyecto" },
    { key: "galeria", href: "#galeria" },
    { key: "ubicacion", href: "#ubicacion" },
    { key: "equipo", href: "#equipo" },
] as const;

export default function NavbarV2({ locale }: { locale: string }) {
    const t = useTranslations("nav");
    const router = useRouter();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const switchLocale = () => {
        const next = locale === "es" ? "en" : "es";
        router.replace(pathname, { locale: next });
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                        ? "bg-[#FFF3E1]/90 backdrop-blur-md border-b border-[#AA7D69]/10"
                        : "bg-transparent"
                    }`}
            >
                <div className="mx-auto flex w-full items-center justify-between px-6 py-5 lg:px-10">
                    {/* Left nav */}
                    <div className="hidden lg:flex items-center gap-8 w-1/3">
                        {navLinks.map(({ key, href }) => (
                            <a
                                key={key}
                                href={href}
                                className={`text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${scrolled ? "text-[#222]/50 hover:text-[#222]" : "text-white/70 hover:text-white"
                                    }`}
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t(key)}
                            </a>
                        ))}
                    </div>

                    {/* Center logo */}
                    <div className="flex justify-center w-1/3 lg:w-auto">
                        <a href="#" className="block">
                            <Image
                                src={scrolled ? "/logos/logo-dark.png" : "/logos/logo-light.png"}
                                alt="Don Diego"
                                width={150}
                                height={46}
                                className="h-8 w-auto lg:h-10 opacity-90 transition-all duration-500"
                                priority
                            />
                        </a>
                    </div>

                    {/* Right */}
                    <div className="hidden lg:flex items-center justify-end w-1/3 gap-8">
                        <button
                            onClick={switchLocale}
                            className={`text-[10px] font-medium tracking-[0.18em] uppercase transition-colors ${scrolled ? "text-[#222]/40 hover:text-[#222]" : "text-white/50 hover:text-white"
                                }`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>
                        <a
                            href="#contacto"
                            className={`text-[10px] font-medium tracking-[0.18em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${scrolled
                                    ? "border-[#AA7D69]/50 text-[#AA7D69] hover:border-[#AA7D69] hover:bg-[#AA7D69]/5"
                                    : "border-white/40 text-white hover:border-white hover:bg-white/5"
                                }`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("contacto")}
                        </a>
                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-6 lg:hidden w-1/3 justify-end">
                        <button
                            onClick={switchLocale}
                            className={`text-[10px] font-medium tracking-[0.18em] uppercase ${scrolled ? "text-[#222]/50" : "text-white/50"
                                }`}
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {locale === "es" ? "EN" : "ES"}
                        </button>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`flex h-8 w-8 flex-col items-center justify-center gap-[5px] ${scrolled ? "text-[#222]" : "text-white"
                                }`}
                            aria-label="Menu"
                        >
                            <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                            <span className={`block h-px w-5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                            <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-40 bg-[#FFF3E1] transition-all duration-500 lg:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
            >
                <div className="flex h-full flex-col items-center justify-center gap-10">
                    {[...navLinks, { key: "contacto", href: "#contacto" }].map(({ key, href }) => (
                        <a
                            key={key}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className="text-3xl text-[#222]/70 hover:text-[#222] transition-colors tracking-widest uppercase"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t(key)}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
