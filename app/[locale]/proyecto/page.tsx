import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroProyecto from "@/components/proyecto/HeroProyecto";
import GridProyecto from "@/components/proyecto/GridProyecto";
import LocationSummaryProyecto from "@/components/proyecto/LocationSummaryProyecto";
import Footer from "@/components/Footer";
import ThingsToDo from "@/components/ThingsToDo";
import Exclusivity from "@/components/Exclusivity";
import Contact from "@/components/Contact";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ProyectoPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} />
            <main>
                <HeroProyecto />
                <GridProyecto />
                <LocationSummaryProyecto />
                <ThingsToDo />
                <Exclusivity />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
