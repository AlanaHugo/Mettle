// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "../services/logoutUser.js"; // Adjust path as needed

// Create the context
export const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for token on first load and decode it
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
        logoutUser(); // Remove bad token
      }
    }
  }, []);

  // Logout function to clear token and state
  const logout = () => {
    logoutUser();   // Remove token from localStorage
    setUser(null);  // Clear user state
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing context
export const useUser = () => useContext(UserContext);
