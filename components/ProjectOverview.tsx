"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";

const components = [
  { key: "residencial", logo: "/logos/residencial.png", accent: "bg-terracotta", accentText: "text-terracotta" },
  { key: "farm", logo: "/logos/farm.png", accent: "bg-sage", accentText: "text-sage" },
  { key: "wellness", logo: "/logos/wellness.png", accent: "bg-sky", accentText: "text-sky" },
  { key: "presa", logo: "/logos/presa.png", accent: "bg-clay", accentText: "text-clay" },
] as const;

export default function ProjectOverview() {
  const t = useTranslations("project");

  return (
    <section id="proyecto" className="bg-white py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <h2 className="font-serif text-5xl tracking-tight text-dark md:text-6xl lg:text-7xl">
            {t("heading")}
          </h2>
          <p className="mt-8 font-sans text-lg leading-relaxed text-dark/70">
            {t("intro")}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {components.map(({ key, logo, accent, accentText }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group relative overflow-hidden border border-dark/5 bg-cream/30 p-8 transition-all duration-500 hover:bg-cream/60 lg:p-12"
            >
              <div className={`absolute left-0 top-0 h-full w-1 ${accent} transition-all duration-500 group-hover:w-1.5`} />

              <div className="mb-6 h-12 w-auto">
                <Image
                  src={logo}
                  alt={t(`${key}.name`)}
                  width={160}
                  height={48}
                  className="h-full w-auto object-contain opacity-80"
                />
              </div>

              <h3 className="font-sans text-xl font-bold text-dark">
                {t(`${key}.name`)}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-dark/60">
                {t(`${key}.description`)}
              </p>

              <p className={`mt-6 font-sans text-xs font-bold uppercase tracking-[0.2em] ${accentText}`}>
                {t("comingSoon")} →
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
