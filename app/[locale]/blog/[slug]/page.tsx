import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { routing } from "@/i18n/routing";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { formatPostDate, getAllSlugs, getPostBySlug, isVideoSrc } from "@/content/blogPosts";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
    const slugs = getAllSlugs();
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug })),
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return { title: "Blog" };
    }
    const description = post.intro || post.kicker;
    const ogImage =
        !isVideoSrc(post.imageSrc) && post.imageSrc.startsWith("/")
            ? post.imageSrc
            : undefined;
    const publishedTime = new Date(
        post.publishedAt.includes("T") ? post.publishedAt : `${post.publishedAt}T12:00:00`,
    ).toISOString();

    return {
        title: `${post.title} | Don Diego`,
        description,
        openGraph: {
            type: "article",
            title: post.title,
            description,
            publishedTime,
            ...(ogImage ? { images: [{ url: ogImage }] } : {}),
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const post = getPostBySlug(slug);
    if (!post) {
        notFound();
    }

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main className="bg-[#F6F0E8] min-h-screen">
                <article className="mx-auto max-w-[900px] px-6 md:px-10 lg:px-16 pt-28 pb-16 md:pb-24">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#AA7D69] hover:text-[#222] transition-colors mb-10"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <ArrowLeft className="size-4" strokeWidth={1.5} />
                        Volver al blog
                    </Link>

                    <header className="mb-8 md:mb-10">
                        <h1
                            className="text-[#222] leading-tight mb-4 md:mb-5"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                            }}
                        >
                            {post.title}
                        </h1>
                        <time
                            dateTime={post.publishedAt}
                            className="text-[12px] text-[#222]/45 mb-2 block tabular-nums"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {formatPostDate(post.publishedAt, locale)}
                        </time>
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {post.kicker}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] uppercase tracking-[0.22em] text-[#222]/50"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </header>

                    <div className="relative mb-10 md:mb-12 aspect-[21/9] w-full overflow-hidden rounded-sm border border-[#222]/[0.06] bg-[#EFE6DC]">
                        {isVideoSrc(post.imageSrc) ? (
                            <video
                                src={post.imageSrc}
                                aria-label={post.imageAlt}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                autoPlay
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : (
                            <Image
                                src={post.imageSrc}
                                alt={post.imageAlt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 900px) 100vw, 900px"
                                priority
                            />
                        )}
                    </div>

                    <BlogMarkdown>{post.body}</BlogMarkdown>
                </article>
            </main>
            <Footer />
        </>
    );
}
