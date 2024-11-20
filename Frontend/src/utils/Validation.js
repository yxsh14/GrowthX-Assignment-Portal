export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 8; // Minimum length for password
};

export const validateName = (name) => {
    return name.trim().length > 0;
};
export const validateSecret = (secret) => {
    return secret.trim().length > 0;
};

