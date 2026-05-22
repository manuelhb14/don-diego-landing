"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE_CONTACT } from "@/lib/site-contact";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const CONTACT_EMAIL = "info@dondiego.mx";

export default function FormContacto() {
    const tHero = useTranslations("pages.contacto.hero");
    const t = useTranslations("pages.contacto.form");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone") || "",
                    message: formData.get("message"),
                }),
            });

            const data = (await res.json()) as { error?: string; errorCode?: string };

            if (!res.ok) {
                if (data.errorCode === "CONTACT_REQUIRED_FIELDS") {
                    throw new Error(t("errorRequired"));
                }
                if (data.errorCode === "CONTACT_SEND_FAILED") {
                    throw new Error(t("errorSendRetry"));
                }
                throw new Error(data.error || t("errorSend"));
            }
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : t("errorSendRetry"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contacto-form" className="relative w-full overflow-hidden bg-[#F6F0E8] px-6 pt-28 pb-12 md:px-10 md:pt-32 md:pb-16 lg:px-16 lg:pt-36 lg:pb-20">
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={revealTransition()}
                    className="flex flex-col justify-start"
                >
                    <p
                        className="mb-5 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {tHero("kicker")}
                    </p>
                    <h1
                        className="mb-5 leading-[0.98] text-[#1C1713] lg:mb-6"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.65rem, 5vw, 5.2rem)",
                        }}
                    >
                        {t("titleLine1")} <em className="text-[#AA7D69]">{t("titleLine2")}</em>
                    </h1>

                    <p
                        className="max-w-[36rem] text-base leading-relaxed text-[#1C1713]/72 md:text-lg"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("intro")}
                    </p>

                    <div className="mt-8 flex w-full max-w-[28rem] flex-col gap-5 border-t border-[#1C1713]/10 pt-7 lg:mt-10">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#AA7D69]/30 bg-[#FFF9F2]/72">
                                <MapPin className="h-4 w-4 text-[#AA7D69]" />
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AA7D69]" style={{ fontFamily: "var(--font-sans)" }}>{t("locationLabel")}</p>
                                <p className="font-serif text-base leading-snug text-[#1C1713] lg:text-lg">{t("locationLine1")} <br />{t("locationLine2")}</p>
                            </div>
                        </div>

                        <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-start gap-4 transition-opacity hover:opacity-75">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#AA7D69]/30 bg-[#FFF9F2]/72">
                                <Mail className="h-4 w-4 text-[#AA7D69]" />
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AA7D69]" style={{ fontFamily: "var(--font-sans)" }}>{t("emailLabel")}</p>
                                <p className="font-serif text-base text-[#1C1713] lg:text-lg">{CONTACT_EMAIL}</p>
                            </div>
                        </a>

                        <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 transition-opacity hover:opacity-75">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#AA7D69]/30 bg-[#FFF9F2]/72">
                                <Phone className="h-4 w-4 text-[#AA7D69]" />
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AA7D69]" style={{ fontFamily: "var(--font-sans)" }}>{t("phoneLabel")}</p>
                                <p className="font-serif text-base text-[#1C1713] lg:text-lg">{SITE_CONTACT.phoneDisplay}</p>
                            </div>
                        </a>
                    </div>

                </motion.div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={revealTransition(0.14)}
                    className="flex w-full flex-col justify-start gap-3 lg:pt-1"
                >
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <a
                            href={SITE_CONTACT.smsUrl}
                            className="flex min-w-0 w-full items-center justify-center gap-3 border border-[#58949f] bg-[#78aeb8] px-4 py-4 text-center text-[11px] font-bold leading-snug tracking-[0.16em] text-white uppercase transition-colors duration-300 hover:border-[#2d91ff] hover:bg-[#447985]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            {t("sms")}
                        </a>

                        <a
                            href={SITE_CONTACT.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-w-0 w-full items-center justify-center gap-3 border border-[#95a682] bg-[#95a682] px-4 py-4 text-center text-[11px] font-bold leading-snug tracking-[0.16em] text-[#ffffff] uppercase transition-colors duration-300 hover:border-[#1f7f40] hover:bg-[#758760]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            <svg className="h-4 w-4 shrink-0 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {t("whatsapp")}
                        </a>
                    </div>

                    <div className="relative w-full overflow-hidden border border-[#AA7D69]/24 bg-[#FFF9F2] p-5 shadow-[0_18px_45px_rgba(47,39,33,0.08)] md:p-7">
                        {submitted ? (
                            <div className="relative z-10 flex min-h-[360px] flex-col items-center justify-center py-16 text-center">
                                <div className="mx-auto mb-6 h-px w-16 bg-[#AA7D69]/50" />
                                <p className="mb-4 text-3xl text-[#1C1713]" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                                    {t("thanksTitle")}
                                </p>
                                <p className="mx-auto max-w-xs text-base text-[#1C1713]/70" style={{ fontFamily: "var(--font-sans)" }}>
                                    {t("thanksBody")}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                                <h2 className="mb-5 font-serif text-2xl text-[#1C1713] lg:mb-6">{t("formTitle")}</h2>

                                {error && (
                                    <p className="text-sm text-red-700/95" style={{ fontFamily: "var(--font-sans)" }}>
                                        {error}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-[0.14em] text-[#1C1713]/58" style={{ fontFamily: "var(--font-sans)" }}>{t("fullNameLabel")}</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            disabled={loading}
                                            className="w-full border-b border-[#AA7D69]/30 bg-transparent py-3 text-base text-[#1C1713] placeholder-[#1C1713]/35 outline-none transition-colors focus:border-[#AA7D69] disabled:opacity-60"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder={t("namePlaceholder")}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-[0.14em] text-[#1C1713]/58" style={{ fontFamily: "var(--font-sans)" }}>{t("phoneFieldLabel")}</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            disabled={loading}
                                            className="w-full border-b border-[#AA7D69]/30 bg-transparent py-3 text-base text-[#1C1713] placeholder-[#1C1713]/35 outline-none transition-colors focus:border-[#AA7D69] disabled:opacity-60"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder={t("phonePlaceholder")}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.14em] text-[#1C1713]/58" style={{ fontFamily: "var(--font-sans)" }}>{t("emailFieldLabel")}</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        disabled={loading}
                                        className="w-full border-b border-[#AA7D69]/30 bg-transparent py-3 text-base text-[#1C1713] placeholder-[#1C1713]/35 outline-none transition-colors focus:border-[#AA7D69] disabled:opacity-60"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                        placeholder={t("emailPlaceholder")}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.14em] text-[#1C1713]/58" style={{ fontFamily: "var(--font-sans)" }}>{t("messageLabel")}</label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        required
                                        disabled={loading}
                                        className="w-full resize-none border-b border-[#AA7D69]/30 bg-transparent py-3 text-base text-[#1C1713] placeholder-[#1C1713]/35 outline-none transition-colors focus:border-[#AA7D69] disabled:opacity-60"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                        placeholder={t("messagePlaceholder")}
                                    />
                                </div>

                                <div className="space-y-2 text-[10px] leading-relaxed text-[#1C1713]/55" style={{ fontFamily: "var(--font-sans)" }}>
                                    <p>{t("committeeNotice")}</p>
                                    <p className="text-[#1C1713]/48">{t("privacySubmit")}</p>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full cursor-pointer whitespace-nowrap bg-[#AA7D69] px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFF9F2] transition-colors duration-300 hover:bg-[#956955] disabled:cursor-not-allowed disabled:opacity-60"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {loading ? t("sending") : t("submit")}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={revealTransition(0.18)}
                className="mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center border-t border-[#1C1713]/10 pt-8 text-center md:mt-12 md:pt-10"
            >
                <p className="mb-4 font-serif text-lg text-[#1C1713] md:text-xl">{t("socialTitle")}</p>
                <div className="flex items-center justify-center gap-3">
                    <a href="https://www.instagram.com/dondiegosma/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#AA7D69]/30 bg-[#FFF9F2]/72 text-[#AA7D69] transition-all duration-300 hover:bg-[#AA7D69] hover:text-white">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                    <a href="https://www.youtube.com/@dondiegosma" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#AA7D69]/30 bg-[#FFF9F2]/72 text-[#AA7D69] transition-all duration-300 hover:bg-[#AA7D69] hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-7 w-7 fill-current"><path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" /></svg>
                    </a>
                    <a href="https://www.tiktok.com/@dondiegosma" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#AA7D69]/30 bg-[#FFF9F2]/72 text-[#AA7D69] transition-all duration-300 hover:bg-[#AA7D69] hover:text-white">
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
                        </svg>
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
