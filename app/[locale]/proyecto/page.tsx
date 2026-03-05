import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroProyecto from "@/components/proyecto/HeroProyecto";
import ManifestoProyecto from "@/components/proyecto/ManifestoProyecto";
import GridProyecto from "@/components/proyecto/GridProyecto";
import LocationSummaryProyecto from "@/components/proyecto/LocationSummaryProyecto";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ProyectoPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroProyecto />
                {/* <ManifestoProyecto /> */}
                <GridProyecto />
                <LocationSummaryProyecto />
            </main>
            <Footer />
        </>
    );
}
