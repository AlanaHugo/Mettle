import React from "react";
import { Paper, Typography } from "@mui/material";
import "./ArticleCard.css";
import { Link } from "react-router-dom";


export default function ArticleCard({ article }) {
  if (!article) return <Typography>Article not found.</Typography>;

  return (
    // Link to article using ID
    <Link
      to={`/articles/${article._id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <Paper className="articleCardPaper" elevation={3}>
        <h3 className="articleCardTitle" gutterBottom>
          {article.title}
        </h3>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          by {article.author} •{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" className="articleCardBody">
          {article.body
            ? `${article.body.slice(0, 200)}...`
            : "No preview available."}
        </Typography>
      </Paper>
    </Link>
  );
}
