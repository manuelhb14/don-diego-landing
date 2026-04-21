"use client";

import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useTranslations } from "next-intl";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";

export default function Exclusivity() {
  const hasVisited = useHasVisited();
  const tx = useTranslations("exclusivity");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <EditableImage
          contentKey="home.exclusivity.image"
          fallbackSrc="/babylon/banner-4.webp"
          alt={tx("imageAlt")}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full min-h-[220px] md:min-h-[280px] lg:min-h-[420px] flex items-center">
        <div className="px-6 md:px-10 lg:pl-16 lg:pr-12 py-10 md:py-12 lg:py-20 max-w-[600px]">
          <motion.h2
            initial={hasVisited ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#222222] leading-[1.1] mb-5"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)",
            }}
          >
            <EditableText contentKey="home.exclusivity.title1" fallback={tx("title1")} />
            <br />
            <EditableText contentKey="home.exclusivity.title2" fallback={tx("title2")} />{" "}
            <em className="text-[#AA7D69]"><EditableText contentKey="home.exclusivity.titleEm" fallback={tx("titleEm")} /></em>
          </motion.h2>

          <motion.p
            initial={hasVisited ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="text-[#222222]/55 text-base lg:text-lg leading-[1.85] max-w-sm"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <EditableText contentKey="home.exclusivity.subtitle" fallback={tx("subtitle")} />
          </motion.p>
        </div>
      </div>
    </section>
  );
}
