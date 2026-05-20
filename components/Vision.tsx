"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useLocale, useTranslations } from "next-intl";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import { PlayIcon } from "lucide-react";

const YOUTUBE_IDS: Record<string, string> = {
  en: "SN6tay81eCs",
  es: "9OIoj5kxG9E",
};

function PlayButton({ onClick, ariaLabel }: { onClick: () => void; ariaLabel: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="group absolute inset-0 z-10 flex items-center justify-center focus-visible:outline-none"
    >
      <span className="absolute size-20 md:size-24 rounded-full border border-white/20 animate-ping opacity-20" />
      <span className="relative flex items-center justify-center size-16 md:size-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110 group-hover:border-white/30">
        <PlayIcon className="size-4 md:size-5 text-white group-hover:text-white/80" />
      </span>
    </button>
  );
}

export default function Vision() {
  const hasVisited = useHasVisited();
  const [playing, setPlaying] = useState(false);
  const locale = useLocale();
  const tv = useTranslations("vision");
  const localeKey = locale.split("-")[0];
  const youtubeId = YOUTUBE_IDS[localeKey] ?? YOUTUBE_IDS.es;

  return (
    <section id="home-video" className="bg-[#EDE5DA] overflow-hidden scroll-mt-0">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-16 py-14 md:py-18 lg:py-22">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 md:mb-10">
          <motion.div
            initial={hasVisited ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <EditableText contentKey="home.vision.kicker" fallback={tv("kicker")} />
            </p>
            <h2
              className="text-[#222222] leading-[0.95]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.75rem, 5.6vw, 5.5rem)",
              }}
            >
              <EditableText contentKey="home.vision.titleDiscover" fallback={tv("titleDiscover")} />{" "}
              <em className="text-[#AA7D69]"><EditableText contentKey="home.vision.titleName" fallback={tv("titleName")} /></em>
            </h2>
          </motion.div>

          <motion.p
            initial={hasVisited ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[#222222]/70 text-[15px] md:text-[17px] lg:text-lg leading-[1.8] max-w-md md:text-right"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <EditableText contentKey="home.vision.body" fallback={tv("body")} />
          </motion.p>
        </div>

        <motion.div
          initial={hasVisited ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative mx-auto w-full max-w-[1100px] aspect-video overflow-hidden rounded-sm bg-black/20 shadow-[0_24px_60px_-22px_rgba(36,24,18,0.35)]">
            {playing ? (
              <iframe
                key={youtubeId}
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                title={tv("iframeTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <>
                <div className="absolute inset-0">
                  <EditableImage
                    contentKey="home.vision.thumbnail"
                    fallbackSrc="/video_photo.webp"
                    alt={tv("thumbAlt")}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/25" />
                <PlayButton onClick={() => setPlaying(true)} ariaLabel={tv("playAria")} />

                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#E1B19B]/70" />
                  <p
                    className="text-white/55 text-[10px] md:text-[11px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <EditableText contentKey="home.vision.videoLabel" fallback={tv("videoLabel")} />
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
