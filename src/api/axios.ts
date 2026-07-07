import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL_DEVELOPMENT,
    withCredentials: true,
});
console.log(import.meta.env.VITE_API_URL_DEVELOPMENT);

export default api;