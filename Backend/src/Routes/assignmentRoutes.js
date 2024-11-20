const express = require('express');
const router = express.Router();
const { createAssignment,
    submitAssignment,
    updateSubmissionStatus,
    getUserAssignments,
    getAdminSubmissions,
    getAssignmentById } = require('../Controllers/assignmentControllers');
const { authenticate } = require('../Middlewares/authMiddleware');
const { adminMiddleware } = require('../Middlewares/adminMiddleware');

// Admin routes
router.post('/create', authenticate, adminMiddleware, createAssignment);
router.get('/admin', authenticate, adminMiddleware, getAdminSubmissions);
router.put('/:id', authenticate, adminMiddleware, updateSubmissionStatus);

// User routes
router.post('/:id/submit', authenticate, submitAssignment);
router.get('/user', authenticate, getUserAssignments);
router.get('/:id', authenticate, getAssignmentById);

module.exports = router;
