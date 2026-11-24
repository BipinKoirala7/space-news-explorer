# Space News Explorer

A space-themed news reader built on the [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/documentation). Browse articles, blogs and reports, search with a debounce, and scroll through results infinitely.

**Live demo:** _add your Vercel/Netlify link here_

![Space News Explorer screenshot](./screenshots/desktop.png)

## Features

- Articles / Blogs / Reports tabs, each using its own endpoint
- Search with a 400ms debounce; changing the tab or search restarts from the first page
- Infinite scroll (10 items per request, using `IntersectionObserver`) that stops when `next` is `null`
- Shimmer skeleton loading, error state with Retry, and empty state
- Sticky search and tabs, back-to-top button
- Responsive grid (1, 2 or 3 columns), image fallback, visible keyboard focus

## Tech

React, TypeScript, Vite, Tailwind CSS v4 and lucide-react. There is no data-fetching library: the `useNews` hook uses `fetch` and `AbortController` so stale requests are cancelled.

## Run locally

```bash
git clone <repo-url>
cd space-news-explorer
npm install
npm run dev
```

Open http://localhost:5173. No API key is needed. For a production build, run `npm run build`.

## Project structure

```
src/
  components/   Header, SearchBox, Tabs, NewsCard, CardSkeleton, StateMessage, BackToTop
  hooks/        useNews.ts
  types.ts
  App.tsx
```

## What I'd improve with more time

- Dedupe items by `id` when appending, since new posts can shift the offsets between pages
- Add arrow-key navigation and a tab panel to the tabs for full accessibility
- Cache results per tab and search (for example with TanStack Query) so switching back is instant
- Add tests for the `useNews` hook and the date formatting
