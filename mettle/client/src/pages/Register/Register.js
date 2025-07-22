import React, { useState } from "react";
import { registerUser } from "../../services/registerUser.js";
import {
  FormContainer,
  FullWidthInput,
  SmallerInput,
} from "../../components/FormComponents.js"; // Using FullWidthInput only now
import "../../pages/Forms.css";
import { PrimaryButton } from "../../components/Buttons.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Registrations successful - welcome to Mettle");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error during registration.");
    }
  };

  return (
    <div className="formContainer">
      {/* contains background image and form contents */}
     
        <form onSubmit={handleSubmit}>
          <div className="HdrSection">
            {/*contains heading (h2) and description <p>*/}
            <h2>Register</h2>
            <p>Register with us to share with our community...</p>
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#502419", textDecoration: "underline" }}
              >
                Login here.
              </Link>
            </p>
          </div>

          <div className="nameInputs">
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
          <div className="formInputs">
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
          <div className="button">
            <PrimaryButton type="submit">Register</PrimaryButton>
          </div>
        </form>
      
    </div>
  );
};

export default Register;
