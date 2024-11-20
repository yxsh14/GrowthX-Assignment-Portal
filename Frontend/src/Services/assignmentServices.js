import axios from 'axios';




// Get a single assignment by ID
export const getAssignmentById = async (id, token) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/${id}`, {
        headers: {
            Authorization: `${token}`,
        },
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch assignment.');
    }
    return response.data;
};

// Create an assignment (Admin)
export const createAssignment = async (data, token) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/assignments/create`,
        { ...data },
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );
    return response.data;
};

// Get all assignments submitted to an admin (Admin)
export const getAdminAssignments = async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/admin`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    console.log(response.data);
    return response.data;
};

// Update assignment status (Admin)
export const updateAssignmentStatus = async (id, status, token) => {
    const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/assignments/${id}`,
        { status },
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );
    console.log(response.data);
    return response.data;
};

// Get all assignments for a user
export const getUserAssignments = async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/user`,
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );


    console.log(response)
    return response.data;
};

// Submit an assignment (User)
export const submitAssignment = async (id, answer, token) => {
    try {
        const answerStr = JSON.stringify(answer);
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/assignments/${id}/submit`,
            { answer: answerStr },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        console.log("This is the response", response.data);
        return response.data;
    } catch (error) {
        console.error('Error while submitting assignment:', error);
        throw error;
    }
};
