"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Download, Loader2, Wand2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { CompareSlider } from "@/components/virtual-staging/compare-slider";
import {
  StyleTileSelector,
  type VirtualStagingStyleValue,
  styleButtonClasses,
} from "@/components/virtual-staging/style-tile-selector";
import { cn } from "@/lib/utils";
import { getStoredEmail, setStoredEmail } from "@/lib/email-storage";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslations } from "next-intl";

interface VirtualStagingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preloadedImageUrl: string;
  propertyImages?: string[];
  propertyName?: string;
  propertyId?: number;
  imageIndex?: number;
}

type GenerateResponse = {
  errorCode?: string;
  error?: string;
  data?: {
    originalUrl?: string;
    generatedUrl?: string;
    credits?: number;
  };
};

const GENERATE_ERROR_KEYS: Record<string, string> = {
  VS_MISSING_REQUIRED_FIELDS: "VS_MISSING_REQUIRED_FIELDS",
  VS_COULD_NOT_CREATE_USER: "VS_COULD_NOT_CREATE_USER",
  VS_DAILY_LIMIT_REACHED: "VS_DAILY_LIMIT_REACHED",
  VS_FAILED_TO_FETCH_SOURCE_IMAGE: "VS_FAILED_TO_FETCH_SOURCE_IMAGE",
  VS_NO_VALID_IMAGE_PROVIDED: "VS_NO_VALID_IMAGE_PROVIDED",
  VS_FAILED_TO_CREATE_STAGING_RECORD: "VS_FAILED_TO_CREATE_STAGING_RECORD",
  VS_AI_GENERATION_FAILED: "VS_AI_GENERATION_FAILED",
  VS_AI_GENERATION_EMPTY_RESULT: "VS_AI_GENERATION_EMPTY_RESULT",
  VS_INTERNAL_SERVER_ERROR: "VS_INTERNAL_SERVER_ERROR",
};

