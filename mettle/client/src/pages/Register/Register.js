import React, { useState } from "react";
import { registerUser } from "../../services/registerUser"; // API call to register user
import { FormContainer, FullWidthInput, SmallerInput } from "../../components/FormComponents"; // Reusable form input components
import "./Register.css";
import { PrimaryButton } from "../../components/Buttons";

/**
 * Register Component
 * ------------------
 * Renders the user registration form.
 * Handles user input state and submits registration data to backend.
 * Shows success or error messages based on response.
 */
const Register = () => {
  // Local state object for form inputs (first name, last name, email, password)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  /**
   * Updates form state on user input.
   * Uses event target's name attribute to update matching state field.
   *
   * @param {object} e - Event object from input change
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission.
   * Prevents default form reload behavior.
   * Sends form data to backend via registerUser service function.
   * Displays an alert on success or failure.
   *
   * @param {object} e - Event object from form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form); // Make API call to register new user
      alert("Registered! Now log in."); // Inform user of success
    } catch (err) {
      // Show error message from backend or fallback generic message
      alert(err.response?.data?.message || "Error during registration.");
    }
  };

  return (
    <div className="formImage">
      {/* Container with consistent form styling */}
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          {/* Smaller input fields side-by-side for first and last name */}
          <div className="formFieldsSmall">
            <SmallerInput
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <SmallerInput
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Full-width inputs for email and password */}
          <div className="formFieldsLarge">
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
              placeholder="Choose a Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <div className="formButton">
            <PrimaryButton type="submit">Register</PrimaryButton>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default Register;
