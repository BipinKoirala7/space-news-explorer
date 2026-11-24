import { useCallback, useEffect, useRef, useState } from "react";
import type { Article, Tab } from "../types";

const BASE_URL = "https://api.spaceflightnewsapi.net/v4";
const LIMIT = 10;

interface ApiResponse {
  count: number;
  next: string | null;
  results: Article[];
}

interface State {
  key: string;
  items: Article[];
  count: number;
  hasMore: boolean;
  isLoadingMore: boolean;
  error: string | null;
}

async function fetchPage(
  tab: Tab,
  search: string,
  offset: number,
  signal: AbortSignal,
): Promise<ApiResponse> {
  const params = new URLSearchParams({
    limit: String(LIMIT),
    offset: String(offset),
  });
  if (search) params.set("search", search);

  const res = await fetch(`${BASE_URL}/${tab}/?${params}`, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export function useNews(tab: Tab, search: string) {
  const [data, setData] = useState<State>({
    key: "",
    items: [],
    count: 0,
    hasMore: false,
    isLoadingMore: false,
    error: null,
  });
  const [retryKey, setRetryKey] = useState(0);
  const controllerRef = useRef<AbortController | null>(null);

  const key = `${tab}|${search}|${retryKey}`;
  const isLoading = data.key !== key;

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    fetchPage(tab, search, 0, controller.signal)
      .then((res) => {
        setData({
          key,
          items: res.results,
          count: res.count,
          hasMore: res.next !== null,
          isLoadingMore: false,
          error: null,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setData({
          key,
          items: [],
          count: 0,
          hasMore: false,
          isLoadingMore: false,
          error: "Couldn't load the news. Check your connection and try again.",
        });
      });

    return () => controller.abort();
  }, [key, tab, search]);

  const loadMore = useCallback(() => {
    const controller = controllerRef.current;
    if (
      !controller ||
      isLoading ||
      data.isLoadingMore ||
      !data.hasMore ||
      data.error
    )
      return;

    setData((prev) => ({ ...prev, isLoadingMore: true }));

    fetchPage(tab, search, data.items.length, controller.signal)
      .then((res) => {
        setData((prev) => ({
          ...prev,
          items: [...prev.items, ...res.results],
          hasMore: res.next !== null,
          isLoadingMore: false,
        }));
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setData((prev) => ({
          ...prev,
          isLoadingMore: false,
          error: "Couldn't load more news. Please try again.",
        }));
      });
  }, [tab, search, data, isLoading]);

  const retry = useCallback(() => {
    if (data.items.length === 0) {
      setRetryKey((k) => k + 1);
    } else {
      setData((prev) => ({ ...prev, error: null }));
    }
  }, [data.items.length]);

  return {
    items: isLoading ? [] : data.items,
    count: isLoading ? 0 : data.count,
    hasMore: !isLoading && data.hasMore,
    isLoading,
    isLoadingMore: !isLoading && data.isLoadingMore,
    error: isLoading ? null : data.error,
    loadMore,
    retry,
  };
}
