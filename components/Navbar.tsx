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

export default function Navbar({ locale }: { locale: string }) {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/20 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4 lg:px-12">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-8 w-1/3">
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-sans text-[11px] font-medium tracking-[0.1em] text-white hover:opacity-70 transition-opacity flex items-center gap-1 uppercase"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex justify-center w-1/3 relative z-10 shrink-0">
            <a href="#" className="flex flex-col items-center">
              <Image
                src="/logos/logo-light.png"
                alt="Don Diego"
                width={160}
                height={50}
                className="h-10 w-auto lg:h-12"
                priority
              />
            </a>
          </div>

          {/* Right Navigation & Tools */}
          <div className="hidden lg:flex items-center justify-end w-1/3 gap-8">
            <button
              onClick={switchLocale}
              className="font-sans text-[11px] font-medium tracking-[0.1em] text-white hover:opacity-70 transition-opacity uppercase"
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
            <a
              href="#contacto"
              className="font-sans text-[11px] font-medium tracking-[0.1em] text-white hover:opacity-70 transition-opacity border-b border-white/40 pb-0.5 uppercase"
            >
              {t("contacto")}
            </a>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex items-center gap-6 lg:hidden">
            <button
              onClick={switchLocale}
              className="font-sans text-[11px] font-medium tracking-[0.1em] text-white hover:opacity-70 transition-opacity uppercase"
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-10 flex h-8 w-8 flex-col items-center justify-center gap-1.5 text-white"
              aria-label="Menu"
            >
              <span
                className={`block h-[1px] w-6 bg-current transition-all duration-300 ${
                  mobileOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1px] w-6 bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1px] w-6 bg-current transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 transition-all duration-500 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {[...navLinks, { key: "contacto", href: "#contacto" }].map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl text-white transition-colors hover:text-white/70 tracking-widest uppercase"
            >
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
