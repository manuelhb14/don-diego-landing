"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden bg-cream py-28 lg:py-40">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-serif text-4xl leading-snug tracking-tight text-dark md:text-5xl lg:text-6xl">
              {t("quote")}
            </p>
            <p className="mt-4 font-sans text-sm font-bold uppercase tracking-[0.15em] text-clay">
              {t("source")}
            </p>

            <div className="mt-12 space-y-6">
              <p className="font-sans text-base leading-relaxed text-dark/80 md:text-lg">
                {t("p1")}
              </p>
              <p className="font-sans text-base leading-relaxed text-dark/80 md:text-lg">
                {t("p2")}
              </p>
              <p className="font-sans text-base leading-relaxed text-dark/80 md:text-lg">
                {t("p3")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/location/san-miguel.png"
                alt="San Miguel de Allende"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 border-2 border-terracotta/30 lg:-bottom-8 lg:-left-8 lg:h-48 lg:w-48" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
