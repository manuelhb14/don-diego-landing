"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { useChat } from "@/components/chat/ChatProvider";

type FaqEntry = { question: string; answer: string };
type FaqItemProps = {
    question: string;
    answer: string;
    isOpen: boolean;
    toggle: () => void;
    shouldReduceMotion: boolean;
};

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const EASE_IN_OUT_QUART: [number, number, number, number] = [0.77, 0, 0.175, 1];

function FaqItem({ question, answer, isOpen, toggle, shouldReduceMotion }: FaqItemProps) {
    const iconDuration = shouldReduceMotion ? "0ms" : "300ms";

    return (
        <div className="border-b border-[#FFF3E1]/12">
            <button
                onClick={toggle}
                className="group flex w-full items-center justify-between py-5 text-left lg:py-7"
            >
                <h3
                    className="pr-8 text-lg leading-snug text-[#FFF3E1] transition-colors duration-300 group-hover:text-[#E1B19B] lg:text-2xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {question}
                </h3>
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                    <span
                        className="absolute h-px w-full bg-[#FFF3E1] transition-colors group-hover:bg-[#E1B19B]"
                        style={{ transitionDuration: iconDuration }}
                    />
                    <span
                        className={`absolute h-full w-px bg-[#FFF3E1] transition-[background-color,opacity,transform] group-hover:bg-[#E1B19B] ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                            }`}
                        style={{ transitionDuration: iconDuration }}
                    />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                        animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                        exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: EASE_IN_OUT_QUART }}
                        className="grid overflow-hidden"
                    >
                        <div className="min-h-0">
                            <p
                                className="pb-7 text-sm leading-relaxed text-[#FFF3E1]/62 lg:text-base"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {answer}
                            </p>
                        </div>
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
    const shouldReduceMotion = useReducedMotion() ?? false;
    const faqs = useMemo(() => t.raw("items") as FaqEntry[], [t]);

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section id="faq" className="overflow-hidden bg-[#2A2826] py-16 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-14">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_2.15fr] lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition()}
                    >
                        <p
                            className="mb-5 text-xs tracking-[0.3em] text-[#E1B19B] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="mb-6 text-[#FFF3E1] leading-[0.98]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                            }}
                        >
                            {t("title")}
                        </h2>
                        <p
                            className="max-w-sm text-base leading-relaxed text-[#FFF3E1]/72 md:text-lg"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("intro")}
                        </p>

                        <div className="mt-8 max-w-sm overflow-hidden rounded-sm border border-[#FFF3E1]/18 bg-[#FFF8ED] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.12)] md:p-6">
                            <p
                                className="text-[10px] tracking-[0.24em] text-[#AA7D69] uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {tContact("instantKicker")}
                            </p>
                            <p
                                className="mt-2 text-base leading-snug text-[#1C1713] md:text-lg"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                {tContact("instantBody")}
                            </p>
                            <button
                                type="button"
                                onClick={openChat}
                                className="mt-4 inline-flex items-center gap-2 border border-[#3a3733] bg-[#2A2826] px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-[#F0EDE6] uppercase transition-colors duration-300 hover:border-[#45423d] hover:bg-[#35322e] hover:text-[#FFF8ED]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                <Sparkles className="size-3.5 shrink-0 text-[#E1B19B]" />
                                {tContact("openAssistant")}
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.16)}
                        className="border-t border-[#FFF3E1]/12"
                    >
                        {faqs.map((faq, idx) => (
                            <FaqItem
                                key={idx}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndices.has(idx)}
                                shouldReduceMotion={shouldReduceMotion}
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
