"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FINANCING_PRESETS,
  type FinancingMarket,
  computeFinancingBreakdown,
} from "@/lib/mortgage-calculator";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function parseNumber(raw: string, fallback: number): number {
  const t = raw.trim().replace(",", ".");
  if (t === "") return fallback;
  const n = Number(t);
  return Number.isFinite(n) ? n : fallback;
}

export default function MortgageCalculator() {
  const t = useTranslations("pages.calculadora");
  const [market, setMarket] = useState<FinancingMarket>("mx");
  const preset = FINANCING_PRESETS[market];

  const [propertyPrice, setPropertyPrice] = useState(preset.defaultPropertyPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(preset.defaultDownPaymentPercent);
  const [annualRatePercent, setAnnualRatePercent] = useState(preset.defaultAnnualRatePercent);
  const [termYears, setTermYears] = useState(preset.defaultTermYears);

  const applyPreset = useCallback((m: FinancingMarket) => {
    const p = FINANCING_PRESETS[m];
    setMarket(m);
    setPropertyPrice(p.defaultPropertyPrice);
    setDownPaymentPercent(p.defaultDownPaymentPercent);
    setAnnualRatePercent(p.defaultAnnualRatePercent);
    setTermYears(p.defaultTermYears);
  }, []);

  const breakdown = useMemo(
    () =>
      computeFinancingBreakdown({
        propertyPrice,
        downPaymentPercent,
        annualRatePercent,
        termYears,
      }),
    [propertyPrice, downPaymentPercent, annualRatePercent, termYears],
  );

  const currencyFmt = useMemo(
    () =>
      new Intl.NumberFormat(preset.numberLocale, {
        style: "currency",
        currency: preset.currency,
        maximumFractionDigits: 0,
      }),
    [preset.currency, preset.numberLocale],
  );

  const currencyFmtFine = useMemo(
    () =>
      new Intl.NumberFormat(preset.numberLocale, {
        style: "currency",
        currency: preset.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [preset.currency, preset.numberLocale],
  );

  return (
    <section className="bg-[#FFF3E1] pt-8 pb-16 md:pt-12 md:pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[960px] mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm font-sans text-[#222222]/80 tracking-wide">{t("marketLabel")}</p>
          <div
            className="inline-flex rounded-lg border border-[#222222]/15 bg-[#fff8ed] p-1 self-start sm:self-auto"
            role="group"
            aria-label={t("marketLabel")}
          >
            <button
              type="button"
              onClick={() => applyPreset("mx")}
              className={`rounded-md px-4 py-2 text-xs font-sans tracking-widest uppercase transition-colors ${
                market === "mx"
                  ? "bg-[#222222] text-[#fff8ed]"
                  : "text-[#222222]/70 hover:text-[#222222]"
              }`}
            >
              {t("marketMx")}
            </button>
            <button
              type="button"
              onClick={() => applyPreset("us")}
              className={`rounded-md px-4 py-2 text-xs font-sans tracking-widest uppercase transition-colors ${
                market === "us"
                  ? "bg-[#222222] text-[#fff8ed]"
                  : "text-[#222222]/70 hover:text-[#222222]"
              }`}
            >
              {t("marketUs")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <Card className="border-[#222222]/10 bg-[#fff8ed]/90 shadow-sm">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[#222222] font-sans text-xs tracking-widest uppercase">
                  {t("propertyPriceLabel")}
                </Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step={1000}
                  value={Number.isFinite(propertyPrice) ? propertyPrice : ""}
                  onChange={(e) => setPropertyPrice(Math.max(0, parseNumber(e.target.value, 0)))}
                  className="border-[#222222]/20 bg-white/80 font-sans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="down" className="text-[#222222] font-sans text-xs tracking-widest uppercase">
                  {t("downPaymentPercentLabel")}
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="down"
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(e) =>
                      setDownPaymentPercent(clamp(parseNumber(e.target.value, downPaymentPercent), 0, 100))
                    }
                    className="border-[#222222]/20 bg-white/80 font-sans max-w-[120px]"
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="flex-1 accent-[#AA7D69]"
                    aria-label={t("downPaymentPercentLabel")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate" className="text-[#222222] font-sans text-xs tracking-widest uppercase">
                  {t("annualRateLabel")}
                </Label>
                <Input
                  id="rate"
                  type="number"
                  min={0}
                  step={0.05}
                  value={annualRatePercent}
                  onChange={(e) =>
                    setAnnualRatePercent(Math.max(0, parseNumber(e.target.value, annualRatePercent)))
                  }
                  className="border-[#222222]/20 bg-white/80 font-sans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="years" className="text-[#222222] font-sans text-xs tracking-widest uppercase">
                  {t("termYearsLabel")}
                </Label>
                <Input
                  id="years"
                  type="number"
                  min={1}
                  max={50}
                  step={1}
                  value={termYears}
                  onChange={(e) =>
                    setTermYears(clamp(Math.round(parseNumber(e.target.value, termYears)), 1, 50))
                  }
                  className="border-[#222222]/20 bg-white/80 font-sans"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#222222]/10 bg-white/60 shadow-sm">
            <CardContent className="space-y-6 pt-6">
              <p className="font-serif text-2xl md:text-3xl text-[#222222] leading-tight">{t("resultsTitle")}</p>
              <dl className="space-y-5 font-sans text-sm">
                <div className="flex flex-col gap-1 border-b border-[#222222]/10 pb-4">
                  <dt className="text-[#222222]/60 text-xs tracking-widest uppercase">{t("downPaymentAmount")}</dt>
                  <dd className="text-xl md:text-2xl text-[#222222] tabular-nums">
                    {currencyFmt.format(breakdown.downPayment)}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-b border-[#222222]/10 pb-4">
                  <dt className="text-[#222222]/60 text-xs tracking-widest uppercase">{t("loanPrincipal")}</dt>
                  <dd className="text-xl md:text-2xl text-[#222222] tabular-nums">
                    {currencyFmt.format(breakdown.loanPrincipal)}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[#222222]/60 text-xs tracking-widest uppercase">{t("monthlyPayment")}</dt>
                  <dd className="text-2xl md:text-3xl text-[#AA7D69] tabular-nums font-medium">
                    {currencyFmtFine.format(breakdown.monthlyPayment)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs md:text-sm text-[#222222]/65 font-sans leading-relaxed max-w-3xl">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
