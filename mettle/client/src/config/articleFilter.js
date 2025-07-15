/**
 * Predefined categories available for filtering products.
 * Can be reused across filter UIs or in backend filtering.
 */
export const TAG_OPTIONS = [
  "breast cancer",
  "cancer",
  "chemo",
  "coping",
  "daily life",
  "dialysis",
  "fatigue",
  "grief",
  "healing",
  "journaling",
  "kidney",
  "mastectomy",
  "mental health",
  "music",
  "nutrition",
  "organization",
  "pets",
  "positivity",
  "radiation",
  "recovery",
  "reflection",
  "support",
  "treatment",
  "treatment tips",
  "writing"
]

/**
 * Predefined sorting options for the sort dropdown.
 * Each option includes a value used in filtering logic
 * and a label for display in the UI.
 */
export const SORT_OPTIONS = [
  { value: "", label: "All" },
  { value: "alphabetical", label: "A-Z" },
  { value: "oldest", label: "Oldest to Newest" },
];
