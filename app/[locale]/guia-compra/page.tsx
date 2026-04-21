import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PurchaseGuideArticle from "@/components/purchase-guide/PurchaseGuideArticle";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.purchaseGuide" });
    const title = t("title");
    const description = t("description");
    return { title, description, openGraph: { title, description } };
}

export default async function GuiaCompraPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("pages.purchaseGuide");

    return (
        <>
            <Navbar locale={locale} theme="dark" />

            <main className="bg-[#FFF3E1] min-h-screen pt-32 pb-24 px-6 lg:px-12 text-[#222222]">
                <div className="max-w-4xl xl:max-w-6xl mx-auto">
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#222222]/45 uppercase mb-4 font-sans"
                    >
                        {t("kicker")}
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl mb-6">{t("title")}</h1>
                    <p className="font-sans font-light text-base md:text-lg leading-relaxed mb-12 opacity-90 max-w-3xl">
                        {t("intro")}
                    </p>
                    <PurchaseGuideArticle
                        locale={locale}
                        chrome={{
                            disclaimerTitle: t("disclaimerTitle"),
                            disclaimerLead: t("disclaimerLead"),
                        }}
                    />
                </div>
            </main>

            <Footer />
        </>
    );
}
