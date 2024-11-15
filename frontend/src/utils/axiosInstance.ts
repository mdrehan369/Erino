import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI || "http://localhost:3000",
    withCredentials: true
})