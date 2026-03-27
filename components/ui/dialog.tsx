"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

let openDialogCount = 0;
let previousBodyOverflow = "";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used inside Dialog");
  return ctx;
}

function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    if (open) {
      if (openDialogCount === 0) {
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }
      openDialogCount += 1;
      return () => {
        openDialogCount = Math.max(0, openDialogCount - 1);
        if (openDialogCount === 0) {
          document.body.style.overflow = previousBodyOverflow;
        }
      };
    }

    return;
  }, [open]);

  return <DialogContext.Provider value={{ open, setOpen: onOpenChange }}>{children}</DialogContext.Provider>;
}

function DialogContent({ className, children }: React.ComponentProps<"div">) {
  const { open, setOpen } = useDialogContext();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={() => setOpen(false)}
      />
      <div className={cn("relative z-10 w-full max-w-lg rounded-xl border bg-white p-6 shadow-xl", className)}>
        {children}
      </div>
    </div>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-4", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-xl font-semibold", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-4 flex justify-end", className)} {...props} />;
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter };
