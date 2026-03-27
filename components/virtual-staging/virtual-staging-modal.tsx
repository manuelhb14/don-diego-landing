"use client";

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Download, Loader2, Wand2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { CompareSlider } from "@/components/virtual-staging/compare-slider";
import {
  StyleTileSelector,
  type VirtualStagingStyleValue,
  styleButtonClasses,
} from "@/components/virtual-staging/style-tile-selector";
import { EmailCaptureDialog } from "@/components/virtual-staging/email-capture-dialog";
import { cn } from "@/lib/utils";
import { getStoredEmail, setStoredEmail } from "@/lib/email-storage";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  data?: {
    originalUrl?: string;
    generatedUrl?: string;
    credits?: number;
  };
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
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [style, setStyle] = useState<VirtualStagingStyleValue>("Minimalism");
  const [email, setEmail] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    original: string;
    generated: string;
    credits: number;
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);

  const currentImageUrl = propertyImages?.[currentImageIndex] ?? preloadedImageUrl;

  useEffect(() => {
    const storedEmail = getStoredEmail();
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!open) {
      setResult(null);
      setLoading(false);
      setStyle("Minimalism");
      setCurrentImageIndex(imageIndex);
    }
  }, [open, imageIndex]);

  useEffect(() => {
    if (open) {
      setCurrentImageIndex(imageIndex);
    }
  }, [open, imageIndex]);

  const handleGenerateClick = () => {
    if (!email) {
      setIsDialogOpen(true);
      return;
    }
    generateStaging(email);
  };

  const generateStaging = async (userEmail: string) => {
    setLoading(true);
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
        console.error("Virtual staging failed", data);
        return;
      }

      const payload = data.data;
      if (!payload?.originalUrl || !payload.generatedUrl || typeof payload.credits !== "number") {
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
          aria-label="Virtual Staging Panel"
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 z-50 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#222]/15 bg-white/70 text-[#222]/70 transition-colors hover:bg-white hover:text-[#222]"
            aria-label="Cerrar virtual staging"
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
              Volver
            </Button>
          )}

          <div className={`${result ? "pt-6" : ""}`}>
            <h2 className="text-foreground text-4xl font-bold px-3 pt-3 pb-1" style={{ fontFamily: "var(--font-serif)" }}>
              {propertyName}
            </h2>
            <p className="text-muted-foreground text-sm px-3 pb-2">Genera una imagen amueblada.</p>
          </div>

          <div className="space-y-4">
            {!result && (
              <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden border bg-black/5 shadow-sm">
                <Image src={currentImageUrl} alt="Original" fill className="object-cover" />
                {loading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px]">
                    <Loader2 className="h-9 w-9 animate-spin text-white" />
                    <p className="mt-3 text-sm font-medium text-white">Generando imagen...</p>
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
                      aria-label={`Seleccionar imagen ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Imagen ${idx + 1}`}
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
                    title="Download"
                  >
                    <Download className="h-4 w-4 text-white" />
                  </Button>
                </div>

                <div className="text-muted-foreground text-right text-xs px-3">
                  Créditos hoy: {result.credits}/5
                </div>
              </div>
            )}

            <div className="rounded-xl border p-3 shadow-sm mx-3 mb-3">
              <div className="space-y-3">
                <StyleTileSelector value={style} onChange={setStyle} />

                <Button
                  className={cn(
                    "h-10 w-full cursor-pointer gap-1.5 rounded-lg text-sm transition-all font-semibold tracking-[0.02em]",
                    styleButtonClasses[style],
                  )}
                  onClick={handleGenerateClick}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                  {loading ? "Generando..." : "Generar virtual staging"}
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <EmailCaptureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={(submittedEmail) => {
          setEmail(submittedEmail);
          setStoredEmail(submittedEmail);
          setIsDialogOpen(false);
          generateStaging(submittedEmail);
        }}
      />
    </>
  );
}
