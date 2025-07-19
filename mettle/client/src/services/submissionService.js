/**
 * submissionService.js
 * --------------------
 * Handles API calls related to submissions.
 */

import axios from 'axios';

// Backend base URL, update if your backend runs elsewhere
const api = axios.create({
  baseURL: "http://localhost:5000",
});

/**
 * submitArticle
 * -------------
 * Sends POST request with submission data and JWT token.
 * @param {Object} submissionData - Form data (aboutAuth, content, etc)
 * @param {string} token - JWT token for auth
 * @returns Axios promise
 */
export const submitArticle = (submissionData, token) => {
  return api.post('/api/submission', submissionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
