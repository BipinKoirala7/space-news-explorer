import type { Tab } from "../types";

const TABS: { id: Tab; label: string }[] = [
  { id: "articles", label: "Articles" },
  { id: "blogs", label: "Blogs" },
  { id: "reports", label: "Reports" },
];

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export default function Tabs({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="News type"
      className="flex shrink-0 gap-1 rounded-full border border-line bg-space-800 p-1"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === tab.id
              ? "bg-accent text-white"
              : "text-muted hover:text-ink"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
