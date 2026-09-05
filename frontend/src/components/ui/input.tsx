import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-forge-border bg-forge-surface-raised px-3 text-sm text-forge-text",
          "placeholder:text-forge-text-faint",
          "focus-visible:outline-none focus-visible:border-ember/60 focus-visible:ring-2 focus-visible:ring-ember/20",
          "disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-10 rounded-lg border border-forge-border bg-forge-surface-raised px-3 text-sm text-forge-text appearance-none",
          "focus-visible:outline-none focus-visible:border-ember/60 focus-visible:ring-2 focus-visible:ring-ember/20",
          "cursor-pointer transition-colors bg-no-repeat bg-[right_0.75rem_center]",
          className
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239BA1AB' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          paddingRight: "2rem",
        }}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";
