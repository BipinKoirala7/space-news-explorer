import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { Article } from "../types";

function formatDate(iso: string) {
  const date = new Date(iso);
  const days = Math.round((date.getTime() - Date.now()) / 86_400_000);

  // Within the last week: "2 days ago". Otherwise: "28 Oct 2026".
  if (days > -7) {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      days,
      "day",
    );
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function NewsCard({ article }: { article: Article }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex animate-fade-in flex-col overflow-hidden rounded-2xl border border-line bg-space-800 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
    >
      <div className="aspect-video overflow-hidden bg-space-700">
        {imageFailed || !article.image_url ? (
          <div className="flex h-full items-center justify-center text-muted">
            <ImageOff className="size-8" aria-hidden="true" />
          </div>
        ) : (
          <img
            src={article.image_url}
            alt={article.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="truncate rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
            {article.news_site}
          </span>
          <time dateTime={article.published_at} className="shrink-0 text-muted">
            {formatDate(article.published_at)}
          </time>
        </div>

        <h2 className="line-clamp-2 text-lg font-semibold leading-snug">
          {article.title}
        </h2>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {article.summary}
        </p>
      </div>
    </a>
  );
}
