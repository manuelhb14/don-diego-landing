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
    const footerLinkClassName = "transition-colors duration-300 hover:text-[#E1B19B]";
    const legalLinkClassName = "transition-colors duration-300 hover:text-[#FFF3E1]";

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
        <footer className="relative w-full overflow-hidden border-t border-[#AA7D69]/18 bg-[#15120F] pt-10 text-[#FFF3E1] transition-colors duration-300 lg:pt-14" id="contact">
            <div className="relative z-10 mx-auto mb-4 w-full max-w-[1400px] px-6 lg:px-14">
                <div className="grid gap-x-8 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.65fr)_minmax(0,0.35fr)] lg:gap-14">
                    <div className="flex flex-col space-y-5 lg:pr-12">
                        <div>
                            <h2 className="mb-3 font-serif text-[clamp(1.65rem,2.5vw,2.85rem)] leading-[1.02] text-[#FFF3E1]">
                                {t("joinTitleLine1")} <br className="hidden lg:block" />
                            </h2>
                            <p className="max-w-sm font-sans text-sm leading-relaxed text-[#FFF3E1]/70 md:text-base">
                                {t("joinSubtitle")}
                            </p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="w-full max-w-[34rem] space-y-4 pt-0 lg:space-y-5">
                            {error && (
                                <p className="font-sans text-xs text-red-300/95">{error}</p>
                            )}
                            {submitted ? (
                                <p className="font-sans text-xs font-medium text-[#FFF3E1]/85">
                                    {t("thanks")}
                                </p>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                                        <div className="relative w-full">
                                            <input
                                                className="w-full border-0 border-b border-[#FFF3E1]/28 bg-transparent px-0 py-3 font-sans text-xs tracking-[0.16em] text-[#FFF3E1] placeholder:text-[#FFF3E1]/44 transition-colors focus:border-[#E1B19B] focus:ring-0 disabled:opacity-60"
                                                id="firstName"
                                                name="firstName"
                                                placeholder={t("firstNamePh")}
                                                required
                                                type="text"
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="relative w-full">
                                            <input
                                                className="w-full border-0 border-b border-[#FFF3E1]/28 bg-transparent px-0 py-3 font-sans text-xs tracking-[0.16em] text-[#FFF3E1] placeholder:text-[#FFF3E1]/44 transition-colors focus:border-[#E1B19B] focus:ring-0 disabled:opacity-60"
                                                id="lastName"
                                                name="lastName"
                                                placeholder={t("lastNamePh")}
                                                required
                                                type="text"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            className="w-full border-0 border-b border-[#FFF3E1]/28 bg-transparent px-0 py-3 font-sans text-xs tracking-[0.16em] text-[#FFF3E1] placeholder:text-[#FFF3E1]/44 transition-colors focus:border-[#E1B19B] focus:ring-0 disabled:opacity-60"
                                            id="email"
                                            name="email"
                                            placeholder={t("emailPh")}
                                            required
                                            type="email"
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mt-2 flex items-start gap-2 lg:mt-3">
                                        <div className="flex h-5 items-center">
                                            <input
                                                className="h-4 w-4 rounded-sm border-[#FFF3E1]/70 bg-transparent text-[#FFF3E1] focus:ring-[#E1B19B] disabled:opacity-60"
                                                id="consent"
                                                name="consent"
                                                type="checkbox"
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="ml-0 font-sans text-xs leading-snug text-[#FFF3E1]/70">
                                            <label className="font-medium text-[#FFF3E1]" htmlFor="consent">
                                                {t("consent")}
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        className="mt-2 inline-block cursor-pointer border-b border-[#E1B19B] pb-1 font-sans text-xs tracking-[0.2em] text-[#FFF3E1] uppercase transition-colors duration-300 hover:text-[#E1B19B] disabled:cursor-not-allowed disabled:opacity-60 lg:mt-3"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? t("sending") : t("submit")}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    <div>
                        <ul className="grid grid-cols-2 gap-x-7 gap-y-3 font-sans text-[11px] font-medium tracking-[0.18em] text-[#FFF3E1]/72 uppercase sm:max-w-md lg:grid-cols-1">
                            <li><Link className={footerLinkClassName} href="/">{t("navHome")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/proyecto">{t("navProject")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/ubicacion">{t("navLocation")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/equipo">{t("navTeam")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/contacto">{t("navContact")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/propiedades">{t("navProperties")}</Link></li>
                            <li className="col-span-2 pt-3 lg:col-span-1"><p className="font-serif text-sm font-light tracking-[0.18em] text-[#E1B19B] uppercase">{t("components")}</p></li>
                            <li><Link className={footerLinkClassName} href="/residencial">{tn("sub.residencial")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/farm">{tn("sub.farm")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/wellness">{tn("sub.wellness")}</Link></li>
                            <li><Link className={footerLinkClassName} href="/presa">{tn("sub.presa")}</Link></li>
                        </ul>
                    </div>

                    <div className="lg:text-right">
                        <ul className="space-y-3 font-sans text-[11px] font-medium tracking-[0.18em] text-[#FFF3E1]/72 uppercase">
                            <li><a className={footerLinkClassName} href="https://www.instagram.com/dondiegosma/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a className={footerLinkClassName} href="https://www.youtube.com/@dondiegosma" target="_blank" rel="noopener noreferrer">Youtube</a></li>
                            <li><a className={footerLinkClassName} href="https://www.tiktok.com/@dondiegosma" target="_blank" rel="noopener noreferrer">TikTok</a></li>
                            <li><a className={footerLinkClassName} href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative z-20 mx-auto mt-8 flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-x-4 gap-y-2 px-6 pb-6 font-sans text-[10px] tracking-[0.16em] text-[#FFF3E1]/48 uppercase sm:justify-end md:text-[11px] lg:px-14">
                <Link className={legalLinkClassName} href="/terminos">{t("terms")}</Link>
                <Link className={legalLinkClassName} href="/privacidad">{t("privacy")}</Link>
                <Link className={legalLinkClassName} href="/guia-compra">{t("purchaseGuide")}</Link>
                <span className="whitespace-nowrap">{t("brandLine")}</span>
            </div>
        </footer>
    );
}
