import api from "./api.js"; // Import axios instance

/**
 * Fetch logged-in user's articles from /my-articles/mine
 * @param {string} token JWT token for authentication
 * @returns {Promise<Array>} Array of article objects
 */
export const fetchMyArticles = async (token) => {
  const res = await api.get("/my-articles/mine", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Update an article's content by ID
 * @param {string} id Article ID
 * @param {string} content New content/body text
 * @param {string} token JWT token for authentication
 * @returns {Promise<Object>} Updated article object
 */
export const updateArticle = async (id, content, token) => {
  const res = await api.put(
    `/my-articles/${id}`,
    { content },  // must match your backend expects `content` not `body`
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

/**
 * Delete an article by ID
 * @param {string} id Article ID
 * @param {string} token JWT token for authentication
 * @returns {Promise<Object>} Delete confirmation message
 */
export const deleteArticle = async (id, token) => {
  const res = await api.delete(`/my-articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
