// Login.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/loginUser"; // Service for login request
import { useLoginForm } from "../../hooks/useLoginForm"; // Custom hook for handling input state
import { FormContainer ,SmallerInput } from "../../components/FormComponents"; // Reusable inputs
import { PrimaryButton } from "../../components/Buttons";
import "./Login.css"; //import local CSS




/**
 * Login page.
 * Displays a login form and handles user authentication.
 */
const Login = ({ setUser }) => {
  const { form, handleChange } = useLoginForm();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form); // Calls API via service
      localStorage.setItem("token", data.token); // Store token
      setUser(data.user); // Set user context or state
      navigate("/"); // Redirect to home
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="formImage">
    <FormContainer>
      
      <form onSubmit={handleSubmit}>
        <h2 className="formHeader">Login</h2>
        <p className="formBody">Login to your Mettle account to 
          give your recommendations, <br/>
          share your story or manage submissions 
          you've made. </p>
        <div className="formFields">
        <SmallerInput
          name="email"
          type="text"
          placeholder="Email or Username"
          value={form.email}
          onChange={handleChange}
          required
        />
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
        <PrimaryButton>Login</PrimaryButton>
        </div>
        <p className="formBody">
  Don't have a Mettle account yet? Register{" "}
  <Link to="/register" style={{ color: "#502419", textDecoration: "underline" }}>
    here
  </Link>.
</p>
        </form>

    </FormContainer>
    </div>
  );
};

export default Login;
