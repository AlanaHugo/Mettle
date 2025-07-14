import React, { useState, useEffect } from "react";
import ProductFilter from "../../components/Products/ProductFilter";
import ProductCard from "../../components/Products/ProductCard";
import {
  fetchProducts,
  filterProducts,
  sortProducts,
} from "../../controllers/productController";
import "./Products.css";
import BackToTop from "../../components/BackToTop/BackToTop";

export default function Products() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const filtered = filterProducts(products, filters);
  const sorted = sortProducts(filtered, filters.sortBy);

  return (
    <div className="page-layout">
      <ProductFilter filters={filters} onChange={setFilters} />
      <main className="content">
        <div className="product-grid">
          {sorted.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
      <BackToTop />
    </div>
  );
}
