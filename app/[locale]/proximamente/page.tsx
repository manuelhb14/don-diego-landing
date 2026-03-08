import { setRequestLocale } from "next-intl/server";
import ComingSoon from "@/components/ComingSoon";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ProximamentePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <ComingSoon />
    );
}
