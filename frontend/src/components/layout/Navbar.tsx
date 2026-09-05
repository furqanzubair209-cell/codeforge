import * as React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Flame, Bookmark, LayoutDashboard, Code2, Hammer, History } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Sheet } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/problems", label: "Problems", icon: Code2 },
  { to: "/topics", label: "Topics", icon: Hammer },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/submissions", label: "Submissions", icon: History },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const streak = useCodeforgeStore((s) => s.streak.current);

  return (
    <header className="sticky top-0 z-50 border-b border-forge-border bg-forge-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="lg:hidden -ml-1.5 rounded-md p-1.5 text-forge-text-dim hover:text-forge-text hover:bg-forge-surface-hover"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <NavLink to="/" className="shrink-0">
            <Logo />
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-ember bg-ember/10"
                      : "text-forge-text-dim hover:text-forge-text hover:bg-forge-surface-hover"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {streak > 0 && (
            <div
              className="hidden sm:flex items-center gap-1 rounded-md border border-forge-border bg-forge-surface-raised px-2.5 py-1 text-xs font-semibold text-forge-text-dim"
              title={`${streak}-day solving streak`}
            >
              <Flame className="h-3.5 w-3.5 text-ember" />
              {streak}
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} side="left">
        <div className="p-5 pt-6">
          <Logo />
          {streak > 0 && (
            <Badge variant="warning" className="mt-3">
              <Flame className="h-3 w-3" /> {streak}-day streak
            </Badge>
          )}
          <nav className="mt-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-ember bg-ember/10"
                        : "text-forge-text-dim hover:text-forge-text hover:bg-forge-surface-hover"
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </Sheet>
    </header>
  );
}
