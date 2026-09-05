import { useState } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function HintsPanel({ hints }: { hints: string[] }) {
  const [revealed, setRevealed] = useState(0);

  if (hints.length === 0) {
    return <p className="text-sm text-forge-text-faint">No hints available for this problem.</p>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      {hints.slice(0, revealed).map((hint, i) => (
        <div key={i} className="flex gap-2.5 rounded-lg border border-forge-border bg-forge-surface p-3 animate-slide-up">
          <Lightbulb className="h-4 w-4 text-ember shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-forge-text-faint mb-0.5">Hint {i + 1}</p>
            <p className="text-sm text-forge-text-dim leading-relaxed">{hint}</p>
          </div>
        </div>
      ))}

      {revealed < hints.length ? (
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => setRevealed((r) => r + 1)}
        >
          <ChevronDown className={cn("h-3.5 w-3.5", revealed > 0 && "rotate-0")} />
          {revealed === 0 ? "Show first hint" : `Show hint ${revealed + 1} of ${hints.length}`}
        </Button>
      ) : (
        <p className="text-xs text-forge-text-faint">That's all the hints for this one — you've got this.</p>
      )}
    </div>
  );
}
