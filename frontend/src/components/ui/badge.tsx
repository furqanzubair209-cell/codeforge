import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "easy"
  | "medium"
  | "hard"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-forge-surface-hover text-forge-text-dim border border-forge-border",
  easy: "bg-signal-success/12 text-signal-success border border-signal-success/25",
  medium: "bg-signal-warning/12 text-signal-warning border border-signal-warning/25",
  hard: "bg-signal-danger/12 text-signal-danger border border-signal-danger/25",
  success: "bg-signal-success/12 text-signal-success border border-signal-success/25",
  danger: "bg-signal-danger/12 text-signal-danger border border-signal-danger/25",
  warning: "bg-signal-warning/12 text-signal-warning border border-signal-warning/25",
  info: "bg-signal-info/12 text-signal-info border border-signal-info/25",
  outline: "bg-transparent text-forge-text-dim border border-forge-border",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function difficultyVariant(difficulty: "Easy" | "Medium" | "Hard"): BadgeVariant {
  if (difficulty === "Easy") return "easy";
  if (difficulty === "Medium") return "medium";
  return "hard";
}
