// ProductFilter.js

import React from "react";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "../../config/productFilters.js"; // External config arrays for sort and category options
import { useProductFilterHandlers } from "../../hooks/useProductFilterHandlers.js"; // Custom hook for handling input changes

/**
 * ProductFilter Sidebar
 * ---------------------
 * Displays controls for sorting and filtering products:
 * - Sort by price, name, or date
 * - Filter by "Featured"
 * - Filter by category (multi-select)
 *
 * Props:
 * - filters: current filter state from parent component
 * - onChange: callback to send updated filters to parent
 */
export default function ProductFilter({ filters, onChange }) {
  // Custom hook that returns the handler functions for form changes
  const {
    handleSortChange,
    handleFeaturedChange,
    handleCategoryChange,
  } = useProductFilterHandlers(filters, onChange);

  return (
    <aside className="sidebar">
      {/* Sort section */}
      <h3>Sort</h3>
      <div className="sortDropdown">
        <select
          className="dropContent"
          value={filters.sortBy || ""}
          onChange={handleSortChange}
        >
          {/* Render options from config */}
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Featured filter */}
      <h3>Filter</h3>
      <label>
        <input
          type="checkbox"
          checked={filters.featured || false}
          onChange={handleFeaturedChange}
        />
        Featured
      </label>

      <hr />

      {/* Category filters */}
      <h4>Category</h4>
      {CATEGORY_OPTIONS.map((category) => (
        <React.Fragment key={category}>
          <label>
            <input
              type="checkbox"
              value={category}
              checked={filters.category?.includes(category)}
              onChange={handleCategoryChange}
            />
            {category}
          </label>
          <hr />
        </React.Fragment>
      ))}
    </aside>
  );
}
