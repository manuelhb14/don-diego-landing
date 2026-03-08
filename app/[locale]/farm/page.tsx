import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroFarm from "@/components/farm/HeroFarm";
import SustentabilidadFarm from "@/components/farm/SustentabilidadFarm";
import ProductsFarm from "@/components/farm/ProductsFarm";
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
            </main>
            <Footer />
        </>
    );
}