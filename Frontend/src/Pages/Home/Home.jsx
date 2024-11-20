import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, signup, signupAdmin } from "../../Services/authServices";
import Signup from "../../Components/Signup";
import Login from "../../Components/Login";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (data, isAdmin = false) => {
    try {
      if (isLogin) {
        // Login process
        const response= await login(data.email, data.password);
        const userData=response.data;
        const token=response.token;
        console.log(userData,token)
        localStorage.setItem("token", token);
        localStorage.setItem("role", userData.isAdmin ? "admin" : "user");
        setStatusMessage(
          userData.isAdmin
            ? "Successfully logged in as Admin"
            : "Successfully logged in"
        );
        navigate(userData.isAdmin ? "/admin-dashboard" : "/dashboard");
      } else {
        // Signup process
        const { data: userData, token } = isAdmin
          ? await signupAdmin(data.fullName, data.email, data.password, data.adminSecret)
          : await signup(data.fullName, data.email, data.password);
        localStorage.setItem("token", token);
        localStorage.setItem("role", isAdmin ? "admin" : "user");
        setStatusMessage(
          isAdmin
            ? "Successfully signed up as Admin"
            : "Successfully signed up"
        );
        navigate(isAdmin ? "/admin-dashboard" : "/dashboard");
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      {statusMessage ? (
        <div className="success-message">
          <h1>{statusMessage}</h1>
        </div>
      ) : (
        <>
          <h1 className="title">Welcome to the Portal</h1>
          {isLogin ? (
            <Login onFormSubmit={handleFormSubmit} />
          ) : (
            <Signup onFormSubmit={handleFormSubmit} />
          )}
          <div className="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
