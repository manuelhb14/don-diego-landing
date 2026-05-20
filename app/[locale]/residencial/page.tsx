import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroResidencial from "@/components/residencial/HeroResidencial";
import FeaturesResidencial from "@/components/residencial/FeaturesResidencial";
import AmenitiesResidencial from "@/components/residencial/AmenitiesResidencial";
import ClubAccessResidencial from "@/components/residencial/ClubAccessResidencial";
import RentalsPoolResidencial from "@/components/residencial/RentalsPoolResidencial";
import ConnectivityCommonAreasResidencial from "@/components/residencial/ConnectivityCommonAreasResidencial";
import SustentabilidadResidencial from "@/components/residencial/SustentabilidadResidencial";
import Exclusivity from "@/components/Exclusivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ResidencialPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar theme="dark" locale={locale} />
            <main>
                <HeroResidencial />
                <AmenitiesResidencial />
                <ClubAccessResidencial />
                <FeaturesResidencial />
                <RentalsPoolResidencial />
                <ConnectivityCommonAreasResidencial />
                <SustentabilidadResidencial />
                <Exclusivity />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
