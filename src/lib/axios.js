import axios from "axios";
//withCredentials means send each requrest with cookies
export const axiosInstance = axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true,
})