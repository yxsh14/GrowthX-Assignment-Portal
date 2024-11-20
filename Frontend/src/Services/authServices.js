import axios from "axios";



export const login = async (email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, { email, password });

        const token = response.data.token; // Extract the token from the response body
        return { data: response.data, token };
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// Signup Function for Regular Users
export const signup = async (name, email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
            name,
            email,
            password,
        });
        const token = response.data.token; // Extract the token from the response body
        return { data: response.data, token };
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// Signup Function for Admin Users
export const signupAdmin = async (name, email, password, adminSecret) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
            name,
            email,
            password,
            isAdmin: true,
            adminSecret,
        });
        const token = response.data.token; // Extract the token from the response body
        return { data: response.data, token };
    } catch (error) {
        console.error("Signup Admin Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};
