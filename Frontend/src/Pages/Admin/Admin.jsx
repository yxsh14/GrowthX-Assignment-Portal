import React, { useState, useEffect } from 'react';
import { createAssignment, getAdminAssignments, updateAssignmentStatus } from '../../Services/assignmentServices';
import JSONViewer from 'react-json-view';
import './Admin.css';

const AdminDashboard = ({ token }) => {
  const [submissions, setSubmissions] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '' });

  const fetchAssignments = async () => {
    try {
      const data = await getAdminAssignments(token);
      setSubmissions(data.submissions);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreateAssignment = async () => {
    try {
      await createAssignment(newAssignment, token);
      setNewAssignment({ title: '', description: '' });
      fetchAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateAssignmentStatus(id, status, token);
      setSubmissions((prev) =>
        prev.map((assignment) =>
          assignment._id === id ? { ...assignment, status } : assignment
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="create-assignment">
        <h2>Create Assignment</h2>
        <input
          id="admin-title"
          type="text"
          placeholder="Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
        />
        <textarea
          id="admin-description"
          placeholder="Description"
          value={newAssignment.description}
          onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
        />
        <button onClick={handleCreateAssignment}>Create</button>
      </div>

      <div className="assignments">
        <h2>Submissions</h2>
        {submissions?.map((assignment) => (
          <div key={assignment._id} className="assignment">
            <h4>{assignment.assignmentId.title}</h4>
            <h6>{assignment.status}</h6>
            <JSONViewer src={JSON.parse(assignment.answer)} />
            {assignment.status === 'Pending' && (
              <>
                <button onClick={() => handleUpdateStatus(assignment._id, 'Accepted')}>
                  Accept
                </button>
                <button onClick={() => handleUpdateStatus(assignment._id, 'Rejected')}>
                  Reject
                </button>
              </>
            )}
            {assignment.status === 'Accepted' && (
              <button disabled style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                Accepted
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
