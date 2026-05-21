import { getTranslations, setRequestLocale } from "next-intl/server";
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
import ChatPageContext from "@/components/chat/ChatPageContext";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

function ArticleHeroMedia({
    imageSrc,
    imageAlt,
}: {
    imageSrc: string;
    imageAlt: string;
}) {
    if (isVideoSrc(imageSrc)) {
        return (
            <video
                src={imageSrc}
                aria-label={imageAlt}
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay
                className="absolute inset-0 h-full w-full object-cover"
            />
        );
    }

    return (
        <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
        />
    );
}

export function generateStaticParams() {
    const slugs = getAllSlugs();
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug })),
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const post = getPostBySlug(slug, locale);
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
    const t = await getTranslations("blogPage");
    const post = getPostBySlug(slug, locale);
    if (!post) {
        notFound();
    }

    return (
        <>
            <ChatPageContext
                pageType="blogPost"
                detail={{
                    slug: post.slug,
                    title: post.title,
                    category: post.kicker,
                    tags: post.tags,
                }}
            />
            <Navbar locale={locale} />
            <main className="bg-[#F6F0E8] min-h-screen">
                <section className="relative flex min-h-[64svh] w-full items-end overflow-hidden bg-[#15120F] px-6 pt-24 pb-12 md:min-h-[70svh] md:px-10 md:pt-28 md:pb-16 lg:px-16">
                    <ArticleHeroMedia imageSrc={post.imageSrc} imageAlt={post.imageAlt} />
                    <div className="absolute inset-0 bg-[#15120F]/18" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15120F]/76 via-[#15120F]/34 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#F6F0E8]/70 to-transparent" />

                    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col text-left">
                        <Link
                            href="/blog"
                            className="mb-8 inline-flex w-fit items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#FFF3E1]/78 transition-colors hover:text-[#FFF3E1]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            <ArrowLeft className="size-4" strokeWidth={1.5} />
                            {t("backToBlog")}
                        </Link>
                        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <p
                                className="text-xs tracking-[0.28em] text-[#E1B19B] uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {post.kicker}
                            </p>
                            <time
                                dateTime={post.publishedAt}
                                className="block text-[11px] tabular-nums text-[#FFF3E1]/66"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {formatPostDate(post.publishedAt, locale)}
                            </time>
                        </div>
                        <h1
                            className="mb-6 max-w-[1020px] text-balance text-[#FFF3E1] leading-[1.02]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.6rem, 5.5vw, 5.75rem)",
                            }}
                        >
                            {post.title}
                        </h1>
                        <p
                            className="max-w-[46rem] text-base leading-relaxed text-[#FFF3E1]/78 md:text-xl"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {post.intro}
                        </p>
                        <div className="mt-8 flex max-w-[46rem] flex-wrap gap-x-3 gap-y-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] uppercase tracking-[0.22em] text-[#FFF3E1]/64"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <article className="mx-auto max-w-[780px] px-6 md:px-10 lg:px-0 py-12 md:py-16 lg:py-20">
                    <BlogMarkdown>{post.body}</BlogMarkdown>
                </article>
            </main>
            <Footer />
        </>
    );
}
