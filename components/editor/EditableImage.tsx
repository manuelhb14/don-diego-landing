"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useVisualEditor } from "@/components/editor/VisualEditorProvider";

type EditableImageProps = {
  contentKey: string;
  fallbackSrc: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
};

export default function EditableImage({
  contentKey,
  fallbackSrc,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
}: EditableImageProps) {
  const { isEditMode, isAuthenticated, getValue, saveDraft, uploadImage } = useVisualEditor();
  const src = getValue(contentKey, fallbackSrc);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const canEdit = isEditMode && isAuthenticated;

  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
      />

      {canEdit && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute top-2 right-2 z-20 rounded border border-[#AA7D69]/40 bg-[#fff8ed]/95 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#6f4e40] shadow"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {uploading ? "Uploading" : "Replace"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const nextUrl = await uploadImage(file);
                if (nextUrl) {
                  await saveDraft(contentKey, "image", nextUrl);
                }
              } finally {
                setUploading(false);
                event.target.value = "";
              }
            }}
          />
        </>
      )}
    </div>
  );
}
