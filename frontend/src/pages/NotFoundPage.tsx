import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-forge-border bg-forge-surface">
          <Compass className="h-6 w-6 text-ember" />
        </div>

        <p className="font-display text-6xl sm:text-7xl font-bold text-forge-text tracking-tight">404</p>
        <h1 className="mt-3 font-display text-lg sm:text-xl font-semibold text-forge-text">
          This page didn't make it off the anvil.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-forge-text-dim leading-relaxed">
          The page you're looking for doesn't exist, or may have moved. Let's get you back to solving.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Button>
          </Link>
          <Link to="/problems" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Browse problems
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center opacity-60">
          <Logo />
        </div>
      </div>
    </div>
  );
}
