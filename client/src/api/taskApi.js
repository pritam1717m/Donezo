import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const getConfig = ()=>{
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getTasks = async () => {
    const response = await axios.get(API_URL,getConfig());
    return response.data;
};

export const createTask = async(taskData) => {
    const response = await axios.post(API_URL, taskData, getConfig());
    return response.data;
};

export const updateTask = async(id, taskData) => {
    const response = await axios.put(`${API_URL}/${id}`, taskData, getConfig());
    return response.data;
};

export const deleteTask = async(id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getConfig());
    return response.data;
};