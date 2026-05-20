"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE_CONTACT } from "@/lib/site-contact";

export default function Footer() {
    const t = useTranslations("footer");
    const tn = useTranslations("nav");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const firstName = (formData.get("firstName") as string)?.trim() ?? "";
        const lastName = (formData.get("lastName") as string)?.trim() ?? "";
        const email = (formData.get("email") as string)?.trim() ?? "";
        const consent = formData.get("consent") === "on";

        if (!consent) {
            setError(t("errConsent"));
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`.trim() || "Newsletter",
                    email,
                    phone: "",
                    message: t("newsletterInternal"),
                }),
            });

            const data = (await res.json()) as { error?: string; errorCode?: string };

            if (!res.ok) {
                if (data.errorCode === "CONTACT_REQUIRED_FIELDS") {
                    throw new Error(t("errRequired"));
                }
                if (data.errorCode === "CONTACT_SEND_FAILED") {
                    throw new Error(t("errSend"));
                }
                throw new Error(data.error || t("errSend"));
            }
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : t("errSend"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-[#111] text-zinc-100 w-full relative overflow-hidden pt-8 lg:pt-10 transition-colors duration-300" id="contact">
            <div className="container mx-auto px-6 lg:px-12 mb-4 relative z-10">
                <div className="grid grid-cols-5 lg:grid-cols-12 gap-x-4 gap-y-6 lg:gap-8">
                    {/* Newsletter Section */}
                    <div className="col-span-5 lg:col-span-6 flex flex-col space-y-4">
                        <div>
                            <h2 className="font-serif text-4xl md:text-4xl leading-tight mb-2">
                                {t("joinTitleLine1")} <br className="hidden lg:block" />
                            </h2>
                            <p className="font-sans text-sm font-light leading-relaxed opacity-80">
                                {t("joinSubtitle")}
                            </p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md space-y-4 pt-0 lg:space-y-4">
                            {error && (
                                <p className="text-red-700/90 text-xs font-sans">{error}</p>
                            )}
                            {submitted ? (
                                <p className="text-zinc-100/85 text-xs font-sans font-medium">
                                    {t("thanks")}
                                </p>
                            ) : (
                                <>
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                        <div className="w-full relative">
                                            <input
                                                className="w-full bg-transparent border-0 border-b border-zinc-100/35 placeholder:text-zinc-100/50 text-xs font-sans tracking-wider py-2 lg:py-3 px-0 focus:ring-0 focus:border-zinc-100/70 transition-colors disabled:opacity-60"
                                                id="firstName"
                                                name="firstName"
                                                placeholder={t("firstNamePh")}
                                                required
                                                type="text"
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="w-full relative">
                                            <input
                                                className="w-full bg-transparent border-0 border-b border-zinc-100/35 placeholder:text-zinc-100/50 text-xs font-sans tracking-wider py-2 lg:py-3 px-0 focus:ring-0 focus:border-zinc-100/70 transition-colors disabled:opacity-60"
                                                id="lastName"
                                                name="lastName"
                                                placeholder={t("lastNamePh")}
                                                required
                                                type="text"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full relative">
                                        <input
                                            className="w-full bg-transparent border-0 border-b border-zinc-100/35 placeholder:text-zinc-100/50 text-xs font-sans tracking-wider py-2 lg:py-3 px-0 focus:ring-0 focus:border-zinc-100/70 transition-colors disabled:opacity-60"
                                            id="email"
                                            name="email"
                                            placeholder={t("emailPh")}
                                            required
                                            type="email"
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 lg:mt-4">
                                        <div className="flex items-center h-5">
                                            <input
                                                className="focus:ring-zinc-100/70 h-4 w-4 text-zinc-100 border-zinc-100/70 rounded-sm bg-transparent disabled:opacity-60"
                                                id="consent"
                                                name="consent"
                                                type="checkbox"
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="ml-0 text-xs font-sans font-light leading-tight opacity-80">
                                            <label className="font-medium text-zinc-100" htmlFor="consent">
                                                {t("consent")}
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        className="cursor-pointer inline-block border-b border-zinc-100/70 pb-1 text-xs font-sans tracking-widest uppercase hover:opacity-70 transition-opacity mt-2 lg:mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? t("sending") : t("submit")}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Navigation Links */}
                    <div className="col-span-3 lg:col-span-3">
                        <ul className="space-y-3 font-sans text-xs tracking-widest uppercase font-medium">
                            <li><Link className="hover:underline underline-offset-4" href="/">{t("navHome")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/proyecto">{t("navProject")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/ubicacion">{t("navLocation")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/equipo">{t("navTeam")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/contacto">{t("navContact")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/propiedades">{t("navProperties")}</Link></li>
                            <li><p className="text-sm font-serif tracking-widest uppercase font-light pt-2">{t("components")}</p></li>
                            <li><Link className="hover:underline underline-offset-4" href="/residencial">{tn("sub.residencial")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/farm">{tn("sub.farm")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/wellness">{tn("sub.wellness")}</Link></li>
                            <li><Link className="hover:underline underline-offset-4" href="/presa">{tn("sub.presa")}</Link></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="col-span-2 lg:col-span-2 lg:text-right">
                        <ul className="space-y-3 font-sans text-xs tracking-widest uppercase font-medium">
                            <li><a className="hover:underline underline-offset-4" href="https://www.instagram.com/dondiegosma/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a className="hover:underline underline-offset-4" href="https://www.youtube.com/@dondiegosma" target="_blank" rel="noopener noreferrer">Youtube</a></li>
                            <li><a className="hover:underline underline-offset-4" href="https://www.tiktok.com/@dondiegosma" target="_blank" rel="noopener noreferrer">TikTok</a></li>
                            <li><a className="hover:underline underline-offset-4" href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Large DON DIEGO Text */}
            {/* <div className="w-full overflow-hidden leading-none select-none pointer-events-none mt-4 md:mt-0 mb-4 lg:mb-0">
                <h1 className="font-serif  lg:text-[12vw] text-[14vw] text-center tracking-[0.12em] text-[#222222] opacity-100 transform translate-y-[15%]">
                    DON DIEGO
                </h1>
            </div> */}

            {/* Bottom Links */}
            <div className="w-full px-2 sm:px-4 lg:px-8 mt-2 mb-6 flex flex-wrap justify-between sm:justify-end items-end text-[10px] md:text-[11px] font-sans tracking-wider sm:tracking-widest uppercase text-white/60 z-20 mix-blend-difference gap-x-2 gap-y-2 sm:gap-x-4 md:gap-x-6">
                <Link className="hover:underline underline-offset-4" href="/terminos">{t("terms")}</Link>
                <Link className="hover:underline underline-offset-4" href="/privacidad">{t("privacy")}</Link>
                <Link className="hover:underline underline-offset-4" href="/guia-compra">{t("purchaseGuide")}</Link>
                <span className="whitespace-nowrap">{t("brandLine")}</span>
            </div>
        </footer>
    );
}
