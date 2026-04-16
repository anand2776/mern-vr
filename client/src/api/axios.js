import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000" // ✅ NO /api
});

export default API;