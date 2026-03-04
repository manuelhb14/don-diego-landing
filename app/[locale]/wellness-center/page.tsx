import { setRequestLocale } from "next-intl/server";
import NavbarV5 from "@/components/v5/NavbarV5";
import HeroWellness from "@/components/wellness/HeroWellness";
import HighlightsWellness from "@/components/wellness/HighlightsWellness";
import ServicesWellness from "@/components/wellness/ServicesWellness";
import FooterV5 from "@/components/v5/FooterV5";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function WellnessCenterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <NavbarV5 locale={locale} />
            <main>
                <HeroWellness />
                <HighlightsWellness />
                <ServicesWellness />
            </main>
            <FooterV5 />
        </>
    );
}