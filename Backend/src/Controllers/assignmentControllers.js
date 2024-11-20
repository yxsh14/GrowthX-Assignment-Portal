const Assignment = require('../Models/assignmentModel');
const Submission = require('../Models/submissionModel');
const User = require('../Models/userModel');
const createAssignment = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const assignment = await Assignment.create({
            title,
            description,
            adminId: req.user.id, // Admin creating the assignment
        });

        return res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const submitAssignment = async (req, res) => {
    const { answer } = req.body;
    const { id: assignmentId } = req.params;
    console.log(answer, assignmentId)
    if (!answer) {
        res.status(400).json({ message: 'Answer is required' });
    }

    try {
        // Check if the assignment exists
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Check if the user has already submitted
        const existingSubmission = await Submission.findOne({
            assignmentId,
            userId: req.user.id,
        });

        if (existingSubmission) {
            return res.status(400).json({ message: 'You have already submitted this assignment.' });
        }

        // Create a new submission
        const submission = await Submission.create({
            assignmentId,
            userId: req.user.id,
            answer,
        });

        return res.status(201).json({ message: 'Assignment submitted successfully', submission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSubmissionStatus = async (req, res) => {
    const { status } = req.body;
    const { id: submissionId } = req.params;

    if (!status || !['Accepted', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const submission = await Submission.findById(submissionId).populate('assignmentId');
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        const adminId = submission.assignmentId.adminId.toString();
        if (adminId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        submission.status = status;

        await submission.save();

        return res.status(200).json({ message: 'Assignment Accepted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUserAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('adminId', 'name email',)
            .select('title description adminId createdAt')
            .sort({ createdAt: -1 });


        return res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminSubmissions = async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.user.id }).select('_id');

        if (!assignments.length) {
            return res.status(200).json({ submissions: [] });
        }
        const assignmentIds = assignments.map((assignment) => assignment._id);

        const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } })
            .populate('assignmentId', 'title description')
            .populate('userId', 'name email')
            .sort({ submittedAt: -1 });

        // Step 4: Return the result
        return res.status(200).json({ submissions });
    } catch (error) {
        console.error('Error fetching admin submissions:', error);
        return res.status(500).json({ message: error.message });
    }
};

const getAssignmentById = async (req, res) => {
    const { id: assignmentId } = req.params;
    try {
        const assignment = await Assignment.findOne({ _id: assignmentId });
        const adminDetails = await User.findOne(assignment.adminId);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        return res.status(200).json({ assignment, adminName: adminDetails.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAssignment,
    submitAssignment,
    updateSubmissionStatus,
    getUserAssignments,
    getAdminSubmissions,
    getAssignmentById
};