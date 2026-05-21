import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
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

            <main className="min-h-screen bg-[#FFF8ED] px-6 pt-28 pb-20 text-[#1C1713] md:px-10 md:pt-32 lg:px-16 lg:pt-36 lg:pb-24">
                <div className="mx-auto max-w-[1400px]">
                    <section className="grid gap-10 border-b border-[#1C1713]/10 pb-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.58fr)] lg:items-end lg:gap-14 lg:pb-14">
                        <div>
                            <p
                                className="mb-5 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("kicker")}
                            </p>
                            <h1
                                className="mb-6 max-w-[820px] leading-[0.96] text-[#1C1713]"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(3rem, 6vw, 6rem)",
                                }}
                            >
                                {t("title")}
                            </h1>
                            <p
                                className="max-w-[760px] text-base leading-relaxed text-[#1C1713]/78 md:text-xl"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("intro")}
                            </p>
                        </div>

                        <div className="relative min-h-[260px] overflow-hidden border border-[#1C1713]/10 bg-[#EDE5DA] shadow-[0_24px_48px_rgba(47,39,33,0.1)] md:min-h-[330px] lg:min-h-[390px]">
                            <Image
                                src="/babylon/guia.webp"
                                alt={t("heroImageAlt")}
                                fill
                                priority
                                sizes="(min-width: 1024px) 34vw, 100vw"
                                className="object-cover"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1C1713]/25 to-transparent" />
                        </div>
                    </section>

                    <div className="pt-8 md:pt-10 lg:pt-12">
                        <PurchaseGuideArticle
                            locale={locale}
                            chrome={{
                                disclaimerTitle: t("disclaimerTitle"),
                                disclaimerLead: t("disclaimerLead"),
                            }}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
