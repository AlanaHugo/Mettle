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
  const [form, setForm] = useState({
    title: "",
    aboutAuth: "",
    content: "",
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("/api/articles", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Article submitted!");
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="formImage">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h2>Submit an Article</h2>
          </div>

          <FullWidthInput
            name="title"
            placeholder="Give your submission a title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <FullWidthInput
            name="aboutAuth"
            placeholder="Tell us one line about you and your situation, diagnosis or area of expertise"
            value={form.aboutAuth}
            onChange={handleChange}
            required
          />

          <FullTextInput
            name="content"
            placeholder="Share your story, advice or recommendation here"
            value={form.content}
            onChange={handleChange}
            required
          />

          <label style={{ display: "block", marginTop: "1rem" }}>
            <input
              type="checkbox"
              name="anonymous"
              checked={form.anonymous}
              onChange={handleChange}
            />
            Submit anonymously
          </label>

          <PrimaryButton type="submit">Submit</PrimaryButton>
        </form>
      </FormContainer>
    </div>
  );
};

export default SubmitArticle;
