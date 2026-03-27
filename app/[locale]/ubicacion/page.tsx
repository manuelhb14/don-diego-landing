import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroUbicacion from "@/components/ubicacion/HeroUbicacion";
import LocationMexicoUbicacion from "@/components/ubicacion/LocationMexicoUbicacion";
import GridUbicacion from "@/components/ubicacion/GridUbicacion";
import FeaturedBlogUbicacion from "@/components/ubicacion/FeaturedBlogUbicacion";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import { getPostBySlug, type BlogPostView } from "@/content/blogPosts";

const UBICACION_FEATURED_BLOG_SLUGS = [
    "guia-san-miguel-allende-2026",
    "mejor-ciudad-pequena",
] as const;

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function UbicacionPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const featuredBlogPosts = UBICACION_FEATURED_BLOG_SLUGS.map((slug) =>
        getPostBySlug(slug, locale),
    ).filter((p): p is BlogPostView => p != null);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroUbicacion />
                <LocationMexicoUbicacion />
                <Location />
                {featuredBlogPosts.length > 0 ? (
                    <FeaturedBlogUbicacion posts={featuredBlogPosts} locale={locale} />
                ) : null}
                <GridUbicacion />
            </main>
            <Footer />
        </>
    );
}
