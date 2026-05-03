"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { useChat } from "@/components/chat/ChatProvider";

type FaqEntry = { question: string; answer: string };

function FaqItem({ question, answer, isOpen, toggle }: { question: string, answer: string, isOpen: boolean, toggle: () => void }) {
    return (
        <div className="border-b border-white/10">
            <button
                onClick={toggle}
                className="w-full flex items-center justify-between py-6 lg:py-8 text-left group"
            >
                <h3
                    className="text-white text-lg lg:text-2xl pr-8 group-hover:text-[#E1B19B] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {question}
                </h3>
                <span className="relative flex items-center justify-center w-6 h-6 shrink-0">
                    <span
                        className={`absolute w-full h-[1px] bg-white transition-opacity duration-300 group-hover:bg-[#E1B19B]`}
                    />
                    <span
                        className={`absolute w-[1px] h-full bg-white transition-all duration-300 group-hover:bg-[#E1B19B] ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                            }`}
                    />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p
                            className="text-white/60 text-sm lg:text-base leading-relaxed pb-8"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Faq() {
    const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));
    const t = useTranslations("faq");
    const tContact = useTranslations("contact");
    const { openChat } = useChat();
    const faqs = useMemo(() => t.raw("items") as FaqEntry[], [t]);

    return (
        <section id="faq" className="bg-[#2A2826] py-16 lg:py-36 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#E1B19B]/40 uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="text-white leading-none mb-6"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                            }}
                        >
                            {t("title")}
                        </h2>
                        <p
                            className="text-white text-base leading-relaxed max-w-sm"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("intro")}
                        </p>

                        <div className="relative mt-8 max-w-sm overflow-hidden rounded-sm border border-[#E8E2DA]/90 bg-[#FCFAF7] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.14)] md:p-6">
                            <div className="pointer-events-none absolute -right-12 -top-10 h-36 w-36 rounded-full bg-[#F3EEE8]/95 blur-2xl" />
                            <div className="pointer-events-none absolute -bottom-10 -left-12 h-28 w-28 rounded-full bg-[#EDE8E2]/90 blur-2xl" />

                            <p
                                className="relative z-10 text-[10px] tracking-[0.24em] uppercase text-[#8A9AAA]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {tContact("instantKicker")}
                            </p>
                            <p
                                className="relative z-10 mt-2 text-base leading-snug text-[#2C3640] md:text-lg"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                {tContact("instantBody")}
                            </p>
                            <button
                                type="button"
                                onClick={openChat}
                                className="relative z-10 mt-4 inline-flex items-center gap-2 border border-[#3a3733] bg-[#2A2826] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F0EDE6] transition-colors duration-300 hover:bg-[#35322e] hover:border-[#45423d] hover:text-[#FFFCF7]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                <Sparkles className="size-3.5 shrink-0 text-[#E1B19B]" />
                                {tContact("openAssistant")}
                            </button>
                        </div>
                    </motion.div>

                    {/* FAQ Items */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="border-t border-white/10"
                    >
                        {faqs.map((faq, idx) => (
                            <FaqItem
                                key={idx}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndices.has(idx)}
                                toggle={() =>
                                    setOpenIndices((prev) => {
                                        const next = new Set(prev);
                                        if (next.has(idx)) next.delete(idx);
                                        else next.add(idx);
                                        return next;
                                    })
                                }
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
