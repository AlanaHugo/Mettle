// SearchResultsPage.js
import React, { useEffect, useState } from "react";
import { getSearchResults } from "./SearchResultsController.js"; // your existing controller
import SearchResultsView from "./SearchResultsView.js";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");

  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setProducts([]);
      setArticles([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    getSearchResults(searchTerm)
      .then((data) => {
        setProducts(data.products || []);
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <SearchResultsView products={products} articles={articles} />;
};

export default SearchResultsPage;
