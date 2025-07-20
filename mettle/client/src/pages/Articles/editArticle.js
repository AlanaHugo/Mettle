import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticleById } from "../../controllers/Articles/fetchArticlesController.js";
import axios from "axios";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch article data on mount
  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
        setTitle(data.title);
        setBody(data.body);
      } catch (err) {
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(
        `/api/my-articles/${id}`,
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/my-articles"); // Redirect to your articles list page after update
    } catch (err) {
      setError("Failed to update the article.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-4">
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={10}
            className="border p-2 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
