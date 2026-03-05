import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroUbicacion from "@/components/ubicacion/HeroUbicacion";
import Location from "@/components/Location";
import GridUbicacion from "@/components/ubicacion/GridUbicacion";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function UbicacionPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroUbicacion />
                <Location />
                <GridUbicacion />
            </main>
            <Footer />
        </>
    );
}
