import { cn } from "@/lib/utils";

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" aria-hidden="true">
        <rect x="2" y="20" width="28" height="4" rx="1" fill="currentColor" opacity="0.15" />
        <path
          d="M9 20 L9 12 Q9 9 12 9 L15 9 L15 4 L21 4 L21 9 L20 9 L20 13 L23 13 L23 20 Z"
          fill="currentColor"
          className="text-forge-text"
        />
        <rect x="7" y="19" width="18" height="3" rx="1" className="fill-ember" />
        <circle cx="16" cy="6.5" r="1.1" className="fill-ember-glow animate-ember" />
      </svg>
      {showWordmark && (
        <span className="font-display font-bold text-[1.05rem] tracking-tight text-forge-text">
          Code<span className="text-ember">Forge</span>
        </span>
      )}
    </span>
  );
}
