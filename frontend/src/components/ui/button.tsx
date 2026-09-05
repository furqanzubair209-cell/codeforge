import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ember text-[#1B1305] hover:bg-ember-hot active:bg-ember-dim shadow-[0_0_0_1px_rgba(232,150,60,0.25)] hover:shadow-ember disabled:hover:bg-ember",
  secondary:
    "bg-forge-surface-raised text-forge-text border border-forge-border hover:border-forge-border-hover hover:bg-forge-surface-hover",
  ghost: "bg-transparent text-forge-text-dim hover:text-forge-text hover:bg-forge-surface-hover",
  outline:
    "bg-transparent border border-forge-border text-forge-text hover:border-ember/60 hover:text-ember",
  danger: "bg-signal-danger/15 text-signal-danger border border-signal-danger/30 hover:bg-signal-danger/25",
  success: "bg-signal-success/15 text-signal-success border border-signal-success/30 hover:bg-signal-success/25",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0 shrink-0",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "focus-visible:outline-2 focus-visible:outline-ember focus-visible:outline-offset-2",
          "active:scale-[0.98]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
