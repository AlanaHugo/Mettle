/**
 * logoutUser
 * ---------------------------------
 * Clears the stored JWT token from localStorage to log out the user.
 * This effectively ends the user's session on the client side.
 */
export function logoutUser() {
  localStorage.removeItem("token");
}
