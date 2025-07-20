// src/context/userContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // default import
import { logoutUser } from "../services/logoutUser.js"; // your logout helper

// Create the context
export const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, decode token if present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Normalize user object to use `id` instead of `_id`
        const normalizedUser = {
          ...decoded,
          id: decoded.id || decoded._id || decoded.userId, // prefer id; fallback to others
        };

        setUser(normalizedUser);
      } catch (err) {
        console.error("Invalid token:", err);
        logoutUser(); // clear bad token & user state
      }
    }
  }, []);

  // Logout function clears token and user state
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access to user context
export const useUser = () => useContext(UserContext);
