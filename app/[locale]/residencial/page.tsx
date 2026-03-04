import { setRequestLocale } from "next-intl/server";
import NavbarV5 from "@/components/v5/NavbarV5";
import HeroResidencial from "@/components/residencial/HeroResidencial";
import FeaturesResidencial from "@/components/residencial/FeaturesResidencial";
import AmenitiesResidencial from "@/components/residencial/AmenitiesResidencial";
import FooterV5 from "@/components/v5/FooterV5";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ResidencialPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <NavbarV5 locale={locale} />
            <main>
                <HeroResidencial />
                <FeaturesResidencial />
                <AmenitiesResidencial />
            </main>
            <FooterV5 />
        </>
    );
}