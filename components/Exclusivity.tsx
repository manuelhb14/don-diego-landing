"use client";

import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useTranslations } from "next-intl";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dondiegosma/",
    viewBox: "0 0 24 24",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@dondiegosma",
    viewBox: "0 0 640 640",
    path: "M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@dondiegosma",
    viewBox: "0 0 640 640",
    path: "M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z",
  },
] as const;

export default function Exclusivity() {
  const hasVisited = useHasVisited();
  const tx = useTranslations("exclusivity");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <EditableImage
          contentKey="home.exclusivity.image"
          fallbackSrc="/final/banner-5.png"
          alt={tx("imageAlt")}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full min-h-[200px] md:min-h-[240px] lg:min-h-[340px] flex items-center">
        <div className="px-6 pt-8 md:px-10 lg:pl-16 lg:pr-12 max-w-[600px]">
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

          <motion.div
            initial={hasVisited ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 flex flex-col items-start gap-2.5"
          >
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center text-[#AA7D69] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#8d5f4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AA7D69]"
                >
                  {social.label === "Instagram" ? (
                    <svg className="h-7 w-7 lg:h-8 lg:w-8" viewBox="0 0 64 64" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M20 5h24c8.284 0 15 6.716 15 15v24c0 8.284-6.716 15-15 15H20C11.716 59 5 52.284 5 44V20C5 11.716 11.716 5 20 5Z"
                      />
                      <path
                        fill="#F6F0E8"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32 45c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13Zm0-6.4a6.6 6.6 0 1 0 0-13.2 6.6 6.6 0 0 0 0 13.2Z"
                      />
                      <circle cx="48" cy="18" r="4" fill="#F6F0E8" />
                    </svg>
                  ) : (
                    <svg
                        className={`fill-current ${
                          social.label === "YouTube"
                          ? "h-9 w-8 lg:h-10 lg:w-9"
                          : "h-7 w-7 lg:h-8 lg:w-8"
                      }`}
                      viewBox={social.viewBox}
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
            <p
              className="text-xs leading-none tracking-[0.04em] text-[#222222]/58 lg:text-sm"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {tx("socialTitle")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
