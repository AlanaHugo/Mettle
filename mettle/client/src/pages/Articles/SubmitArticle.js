import React, { useState } from "react";
import { PrimaryButton } from "../../components/Buttons"; // Reusable styled button component
import {
  FullWidthInput,
  FullTextInput,
  FormContainer,
} from "../../components/FormComponents"; // Reusable styled input components and layout container
import { submitArticle } from "../../services/submissionService"; // API call helper to submit article data
import { LabeledCheckbox } from "../../components/Checkboxes"; // Checkbox component with label support
import "./SubmitArticle.css"; // Custom CSS styles for the submission form

/**
 * SubmitArticle Component
 * -----------------------
 * Renders a form that allows users to submit articles or stories.
 * The form collects title, author bio, content, contact permission,
 * social media handle, and anonymous submission option.
 */
const SubmitArticle = () => {
  // State hook to manage all form fields in a single object
  const [form, setForm] = useState({
    aboutAuth: "",    // One-line author bio
    content: "",      // Main article content
    contact: false,   // Boolean: whether user is open to being contacted
    social: "",       // Optional social media handle
    anonymous: false, // Boolean: submit anonymously flag
  });

  /**
   * handleChange
   * ------------
   * Handles all input changes for text inputs and checkboxes.
   * It dynamically updates the corresponding field in the form state
   * by using the input's "name" attribute.
   * 
   * @param {Object} e - The event object from input change
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update state; for checkboxes use checked value, else use input value
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * handleSubmit
   * ------------
   * Called when the user submits the form.
   * It:
   *  - Prevents default page reload
   *  - Retrieves JWT token from localStorage (for auth)
   *  - Calls the API service method to send form data and token
   *  - Alerts success or error messages
   *  - Resets the form on success
   * 
   * @param {Object} e - The event object from form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Retrieve auth token from localStorage (adjust if using context or Redux)
    const token = localStorage.getItem("token");

    try {
      // Call backend API to submit the article, passing form data and auth token
      await submitArticle(form, token);

      alert("Thank you for your submission!"); // Notify user of success

      // Reset all form fields to initial empty/false values
      setForm({
        aboutAuth: "",
        content: "",
        contact: false,
        social: "",
        anonymous: false,
      });
    } catch (err) {
      // Log error for debugging in console
      console.error("Submission failed:", err);

      // Show user friendly error message if available, otherwise generic
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="formImage">
      {/* Form container centers the form and applies consistent styling */}
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h2>Submit an Article</h2>
          </div>

         

          {/* Author bio input - required */}
          <FullWidthInput
            name="aboutAuth"
            placeholder="Tell us one line about you and your situation, diagnosis or area of expertise"
            value={form.aboutAuth}
            onChange={handleChange}
            required
          />

          {/* Main content textarea input - required */}
          <FullTextInput
            name="content"
            placeholder="Share your story, advice or recommendation here"
            value={form.content}
            onChange={handleChange}
            required
          />

          {/* Checkbox to allow contact - optional */}
          <LabeledCheckbox
            name="contact"
            checked={form.contact}
            onChange={handleChange}
            label="I'm open to being contacted"
          />

          {/* Optional social media handle input */}
          <FullWidthInput
            name="social"
            placeholder="Add your social media handle (optional)"
            value={form.social}
            onChange={handleChange}
          />

          {/* Checkbox to submit anonymously */}
          <LabeledCheckbox
            name="anonymous"
            checked={form.anonymous}
            onChange={handleChange}
            label="Submit anonymously"
          />

          {/* Submit button */}
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </form>
      </FormContainer>
    </div>
  );
};

export default SubmitArticle;
