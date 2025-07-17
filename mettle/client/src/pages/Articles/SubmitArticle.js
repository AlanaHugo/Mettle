import React, { useState } from "react";
import axios from "axios";

// Import reusable styled button components
import { PrimaryButton } from "../../components/Buttons";

// Import reusable form components with styles and layout
import {
  FullWidthInput,
  FullTextInput,
  FormContainer,
} from "../../components/FormComponents";

import "./SubmitArticle.css";

/**
 * SubmitArticle Component
 * -----------------------
 * Renders a form to submit a new article with fields for title,
 * author bio line, content, and an anonymous checkbox.
 * Handles input changes, form submission with authentication token,
 * and error/success feedback.
 */
const SubmitArticle = () => {
  // Form state tracks input values, initialized empty and anonymous false
  const [form, setForm] = useState({
    title: "",
    aboutAuth: "",
    content: "",
    anonymous: false,  // <-- ensure this matches checkbox name!
  });

  /**
   * handleChange
   * ------------
   * Generic input change handler for text inputs and checkboxes.
   * Updates the form state by name. For checkboxes, updates boolean checked value.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * handleSubmit
   * ------------
   * Handles form submission.
   * Sends POST request to backend API with form data and JWT token from localStorage.
   * Shows success or error alerts depending on result.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get JWT token for authorization

    try {
      // Send POST request with form data and auth header
      await axios.post("/api/articles", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Article submitted!"); // Feedback on success
    } catch (err) {
      // Show backend error message or generic fail message
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="formImage">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {/* Form header */}
          <div className="header">
            <h2>Submit an Article</h2>
          </div>

          {/* Title input field */}
          <FullWidthInput
            name="title"
            placeholder="Give your submission a title"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* About Author input field */}
          <FullWidthInput
            name="aboutAuth"
            placeholder="Tell us one line about you and your situation, diagnosis or area of expertise"
            value={form.aboutAuth}
            onChange={handleChange}
            required
          />

          {/* Article content multiline input */}
          <FullTextInput
            name="content"
            placeholder="Share your story, advice or recommendation here"
            value={form.content}
            onChange={handleChange}
            required
          />

          {/* Checkbox to toggle anonymous submission */}
          <label style={{ display: "block", marginTop: "1rem" }}>
            <input
              type="checkbox"
              name="anonymous" //match state key
              checked={form.anonymous}
              onChange={handleChange} // Use the same generic handler
            />
            Submit anonymously
          </label>

          {/* Submit button */}
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </form>
      </FormContainer>
    </div>
  );
};

export default SubmitArticle;
