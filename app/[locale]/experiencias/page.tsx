import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroExperiencias from "@/components/experiencias/HeroExperiencias";
import ExperienciasListing from "@/components/experiencias/ExperienciasListing";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ExperienciasPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroExperiencias />
                <ExperienciasListing />
            </main>
            <Footer />
        </>
    );
}
