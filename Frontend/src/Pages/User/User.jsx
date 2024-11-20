import React, { useState, useEffect } from "react";
import { getUserAssignments } from "../../Services/assignmentServices";
import { useNavigate } from "react-router-dom";
import './User.css'
const UserDashboard = ({ token }) => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const data = await getUserAssignments(token);
      setAssignments(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <h3>All the assignments</h3>
      <table>
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.title}</td>
              <td>{assignment.adminId.name}</td>
              <td>
                <button onClick={() => navigate(`/assignments/${assignment._id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
