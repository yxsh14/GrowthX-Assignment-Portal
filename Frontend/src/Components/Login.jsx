import React, { useState } from "react";

import "../Pages/Home/Home.css";
import { validateEmail, validatePassword } from "../utils/Validation";
const Login = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!validateEmail(formData.email)) validationErrors.email = "Invalid email address";
    if (!validatePassword(formData.password)) validationErrors.password = "Password must be at least 8 characters";
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onFormSubmit(formData); // Pass data to parent
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
