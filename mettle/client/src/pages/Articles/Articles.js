import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

// Import function to fetch articles from backend
import { fetchArticles } from "../../controllers/Articles/fetchArticlesController.js";

// Import reusable components
import ArticleCard from "../../components/Articles/ArticleCards.js";
import BackToTop from "../../components/BackToTop/BackToTop.js";
import ArticleFilter from "../../components/Articles/ArticleFilter.js";

// Import filter and sort functions for article data
import {
  sortArticles,
  filterArticles,
} from "../../controllers/Articles/filterController.js";

// Styles specific to Articles page
import "../Articles/Articles.css";

/**
 * Articles Component
 * ------------------
 * Fetches and displays a list of articles with optional filtering and sorting.
 * Articles are displayed in a responsive grid layout using Material UI Grid.
 */
const Articles = () => {
  // State to store articles fetched from backend
  const [articles, setArticles] = useState([]);

  // State to hold the current filters and sort selection
  const [filters, setFilters] = useState({
    tags: [],   // array of selected tags for filtering
    sortBy: "", // sort key, e.g., "date" or "title"
  });

  // Fetch articles once on component mount
  useEffect(() => {
    fetchArticles()
      .then(setArticles)  // store articles in state
      .catch(console.error); // log errors if fetch fails
  }, []);

  // Filter articles by selected tags
  const filtered = filterArticles(articles, filters);

  // Sort the filtered articles by selected criteria
  const sorted = sortArticles(filtered, filters.sortBy);

  return (
    <div className="page-layout">
      {/* Sidebar filter controls */}
      <ArticleFilter filters={filters} onChange={setFilters} />
      
      {/* Grid container for article cards */}
      <Grid container spacing={2} padding={2}>
        {sorted.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            {/* Render each article card */}
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>

      {/* Back to top button */}
      <BackToTop />
    </div>
  );
};

export default Articles;
