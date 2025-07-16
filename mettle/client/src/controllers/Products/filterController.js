/**
 * filterProducts
 * --------------------------
 * Filters the full product list based on selected filter options.
 * Supports:
 *  - Featured: only show products marked as 'featured'
 *  - Category: only show products matching selected categories
 *
 * @param {Array} products - the full list of products
 * @param {Object} filters - the current filter options
 * @returns {Array} - the filtered list of products
 */
export function filterProducts(products, filters) {
  return products.filter((product) => {
    // If "featured" is checked, exclude products that are not featured
    if (filters.featured && !product.featured) return false;

    // If one or more categories are selected, show only matching category
    if (
      filters.category &&
      filters.category.length > 0 &&
      !filters.category.includes(product.category)
    ) {
      return false;
    }

    // If all checks pass, include the product
    return true;
  });
}

/**
 * sortProducts
 * --------------------------
 * Sorts the list of products based on the selected sort option.
 * Supports:
 *  - alphabetical: A to Z by name
 *  - oldest: by creation date, oldest first
 *  - price: lowest to highest
 *
 * @param {Array} products - the filtered list of products
 * @param {String} sortBy - the selected sort method
 * @returns {Array} - the sorted product list
 */
export function sortProducts(products, sortBy) {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price":
        return a.price - b.price;
      default:
        return 0; // No sorting applied
    }
  });
}
