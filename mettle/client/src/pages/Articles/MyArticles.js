import React, { useEffect, useState, useContext } from "react";
import { useNavigate , Link } from "react-router-dom";
import { UserContext } from "../../context/userContext.js";
import api from "../../services/api.js";
import "./myArticles.css"
import { PrimaryButton , SecondaryButton } from "../../components/Buttons.js"

console.log("✅ MyArticles component mounted");

const MyArticles = () => {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    console.log("Current user in effect:", user);

    if (!user || !user.id || !token) {
      return;
    }

    console.log("📦 Fetching articles for user:", user);

    const fetchMyArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get("/my-articles/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched articles:", res.data);
        setArticles(res.data);
      } catch (err) {
        setError("Failed to fetch your articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [user]);

  if (loading) return <p>Loading your articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!articles.length) return <p>You haven't submitted any articles yet.</p>;

  // Delete article by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await api.delete(`/my-articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArticles((prevArticles) => prevArticles.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete article.");
    }
  };

  // Navigate to edit page for the article
  const handleEdit = (id) => {
    navigate(`/edit-article/${id}`);
  };

  return (
    <div className="pageDiv">
    <div className="mtArticleHdr">
      <h2>Submission Management</h2>
      <p>View, edit or delete community submissions you've made here.</p>
      </div>
    <div className="articleContainer">
      
      {articles.map((article) => (
        <div
          key={article._id}
          className="articleDetails"
        >
          <h2 className="ArticleTitle">{article.title}</h2>
          {/* Use 'content' since your backend example has that field */}
          <p className="text-gray-700 mt-2">
            {article.body
              ? article.body.substring(0, 100)
              : "No content available"}
            ...
          </p>
          <div className="ButtonContainer">
            <Link to={`/edit-article/${article._id}`}>
              <PrimaryButton>Edit</PrimaryButton>
            </Link>
            <SecondaryButton
              onClick={() => handleDelete(article._id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </SecondaryButton>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyArticles;
