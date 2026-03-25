import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsOfServiceArticle from "@/components/legal/TermsOfServiceArticle";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const title =
        locale === "en" ? "Terms of Service | Don Diego" : "Términos de Servicio | Don Diego";
    const description =
        locale === "en"
            ? "Terms governing your use of the Don Diego website and services."
            : "Términos que rigen el uso del sitio web y los servicios de Don Diego.";
    return { title, description, openGraph: { title, description } };
}

export default async function TerminosPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("legal");

    return (
        <>
            <Navbar locale={locale} theme="dark" />

            <main className="bg-[#FFF3E1] min-h-screen pt-32 pb-24 px-6 lg:px-12 text-[#222222]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl mb-12">{t("termsTitle")}</h1>
                    <TermsOfServiceArticle locale={locale} />
                </div>
            </main>

            <Footer />
        </>
    );
}
