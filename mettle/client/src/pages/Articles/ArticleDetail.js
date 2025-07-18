//Imports
import React from "react";
import { useParams } from "react-router-dom"; // React Router hook to extract dynamic route parameters
import useFetchArticle from "../../hooks/useFetchArticle"; // Custom hook to fetch a single article based on ID
import "./ArticleDetails.css"; //styling
import { PrimaryButton } from '../../components/Buttons' 
import { Link } from "react-router-dom";

// ArticleDetail component displays a full article based on the ID in the URL
const ArticleDetail = () => {
  // Extract the 'id' parameter from the URL (e.g., /articles/:id)
  const { id } = useParams();

  // Fetch the article data using a custom hook. Returns article, loading state, and error.
  const { article, loading, error } = useFetchArticle(id);

  // Show loading message while the article is being fetched
  if (loading) return <p>Loading...</p>;

  // Show error message if fetching the article fails
  if (error) return <p>{error}</p>;

  // Show a fallback message if the article doesn't exist
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="pageDiv">
      {/* Left side space or ad container */}
      <div className="adDiv1"></div>

      {/* Main article container */}
      <div className="articleContainer">
        {/* Article content block */}
        <div className="articleDiv">
          {/* Article title */}
          <h2 className="articleHeader">{article.title}</h2>

          {/* Article author name */}
          <h3>{article.author || "Unknown Author"}</h3>

          {/* Author description — currently placeholder text */}
          <p className="authDescr">
            {article.author
              ? `${article.author}. ${article.aboutAuth}.`
              : "Contributor bio coming soon."}
          </p>

          {/* Main article content */}
          <p>{article.body}</p>

          {/* Article creation date formatted as a readable string */}
          <p>
            Posted{" "}
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>
        </div>

        {/* Section encouraging users to contribute their own stories */}
        <div className="SubContainer">
          <h3>We'd love to hear your story</h3>
          <p>Share your experience to inspire others and lighten your load. You can also 
            share your thoughts on supplies that helped you or someone you know 
            through their medical journey. You can even share anonymously. </p>
          <PrimaryButton component={Link} to="/register">Share Your Story</PrimaryButton>
        </div>
      </div>
      

      {/* Right side space or ad container */}
      <div className="adDiv2"></div>
    </div>
  );
};

export default ArticleDetail;