"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useRef } from "react";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { formatPostDate, getAllPosts, isVideoSrc, type BlogPost } from "@/content/blogPosts";

const posts = getAllPosts();

function MediaCover({ src, alt }: { src: string; alt: string }) {
    if (isVideoSrc(src)) {
        return (
            <video
                src={src}
                aria-label={alt}
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay
                className="absolute inset-0 h-full w-full object-cover"
            />
        );
    }

    return <Image src={src} alt={alt} fill className="object-cover" />;
}

function ParallaxBlogImage({
    imageSrc,
    alt,
    y,
    reduceMotion,
}: {
    imageSrc: string;
    alt: string;
    y: MotionValue<string>;
    reduceMotion: boolean;
}) {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#EFE6DC]">
            <motion.div
                className="absolute left-0 right-0 h-[145%] w-full -top-[22.5%]"
                style={reduceMotion ? undefined : { y }}
            >
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover object-[center_58%]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                />
            </motion.div>
        </div>
    );
}

function TagRow({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {tags.map((t) => (
                <span
                    key={t}
                    className="text-[10px] uppercase tracking-[0.22em] text-[#222]/50"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t}
                </span>
            ))}
        </div>
    );
}

function PostCard({
    post,
    locale,
    parallaxY,
    reduceMotion,
}: {
    post: BlogPost;
    locale: string;
    parallaxY: MotionValue<string>;
    reduceMotion: boolean;
}) {
    return (
        <article className="relative">
            <Link
                href={`/blog/${post.slug}`}
                className="block relative overflow-hidden rounded-sm border border-[#222]/[0.06] bg-[#EFE6DC] cursor-pointer hover:brightness-105 transition-all duration-300 hover:border-[#AA7D69]/20 hover:bg-[#EFE6DC]/80"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#AA7D69] to-[#E1B19B]" />

                <div className="relative aspect-[2/1]">
                    {isVideoSrc(post.imageSrc) ? (
                        <MediaCover src={post.imageSrc} alt={post.imageAlt} />
                    ) : (
                        <ParallaxBlogImage
                            imageSrc={post.imageSrc}
                            alt={post.imageAlt}
                            y={parallaxY}
                            reduceMotion={reduceMotion}
                        />
                    )}
                </div>

                <div className="p-4 md:p-6">
                    <div
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/55 uppercase mb-2"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {post.kicker}
                    </div>
                    <time
                        dateTime={post.publishedAt}
                        className="text-[10px] text-[#222]/45 mb-3 block tabular-nums"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {formatPostDate(post.publishedAt, locale)}
                    </time>

                    <h3
                        className="font-serif text-[#222] leading-tight"
                        style={{ fontSize: "clamp(1.1rem, 1.9vw, 1.75rem)" }}
                    >
                        {post.title}
                    </h3>

                    <div className="mt-4">
                        <TagRow tags={post.tags} />
                    </div>

                </div>

                <div
                    className="pointer-events-none absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-[#222222] text-[#EFE6DC] shadow-sm"
                    aria-hidden
                >
                    <Plus className="size-4" strokeWidth={2} />
                </div>
            </Link>
        </article>
    );
}

export default function Blogs() {
    const locale = useLocale();
    const hasVisited = useHasVisited();
    const reduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-11%"]);

    return (
        <section ref={sectionRef} id="blogs" className="bg-[#F6F0E8] overflow-hidden">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [Blog]
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.25rem, 4.6vw, 4rem)",
                            }}
                        >
                            Historias & Experiencias
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={hasVisited ? false : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[#222]/55 text-sm md:text-lg lg:text-xl leading-relaxed max-w-md"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Un cuaderno visual con momentos del entorno, las caminatas y lo cotidiano en Don Diego.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                    {/* Left column */}
                    <div className="flex flex-col gap-6 md:gap-8">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <PostCard
                                post={posts[0]}
                                locale={locale}
                                parallaxY={imageParallaxY}
                                reduceMotion={!!reduceMotion}
                            />
                        </motion.div>
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.05 }}
                        >
                            <PostCard
                                post={posts[2]}
                                locale={locale}
                                parallaxY={imageParallaxY}
                                reduceMotion={!!reduceMotion}
                            />
                        </motion.div>
                    </div>

                    {/* Right column (staggered down) */}
                    <div className="flex flex-col gap-6 md:gap-8 md:pt-12">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.05 }}
                        >
                            <PostCard
                                post={posts[1]}
                                locale={locale}
                                parallaxY={imageParallaxY}
                                reduceMotion={!!reduceMotion}
                            />
                        </motion.div>
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <PostCard
                                post={posts[3]}
                                locale={locale}
                                parallaxY={imageParallaxY}
                                reduceMotion={!!reduceMotion}
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="flex justify-center mt-10 md:mt-12 w-full">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-block text-[#222] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#222] pb-1 hover:opacity-60 transition-opacity"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            EXPLORAR EL BLOG
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

