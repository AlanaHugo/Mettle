import React, { useEffect, useState } from "react";
import { getSearchResults } from "./SearchResultsController";
import SearchResultsView from "./SearchResultsView";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  // Get the current URL location object
  const location = useLocation();

  // Parse query parameters from the URL (?q=searchTerm)
  const queryParams = new URLSearchParams(location.search);

  // Extract the 'q' parameter value (the search term)
  const searchTerm = queryParams.get("q");

  // State to store the search results data
  const [results, setResults] = useState([]);

  // State to track whether the search results are loading
  const [loading, setLoading] = useState(true);

  // State to track if there was an error fetching results
  const [error, setError] = useState(null);

  // useEffect runs when 'searchTerm' changes (or on first render)
  useEffect(() => {
    // If there's no search term, clear results and stop loading
    if (!searchTerm) {
      setResults([]);
      setLoading(false);
      return; // exit early
    }

    // Start loading before fetching
    setLoading(true);

    // Call the function that fetches results from backend
    getSearchResults(searchTerm)
      .then((data) => {
        // On success, save the results and stop loading
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        // On error, save error message and stop loading
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm]); // dependency array: run effect when searchTerm changes

  // While fetching, show a loading message
  if (loading) return <p>Loading...</p>;

  // If error , show error message
  if (error) return <p>Error: {error}</p>;

  // If all is good, render the results with SearchResultsView component
  return <SearchResultsView results={results} />;
};

export default SearchResultsPage;
