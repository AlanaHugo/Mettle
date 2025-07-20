import React from "react";
import { Link } from "react-router-dom";

const SearchResultsView = ({ products, articles }) => {
  if ((!products.length) && (!articles.length)) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <h2>Search Results</h2>

      {products.length > 0 && (
        <>
          <h3>Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product._id || product.id}>
                {/* Link to product detail page */}
                <Link to={`/products/${product._id || product.id}`}>
                  <h4>{product.title || product.name}</h4>
                </Link>
                <p>{product.description || "No description available."}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {articles.length > 0 && (
        <>
          <h3>Articles</h3>
          <ul>
            {articles.map((article) => (
              <li key={article._id || article.id}>
                {/* Link to article detail page */}
                <Link to={`/articles/${article._id || article.id}`}>
                  <h4>{article.title}</h4>
                </Link>
                <p>{article.body?.substring(0, 100) || "No content available."}...</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResultsView;
