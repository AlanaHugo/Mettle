// SearchResultsService.js
export const fetchSearchResults = async (query) => {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
};
