import axios from "axios";

/**
 * Sends login request to API with email and password.
 * @param {Object} credentials - { email, password }
 * @returns {Promise} resolves with user data and token
 */
export async function loginUser(credentials) {
  const response = await axios.post("/api/auth/login", credentials, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return response.data;
}