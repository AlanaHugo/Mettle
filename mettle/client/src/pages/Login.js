// Import React and required hooks/libraries
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Login component receives setUser function via props to update app-level user state
const Login = ({ setUser }) => {
  // Local state to manage form input values
  const [form, setForm] = useState({ email: "", password: "" });

  // Updates form state when user types into the inputs
  const handleChange = (e) =>
    setForm({
      ...form, // Keep other form fields unchanged
      [e.target.name]: e.target.value, // Update only the changed field using input name
    });

  const navigate = useNavigate(); // Hook for navigating programmatically after login

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default HTML form behavior (page reload)

    try {
      // Send POST request to backend with login credentials
      const res = await axios.post("/api/auth/login", form, {
        headers: {
          "Cache-Control": "no-cache", // Prevent caching of login response
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      console.log("✅ Login success:", res.data); // Log response for debugging

      // Store the returned JWT token in localStorage for future authenticated requests
      localStorage.setItem("token", res.data.token);

      // Update the app's user state with the logged-in user's info
      setUser(res.data.user);

      // Navigate to the home page after successful login
      navigate("/");
    } catch (err) {
      // If login fails, show an error message
      console.error("❌ Login failed:", err);
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    // Login form using controlled components
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* Email input field */}
      <input
        name="email"
        type="email"
        onChange={handleChange} // Update state on input change
        placeholder="Email"
        required
      />

      {/* Password input field */}
      <input
        name="password"
        type="password"
        onChange={handleChange} // Update state on input change
        placeholder="Password"
        required
      />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
