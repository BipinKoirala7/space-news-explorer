import { Rocket } from "lucide-react";
import SearchBox from "./SearchBox";
import Tabs from "./Tabs";
import type { Tab } from "../types";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Header({
  query,
  onQueryChange,
  tab,
  onTabChange,
}: Props) {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-14 text-center sm:pt-20">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Rocket className="size-6" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Space News Explorer
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted">
          The latest from across the cosmos: articles, blogs and reports from
          the world's space agencies and outlets.
        </p>
      </section>

      <div className="sticky top-0 z-20 border-y border-line bg-space-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
          <SearchBox value={query} onChange={onQueryChange} />
          <Tabs active={tab} onChange={onTabChange} />
        </div>
      </div>
    </>
  );
}
