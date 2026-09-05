import * as React from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
let listeners: Listener[] = [];
let nextId = 1;

function emit() {
  listeners.forEach((l) => l(toasts));
}

export function toast(message: string, variant: ToastVariant = "info") {
  const id = nextId++;
  toasts = [...toasts, { id, message, variant }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 3200);
}

toast.success = (message: string) => toast(message, "success");
toast.error = (message: string) => toast(message, "error");
toast.info = (message: string) => toast(message, "info");

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 text-signal-success shrink-0" />,
  error: <XCircle className="h-4 w-4 text-signal-danger shrink-0" />,
  info: <Info className="h-4 w-4 text-signal-info shrink-0" />,
};

export function Toaster() {
  const [items, setItems] = React.useState<ToastItem[]>(toasts);

  React.useEffect(() => {
    listeners.push(setItems);
    return () => {
      listeners = listeners.filter((l) => l !== setItems);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-[200] flex flex-col gap-2 sm:w-80">
      {items.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-start gap-2 rounded-lg border border-forge-border bg-forge-surface-raised px-3 py-2.5 shadow-panel animate-slide-up"
          )}
          role="status"
        >
          {icons[t.variant]}
          <p className="flex-1 text-sm text-forge-text">{t.message}</p>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            className="text-forge-text-faint hover:text-forge-text shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}
