import { Logo } from "@/components/common/Logo";

export function Footer() {
  return (
    <footer className="border-t border-forge-border mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-xs text-forge-text-faint text-center sm:text-right">
          Built for practicing C++ &amp; DSA. No accounts, no tracking — your progress lives in this browser.
        </p>
      </div>
    </footer>
  );
}
