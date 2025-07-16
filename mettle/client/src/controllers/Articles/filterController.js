/**
 * filterArticles
 * --------------------------
 * Filters the full article list based on selected filter options.
 * Supports:
 *  - tag: only show articles containing any of the selected tags
 *
 * @param {Array} articles - the full list of articles
 * @param {Object} filters - the current filter options (e.g., { tag: ['cancer', 'surgery'] })
 * @returns {Array} - the filtered list of articles
 */
export function filterArticles(articles, filters) {
  return articles.filter((article) => {

    if (
      filters.tags &&
      filters.tags.length > 0 &&
      (!article.tags || !article.tags.some((tag) => filters.tags.includes(tag)))
    ) {
      return false;
    }

    // If all checks pass, include the article
    return true;
  });
}

/**
 * sortArticles
 * --------------------------
 * Sorts the list of articles based on the selected sort option.
 * Supports:
 *  - alphabetical: A to Z by title
 *  - oldest: by creation date, oldest first
 *
 * @param {Array} articles - the filtered list of articles
 * @param {String} sortBy - the selected sort method
 * @returns {Array} - the sorted article list
 */
export function sortArticles(articles, sortBy) {
  return [...articles].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0; // No sorting applied
    }
  });
}