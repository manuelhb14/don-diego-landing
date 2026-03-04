import { setRequestLocale } from "next-intl/server";
import NavbarV4 from "@/components/v4/NavbarV4";
import HeroV4 from "@/components/v4/HeroV4";
import ManifestoV4 from "@/components/v4/ManifestoV4";
import ProjectsV4 from "@/components/v4/ProjectsV4";
import GalleryV4 from "@/components/v4/GalleryV4";
import LocationV4 from "@/components/v4/LocationV4";
import TeamV4 from "@/components/v4/TeamV4";
import ContactV4 from "@/components/v4/ContactV4";
import FooterV4 from "@/components/v4/FooterV4";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function V4Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <NavbarV4 locale={locale} />
            <main>
                <HeroV4 />
                <ManifestoV4 />
                <ProjectsV4 />
                <GalleryV4 />
                <LocationV4 />
                <TeamV4 />
                <ContactV4 />
            </main>
            <FooterV4 />
        </>
    );
}
