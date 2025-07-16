import axios from "axios";

/**
 * registerUser
 * ------------
 * Sends a POST request to the backend API to register a new user.
 * 
 * @param {Object} formData - An object containing `username`, `email`, and `password`
 * @returns {Promise<Object>} - Response data from server (if needed)
 */
export async function registerUser(formData) {
  const res = await axios.post("/api/auth/register", formData);
  return res.data;
}
