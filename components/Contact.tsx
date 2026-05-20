"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";

export default function Contact() {
    const t = useTranslations("contact");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                    message: t("internalVisit"),
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
        <section id="contacto" className="relative overflow-hidden bg-[#F6EEE4] py-10 lg:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(183,109,75,0.14),transparent_46%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_82%,rgba(225,177,155,0.18),transparent_52%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,238,228,0.86)_0%,rgba(239,230,220,1)_100%)]" />

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-6 lg:px-14 lg:py-10">
                <p
                    className="mb-7 text-[10px] tracking-[0.3em] text-[#AA7D69]/85 uppercase"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t("kicker")}
                </p>
                <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                        <h2
                            className="mb-6 text-[#1C1713] leading-[1.05]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.1rem, 4.6vw, 4.7rem)",
                            }}
                        >
                            {t("joinLine1")} <br /><em className="text-[#AA7D69]">{t("joinEm")}</em>
                        </h2>

                        <p
                            className="max-w-md text-sm leading-relaxed text-[#1C1713]/72 lg:text-base"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("bodyHome")}
                        </p>

                        {/* <div className="mt-10 grid grid-cols-1 gap-4 border-t border-[#AA7D69]/22 pt-7 sm:grid-cols-2">
                            {[
                                { title: t("belief1t"), desc: t("belief1d") },
                                { title: t("belief2t"), desc: t("belief2d") },
                                { title: t("belief3t"), desc: t("belief3d") },
                                { title: t("belief4t"), desc: t("belief4d") },
                            ].map((b, i) => (
                                <motion.div
                                    key={b.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                                    className="rounded-sm border border-[#AA7D69]/20 bg-[#FFF9F2]/85 px-4 py-4"
                                >
                                    <span className="mb-3 block h-px w-10 bg-[#AA7D69]/55" />
                                    <p
                                        className="mb-1 text-sm text-[#1C1713]/90"
                                        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                    >
                                        {b.title}
                                    </p>
                                    <p
                                        className="text-xs tracking-[0.16em] text-[#1C1713]/52 uppercase"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {b.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div> */}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="w-full"
                    >
                        <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
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
                                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                {t("whatsappChat")}
                            </a>
                        </div>

                        <div className="relative overflow-hidden border border-[#AA7D69]/28 bg-[#FFF9F2]/90 p-4 shadow-[0_22px_65px_rgba(170,125,105,0.16)] md:p-6">
                            <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#b76d4b]/10 blur-[80px]" />
                            <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#E1B19B]/18 blur-[90px]" />

                            {submitted ? (
                                <div className="relative z-10 flex min-h-[460px] flex-col items-center justify-center py-24 text-center">
                                    <div className="mx-auto mb-8 h-px w-16 bg-[#AA7D69]/56" />
                                    <p
                                        className="mb-4 text-3xl text-[#1C1713]"
                                        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                    >
                                        {t("thanksTitle")}
                                    </p>
                                    <p
                                        className="mx-auto max-w-xs text-base text-[#1C1713]/70"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {t("thanksBody")}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                    {error && (
                                        <p className="text-sm text-red-700/95" style={{ fontFamily: "var(--font-sans)" }}>
                                            {error}
                                        </p>
                                    )}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] tracking-[0.14em] text-[#1C1713]/58 uppercase" style={{ fontFamily: "var(--font-sans)" }}>{t("labelName")}</label>
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                disabled={loading}
                                                className="w-full border-b border-[#AA7D69]/30 bg-transparent py-3 text-base text-[#1C1713] placeholder-[#1C1713]/35 outline-none transition-colors focus:border-[#AA7D69] disabled:opacity-60"
                                                style={{ fontFamily: "var(--font-sans)" }}
                                                placeholder={t("phName")}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] tracking-[0.14em] text-[#1C1713]/58 uppercase" style={{ fontFamily: "var(--font-sans)" }}>{t("labelPhone")}</label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                disabled={loading}
                                                className="w-full border-b border-[#AA7D69]/30 bg-transparent py-3 text-base text-[#1C1713] placeholder-[#1C1713]/35 outline-none transition-colors focus:border-[#AA7D69] disabled:opacity-60"
                                                style={{ fontFamily: "var(--font-sans)" }}
                                                placeholder={t("phPhone")}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] tracking-[0.14em] text-[#1C1713]/58 uppercase" style={{ fontFamily: "var(--font-sans)" }}>{t("labelEmail")}</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            disabled={loading}
                                            className="w-full border-b border-[#AA7D69]/30 bg-transparent py-3 text-base text-[#1C1713] placeholder-[#1C1713]/35 outline-none transition-colors focus:border-[#AA7D69] disabled:opacity-60"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder={t("phEmail")}
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#AA7D69] px-4 py-4 text-[11px] font-bold tracking-[0.2em] text-[#FFF9F2] uppercase transition-colors duration-300 hover:bg-[#956955] disabled:cursor-not-allowed disabled:opacity-60"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {loading ? t("sending") : t("submitVisit")}
                                        </button>
                                    </div>

                                    <div className="space-y-2 pt-3 text-center text-[10px] text-[#1C1713]/55" style={{ fontFamily: "var(--font-sans)" }}>
                                        <p>{t("committeeNotice")}</p>
                                        <p className="text-[#1C1713]/48">{t("privacy")}</p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
