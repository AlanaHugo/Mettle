/**
 * Predefined categories available for filtering products.
 * Can be reused across filter UIs or in backend filtering.
 */
export const CATEGORY_OPTIONS = [
  "Hospital Stay",
  "Recovery",
  "Surgery",
  "Comfort",
  "Wellness",
];

/**
 * Predefined sorting options for the sort dropdown.
 * Each option includes a value used in filtering logic
 * and a label for display in the UI.
 */
export const SORT_OPTIONS = [
  { value: "", label: "All" },
  { value: "price", label: "Price (Low to High)" },
  { value: "alphabetical", label: "A-Z" },
  { value: "oldest", label: "Oldest to Newest" },
];
