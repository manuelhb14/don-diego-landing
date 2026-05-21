"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import { PlayIcon } from "lucide-react";

const YOUTUBE_IDS: Record<string, string> = {
  en: "SN6tay81eCs",
  es: "9OIoj5kxG9E",
};

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

function PlayButton({
  onClick,
  ariaLabel,
  reduceMotion,
}: {
  onClick: () => void;
  ariaLabel: string;
  reduceMotion: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="group absolute inset-0 z-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF3E1]/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
    >
      {!reduceMotion ? (
        <span className="absolute size-20 rounded-full border border-[#FFF3E1]/24 opacity-30 animate-ping md:size-24" />
      ) : null}
      <span className="relative flex size-16 items-center justify-center rounded-full border border-[#FFF3E1]/40 bg-[#1C1713]/42 text-[#FFF3E1] shadow-[0_10px_24px_rgba(28,23,19,0.24)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#FFF3E1]/64 group-hover:bg-[#1C1713]/58 md:size-20">
        <PlayIcon className="size-4 translate-x-px md:size-5" />
      </span>
    </button>
  );
}

export default function Vision() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [playing, setPlaying] = useState(false);
  const locale = useLocale();
  const tv = useTranslations("vision");
  const localeKey = locale.split("-")[0];
  const youtubeId = YOUTUBE_IDS[localeKey] ?? YOUTUBE_IDS.es;
  const revealTransition = (delay = 0) => ({
    duration: shouldReduceMotion ? 0 : 0.82,
    ease: EASE_OUT_CUBIC,
    delay: shouldReduceMotion ? 0 : delay,
  });

  return (
    <section id="home-video" className="bg-[#EDE5DA] overflow-hidden scroll-mt-0">
      <div className="max-w-[1440px] mx-auto w-full px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-22">
        <div className="mb-7 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransition()}
          >
            <p
              className="mb-4 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <EditableText contentKey="home.vision.kicker" fallback={tv("kicker")} />
            </p>
            <h2
              className="text-[#222222] leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(3rem, 6vw, 6rem)",
              }}
            >
              <EditableText contentKey="home.vision.titleDiscover" fallback={tv("titleDiscover")} />{" "}
              <em className="text-[#AA7D69]"><EditableText contentKey="home.vision.titleName" fallback={tv("titleName")} /></em>
            </h2>
          </motion.div>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransition(0.16)}
            className="max-w-md text-base font-medium leading-relaxed text-[#222222]/72 md:text-right md:text-xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <EditableText contentKey="home.vision.body" fallback={tv("body")} />
          </motion.p>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={revealTransition(0.16)}
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
                <PlayButton onClick={() => setPlaying(true)} ariaLabel={tv("playAria")} reduceMotion={shouldReduceMotion} />

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
