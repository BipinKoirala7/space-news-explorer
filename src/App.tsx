import { useEffect, useRef, useState } from "react";
import { LoaderCircle, SearchX, TriangleAlert } from "lucide-react";
import Header from "./components/Header";
import NewsCard from "./components/NewsCard";
import CardSkeleton from "./components/CardSkeleton";
import StateMessage from "./components/StateMessage";
import BackToTop from "./components/BackToTop";
import { useNews } from "./hooks/useNews";
import type { Tab } from "./types";

export default function App() {
  const [tab, setTab] = useState<Tab>("articles");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { items, hasMore, isLoading, isLoadingMore, error, loadMore, retry } =
    useNews(tab, search);

  useEffect(() => {
    const id = setTimeout(() => setSearch(query.trim()), 400);
    return () => clearTimeout(id);
  }, [query]);

  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  function renderContent() {
    if (isLoading) {
      return (
        <Grid>
          {Array.from({ length: 9 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </Grid>
      );
    }

    if (error && items.length === 0) {
      return (
        <StateMessage
          icon={TriangleAlert}
          title="Something went wrong"
          message={error}
          onRetry={retry}
        />
      );
    }

    if (items.length === 0) {
      return (
        <StateMessage
          icon={SearchX}
          title="No results found"
          message="Try a different search or switch to another tab."
        />
      );
    }

    return (
      <>
        <Grid>
          {items.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </Grid>

        {isLoadingMore && (
          <div
            className="flex justify-center py-8"
            role="status"
            aria-label="Loading more"
          >
            <LoaderCircle className="size-6 animate-spin text-accent" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-muted">{error}</p>
            <button
              onClick={retry}
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:brightness-110"
            >
              Retry
            </button>
          </div>
        )}

        {hasMore && <div ref={sentinelRef} className="h-1" />}

        {!hasMore && !error && (
          <p className="py-8 text-center text-sm text-muted">
            You've reached the end.
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        query={query}
        onQueryChange={setQuery}
        tab={tab}
        onTabChange={setTab}
      />
      <main className="mx-auto max-w-6xl px-4 py-8">{renderContent()}</main>
      <BackToTop />
    </>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
