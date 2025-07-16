import React from "react";

/**
 * ProductFilter
 * --------------------------
 * Sidebar component that lets users:
 *  - Filter by 'featured' products
 *  - Filter by category (e.g., "Hospital Stay")
 *  - Sort products by price, name, or date
 *
 * Props:
 *  - filters: the current filters applied
 *  - onChange: function to update filters in parent component
 */
export default function ProductFilter({ filters, onChange }) {
  /**
   * Updates the selected sort option (e.g., price, A-Z)
   */
  const handleSortChange = (e) => {
    onChange({ ...filters, sortBy: e.target.value });
  };

  /**
   * Updates the "Featured" checkbox
   */
  const handleFeaturedChange = (e) => {
    onChange({ ...filters, featured: e.target.checked });
  };

  /**
   * Adds/removes category selections (e.g., "Hospital Stay")
   */
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    const currentCategories = filters.category || [];

    const updatedCategories = isChecked
      ? [...currentCategories, value] // add category
      : currentCategories.filter((c) => c !== value); // remove category

    onChange({ ...filters, category: updatedCategories });
  };

  return (
    <aside className="sidebar">
      {/* Sort dropdown */}
      <h3>Sort</h3>
      <div className="sortDropdown">
      <select className="dropContent" value={filters.sortBy || ""} onChange={handleSortChange}>
        <option value="">All</option>
        <option value="price">Price (Low to High)</option>
        <option value="alphabetical">A-Z</option>
        <option value="oldest">Oldest to Newest</option>
      </select>
      </div>
      <h3>Filter</h3>

      {/* Featured checkbox */}
      <label>
        <input
          type="checkbox"
          checked={filters.featured || false}
          onChange={handleFeaturedChange}
        />
        Featured
      </label>

      <hr />

      {/* Category filter section */}
      <h4>Category</h4>
      <label>
        <input
          type="checkbox"
          value="Hospital Stay"
          checked={filters.category?.includes("Hospital Stay")}
          onChange={handleCategoryChange}
        />
        Hospital Stay
      </label>
      <hr />
      <label>
        <input
          type="checkbox"
          value="Recovery"
          checked={filters.category?.includes("Recovery")}
          onChange={handleCategoryChange}
        />
        Recovery
      </label>

      <hr />
      <label>
        <input
          type="checkbox"
          value="Surgery"
          checked={filters.category?.includes("Surgery")}
          onChange={handleCategoryChange}
        />
        Surgery
      </label>

      <hr />
      <label>
        <input
          type="checkbox"
          value="Comfort"
          checked={filters.category?.includes("Comfort")}
          onChange={handleCategoryChange}
        />
        Comfort
      </label>

      <hr />
      <label>
        <input
          type="checkbox"
          value="Wellness"
          checked={filters.category?.includes("Wellness")}
          onChange={handleCategoryChange}
        />
        Wellness
      </label>

      <hr />
    </aside>
  );
}