export function VirtualStagingModal({
  open,
  onOpenChange,
  preloadedImageUrl,
  propertyImages,
  propertyName,
  propertyId,
  imageIndex = 0,
}: VirtualStagingModalProps) {
  const t = useTranslations("components.virtualStaging.modal");
  const tCompare = useTranslations("components.virtualStaging.compareSlider");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [style, setStyle] = useState<VirtualStagingStyleValue>("Minimalism");
  const [email, setEmail] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    original: string;
    generated: string;
    credits: number;
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);

  const currentImageUrl = propertyImages?.[currentImageIndex] ?? preloadedImageUrl;

  useEffect(() => {
    const storedEmail = getStoredEmail();
    if (storedEmail && /\S+@\S+\.\S+/.test(storedEmail.trim())) {
      setEmail(storedEmail.trim());
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setResult(null);
      setLoading(false);
      setError(null);
      setStyle("Minimalism");
      setEmailTouched(false);
      setCurrentImageIndex(imageIndex);
    }
  }, [open, imageIndex]);

  useEffect(() => {
    if (open) {
      setCurrentImageIndex(imageIndex);
    }
  }, [open, imageIndex]);

  const normalizedEmail = email.trim();
  const isEmailValid = normalizedEmail.length > 0 && /\S+@\S+\.\S+/.test(normalizedEmail);

  const handleUnlockEmail = () => {
    setEmailTouched(true);
    if (!isEmailValid) return;
    setStoredEmail(normalizedEmail);
    setIsUnlocked(true);
  };

  const handleGenerateClick = () => {
    if (!isUnlocked) {
      setEmailTouched(true);
      return;
    }
    if (!isEmailValid) {
      return;
    }
    setStoredEmail(normalizedEmail);
    generateStaging(normalizedEmail);
  };

  const generateStaging = async (userEmail: string) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("email", userEmail);
      formData.append("style", style);
      const absoluteImageUrl =
        currentImageUrl.startsWith("http")
          ? currentImageUrl
          : `${window.location.origin}${currentImageUrl}`;
      formData.append("imageUrl", absoluteImageUrl);
      formData.append("imageIndex", currentImageIndex.toString());
      if (propertyId) formData.append("propertyId", propertyId.toString());

      const res = await fetch("/api/virtual-staging/generate", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as GenerateResponse;

      if (!res.ok) {
        if (data.errorCode && GENERATE_ERROR_KEYS[data.errorCode]) {
          setError(t(`errors.${GENERATE_ERROR_KEYS[data.errorCode]}`));
          return;
        }
        setError(data.error || t("errors.generic"));
        return;
      }

      const payload = data.data;
      if (!payload?.originalUrl || !payload.generatedUrl || typeof payload.credits !== "number") {
        setError(t("errors.generic"));
        return;
      }

      setResult({
        original: payload.originalUrl,
        generated: payload.generatedUrl,
        credits: payload.credits,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        direction={isDesktop ? "right" : "bottom"}
        dismissible
        handleOnly
      >
        <DrawerContent
          className={`bg-[#F8F1E8] p-0 ${isDesktop ? "h-screen rounded-none border-l border-[#222]/10" : "h-auto max-h-[92dvh] rounded-t-2xl border-t border-[#222]/10"}`}
          style={{
            width: isDesktop ? "min(620px, 90vw)" : "100vw",
            maxWidth: isDesktop ? "min(620px, 90vw)" : "100vw",
          }}
          aria-label={t("panelAria")}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 z-50 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#222]/15 bg-white/70 text-[#222]/70 transition-colors hover:bg-white hover:text-[#222]"
            aria-label={t("closeAria")}
          >
            <X className="h-4 w-4" />
          </button>

          {result && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4 z-50 h-auto p-0 text-xs text-zinc-400 hover:bg-transparent hover:text-zinc-600"
              onClick={() => setResult(null)}
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              {t("back")}
            </Button>
          )}

          <div className={`${result ? "pt-6" : ""}`}>
            <h2 className="text-foreground text-3xl font-bold px-3 pt-3 pb-1" style={{ fontFamily: "var(--font-serif)" }}>
              {propertyName || t("title")}
            </h2>
            <p className="text-muted-foreground text-sm px-3 pb-2">{t("subtitle")}</p>
          </div>

          <div className="space-y-4">
            {!result && (
              <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden border bg-black/5 shadow-sm">
                <Image src={currentImageUrl} alt={tCompare("originalAlt")} fill className="object-cover" />
                {loading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px]">
                    <Loader2 className="h-9 w-9 animate-spin text-white" />
                    <p className="mt-3 text-sm font-medium text-white">{t("loadingOverlay")}</p>
                  </div>
                )}
              </div>
            )}

            {propertyImages && propertyImages.length > 1 && !result && (
              <div className="px-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {propertyImages.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      disabled={loading}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        currentImageIndex === idx
                          ? "border-[#b76d4b] ring-2 ring-[#b76d4b]/30"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={t("selectImageAria", { index: idx + 1 })}
                    >
                      <Image
                        src={img}
                        alt={t("thumbnailAlt", { index: idx + 1 })}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
                  <div className="aspect-[16/9] w-full">
                    <CompareSlider
                      originalUrl={result.original}
                      generatedUrl={result.generated}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => window.open(result.generated, "_blank")}
                    className="absolute right-2 bottom-2 h-8 w-8 cursor-pointer bg-black/30 shadow-md transition-all hover:bg-black/50"
                    title={t("download")}
                  >
                    <Download className="h-4 w-4 text-white" />
                  </Button>
                </div>

                <div className="text-muted-foreground text-right text-xs px-3">
                  {t("creditsToday", { credits: result.credits, dailyLimit: 5 })}
                </div>
              </div>
            )}

            <div className="rounded-xl border p-3 shadow-sm mx-3 mb-3">
              <div className="space-y-3">
                {error ? (
                  <p className="text-xs text-[#b15f4b]">{error}</p>
                ) : null}
                {!isUnlocked && (
                  <div className="rounded-lg border border-[#d7c4b8] bg-[#fffaf4] p-2.5">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="text-[11px] tracking-[0.14em] uppercase text-[#7f6659]" style={{ fontFamily: "var(--font-sans)" }}>
                        {t("emailGate.kicker")}
                      </p>
                      <p className="text-[11px] text-[#8f7667]">{t("emailGate.once")}</p>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        placeholder={t("emailGate.placeholder")}
                        className={cn(
                          "h-10 border bg-white text-[#4a352c] placeholder:text-[#9a8375]",
                          emailTouched && !isEmailValid
                            ? "border-[#c16e59] focus-visible:ring-[#c16e59]/25"
                            : "border-[#c9b4a7] focus-visible:ring-[#AA7D69]/25",
                        )}
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        className="h-10 shrink-0 rounded-lg border border-[#b7907a] bg-[#f3e1d3] px-3 text-[#6b4736] hover:bg-[#ecd3c1]"
                        onClick={handleUnlockEmail}
                        disabled={loading}
                      >
                        {t("emailGate.continue")}
                      </Button>
                    </div>
                    {emailTouched && !isEmailValid && (
                      <p className="mt-1 text-xs text-[#b15f4b]">{t("emailGate.invalid")}</p>
                    )}
                  </div>
                )}

                <div className={cn(!isUnlocked && "pointer-events-none opacity-45")}>
                  <StyleTileSelector value={style} onChange={setStyle} />
                </div>

                <Button
                  className={cn(
                    "h-10 w-full cursor-pointer gap-1.5 rounded-lg text-sm transition-all font-semibold tracking-[0.02em]",
                    styleButtonClasses[style],
                  )}
                  onClick={handleGenerateClick}
                  disabled={loading || !isUnlocked}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                  {loading ? t("cta.generating") : isUnlocked ? t("cta.generate") : t("cta.unlock")}
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
