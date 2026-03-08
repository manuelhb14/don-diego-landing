import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroWellness from "@/components/wellness/HeroWellness";
import HighlightsWellness from "@/components/wellness/HighlightsWellness";
import ServicesWellness from "@/components/wellness/ServicesWellness";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function WellnessCenterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar theme="dark" locale={locale} />
            <main>
                <HeroWellness />
                <HighlightsWellness />
                <ServicesWellness />
            </main>
            <Footer />
        </>
    );
}