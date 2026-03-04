"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const text1Y = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const text2Y = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const text3Y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Split the subtitle by period and trim empty spaces
  // Subtitle is: "Con la Tierra. Con la Comunidad. Con uno Mismo."
  const phrases = t("subtitle").split(".").filter(Boolean).map(p => p.trim());

  return (
    <section ref={ref} className="relative flex h-screen w-full overflow-hidden bg-[#8b7965]">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-[120%]"
        style={{ y: backgroundY }}
      >
        {/* <video
          src="/videos/render-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-90"
        /> */}
        <Image
          src="/images/renders/render-1.png"
          alt="Hero"
          fill
          className="object-cover object-center opacity-90"
        />
      </motion.div>

      {/* Subtle overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Typography Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top Left Title - Phrase 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ y: text1Y }}
          className="absolute top-[20%] left-[8%] md:top-[18%] md:left-[5%]"
        >
          <h1
            className="text-white tracking-normal font-light whitespace-nowrap"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              lineHeight: 1
            }}
          >
            {phrases[0] || "Con la Tierra"}.
          </h1>
        </motion.div>

        {/* Center Secondary - Phrase 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          style={{ y: text2Y, x: "-50%", translateY: "-50%" }}
          className="absolute top-[50%] left-1/2 w-full px-4 text-center"
        >
          <h1
            className="text-white tracking-normal font-light whitespace-nowrap"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              lineHeight: 1
            }}
          >
            {phrases[1] ? phrases[1] + "." : "Con la Comunidad."}
          </h1>
        </motion.div>

        {/* Bottom Location - Phrase 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          style={{ y: text3Y }}
          className="absolute bottom-[20%] left-[10%] md:bottom-[18%] md:left-[25%] pr-4 md:pr-0"
        >
          <h1
            className="text-white tracking-normal font-light whitespace-nowrap"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              lineHeight: 1
            }}
          >
            {phrases[2] ? phrases[2] + "." : "Con uno Mismo."}
          </h1>
        </motion.div>

        {/* Bottom Subtitle / Small Location Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.1 }}
          className="absolute bottom-[2%] md:bottom-[4%] left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-6"
        >
          <p className="font-sans text-white/80 tracking-[0.1em] md:tracking-[0.15em] text-[10px] md:text-xs text-center font-medium">
            {t("location")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
