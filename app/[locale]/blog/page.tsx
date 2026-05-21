import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { formatPostDate, getAllPosts, isVideoSrc, type BlogPostView } from "@/content/blogPosts";

const BLOG_HERO_IMAGE_SRC = "/final/sma.webp";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.blogIndex" });
    const title = t("title");
    const description = t("description");
    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

function MediaThumb({
    post,
    className,
    sizes = "(max-width: 1024px) 100vw, 33vw",
}: {
    post: BlogPostView;
    className?: string;
    sizes?: string;
}) {
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
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <Image
                    src={post.imageSrc}
                    alt={post.imageAlt}
                    fill
                    className="object-cover object-[center_58%] transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes={sizes}
                />
            )}
        </div>
    );
}

function FeaturedCard({ post, locale }: { post: BlogPostView; locale: string }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group relative grid w-full grid-cols-1 overflow-hidden border border-[#1F1D1B]/10 bg-[#EFE6DC] transition-colors duration-300 hover:border-[#AA7D69]/28 lg:min-h-[min(28rem,52vh)] lg:grid-cols-2 xl:min-h-[min(30rem,54vh)]"
        >
            <div className="relative z-[1] flex min-h-0 w-full flex-col items-start justify-center px-6 py-8 text-left md:px-10 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
                <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p
                        className="text-xs uppercase tracking-[0.26em] text-[#AA7D69]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {post.kicker}
                    </p>
                    <time
                        dateTime={post.publishedAt}
                        className="block text-[11px] tabular-nums text-[#222]/48"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {formatPostDate(post.publishedAt, locale)}
                    </time>
                </div>
                <h2
                    className="mb-5 max-w-xl text-balance font-serif leading-[1.05] text-[#222] transition-colors group-hover:text-[#AA7D69] lg:max-w-none"
                    style={{
                        fontSize: "clamp(2rem, 3.4vw, 3.15rem)",
                    }}
                >
                    {post.title}
                </h2>
                <p
                    className="mb-4 max-w-xl text-pretty text-sm leading-relaxed text-[#222]/70 md:text-[0.98rem]"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {post.intro}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                    {post.tags.map((t) => (
                        <span
                            key={t}
                            className="text-[10px] uppercase tracking-[0.22em] text-[#222]/45"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative w-full min-h-[min(56vw,280px)] sm:min-h-[300px] lg:min-h-0 lg:h-full">
                <MediaThumb
                    post={post}
                    className="absolute inset-0 h-full w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>
        </Link>
    );
}

function GridCard({ post, locale }: { post: BlogPostView; locale: string }) {
    return (
        <li>
            <Link
                href={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden border border-[#1F1D1B]/10 bg-[#EFE6DC] transition-colors duration-300 hover:border-[#AA7D69]/25"
            >
                <MediaThumb post={post} className="aspect-[4/3] shrink-0" />
                <div className="p-4 md:p-5 flex flex-col flex-1">
                    <h2
                        className="font-serif text-[#222] leading-snug group-hover:text-[#AA7D69] transition-colors mb-2"
                        style={{
                            fontSize: "clamp(1.2rem, 2.1vw, 1.85rem)",
                        }}
                    >
                        {post.title}
                    </h2>
                    <time
                        dateTime={post.publishedAt}
                        className="text-[10px] text-[#222]/45 mb-1.5 block tabular-nums"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {formatPostDate(post.publishedAt, locale)}
                    </time>
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/55 uppercase mb-2"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {post.kicker}
                    </p>
                    <p
                        className="text-[#222]/70 text-sm leading-relaxed text-pretty mb-3 flex-1 line-clamp-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {post.intro}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-x-2 gap-y-1">
                        {post.tags.map((t) => (
                            <span
                                key={t}
                                className="text-[9px] uppercase tracking-[0.18em] text-[#222]/50"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default async function BlogIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("blogPage");
    const posts = getAllPosts(locale);
    const [featured, ...rest] = posts;

    return (
        <>
            <Navbar locale={locale} />
            <main className="bg-[#F6F0E8] min-h-screen">
                <section className="relative flex min-h-[58svh] w-full items-end overflow-hidden bg-[#15120F] px-6 pt-24 pb-12 md:min-h-[62svh] md:px-10 md:pt-28 md:pb-16 lg:px-16">
                    <Image
                        src={BLOG_HERO_IMAGE_SRC}
                        alt=""
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-[#15120F]/18" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15120F]/70 via-[#15120F]/28 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#F6F0E8]/70 to-transparent" />

                    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col text-left">
                        <p
                            className="mb-5 text-xs tracking-[0.3em] text-[#FFF3E1] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h1
                            className="mb-6 max-w-[980px] text-[#FFF3E1] leading-[0.98]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3.1rem, 7vw, 7rem)",
                            }}
                        >
                            {t("title")}
                        </h1>
                        <p
                            className="max-w-[42rem] text-base leading-relaxed text-[#FFF3E1]/78 md:text-xl"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("subtitle")}
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
                    <ul className="flex flex-col gap-6 lg:hidden">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group relative block overflow-hidden border border-[#1F1D1B]/10 bg-[#EFE6DC] transition-colors duration-300 hover:border-[#AA7D69]/24"
                                >
                                    <MediaThumb post={post} className="aspect-[16/10]" />
                                    <div className="p-4 md:p-6">
                                        <h2
                                            className="font-serif text-[#222] leading-tight group-hover:text-[#AA7D69] transition-colors mb-2"
                                            style={{
                                                fontSize: "clamp(1.1rem, 1.9vw, 1.75rem)",
                                            }}
                                        >
                                            {post.title}
                                        </h2>
                                        <time
                                            dateTime={post.publishedAt}
                                            className="text-[11px] text-[#222]/45 mb-2 block tabular-nums"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {formatPostDate(post.publishedAt, locale)}
                                        </time>
                                        <p
                                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/55 uppercase mb-3"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {post.kicker}
                                        </p>
                                        <p
                                            className="text-[#222]/70 text-sm leading-relaxed text-pretty mb-4"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {post.intro}
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
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden lg:block">
                        <FeaturedCard post={featured} locale={locale} />
                        <ul className="mt-14 xl:mt-16 grid grid-cols-3 gap-8 xl:gap-10">
                            {rest.map((post) => (
                                <GridCard key={post.slug} post={post} locale={locale} />
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
