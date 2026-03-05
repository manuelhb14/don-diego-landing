import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroResidencial from "@/components/residencial/HeroResidencial";
import FeaturesResidencial from "@/components/residencial/FeaturesResidencial";
import AmenitiesResidencial from "@/components/residencial/AmenitiesResidencial";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ResidencialPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} />
            <main>
                <HeroResidencial />
                <FeaturesResidencial />
                <AmenitiesResidencial />
            </main>
            <Footer />
        </>
    );
}