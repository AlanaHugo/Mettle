import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { fetchArticles } from "../../controllers/articleController";
import ArticleCard from "../../components/Articles/articleCards";
import BackToTop from "../../components/BackToTop/BackToTop";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(console.error);
  }, []);

  return (
    <>
      <Grid container spacing={2} padding={2}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
      <BackToTop />
    </>
  );
};

export default Articles;
