import axios from "axios";

/**
 * Fetch all articles from the API
 * @returns {Promise<Array>} Array of articles
 */
export async function fetchArticles() {
  try {
    const response = await axios.get("/api/articles");
    return response.data; // Return the array of articles
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Propagate error to caller
  }
}

/**
 * Fetch a single article by its ID from the API
 * @param {string} id - The article ID
 * @returns {Promise<Object>} Article data
 */
export async function fetchArticleById(id) {
  try {
    const response = await axios.get(`/api/articles/${id}`);
    return response.data; // Return the article object
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error; // Propagate error to caller
  }
}
