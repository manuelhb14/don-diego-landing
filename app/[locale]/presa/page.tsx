import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroPresa from "@/components/presa/HeroPresa";
import ConceptPresa from "@/components/presa/ConceptPresa";
import AreasPresa from "@/components/presa/AreasPresa";
import Exclusivity from "@/components/Exclusivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function PresaPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark"/>
            <main>
                <HeroPresa />
                <ConceptPresa />
                <AreasPresa />
                <Exclusivity />
                <Contact />
            </main>
            <Footer />
        </>
    );
}