import { setRequestLocale } from "next-intl/server";
import NavbarV5 from "@/components/v5/NavbarV5";
import LoadingV5 from "@/components/v5/LoadingV5";
import HeroV5 from "@/components/v5/HeroV5";
import ManifestoV5 from "@/components/v5/ManifestoV5";
import ProjectsV5 from "@/components/v5/ProjectsV5";
import GalleryV5 from "@/components/v5/GalleryV5";
import LocationV5 from "@/components/v5/LocationV5";
import ServicesV5 from "@/components/v5/ServicesV5";
import TeamV5 from "@/components/v5/TeamV5";
import ContactV5 from "@/components/v5/ContactV5";
import FooterV5 from "@/components/v5/FooterV5";
import StatsV5 from "@/components/v5/StatsV5";
type Props = {
    params: Promise<{ locale: string }>;
};

export default async function V5Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            {/* <LoadingV5 /> */}
            <NavbarV5 locale={locale} />
            <main>
                <HeroV5 />
                <ManifestoV5 />
                <ServicesV5 />
                <ProjectsV5 />
                <LocationV5 />
                <GalleryV5 />
                <TeamV5 />
                <ContactV5 />
            </main>
            <FooterV5 />
        </>
    );
}
