import { Moon, Sun } from "lucide-react";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useCodeforgeStore((s) => s.preferences.theme);
  const setTheme = useCodeforgeStore((s) => s.setTheme);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </Button>
  );
}
