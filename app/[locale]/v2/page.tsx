import { setRequestLocale } from "next-intl/server";
import NavbarV2 from "@/components/v2/NavbarV2";
import HeroV2 from "@/components/v2/HeroV2";
import ManifestoV2 from "@/components/v2/ManifestoV2";
import ProjectsV2 from "@/components/v2/ProjectsV2";
import GalleryV2 from "@/components/v2/GalleryV2";
import LocationV2 from "@/components/v2/LocationV2";
import TeamV2 from "@/components/v2/TeamV2";
import ContactV2 from "@/components/v2/ContactV2";
import FooterV2 from "@/components/v2/FooterV2";
import StatsV3 from "@/components/v3/StatsV3";
type Props = {
    params: Promise<{ locale: string }>;
};

export default async function V2Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <NavbarV2 locale={locale} />
            <main>
                <HeroV2 />
                <ManifestoV2 />
                <ProjectsV2 />
                <GalleryV2 />
                <TeamV2 />
                <LocationV2 />
                <StatsV3 />
                <ContactV2 />
            </main>
            <FooterV2 />
        </>
    );
}
