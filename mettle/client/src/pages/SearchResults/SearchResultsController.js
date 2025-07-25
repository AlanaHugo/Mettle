// SearchResultsController.js
import { fetchSearchResults } from "./SearchResultsService.js";

export async function getSearchResults(query) {
  try {
    const results = await fetchSearchResults(query);
    return results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}
