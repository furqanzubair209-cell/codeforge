import { useEffect } from "react";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";

/** Applies the persisted theme preference to the document root. Call once near the app root. */
export function useThemeEffect() {
  const theme = useCodeforgeStore((s) => s.preferences.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);
}
