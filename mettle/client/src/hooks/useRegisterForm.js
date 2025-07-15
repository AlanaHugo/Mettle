// src/hooks/useRegisterForm.js

import { useState } from "react";

/**
 * Custom hook: useRegisterForm
 * ----------------------------
 * Manages the state of the registration form fields.
 * Provides:
 * - `form`: current input values
 * - `handleChange`: updates form state when input changes
 */
export function useRegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  /**
   * Updates the form state on input change
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, handleChange };
}
