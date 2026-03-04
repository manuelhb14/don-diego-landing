import { setRequestLocale } from "next-intl/server";
import NavbarV3 from "@/components/v3/NavbarV3";
import HeroV3 from "@/components/v3/HeroV3";
import ManifestoV3 from "@/components/v3/ManifestoV3";
import ProjectsV3 from "@/components/v3/ProjectsV3";
import GalleryV3 from "@/components/v3/GalleryV3";
import LocationV3 from "@/components/v3/LocationV3";
import TeamV3 from "@/components/v3/TeamV3";
import ContactV3 from "@/components/v3/ContactV3";
import FooterV3 from "@/components/v3/FooterV3";
import StatsV3 from "@/components/v3/StatsV3";
type Props = {
    params: Promise<{ locale: string }>;
};

export default async function V3Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <NavbarV3 locale={locale} />
            <main>
                <HeroV3 />
                <ManifestoV3 />
                <LocationV3 />
                <StatsV3 />
                <ProjectsV3 />
                <GalleryV3 />
                <TeamV3 />
                <ContactV3 />
            </main>
            <FooterV3 />
        </>
    );
}
