// hooks/useLoginForm.js

import { useState } from "react";

/**
 * useLoginForm
 * ----------------------
 * Custom React hook to manage login form state.
 */
export const useLoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /**
   * Handles input change for email and password fields
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, handleChange };
};
