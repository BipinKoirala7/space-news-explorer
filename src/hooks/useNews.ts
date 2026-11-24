export async function useNews() {
  return await fetch("https://api.spaceflightnewsapi.net/v3/articles").then(
    (res) => res.json(),
  );
}
