"use client";

import Image from "next/image";

const navLinks = [
    { label: "Proyecto", href: "#proyecto" },
    { label: "Galería", href: "#galeria" },
    { label: "Ubicación", href: "#ubicacion" },
    { label: "Equipo", href: "#equipo" },
    { label: "Contacto", href: "#contacto" },
];

export default function FooterV4() {
    return (
        <footer className="bg-dark">
            {/* Main footer */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
                <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-start">
                    {/* Left: Nav */}
                    <div className="flex flex-col gap-3 order-2 lg:order-1">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                className="text-[11px] font-bold tracking-[0.14em] text-white/20 hover:text-white/50 transition-colors uppercase w-fit"
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Center: Logo + site */}
                    <div className="flex flex-col items-center gap-5 order-1 lg:order-2">
                        <Image
                            src="/logos/logo-light.png"
                            alt="Don Diego Club Residencial"
                            width={150}
                            height={50}
                            className="h-10 w-auto opacity-50"
                        />
                        <p className="font-serif italic text-white/15 text-sm">
                            Donde la Historia Vive en Conexión
                        </p>
                    </div>

                    {/* Right: Contact + socials */}
                    <div className="flex flex-col items-start lg:items-end gap-4 order-3">
                        <div className="flex items-center gap-3">
                            {["instagram", "facebook"].map((s) => (
                                <a
                                    key={s}
                                    href="#"
                                    className="w-9 h-9 flex items-center justify-center border border-white/8 text-white/20 hover:text-terracotta/60 hover:border-terracotta/20 transition-all duration-300"
                                    aria-label={s}
                                >
                                    {s === "instagram" ? (
                                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    )}
                                </a>
                            ))}
                        </div>
                        <p className="text-[11px] text-white/15 lg:text-right">
                            San Miguel de Allende, Guanajuato, México
                        </p>
                        <a
                            href="https://www.dondiegosma.com"
                            className="text-[10px] tracking-widest text-white/15 hover:text-white/30 transition-colors"
                        >
                            www.dondiegosma.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[10px] text-white/12">
                        © 2026 Don Diego Club Residencial. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-5">
                        <a href="#" className="text-[10px] text-white/12 hover:text-white/30 transition-colors">Términos</a>
                        <a href="#" className="text-[10px] text-white/12 hover:text-white/30 transition-colors">Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
