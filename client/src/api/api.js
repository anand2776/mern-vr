import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-vr-1n1m.onrender.com"
});

export default api;