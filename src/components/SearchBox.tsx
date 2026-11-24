import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search space news, e.g. Mars"
        aria-label="Search space news"
        className="w-full rounded-full border border-line bg-space-800 py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-muted transition-colors focus:border-accent"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:bg-space-700 hover:text-ink"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}