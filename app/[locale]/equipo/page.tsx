import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroEquipo from "@/components/equipo/HeroEquipo";
import DetailsEquipo from "@/components/equipo/DetailsEquipo";
import EquipoNavigationBanner from "@/components/equipo/EquipoNavigationBanner";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function EquipoPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroEquipo />
                <DetailsEquipo />
                <EquipoNavigationBanner />
            </main>
            <Footer />
        </>
    );
}
