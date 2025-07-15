import axios from "axios";

/**
 * loginUser
 * ---------------------------------
 * Sends a POST request to log in the user using their email and password.
 * Expects a response containing a JWT token and user object from the server.
 *
 * @param {Object} credentials - An object containing 'email' and 'password'
 * @returns {Object} - The server response containing { user, token }
 */
export async function loginUser(credentials) {
  const res = await axios.post("/api/auth/login", credentials, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return res.data;
}
