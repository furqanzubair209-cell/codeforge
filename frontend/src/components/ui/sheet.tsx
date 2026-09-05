import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  side = "left",
  children,
  widthClassName = "w-[85vw] max-w-[320px]",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "bottom";
  children: React.ReactNode;
  widthClassName?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const sidePosition =
    side === "left"
      ? cn("left-0 top-0 h-full", widthClassName)
      : side === "right"
      ? cn("right-0 top-0 h-full", widthClassName)
      : "left-0 right-0 bottom-0 max-h-[85vh] rounded-t-2xl";

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "absolute bg-forge-surface border-forge-border shadow-panel overflow-y-auto",
          side === "left" && "border-r animate-[slide-up_0.25s_ease-out]",
          side === "right" && "border-l animate-[slide-up_0.25s_ease-out]",
          side === "bottom" && "border-t animate-slide-up",
          sidePosition
        )}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 rounded-md p-1.5 text-forge-text-dim hover:text-forge-text hover:bg-forge-surface-hover transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
