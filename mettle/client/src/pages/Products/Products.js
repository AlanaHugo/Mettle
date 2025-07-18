// Import React and hooks for managing state and lifecycle
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// Import the filter sidebar and individual product card component
import ProductFilter from "../../components/Products/ProductFilter";
import ProductCard from "../../components/Products/ProductCard";

// Import controller functions that fetch, filter, and sort products
import { fetchProducts } from "../../controllers/Products/fetchProductsController";

import {
  sortProducts,
  filterProducts,
} from "../../controllers/Products/filterController";

// Import component-specific styling
import "./Products.css";

// Import reusable "Back to Top" button
import BackToTop from "../../components/BackToTop/BackToTop";

// Main Products page component
export default function Products() {
  // State to hold all fetched products
  const [products, setProducts] = useState([]);

  // State to track active filters (e.g., category, sort)
  const location = useLocation();
const [filters, setFilters] = useState(location.state?.filters || {});

  // When the component first loads, fetch product data from backend
  useEffect(() => {
    fetchProducts()
      .then(setProducts) // Save fetched products to state
      .catch(console.error); // Log errors if the request fails
  }, []);

  // Filter the list of products based on selected filters
  const filtered = filterProducts(products, filters);

  // Sort the filtered products based on the selected sort option
  const sorted = sortProducts(filtered, filters.sortBy);

  return (
    <div className="page-layout">
      {/* Sidebar with filter and sort options */}
      <ProductFilter filters={filters} onChange={setFilters} />

      {/* Main content area */}
      <main className="content">
        <div className="product-grid">
          {/* Loop through sorted products and display each one */}
          {sorted.map((product) => (
  <ProductCard key={product._id} product={product} filters={filters} />
))}
        </div>
      </main>

      {/* Scroll to top button at bottom of page */}
      <BackToTop />
    </div>
  );
}
