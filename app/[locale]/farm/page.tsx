import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroFarm from "@/components/farm/HeroFarm";
import SustentabilidadFarm from "@/components/farm/SustentabilidadFarm";
import TrabajoFloresFarm from "@/components/farm/TrabajoFloresFarm";
import PaseosHuertosFarm from "@/components/farm/PaseosHuertosFarm";
import ProductsFarm from "@/components/farm/ProductsFarm";
import Exclusivity from "@/components/Exclusivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function FarmPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroFarm />
                <SustentabilidadFarm />
                <ProductsFarm />
                <TrabajoFloresFarm />
                <PaseosHuertosFarm />
                <Exclusivity />
                <Contact />
            </main>
            <Footer />
        </>
    );
}