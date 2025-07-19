/**
 * SubmitArticle.jsx
 * -----------------
 * React component displaying form to submit a new article.
 * Requires user to be authenticated.
 */

import React, { useState, useContext } from "react";
import { submitArticle } from "../../services/submissionService.js";
import { UserContext } from "../../context/userContext.js"; // Adjust import path
import "./SubmitArticle.css";

const SubmitArticle = () => {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    
  }; // Assume user context provides token & logout
  const [form, setForm] = useState({
    aboutAuth: "",
    content: "",
    contact: false,
    social: "",
    anonymous: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.aboutAuth || !form.content) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!token) {
      setError("You must be logged in to submit.");
      logout(); // or redirect to login
      return;
    }

    try {
      await submitArticle(form, token);
      setSuccess("Submission successful!");
      setForm({
        aboutAuth: "",
        content: "",
        contact: false,
        social: "",
        anonymous: false,
      });
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Session expired, please log in again.");
        logout();
      } else {
        setError("Submission failed. Try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        About Author*:
        <input
          type="text"
          name="aboutAuth"
          value={form.aboutAuth}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Content*:
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Allow Contact:
        <input
          type="checkbox"
          name="contact"
          checked={form.contact}
          onChange={handleChange}
        />
      </label>

      <label>
        Social Media:
        <input
          type="text"
          name="social"
          value={form.social}
          onChange={handleChange}
        />
      </label>

      <label>
        Submit Anonymously:
        <input
          type="checkbox"
          name="anonymous"
          checked={form.anonymous}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default SubmitArticle;
