// Login.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/loginUser"; // API call for login
import { useLoginForm } from "../../hooks/useLoginForm"; // Custom hook to handle form inputs
import { FormContainer, SmallerInput } from "../../components/FormComponents"; // Styled reusable inputs
import { PrimaryButton } from "../../components/Buttons"; // Styled button component
import { useUser } from "../../context/userContext"; // Custom hook for auth context
import "./Login.css"; // Local CSS styles

/**
 * Login component
 * ----------------
 * Renders a login form, handles user input, submits login request,
 * stores auth token on success, updates global user context, and redirects.
 */
const Login = () => {
  // Destructure setUser from global UserContext (manages logged-in user state)
  const { setUser } = useUser();

  // Custom hook manages form state and change handlers
  const { form, handleChange } = useLoginForm();

  // React Router hook for navigation after successful login
  const navigate = useNavigate();

  /**
   * Handles form submission for login.
   * Prevents default page reload.
   * Calls loginUser service to authenticate.
   * On success, stores JWT token in localStorage, updates user context, and navigates home.
   * On failure, displays error alert.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send credentials to backend login API
      const data = await loginUser(form);
      console.log("✅ Login API data:", data);

      // Check if response contains required token and user object
      if (!data.token || !data.user) {
        throw new Error("Incomplete login response from server");
      }

      // Save JWT token to localStorage for persistence
      localStorage.setItem("token", data.token);

      // Update global user state to logged-in user data
      setUser(data.user);

      // Redirect user to homepage (or other protected page)
      navigate("/");
    } catch (err) {
      // Log error to console for debugging
      console.error("❌ Login error caught:", err);

      // Show user-friendly error alert (backend message if available)
      alert(err.response?.data?.message || err.message || "Login error");
    }
  };

  // Render login form UI
  return (
    <div className="formImage">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <h2 className="formHeader">Login</h2>
          <p className="formBody">
            Login to your Mettle account to give your recommendations, <br />
            share your story or manage submissions you've made.
          </p>
          <div className="formFields">
            {/* Email or username input */}
            <SmallerInput
              name="email"
              type="text"
              placeholder="Email or Username"
              value={form.email}
              onChange={handleChange}
              required
            />
            {/* Password input */}
            <SmallerInput
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formButton">
            {/* Submit button triggers form submit */}
            <PrimaryButton type="submit">Login</PrimaryButton>
          </div>
          <p className="formBody">
            Don't have a Mettle account yet? Register{" "}
            <Link
              to="/register"
              style={{ color: "#502419", textDecoration: "underline" }}
            >
              here
            </Link>
            .
          </p>
        </form>
      </FormContainer>
    </div>
  );
};

export default Login;
