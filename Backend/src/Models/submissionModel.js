const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true, // The assignment for this submission
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // The user who submitted this
    },
    answer: {
        type: String, // User's answer to the assignment
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'], // Admin decision
        default: 'Pending',
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Submission', submissionSchema);
