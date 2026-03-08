import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroPresa from "@/components/presa/HeroPresa";
import ConceptPresa from "@/components/presa/ConceptPresa";
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
            </main>
            <Footer />
        </>
    );
}