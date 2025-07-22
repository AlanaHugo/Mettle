/**
 * SubmitArticle.jsx
 * -----------------
 * React component displaying form to submit a new article.
 * Requires user to be authenticated.
 */

import React, { useState, useContext } from "react";
import { submitArticle } from "../../services/submissionService.js";
import { UserContext } from "../../context/userContext.js"; // Adjust import path
import "../../pages/Forms.css";
import {
  SmallerInput,
  FullWidthInput,
} from "../../components/FormComponents.js";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons.js";

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
      console.log("Form data being submitted:", form);
      await submitArticle({ ...form, userId: user?._id }, token);
      setSuccess("Submission successful!");
      setForm({
        aboutAuth: "",
        content: "",
        contact: false,
        social: "",
        anonymous: false,
        userId: user?._id || "",
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
    <>
      <div className="formContainer">
        {/* contains background image and form contents */}

        <form onSubmit={handleSubmit}>
          <div className="HdrSection">
            {/*contains heading (h2) and description <p>*/}
            <h2>Share with our community</h2>
            <p>
              It may be advice, product and gift recommendations or just your
              story. <br />
              Whatever it is, we'd love to hear it.
            </p>
          </div>

          <div className="formInputs">
            <label>
              About you:
              <FullWidthInput
                name="aboutAuth"
                placeholder="Tell us a little about yourself"
                value={form.aboutAuth}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Your submission:
              <textarea
                class="submissionInput"
                name="content"
                value={form.content}
                onChange={handleChange}
                required
              />
            </label>
            <div className="checkboxRow">
              <input
                type="checkbox"
                name="anonymous"
                checked={form.anonymous}
                onChange={handleChange}
              />
              <label htmlFor="anonymous">Submit anonymously</label>
            </div>

            <div className="checkboxRow">
              <input
                type="checkbox"
                name="contact"
                checked={form.contact}
                onChange={handleChange}
              />
              <label htmlFor="contact">Allow contact via social media</label>
            </div>

            <label>
              Social Media:
              <input
                type="text"
                name="social"
                value={form.social}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="button">
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
    </>
  );
};

export default SubmitArticle;
