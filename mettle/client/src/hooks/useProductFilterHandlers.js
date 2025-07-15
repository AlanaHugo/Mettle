/**
 * Custom hook for managing filter change logic.
 * Provides handlers for:
 * - sort dropdown
 * - featured checkbox
 * - multi-select category checkboxes
 *
 * Keeps logic out of the UI component for better modularity and reuse.
 *
 * @param {Object} filters - current filter values
 * @param {Function} onChange - callback to update filters
 */
export function useProductFilterHandlers(filters, onChange) {
  // Updates the 'sortBy' field
  const handleSortChange = (e) => {
    onChange({ ...filters, sortBy: e.target.value });
  };

  // Updates the 'featured' boolean flag
  const handleFeaturedChange = (e) => {
    onChange({ ...filters, featured: e.target.checked });
  };

  // Updates the 'category' array with added or removed selections
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    const currentCategories = filters.category || [];

    const updatedCategories = isChecked
      ? [...currentCategories, value] // Add category if checked
      : currentCategories.filter((c) => c !== value); // Remove if unchecked

    onChange({ ...filters, category: updatedCategories });
  };

  return {
    handleSortChange,
    handleFeaturedChange,
    handleCategoryChange,
  };
}
