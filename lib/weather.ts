export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "thunderstorm"
  | "windy"
  | "unknown";

type OpenMeteoForecast = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    time?: string;
  };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
};

export type WeatherResponse = {
  place: "San Miguel de Allende";
  units: { temp: "C"; wind: "km/h" };
  tempC: number | null;
  hiC: number | null;
  lowC: number | null;
  windKph: number | null;
  code: number | null;
  condition: WeatherCondition;
  updatedAt: string | null;
};

const SMA = {
  lat: 20.9153,
  lon: -100.7439,
  tz: "America/Mexico_City",
} as const;

const EMPTY_WEATHER: WeatherResponse = {
  place: "San Miguel de Allende",
  units: { temp: "C", wind: "km/h" },
  tempC: null,
  hiC: null,
  lowC: null,
  windKph: null,
  code: null,
  condition: "unknown",
  updatedAt: null,
};

export function conditionFromWeatherCode(code: number | null, windKph: number | null): WeatherCondition {
  if (windKph !== null && windKph >= 32 && (code === 0 || code === 1 || code === 2)) return "windy";
  if (code === null) return "unknown";
  if (code === 0 || code === 1) return "clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if ((code >= 51 && code <= 57) || (code >= 80 && code <= 82)) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "rain";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "unknown";
}

export async function getSanMiguelWeather(): Promise<WeatherResponse> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(SMA.lat));
  url.searchParams.set("longitude", String(SMA.lon));
  url.searchParams.set("timezone", SMA.tz);
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 30 },
      headers: { accept: "application/json" },
    });

    if (!res.ok) return EMPTY_WEATHER;

    const data = (await res.json()) as OpenMeteoForecast;
    const code = data.current?.weather_code ?? null;
    const windKph = data.current?.wind_speed_10m ?? null;

    return {
      place: "San Miguel de Allende",
      units: { temp: "C", wind: "km/h" },
      tempC: data.current?.temperature_2m ?? null,
      hiC: data.daily?.temperature_2m_max?.[0] ?? null,
      lowC: data.daily?.temperature_2m_min?.[0] ?? null,
      windKph,
      code,
      condition: conditionFromWeatherCode(code, windKph),
      updatedAt: data.current?.time ?? null,
    };
  } catch {
    return EMPTY_WEATHER;
  }
}
