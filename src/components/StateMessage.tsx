import type { LucideIcon } from "lucide-react";
import { RefreshCw } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  message: string;
  onRetry?: () => void;
}

export default function StateMessage({
  icon: Icon,
  title,
  message,
  onRetry,
}: Props) {
  return (
    <div className="flex animate-fade-in flex-col items-center px-4 py-20 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon className="size-8" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:brightness-110"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Retry
        </button>
      )}
    </div>
  );
}
