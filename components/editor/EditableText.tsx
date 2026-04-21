"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, ElementType } from "react";
import { useVisualEditor } from "@/components/editor/VisualEditorProvider";

type EditableTextProps = {
  contentKey: string;
  fallback: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

export default function EditableText({
  contentKey,
  fallback,
  as = "span",
  className,
  style,
}: EditableTextProps) {
  const { isEditMode, isAuthenticated, getValue, saveDraft } = useVisualEditor();
  const [editing, setEditing] = useState(false);
  const resolved = getValue(contentKey, fallback);
  const [draft, setDraft] = useState<string | null>(null);

  const Comp = as;

  const baseClass = useMemo(() => {
    if (!(isEditMode && isAuthenticated)) return className;
    return `${className ?? ""} cursor-text rounded-sm outline outline-1 outline-transparent hover:outline-[#AA7D69]/55`;
  }, [className, isAuthenticated, isEditMode]);

  if (!(isEditMode && isAuthenticated)) {
    return (
      <Comp className={className} style={style}>
        {resolved}
      </Comp>
    );
  }

  return (
    <Comp className={baseClass} style={style}>
      {editing ? (
        <textarea
          autoFocus
          value={draft ?? resolved}
          rows={Math.max(2, (draft ?? resolved).split("\n").length)}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            setEditing(false);
            const nextValue = draft ?? resolved;
            setDraft(null);
            void saveDraft(contentKey, "text", nextValue);
          }}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.currentTarget.blur();
            }
            if (event.key === "Escape") {
              setDraft(null);
              setEditing(false);
            }
          }}
          className="w-full rounded border border-[#AA7D69]/45 bg-white/95 p-2 text-inherit leading-inherit text-[#222] outline-none"
          style={{ fontFamily: "inherit", fontSize: "inherit", fontStyle: "inherit", fontWeight: "inherit", lineHeight: "inherit" }}
        />
      ) : (
        <span
          onClick={() => {
            setDraft(resolved);
            setEditing(true);
          }}
        >
          {resolved}
        </span>
      )}
    </Comp>
  );
}
