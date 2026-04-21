export type FinancingMarket = "mx" | "us";

export type FinancingPreset = {
  market: FinancingMarket;
  /** ISO 4217 */
  currency: string;
  /** Passed to Intl.NumberFormat */
  numberLocale: string;
  defaultPropertyPrice: number;
  defaultAnnualRatePercent: number;
  defaultTermYears: number;
  defaultDownPaymentPercent: number;
};

export const FINANCING_PRESETS: Record<FinancingMarket, FinancingPreset> = {
  mx: {
    market: "mx",
    currency: "MXN",
    numberLocale: "es-MX",
    defaultPropertyPrice: 12_000_000,
    defaultAnnualRatePercent: 10.5,
    defaultTermYears: 20,
    defaultDownPaymentPercent: 20,
  },
  us: {
    market: "us",
    currency: "USD",
    numberLocale: "en-US",
    defaultPropertyPrice: 750_000,
    defaultAnnualRatePercent: 6.75,
    defaultTermYears: 30,
    defaultDownPaymentPercent: 20,
  },
};

export type FinancingInputs = {
  propertyPrice: number;
  downPaymentPercent: number;
  annualRatePercent: number;
  termYears: number;
};

export type FinancingBreakdown = {
  downPayment: number;
  loanPrincipal: number;
  monthlyPayment: number;
};

/**
 * Fixed-rate monthly payment (standard amortization). Annual rate as percentage (e.g. 6.5 = 6.5% / year).
 */
export function computeMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number {
  if (principal <= 0) return 0;
  const n = Math.round(termYears * 12);
  if (n <= 0) return 0;

  const r = annualRatePercent / 100 / 12;
  if (r === 0) {
    return principal / n;
  }

  const pow = (1 + r) ** n;
  return (principal * (r * pow)) / (pow - 1);
}

export function computeFinancingBreakdown(input: FinancingInputs): FinancingBreakdown {
  const price = Math.max(0, input.propertyPrice);
  const downPct = Math.min(100, Math.max(0, input.downPaymentPercent));
  const downPayment = price * (downPct / 100);
  const loanPrincipal = Math.max(0, price - downPayment);
  const monthlyPayment = computeMonthlyPayment(
    loanPrincipal,
    Math.max(0, input.annualRatePercent),
    Math.max(0, input.termYears),
  );

  return { downPayment, loanPrincipal, monthlyPayment };
}
