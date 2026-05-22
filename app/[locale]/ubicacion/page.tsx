import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import UbicacionEditorialPage from "@/components/ubicacion/UbicacionEditorialPage";
import Contact from "@/components/Contact";
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
            <UbicacionEditorialPage />
            <Contact />
            <Footer />
        </>
    );
}
