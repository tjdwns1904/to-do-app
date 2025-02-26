import axios from "axios";

const baseURL = import.meta.env.VITE_API;

export const axiosInstance = axios.create({
    baseURL: baseURL
});