import React, { useState } from "react";
import { registerUser } from "../../services/registerUser";
import { FormContainer, FullWidthInput } from "../../components/FormComponents"; // Using FullWidthInput only now
import "./Register.css";
import { PrimaryButton } from "../../components/Buttons";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Registered! Now log in.");
    } catch (err) {
      alert(err.response?.data?.message || "Error during registration.");
    }
  };

  return (
    <div className="formImage">
      <FormContainer className="formContainer">
        <form onSubmit={handleSubmit}>

          <div className="formHeader">
            <h2>Register</h2>
            <p>Register with us to share with our community...</p>
            <p>Already have an account?{" "}
              <Link to="/login" style={{ color: "#502419", textDecoration: "underline" }}>
                Login here.
              </Link>
            </p>
          </div>

          <div className="formFields">

            <FullWidthInput
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <FullWidthInput
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />

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

          <div className="formButton">
            <PrimaryButton type="submit">Register</PrimaryButton>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default Register;
