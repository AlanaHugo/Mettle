import axios from "axios";

// Create axios instance with backend base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // Change if your backend runs elsewhere
});

/**
 * Sends a new submission to the backend API.
 * @param {Object} submissionData - Form data including aboutAuth, content, anonymous, etc.
 * @param {string} token - JWT token for authentication.
 * @returns {Promise} Axios response promise.
 */
export const submitArticle = (submissionData, token) => {
  return api.post("/api/submission", submissionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
