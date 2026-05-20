"use client";

import { motion } from "motion/react";
import {
    CircleParking,
    DoorOpen,
    KeyRound,
    Leaf,
    type LucideIcon,
    Route,
    ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const detailItems = [
    { key: "parkingCircuit", icon: CircleParking },
    { key: "pedestrianPaths", icon: Route },
    { key: "rentalModel", icon: KeyRound },
    { key: "partialRental", icon: DoorOpen },
    { key: "maintenance", icon: ShieldCheck },
    { key: "outdoorLiving", icon: Leaf },
] as const;

function DetailCard({
    Icon,
    title,
    body,
    className,
}: {
    Icon: LucideIcon;
    title: string;
    body: string;
    className?: string;
}) {
    return (
        <div
            className={`group flex min-h-[220px] min-w-0 flex-col border border-[#2f2721]/10 bg-[#fff8ed]/82 p-5 transition-colors duration-300 hover:bg-[#fffaf1] lg:min-h-[224px] lg:border-0 ${
                className ?? ""
            }`}
        >
            <span className="flex h-10 w-10 items-center justify-center border border-[#b76d4b]/24 bg-[#f2e4d8] text-[#8d5639] transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon className="h-5 w-5 stroke-[1.45]" aria-hidden />
            </span>
            <div className="min-w-0 pt-4">
                <h3
                    className="text-[17px] leading-tight text-[#2f2721]"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {title}
                </h3>
                <p
                    className="mt-2 text-pretty text-[13px] leading-[1.55] text-[#1F1D1B]/66"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {body}
                </p>
            </div>
        </div>
    );
}

export default function ResidentialDetailsHighlight() {
    const t = useTranslations("pages.residencial.overview");

    return (
        <div
            id="club-residencial-detalles"
            aria-labelledby="club-residencial-detalles-heading"
            className="mt-8 overflow-hidden text-[#1F1D1B] lg:relative lg:left-1/2 lg:w-[calc(100vw-4rem)] lg:-translate-x-1/2 xl:w-[calc(100vw-6rem)]"
        >
            <h2 id="club-residencial-detalles-heading" className="sr-only">
                {t("titleLine1")} {t("titleAccent")}
            </h2>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="min-w-0"
            >
                <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full lg:hidden"
                    aria-label={`${t("titleLine1")} ${t("titleAccent")}`}
                >
                    <CarouselContent className="-ml-0">
                        {detailItems.map(({ key, icon: Icon }) => (
                            <CarouselItem key={key} className="basis-full pl-0">
                                <DetailCard
                                    Icon={Icon}
                                    title={t(`items.${key}.title`)}
                                    body={t(`items.${key}.body`)}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <CarouselPrevious className="static h-9 w-9 translate-x-0 translate-y-0 border-[#b76d4b]/24 bg-[#f2e4d8] text-[#8d5639] hover:bg-[#ead8ca] disabled:text-[#8d5639]/35" />
                        <CarouselNext className="static h-9 w-9 translate-x-0 translate-y-0 border-[#b76d4b]/24 bg-[#f2e4d8] text-[#8d5639] hover:bg-[#ead8ca] disabled:text-[#8d5639]/35" />
                    </div>
                </Carousel>

                <div className="hidden overflow-hidden border border-[#2f2721]/10 bg-[#2f2721]/10 lg:grid lg:grid-cols-3 lg:gap-px xl:grid-cols-6">
                    {detailItems.map(({ key, icon: Icon }) => (
                        <DetailCard
                            key={key}
                            Icon={Icon}
                            title={t(`items.${key}.title`)}
                            body={t(`items.${key}.body`)}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
