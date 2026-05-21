"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import {
    CircleHelp,
    Cloud,
    CloudDrizzle,
    CloudFog,
    CloudLightning,
    CloudRain,
    CloudSun,
    Sun,
    Wind,
    type LucideIcon,
} from "lucide-react";
import type { WeatherCondition, WeatherResponse } from "@/lib/weather";

type HeroWeatherWidgetProps = {
    initialWeather?: WeatherResponse;
};

const CONDITION_ICONS: Record<WeatherCondition, LucideIcon> = {
    clear: Sun,
    "partly-cloudy": CloudSun,
    cloudy: Cloud,
    fog: CloudFog,
    drizzle: CloudDrizzle,
    rain: CloudRain,
    thunderstorm: CloudLightning,
    windy: Wind,
    unknown: CircleHelp,
};

const CONDITION_LABELS: Record<"en" | "es", Record<WeatherCondition, string>> = {
    en: {
        clear: "Clear",
        "partly-cloudy": "Partly cloudy",
        cloudy: "Cloudy",
        fog: "Fog",
        drizzle: "Drizzle",
        rain: "Rain",
        thunderstorm: "Storm",
        windy: "Windy",
        unknown: "Weather",
    },
    es: {
        clear: "Despejado",
        "partly-cloudy": "Parcialmente nublado",
        cloudy: "Nublado",
        fog: "Neblina",
        drizzle: "Llovizna",
        rain: "Lluvia",
        thunderstorm: "Tormenta",
        windy: "Viento",
        unknown: "Clima",
    },
};

export default function HeroWeatherWidget({ initialWeather }: HeroWeatherWidgetProps) {
    const locale = useLocale();
    const labels = locale === "es" ? CONDITION_LABELS.es : CONDITION_LABELS.en;
    const [weather, setWeather] = useState<WeatherResponse | undefined>(initialWeather);

    useEffect(() => {
        let ignore = false;

        async function loadWeather() {
            try {
                const res = await fetch("/api/weather", { cache: "no-store" });
                if (!res.ok) return;
                const data = (await res.json()) as WeatherResponse;
                if (!ignore) setWeather(data);
            } catch {
                // Keep the server-rendered weather if the client refresh fails.
            }
        }

        loadWeather();

        return () => {
            ignore = true;
        };
    }, []);

    const condition = weather?.condition ?? "unknown";
    const WeatherIcon = CONDITION_ICONS[condition];
    const temp = typeof weather?.tempC === "number" ? `${Math.round(weather.tempC)}°C` : "--°C";
    const conditionLabel = labels[condition];
    const ariaPrefix = locale === "es" ? "Clima en San Miguel" : "San Miguel weather";
    const ariaLabel = useMemo(
        () => `${ariaPrefix}: ${temp}, ${conditionLabel}`,
        [ariaPrefix, conditionLabel, temp],
    );

    return (
        <aside
            className="absolute bottom-4 right-4 z-10 flex origin-bottom-right scale-90 items-center gap-2 text-[#FFF3E1] opacity-85 drop-shadow-[0_4px_18px_rgba(0,0,0,0.42)] sm:bottom-6 sm:right-6 sm:scale-100 sm:gap-3 sm:opacity-100 lg:bottom-10 lg:right-10"
            aria-label={ariaLabel}
        >
            <WeatherIcon className="h-5 w-5 sm:h-10 sm:w-10" strokeWidth={1.6} aria-hidden />
            <span className="grid gap-0.5 text-right">
                <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#FFF3E1]/70 sm:text-[10px] sm:tracking-[0.18em]">
                    San Miguel
                </span>
                <span className="text-sm font-medium leading-none sm:text-2xl">{temp}</span>
            </span>
        </aside>
    );
}
