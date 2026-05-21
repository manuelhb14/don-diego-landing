"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPostDate, isVideoSrc, type BlogPostView } from "@/content/blogPosts";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

type Props = {
    posts: BlogPostView[];
    locale: string;
};

function MediaCover({ post, className, sizes }: { post: BlogPostView; className?: string; sizes?: string }) {
    return (
        <div className={`relative overflow-hidden bg-[#EFE6DC] ${className ?? ""}`}>
            {isVideoSrc(post.imageSrc) ? (
                <video
                    src={post.imageSrc}
                    aria-label={post.imageAlt}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    autoPlay
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
            ) : (
                <Image
                    src={post.imageSrc}
                    alt={post.imageAlt}
                    fill
                    className="object-cover object-[center_58%] transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes={sizes ?? "(max-width: 1024px) 100vw, 36vw"}
                />
            )}
        </div>
    );
}

function BlogTeaserCard({
    post,
    locale,
    readLabel,
    delay,
    reduceMotion,
}: {
    post: BlogPostView;
    locale: string;
    readLabel: string;
    delay: number;
    reduceMotion: boolean;
}) {
    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: reduceMotion ? 0 : 0.78,
                ease: EASE_OUT_CUBIC,
                delay: reduceMotion ? 0 : delay,
            }}
            className="min-w-0"
        >
            <Link
                href={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden border border-[#1F1D1B]/10 bg-[#F6E7D3] shadow-[0_20px_54px_-34px_rgba(47,39,33,0.35)] transition-all duration-300 hover:border-[#AA7D69]/25 hover:shadow-[0_24px_60px_-34px_rgba(47,39,33,0.42)]"
            >
                <div className="relative aspect-[2/1] w-full shrink-0 min-h-[140px] sm:min-h-[160px]">
                    <MediaCover post={post} className="absolute inset-0 h-full w-full" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#222222]/20 via-transparent to-transparent" />
                </div>

                <div className="relative z-[1] flex flex-1 flex-col items-start px-5 py-6 text-left md:px-6 md:py-7">
                    <h3
                        className="mb-2 text-balance leading-[1.15] text-[#222] transition-colors group-hover:text-[#AA7D69]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)",
                        }}
                    >
                        {post.title}
                    </h3>
                    <time
                        dateTime={post.publishedAt}
                        className="mb-1.5 block text-[10px] tabular-nums text-[#222]/45 sm:text-[11px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {formatPostDate(post.publishedAt, locale)}
                    </time>
                    <p
                        className="mb-4 line-clamp-3 flex-1 text-pretty text-sm md:text-base leading-relaxed text-[#222]/75"
                        // style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {post.intro}
                    </p>
                    <span
                        className="w-full mt-auto inline-flex justify-end items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AA7D69] transition-opacity group-hover:opacity-80"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {readLabel}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            viewBox="0 -960 960 960"
                            width="16"
                            fill="currentColor"
                            aria-hidden
                        >
                            <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                        </svg>
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function FeaturedBlogUbicacion({ posts, locale }: Props) {
    const reduceMotion = useReducedMotion() ?? false;
    const tb = useTranslations("blogsHome");
    const t = useTranslations("components.featuredBlogUbicacion");
    const revealTransition = (delay = 0) => ({
        duration: reduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: reduceMotion ? 0 : delay,
    });

    const [primary, secondary] = posts;

    if (!primary) {
        return null;
    }

    const list = secondary ? [primary, secondary] : [primary];

    return (
        <section className="w-full bg-[#FFF3E1] px-6 py-12 md:px-12 md:pt-16 pb-12 md:pb-0 lg:px-16">
            <div className="mx-auto w-full max-w-[1440px]">
                <div className="flex flex-col gap-10 md:gap-12 lg:gap-14">
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={revealTransition()}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <p
                            className="mb-4 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="leading-none tracking-tight text-[#222222]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                            }}
                        >
                            {t("title")} <span className="italic text-[#8C7B6C]">{t("titleAccent")}</span>
                        </h2>
                    </motion.div>

                    <div className="flex min-w-0 flex-col gap-8">
                        <div
                            className={
                                list.length > 1
                                    ? "mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 sm:gap-7 md:grid-cols-2 md:gap-6"
                                    : "mx-auto grid w-full max-w-xl grid-cols-1"
                            }
                        >
                            {list.map((post, index) => (
                                <BlogTeaserCard
                                    key={post.slug}
                                    post={post}
                                    locale={locale}
                                    readLabel={t("readArticle")}
                                    delay={0.06 + index * 0.1}
                                    reduceMotion={reduceMotion}
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={revealTransition(0.22)}
                            className={`mx-auto flex w-full justify-end ${list.length > 1 ? "max-w-6xl" : "max-w-xl"}`}
                        >
                            <Link
                                href="/blog"
                                className="inline-block border-b border-[#222] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#222] transition-opacity hover:opacity-60 lg:text-[11px]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {tb("cta")}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
