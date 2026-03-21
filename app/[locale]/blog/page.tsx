import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { formatPostDate, getAllPosts, isVideoSrc, type BlogPost } from "@/content/blogPosts";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const title =
        locale === "en"
            ? "Stories & Experiences | Don Diego"
            : "Historias y Experiencias | Don Diego";
    return {
        title,
        description:
            "Un cuaderno visual con momentos del entorno, las caminatas y lo cotidiano en Don Diego.",
        openGraph: {
            title,
            description:
                "Un cuaderno visual con momentos del entorno, las caminatas y lo cotidiano en Don Diego.",
        },
    };
}

function MediaThumb({
    post,
    className,
    sizes = "(max-width: 1024px) 100vw, 33vw",
}: {
    post: BlogPost;
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

function FeaturedCard({ post, locale }: { post: BlogPost; locale: string }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group grid w-full grid-cols-1 lg:grid-cols-2 lg:min-h-[min(28rem,52vh)] xl:min-h-[min(30rem,54vh)] relative overflow-hidden rounded-sm border border-[#222]/[0.06] bg-[#EFE6DC] transition-all duration-300 hover:border-[#AA7D69]/25 hover:shadow-[0_24px_48px_-24px_rgba(34,34,34,0.18)]"
        >
            <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-[#AA7D69] to-[#E1B19B] pointer-events-none" />

            {/* Text — left on desktop; stacked first on mobile */}
            <div className="relative z-[1] flex w-full flex-col justify-center px-6 py-8 text-center md:px-10 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14 lg:text-left lg:items-start items-center min-h-0">
                <h2
                    className="font-serif text-[#222] leading-[1.1] text-balance group-hover:text-[#AA7D69] transition-colors max-w-xl lg:max-w-none mb-4"
                    style={{
                        fontSize: "clamp(1.75rem, 3.2vw, 2.85rem)",
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
                    className="text-[10px] tracking-[0.35em] text-[#AA7D69]/65 uppercase mb-4"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {post.kicker}
                </p>
                <p
                    className="mb-4 max-w-xl text-[#222]/70 text-sm md:text-[0.95rem] leading-relaxed lg:text-left text-center text-pretty"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {post.intro}
                </p>
                <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2">
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

            {/* Media — right on desktop; below text on mobile */}
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

function GridCard({ post, locale }: { post: BlogPost; locale: string }) {
    return (
        <li>
            <Link
                href={`/blog/${post.slug}`}
                className="group block relative overflow-hidden rounded-sm border border-[#222]/[0.06] bg-[#EFE6DC] transition-all duration-300 hover:border-[#AA7D69]/20 hover:brightness-[1.02] h-full flex flex-col"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#AA7D69] to-[#E1B19B]" />
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
    const posts = getAllPosts();
    const [featured, ...rest] = posts;

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main className="bg-[#F6F0E8] min-h-screen">
                <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 pt-28 pb-16 md:pb-24">
                    <header className="mb-10 lg:mb-14 text-center lg:text-left">
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [Blog]
                        </p>
                        <h1
                            className="text-[#222] leading-none mb-6"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.25rem, 4.6vw, 4rem)",
                            }}
                        >
                            Historias & Experiencias
                        </h1>
                        <p
                            className="text-[#222]/55 text-sm md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Un cuaderno visual con momentos del entorno, las caminatas y lo cotidiano en
                            Don Diego.
                        </p>
                    </header>

                    {/* Mobile & tablet: linear stack — same card weight */}
                    <ul className="flex flex-col gap-6 lg:hidden">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group block relative overflow-hidden rounded-sm border border-[#222]/[0.06] bg-[#EFE6DC] transition-all duration-300 hover:border-[#AA7D69]/20 hover:brightness-[1.02]"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#AA7D69] to-[#E1B19B]" />
                                    <MediaThumb post={post} className="aspect-[2/1]" />
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

                    {/* Desktop: hero (same width as grid) + 3-column grid */}
                    <div className="hidden lg:block">
                        <FeaturedCard post={featured} locale={locale} />
                        <ul className="mt-14 xl:mt-16 grid grid-cols-3 gap-8 xl:gap-10">
                            {rest.map((post) => (
                                <GridCard key={post.slug} post={post} locale={locale} />
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
