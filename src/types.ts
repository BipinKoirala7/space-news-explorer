export const TAB_IDS = ["articles", "blogs", "reports"] as const;
export type Tab = (typeof TAB_IDS)[number];

export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}
