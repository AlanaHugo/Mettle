import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { loginUser } from "../../services/loginUser.js"; // API service for login
import { useLoginForm } from "../../hooks/useLoginForm.js"; // Custom hook for input state
import { useUser } from "../../context/userContext.js"; // Access global user context
import {
  FullWidthInput
} from "../../components/FormComponents.js"; // Reusable styled input components
import { PrimaryButton } from "../../components/Buttons.js"; // Styled button

import "../../pages/Forms.css"; // Local styles

/**
 * Login Component
 * ------------------------
 * Handles:
 * - User input via custom hook
 * - Form submission and authentication
 * - Storing JWT token
 * - Updating global user context
 * - Redirecting on success
 * - Displaying logout message if redirected from logout
 */
const Login = () => {
  const { setUser } = useUser(); // Update global user context after login
  const { form, handleChange } = useLoginForm(); // Handle form state

  const navigate = useNavigate(); // Redirect on successful login
  const location = useLocation(); // Access route state (e.g., logout message)

  const logoutMessage = location.state?.message; // Check for logout feedback

  /**
   * Submit handler for login form
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload

    try {
      const data = await loginUser(form); // Call API with credentials
      console.log("Login API data:", data);

      if (!data.token || !data.user) {
        throw new Error("Incomplete login response from server");
      }

      localStorage.setItem("token", data.token); // Save token
      setUser(data.user); // Update user context
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error("Login error caught:", err);
      alert(err.response?.data?.message || err.message || "Login error");
    }
  };

  return (
    <div className="formContainer">
      {/* contains background image and form contents */}

      <form onSubmit={handleSubmit}>
        <div className="HdrSection">
          {/*contains heading (h2) and description <p>*/}
          <h2>Login</h2>
          <p>
            Login to your Mettle account to send us your recommendations, <br />
            share your story or manage submissions you've made.
          </p>
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#502419", textDecoration: "underline" }}
            >
              Register here.
            </Link>
          </p>
        </div>

        <div className="formInputs">
          <FullWidthInput
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <FullWidthInput
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button">
          <PrimaryButton type="submit">Login</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
