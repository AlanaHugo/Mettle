// ArticleFilter.js

import React from "react";
import { TAG_OPTIONS, SORT_OPTIONS } from "../../config/articleFilter.js"; // Static config for dropdown and checkbox filters
import { useArticleFilterHandlers } from "../../hooks/useArticlesFilterHandlers.js"; // Handles filter input changes

/**
 * ArticleFilter Sidebar
 * ---------------------
 * UI component to allow users to:
 * - Sort articles (alphabetically or by date)
 * - Filter articles by one or more tags (checkboxes)
 *
 * Props:
 * - filters: Object containing selected filter values (e.g., { tags: [], sortBy: "alphabetical" })
 * - onChange: Callback to update filters in the parent component
 */
export default function ArticleFilter({ filters, onChange }) {
  // Get handler functions from the custom hook
  const { handleSortChange, handleTagChange } = useArticleFilterHandlers(
    filters,
    onChange
  );

  return (
    <aside className="sidebar">
      {/* Sort dropdown */}
      <h3>Sort</h3>
      <div className="sortDropdown">
        <select
          className="dropContent"
          value={filters.sortBy || ""}
          onChange={handleSortChange}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <hr />

      {/* Tag/category checkboxes */}
      <h4>Tags</h4>
      {TAG_OPTIONS.map((tag) => (
        <React.Fragment key={tag}>
          <label>
            <input
              type="checkbox"
              value={tag}
              checked={filters.tags?.includes(tag)}
              onChange={handleTagChange}
            />
            {tag}
          </label>
          <hr />
        </React.Fragment>
      ))}
    </aside>
  );
}
