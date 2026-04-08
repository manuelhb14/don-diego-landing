"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { useTranslations } from "next-intl";

interface CompareSliderProps {
  originalUrl: string;
  generatedUrl: string;
  className?: string;
}

export function CompareSlider({ originalUrl, generatedUrl, className }: CompareSliderProps) {
  const t = useTranslations("components.virtualStaging.compareSlider");

  return (
    <div className={`relative overflow-hidden rounded-xl border shadow-lg ${className || ""}`}>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={originalUrl} alt={t("originalAlt")} />}
        itemTwo={<ReactCompareSliderImage src={generatedUrl} alt={t("generatedAlt")} />}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
