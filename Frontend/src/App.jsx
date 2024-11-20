import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AdminDashboard from "./Pages/Admin/Admin";
import UserDashboard from "./Pages/User/User";
import { useEffect } from "react";
import AssignmentSubmission from "./Pages/User/Submission";

const App = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("role");
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {token && role === "admin" && (
          <Route path="/admin-dashboard" element={<AdminDashboard token={token} />} />
        )}
        {token && role === "user" && (
          <Route path="/dashboard" element={<UserDashboard token={token} />} />
        )}
        <Route
          path="/assignments/:id"
          element={<AssignmentSubmission token={token} />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? (role === "admin" ? "/admin-dashboard" : "/dashboard") : "/"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
