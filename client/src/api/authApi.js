import axios from "axios";

const AUTH_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const registerUser = async(userData) => {
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    return response.data;
};
export const loginUser = async(userData) => {
    const response = await axios.post(`${AUTH_URL}/login`, userData);
    return response.data;
};