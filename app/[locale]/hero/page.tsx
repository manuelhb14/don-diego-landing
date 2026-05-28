import { setRequestLocale } from "next-intl/server";
import HeroAssetWorkbench from "@/components/hero/HeroAssetWorkbench";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HeroPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <HeroAssetWorkbench />;
}
