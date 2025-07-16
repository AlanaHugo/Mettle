import axios from "axios";

/**
 * getCurrentUser
 * ---------------------------------
 * Retrieves the currently authenticated user's details.
 * Requires a valid JWT token to be stored in localStorage.
 *
 * @returns {Object|null} - The authenticated user object if valid, or null if not authenticated.
 */
export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await axios.get("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
