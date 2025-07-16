import React from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Breadcrumbs.css";

const Breadcrumbs = ({ category, productName }) => (
  <nav className="breadcrumbs" aria-label="breadcrumb navigation">
    <Link to="/">Home</Link>
    <ChevronRightIcon className="chevron"/>
    <Link to="/products">Gift Shop</Link>

    {category && category.toLowerCase() !== "all" && (
      <>
        <ChevronRightIcon className="chevron"/>
        <Link to={`/products?category=${category.toLowerCase()}`}>
          {category}
        </Link>
      </>
    )}

    {productName && (
      <>
        <ChevronRightIcon className="chevron"/>
        <span>{productName}</span>
      </>
    )}
  </nav>
);

export default Breadcrumbs;
