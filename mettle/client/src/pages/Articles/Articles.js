import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { fetchArticles } from "../../controllers/Articles/fetchArticlesController";
import ArticleCard from "../../components/Articles/articleCards";
import BackToTop from "../../components/BackToTop/BackToTop";
import ArticleFilter from "../../components/Articles/ArticleFilter";
import { sortArticles , filterArticles } from "../../controllers/Articles/filterController";

const Articles = () => {
  const [articles, setArticles] = useState([]);

const [filters, setFilters] = useState({
  tags: [],
  sortBy: "",
});

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(console.error);
  }, []);

  const filtered = filterArticles (articles, filters);
  const sorted = sortArticles (filtered, filters.sortBy);

  return (
    <div className= "page-layout">
      <ArticleFilter filters={filters} onChange={setFilters} />
      <Grid container spacing={2} padding={2}>
        {sorted.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
      <BackToTop />
    </div>
  );
};

export default Articles;
