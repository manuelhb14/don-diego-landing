"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function HeroCalculadora() {
  const t = useTranslations("pages.calculadora.hero");
  return (
    <section className="relative flex min-h-[32vh] md:min-h-[38vh] w-full items-center justify-center overflow-hidden bg-[#fff8ed]">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/renders/entrance.jpg')] bg-cover bg-center mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8ed] via-transparent to-[#fff8ed] opacity-80" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-3xl text-center mt-12 md:mt-16 pb-4">
        <p
          className="text-[10px] sm:text-xs tracking-[0.3em] text-[#AA7D69] uppercase mb-4 sm:mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {t("kicker")}
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#222222] leading-[1.05] mb-4 md:mb-6"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
          }}
        >
          {t("titleLine1")}
          <br />
          <span className="text-[#AA7D69] italic">{t("titleLine2")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#222222]/80 text-base md:text-lg leading-relaxed max-w-xl"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}
        >
          {t("body")}
        </motion.p>
      </div>
    </section>
  );
}
