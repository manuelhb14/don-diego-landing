"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface CompareSliderProps {
  originalUrl: string;
  generatedUrl: string;
  className?: string;
}

export function CompareSlider({ originalUrl, generatedUrl, className }: CompareSliderProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl border shadow-lg ${className || ""}`}>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={originalUrl} alt="Original" />}
        itemTwo={<ReactCompareSliderImage src={generatedUrl} alt="Virtual staging" />}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
