/**
 * Custom hook for managing filter change logic for articles.
 * Handles:
 * - Sort selection (e.g., alphabetical, oldest)
 * - Tag filtering (checkboxes dynamically generated from DB or config)
 *
 * @param {Object} filters - current filter values (e.g., { sortBy: 'alphabetical', tags: ['cancer', 'recovery'] })
 * @param {Function} onChange - callback to update filters in the parent component
 */
export function useArticleFilterHandlers(filters, onChange) {
  /**
   * Updates the selected sort option (e.g., "alphabetical", "oldest")
   * Called when the dropdown value changes
   */
  const handleSortChange = (e) => {
    onChange({
      ...filters,
      sortBy: e.target.value,
    });
  };

  /**
   * Updates the list of selected tags.
   * Adds tag if checkbox is checked, removes if unchecked.
   */
  const handleTagChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    const currentTags = filters.tags || [];

    const updatedTags = isChecked
      ? Array.from(new Set([...currentTags, value])) // Add tag (no duplicates)
      : currentTags.filter((tag) => tag !== value);  // Remove tag

    onChange({
      ...filters,
      tags: updatedTags, 
    });
  };

  return {
    handleSortChange,
    handleTagChange,
  };
}
