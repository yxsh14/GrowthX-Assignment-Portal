import React, { useState } from "react";
import "../Pages/Home/Home.css";
import { validateEmail, validatePassword,validateName,validateSecret } from "../utils/Validation";

const Signup = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminSecret: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!validateEmail(formData.email)) validationErrors.email = "Invalid email address";
    if (!validatePassword(formData.password)) validationErrors.password = "Password must be at least 8 characters";
    if (!validateName(formData.fullName)) validationErrors.fullName = "Full name is required";
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (isAdmin && !validateSecret(formData.adminSecret)) {
      validationErrors.adminSecret = "Invalid admin secret";
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onFormSubmit(formData, isAdmin); // Pass data and isAdmin flag to parent
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="adminCheckbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label htmlFor="adminCheckbox">Sign up as Admin</label>
        </div>
        {isAdmin && (
          <input
            type="text"
            name="adminSecret"
            placeholder="Admin Secret"
            value={formData.adminSecret}
            onChange={handleInputChange}
          />
        )}
        {errors.adminSecret && <p className="error">{errors.adminSecret}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;