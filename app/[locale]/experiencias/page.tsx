import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroExperiencias from "@/components/experiencias/HeroExperiencias";
import ExperienciasListing from "@/components/experiencias/ExperienciasListing";
import Footer from "@/components/Footer";
import Exclusivity from "@/components/Exclusivity";
import Contact from "@/components/Contact";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.experiencias" });
    const title = t("title");
    const description = t("description");
    return { title, description, openGraph: { title, description } };
}

export default async function ExperienciasPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroExperiencias />
                <ExperienciasListing />
                <Exclusivity />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
