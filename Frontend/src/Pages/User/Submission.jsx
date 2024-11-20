import React, { useState, useEffect } from "react";
import { getAssignmentById, submitAssignment } from "../../Services/assignmentServices";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { useParams, useNavigate } from "react-router-dom";
import './Submission.css';
const AssignmentSubmission = ({ token }) => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [adminName, setAdminName] = useState("");
  const [answer, setAnswer] = useState({});
  const navigate = useNavigate();

  const fetchAssignment = async () => {
    try {
      const { assignment, adminName } = await getAssignmentById(id, token);
      setAssignment(assignment);
      setAdminName(adminName);
      setAnswer(assignment?.answer || {}); // Pre-fill editor with existing answer if available
    } catch (error) {
      console.error("Error fetching assignment:", error);
      navigate("/dashboard", { state: { error: "Failed to fetch assignment." } });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await submitAssignment(id, answer, token);
      console.log("Assignment submitted successfully:", response?.message);
      navigate("/dashboard", { state: { success: "Assignment submitted!" } });
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  if (!assignment) return <p>Loading assignment...</p>;

  return (
    <div className="assignment-submission">
      <h2>Submit Assignment: {assignment?.title || "Untitled"}</h2>
      <p>{assignment?.description || "No description available."}</p>
      <h3>{`Posted By: ${adminName}`}</h3>
      <Editor
        value={answer}
        onChange={(updatedAnswer) => setAnswer(updatedAnswer)}
        mode="code" // You can change to 'tree' or 'view' if preferred
        indentation={2} // Set indentation level for JSON
      />
      <button onClick={handleSubmit}>Submit</button>
      <button
        onClick={() => {
          const confirmCancel = window.confirm(
            "You have unsaved changes. Are you sure you want to cancel?"
          );
          if (confirmCancel) navigate("/dashboard");
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AssignmentSubmission;
