import React from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Breadcrumbs.css";

const Breadcrumbs = ({ category, productName }) => {
  // Ensure category is a string for safe use
  const safeCategory = typeof category === "string" ? category : "";

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb navigation">
      <Link to="/">Home</Link>
      <ChevronRightIcon className="chevron" />
      <Link to="/products">Gift Shop</Link>

      {safeCategory && safeCategory.toLowerCase() !== "all" && (
        <>
          <ChevronRightIcon className="chevron" />
          <Link to={`/products?category=${safeCategory.toLowerCase()}`}>
            {safeCategory}
          </Link>
        </>
      )}

      {productName && (
        <>
          <ChevronRightIcon className="chevron" />
          <span>{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;

